import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SalesRecord {
  id?: string;
  user_id?: string;
  property_address: string;
  sale_price: number;
  sale_date: string;
  sale_status: 'settled' | 'pending' | 'cancelled';
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

export const useSalesEvidence = (propertyAddress?: string) => {
  const [salesRecords, setSalesRecords] = useState<SalesRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [validationStatus, setValidationStatus] = useState<{
    hasMinimumSales: boolean;
    settledSalesCount: number;
    selectedComparables: SalesRecord[];
  }>({
    hasMinimumSales: false,
    settledSalesCount: 0,
    selectedComparables: [],
  });
  const { toast } = useToast();

  // Load sales records
  const loadSalesRecords = useCallback(async () => {
    if (!propertyAddress) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sales_evidence')
        .select('*')
        .eq('property_address', propertyAddress)
        .order('sale_date', { ascending: false });

      if (error) throw error;
      setSalesRecords((data || []) as SalesRecord[]);
    } catch (error) {
      console.error('Error loading sales records:', error);
      toast({
        title: "Error",
        description: "Failed to load sales records",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [propertyAddress, toast]);

  // Save sales record
  const saveSalesRecord = useCallback(async (record: Omit<SalesRecord, 'id'>) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('sales_evidence')
        .insert([{ ...record, user_id: user.user.id }])
        .select()
        .single();

      if (error) throw error;

      setSalesRecords(prev => [data as SalesRecord, ...prev]);
      await validateAndSelectComparables();
      
      toast({
        title: "Success",
        description: "Sales record saved successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error saving sales record:', error);
      toast({
        title: "Error",
        description: "Failed to save sales record",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  // Update sales record
  const updateSalesRecord = useCallback(async (id: string, updates: Partial<SalesRecord>) => {
    try {
      const { data, error } = await supabase
        .from('sales_evidence')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setSalesRecords(prev => prev.map(record => 
        record.id === id ? { ...record, ...(data as SalesRecord) } : record
      ));
      await validateAndSelectComparables();
      
      toast({
        title: "Success",
        description: "Sales record updated successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error updating sales record:', error);
      toast({
        title: "Error",
        description: "Failed to update sales record",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  // Delete sales record
  const deleteSalesRecord = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('sales_evidence')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSalesRecords(prev => prev.filter(record => record.id !== id));
      await validateAndSelectComparables();
      
      toast({
        title: "Success",
        description: "Sales record deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting sales record:', error);
      toast({
        title: "Error",
        description: "Failed to delete sales record",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  // Validate and select comparables
  const validateAndSelectComparables = useCallback(async () => {
    const settledSales = salesRecords.filter(sale => sale.sale_status === 'settled');
    const settledSalesCount = settledSales.length;
    const hasMinimumSales = settledSalesCount >= 3;

    // Auto-select most comparable sales (most recent settled sales)
    const selectedComparables = settledSales
      .sort((a, b) => new Date(b.sale_date).getTime() - new Date(a.sale_date).getTime())
      .slice(0, 3);

    // Update comparable flags in database
    if (hasMinimumSales) {
      const comparableIds = selectedComparables.map(sale => sale.id).filter(Boolean);
      
      // Reset all comparables first
      await supabase
        .from('sales_evidence')
        .update({ is_comparable: false })
        .eq('property_address', propertyAddress);
      
      // Set selected as comparables
      if (comparableIds.length > 0) {
        await supabase
          .from('sales_evidence')
          .update({ is_comparable: true })
          .in('id', comparableIds);
      }
    }

    setValidationStatus({
      hasMinimumSales,
      settledSalesCount,
      selectedComparables,
    });

    // Trigger AVM if minimum requirements met
    if (hasMinimumSales) {
      await triggerAVM(selectedComparables);
    }
  }, [salesRecords, propertyAddress]);

  // Trigger AVM calculation
  const triggerAVM = useCallback(async (comparables: SalesRecord[]) => {
    try {
      // Calculate basic AVM based on comparables
      const avgPricePerSqm = comparables.reduce((sum, sale) => {
        const area = sale.building_area || sale.land_area || 1;
        return sum + (sale.sale_price / area);
      }, 0) / comparables.length;

      console.log('AVM Triggered with comparables:', {
        comparables,
        avgPricePerSqm,
        estimatedValue: avgPricePerSqm * 200, // Example calculation
      });

      toast({
        title: "AVM Triggered",
        description: `Automated valuation calculated using ${comparables.length} comparable sales`,
      });
    } catch (error) {
      console.error('AVM calculation error:', error);
    }
  }, [toast]);

  // Load data on mount
  useEffect(() => {
    loadSalesRecords();
  }, [loadSalesRecords]);

  // Validate when records change
  useEffect(() => {
    if (salesRecords.length > 0) {
      validateAndSelectComparables();
    }
  }, [salesRecords.length]);

  return {
    salesRecords,
    loading,
    validationStatus,
    saveSalesRecord,
    updateSalesRecord,
    deleteSalesRecord,
    loadSalesRecords,
    validateAndSelectComparables,
  };
};