import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, Thermometer, Droplets, Shield, Users, Building2 } from "lucide-react";

interface ESGData {
  // Environmental
  energyEfficiencyRating: string;
  greenStarRating: number;
  carbonFootprint: number;
  renewableEnergyTarget: number;
  waterEfficiencyRating: string;
  wasteReductionTarget: number;
  
  // Social
  affordableHousingPercentage: number;
  accessibilityCompliance: string;
  communityFacilities: string[];
  publicTransportAccess: number;
  
  // Governance
  planningCompliance: string;
  stakeholderEngagement: string;
  transparencyMeasures: string[];
  riskManagement: string;
  
  // Climate Risk
  floodRisk: string;
  bushfireRisk: string;
  heatwaveRisk: string;
  seaLevelRise: string;
  extremeWeather: string;
}

export default function ESGClimateRiskAssessment() {
  const [esgData, setEsgData] = useState<ESGData>({
    energyEfficiencyRating: '7-star',
    greenStarRating: 5,
    carbonFootprint: 85,
    renewableEnergyTarget: 60,
    waterEfficiencyRating: '4-star',
    wasteReductionTarget: 70,
    affordableHousingPercentage: 15,
    accessibilityCompliance: 'Full DDA Compliance',
    communityFacilities: ['Child Care Centre', 'Community Garden', 'Retail Spaces'],
    publicTransportAccess: 850,
    planningCompliance: 'Full Compliance',
    stakeholderEngagement: 'Comprehensive',
    transparencyMeasures: ['Public Reporting', 'Community Updates', 'Online Dashboard'],
    riskManagement: 'Robust Framework',
    floodRisk: 'Low',
    bushfireRisk: 'Very Low',
    heatwaveRisk: 'Medium',
    seaLevelRise: 'Very Low',
    extremeWeather: 'Medium'
  });

  const [esgScore, setEsgScore] = useState({
    environmental: 85,
    social: 78,
    governance: 92,
    overall: 85,
    climateResilience: 75
  });

  const [esgPremium, setEsgPremium] = useState({
    premiumPercentage: 12.5,
    marketValue: 15750000,
    esgAdjustedValue: 17718750
  });

  const calculateESGScore = () => {
    // Environmental Score (40% weight)
    const envScore = (
      (esgData.greenStarRating * 20) +
      (esgData.renewableEnergyTarget * 0.8) +
      (100 - esgData.carbonFootprint)
    ) / 3;

    // Social Score (30% weight)  
    const socialScore = (
      (esgData.affordableHousingPercentage * 3) +
      (esgData.publicTransportAccess > 1000 ? 60 : 85) +
      (esgData.communityFacilities.length * 10)
    ) / 3;

    // Governance Score (30% weight)
    const govScore = esgData.planningCompliance === 'Full Compliance' ? 90 : 70;

    const overallScore = (envScore * 0.4) + (socialScore * 0.3) + (govScore * 0.3);
    
    setEsgScore({
      environmental: Math.round(envScore),
      social: Math.round(socialScore),
      governance: Math.round(govScore),
      overall: Math.round(overallScore),
      climateResilience: 75
    });
  };

  const calculateESGPremium = () => {
    const premium = esgScore.overall >= 85 ? 12.5 : esgScore.overall >= 75 ? 8.5 : esgScore.overall >= 65 ? 5.0 : 0;
    const baseValue = 15750000; // Example base valuation
    const adjustedValue = baseValue * (1 + premium / 100);
    
    setEsgPremium({
      premiumPercentage: premium,
      marketValue: baseValue,
      esgAdjustedValue: adjustedValue
    });
  };

  React.useEffect(() => {
    calculateESGScore();
  }, [esgData]);

  React.useEffect(() => {
    calculateESGPremium();
  }, [esgScore]);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="environmental" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
          <TabsTrigger value="climate-risk">Climate Risk</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="environmental" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5" />
                Environmental Impact Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="energyRating">Energy Efficiency Rating</Label>
                  <Select value={esgData.energyEfficiencyRating} onValueChange={(value) => 
                    setEsgData(prev => ({ ...prev, energyEfficiencyRating: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6-star">6 Star</SelectItem>
                      <SelectItem value="7-star">7 Star</SelectItem>
                      <SelectItem value="8-star">8 Star</SelectItem>
                      <SelectItem value="9-star">9 Star</SelectItem>
                      <SelectItem value="10-star">10 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="greenStar">Green Star Rating</Label>
                  <Input
                    id="greenStar"
                    type="number"
                    min="1"
                    max="6"
                    value={esgData.greenStarRating}
                    onChange={(e) => setEsgData(prev => ({ ...prev, greenStarRating: Number(e.target.value) }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="carbonFootprint">Carbon Footprint Reduction (%)</Label>
                  <Input
                    id="carbonFootprint"
                    type="number"
                    value={esgData.carbonFootprint}
                    onChange={(e) => setEsgData(prev => ({ ...prev, carbonFootprint: Number(e.target.value) }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="renewableEnergy">Renewable Energy Target (%)</Label>
                  <Input
                    id="renewableEnergy"
                    type="number"
                    value={esgData.renewableEnergyTarget}
                    onChange={(e) => setEsgData(prev => ({ ...prev, renewableEnergyTarget: Number(e.target.value) }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="waterRating">Water Efficiency Rating</Label>
                  <Select value={esgData.waterEfficiencyRating} onValueChange={(value) => 
                    setEsgData(prev => ({ ...prev, waterEfficiencyRating: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-star">3 Star</SelectItem>
                      <SelectItem value="4-star">4 Star</SelectItem>
                      <SelectItem value="5-star">5 Star</SelectItem>
                      <SelectItem value="6-star">6 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="wasteReduction">Waste Reduction Target (%)</Label>
                  <Input
                    id="wasteReduction"
                    type="number"
                    value={esgData.wasteReductionTarget}
                    onChange={(e) => setEsgData(prev => ({ ...prev, wasteReductionTarget: Number(e.target.value) }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Social Impact Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="affordableHousing">Affordable Housing (%)</Label>
                  <Input
                    id="affordableHousing"
                    type="number"
                    value={esgData.affordableHousingPercentage}
                    onChange={(e) => setEsgData(prev => ({ ...prev, affordableHousingPercentage: Number(e.target.value) }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="accessibility">Accessibility Compliance</Label>
                  <Select value={esgData.accessibilityCompliance} onValueChange={(value) => 
                    setEsgData(prev => ({ ...prev, accessibilityCompliance: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic Compliance">Basic Compliance</SelectItem>
                      <SelectItem value="Full DDA Compliance">Full DDA Compliance</SelectItem>
                      <SelectItem value="Universal Design">Universal Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="publicTransport">Distance to Public Transport (m)</Label>
                  <Input
                    id="publicTransport"
                    type="number"
                    value={esgData.publicTransportAccess}
                    onChange={(e) => setEsgData(prev => ({ ...prev, publicTransportAccess: Number(e.target.value) }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Governance Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="planningCompliance">Planning Compliance</Label>
                  <Select value={esgData.planningCompliance} onValueChange={(value) => 
                    setEsgData(prev => ({ ...prev, planningCompliance: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic Compliance">Basic Compliance</SelectItem>
                      <SelectItem value="Full Compliance">Full Compliance</SelectItem>
                      <SelectItem value="Exceeds Requirements">Exceeds Requirements</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="stakeholderEngagement">Stakeholder Engagement</Label>
                  <Select value={esgData.stakeholderEngagement} onValueChange={(value) => 
                    setEsgData(prev => ({ ...prev, stakeholderEngagement: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Minimal">Minimal</SelectItem>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Comprehensive">Comprehensive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="climate-risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Climate Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'floodRisk', label: 'Flood Risk', icon: Droplets },
                  { key: 'bushfireRisk', label: 'Bushfire Risk', icon: Thermometer },
                  { key: 'heatwaveRisk', label: 'Heatwave Risk', icon: Thermometer },
                  { key: 'seaLevelRise', label: 'Sea Level Rise', icon: Droplets },
                  { key: 'extremeWeather', label: 'Extreme Weather', icon: Shield }
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key}>
                    <Label htmlFor={key} className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {label}
                    </Label>
                    <Select 
                      value={esgData[key as keyof ESGData] as string} 
                      onValueChange={(value) => setEsgData(prev => ({ ...prev, [key]: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Very Low">Very Low</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Very High">Very High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ESG Score Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Environmental', score: esgScore.environmental, icon: Leaf },
                  { label: 'Social', score: esgScore.social, icon: Users },
                  { label: 'Governance', score: esgScore.governance, icon: Building2 },
                  { label: 'Climate Resilience', score: esgScore.climateResilience, icon: Shield }
                ].map(({ label, score, icon: Icon }) => (
                  <div key={label} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{label}</span>
                      </div>
                      <Badge variant={score >= 85 ? "default" : score >= 70 ? "secondary" : "outline"}>
                        {score}/100
                      </Badge>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Overall ESG Score</span>
                    <Badge variant="default" className="text-lg px-3 py-1">
                      {esgScore.overall}/100
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ESG Market Premium</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Base Market Value:</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0 })
                        .format(esgPremium.marketValue)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>ESG Premium:</span>
                    <span className="font-medium text-green-600">
                      +{esgPremium.premiumPercentage}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-semibold">ESG Adjusted Value:</span>
                    <span className="font-semibold text-lg">
                      {new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0 })
                        .format(esgPremium.esgAdjustedValue)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    ESG premium based on market analysis of comparable sustainable developments 
                    and investor demand for ESG-compliant properties.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}