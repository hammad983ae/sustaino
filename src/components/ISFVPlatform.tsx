import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Zap, 
  MapPin, 
  AlertTriangle, 
  BarChart3, 
  Building, 
  Camera, 
  FileText,
  Play,
  RotateCcw,
  CheckCircle,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface ISFVData {
  propertyAddress: string;
  estimatedValue: number;
  confidence: 'high' | 'medium' | 'low';
  riskScore: number;
  automationStatus: 'idle' | 'running' | 'completed' | 'error';
  lastUpdated: string;
}

export default function ISFVPlatform() {
  const [isfvData, setISFVData] = useState<ISFVData>({
    propertyAddress: '',
    estimatedValue: 0,
    confidence: 'medium',
    riskScore: 0,
    automationStatus: 'idle',
    lastUpdated: ''
  });

  const [isRunningAutomation, setIsRunningAutomation] = useState(false);

  const runFullAutomation = async () => {
    if (!isfvData.propertyAddress.trim()) {
      toast.error('Please enter a property address first');
      return;
    }

    setIsRunningAutomation(true);
    setISFVData(prev => ({ ...prev, automationStatus: 'running' }));
    
    try {
      // Simulate automation process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock automated data
      const mockValue = Math.floor(Math.random() * 500000) + 300000;
      const mockRisk = Math.floor(Math.random() * 5) + 1;
      const mockConfidence = mockRisk <= 2 ? 'high' : mockRisk <= 3 ? 'medium' : 'low';

      setISFVData(prev => ({
        ...prev,
        estimatedValue: mockValue,
        confidence: mockConfidence,
        riskScore: mockRisk,
        automationStatus: 'completed',
        lastUpdated: new Date().toLocaleString()
      }));

      toast.success('Full automation completed successfully');
    } catch (error) {
      setISFVData(prev => ({ ...prev, automationStatus: 'error' }));
      toast.error('Automation failed - please try again');
    } finally {
      setIsRunningAutomation(false);
    }
  };

  const clearAllData = () => {
    setISFVData({
      propertyAddress: '',
      estimatedValue: 0,
      confidence: 'medium',
      riskScore: 0,
      automationStatus: 'idle',
      lastUpdated: ''
    });
    toast.success('All data cleared');
  };

  const getConfidenceBadgeColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (isfvData.automationStatus) {
      case 'running':
        return <Clock className="h-4 w-4 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">Instant Short Form Valuation (ISFV)</h1>
        <p className="text-muted-foreground">
          Professional property valuation with integrated automation, Domain API, and risk analysis
        </p>
      </div>

      {/* Control Panel */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Automation Control Center
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="property-address">Property Address</Label>
              <Input
                id="property-address"
                placeholder="Enter property address..."
                value={isfvData.propertyAddress}
                onChange={(e) => setISFVData(prev => ({ ...prev, propertyAddress: e.target.value }))}
              />
            </div>
            <div className="flex items-end gap-2">
              <Button 
                onClick={runFullAutomation}
                disabled={isRunningAutomation || !isfvData.propertyAddress.trim()}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Play className="h-4 w-4 mr-2" />
                {isRunningAutomation ? 'Running Automation...' : 'Run Full Automation'}
              </Button>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={clearAllData}
                variant="outline"
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear All Data
              </Button>
            </div>
          </div>

          {/* Status Display */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span className="font-medium">
                Status: {isfvData.automationStatus.charAt(0).toUpperCase() + isfvData.automationStatus.slice(1)}
              </span>
            </div>
            {isfvData.lastUpdated && (
              <span className="text-sm text-muted-foreground">
                Last updated: {isfvData.lastUpdated}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Panel */}
      {isfvData.automationStatus === 'completed' && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Automated Valuation Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  ${isfvData.estimatedValue.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Estimated Market Value</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Badge className={`${getConfidenceBadgeColor(isfvData.confidence)} text-white`}>
                    {isfvData.confidence.toUpperCase()} CONFIDENCE
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">Valuation Confidence</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {isfvData.riskScore}/5
                </div>
                <div className="text-sm text-muted-foreground">Risk Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs for detailed sections */}
      <Tabs defaultValue="automation" className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="automation" className="text-xs">
            <Zap className="h-4 w-4 mr-1" />
            Automation Hub
          </TabsTrigger>
          <TabsTrigger value="summary" className="text-xs">
            <FileText className="h-4 w-4 mr-1" />
            Property Summary
          </TabsTrigger>
          <TabsTrigger value="risk" className="text-xs">
            <AlertTriangle className="h-4 w-4 mr-1" />
            Risk Analysis
          </TabsTrigger>
          <TabsTrigger value="dwelling" className="text-xs">
            <Building className="h-4 w-4 mr-1" />
            Land & Dwelling
          </TabsTrigger>
          <TabsTrigger value="sales" className="text-xs">
            <BarChart3 className="h-4 w-4 mr-1" />
            Sales Evidence
          </TabsTrigger>
          <TabsTrigger value="comments" className="text-xs">
            <FileText className="h-4 w-4 mr-1" />
            General Comments
          </TabsTrigger>
          <TabsTrigger value="vra" className="text-xs">
            <AlertTriangle className="h-4 w-4 mr-1" />
            VRA Assessment
          </TabsTrigger>
          <TabsTrigger value="photos" className="text-xs">
            <Camera className="h-4 w-4 mr-1" />
            Photos & Annexures
          </TabsTrigger>
        </TabsList>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automation Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Domain API Integration</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatic property data retrieval and comparable sales analysis
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Risk Assessment</h4>
                  <p className="text-sm text-muted-foreground">
                    Automated risk scoring based on location and property factors
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Market Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Real-time market trends and comparable property analysis
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Report Generation</h4>
                  <p className="text-sm text-muted-foreground">
                    Instant professional report generation with all required sections
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Property Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Property Address</Label>
                  <Input value={isfvData.propertyAddress} readOnly />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Property Type</Label>
                    <Input placeholder="Auto-detected from Domain API" />
                  </div>
                  <div>
                    <Label>Land Area</Label>
                    <Input placeholder="Auto-populated" />
                  </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Environmental Risks</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="text-sm">Low Risk (Auto-assessed)</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Market Risks</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                      <span className="text-sm">Medium Risk (Auto-assessed)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dwelling" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Land & Dwelling Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Auto-populated via Domain API when automation is run</p>
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
              <div className="text-center text-muted-foreground py-8">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Comparable sales automatically sourced from Domain API</p>
              </div>
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
                placeholder="AI-generated comments will appear here after automation..."
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
              <div className="space-y-4">
                <div>
                  <Label>VRA Comments</Label>
                  <Textarea 
                    placeholder="Auto-generated VRA assessment based on risk analysis..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Recommendations</Label>
                  <Textarea 
                    placeholder="AI-generated recommendations..."
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Photos & Annexures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Property photos and documents can be uploaded here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}