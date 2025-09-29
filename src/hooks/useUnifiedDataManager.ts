import { useState, useCallback, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useJobManager } from './useJobManager';
import { apiClient } from '@/lib/api';
// Import migration but don't auto-run to allow fresh starts
// import '@/utils/dataMigration';

interface UnifiedData {
  // Core data structure
  reportData: any;
  addressData: any;
  assessmentProgress: {
    currentStep: number;
    completedSteps: boolean[];
  };
  componentData: Record<string, any>; // Individual component data
  lastUpdated: string;
  userId?: string;
  isDemo: boolean;
  includeFlags?: Record<string, boolean>; // For include/exclude toggles
  ocrResults?: string; // For OCR extracted text
  reviewed?: boolean; // For review status
  // MongoDB integration
  assessmentId?: string; // MongoDB assessment ID
  jobId?: string; // MongoDB job ID
  propertyId?: string; // MongoDB property ID
}

interface SaveOptions {
  showToast?: boolean;
  skipValidation?: boolean;
  debounceMs?: number;
}

const STORAGE_KEY = 'unified_property_data';
const BACKUP_KEY = 'unified_property_data_backup';

export const useUnifiedDataManager = (startFresh: boolean = false) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const { toast } = useToast();
  const { archiveAndStartFresh, loadJobIntoSession } = useJobManager();
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const dataRef = useRef<UnifiedData | null>(null);

  // Get current unified data
  const getCurrentData = useCallback(async (): Promise<UnifiedData> => {
    if (dataRef.current) {
      return dataRef.current;
    }

    try {
      // Use custom backend authentication instead of Supabase
      const isAuthenticated = apiClient.isAuthenticated();
      let userId = 'demo_user';
      let isDemo = true;
      
      if (isAuthenticated) {
        try {
          const user = await apiClient.getCurrentUser();
          userId = user._id;
          isDemo = false;
        } catch (error) {
          console.warn('Failed to get current user, falling back to demo mode:', error);
          userId = 'demo_user';
          isDemo = true;
        }
      }

      // Always try to load existing data first
      const stored = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        dataRef.current = parsed;
        setCurrentJobId(parsed.loadedFromJobId || null);
        return parsed;
      }

      // Initialize new data structure
      const newData: UnifiedData = {
        reportData: {},
        addressData: {
          propertyAddress: '',
          lotNumber: '',
          planNumber: '',
          unitNumber: '',
          streetNumber: '',
          streetName: '',
          streetType: '',
          state: '',
          postcode: '',
          country: 'Australia',
        },
        assessmentProgress: {
          currentStep: 0,
          completedSteps: []
        },
        componentData: {},
        lastUpdated: new Date().toISOString(),
        userId,
        isDemo
      };

      dataRef.current = newData;
      return newData;
    } catch (error) {
      console.error('Error getting current data:', error);
      // Fallback to basic structure
      const fallbackData: UnifiedData = {
        reportData: {},
        addressData: {},
        assessmentProgress: { currentStep: 0, completedSteps: [] },
        componentData: {},
        lastUpdated: new Date().toISOString(),
        userId: 'demo_user',
        isDemo: true
      };
      dataRef.current = fallbackData;
      return fallbackData;
    }
  }, []);

  // Save unified data
  const saveData = useCallback(async (
    updates: Partial<UnifiedData>,
    options: SaveOptions = { debounceMs: 2000 } // Default 2 second debounce
  ) => {
    const { showToast = false, debounceMs = 2000 } = options; // Default to no toast and 2s debounce
    
    // Clear existing timeout if debouncing
    if (debounceMs > 0 && saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    const performSave = async () => {
      if (isSaving) return { success: false, error: 'Already saving' };
      
      setIsSaving(true);
      
      try {
        const currentData = await getCurrentData();
        
        // Use custom backend authentication instead of Supabase
        const isAuthenticated = apiClient.isAuthenticated();
        let userId = 'demo_user';
        let isDemo = true;
        
        if (isAuthenticated) {
          try {
            const user = await apiClient.getCurrentUser();
            userId = user._id;
            isDemo = false;
          } catch (error) {
            console.warn('Failed to get current user during save, falling back to demo mode:', error);
            userId = 'demo_user';
            isDemo = true;
          }
        }
        
        // Merge updates with current data
        const updatedData: UnifiedData = {
          ...currentData,
          ...updates,
          lastUpdated: new Date().toISOString(),
          userId,
          isDemo
        };

        // Deep merge for nested objects
        if (updates.reportData) {
          updatedData.reportData = { ...currentData.reportData, ...updates.reportData };
        }
        if (updates.addressData) {
          updatedData.addressData = { ...currentData.addressData, ...updates.addressData };
        }
        if (updates.componentData) {
          updatedData.componentData = { ...currentData.componentData, ...updates.componentData };
        }

          // Save to MongoDB if we have an assessment ID and user is authenticated
          if (updatedData.assessmentId && apiClient.isAuthenticated() && !updatedData.assessmentId.startsWith('demo_')) {
          try {
            const assessmentData = {
              addressData: updatedData.addressData,
              reportConfig: updatedData.reportData?.reportConfig,
              currentStep: updatedData.assessmentProgress.currentStep,
              completedSteps: updatedData.assessmentProgress.completedSteps,
              // Map component data to step data
              steps: Object.keys(updatedData.componentData).map((key, index) => ({
                stepId: index.toString(),
                stepName: key,
                completed: updatedData.assessmentProgress.completedSteps[index] || false,
                data: updatedData.componentData[key]
              }))
            };

            await apiClient.updateAssessment(updatedData.assessmentId, assessmentData);
            console.log('Assessment data saved to MongoDB');
          } catch (mongoError) {
            console.warn('Failed to save to MongoDB, falling back to localStorage:', mongoError);
          }
        }

        // Save to localStorage (always as backup)
        const storageKey = `${STORAGE_KEY}_${userId}`;
        localStorage.setItem(storageKey, JSON.stringify(updatedData));
        
        // Create backup
        localStorage.setItem(`${BACKUP_KEY}_${userId}`, JSON.stringify(updatedData));
        
        // Update working hub files (maintain compatibility)
        const workingHubFiles = JSON.parse(localStorage.getItem('workingHubFiles') || '[]');
        const fileEntry = {
          name: 'Property Assessment',
          type: 'Unified Report Data',
          lastModified: updatedData.lastUpdated,
          size: JSON.stringify(updatedData).length,
          status: updatedData.isDemo ? 'Demo Save' : 'Saved'
        };
        
        const existingIndex = workingHubFiles.findIndex((file: any) => file.name === 'Property Assessment');
        if (existingIndex >= 0) {
          workingHubFiles[existingIndex] = fileEntry;
        } else {
          workingHubFiles.push(fileEntry);
        }
        localStorage.setItem('workingHubFiles', JSON.stringify(workingHubFiles));

        // Update cache
        dataRef.current = updatedData;
        setLastSaved(new Date());

        if (showToast) {
          toast({
            title: "Data Saved",
            description: "Your progress has been saved successfully",
            variant: "default"
          });
        }

        return { success: true, data: updatedData };
      } catch (error) {
        console.error('Save failed:', error);
        
        if (showToast) {
          toast({
            title: "Save Failed",
            description: "Unable to save data. Please try again.",
            variant: "destructive"
          });
        }
        
        return { success: false, error };
      } finally {
        setIsSaving(false);
      }
    };

    if (debounceMs > 0) {
      saveTimeoutRef.current = setTimeout(performSave, debounceMs);
      return Promise.resolve({ success: true, debounced: true });
    } else {
      return performSave();
    }
  }, [isSaving, getCurrentData, toast]);

  // Load data for specific component
  const loadComponentData = useCallback(async (componentName: string) => {
    try {
      const data = await getCurrentData();
      return data.componentData[componentName] || null;
    } catch (error) {
      console.error(`Error loading data for ${componentName}:`, error);
      return null;
    }
  }, [getCurrentData]);

  // Save data for specific component
  const saveComponentData = useCallback(async (
    componentName: string, 
    componentData: any,
    options: SaveOptions = {}
  ) => {
    return saveData({
      componentData: {
        [componentName]: {
          ...componentData,
          savedAt: new Date().toISOString(),
          component: componentName
        }
      }
    }, options);
  }, [saveData]);

  // Update report section
  const updateReportSection = useCallback(async (
    section: string,
    sectionData: any,
    options: SaveOptions = {}
  ) => {
    return saveData({
      reportData: {
        [section]: sectionData
      }
    }, options);
  }, [saveData]);

  // Update address data
  const updateAddressData = useCallback(async (
    addressUpdates: any,
    options: SaveOptions = {}
  ) => {
    const currentData = await getCurrentData();
    const currentAddress = `${currentData.addressData?.streetNumber || ''} ${currentData.addressData?.streetName || ''} ${currentData.addressData?.streetType || ''}`.trim();
    const newAddress = `${addressUpdates.streetNumber || currentData.addressData?.streetNumber || ''} ${addressUpdates.streetName || currentData.addressData?.streetName || ''} ${addressUpdates.streetType || currentData.addressData?.streetType || ''}`.trim();
    
    // Check if this is a significant address change
    const isSignificantChange = currentAddress && newAddress && currentAddress !== newAddress;
    
    if (isSignificantChange) {
      // Clear report data but keep address and progress
      return saveData({
        addressData: addressUpdates,
        reportData: {}, // Clear report data for new property
        componentData: {} // Clear component data for new property
      }, options);
    } else {
      // Just update address data
      return saveData({
        addressData: addressUpdates
      }, options);
    }
  }, [saveData, getCurrentData]);

  // Update assessment progress
  const updateProgress = useCallback(async (
    progressUpdates: Partial<UnifiedData['assessmentProgress']>,
    options: SaveOptions = {}
  ) => {
    const currentData = await getCurrentData();
    return saveData({
      assessmentProgress: {
        ...currentData.assessmentProgress,
        ...progressUpdates
      }
    }, options);
  }, [saveData, getCurrentData]);

  // Clear all data and start fresh
  const clearAllData = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || 'demo_user';
      
      // Clear unified storage
      localStorage.removeItem(`${STORAGE_KEY}_${userId}`);
      localStorage.removeItem(`${BACKUP_KEY}_${userId}`);
      
      // Clear legacy storage keys for compatibility
      const legacyKeys = [
        'reportData',
        'propertyAddressData',
        'workingHubFiles',
        `global_report_tracking_${userId}`,
        `report_PropertyAssessmentForm_${userId}`
      ];
      
      legacyKeys.forEach(key => localStorage.removeItem(key));
      
      // Reset cache and current job
      dataRef.current = null;
      setLastSaved(null);
      setCurrentJobId(null);
      
      // Dispatch clear event for components that might be listening
      window.dispatchEvent(new CustomEvent('unifiedDataCleared', { 
        detail: { timestamp: Date.now() } 
      }));
      
      toast({
        title: "Session Cleared",
        description: "Starting fresh assessment session",
        variant: "default"
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error clearing data:', error);
      return { success: false, error };
    }
  }, [toast]);

  // Create new assessment in MongoDB
  const createAssessment = useCallback(async (jobId: string, propertyId: string) => {
    try {
      const currentData = await getCurrentData();
      
      // Check authentication using custom backend
      const isAuthenticated = apiClient.isAuthenticated();
      
      // If user is not authenticated, create a demo assessment in localStorage only
      if (!isAuthenticated) {
        console.log('User not authenticated, creating demo assessment in localStorage');
        
        // Generate a demo assessment ID
        const demoAssessmentId = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Update current data with demo assessment ID
        await saveData({
          assessmentId: demoAssessmentId,
          jobId,
          propertyId
        });
        
        setCurrentJobId(jobId);
        return { 
          success: true, 
          assessmentId: demoAssessmentId, 
          jobId,
          isDemo: true 
        };
      }

      // User is authenticated, create real MongoDB assessment
      const assessmentData = {
        jobId,
        propertyId,
        addressData: {
          ...currentData.addressData,
          propertyAddress: currentData.addressData?.propertyAddress || 'Address to be confirmed'
        },
        reportConfig: {
          ...currentData.reportData?.reportConfig,
          propertyType: currentData.reportData?.reportConfig?.propertyType || 'residential',
          purpose: currentData.reportData?.reportConfig?.purpose || 'other'
        },
        currentStep: currentData.assessmentProgress.currentStep,
        completedSteps: currentData.assessmentProgress.completedSteps
      };

      console.log('Creating assessment with data:', assessmentData);
      console.log('Job ID:', jobId, 'Property ID:', propertyId);
      console.log('Address data:', assessmentData.addressData);
      console.log('Report config:', assessmentData.reportConfig);

      const response = await apiClient.createAssessment(assessmentData);
      
      if (response.success) {
        const assessmentId = response.data.assessment._id;
        
        // Update current data with assessment ID
        await saveData({
          assessmentId,
          jobId,
          propertyId
        });
        
        setCurrentJobId(jobId);
        return { success: true, assessmentId, jobId, isDemo: false };
      }
      
      return { success: false, error: response.message };
    } catch (error) {
      console.error('Error creating assessment:', error);
      
      // Fallback to demo assessment if MongoDB fails
      console.log('MongoDB assessment creation failed, falling back to demo assessment');
      const demoAssessmentId = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      await saveData({
        assessmentId: demoAssessmentId,
        jobId,
        propertyId
      });
      
      setCurrentJobId(jobId);
      return { 
        success: true, 
        assessmentId: demoAssessmentId, 
        jobId,
        isDemo: true,
        warning: 'Assessment created in demo mode due to authentication issues'
      };
    }
  }, [getCurrentData, saveData]);

  // Archive current session and start fresh
  const completeAndStartFresh = useCallback(async () => {
    try {
      const currentData = await getCurrentData();
      
      // Only archive if there's meaningful data
      const hasData = Object.keys(currentData.reportData || {}).length > 0 || 
                     Object.keys(currentData.componentData || {}).length > 0 ||
                     currentData.addressData?.propertyAddress;
      
      if (hasData) {
        const jobId = await archiveAndStartFresh(currentData);
        if (jobId) {
          setCurrentJobId(null);
          dataRef.current = null;
          return { success: true, jobId };
        }
      } else {
        // Just clear if no meaningful data
        await clearAllData();
        return { success: true, jobId: null };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Error completing and starting fresh:', error);
      return { success: false, error };
    }
  }, [getCurrentData, archiveAndStartFresh, clearAllData]);

  // Load existing job into current session
  const loadExistingJob = useCallback(async (jobId: string) => {
    try {
      const success = await loadJobIntoSession(jobId);
      if (success) {
        setCurrentJobId(jobId);
        dataRef.current = null; // Force reload
        
        // Immediately refresh data in contexts
        const refreshedData = await getCurrentData();
        
        console.log('Dispatching dataRefreshed event with data:', refreshedData);
        
        // Dispatch detailed refresh event with the actual data
        window.dispatchEvent(new CustomEvent('dataRefreshed', { 
          detail: { 
            jobId, 
            data: refreshedData,
            timestamp: Date.now() 
          } 
        }));
        
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error('Error loading existing job:', error);
      return { success: false, error };
    }
  }, [loadJobIntoSession, getCurrentData]);

  // Get all data
  const getAllData = useCallback(async () => {
    return getCurrentData();
  }, [getCurrentData]);

  return {
    // Core operations
    saveData,
    getAllData,
    clearAllData,
    
    // Job management
    completeAndStartFresh,
    loadExistingJob,
    currentJobId,
    
    // MongoDB integration
    createAssessment,
    
    // Component-specific operations
    loadComponentData,
    saveComponentData,
    
    // Section-specific operations
    updateReportSection,
    updateAddressData,
    updateProgress,
    
    // Status
    isSaving,
    lastSaved,
    
    // Legacy compatibility methods
    loadData: getCurrentData,
    getCurrentData
  };
};
