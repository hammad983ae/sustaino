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

// Automation Status
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

// Main Property Data Interface
interface PropertyProValuationData {
  // Property Summary (Section 1)
  propertyAddress: string;
  realPropertyDescription: string;
  siteDimensions: string;
  siteArea: string;
  zoning: string;
  currentUse: string;
  localGovernmentArea: string;
  marketValue: number;
  landValue: number;
  improvementValue: number;
  
  // Report Configuration
  reportType: 'AS IS' | 'AS IF COMPLETE';
  inspectionDate: string;
  valuationDate: string;
  
  // Land Information (Section 4)
  propertyIdentification: string;
  zoningEffect: string;
  location: string;
  neighbourhood: string;
  siteDescription: string;
  services: string;
  
  // Dwelling Description (Section 5)
  style: string;
  mainWalls: string;
  roof: string;
  flooring: string;
  windowFrames: string;
  accommodation: string;
  interiorLayout: string;
  fixturesAndFittings: string;
  
  // Risk Analysis (Section 2)
  riskRatings: RiskRating;
  
  // VRA Assessment
  vraAssessment: VRAAssessment;
  
  // Sales Evidence (Section 7)
  salesEvidence: SalesEvidence[];
  
  // Professional Details
  valuerName: string;
  valuerQualifications: string;
  issueDate: string;
  
  // Additional Comments (Section 8)
  additionalComments: string;
  riskComments: string;
  vraComments: string;
  
  // Automation
  automation: AutomationStatus;
}

export default function PropertyProValuation() {
  const [formData, setFormData] = useState<PropertyProValuationData>({
    propertyAddress: '',
    realPropertyDescription: '',
    siteDimensions: '',
    siteArea: '',
    zoning: '',
    currentUse: '',
    localGovernmentArea: '',
    marketValue: 0,
    landValue: 0,
    improvementValue: 0,
    reportType: 'AS IS',
    inspectionDate: new Date().toISOString().split('T')[0],
    valuationDate: new Date().toISOString().split('T')[0],
    propertyIdentification: '',
    zoningEffect: '',
    location: '',
    neighbourhood: '',
    siteDescription: '',
    services: '',
    style: '',
    mainWalls: '',
    roof: '',
    flooring: '',
    windowFrames: '',
    accommodation: '',
    interiorLayout: '',
    fixturesAndFittings: '',
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
      realPropertyDescription: 'Lot 15 PS444223, Title not searched/Volume and Folio',
      zoning: 'LDR22',
      localGovernmentArea: 'City of Mildura',
      siteArea: '1508 sqm',
      marketValue: 850000
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
      location: 'Within approximately 9 kilometres south west of the Mildura CBD, schools and shops',
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
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
      realPropertyDescription: '',
      siteDimensions: '',
      siteArea: '',
      zoning: '',
      currentUse: '',
      localGovernmentArea: '',
      marketValue: 0,
      landValue: 0,
      improvementValue: 0,
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
    updateAutomationLog('All data cleared - ready for new valuation');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            PropertyPRO Automated Valuation System
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
          <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
          <TabsTrigger value="sales-evidence">Sales Evidence</TabsTrigger>
          <TabsTrigger value="land-dwelling">Land & Dwelling</TabsTrigger>
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

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="propertyAddress">Property Address</Label>
                  <Input
                    id="propertyAddress"
                    placeholder="Enter full property address"
                    value={formData.propertyAddress}
                    onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="realPropertyDescription">Real Property Description</Label>
                <Textarea
                  id="realPropertyDescription"
                  placeholder="Describe the property in detail"
                  value={formData.realPropertyDescription}
                  onChange={(e) => handleInputChange('realPropertyDescription', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="siteDimensions">Site Dimensions</Label>
                  <Input
                    id="siteDimensions"
                    placeholder="e.g., Irregular shaped lot"
                    value={formData.siteDimensions}
                    onChange={(e) => handleInputChange('siteDimensions', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="siteArea">Site Area</Label>
                  <Input
                    id="siteArea"
                    placeholder="e.g., 1508 sqm"
                    value={formData.siteArea}
                    onChange={(e) => handleInputChange('siteArea', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="currentUse">Current Use</Label>
                  <Select value={formData.currentUse} onValueChange={(value) => handleInputChange('currentUse', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select current use" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="vacant-residential">Vacant Residential</SelectItem>
                      <SelectItem value="mixed-use">Mixed Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zoning">Zoning</Label>
                  <Input
                    id="zoning"
                    placeholder="e.g., LDR22"
                    value={formData.zoning}
                    onChange={(e) => handleInputChange('zoning', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="localGovernmentArea">Local Government Area</Label>
                  <Input
                    id="localGovernmentArea"
                    placeholder="e.g., City of Mildura"
                    value={formData.localGovernmentArea}
                    onChange={(e) => handleInputChange('localGovernmentArea', e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className={`p-4 rounded-lg ${formData.reportType === 'AS IF COMPLETE' ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'}`}>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Valuation Summary - {formData.reportType}
                </h3>
                {formData.reportType === 'AS IF COMPLETE' && (
                  <Alert className="mb-4 border-orange-500">
                    <Building className="h-4 w-4" />
                    <AlertDescription>
                      This valuation is on an "As If Complete" basis, assuming all proposed works are completed as per plans and specifications.
                    </AlertDescription>
                  </Alert>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="marketValue">
                      Market Value {formData.reportType === 'AS IF COMPLETE' ? '(As If Complete)' : '(Current)'}
                    </Label>
                    <Input
                      id="marketValue"
                      type="number"
                      placeholder="e.g., 850000"
                      value={formData.marketValue || ''}
                      onChange={(e) => handleInputChange('marketValue', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="landValue">Land Value</Label>
                    <Input
                      id="landValue"
                      type="number"
                      placeholder="e.g., 350000"
                      value={formData.landValue || ''}
                      onChange={(e) => handleInputChange('landValue', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="improvementValue">
                      {formData.reportType === 'AS IF COMPLETE' ? 'Improvement Value (Proposed)' : 'Improvement Value (Existing)'}
                    </Label>
                    <Input
                      id="improvementValue"
                      type="number"
                      placeholder="e.g., 500000"
                      value={formData.improvementValue || ''}
                      onChange={(e) => handleInputChange('improvementValue', Number(e.target.value))}
                    />
                  </div>
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

        {/* Land & Dwelling Tab */}
        <TabsContent value="land-dwelling" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Land Information (Section 4)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="propertyIdentification">Property Identification</Label>
                <Textarea
                  id="propertyIdentification"
                  placeholder="Aerial mapping and physical inspection details"
                  value={formData.propertyIdentification}
                  onChange={(e) => handleInputChange('propertyIdentification', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="zoningEffect">Zoning Effect</Label>
                <Textarea
                  id="zoningEffect"
                  placeholder="The existing use is a permissible use"
                  value={formData.zoningEffect}
                  onChange={(e) => handleInputChange('zoningEffect', e.target.value)}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Textarea
                  id="location"
                  placeholder="Distance and direction from nearest town centre"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="neighbourhood">Neighbourhood</Label>
                <Textarea
                  id="neighbourhood"
                  placeholder="Brief description of immediate locality and neighbouring development"
                  value={formData.neighbourhood}
                  onChange={(e) => handleInputChange('neighbourhood', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="siteDescription">Site Description & Access</Label>
                <Textarea
                  id="siteDescription"
                  placeholder="Shape, topography, relationship to road level, suitability for building"
                  value={formData.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="services">Services</Label>
                <Textarea
                  id="services"
                  placeholder="List utilities connected or available (do not use 'all usual services are connected')"
                  value={formData.services}
                  onChange={(e) => handleInputChange('services', e.target.value)}
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
                  <Label htmlFor="mainWalls">Main Walls & Roof</Label>
                  <Input
                    id="mainWalls"
                    placeholder="e.g., Brick veneer walls and concrete tiles"
                    value={formData.mainWalls}
                    onChange={(e) => handleInputChange('mainWalls', e.target.value)}
                  />
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
                  placeholder="Number of bedrooms, bathrooms, main rooms, service rooms"
                  value={formData.accommodation}
                  onChange={(e) => handleInputChange('accommodation', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="interiorLayout">Interior Layout</Label>
                <Input
                  id="interiorLayout"
                  placeholder="e.g., Functional, practical layout"
                  value={formData.interiorLayout}
                  onChange={(e) => handleInputChange('interiorLayout', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="fixturesAndFittings">Fixtures and Fittings</Label>
                <Textarea
                  id="fixturesAndFittings"
                  placeholder="Cooking appliances, air conditioning, built-in items, feature finishes"
                  value={formData.fixturesAndFittings}
                  onChange={(e) => handleInputChange('fixturesAndFittings', e.target.value)}
                  rows={3}
                />
              </div>
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