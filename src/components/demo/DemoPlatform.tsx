import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, FileText, Camera, MapPin, Calculator, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { checkReportContradictions, generateContradictionReport } from '@/utils/reportContradictionChecker';
import { runAutomatedAmendment } from '@/utils/contradictionAmender';

interface DemoData {
  address: string;
  reportType: string;
  inspectionDate: string;
  valuationDate: string;
  underContract: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  landSize: number;
  buildingArea: number;
  constructionYear: number;
  condition: string;
  valuation: number;
  riskScore: number;
  vraComments: string;
  generalComments: string;
}

const mockAddresses = [
  {
    address: "24 Highway Drive, Mildura VIC 3500",
    type: "existing",
    data: {
      propertyType: "House",
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 2,
      landSize: 650,
      buildingArea: 180,
      constructionYear: 2010,
      condition: "Good",
      valuation: 485000,
      riskScore: 2,
      vraComments: "Property in good condition with standard market appeal. No significant risks identified.",
      generalComments: "Well-maintained family home in established area. Property presents good market appeal with no major defects noted."
    }
  },
  {
    address: "78 Sunset Boulevard, Ballarat VIC 3350", 
    type: "proposed",
    data: {
      propertyType: "House",
      bedrooms: 4,
      bathrooms: 3,
      carSpaces: 2,
      landSize: 800,
      buildingArea: 240,
      constructionYear: 2025,
      condition: "New",
      valuation: 650000,
      riskScore: 1,
      vraComments: "New construction with modern finishes. Excellent condition throughout with quality fixtures and fittings.",
      generalComments: "Contemporary design with energy-efficient features. Property offers excellent value in growing market area."
    }
  }
];

export const DemoPlatform = () => {
  const [activeDemo, setActiveDemo] = useState<'isfv' | 'paf'>('isfv');
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [demoData, setDemoData] = useState<DemoData>({
    address: mockAddresses[0].address,
    reportType: mockAddresses[0].type === 'existing' ? 'AS IS (Existing Property)' : 'AS IF COMPLETE',
    inspectionDate: '2024-09-29',
    valuationDate: '2024-09-29',
    underContract: 'No',
    ...mockAddresses[0].data
  });
  const [automationProgress, setAutomationProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [contradictionResults, setContradictionResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('automation');
  const { toast } = useToast();

  const handleAddressChange = (index: number) => {
    const selected = mockAddresses[index];
    setSelectedAddress(index);
    setDemoData({
      ...demoData,
      address: selected.address,
      reportType: selected.type === 'existing' ? 'AS IS (Existing Property)' : 'AS IF COMPLETE',
      ...selected.data
    });
  };

  const simulateAutomation = async () => {
    setIsProcessing(true);
    setAutomationProgress(0);
    
    const steps = [
      { name: 'Extracting property data...', progress: 20 },
      { name: 'Processing sales evidence...', progress: 40 },
      { name: 'Calculating risk assessments...', progress: 60 },
      { name: 'Running VRA analysis...', progress: 80 },
      { name: 'Finalizing report...', progress: 100 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAutomationProgress(step.progress);
      toast({
        title: "Automation Progress",
        description: step.name,
      });
    }

    // Run contradiction check
    const reportData = {
      propertyData: {
        kitchen_condition: demoData.condition.toLowerCase(),
        structural_condition: demoData.condition.toLowerCase()
      },
      riskRatings: {
        market_risk: demoData.riskScore,
        condition_risk: demoData.riskScore,
        location_risk: demoData.riskScore
      },
      vraAssessment: {
        comments: demoData.vraComments
      },
      generalComments: demoData.generalComments,
      rentalAssessment: {
        weekly_rent: 0
      }
    };

    const contradictions = checkReportContradictions(reportData);
    setContradictionResults(contradictions);

    setIsProcessing(false);
    toast({
      title: "Automation Complete!",
      description: "Your demo report has been generated successfully.",
    });
  };

  const runContradictionAmender = async () => {
    if (!contradictionResults) return;

    try {
      const amendments = await runAutomatedAmendment({}, contradictionResults);
      toast({
        title: "Amendments Applied",
        description: `${amendments.amendments.length} contradictions were automatically resolved.`,
      });
    } catch (error) {
      toast({
        title: "Amendment Error",
        description: "Failed to apply automated amendments.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Demo Platform Control Centre
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Demo Type</Label>
              <Select value={activeDemo} onValueChange={(value: 'isfv' | 'paf') => setActiveDemo(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="isfv">ISFV - Instant Short Form Valuation</SelectItem>
                  <SelectItem value="paf">PAF - Property Assessment Form</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Mock Address</Label>
              <Select value={selectedAddress.toString()} onValueChange={(value) => handleAddressChange(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockAddresses.map((addr, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {addr.address} ({addr.type === 'existing' ? 'As Is' : 'As If Complete'})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {activeDemo === 'isfv' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Instant Short Form Valuation (ISFV)</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Professional property valuation with integrated automation, Domain API, and risk analysis
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
                <Button size="sm" onClick={simulateAutomation} disabled={isProcessing}>
                  <Calculator className="h-4 w-4 mr-2" />
                  Run Full Automation
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-8">
                <TabsTrigger value="automation">Automation Hub</TabsTrigger>
                <TabsTrigger value="property">Property Summary</TabsTrigger>
                <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
                <TabsTrigger value="dwelling">Land & Dwelling</TabsTrigger>
                <TabsTrigger value="sales">Sales Evidence</TabsTrigger>
                <TabsTrigger value="comments">General Comments</TabsTrigger>
                <TabsTrigger value="vra">VRA Assessment</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
              </TabsList>

              <TabsContent value="automation" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Automation Control Center
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Overall Progress</Label>
                      <Progress value={automationProgress} className="mt-2" />
                      <div className="text-sm text-muted-foreground mt-1">{automationProgress}%</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label>Property Address (Required for Automation)</Label>
                        <Input 
                          value={demoData.address} 
                          onChange={(e) => setDemoData({...demoData, address: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Report Type</Label>
                        <Select 
                          value={demoData.reportType} 
                          onValueChange={(value) => setDemoData({...demoData, reportType: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AS IS (Existing Property)">AS IS (Existing Property)</SelectItem>
                            <SelectItem value="AS IF COMPLETE">AS IF COMPLETE</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Inspection Date</Label>
                        <Input 
                          type="date" 
                          value={demoData.inspectionDate}
                          onChange={(e) => setDemoData({...demoData, inspectionDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Valuation Date</Label>
                        <Input 
                          type="date" 
                          value={demoData.valuationDate}
                          onChange={(e) => setDemoData({...demoData, valuationDate: e.target.value})}
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={simulateAutomation} 
                      disabled={isProcessing}
                      className="w-full"
                      size="lg"
                    >
                      <Calculator className="h-4 w-4 mr-2" />
                      Start Full Automation
                    </Button>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Under Contract Status Control</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Label>Is the property under contract?</Label>
                        <Select 
                          value={demoData.underContract} 
                          onValueChange={(value) => setDemoData({...demoData, underContract: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Yes or No" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            OCR Processing
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-xs text-muted-foreground">Upload & extract data from documents/photos</p>
                          <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                            <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm">Upload Documents/Photos</p>
                            <p className="text-xs text-muted-foreground">PDF, JPG, PNG, DOCX, DOC, TIFF</p>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">Process OCR</Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Domain API
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-xs text-muted-foreground">Extract property data from Domain</p>
                          <Button variant="outline" className="w-full">Extract Data</Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Planning Maps
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-xs text-muted-foreground">Integrate state planning data</p>
                          <Button variant="outline" className="w-full">Integrate Maps</Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Sales Evidence</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">Generate comparable sales with adjustments</p>
                          <Button variant="outline" className="w-full mt-2">Generate Sales</Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Risk Ratings</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">Calculate automated risk assessments</p>
                          <Button variant="outline" className="w-full mt-2">Calculate Risks</Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">VRA Assessment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">Valuation Risk Alert assessment</p>
                          <Button variant="outline" className="w-full mt-2">Assess VRA</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="property" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Property Type</Label>
                        <Input value={demoData.propertyType} readOnly />
                      </div>
                      <div>
                        <Label>Current Valuation</Label>
                        <Input value={`$${demoData.valuation.toLocaleString()}`} readOnly />
                      </div>
                      <div>
                        <Label>Bedrooms</Label>
                        <Input value={demoData.bedrooms} readOnly />
                      </div>
                      <div>
                        <Label>Bathrooms</Label>
                        <Input value={demoData.bathrooms} readOnly />
                      </div>
                      <div>
                        <Label>Car Spaces</Label>
                        <Input value={demoData.carSpaces} readOnly />
                      </div>
                      <div>
                        <Label>Land Size (sqm)</Label>
                        <Input value={demoData.landSize} readOnly />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="risk" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Overall Risk Score</span>
                        <Badge variant={demoData.riskScore <= 2 ? "default" : "destructive"}>
                          {demoData.riskScore}/5
                        </Badge>
                      </div>
                      <Progress value={demoData.riskScore * 20} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="dwelling" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Land & Dwelling Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Building Area (sqm)</Label>
                        <Input value={demoData.buildingArea} readOnly />
                      </div>
                      <div>
                        <Label>Construction Year</Label>
                        <Input value={demoData.constructionYear} readOnly />
                      </div>
                      <div>
                        <Label>Condition</Label>
                        <Input value={demoData.condition} readOnly />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sales" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Evidence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Sales evidence would be populated here through automation.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>General Comments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      value={demoData.generalComments}
                      onChange={(e) => setDemoData({...demoData, generalComments: e.target.value})}
                      rows={6}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vra" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>VRA Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      value={demoData.vraComments}
                      onChange={(e) => setDemoData({...demoData, vraComments: e.target.value})}
                      rows={6}
                      placeholder="VRA assessment comments..."
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="professional" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Professional certification and signature details would appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {contradictionResults && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Contradiction Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded">
                      {generateContradictionReport(contradictionResults)}
                    </pre>
                    {contradictionResults.hasContradictions && (
                      <Button onClick={runContradictionAmender} variant="outline">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Run Automated Amendment
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      )}

      {activeDemo === 'paf' && (
        <Card>
          <CardHeader>
            <CardTitle>Property Assessment Form (PAF)</CardTitle>
            <p className="text-sm text-muted-foreground">
              Complete all steps to generate your comprehensive property report
            </p>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">New Professional Assessment</h3>
                <p className="text-muted-foreground">
                  Start with client intake, create comprehensive job file, and conduct full property assessment
                </p>
              </div>
              <Button size="lg" className="w-full max-w-md">
                Create New Job
              </Button>
              <div className="bg-muted/50 rounded-lg p-6 mt-8">
                <div className="text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <h4 className="font-medium mb-2">No previous jobs</h4>
                  <p className="text-sm">Start your first property assessment to get started</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};