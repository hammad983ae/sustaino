import React, { createContext, useContext, useState, useEffect } from 'react';
import { useReportData } from '@/contexts/ReportDataContext';

interface SectionConfig {
  id: string;
  name: string;
  description: string;
  required: boolean;
  included: boolean;
  category: 'core' | 'optional' | 'supplementary';
  priority: number;
}

interface PAFFlowConfig {
  sections: Record<string, SectionConfig>;
  skipExcludedSections: boolean;
  prefillingEnabled: boolean;
  currentEnabledSteps: string[];
}

interface PAFConfigContextType {
  flowConfig: PAFFlowConfig;
  updateSectionConfig: (sectionId: string, updates: Partial<SectionConfig>) => void;
  toggleSection: (sectionId: string, included: boolean) => void;
  isStepEnabled: (stepId: string) => boolean;
  getEnabledSteps: () => string[];
  shouldSkipStep: (stepId: string) => boolean;
  prefillReportData: (stepId: string, data: any) => void;
  getPrefilledData: (stepId: string) => any;
}

const PAFConfigContext = createContext<PAFConfigContextType | undefined>(undefined);

const defaultSections: Record<string, SectionConfig> = {
  // Core workflow steps (always enabled)
  property_address: {
    id: 'property_address',
    name: 'Property Address',
    description: 'Property identification and address confirmation',
    required: true,
    included: true,
    category: 'core',
    priority: 1
  },
  report_configuration: {
    id: 'report_configuration',
    name: 'Report Configuration',
    description: 'Report settings and client information',
    required: true,
    included: true,
    category: 'core',
    priority: 2
  },
  
  // Main content sections (configurable)
  planning_search: {
    id: 'planning_search',
    name: 'Planning Search',
    description: 'Planning data and zoning information',
    required: false,
    included: true,
    category: 'optional',
    priority: 3
  },
  search_analysis: {
    id: 'search_analysis',
    name: 'Search & Analysis',
    description: 'Property search and market analysis',
    required: false,
    included: true,
    category: 'optional',
    priority: 4
  },
  property_photos: {
    id: 'property_photos',
    name: 'Property Photos',
    description: 'Visual assessment and photo documentation',
    required: false,
    included: true,
    category: 'optional',
    priority: 5
  },
  accountancy_financials: {
    id: 'accountancy_financials',
    name: 'Accountancy & Financials',
    description: 'Integration with accounting software and government portals',
    required: false,
    included: true,
    category: 'optional',
    priority: 6
  },
  sales_leasing: {
    id: 'sales_leasing',
    name: 'Sales & Leasing Recommendations',
    description: 'AI-powered sales and leasing strategy recommendations',
    required: false,
    included: true,
    category: 'optional',
    priority: 7
  },
  rental_configuration: {
    id: 'rental_configuration',
    name: 'Rental Configuration',
    description: 'Detailed rental valuation settings',
    required: false,
    included: false,
    category: 'supplementary',
    priority: 8
  },
  risk_assessment: {
    id: 'risk_assessment',
    name: 'Risk Assessment',
    description: 'Property and market risk analysis',
    required: false,
    included: true,
    category: 'optional',
    priority: 9
  },
  environmental_assessment: {
    id: 'environmental_assessment',
    name: 'Environmental Assessment',
    description: 'Environmental factors and sustainability',
    required: false,
    included: true,
    category: 'optional',
    priority: 10
  },
  intelligent_enhancement: {
    id: 'intelligent_enhancement',
    name: 'Intelligent Enhancement',
    description: 'AI-powered data enhancement and analysis',
    required: false,
    included: true,
    category: 'optional',
    priority: 11
  },
  
  // Final steps (always included)
  review_generate: {
    id: 'review_generate',
    name: 'Review & Generate',
    description: 'Final review and report generation',
    required: true,
    included: true,
    category: 'core',
    priority: 12
  },
  assessment_complete: {
    id: 'assessment_complete',
    name: 'Assessment Complete',
    description: 'Assessment completion and summary',
    required: true,
    included: true,
    category: 'core',
    priority: 13
  }
};

export const PAFConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { reportData, updateReportData } = useReportData();
  const [flowConfig, setFlowConfig] = useState<PAFFlowConfig>({
    sections: defaultSections,
    skipExcludedSections: true,
    prefillingEnabled: true,
    currentEnabledSteps: []
  });

  // Initialize from saved report configuration
  useEffect(() => {
    if (reportData?.reportConfig?.sections) {
      const savedSections = reportData.reportConfig.sections;
      setFlowConfig(prev => ({
        ...prev,
        sections: {
          ...prev.sections,
          ...Object.keys(savedSections).reduce((acc, key) => {
            if (prev.sections[key]) {
              acc[key] = {
                ...prev.sections[key],
                included: savedSections[key].included ?? prev.sections[key].included
              };
            }
            return acc;
          }, {} as Record<string, SectionConfig>)
        }
      }));
    }
  }, [reportData?.reportConfig?.sections]);

  // Calculate enabled steps whenever configuration changes
  useEffect(() => {
    const enabledSteps = Object.values(flowConfig.sections)
      .filter(section => section.required || section.included)
      .sort((a, b) => a.priority - b.priority)
      .map(section => section.id);
    
    setFlowConfig(prev => ({
      ...prev,
      currentEnabledSteps: enabledSteps
    }));
  }, [flowConfig.sections]);

  const updateSectionConfig = (sectionId: string, updates: Partial<SectionConfig>) => {
    setFlowConfig(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionId]: {
          ...prev.sections[sectionId],
          ...updates
        }
      }
    }));

    // Save to report data
    const updatedSection = { ...flowConfig.sections[sectionId], ...updates };
    updateReportData('reportConfig', {
      ...reportData?.reportConfig,
      sections: {
        ...reportData?.reportConfig?.sections,
        [sectionId]: updatedSection
      }
    });
  };

  const toggleSection = (sectionId: string, included: boolean) => {
    updateSectionConfig(sectionId, { included });
  };

  const isStepEnabled = (stepId: string): boolean => {
    const section = flowConfig.sections[stepId];
    return section ? (section.required || section.included) : false;
  };

  const getEnabledSteps = (): string[] => {
    return flowConfig.currentEnabledSteps;
  };

  const shouldSkipStep = (stepId: string): boolean => {
    if (!flowConfig.skipExcludedSections) return false;
    const section = flowConfig.sections[stepId];
    return section ? (!section.required && !section.included) : true;
  };

  const prefillReportData = (stepId: string, data: any) => {
    if (!flowConfig.prefillingEnabled) return;

    // Map step data to appropriate report data sections
    const sectionMapping: Record<string, keyof any> = {
      planning_search: 'planningData',
      search_analysis: 'searchAnalysis',
      property_photos: 'propertyPhotos',
      accountancy_financials: 'accountingFinancials',
      sales_leasing: 'salesLeasingRecommendations',
      rental_configuration: 'rentalConfiguration',
      risk_assessment: 'riskAssessment',
      environmental_assessment: 'environmentalAssessment',
      intelligent_enhancement: 'intelligentEnhancement'
    };

    const reportDataKey = sectionMapping[stepId];
    if (reportDataKey && reportData) {
      // Use type assertion for dynamic key access
      updateReportData(reportDataKey as any, {
        ...(reportData as any)[reportDataKey],
        ...data,
        lastUpdated: new Date().toISOString(),
        source: 'paf_prefill',
        sectionIncluded: isStepEnabled(stepId)
      });
    }

    // Store step completion in a generic way
    const stepStatus = {
      ...((reportData as any)?.stepStatus || {}),
      [stepId]: {
        completed: true,
        included: isStepEnabled(stepId),
        data: data,
        timestamp: new Date().toISOString()
      }
    };
    
    updateReportData('stepStatus' as any, stepStatus);
  };

  const getPrefilledData = (stepId: string): any => {
    const sectionMapping: Record<string, string> = {
      planning_search: 'planningData',
      search_analysis: 'searchAnalysis',
      property_photos: 'propertyPhotos',
      accountancy_financials: 'accountingFinancials',
      sales_leasing: 'salesLeasingRecommendations',
      rental_configuration: 'rentalConfiguration',
      risk_assessment: 'riskAssessment',
      environmental_assessment: 'environmentalAssessment',
      intelligent_enhancement: 'intelligentEnhancement'
    };

    const reportDataKey = sectionMapping[stepId];
    return reportDataKey && reportData ? (reportData as any)[reportDataKey] : null;
  };

  const contextValue: PAFConfigContextType = {
    flowConfig,
    updateSectionConfig,
    toggleSection,
    isStepEnabled,
    getEnabledSteps,
    shouldSkipStep,
    prefillReportData,
    getPrefilledData
  };

  return (
    <PAFConfigContext.Provider value={contextValue}>
      {children}
    </PAFConfigContext.Provider>
  );
};

export const usePAFConfig = (): PAFConfigContextType => {
  const context = useContext(PAFConfigContext);
  if (!context) {
    throw new Error('usePAFConfig must be used within a PAFConfigProvider');
  }
  return context;
};

// Hook for components to check if they should render
export const useStepVisibility = (stepId: string) => {
  const { isStepEnabled, shouldSkipStep } = usePAFConfig();
  
  return {
    isEnabled: isStepEnabled(stepId),
    shouldSkip: shouldSkipStep(stepId),
    shouldRender: isStepEnabled(stepId) && !shouldSkipStep(stepId)
  };
};

// Hook for automatic report data prefilling
export const useReportPrefill = (stepId: string) => {
  const { prefillReportData, getPrefilledData } = usePAFConfig();
  
  const prefill = (data: any) => {
    prefillReportData(stepId, data);
  };

  const getPrefilled = () => {
    return getPrefilledData(stepId);
  };

  return {
    prefill,
    getPrefilled,
    existingData: getPrefilled()
  };
};