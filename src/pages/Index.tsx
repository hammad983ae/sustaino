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
  Settings,
  Wrench,
  Scale
} from 'lucide-react';
import MultiStepForm from '@/components/MultiStepForm';
import { PropertyProvider } from '@/contexts/PropertyContext';
import ThunderboltIcon from '@/components/ThunderboltIcon';
import InformationBrochure from '@/components/InformationBrochure';
import PropertyValuation3DBackground from '@/components/PropertyValuation3DBackground';

const Index = () => {
  const [currentStep, setCurrentStep] = useState('form');
  const [activeTab, setActiveTab] = useState('assessment');
  const [propertyData, setPropertyData] = useState(null);
  const [esgScores, setEsgScores] = useState(null);

  const handleFormSubmit = (data) => {
    setPropertyData(data);
    setEsgScores({
      environmental: 75,
      social: 68,
      governance: 82,
      overall: 75
    });
    setCurrentStep('results');
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
  };

  return (
    <PropertyProvider>
      <div className="min-h-screen relative">
        {/* 3D Background */}
        <PropertyValuation3DBackground />
        
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-orange-50/30 to-emerald-50/40" />
        
        <div className="relative z-10 container mx-auto px-4 py-8">
          {currentStep === 'form' ? (
            <div className="space-y-8">
              {/* Enhanced Header */}
              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 animate-fade-in">
                  🌍 Professional Property Assessment Platform
                </div>
                
                {/* Powered Branding */}
                <div className="flex items-center justify-center gap-3 mb-6 animate-scale-in">
                  <ThunderboltIcon className="h-12 w-12" />
                  <div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Powered
                    </h1>
                    <p className="text-lg text-muted-foreground font-medium">
                      A Sustaino Pro Product
                    </p>
                  </div>
                </div>
                
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  Complete your property assessment form to receive a comprehensive ESG-integrated valuation report.
                </p>
              </div>

              {/* Simplified Tabs */}
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="w-full animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <TabsList className="grid w-full grid-cols-2 max-w-lg mx-auto">
                  <TabsTrigger value="assessment" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Property Assessment
                  </TabsTrigger>
                  <TabsTrigger value="tools" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Additional Tools
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="assessment" className="space-y-8">
                  {/* Main Assessment Form */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-primary/20">
                        <CardHeader className="border-b border-primary/10">
                          <CardTitle className="text-2xl flex items-center gap-3">
                            <Building className="h-6 w-6 text-primary" />
                            Property Assessment Form
                          </CardTitle>
                          <p className="text-muted-foreground">
                            Complete all steps to generate your comprehensive property report
                          </p>
                        </CardHeader>
                        <CardContent className="p-6">
                          <MultiStepForm onSubmit={handleFormSubmit} />
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Information Brochure */}
                    <div className="space-y-6">
                      <InformationBrochure />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tools" className="space-y-6">
                  {/* Additional Tools Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/automated-valuation">
                      <Card className="bg-gradient-to-br from-card to-primary/10 border-primary/20 hover:shadow-lg transition-all duration-300 cursor-pointer hover-scale">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-primary">
                            <TrendingUp className="h-5 w-5" />
                            Property Valuation
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Access comprehensive property valuation tools and market analysis
                          </p>
                        </CardContent>
                      </Card>
                    </Link>

                    <Card className="bg-gradient-to-br from-card to-info/10 border-info/20 hover:shadow-lg transition-all duration-300 cursor-pointer hover-scale">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-info">
                          <ArrowUpDown className="h-5 w-5" />
                          Rent Revision
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Calculate and review rental valuations with market comparisons
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-card to-orange-500/10 border-orange-500/20 hover:shadow-lg transition-all duration-300 cursor-pointer hover-scale">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-orange-600">
                          <Scale className="h-5 w-5" />
                          Rent Determination
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Professional rent determination and arbitration services
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-card to-slate-500/10 border-slate-500/20 hover:shadow-lg transition-all duration-300 cursor-pointer hover-scale">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-slate-600">
                          <Wrench className="h-5 w-5" />
                          Plant & Equipment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Specialized valuation for plant, equipment and machinery assets
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-card to-success/10 border-success/20 hover:shadow-lg transition-all duration-300 cursor-pointer hover-scale">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-success">
                          <Sprout className="h-5 w-5" />
                          Agricultural Hub
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Specialized tools for agricultural property assessment and valuation
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-card to-warning/10 border-warning/20 hover:shadow-lg transition-all duration-300 cursor-pointer hover-scale">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-warning">
                          <Building2 className="h-5 w-5" />
                          Property Hub
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Central hub for all property management and analysis tools
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-card to-purple-500/10 border-purple-500/20 hover:shadow-lg transition-all duration-300 cursor-pointer hover-scale">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-purple-600">
                          <Activity className="h-5 w-5" />
                          Economic Activity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Analyze economic indicators and market trends affecting property values
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-card to-emerald-500/10 border-emerald-500/20 hover:shadow-lg transition-all duration-300 cursor-pointer hover-scale">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-emerald-600">
                          <CloudRain className="h-5 w-5" />
                          Climate Risk
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive climate risk assessment and environmental analysis
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
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

                {/* Results Content */}
                {propertyData && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="bg-card/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>Property Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p><strong>Address:</strong> {propertyData.address}</p>
                          <p><strong>Type:</strong> {propertyData.type}</p>
                          <p><strong>Value:</strong> ${propertyData.value?.toLocaleString()}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {esgScores && (
                      <Card className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle>ESG Scores</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span>Environmental</span>
                              <Badge variant="outline" className="text-success border-success">
                                {esgScores.environmental}%
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Social</span>
                              <Badge variant="outline" className="text-info border-info">
                                {esgScores.social}%
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Governance</span>
                              <Badge variant="outline" className="text-warning border-warning">
                                {esgScores.governance}%
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center font-bold">
                              <span>Overall ESG Score</span>
                              <Badge className="bg-primary text-primary-foreground">
                                {esgScores.overall}%
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PropertyProvider>
  );
};

export default Index;