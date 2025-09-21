// Data migration utility to consolidate legacy localStorage data into unified format
import { supabase } from '@/integrations/supabase/client';

interface LegacyData {
  reportData?: any;
  propertyAddressData?: any;
  assessmentProgress?: any;
  componentData?: Record<string, any>;
}

export const migrateLegacyData = async (): Promise<boolean> => {
  try {
    console.log('🔄 Starting data migration to unified format...');
    
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id || 'demo_user';
    
    // Check if migration already done
    const existingUnified = localStorage.getItem(`unified_property_data_${userId}`);
    if (existingUnified) {
      console.log('✅ Unified data already exists, skipping migration');
      return true;
    }
    
    const legacyData: LegacyData = {};
    const componentsData: Record<string, any> = {};
    
    // Collect legacy data
    const legacyKeys = [
      'reportData',
      'propertyAddressData', 
      `report_PropertyAssessmentForm_${userId}`,
      `global_report_tracking_${userId}`,
      'workingHubFiles'
    ];
    
    // Collect component-specific data
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      // Legacy useUniversalSave format
      if (key.startsWith(`report_`) && key.includes('_')) {
        const componentName = key.split('_')[1];
        const savedData = localStorage.getItem(key);
        if (savedData) {
          try {
            const parsed = JSON.parse(savedData);
            componentsData[componentName] = parsed;
          } catch (e) {
            console.warn(`Failed to parse legacy data for ${componentName}:`, e);
          }
        }
      }
      
      // Legacy useSaveSystem format
      if (key.startsWith('save_')) {
        const componentName = key.replace('save_', '');
        const savedData = localStorage.getItem(key);
        if (savedData) {
          try {
            const parsed = JSON.parse(savedData);
            componentsData[componentName] = parsed;
          } catch (e) {
            console.warn(`Failed to parse save data for ${componentName}:`, e);
          }
        }
      }
    });
    
    // Get main data sections
    legacyKeys.forEach(key => {
      const data = localStorage.getItem(key);
      if (data) {
        try {
          const parsed = JSON.parse(data);
          if (key === 'reportData') {
            legacyData.reportData = parsed;
          } else if (key === 'propertyAddressData') {
            legacyData.propertyAddressData = parsed;
          } else if (key.includes('PropertyAssessmentForm')) {
            legacyData.assessmentProgress = {
              currentStep: parsed.currentStep || 0,
              completedSteps: parsed.completedSteps || []
            };
          }
        } catch (e) {
          console.warn(`Failed to parse legacy data for ${key}:`, e);
        }
      }
    });
    
    // Create unified data structure
    const unifiedData = {
      reportData: legacyData.reportData || {},
      addressData: legacyData.propertyAddressData || {
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
      assessmentProgress: legacyData.assessmentProgress || {
        currentStep: 0,
        completedSteps: []
      },
      componentData: componentsData,
      lastUpdated: new Date().toISOString(),
      userId,
      isDemo: !user
    };
    
    // Save unified data
    localStorage.setItem(`unified_property_data_${userId}`, JSON.stringify(unifiedData));
    localStorage.setItem(`unified_property_data_backup_${userId}`, JSON.stringify(unifiedData));
    
    console.log('✅ Data migration completed successfully');
    console.log('📊 Migrated data summary:', {
      reportSections: Object.keys(unifiedData.reportData).length,
      componentSections: Object.keys(unifiedData.componentData).length,
      hasAddress: !!unifiedData.addressData.propertyAddress,
      currentStep: unifiedData.assessmentProgress.currentStep
    });
    
    // Optionally clean up legacy data (commented out for safety)
    /*
    legacyKeys.forEach(key => localStorage.removeItem(key));
    allKeys.forEach(key => {
      if (key.startsWith('report_') || key.startsWith('save_')) {
        localStorage.removeItem(key);
      }
    });
    */
    
    return true;
  } catch (error) {
    console.error('❌ Data migration failed:', error);
    return false;
  }
};

// Auto-run migration on import (only in browser)
if (typeof window !== 'undefined') {
  // Run migration after a short delay to allow app to initialize
  setTimeout(() => {
    migrateLegacyData().then(success => {
      if (success) {
        console.log('🎉 Legacy data migration completed');
      }
    });
  }, 1000);
}