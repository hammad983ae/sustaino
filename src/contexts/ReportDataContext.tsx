import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUnifiedDataManager } from '@/hooks/useUnifiedDataManager';

export interface ReportData {
  // Planning Data
  planningData?: {
    lga?: string;
    zoning?: string;
    zoneName?: string;
    zoneDescription?: string;
    currentUse?: string;
    permittedUse?: string;
    lotNumber?: string;
    planNumber?: string;
    overlays?: string[];
    heightRestrictions?: string;
    setbacks?: string;
    developmentPotential?: string;
    permitRequired?: boolean;
    planningScheme?: string;
    mapReference?: string;
    coordinates?: { lat: number; lng: number };
    address?: string;
    planningImage?: string;
    heritage?: string;
    floodRisk?: string;
    bushfireRisk?: string;
    riskAssessment?: {
      heritage?: string;
      flooding?: string;
      bushfire?: string;
      contamination?: string;
    };
    coreDetails?: {
      commercial?: string;
      landUse?: string;
      development?: string;
      planningScheme?: string;
    };
    [key: string]: any;
  };
  
  // Property Search Data
  propertySearchData?: {
    address?: string;
    confirmedAddress?: string;
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
    propertyAddress?: string;
    lotNumber?: string;
    planNumber?: string;
    coordinates?: { lat: number; lng: number };
    status?: string;
    extractedFrom?: string;
    [key: string]: any;
  };
  
  // Market Commentary
  marketCommentary?: {
    analysis?: string;
    trends?: string;
    comparables?: string;
    status?: string;
    extractedFrom?: string;
    [key: string]: any;
  };
  
  // Environmental Assessment
  environmentalAssessment?: {
    epaData?: string;
    sustainability?: string;
    contamination?: string;
    status?: string;
    extractedFrom?: string;
    note?: string;
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
    instructingParty?: string;
    reliantParty?: string;
    valuationPurpose?: string;
    includeRentalValuation?: boolean;
    rentalAssessmentType?: string;
    rentalBasis?: string;
    customRentalBasis?: string;
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
  
  // Tenancy and Lease Details
  tenancyDetails?: {
    groundLease?: {
      include?: boolean;
      leaseType?: string;
      leaseTerm?: number;
      annualGroundRent?: number;
      reviewPeriod?: number;
      commencementDate?: string;
      expiryDate?: string;
      nextReviewDate?: string;
      reviewMethod?: string;
      permittedUse?: string;
      restrictions?: string;
      impact?: string;
      leaseOptions?: {
        optionToRenew?: boolean;
        optionToPurchase?: boolean;
        surrenderClause?: boolean;
        breakClause?: boolean;
      };
    };
    tenantSummary?: {
      include?: boolean;
      lessor?: string;
      lessee?: string;
      commencementDate?: string;
      expiryDate?: string;
      optionsTerms?: string;
      reviewDate?: string;
      reviewMethod?: string;
      outgoings?: number;
      commencementRent?: number;
      incentives?: number;
      repairsMaintenance?: string;
    };
    [key: string]: any;
  };

  // Risk Assessment and Market Analysis
  riskAssessment?: {
    includePestelAnalysis?: boolean;
    includeSwotAnalysis?: boolean;
    includeTowsAnalysis?: boolean;
    pestelFactors?: {
      political?: string;
      economic?: string;
      social?: string;
      technological?: string;
      environmental?: string;
      legal?: string;
    };
    swotAnalysis?: {
      strengthsText?: string;
      weaknessesText?: string;
      opportunitiesText?: string;
      threatsText?: string;
    };
    towsStrategies?: {
      soStrategies?: string;
      woStrategies?: string;
      stStrategies?: string;
      wtStrategies?: string;
    };
    [key: string]: any;
  };

  // Sales History and Transaction Analysis
  salesHistory?: {
    includePreviousSales?: boolean;
    includeCurrentSale?: boolean;
    lastSaleDate?: string;
    lastSalePrice?: number;
    saleMethod?: string;
    saleHistoryNotes?: string;
    supportingDocuments?: Array<{
      id: string;
      name: string;
      url: string;
    }>;
    transactionAnalysis?: {
      dateOfTransaction?: string;
      dateOfValuation?: string;
      marketTrends?: string;
      priceVariation?: string;
      transactionReliability?: string;
      valuationImpact?: string;
      overallComments?: string;
    };
    [key: string]: any;
  };

  // Valuation Certificate
  valuationCertificate?: {
    propertyAddress?: string;
    titleReference?: string;
    propertyType?: string;
    interestValued?: string;
    purposeOfValuation?: string;
    valueComponent?: string;
    mortgageSecurity?: string;
    dateOfValuation?: string;
    dateOfInspection?: string;
    certificateDetails?: {
      marketValue?: number;
      highestAndBestUse?: string;
      caveats?: string;
      gstTreatment?: string;
      currency?: string;
    };
    professionalCertification?: {
      valuersName?: string;
      professionalQualification?: string;
      registrationNumber?: string;
      valuationFirm?: string;
    };
    [key: string]: any;
  };

  // Valuation Analysis
  valuationAnalysis?: {
    activeApproaches?: string[];
    selectedApproaches?: string[];
    [key: string]: any;
  };

  // Legal and Planning
  legalAndPlanning?: {
    lga?: string;
    zoning?: string;
    currentUse?: string;
    [key: string]: any;
  };

  // Property Details
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

  // Executive Summary
  executiveSummary?: {
    content?: string;
    lastUpdated?: string;
  };

  // Statutory Assessment
  statutoryAssessment?: {
    included?: boolean;
    assessmentDate?: string;
    currentStatutoryValue?: string;
    landValue?: string;
    capitalImprovedValue?: string;
    annualRates?: string;
    assessingAuthority?: string;
    landTax?: string;
    windfallTax?: string;
    stampDuty?: string;
    assessmentNotes?: string;
    uploadedDocuments?: string[];
    [key: string]: any;
  };

  lastUpdated?: string;
  
  // Generated sections from assessment workflow
  generatedSections?: {
    [key: string]: any;
  };
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
  const { getAllData, updateReportSection, clearAllData } = useUnifiedDataManager();

  // Load data from unified manager on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const unifiedData = await getAllData();
        if (unifiedData?.reportData) {
          setReportData(unifiedData.reportData);
        }
      } catch (error) {
        console.error('Error loading unified report data:', error);
      }
    };
    
    loadData();
  }, [getAllData]);

  // Listen for unified data changes and data refresh events
  useEffect(() => {
    const handleUnifiedDataClear = () => {
      setReportData({});
    };

    const handleDataRefresh = async (event: CustomEvent) => {
      const { data } = event.detail;
      if (data?.reportData) {
        setReportData(data.reportData);
      }
    };

    window.addEventListener('unifiedDataCleared', handleUnifiedDataClear);
    window.addEventListener('dataRefreshed', handleDataRefresh as EventListener);
    return () => {
      window.removeEventListener('unifiedDataCleared', handleUnifiedDataClear);
      window.removeEventListener('dataRefreshed', handleDataRefresh as EventListener);
    };
  }, []);

  const updateReportData = async (section: keyof ReportData, data: any) => {
    // Update local state immediately for UI responsiveness
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

    // Save to unified manager with debounce
    await updateReportSection(section, data, { debounceMs: 1000 });
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

  const clearReportData = async () => {
    setReportData({});
    await clearAllData();
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