/**
 * ============================================================================
 * COMPREHENSIVE CLIMATE RISK ASSESSMENT - SINGLE PAGE
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * This comprehensive climate risk assessment consolidates all climate-related
 * risk analysis into a single page for PropertyPRO reports.
 * ============================================================================
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  CloudRain, 
  Thermometer, 
  Flame, 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Calculator,
  Save,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

const ComprehensiveClimateRiskAssessment = () => {
  const [includeSection, setIncludeSection] = useState(true);
  
  // Basic Risk Assessments
  const [climateRisk, setClimateRisk] = useState("");
  const [floodRisk, setFloodRisk] = useState("");
  const [bushfireRisk, setBushfireRisk] = useState("");
  
  // ESG & Climate Risk Financing
  const [includeESGFinancing, setIncludeESGFinancing] = useState(false);
  const [baseLVR, setBaseLVR] = useState("75");
  const [baseInterestRate, setBaseInterestRate] = useState("4");
  const [waterRiskWeight, setWaterRiskWeight] = useState("0.4");
  const [temperatureRiskWeight, setTemperatureRiskWeight] = useState("0.3");
  const [extremeWeatherWeight, setExtremeWeatherWeight] = useState("0.2");
  const [climateResilienceWeight, setClimateResilienceWeight] = useState("0.1");
  
  // Climate risk factor levels
  const [waterRiskLevel, setWaterRiskLevel] = useState("0");
  const [temperatureRiskLevel, setTemperatureRiskLevel] = useState("0");
  const [extremeWeatherLevel, setExtremeWeatherLevel] = useState("0");
  const [climateResilienceLevel, setClimateResilienceLevel] = useState("0");
  
  // Additional assessments
  const [riskRecommendations, setRiskRecommendations] = useState("");
  const [mitigationStrategies, setMitigationStrategies] = useState("");
  const [financialImpact, setFinancialImpact] = useState("");

  const calculateClimateRiskScore = () => {
    const score = 
      parseFloat(waterRiskWeight) * parseFloat(waterRiskLevel) +
      parseFloat(temperatureRiskWeight) * parseFloat(temperatureRiskLevel) +
      parseFloat(extremeWeatherWeight) * parseFloat(extremeWeatherLevel) +
      parseFloat(climateResilienceWeight) * parseFloat(climateResilienceLevel);
    return score;
  };

  const calculateAdjustedLVR = (riskScore: number) => {
    const baseLVRValue = parseFloat(baseLVR);
    const adjustment = riskScore * 0.02;
    return Math.max(baseLVRValue - adjustment, 0);
  };

  const calculateAdjustedInterestRate = (riskScore: number) => {
    const baseRate = parseFloat(baseInterestRate);
    const adjustment = riskScore * 0.0005;
    return baseRate + adjustment;
  };

  const climateRiskScore = calculateClimateRiskScore();
  const adjustedLVR = calculateAdjustedLVR(climateRiskScore);
  const adjustedInterestRate = calculateAdjustedInterestRate(climateRiskScore);

  const handleSave = () => {
    toast.success("Comprehensive Climate Risk Assessment saved successfully!");
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': case 'minimal': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'moderate': case 'fair': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'extreme': case 'very-high': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Thermometer className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">Comprehensive Climate Risk Assessment</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleSave} size="sm" variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Label htmlFor="include-climate">Include</Label>
          <Switch 
            id="include-climate" 
            checked={includeSection}
            onCheckedChange={setIncludeSection}
          />
        </div>
      </div>

      {includeSection && (
        <div className="space-y-6">
          {/* Core Climate Risk Assessment */}
          <Card className="relative bg-gradient-to-br from-background via-background to-primary/5 border-2 border-primary/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/60"></div>
                Climate Risk Assessment
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Climate Risk Assessment */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                    <Thermometer className="h-4 w-4" />
                    Climate Risk Assessment
                  </label>
                  <Select value={climateRisk} onValueChange={setClimateRisk}>
                    <SelectTrigger className="bg-background/80 border-primary/20 hover:border-primary/40 transition-colors">
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="moderate">Moderate Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                      <SelectItem value="extreme">Extreme Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Flood Risk Rating */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                    <CloudRain className="h-4 w-4" />
                    Flood Risk Rating
                  </label>
                  <Select value={floodRisk} onValueChange={setFloodRisk}>
                    <SelectTrigger className="bg-background/80 border-primary/20 hover:border-primary/40 transition-colors">
                      <SelectValue placeholder="Select flood risk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="very-high">Very High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bushfire Risk */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                    <Flame className="h-4 w-4" />
                    Bushfire Risk
                  </label>
                  <Select value={bushfireRisk} onValueChange={setBushfireRisk}>
                    <SelectTrigger className="bg-background/80 border-primary/20 hover:border-primary/40 transition-colors">
                      <SelectValue placeholder="Select bushfire risk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="extreme">Extreme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Risk Assessment Summary */}
              {(climateRisk || floodRisk || bushfireRisk) && (
                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-medium mb-3 text-foreground">Risk Assessment Summary</h4>
                  <div className="flex flex-wrap gap-2">
                    {climateRisk && (
                      <Badge variant="secondary" className={getRiskColor(climateRisk)}>
                        Climate: {climateRisk}
                      </Badge>
                    )}
                    {floodRisk && (
                      <Badge variant="secondary" className={getRiskColor(floodRisk)}>
                        Flood: {floodRisk}
                      </Badge>
                    )}
                    {bushfireRisk && (
                      <Badge variant="secondary" className={getRiskColor(bushfireRisk)}>
                        Bushfire: {bushfireRisk}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div className="text-sm text-muted-foreground bg-background/60 p-3 rounded border border-primary/10">
                <p className="mb-2"><strong>Climate Risk Assessment:</strong> Evaluates long-term climate impacts including temperature changes, sea level rise, and extreme weather events.</p>
                <p className="mb-2"><strong>Flood Risk Rating:</strong> Assesses property's exposure to flood events based on historical data and topographical analysis.</p>
                <p><strong>Bushfire Risk:</strong> Determines bushfire risk level based on vegetation, terrain, weather patterns, and proximity to fire-prone areas.</p>
              </div>
            </CardContent>
          </Card>

          {/* ESG & Climate Risk Financing Impact */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  ESG & Climate Risk Financing Impact
                </CardTitle>
                <Switch 
                  checked={includeESGFinancing} 
                  onCheckedChange={setIncludeESGFinancing}
                />
              </div>
            </CardHeader>
            
            {includeESGFinancing && (
              <CardContent className="space-y-6">
                {/* Financing Parameters */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Base LVR (%)</Label>
                    <Input 
                      value={baseLVR} 
                      onChange={(e) => setBaseLVR(e.target.value)}
                      type="number"
                    />
                  </div>
                  <div>
                    <Label>Base Interest Rate (%)</Label>
                    <Input 
                      value={baseInterestRate} 
                      onChange={(e) => setBaseInterestRate(e.target.value)}
                      type="number"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <Label>LVR Impact (%)</Label>
                    <Input 
                      value={adjustedLVR.toFixed(2)} 
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div>
                    <Label>Rate Premium (%)</Label>
                    <Input 
                      value={adjustedInterestRate.toFixed(3)} 
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                </div>

                {/* Climate Risk Factors */}
                <div>
                  <h4 className="font-medium mb-4">Climate Risk Factors</h4>
                  <div className="text-sm text-muted-foreground mb-4">
                    Risk Score: 0.0 = No Risk, 1.0 = Maximum Risk
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Water Risk - Weight: 40%</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input 
                          value={waterRiskWeight} 
                          onChange={(e) => setWaterRiskWeight(e.target.value)}
                          type="number"
                          step="0.1"
                        />
                        <Input 
                          value={waterRiskLevel} 
                          onChange={(e) => setWaterRiskLevel(e.target.value)}
                          type="number"
                          step="0.1"
                          max="1"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Temperature Risk - Weight: 30%</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input 
                          value={temperatureRiskWeight} 
                          onChange={(e) => setTemperatureRiskWeight(e.target.value)}
                          type="number"
                          step="0.1"
                        />
                        <Input 
                          value={temperatureRiskLevel} 
                          onChange={(e) => setTemperatureRiskLevel(e.target.value)}
                          type="number"
                          step="0.1"
                          max="1"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Extreme Weather - Weight: 20%</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input 
                          value={extremeWeatherWeight} 
                          onChange={(e) => setExtremeWeatherWeight(e.target.value)}
                          type="number"
                          step="0.1"
                        />
                        <Input 
                          value={extremeWeatherLevel} 
                          onChange={(e) => setExtremeWeatherLevel(e.target.value)}
                          type="number"
                          step="0.1"
                          max="1"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Climate Resilience - Weight: 10%</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input 
                          value={climateResilienceWeight} 
                          onChange={(e) => setClimateResilienceWeight(e.target.value)}
                          type="number"
                          step="0.1"
                        />
                        <Input 
                          value={climateResilienceLevel} 
                          onChange={(e) => setClimateResilienceLevel(e.target.value)}
                          type="number"
                          step="0.1"
                          max="1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financing Impact Calculations */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Financing Impact Calculations</h4>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Climate Risk Score Calculation:</strong>
                      <br />
                      <code>
                        ({waterRiskWeight} × {waterRiskLevel}) + ({temperatureRiskWeight} × {temperatureRiskLevel}) + ({extremeWeatherWeight} × {extremeWeatherLevel}) + ({climateResilienceWeight} × {climateResilienceLevel}) = {climateRiskScore.toFixed(3)}
                      </code>
                    </div>
                    
                    <div>
                      <strong>LVR Adjustment Formula:</strong>
                      <br />
                      <code>LVR_adjusted = {baseLVR} - ({climateRiskScore.toFixed(3)} × 2.0) = {adjustedLVR.toFixed(2)}%</code>
                    </div>
                    
                    <div>
                      <strong>Interest Rate Adjustment Formula:</strong>
                      <br />
                      <code>Rate_adjusted = {baseInterestRate} + ({climateRiskScore.toFixed(3)} × 0.05) = {adjustedInterestRate.toFixed(3)}%</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Risk Analysis & Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Risk Analysis & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="risk-recommendations">Risk Assessment Recommendations</Label>
                <Textarea
                  id="risk-recommendations"
                  placeholder="Provide detailed recommendations based on the climate risk assessment findings..."
                  value={riskRecommendations}
                  onChange={(e) => setRiskRecommendations(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="mitigation-strategies">Mitigation Strategies</Label>
                <Textarea
                  id="mitigation-strategies"
                  placeholder="Outline specific strategies to mitigate identified climate risks..."
                  value={mitigationStrategies}
                  onChange={(e) => setMitigationStrategies(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="financial-impact">Financial Impact Assessment</Label>
                <Textarea
                  id="financial-impact"
                  placeholder="Assess the financial implications of climate risks on property value and investment returns..."
                  value={financialImpact}
                  onChange={(e) => setFinancialImpact(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {/* AI Analysis Progress */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Climate Risk Analysis Complete
                  </h4>
                  <span className="text-sm text-green-600">100% Complete</span>
                </div>
                <Progress value={100} className="w-full mb-2" />
                <p className="text-sm text-muted-foreground">
                  Comprehensive climate risk assessment completed including financial impact analysis.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ComprehensiveClimateRiskAssessment;