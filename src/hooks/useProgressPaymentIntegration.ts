import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface WorkflowIntegration {
  jobId: string;
  propertyAddress: string;
  workflowType: 'PAF' | 'ISFV';
  clientName?: string;
  propertyType?: string;
  estimatedValue?: number;
}

export const useProgressPaymentIntegration = () => {
  const { toast } = useToast();

  const createProgressPaymentFromWorkflow = useCallback(async (sourceData: WorkflowIntegration) => {
    try {
      // Fetch the original valuation job details
      let originalValuation = null;
      
      if (sourceData.workflowType === 'PAF') {
        // Fetch from property_assessments table
        const { data, error } = await supabase
          .from('property_assessments')
          .select('*')
          .eq('job_id', sourceData.jobId)
          .single();
        
        if (error) throw error;
        originalValuation = data;
      } else if (sourceData.workflowType === 'ISFV') {
        // Fetch from valuation_jobs table
        const { data, error } = await supabase
          .from('valuation_jobs')
          .select('*')
          .eq('id', sourceData.jobId)
          .single();
        
        if (error) throw error;
        originalValuation = data;
      }

      if (!originalValuation) {
        throw new Error('Original valuation not found');
      }

      // Create initial progress payment record
      const progressPaymentData = {
        property_address: sourceData.propertyAddress,
        builder_name: '', // To be filled by user
        original_valuation_id: sourceData.jobId,
        contract_price: sourceData.estimatedValue || 0,
        current_stage: 'Deposit',
        claimed_percentage: 0,
        verified_percentage: 0,
        status: 'pending' as const,
        inspector_notes: `Created from ${sourceData.workflowType} workflow. Original job: ${sourceData.jobId}`,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      };

      const { data, error } = await supabase
        .from('tbe_progress_payments')
        .insert([progressPaymentData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Progress payment created from ${sourceData.workflowType} valuation`,
      });

      return data;
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create progress payment from workflow',
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  const linkExistingValuation = useCallback(async (progressPaymentId: string, valuationJobId: string) => {
    try {
      const { error } = await supabase
        .from('tbe_progress_payments')
        .update({ original_valuation_id: valuationJobId })
        .eq('id', progressPaymentId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Progress payment linked to valuation',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to link progress payment to valuation',
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  const getAvailableValuations = useCallback(async (propertyAddress?: string) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error('User not authenticated');

      // Fetch PAF valuations - simplified approach
      const { data: pafData, error: pafError } = await supabase
        .from('property_assessments')
        .select('job_id, created_at, report_type')
        .eq('user_id', user.data.user.id);

      if (pafError) throw pafError;

      // Fetch ISFV valuations
      let isfvQuery = supabase
        .from('valuation_jobs')
        .select('id, property_address, job_title, created_at, estimated_value')
        .eq('user_id', user.data.user.id);

      if (propertyAddress) {
        isfvQuery = isfvQuery.ilike('property_address', `%${propertyAddress}%`);
      }

      const { data: isfvData, error: isfvError } = await isfvQuery;
      if (isfvError) throw isfvError;

      // Format the data for display
      const pafValuations = (pafData || []).map(item => ({
        id: item.job_id,
        address: 'PAF Assessment', // Simplified since we don't have direct address access
        type: 'PAF' as const,
        title: `Property Assessment Form (${item.report_type || 'Standard'})`,
        created: item.created_at,
      }));

      const isfvValuations = (isfvData || []).map(item => ({
        id: item.id,
        address: item.property_address,
        type: 'ISFV' as const,
        title: item.job_title,
        created: item.created_at,
        estimatedValue: item.estimated_value,
      }));

      return [...pafValuations, ...isfvValuations].sort((a, b) => 
        new Date(b.created).getTime() - new Date(a.created).getTime()
      );
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch available valuations',
        variant: 'destructive',
      });
      return [];
    }
  }, [toast]);

  return {
    createProgressPaymentFromWorkflow,
    linkExistingValuation,
    getAvailableValuations,
  };
};