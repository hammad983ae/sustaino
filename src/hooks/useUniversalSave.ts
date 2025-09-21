import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SaveData {
  [key: string]: any;
}

interface SaveOptions {
  showToast?: boolean;
  autoSave?: boolean;
  debounceMs?: number;
}

export const useUniversalSave = (sectionName: string, options: SaveOptions = {}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();
  
  const { showToast = true, autoSave = false, debounceMs = 1000 } = options;

  const saveData = useCallback(async (data: SaveData) => {
    if (isSaving) return;
    
    setIsSaving(true);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      // Use fallback identifier for demo/unauthenticated users
      const userId = user?.id || 'demo_user';
      const isDemo = !user;

      // Save to localStorage for immediate persistence
      const storageKey = `report_${sectionName}_${userId}`;
      const saveObject = {
        ...data,
        savedAt: new Date().toISOString(),
        section: sectionName,
        userId: userId,
        isDemo: isDemo
      };
      
      localStorage.setItem(storageKey, JSON.stringify(saveObject));

      // Also save to global report tracking
      const globalReportKey = `global_report_tracking_${userId}`;
      const existingTracking = JSON.parse(localStorage.getItem(globalReportKey) || '{}');
      existingTracking[sectionName] = {
        lastSaved: saveObject.savedAt,
        hasData: true,
        dataSize: JSON.stringify(data).length,
        isDemo: isDemo
      };
      localStorage.setItem(globalReportKey, JSON.stringify(existingTracking));

      // Create working hub file entry for saved sections
      const workingHubFiles = JSON.parse(localStorage.getItem('workingHubFiles') || '[]');
      const existingFileIndex = workingHubFiles.findIndex((file: any) => file.name === sectionName);
      
      const fileEntry = {
        name: sectionName,
        type: 'Report Section',
        lastModified: saveObject.savedAt,
        size: JSON.stringify(data).length,
        status: isDemo ? 'Demo Save' : 'Saved',
        section: sectionName,
        isDemo: isDemo
      };
      
      if (existingFileIndex >= 0) {
        workingHubFiles[existingFileIndex] = fileEntry;
      } else {
        workingHubFiles.push(fileEntry);
      }
      
      localStorage.setItem('workingHubFiles', JSON.stringify(workingHubFiles));
      
      setLastSaved(new Date());
      
      // Removed demo toast notification
      
      return { success: true, data: saveObject };
    } catch (error) {
      console.error(`Failed to save ${sectionName}:`, error);
      
      // For demo users, still try to save to localStorage
      try {
        const storageKey = `report_${sectionName}_demo_user`;
        const saveObject = {
          ...data,
          savedAt: new Date().toISOString(),
          section: sectionName,
          userId: 'demo_user',
          isDemo: true
        };
        
        localStorage.setItem(storageKey, JSON.stringify(saveObject));
        setLastSaved(new Date());
        
        // Removed demo toast notification
        
        return { success: true, data: saveObject };
      } catch (fallbackError) {
        console.error(`Fallback save also failed:`, fallbackError);
        return { success: false, error: fallbackError };
      }
    } finally {
      setIsSaving(false);
    }
  }, [isSaving, sectionName, showToast]);

  const loadData = useCallback(async (): Promise<SaveData | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || 'demo_user';

      const storageKey = `report_${sectionName}_${userId}`;
      const savedData = localStorage.getItem(storageKey);
      
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setLastSaved(new Date(parsed.savedAt));
        return parsed;
      }
      
      return null;
    } catch (error) {
      console.error(`Failed to load ${sectionName}:`, error);
      
      // Fallback for demo users
      try {
        const storageKey = `report_${sectionName}_demo_user`;
        const savedData = localStorage.getItem(storageKey);
        
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setLastSaved(new Date(parsed.savedAt));
          return parsed;
        }
      } catch (fallbackError) {
        console.error(`Fallback load also failed:`, fallbackError);
      }
      
      return null;
    }
  }, [sectionName]);

  const clearData = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || 'demo_user';

      const storageKey = `report_${sectionName}_${userId}`;
      localStorage.removeItem(storageKey);
      
      setLastSaved(null);
      
      // Toast notifications disabled
    } catch (error) {
      console.error(`Failed to clear ${sectionName}:`, error);
      
      // Fallback for demo users
      try {
        const storageKey = `report_${sectionName}_demo_user`;
        localStorage.removeItem(storageKey);
        setLastSaved(null);
      } catch (fallbackError) {
        console.error(`Fallback clear also failed:`, fallbackError);
      }
    }
  }, [sectionName]);

  return {
    saveData,
    loadData,
    clearData,
    isSaving,
    lastSaved,
  };
};