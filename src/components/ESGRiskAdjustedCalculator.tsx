/**
 * ============================================================================
 * ESG RISK-ADJUSTED RETURN CALCULATOR WITH GREENIUM PREMIUM
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Proprietary ESG valuation methodology including Sustaino Coin integration
 * and Greenium premium calculations for sustainable property investments.
 * ============================================================================
 */
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Leaf, 
  TrendingUp, 
  Calculator, 
  Award, 
  DollarSign,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";

interface ESGInputs {
  portfolioReturn: number;
  riskFreeRate: number;
  standardDeviation: number;
  downsideDeviation: number;
  beta: number;
  esgScore: number;
  carbonReduction: number;
  energyEfficiency: number;
  sustainoCoinHolding: number;
}

interface RiskMetrics {
  sharpeRatio: number;
  sortinoRatio: number;
  treynorRatio: number;
  esgAdjustedReturn: number;
  greeniumPremium: number;
  sustainoCoinBonus: number;
  totalAdjustedReturn: number;
}

const ESGRiskAdjustedCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ESGInputs>({
    portfolioReturn: 10.0,
    riskFreeRate: 4.0,
    standardDeviation: 12.5,
    downsideDeviation: 10.0,
    beta: 1.2,
    esgScore: 75,
    carbonReduction: 30,
    energyEfficiency: 25,
    sustainoCoinHolding: 1000
  });

  const metrics = useMemo((): RiskMetrics => {
    const excessReturn = inputs.portfolioReturn - inputs.riskFreeRate;
    
    // Traditional Risk Metrics
    const sharpeRatio = excessReturn / inputs.standardDeviation;
    const sortinoRatio = excessReturn / inputs.downsideDeviation;
    const treynorRatio = excessReturn / inputs.beta;
    
    // ESG Premium Calculations
    const esgPremiumFactor = (inputs.esgScore / 100) * 0.02; // Up to 2% premium for perfect ESG score
    const carbonPremium = (inputs.carbonReduction / 100) * 0.015; // Up to 1.5% for carbon neutrality
    const efficiencyPremium = (inputs.energyEfficiency / 100) * 0.01; // Up to 1% for efficiency
    
    const greeniumPremium = esgPremiumFactor + carbonPremium + efficiencyPremium;
    
    // Sustaino Coin Bonus (0.1% per 1000 coins held, max 1%)
    const sustainoCoinBonus = Math.min((inputs.sustainoCoinHolding / 1000) * 0.001, 0.01);
    
    const esgAdjustedReturn = inputs.portfolioReturn + (greeniumPremium * 100);
    const totalAdjustedReturn = esgAdjustedReturn + (sustainoCoinBonus * 100);

    return {
      sharpeRatio: sharpeRatio * 100,
      sortinoRatio: sortinoRatio * 100,
      treynorRatio: treynorRatio * 100,
      esgAdjustedReturn,
      greeniumPremium: greeniumPremium * 100,
      sustainoCoinBonus: sustainoCoinBonus * 100,
      totalAdjustedReturn
    };
  }, [inputs]);

  const handleInputChange = (field: keyof ESGInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const comparisonData = [
    {
      name: 'Traditional Property',
      return: inputs.portfolioReturn,
      risk: inputs.standardDeviation,
      premium: 0
    },
    {
      name: 'ESG Property',
      return: metrics.esgAdjustedReturn,
      risk: inputs.standardDeviation * 0.9, // ESG reduces risk
      premium: metrics.greeniumPremium
    },
    {
      name: 'ESG + Sustaino Coin',
      return: metrics.totalAdjustedReturn,
      risk: inputs.standardDeviation * 0.85, // Further risk reduction
      premium: metrics.greeniumPremium + metrics.sustainoCoinBonus
    }
  ];

  const premiumBreakdown = [
    { name: 'ESG Score Premium', value: (inputs.esgScore / 100) * 2, color: '#22c55e' },
    { name: 'Carbon Reduction', value: (inputs.carbonReduction / 100) * 1.5, color: '#16a34a' },
    { name: 'Energy Efficiency', value: (inputs.energyEfficiency / 100) * 1, color: '#15803d' },
    { name: 'Sustaino Coin Bonus', value: metrics.sustainoCoinBonus, color: '#059669' }
  ];

  const COLORS = ['#22c55e', '#16a34a', '#15803d', '#059669'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">ESG Risk-Adjusted Return Calculator</h1>
            <p className="text-muted-foreground">Discover the Greenium Premium for Sustainable Properties</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Badge variant="secondary" className="px-4 py-2">
            <Leaf className="h-4 w-4 mr-2" />
            Greenium Analysis
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Award className="h-4 w-4 mr-2" />
            Sustaino Coin Integration
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <ShieldCheck className="h-4 w-4 mr-2" />
            Risk-Adjusted Returns
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Investment Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="portfolioReturn">Portfolio Return (%)</Label>
                    <Input
                      id="portfolioReturn"
                      type="number"
                      value={inputs.portfolioReturn}
                      onChange={(e) => handleInputChange('portfolioReturn', parseFloat(e.target.value) || 0)}
                      step="0.1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="riskFreeRate">Risk-Free Rate (%)</Label>
                    <Input
                      id="riskFreeRate"
                      type="number"
                      value={inputs.riskFreeRate}
                      onChange={(e) => handleInputChange('riskFreeRate', parseFloat(e.target.value) || 0)}
                      step="0.1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="standardDeviation">Standard Deviation (%)</Label>
                    <Input
                      id="standardDeviation"
                      type="number"
                      value={inputs.standardDeviation}
                      onChange={(e) => handleInputChange('standardDeviation', parseFloat(e.target.value) || 0)}
                      step="0.1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="downsideDeviation">Downside Deviation (%)</Label>
                    <Input
                      id="downsideDeviation"
                      type="number"
                      value={inputs.downsideDeviation}
                      onChange={(e) => handleInputChange('downsideDeviation', parseFloat(e.target.value) || 0)}
                      step="0.1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="beta">Beta</Label>
                    <Input
                      id="beta"
                      type="number"
                      value={inputs.beta}
                      onChange={(e) => handleInputChange('beta', parseFloat(e.target.value) || 0)}
                      step="0.1"
                    />
                  </div>
                </div>

                <Separator />

                <h4 className="font-semibold flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-green-600" />
                  ESG & Sustainability Factors
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="esgScore">ESG Score (0-100)</Label>
                    <Input
                      id="esgScore"
                      type="number"
                      value={inputs.esgScore}
                      onChange={(e) => handleInputChange('esgScore', parseFloat(e.target.value) || 0)}
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="carbonReduction">Carbon Reduction (%)</Label>
                    <Input
                      id="carbonReduction"
                      type="number"
                      value={inputs.carbonReduction}
                      onChange={(e) => handleInputChange('carbonReduction', parseFloat(e.target.value) || 0)}
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="energyEfficiency">Energy Efficiency (%)</Label>
                    <Input
                      id="energyEfficiency"
                      type="number"
                      value={inputs.energyEfficiency}
                      onChange={(e) => handleInputChange('energyEfficiency', parseFloat(e.target.value) || 0)}
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sustainoCoinHolding">Sustaino Coins Held</Label>
                    <Input
                      id="sustainoCoinHolding"
                      type="number"
                      value={inputs.sustainoCoinHolding}
                      onChange={(e) => handleInputChange('sustainoCoinHolding', parseFloat(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Risk-Adjusted Returns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{metrics.sharpeRatio.toFixed(2)}%</div>
                    <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{metrics.sortinoRatio.toFixed(2)}%</div>
                    <div className="text-sm text-muted-foreground">Sortino Ratio</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{metrics.treynorRatio.toFixed(2)}%</div>
                    <div className="text-sm text-muted-foreground">Treynor Ratio</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <span className="font-medium">Greenium Premium</span>
                    <span className="text-lg font-bold text-green-600">+{metrics.greeniumPremium.toFixed(2)}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                    <span className="font-medium flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Sustaino Coin Bonus
                    </span>
                    <span className="text-lg font-bold text-emerald-600">+{metrics.sustainoCoinBonus.toFixed(2)}%</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border-2 border-green-200 dark:border-green-800">
                    <span className="font-bold text-lg">Total ESG-Adjusted Return</span>
                    <span className="text-2xl font-bold text-green-600">{metrics.totalAdjustedReturn.toFixed(2)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Greenium Premium Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={premiumBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value.toFixed(2)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {premiumBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ESG Impact Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-600" />
                      ESG Score Impact
                    </span>
                    <Badge variant="secondary">{((inputs.esgScore / 100) * 2).toFixed(2)}% premium</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-600" />
                      Carbon Reduction
                    </span>
                    <Badge variant="secondary">{((inputs.carbonReduction / 100) * 1.5).toFixed(2)}% premium</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-600" />
                      Energy Efficiency
                    </span>
                    <Badge variant="secondary">{((inputs.energyEfficiency / 100) * 1).toFixed(2)}% premium</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20">
                    <span className="flex items-center gap-2 font-medium">
                      <Award className="h-4 w-4 text-emerald-600" />
                      Sustaino Coin Multiplier
                    </span>
                    <Badge className="bg-emerald-600 text-white">{metrics.sustainoCoinBonus.toFixed(2)}% bonus</Badge>
                  </div>
                </div>

                <Separator />

                <div className="text-center p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Your Property Commands</div>
                  <div className="text-3xl font-bold text-green-600">
                    {((metrics.totalAdjustedReturn - inputs.portfolioReturn) / inputs.portfolioReturn * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Higher Premium Than Traditional Properties</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Investment Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="return" fill="#22c55e" name="Expected Return (%)" />
                  <Bar dataKey="premium" fill="#059669" name="Premium (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comparisonData.map((item, index) => (
              <Card key={index} className={index === 2 ? "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20" : ""}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Expected Return:</span>
                    <span className="font-bold">{item.return.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Level:</span>
                    <span className="font-bold">{item.risk.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Premium:</span>
                    <span className="font-bold text-green-600">+{item.premium.toFixed(2)}%</span>
                  </div>
                  {index === 2 && (
                    <div className="mt-3 p-2 bg-green-100 dark:bg-green-900/30 rounded text-center">
                      <Badge className="bg-green-600 text-white">Recommended</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ESGRiskAdjustedCalculator;