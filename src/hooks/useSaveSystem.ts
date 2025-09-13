import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface SaveData {
  componentName: string;
  data: any;
  lastSaved: string;
}

export const useSaveSystem = (componentName: string) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const { toast } = useToast();

  const saveData = useCallback(async (data: any) => {
    setIsSaving(true);
    
    try {
      const saveData: SaveData = {
        componentName,
        data,
        lastSaved: new Date().toISOString()
      };
      
      // Save to localStorage
      localStorage.setItem(`save_${componentName}`, JSON.stringify(saveData));
      
      // Create working hub file entry
      const workingHubFiles = JSON.parse(localStorage.getItem('workingHubFiles') || '[]');
      const existingFileIndex = workingHubFiles.findIndex((file: any) => file.name === componentName);
      
      const fileEntry = {
        name: componentName,
        type: 'Report Section',
        lastModified: new Date().toISOString(),
        size: JSON.stringify(data).length,
        status: 'Saved'
      };
      
      if (existingFileIndex >= 0) {
        workingHubFiles[existingFileIndex] = fileEntry;
      } else {
        workingHubFiles.push(fileEntry);
      }
      
      localStorage.setItem('workingHubFiles', JSON.stringify(workingHubFiles));
      
      setLastSaved(saveData.lastSaved);
      
      toast({
        title: "Data Saved Successfully",
        description: `${componentName} data has been saved to Working Hub`,
        variant: "default"
      });
      
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "There was an error saving your data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  }, [componentName, toast]);

  const loadData = useCallback((): any => {
    try {
      const saved = localStorage.getItem(`save_${componentName}`);
      if (saved) {
        const saveData: SaveData = JSON.parse(saved);
        setLastSaved(saveData.lastSaved);
        return saveData.data;
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
    return null;
  }, [componentName]);

  return {
    saveData,
    loadData,
    isSaving,
    lastSaved
  };
};