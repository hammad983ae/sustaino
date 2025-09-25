import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useReportData } from '@/contexts/ReportDataContext';
import { useStepVisibility } from '@/contexts/PAFConfigContext';
import { 
  Home, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Users, 
  Target,
  MapPin,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

interface SalesRecommendation {
  strategy: string;
  estimatedValue: number;
  timeframe: string;
  marketingApproach: string[];
  targetBuyers: string[];
  riskFactors: string[];
  confidence: number;
}

interface LeasingRecommendation {
  rentalRange: { min: number; max: number };
  optimalRent: number;
  timeframe: string;
  targetTenants: string[];
  marketingChannels: string[];
  leasingStrategy: string;
  confidence: number;
}

interface RecommendationData {
  sales?: SalesRecommendation;
  leasing?: LeasingRecommendation;
  marketConditions?: {
    trend: string;
    demandLevel: string;
    inventory: string;
    priceGrowth: number;
  };
  preference?: 'sales' | 'leasing' | 'both';
  notes?: string;
}

const SalesLeasingRecommendations: React.FC = () => {
  const { shouldRender } = useStepVisibility('sales_leasing');
  const { updateReportData, reportData } = useReportData();
  const { toast } = useToast();
  
  const [recommendationData, setRecommendationData] = useState<RecommendationData>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [customInputs, setCustomInputs] = useState({
    targetPrice: '',
    targetRent: '',
    timeline: '',
    notes: ''
  });

  useEffect(() => {
    if (reportData?.salesLeasingRecommendations) {
      setRecommendationData(reportData.salesLeasingRecommendations);
    }
  }, [reportData]);

  if (!shouldRender) return null;

  const generateRecommendations = async () => {
    setIsGenerating(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockSalesRec: SalesRecommendation = {
        strategy: 'Premium Marketing Strategy',
        estimatedValue: 750000,
        timeframe: '60-90 days',
        marketingApproach: ['Professional Photography', 'Online Marketing', 'Open Houses', 'Private Inspections'],
        targetBuyers: ['First Home Buyers', 'Investors', 'Downsizers'],
        riskFactors: ['Market Volatility', 'Interest Rate Changes'],
        confidence: 85
      };

      const mockLeasingRec: LeasingRecommendation = {
        rentalRange: { min: 450, max: 520 },
        optimalRent: 485,
        timeframe: '14-21 days',
        targetTenants: ['Young Professionals', 'Small Families'],
        marketingChannels: ['Domain', 'REA', 'Social Media'],
        leasingStrategy: 'Competitive Pricing with Quality Presentation',
        confidence: 90
      };

      const mockMarketConditions = {
        trend: 'Stable Growth',
        demandLevel: 'High',
        inventory: 'Limited',
        priceGrowth: 3.2
      };

      const updates: RecommendationData = {
        ...recommendationData,
        sales: mockSalesRec,
        leasing: mockLeasingRec,
        marketConditions: mockMarketConditions
      };

      setRecommendationData(updates);
      updateReportData('salesLeasingRecommendations', updates);
      setIsGenerating(false);
      
      toast({
        title: "Recommendations Generated",
        description: "Sales and leasing recommendations have been generated based on current market data",
      });
    }, 3000);
  };

  const handlePreferenceChange = (preference: 'sales' | 'leasing' | 'both') => {
    const updates = { ...recommendationData, preference };
    setRecommendationData(updates);
    updateReportData('salesLeasingRecommendations', updates);
  };

  const saveCustomInputs = () => {
    const updates = { 
      ...recommendationData, 
      customInputs: customInputs,
      notes: customInputs.notes 
    };
    setRecommendationData(updates);
    updateReportData('salesLeasingRecommendations', updates);
    
    toast({
      title: "Custom Data Saved",
      description: "Your custom inputs have been saved",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Sales & Leasing Recommendations
          </CardTitle>
          <CardDescription>
            AI-powered recommendations for optimal sales and leasing strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Strategy Preference */}
            <div className="flex flex-wrap gap-2">
              <Label className="text-sm font-medium">Preferred Strategy:</Label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={recommendationData.preference === 'sales' ? 'default' : 'outline'}
                  onClick={() => handlePreferenceChange('sales')}
                >
                  Sales Focus
                </Button>
                <Button
                  size="sm"
                  variant={recommendationData.preference === 'leasing' ? 'default' : 'outline'}
                  onClick={() => handlePreferenceChange('leasing')}
                >
                  Leasing Focus
                </Button>
                <Button
                  size="sm"
                  variant={recommendationData.preference === 'both' ? 'default' : 'outline'}
                  onClick={() => handlePreferenceChange('both')}
                >
                  Both Options
                </Button>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center">
              <Button 
                onClick={generateRecommendations}
                disabled={isGenerating}
                className="w-full md:w-auto"
              >
                {isGenerating ? (
                  <>
                    <BarChart3 className="h-4 w-4 mr-2 animate-pulse" />
                    Analyzing Market Data...
                  </>
                ) : (
                  <>
                    <Target className="h-4 w-4 mr-2" />
                    Generate Recommendations
                  </>
                )}
              </Button>
            </div>

            {/* Results */}
            {(recommendationData.sales || recommendationData.leasing) && (
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="sales">Sales Strategy</TabsTrigger>
                  <TabsTrigger value="leasing">Leasing Strategy</TabsTrigger>
                  <TabsTrigger value="custom">Custom Input</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  {recommendationData.marketConditions && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Market Conditions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">
                              {recommendationData.marketConditions.trend}
                            </div>
                            <div className="text-sm text-muted-foreground">Market Trend</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">
                              {recommendationData.marketConditions.demandLevel}
                            </div>
                            <div className="text-sm text-muted-foreground">Demand Level</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">
                              {recommendationData.marketConditions.inventory}
                            </div>
                            <div className="text-sm text-muted-foreground">Inventory</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">
                              {recommendationData.marketConditions.priceGrowth}%
                            </div>
                            <div className="text-sm text-muted-foreground">Price Growth</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendationData.sales && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Sales Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Estimated Value</span>
                            <span className="font-medium">${recommendationData.sales.estimatedValue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Timeframe</span>
                            <span className="font-medium">{recommendationData.sales.timeframe}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Confidence</span>
                            <Badge variant="default">{recommendationData.sales.confidence}%</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {recommendationData.leasing && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Home className="h-4 w-4" />
                            Leasing Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Optimal Rent</span>
                            <span className="font-medium">${recommendationData.leasing.optimalRent}/week</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Range</span>
                            <span className="font-medium">
                              ${recommendationData.leasing.rentalRange.min}-${recommendationData.leasing.rentalRange.max}/week
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Confidence</span>
                            <Badge variant="default">{recommendationData.leasing.confidence}%</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="sales" className="space-y-4">
                  {recommendationData.sales && (
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Sales Strategy Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Recommended Strategy</Label>
                            <p className="text-sm text-muted-foreground mt-1">{recommendationData.sales.strategy}</p>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium">Marketing Approach</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {recommendationData.sales.marketingApproach.map((approach, index) => (
                                <Badge key={index} variant="outline">{approach}</Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Target Buyers</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {recommendationData.sales.targetBuyers.map((buyer, index) => (
                                <Badge key={index} variant="secondary">{buyer}</Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Risk Factors</Label>
                            <div className="space-y-1 mt-1">
                              {recommendationData.sales.riskFactors.map((risk, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                  <AlertTriangle className="h-3 w-3 text-orange-500" />
                                  {risk}
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="leasing" className="space-y-4">
                  {recommendationData.leasing && (
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Leasing Strategy Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Leasing Strategy</Label>
                            <p className="text-sm text-muted-foreground mt-1">{recommendationData.leasing.leasingStrategy}</p>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium">Marketing Channels</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {recommendationData.leasing.marketingChannels.map((channel, index) => (
                                <Badge key={index} variant="outline">{channel}</Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Target Tenants</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {recommendationData.leasing.targetTenants.map((tenant, index) => (
                                <Badge key={index} variant="secondary">{tenant}</Badge>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">Rental Range</Label>
                              <p className="text-lg font-bold">
                                ${recommendationData.leasing.rentalRange.min} - ${recommendationData.leasing.rentalRange.max}
                              </p>
                              <p className="text-xs text-muted-foreground">per week</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Expected Timeframe</Label>
                              <p className="text-lg font-bold">{recommendationData.leasing.timeframe}</p>
                              <p className="text-xs text-muted-foreground">to lease</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="custom" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Custom Inputs</CardTitle>
                      <CardDescription>
                        Override or supplement AI recommendations with your own data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="targetPrice">Target Sale Price ($)</Label>
                            <Input
                              id="targetPrice"
                              type="number"
                              value={customInputs.targetPrice}
                              onChange={(e) => setCustomInputs(prev => ({ ...prev, targetPrice: e.target.value }))}
                              placeholder="Enter target price"
                            />
                          </div>
                          <div>
                            <Label htmlFor="targetRent">Target Weekly Rent ($)</Label>
                            <Input
                              id="targetRent"
                              type="number"
                              value={customInputs.targetRent}
                              onChange={(e) => setCustomInputs(prev => ({ ...prev, targetRent: e.target.value }))}
                              placeholder="Enter target rent"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="timeline">Preferred Timeline</Label>
                            <Select value={customInputs.timeline} onValueChange={(value) => setCustomInputs(prev => ({ ...prev, timeline: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="immediate">Immediate (0-30 days)</SelectItem>
                                <SelectItem value="short">Short-term (1-3 months)</SelectItem>
                                <SelectItem value="medium">Medium-term (3-6 months)</SelectItem>
                                <SelectItem value="long">Long-term (6+ months)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="customNotes">Additional Notes</Label>
                            <Textarea
                              id="customNotes"
                              value={customInputs.notes}
                              onChange={(e) => setCustomInputs(prev => ({ ...prev, notes: e.target.value }))}
                              placeholder="Any specific requirements or preferences"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button onClick={saveCustomInputs} className="w-full md:w-auto">
                          Save Custom Inputs
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesLeasingRecommendations;