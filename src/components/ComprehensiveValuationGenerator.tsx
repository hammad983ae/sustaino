import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Calculator, 
  TrendingUp, 
  Building2, 
  Zap, 
  Globe, 
  DollarSign,
  CheckCircle,
  Download,
  Eye,
  PlusCircle,
  Settings
} from 'lucide-react';

interface ValuationSection {
  id: string;
  name: string;
  completed: boolean;
  value?: number;
  status: 'pending' | 'in-progress' | 'completed';
}

export const ComprehensiveValuationGenerator = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [valuationSections, setValuationSections] = useState<ValuationSection[]>([
    { id: 'property', name: 'Property Valuation', completed: false, status: 'pending' },
    { id: 'advertising', name: 'Advertising Assets', completed: false, status: 'pending' },
    { id: 'digital', name: 'Digital Platform', completed: false, status: 'pending' },
    { id: 'esg', name: 'ESG Assessment', completed: false, status: 'pending' },
    { id: 'market', name: 'Market Analysis', completed: false, status: 'pending' },
    { id: 'financial', name: 'Financial Metrics', completed: false, status: 'pending' },
    { id: 'risk', name: 'Risk Assessment', completed: false, status: 'pending' },
  ]);

  const [propertyDetails, setPropertyDetails] = useState({
    address: '',
    propertyType: 'commercial',
    landArea: '',
    buildingArea: '',
    yearBuilt: '',
    zoning: '',
    currentUse: ''
  });

  const [advertisingAssets, setAdvertisingAssets] = useState({
    signageType: 'digital',
    screenSize: '',
    resolution: '4K',
    location: '',
    operatingHours: 18,
    adDuration: 10,
    contentSlots: 6,
    networkConnectivity: 'fiber',
    operatingCosts: 0,
    maintenanceCosts: 0,
    contentManagementFee: 0
  });

  const [valuationResults, setValuationResults] = useState({
    propertyValue: 0,
    advertisingValue: 0,
    digitalPlatformValue: 0,
    esgPremium: 0,
    totalValue: 0,
    confidence: 0
  });

  const generateComprehensiveValuation = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      // Simulate comprehensive valuation generation
      const steps = valuationSections.length;
      
      for (let i = 0; i < steps; i++) {
        const currentSection = valuationSections[i];
        
        // Update section status to in-progress
        setValuationSections(prev => prev.map(section => 
          section.id === currentSection.id 
            ? { ...section, status: 'in-progress' }
            : section
        ));

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Calculate section value based on type
        let sectionValue = 0;
        switch (currentSection.id) {
          case 'property':
            sectionValue = calculatePropertyValue();
            break;
          case 'advertising':
            sectionValue = calculateAdvertisingValue();
            break;
          case 'digital':
            sectionValue = calculateDigitalPlatformValue();
            break;
          case 'esg':
            sectionValue = calculateESGPremium();
            break;
          default:
            sectionValue = Math.random() * 100000;
        }

        // Update section as completed
        setValuationSections(prev => prev.map(section => 
          section.id === currentSection.id 
            ? { ...section, status: 'completed', completed: true, value: sectionValue }
            : section
        ));

        setGenerationProgress(((i + 1) / steps) * 100);
      }

      // Calculate final results
      const propertyValue = valuationSections.find(s => s.id === 'property')?.value || 0;
      const advertisingValue = valuationSections.find(s => s.id === 'advertising')?.value || 0;
      const digitalValue = valuationSections.find(s => s.id === 'digital')?.value || 0;
      const esgPremium = valuationSections.find(s => s.id === 'esg')?.value || 0;

      const totalValue = propertyValue + advertisingValue + digitalValue + esgPremium;

      setValuationResults({
        propertyValue,
        advertisingValue,
        digitalPlatformValue: digitalValue,
        esgPremium,
        totalValue,
        confidence: 92
      });

      toast({
        title: "Comprehensive Valuation Complete",
        description: `Total estimated value: $${totalValue.toLocaleString()}`,
      });

    } catch (error) {
      toast({
        title: "Generation Error",
        description: "Failed to generate comprehensive valuation",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const calculatePropertyValue = () => {
    const landArea = parseFloat(propertyDetails.landArea) || 0;
    const buildingArea = parseFloat(propertyDetails.buildingArea) || 0;
    return (landArea * 500) + (buildingArea * 3000); // Base calculation
  };

  const calculateAdvertisingValue = () => {
    const dailySlots = (advertisingAssets.operatingHours * 60) / advertisingAssets.adDuration;
    const monthlyRevenue = dailySlots * 30 * 50; // $50 per slot estimate
    const annualRevenue = monthlyRevenue * 12;
    return annualRevenue * 8; // 8x multiple for capitalization
  };

  const calculateDigitalPlatformValue = () => {
    const screenSizeValue = parseFloat(advertisingAssets.screenSize) || 55;
    const baseValue = screenSizeValue * 1000;
    const resolutionMultiplier = advertisingAssets.resolution === '4K' ? 1.5 : 1.0;
    return baseValue * resolutionMultiplier;
  };

  const calculateESGPremium = () => {
    return calculatePropertyValue() * 0.05; // 5% ESG premium
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      default:
        return <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Calculator className="h-6 w-6 text-blue-600" />
            Comprehensive Valuation Generator
            <Badge className="bg-blue-500 text-white">AI-Powered</Badge>
          </CardTitle>
          <p className="text-muted-foreground">
            Generate complete property valuations including advertising assets, digital platforms, and ESG assessments
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="setup" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="setup">Setup & Configuration</TabsTrigger>
          <TabsTrigger value="advertising">Advertising Assets</TabsTrigger>
          <TabsTrigger value="generation">Generate Valuation</TabsTrigger>
          <TabsTrigger value="results">Results & Export</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address">Property Address</Label>
                  <Input
                    id="address"
                    value={propertyDetails.address}
                    onChange={(e) => setPropertyDetails(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="123 Commercial Street, Melbourne VIC"
                  />
                </div>
                <div>
                  <Label htmlFor="propertyType">Property Type</Label>
                  <select
                    id="propertyType"
                    value={propertyDetails.propertyType}
                    onChange={(e) => setPropertyDetails(prev => ({ ...prev, propertyType: e.target.value }))}
                    className="w-full p-2 border border-input rounded-md"
                  >
                    <option value="commercial">Commercial</option>
                    <option value="retail">Retail</option>
                    <option value="office">Office</option>
                    <option value="industrial">Industrial</option>
                    <option value="mixed-use">Mixed Use</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="landArea">Land Area (sqm)</Label>
                  <Input
                    id="landArea"
                    type="number"
                    value={propertyDetails.landArea}
                    onChange={(e) => setPropertyDetails(prev => ({ ...prev, landArea: e.target.value }))}
                    placeholder="1000"
                  />
                </div>
                <div>
                  <Label htmlFor="buildingArea">Building Area (sqm)</Label>
                  <Input
                    id="buildingArea"
                    type="number"
                    value={propertyDetails.buildingArea}
                    onChange={(e) => setPropertyDetails(prev => ({ ...prev, buildingArea: e.target.value }))}
                    placeholder="500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advertising" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Digital Platform Advertising Valuation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Platform Specifications */}
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Platform Specifications
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="signageType">Platform Type</Label>
                      <select
                        id="signageType"
                        value={advertisingAssets.signageType}
                        onChange={(e) => setAdvertisingAssets(prev => ({ ...prev, signageType: e.target.value }))}
                        className="w-full p-2 border border-input rounded-md"
                      >
                        <option value="digital">Digital Display</option>
                        <option value="led">LED Screen</option>
                        <option value="billboard">Digital Billboard</option>
                        <option value="interactive">Interactive Kiosk</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="screenSize">Screen Size (inches)</Label>
                        <Input
                          id="screenSize"
                          type="number"
                          value={advertisingAssets.screenSize}
                          onChange={(e) => setAdvertisingAssets(prev => ({ ...prev, screenSize: e.target.value }))}
                          placeholder="55"
                        />
                      </div>
                      <div>
                        <Label htmlFor="resolution">Resolution</Label>
                        <select
                          id="resolution"
                          value={advertisingAssets.resolution}
                          onChange={(e) => setAdvertisingAssets(prev => ({ ...prev, resolution: e.target.value }))}
                          className="w-full p-2 border border-input rounded-md"
                        >
                          <option value="HD">HD (1080p)</option>
                          <option value="4K">4K (2160p)</option>
                          <option value="8K">8K (4320p)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location">Location Description</Label>
                      <Input
                        id="location"
                        value={advertisingAssets.location}
                        onChange={(e) => setAdvertisingAssets(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g., Shopping Mall - Food Court Level"
                      />
                    </div>
                  </div>
                </div>

                {/* Technical Infrastructure */}
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Technical Infrastructure
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="networkConnectivity">Network Connectivity</Label>
                      <select
                        id="networkConnectivity"
                        value={advertisingAssets.networkConnectivity}
                        onChange={(e) => setAdvertisingAssets(prev => ({ ...prev, networkConnectivity: e.target.value }))}
                        className="w-full p-2 border border-input rounded-md"
                      >
                        <option value="fiber">Fiber Optic</option>
                        <option value="ethernet">Ethernet</option>
                        <option value="wifi">WiFi</option>
                        <option value="5g">5G Cellular</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="operatingCosts">Operating Costs ($)</Label>
                        <Input
                          id="operatingCosts"
                          type="number"
                          value={advertisingAssets.operatingCosts}
                          onChange={(e) => setAdvertisingAssets(prev => ({ ...prev, operatingCosts: Number(e.target.value) }))}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="maintenanceCosts">Maintenance Costs ($)</Label>
                        <Input
                          id="maintenanceCosts"
                          type="number"
                          value={advertisingAssets.maintenanceCosts}
                          onChange={(e) => setAdvertisingAssets(prev => ({ ...prev, maintenanceCosts: Number(e.target.value) }))}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="contentManagementFee">Content Management Fee ($)</Label>
                      <Input
                        id="contentManagementFee"
                        type="number"
                        value={advertisingAssets.contentManagementFee}
                        onChange={(e) => setAdvertisingAssets(prev => ({ ...prev, contentManagementFee: Number(e.target.value) }))}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Operating Metrics */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <h5 className="font-semibold text-green-800 mb-3">Operating Metrics</h5>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {((advertisingAssets.operatingHours * 60) / advertisingAssets.adDuration).toFixed(0)}
                    </p>
                    <p className="text-sm text-green-700">Daily Ad Slots Available</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      ${(advertisingAssets.operatingCosts + advertisingAssets.maintenanceCosts + advertisingAssets.contentManagementFee)}
                    </p>
                    <p className="text-sm text-green-700">Monthly Operating Costs</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{advertisingAssets.operatingHours}h</p>
                    <p className="text-sm text-green-700">Daily Operating Hours</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Valuation Generation Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Overview */}
              {isGenerating && (
                <div className="text-center py-4">
                  <Progress value={generationProgress} className="w-full max-w-md mx-auto mb-4" />
                  <p className="text-lg font-semibold">Generating Comprehensive Valuation...</p>
                  <p className="text-muted-foreground">{generationProgress.toFixed(0)}% Complete</p>
                </div>
              )}

              {/* Valuation Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {valuationSections.map((section) => (
                  <Card key={section.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(section.status)}
                        <div>
                          <p className="font-medium">{section.name}</p>
                          {section.value && (
                            <p className="text-sm text-muted-foreground">
                              {formatCurrency(section.value)}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge 
                        variant={section.completed ? "default" : "secondary"}
                        className={section.status === 'in-progress' ? 'animate-pulse' : ''}
                      >
                        {section.status}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Generate Button */}
              <div className="text-center">
                <Button
                  onClick={generateComprehensiveValuation}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="h-5 w-5 mr-2" />
                      Generate Comprehensive Valuation
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {valuationResults.totalValue > 0 ? (
            <>
              {/* Summary Results */}
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <TrendingUp className="h-6 w-6" />
                    Comprehensive Valuation Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                      <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-800">
                        {formatCurrency(valuationResults.propertyValue)}
                      </p>
                      <p className="text-sm text-green-600">Property Value</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                      <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-800">
                        {formatCurrency(valuationResults.advertisingValue)}
                      </p>
                      <p className="text-sm text-blue-600">Advertising Assets</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                      <Globe className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-800">
                        {formatCurrency(valuationResults.digitalPlatformValue)}
                      </p>
                      <p className="text-sm text-purple-600">Digital Platform</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                      <CheckCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-orange-800">
                        {formatCurrency(valuationResults.esgPremium)}
                      </p>
                      <p className="text-sm text-orange-600">ESG Premium</p>
                    </div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg">
                    <h3 className="text-3xl font-bold mb-2">
                      {formatCurrency(valuationResults.totalValue)}
                    </h3>
                    <p className="text-lg">Total Estimated Value</p>
                    <p className="text-sm opacity-90 mt-2">
                      Confidence Level: {valuationResults.confidence}%
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Export Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Export & Download</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 flex-wrap">
                    <Button className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF Report
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Preview Report
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Export to Excel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No Valuation Generated Yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Complete the setup and generate a comprehensive valuation to see results here.
                </p>
                <Button onClick={() => (document.querySelector('[value="generation"]') as HTMLElement)?.click()}>
                  Go to Generation Tab
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComprehensiveValuationGenerator;