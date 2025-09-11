import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PropertyData {
  address?: string;
  propertyType?: string;
  reportType?: string;
  propertyId?: string;
  [key: string]: any;
}

interface ReportFormState {
  currentStep: number;
  propertyData: PropertyData;
  reportData: any;
  selectedSections: string[];
  enhancedAnalysisData: any;
  
  // Actions
  setCurrentStep: (step: number) => void;
  updatePropertyData: (data: Partial<PropertyData>) => void;
  updateReportData: (data: any) => void;
  setSelectedSections: (sections: string[]) => void;
  setEnhancedAnalysisData: (data: any) => void;
  clearFormData: () => void;
  resetForm: () => void;
}

const initialState = {
  currentStep: 0,
  propertyData: {
    address: "520 Deakin Avenue Mildura VIC 3500",
    reportType: "long-form",
    propertyType: "commercial"
  },
  reportData: {},
  selectedSections: [],
  enhancedAnalysisData: null,
};

export const useFormStore = create<ReportFormState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentStep: (step) => set({ currentStep: step }),

      updatePropertyData: (data) => set((state) => ({
        propertyData: { ...state.propertyData, ...data }
      })),

      updateReportData: (data) => set((state) => ({
        reportData: { ...state.reportData, ...data }
      })),

      setSelectedSections: (sections) => set({ selectedSections: sections }),

      setEnhancedAnalysisData: (data) => set({ enhancedAnalysisData: data }),

      clearFormData: () => set({
        reportData: {},
        selectedSections: [],
        enhancedAnalysisData: null,
      }),

      resetForm: () => set(initialState),
    }),
    {
      name: 'report-form-storage',
      partialize: (state) => ({ 
        propertyData: state.propertyData,
        reportData: state.reportData,
        currentStep: state.currentStep 
      }),
    }
  )
);