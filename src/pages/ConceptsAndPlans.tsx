import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Building, Smartphone, Lightbulb, FileText, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ArchitecturalPlanningDesign from '@/components/ArchitecturalPlanningDesign';
import SustanoProDeviceConcepts from '@/components/SustanoProDeviceConcepts';

const ConceptsAndPlans = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back to Dashboard Button */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <Home className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
        {/* Hero Section */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white">
          <CardHeader className="text-center py-12">
            <CardTitle className="text-4xl font-bold mb-4 flex items-center justify-center gap-4">
              <Lightbulb className="w-12 h-12" />
              Concepts & Strategic Plans
            </CardTitle>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Revolutionary concepts and strategic planning for the future of property valuation and development
            </p>
          </CardHeader>
        </Card>

        <Tabs defaultValue="architectural" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/90 border border-slate-600 mb-8">
            <TabsTrigger 
              value="architectural" 
              className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 hover:bg-slate-700 hover:text-white"
            >
              <Building className="w-4 h-4 mr-2" />
              Architectural Planning
            </TabsTrigger>
            <TabsTrigger 
              value="devices" 
              className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 hover:bg-slate-700 hover:text-white"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Sustaino Pro Devices
            </TabsTrigger>
            <TabsTrigger 
              value="strategic" 
              className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 hover:bg-slate-700 hover:text-white"
            >
              <FileText className="w-4 h-4 mr-2" />
              Strategic Vision
            </TabsTrigger>
          </TabsList>

          <TabsContent value="architectural" className="space-y-6">
            <ArchitecturalPlanningDesign />
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <SustanoProDeviceConcepts />
          </TabsContent>

          <TabsContent value="strategic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-6 h-6" />
                    Strategic Vision 2025-2030
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Platform Evolution</h4>
                      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                        <li>• Transition to exclusive device-based platform</li>
                        <li>• Enhanced security and performance optimization</li>
                        <li>• Premium subscription model implementation</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Market Expansion</h4>
                      <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                        <li>• Global architectural planning services</li>
                        <li>• Development site analysis expansion</li>
                        <li>• Enterprise client acquisition</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Technology Leadership</h4>
                      <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                        <li>• AI-powered architectural design automation</li>
                        <li>• Blockchain-based compliance verification</li>
                        <li>• IoT integration for real-time monitoring</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Future Innovations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 border border-orange-200 dark:border-orange-800 rounded-lg">
                      <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Augmented Reality Planning</h4>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        AR visualization of proposed developments on-site using Sustaino Pro devices
                      </p>
                    </div>
                    
                    <div className="p-4 border border-teal-200 dark:border-teal-800 rounded-lg">
                      <h4 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">Quantum Computing Integration</h4>
                      <p className="text-sm text-teal-700 dark:text-teal-300">
                        Advanced computational power for complex feasibility modeling
                      </p>
                    </div>
                    
                    <div className="p-4 border border-pink-200 dark:border-pink-800 rounded-lg">
                      <h4 className="font-semibold text-pink-800 dark:text-pink-200 mb-2">Global Compliance Network</h4>
                      <p className="text-sm text-pink-700 dark:text-pink-300">
                        Real-time updates from planning authorities worldwide
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Implementation Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">Q1 2025</div>
                    <h4 className="font-semibold mb-2">Foundation</h4>
                    <p className="text-sm text-muted-foreground">
                      Launch architectural planning platform
                    </p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">Q3 2025</div>
                    <h4 className="font-semibold mb-2">Device Launch</h4>
                    <p className="text-sm text-muted-foreground">
                      Sustaino Pro handheld beta release
                    </p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">Q1 2026</div>
                    <h4 className="font-semibold mb-2">Platform Migration</h4>
                    <p className="text-sm text-muted-foreground">
                      Exclusive device-only access
                    </p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-2">Q4 2026</div>
                    <h4 className="font-semibold mb-2">Global Expansion</h4>
                    <p className="text-sm text-muted-foreground">
                      International market launch
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ConceptsAndPlans;