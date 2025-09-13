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
  Scale,
  Shield,
  Info
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
        
        {/* Blue/purple glowing background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/60 to-indigo-50/70" />
        
        <div className="relative z-10 container mx-auto px-4 py-12">
          {currentStep === 'form' ? (
            <div className="space-y-12">
              {/* Back to Dashboard Button */}
              <div className="flex justify-start">
                <Link to="/automated-valuation">
                  <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-purple-200 text-purple-700 hover:bg-purple-50">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Main Dashboard
                  </Button>
                </Link>
              </div>
              
              {/* Clean Header */}
              <div className="text-center space-y-6">
                <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-purple-600 rounded-full text-sm font-medium shadow-sm border border-purple-200/50">
                  🌍 Professional Property Assessment Platform
                </div>
                
                {/* Powered Branding */}
                <div className="flex items-center justify-center gap-4">
                  <ThunderboltIcon className="h-16 w-16" />
                  <div className="text-left">
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Powered
                    </h1>
                    <p className="text-xl text-slate-600 font-medium">
                      A Sustaino Pro Product
                    </p>
                  </div>
                </div>
                
                <p className="text-lg text-purple-600 max-w-2xl mx-auto leading-relaxed">
                  Complete your property assessment form to receive a comprehensive ESG-integrated valuation report.
                </p>
              </div>

              {/* Clean Tabs */}
              <div className="max-w-7xl mx-auto">
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm shadow-sm border border-purple-200/50 rounded-xl p-1">
                    <TabsTrigger value="assessment" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
                      <Building className="h-4 w-4" />
                      Property Assessment
                    </TabsTrigger>
                    <TabsTrigger value="tools" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
                      <Settings className="h-4 w-4" />
                      Additional Tools
                    </TabsTrigger>
                    <TabsTrigger value="info" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
                      <Info className="h-4 w-4" />
                      Product Information
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="assessment" className="mt-8">
                    <div className="max-w-7xl mx-auto">
                      <Card className="bg-white/95 backdrop-blur-sm shadow-xl border border-purple-200/50">
                        <CardHeader className="border-b border-purple-100 bg-gradient-to-r from-purple-50/50 to-blue-50/30">
                          <CardTitle className="text-2xl flex items-center gap-3 text-purple-800">
                            <Building className="h-6 w-6 text-purple-700" />
                            Property Assessment Form
                          </CardTitle>
                          <p className="text-purple-700">
                            Complete all steps to generate your comprehensive property report
                          </p>
                        </CardHeader>
                        <CardContent className="p-8">
                          <MultiStepForm onSubmit={handleFormSubmit} />
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="tools" className="mt-8">
                    <Card className="bg-white/95 backdrop-blur-sm shadow-xl border border-purple-200/50">
                      <CardHeader className="border-b border-purple-100 bg-gradient-to-r from-purple-50/50 to-blue-50/30">
                        <CardTitle className="text-2xl flex items-center gap-3 text-purple-800">
                          <Settings className="h-6 w-6 text-purple-700" />
                          Additional Tools
                        </CardTitle>
                        <p className="text-purple-700">
                          Access specialized valuation and assessment tools
                        </p>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <Link to="/automated-valuation">
                            <Card className="bg-gradient-to-br from-white to-blue-50/50 border border-blue-100 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105">
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-blue-700">
                                  <TrendingUp className="h-5 w-5" />
                                  Property Valuation
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-slate-600">
                                  Access comprehensive property valuation tools and market analysis
                                </p>
                              </CardContent>
                            </Card>
                          </Link>

                          <Card className="bg-gradient-to-br from-white to-indigo-50/50 border border-indigo-100 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-indigo-700">
                                <ArrowUpDown className="h-5 w-5" />
                                Rent Revision
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-slate-600">
                                Calculate and review rental valuations with market comparisons
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="bg-gradient-to-br from-white to-orange-50/50 border border-orange-100 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-orange-700">
                                <Scale className="h-5 w-5" />
                                Rent Determination
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-slate-600">
                                Professional rent determination and arbitration services
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-100 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-slate-700">
                                <Wrench className="h-5 w-5" />
                                Plant & Equipment
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-slate-600">
                                Specialized valuation for plant, equipment and machinery assets
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="bg-gradient-to-br from-white to-purple-50/50 border border-purple-100 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-purple-700">
                                <Shield className="h-5 w-5" />
                                Insurance Valuations
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-slate-600">
                                Professional insurance valuations and replacement cost assessments
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="bg-gradient-to-br from-white to-green-50/50 border border-green-100 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-green-700">
                                <Sprout className="h-5 w-5" />
                                Agricultural Hub
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-slate-600">
                                Specialized tools for agricultural property assessment and valuation
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="bg-gradient-to-br from-white to-amber-50/50 border border-amber-100 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-amber-700">
                                <Building2 className="h-5 w-5" />
                                Property Hub
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-slate-600">
                                Central hub for all property management and analysis tools
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="bg-gradient-to-br from-white to-violet-50/50 border border-violet-100 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-violet-700">
                                <Activity className="h-5 w-5" />
                                Economic Activity
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-slate-600">
                                Analyze economic indicators and market trends affecting property values
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="bg-gradient-to-br from-white to-teal-50/50 border border-teal-100 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-teal-700">
                                <CloudRain className="h-5 w-5" />
                                Climate Risk
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-slate-600">
                                Comprehensive climate risk assessment and environmental analysis
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="info" className="mt-8">
                    <Card className="bg-white/95 backdrop-blur-sm shadow-xl border border-purple-200/50">
                      <CardHeader className="border-b border-purple-100 bg-gradient-to-r from-purple-50/50 to-blue-50/30">
                        <CardTitle className="text-2xl flex items-center gap-3 text-purple-800">
                          <Info className="h-6 w-6 text-purple-700" />
                          Product Information
                        </CardTitle>
                        <p className="text-purple-700">
                          Download comprehensive information about our platform
                        </p>
                      </CardHeader>
                      <CardContent className="p-8">
                        <InformationBrochure />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
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