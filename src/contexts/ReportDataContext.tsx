import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ReportData {
  // Planning Data
  planningData?: {
    lga?: string;
    zoning?: string;
    currentUse?: string;
    lotNumber?: string;
    planNumber?: string;
    overlays?: string[];
    heightRestrictions?: string;
    setbacks?: string;
    [key: string]: any;
  };
  
  // Property Search Data
  propertySearchData?: {
    address?: string;
    lotPlan?: string;
    propertyType?: string;
    landArea?: string;
    buildingArea?: string;
    [key: string]: any;
  };
  
  // Location Analysis
  locationData?: {
    location?: string;
    access?: string;
    siteDescription?: string;
    neighbourhood?: string;
    amenities?: string;
    services?: string;
    [key: string]: any;
  };
  
  // Property Identification
  propertyIdentification?: {
    physicalInspection?: boolean;
    surveyorPeg?: boolean;
    plan?: boolean;
    cadastralMap?: boolean;
    certificateTitle?: boolean;
    aerialMapping?: boolean;
    includeInReport?: boolean;
    other?: string;
    otherChecked?: boolean;
  };
  
  // Report Configuration
  reportConfig?: {
    reportType?: string;
    propertyType?: string;
    valuationBasis?: string;
    valuationApproaches?: string[];
    valueComponent?: string;
    interestValues?: string;
    customBasis?: string;
    [key: string]: any;
  };
  
  // File Attachments
  fileAttachments?: {
    propertyPhotos?: Array<{
      id: string;
      name: string;
      url: string;
      description?: string;
    }>;
    propertyDocuments?: Array<{
      id: string;
      name: string;
      url: string;
      description?: string;
    }>;
    planningDocuments?: Array<{
      id: string;
      name: string;
      url: string;
      description?: string;
    }>;
    marketEvidence?: Array<{
      id: string;
      name: string;
      url: string;
      description?: string;
    }>;
    [key: string]: any;
  };
  
  // Additional report sections
  legalAndPlanning?: {
    lga?: string;
    zoning?: string;
    currentUse?: string;
    [key: string]: any;
  };

  valuationCertificate?: {
    valueComponent?: string;
    valuationBasis?: string;
    interestValues?: string;
    [key: string]: any;
  };

  valuationAnalysis?: {
    activeApproaches?: string[];
    selectedApproaches?: string[];
    [key: string]: any;
  };

  propertyDetails?: {
    propertyType?: string;
    reportType?: string;
    [key: string]: any;
  };

  // Professional Declarations
  professionalDeclarations?: {
    conflictOfInterest?: string;
    inScopeItems?: string[];
    outOfScopeItems?: string[];
    professionalIndemnity?: boolean;
    cpvCompliance?: boolean;
    declarations?: string[];
    [key: string]: any;
  };

  lastUpdated?: string;
}

interface ReportDataContextType {
  reportData: ReportData;
  updateReportData: (section: keyof ReportData, data: any) => void;
  getIntegratedData: () => ReportData;
  clearReportData: () => void;
}

const ReportDataContext = createContext<ReportDataContextType | undefined>(undefined);

export const ReportDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reportData, setReportData] = useState<ReportData>({});

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('reportData');
    if (savedData) {
      try {
        setReportData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading report data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('reportData', JSON.stringify(reportData));
  }, [reportData]);

  const updateReportData = (section: keyof ReportData, data: any) => {
    setReportData(prev => {
      const currentSection = prev[section];
      const updatedSection = currentSection && typeof currentSection === 'object' 
        ? { ...currentSection, ...data }
        : data;
      
      return {
        ...prev,
        [section]: updatedSection,
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const getIntegratedData = (): ReportData => {
    // Integrate planning data with property data
    const integrated = { ...reportData };
    
    // Transfer lot/plan from planning to property sections
    if (integrated.planningData?.lotNumber || integrated.planningData?.planNumber) {
      integrated.propertySearchData = {
        ...(integrated.propertySearchData || {}),
        lotNumber: integrated.planningData.lotNumber,
        planNumber: integrated.planningData.planNumber
      };
    }
    
    // Transfer LGA, zoning from planning to location
    if (integrated.planningData?.lga || integrated.planningData?.zoning || integrated.planningData?.currentUse) {
      integrated.locationData = {
        ...(integrated.locationData || {}),
        lga: integrated.planningData.lga,
        zoning: integrated.planningData.zoning,
        currentUse: integrated.planningData.currentUse
      };
    }
    
    return integrated;
  };

  const clearReportData = () => {
    setReportData({});
    localStorage.removeItem('reportData');
  };

  return (
    <ReportDataContext.Provider value={{
      reportData,
      updateReportData,
      getIntegratedData,
      clearReportData
    }}>
      {children}
    </ReportDataContext.Provider>
  );
};

export const useReportData = () => {
  const context = useContext(ReportDataContext);
  if (context === undefined) {
    throw new Error('useReportData must be used within a ReportDataProvider');
  }
  return context;
};