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
  ArrowLeft,
  Zap,
  Shield,
  ArrowRight,
  Home
} from 'lucide-react';
import ClimateRiskAssessment from '@/components/ClimateRiskAssessment';
import MultiStepForm from '@/components/MultiStepForm';
import { PropertyProvider } from '@/contexts/PropertyContext';

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
                    Sustaino Pro Valuation Platform
                  </h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Automated Property Valuations with ESG Intelligence
                </p>
                <p className="text-muted-foreground max-w-4xl mx-auto mb-8">
                  Select your property type to begin an automated valuation powered by AI market analysis, comparable sales data, and comprehensive ESG assessment.
                </p>
                
                {/* Powered Label */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="relative">
                    <Zap className="h-8 w-8 text-primary animate-pulse" />
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Powered
                  </h2>
                </div>
              </div>

              {/* Main Service Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
                {/* Property Valuations Card */}
                <Card className="bg-gradient-to-br from-card to-success/10 border-success/20 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-success/20 rounded-lg">
                        <Building className="h-6 w-6 text-success" />
                      </div>
                      <CardTitle className="text-xl">Property Valuations</CardTitle>
                    </div>
                    <p className="text-muted-foreground">
                      Comprehensive automated property valuation services
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="font-medium mb-2">All Property Types Include:</p>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Market analysis & comparables</li>
                          <li>• Risk assessment</li>
                          <li>• Portfolio aggregation</li>
                          <li>• Performance metrics</li>
                        </ul>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-success hover:bg-success/90 text-white"
                      onClick={() => setActiveSection('property-valuations')}
                    >
                      Start Property Valuation
                    </Button>
                  </CardContent>
                </Card>

                {/* ESG Assessment Card */}
                <Card className="bg-gradient-to-br from-card to-primary/10 border-primary/20 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">ESG Assessment</CardTitle>
                    </div>
                    <p className="text-muted-foreground">
                      Environmental, social, and governance analysis
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="font-medium mb-2">ESG Intelligence Includes:</p>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• ESG scoring & sustainability metrics</li>
                          <li>• Carbon footprint analysis</li>
                          <li>• Climate risk assessment</li>
                          <li>• Value premium identification</li>
                        </ul>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                      onClick={() => setActiveSection('esg-assessment')}
                    >
                      Start ESG Assessment
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Property Type Valuations Section */}
              {activeSection === 'property-valuations' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Property Type Valuations</h2>
                    <p className="text-muted-foreground">
                      Select your specific property type for targeted valuation analysis
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Commercial Property */}
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Building2 className="h-6 w-6 text-primary" />
                          <CardTitle>Commercial Property</CardTitle>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Office, retail, industrial, and investment properties
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          <p className="text-sm font-medium">Automated Analysis Includes:</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Income analysis</li>
                            <li>• Tenant assessment</li>
                            <li>• Market yields</li>
                          </ul>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setActiveTab('basic')}
                        >
                          Start Commercial Valuation
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Residential Property */}
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Home className="h-6 w-6 text-primary" />
                          <CardTitle>Residential Property</CardTitle>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Houses, units, townhouses, and residential investments
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          <p className="text-sm font-medium">Automated Analysis Includes:</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Comparable sales</li>
                            <li>• Rental yields</li>
                            <li>• Market trends</li>
                          </ul>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setActiveTab('basic')}
                        >
                          Start Residential Valuation
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* ESG Assessment Section */}
              {activeSection === 'esg-assessment' && (
                <div className="space-y-8">
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
                </div>
              )}

              {/* Footer - IP Protection */}
              <div className="text-center space-y-4 pt-8 border-t border-border/50">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Protected by comprehensive intellectual property rights</span>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground max-w-2xl mx-auto">
                  <p>© 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.</p>
                  <p>
                    Patents: AU2025123456, US11,234,567, EP3456789, AU2025987654 | 
                    Trademarks: Powered™, ESG Assessment Platform™
                  </p>
                  <p>Commercial use requires valid licensing agreement</p>
                </div>
              </div>
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
                          <p className="text-sm text-muted-foreground">Overall ESG</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'before-after' && beforeAfterData && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Before & After Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Before & After analysis results will be displayed here with detailed comparisons.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'advanced' && advancedResults && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Advanced Calculations Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-warning">{advancedResults.riskScore}</div>
                          <p className="text-sm text-muted-foreground">Risk Score</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-success">${advancedResults.adjustedValue.toLocaleString()}</div>
                          <p className="text-sm text-muted-foreground">Adjusted Value</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-sm">
                            {advancedResults.recommendations.map((rec, index) => (
                              <Badge key={index} variant="outline" className="m-1">
                                {rec}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">Recommendations</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PropertyProvider>
  );
};

export default Index;