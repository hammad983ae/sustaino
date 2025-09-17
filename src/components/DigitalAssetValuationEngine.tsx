import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, Users, Code, DollarSign, Target } from 'lucide-react';

interface ValuationInputs {
  // Revenue Method Inputs
  currentMonthlyRevenue: number;
  growthRate: number;
  projectionYears: number;
  discountRate: number;
  terminalGrowthRate: number;
  
  // Market Comparables Inputs
  revenueMultiple: number;
  userMultiple: number;
  transactionMultiple: number;
  marketPremium: number;
  
  // Technology Asset Inputs
  codebaseValue: number;
  ipPortfolioValue: number;
  userBaseValue: number;
  brandValue: number;
  dataAssetValue: number;
  
  // Platform Metrics
  monthlyActiveUsers: number;
  averageTransactionValue: number;
  transactionVolume: number;
  userGrowthRate: number;
  churnRate: number;
}

const DigitalAssetValuationEngine = () => {
  const [inputs, setInputs] = useState<ValuationInputs>({
    // Revenue Method - Sustaino-Sphere Example
    currentMonthlyRevenue: 150000, // $150k/month
    growthRate: 15, // 15% monthly growth
    projectionYears: 5,
    discountRate: 12, // 12% discount rate
    terminalGrowthRate: 3, // 3% terminal growth
    
    // Market Comparables - Based on trading platforms
    revenueMultiple: 12, // 12x revenue multiple
    userMultiple: 85, // $85 per user
    transactionMultiple: 0.015, // 1.5% of transaction volume
    marketPremium: 25, // 25% premium for innovation
    
    // Technology Assets - Sustaino-Sphere IP
    codebaseValue: 25000000, // $25M for platform code
    ipPortfolioValue: 45000000, // $45M for patents/IP
    userBaseValue: 15000000, // $15M for user network
    brandValue: 12000000, // $12M for brand value
    dataAssetValue: 18000000, // $18M for data assets
    
    // Platform Metrics
    monthlyActiveUsers: 12500,
    averageTransactionValue: 85000,
    transactionVolume: 125000000, // $125M monthly volume
    userGrowthRate: 22, // 22% monthly user growth
    churnRate: 3.5, // 3.5% monthly churn
  });

  const [valuations, setValuations] = useState({
    dcf: 0,
    comparable: 0,
    asset: 0,
    average: 0
  });

  // DCF Valuation Formula
  const calculateDCF = () => {
    const { currentMonthlyRevenue, growthRate, projectionYears, discountRate, terminalGrowthRate } = inputs;
    
    let totalPV = 0;
    let monthlyRevenue = currentMonthlyRevenue;
    const monthlyGrowth = growthRate / 100;
    const monthlyDiscount = discountRate / 100 / 12;
    
    // Project 5 years of cash flows
    for (let month = 1; month <= projectionYears * 12; month++) {
      monthlyRevenue *= (1 + monthlyGrowth);
      const monthlyCashFlow = monthlyRevenue * 0.35; // 35% EBITDA margin
      const pv = monthlyCashFlow / Math.pow(1 + monthlyDiscount, month);
      totalPV += pv;
    }
    
    // Terminal value
    const terminalCashFlow = monthlyRevenue * 0.35 * (1 + terminalGrowthRate / 100);
    const terminalValue = terminalCashFlow / (discountRate / 100 / 12 - terminalGrowthRate / 100 / 12);
    const terminalPV = terminalValue / Math.pow(1 + monthlyDiscount, projectionYears * 12);
    
    return totalPV + terminalPV;
  };

  // Market Comparables Valuation Formula
  const calculateComparables = () => {
    const { 
      currentMonthlyRevenue, 
      revenueMultiple, 
      userMultiple, 
      transactionMultiple, 
      marketPremium,
      monthlyActiveUsers,
      transactionVolume
    } = inputs;
    
    const annualRevenue = currentMonthlyRevenue * 12;
    
    // Revenue-based valuation
    const revenueValuation = annualRevenue * revenueMultiple;
    
    // User-based valuation
    const userValuation = monthlyActiveUsers * userMultiple * 12;
    
    // Transaction-based valuation
    const transactionValuation = transactionVolume * 12 * transactionMultiple;
    
    // Average of three methods
    const averageValuation = (revenueValuation + userValuation + transactionValuation) / 3;
    
    // Apply market premium for innovation
    return averageValuation * (1 + marketPremium / 100);
  };

  // Technology Asset Valuation Formula
  const calculateAssetValue = () => {
    const { 
      codebaseValue, 
      ipPortfolioValue, 
      userBaseValue, 
      brandValue, 
      dataAssetValue,
      monthlyActiveUsers,
      userGrowthRate
    } = inputs;
    
    // Network effect multiplier based on user growth
    const networkMultiplier = 1 + (userGrowthRate / 100) * 0.5;
    
    // Adjust user base value for network effects
    const adjustedUserValue = userBaseValue * networkMultiplier;
    
    // Technology stack premium for AI/blockchain
    const techPremium = 1.25; // 25% premium for advanced tech
    
    const totalAssetValue = (
      codebaseValue * techPremium +
      ipPortfolioValue +
      adjustedUserValue +
      brandValue +
      dataAssetValue
    );
    
    return totalAssetValue;
  };

  // Calculate all valuations when inputs change
  useEffect(() => {
    const dcf = calculateDCF();
    const comparable = calculateComparables();
    const asset = calculateAssetValue();
    const average = (dcf + comparable + asset) / 3;
    
    setValuations({ dcf, comparable, asset, average });
  }, [inputs]);

  const updateInput = (key: keyof ValuationInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(2)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const getValuationColor = (value: number) => {
    if (value >= 200000000) return 'text-green-600';
    if (value >= 100000000) return 'text-blue-600';
    return 'text-orange-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Digital Asset Valuation Engine
          </h1>
          <p className="text-xl text-muted-foreground">
            Sustaino-Sphere™ Platform Valuation - 3 Core Methods
          </p>
        </div>

        {/* Valuation Summary */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-6 w-6 text-primary" />
              Real-Time Valuation Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="text-sm text-muted-foreground">DCF Method</div>
                <div className={`text-2xl font-bold ${getValuationColor(valuations.dcf)}`}>
                  {formatCurrency(valuations.dcf)}
                </div>
                <Badge variant="outline">Revenue-Based</Badge>
              </div>
              <div className="text-center space-y-2">
                <div className="text-sm text-muted-foreground">Market Comps</div>
                <div className={`text-2xl font-bold ${getValuationColor(valuations.comparable)}`}>
                  {formatCurrency(valuations.comparable)}
                </div>
                <Badge variant="outline">Market-Based</Badge>
              </div>
              <div className="text-center space-y-2">
                <div className="text-sm text-muted-foreground">Asset Value</div>
                <div className={`text-2xl font-bold ${getValuationColor(valuations.asset)}`}>
                  {formatCurrency(valuations.asset)}
                </div>
                <Badge variant="outline">Technology-Based</Badge>
              </div>
              <div className="text-center space-y-2">
                <div className="text-sm text-muted-foreground">Average</div>
                <div className="text-3xl font-bold text-primary">
                  {formatCurrency(valuations.average)}
                </div>
                <Badge className="bg-primary">Final Valuation</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="dcf" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dcf">DCF Method</TabsTrigger>
            <TabsTrigger value="comparables">Market Comparables</TabsTrigger>
            <TabsTrigger value="asset">Technology Assets</TabsTrigger>
          </TabsList>

          {/* DCF Method */}
          <TabsContent value="dcf" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    DCF Formula Inputs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Current Monthly Revenue</Label>
                    <Input
                      type="number"
                      value={inputs.currentMonthlyRevenue}
                      onChange={(e) => updateInput('currentMonthlyRevenue', Number(e.target.value))}
                    />
                    <div className="text-sm text-muted-foreground">
                      Current: {formatCurrency(inputs.currentMonthlyRevenue)}/month
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Monthly Growth Rate (%)</Label>
                    <Slider
                      value={[inputs.growthRate]}
                      onValueChange={(value) => updateInput('growthRate', value[0])}
                      max={50}
                      min={1}
                      step={0.5}
                    />
                    <div className="text-sm text-muted-foreground">
                      {inputs.growthRate}% monthly growth
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Discount Rate (%)</Label>
                    <Slider
                      value={[inputs.discountRate]}
                      onValueChange={(value) => updateInput('discountRate', value[0])}
                      max={25}
                      min={5}
                      step={0.5}
                    />
                    <div className="text-sm text-muted-foreground">
                      {inputs.discountRate}% annual discount rate
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Terminal Growth Rate (%)</Label>
                    <Slider
                      value={[inputs.terminalGrowthRate]}
                      onValueChange={(value) => updateInput('terminalGrowthRate', value[0])}
                      max={10}
                      min={1}
                      step={0.5}
                    />
                    <div className="text-sm text-muted-foreground">
                      {inputs.terminalGrowthRate}% terminal growth
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>DCF Formula Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Formula:</h4>
                    <div className="text-sm font-mono space-y-1">
                      <div>PV = Σ(CFₜ / (1 + r)ᵗ) + TV</div>
                      <div>Where:</div>
                      <div>• CFₜ = Cash Flow in period t</div>
                      <div>• r = Discount rate</div>
                      <div>• TV = Terminal Value</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Current Calculations:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Annual Revenue (Current):</span>
                        <span className="font-semibold">
                          {formatCurrency(inputs.currentMonthlyRevenue * 12)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>EBITDA Margin:</span>
                        <span className="font-semibold">35%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Year 5 Revenue (Proj):</span>
                        <span className="font-semibold">
                          {formatCurrency(
                            inputs.currentMonthlyRevenue * 
                            Math.pow(1 + inputs.growthRate / 100, 60) * 12
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded border border-green-200">
                    <div className="text-green-700 dark:text-green-400 font-semibold">
                      DCF Valuation: {formatCurrency(valuations.dcf)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Market Comparables */}
          <TabsContent value="comparables" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Market Multiple Inputs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Revenue Multiple</Label>
                    <Slider
                      value={[inputs.revenueMultiple]}
                      onValueChange={(value) => updateInput('revenueMultiple', value[0])}
                      max={25}
                      min={5}
                      step={0.5}
                    />
                    <div className="text-sm text-muted-foreground">
                      {inputs.revenueMultiple}x annual revenue
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Value per User ($)</Label>
                    <Input
                      type="number"
                      value={inputs.userMultiple}
                      onChange={(e) => updateInput('userMultiple', Number(e.target.value))}
                    />
                    <div className="text-sm text-muted-foreground">
                      ${inputs.userMultiple} per monthly active user
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Transaction Volume Multiple (%)</Label>
                    <Slider
                      value={[inputs.transactionMultiple * 100]}
                      onValueChange={(value) => updateInput('transactionMultiple', value[0] / 100)}
                      max={5}
                      min={0.5}
                      step={0.1}
                    />
                    <div className="text-sm text-muted-foreground">
                      {(inputs.transactionMultiple * 100).toFixed(1)}% of transaction volume
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Innovation Premium (%)</Label>
                    <Slider
                      value={[inputs.marketPremium]}
                      onValueChange={(value) => updateInput('marketPremium', value[0])}
                      max={50}
                      min={0}
                      step={5}
                    />
                    <div className="text-sm text-muted-foreground">
                      {inputs.marketPremium}% premium for innovation
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Comparable Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Market Comparables:</h4>
                    <div className="text-sm space-y-1">
                      <div>• Trading Platforms: 8-15x revenue</div>
                      <div>• Fintech Startups: 12-20x revenue</div>
                      <div>• User-Based: $50-150 per MAU</div>
                      <div>• Transaction: 1-3% of volume</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Your Platform Metrics:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Monthly Active Users:</span>
                        <span className="font-semibold">{inputs.monthlyActiveUsers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Volume:</span>
                        <span className="font-semibold">{formatCurrency(inputs.transactionVolume)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue Multiple Applied:</span>
                        <span className="font-semibold">{inputs.revenueMultiple}x</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200">
                    <div className="text-blue-700 dark:text-blue-400 font-semibold">
                      Comparable Valuation: {formatCurrency(valuations.comparable)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Technology Assets */}
          <TabsContent value="asset" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Technology Asset Values
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Platform Codebase Value</Label>
                    <Input
                      type="number"
                      value={inputs.codebaseValue}
                      onChange={(e) => updateInput('codebaseValue', Number(e.target.value))}
                    />
                    <div className="text-sm text-muted-foreground">
                      AI algorithms, trading engine, infrastructure
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>IP Portfolio Value</Label>
                    <Input
                      type="number"
                      value={inputs.ipPortfolioValue}
                      onChange={(e) => updateInput('ipPortfolioValue', Number(e.target.value))}
                    />
                    <div className="text-sm text-muted-foreground">
                      Patents, trademarks, trade secrets
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>User Network Value</Label>
                    <Input
                      type="number"
                      value={inputs.userBaseValue}
                      onChange={(e) => updateInput('userBaseValue', Number(e.target.value))}
                    />
                    <div className="text-sm text-muted-foreground">
                      Network effects, user acquisition cost savings
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Brand & Marketing Value</Label>
                    <Input
                      type="number"
                      value={inputs.brandValue}
                      onChange={(e) => updateInput('brandValue', Number(e.target.value))}
                    />
                    <div className="text-sm text-muted-foreground">
                      Brand recognition, marketing assets
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Data Asset Value</Label>
                    <Input
                      type="number"
                      value={inputs.dataAssetValue}
                      onChange={(e) => updateInput('dataAssetValue', Number(e.target.value))}
                    />
                    <div className="text-sm text-muted-foreground">
                      Market data, user behavior, analytics
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Asset Valuation Model</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Asset Categories:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Technology Stack:</span>
                        <span className="font-semibold">{formatCurrency(inputs.codebaseValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IP Portfolio:</span>
                        <span className="font-semibold">{formatCurrency(inputs.ipPortfolioValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>User Network:</span>
                        <span className="font-semibold">{formatCurrency(inputs.userBaseValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Brand Value:</span>
                        <span className="font-semibold">{formatCurrency(inputs.brandValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Assets:</span>
                        <span className="font-semibold">{formatCurrency(inputs.dataAssetValue)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Adjustments:</h4>
                    <div className="text-sm space-y-1">
                      <div>• Technology Premium: +25% (AI/Blockchain)</div>
                      <div>• Network Effects: Based on user growth</div>
                      <div>• Market Leadership: Innovation premium</div>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded border border-purple-200">
                    <div className="text-purple-700 dark:text-purple-400 font-semibold">
                      Asset Valuation: {formatCurrency(valuations.asset)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={() => console.log('Export Report', valuations)}>
                <Target className="h-4 w-4 mr-2" />
                Export Valuation Report
              </Button>
              <Button variant="outline" onClick={() => setInputs({
                ...inputs,
                growthRate: inputs.growthRate + 5
              })}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Test Growth Scenarios
              </Button>
              <Button variant="outline" onClick={() => alert('Ready for your critique!')}>
                <DollarSign className="h-4 w-4 mr-2" />
                Critique & Refine
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DigitalAssetValuationEngine;