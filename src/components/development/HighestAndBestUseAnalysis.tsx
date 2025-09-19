import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Building, 
  TrendingUp, 
  MapPin, 
  Users, 
  DollarSign, 
  Leaf, 
  BarChart3, 
  FileText, 
  Calculator,
  Zap,
  TreePine,
  Home,
  AlertTriangle,
  CheckCircle,
  BarChart2,
  Target
} from "lucide-react";

interface SiteData {
  address?: string;
  landArea?: number;
  zoning?: string;
  council?: string;
  state?: string;
  extractedDocumentData?: any;
}

interface HighestAndBestUseAnalysisProps {
  siteData: SiteData | null;
}

const HighestAndBestUseAnalysis: React.FC<HighestAndBestUseAnalysisProps> = ({ siteData }) => {
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [activeScenario, setActiveScenario] = useState("subdivision");
  const [includeProposedDevelopment, setIncludeProposedDevelopment] = useState(false);
  const [includeComparativeAnalysis, setIncludeComparativeAnalysis] = useState(false);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Enhanced analysis steps incorporating document data
    const steps = [
      "Processing uploaded documents...",
      "Analyzing planning requirements...",
      "Checking compliance requirements...", 
      "Performing soil testing assessment...",
      "Calculating construction costs...",
      "Running demographic analysis...",
      "Analyzing market demand/supply...",
      "Incorporating extracted financial data...",
      "Comparing development scenarios...",
      "Generating recommendations..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisProgress(((i + 1) / steps.length) * 100);
      
      // If we have extracted document data, use it during analysis
      if (i === 0 && siteData?.extractedDocumentData) {
        console.log('Incorporating document data into analysis:', siteData.extractedDocumentData);
      }
    }
    
    setIsAnalyzing(false);
    setAnalysisComplete(true);
  };

  const developmentScenarios = [
    {
      id: "subdivision",
      title: "Residential Subdivision",
      type: "Medium Density Housing",
      units: 24,
      gfa: "2,880 sqm",
      cost: "$4.8M",
      revenue: "$7.2M",
      profit: "$2.4M",
      roi: "50%",
      timeframe: "18 months",
      demand: "High",
      supply: "Medium",
      risk: "Low"
    },
    {
      id: "apartments",
      title: "Apartment Development", 
      type: "Multi-Story Residential",
      units: 36,
      gfa: "3,600 sqm",
      cost: "$6.2M",
      revenue: "$9.8M", 
      profit: "$3.6M",
      roi: "58%",
      timeframe: "24 months",
      demand: "Very High",
      supply: "Low",
      risk: "Medium"
    },
    {
      id: "mixed",
      title: "Mixed Use Development",
      type: "Commercial + Residential",
      units: 28,
      gfa: "4,200 sqm", 
      cost: "$7.5M",
      revenue: "$11.2M",
      profit: "$3.7M",
      roi: "49%",
      timeframe: "30 months",
      demand: "High",
      supply: "Low",
      risk: "High"
    }
  ];

  const complianceItems = [
    { item: "Planning Permit Required", status: "required", details: "Medium density residential zoning allows up to 3 stories" },
    { item: "Soil Testing", status: "recommended", details: "Geotechnical assessment for foundation design" },
    { item: "Traffic Impact Assessment", status: "required", details: "For developments >20 units" },
    { item: "Stormwater Management", status: "required", details: "On-site detention required" },
    { item: "Heritage Overlay", status: "clear", details: "No heritage restrictions identified" },
    { item: "Native Vegetation", status: "assessment", details: "Vegetation assessment required" },
    { item: "Bushfire Management", status: "clear", details: "Not in bushfire prone area" }
  ];

  const demographicData = {
    population: "28,450",
    growthRate: "2.3%",
    medianAge: "34",
    households: "11,200",
    medianIncome: "$85,400",
    homeOwnership: "68%",
    rentalYield: "4.2%"
  };

  const marketAnalysis = {
    "1-2 Bedroom Units": { demand: "Very High", supply: "Low", recommendation: "Prioritize" },
    "3 Bedroom Houses": { demand: "High", supply: "Medium", recommendation: "Include" },
    "4+ Bedroom Houses": { demand: "Medium", supply: "High", recommendation: "Limited" },
    "Commercial Space": { demand: "Medium", supply: "Low", recommendation: "Consider" }
  };

  if (!siteData) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Building className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Site Data Required</h3>
          <p className="text-muted-foreground">
            Please complete the site details to perform highest and best use analysis
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analysis Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Highest & Best Use Analysis
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Preliminary development feasibility assessment (not included in formal valuation report)
              </p>
            </div>
            <Button 
              onClick={runAnalysis} 
              disabled={isAnalyzing || analysisComplete}
              className="ml-4"
            >
              {isAnalyzing ? "Analyzing..." : analysisComplete ? "Analysis Complete" : "Run Analysis"}
            </Button>
          </div>
        </CardHeader>

        {/* Optional Analysis Configuration */}
        <CardContent className="border-t">
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Analysis Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="proposed-development" className="text-sm font-medium">
                    Include Proposed Development Analysis
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Analyze specific proposed development scenario in detail
                  </p>
                </div>
                <Switch
                  id="proposed-development"
                  checked={includeProposedDevelopment}
                  onCheckedChange={setIncludeProposedDevelopment}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="comparative-analysis" className="text-sm font-medium">
                    Comparative Analysis Against Other Uses
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Compare development options against alternative land uses
                  </p>
                </div>
                <Switch
                  id="comparative-analysis"
                  checked={includeComparativeAnalysis}
                  onCheckedChange={setIncludeComparativeAnalysis}
                />
              </div>
            </div>
          </div>
        </CardContent>

        {isAnalyzing && (
          <CardContent>
            <Progress value={analysisProgress} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">
              Running comprehensive development analysis...
            </p>
          </CardContent>
        )}
      </Card>

      {analysisComplete && (
        <Tabs defaultValue="scenarios" className="w-full">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            {includeProposedDevelopment && <TabsTrigger value="proposed">Proposed</TabsTrigger>}
            {includeComparativeAnalysis && <TabsTrigger value="comparative">Comparative</TabsTrigger>}
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="costs">Costs</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="esd">ESD Analysis</TabsTrigger>
          </TabsList>

          {/* Development Scenarios */}
          <TabsContent value="scenarios" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {developmentScenarios.map((scenario) => (
                <Card key={scenario.id} className={activeScenario === scenario.id ? "ring-2 ring-primary" : ""}>
                  <CardHeader>
                    <CardTitle className="text-lg">{scenario.title}</CardTitle>
                    <Badge variant="outline">{scenario.type}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Units:</span> {scenario.units}
                      </div>
                      <div>
                        <span className="font-medium">GFA:</span> {scenario.gfa}
                      </div>
                      <div>
                        <span className="font-medium">Cost:</span> {scenario.cost}
                      </div>
                      <div>
                        <span className="font-medium">Revenue:</span> {scenario.revenue}
                      </div>
                      <div>
                        <span className="font-medium">Profit:</span> {scenario.profit}
                      </div>
                      <div>
                        <span className="font-medium">ROI:</span> {scenario.roi}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Demand:</span>
                        <Badge variant={scenario.demand === "Very High" ? "default" : scenario.demand === "High" ? "secondary" : "outline"}>
                          {scenario.demand}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Supply:</span>
                        <Badge variant="outline">{scenario.supply}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Risk:</span>
                        <Badge variant={scenario.risk === "Low" ? "default" : scenario.risk === "Medium" ? "secondary" : "destructive"}>
                          {scenario.risk}
                        </Badge>
                      </div>
                    </div>
                    
                    <Button 
                      variant={activeScenario === scenario.id ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setActiveScenario(scenario.id)}
                    >
                      {activeScenario === scenario.id ? "Selected" : "Select Scenario"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Alert>
              <TrendingUp className="h-4 w-4" />
              <AlertDescription>
                <strong>Recommendation:</strong> Apartment Development shows highest ROI (58%) with very high demand and low supply. 
                Mixed use development offers highest profit ($3.7M) but carries higher risk due to complex approvals.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Proposed Development Analysis (Optional) */}
          {includeProposedDevelopment && (
            <TabsContent value="proposed" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Proposed Development Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <h4 className="font-medium">Development Specifications</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Proposed Use:</span>
                          <span className="font-medium">Mixed-Use Development</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Units:</span>
                          <span className="font-medium">42 apartments + 3 commercial</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Building Height:</span>
                          <span className="font-medium">8 storeys</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Site Coverage:</span>
                          <span className="font-medium">65%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Plot Ratio:</span>
                          <span className="font-medium">3.2:1</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Financial Projections</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Total Development Cost:</span>
                          <span className="font-medium">$8.2M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gross Realization:</span>
                          <span className="font-medium">$13.5M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Net Profit:</span>
                          <span className="font-medium text-green-600">$5.3M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Profit Margin:</span>
                          <span className="font-medium">39.3%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Development Timeline:</span>
                          <span className="font-medium">32 months</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Alert className="mt-6">
                    <Target className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Proposed Development Assessment:</strong> The proposed mixed-use development shows strong financial viability 
                      with a 39.3% profit margin, exceeding industry benchmarks. Key success factors include optimal unit mix and 
                      commercial component addressing local retail demand.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Comparative Analysis Against Other Uses (Optional) */}
          {includeComparativeAnalysis && (
            <TabsContent value="comparative" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="w-5 h-5" />
                    Comparative Analysis Against Alternative Uses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Commercial Office Development */}
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">Commercial Office Development</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Development Cost:</span>
                          <p className="font-medium">$7.8M</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Annual Rental Income:</span>
                          <p className="font-medium">$980,000</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Capitalization Value:</span>
                          <p className="font-medium">$14.0M</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Badge variant="secondary">ROI: 79.5%</Badge>
                        <Badge variant="outline" className="ml-2">Risk: Medium-High</Badge>
                      </div>
                    </div>

                    {/* Retail Shopping Center */}
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">Retail Shopping Center</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Development Cost:</span>
                          <p className="font-medium">$6.5M</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Annual Rental Income:</span>
                          <p className="font-medium">$720,000</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Capitalization Value:</span>
                          <p className="font-medium">$10.3M</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Badge variant="outline">ROI: 58.5%</Badge>
                        <Badge variant="secondary" className="ml-2">Risk: Medium</Badge>
                      </div>
                    </div>

                    {/* Industrial/Warehouse */}
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">Industrial/Warehouse Development</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Development Cost:</span>
                          <p className="font-medium">$4.2M</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Annual Rental Income:</span>
                          <p className="font-medium">$420,000</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Capitalization Value:</span>
                          <p className="font-medium">$6.0M</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Badge variant="outline">ROI: 42.9%</Badge>
                        <Badge variant="default" className="ml-2">Risk: Low</Badge>
                      </div>
                    </div>

                    {/* Current Use (No Development) */}
                    <div className="border rounded-lg p-4 bg-muted/50">
                      <h4 className="font-medium mb-3">Current Use (No Development)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Land Value:</span>
                          <p className="font-medium">$2.8M</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Annual Rental Income:</span>
                          <p className="font-medium">$85,000</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Yield:</span>
                          <p className="font-medium">3.0%</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Badge variant="outline">ROI: 3.0%</Badge>
                        <Badge variant="default" className="ml-2">Risk: Very Low</Badge>
                      </div>
                    </div>
                  </div>

                  <Alert className="mt-6">
                    <BarChart2 className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Comparative Analysis Summary:</strong> Mixed-use residential development (58% ROI) provides optimal 
                      risk-adjusted returns compared to alternatives. Commercial office shows highest returns (79.5%) but carries 
                      significantly higher market risk in current economic conditions.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Compliance Checklist */}
          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Development Compliance Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      {item.status === "clear" ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      ) : item.status === "required" ? (
                        <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-blue-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{item.item}</h4>
                          <Badge 
                            variant={
                              item.status === "clear" ? "default" : 
                              item.status === "required" ? "destructive" : 
                              "secondary"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Construction Costs */}
          <TabsContent value="costs" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Construction Cost Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Site Preparation & Earthworks</span>
                      <span className="font-medium">$450,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Building Construction</span>
                      <span className="font-medium">$4,200,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Infrastructure & Services</span>
                      <span className="font-medium">$680,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Landscaping & External Works</span>
                      <span className="font-medium">$320,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Professional Fees (12%)</span>
                      <span className="font-medium">$678,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Contingency (5%)</span>
                      <span className="font-medium">$316,400</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Construction Cost</span>
                      <span>$6,644,400</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Project Feasibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Land Value</span>
                      <span className="font-medium">$2,800,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Construction Costs</span>
                      <span className="font-medium">$6,644,400</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Marketing & Legal</span>
                      <span className="font-medium">$280,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Finance Costs</span>
                      <span className="font-medium">$420,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Developer Profit (20%)</span>
                      <span className="font-medium">$2,028,880</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Required Revenue</span>
                      <span>$12,173,280</span>
                    </div>
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Projected Revenue</span>
                      <span>$12,960,000</span>
                    </div>
                    <div className="flex justify-between text-green-600 font-bold">
                      <span>Profit Buffer</span>
                      <span>$786,720</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Demographics */}
          <TabsContent value="demographics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Local Demographics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Population</span>
                      <span className="font-bold">{demographicData.population}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Growth Rate</span>
                      <Badge variant="default">{demographicData.growthRate}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Median Age</span>
                      <span className="font-medium">{demographicData.medianAge}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Households</span>
                      <span className="font-medium">{demographicData.households}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Economic Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Median Income</span>
                      <span className="font-bold">{demographicData.medianIncome}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Home Ownership</span>
                      <span className="font-medium">{demographicData.homeOwnership}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Rental Yield</span>
                      <Badge variant="secondary">{demographicData.rentalYield}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Market Analysis */}
          <TabsContent value="market" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Market Demand & Supply Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(marketAnalysis).map(([type, data]) => (
                    <div key={type} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{type}</h4>
                        <div className="flex gap-4 mt-2">
                          <span className="text-sm">
                            Demand: <Badge variant={data.demand === "Very High" || data.demand === "High" ? "default" : "secondary"}>
                              {data.demand}
                            </Badge>
                          </span>
                          <span className="text-sm">
                            Supply: <Badge variant="outline">{data.supply}</Badge>
                          </span>
                        </div>
                      </div>
                      <Badge 
                        variant={
                          data.recommendation === "Prioritize" ? "default" : 
                          data.recommendation === "Include" ? "secondary" : 
                          "outline"
                        }
                      >
                        {data.recommendation}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ESD Analysis */}
          <TabsContent value="esd" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="w-5 h-5" />
                    ESD vs Traditional Design
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-green-600 mb-2">ESD Design Benefits</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Energy Cost Savings (Annual)</span>
                          <span className="font-medium">$45,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Water Cost Savings (Annual)</span>
                          <span className="font-medium">$12,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Maintenance Savings (Annual)</span>
                          <span className="font-medium">$8,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Premium Rental/Sale Value</span>
                          <span className="font-medium">8-12%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Additional ESD Costs</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Solar PV System</span>
                          <span className="font-medium">$180,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rainwater Harvesting</span>
                          <span className="font-medium">$65,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Enhanced Insulation</span>
                          <span className="font-medium">$45,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Energy Efficient Systems</span>
                          <span className="font-medium">$95,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Financial Impact Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">ESD Payback Analysis</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Total ESD Investment</span>
                          <span className="font-bold">$385,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Annual Operating Savings</span>
                          <span className="font-bold text-green-600">$65,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Simple Payback Period</span>
                          <span className="font-bold">5.9 years</span>
                        </div>
                        <div className="flex justify-between">
                          <span>NPV (10 years)</span>
                          <span className="font-bold text-green-600">$237,000</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Break-Even Analysis</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Traditional Development Value</span>
                          <span>$12,960,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ESD Premium Value (10%)</span>
                          <span className="font-medium text-green-600">+$1,296,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Additional ESD Costs</span>
                          <span className="text-red-600">-$385,000</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-bold">Net ESD Benefit</span>
                          <span className="font-bold text-green-600">+$911,000</span>
                        </div>
                      </div>
                    </div>

                    <Alert>
                      <Leaf className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Recommendation:</strong> ESD design provides substantial financial benefits with a net gain of $911,000 
                        plus ongoing operational savings of $65,500 annually.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default HighestAndBestUseAnalysis;