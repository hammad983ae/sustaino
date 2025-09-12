import { useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface ReportData {
  currentSection: number;
  completedSections: number[];
  reportData: Record<string, any>;
  lastSaved: string;
  reportId: string;
}

export const useProgressiveReportSaving = (currentSection: number, totalSections: number) => {
  const saveReport = useCallback(async (reportData: Partial<ReportData>) => {
    try {
      const existingData = localStorage.getItem('progressive-report-save');
      const currentData: ReportData = existingData ? JSON.parse(existingData) : {
        currentSection: 0,
        completedSections: [],
        reportData: {},
        lastSaved: new Date().toISOString(),
        reportId: `report-${Date.now()}`
      };

      const updatedData: ReportData = {
        ...currentData,
        ...reportData,
        lastSaved: new Date().toISOString()
      };

      localStorage.setItem('progressive-report-save', JSON.stringify(updatedData));
      
      // Also save to a timestamped backup
      const backupKey = `report-backup-${updatedData.reportId}`;
      localStorage.setItem(backupKey, JSON.stringify(updatedData));
      
      toast.success('Report progress saved automatically', {
        description: `Section ${currentSection + 1} of ${totalSections} completed`
      });
      
      return updatedData;
    } catch (error) {
      console.error('Error saving report:', error);
      toast.error('Failed to save report progress');
      throw error;
    }
  }, [currentSection, totalSections]);

  const loadReport = useCallback((): ReportData | null => {
    try {
      const savedData = localStorage.getItem('progressive-report-save');
      return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
      console.error('Error loading report:', error);
      return null;
    }
  }, []);

  const clearReport = useCallback(() => {
    try {
      localStorage.removeItem('progressive-report-save');
      toast.success('Report progress cleared');
    } catch (error) {
      console.error('Error clearing report:', error);
      toast.error('Failed to clear report progress');
    }
  }, []);

  // Auto-save every 5 sections
  useEffect(() => {
    if (currentSection > 0 && (currentSection + 1) % 5 === 0) {
      const reportData = {
        currentSection,
        completedSections: Array.from({ length: currentSection + 1 }, (_, i) => i),
        reportData: {
          completedAt: new Date().toISOString(),
          sectionCount: currentSection + 1
        }
      };
      
      saveReport(reportData);
    }
  }, [currentSection, saveReport]);

  return {
    saveReport,
    loadReport,
    clearReport
  };
};