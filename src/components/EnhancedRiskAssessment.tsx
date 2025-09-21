import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Shield,
  Target,
  Lightbulb,
  Zap,
  RefreshCw,
  Download,
  FileText,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';
import { useReportData } from '@/contexts/ReportDataContext';
import { useProperty } from '@/contexts/PropertyContext';
import PESTELDataExtractor from '@/components/PESTELDataExtractor';

interface PESTELFactor {
  factor: string;
  impact: "low" | "medium" | "high";
  description: string;
  score: number;
}

interface SWOTItem {
  category: "strengths" | "weaknesses" | "opportunities" | "threats";
  item: string;
  impact: "low" | "medium" | "high";
  description: string;
}

interface TOWSStrategy {
  type: "SO" | "WO" | "ST" | "WT";
  strategy: string;
  priority: "low" | "medium" | "high";
  implementation: string;
}

interface RiskMatrix {
  category: string;
  probability: number;
  impact: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  mitigation: string;
}

function EnhancedRiskAssessment() {
  const { reportData, updateReportData } = useReportData();
  const { addressData } = useProperty();

  // Core States
  const [includeSection, setIncludeSection] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState("");
  const [progress, setProgress] = useState(0);
  const [pafDataLoaded, setPafDataLoaded] = useState(false);

  // Property Data from PAF
  const [propertyData, setPropertyData] = useState({
    propertyType: "residential",
    location: "",
    condition: "good",
    zoning: "",
    marketPosition: "average"
  });

  // PESTEL Analysis
  const [pestelAnalysis, setPestelAnalysis] = useState<PESTELFactor[]>([
    { factor: "Political", impact: "medium", description: "", score: 3 },
    { factor: "Economic", impact: "medium", description: "", score: 3 },
    { factor: "Social", impact: "medium", description: "", score: 3 },
    { factor: "Technological", impact: "low", description: "", score: 2 },
    { factor: "Environmental", impact: "medium", description: "", score: 3 },
    { factor: "Legal", impact: "medium", description: "", score: 3 }
  ]);

  // SWOT Analysis
  const [swotAnalysis, setSWOTAnalysis] = useState<SWOTItem[]>([
    { category: "strengths", item: "", impact: "medium", description: "" },
    { category: "weaknesses", item: "", impact: "medium", description: "" },
    { category: "opportunities", item: "", impact: "medium", description: "" },
    { category: "threats", item: "", impact: "medium", description: "" }
  ]);

  // TOWS Matrix (Auto-generated from SWOT)
  const [towsMatrix, setTowsMatrix] = useState<TOWSStrategy[]>([]);

  // Risk Matrix
  const [riskMatrix, setRiskMatrix] = useState<RiskMatrix[]>([
    { category: "Market Risk", probability: 3, impact: 3, riskLevel: "medium", mitigation: "" },
    { category: "Location Risk", probability: 2, impact: 3, riskLevel: "medium", mitigation: "" },
    { category: "Property Risk", probability: 2, impact: 2, riskLevel: "low", mitigation: "" },
    { category: "Financial Risk", probability: 3, impact: 4, riskLevel: "high", mitigation: "" },
    { category: "Regulatory Risk", probability: 2, impact: 3, riskLevel: "medium", mitigation: "" }
  ]);

  // Property Type Specific PESTEL Templates
  const pestelTemplates = {
    residential: {
      Political: "Government housing policies, stamp duty changes, negative gearing rules",
      Economic: "Interest rates, employment levels, household income growth",
      Social: "Demographics, lifestyle trends, family formation patterns",
      Technological: "PropTech adoption, smart home integration, virtual inspections",
      Environmental: "Climate change impacts, sustainability requirements, natural disasters",
      Legal: "Tenancy laws, building codes, strata regulations"
    },
    commercial: {
      Political: "Commercial property taxes, zoning regulations, infrastructure investment",
      Economic: "Business confidence, commercial lending rates, economic growth",
      Social: "Work-from-home trends, urban migration, consumer behavior",
      Technological: "Digital transformation, automation, e-commerce growth",
      Environmental: "Green building standards, carbon emissions targets, ESG compliance",
      Legal: "Commercial leasing laws, OH&S regulations, accessibility requirements"
    },
    industrial: {
      Political: "Trade policies, industrial zoning, government incentives",
      Economic: "Manufacturing output, logistics costs, supply chain efficiency",
      Social: "Labor availability, skills shortage, community acceptance",
      Technological: "Automation, Industry 4.0, logistics technology",
      Environmental: "Environmental regulations, waste management, emissions control",
      Legal: "Industrial safety laws, environmental compliance, planning permits"
    }
  };

  // PAF Pre-population Effect
  useEffect(() => {
    const pafData = reportData?.propertySearchData;
    if (pafData && !pafDataLoaded) {
      setPropertyData({
        propertyType: pafData.propertyType || "residential",
        location: pafData.location || addressData?.suburb || "",
        condition: pafData.propertyCondition || "good",
        zoning: pafData.zoning || "",
        marketPosition: pafData.marketPosition || "average"
      });
      
      // Auto-populate PESTEL with property-specific factors
      populatePESTELFromPAF(pafData);
      populateSWOTFromPAF(pafData);
      setPafDataLoaded(true);
      
      toast.success("Risk assessment pre-populated from Property Assessment Form");
    }
  }, [reportData?.propertySearchData, addressData, pafDataLoaded]);

  // Auto-populate PESTEL from PAF
  const populatePESTELFromPAF = (pafData: any) => {
    const template = pestelTemplates[pafData.propertyType as keyof typeof pestelTemplates] || pestelTemplates.residential;
    
    setPestelAnalysis(prev => prev.map(item => ({
      ...item,
      description: template[item.factor as keyof typeof template] || item.description,
      score: calculatePESTELScore(item.factor, pafData)
    })));
  };

  // Auto-populate SWOT from PAF
  const populateSWOTFromPAF = (pafData: any) => {
    const propertyStrengths = generatePropertyStrengths(pafData);
    const propertyWeaknesses = generatePropertyWeaknesses(pafData);
    const marketOpportunities = generateMarketOpportunities(pafData);
    const marketThreats = generateMarketThreats(pafData);

    setSWOTAnalysis([
      { category: "strengths", item: propertyStrengths.item, impact: propertyStrengths.impact as "low" | "medium" | "high", description: propertyStrengths.description },
      { category: "weaknesses", item: propertyWeaknesses.item, impact: propertyWeaknesses.impact as "low" | "medium" | "high", description: propertyWeaknesses.description },
      { category: "opportunities", item: marketOpportunities.item, impact: marketOpportunities.impact as "low" | "medium" | "high", description: marketOpportunities.description },
      { category: "threats", item: marketThreats.item, impact: marketThreats.impact as "low" | "medium" | "high", description: marketThreats.description }
    ]);
  };

  // Calculate PESTEL scores based on PAF data
  const calculatePESTELScore = (factor: string, pafData: any): number => {
    switch (factor) {
      case "Political":
        return pafData.zoning?.includes("residential") ? 2 : 3;
      case "Economic":
        return pafData.marketCondition === "strong" ? 2 : 3;
      case "Social":
        return pafData.demographics === "growing" ? 2 : 3;
      case "Environmental":
        return pafData.environmentalRisks ? 4 : 2;
      case "Legal":
        return pafData.planningRestrictions ? 4 : 2;
      default:
        return 3;
    }
  };

  // Generate property-specific SWOT items
  const generatePropertyStrengths = (pafData: any) => {
    const strengths = {
      good: { item: "Well-maintained property", impact: "medium", description: "Property condition supports strong market appeal" },
      excellent: { item: "Premium property condition", impact: "high", description: "Exceptional condition commands premium pricing" },
      prime: { item: "Prime location advantage", impact: "high", description: "Superior location drives demand and value" }
    };
    return strengths[pafData.propertyCondition as keyof typeof strengths] || strengths.good;
  };

  const generatePropertyWeaknesses = (pafData: any) => {
    const weaknesses = {
      poor: { item: "Requires significant repairs", impact: "high", description: "Maintenance issues impact marketability" },
      fair: { item: "Deferred maintenance", impact: "medium", description: "Some maintenance required for optimal performance" },
      remote: { item: "Limited location appeal", impact: "medium", description: "Location constraints affect demand" }
    };
    return weaknesses[pafData.propertyCondition as keyof typeof weaknesses] || 
           { item: "Market competition", impact: "medium", description: "Standard market competition factors" };
  };

  const generateMarketOpportunities = (pafData: any) => {
    const opportunities = {
      residential: { item: "Growing residential demand", impact: "medium", description: "Demographic trends support residential growth" },
      commercial: { item: "Business district expansion", impact: "high", description: "Commercial development opportunities" },
      industrial: { item: "Industrial growth corridor", impact: "medium", description: "Infrastructure development supports industrial expansion" }
    };
    return opportunities[pafData.propertyType as keyof typeof opportunities] || opportunities.residential;
  };

  const generateMarketThreats = (pafData: any) => {
    const threats = {
      high: { item: "Interest rate risk", impact: "high", description: "Rising rates impact affordability and demand" },
      medium: { item: "Market cycle risk", impact: "medium", description: "Property cycles affect timing and values" },
      environmental: { item: "Climate change impacts", impact: "medium", description: "Environmental risks affect long-term value" }
    };
    return threats.medium; // Default to medium threat
  };

  // Auto-generate TOWS Matrix from SWOT
  const generateTOWSMatrix = () => {
    const strengths = swotAnalysis.filter(item => item.category === "strengths");
    const weaknesses = swotAnalysis.filter(item => item.category === "weaknesses");
    const opportunities = swotAnalysis.filter(item => item.category === "opportunities");
    const threats = swotAnalysis.filter(item => item.category === "threats");

    const tows: TOWSStrategy[] = [
      {
        type: "SO",
        strategy: `Leverage ${strengths[0]?.item || "property strengths"} to capitalize on ${opportunities[0]?.item || "market opportunities"}`,
        priority: "high",
        implementation: "Develop marketing strategy highlighting property advantages in growing market"
      },
      {
        type: "WO", 
        strategy: `Address ${weaknesses[0]?.item || "property limitations"} to pursue ${opportunities[0]?.item || "market opportunities"}`,
        priority: "medium",
        implementation: "Implement improvement plan to enhance market position"
      },
      {
        type: "ST",
        strategy: `Use ${strengths[0]?.item || "property strengths"} to mitigate ${threats[0]?.item || "market threats"}`,
        priority: "medium", 
        implementation: "Position property advantages to offset market challenges"
      },
      {
        type: "WT",
        strategy: `Minimize ${weaknesses[0]?.item || "property limitations"} while avoiding ${threats[0]?.item || "market threats"}`,
        priority: "high",
        implementation: "Develop defensive strategy to protect value"
      }
    ];

    setTowsMatrix(tows);
    toast.success("TOWS Matrix generated from SWOT analysis");
  };

  // Calculate risk level based on probability and impact
  const calculateRiskLevel = (probability: number, impact: number): RiskMatrix["riskLevel"] => {
    const score = probability * impact;
    if (score >= 12) return "critical";
    if (score >= 9) return "high";
    if (score >= 6) return "medium";
    return "low";
  };

  // Update risk matrix items
  const updateRiskMatrix = (index: number, field: keyof RiskMatrix, value: any) => {
    setRiskMatrix(prev => prev.map((item, i) => {
      if (i === index) {
        const updated = { ...item, [field]: value };
        if (field === "probability" || field === "impact") {
          updated.riskLevel = calculateRiskLevel(
            field === "probability" ? value : item.probability,
            field === "impact" ? value : item.impact
          );
        }
        return updated;
      }
      return item;
    }));
  };

  // Risk level colors
  const getRiskColor = (level: string) => {
    switch (level) {
      case "critical": return "bg-red-600 text-white";
      case "high": return "bg-red-500 text-white";
      case "medium": return "bg-yellow-500 text-white";
      case "low": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  // Comprehensive risk analysis
  const runComprehensiveAnalysis = async () => {
    setIsProcessing(true);
    setProgress(0);

    const stages = [
      { message: "Loading PAF data...", progress: 20 },
      { message: "Analyzing PESTEL factors...", progress: 40 },
      { message: "Processing SWOT analysis...", progress: 60 },
      { message: "Generating TOWS matrix...", progress: 80 },
      { message: "Finalizing risk assessment...", progress: 100 }
    ];

    try {
      for (const stage of stages) {
        setProcessingStage(stage.message);
        setProgress(stage.progress);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      generateTOWSMatrix();
      toast.success("Comprehensive risk assessment completed");
      
    } catch (error) {
      toast.error("Risk assessment failed. Please try again.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
      setProcessingStage("");
    }
  };

  // Handle AI-extracted PESTEL data
  const handlePESTELDataExtracted = (extractedData: any[]) => {
    if (extractedData && Array.isArray(extractedData)) {
      setPestelAnalysis(extractedData);
      toast.success("PESTEL analysis updated with AI-extracted data");
      
      // Update report data
      updateReportData('riskAssessment', {
        ...reportData?.riskAssessment,
        pestelAnalysis: extractedData,
        lastUpdated: new Date().toISOString()
      });
    }
  };
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Enhanced Risk Assessment</h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive PESTEL, SWOT, and TOWS analysis with risk matrix
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="include-risk">Include Section</Label>
          <Switch
            id="include-risk"
            checked={includeSection}
            onCheckedChange={setIncludeSection}
          />
        </div>
      </div>

      {includeSection && (
        <>
          {/* PAF Pre-population Alert */}
          {pafDataLoaded && (
            <Alert className="border-blue-200 bg-blue-50">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <div className="flex items-center justify-between">
                  <span>Risk assessment pre-populated from Property Assessment Form</span>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    <Eye className="h-3 w-3 mr-1" />
                    PAF Data Loaded
                  </Badge>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Control Panel */}
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Brain className="h-6 w-6" />
                    Risk Assessment Control Panel
                  </CardTitle>
                  <p className="text-sm text-blue-600 mt-1">
                    Comprehensive analysis with PESTEL, SWOT, and TOWS frameworks
                  </p>
                </div>
                <Button 
                  onClick={runComprehensiveAnalysis}
                  disabled={isProcessing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  {isProcessing ? 'Analyzing...' : 'Run Full Analysis'}
                </Button>
              </div>
            </CardHeader>

            {/* Progress Indicator */}
            {isProcessing && (
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-700">{processingStage}</span>
                    <span className="text-sm text-blue-600">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardContent>
            )}
          </Card>

          {/* AI-Powered PESTEL Data Extractor */}
          <PESTELDataExtractor
            onDataExtracted={handlePESTELDataExtracted}
            propertyDetails={{
              address: addressData?.fullAddress || reportData?.propertySearchData?.selectedProperty?.address,
              propertyType: propertyData.propertyType,
              location: propertyData.location
            }}
            currentPestelData={pestelAnalysis}
          />

          <Tabs defaultValue="pestel" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pestel">PESTEL Analysis</TabsTrigger>
              <TabsTrigger value="swot">SWOT Analysis</TabsTrigger>
              <TabsTrigger value="tows">TOWS Matrix</TabsTrigger>
              <TabsTrigger value="risk-matrix">Risk Matrix</TabsTrigger>
            </TabsList>

            {/* PESTEL Analysis Tab */}
            <TabsContent value="pestel" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    PESTEL Analysis ({propertyData.propertyType.charAt(0).toUpperCase() + propertyData.propertyType.slice(1)} Property)
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Political, Economic, Social, Technological, Environmental, and Legal factors analysis
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pestelAnalysis.map((factor, index) => (
                    <Card key={factor.factor} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-lg">{factor.factor}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className={`
                            ${factor.impact === "high" ? "bg-red-100 text-red-800" : 
                              factor.impact === "medium" ? "bg-yellow-100 text-yellow-800" : 
                              "bg-green-100 text-green-800"}
                          `}>
                            {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)} Impact
                          </Badge>
                          <div className="text-lg font-bold text-blue-600">
                            {factor.score}/5
                          </div>
                        </div>
                      </div>
                      <Textarea
                        value={factor.description}
                        onChange={(e) => setPestelAnalysis(prev => prev.map((item, i) => 
                          i === index ? { ...item, description: e.target.value } : item
                        ))}
                        placeholder={`Analyze ${factor.factor.toLowerCase()} factors affecting this property...`}
                        className="min-h-[80px]"
                      />
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-2">
                          <Label>Impact Level:</Label>
                          <Select
                            value={factor.impact}
                            onValueChange={(value) => setPestelAnalysis(prev => prev.map((item, i) => 
                              i === index ? { ...item, impact: value as any } : item
                            ))}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center gap-2">
                          <Label>Score:</Label>
                          <Select
                            value={factor.score.toString()}
                            onValueChange={(value) => setPestelAnalysis(prev => prev.map((item, i) => 
                              i === index ? { ...item, score: parseInt(value) } : item
                            ))}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* SWOT Analysis Tab */}
            <TabsContent value="swot" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Strengths */}
                <Card className="border-green-200">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="text-green-700 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    {swotAnalysis.filter(item => item.category === "strengths").map((item, index) => (
                      <div key={index} className="space-y-2">
                        <Input
                          value={item.item}
                          onChange={(e) => setSWOTAnalysis(prev => prev.map(swotItem => 
                            swotItem.category === "strengths" && prev.indexOf(swotItem) === index 
                              ? { ...swotItem, item: e.target.value } : swotItem
                          ))}
                          placeholder="Property strength..."
                        />
                        <Textarea
                          value={item.description}
                          onChange={(e) => setSWOTAnalysis(prev => prev.map(swotItem => 
                            swotItem.category === "strengths" && prev.indexOf(swotItem) === index 
                              ? { ...swotItem, description: e.target.value } : swotItem
                          ))}
                          placeholder="Describe this strength and its impact..."
                          className="min-h-[60px]"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Weaknesses */}
                <Card className="border-red-200">
                  <CardHeader className="bg-red-50">
                    <CardTitle className="text-red-700 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Weaknesses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    {swotAnalysis.filter(item => item.category === "weaknesses").map((item, index) => (
                      <div key={index} className="space-y-2">
                        <Input
                          value={item.item}
                          onChange={(e) => setSWOTAnalysis(prev => prev.map(swotItem => 
                            swotItem.category === "weaknesses" && prev.indexOf(swotItem) === index 
                              ? { ...swotItem, item: e.target.value } : swotItem
                          ))}
                          placeholder="Property weakness..."
                        />
                        <Textarea
                          value={item.description}
                          onChange={(e) => setSWOTAnalysis(prev => prev.map(swotItem => 
                            swotItem.category === "weaknesses" && prev.indexOf(swotItem) === index 
                              ? { ...swotItem, description: e.target.value } : swotItem
                          ))}
                          placeholder="Describe this weakness and its impact..."
                          className="min-h-[60px]"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Opportunities */}
                <Card className="border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="text-blue-700 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    {swotAnalysis.filter(item => item.category === "opportunities").map((item, index) => (
                      <div key={index} className="space-y-2">
                        <Input
                          value={item.item}
                          onChange={(e) => setSWOTAnalysis(prev => prev.map(swotItem => 
                            swotItem.category === "opportunities" && prev.indexOf(swotItem) === index 
                              ? { ...swotItem, item: e.target.value } : swotItem
                          ))}
                          placeholder="Market opportunity..."
                        />
                        <Textarea
                          value={item.description}
                          onChange={(e) => setSWOTAnalysis(prev => prev.map(swotItem => 
                            swotItem.category === "opportunities" && prev.indexOf(swotItem) === index 
                              ? { ...swotItem, description: e.target.value } : swotItem
                          ))}
                          placeholder="Describe this opportunity and its potential..."
                          className="min-h-[60px]"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Threats */}
                <Card className="border-orange-200">
                  <CardHeader className="bg-orange-50">
                    <CardTitle className="text-orange-700 flex items-center gap-2">
                      <TrendingDown className="h-5 w-5" />
                      Threats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    {swotAnalysis.filter(item => item.category === "threats").map((item, index) => (
                      <div key={index} className="space-y-2">
                        <Input
                          value={item.item}
                          onChange={(e) => setSWOTAnalysis(prev => prev.map(swotItem => 
                            swotItem.category === "threats" && prev.indexOf(swotItem) === index 
                              ? { ...swotItem, item: e.target.value } : swotItem
                          ))}
                          placeholder="Market threat..."
                        />
                        <Textarea
                          value={item.description}
                          onChange={(e) => setSWOTAnalysis(prev => prev.map(swotItem => 
                            swotItem.category === "threats" && prev.indexOf(swotItem) === index 
                              ? { ...swotItem, description: e.target.value } : swotItem
                          ))}
                          placeholder="Describe this threat and its risk..."
                          className="min-h-[60px]"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button onClick={generateTOWSMatrix} className="bg-purple-600 hover:bg-purple-700">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Generate TOWS Matrix
                </Button>
              </div>
            </TabsContent>

            {/* TOWS Matrix Tab */}
            <TabsContent value="tows" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    TOWS Strategic Matrix
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Strategic alternatives generated from SWOT analysis
                  </p>
                </CardHeader>
                <CardContent>
                  {towsMatrix.length === 0 ? (
                    <div className="text-center py-8">
                      <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">TOWS Matrix not generated yet</p>
                      <Button onClick={generateTOWSMatrix} variant="outline">
                        Generate TOWS Matrix
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {towsMatrix.map((strategy, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <Badge className={`
                              ${strategy.type === "SO" ? "bg-green-100 text-green-800" :
                                strategy.type === "WO" ? "bg-blue-100 text-blue-800" :
                                strategy.type === "ST" ? "bg-yellow-100 text-yellow-800" :
                                "bg-red-100 text-red-800"}
                            `}>
                              {strategy.type} Strategy
                            </Badge>
                            <Badge variant="outline" className={`
                              ${strategy.priority === "high" ? "border-red-500 text-red-700" :
                                strategy.priority === "medium" ? "border-yellow-500 text-yellow-700" :
                                "border-green-500 text-green-700"}
                            `}>
                              {strategy.priority.charAt(0).toUpperCase() + strategy.priority.slice(1)} Priority
                            </Badge>
                          </div>
                          <h4 className="font-medium mb-2">Strategy:</h4>
                          <p className="text-sm text-gray-700 mb-3">{strategy.strategy}</p>
                          <h4 className="font-medium mb-2">Implementation:</h4>
                          <p className="text-sm text-gray-600">{strategy.implementation}</p>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Risk Matrix Tab */}
            <TabsContent value="risk-matrix" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Risk Matrix & Heat Map
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive risk scoring and prioritization
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {riskMatrix.map((risk, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{risk.category}</h4>
                        <Badge className={getRiskColor(risk.riskLevel)}>
                          {risk.riskLevel.charAt(0).toUpperCase() + risk.riskLevel.slice(1)} Risk
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <Label>Probability (1-5)</Label>
                          <Select
                            value={risk.probability.toString()}
                            onValueChange={(value) => updateRiskMatrix(index, "probability", parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 - Very Low</SelectItem>
                              <SelectItem value="2">2 - Low</SelectItem>
                              <SelectItem value="3">3 - Medium</SelectItem>
                              <SelectItem value="4">4 - High</SelectItem>
                              <SelectItem value="5">5 - Very High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Impact (1-5)</Label>
                          <Select
                            value={risk.impact.toString()}
                            onValueChange={(value) => updateRiskMatrix(index, "impact", parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 - Minimal</SelectItem>
                              <SelectItem value="2">2 - Minor</SelectItem>
                              <SelectItem value="3">3 - Moderate</SelectItem>
                              <SelectItem value="4">4 - Major</SelectItem>
                              <SelectItem value="5">5 - Severe</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold">{risk.probability * risk.impact}</div>
                            <div className="text-sm text-muted-foreground">Risk Score</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label>Mitigation Strategy</Label>
                        <Textarea
                          value={risk.mitigation}
                          onChange={(e) => updateRiskMatrix(index, "mitigation", e.target.value)}
                          placeholder="Describe mitigation strategies for this risk..."
                          className="min-h-[60px]"
                        />
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

export default EnhancedRiskAssessment;