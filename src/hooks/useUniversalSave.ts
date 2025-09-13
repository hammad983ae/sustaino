import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
  
  const { showToast = true, autoSave = false, debounceMs = 1000 } = options;

  const saveData = useCallback(async (data: SaveData) => {
    if (isSaving) return;
    
    setIsSaving(true);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Save to localStorage for immediate persistence
      const storageKey = `report_${sectionName}_${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify({
        ...data,
        savedAt: new Date().toISOString(),
        section: sectionName
      }));

      // For now, we'll use localStorage as primary storage
      // Future enhancement: Save to Supabase database when schema is ready
      
      setLastSaved(new Date());
      
      if (showToast) {
        toast.success(`${sectionName} saved successfully`, {
          duration: 2000,
        });
      }
      
      return { success: true };
    } catch (error) {
      console.error(`Failed to save ${sectionName}:`, error);
      
      if (showToast) {
        toast.error(`Failed to save ${sectionName}`, {
          description: error instanceof Error ? error.message : 'Unknown error',
          duration: 4000,
        });
      }
      
      return { success: false, error };
    } finally {
      setIsSaving(false);
    }
  }, [isSaving, sectionName, showToast]);

  const loadData = useCallback(async (): Promise<SaveData | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const storageKey = `report_${sectionName}_${user.id}`;
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
  }, [sectionName]);

  const clearData = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const storageKey = `report_${sectionName}_${user.id}`;
      localStorage.removeItem(storageKey);
      
      setLastSaved(null);
      
      if (showToast) {
        toast.success(`${sectionName} data cleared`);
      }
    } catch (error) {
      console.error(`Failed to clear ${sectionName}:`, error);
      
      if (showToast) {
        toast.error(`Failed to clear ${sectionName}`);
      }
    }
  }, [sectionName, showToast]);

  return {
    saveData,
    loadData,
    clearData,
    isSaving,
    lastSaved,
  };
};