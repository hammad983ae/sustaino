import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  FileText, 
  Users, 
  ArrowRight,
  Clock,
  Target,
  Building,
  PlayCircle
} from 'lucide-react';
import { ISFVWorkflowDemo } from './ISFVWorkflowDemo';
import { PAFWorkflowDemo } from './PAFWorkflowDemo';

export const ClientDemo = () => {
  const [activeDemo, setActiveDemo] = useState('overview');

  const demoStats = {
    isfv: {
      title: 'ISFV (Instant Valuation)',
      description: 'AI-powered instant statutory form valuations',
      time: '~9 seconds',
      accuracy: '95% confidence',
      automation: '100% automated',
      use_cases: ['Quick valuations', 'Portfolio screening', 'Market updates', 'Lending decisions']
    },
    paf: {
      title: 'PAF (Full Assessment)',
      description: 'Comprehensive property assessment workflow',
      time: '~115 minutes',
      accuracy: '99% confidence',
      automation: '70% automated',
      use_cases: ['Mortgage valuations', 'Legal disputes', 'Insurance claims', 'Investment analysis']
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold text-primary">Client Demo Platform</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Experience both automation workflows: lightning-fast ISFV instant valuations and comprehensive PAF professional assessments.
        </p>
      </div>

      <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm shadow-sm border border-primary/20 rounded-xl p-1">
          <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
            <Target className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="isfv" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
            <Zap className="h-4 w-4" />
            ISFV Demo
          </TabsTrigger>
          <TabsTrigger value="paf" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
            <FileText className="h-4 w-4" />
            PAF Demo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* ISFV Overview */}
              <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-700">
                    <Zap className="h-6 w-6" />
                    ISFV Automation Hub
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Processing Time</p>
                      <p className="text-xl font-bold text-yellow-700">{demoStats.isfv.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Accuracy</p>
                      <p className="text-xl font-bold text-yellow-700">{demoStats.isfv.accuracy}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Automation Level</p>
                    <Badge className="bg-yellow-500 text-white">{demoStats.isfv.automation}</Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Primary Use Cases</p>
                    <div className="space-y-1">
                      {demoStats.isfv.use_cases.map((useCase, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                          {useCase}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => setActiveDemo('isfv')} 
                    className="w-full bg-yellow-500 hover:bg-yellow-600"
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Run ISFV Demo
                  </Button>
                </CardContent>
              </Card>

              {/* PAF Overview */}
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <FileText className="h-6 w-6" />
                    PAF Professional Workflow
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Time</p>
                      <p className="text-xl font-bold text-blue-700">{demoStats.paf.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Accuracy</p>
                      <p className="text-xl font-bold text-blue-700">{demoStats.paf.accuracy}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Automation Level</p>
                    <Badge className="bg-blue-500 text-white">{demoStats.paf.automation}</Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Primary Use Cases</p>
                    <div className="space-y-1">
                      {demoStats.paf.use_cases.map((useCase, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          {useCase}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => setActiveDemo('paf')} 
                    className="w-full bg-blue-500 hover:bg-blue-600"
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Run PAF Demo
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Workflow Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Feature</th>
                        <th className="text-center p-3">ISFV Automation</th>
                        <th className="text-center p-3">PAF Professional</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Processing Time</td>
                        <td className="p-3 text-center">
                          <Badge variant="outline" className="text-yellow-700 border-yellow-300">~9 seconds</Badge>
                        </td>
                        <td className="p-3 text-center">
                          <Badge variant="outline" className="text-blue-700 border-blue-300">~115 minutes</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Automation Level</td>
                        <td className="p-3 text-center">100% Automated</td>
                        <td className="p-3 text-center">70% Automated</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Data Sources</td>
                        <td className="p-3 text-center">AI + Market Data</td>
                        <td className="p-3 text-center">Physical Inspection + Analysis</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Best For</td>
                        <td className="p-3 text-center">Quick decisions, Portfolio screening</td>
                        <td className="p-3 text-center">Legal, Insurance, Investment</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Report Type</td>
                        <td className="p-3 text-center">Statutory Form Valuation</td>
                        <td className="p-3 text-center">Comprehensive Assessment</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Integration Flow */}
            <Card>
              <CardHeader>
                <CardTitle>Integrated Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-4 py-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                      <Zap className="h-8 w-8 text-yellow-600" />
                    </div>
                    <p className="font-medium">ISFV</p>
                    <p className="text-sm text-muted-foreground">Quick Screen</p>
                  </div>
                  
                  <ArrowRight className="h-8 w-8 text-muted-foreground" />
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="font-medium">PAF</p>
                    <p className="text-sm text-muted-foreground">Full Assessment</p>
                  </div>
                  
                  <ArrowRight className="h-8 w-8 text-muted-foreground" />
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="font-medium">Professional</p>
                    <p className="text-sm text-muted-foreground">Sign-off</p>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Seamless integration from instant automation to professional assessment
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="isfv" className="mt-8">
          <ISFVWorkflowDemo />
        </TabsContent>

        <TabsContent value="paf" className="mt-8">
          <PAFWorkflowDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
};