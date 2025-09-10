import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface LeasingRecord {
  id?: string;
  user_id?: string;
  property_address: string;
  rent_amount: number;
  lease_start_date: string;
  lease_end_date?: string;
  lease_duration_months?: number;
  lease_status: 'active' | 'pending' | 'terminated';
  property_type: string;
  land_area?: number;
  building_area?: number;
  bedrooms?: number;
  bathrooms?: number;
  car_spaces?: number;
  property_features?: Record<string, any>;
  comparison_notes?: string;
  is_comparable?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const useLeasingEvidence = (propertyAddress?: string) => {
  const [leasingRecords, setLeasingRecords] = useState<LeasingRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [validationStatus, setValidationStatus] = useState<{
    hasMinimumLeases: boolean;
    activeLeasesCount: number;
    selectedComparables: LeasingRecord[];
  }>({
    hasMinimumLeases: false,
    activeLeasesCount: 0,
    selectedComparables: [],
  });
  const { toast } = useToast();

  // Load leasing records
  const loadLeasingRecords = useCallback(async () => {
    if (!propertyAddress) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('leasing_evidence')
        .select('*')
        .eq('property_address', propertyAddress)
        .order('lease_start_date', { ascending: false });

      if (error) throw error;
      setLeasingRecords((data || []) as LeasingRecord[]);
    } catch (error) {
      console.error('Error loading leasing records:', error);
      toast({
        title: "Error",
        description: "Failed to load leasing records",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [propertyAddress, toast]);

  // Save leasing record
  const saveLeasingRecord = useCallback(async (record: Omit<LeasingRecord, 'id'>) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('leasing_evidence')
        .insert([{ ...record, user_id: user.user.id }])
        .select()
        .single();

      if (error) throw error;

      setLeasingRecords(prev => [data as LeasingRecord, ...prev]);
      await validateAndSelectComparables();
      
      toast({
        title: "Success",
        description: "Leasing record saved successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error saving leasing record:', error);
      toast({
        title: "Error",
        description: "Failed to save leasing record",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  // Update leasing record
  const updateLeasingRecord = useCallback(async (id: string, updates: Partial<LeasingRecord>) => {
    try {
      const { data, error } = await supabase
        .from('leasing_evidence')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setLeasingRecords(prev => prev.map(record => 
        record.id === id ? { ...record, ...(data as LeasingRecord) } : record
      ));
      await validateAndSelectComparables();
      
      toast({
        title: "Success",
        description: "Leasing record updated successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error updating leasing record:', error);
      toast({
        title: "Error",
        description: "Failed to update leasing record",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  // Delete leasing record
  const deleteLeasingRecord = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('leasing_evidence')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setLeasingRecords(prev => prev.filter(record => record.id !== id));
      await validateAndSelectComparables();
      
      toast({
        title: "Success",
        description: "Leasing record deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting leasing record:', error);
      toast({
        title: "Error",
        description: "Failed to delete leasing record",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  // Validate and select comparables
  const validateAndSelectComparables = useCallback(async () => {
    const activeLeases = leasingRecords.filter(lease => lease.lease_status === 'active');
    const activeLeasesCount = activeLeases.length;
    const hasMinimumLeases = activeLeasesCount >= 3;

    // Auto-select most comparable leases (most recent active leases)
    const selectedComparables = activeLeases
      .sort((a, b) => new Date(b.lease_start_date).getTime() - new Date(a.lease_start_date).getTime())
      .slice(0, 3);

    // Update comparable flags in database
    if (hasMinimumLeases) {
      const comparableIds = selectedComparables.map(lease => lease.id).filter(Boolean);
      
      // Reset all comparables first
      await supabase
        .from('leasing_evidence')
        .update({ is_comparable: false })
        .eq('property_address', propertyAddress);
      
      // Set selected as comparables
      if (comparableIds.length > 0) {
        await supabase
          .from('leasing_evidence')
          .update({ is_comparable: true })
          .in('id', comparableIds);
      }
    }

    setValidationStatus({
      hasMinimumLeases,
      activeLeasesCount,
      selectedComparables,
    });

    // Trigger rental AVM if minimum requirements met
    if (hasMinimumLeases) {
      await triggerRentalAVM(selectedComparables);
    }
  }, [leasingRecords, propertyAddress]);

  // Trigger rental AVM calculation
  const triggerRentalAVM = useCallback(async (comparables: LeasingRecord[]) => {
    try {
      // Calculate basic rental AVM based on comparables
      const avgRentPerSqm = comparables.reduce((sum, lease) => {
        const area = lease.building_area || lease.land_area || 1;
        return sum + (lease.rent_amount / area);
      }, 0) / comparables.length;

      console.log('Rental AVM Triggered with comparables:', {
        comparables,
        avgRentPerSqm,
        estimatedRent: avgRentPerSqm * 200, // Example calculation
      });

      toast({
        title: "Rental AVM Triggered",
        description: `Automated rental valuation calculated using ${comparables.length} comparable leases`,
      });
    } catch (error) {
      console.error('Rental AVM calculation error:', error);
    }
  }, [toast]);

  // Load data on mount
  useEffect(() => {
    loadLeasingRecords();
  }, [loadLeasingRecords]);

  // Validate when records change
  useEffect(() => {
    if (leasingRecords.length > 0) {
      validateAndSelectComparables();
    }
  }, [leasingRecords.length]);

  return {
    leasingRecords,
    loading,
    validationStatus,
    saveLeasingRecord,
    updateLeasingRecord,
    deleteLeasingRecord,
    loadLeasingRecords,
    validateAndSelectComparables,
  };
};