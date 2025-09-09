import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Leaf, 
  TrendingUp, 
  Users, 
  Shield, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Calculator,
  FileText,
  BarChart3,
  Zap
} from "lucide-react";
import SustainabilityRatingCalculator from "./SustainabilityRatingCalculator";

export default function SustainoProAnalysis() {
  const [currentStep, setCurrentStep] = useState(1);
  const [analysisStatus, setAnalysisStatus] = useState('in-progress');
  const [documents, setDocuments] = useState({
    energyCertificate: null,
    environmentalReport: null,
    sustainabilityReport: null
  });
  
  const [esgData, setEsgData] = useState({
    energyRating: '',
    carbonFootprint: '',
    socialImpact: '',
    governanceScore: '',
    sustainabilityPremium: ''
  });

  const getStatusBadge = () => {
    switch (analysisStatus) {
      case 'completed':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Analysis Complete</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500"><Zap className="w-3 h-3 mr-1" />AI Analyzing</Badge>;
      case 'requires-input':
        return <Badge className="bg-yellow-500"><Clock className="w-3 h-3 mr-1" />Needs Input</Badge>;
      default:
        return <Badge variant="outline">Ready to Start</Badge>;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEsgData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (documentType: string, file: File) => {
    setDocuments(prev => ({ ...prev, [documentType]: file }));
  };

  return (
    <div className="space-y-6">
      {/* Main ESG Analysis Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Leaf className="w-6 h-6 mr-2 text-green-600" />
              Sustaino Pro ESG Analysis & Features
            </div>
            {getStatusBadge()}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Comprehensive Environmental, Social & Governance assessment with AI-powered market premium analysis
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-6">
            {[
              { num: 1, label: 'Environmental' },
              { num: 2, label: 'Social & Governance' },
              { num: 3, label: 'Market Impact' }
            ].map((step, index) => (
              <div key={step.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.num}
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">{step.label}</span>
                </div>
                {index < 2 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    currentStep > step.num ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* ESG Analysis Tabs */}
          <Tabs defaultValue="environmental" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="environmental" className="flex items-center">
                <Leaf className="w-4 h-4 mr-2" />
                Environmental
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Social & Governance
              </TabsTrigger>
              <TabsTrigger value="market" className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Market Impact
              </TabsTrigger>
              <TabsTrigger value="ratings" className="flex items-center">
                <Calculator className="w-4 h-4 mr-2" />
                Rating Calculator
              </TabsTrigger>
            </TabsList>

            {/* Environmental Tab */}
            <TabsContent value="environmental" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Leaf className="w-5 h-5 mr-2 text-green-600" />
                    Environmental Impact Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Document Upload Areas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                         onClick={() => document.getElementById('energyCertificate')?.click()}>
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium mb-1">Energy Certificate</p>
                      <p className="text-xs text-muted-foreground mb-4">Upload building energy rating certificate</p>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.png"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('energyCertificate', e.target.files[0])}
                        className="hidden"
                        id="energyCertificate"
                      />
                      <Button variant="outline" size="sm" type="button">
                        {documents.energyCertificate ? 'Change File' : 'Choose File'}
                      </Button>
                      {documents.energyCertificate && (
                        <p className="text-xs text-green-600 mt-2">✓ {documents.energyCertificate.name}</p>
                      )}
                    </div>

                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                         onClick={() => document.getElementById('environmentalReport')?.click()}>
                      <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium mb-1">Environmental Report</p>
                      <p className="text-xs text-muted-foreground mb-4">Upload environmental impact assessment</p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('environmentalReport', e.target.files[0])}
                        className="hidden"
                        id="environmentalReport"
                      />
                      <Button variant="outline" size="sm" type="button">
                        {documents.environmentalReport ? 'Change File' : 'Choose File'}
                      </Button>
                      {documents.environmentalReport && (
                        <p className="text-xs text-green-600 mt-2">✓ {documents.environmentalReport.name}</p>
                      )}
                    </div>
                  </div>

                  {/* Environmental Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="energyRating">Energy Rating</Label>
                      <Select onValueChange={(value) => handleInputChange('energyRating', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select energy rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6-star">6 Star</SelectItem>
                          <SelectItem value="5-star">5 Star</SelectItem>
                          <SelectItem value="4-star">4 Star</SelectItem>
                          <SelectItem value="3-star">3 Star</SelectItem>
                          <SelectItem value="2-star">2 Star</SelectItem>
                          <SelectItem value="1-star">1 Star</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="carbonFootprint">Carbon Footprint (tCO2e/year)</Label>
                      <Input
                        id="carbonFootprint"
                        value={esgData.carbonFootprint}
                        onChange={(e) => handleInputChange('carbonFootprint', e.target.value)}
                        placeholder="Enter annual carbon emissions"
                      />
                    </div>
                  </div>

                  {/* AI Analysis Progress */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-blue-600" />
                        AI Environmental Analysis
                      </h4>
                      <span className="text-sm text-blue-600">85% Complete</span>
                    </div>
                    <Progress value={85} className="w-full mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Analyzing energy efficiency, carbon impact, and environmental compliance...
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Social & Governance Tab */}
            <TabsContent value="social" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    Social & Governance Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="socialImpact">Social Impact Score</Label>
                      <Select onValueChange={(value) => handleInputChange('socialImpact', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select social impact level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent (9-10)</SelectItem>
                          <SelectItem value="good">Good (7-8)</SelectItem>
                          <SelectItem value="fair">Fair (5-6)</SelectItem>
                          <SelectItem value="poor">Poor (1-4)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="governanceScore">Governance Score</Label>
                      <Select onValueChange={(value) => handleInputChange('governanceScore', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select governance rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a-plus">A+ (Exceptional)</SelectItem>
                          <SelectItem value="a">A (Strong)</SelectItem>
                          <SelectItem value="b">B (Adequate)</SelectItem>
                          <SelectItem value="c">C (Needs Improvement)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* AI Analysis Progress */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Social Impact Analysis Complete
                      </h4>
                      <span className="text-sm text-green-600">100% Complete</span>
                    </div>
                    <Progress value={100} className="w-full mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Community impact, accessibility, and governance structures analyzed.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Market Impact Tab */}
            <TabsContent value="market" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                    ESG Market Premium Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-secondary/50 rounded-lg p-4 text-center">
                      <div className="text-sm font-medium text-muted-foreground mb-1">Sustainability Premium</div>
                      <div className="text-2xl font-bold text-green-600">+12.5%</div>
                      <div className="text-xs text-muted-foreground">Above market rate</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4 text-center">
                      <div className="text-sm font-medium text-muted-foreground mb-1">ESG Risk Discount</div>
                      <div className="text-2xl font-bold text-red-600">-3.2%</div>
                      <div className="text-xs text-muted-foreground">Risk adjustment</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4 text-center">
                      <div className="text-sm font-medium text-muted-foreground mb-1">Net ESG Impact</div>
                      <div className="text-2xl font-bold text-blue-600">+9.3%</div>
                      <div className="text-xs text-muted-foreground">Value adjustment</div>
                    </div>
                  </div>

                  {/* AI Recommendation */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Calculator className="h-4 w-4 mr-2 text-blue-600" />
                      AI Market Analysis
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Based on comparable sales and ESG metrics, this property demonstrates strong sustainability credentials 
                      that command a market premium. Key value drivers include energy efficiency, location accessibility, 
                      and governance compliance.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Detailed Analysis
                      </Button>
                      <Button size="sm" className="flex-1">
                        <FileText className="h-4 w-4 mr-2" />
                        Generate ESG Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Rating Calculator Tab */}
            <TabsContent value="ratings" className="space-y-6">
              <SustainabilityRatingCalculator />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}