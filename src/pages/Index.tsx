import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Building2, 
  Calculator, 
  BarChart3, 
  ArrowUpDown, 
  Target, 
  TrendingUp,
  Activity,
  Sprout,
  CloudRain,
  ArrowLeft
} from 'lucide-react';
import ClimateRiskAssessment from '@/components/ClimateRiskAssessment';
import MultiStepForm from '@/components/MultiStepForm';
import { PropertyProvider } from '@/contexts/PropertyContext';
import { APITestComponent } from '@/components/APITestComponent';

const Index = () => {
  const [currentStep, setCurrentStep] = useState('form');
  const [activeTab, setActiveTab] = useState('basic');
  const [activeSection, setActiveSection] = useState(null);
  const [propertyData, setPropertyData] = useState(null);
  const [esgScores, setEsgScores] = useState(null);
  const [beforeAfterData, setBeforeAfterData] = useState(null);
  const [advancedPropertyData, setAdvancedPropertyData] = useState(null);
  const [advancedResults, setAdvancedResults] = useState(null);

  const handleSearchSelection = (method) => {
    console.log('Search method selected:', method);
  };

  const handleBasicFormSubmit = (data) => {
    setPropertyData(data);
    setEsgScores({
      environmental: 75,
      social: 68,
      governance: 82,
      overall: 75
    });
    setCurrentStep('results');
  };

  const handleBeforeAfterFormSubmit = (data) => {
    setBeforeAfterData(data);
    setCurrentStep('results');
  };

  const handleAdvancedFormSubmit = (data) => {
    setAdvancedPropertyData(data);
    setAdvancedResults({
      riskScore: 0.35,
      adjustedValue: 850000,
      recommendations: ['Climate mitigation', 'Energy efficiency']
    });
    setCurrentStep('results');
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
    setActiveSection(null);
  };

  return (
    <PropertyProvider>
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {currentStep === 'form' ? (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                🌍 First in the World ESG Property Assessment Platform
              </div>
              <div className="flex items-center justify-center gap-3 mb-6">
                <Building className="h-12 w-12 text-primary" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                  ESG Property Assessment Platform
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
                The world's first comprehensive ESG-integrated property valuation system.
                Professional sustainability and risk evaluation platform for real estate properties. 
                Choose between basic ESG assessment or advanced automated calculations with comprehensive risk analysis.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  className="flex items-center gap-2 touch-manipulation min-h-[44px]"
                  onClick={() => setActiveSection('esg-analysis')}
                >
                  📊 ESG Automated Analysis
                </Button>
                <Button 
                  size="lg" 
                  className="flex items-center gap-2 touch-manipulation min-h-[44px]"
                  onClick={() => setActiveSection('climate-risk')}
                >
                  🌡️ Climate Risk Assessment
                </Button>
                <Link to="/automated-valuation">
                  <Button variant="outline" size="lg" className="flex items-center gap-2 touch-manipulation min-h-[44px]">
                    <TrendingUp className="w-5 h-5" />
                    Start Property Valuation
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="flex items-center gap-2 touch-manipulation min-h-[44px]">
                  <ArrowUpDown className="w-5 h-5" />
                  Rent Revision
                </Button>
                <Button variant="outline" size="lg" className="flex items-center gap-2 touch-manipulation min-h-[44px]">
                  <Sprout className="w-5 h-5" />
                  Agricultural Hub
                </Button>
                <Button variant="outline" size="lg" className="flex items-center gap-2 touch-manipulation min-h-[44px]">
                  <Building2 className="w-5 h-5" />
                  Property Hub
                </Button>
                <Button variant="outline" size="lg" className="flex items-center gap-2 touch-manipulation min-h-[44px]">
                  <Activity className="w-5 h-5" />
                  Economic Activity
                </Button>
              </div>
            </div>

            {/* Assessment Type Tabs */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
                <TabsTrigger value="basic" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Basic Assessment
                </TabsTrigger>
                <TabsTrigger value="before-after" className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  Before & After
                </TabsTrigger>
                <TabsTrigger value="advanced" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Advanced Calculations
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                {/* Basic Features Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-gradient-to-br from-card to-success/10 border-success/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-success">
                        <Calculator className="h-5 w-5" />
                        ESG Scoring
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive Environmental, Social, and Governance assessment 
                        with industry-standard scoring methodology.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-card to-info/10 border-info/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-info">
                        <BarChart3 className="h-5 w-5" />
                        Risk Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Property risk rating incorporating sustainability factors, 
                        property age, and certification status.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-card to-warning/10 border-warning/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-warning">
                        <Building className="h-5 w-5" />
                        Export Tools
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Export results to CSV, JSON, and Excel templates 
                        for integration with valuation workflows.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4">Property Assessment Form</h3>
                  <MultiStepForm onSubmit={handleBasicFormSubmit} />
                </div>
                
                {/* API Testing Component */}
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4">API Testing Dashboard</h3>
                  <p className="text-muted-foreground mb-4">Test all property valuation APIs to ensure they work for real jobs.</p>
                  <APITestComponent />
                </div>
              </TabsContent>

              <TabsContent value="before-after" className="space-y-6">
                {/* Before & After Features Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-gradient-to-br from-card to-primary/10 border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-primary">
                        <ArrowUpDown className="h-5 w-5" />
                        Value Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Compare property values before and after changes, improvements, 
                        or market conditions with detailed impact analysis.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-card to-warning/10 border-warning/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-warning">
                        <Calculator className="h-5 w-5" />
                        Change Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Quantify the financial impact of property improvements, 
                        deterioration, or market adjustments with percentage calculations.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-card to-success/10 border-success/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-success">
                        <TrendingUp className="h-5 w-5" />
                        Professional Reports
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Generate comprehensive before/after reports with detailed 
                        reasoning and supporting documentation for valuations.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4">Before & After Valuation Form</h3>
                  <Button onClick={() => handleBeforeAfterFormSubmit({})}>
                    Submit Sample Before/After Data
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                {/* Advanced Features Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-gradient-to-br from-card to-primary/10 border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-primary">
                        <Target className="h-5 w-5" />
                        Automated Formulas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Advanced calculations using weighted averages, climate risk thresholds, 
                        and normalized scoring systems with Excel-compatible formulas.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-card to-warning/10 border-warning/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-warning">
                        <Calculator className="h-5 w-5" />
                        Climate Risk Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive climate risk evaluation including flood, bushfire, 
                        cyclone, heatwave, and drought risk with customizable thresholds.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-card to-success/10 border-success/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-success">
                        <BarChart3 className="h-5 w-5" />
                        Financial Integration
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        SEIFA socioeconomic scoring, financial risk factors, 
                        and overall 1-5 risk rating for insurance and lending decisions.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4">Advanced Calculations Form</h3>
                  <Button onClick={() => handleAdvancedFormSubmit({})}>
                    Submit Sample Advanced Data
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* ESG Analysis Section */}
            {activeSection === 'esg-analysis' && (
              <Card className="shadow-xl">
                <CardHeader className="border-b">
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Target className="h-6 w-6 text-primary" />
                    ESG Automated Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <p className="text-muted-foreground">
                      ESG Automated Analysis section will be implemented with comprehensive 
                      environmental, social, and governance assessment tools.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-success">85%</div>
                          <p className="text-sm text-muted-foreground">Environmental Score</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-info">72%</div>
                          <p className="text-sm text-muted-foreground">Social Score</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-warning">91%</div>
                          <p className="text-sm text-muted-foreground">Governance Score</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Climate Risk Section */}
            {activeSection === 'climate-risk' && (
              <Card className="shadow-xl">
                <CardHeader className="border-b">
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <CloudRain className="h-6 w-6 text-primary" />
                    Climate Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ClimateRiskAssessment />
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          /* Results View */
          <div className="space-y-8">
            {/* Results Header */}
            <div className="text-center">
              <Button 
                onClick={handleBackToForm}
                variant="outline" 
                className="mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Form
              </Button>
              <h1 className="text-3xl font-bold mb-4">Assessment Results</h1>
            </div>

            {/* Results Content Based on Active Tab */}
            {activeTab === 'basic' && propertyData && esgScores && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>ESG Assessment Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-success">{esgScores.environmental}%</div>
                        <p className="text-sm text-muted-foreground">Environmental</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-info">{esgScores.social}%</div>
                        <p className="text-sm text-muted-foreground">Social</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-warning">{esgScores.governance}%</div>
                        <p className="text-sm text-muted-foreground">Governance</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-primary">{esgScores.overall}%</div>
                        <p className="text-sm text-muted-foreground">Overall Score</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'before-after' && beforeAfterData && (
              <Card>
                <CardHeader>
                  <CardTitle>Before & After Analysis Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Before and after valuation comparison results would be displayed here.
                  </p>
                </CardContent>
              </Card>
            )}

            {activeTab === 'advanced' && advancedPropertyData && advancedResults && (
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Analysis Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">{(advancedResults.riskScore * 100).toFixed(1)}%</div>
                      <p className="text-sm text-muted-foreground">Risk Score</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">${advancedResults.adjustedValue.toLocaleString()}</div>
                      <p className="text-sm text-muted-foreground">Adjusted Value</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-lg font-bold">{advancedResults.recommendations.length}</div>
                      <p className="text-sm text-muted-foreground">Recommendations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
    </PropertyProvider>
  );
};

export default Index;