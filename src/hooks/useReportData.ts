import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ReportData {
  [sectionKey: string]: any;
}

export const useReportData = () => {
  const [reportData, setReportData] = useState<ReportData>({});
  const { toast } = useToast();

  const updateSection = useCallback((sectionKey: string, data: any) => {
    setReportData(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        ...data
      }
    }));
  }, []);

  const saveToStorage = useCallback(() => {
    try {
      localStorage.setItem('report_data', JSON.stringify(reportData));
      toast({
        title: "Data saved",
        description: "Your report data has been saved locally",
        duration: 2000,
      });
    } catch (error) {
      console.error('Failed to save data:', error);
      toast({
        title: "Save failed",
        description: "Unable to save your data",
        variant: "destructive",
        duration: 3000,
      });
    }
  }, [reportData, toast]);

  const loadFromStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem('report_data');
      if (saved) {
        const data = JSON.parse(saved);
        setReportData(data);
        return data;
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
    return null;
  }, []);

  const clearData = useCallback(() => {
    setReportData({});
    localStorage.removeItem('report_data');
    toast({
      title: "Data cleared",
      description: "All report data has been cleared",
      duration: 2000,
    });
  }, [toast]);

  return {
    reportData,
    updateSection,
    saveToStorage,
    loadFromStorage,
    clearData,
    setReportData
  };
};