import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone, TrendingUp, Users, Eye, Clock, Globe } from "lucide-react";
import { calculateDigitalPlatformValue } from "@/lib/advertising-valuation-calculations";

interface DigitalPlatformData {
  // Platform Details
  platformType: string;
  screenSize: number;
  resolution: string;
  location: string;
  
  // Audience Metrics
  dailyImpressions: number;
  uniqueViewers: number;
  demographics: string;
  avgViewTime: number;
  
  // Technical Specs
  playoutDuration: number;
  contentSlots: number;
  operatingHours: number;
  networkConnectivity: string;
  
  // Financial
  adSlotPrice: number;
  occupancyRate: number;
  operatingCosts: number;
  maintenanceCosts: number;
  contentManagementFee: number;
  
  // Commercial Terms
  contractType: string;
  contractLength: number;
  revenueSplit: number;
  minimumSpend: number;
  
  // Performance
  clickThroughRate: number;
  conversionRate: number;
  brandRecall: number;
  competitorAnalysis: string;
}

export default function DigitalPlatformValuation() {
  const [platformData, setPlatformData] = useState<DigitalPlatformData>({
    platformType: "",
    screenSize: 0,
    resolution: "",
    location: "",
    dailyImpressions: 0,
    uniqueViewers: 0,
    demographics: "",
    avgViewTime: 0,
    playoutDuration: 10,
    contentSlots: 6,
    operatingHours: 18,
    networkConnectivity: "",
    adSlotPrice: 0,
    occupancyRate: 85,
    operatingCosts: 0,
    maintenanceCosts: 0,
    contentManagementFee: 0,
    contractType: "",
    contractLength: 0,
    revenueSplit: 70,
    minimumSpend: 0,
    clickThroughRate: 0,
    conversionRate: 0,
    brandRecall: 0,
    competitorAnalysis: ""
  });

  const [valuation, setValuation] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof DigitalPlatformData, value: any) => {
    setPlatformData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateValuation = async () => {
    setIsCalculating(true);
    try {
      const result = calculateDigitalPlatformValue(platformData);
      setValuation(result);
    } catch (error) {
      console.error('Error calculating digital platform valuation:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    if (platformData.adSlotPrice > 0 && platformData.dailyImpressions > 0) {
      const timer = setTimeout(() => {
        calculateValuation();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [platformData]);

  const dailySlotsAvailable = (platformData.operatingHours * 60) / platformData.playoutDuration;
  const monthlyImpressions = platformData.dailyImpressions * 30;
  const cpm = platformData.dailyImpressions > 0 ? (platformData.adSlotPrice / (platformData.dailyImpressions / 1000)) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Monitor className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Digital Platform Advertising Valuation</h2>
      </div>

      <Tabs defaultValue="platform" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="platform">Platform</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="commercial">Commercial</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="platform" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Platform Specifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Platform Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="platformType">Platform Type</Label>
                  <Select value={platformData.platformType} onValueChange={(value) => handleInputChange('platformType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="outdoor-led">Outdoor LED Display</SelectItem>
                      <SelectItem value="indoor-screen">Indoor Digital Screen</SelectItem>
                      <SelectItem value="transit-display">Transit Display</SelectItem>
                      <SelectItem value="retail-kiosk">Retail Kiosk</SelectItem>
                      <SelectItem value="mobile-truck">Mobile Advertising Truck</SelectItem>
                      <SelectItem value="interactive-panel">Interactive Panel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="screenSize">Screen Size (inches)</Label>
                    <Input
                      id="screenSize"
                      type="number"
                      value={platformData.screenSize}
                      onChange={(e) => handleInputChange('screenSize', parseFloat(e.target.value) || 0)}
                      placeholder="75"
                    />
                  </div>
                  <div>
                    <Label htmlFor="resolution">Resolution</Label>
                    <Select value={platformData.resolution} onValueChange={(value) => handleInputChange('resolution', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Resolution" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4k">4K (3840x2160)</SelectItem>
                        <SelectItem value="1080p">1080p (1920x1080)</SelectItem>
                        <SelectItem value="720p">720p (1280x720)</SelectItem>
                        <SelectItem value="custom">Custom Resolution</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location Description</Label>
                  <Input
                    id="location"
                    value={platformData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., Shopping Mall - Food Court Level"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="operatingHours">Operating Hours/Day</Label>
                    <Input
                      id="operatingHours"
                      type="number"
                      value={platformData.operatingHours}
                      onChange={(e) => handleInputChange('operatingHours', parseInt(e.target.value) || 18)}
                      placeholder="18"
                    />
                  </div>
                  <div>
                    <Label htmlFor="playoutDuration">Ad Duration (seconds)</Label>
                    <Input
                      id="playoutDuration"
                      type="number"
                      value={platformData.playoutDuration}
                      onChange={(e) => handleInputChange('playoutDuration', parseInt(e.target.value) || 10)}
                      placeholder="10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contentSlots">Content Slots/Loop</Label>
                    <Input
                      id="contentSlots"
                      type="number"
                      value={platformData.contentSlots}
                      onChange={(e) => handleInputChange('contentSlots', parseInt(e.target.value) || 6)}
                      placeholder="6"
                    />
                  </div>
                </div>

                {dailySlotsAvailable > 0 && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm font-medium">
                      Daily Ad Slots Available: <span className="text-primary">{dailySlotsAvailable.toFixed(0)}</span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Technical Infrastructure */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Technical Infrastructure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="networkConnectivity">Network Connectivity</Label>
                  <Select value={platformData.networkConnectivity} onValueChange={(value) => handleInputChange('networkConnectivity', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select connectivity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fiber">Fiber Optic</SelectItem>
                      <SelectItem value="5g">5G Cellular</SelectItem>
                      <SelectItem value="4g">4G/LTE</SelectItem>
                      <SelectItem value="wifi">WiFi</SelectItem>
                      <SelectItem value="satellite">Satellite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="operatingCosts">Operating Costs ($)</Label>
                    <Input
                      id="operatingCosts"
                      type="number"
                      value={platformData.operatingCosts}
                      onChange={(e) => handleInputChange('operatingCosts', parseInt(e.target.value) || 0)}
                      placeholder="5000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maintenanceCosts">Maintenance Costs ($)</Label>
                    <Input
                      id="maintenanceCosts"
                      type="number"
                      value={platformData.maintenanceCosts}
                      onChange={(e) => handleInputChange('maintenanceCosts', parseInt(e.target.value) || 0)}
                      placeholder="2000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contentManagementFee">Content Management Fee ($)</Label>
                  <Input
                    id="contentManagementFee"
                    type="number"
                    value={platformData.contentManagementFee}
                    onChange={(e) => handleInputChange('contentManagementFee', parseInt(e.target.value) || 0)}
                    placeholder="1500"
                  />
                </div>

                <div className="bg-primary/5 p-3 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Monthly Operating Costs</h4>
                  <p className="text-lg font-bold text-primary">
                    ${(platformData.operatingCosts + platformData.maintenanceCosts + platformData.contentManagementFee).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Audience Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Audience Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dailyImpressions">Daily Impressions</Label>
                    <Input
                      id="dailyImpressions"
                      type="number"
                      value={platformData.dailyImpressions}
                      onChange={(e) => handleInputChange('dailyImpressions', parseInt(e.target.value) || 0)}
                      placeholder="25000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="uniqueViewers">Unique Daily Viewers</Label>
                    <Input
                      id="uniqueViewers"
                      type="number"
                      value={platformData.uniqueViewers}
                      onChange={(e) => handleInputChange('uniqueViewers', parseInt(e.target.value) || 0)}
                      placeholder="15000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="demographics">Target Demographics</Label>
                  <Select value={platformData.demographics} onValueChange={(value) => handleInputChange('demographics', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select demographics" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="millennial-affluent">Millennials (Affluent)</SelectItem>
                      <SelectItem value="gen-z-urban">Gen Z (Urban)</SelectItem>
                      <SelectItem value="families-suburban">Families (Suburban)</SelectItem>
                      <SelectItem value="professionals-cbd">Professionals (CBD)</SelectItem>
                      <SelectItem value="tourists-entertainment">Tourists (Entertainment)</SelectItem>
                      <SelectItem value="mixed-demographic">Mixed Demographics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="avgViewTime">Average View Time (seconds)</Label>
                  <Input
                    id="avgViewTime"
                    type="number"
                    value={platformData.avgViewTime}
                    onChange={(e) => handleInputChange('avgViewTime', parseFloat(e.target.value) || 0)}
                    placeholder="8.5"
                  />
                </div>

                {monthlyImpressions > 0 && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm font-medium">
                      Monthly Impressions: <span className="text-primary">{monthlyImpressions.toLocaleString()}</span>
                    </p>
                    {cpm > 0 && (
                      <p className="text-sm font-medium">
                        Current CPM: <span className="text-primary">${cpm.toFixed(2)}</span>
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="clickThroughRate">Click-Through Rate (%)</Label>
                    <Input
                      id="clickThroughRate"
                      type="number"
                      step="0.01"
                      value={platformData.clickThroughRate}
                      onChange={(e) => handleInputChange('clickThroughRate', parseFloat(e.target.value) || 0)}
                      placeholder="0.15"
                    />
                  </div>
                  <div>
                    <Label htmlFor="conversionRate">Conversion Rate (%)</Label>
                    <Input
                      id="conversionRate"
                      type="number"
                      step="0.01"
                      value={platformData.conversionRate}
                      onChange={(e) => handleInputChange('conversionRate', parseFloat(e.target.value) || 0)}
                      placeholder="2.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="brandRecall">Brand Recall Score (%)</Label>
                  <Input
                    id="brandRecall"
                    type="number"
                    value={platformData.brandRecall}
                    onChange={(e) => handleInputChange('brandRecall', parseInt(e.target.value) || 0)}
                    placeholder="35"
                  />
                </div>

                <div>
                  <Label htmlFor="occupancyRate">Ad Inventory Occupancy (%)</Label>
                  <Input
                    id="occupancyRate"
                    type="number"
                    value={platformData.occupancyRate}
                    onChange={(e) => handleInputChange('occupancyRate', parseInt(e.target.value) || 85)}
                    placeholder="85"
                  />
                </div>

                <div>
                  <Label htmlFor="competitorAnalysis">Competitive Position</Label>
                  <Select value={platformData.competitorAnalysis} onValueChange={(value) => handleInputChange('competitorAnalysis', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market-leader">Market Leader</SelectItem>
                      <SelectItem value="strong-competitor">Strong Competitor</SelectItem>
                      <SelectItem value="average-performer">Average Performer</SelectItem>
                      <SelectItem value="emerging-player">Emerging Player</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="commercial" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Commercial Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Commercial Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="adSlotPrice">Ad Slot Price ($ per slot)</Label>
                  <Input
                    id="adSlotPrice"
                    type="number"
                    value={platformData.adSlotPrice}
                    onChange={(e) => handleInputChange('adSlotPrice', parseInt(e.target.value) || 0)}
                    placeholder="50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contractType">Contract Type</Label>
                    <Select value={platformData.contractType} onValueChange={(value) => handleInputChange('contractType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select contract" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="revenue-share">Revenue Share</SelectItem>
                        <SelectItem value="fixed-rental">Fixed Rental</SelectItem>
                        <SelectItem value="hybrid">Hybrid Model</SelectItem>
                        <SelectItem value="management">Management Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="contractLength">Contract Length (years)</Label>
                    <Input
                      id="contractLength"
                      type="number"
                      value={platformData.contractLength}
                      onChange={(e) => handleInputChange('contractLength', parseInt(e.target.value) || 0)}
                      placeholder="5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="revenueSplit">Revenue Split (%)</Label>
                    <Input
                      id="revenueSplit"
                      type="number"
                      value={platformData.revenueSplit}
                      onChange={(e) => handleInputChange('revenueSplit', parseInt(e.target.value) || 70)}
                      placeholder="70"
                    />
                  </div>
                  <div>
                    <Label htmlFor="minimumSpend">Minimum Annual Spend ($)</Label>
                    <Input
                      id="minimumSpend"
                      type="number"
                      value={platformData.minimumSpend}
                      onChange={(e) => handleInputChange('minimumSpend', parseInt(e.target.value) || 0)}
                      placeholder="50000"
                    />
                  </div>
                </div>

                <div className="bg-primary/5 p-3 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Projected Annual Revenue</h4>
                  <p className="text-lg font-bold text-primary">
                    ${(platformData.adSlotPrice * dailySlotsAvailable * 365 * (platformData.occupancyRate / 100)).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Investment Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Investment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Gross Annual Revenue</span>
                    <span className="font-medium">
                      ${(platformData.adSlotPrice * dailySlotsAvailable * 365 * (platformData.occupancyRate / 100)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-destructive">
                    <span>Annual Operating Costs</span>
                    <span>
                      -${((platformData.operatingCosts + platformData.maintenanceCosts + platformData.contentManagementFee) * 12).toLocaleString()}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Net Annual Income</span>
                    <span className="text-primary">
                      ${(
                        platformData.adSlotPrice * dailySlotsAvailable * 365 * (platformData.occupancyRate / 100) -
                        ((platformData.operatingCosts + platformData.maintenanceCosts + platformData.contentManagementFee) * 12)
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Revenue Split (Owner)</span>
                    <span>{platformData.revenueSplit}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Revenue Split (Operator)</span>
                    <span>{100 - platformData.revenueSplit}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {valuation ? (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Valuation Summary */}
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Platform Valuation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      ${valuation.platformValue.toLocaleString()}
                    </div>
                    <p className="text-muted-foreground">Estimated Platform Value</p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-semibold">
                        ${valuation.annualRevenue.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">Annual Revenue</p>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-semibold">
                        {valuation.roi.toFixed(1)}%
                      </div>
                      <p className="text-sm text-muted-foreground">ROI</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold">
                        ${valuation.cpmRate.toFixed(2)}
                      </div>
                      <p className="text-sm text-muted-foreground">CPM Rate</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold">
                        {valuation.paybackPeriod.toFixed(1)} yrs
                      </div>
                      <p className="text-sm text-muted-foreground">Payback Period</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Audience Quality Score</span>
                    <Badge variant={valuation.audienceQuality > 80 ? 'default' : valuation.audienceQuality > 60 ? 'secondary' : 'destructive'}>
                      {valuation.audienceQuality}/100
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Technical Infrastructure</span>
                    <Badge variant={valuation.techScore > 80 ? 'default' : 'secondary'}>
                      {valuation.techScore}/100
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Position</span>
                    <span className="capitalize">{valuation.marketPosition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth Potential</span>
                    <span className={valuation.growthPotential > 0 ? "text-primary" : ""}>
                      {valuation.growthPotential > 0 ? '+' : ''}{valuation.growthPotential}%
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Key Metrics</h4>
                    <div className="flex justify-between text-sm">
                      <span>Daily Revenue Potential</span>
                      <span>${valuation.dailyRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Revenue per Impression</span>
                      <span>${valuation.revenuePerImpression.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Operational Efficiency</span>
                      <span>{valuation.operationalEfficiency}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Base Revenue</span>
                    <span>${valuation.baseRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-primary">
                    <span>Premium Adjustments</span>
                    <span>+${valuation.premiumAdjustments.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-destructive">
                    <span>Risk Adjustments</span>
                    <span>-${valuation.riskAdjustments.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Adjusted Revenue</span>
                    <span className="text-primary">${valuation.adjustedRevenue.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Investment Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Investment Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {valuation.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Monitor className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">
                  Complete platform details to generate comprehensive valuation
                </p>
              </CardContent>
            </Card>
          )}

          <Button 
            onClick={calculateValuation} 
            className="w-full" 
            size="lg"
            disabled={isCalculating || !platformData.adSlotPrice || !platformData.dailyImpressions}
          >
            {isCalculating ? "Calculating..." : "Generate Platform Valuation"}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}