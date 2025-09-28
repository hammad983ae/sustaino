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
import React, { useState, useEffect, useCallback } from 'react';
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
  RefreshCw,
  Scan
} from 'lucide-react';
import { OCRFieldComponent } from './OCRFieldComponent';
import { GeneralCommentsTab } from './GeneralCommentsTab';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import VoiceCommandComponent from '@/components/VoiceCommandComponent';
import DemoPropertySelector, { DemoProperty, demoProperties } from './DemoPropertySelector';
import { 
  generateMockPropertyData, 
  generateMockRiskRatings, 
  generateMockVRAAssessment, 
  generateMockSalesEvidence,
  generateMockGeneralComments 
} from '@/utils/demoDataGenerator';
import { checkReportContradictions, generateContradictionReport, type ReportData } from '@/utils/reportContradictionChecker';
import { PreReportContradictionCheck, usePreReportContradictionCheck } from '@/components/PreReportContradictionCheck';

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
  underContractStatus: 'Yes' | 'No' | '';
  contractDocumentUploaded: boolean;
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

  reportType: 'AS IS' | 'AS IF COMPLETE (TBE/Construction)' | 'VACANT LAND' | 'LAND WITH MINOR IMPROVEMENTS';
  inspectionDate: string;
  valuationDate: string;
  
  // TBE/Construction Specific Fields
  tbeDetails?: {
    contractPrice: number;
    builderName: string;
    contractDate: string;
    estimatedCompletionDate: string;
    stageOfCompletion: number; // percentage
    architectName: string;
    councilApprovals: 'approved' | 'pending' | 'conditional';
    plansAndSpecsUploaded: boolean;
    buildingPermitNumber: string;
    remainingWorkDescription: string;
    constructionType: 'house' | 'townhouse' | 'unit' | 'commercial';
    riskAllowance: number; // percentage
    profitAllowance: number; // percentage
    // AS IF COMPLETE specific fields
    buildingCost: number;
    checkCost: number;
    outOfContractItems: string;
    progressPaymentSchedules: 'Yes' | 'No';
    progressPaymentComments: string;
    costValidationResult: string;
    automatedRiskAssessment?: {
      builderLicense: string;
      councilApprovals: string;
      riskAllowance: string;
      vraCompliance: string;
      alerts: string[];
    };
  };
  
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
    daysOnMarket: number;
    source: string;
  };
  previousSaleComments: string;
  marketConditionAnalysis: 'improved' | 'declined' | 'stable' | '';
  propertyImprovements: string;
  currentProposedSale: {
    contractDate: string;
    salePrice: number;
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
    
    propertyAddress: '24 Highway Drive, Mildura VIC 3500',
    titleSearchSighted: 'No',
    realPropertyDescription: 'Lot 9 PS444723 - Title not supplied for Volume and Folio. Property affected by proximity to main highway (15m) and high tension power lines (25m). Property currently uninhabitable due to missing kitchen facilities requiring $10,000 repairs.',
    encumbrancesRestrictions: '',
    siteDimensions: '22m x 30m',
    siteArea: '680',
    zoning: 'Residential 1',
    currentUse: 'Single Dwelling (Currently Vacant - Uninhabitable)',
    localGovernmentArea: 'Mildura Council',
    mainDwelling: '3 Bedroom, 1 Bathroom House (Missing Kitchen)',
    builtAbout: '1985',
    additions: 'Rear Deck',
    livingArea: 120,
    outdoorArea: 25,
    otherArea: 0,
    carAccommodation: 1,
    carAreas: 20,
    marketability: 'Poor',
    heritageIssues: 'No',
    environmentalIssues: 'Yes',
    essentialRepairs: 'Yes',
    estimatedCost: 10000,
    interestValued: 'Fee Simple Vacant Possession',
    valueComponent: 'Existing Property',
    landValue: 135000,
    improvementValue: 45000,
    marketValue: 180000,
    rentalAssessment: 0, // Property uninhabitable without kitchen
    insuranceEstimate: 200000,
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
      daysOnMarket: 0,
      source: 'DOMAIN API'
    },
    previousSaleComments: '',
    marketConditionAnalysis: '',
    propertyImprovements: '',
    currentProposedSale: {
      contractDate: '',
      salePrice: 0,
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
      location: 4, // Main road + power lines = high risk
      land: 2, // Standard residential land
      environmental: 4, // Power lines + traffic pollution = high risk
      improvements: 4, // Missing kitchen + $10k repairs = high risk
      marketDirection: 2, // Stable market
      marketActivity: 3, // Affected by location issues = medium risk
      localEconomy: 2, // Regional economy
      marketSegment: 3 // Marketability concerns = medium risk
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
      higherRiskProperty: true, // Multiple risks ≥4
      adverseMarketability: true, // Location and market activity ≥3
      incompleteConstruction: false, // Not incomplete construction
      criticalIssues: true, // Environmental ≥4
      esgFactors: 'Property presents significant environmental concerns due to proximity to high tension power lines (25m) and main highway traffic (15m). Location factors negatively impact sustainability metrics including air quality, noise pollution, and electromagnetic field exposure. Building improvements require substantial investment ($10,000) to meet contemporary living standards, particularly kitchen facilities.'
    },
    tbeDetails: {
      contractPrice: 0,
      builderName: '',
      contractDate: '',
      estimatedCompletionDate: '',
      stageOfCompletion: 0,
      architectName: '',
      councilApprovals: 'pending',
      plansAndSpecsUploaded: false,
      buildingPermitNumber: '',
      remainingWorkDescription: '',
      buildingCost: 0,
      checkCost: 0,
      outOfContractItems: '',
      progressPaymentSchedules: 'No',
      progressPaymentComments: '',
      costValidationResult: '',
      constructionType: 'house',
      riskAllowance: 10,
      profitAllowance: 15
    },
    salesEvidence: [
      {
        address: '18 Highway Drive, Mildura VIC 3500',
        saleDate: '15/08/2024',
        price: 185000,
        briefComments: 'Similar highway location but better condition. Required kitchen renovation and minor repairs.',
        livingArea: 120,
        landArea: 520,
        bedrooms: 3,
        bathrooms: 2,
        locationAdjustment: -5000,
        sizeAdjustment: 0,
        conditionAdjustment: -10000,
        ageAdjustment: 1000,
        timeAdjustment: 2000,
        adjustedPrice: 173000,
        pricePerSqm: 1542,
        weightingFactor: 0.85,
        comparisonToSubject: 'similar' as const,
        overallAdjustment: -12000,
        reliability: 'high' as const
      },
      {
        address: '67 Commercial Road, Mildura VIC 3500',
        saleDate: '22/07/2024', 
        price: 210000,
        briefComments: 'Main road frontage but superior kitchen facilities and general condition.',
        livingArea: 132,
        landArea: 485,
        bedrooms: 3,
        bathrooms: 1,
        locationAdjustment: -8000,
        sizeAdjustment: 3000,
        conditionAdjustment: 5000,
        ageAdjustment: -1000,
        timeAdjustment: 1000,
        adjustedPrice: 210000,
        pricePerSqm: 1591,
        weightingFactor: 0.78,
        comparisonToSubject: 'superior' as const,
        overallAdjustment: 0,
        reliability: 'high' as const
      },
      {
        address: '142 Riverside Avenue, Mildura VIC 3500',
        saleDate: '10/09/2024',
        price: 165000,
        briefComments: 'Similar age property in quiet street. Full kitchen and good condition. No environmental issues.',
        livingArea: 110,
        landArea: 550,
        bedrooms: 3,
        bathrooms: 1,
        locationAdjustment: 15000,
        sizeAdjustment: -2000,
        conditionAdjustment: 8000,
        ageAdjustment: 0,
        timeAdjustment: -1000,
        adjustedPrice: 185000,
        pricePerSqm: 1500,
        weightingFactor: 0.9,
        comparisonToSubject: 'superior' as const,
        overallAdjustment: 20000,
        reliability: 'high' as const
      },
      {
        address: '89 Murray Street, Mildura VIC 3500',
        saleDate: '05/08/2024',
        price: 195000,
        briefComments: 'Power line proximity (30m) similar to subject. Required minor kitchen upgrades.',
        livingArea: 125,
        landArea: 480,
        bedrooms: 3,
        bathrooms: 2,
        locationAdjustment: -3000,
        sizeAdjustment: 1000,
        conditionAdjustment: -5000,
        ageAdjustment: 500,
        timeAdjustment: 1500,
        adjustedPrice: 190000,
        pricePerSqm: 1560,
        weightingFactor: 0.88,
        comparisonToSubject: 'similar' as const,
        overallAdjustment: -5000,
        reliability: 'high' as const
      }
    ],
    valuerName: '',
    valuerQualifications: '',
    issueDate: '',
    additionalComments: '',
    riskComments: '',
    vraComments: 'VRA 1 - Higher Risk Property: Property presents multiple risk factors including environmental concerns from high-tension power lines (25m), highway proximity (15m), and substantial repair requirements ($10,000 for kitchen). These factors impact marketability and valuation confidence. VRA 2 - Adverse Marketability: Location factors including highway frontage and power line proximity create extended marketing periods. VRA 4 - Critical Issues: Environmental exposure concerns require disclosure and may affect insurance premiums and resale potential.',
    automation: {
      ocrProcessed: false,
      domainDataExtracted: false,
      planningMapsIntegrated: false,
      salesEvidenceGenerated: false,
      riskRatingsCalculated: false,
      vraAssessmentComplete: false,
      reportGenerated: false,
      progress: 0,
      logs: [],
      underContractStatus: '',
      contractDocumentUploaded: false
    }
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [reportUrl, setReportUrl] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState('automation');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  // Demo functionality state
  const [selectedDemoProperty, setSelectedDemoProperty] = useState('mildura-highway');
  const [contradictionResults, setContradictionResults] = useState<string>('');
  const [isGeneratingMock, setIsGeneratingMock] = useState(false);

  // Pre-report contradiction check
  const {
    showChecker,
    hasContradictions,
    contradictionReport,
    runPreReportCheck,
    handleCheckComplete,
    closeChecker,
    PreReportContradictionCheck: ContradictionChecker
  } = usePreReportContradictionCheck();

  // Photos and Documents state
  const [reportPhotos, setReportPhotos] = useState<Array<{url: string, name: string, description?: string}>>([]);
  const [supportingDocuments, setSupportingDocuments] = useState<Array<{name: string, url: string, category: string, size: number}>>([]);

  // Extract commonly used data for easier component props
  const propertyData = {
    address: formData.propertyAddress,
    landArea: formData.siteArea,
    buildingArea: formData.livingArea,
    bedrooms: formData.mainDwelling.includes('Bedroom') ? parseInt(formData.mainDwelling.match(/(\d+)\s*Bedroom/)?.[1] || '0') : 0,
    bathrooms: formData.mainDwelling.includes('Bathroom') ? parseInt(formData.mainDwelling.match(/(\d+)\s*Bathroom/)?.[1] || '0') : 0,
    yearBuilt: formData.builtAbout ? parseInt(formData.builtAbout.replace(/\D/g, '')) : 0,
    streetNumber: formData.propertyAddress.split(' ')[0] || '',
    streetName: formData.propertyAddress.split(' ').slice(1).join(' ') || '',
    suburb: '',
    state: '',
    postcode: '',
    propertyType: 'residential',
    carSpaces: 0,
    livingArea: formData.livingArea
  };

  const riskRating = {
    location: 1 as RiskLevel,
    land: 1 as RiskLevel,
    environmental: 1 as RiskLevel,
    improvements: 1 as RiskLevel,
    marketDirection: 1 as RiskLevel,
    marketActivity: 1 as RiskLevel,
    localEconomy: 1 as RiskLevel,
    marketSegment: 1 as RiskLevel
  };

  // VRA flags should auto-trigger based on high risk ratings
  const vraAssessment = {
    higherRiskProperty: true, // Multiple risks ≥4
    adverseMarketability: true, // Location and market activity ≥3
    incompleteConstruction: false, // Not incomplete, just damaged
    criticalIssues: true, // Environmental ≥4
    esgFactors: 'Property presents significant environmental concerns due to proximity to high tension power lines (25m) and main highway traffic (15m). Location factors negatively impact sustainability metrics including air quality, noise pollution, and electromagnetic field exposure. Building improvements require substantial investment to meet contemporary living standards, particularly kitchen facilities and general maintenance upgrading.'
  };

  // Mock sales evidence reflecting the challenges
  const salesEvidence = [
    {
      address: '18 Highway Drive, Mildura VIC 3500',
      salePrice: 185000,
      adjustedPrice: 195000,
      pricePerSqm: 1625,
      saleDate: '2024-08-15',
      buildingArea: 120,
      landArea: 520,
      bedrooms: 3,
      bathrooms: 2,
      adjustments: { location: -5000, condition: -10000 },
      similarityScore: 85,
      daysOnMarket: 127,
      notes: 'Similar highway location but better condition'
    },
    {
      address: '67 Commercial Road, Mildura VIC 3500', 
      salePrice: 210000,
      adjustedPrice: 200000,
      pricePerSqm: 1515,
      saleDate: '2024-07-22',
      buildingArea: 132,
      landArea: 485,
      bedrooms: 3,
      bathrooms: 1,
      adjustments: { location: -8000, size: +3000 },
      similarityScore: 78,
      daysOnMarket: 89,
      notes: 'Main road frontage, better kitchen facilities'
    }
  ];
  const [generalComments, setGeneralComments] = useState('');

  // Auto-generate risk comments when ratings are 3 or higher
  useEffect(() => {
    const highRiskRatings = Object.entries(formData.riskRatings).filter(([key, value]) => value >= 3);
    
    if (highRiskRatings.length > 0 && !formData.riskComments) {
      let autoComments = "RISK RATING COMMENTS:\n\nThe following risk factors have been rated 3 or higher and require detailed consideration:\n\n";
      
      highRiskRatings.forEach(([riskType, rating]) => {
        const riskName = riskType.replace(/([A-Z])/g, ' $1').toLowerCase()
          .replace(/^./, str => str.toUpperCase());
        
        autoComments += `• ${riskName} (Rating: ${rating}/5):\n`;
        
        // Add specific comments based on risk type
        switch(riskType) {
          case 'location':
            if (rating >= 3) {
              autoComments += "  - Location factors present moderate to high risk considerations including traffic exposure, noise levels, or accessibility limitations that may impact property marketability and future value growth.\n";
            }
            break;
          case 'land':
            if (rating >= 3) {
              autoComments += "  - Land characteristics present elevated risk factors such as slope, soil conditions, drainage, or geotechnical considerations that may affect development potential or maintenance costs.\n";
            }
            break;
          case 'environmental':
            if (rating >= 3) {
              autoComments += "  - Environmental factors including potential contamination, flood risk, bushfire exposure, or climate change impacts require ongoing monitoring and may affect insurance and marketability.\n";
            }
            break;
          case 'improvements':
            if (rating >= 3) {
              autoComments += "  - Building improvements show signs of wear, deferred maintenance, or structural concerns that may require significant capital expenditure or affect the property's functional utility and market appeal.\n";
            }
            break;
          case 'marketDirection':
            if (rating >= 3) {
              autoComments += "  - Market direction indicators suggest potential volatility, declining trends, or uncertainty in the local property market that may impact future value growth and liquidity.\n";
            }
            break;
          case 'marketActivity':
            if (rating >= 3) {
              autoComments += "  - Market activity levels indicate reduced transaction volumes, extended marketing periods, or limited buyer interest that may affect the property's marketability and sale timeline.\n";
            }
            break;
          case 'localEconomy':
            if (rating >= 3) {
              autoComments += "  - Local economic conditions including employment levels, industry diversification, or economic stability present risks to ongoing property demand and rental markets.\n";
            }
            break;
          case 'marketSegment':
            if (rating >= 3) {
              autoComments += "  - Market segment conditions show specific challenges for this property type including oversupply, changing preferences, or demographic shifts affecting target buyer appeal.\n";
            }
            break;
          default:
            autoComments += "  - This risk factor requires careful consideration and ongoing monitoring.\n";
        }
        autoComments += "\n";
      });
      
      autoComments += "RECOMMENDATIONS:\n";
      autoComments += "• Regular monitoring of identified risk factors is recommended\n";
      autoComments += "• Consider obtaining specialist reports where appropriate\n";
      autoComments += "• Market conditions and risk factors should be reassessed at regular intervals\n";
      
      setFormData(prev => ({
        ...prev,
        riskComments: autoComments
      }));
    }
  }, [formData.riskRatings]);

  // OCR Data and Processing States
  const [ocrData, setOcrData] = useState<Record<string, any>>({});
  const [isProcessingOCR, setIsProcessingOCR] = useState(false);
  const [ocrResults, setOcrResults] = useState<any[]>([]);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // OCR Processing Functions
  const processOCRDocument = async (file: File) => {
    setIsProcessingOCR(true);
    try {
      // Get authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      
      // Upload file to Supabase storage first
      const fileName = `${user.id}/ocr-${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('evidence-uploads')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('evidence-uploads')
        .getPublicUrl(fileName);

      // Process with OCR function
      const { data, error } = await supabase.functions.invoke('ocr-processor', {
        body: {
          fileUrl: urlData.publicUrl,
          fileName: file.name,
          propertyAddress: propertyData.address
        }
      });

      if (error) throw error;

      // Update OCR data state
      setOcrData(prev => ({
        ...prev,
        [file.name]: data.ocrResults
      }));

      setOcrResults(prev => [...prev, {
        fileName: file.name,
        results: data.ocrResults,
        confidence: data.confidence,
        processedAt: data.processedAt
      }]);

      // Auto-fill relevant fields if high confidence
      if (data.confidence > 80) {
        autoFillFromOCR(data.ocrResults);
      }

      toast.success(`OCR processing completed for ${file.name} (${data.confidence}% confidence)`);
    } catch (error) {
      console.error('OCR processing error:', error);
      toast.error('OCR processing failed');
    } finally {
      setIsProcessingOCR(false);
    }
  };

  // Demo Mock Data Generation Functions
  const generateDemoMockReport = async () => {
    if (!selectedDemoProperty) return;
    
    setIsGeneratingMock(true);
    
    try {
      // Find the selected demo property
      const demoProperty = demoProperties.find(p => p.id === selectedDemoProperty);
      if (!demoProperty) {
        toast.error('Selected demo property not found');
        return;
      }

      // Generate mock data
      const mockPropertyData = generateMockPropertyData(demoProperty);
      const mockRiskRatings = generateMockRiskRatings(demoProperty);
      const mockVRAAssessment = generateMockVRAAssessment(demoProperty);
      const mockSalesEvidence = generateMockSalesEvidence(demoProperty);
      const mockGeneralComments = generateMockGeneralComments(
        demoProperty,
        mockPropertyData,
        mockRiskRatings,
        mockVRAAssessment,
        mockSalesEvidence
      );

      // Update form data with mock data
      setFormData(prev => ({
        ...prev,
        // Property data
        propertyAddress: mockPropertyData.propertyAddress,
        realPropertyDescription: mockPropertyData.realPropertyDescription,
        siteArea: mockPropertyData.siteArea,
        siteDimensions: mockPropertyData.siteDimensions,
        zoning: mockPropertyData.zoning,
        currentUse: mockPropertyData.currentUse,
        localGovernmentArea: mockPropertyData.localGovernmentArea,
        mainDwelling: mockPropertyData.mainDwelling,
        builtAbout: mockPropertyData.builtAbout,
        livingArea: mockPropertyData.livingArea,
        marketValue: mockPropertyData.marketValue,
        landValue: mockPropertyData.landValue,
        improvementValue: mockPropertyData.improvementValue,
        rentalAssessment: mockPropertyData.rentalAssessment,
        marketability: mockPropertyData.marketability,
        environmentalIssues: mockPropertyData.environmentalIssues,
        essentialRepairs: mockPropertyData.essentialRepairs,
        estimatedCost: mockPropertyData.estimatedCost,
        
        // Risk ratings
        riskRatings: {
          location: mockRiskRatings.location as RiskLevel,
          land: mockRiskRatings.land as RiskLevel,
          environmental: mockRiskRatings.environmental as RiskLevel,
          improvements: mockRiskRatings.improvements as RiskLevel,
          marketDirection: mockRiskRatings.marketDirection as RiskLevel,
          marketActivity: mockRiskRatings.marketActivity as RiskLevel,
          localEconomy: mockRiskRatings.localEconomy as RiskLevel,
          marketSegment: mockRiskRatings.marketSegment as RiskLevel
        },
        
        // VRA assessment
        vraAssessment: mockVRAAssessment,
        vraComments: mockVRAAssessment.esgFactors,
        
        // Sales evidence
        salesEvidence: mockSalesEvidence.map(sale => ({
          address: sale.address,
          saleDate: sale.saleDate,
          price: sale.price,
          briefComments: sale.briefComments,
          livingArea: sale.livingArea,
          landArea: sale.landArea,
          bedrooms: sale.bedrooms,
          bathrooms: sale.bathrooms,
          locationAdjustment: sale.locationAdjustment,
          sizeAdjustment: sale.sizeAdjustment,
          conditionAdjustment: sale.conditionAdjustment,
          ageAdjustment: sale.ageAdjustment,
          timeAdjustment: sale.timeAdjustment,
          adjustedPrice: sale.adjustedPrice,
          pricePerSqm: sale.pricePerSqm,
          weightingFactor: sale.weightingFactor,
          comparisonToSubject: sale.comparisonToSubject,
          overallAdjustment: sale.overallAdjustment,
          reliability: sale.reliability
        })),
        
        // General comments
        additionalComments: mockGeneralComments
      }));

      // Run contradiction check
      setTimeout(() => {
        runContradictionCheck();
      }, 100);

      toast.success(`Mock report generated for ${demoProperty.address}`);
    } catch (error) {
      console.error('Mock report generation error:', error);
      toast.error('Failed to generate mock report');
    } finally {
      setIsGeneratingMock(false);
    }
  };

  // Contradiction Check Function
  const runContradictionCheck = () => {
    const reportData: ReportData = {
      propertyData: {
        kitchen_condition: formData.mainDwelling.toLowerCase().includes('missing kitchen') ? 'missing' : 'good',
        structural_condition: formData.essentialRepairs === 'Yes' ? 'poor' : 'good',
        external_factors: formData.realPropertyDescription.toLowerCase().includes('highway') ? ['main_road'] : 
                         formData.realPropertyDescription.toLowerCase().includes('power') ? ['power_lines'] : []
      },
      riskRatings: formData.riskRatings,
      vraAssessment: {
        comments: formData.vraComments
      },
      salesEvidence: formData.salesEvidence,
      rentalAssessment: {
        weekly_rent: formData.rentalAssessment
      },
      generalComments: formData.additionalComments,
      sections: {
        propertyDetails: formData.propertyAddress ? 'complete' : 'incomplete',
        riskAssessment: Object.values(formData.riskRatings).every(r => r > 0) ? 'complete' : 'incomplete',
        salesEvidence: formData.salesEvidence.length > 0 ? 'complete' : 'incomplete'
      }
    };

    const contradictionResult = checkReportContradictions(reportData);
    const contradictionReport = generateContradictionReport(contradictionResult);
    setContradictionResults(contradictionReport);

    if (contradictionResult.hasContradictions) {
      toast.error(`${contradictionResult.contradictions.length} contradiction(s) found in report!`);
    } else if (contradictionResult.warnings.length > 0) {
      toast.warning(`${contradictionResult.warnings.length} warning(s) found in report`);
    } else {
      toast.success('No contradictions detected in report');
    }
  };

  const autoFillFromOCR = (results: any) => {
    // Auto-fill property data from OCR results
    if (results.propertyAddress && !formData.propertyAddress) {
      setFormData(prev => ({ ...prev, propertyAddress: results.propertyAddress }));
    }
    if (results.landArea && !formData.siteArea) {
      setFormData(prev => ({ ...prev, siteArea: results.landArea }));
    }
    if (results.buildingArea && !formData.livingArea) {
      setFormData(prev => ({ ...prev, livingArea: results.buildingArea }));
    }
    if (results.marketValue && !formData.marketValue) {
      setFormData(prev => ({ ...prev, marketValue: results.marketValue }));
    }

    // Auto-fill dwelling description from OCR
    if (results.dwellingStyle && !formData.style) {
      setFormData(prev => ({ ...prev, style: results.dwellingStyle }));
    }
    if (results.streetAppeal && !formData.streetAppeal) {
      setFormData(prev => ({ ...prev, streetAppeal: results.streetAppeal }));
    }
    if (results.mainWalls && !formData.mainWallsAndRoof) {
      setFormData(prev => ({ ...prev, mainWallsAndRoof: results.mainWalls }));
    }
    if (results.externalCondition && !formData.externalCondition) {
      setFormData(prev => ({ ...prev, externalCondition: results.externalCondition }));
    }
    if (results.windowFrames && !formData.windowFrames) {
      setFormData(prev => ({ ...prev, windowFrames: results.windowFrames }));
    }
    if (results.dwellingDescription && !formData.accommodation) {
      setFormData(prev => ({ ...prev, accommodation: results.dwellingDescription }));
    }

    // Auto-fill ancillary improvements
    if (results.ancillaryImprovements && !formData.ancillaryImprovements) {
      setFormData(prev => ({ ...prev, ancillaryImprovements: results.ancillaryImprovements }));
    }
    if (results.fixturesAndFittings && !formData.fixtureAndFitting) {
      setFormData(prev => ({ ...prev, fixtureAndFitting: JSON.stringify(results.fixturesAndFittings) }));
    }
  };

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
    
    // Auto-generate VRA flags based on risk ratings
    const currentRiskRatings = formData.riskRatings;
    const highRiskCount = Object.values(currentRiskRatings).filter(rating => rating >= 3).length;
    const criticalRiskCount = Object.values(currentRiskRatings).filter(rating => rating >= 4).length;
    
    const vraAssessment: VRAAssessment = {
      // VRA 1: Higher Risk Property - triggered if multiple risks ≥3 or any risk ≥4
      higherRiskProperty: highRiskCount >= 2 || criticalRiskCount >= 1,
      
      // VRA 2: Adverse Marketability - triggered by location or market risks ≥3
      adverseMarketability: currentRiskRatings.location >= 3 || 
                           currentRiskRatings.marketActivity >= 3 || 
                           currentRiskRatings.marketDirection >= 3,
      
      // VRA 3: Incomplete Construction - triggered by improvements risk ≥4
      incompleteConstruction: currentRiskRatings.improvements >= 4,
      
      // VRA 4: Critical Issues - triggered by environmental risk ≥4 or multiple high risks
      criticalIssues: currentRiskRatings.environmental >= 4 || criticalRiskCount >= 2,
      
      // ESG Factors - auto-generated based on environmental and location risks
      esgFactors: generateESGFactors(currentRiskRatings)
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
    
    updateAutomationLog('VRA assessment completed - automated flags set based on risk ratings');
    setIsProcessing(false);
  };

  // Generate ESG factors text based on risk ratings
  const generateESGFactors = (riskRatings: any) => {
    let esgText = '';
    
    if (riskRatings.environmental >= 3) {
      esgText += 'Environmental factors include elevated concerns regarding air quality, noise pollution, or climate-related risks that may impact property sustainability and market appeal. ';
    }
    
    if (riskRatings.location >= 3) {
      esgText += 'Location presents social governance considerations including accessibility, community impact, or proximity to high-traffic areas affecting liveability. ';
    }
    
    if (riskRatings.improvements >= 3) {
      esgText += 'Building improvements may require upgrades to meet current sustainability standards including energy efficiency, water conservation, or waste management systems. ';
    }
    
    if (esgText === '') {
      esgText = 'Property demonstrates standard ESG attributes typical for residential properties in this locality with no significant positive or negative factors identified.';
    }
    
    return esgText.trim();
  };

  // Generate Comprehensive Comments with Valuation Rationale
  const generateComprehensiveComments = async () => {
    updateAutomationLog('Generating comprehensive property comments with valuation rationale...');
    
    try {
      // For development, generate comments locally until edge function is deployed
      const comprehensiveComments = generateAdvancedComments();
      setGeneralComments(comprehensiveComments);
      updateAutomationLog('Comprehensive comments with valuation rationale generated successfully');
      
    } catch (error) {
      console.error('Error generating comprehensive comments:', error);
      updateAutomationLog('Failed to generate comprehensive comments. Basic structure created.');
      
      // Fallback basic comments
      const basicComments = generateBasicComments();
      setGeneralComments(basicComments);
    }
  };

  // Generate advanced comments with valuation rationale format
  const generateAdvancedComments = () => {
    const property = propertyData;
    const landRate = 450; // $/sqm - mock rate
    const improvementRate = 4200; // $/sqm - mock rate
    const currentRiskRatings = formData.riskRatings; // Use current form data risk ratings
    
    let comments = "VALUATION RATIONALE\n\n";
    
    // Detailed Narrative
    comments += "The subject property is a well-positioned residential dwelling located in a sought-after area of Mildura. ";
    comments += "The property demonstrates good street appeal and is representative of quality housing stock in the locality.\n\n";
    
    comments += "RATE ANALYSIS:\n";
    comments += `Improvement rates in the locality range between $3,500 per/sqm to $5,250 per/sqm, with consideration given to:\n`;
    comments += "• Location and proximity to amenities\n";
    comments += "• Market conditions and recent sales activity\n";
    comments += "• Property quality, age, and condition\n";
    comments += "• Size and configuration factors\n";
    comments += "• Environmental and sustainability features\n\n";
    
    comments += `Based on the analysis of comparable evidence, an improvement rate of $${improvementRate}/sqm has been adopted.\n\n`;
    
    // Component Tables
    comments += "LIVING AREA ANALYSIS:\n";
    comments += "Description          Area (sqm)    Rate ($/sqm)    Value ($)\n";
    comments += "─".repeat(55) + "\n";
    comments += `Living Area          ${property.buildingArea || 180}           $${improvementRate}        $${(Number(property.buildingArea || 180) * improvementRate).toLocaleString()}\n\n`;
    
    comments += "LAND AREA ANALYSIS:\n";
    comments += "Description          Area (sqm)    Rate ($/sqm)    Market Value ($)\n";
    comments += "─".repeat(60) + "\n";
    comments += `Land Area           ${Number(property.landArea) || 650}           $${landRate}         $${(Number(property.landArea || 650) * landRate).toLocaleString()}\n\n`;
    
    // Summation Approach
    comments += "SUMMATION APPROACH:\n";
    comments += "Component                Count    Area/Rate         Value ($)\n";
    comments += "─".repeat(55) + "\n";
    comments += `Land Value              1        ${Number(property.landArea) || 650} sqm × $${landRate}    $${(Number(property.landArea || 650) * landRate).toLocaleString()}\n`;
    comments += `Dwelling Value          1        ${property.buildingArea || 180} sqm × $${improvementRate}  $${(Number(property.buildingArea || 180) * improvementRate).toLocaleString()}\n`;
    comments += `Car Accommodation       2        $15,000 each      $30,000\n`;
    comments += `Outdoor Areas          1        $25,000           $25,000\n`;
    comments += `Pool                   0        $35,000 each      $0\n`;
    comments += `FPG (Fencing/Gates)    1        $8,000            $8,000\n`;
    comments += "─".repeat(55) + "\n";
    
    const totalValue = (Number(property.landArea || 650) * landRate) + (Number(property.buildingArea || 180) * improvementRate) + 30000 + 25000 + 8000;
    const roundedValue = Math.round(totalValue / 1000) * 1000;
    
    comments += `Total Value                                       $${totalValue.toLocaleString()}\n`;
    comments += `Rounded Market Value                              $${roundedValue.toLocaleString()}\n\n`;
    
    // NaTHERS Rating - using mock data since properties don't have these fields yet
    let nathersRating = 6.0;
    if (property.yearBuilt && property.yearBuilt > 2010) nathersRating += 1.5;
    // Mock ESG data for development
    const hasSolarPanels = true; // Mock data
    const esgOrientation = 'north-east'; // Mock data
    if (hasSolarPanels) nathersRating += 0.5;
    if (esgOrientation.includes('north')) nathersRating += 0.5;
    nathersRating = Math.min(10, nathersRating);
    
    comments += `NATHERS RATING: ${nathersRating} Stars\n`;
    comments += "This rating considers property age, orientation, solar installations, and energy efficiency features.\n\n";
    
    // Risk Assessment
    const highRiskItems = Object.entries(currentRiskRatings || {}).filter(([key, value]) => 
      typeof value === 'number' && value >= 3
    );
    
    comments += "RISK ASSESSMENT:\n";
    if (highRiskItems.length > 0) {
      comments += "• Risk factors above level 3:\n";
      highRiskItems.forEach(([key, value]) => {
        const riskName = key.replace(/([A-Z])/g, ' $1').toLowerCase();
        comments += `  - ${riskName.charAt(0).toUpperCase() + riskName.slice(1)} (Rating: ${value}/5)\n`;
      });
    } else {
      comments += "• All risk factors assessed as low to moderate (Rating 1-2)\n";
    }
    
    return comments;
  };

  // Generate basic comments as fallback
  const generateBasicComments = () => {
    let comments = "COMPREHENSIVE PROPERTY COMMENTS\n\n";
    
    if (propertyData?.address) {
      comments += `PROPERTY SUMMARY:\n• Property Address: ${propertyData.address}\n`;
    }
    if (propertyData?.landArea) {
      comments += `• Land Area: ${propertyData.landArea} sqm\n`;
    }
    if (propertyData?.buildingArea) {
      comments += `• Building Area: ${propertyData.buildingArea} sqm\n`;
    }
    
    comments += "\nRISK ASSESSMENT:\n";
    const currentRiskRatings = formData.riskRatings;
    const highRiskItems = Object.entries(currentRiskRatings || {}).filter(([key, value]) => 
      typeof value === 'number' && value >= 3
    );
    
    if (highRiskItems.length > 0) {
      comments += "• Risk factors above level 3:\n";
      highRiskItems.forEach(([key, value]) => {
        const riskName = key.replace(/([A-Z])/g, ' $1').toLowerCase();
        comments += `  - ${riskName.charAt(0).toUpperCase() + riskName.slice(1)} (Rating: ${value}/5)\n`;
      });
    } else {
      comments += "• All risk factors assessed as low to moderate\n";
    }

    return comments;
  };

  // Validation function to check for contradictions
  const validateReportConsistency = () => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check rental assessment vs habitability
    if (formData.rentalAssessment > 0 && formData.mainDwelling.toLowerCase().includes('missing kitchen')) {
      errors.push('Rental assessment should be $0 for uninhabitable property (missing kitchen)');
    }

    // Check VRA comments when VRA flags are set
    const vraFlags = [
      formData.vraAssessment.higherRiskProperty,
      formData.vraAssessment.adverseMarketability,
      formData.vraAssessment.incompleteConstruction,
      formData.vraAssessment.criticalIssues
    ].filter(Boolean);
    
    if (vraFlags.length > 0 && (!formData.vraComments || formData.vraComments.trim() === '')) {
      errors.push('VRA Comments required when VRA flags are set');
    }

    // Check sales evidence count
    if (formData.salesEvidence.length < 3) {
      warnings.push(`Only ${formData.salesEvidence.length} sales provided - minimum 3 recommended for robust analysis`);
    }

    // Check risk ratings vs risk comments consistency
    const highRiskItems = Object.entries(formData.riskRatings || {}).filter(([key, value]) => 
      typeof value === 'number' && value >= 3
    );
    
    if (highRiskItems.length > 0 && formData.riskComments.toLowerCase().includes('no risk')) {
      errors.push('Risk comments contradict high risk ratings - remove "no risk" statements');
    }

    return { errors, warnings };
  };

  // Save sales evidence changes back to database
  const saveSalesEvidenceChanges = async (updatedEvidence: any[]) => {
    try {
      updateAutomationLog('Saving sales evidence changes to database...');
      
      for (const evidence of updatedEvidence) {
        if (evidence.id) {
          // Update existing record
          const { error } = await supabase
            .from('residential_sales_evidence')
            .update({
              property_address: evidence.propertyAddress,
              sale_price: evidence.salePrice,
              adjusted_sale_price: evidence.adjustedPrice,
              price_per_sqm: evidence.pricePerSqm,
              sale_date: evidence.saleDate,
              building_area: evidence.buildingArea,
              land_area: evidence.landArea,
              bedrooms: evidence.bedrooms,
              bathrooms: evidence.bathrooms,
              adjustments: evidence.adjustments,
              similarity_score: evidence.similarityScore,
              updated_at: new Date().toISOString()
            })
            .eq('id', evidence.id);
            
          if (error) throw error;
        } else {
          // Insert new record
          const { error } = await supabase
            .from('residential_sales_evidence')
            .insert({
              property_address: evidence.propertyAddress,
              sale_price: evidence.salePrice,
              adjusted_sale_price: evidence.adjustedPrice,
              price_per_sqm: evidence.pricePerSqm,
              sale_date: evidence.saleDate,
              building_area: evidence.buildingArea,
              land_area: evidence.landArea,
              bedrooms: evidence.bedrooms,
              bathrooms: evidence.bathrooms,
              adjustments: evidence.adjustments,
              similarity_score: evidence.similarityScore,
              user_id: (await supabase.auth.getUser()).data.user?.id
            });
            
          if (error) throw error;
        }
      }
      
      updateAutomationLog('Sales evidence changes saved successfully');
      toast.success('Sales evidence changes saved to database');
      
    } catch (error) {
      console.error('Error saving sales evidence:', error);
      updateAutomationLog('Failed to save sales evidence changes');
      toast.error('Failed to save sales evidence changes');
    }
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
    await generateComprehensiveComments();
    
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
      
      if (field === 'reportType') {
        updatedData.valueComponent = value === 'AS IF COMPLETE (TBE/Construction)' ? 'As If Complete Basis' : 'Existing Property';
      }
      
      return updatedData;
    });
  };

  // Voice command handler
  const handleVoiceFieldUpdate = useCallback((fieldName: string, value: string) => {
    console.log('Voice command updating field:', fieldName, 'with value:', value);
    
    // Handle nested TBE fields
    if (fieldName === 'builderName' || fieldName === 'contractPrice' || 
        fieldName === 'contractDate' || fieldName === 'buildingCost' || 
        fieldName === 'estimatedCompletionDate') {
      setFormData(prev => ({
        ...prev,
        tbeDetails: {
          ...prev.tbeDetails,
          [fieldName]: fieldName === 'contractPrice' || fieldName === 'buildingCost' 
            ? parseFloat(value.replace(/[^\d.]/g, '')) || 0 
            : value
        }
      }));
    } else if (fieldName === 'livingArea' || fieldName === 'outdoorArea' || 
               fieldName === 'otherArea' || fieldName === 'carAccommodation' || 
               fieldName === 'carAreas' || fieldName === 'marketValue' || 
               fieldName === 'landValue' || fieldName === 'improvementValue' || 
               fieldName === 'rentalAssessment' || fieldName === 'insuranceEstimate') {
      // Handle numeric fields
      const numericValue = parseFloat(value.replace(/[^\d.]/g, '')) || 0;
      handleInputChange(fieldName as keyof PropertyProValuationData, numericValue);
    } else {
      // Handle regular text fields
      handleInputChange(fieldName as keyof PropertyProValuationData, value);
    }
  }, []);

  // Toggle voice commands
  const toggleVoiceCommands = useCallback(() => {
    setIsVoiceEnabled(prev => !prev);
  }, []);

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

  // Handle under contract status change
  const handleUnderContractChange = (status: 'Yes' | 'No') => {
    setFormData(prev => ({
      ...prev,
      automation: {
        ...prev.automation,
        underContractStatus: status
      },
      underContract: status,
      // Auto-populate fields based on status
      currentProposedSale: status === 'No' ? {
        contractDate: 'Not Applicable',
        salePrice: 0,
        agent: 'Not Applicable',
        source: 'Not Applicable'
      } : prev.currentProposedSale,
      currentSaleInLineWithMarket: status === 'No' ? '' : prev.currentSaleInLineWithMarket,
      saleReasonableness: status === 'No' ? 'Not Applicable - Property not under contract' : prev.saleReasonableness,
      contractOfSaleSighted: status === 'No' ? 'No' : prev.contractOfSaleSighted
    }));
    
    if (status === 'No') {
      updateAutomationLog('Property set as NOT under contract - current sale fields set to Not Applicable');
    } else {
      updateAutomationLog('Property set as UNDER CONTRACT - contract upload required for OCR processing');
    }
  };

  // Handle contract document upload
  const handleContractUpload = async (file: File) => {
    if (formData.automation.underContractStatus !== 'Yes') {
      toast.error('Property must be under contract to upload contract documents');
      return;
    }

    setIsProcessing(true);
    updateAutomationLog('Processing contract document upload...');

    try {
      // Get authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `contract_${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/contracts/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('evidence-uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Process with OCR (simulate for now)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock OCR extracted data
      const extractedData = {
        contractDate: '2024-01-15',
        salePrice: 750000,
        agent: 'ABC Real Estate'
      };

      setFormData(prev => ({
        ...prev,
        currentProposedSale: {
          ...prev.currentProposedSale,
          contractDate: extractedData.contractDate,
          salePrice: extractedData.salePrice,
          agent: extractedData.agent
        },
        contractOfSaleSighted: 'Yes',
        automation: {
          ...prev.automation,
          contractDocumentUploaded: true,
          ocrProcessed: true,
          progress: Math.max(prev.automation.progress, 75)
        }
      }));

      toast.success('Contract document uploaded and processed successfully');
      updateAutomationLog('Contract OCR processing completed - sale details extracted');
    } catch (error) {
      console.error('Error uploading contract:', error);
      toast.error('Failed to upload contract document');
      updateAutomationLog(`Contract upload error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
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
        logs: [],
        underContractStatus: '',
        contractDocumentUploaded: false
      }
    }));
    setReportUrl(null);
    updateAutomationLog('All data cleared - ready for new valuation');
  };

  // AS IF COMPLETE specific functions
  const extractBuildingCostFromContract = async () => {
    if (!formData.tbeDetails) return;
    
    setIsProcessingOCR(true);
    try {
      // Simulate OCR processing for building contract
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock extracted building cost from contract
      const extractedCost = 450000; // This would come from OCR
      
      setFormData(prev => ({
        ...prev,
        tbeDetails: {
          ...prev.tbeDetails!,
          buildingCost: extractedCost
        }
      }));
      
      toast.success('Building cost extracted from contract');
    } catch (error) {
      toast.error('Failed to extract building cost');
    } finally {
      setIsProcessingOCR(false);
    }
  };

  const validateBuildingCosts = () => {
    if (!formData.tbeDetails || !formData.livingArea) return;
    
    const standardRate = 2800; // $2,800 per sqm
    const contractCostPerSqm = formData.tbeDetails.buildingCost / formData.livingArea;
    const variation = ((contractCostPerSqm - standardRate) / standardRate) * 100;
    
    let result = '';
    if (Math.abs(variation) <= 10) {
      result = `Building cost is within acceptable range (${variation.toFixed(1)}% variation from standard rate)`;
    } else if (variation > 10) {
      result = `Building cost is above market rate (+${variation.toFixed(1)}% variation). Consider reviewing contract terms.`;
    } else {
      result = `Building cost is below market rate (${variation.toFixed(1)}% variation). Verify quality specifications.`;
    }
    
    setFormData(prev => ({
      ...prev,
      tbeDetails: {
        ...prev.tbeDetails!,
        checkCost: contractCostPerSqm,
        costValidationResult: result
      }
    }));
  };

  const analyzeProgressPaymentSchedule = () => {
    // Simulate analysis of progress payment schedule
    const frontLoadedComment = "Progress Payment Schedule analysis: Schedule appears to be front-end loaded and may not comply with HIA standards. Recommend review of payment milestones.";
    const compliantComment = "Progress Payment Schedule analysis: Schedule appears to comply with HIA standards with appropriate milestone-based payments.";
    
    // Mock analysis - in reality this would analyze uploaded contract
    const isFrontLoaded = Math.random() > 0.5;
    
    setFormData(prev => ({
      ...prev,
      tbeDetails: {
        ...prev.tbeDetails!,
        progressPaymentComments: isFrontLoaded ? frontLoadedComment : compliantComment
      }
    }));
  };

  const extractProgressScheduleFromContract = async () => {
    setIsProcessingOCR(true);
    try {
      // Simulate OCR processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock detection of progress schedule
      const hasSchedule = Math.random() > 0.3; // 70% chance of finding schedule
      
      setFormData(prev => ({
        ...prev,
        tbeDetails: {
          ...prev.tbeDetails!,
          progressPaymentSchedules: hasSchedule ? 'Yes' : 'No',
          progressPaymentComments: hasSchedule ? 
            '' : 
            'Progress Payment Schedule not detected in contract documents'
        }
      }));
      
      if (hasSchedule) {
        analyzeProgressPaymentSchedule();
      }
      
      toast.success(`Progress schedule ${hasSchedule ? 'detected' : 'not found'} in contract`);
    } catch (error) {
      toast.error('Failed to extract progress schedule');
    } finally {
      setIsProcessingOCR(false);
    }
  };

  const generateAutomatedRiskAndVRA = () => {
    if (!formData.tbeDetails) return;
    
    // Automated risk assessment based on standard instructions
    const alerts: string[] = [];
    
    // Check builder license
    const builderLicense = formData.tbeDetails.builderName || 'Not provided';
    if (!formData.tbeDetails.builderName) {
      alerts.push('Builder details not provided');
    }
    
    // Check council approvals
    const councilStatus = formData.tbeDetails.councilApprovals;
    if (councilStatus !== 'approved') {
      alerts.push('Council approvals not fully approved');
    }
    
    // Check risk allowance
    const riskAllowance = formData.tbeDetails.riskAllowance;
    if (riskAllowance < 5) {
      alerts.push('Risk allowance may be insufficient for construction project');
    }
    
    // VRA compliance check
    const vraCompliance = alerts.length === 0 ? 'Compliant' : 'Non-compliant';
    
    setFormData(prev => ({
      ...prev,
      tbeDetails: {
        ...prev.tbeDetails!,
        automatedRiskAssessment: {
          builderLicense,
          councilApprovals: councilStatus,
          riskAllowance: `${riskAllowance}%`,
          vraCompliance,
          alerts
        }
      }
    }));
  };

  // Prepare report data for contradiction checking
  const prepareReportDataForCheck = (): ReportData => {
    return {
      propertyData: {
        propertyAddress: formData.propertyAddress,
        realPropertyDescription: formData.realPropertyDescription,
        marketValue: formData.marketValue,
        rentalAssessment: formData.rentalAssessment,
        environmentalIssues: formData.environmentalIssues,
        essentialRepairs: formData.essentialRepairs,
        marketability: formData.marketability,
        kitchen_condition: formData.environmentalIssues === 'Yes' ? 'missing' : 'good',
        structural_condition: formData.essentialRepairs === 'Yes' ? 'poor' : 'good'
      },
      riskRatings: {
        location: formData.riskRatings?.location || 1,
        land: formData.riskRatings?.land || 1,
        environmental: formData.riskRatings?.environmental || 1,
        improvements: formData.riskRatings?.improvements || 1,
        marketDirection: formData.riskRatings?.marketDirection || 1,
        marketActivity: formData.riskRatings?.marketActivity || 1,
        localEconomy: formData.riskRatings?.localEconomy || 1,
        marketSegment: formData.riskRatings?.marketSegment || 1
      },
      vraAssessment: {
        higherRiskProperty: Object.values(formData.riskRatings || {}).some(rating => rating >= 4),
        adverseMarketability: formData.marketability === 'Poor' || formData.marketability === 'Fair',
        incompleteConstruction: formData.reportType === 'AS IF COMPLETE (TBE/Construction)',
        criticalIssues: formData.essentialRepairs === 'Yes' || formData.environmentalIssues === 'Yes',
        comments: formData.vraComments || ''
      },
      generalComments: formData.vraComments || '',
      rentalAssessment: {
        weekly_rent: formData.rentalAssessment || 0
      }
    };
  };

  // Modified HTML report generation with contradiction check
  const generateISFVReportWithCheck = async (format: 'html' | 'pdf' = 'html') => {
    const reportData = prepareReportDataForCheck();
    
    // Show contradiction checker modal
    runPreReportCheck(reportData);
  };

  // Actual report generation (called after contradiction check passes)
  const proceedWithReportGeneration = async (format: 'html' | 'pdf' = 'html') => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-isfv-report', {
        body: {
          jobId: `ISFV_${Date.now()}`,
          reportType: 'isfv',
          propertyData: {
            instructedBy: formData.instructedBy,
            propertyAddress: formData.propertyAddress,
            marketValue: formData.marketValue,
            landValue: formData.landValue,
            improvementValue: formData.improvementValue,
            rentalAssessment: formData.rentalAssessment,
            inspectionDate: formData.inspectionDate,
            
            // Risk Assessment Data
            riskRatings: formData.riskRatings,
            propertyRiskRatings: formData.propertyRiskRatings,
            marketRiskRatings: formData.marketRiskRatings,
            
            // Additional Property Details
            realPropertyDescription: formData.realPropertyDescription,
            siteArea: formData.siteArea,
            livingArea: formData.livingArea,
            marketability: formData.marketability,
            
            // Professional Details
            valuationFirm: "ISFV Systems",
            valuer: "Professional Valuer",
            apiNumber: "75366",
            issueDate: formData.valuationDate,
            
            // TBE/Construction Details (if applicable)
            tbeDetails: formData.reportType === 'AS IF COMPLETE (TBE/Construction)' ? {
              contractPrice: formData.tbeDetails?.contractPrice || 0,
              builderName: formData.tbeDetails?.builderName || '',
              contractDate: formData.tbeDetails?.contractDate || '',
              estimatedCompletionDate: formData.tbeDetails?.estimatedCompletionDate || '',
              buildingCost: formData.tbeDetails?.buildingCost || 0,
              checkCost: formData.tbeDetails?.checkCost || 0,
              outOfContractItems: formData.tbeDetails?.outOfContractItems || '',
              progressPaymentSchedules: formData.tbeDetails?.progressPaymentSchedules || 'No'
            } : undefined
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

  const generatePDFReportWithCheck = async () => {
    const reportData = prepareReportDataForCheck();
    
    // Show contradiction checker modal
    runPreReportCheck(reportData);
  };

  const proceedWithPDFGeneration = async () => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-isfv-report', {
        body: {
          jobId: `ISFV_${Date.now()}`,
          format: 'pdf',
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
            valueComponent: formData.valueComponent || (formData.reportType === 'AS IF COMPLETE (TBE/Construction)' ? 'As If Complete Basis' : 'Existing Property'),
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
            issueDate: formData.valuationDate,
            
            // TBE/Construction Details (if applicable)
            tbeDetails: formData.reportType === 'AS IF COMPLETE (TBE/Construction)' ? {
              contractPrice: formData.tbeDetails?.contractPrice || 0,
              builderName: formData.tbeDetails?.builderName || '',
              contractDate: formData.tbeDetails?.contractDate || '',
              estimatedCompletionDate: formData.tbeDetails?.estimatedCompletionDate || '',
              buildingCost: formData.tbeDetails?.buildingCost || 0,
              checkCost: formData.tbeDetails?.checkCost || 0,
              outOfContractItems: formData.tbeDetails?.outOfContractItems || '',
              progressPaymentSchedules: formData.tbeDetails?.progressPaymentSchedules || 'No'
            } : undefined
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

  const generatePDFReport = async () => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-isfv-report', {
        body: {
          jobId: `ISFV_${Date.now()}`,
          format: 'pdf',
          reportData: {
            propertyAddress: formData.propertyAddress,
            instructedBy: formData.instructedBy || "N/A",
            lender: formData.lender || "TBA",
            contact: formData.contact || "N/A",
            loanRefNo: formData.loanRefNo || "TBA",
            clientRefNo: formData.clientRefNo || "N/A",
            valuersRefNo: formData.valuersRefNo || "001",
            borrower: formData.borrower || "TBA",
            titleSearchSighted: formData.titleSearchSighted === 'Yes',
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
            livingArea: Number(formData.livingArea) || 0,
            outdoorArea: Number(formData.outdoorArea) || 0,
            otherArea: Number(formData.otherArea) || 0,
            carAccommodation: Number(formData.carAccommodation) || 0,
            carAreas: Number(formData.carAreas) || 0,
            marketability: formData.marketability,
            heritageIssues: formData.heritageIssues === 'Yes',
            environmentalIssues: formData.environmentalIssues === 'Yes',
            essentialRepairs: formData.essentialRepairs === 'Yes',
            estimatedCost: formData.estimatedCost,
            propertyIdentification: formData.propertyIdentification,
            zoningEffect: formData.zoningEffect,
            location: formData.location,
            neighbourhood: formData.neighbourhood,
            siteAccess: formData.siteAndAccess,
            services: formData.services,
            propertyRiskRatings: formData.propertyRiskRatings,
            marketRiskRatings: formData.marketRiskRatings,
            interestValued: formData.interestValued,
            valueComponent: formData.valueComponent || (formData.reportType === 'AS IF COMPLETE (TBE/Construction)' ? 'As If Complete Basis' : 'Existing Property'),
            rentalAssessment: Number(formData.rentalAssessment) || 0,
            insuranceEstimate: Number(formData.insuranceEstimate) || 0,
            landValue: Number(formData.landValue) || 0,
            improvementsValue: Number(formData.improvementValue) || 0,
            marketValue: Number(formData.marketValue) || 0,
            valuationFirm: "ISFV Systems",
            valuer: "Professional Valuer",
            apiNumber: "75366",
            inspectionDate: formData.inspectionDate,
            issueDate: formData.issueDate
          }
        }
      });

      if (error) {
        throw error;
      }

      if (data && data.report_url) {
        setReportUrl(data.report_url);
        updateAutomationLog(`✅ PDF Report generated successfully! Format: ${data.format || 'PDF'}`);
        toast.success("Success", {
          description: "PDF Report generated successfully! Click 'Download Report' to download.",
        });
        
        // Automatically trigger download
        window.open(data.report_url, '_blank');
      } else {
        throw new Error('No report URL received');
      }
    } catch (error) {
      console.error('Error generating PDF report:', error);
      toast.error("Error", {
        description: "Failed to generate PDF report. Please try again.",
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

  // Photos and Documents functions
  const getPropertyType = (): string => {
    if (formData.reportType === 'AS IF COMPLETE (TBE/Construction)') return 'TBE';
    if (formData.reportType === 'VACANT LAND' || formData.currentUse === 'Vacant Residential') return 'Vacant Land';
    if (formData.reportType === 'LAND WITH MINOR IMPROVEMENTS') return 'Vacant Land';
    return 'Full Dwelling';
  };

  const getMinPhotoRequirement = (): number => {
    const propertyType = getPropertyType();
    if (propertyType === 'Full Dwelling') return 6;
    return 2; // Vacant Land and TBE properties
  };

  const getPhotoCount = (): number => {
    return reportPhotos.length;
  };

  const uploadReportPhoto = async (file: File) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      
      const timestamp = Date.now();
      const filename = `${user.id}/report-photo-${timestamp}-${file.name}`;
      
      const { data, error } = await supabase.storage
        .from('property-images')
        .upload(filename, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(filename);

      setReportPhotos(prev => [...prev, {
        url: publicUrl,
        name: file.name,
        description: ''
      }]);

      toast.success(`Photo "${file.name}" uploaded successfully`);
    } catch (error) {
      console.error('Photo upload error:', error);
      toast.error(`Failed to upload photo: ${error.message}`);
    }
  };

  const removeReportPhoto = (index: number) => {
    setReportPhotos(prev => prev.filter((_, i) => i !== index));
    toast.success('Photo removed');
  };

  const updatePhotoDescription = (index: number, description: string) => {
    setReportPhotos(prev => prev.map((photo, i) => 
      i === index ? { ...photo, description } : photo
    ));
  };

  const uploadDocument = async (file: File, category: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      
      const timestamp = Date.now();
      const filename = `${user.id}/document-${category}-${timestamp}-${file.name}`;
      
      const { data, error } = await supabase.storage
        .from('documents')
        .upload(filename, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filename);

      setSupportingDocuments(prev => [...prev, {
        name: file.name,
        url: publicUrl,
        category,
        size: file.size
      }]);

      toast.success(`Document "${file.name}" uploaded successfully`);
    } catch (error) {
      console.error('Document upload error:', error);
      toast.error(`Failed to upload document: ${error.message}`);
    }
  };

  const downloadDocument = (doc: {name: string, url: string}) => {
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeDocument = (index: number) => {
    setSupportingDocuments(prev => prev.filter((_, i) => i !== index));
    toast.success('Document removed');
  };

  return (
    <div className="relative max-w-7xl mx-auto p-6 space-y-6">
      {/* Voice Command Component */}
      <VoiceCommandComponent
        onFieldUpdate={handleVoiceFieldUpdate}
        isEnabled={isVoiceEnabled}
        onToggle={toggleVoiceCommands}
      />
      
      {/* Original Content */}
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
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="automation">Automation Hub</TabsTrigger>
          <TabsTrigger value="property-summary">Property Summary</TabsTrigger>
          <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
          <TabsTrigger value="land-dwelling">Land & Dwelling</TabsTrigger>
          <TabsTrigger value="sales-evidence">Sales Evidence</TabsTrigger>
          <TabsTrigger value="general-comments">General Comments</TabsTrigger>
          <TabsTrigger value="vra-assessment">VRA Assessment</TabsTrigger>
          <TabsTrigger value="photos-annexures">Photos & Annexures</TabsTrigger>
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
                     onValueChange={(value: 'AS IS' | 'AS IF COMPLETE (TBE/Construction)' | 'VACANT LAND' | 'LAND WITH MINOR IMPROVEMENTS') => handleInputChange('reportType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-md z-50">
                      <SelectItem value="AS IS">AS IS (Existing Property)</SelectItem>
                        <SelectItem value="AS IF COMPLETE (TBE/Construction)">AS IF COMPLETE (TBE/Construction)</SelectItem>
                      <SelectItem value="VACANT LAND">Vacant Land</SelectItem>
                      <SelectItem value="LAND WITH MINOR IMPROVEMENTS">Land with Minor Improvements</SelectItem>
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


              {/* Under Contract Control */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Settings className="h-5 w-5" />
                    Under Contract Status Control
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="underContractStatus">Is the property under contract?</Label>
                    <Select 
                      value={formData.automation.underContractStatus} 
                      onValueChange={(value: 'Yes' | 'No') => handleUnderContractChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Yes or No" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes - Under Contract</SelectItem>
                        <SelectItem value="No">No - Not Under Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.automation.underContractStatus === 'Yes' && (
                    <div className="space-y-3">
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Contract document upload required for OCR processing and field extraction.
                        </AlertDescription>
                      </Alert>
                      <div>
                        <Label htmlFor="contractUpload">Upload Contract of Sale</Label>
                        <Input
                          id="contractUpload"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleContractUpload(file);
                          }}
                          className="cursor-pointer"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Accepts PDF, JPG, or PNG files for OCR processing
                        </p>
                      </div>
                      {formData.automation.contractDocumentUploaded && (
                        <Alert>
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>
                            Contract document uploaded and processed successfully. Sale details extracted.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}

                  {formData.automation.underContractStatus === 'No' && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Current sale section fields have been set to "Not Applicable" as property is not under contract.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* OCR Document Upload Section */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Scan className="h-5 w-5" />
                    Document & Photo Upload for OCR Processing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors bg-white">
                      <input
                        type="file"
                        id="main-ocr-upload"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.docx,.doc,.tiff,.bmp,.heic"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          if (files.length > 0) {
                            files.forEach(file => processOCRDocument(file));
                          }
                        }}
                        className="hidden"
                      />
                      <label htmlFor="main-ocr-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center space-y-3">
                          <div className="p-3 bg-blue-100 rounded-full">
                            <FileText className="h-8 w-8 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-lg font-medium text-gray-900">Upload Property Documents</p>
                            <p className="text-sm text-gray-600">
                              Contracts, property reports, legal documents
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Supports: PDF, DOCX, DOC, JPG, PNG, TIFF
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>
                    
                    <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors bg-white">
                      <input
                        type="file"
                        id="photo-ocr-upload"
                        multiple
                        accept=".jpg,.jpeg,.png,.tiff,.bmp,.heic"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          if (files.length > 0) {
                            files.forEach(file => processOCRDocument(file));
                          }
                        }}
                        className="hidden"
                      />
                      <label htmlFor="photo-ocr-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center space-y-3">
                          <div className="p-3 bg-green-100 rounded-full">
                            <Eye className="h-8 w-8 text-green-600" />
                          </div>
                          <div>
                            <p className="text-lg font-medium text-gray-900">Upload Property Photos</p>
                            <p className="text-sm text-gray-600">
                              DOMAIN listings, inspection photos, floor plans
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Supports: JPG, PNG, TIFF, BMP, HEIC
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  {/* Upload Status */}
                  {ocrResults.length > 0 && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        ✅ {ocrResults.length} file(s) uploaded and ready for OCR processing
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {isProcessingOCR && (
                    <Alert className="border-blue-200 bg-blue-50">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <AlertDescription>
                        Processing uploaded documents with OCR technology...
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="text-xs text-gray-600 bg-white p-3 rounded border border-gray-200">
                    <strong>OCR will extract:</strong> Property details, addresses, measurements, dwelling descriptions, 
                    sale prices, contract terms, legal information, and other key property data from your uploaded files.
                  </div>
                </CardContent>
              </Card>

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
                    <p className="text-sm text-muted-foreground mb-3">Upload & extract data from documents/photos</p>
                    
                    {/* File Upload Interface */}
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                        <input
                          type="file"
                          id="ocr-file-upload"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png,.docx,.doc,.tiff,.bmp"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            if (files.length > 0) {
                              files.forEach(file => processOCRDocument(file));
                            }
                          }}
                          className="hidden"
                        />
                        <label htmlFor="ocr-file-upload" className="cursor-pointer">
                          <div className="flex flex-col items-center space-y-2">
                            <Scan className="h-8 w-8 text-gray-400" />
                            <p className="text-sm font-medium">Upload Documents/Photos</p>
                            <p className="text-xs text-muted-foreground">
                              PDF, JPG, PNG, DOCX, DOC, TIFF
                            </p>
                          </div>
                        </label>
                      </div>
                      
                      {/* OCR Results Display */}
                      {ocrResults.length > 0 && (
                        <div className="text-xs text-green-600">
                          ✅ {ocrResults.length} file(s) processed
                        </div>
                      )}
                      
                      <Button 
                        onClick={processOCR} 
                        disabled={isProcessing || isProcessingOCR}
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                      >
                        {isProcessingOCR ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : formData.automation.ocrProcessed ? (
                          'Completed'
                        ) : (
                          'Process OCR'
                        )}
                      </Button>
                    </div>
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
                      onValueChange={(value: 'AS IS' | 'AS IF COMPLETE (TBE/Construction)' | 'VACANT LAND' | 'LAND WITH MINOR IMPROVEMENTS') => handleInputChange('reportType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border shadow-md z-50">
                        <SelectItem value="AS IS">AS IS (Existing Property)</SelectItem>
                        <SelectItem value="AS IF COMPLETE (TBE/Construction)">AS IF COMPLETE (TBE/Construction)</SelectItem>
                        <SelectItem value="VACANT LAND">Vacant Land</SelectItem>
                        <SelectItem value="LAND WITH MINOR IMPROVEMENTS">Land with Minor Improvements</SelectItem>
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
                     <Alert className={`w-full ${formData.reportType === 'AS IF COMPLETE (TBE/Construction)' ? 'border-orange-500' : 'border-green-500'}`}>
                       <AlertDescription className="text-xs">
                         {formData.reportType === 'AS IF COMPLETE (TBE/Construction)'
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
                  <Label htmlFor="estimatedCost">Estimated Costs to Repair</Label>
                  <Input
                    id="estimatedCost"
                    type="number"
                    placeholder="Enter estimated cost if applicable"
                    value={formData.estimatedCost || ''}
                    onChange={(e) => handleInputChange('estimatedCost', Number(e.target.value))}
                  />
                </div>

                {/* AS IF COMPLETE (TBE) SPECIFIC FIELDS */}
                {(formData.reportType === 'AS IF COMPLETE (TBE/Construction)') && (
                  <div className="space-y-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <Building className="h-5 w-5 text-orange-600" />
                      <Label className="text-lg font-semibold text-orange-800">As If Complete Construction Details</Label>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {/* Building Cost */}
                      <div>
                        <Label htmlFor="buildingCost">Building Cost</Label>
                        <div className="flex space-x-2">
                          <Input
                            id="buildingCost"
                            type="number"
                            placeholder="$0.00"
                            value={formData.tbeDetails?.buildingCost || ''}
                            onChange={(e) => 
                              setFormData(prev => ({
                                ...prev,
                                tbeDetails: {
                                  ...prev.tbeDetails,
                                  buildingCost: Number(e.target.value)
                                }
                              }))
                            }
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={extractBuildingCostFromContract}
                            disabled={isProcessingOCR}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Extract from Contract
                          </Button>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">OCR extracts from building contract</p>
                      </div>

                      {/* Check Cost */}
                      <div>
                        <Label htmlFor="checkCost">Check Cost Validation</Label>
                        <div className="space-y-2">
                          <Input
                            id="checkCost"
                            type="number"
                            placeholder="$0.00 per sqm"
                            value={formData.tbeDetails?.checkCost || ''}
                            onChange={(e) => 
                              setFormData(prev => ({
                                ...prev,
                                tbeDetails: {
                                  ...prev.tbeDetails,
                                  checkCost: Number(e.target.value)
                                }
                              }))
                            }
                            readOnly
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={validateBuildingCosts}
                            className="w-full"
                          >
                            <Calculator className="h-4 w-4 mr-1" />
                            Validate Against Current Rates ($2,800/sqm)
                          </Button>
                          {formData.tbeDetails?.costValidationResult && (
                            <Alert className={`mt-2 ${formData.tbeDetails.costValidationResult.includes('within') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                              <AlertDescription className="text-sm">
                                {formData.tbeDetails.costValidationResult}
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Out of Contract Items */}
                      <div>
                        <Label htmlFor="outOfContractItems">Out of Contract Items</Label>
                        <Textarea
                          id="outOfContractItems"
                          placeholder="List any items not included in main contract"
                          value={formData.tbeDetails?.outOfContractItems || ''}
                          onChange={(e) => 
                            setFormData(prev => ({
                              ...prev,
                              tbeDetails: {
                                ...prev.tbeDetails,
                                outOfContractItems: e.target.value
                              }
                            }))
                          }
                          rows={3}
                        />
                      </div>

                      {/* Progress Payment Schedules */}
                      <div>
                        <Label htmlFor="progressPaymentSchedules">Progress Payment Schedules</Label>
                        <div className="space-y-2">
                          <Select
                            value={formData.tbeDetails?.progressPaymentSchedules || 'No'}
                            onValueChange={(value: 'Yes' | 'No') => {
                              setFormData(prev => ({
                                ...prev,
                                tbeDetails: {
                                  ...prev.tbeDetails,
                                  progressPaymentSchedules: value,
                                  progressPaymentComments: value === 'No' ? 
                                    "Progress Payment Schedule not supplied - unable to assess HIA compliance" :
                                    ""
                                }
                              }));
                              if (value === 'Yes') {
                                analyzeProgressPaymentSchedule();
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select if progress schedule supplied" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Yes">Yes - Schedule Supplied</SelectItem>
                              <SelectItem value="No">No - Schedule Not Supplied</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={extractProgressScheduleFromContract}
                            disabled={isProcessingOCR}
                            className="w-full"
                          >
                            <Scan className="h-4 w-4 mr-1" />
                            Extract from Contract (OCR)
                          </Button>
                          {formData.tbeDetails?.progressPaymentComments && (
                            <Alert className="mt-2">
                              <AlertDescription className="text-sm">
                                {formData.tbeDetails.progressPaymentComments}
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Automated Risk & VRA Generation */}
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-semibold text-blue-800">Automated Risk Ratings & VRA</Label>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={generateAutomatedRiskAndVRA}
                          disabled={isProcessingOCR}
                        >
                          <Shield className="h-4 w-4 mr-1" />
                          Auto-Generate Risk & VRA
                        </Button>
                      </div>
                      {formData.tbeDetails?.automatedRiskAssessment && (
                        <div className="space-y-2">
                          <div className="text-sm text-gray-700">
                            <strong>Builder License:</strong> {formData.tbeDetails.automatedRiskAssessment.builderLicense}
                          </div>
                          <div className="text-sm text-gray-700">
                            <strong>Council Approvals:</strong> {formData.tbeDetails.automatedRiskAssessment.councilApprovals}
                          </div>
                          <div className="text-sm text-gray-700">
                            <strong>Risk Allowance:</strong> {formData.tbeDetails.automatedRiskAssessment.riskAllowance}%
                          </div>
                          <div className="text-sm text-gray-700">
                            <strong>VRA Compliance:</strong> {formData.tbeDetails.automatedRiskAssessment.vraCompliance}
                          </div>
                          {formData.tbeDetails.automatedRiskAssessment.alerts && formData.tbeDetails.automatedRiskAssessment.alerts.length > 0 && (
                            <Alert className="mt-2 border-yellow-200 bg-yellow-50">
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>
                                <strong>Compliance Alerts:</strong>
                                <ul className="list-disc ml-4 mt-1">
                                  {formData.tbeDetails.automatedRiskAssessment.alerts.map((alert, index) => (
                                    <li key={index} className="text-sm">{alert}</li>
                                  ))}
                                </ul>
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
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
                
                {formData.reportType === 'AS IF COMPLETE (TBE/Construction)' && (
                  <>
                    <div className="bg-orange-50 border-t border-orange-200 p-3">
                      <Alert className="border-orange-500">
                        <Building className="h-4 w-4" />
                        <AlertDescription>
                          <strong>AS IF COMPLETE BASIS:</strong> This valuation assumes all proposed works are completed as per approved plans and specifications.
                        </AlertDescription>
                      </Alert>
                    </div>
                    
                    {/* TBE/Construction Details Section */}
                    <div className="bg-orange-50 border-orange-200 p-4 space-y-4">
                      <h3 className="font-semibold text-orange-800 flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        TBE/Construction Details
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="contractPrice">Contract Price</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">$</span>
                            <Input
                              id="contractPrice"
                              type="number"
                              placeholder="750000"
                              value={formData.tbeDetails?.contractPrice || ''}
                              onChange={(e) => handleInputChange('tbeDetails', {
                                ...formData.tbeDetails,
                                contractPrice: Number(e.target.value)
                              })}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="builderName">Builder/Developer</Label>
                          <Input
                            id="builderName"
                            placeholder="ABC Construction Pty Ltd"
                            value={formData.tbeDetails?.builderName || ''}
                            onChange={(e) => handleInputChange('tbeDetails', {
                              ...formData.tbeDetails,
                              builderName: e.target.value
                            })}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="contractDate">Contract Date</Label>
                          <Input
                            id="contractDate"
                            type="date"
                            value={formData.tbeDetails?.contractDate || ''}
                            onChange={(e) => handleInputChange('tbeDetails', {
                              ...formData.tbeDetails,
                              contractDate: e.target.value
                            })}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="estimatedCompletionDate">Estimated Completion</Label>
                          <Input
                            id="estimatedCompletionDate"
                            type="date"
                            value={formData.tbeDetails?.estimatedCompletionDate || ''}
                            onChange={(e) => handleInputChange('tbeDetails', {
                              ...formData.tbeDetails,
                              estimatedCompletionDate: e.target.value
                            })}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="stageOfCompletion">Stage of Completion (%)</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="stageOfCompletion"
                              type="number"
                              min="0"
                              max="100"
                              placeholder="65"
                              value={formData.tbeDetails?.stageOfCompletion || ''}
                              onChange={(e) => handleInputChange('tbeDetails', {
                                ...formData.tbeDetails,
                                stageOfCompletion: Number(e.target.value)
                              })}
                              className="flex-1"
                            />
                            <span className="text-sm text-gray-500">%</span>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="architectName">Architect/Engineer</Label>
                          <Input
                            id="architectName"
                            placeholder="John Smith Architects"
                            value={formData.tbeDetails?.architectName || ''}
                            onChange={(e) => handleInputChange('tbeDetails', {
                              ...formData.tbeDetails,
                              architectName: e.target.value
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </>
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
                        disabled={formData.automation.underContractStatus === 'No'}
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
                        disabled={formData.automation.underContractStatus === 'No'}
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
                      <Label htmlFor="currentSaleAgent">Agent</Label>
                      <Input
                        id="currentSaleAgent"
                        placeholder="Real estate agent"
                        value={formData.currentProposedSale.agent}
                        disabled={formData.automation.underContractStatus === 'No'}
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
                    disabled={formData.automation.underContractStatus === 'No'}
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
                    disabled={formData.automation.underContractStatus === 'No'}
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

        {/* General Comments Tab */}
        <TabsContent value="general-comments" className="space-y-6">
          <GeneralCommentsTab
            propertyData={propertyData}
            riskRatings={riskRating}
            vraAssessment={vraAssessment}
            salesEvidence={salesEvidence}
            generalComments={generalComments}
            onCommentsChange={setGeneralComments}
          />
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
                  VRA assessment identifies predefined risks. VRA flags are automatically set based on risk ratings from Section 2, but can be manually overridden if required. A 'Yes' response to any question requires detailed comments.
                </AlertDescription>
              </Alert>

              {/* Show automation status */}
              {Object.values(formData.vraAssessment).some(val => val === true || (typeof val === 'string' && val.includes('elevated'))) && (
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Automated VRA Flags Detected:</strong> One or more VRA flags have been automatically triggered based on your risk ratings in Section 2. Review and adjust as necessary.
                  </AlertDescription>
                </Alert>
              )}

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

        {/* Photos and Annexures Tab */}
        <TabsContent value="photos-annexures" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Photos and Annexures
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Photo Requirements:</strong> Full dwellings require minimum 6 photos, vacant land and TBE properties require minimum 2 photos. 
                  All photos will be displayed in the ISFV report. Documents will be included for client delivery but excluded from ISFV.
                </AlertDescription>
              </Alert>

              {/* Photo Requirements Status */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Photo Compliance Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant={getPhotoCount() >= getMinPhotoRequirement() ? "default" : "destructive"}>
                      {getPhotoCount() >= getMinPhotoRequirement() ? "Compliant" : "Non-Compliant"}
                    </Badge>
                    <span className="text-sm">
                      {getPhotoCount()}/{getMinPhotoRequirement()} photos uploaded
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Property Type: {getPropertyType()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Required: {getMinPhotoRequirement()} minimum photos
                  </div>
                </div>
              </div>

              {/* Photo Upload Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Property Photos (For ISFV Display)</h3>
                <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                  <input
                    type="file"
                    id="report-photos-upload"
                    multiple
                    accept=".jpg,.jpeg,.png,.tiff,.bmp,.heic"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length > 0) {
                        files.forEach(file => uploadReportPhoto(file));
                      }
                    }}
                    className="hidden"
                  />
                  <label htmlFor="report-photos-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-3 bg-green-100 rounded-full">
                        <Camera className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-900">Upload Property Photos</p>
                        <p className="text-sm text-gray-600">
                          External views, internal rooms, key features
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          JPG, PNG, TIFF, BMP, HEIC • Max 10MB per file
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Photo Gallery */}
                {reportPhotos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {reportPhotos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo.url}
                          alt={photo.description || `Property photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                          <Button
                            size="sm"
                            variant="destructive"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeReportPhoto(index)}
                          >
                            Remove
                          </Button>
                        </div>
                        <Input
                          placeholder="Photo description"
                          value={photo.description || ''}
                          onChange={(e) => updatePhotoDescription(index, e.target.value)}
                          className="mt-2 text-xs"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Document Upload Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Supporting Documents (Client Delivery Only)</h3>
                <Alert className="border-amber-200 bg-amber-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Documents uploaded here will be included in client delivery packages but <strong>excluded from the ISFV report</strong> 
                    to maintain report compliance and readability.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Contracts and Legal Documents */}
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      id="contracts-upload"
                      multiple
                      accept=".pdf,.docx,.doc,.txt"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length > 0) {
                          files.forEach(file => uploadDocument(file, 'contracts'));
                        }
                      }}
                      className="hidden"
                    />
                    <label htmlFor="contracts-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="p-3 bg-blue-100 rounded-full">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Contracts & Legal</p>
                          <p className="text-sm text-gray-600">
                            Contract of sale, legal documents
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Building Documents */}
                  <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                    <input
                      type="file"
                      id="building-upload"
                      multiple
                      accept=".pdf,.docx,.doc,.dwg,.jpg,.png"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length > 0) {
                          files.forEach(file => uploadDocument(file, 'building'));
                        }
                      }}
                      className="hidden"
                    />
                    <label htmlFor="building-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="p-3 bg-purple-100 rounded-full">
                          <Building className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Building Documents</p>
                          <p className="text-sm text-gray-600">
                            Plans, specifications, contracts
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Document List */}
                {supportingDocuments.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Uploaded Documents ({supportingDocuments.length})</h4>
                    <div className="space-y-2">
                      {supportingDocuments.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm font-medium">{doc.name}</p>
                              <p className="text-xs text-gray-500">
                                {doc.category.charAt(0).toUpperCase() + doc.category.slice(1)} • {(doc.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => downloadDocument(doc)}>
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => removeDocument(index)}>
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Photo Compliance Check */}
              {getPhotoCount() < getMinPhotoRequirement() && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Non-Compliant:</strong> Please upload at least {getMinPhotoRequirement() - getPhotoCount()} 
                    more photo(s) to meet ISFV requirements for {getPropertyType()} properties.
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
                    onClick={() => generateISFVReportWithCheck()} 
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
                        Generate HTML Report
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={generatePDFReportWithCheck}
                    disabled={isGenerating || !formData.propertyAddress}
                    variant="default"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Generate PDF Report
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
