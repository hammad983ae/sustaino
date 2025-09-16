import { useState } from "react";
import { 
  Target, TrendingUp, Leaf, Calculator, Settings, Building2, 
  Sliders, Baby, Fuel, Users, BarChart3, PieChart, Activity,
  DollarSign, TrendingDown, Home, ShoppingCart, MapPin
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ESGMethodologyProtection from "@/components/ESGMethodologyProtection";
import ARYCalculationForm from "@/components/ARYCalculationForm";
import ESGCalculationForm from "@/components/ESGCalculationForm";
import CapitalizationSensitivityForm from "@/components/CapitalizationSensitivityForm";
import NetIncomeForm from "@/components/NetIncomeForm";
import DCFAnalysisForm from "@/components/DCFAnalysisForm";
import HypotheticalDevelopmentForm from "@/components/HypotheticalDevelopmentForm";
import SportsStadiumValuationForm from "@/components/SportsStadiumValuationForm";
import HospitalityCommercialValuationForm from "@/components/HospitalityCommercialValuationForm";
import DeferredManagementValuationForm from "@/components/DeferredManagementValuationForm";

const ComprehensiveValuationAnalysis = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTool, setSelectedTool] = useState(null);

  const valuationTools = [
    {
      id: "ary",
      title: "All Risks Yield",
      description: "Traditional ARY calculations with market analysis",
      icon: Target,
      category: "yield"
    },
    {
      id: "esg-ary", 
      title: "ESG-Adjusted ARY",
      description: "ESG-enhanced yield calculations with sustainability factors",
      icon: Leaf,
      category: "esg"
    },
    {
      id: "cap-sensitivity",
      title: "Cap Rate Sensitivity", 
      description: "Sensitivity analysis for capitalization rates",
      icon: BarChart3,
      category: "analysis"
    },
    {
      id: "net-income",
      title: "Net Income Approach",
      description: "Capitalization of net income method",
      icon: Calculator,
      category: "income"
    },
    {
      id: "esg-cap",
      title: "ESG Cap Analysis",
      description: "ESG-adjusted capitalization rate analysis",
      icon: PieChart,
      category: "esg"
    },
    {
      id: "esg-comparable",
      title: "ESG Comparable Sales",
      description: "Comparable sales analysis with ESG adjustments",
      icon: TrendingUp,
      category: "esg"
    },
    {
      id: "esg-weighting",
      title: "ESG Factors Weighting",
      description: "Weighted ESG factor analysis and scoring",
      icon: Sliders,
      category: "esg"
    },
    {
      id: "cap-net-income",
      title: "Cap Net Income",
      description: "Net income capitalization calculations",
      icon: DollarSign,
      category: "income"
    },
    {
      id: "esg-variable",
      title: "ESG Variable Control",
      description: "Variable ESG factor control and analysis",
      icon: Settings,
      category: "esg"
    },
    {
      id: "direct-comparison",
      title: "Direct Comparison",
      description: "Direct comparable sales analysis",
      icon: Activity,
      category: "comparison"
    },
    {
      id: "summation",
      title: "Summation Approach",
      description: "Land and building summation valuation",
      icon: Home,
      category: "traditional"
    },
    {
      id: "hypothetical-dev",
      title: "Hypothetical Development",
      description: "Development feasibility and residual land value",
      icon: Building2,
      category: "development"
    },
    {
      id: "hospitality-commercial",
      title: "Hospitality & Commercial",
      description: "Specialized hospitality and commercial property valuation",
      icon: ShoppingCart,
      category: "specialized"
    },
    {
      id: "childcare",
      title: "Childcare Facilities",
      description: "Specialized childcare facility valuation",
      icon: Baby,
      category: "specialized"
    },
    {
      id: "comprehensive-esg",
      title: "Comprehensive ESG",
      description: "Full ESG assessment and integration",
      icon: Leaf,
      category: "esg"
    },
    {
      id: "petrol-stations",
      title: "Petrol Stations",
      description: "Specialized petrol station valuation",
      icon: Fuel,
      category: "specialized"
    },
    {
      id: "deferred-management",
      title: "Deferred Management",
      description: "Deferred management fee calculations",
      icon: Users,
      category: "specialized"
    },
    {
      id: "dcf-analysis",
      title: "DCF Analysis",
      description: "Discounted cash flow analysis and NPV calculations",
      icon: TrendingDown,
      category: "financial"
    },
    {
      id: "sports-stadium",
      title: "Sports Stadium",
      description: "Specialized sports facility valuation",
      icon: MapPin,
      category: "specialized"
    }
  ];

  const categories = {
    yield: { name: "Yield Analysis", color: "bg-primary/10 text-primary border-primary/20" },
    esg: { name: "ESG Assessment", color: "bg-success/10 text-success border-success/20" },
    analysis: { name: "Market Analysis", color: "bg-info/10 text-info border-info/20" },
    income: { name: "Income Approach", color: "bg-warning/10 text-warning border-warning/20" },
    comparison: { name: "Sales Comparison", color: "bg-accent/10 text-accent-foreground border-accent/20" },
    traditional: { name: "Traditional Methods", color: "bg-muted/50 text-muted-foreground border-muted/30" },
    development: { name: "Development", color: "bg-purple-100 text-purple-800 border-purple-300" },
    specialized: { name: "Specialized", color: "bg-orange-100 text-orange-800 border-orange-300" },
    financial: { name: "Financial Analysis", color: "bg-blue-100 text-blue-800 border-blue-300" }
  };

  const handleToolSelect = (toolId) => {
    setSelectedTool(toolId);
    setActiveTab("calculator");
  };

  const renderForm = () => {
    switch (selectedTool) {
      case "ary":
        return <ARYCalculationForm onSubmit={(data) => console.log('ARY:', data)} />;
      case "esg-ary":
      case "esg-cap":
      case "esg-comparable":
      case "esg-weighting":
      case "esg-variable":
      case "comprehensive-esg":
        return <ESGCalculationForm onSubmit={(data) => console.log('ESG:', data)} />;
      case "cap-sensitivity":
        return <CapitalizationSensitivityForm onSubmit={(data) => console.log('Cap Sensitivity:', data)} />;
      case "net-income":
      case "cap-net-income":
        return <NetIncomeForm onSubmit={(data) => console.log('Net Income:', data)} />;
      case "dcf-analysis":
        return <DCFAnalysisForm onSubmit={(data) => console.log('DCF:', data)} />;
      case "hypothetical-dev":
        return <HypotheticalDevelopmentForm onSubmit={(data) => console.log('Hypothetical Development:', data)} />;
      case "sports-stadium":
        return <SportsStadiumValuationForm onSubmit={(data) => console.log('Sports Stadium:', data)} />;
      case "hospitality-commercial":
        return <HospitalityCommercialValuationForm onSubmit={(data) => console.log('Hospitality Commercial:', data)} />;
      case "deferred-management":
        return <DeferredManagementValuationForm onSubmit={(data) => console.log('Deferred Management:', data)} />;
      case "direct-comparison":
      case "summation":
      case "childcare":
      case "petrol-stations":
        return <ARYCalculationForm onSubmit={(data) => console.log(`${selectedTool}:`, data)} />;
      default:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                Select a valuation tool from the grid above to begin calculations.
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto p-6">
        {/* Back to Dashboard Button */}
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        
        {/* IP Protection Notice */}
        <div className="mb-8">
          <ESGMethodologyProtection />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            🌍 World's First Comprehensive ESG-Integrated Valuation Platform
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
            Comprehensive Property Valuation Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-6">
            World's first comprehensive property valuation with ARY, ESG, and capitalization rate analysis.
            Professional-grade valuation tools with integrated sustainability assessment and risk analysis.
          </p>
        </div>

        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tools">Valuation Tools</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Feature Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-card to-primary/10 border-primary/20">
                <CardHeader className="text-center">
                  <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">19 Valuation Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Comprehensive suite of traditional and ESG-enhanced valuation methodologies
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-success/10 border-success/20">
                <CardHeader className="text-center">
                  <Leaf className="w-8 h-8 mx-auto mb-2 text-success" />
                  <CardTitle className="text-lg">ESG Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Advanced ESG factor integration with sustainability risk assessment
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-info/10 border-info/20">
                <CardHeader className="text-center">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2 text-info" />
                  <CardTitle className="text-lg">Real-time Calculations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Instant calculations with professional-grade accuracy and reporting
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-warning/10 border-warning/20">
                <CardHeader className="text-center">
                  <Activity className="w-8 h-8 mx-auto mb-2 text-warning" />
                  <CardTitle className="text-lg">Market Intelligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Advanced market analysis with comparable sales and yield data
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Category Legend */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Valuation Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {Object.entries(categories).map(([key, category]) => (
                  <Badge key={key} variant="outline" className={category.color}>
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {valuationTools.map((tool) => {
                const Icon = tool.icon;
                const categoryInfo = categories[tool.category];
                
                return (
                  <Card 
                    key={tool.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                    onClick={() => handleToolSelect(tool.id)}
                  >
                    <CardHeader className="text-center pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className={`text-xs ${categoryInfo.color}`}>
                          {categoryInfo.name}
                        </Badge>
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground text-center">
                        {tool.description}
                      </p>
                      <div className="mt-4 text-center">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToolSelect(tool.id);
                          }}
                        >
                          Use Tool
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <div className="text-center mb-6">
              {selectedTool ? (
                <>
                  <h2 className="text-2xl font-bold mb-2">
                    {valuationTools.find(t => t.id === selectedTool)?.title} Calculator
                  </h2>
                  <p className="text-muted-foreground">
                    {valuationTools.find(t => t.id === selectedTool)?.description}
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-2">Valuation Calculator</h2>
                  <p className="text-muted-foreground">
                    Select a valuation tool to begin calculations
                  </p>
                </>
              )}
            </div>

            {/* Calculator Form */}
            {renderForm()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComprehensiveValuationAnalysis;