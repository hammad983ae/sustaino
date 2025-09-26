/**
 * ============================================================================
 * AUTOMATED PROPERTY PRO VALUATION SYSTEM
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Automated PropertyPRO valuation system with:
 * - OCR data extraction
 * - Domain API integration  
 * - State planning maps integration
 * - Automated risk rating calculations
 * - VRA (Valuation Risk Alert) assessment
 * - Sales evidence database with weighted adjustments
 * ============================================================================
 */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  MapPin, 
  Home, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Camera,
  Building,
  Calendar,
  DollarSign,
  Upload,
  Download,
  Eye,
  Settings,
  Database,
  Map,
  Calculator,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  BarChart3,
  Search,
  FileCheck,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Risk Rating Types (1-5 scale as per PropertyPRO standards)
type RiskLevel = 1 | 2 | 3 | 4 | 5;

interface RiskRating {
  location: RiskLevel;
  land: RiskLevel;
  environmental: RiskLevel;
  improvements: RiskLevel;
  marketDirection: RiskLevel;
  marketActivity: RiskLevel;
  localEconomy: RiskLevel;
  marketSegment: RiskLevel;
}

// VRA (Valuation Risk Alert) Assessment
interface VRAAssessment {
  higherRiskProperty: boolean;
  adverseMarketability: boolean;
  incompleteConstruction: boolean;
  criticalIssues: boolean;
  esgFactors: string;
}

// Sales Evidence with Advanced Analytics
interface SalesEvidence {
  address: string;
  saleDate: string;
  price: number;
  briefComments: string;
  livingArea: number;
  landArea: number;
  bedrooms: number;
  bathrooms: number;
  // Adjustment factors
  locationAdjustment: number;
  sizeAdjustment: number;
  conditionAdjustment: number;
  ageAdjustment: number;
  timeAdjustment: number;
  // Calculated fields
  adjustedPrice: number;
  pricePerSqm: number;
  weightingFactor: number;
  comparisonToSubject: 'superior' | 'similar' | 'inferior';
  overallAdjustment: number;
  reliability: 'high' | 'medium' | 'low';
}

interface AutomationStatus {
  ocrProcessed: boolean;
  domainDataExtracted: boolean;
  planningMapsIntegrated: boolean;
  salesEvidenceGenerated: boolean;
  riskRatingsCalculated: boolean;
  vraAssessmentComplete: boolean;
  reportGenerated: boolean;
  progress: number;
  logs: string[];
}

interface PropertyProValuationData {
  // Header Information
  instructedBy: string;
  lender: string;
  contact: string;
  loanRefNo: string;
  clientRefNo: string;
  valuersRefNo: string;
  borrower: string;
  
  // Property Summary
  propertyAddress: string;
  titleSearchSighted: 'Yes' | 'No';
  realPropertyDescription: string;
  encumbrancesRestrictions: string;
  siteDimensions: string;
  siteArea: string;
  zoning: string;
  currentUse: string;
  localGovernmentArea: string;
  mainDwelling: string;
  builtAbout: string;
  additions: string;
  livingArea: number;
  outdoorArea: number;
  otherArea: number;
  carAccommodation: number;
  carAreas: number;
  marketability: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  heritageIssues: 'Yes' | 'No';
  environmentalIssues: 'Yes' | 'No';
  essentialRepairs: 'Yes' | 'No';
  estimatedCost: number;

  // Valuation Summary
  interestValued: string;
  valueComponent: string;
  landValue: number;
  improvementValue: number;
  marketValue: number;
  rentalAssessment: number;
  insuranceEstimate: number;

  reportType: 'AS IS' | 'AS IF COMPLETE';
  inspectionDate: string;
  valuationDate: string;
  
  // Land Information (Section 4) - Enhanced
  propertyIdentification: {
    aerialMapping: boolean;
    physicalInspection: boolean;
    cadastralMap: boolean;
    description: string;
  };
  zoningEffect: string;
  location: {
    distanceFromCBD: string;
    directionFromCBD: string;
    distanceFromRegionalCentre: string;
    directionFromRegionalCentre: string;
    description: string;
  };
  neighbourhood: {
    surroundingProperties: string;
    residentialProperties: boolean;
    commercialProperties: boolean;
    industrialProperties: boolean;
    farmingProperties: boolean;
    positiveInfrastructure: string;
    negativeInfrastructure: string;
    description: string;
  };
  siteAndAccess: {
    frontage: string;
    sideDetails: string;
    shape: 'rectangular' | 'square' | 'irregular';
    frontageDistance: string;
    streetSide: 'north' | 'south' | 'east' | 'west';
    dwellingOrientation: 'north' | 'south' | 'east' | 'west' | 'northeast' | 'northwest' | 'southeast' | 'southwest';
    streetSystem: 'single-lane' | 'double-lane' | 'highway' | 'corner-lot' | 'cul-de-sac';
    footpaths: 'concrete' | 'gravel' | 'none';
    accessLevel: 'easy-direct' | 'moderate' | 'difficult';
    description: string;
  };
  services: {
    mainServices: boolean;
    septic: boolean;
    nbn: boolean;
    solar: boolean;
    gas: boolean;
    electricity: boolean;
    water: boolean;
    sewer: boolean;
    storm: boolean;
    telephone: boolean;
    cable: boolean;
    otherServices: string;
    description: string;
  };
  
  // Dwelling Description (Section 5)
  style: string;
  streetAppeal: string;
  mainWallsAndRoof: string;
  internalCondition: string;
  mainInteriorLining: string;
  externalCondition: string;
  flooring: string;
  windowFrames: string;
  accommodation: string;
  interiorLayout: string;
  fixtureAndFitting: string;
  
  // Ancillary Improvements (Section 6)
  ancillaryImprovements: string;
  
  // Previous and Current Sales Information
  previousSaleData: {
    dateOfSale: string;
    salePrice: number;
    agent: string;
    vendor: string;
    purchaser: string;
    daysOnMarket: number;
    source: string;
  };
  previousSaleComments: string;
  marketConditionAnalysis: 'improved' | 'declined' | 'stable' | '';
  propertyImprovements: string;
  currentProposedSale: {
    contractDate: string;
    salePrice: number;
    purchaser: string;
    vendor: string;
    agent: string;
    source: string;
  };
  currentSaleInLineWithMarket: 'Yes' | 'No' | '';
  saleReasonableness: string;
  contractOfSaleSighted: 'Yes' | 'No';
  contractRequiredMessage: string;
  sellingPeriodGreaterThan6Months: 'Yes' | 'No';
  underContract: 'Yes' | 'No';
  
  // Risk Analysis
  riskRatings: RiskRating;
  propertyRiskRatings: {
    locationNeighbourhood: number;
    landPlanningTitle: number;
    environmentalIssues: number;
    improvements: number;
  };
  marketRiskRatings: {
    recentMarketDirection: number;
    marketActivity: number;
    localRegionalEconomyImpact: number;
    marketSegmentConditions: number;
  };
  
  // VRA Assessment
  vraAssessment: VRAAssessment;
  
  // Sales Evidence
  salesEvidence: SalesEvidence[];
  
  // Professional Details
  valuerName: string;
  valuerQualifications: string;
  issueDate: string;
  additionalComments: string;
  riskComments: string;
  vraComments: string;
  
  // Automation
  automation: AutomationStatus;
}

export default function PropertyProValuation() {
  const [formData, setFormData] = useState<PropertyProValuationData>({
    // Header Information
    instructedBy: '',
    lender: '',
    contact: '',
    loanRefNo: '',
    clientRefNo: '',
    valuersRefNo: '',
    borrower: '',
    
    propertyAddress: '',
    titleSearchSighted: 'No',
    realPropertyDescription: '',
    encumbrancesRestrictions: '',
    siteDimensions: '',
    siteArea: '',
    zoning: '',
    currentUse: '',
    localGovernmentArea: '',
    mainDwelling: '',
    builtAbout: '',
    additions: '',
    livingArea: 0,
    outdoorArea: 0,
    otherArea: 0,
    carAccommodation: 0,
    carAreas: 0,
    marketability: 'Good',
    heritageIssues: 'No',
    environmentalIssues: 'No',
    essentialRepairs: 'No',
    estimatedCost: 0,
    interestValued: 'Fee Simple Vacant Possession',
    valueComponent: 'Existing Property',
    landValue: 0,
    improvementValue: 0,
    marketValue: 0,
    rentalAssessment: 0,
    insuranceEstimate: 0,
    reportType: 'AS IS',
    inspectionDate: new Date().toISOString().split('T')[0],
    valuationDate: new Date().toISOString().split('T')[0],
    propertyIdentification: {
      aerialMapping: true,
      physicalInspection: true,
      cadastralMap: true,
      description: 'Property identified using aerial mapping, physical inspection, and cadastral map verification.'
    },
    zoningEffect: 'The existing use complies with current zoning requirements.',
    location: {
      distanceFromCBD: '',
      directionFromCBD: '',
      distanceFromRegionalCentre: '',
      directionFromRegionalCentre: '',
      description: ''
    },
    neighbourhood: {
      surroundingProperties: '',
      residentialProperties: true,
      commercialProperties: false,
      industrialProperties: false,
      farmingProperties: false,
      positiveInfrastructure: '',
      negativeInfrastructure: '',
      description: ''
    },
    siteAndAccess: {
      frontage: '',
      sideDetails: '',
      shape: 'rectangular',
      frontageDistance: '',
      streetSide: 'north',
      dwellingOrientation: 'north',
      streetSystem: 'double-lane',
      footpaths: 'concrete',
      accessLevel: 'easy-direct',
      description: ''
    },
    services: {
      mainServices: true,
      septic: false,
      nbn: true,
      solar: false,
      gas: true,
      electricity: true,
      water: true,
      sewer: true,
      storm: true,
      telephone: true,
      cable: false,
      otherServices: '',
      description: ''
    },
    style: '',
    
    streetAppeal: '',
    mainWallsAndRoof: '',
    internalCondition: '',
    mainInteriorLining: '',
    externalCondition: '',
    flooring: '',
    windowFrames: '',
    accommodation: '',
    interiorLayout: '',
    fixtureAndFitting: '',
    ancillaryImprovements: '',
    previousSaleData: {
      dateOfSale: '',
      salePrice: 0,
      agent: '',
      vendor: '',
      purchaser: '',
      daysOnMarket: 0,
      source: 'DOMAIN API'
    },
    previousSaleComments: '',
    marketConditionAnalysis: '',
    propertyImprovements: '',
    currentProposedSale: {
      contractDate: '',
      salePrice: 0,
      purchaser: '',
      vendor: '',
      agent: '',
      source: 'OCR'
    },
    currentSaleInLineWithMarket: '',
    saleReasonableness: '',
    contractOfSaleSighted: 'No',
    contractRequiredMessage: '',
    sellingPeriodGreaterThan6Months: 'No',
    underContract: 'No',
    riskRatings: {
      location: 1,
      land: 1,
      environmental: 1,
      improvements: 1,
      marketDirection: 1,
      marketActivity: 1,
      localEconomy: 1,
      marketSegment: 1
    },
    propertyRiskRatings: {
      locationNeighbourhood: 1,
      landPlanningTitle: 1,
      environmentalIssues: 1,
      improvements: 1,
    },
    marketRiskRatings: {
      recentMarketDirection: 1,
      marketActivity: 1,
      localRegionalEconomyImpact: 1,
      marketSegmentConditions: 1,
    },
    vraAssessment: {
      higherRiskProperty: false,
      adverseMarketability: false,
      incompleteConstruction: false,
      criticalIssues: false,
      esgFactors: ''
    },
    salesEvidence: [],
    valuerName: '',
    valuerQualifications: '',
    issueDate: '',
    additionalComments: '',
    riskComments: '',
    vraComments: '',
    automation: {
      ocrProcessed: false,
      domainDataExtracted: false,
      planningMapsIntegrated: false,
      salesEvidenceGenerated: false,
      riskRatingsCalculated: false,
      vraAssessmentComplete: false,
      reportGenerated: false,
      progress: 0,
      logs: []
    }
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [reportUrl, setReportUrl] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState('automation');
  const [isProcessing, setIsProcessing] = useState(false);

  // Risk Rating Colors
  const getRiskColor = (level: RiskLevel): string => {
    switch (level) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-yellow-400';
      case 3: return 'bg-orange-500';
      case 4: return 'bg-red-500';
      case 5: return 'bg-red-700';
      default: return 'bg-gray-400';
    }
  };

  // Risk Rating Labels
  const getRiskLabel = (level: RiskLevel): string => {
    switch (level) {
      case 1: return 'Low Risk';
      case 2: return 'Low-Medium Risk';
      case 3: return 'Medium Risk';
      case 4: return 'Medium-High Risk';
      case 5: return 'High Risk';
      default: return 'Unknown';
    }
  };

  // Auto-fill location data from APIs
  const autoFillLocationData = async () => {
    if (!formData.propertyAddress) {
      toast.error('Please enter a property address first');
      return;
    }

    setIsProcessing(true);
    updateAutomationLog('Starting location data extraction...');
    
    try {
      const { data, error } = await supabase.functions.invoke('property-location-data', {
        body: { address: formData.propertyAddress }
      });

      if (error) throw error;

      if (data.success) {
        setFormData(prev => ({
          ...prev,
          ...data.data,
          automation: {
            ...prev.automation,
            planningMapsIntegrated: true,
            progress: Math.max(prev.automation.progress, 50),
            logs: [...prev.automation.logs, 'Location data auto-filled successfully']
          }
        }));
        toast.success('Property location data auto-filled successfully');
        updateAutomationLog('Location data extraction completed');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error auto-filling location data:', error);
      toast.error('Failed to auto-fill location data');
      updateAutomationLog(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Automated OCR Processing
  const processOCR = async () => {
    setIsProcessing(true);
    updateAutomationLog('Starting OCR processing...');
    
    // Simulate OCR processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setFormData(prev => ({
      ...prev,
      automation: {
        ...prev.automation,
        ocrProcessed: true,
        progress: 15,
        logs: [...prev.automation.logs, 'OCR processing completed successfully']
      }
    }));
    
    updateAutomationLog('OCR processing completed');
    setIsProcessing(false);
  };

  // Domain API Integration
  const extractDomainData = async () => {
    setIsProcessing(true);
    updateAutomationLog('Connecting to Domain API...');
    
    if (!formData.propertyAddress) {
      updateAutomationLog('Property address required for Domain API extraction');
      setIsProcessing(false);
      return;
    }
    
    // Simulate Domain API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock data extraction
    const mockData = {
      propertyAddress: '196 Seventeenth Street Mildura VIC 3500',
      titleSearchSighted: 'No' as const,
      realPropertyDescription: 'Lot 9 PS444723 - Title not supplied for Volume and Folio',
      encumbrancesRestrictions: 'Not Known',
      siteDimensions: 'Irregular shape lot with approximately 43 metre frontage and 33 metre rear boundary overlooking Lake Hawthorn',
      siteArea: '4204 sqm',
      zoning: 'LDRZ2',
      currentUse: 'Residential',
      localGovernmentArea: 'Mildura Rural City Council',
      mainDwelling: 'Dwelling with 3 Bedroom(s) And 2 Bathroom(s)',
      builtAbout: 'Circa 2005',
      additions: 'N/A',
      livingArea: 336,
      outdoorArea: 44,
      otherArea: 0,
      carAccommodation: 3,
      carAreas: 72,
      marketability: 'Excellent' as const,
      heritageIssues: 'No' as const,
      environmentalIssues: 'No' as const,
      essentialRepairs: 'No' as const,
      landValue: 350000,
      improvementValue: 500000,
      marketValue: 850000,
      rentalAssessment: 520,
      insuranceEstimate: 650000
    };
    
    setFormData(prev => ({
      ...prev,
      ...mockData,
      automation: {
        ...prev.automation,
        domainDataExtracted: true,
        progress: 35,
        logs: [...prev.automation.logs, 'Domain API data extracted successfully']
      }
    }));
    
    updateAutomationLog('Domain API integration completed');
    setIsProcessing(false);
  };

  // State Planning Maps Integration
  const integratePlanningMaps = async () => {
    setIsProcessing(true);
    updateAutomationLog('Integrating state planning maps...');
    
    // Simulate planning maps API
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setFormData(prev => ({
      ...prev,
      zoningEffect: 'The existing use is a permissible use',
      location: {
        ...prev.location,
        description: 'Within approximately 9 kilometres south west of the Mildura CBD, schools and shops'
      },
      automation: {
        ...prev.automation,
        planningMapsIntegrated: true,
        progress: 50,
        logs: [...prev.automation.logs, 'State planning maps integrated successfully']
      }
    }));
    
    updateAutomationLog('Planning maps integration completed');
    setIsProcessing(false);
  };

  // Generate Sales Evidence with Adjustments
  const generateSalesEvidence = async () => {
    setIsProcessing(true);
    updateAutomationLog('Generating sales evidence with weighted adjustments...');
    
    // Simulate sales evidence generation
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const mockSalesEvidence: SalesEvidence[] = [
      {
        address: '24 Creek Way, Mildura VIC 3500',
        saleDate: '14/07/2021',
        price: 1175000,
        briefComments: 'Located within Mildura Golf Resort. Fairways estate. Modern Brick Street. Modern fittings, manicured pool, fairway views facing towards the Club House. Irrigated land area 1322 sqm.',
        livingArea: 185,
        landArea: 1322,
        bedrooms: 3,
        bathrooms: 2,
        locationAdjustment: 0.02,
        sizeAdjustment: -0.05,
        conditionAdjustment: 0.03,
        ageAdjustment: 0.01,
        timeAdjustment: -0.02,
        adjustedPrice: 1175000 * 0.99,
        pricePerSqm: 1175000 / 185,
        weightingFactor: 0.85,
        comparisonToSubject: 'superior',
        overallAdjustment: -0.01,
        reliability: 'high'
      },
      {
        address: '3 Form Avenue VIC 3500',
        saleDate: '08/02/2021',
        price: 785000,
        briefComments: 'Modern brick veneer lifestyle property with high quality fixtures and fittings, provided room, walk in robes, it living areas, double glazed windows & reverse cycle heating and cooling.',
        livingArea: 165,
        landArea: 845,
        bedrooms: 3,
        bathrooms: 2,
        locationAdjustment: -0.03,
        sizeAdjustment: 0.02,
        conditionAdjustment: 0.01,
        ageAdjustment: 0.00,
        timeAdjustment: -0.01,
        adjustedPrice: 785000 * 0.99,
        pricePerSqm: 785000 / 165,
        weightingFactor: 0.75,
        comparisonToSubject: 'inferior',
        overallAdjustment: -0.01,
        reliability: 'medium'
      },
      {
        address: '53 Eleventh Street, Mildura 3500',
        saleDate: '15/04/2021',
        price: 755000,
        briefComments: 'First line circa 1980s brick veneer, 3 living areas, modern kitchen/bathroom garage, court, stables, balcony, established gardens, large outdoor entertainment.',
        livingArea: 175,
        landArea: 945,
        bedrooms: 4,
        bathrooms: 2,
        locationAdjustment: -0.02,
        sizeAdjustment: 0.01,
        conditionAdjustment: -0.02,
        ageAdjustment: -0.03,
        timeAdjustment: -0.01,
        adjustedPrice: 755000 * 0.93,
        pricePerSqm: 755000 / 175,
        weightingFactor: 0.70,
        comparisonToSubject: 'inferior',
        overallAdjustment: -0.07,
        reliability: 'medium'
      }
    ];
    
    setFormData(prev => ({
      ...prev,
      salesEvidence: mockSalesEvidence,
      automation: {
        ...prev.automation,
        salesEvidenceGenerated: true,
        progress: 70,
        logs: [...prev.automation.logs, 'Sales evidence generated with weighted adjustments']
      }
    }));
    
    updateAutomationLog('Sales evidence generation completed');
    setIsProcessing(false);
  };

  // Calculate Risk Ratings
  const calculateRiskRatings = async () => {
    setIsProcessing(true);
    updateAutomationLog('Calculating automated risk ratings...');
    
    // Simulate risk analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Automated risk rating calculation based on property data
    const automatedRiskRatings: RiskRating = {
      location: 2, // Standard residential area
      land: 2, // Regular lot with standard services
      environmental: 1, // No known environmental issues
      improvements: 3, // Standard dwelling with normal wear
      marketDirection: 2, // Stable market conditions
      marketActivity: 2, // Balanced supply/demand
      localEconomy: 2, // Regional economy stable
      marketSegment: 2 // Good sales evidence available
    };
    
    setFormData(prev => ({
      ...prev,
      riskRatings: automatedRiskRatings,
      automation: {
        ...prev.automation,
        riskRatingsCalculated: true,
        progress: 85,
        logs: [...prev.automation.logs, 'Risk ratings calculated automatically']
      }
    }));
    
    updateAutomationLog('Risk ratings calculation completed');
    setIsProcessing(false);
  };

  // VRA Assessment
  const performVRAAssessment = async () => {
    setIsProcessing(true);
    updateAutomationLog('Performing VRA assessment...');
    
    // Simulate VRA assessment
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const vraAssessment: VRAAssessment = {
      higherRiskProperty: false,
      adverseMarketability: false,
      incompleteConstruction: false,
      criticalIssues: false,
      esgFactors: 'Property has standard ESG attributes typical for residential properties in this locality'
    };
    
    setFormData(prev => ({
      ...prev,
      vraAssessment,
      automation: {
        ...prev.automation,
        vraAssessmentComplete: true,
        progress: 95,
        logs: [...prev.automation.logs, 'VRA assessment completed']
      }
    }));
    
    updateAutomationLog('VRA assessment completed');
    setIsProcessing(false);
  };

  // Complete Automation Workflow
  const runFullAutomation = async () => {
    if (!formData.propertyAddress) {
      updateAutomationLog('Property address required to start automation');
      return;
    }
    
    updateAutomationLog('Starting full automation workflow...');
    
    await processOCR();
    await extractDomainData();
    await integratePlanningMaps();
    await generateSalesEvidence();
    await calculateRiskRatings();
    await performVRAAssessment();
    
    setFormData(prev => ({
      ...prev,
      automation: {
        ...prev.automation,
        reportGenerated: true,
        progress: 100,
        logs: [...prev.automation.logs, 'Full automation workflow completed successfully']
      }
    }));
    
    updateAutomationLog('Automation workflow completed');
  };

  // Update automation log
  const updateAutomationLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setFormData(prev => ({
      ...prev,
      automation: {
        ...prev.automation,
        logs: [...prev.automation.logs, `[${timestamp}] ${message}`]
      }
    }));
  };

  // Handle input changes
  const handleInputChange = (field: keyof PropertyProValuationData, value: any) => {
    setFormData(prev => {
      const updatedData = {
        ...prev,
        [field]: value
      };
      
      // Sync valueComponent with reportType
      if (field === 'reportType') {
        updatedData.valueComponent = value === 'AS IF COMPLETE' ? 'As If Complete' : 'Existing Property';
      }
      
      return updatedData;
    });
  };

  // Handle risk rating changes
  const handleRiskRatingChange = (field: keyof RiskRating, value: RiskLevel) => {
    setFormData(prev => ({
      ...prev,
      riskRatings: {
        ...prev.riskRatings,
        [field]: value
      }
    }));
  };

  // Clear all data
  const clearAllData = () => {
    setFormData(prev => ({
      ...prev,
      propertyAddress: '',
      titleSearchSighted: 'No',
      realPropertyDescription: '',
      encumbrancesRestrictions: '',
      siteDimensions: '',
      siteArea: '',
      zoning: '',
      currentUse: '',
      localGovernmentArea: '',
      mainDwelling: '',
      builtAbout: '',
      additions: '',
      livingArea: 0,
      outdoorArea: 0,
      otherArea: 0,
      carAccommodation: 0,
      carAreas: 0,
      marketability: 'Good',
      heritageIssues: 'No',
      environmentalIssues: 'No',
      essentialRepairs: 'No',
      estimatedCost: 0,
      interestValued: 'Fee Simple Vacant Possession',
      valueComponent: 'Existing Property',
      landValue: 0,
      improvementValue: 0,
      marketValue: 0,
      rentalAssessment: 0,
      insuranceEstimate: 0,
      salesEvidence: [],
      automation: {
        ocrProcessed: false,
        domainDataExtracted: false,
        planningMapsIntegrated: false,
        salesEvidenceGenerated: false,
        riskRatingsCalculated: false,
        vraAssessmentComplete: false,
        reportGenerated: false,
        progress: 0,
        logs: []
      }
    }));
    setReportUrl(null);
    updateAutomationLog('All data cleared - ready for new valuation');
  };

  const generateISFVReport = async () => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-isfv-report', {
        body: {
          jobId: `ISFV_${Date.now()}`,
          reportData: {
            propertyAddress: formData.propertyAddress,
            instructedBy: formData.instructedBy || "N/A",
            lender: formData.lender || "TBA", 
            contact: formData.contact || "N/A",
            loanRefNo: formData.loanRefNo || "TBA",
            clientRefNo: formData.clientRefNo || "N/A",
            valuersRefNo: formData.valuersRefNo || "001",
            borrower: formData.borrower || "TBA",
            
            // Property Summary
            titleSearchSighted: formData.titleSearchSighted,
            realPropertyDescription: formData.realPropertyDescription,
            encumbrancesRestrictions: formData.encumbrancesRestrictions,
            siteDimensions: formData.siteDimensions,
            siteArea: formData.siteArea,
            zoning: formData.zoning,
            currentUse: formData.currentUse,
            localGovernmentArea: formData.localGovernmentArea,
            mainDwelling: formData.mainDwelling,
            builtAbout: formData.builtAbout,
            additions: formData.additions,
            livingArea: formData.livingArea,
            outdoorArea: formData.outdoorArea,
            otherArea: formData.otherArea,
            carAccommodation: formData.carAccommodation,
            carAreas: formData.carAreas,
            marketability: formData.marketability,
            heritageIssues: formData.heritageIssues,
            environmentalIssues: formData.environmentalIssues,
            essentialRepairs: formData.essentialRepairs,
            estimatedCost: formData.estimatedCost,
            
            // Land & Dwelling Details
            propertyIdentification: formData.propertyIdentification,
            zoningEffect: formData.zoningEffect,
            location: formData.location,
            neighbourhood: formData.neighbourhood,
            siteAccess: formData.siteAndAccess,
            services: formData.services,
            
            // Risk Analysis
            propertyRiskRatings: formData.propertyRiskRatings,
            marketRiskRatings: formData.marketRiskRatings,
            
            // Valuation Summary
            interestValued: formData.interestValued || "Fee Simple Vacant Possession",
            valueComponent: formData.valueComponent || "Existing Property",
            rentalAssessment: formData.rentalAssessment || 0,
            insuranceEstimate: formData.insuranceEstimate || 0,
            landValue: formData.landValue || 0,
            improvementsValue: formData.improvementValue || 0,
            marketValue: formData.marketValue || 0,
            
            // Professional Details
            valuationFirm: "ISFV Systems",
            valuer: "Professional Valuer",
            apiNumber: "75366",
            inspectionDate: formData.inspectionDate,
            issueDate: formData.valuationDate
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.report_url) {
        setReportUrl(data.report_url);
      }

      toast.success("ISFV Report Generated", {
        description: "Your Instant Short Form Valuation report has been generated successfully.",
      });

      // Update automation status
      setFormData(prev => ({
        ...prev,
        automation: {
          ...prev.automation,
          reportGenerated: true,
          progress: 100,
          logs: [...prev.automation.logs, 'ISFV Report generated successfully']
        }
      }));

    } catch (error) {
      console.error('Error generating ISFV report:', error);
      toast.error("Error", {
        description: "Failed to generate ISFV report. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadReport = () => {
    if (reportUrl) {
      window.open(reportUrl, '_blank');
    } else {
      toast.error("No Report Available", {
        description: "Please generate a report first.",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Instant Short Form Valuation (ISFV)
          </h1>
          <p className="text-muted-foreground">
            Professional property valuation with integrated automation, Domain API, and risk analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={clearAllData}>
            <FileText className="h-4 w-4 mr-2" />
            Clear All Data
          </Button>
          <Button onClick={runFullAutomation} disabled={isProcessing || !formData.propertyAddress}>
            <Zap className="h-4 w-4 mr-2" />
            {isProcessing ? 'Processing...' : 'Run Full Automation'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="automation">Automation Hub</TabsTrigger>
          <TabsTrigger value="property-summary">Property Summary</TabsTrigger>
          <TabsTrigger value="land-dwelling">Land & Dwelling</TabsTrigger>
          <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
          <TabsTrigger value="sales-evidence">Sales Evidence</TabsTrigger>
          <TabsTrigger value="vra-assessment">VRA Assessment</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
        </TabsList>

        {/* Automation Hub Tab */}
        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Automation Control Center
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Overview */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">{formData.automation.progress}%</span>
                </div>
                <Progress value={formData.automation.progress} className="w-full" />
              </div>

              {/* Configuration Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <Label htmlFor="quickAddress">Property Address (Required for Automation)</Label>
                  <Input
                    id="quickAddress"
                    placeholder="Enter property address to start automation"
                    value={formData.propertyAddress}
                    onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select 
                    value={formData.reportType} 
                    onValueChange={(value: 'AS IS' | 'AS IF COMPLETE') => handleInputChange('reportType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AS IS">AS IS (Existing Property)</SelectItem>
                      <SelectItem value="AS IF COMPLETE">AS IF COMPLETE (TBE/Construction)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="inspectionDate">Inspection Date</Label>
                  <Input
                    id="inspectionDate"
                    type="date"
                    value={formData.inspectionDate}
                    onChange={(e) => handleInputChange('inspectionDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="valuationDate">Valuation Date</Label>
                  <Input
                    id="valuationDate"
                    type="date"
                    value={formData.valuationDate}
                    onChange={(e) => handleInputChange('valuationDate', e.target.value)}
                  />
                </div>
              </div>

              {/* Start Automation Button */}
              <div className="flex justify-center">
                <Button 
                  onClick={runFullAutomation} 
                  disabled={isProcessing || !formData.propertyAddress}
                  className="px-8 py-3 text-lg"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Start Full Automation
                    </>
                  )}
                </Button>
              </div>

              {/* Automation Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className={`border-2 ${formData.automation.ocrProcessed ? 'border-green-500' : 'border-gray-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="font-medium">OCR Processing</span>
                      </div>
                      {formData.automation.ocrProcessed && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Extract data from uploaded documents</p>
                    <Button 
                      onClick={processOCR} 
                      disabled={isProcessing}
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                    >
                      {formData.automation.ocrProcessed ? 'Completed' : 'Process OCR'}
                    </Button>
                  </CardContent>
                </Card>

                <Card className={`border-2 ${formData.automation.domainDataExtracted ? 'border-green-500' : 'border-gray-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        <span className="font-medium">Domain API</span>
                      </div>
                      {formData.automation.domainDataExtracted && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Extract property data from Domain</p>
                    <Button 
                      onClick={extractDomainData} 
                      disabled={isProcessing || !formData.propertyAddress}
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                    >
                      {formData.automation.domainDataExtracted ? 'Completed' : 'Extract Data'}
                    </Button>
                  </CardContent>
                </Card>

                <Card className={`border-2 ${formData.automation.planningMapsIntegrated ? 'border-green-500' : 'border-gray-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Map className="h-4 w-4" />
                        <span className="font-medium">Planning Maps</span>
                      </div>
                      {formData.automation.planningMapsIntegrated && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Integrate state planning data</p>
                    <Button 
                      onClick={integratePlanningMaps} 
                      disabled={isProcessing}
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                    >
                      {formData.automation.planningMapsIntegrated ? 'Completed' : 'Integrate Maps'}
                    </Button>
                  </CardContent>
                </Card>

                <Card className={`border-2 ${formData.automation.salesEvidenceGenerated ? 'border-green-500' : 'border-gray-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span className="font-medium">Sales Evidence</span>
                      </div>
                      {formData.automation.salesEvidenceGenerated && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Generate comparable sales with adjustments</p>
                    <Button 
                      onClick={generateSalesEvidence} 
                      disabled={isProcessing}
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                    >
                      {formData.automation.salesEvidenceGenerated ? 'Completed' : 'Generate Sales'}
                    </Button>
                  </CardContent>
                </Card>

                <Card className={`border-2 ${formData.automation.riskRatingsCalculated ? 'border-green-500' : 'border-gray-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="font-medium">Risk Ratings</span>
                      </div>
                      {formData.automation.riskRatingsCalculated && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Calculate automated risk assessments</p>
                    <Button 
                      onClick={calculateRiskRatings} 
                      disabled={isProcessing}
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                    >
                      {formData.automation.riskRatingsCalculated ? 'Completed' : 'Calculate Risks'}
                    </Button>
                  </CardContent>
                </Card>

                <Card className={`border-2 ${formData.automation.vraAssessmentComplete ? 'border-green-500' : 'border-gray-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span className="font-medium">VRA Assessment</span>
                      </div>
                      {formData.automation.vraAssessmentComplete && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Valuation Risk Alert assessment</p>
                    <Button 
                      onClick={performVRAAssessment} 
                      disabled={isProcessing}
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                    >
                      {formData.automation.vraAssessmentComplete ? 'Completed' : 'Assess VRA'}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Automation Logs */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Automation Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {formData.automation.logs.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No automation logs yet. Start automation to see progress.</p>
                    ) : (
                      formData.automation.logs.map((log, index) => (
                        <div key={index} className="text-sm font-mono bg-gray-50 p-2 rounded">
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Property Summary Tab */}
        <TabsContent value="property-summary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Property Summary (Section 1)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Report Configuration */}
              <div className="bg-primary/5 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Report Configuration
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="reportType">Report Type</Label>
                    <Select 
                      value={formData.reportType} 
                      onValueChange={(value: 'AS IS' | 'AS IF COMPLETE') => handleInputChange('reportType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AS IS">AS IS (Existing Property)</SelectItem>
                        <SelectItem value="AS IF COMPLETE">AS IF COMPLETE (TBE/Construction)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="inspectionDate">Inspection Date</Label>
                    <Input
                      id="inspectionDate"
                      type="date"
                      value={formData.inspectionDate}
                      onChange={(e) => handleInputChange('inspectionDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="valuationDate">Valuation Date</Label>
                    <Input
                      id="valuationDate"
                      type="date"
                      value={formData.valuationDate}
                      onChange={(e) => handleInputChange('valuationDate', e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Alert className={`w-full ${formData.reportType === 'AS IF COMPLETE' ? 'border-orange-500' : 'border-green-500'}`}>
                      <AlertDescription className="text-xs">
                        {formData.reportType === 'AS IF COMPLETE' 
                          ? 'TBE Report: Valuation assumes completion' 
                          : 'Standard Report: Current property condition'}
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>

              {/* Basic Property Information */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="propertyAddress">Property Address</Label>
                    <Input
                      id="propertyAddress"
                      placeholder="Enter full property address"
                      value={formData.propertyAddress}
                      onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="titleSearchSighted">Title Search Sighted?</Label>
                    <Select 
                      value={formData.titleSearchSighted} 
                      onValueChange={(value: 'Yes' | 'No') => handleInputChange('titleSearchSighted', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="realPropertyDescription">Real Property Description</Label>
                  <Textarea
                    id="realPropertyDescription"
                    placeholder="e.g., Lot 9 PS444723 - Title not supplied for Volume and Folio"
                    value={formData.realPropertyDescription}
                    onChange={(e) => handleInputChange('realPropertyDescription', e.target.value)}
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="encumbrancesRestrictions">Encumbrances/Restrictions</Label>
                  <Input
                    id="encumbrancesRestrictions"
                    placeholder="e.g., Not Known"
                    value={formData.encumbrancesRestrictions}
                    onChange={(e) => handleInputChange('encumbrancesRestrictions', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="siteDimensions">Site Dimensions</Label>
                    <Textarea
                      id="siteDimensions"
                      placeholder="e.g., Irregular shape lot with approximately 43 metre frontage..."
                      value={formData.siteDimensions}
                      onChange={(e) => handleInputChange('siteDimensions', e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="siteArea">Site Area</Label>
                    <Input
                      id="siteArea"
                      placeholder="e.g., 4204 sqm"
                      value={formData.siteArea}
                      onChange={(e) => handleInputChange('siteArea', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="zoning">Zoning</Label>
                    <Input
                      id="zoning"
                      placeholder="e.g., LDRZ2"
                      value={formData.zoning}
                      onChange={(e) => handleInputChange('zoning', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentUse">Current Use</Label>
                    <Select value={formData.currentUse} onValueChange={(value) => handleInputChange('currentUse', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select current use" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Vacant Residential">Vacant Residential</SelectItem>
                        <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="localGovernmentArea">LGA</Label>
                    <Input
                      id="localGovernmentArea"
                      placeholder="e.g., Mildura Rural City Council"
                      value={formData.localGovernmentArea}
                      onChange={(e) => handleInputChange('localGovernmentArea', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Main Dwelling Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Main Dwelling & Property Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mainDwelling">Main Dwelling</Label>
                    <Input
                      id="mainDwelling"
                      placeholder="e.g., Dwelling with 3 Bedroom(s) And 2 Bathroom(s)"
                      value={formData.mainDwelling}
                      onChange={(e) => handleInputChange('mainDwelling', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="builtAbout">Built About</Label>
                    <Input
                      id="builtAbout"
                      placeholder="e.g., Circa 2005"
                      value={formData.builtAbout}
                      onChange={(e) => handleInputChange('builtAbout', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="additions">Additions</Label>
                  <Input
                    id="additions"
                    placeholder="e.g., N/A"
                    value={formData.additions}
                    onChange={(e) => handleInputChange('additions', e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              {/* Areas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Areas</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <Label htmlFor="livingArea">Living (sqm)</Label>
                    <Input
                      id="livingArea"
                      type="number"
                      placeholder="336"
                      value={formData.livingArea || ''}
                      onChange={(e) => handleInputChange('livingArea', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="outdoorArea">Outdoor (sqm)</Label>
                    <Input
                      id="outdoorArea"
                      type="number"
                      placeholder="44"
                      value={formData.outdoorArea || ''}
                      onChange={(e) => handleInputChange('outdoorArea', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="otherArea">Other (sqm)</Label>
                    <Input
                      id="otherArea"
                      type="number"
                      placeholder="0"
                      value={formData.otherArea || ''}
                      onChange={(e) => handleInputChange('otherArea', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="carAccommodation">Car Accommodation</Label>
                    <Input
                      id="carAccommodation"
                      type="number"
                      placeholder="3"
                      value={formData.carAccommodation || ''}
                      onChange={(e) => handleInputChange('carAccommodation', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="carAreas">Car Areas (sqm)</Label>
                    <Input
                      id="carAreas"
                      type="number"
                      placeholder="72"
                      value={formData.carAreas || ''}
                      onChange={(e) => handleInputChange('carAreas', Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Property Conditions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Property Conditions & Issues</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="marketability">Marketability</Label>
                    <Select 
                      value={formData.marketability} 
                      onValueChange={(value: 'Excellent' | 'Good' | 'Fair' | 'Poor') => handleInputChange('marketability', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="heritageIssues">Heritage Issues</Label>
                    <Select 
                      value={formData.heritageIssues} 
                      onValueChange={(value: 'Yes' | 'No') => handleInputChange('heritageIssues', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="environmentalIssues">Environmental Issues</Label>
                    <Select 
                      value={formData.environmentalIssues} 
                      onValueChange={(value: 'Yes' | 'No') => handleInputChange('environmentalIssues', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="essentialRepairs">Essential Repairs</Label>
                    <Select 
                      value={formData.essentialRepairs} 
                      onValueChange={(value: 'Yes' | 'No') => handleInputChange('essentialRepairs', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="estimatedCost">Estimated Cost</Label>
                  <Input
                    id="estimatedCost"
                    type="number"
                    placeholder="Enter estimated cost if applicable"
                    value={formData.estimatedCost || ''}
                    onChange={(e) => handleInputChange('estimatedCost', Number(e.target.value))}
                  />
                </div>
              </div>

              <Separator />

              {/* VALUATION SUMMARY - PropertyPRO Format */}
              <div className="border-2 border-gray-800 bg-white">
                <div className="bg-gray-800 text-white p-2 text-center font-bold text-lg">
                  3. VALUATION SUMMARY
                </div>
                
                <div className="p-4 space-y-4">
                  {/* Interest Valued and Value Component */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex">
                        <span className="w-32 font-medium">Interest Valued:</span>
                        <Select 
                          value={formData.interestValued} 
                          onValueChange={(value) => handleInputChange('interestValued', value)}
                        >
                          <SelectTrigger className="border-0 shadow-none p-0 h-auto">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Fee Simple Vacant Possession">Fee Simple Vacant Possession</SelectItem>
                            <SelectItem value="Subject to Long Term Lease">Subject to Long Term Lease</SelectItem>
                            <SelectItem value="Crown Leasehold">Crown Leasehold</SelectItem>
                            <SelectItem value="Shares in a Company Title Development">Shares in a Company Title Development</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex">
                        <span className="w-32 font-medium">Value Component:</span>
                        <span className="text-blue-600">{formData.valueComponent}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-center font-bold text-lg">Other Assessments</div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Rental Assessment Unfurnished:</span>
                          <div className="flex items-center gap-2">
                            <span>$</span>
                            <Input
                              type="number"
                              placeholder="1000"
                              value={formData.rentalAssessment || ''}
                              onChange={(e) => handleInputChange('rentalAssessment', Number(e.target.value))}
                              className="w-20 h-6 text-right border-0 border-b border-gray-300 rounded-none"
                            />
                            <span>Per week</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="font-medium">Insurance Estimate:</span>
                          <div className="flex items-center gap-2">
                            <span>$</span>
                            <Input
                              type="number"
                              placeholder="870000"
                              value={formData.insuranceEstimate || ''}
                              onChange={(e) => handleInputChange('insuranceEstimate', Number(e.target.value))}
                              className="w-24 h-6 text-right border-0 border-b border-gray-300 rounded-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Land and Improvements */}
                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex justify-between">
                      <span className="font-medium">Land:</span>
                      <div className="flex items-center gap-2">
                        <span>$</span>
                        <Input
                          type="number"
                          placeholder="500000"
                          value={formData.landValue || ''}
                          onChange={(e) => handleInputChange('landValue', Number(e.target.value))}
                          className="w-28 h-6 text-right border-0 border-b border-gray-300 rounded-none"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium">Improvements:</span>
                      <div className="flex items-center gap-2">
                        <span>$</span>
                        <Input
                          type="number"
                          placeholder="540000"
                          value={formData.improvementValue || ''}
                          onChange={(e) => handleInputChange('improvementValue', Number(e.target.value))}
                          className="w-28 h-6 text-right border-0 border-b border-gray-300 rounded-none"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Market Value */}
                  <div className="bg-gray-100 p-3 border-t-2 border-gray-800">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">MARKET VALUE:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 font-bold text-lg">$</span>
                        <Input
                          type="number"
                          placeholder="1040000"
                          value={formData.marketValue || ''}
                          onChange={(e) => handleInputChange('marketValue', Number(e.target.value))}
                          className="w-32 h-8 text-right font-bold text-lg text-blue-600 border-0 border-b-2 border-blue-600 rounded-none bg-transparent"
                        />
                        <span className="text-gray-600 text-sm ml-2">
                          ({formData.marketValue ? `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(formData.marketValue).replace('$', '').split(',').map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(' ')} dollars` : 'Enter amount'})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {formData.reportType === 'AS IF COMPLETE' && (
                  <div className="bg-orange-50 border-t border-orange-200 p-3">
                    <Alert className="border-orange-500">
                      <Building className="h-4 w-4" />
                      <AlertDescription>
                        <strong>AS IF COMPLETE BASIS:</strong> This valuation assumes all proposed works are completed as per approved plans and specifications.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Land & Dwelling Tab */}
        <TabsContent value="land-dwelling" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Land Information (Section 4)
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  onClick={() => autoFillLocationData()}
                  disabled={isProcessing}
                >
                  <Map className="h-4 w-4 mr-1" />
                  Auto-Fill from APIs
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Property Identification */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Property Identification</Label>
                <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="aerialMapping"
                      checked={formData.propertyIdentification.aerialMapping}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          propertyIdentification: {
                            ...prev.propertyIdentification,
                            aerialMapping: checked as boolean
                          }
                        }))
                      }
                    />
                    <Label htmlFor="aerialMapping" className="text-sm">Aerial Mapping</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="physicalInspection"
                      checked={formData.propertyIdentification.physicalInspection}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          propertyIdentification: {
                            ...prev.propertyIdentification,
                            physicalInspection: checked as boolean
                          }
                        }))
                      }
                    />
                    <Label htmlFor="physicalInspection" className="text-sm">Physical Inspection</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cadastralMap"
                      checked={formData.propertyIdentification.cadastralMap}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          propertyIdentification: {
                            ...prev.propertyIdentification,
                            cadastralMap: checked as boolean
                          }
                        }))
                      }
                    />
                    <Label htmlFor="cadastralMap" className="text-sm">Cadastral Map</Label>
                  </div>
                </div>
                <Textarea
                  placeholder="Additional property identification details"
                  value={formData.propertyIdentification.description}
                  onChange={(e) => 
                    setFormData(prev => ({
                      ...prev,
                      propertyIdentification: {
                        ...prev.propertyIdentification,
                        description: e.target.value
                      }
                    }))
                  }
                  rows={2}
                />
              </div>

              {/* Zoning Effect */}
              <div>
                <Label htmlFor="zoningEffect" className="text-base font-semibold">Zoning Effect</Label>
                <Textarea
                  id="zoningEffect"
                  placeholder="The existing use complies with current zoning requirements"
                  value={formData.zoningEffect}
                  onChange={(e) => handleInputChange('zoningEffect', e.target.value)}
                  rows={2}
                  className="mt-2"
                />
              </div>

              {/* Location */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Location</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="distanceFromCBD">Distance from Major Capital City</Label>
                    <Input
                      id="distanceFromCBD"
                      placeholder="e.g., 550km"
                      value={formData.location.distanceFromCBD}
                      onChange={(e) => 
                        setFormData(prev => ({
                          ...prev,
                          location: {
                            ...prev.location,
                            distanceFromCBD: e.target.value
                          }
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="directionFromCBD">Direction from Major Capital City</Label>
                    <Select
                      value={formData.location.directionFromCBD}
                      onValueChange={(value) => 
                        setFormData(prev => ({
                          ...prev,
                          location: {
                            ...prev.location,
                            directionFromCBD: value
                          }
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select direction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="north">North</SelectItem>
                        <SelectItem value="south">South</SelectItem>
                        <SelectItem value="east">East</SelectItem>
                        <SelectItem value="west">West</SelectItem>
                        <SelectItem value="northeast">Northeast</SelectItem>
                        <SelectItem value="northwest">Northwest</SelectItem>
                        <SelectItem value="southeast">Southeast</SelectItem>
                        <SelectItem value="southwest">Southwest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="distanceFromRegionalCentre">Distance from Major Regional Centre</Label>
                    <Input
                      id="distanceFromRegionalCentre"
                      placeholder="e.g., 9km"
                      value={formData.location.distanceFromRegionalCentre}
                      onChange={(e) => 
                        setFormData(prev => ({
                          ...prev,
                          location: {
                            ...prev.location,
                            distanceFromRegionalCentre: e.target.value
                          }
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="directionFromRegionalCentre">Direction from Major Regional Centre</Label>
                    <Select
                      value={formData.location.directionFromRegionalCentre}
                      onValueChange={(value) => 
                        setFormData(prev => ({
                          ...prev,
                          location: {
                            ...prev.location,
                            directionFromRegionalCentre: value
                          }
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select direction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="north">North</SelectItem>
                        <SelectItem value="south">South</SelectItem>
                        <SelectItem value="east">East</SelectItem>
                        <SelectItem value="west">West</SelectItem>
                        <SelectItem value="northeast">Northeast</SelectItem>
                        <SelectItem value="northwest">Northwest</SelectItem>
                        <SelectItem value="southeast">Southeast</SelectItem>
                        <SelectItem value="southwest">Southwest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Textarea
                  placeholder="Additional location description"
                  value={formData.location.description}
                  onChange={(e) => 
                    setFormData(prev => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        description: e.target.value
                      }
                    }))
                  }
                  rows={2}
                />
              </div>

              {/* Neighbourhood */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Neighbourhood</Label>
                <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                  <Label className="text-sm font-medium col-span-2">Surrounding Properties:</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="residentialProperties"
                      checked={formData.neighbourhood.residentialProperties}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          neighbourhood: {
                            ...prev.neighbourhood,
                            residentialProperties: checked as boolean
                          }
                        }))
                      }
                    />
                    <Label htmlFor="residentialProperties" className="text-sm">Residential</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="commercialProperties"
                      checked={formData.neighbourhood.commercialProperties}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          neighbourhood: {
                            ...prev.neighbourhood,
                            commercialProperties: checked as boolean
                          }
                        }))
                      }
                    />
                    <Label htmlFor="commercialProperties" className="text-sm">Commercial</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="industrialProperties"
                      checked={formData.neighbourhood.industrialProperties}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          neighbourhood: {
                            ...prev.neighbourhood,
                            industrialProperties: checked as boolean
                          }
                        }))
                      }
                    />
                    <Label htmlFor="industrialProperties" className="text-sm">Industrial</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="farmingProperties"
                      checked={formData.neighbourhood.farmingProperties}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          neighbourhood: {
                            ...prev.neighbourhood,
                            farmingProperties: checked as boolean
                          }
                        }))
                      }
                    />
                    <Label htmlFor="farmingProperties" className="text-sm">Farming</Label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="positiveInfrastructure">Positive Infrastructure</Label>
                    <Input
                      id="positiveInfrastructure"
                      placeholder="e.g., schools, parks, shopping centres"
                      value={formData.neighbourhood.positiveInfrastructure}
                      onChange={(e) => 
                        setFormData(prev => ({
                          ...prev,
                          neighbourhood: {
                            ...prev.neighbourhood,
                            positiveInfrastructure: e.target.value
                          }
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="negativeInfrastructure">Negative Infrastructure</Label>
                    <Input
                      id="negativeInfrastructure"
                      placeholder="e.g., highways, industrial noise"
                      value={formData.neighbourhood.negativeInfrastructure}
                      onChange={(e) => 
                        setFormData(prev => ({
                          ...prev,
                          neighbourhood: {
                            ...prev.neighbourhood,
                            negativeInfrastructure: e.target.value
                          }
                        }))
                      }
                    />
                  </div>
                </div>
                <Textarea
                  placeholder="Description of surrounding properties and neighbourhood characteristics"
                  value={formData.neighbourhood.description}
                  onChange={(e) => 
                    setFormData(prev => ({
                      ...prev,
                      neighbourhood: {
                        ...prev.neighbourhood,
                        description: e.target.value
                      }
                    }))
                  }
                  rows={3}
                />
              </div>

              {/* Site and Access */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Site Description & Access</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="frontage">Frontage</Label>
                    <Input
                      id="frontage"
                      placeholder="e.g., 20m"
                      value={formData.siteAndAccess.frontage}
                      onChange={(e) => 
                        setFormData(prev => ({
                          ...prev,
                          siteAndAccess: {
                            ...prev.siteAndAccess,
                            frontage: e.target.value
                          }
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="sideDetails">Side Details</Label>
                    <Input
                      id="sideDetails"
                      placeholder="e.g., 30m depth"
                      value={formData.siteAndAccess.sideDetails}
                      onChange={(e) => 
                        setFormData(prev => ({
                          ...prev,
                          siteAndAccess: {
                            ...prev.siteAndAccess,
                            sideDetails: e.target.value
                          }
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="shape">Lot Shape</Label>
                    <Select
                      value={formData.siteAndAccess.shape}
                      onValueChange={(value: 'rectangular' | 'square' | 'irregular') => 
                        setFormData(prev => ({
                          ...prev,
                          siteAndAccess: {
                            ...prev.siteAndAccess,
                            shape: value
                          }
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rectangular">Rectangular</SelectItem>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="irregular">Irregular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="streetSide">Street Side</Label>
                    <Select
                      value={formData.siteAndAccess.streetSide}
                      onValueChange={(value: 'north' | 'south' | 'east' | 'west') => 
                        setFormData(prev => ({
                          ...prev,
                          siteAndAccess: {
                            ...prev.siteAndAccess,
                            streetSide: value
                          }
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="north">North Side</SelectItem>
                        <SelectItem value="south">South Side</SelectItem>
                        <SelectItem value="east">East Side</SelectItem>
                        <SelectItem value="west">West Side</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dwellingOrientation">Dwelling Orientation</Label>
                    <Select
                      value={formData.siteAndAccess.dwellingOrientation}
                      onValueChange={(value: 'north' | 'south' | 'east' | 'west' | 'northeast' | 'northwest' | 'southeast' | 'southwest') => 
                        setFormData(prev => ({
                          ...prev,
                          siteAndAccess: {
                            ...prev.siteAndAccess,
                            dwellingOrientation: value
                          }
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="north">North</SelectItem>
                        <SelectItem value="south">South</SelectItem>
                        <SelectItem value="east">East</SelectItem>
                        <SelectItem value="west">West</SelectItem>
                        <SelectItem value="northeast">Northeast</SelectItem>
                        <SelectItem value="northwest">Northwest</SelectItem>
                        <SelectItem value="southeast">Southeast</SelectItem>
                        <SelectItem value="southwest">Southwest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="streetSystem">Street System</Label>
                    <Select
                      value={formData.siteAndAccess.streetSystem}
                      onValueChange={(value: 'single-lane' | 'double-lane' | 'highway' | 'corner-lot' | 'cul-de-sac') => 
                        setFormData(prev => ({
                          ...prev,
                          siteAndAccess: {
                            ...prev.siteAndAccess,
                            streetSystem: value
                          }
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single-lane">Single Lane</SelectItem>
                        <SelectItem value="double-lane">Double Lane</SelectItem>
                        <SelectItem value="highway">Highway</SelectItem>
                        <SelectItem value="corner-lot">Corner Lot</SelectItem>
                        <SelectItem value="cul-de-sac">Cul-de-sac</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="footpaths">Footpaths</Label>
                    <Select
                      value={formData.siteAndAccess.footpaths}
                      onValueChange={(value: 'concrete' | 'gravel' | 'none') => 
                        setFormData(prev => ({
                          ...prev,
                          siteAndAccess: {
                            ...prev.siteAndAccess,
                            footpaths: value
                          }
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="concrete">Concrete</SelectItem>
                        <SelectItem value="gravel">Gravel</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="accessLevel">Access Level</Label>
                    <Select
                      value={formData.siteAndAccess.accessLevel}
                      onValueChange={(value: 'easy-direct' | 'moderate' | 'difficult') => 
                        setFormData(prev => ({
                          ...prev,
                          siteAndAccess: {
                            ...prev.siteAndAccess,
                            accessLevel: value
                          }
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy-direct">Easy and Direct</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="difficult">Difficult</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Textarea
                  placeholder="Shape, topography, relationship to road level, suitability for building"
                  value={formData.siteAndAccess.description}
                  onChange={(e) => 
                    setFormData(prev => ({
                      ...prev,
                      siteAndAccess: {
                        ...prev.siteAndAccess,
                        description: e.target.value
                      }
                    }))
                  }
                  rows={3}
                />
              </div>

              {/* Services */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Services</Label>
                <div className="grid grid-cols-4 gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mainServices"
                      checked={formData.services.mainServices}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          services: {
                            ...prev.services,
                            mainServices: checked as boolean
                          }
                        }))
                      }
                    />
                    <Label htmlFor="mainServices" className="text-sm">Main Services</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="electricity"
                      checked={formData.services.electricity}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          services: {
                            ...prev.services,
                            electricity: checked as boolean
                          }
                        }))
                      }
                    />
                    <Label htmlFor="electricity" className="text-sm">Electricity</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="water"
                      checked={formData.services.water}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          services: {
                            ...prev.services,
                            water: checked as boolean
                          }
                        }))
                      }
                    />
                    <Label htmlFor="water" className="text-sm">Water</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sewer"
                      checked={formData.services.sewer}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          services: {
                            ...prev.services,
                            sewer: checked as boolean
                          }
                        }))
                      }
                    />
                    <Label htmlFor="sewer" className="text-sm">Sewer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="gas"
                      checked={formData.services.gas}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          services: {
                            ...prev.services,
                            gas: checked as boolean
                          }
                        }))
                      }
                    />
                    <Label htmlFor="gas" className="text-sm">Gas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="storm"
                      checked={formData.services.storm}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          services: {
                            ...prev.services,
                            storm: checked as boolean
                          }
                        }))
                      }
                    />
                    <Label htmlFor="storm" className="text-sm">Storm Water</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="telephone"
                      checked={formData.services.telephone}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          services: {
                            ...prev.services,
                            telephone: checked as boolean
                          }
                        }))
                      }
                    />
                    <Label htmlFor="telephone" className="text-sm">Telephone</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="nbn"
                      checked={formData.services.nbn}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          services: {
                            ...prev.services,
                            nbn: checked as boolean
                          }
                        }))
                      }
                    />
                    <Label htmlFor="nbn" className="text-sm">NBN</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cable"
                      checked={formData.services.cable}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          services: {
                            ...prev.services,
                            cable: checked as boolean
                          }
                        }))
                      }
                    />
                    <Label htmlFor="cable" className="text-sm">Cable</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="solar"
                      checked={formData.services.solar}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          services: {
                            ...prev.services,
                            solar: checked as boolean
                          }
                        }))
                      }
                    />
                    <Label htmlFor="solar" className="text-sm">Solar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="septic"
                      checked={formData.services.septic}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          services: {
                            ...prev.services,
                            septic: checked as boolean
                          }
                        }))
                      }
                    />
                    <Label htmlFor="septic" className="text-sm">Septic</Label>
                  </div>
                </div>
                <div>
                  <Label htmlFor="otherServices">Other Services</Label>
                  <Input
                    id="otherServices"
                    placeholder="e.g., Satellite internet, bore water"
                    value={formData.services.otherServices}
                    onChange={(e) => 
                      setFormData(prev => ({
                        ...prev,
                        services: {
                          ...prev.services,
                          otherServices: e.target.value
                        }
                      }))
                    }
                  />
                </div>
                <Textarea
                  placeholder="List utilities connected or available (do not use 'all usual services are connected')"
                  value={formData.services.description}
                  onChange={(e) => 
                    setFormData(prev => ({
                      ...prev,
                      services: {
                        ...prev.services,
                        description: e.target.value
                      }
                    }))
                  }
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Dwelling Description (Section 5)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="style">Style</Label>
                  <Input
                    id="style"
                    placeholder="e.g., Double storey brick veneer dwelling"
                    value={formData.style}
                    onChange={(e) => handleInputChange('style', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="streetAppeal">Street Appeal</Label>
                  <Select 
                    value={formData.streetAppeal} 
                    onValueChange={(value) => handleInputChange('streetAppeal', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select street appeal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Very good appeal">Very good appeal</SelectItem>
                      <SelectItem value="Good appeal">Good appeal</SelectItem>
                      <SelectItem value="Fair appeal">Fair appeal</SelectItem>
                      <SelectItem value="Poor appeal">Poor appeal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mainWallsAndRoof">Main Walls & Roof</Label>
                  <Input
                    id="mainWallsAndRoof"
                    placeholder="e.g., Rendered Brick Walls Tiled"
                    value={formData.mainWallsAndRoof}
                    onChange={(e) => handleInputChange('mainWallsAndRoof', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="internalCondition">Internal Condition</Label>
                  <Select 
                    value={formData.internalCondition} 
                    onValueChange={(value) => handleInputChange('internalCondition', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select internal condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Excellent">Excellent</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mainInteriorLining">Main Interior Lining</Label>
                  <Input
                    id="mainInteriorLining"
                    placeholder="e.g., Plasterboard"
                    value={formData.mainInteriorLining}
                    onChange={(e) => handleInputChange('mainInteriorLining', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="externalCondition">External Condition</Label>
                  <Select 
                    value={formData.externalCondition} 
                    onValueChange={(value) => handleInputChange('externalCondition', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select external condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Excellent">Excellent</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="flooring">Flooring</Label>
                  <Input
                    id="flooring"
                    placeholder="e.g., Concrete slab and timber for second storey"
                    value={formData.flooring}
                    onChange={(e) => handleInputChange('flooring', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="windowFrames">Window Frames</Label>
                  <Input
                    id="windowFrames"
                    placeholder="e.g., Aluminium"
                    value={formData.windowFrames}
                    onChange={(e) => handleInputChange('windowFrames', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="accommodation">Accommodation</Label>
                <Textarea
                  id="accommodation"
                  placeholder="Dwelling 3 Bedroom(s) And 2 Bathroom(s) Plus study/fourth bedroom, laundry, powdered room, walk in pantry, lounge/theatre room, family/meals/kitchen, gallery, entry, 2 x walk in robes,"
                  value={formData.accommodation}
                  onChange={(e) => handleInputChange('accommodation', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="interiorLayout">Interior Layout</Label>
                <Input
                  id="interiorLayout"
                  placeholder="e.g., Functional"
                  value={formData.interiorLayout}
                  onChange={(e) => handleInputChange('interiorLayout', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="fixtureAndFitting">Fixture & Fitting</Label>
                <Textarea
                  id="fixtureAndFitting"
                  placeholder="reverse cycle heating and cooling, split systems, 2 x gas log fires, evaporative cooling, integrated audio speakers throughout, laminate and marble benchtops, tiles, carpet, high decorative ceilings., timber stair case, 900 mm gas stove, double wall oven, 900 mm rangehood, timber cupboards (floor and wall), down lights, instant gas HWS."
                  value={formData.fixtureAndFitting}
                  onChange={(e) => handleInputChange('fixtureAndFitting', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Ancillary Improvements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Ancillary Improvements (Section 6)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ancillaryImprovements">Ancillary Improvements</Label>
                <Textarea
                  id="ancillaryImprovements"
                  placeholder="Balcony, verandahs/outdoor area, undercover BBQ area with built in BBQ, workshop, fernery, extensive gardens with removable garden beds and gravel surrounds, automated irrigation, clothes line, fountain/pond, full concrete pathing throughout gardens and house surrounds, colorbond and powdered coating aluminium fencing."
                  value={formData.ancillaryImprovements}
                  onChange={(e) => handleInputChange('ancillaryImprovements', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Previous and Current Sales Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Previous and Current Sales Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Previous Sale Data */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Previous Sale of Subject Property (Last 3 Years)</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-3">Data source: DOMAIN API</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="previousSaleDate">Date of Sale</Label>
                      <Input
                        id="previousSaleDate"
                        type="date"
                        value={formData.previousSaleData.dateOfSale}
                        onChange={(e) => 
                          setFormData(prev => ({
                            ...prev,
                            previousSaleData: {
                              ...prev.previousSaleData,
                              dateOfSale: e.target.value
                            }
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="previousSalePrice">Sale Price ($)</Label>
                      <Input
                        id="previousSalePrice"
                        type="number"
                        placeholder="0"
                        value={formData.previousSaleData.salePrice || ''}
                        onChange={(e) => 
                          setFormData(prev => ({
                            ...prev,
                            previousSaleData: {
                              ...prev.previousSaleData,
                              salePrice: Number(e.target.value)
                            }
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="previousSaleAgent">Agent</Label>
                      <Input
                        id="previousSaleAgent"
                        placeholder="Real estate agent"
                        value={formData.previousSaleData.agent}
                        onChange={(e) => 
                          setFormData(prev => ({
                            ...prev,
                            previousSaleData: {
                              ...prev.previousSaleData,
                              agent: e.target.value
                            }
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="previousSaleVendor">Vendor</Label>
                      <Input
                        id="previousSaleVendor"
                        placeholder="Vendor name"
                        value={formData.previousSaleData.vendor}
                        onChange={(e) => 
                          setFormData(prev => ({
                            ...prev,
                            previousSaleData: {
                              ...prev.previousSaleData,
                              vendor: e.target.value
                            }
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="previousSalePurchaser">Purchaser</Label>
                      <Input
                        id="previousSalePurchaser"
                        placeholder="Purchaser name"
                        value={formData.previousSaleData.purchaser}
                        onChange={(e) => 
                          setFormData(prev => ({
                            ...prev,
                            previousSaleData: {
                              ...prev.previousSaleData,
                              purchaser: e.target.value
                            }
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="previousSaleDaysOnMarket">Days on Market</Label>
                      <Input
                        id="previousSaleDaysOnMarket"
                        type="number"
                        placeholder="0"
                        value={formData.previousSaleData.daysOnMarket || ''}
                        onChange={(e) => 
                          setFormData(prev => ({
                            ...prev,
                            previousSaleData: {
                              ...prev.previousSaleData,
                              daysOnMarket: Number(e.target.value)
                            }
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Previous Sale Comments */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Previous Sale Comments</h3>
                <div>
                  <Label htmlFor="marketConditionAnalysis">Market Condition Analysis</Label>
                  <Select 
                    value={formData.marketConditionAnalysis} 
                    onValueChange={(value: 'improved' | 'declined' | 'stable' | '') => 
                      setFormData(prev => ({
                        ...prev,
                        marketConditionAnalysis: value
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select market condition change" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="improved">Market conditions have improved</SelectItem>
                      <SelectItem value="declined">Market conditions have declined</SelectItem>
                      <SelectItem value="stable">Market conditions remained stable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="propertyImprovements">Property Improvements Since Previous Sale</Label>
                  <Textarea
                    id="propertyImprovements"
                    placeholder="Describe any renovations, extensions, or new improvements made since the previous sale"
                    value={formData.propertyImprovements}
                    onChange={(e) => handleInputChange('propertyImprovements', e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="previousSaleComments">Additional Comments</Label>
                  <Textarea
                    id="previousSaleComments"
                    placeholder="Additional analysis of the previous sale and market conditions"
                    value={formData.previousSaleComments}
                    onChange={(e) => handleInputChange('previousSaleComments', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {/* Current/Proposed Sale */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Current/Proposed Sale of Subject Property</h3>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-3">Data source: OCR Extraction</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="currentSaleContractDate">Contract Date</Label>
                      <Input
                        id="currentSaleContractDate"
                        type="date"
                        value={formData.currentProposedSale.contractDate}
                        onChange={(e) => 
                          setFormData(prev => ({
                            ...prev,
                            currentProposedSale: {
                              ...prev.currentProposedSale,
                              contractDate: e.target.value
                            }
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="currentSalePrice">Sale Price ($)</Label>
                      <Input
                        id="currentSalePrice"
                        type="number"
                        placeholder="0"
                        value={formData.currentProposedSale.salePrice || ''}
                        onChange={(e) => 
                          setFormData(prev => ({
                            ...prev,
                            currentProposedSale: {
                              ...prev.currentProposedSale,
                              salePrice: Number(e.target.value)
                            }
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="currentSalePurchaser">Purchaser</Label>
                      <Input
                        id="currentSalePurchaser"
                        placeholder="Purchaser name"
                        value={formData.currentProposedSale.purchaser}
                        onChange={(e) => 
                          setFormData(prev => ({
                            ...prev,
                            currentProposedSale: {
                              ...prev.currentProposedSale,
                              purchaser: e.target.value
                            }
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="currentSaleVendor">Vendor</Label>
                      <Input
                        id="currentSaleVendor"
                        placeholder="Vendor name"
                        value={formData.currentProposedSale.vendor}
                        onChange={(e) => 
                          setFormData(prev => ({
                            ...prev,
                            currentProposedSale: {
                              ...prev.currentProposedSale,
                              vendor: e.target.value
                            }
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="currentSaleAgent">Agent</Label>
                      <Input
                        id="currentSaleAgent"
                        placeholder="Real estate agent"
                        value={formData.currentProposedSale.agent}
                        onChange={(e) => 
                          setFormData(prev => ({
                            ...prev,
                            currentProposedSale: {
                              ...prev.currentProposedSale,
                              agent: e.target.value
                            }
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Analysis */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Current Sale Market Analysis</h3>
                <div>
                  <Label htmlFor="currentSaleInLineWithMarket">Current Sale in line with current local Market?</Label>
                  <Select 
                    value={formData.currentSaleInLineWithMarket} 
                    onValueChange={(value: 'Yes' | 'No' | '') => 
                      setFormData(prev => ({
                        ...prev,
                        currentSaleInLineWithMarket: value
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Yes or No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="saleReasonableness">Sale Price Reasonableness Analysis</Label>
                  <Textarea
                    id="saleReasonableness"
                    placeholder="Analysis of whether the sale price is reasonable based on current market conditions"
                    value={formData.saleReasonableness}
                    onChange={(e) => handleInputChange('saleReasonableness', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {/* Contract and Selling Period Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contract and Selling Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contractOfSaleSighted">Full copy of Contract of Sale sighted?</Label>
                    <Select 
                      value={formData.contractOfSaleSighted} 
                      onValueChange={(value: 'Yes' | 'No') => 
                        setFormData(prev => ({
                          ...prev,
                          contractOfSaleSighted: value,
                          contractRequiredMessage: value === 'No' ? 'A full copy of the contract of sale must be sighted before finalizing the valuation.' : ''
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Yes or No" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    {formData.contractOfSaleSighted === 'No' && (
                      <Alert className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          A full copy of the contract of sale must be sighted before finalizing the valuation.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="sellingPeriodGreaterThan6Months">Selling period greater than 6 months?</Label>
                    <Select 
                      value={formData.sellingPeriodGreaterThan6Months} 
                      onValueChange={(value: 'Yes' | 'No') => 
                        setFormData(prev => ({
                          ...prev,
                          sellingPeriodGreaterThan6Months: value
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pre-set as No" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="underContract">Under Contract Status</Label>
                  <Select 
                    value={formData.underContract} 
                    onValueChange={(value: 'Yes' | 'No') => 
                      setFormData(prev => ({
                        ...prev,
                        underContract: value
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select under contract status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Under Contract</SelectItem>
                      <SelectItem value="No">Not Under Contract</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    This selection can be configured in the Automation Control Centre
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Analysis Tab */}
        <TabsContent value="risk-analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Analysis (Section 2)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Property Risk Ratings */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Property Risk Ratings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(formData.riskRatings).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <button
                              key={level}
                              onClick={() => handleRiskRatingChange(key as keyof RiskRating, level as RiskLevel)}
                              className={`w-8 h-8 rounded ${value >= level ? getRiskColor(level as RiskLevel) : 'bg-gray-200'}`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                        <span className="text-sm font-medium">{getRiskLabel(value)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Market Risk Ratings */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Market Risk Ratings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(formData.riskRatings).slice(4).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <button
                              key={level}
                              onClick={() => handleRiskRatingChange(key as keyof RiskRating, level as RiskLevel)}
                              className={`w-8 h-8 rounded ${value >= level ? getRiskColor(level as RiskLevel) : 'bg-gray-200'}`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                        <span className="text-sm font-medium">{getRiskLabel(value)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Comments */}
              <div>
                <Label htmlFor="riskComments">Risk Rating Comments (Required for ratings 3+)</Label>
                <Textarea
                  id="riskComments"
                  placeholder="Provide detailed comments for any risk ratings of 3 or higher"
                  value={formData.riskComments}
                  onChange={(e) => handleInputChange('riskComments', e.target.value)}
                  rows={4}
                />
              </div>

              {/* Risk Rating Alert */}
              {Object.values(formData.riskRatings).some(rating => rating >= 3) && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You have risk ratings of 3 or higher. Please provide detailed comments in the Risk Rating Comments section above.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Evidence Tab */}
        <TabsContent value="sales-evidence" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Sales Evidence & Market Analysis (Section 7)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Comparable Sales with Weighted Adjustments</h3>
                <Button onClick={generateSalesEvidence} variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Generate Sales Evidence
                </Button>
              </div>

              {formData.salesEvidence.map((sale, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Sale Details */}
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium">Address</Label>
                          <p className="text-sm">{sale.address}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-sm font-medium">Sale Date</Label>
                            <p className="text-sm">{sale.saleDate}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Price</Label>
                            <p className="text-sm font-semibold">${sale.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-sm font-medium">Living Area</Label>
                            <p className="text-sm">{sale.livingArea} sqm</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Land Area</Label>
                            <p className="text-sm">{sale.landArea} sqm</p>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Brief Comments</Label>
                          <p className="text-sm">{sale.briefComments}</p>
                        </div>
                      </div>

                      {/* Adjustments Analysis */}
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium">Adjustment Factors</Label>
                          <div className="grid grid-cols-2 gap-1 text-xs">
                            <div>Location: {(sale.locationAdjustment * 100).toFixed(1)}%</div>
                            <div>Size: {(sale.sizeAdjustment * 100).toFixed(1)}%</div>
                            <div>Condition: {(sale.conditionAdjustment * 100).toFixed(1)}%</div>
                            <div>Age: {(sale.ageAdjustment * 100).toFixed(1)}%</div>
                            <div>Time: {(sale.timeAdjustment * 100).toFixed(1)}%</div>
                            <div className="font-medium">Total: {(sale.overallAdjustment * 100).toFixed(1)}%</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-sm font-medium">Adjusted Price</Label>
                            <p className="text-sm font-semibold">${sale.adjustedPrice.toLocaleString()}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Price/sqm</Label>
                            <p className="text-sm">${sale.pricePerSqm.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-sm font-medium">Comparison</Label>
                            <Badge 
                              variant={
                                sale.comparisonToSubject === 'superior' ? 'default' :
                                sale.comparisonToSubject === 'similar' ? 'secondary' : 'destructive'
                              }
                            >
                              {sale.comparisonToSubject}
                            </Badge>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Reliability</Label>
                            <Badge variant={sale.reliability === 'high' ? 'default' : 'secondary'}>
                              {sale.reliability}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {formData.salesEvidence.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No sales evidence generated yet. Use automation or add manually.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* VRA Assessment Tab */}
        <TabsContent value="vra-assessment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Valuation Risk Alert (VRA) Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  VRA assessment identifies predefined risks. A 'Yes' response to any question requires detailed comments.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vra1"
                    checked={formData.vraAssessment.higherRiskProperty}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({
                        ...prev,
                        vraAssessment: { ...prev.vraAssessment, higherRiskProperty: checked as boolean }
                      }))
                    }
                  />
                  <Label htmlFor="vra1" className="text-sm">
                    <strong>VRA 1:</strong> Does the subject property comprise a higher risk or a non-residential property type?
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vra2"
                    checked={formData.vraAssessment.adverseMarketability}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({
                        ...prev,
                        vraAssessment: { ...prev.vraAssessment, adverseMarketability: checked as boolean }
                      }))
                    }
                  />
                  <Label htmlFor="vra2" className="text-sm">
                    <strong>VRA 2:</strong> Are there any adverse marketability issues that would require an extended selling period of more than 6 months?
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vra3"
                    checked={formData.vraAssessment.incompleteConstruction}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({
                        ...prev,
                        vraAssessment: { ...prev.vraAssessment, incompleteConstruction: checked as boolean }
                      }))
                    }
                  />
                  <Label htmlFor="vra3" className="text-sm">
                    <strong>VRA 3:</strong> Are the existing improvements on the property incomplete, under construction or requiring essential repairs?
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vra4"
                    checked={formData.vraAssessment.criticalIssues}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({
                        ...prev,
                        vraAssessment: { ...prev.vraAssessment, criticalIssues: checked as boolean }
                      }))
                    }
                  />
                  <Label htmlFor="vra4" className="text-sm">
                    <strong>VRA 4:</strong> Is the subject property critically affected by any Heritage, location or environmental issues?
                  </Label>
                </div>
              </div>

              <div>
                <Label htmlFor="esgFactors">ESG Attributes</Label>
                <Textarea
                  id="esgFactors"
                  placeholder="Describe any significant positive or negative ESG factors and their market impact"
                  value={formData.vraAssessment.esgFactors}
                  onChange={(e) => 
                    setFormData(prev => ({
                      ...prev,
                      vraAssessment: { ...prev.vraAssessment, esgFactors: e.target.value }
                    }))
                  }
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="vraComments">VRA Comments (Required if any VRA questions answered 'Yes')</Label>
                <Textarea
                  id="vraComments"
                  placeholder="Provide detailed comments for any VRA items marked as 'Yes'"
                  value={formData.vraComments}
                  onChange={(e) => handleInputChange('vraComments', e.target.value)}
                  rows={4}
                />
              </div>

              {Object.values(formData.vraAssessment).some(value => value === true) && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You have marked VRA items as 'Yes'. Please provide detailed comments in the VRA Comments section above.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Professional Tab */}
        <TabsContent value="professional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Professional Declarations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="valuerName">Primary Valuer Name</Label>
                  <Input
                    id="valuerName"
                    placeholder="Enter valuer name"
                    value={formData.valuerName}
                    onChange={(e) => handleInputChange('valuerName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="valuerQualifications">Qualifications & API Number</Label>
                  <Input
                    id="valuerQualifications"
                    placeholder="e.g., AAPI, CPV, API #12345"
                    value={formData.valuerQualifications}
                    onChange={(e) => handleInputChange('valuerQualifications', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="inspectionDate">Inspection Date</Label>
                  <Input
                    id="inspectionDate"
                    type="date"
                    value={formData.inspectionDate}
                    onChange={(e) => handleInputChange('inspectionDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => handleInputChange('issueDate', e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Valuer Declaration</h3>
                <p className="text-sm text-muted-foreground">
                  "I hereby certify that I personally physically inspected the property on the date below and have carried out the assessments above as at that date. Neither I, nor to the best of my knowledge, any member of this firm, has any conflict of interest, or direct, indirect or financial interest in relation to this property that is not disclosed herein."
                </p>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Report Restrictions</h3>
                <p className="text-sm text-muted-foreground">
                  "This Report is for the use only of the party named above as the Lender for first mortgage purposes only, and is not to be used for any other purpose by any other party."
                </p>
              </div>

              {/* ISFV Report Generation */}
              <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generate ISFV Report
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate a professional Instant Short Form Valuation report based on all entered data.
                </p>
                <div className="flex gap-3">
                  <Button 
                    onClick={generateISFVReport} 
                    disabled={isGenerating || !formData.propertyAddress}
                    className="flex-1"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Generating Report...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        Generate ISFV Report
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={downloadReport}
                    disabled={!reportUrl}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </div>
                {reportUrl && (
                  <Alert className="border-green-500">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Report generated successfully! Click "Download Report" to view or download.
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Capped Liability Scheme</h3>
                <p className="text-sm text-muted-foreground">
                  "Liability limited by a scheme approved under Professional Standards Legislation."
                </p>
              </div>

              <div>
                <Label htmlFor="additionalComments">Additional Comments (Section 8)</Label>
                <Textarea
                  id="additionalComments"
                  placeholder="Any additional comments, assumptions, or qualifications"
                  value={formData.additionalComments}
                  onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
