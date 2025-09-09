import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AutosaveOptions {
  key: string;
  data: any;
  delay?: number;
  enabled?: boolean;
}

export const useAutosave = ({ key, data, delay = 3000, enabled = true }: AutosaveOptions) => {
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastSavedRef = useRef<string>('');

  useEffect(() => {
    if (!enabled) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Convert data to string for comparison
    const dataString = JSON.stringify(data);
    
    // Only save if data has actually changed
    if (dataString === lastSavedRef.current) {
      return;
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(`autosave_${key}`, dataString);
        lastSavedRef.current = dataString;
        
        toast({
          title: "Report autosaved",
          description: "Your progress has been automatically saved",
          duration: 2000,
        });
      } catch (error) {
        console.error('Autosave failed:', error);
        toast({
          title: "Autosave failed",
          description: "Unable to save your progress",
          variant: "destructive",
          duration: 3000,
        });
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, key, delay, enabled, toast]);

  // Function to manually save
  const saveNow = () => {
    try {
      const dataString = JSON.stringify(data);
      localStorage.setItem(`autosave_${key}`, dataString);
      lastSavedRef.current = dataString;
      
      toast({
        title: "Report saved",
        description: "Your progress has been saved manually",
        duration: 2000,
      });
    } catch (error) {
      console.error('Manual save failed:', error);
      toast({
        title: "Save failed",
        description: "Unable to save your progress",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Function to load saved data
  const loadSaved = () => {
    try {
      const saved = localStorage.getItem(`autosave_${key}`);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Load failed:', error);
      return null;
    }
  };

  // Function to clear saved data
  const clearSaved = () => {
    try {
      localStorage.removeItem(`autosave_${key}`);
      lastSavedRef.current = '';
      
      toast({
        title: "Autosave cleared",
        description: "Saved progress has been cleared",
        duration: 2000,
      });
    } catch (error) {
      console.error('Clear failed:', error);
    }
  };

  return {
    saveNow,
    loadSaved,
    clearSaved
  };
};