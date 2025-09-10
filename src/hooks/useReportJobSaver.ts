import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ReportJobSaverOptions {
  reportData: any;
  currentSection: number;
  propertyAddress?: string;
  reportType?: string;
  enabled?: boolean;
  autoSaveDelay?: number;
  includedSections?: string[];
  geolocationData?: any;
  vicplanData?: any;
  marketAnalysis?: any;
}

export const useReportJobSaver = ({
  reportData,
  currentSection,
  propertyAddress = '',
  reportType = 'Property Report',
  enabled = true,
  autoSaveDelay = 5000,
  includedSections = [],
  geolocationData = {},
  vicplanData = {},
  marketAnalysis = {}
}: ReportJobSaverOptions) => {
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const reportJobIdRef = useRef<string | null>(null);
  const lastSavedDataRef = useRef<string>('');

  // Save or update report job
  const saveReportJob = useCallback(async (showToast = false) => {
    console.log('saveReportJob called:', { enabled, propertyAddress, showToast });
    
    if (!enabled) {
      console.log('Saving disabled');
      return null;
    }
    
    if (!propertyAddress) {
      console.log('No property address provided');
      return null;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('User check result:', user ? 'authenticated' : 'not authenticated');
      
      if (!user) {
        if (showToast) {
          toast({
            title: "Authentication required",
            description: "Please log in to save your report",
            variant: "destructive"
          });
        }
        return null;
      }

      const dataString = JSON.stringify(reportData);
      console.log('Data check:', { dataLength: dataString.length, hasChanged: dataString !== lastSavedDataRef.current });
      
      // Only save if data has changed
      if (dataString === lastSavedDataRef.current) {
        console.log('No data changes, skipping save');
        return reportJobIdRef.current;
      }

      const progress = Math.round((currentSection / 6) * 100); // Updated for 6 steps total
      
      // Get enhanced property analysis data
      let enhancedData = { geolocationData, vicplanData, marketAnalysis };
      
      if (propertyAddress && currentSection >= 2) {
        try {
          const { data: analysisData } = await supabase.functions.invoke('enhanced-property-analysis', {
            body: { 
              address: propertyAddress, 
              propertyType: reportType,
              jobNumber: reportJobIdRef.current || `10001-${Date.now()}`
            }
          });
          
          if (analysisData) {
            enhancedData = {
              geolocationData: analysisData.geolocation || {},
              vicplanData: analysisData.vicPlanData || {},
              marketAnalysis: analysisData.marketData || {}
            };
          }
        } catch (error) {
          console.warn('Failed to get enhanced property analysis:', error);
        }
      }

      const jobData = {
        title: `${reportType} - ${propertyAddress}`,
        description: `Auto-saved report in progress`,
        property_type: reportType,
        address: propertyAddress,
        status: currentSection >= 6 ? 'completed' : 'in_progress' as const,
        priority: 'medium' as const,
        assigned_to: user.email || 'Self',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        notes: `Report progress: ${progress}% complete - Step ${currentSection} of 6`,
        user_id: user.id,
        completion_percentage: progress,
        geolocation_data: enhancedData.geolocationData,
        vicplan_data: enhancedData.vicplanData,
        market_analysis: enhancedData.marketAnalysis,
        missing_fields_analysis: reportData.missingFieldsAnalysis || {}
      };

      let result;

      if (reportJobIdRef.current) {
        // Update existing job
        const { data, error } = await supabase
          .from('valuation_jobs')
          .update(jobData)
          .eq('id', reportJobIdRef.current)
          .eq('user_id', user.id)
          .select()
          .single();

        if (error) throw error;
        result = data;
      } else {
        // Create new job
        const { data, error } = await supabase
          .from('valuation_jobs')
          .insert(jobData)
          .select()
          .single();

        if (error) throw error;
        result = data;
        reportJobIdRef.current = result.id;
      }

      // Save report in reports table with enhanced data
      const reportPayload = {
        title: `${reportType} - ${propertyAddress}`,
        property_address: propertyAddress,
        report_type: reportType,
        status: currentSection >= 6 ? 'completed' : 'in_progress',
        generated_date: new Date().toISOString(),
        sustainability_score: null,
        file_path: '',
        report_data: reportData,
        report_progress: progress,
        current_section: currentSection,
        user_id: user.id,
        job_number: result.job_number || `10001-${Date.now()}`,
        included_sections: includedSections,
        geolocation_data: enhancedData.geolocationData,
        vicplan_data: enhancedData.vicplanData,
        market_analysis: enhancedData.marketAnalysis,
        aerial_image_url: enhancedData.geolocationData?.aerialImageUrl || ''
      };

      const { error: reportError } = await supabase
        .from('reports')
        .upsert(reportPayload, {
          onConflict: 'user_id,title',
          ignoreDuplicates: false
        });

      if (reportError) {
        console.warn('Failed to save report data:', reportError);
      }

      lastSavedDataRef.current = dataString;

      if (showToast) {
        toast({
          title: "Report saved",
          description: "Your report progress has been saved to Work Hub",
          duration: 2000,
        });
      }

      return result.id;
    } catch (error) {
      console.error('Failed to save report job:', error);
      if (showToast) {
        toast({
          title: "Save failed",
          description: "Unable to save your report progress",
          variant: "destructive",
          duration: 3000,
        });
      }
      return null;
    }
  }, [reportData, currentSection, propertyAddress, reportType, enabled, toast]);

  // Auto-save with debouncing
  useEffect(() => {
    if (!enabled || !propertyAddress) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(() => {
      saveReportJob(false);
    }, autoSaveDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [reportData, currentSection, saveReportJob, autoSaveDelay]);

  // Load existing report job on mount
  useEffect(() => {
    const loadExistingJob = async () => {
      if (!enabled || !propertyAddress) return;

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('valuation_jobs')
          .select('id')
          .eq('user_id', user.id)
          .eq('address', propertyAddress)
          .eq('status', 'in_progress')
          .order('updated_at', { ascending: false })
          .limit(1)
          .single();

        if (!error && data) {
          reportJobIdRef.current = data.id;
        }
      } catch (error) {
        console.log('No existing job found, will create new one');
      }
    };

    loadExistingJob();
  }, [propertyAddress, enabled]);

  // Manual save function
  const saveNow = useCallback(() => {
    return saveReportJob(true);
  }, [saveReportJob]);

  // Load saved report data
  const loadSavedReport = useCallback(async () => {
    if (!propertyAddress) return null;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('reports')
        .select('report_data, current_section, report_progress')
        .eq('user_id', user.id)
        .eq('property_address', propertyAddress)
        .eq('status', 'in_progress')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (error) return null;

      return {
        reportData: data.report_data || {},
        currentSection: data.current_section || 0,
        progress: data.report_progress || 0
      };
    } catch (error) {
      console.error('Failed to load saved report:', error);
      return null;
    }
  }, [propertyAddress]);

  // Mark report as completed and generate PDF
  const markAsCompleted = useCallback(async () => {
    if (!reportJobIdRef.current) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Generate PDF report
      const { data: pdfData, error: pdfError } = await supabase.functions.invoke('generate-pdf-report', {
        body: {
          reportData,
          jobNumber: reportJobIdRef.current,
          propertyAddress,
          reportType,
          includedSections,
          userEmail: user.email
        }
      });

      let pdfFilePath = '';
      if (!pdfError && pdfData?.filePath) {
        pdfFilePath = pdfData.filePath;
      }

      // Update job status
      await supabase
        .from('valuation_jobs')
        .update({ 
          status: 'completed',
          notes: 'Report completed successfully',
          completion_percentage: 100,
          pdf_file_path: pdfFilePath
        })
        .eq('id', reportJobIdRef.current)
        .eq('user_id', user.id);

      // Update report status
      await supabase
        .from('reports')
        .update({ 
          status: 'completed',
          report_progress: 100,
          generated_date: new Date().toISOString(),
          file_path: pdfFilePath
        })
        .eq('user_id', user.id)
        .eq('property_address', propertyAddress)
        .eq('status', 'in_progress');

      toast({
        title: "Report completed",
        description: `Your report has been completed and saved to Work Hub${pdfData?.fileName ? ` as ${pdfData.fileName}` : ''}`,
        duration: 5000,
      });

      return pdfData;

    } catch (error) {
      console.error('Failed to mark report as completed:', error);
      toast({
        title: "Completion failed",
        description: "Unable to complete the report. Please try again.",
        variant: "destructive"
      });
    }
  }, [reportJobIdRef.current, propertyAddress, reportData, reportType, includedSections, toast]);

  return {
    saveNow,
    loadSavedReport,
    markAsCompleted,
    reportJobId: reportJobIdRef.current
  };
};