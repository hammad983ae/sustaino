// Legacy compatibility wrapper for useUniversalSave
// This provides backward compatibility while components are migrated to useUnifiedDataManager

import { useUnifiedDataManager } from './useUnifiedDataManager';

interface SaveOptions {
  showToast?: boolean;
  autoSave?: boolean;
  debounceMs?: number;
}

export const useUniversalSave = (sectionName: string, options: SaveOptions = {}) => {
  const { 
    saveComponentData, 
    loadComponentData, 
    isSaving, 
    lastSaved 
  } = useUnifiedDataManager();

  const saveData = async (data: any) => {
    return saveComponentData(sectionName, data, {
      showToast: options.showToast ?? true,
      debounceMs: options.debounceMs ?? 1000
    });
  };

  const loadData = async () => {
    return loadComponentData(sectionName);
  };

  const clearData = async () => {
    return saveComponentData(sectionName, null, { showToast: false });
  };

  return {
    saveData,
    loadData,
    clearData,
    isSaving,
    lastSaved
  };
};