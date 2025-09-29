import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Play, RefreshCw, Wrench } from 'lucide-react';
import { toast } from 'sonner';
import ISFVPlatform from './ISFVPlatform';
import { checkReportContradictions } from '@/utils/reportContradictionChecker';
import { runAutomatedAmendment } from '@/utils/contradictionAmender';

// Demo Properties for ISFV - Using original ISFV structure
const isfvDemoProperties = [
  {
    name: "Luxury Apartment Complex - St Kilda",
    address: "88 Marine Parade, St Kilda VIC 3182",
    type: "Instant Short Form Valuation",
    reportType: "ISFV",
    features: "Harbor views, premium finishes, rooftop terrace"
  },
  {
    name: "Family Home - Brighton",
    address: "42 Church Street, Brighton VIC 3186",
    type: "Instant Short Form Valuation", 
    reportType: "ISFV",
    features: "Period home, garden, close to beach"
  }
];

// Demo Properties for PAF - Property Assessment Framework (Long Form, Short Form, Sustino Pro)
const pafDemoProperties = [
  {
    name: "Commercial Office Building - CBD",
    address: "123 Collins Street, Melbourne VIC 3000",
    type: "Commercial Property Valuation",
    reportType: "Long Form Property Valuation",
    features: "Prime CBD location, 25 floors, modern amenities"
  },
  {
    name: "Industrial Warehouse - Dandenong",
    address: "45 Industrial Drive, Dandenong VIC 3175", 
    type: "Industrial Property Valuation",
    reportType: "Short Form Property Valuation",
    features: "Large warehouse, truck access, rail proximity"
  },
  {
    name: "Mixed Use Development - Fitzroy",
    address: "78 Smith Street, Fitzroy VIC 3065",
    type: "Mixed Use Property Valuation", 
    reportType: "Sustino Pro Property Valuation",
    features: "Retail ground floor, apartments above, heritage facade"
  }
];

// Demo Properties for ICV - Independent Commercial Valuation (Long Form, Short Form, Sustino Pro)
const icvDemoProperties = [
  {
    name: "Shopping Centre - Chadstone",
    address: "200 Chadstone Road, Chadstone VIC 3148",
    type: "Retail Property Valuation",
    reportType: "Long Form Property Valuation", 
    features: "Major shopping center, 150+ stores, entertainment"
  },
  {
    name: "Medical Centre - Richmond",
    address: "67 Swan Street, Richmond VIC 3121",
    type: "Healthcare Property Valuation",
    reportType: "Short Form Property Valuation",
    features: "Medical suites, specialist equipment, parking"
  },
  {
    name: "Hotel - Daylesford",
    address: "25 Vincent Street, Daylesford VIC 3460", 
    type: "Hospitality Property Valuation",
    reportType: "Sustino Pro Property Valuation",
    features: "Boutique hotel, spa facilities, restaurant"
  }
];

export default function GenerateMockReports() {
  const [selectedISFVProperty, setSelectedISFVProperty] = useState('');
  const [selectedPAFProperty, setSelectedPAFProperty] = useState('');
  const [selectedICVProperty, setSelectedICVProperty] = useState('');
  const [isfvGenerated, setISFVGenerated] = useState(false);
  const [pafGenerated, setPAFGenerated] = useState(false);
  const [icvGenerated, setICVGenerated] = useState(false);
  const [isfvGenerating, setISFVGenerating] = useState(false);
  const [pafGenerating, setPAFGenerating] = useState(false);
  const [icvGenerating, setICVGenerating] = useState(false);

  // Demo report data - immediately available
  const [isfvReportData, setISFVReportData] = useState({
    propertyAddress: "88 Marine Parade, St Kilda VIC 3182",
    estimatedValue: 850000,
    confidence: 'high',
    riskScore: 2,
    automationStatus: 'completed',
    lastUpdated: new Date().toLocaleString(),
    mockData: {
      propertyData: {
        propertyType: "Luxury Apartment",
        landArea: "850 sqm",
        buildingArea: "220 sqm", 
        bedrooms: 2,
        bathrooms: 2,
        carSpaces: 2,
        yearBuilt: 2019,
        structural_condition: 'excellent',
        kitchen_condition: 'modern',
        overall_condition: 'excellent'
      },
      riskRatings: {
        environmental: 2,
        structural: 1,
        market: 2,
        legal: 1,
        economic: 2
      },
      vraAssessment: {
        comments: 'Premium waterfront apartment with excellent construction quality.',
        recommendations: 'Property presents minimal risk with strong market position.'
      },
      salesEvidence: [
        {
          id: '1',
          address: '92 Marine Parade, St Kilda', 
          salePrice: 820000,
          reliability: 'high',
          date: 'Jun 2024'
        }
      ],
      generalComments: 'High-quality waterfront apartment in prime St Kilda location.',
      contradictionResults: 'No contradictions detected. All data points are consistent.'
    }
  });

  const [pafReportData, setPAFReportData] = useState({
    propertyAddress: "123 Collins Street, Melbourne VIC 3000",
    estimatedValue: 25000000,
    reportType: "Long Form Property Valuation",
    mockData: {
      executiveSummary: "Prime CBD office building with excellent tenant mix and strong income stream",
      propertyDetails: "25-floor modern office building with premium finishes and building amenities",
      marketAnalysis: "CBD office market showing strong demand with limited new supply",
      incomeAnalysis: "Net income of $2.1M annually with WALE of 4.2 years",
      riskAssessment: "Low risk profile due to prime location and quality tenants"
    }
  });

  const [icvReportData, setICVReportData] = useState({
    propertyAddress: "200 Chadstone Road, Chadstone VIC 3148", 
    estimatedValue: 180000000,
    reportType: "Long Form Property Valuation",
    mockData: {
      executiveSummary: "Major regional shopping centre with dominant market position",
      propertyDetails: "150+ specialty stores, major anchors, entertainment precinct",
      marketAnalysis: "Retail market recovering with strong consumer spending in region",
      incomeAnalysis: "Total net income of $15.2M with specialty shop growth of 3.8%",
      riskAssessment: "Medium risk due to changing retail landscape and online competition"
    }
  });

  // Contradiction and amendment states
  const [isfvContradictions, setISFVContradictions] = useState([]);
  const [pafContradictions, setPAFContradictions] = useState([]);
  const [icvContradictions, setICVContradictions] = useState([]);
  const [isfvAmendments, setISFVAmendments] = useState([]);
  const [pafAmendments, setPAFAmendments] = useState([]);
  const [icvAmendments, setICVAmendments] = useState([]);
  const [isfvAmending, setISFVAmending] = useState(false);
  const [pafAmending, setPAFAmending] = useState(false);
  const [icvAmending, setICVAmending] = useState(false);

  // Clear data functions
  const clearISFVData = () => {
    setSelectedISFVProperty('');
    setISFVGenerated(false);
    setISFVContradictions([]);
    setISFVAmendments([]);
    setISFVReportData({
      propertyAddress: "",
      estimatedValue: 0,
      confidence: 'medium',
      riskScore: 0,
      automationStatus: 'idle',
      lastUpdated: '',
      mockData: {
        propertyData: {
          propertyType: "",
          landArea: "",
          buildingArea: "",
          bedrooms: 0,
          bathrooms: 0,
          carSpaces: 0,
          yearBuilt: 0,
          structural_condition: '',
          kitchen_condition: '',
          overall_condition: ''
        },
        riskRatings: {
          environmental: 0,
          structural: 0,
          market: 0,
          legal: 0,
          economic: 0
        },
        vraAssessment: { comments: '', recommendations: '' },
        salesEvidence: [],
        generalComments: '',
        contradictionResults: ''
      }
    });
    toast.success('ISFV data cleared successfully');
  };

  const clearPAFData = () => {
    setSelectedPAFProperty('');
    setPAFGenerated(false);
    setPAFContradictions([]);
    setPAFAmendments([]);
    setPAFReportData({
      propertyAddress: "",
      estimatedValue: 0,
      reportType: "",
      mockData: {
        executiveSummary: "",
        propertyDetails: "",
        marketAnalysis: "",
        incomeAnalysis: "",
        riskAssessment: ""
      }
    });
    toast.success('PAF data cleared successfully');
  };

  const clearICVData = () => {
    setSelectedICVProperty('');
    setICVGenerated(false);
    setICVContradictions([]);
    setICVAmendments([]);
    setICVReportData({
      propertyAddress: "",
      estimatedValue: 0,
      reportType: "",
      mockData: {
        executiveSummary: "",
        propertyDetails: "",
        marketAnalysis: "",
        incomeAnalysis: "",
        riskAssessment: ""
      }
    });
    toast.success('ICV data cleared successfully');
  };

  // Generate functions - instant generation for demo
  const generateISFVReport = async () => {
    if (!selectedISFVProperty) {
      toast.error('Please select a property first');
      return;
    }

    setISFVGenerating(true);
    
    // Update with selected property data
    const selectedProp = isfvDemoProperties.find(p => p.name === selectedISFVProperty);
    if (selectedProp) {
      setISFVReportData(prev => ({
        ...prev,
        propertyAddress: selectedProp.address
      }));
    }
    
    // Instant generation for demo
    setTimeout(() => {
      setISFVGenerated(true);
      setISFVGenerating(false);
      toast.success('ISFV Report Generated Successfully! All tabs now contain complete data.');
    }, 500);
  };

  const generatePAFReport = async () => {
    if (!selectedPAFProperty) {
      toast.error('Please select a property first');
      return;
    }

    setPAFGenerating(true);
    
    // Update with selected property data
    const selectedProp = pafDemoProperties.find(p => p.name === selectedPAFProperty);
    if (selectedProp) {
      setPAFReportData(prev => ({
        ...prev,
        propertyAddress: selectedProp.address,
        reportType: selectedProp.reportType
      }));
    }
    
    // Instant generation for demo
    setTimeout(() => {
      setPAFGenerated(true);
      setPAFGenerating(false);
      toast.success('PAF Report Generated Successfully! All tabs now contain complete data.');
    }, 500);
  };

  const generateICVReport = async () => {
    if (!selectedICVProperty) {
      toast.error('Please select a property first');
      return;
    }

    setICVGenerating(true);
    
    // Update with selected property data
    const selectedProp = icvDemoProperties.find(p => p.name === selectedICVProperty);
    if (selectedProp) {
      setICVReportData(prev => ({
        ...prev,
        propertyAddress: selectedProp.address,
        reportType: selectedProp.reportType
      }));
    }
    
    // Instant generation for demo
    setTimeout(() => {
      setICVGenerated(true);
      setICVGenerating(false);
      toast.success('ICV Report Generated Successfully! All tabs now contain complete data.');
    }, 500);
  };

  // Contradiction checking functions
  const runISFVContradictionCheck = async () => {
    if (!isfvGenerated) {
      toast.error('Please generate ISFV report first');
      return;
    }

    const contradictions = checkReportContradictions(isfvReportData.mockData);
    const mockContradictions = [
      { section: 'Property Data', issue: 'Modern kitchen condition contradicts overall property age assessment', severity: 'medium' },
      { section: 'Risk Analysis', issue: 'Environmental risk rating may be understated for coastal location', severity: 'low' }
    ];
    
    setISFVContradictions(mockContradictions);
    toast.success(`ISFV Contradiction check completed - ${mockContradictions.length} potential issues found`);
  };

  const runPAFContradictionCheck = async () => {
    if (!pafGenerated) {
      toast.error('Please generate PAF report first');
      return;
    }

    const mockContradictions = [
      { section: 'Income Analysis', issue: 'Rental growth assumptions may be optimistic given market conditions', severity: 'medium' },
      { section: 'Market Analysis', issue: 'Comparable sales data requires verification for accuracy', severity: 'low' }
    ];
    
    setPAFContradictions(mockContradictions);
    toast.success(`PAF Contradiction check completed - ${mockContradictions.length} potential issues found`);
  };

  const runICVContradictionCheck = async () => {
    if (!icvGenerated) {
      toast.error('Please generate ICV report first');
      return;
    }

    const mockContradictions = [
      { section: 'Retail Analysis', issue: 'Online retail impact assessment may need updating', severity: 'high' },
      { section: 'Income Analysis', issue: 'Specialty shop vacancy rates conflict with occupancy assumptions', severity: 'medium' }
    ];
    
    setICVContradictions(mockContradictions);
    toast.success(`ICV Contradiction check completed - ${mockContradictions.length} potential issues found`);
  };

  // Amendment functions
  const runISFVAmendment = async () => {
    setISFVAmending(true);
    
    try {
      // Create a proper ContradictionResult object
      const contradictionResult = {
        hasContradictions: true,
        contradictions: isfvContradictions.map(c => c.issue || c),
        warnings: []
      };
      
      const result = await runAutomatedAmendment(isfvReportData.mockData, contradictionResult);
      const amendments = result.amendments || [];
      setISFVAmendments(amendments);
      
      toast.success(`ISFV amendments completed - ${amendments.length} sections updated`);
    } catch (error) {
      toast.error('Amendment process failed');
    } finally {
      setISFVAmending(false);
    }
  };

  const runPAFAmendment = async () => {
    setPAFAmending(true);
    
    try {
      // Create mock data compatible with ReportData interface
      const mockReportData = {
        propertyData: { propertyType: "Commercial Office" },
        riskRatings: { overall: 2 },
        vraAssessment: { comments: "Assessment complete" },
        salesEvidence: [],
        generalComments: "Commercial property assessment"
      };
      
      // Create a proper ContradictionResult object
      const contradictionResult = {
        hasContradictions: true,
        contradictions: pafContradictions.map(c => c.issue || c),
        warnings: []
      };
      
      const result = await runAutomatedAmendment(mockReportData, contradictionResult);
      const amendments = result.amendments || [];
      setPAFAmendments(amendments);
      
      toast.success(`PAF amendments completed - ${amendments.length} sections updated`);
    } catch (error) {
      toast.error('Amendment process failed');
    } finally {
      setPAFAmending(false);
    }
  };

  const runICVAmendment = async () => {
    setICVAmending(true);
    
    try {
      // Create mock data compatible with ReportData interface
      const mockReportData = {
        propertyData: { propertyType: "Retail Shopping Centre" },
        riskRatings: { overall: 3 },
        vraAssessment: { comments: "Assessment complete" },
        salesEvidence: [],
        generalComments: "Retail property assessment"
      };
      
      // Create a proper ContradictionResult object
      const contradictionResult = {
        hasContradictions: true,
        contradictions: icvContradictions.map(c => c.issue || c),
        warnings: []
      };
      
      const result = await runAutomatedAmendment(mockReportData, contradictionResult);
      const amendments = result.amendments || [];
      setICVAmendments(amendments);
      
      toast.success(`ICV amendments completed - ${amendments.length} sections updated`);
    } catch (error) {
      toast.error('Amendment process failed');
    } finally {
      setICVAmending(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">EPAT™ Demo Reports</h1>
        <p className="text-lg text-muted-foreground">
          Experience our complete valuation platform with instant report generation
        </p>
      </div>

      <Tabs defaultValue="isfv" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="isfv">ISFV Demo</TabsTrigger>
          <TabsTrigger value="paf">PAF Demo</TabsTrigger>
          <TabsTrigger value="icv">ICV Demo</TabsTrigger>
        </TabsList>

        {/* ISFV Demo Tab */}
        <TabsContent value="isfv" className="space-y-6">
          <Card className="border-2 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                ISFV Platform Demo - Complete Report Ready
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Selected Property</Label>
                  <Select value={selectedISFVProperty} onValueChange={setSelectedISFVProperty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select demo property..." />
                    </SelectTrigger>
                    <SelectContent>
                      {isfvDemoProperties.map((property, index) => (
                        <SelectItem key={index} value={property.name}>
                          {property.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Address</Label>
                  <Input value="88 Marine Parade, St Kilda VIC 3182" readOnly />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Report Type</Label>
                  <Input value="ISFV - Instant Short Form Valuation" readOnly />
                </div>
                <div>
                  <Label>Estimated Value</Label>
                  <Input value="$850,000" readOnly className="font-bold text-green-700" />
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button 
                  onClick={generateISFVReport}
                  disabled={isfvGenerating}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isfvGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Generate ISFV Report
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={clearISFVData}
                  variant="outline"
                  className="border-gray-300"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
                
                {isfvGenerated && (
                  <>
                    <Button 
                      onClick={runISFVContradictionCheck}
                      variant="outline"
                      className="border-orange-300"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Run Contradiction Check ({isfvContradictions.length})
                    </Button>
                    
                    {isfvContradictions.length > 0 && (
                      <Button 
                        onClick={runISFVAmendment}
                        disabled={isfvAmending}
                        variant="outline"
                        className="border-blue-300"
                      >
                        {isfvAmending ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Wrench className="h-4 w-4 mr-2" />
                        )}
                        Auto-Amend ({isfvAmendments.length})
                      </Button>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Show ISFV Platform when generated */}
          {isfvGenerated && (
            <Card>
              <CardHeader>
                <CardTitle>ISFV Platform - Live Demo</CardTitle>
              </CardHeader>
              <CardContent>
                <ISFVPlatform />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* PAF Demo Tab */}
        <TabsContent value="paf" className="space-y-6">
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                PAF Platform Demo - Complete Report Ready
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Selected Property</Label>
                  <Select value={selectedPAFProperty} onValueChange={setSelectedPAFProperty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select demo property..." />
                    </SelectTrigger>
                    <SelectContent>
                      {pafDemoProperties.map((property, index) => (
                        <SelectItem key={index} value={property.name}>
                          {property.name} - {property.reportType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Address</Label>
                  <Input value="123 Collins Street, Melbourne VIC 3000" readOnly />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Report Type</Label>
                  <Input value="Long Form Property Valuation" readOnly />
                </div>
                <div>
                  <Label>Estimated Value</Label>
                  <Input value="$25,000,000" readOnly className="font-bold text-blue-700" />
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button 
                  onClick={generatePAFReport}
                  disabled={pafGenerating}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {pafGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Generate PAF Report
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={clearPAFData}
                  variant="outline"
                  className="border-gray-300"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
                
                {pafGenerated && (
                  <>
                    <Button 
                      onClick={runPAFContradictionCheck}
                      variant="outline"
                      className="border-orange-300"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Run Contradiction Check ({pafContradictions.length})
                    </Button>
                    
                    {pafContradictions.length > 0 && (
                      <Button 
                        onClick={runPAFAmendment}
                        disabled={pafAmending}
                        variant="outline"
                        className="border-blue-300"
                      >
                        {pafAmending ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Wrench className="h-4 w-4 mr-2" />
                        )}
                        Auto-Amend ({pafAmendments.length})
                      </Button>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* PAF Report Display */}
          {pafGenerated && (
            <Card>
              <CardHeader>
                <CardTitle>PAF Report - All Tabs Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg bg-green-50">
                    <h4 className="font-semibold text-green-800">Executive Summary</h4>
                    <p className="text-sm text-green-700 mt-2">{pafReportData.mockData.executiveSummary}</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <h4 className="font-semibold text-blue-800">Property Details</h4>
                    <p className="text-sm text-blue-700 mt-2">{pafReportData.mockData.propertyDetails}</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-purple-50">
                    <h4 className="font-semibold text-purple-800">Market Analysis</h4>
                    <p className="text-sm text-purple-700 mt-2">{pafReportData.mockData.marketAnalysis}</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-orange-50">
                    <h4 className="font-semibold text-orange-800">Income Analysis</h4>
                    <p className="text-sm text-orange-700 mt-2">{pafReportData.mockData.incomeAnalysis}</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-red-50">
                    <h4 className="font-semibold text-red-800">Risk Assessment</h4>
                    <p className="text-sm text-red-700 mt-2">{pafReportData.mockData.riskAssessment}</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-semibold text-gray-800">All Tabs Complete</h4>
                    <p className="text-sm text-gray-700 mt-2">✓ Every section filled with comprehensive data</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* ICV Demo Tab */}
        <TabsContent value="icv" className="space-y-6">
          <Card className="border-2 border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                ICV Platform Demo - Complete Report Ready
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Selected Property</Label>
                  <Select value={selectedICVProperty} onValueChange={setSelectedICVProperty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select demo property..." />
                    </SelectTrigger>
                    <SelectContent>
                      {icvDemoProperties.map((property, index) => (
                        <SelectItem key={index} value={property.name}>
                          {property.name} - {property.reportType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Address</Label>
                  <Input value="200 Chadstone Road, Chadstone VIC 3148" readOnly />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Report Type</Label>
                  <Input value="Long Form Property Valuation" readOnly />
                </div>
                <div>
                  <Label>Estimated Value</Label>
                  <Input value="$180,000,000" readOnly className="font-bold text-purple-700" />
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button 
                  onClick={generateICVReport}
                  disabled={icvGenerating}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {icvGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Generate ICV Report
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={clearICVData}
                  variant="outline"
                  className="border-gray-300"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
                
                {icvGenerated && (
                  <>
                    <Button 
                      onClick={runICVContradictionCheck}
                      variant="outline"
                      className="border-orange-300"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Run Contradiction Check ({icvContradictions.length})
                    </Button>
                    
                    {icvContradictions.length > 0 && (
                      <Button 
                        onClick={runICVAmendment}
                        disabled={icvAmending}
                        variant="outline"
                        className="border-blue-300"
                      >
                        {icvAmending ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Wrench className="h-4 w-4 mr-2" />
                        )}
                        Auto-Amend ({icvAmendments.length})
                      </Button>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* ICV Report Display */}
          {icvGenerated && (
            <Card>
              <CardHeader>
                <CardTitle>ICV Report - All Tabs Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg bg-green-50">
                    <h4 className="font-semibold text-green-800">Executive Summary</h4>
                    <p className="text-sm text-green-700 mt-2">{icvReportData.mockData.executiveSummary}</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <h4 className="font-semibold text-blue-800">Property Details</h4>
                    <p className="text-sm text-blue-700 mt-2">{icvReportData.mockData.propertyDetails}</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-purple-50">
                    <h4 className="font-semibold text-purple-800">Market Analysis</h4>
                    <p className="text-sm text-purple-700 mt-2">{icvReportData.mockData.marketAnalysis}</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-orange-50">
                    <h4 className="font-semibold text-orange-800">Income Analysis</h4>
                    <p className="text-sm text-orange-700 mt-2">{icvReportData.mockData.incomeAnalysis}</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-red-50">
                    <h4 className="font-semibold text-red-800">Risk Assessment</h4>
                    <p className="text-sm text-red-700 mt-2">{icvReportData.mockData.riskAssessment}</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-semibold text-gray-800">All Tabs Complete</h4>
                    <p className="text-sm text-gray-700 mt-2">✓ Every section filled with comprehensive data</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}