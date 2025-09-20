import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, FileText, CheckCircle, Sparkles, RefreshCw, Save, Search, Database, Download } from "lucide-react";
import { useReportData } from "@/contexts/ReportDataContext";
import { useProperty } from "@/contexts/PropertyContext";
import { useUniversalSave } from "@/hooks/useUniversalSave";
import { useToast } from "@/hooks/use-toast";

interface LotPlanData {
  lotNumber: string;
  planNumber: string;
  source: 'manual' | 'planning' | 'rpdata' | 'pricefinder' | 'ocr';
  confidence: number;
  lastUpdated: string;
}

const EnhancedLegalAndPlanning = () => {
  const { saveData, loadData, isSaving, lastSaved } = useUniversalSave('EnhancedLegalAndPlanning', { showToast: false });
  const { toast } = useToast();
  const { reportData, updateReportData, getIntegratedData } = useReportData();
  const { addressData } = useProperty();
  const [includeInReport, setIncludeInReport] = useState(true);
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  const [isExtractingLotPlan, setIsExtractingLotPlan] = useState(false);
  
  // Lot and Plan data with PAF integration
  const [lotPlanData, setLotPlanData] = useState<LotPlanData>({
    lotNumber: "",
    planNumber: "", 
    source: 'manual',
    confidence: 0,
    lastUpdated: ""
  });

  const [extractionHistory, setExtractionHistory] = useState<LotPlanData[]>([]);
  
  const [planningData, setPlanningData] = useState({
    lga: "",
    zoning: "",
    zoneName: "",
    zoneDescription: "",
    currentUse: "",
    permissibleUse: "",
    permitNumber: "",
    overlays: "",
    overlayImpactAssessment: "",
    overlayImpactRating: "",
    heightOfBuilding: "",
    floorSpaceRatio: "",
    minimumLotSize: "",
    planningRestrictions: "",
    developmentPotential: "",
    planningScheme: "",
    mapReference: "",
    lastUpdated: ""
  });

  // Load data from multiple sources and integrate lot/plan from PAF workflow
  useEffect(() => {
    const integratedData = getIntegratedData();
    console.log('Enhanced Legal and Planning - Loading integrated data:', integratedData);
    
    // Load lot/plan from multiple PAF sources with priority order
    extractLotPlanFromPAFSources(integratedData);
    
    // Load planning data from assessment workflow
    if (integratedData.planningData) {
      console.log('Loading from planning data:', integratedData.planningData);
      const planning = integratedData.planningData;
      setPlanningData(prev => ({
        ...prev,
        lga: planning.lga || "",
        zoning: planning.zoneName || planning.zoning || "",
        zoneName: planning.zoneName || "",
        zoneDescription: planning.zoneDescription || "",
        currentUse: planning.currentUse || "",
        permissibleUse: planning.permittedUse || planning.landUse || "",
        overlays: Array.isArray(planning.overlays) ? planning.overlays.join(", ") : (planning.overlays || ""),
        heightOfBuilding: planning.heightRestrictions || planning.heightRestriction || "",
        developmentPotential: planning.developmentPotential || "",
        planningRestrictions: planning.overlays && Array.isArray(planning.overlays) && planning.overlays.length > 0 
          ? `Planning overlays apply: ${planning.overlays.join(", ")}` 
          : "",
        planningScheme: planning.planningScheme || "",
        mapReference: planning.mapReference || "",
        lastUpdated: planning.lastUpdated || new Date().toISOString()
      }));
    }
    
    // Load saved data
    loadData().then(savedData => {
      if (savedData?.planningData) {
        setPlanningData(prev => ({
          ...prev,
          ...savedData.planningData
        }));
      }
      if (savedData?.lotPlanData) {
        setLotPlanData(savedData.lotPlanData);
      }
      if (savedData?.extractionHistory) {
        setExtractionHistory(savedData.extractionHistory);
      }
    });
    
    // Check for existing legal and planning data
    if (integratedData.legalAndPlanning) {
      setPlanningData(prev => ({
        ...prev,
        ...integratedData.legalAndPlanning
      }));
    }
  }, [getIntegratedData, loadData]);

  // Extract lot and plan from PAF workflow sources
  const extractLotPlanFromPAFSources = (integratedData: any) => {
    const sources = [
      { data: integratedData.planningData, source: 'planning' as const },
      { data: integratedData.propertySearchData, source: 'rpdata' as const },
      { data: integratedData.fileAttachments, source: 'ocr' as const }
    ];

    for (const { data, source } of sources) {
      if (data && (data.lotNumber || data.planNumber)) {
        const newLotPlanData: LotPlanData = {
          lotNumber: data.lotNumber || lotPlanData.lotNumber,
          planNumber: data.planNumber || lotPlanData.planNumber,
          source,
          confidence: calculateConfidence(source, data),
          lastUpdated: new Date().toISOString()
        };

        setLotPlanData(newLotPlanData);
        addToExtractionHistory(newLotPlanData);
        break; // Use first available source
      }
    }
  };

  const calculateConfidence = (source: LotPlanData['source'], data: any): number => {
    switch (source) {
      case 'planning': return data.verified ? 95 : 85;
      case 'rpdata': return 90;
      case 'pricefinder': return 88;
      case 'ocr': return 75;
      default: return 100; // manual
    }
  };

  const addToExtractionHistory = (newData: LotPlanData) => {
    setExtractionHistory(prev => {
      const existing = prev.find(item => 
        item.source === newData.source && 
        item.lotNumber === newData.lotNumber && 
        item.planNumber === newData.planNumber
      );
      if (existing) return prev;
      return [newData, ...prev].slice(0, 5); // Keep last 5 attempts
    });
  };

  // Enhanced lot/plan extraction from specific PAF sources
  const extractFromPlanningSearch = async () => {
    setIsExtractingLotPlan(true);
    try {
      // Simulate planning search API integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const extractedData: LotPlanData = {
        lotNumber: "15",
        planNumber: "PS123456",
        source: 'planning',
        confidence: 95,
        lastUpdated: new Date().toISOString()
      };
      
      setLotPlanData(extractedData);
      addToExtractionHistory(extractedData);
      updatePAFData(extractedData);
      
      toast({
        title: "Planning search completed",
        description: "Lot and plan numbers extracted from planning search",
      });
    } catch (error) {
      console.error('Planning search extraction failed:', error);
      toast({
        title: "Planning search failed",
        description: "Could not extract lot/plan from planning search",
        variant: "destructive"
      });
    } finally {
      setIsExtractingLotPlan(false);
    }
  };

  const extractFromRPData = async () => {
    setIsExtractingLotPlan(true);
    try {
      // Simulate RP Data API integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const extractedData: LotPlanData = {
        lotNumber: "15",
        planNumber: "PS123456",
        source: 'rpdata',
        confidence: 90,
        lastUpdated: new Date().toISOString()
      };
      
      setLotPlanData(extractedData);
      addToExtractionHistory(extractedData);
      updatePAFData(extractedData);
      
      toast({
        title: "RP Data extraction completed",
        description: "Lot and plan numbers extracted from RP Data",
      });
    } catch (error) {
      console.error('RP Data extraction failed:', error);
      toast({
        title: "RP Data extraction failed",
        description: "Could not extract lot/plan from RP Data",
        variant: "destructive"
      });
    } finally {
      setIsExtractingLotPlan(false);
    }
  };

  const extractFromPRICEfinder = async () => {
    setIsExtractingLotPlan(true);
    try {
      // Simulate PRICE finder API integration
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      const extractedData: LotPlanData = {
        lotNumber: "15",
        planNumber: "PS123456",
        source: 'pricefinder',
        confidence: 88,
        lastUpdated: new Date().toISOString()
      };
      
      setLotPlanData(extractedData);
      addToExtractionHistory(extractedData);
      updatePAFData(extractedData);
      
      toast({
        title: "PRICE finder extraction completed",
        description: "Lot and plan numbers extracted from PRICE finder",
      });
    } catch (error) {
      console.error('PRICE finder extraction failed:', error);
      toast({
        title: "PRICE finder extraction failed",
        description: "Could not extract lot/plan from PRICE finder",
        variant: "destructive"
      });
    } finally {
      setIsExtractingLotPlan(false);
    }
  };

  // Update PAF data with lot/plan information
  const updatePAFData = (lotPlanData: LotPlanData) => {
    // Update address data in Property Assessment Form workflow
    updateReportData('propertySearchData', {
      ...reportData?.propertySearchData,
      lotNumber: lotPlanData.lotNumber,
      planNumber: lotPlanData.planNumber,
      lastUpdated: lotPlanData.lastUpdated
    });
    
    // Update planning data
    updateReportData('planningData', {
      ...reportData?.planningData,
      lotNumber: lotPlanData.lotNumber,
      planNumber: lotPlanData.planNumber,
      lastUpdated: lotPlanData.lastUpdated
    });
  };

  const handleLotPlanChange = (field: 'lotNumber' | 'planNumber', value: string) => {
    const updatedData: LotPlanData = {
      ...lotPlanData,
      [field]: value,
      source: 'manual',
      confidence: 100,
      lastUpdated: new Date().toISOString()
    };
    
    setLotPlanData(updatedData);
    updatePAFData(updatedData);
  };

  const restoreFromHistory = (historicalData: LotPlanData) => {
    setLotPlanData(historicalData);
    updatePAFData(historicalData);
    toast({
      title: "Data restored",
      description: `Restored lot/plan data from ${historicalData.source} extraction`,
    });
  };

  const handleAutoGenerate = async () => {
    setIsAutoGenerating(true);
    try {
      // Generate intelligent defaults based on address and existing data
      const suburb = addressData?.suburb || 'Local Area';
      const state = addressData?.state || 'State';
      
      const generatedData = {
        lga: `${suburb} ${state === 'VIC' ? 'City Council' : 'Council'}`,
        zoning: planningData.zoning || "Residential 1 Zone (R1Z)",
        zoneName: planningData.zoneName || "Residential 1 Zone",
        zoneDescription: planningData.zoneDescription || "Provides for residential development at a range of densities with complementary uses",
        currentUse: planningData.currentUse || "Residential dwelling",
        permissibleUse: planningData.permissibleUse || "Dwelling, Home based business, Dependent person's unit",
        overlayImpactAssessment: planningData.overlayImpactAssessment || `Assessment of planning overlays affecting the subject property indicates ${planningData.overlays ? 'specific considerations apply' : 'standard residential development provisions apply'}. The property is subject to the relevant planning scheme provisions and any applicable overlays should be considered in future development proposals.`,
        overlayImpactRating: planningData.overlayImpactRating || "low",
        floorSpaceRatio: planningData.floorSpaceRatio || "Not specified",
        minimumLotSize: planningData.minimumLotSize || "300m²",
        planningRestrictions: planningData.planningRestrictions || "Standard planning scheme provisions apply. Any future development should comply with relevant zoning provisions and overlay requirements.",
        developmentPotential: planningData.developmentPotential || "Standard residential development potential subject to planning scheme provisions and overlay requirements. Future development would require appropriate planning permits where applicable.",
        lastUpdated: new Date().toISOString()
      };
      
      setPlanningData(prev => ({
        ...prev,
        ...generatedData
      }));
      
      toast({
        title: "Planning data generated",
        description: "Auto-generated planning information based on property details.",
      });
    } catch (error) {
      console.error('Error auto-generating planning data:', error);
      toast({
        title: "Generation failed",
        description: "Could not auto-generate planning data. Please fill manually.",
        variant: "destructive"
      });
    } finally {
      setIsAutoGenerating(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setPlanningData(prev => ({
      ...prev,
      [field]: value,
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleSave = async () => {
    const dataToSave = {
      planningData,
      lotPlanData,
      extractionHistory,
      includeInReport,
      timestamp: new Date().toISOString()
    };
    
    await saveData(dataToSave);
    
    // Update global report data with lot/plan integration
    updateReportData('legalAndPlanning', {
      ...planningData,
      lotNumber: lotPlanData.lotNumber,
      planNumber: lotPlanData.planNumber
    });
    
    toast({
      title: "Legal and Planning saved",
      description: "Your planning information and lot/plan data has been saved successfully.",
    });
  };

  const getSourceIcon = (source: LotPlanData['source']) => {
    switch (source) {
      case 'planning': return <Search className="h-4 w-4" />;
      case 'rpdata': return <Database className="h-4 w-4" />;
      case 'pricefinder': return <Download className="h-4 w-4" />;
      case 'ocr': return <FileText className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getSourceLabel = (source: LotPlanData['source']) => {
    switch (source) {
      case 'planning': return 'Planning Search';
      case 'rpdata': return 'RP Data';
      case 'pricefinder': return 'PRICE finder';
      case 'ocr': return 'OCR Extraction';
      default: return 'Manual Entry';
    }
  };

  // Auto-save when data changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (planningData.lastUpdated) {
        updateReportData('legalAndPlanning', {
          ...planningData,
          lotNumber: lotPlanData.lotNumber,
          planNumber: lotPlanData.planNumber
        });
      }
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [planningData, lotPlanData, updateReportData]);

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Enhanced Legal Description & Planning Information</h2>
          {lastSaved && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Saved {new Date(lastSaved).toLocaleTimeString()}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2">
            <Label htmlFor="include-legal-planning" className="text-sm">Include</Label>
            <Switch 
              id="include-legal-planning" 
              checked={includeInReport}
              onCheckedChange={setIncludeInReport}
            />
          </div>
          <Button 
            onClick={handleAutoGenerate}
            disabled={isAutoGenerating}
            variant="outline"
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-none"
          >
            {isAutoGenerating ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 mr-2" />
            )}
            {isAutoGenerating ? 'Generating...' : 'Auto-Generate'}
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isSaving ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="lotplan" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lotplan">Lot & Plan (PAF Integration)</TabsTrigger>
          <TabsTrigger value="planning">Planning Information</TabsTrigger>
          <TabsTrigger value="controls">Development Controls</TabsTrigger>
        </TabsList>

        {/* Lot & Plan Tab with PAF Integration */}
        <TabsContent value="lotplan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lot & Plan Number - PAF Workflow Integration</CardTitle>
              <p className="text-sm text-muted-foreground">
                Extract lot and plan numbers from Planning Search, RP Data, or PRICE finder for Property Assessment Form workflow
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* PAF Source Extraction Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={extractFromPlanningSearch}
                  disabled={isExtractingLotPlan}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <Search className="h-8 w-8 text-blue-500" />
                  <span className="font-medium">Planning Search</span>
                  <span className="text-xs text-muted-foreground">Extract from planning authority</span>
                </Button>
                
                <Button 
                  onClick={extractFromRPData}
                  disabled={isExtractingLotPlan}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <Database className="h-8 w-8 text-green-500" />
                  <span className="font-medium">RP Data</span>
                  <span className="text-xs text-muted-foreground">Extract from property database</span>
                </Button>
                
                <Button 
                  onClick={extractFromPRICEfinder}
                  disabled={isExtractingLotPlan}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <Download className="h-8 w-8 text-purple-500" />
                  <span className="font-medium">PRICE finder</span>
                  <span className="text-xs text-muted-foreground">Extract from sales database</span>
                </Button>
              </div>

              {isExtractingLotPlan && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
                      <span className="text-sm text-blue-700">
                        Extracting lot and plan numbers for PAF workflow...
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Current Lot & Plan Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lot-number">Lot Number</Label>
                  <Input 
                    id="lot-number" 
                    placeholder="Enter lot number" 
                    className="mt-1" 
                    value={lotPlanData.lotNumber}
                    onChange={(e) => handleLotPlanChange('lotNumber', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="plan-number">Plan Number</Label>
                  <Input 
                    id="plan-number" 
                    placeholder="Enter plan number" 
                    className="mt-1" 
                    value={lotPlanData.planNumber}
                    onChange={(e) => handleLotPlanChange('planNumber', e.target.value)}
                  />
                </div>
              </div>

              {/* Current Data Source Info */}
              {lotPlanData.lastUpdated && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getSourceIcon(lotPlanData.source)}
                        <span className="text-sm text-green-700">
                          {getSourceLabel(lotPlanData.source)} - Confidence: {lotPlanData.confidence}%
                        </span>
                      </div>
                      <Badge variant="secondary">
                        Updated: {new Date(lotPlanData.lastUpdated).toLocaleDateString()}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Extraction History */}
              {extractionHistory.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Extraction History</Label>
                  <div className="mt-2 space-y-2">
                    {extractionHistory.map((item, index) => (
                      <Card key={index} className="p-3 cursor-pointer hover:bg-gray-50" onClick={() => restoreFromHistory(item)}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getSourceIcon(item.source)}
                            <div>
                              <div className="text-sm font-medium">
                                Lot {item.lotNumber}, Plan {item.planNumber}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {getSourceLabel(item.source)} - {item.confidence}% confidence
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Restore
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Planning Information Tab */}
        <TabsContent value="planning" className="space-y-6">
          {/* Data Source Information */}
          {planningData.lastUpdated && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700">
                    Planning data integrated from Property Assessment workflow with lot/plan: {lotPlanData.lotNumber}/{lotPlanData.planNumber}
                  </span>
                  <Badge variant="secondary" className="ml-auto">
                    Last updated: {new Date(planningData.lastUpdated).toLocaleDateString()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Core Planning Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Core Planning Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* LGA and Zoning Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lga-legal">Local Government Area (LGA)</Label>
                  <Input 
                    id="lga-legal" 
                    placeholder="Enter LGA" 
                    className="mt-1" 
                    value={planningData.lga}
                    onChange={(e) => handleInputChange('lga', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="zoning-legal">Zoning</Label>
                  <Input 
                    id="zoning-legal" 
                    placeholder="e.g., Residential 1 Zone (R1Z)" 
                    className="mt-1" 
                    value={planningData.zoning}
                    onChange={(e) => handleInputChange('zoning', e.target.value)}
                  />
                </div>
              </div>

              {/* Zone Description */}
              {planningData.zoneDescription && (
                <div>
                  <Label>Zone Description</Label>
                  <div className="mt-1 p-3 bg-blue-50 rounded-md border">
                    <p className="text-sm text-blue-700">{planningData.zoneDescription}</p>
                  </div>
                </div>
              )}

              {/* Current and Permissible Use */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="current-use-legal">Current Use</Label>
                  <Input 
                    id="current-use-legal" 
                    placeholder="e.g., Residential dwelling" 
                    className="mt-1" 
                    value={planningData.currentUse}
                    onChange={(e) => handleInputChange('currentUse', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="permissible-use">Permissible Use</Label>
                  <Input 
                    id="permissible-use" 
                    placeholder="e.g., Dwelling, Home based business" 
                    className="mt-1" 
                    value={planningData.permissibleUse}
                    onChange={(e) => handleInputChange('permissibleUse', e.target.value)}
                  />
                </div>
              </div>

              {/* Permit Number and Overlays */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="permit-number">Permit Number</Label>
                  <Input 
                    id="permit-number" 
                    placeholder="Enter permit number if applicable" 
                    className="mt-1" 
                    value={planningData.permitNumber}
                    onChange={(e) => handleInputChange('permitNumber', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="overlays">Planning Overlays</Label>
                  <Input 
                    id="overlays" 
                    placeholder="e.g., Heritage Overlay, Development Contributions Plan Overlay" 
                    className="mt-1" 
                    value={planningData.overlays}
                    onChange={(e) => handleInputChange('overlays', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Development Controls Tab */}
        <TabsContent value="controls" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Development Controls & Restrictions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Building Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="height-building">Height of Building</Label>
                  <Input 
                    id="height-building" 
                    placeholder="e.g., 15m maximum" 
                    className="mt-1" 
                    value={planningData.heightOfBuilding}
                    onChange={(e) => handleInputChange('heightOfBuilding', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="floor-space-ratio">Floor Space Ratio</Label>
                  <Input 
                    id="floor-space-ratio" 
                    placeholder="e.g., 0.6:1" 
                    className="mt-1" 
                    value={planningData.floorSpaceRatio}
                    onChange={(e) => handleInputChange('floorSpaceRatio', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="minimum-lot-size">Minimum Lot Size</Label>
                  <Input 
                    id="minimum-lot-size" 
                    placeholder="e.g., 300m²" 
                    className="mt-1" 
                    value={planningData.minimumLotSize}
                    onChange={(e) => handleInputChange('minimumLotSize', e.target.value)}
                  />
                </div>
              </div>

              {/* Overlay Impact Assessment */}
              <div>
                <Label htmlFor="overlay-impact-assessment">Overlay Impact Assessment</Label>
                <Textarea 
                  id="overlay-impact-assessment"
                  placeholder="Describe the impact of planning overlays on the property..."
                  className="mt-1 h-32"
                  value={planningData.overlayImpactAssessment}
                  onChange={(e) => handleInputChange('overlayImpactAssessment', e.target.value)}
                />
              </div>

              {/* Overlay Impact Rating */}
              <div className="max-w-md">
                <Label htmlFor="overlay-impact-rating">Overlay Impact Rating</Label>
                <Select value={planningData.overlayImpactRating} onValueChange={(value) => handleInputChange('overlayImpactRating', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select impact rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Impact</SelectItem>
                    <SelectItem value="medium">Medium Impact</SelectItem>
                    <SelectItem value="high">High Impact</SelectItem>
                    <SelectItem value="very-high">Very High Impact</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Planning Restrictions */}
              <div>
                <Label htmlFor="planning-restrictions">Planning Restrictions & Overlays</Label>
                <Textarea 
                  id="planning-restrictions"
                  placeholder="Detail any planning restrictions, overlay requirements, or development constraints..."
                  className="mt-1 h-32"
                  value={planningData.planningRestrictions}
                  onChange={(e) => handleInputChange('planningRestrictions', e.target.value)}
                />
              </div>

              {/* Development Potential */}
              <div>
                <Label htmlFor="development-potential">Development Potential & Future Use</Label>
                <Textarea 
                  id="development-potential"
                  placeholder="Assess the development potential and future use possibilities for the property..."
                  className="mt-1 h-32"
                  value={planningData.developmentPotential}
                  onChange={(e) => handleInputChange('developmentPotential', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedLegalAndPlanning;