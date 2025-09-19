import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SaveData {
  [key: string]: any;
}

interface ManualSaveOptions {
  showToast?: boolean;
  section?: string;
}

export const useManualSave = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();

  const saveData = useCallback(async (
    sectionName: string, 
    data: SaveData, 
    options: ManualSaveOptions = {}
  ) => {
    if (isSaving) return { success: false, error: 'Save already in progress' };
    
    setIsSaving(true);
    const { showToast = true, section } = options;
    
    try {
      // Generate storage key
      const storageKey = `manual_save_${sectionName}`;
      const saveObject = {
        ...data,
        savedAt: new Date().toISOString(),
        section: sectionName,
        manualSave: true
      };
      
      // Save to localStorage
      localStorage.setItem(storageKey, JSON.stringify(saveObject));

      // Update work hub files list
      const workingHubFiles = JSON.parse(localStorage.getItem('workingHubFiles') || '[]');
      const existingFileIndex = workingHubFiles.findIndex((file: any) => file.name === sectionName);
      
      const fileEntry = {
        name: sectionName,
        type: 'Report Section',
        lastModified: saveObject.savedAt,
        size: JSON.stringify(data).length,
        status: 'Saved',
        section: sectionName,
        manualSave: true
      };
      
      if (existingFileIndex >= 0) {
        workingHubFiles[existingFileIndex] = fileEntry;
      } else {
        workingHubFiles.push(fileEntry);
      }
      
      localStorage.setItem('workingHubFiles', JSON.stringify(workingHubFiles));
      
      setLastSaved(new Date());
      
      if (showToast) {
        toast({
          title: "Section Saved",
          description: `${section || sectionName} has been saved successfully.`,
        });
      }
      
      return { success: true, data: saveObject };
    } catch (error) {
      console.error(`Failed to save ${sectionName}:`, error);
      
      if (showToast) {
        toast({
          title: "Save Failed",
          description: `Failed to save ${section || sectionName}. Please try again.`,
          variant: "destructive"
        });
      }
      
      return { success: false, error };
    } finally {
      setIsSaving(false);
    }
  }, [isSaving, toast]);

  const loadData = useCallback(async (sectionName: string): Promise<SaveData | null> => {
    try {
      const storageKey = `manual_save_${sectionName}`;
      const savedData = localStorage.getItem(storageKey);
      
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setLastSaved(new Date(parsed.savedAt));
        return parsed;
      }
      
      return null;
    } catch (error) {
      console.error(`Failed to load ${sectionName}:`, error);
      return null;
    }
  }, []);

  const clearData = useCallback(async (sectionName: string) => {
    try {
      const storageKey = `manual_save_${sectionName}`;
      localStorage.removeItem(storageKey);
      
      // Remove from work hub files
      const workingHubFiles = JSON.parse(localStorage.getItem('workingHubFiles') || '[]');
      const updatedFiles = workingHubFiles.filter((file: any) => file.name !== sectionName);
      localStorage.setItem('workingHubFiles', JSON.stringify(updatedFiles));
      
      setLastSaved(null);
      
      toast({
        title: "Section Cleared",
        description: `${sectionName} data has been cleared.`,
      });
    } catch (error) {
      console.error(`Failed to clear ${sectionName}:`, error);
      toast({
        title: "Clear Failed",
        description: `Failed to clear ${sectionName} data.`,
        variant: "destructive"
      });
    }
  }, [toast]);

  return {
    saveData,
    loadData,
    clearData,
    isSaving,
    lastSaved,
  };
};