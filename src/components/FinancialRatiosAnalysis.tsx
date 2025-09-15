/**
 * ============================================================================
 * COMPREHENSIVE FINANCIAL RATIOS ANALYSIS
 * Professional financial performance evaluation with ESG adjustments
 * 
 * INCLUDES:
 * - Profitability Ratios
 * - Liquidity Ratios  
 * - Leverage Ratios
 * - Activity Ratios
 * - Other Important Financial Performance Measures
 * - ESG-Adjusted Ratio Analysis
 * ============================================================================
 */
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calculator, TrendingUp, AlertTriangle, Leaf, Building2, Activity, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FinancialInputs {
  // Income Statement Data
  revenue: number;
  grossProfit: number;
  operatingIncome: number;
  netIncome: number;
  interestExpense: number;
  taxes: number;
  sharesOutstanding: number;
  dividendsPaid: number;
  
  // Balance Sheet Data
  totalAssets: number;
  currentAssets: number;
  inventory: number;
  accountsReceivable: number;
  currentLiabilities: number;
  totalDebt: number;
  longTermDebt: number;
  shareholdersEquity: number;
  
  // Market Data
  sharePrice: number;
  
  // ESG Factors (0-100 scale)
  esgEnvironmental: number;
  esgSocial: number;
  esgGovernance: number;
}

interface FinancialRatios {
  profitability: {
    grossProfitMargin: number;
    operatingProfitMargin: number;
    netProfitMargin: number;
    returnOnAssets: number;
    returnOnEquity: number;
    earningsPerShare: number;
  };
  liquidity: {
    currentRatio: number;
    quickRatio: number;
    workingCapital: number;
  };
  leverage: {
    debtToAssetRatio: number;
    debtToEquityRatio: number;
    longTermDebtToEquityRatio: number;
    timesInterestEarned: number;
  };
  activity: {
    daysOfInventory: number;
    inventoryTurnover: number;
    averageCollectionPeriod: number;
  };
  other: {
    dividendYield: number;
    priceEarningsRatio: number;
    dividendPayoutRatio: number;
    internalCashFlow: number;
  };
  esgAdjusted: {
    adjustedROE: number;
    adjustedROA: number;
    esgRiskPremium: number;
    sustainabilityScore: number;
  };
}

interface RatioAnalysis {
  value: number;
  benchmark: string;
  assessment: "Excellent" | "Good" | "Fair" | "Poor";
  trend: "improving" | "stable" | "declining";
  recommendation: string;
}

export default function FinancialRatiosAnalysis() {
  const [inputs, setInputs] = useState<FinancialInputs>({
    revenue: 10000000,
    grossProfit: 4000000,
    operatingIncome: 2500000,
    netIncome: 1800000,
    interestExpense: 200000,
    taxes: 500000,
    sharesOutstanding: 1000000,
    dividendsPaid: 450000,
    totalAssets: 15000000,
    currentAssets: 5000000,
    inventory: 1500000,
    accountsReceivable: 1200000,
    currentLiabilities: 2000000,
    totalDebt: 6000000,
    longTermDebt: 4500000,
    shareholdersEquity: 9000000,
    sharePrice: 25.50,
    esgEnvironmental: 75,
    esgSocial: 80,
    esgGovernance: 85,
  });

  const [ratios, setRatios] = useState<FinancialRatios | null>(null);
  const [analysis, setAnalysis] = useState<Record<string, RatioAnalysis> | null>(null);
  const { toast } = useToast();

  const calculateRatios = () => {
    const newRatios: FinancialRatios = {
      profitability: {
        grossProfitMargin: (inputs.grossProfit / inputs.revenue) * 100,
        operatingProfitMargin: (inputs.operatingIncome / inputs.revenue) * 100,
        netProfitMargin: (inputs.netIncome / inputs.revenue) * 100,
        returnOnAssets: ((inputs.netIncome + inputs.interestExpense) / inputs.totalAssets) * 100,
        returnOnEquity: (inputs.netIncome / inputs.shareholdersEquity) * 100,
        earningsPerShare: inputs.netIncome / inputs.sharesOutstanding,
      },
      liquidity: {
        currentRatio: inputs.currentAssets / inputs.currentLiabilities,
        quickRatio: (inputs.currentAssets - inputs.inventory) / inputs.currentLiabilities,
        workingCapital: inputs.currentAssets - inputs.currentLiabilities,
      },
      leverage: {
        debtToAssetRatio: (inputs.totalDebt / inputs.totalAssets) * 100,
        debtToEquityRatio: inputs.totalDebt / inputs.shareholdersEquity,
        longTermDebtToEquityRatio: inputs.longTermDebt / inputs.shareholdersEquity,
        timesInterestEarned: inputs.operatingIncome / inputs.interestExpense,
      },
      activity: {
        daysOfInventory: (inputs.inventory / (inputs.revenue - inputs.grossProfit)) * 365,
        inventoryTurnover: (inputs.revenue - inputs.grossProfit) / inputs.inventory,
        averageCollectionPeriod: (inputs.accountsReceivable / inputs.revenue) * 365,
      },
      other: {
        dividendYield: (inputs.dividendsPaid / inputs.sharesOutstanding / inputs.sharePrice) * 100,
        priceEarningsRatio: inputs.sharePrice / (inputs.netIncome / inputs.sharesOutstanding),
        dividendPayoutRatio: (inputs.dividendsPaid / inputs.netIncome) * 100,
        internalCashFlow: inputs.netIncome + inputs.interestExpense + inputs.taxes,
      },
      esgAdjusted: {
        adjustedROE: 0,
        adjustedROA: 0,
        esgRiskPremium: 0,
        sustainabilityScore: 0,
      },
    };

    // Calculate ESG adjustments
    const overallESGScore = (inputs.esgEnvironmental + inputs.esgSocial + inputs.esgGovernance) / 3;
    const esgMultiplier = 1 + ((overallESGScore - 50) / 100) * 0.2; // ±20% adjustment based on ESG
    
    newRatios.esgAdjusted = {
      adjustedROE: newRatios.profitability.returnOnEquity * esgMultiplier,
      adjustedROA: newRatios.profitability.returnOnAssets * esgMultiplier,
      esgRiskPremium: (overallESGScore - 50) / 10, // Risk premium adjustment
      sustainabilityScore: overallESGScore,
    };

    setRatios(newRatios);
    generateAnalysis(newRatios);
  };

  const generateAnalysis = (ratios: FinancialRatios) => {
    const newAnalysis: Record<string, RatioAnalysis> = {
      grossProfitMargin: {
        value: ratios.profitability.grossProfitMargin,
        benchmark: "Industry average: 25-35%",
        assessment: ratios.profitability.grossProfitMargin >= 35 ? "Excellent" : 
                   ratios.profitability.grossProfitMargin >= 25 ? "Good" :
                   ratios.profitability.grossProfitMargin >= 15 ? "Fair" : "Poor",
        trend: "stable",
        recommendation: ratios.profitability.grossProfitMargin < 25 ? 
          "Focus on cost reduction and pricing optimization" : 
          "Maintain current operational efficiency"
      },
      currentRatio: {
        value: ratios.liquidity.currentRatio,
        benchmark: "Optimal range: 1.5-3.0",
        assessment: ratios.liquidity.currentRatio >= 2.0 ? "Excellent" :
                   ratios.liquidity.currentRatio >= 1.5 ? "Good" :
                   ratios.liquidity.currentRatio >= 1.0 ? "Fair" : "Poor",
        trend: "stable",
        recommendation: ratios.liquidity.currentRatio < 1.5 ? 
          "Improve liquidity management" : 
          "Strong liquidity position maintained"
      },
      returnOnEquity: {
        value: ratios.profitability.returnOnEquity,
        benchmark: "Target range: 12-15%",
        assessment: ratios.profitability.returnOnEquity >= 15 ? "Excellent" :
                   ratios.profitability.returnOnEquity >= 12 ? "Good" :
                   ratios.profitability.returnOnEquity >= 8 ? "Fair" : "Poor",
        trend: "improving",
        recommendation: ratios.profitability.returnOnEquity < 12 ? 
          "Review capital allocation and operational efficiency" : 
          "Strong returns for shareholders"
      }
    };

    setAnalysis(newAnalysis);
  };

  useEffect(() => {
    calculateRatios();
  }, [inputs]);

  const handleInputChange = (field: keyof FinancialInputs, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number, decimals: number = 1) => {
    return `${value.toFixed(decimals)}%`;
  };

  const formatNumber = (value: number, decimals: number = 2) => {
    return value.toFixed(decimals);
  };

  const getAssessmentColor = (assessment: string) => {
    switch (assessment) {
      case "Excellent": return "bg-green-100 text-green-800";
      case "Good": return "bg-blue-100 text-blue-800";
      case "Fair": return "bg-yellow-100 text-yellow-800";
      case "Poor": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Chart data for ratio comparisons
  const ratioComparisonData = ratios ? [
    { category: "ROE", standard: ratios.profitability.returnOnEquity, esgAdjusted: ratios.esgAdjusted.adjustedROE },
    { category: "ROA", standard: ratios.profitability.returnOnAssets, esgAdjusted: ratios.esgAdjusted.adjustedROA },
    { category: "Current Ratio", standard: ratios.liquidity.currentRatio * 10, esgAdjusted: ratios.liquidity.currentRatio * 10 }, // Scaled for visibility
    { category: "Debt/Equity", standard: ratios.leverage.debtToEquityRatio * 10, esgAdjusted: ratios.leverage.debtToEquityRatio * 10 },
  ] : [];

  return (
    <div className="space-y-6">
      {/* Professional Compliance Header */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Financial Ratio Analysis - Professional Investment Evaluation</strong><br />
          Comprehensive financial performance assessment including ESG impact analysis.<br />
          ⚠️ For professional use only. Ratios should be interpreted within industry context and economic conditions.
        </AlertDescription>
      </Alert>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Financial Ratios Analysis Dashboard
          </h3>
          <p className="text-sm text-muted-foreground">
            Comprehensive financial performance evaluation with ESG adjustments
          </p>
        </div>
        <Button onClick={calculateRatios} variant="outline">
          <Activity className="h-4 w-4 mr-2" />
          Recalculate Ratios
        </Button>
      </div>

      <Tabs defaultValue="inputs" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="inputs">Financial Inputs</TabsTrigger>
          <TabsTrigger value="profitability">Profitability</TabsTrigger>
          <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
          <TabsTrigger value="leverage">Leverage</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="esg-analysis">ESG Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Income Statement Inputs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Income Statement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="revenue">Revenue ($)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    value={inputs.revenue}
                    onChange={(e) => handleInputChange('revenue', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="grossProfit">Gross Profit ($)</Label>
                  <Input
                    id="grossProfit"
                    type="number"
                    value={inputs.grossProfit}
                    onChange={(e) => handleInputChange('grossProfit', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="operatingIncome">Operating Income ($)</Label>
                  <Input
                    id="operatingIncome"
                    type="number"
                    value={inputs.operatingIncome}
                    onChange={(e) => handleInputChange('operatingIncome', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="netIncome">Net Income ($)</Label>
                  <Input
                    id="netIncome"
                    type="number"
                    value={inputs.netIncome}
                    onChange={(e) => handleInputChange('netIncome', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="interestExpense">Interest Expense ($)</Label>
                  <Input
                    id="interestExpense"
                    type="number"
                    value={inputs.interestExpense}
                    onChange={(e) => handleInputChange('interestExpense', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Balance Sheet Inputs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Balance Sheet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="totalAssets">Total Assets ($)</Label>
                  <Input
                    id="totalAssets"
                    type="number"
                    value={inputs.totalAssets}
                    onChange={(e) => handleInputChange('totalAssets', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="currentAssets">Current Assets ($)</Label>
                  <Input
                    id="currentAssets"
                    type="number"
                    value={inputs.currentAssets}
                    onChange={(e) => handleInputChange('currentAssets', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="inventory">Inventory ($)</Label>
                  <Input
                    id="inventory"
                    type="number"
                    value={inputs.inventory}
                    onChange={(e) => handleInputChange('inventory', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="currentLiabilities">Current Liabilities ($)</Label>
                  <Input
                    id="currentLiabilities"
                    type="number"
                    value={inputs.currentLiabilities}
                    onChange={(e) => handleInputChange('currentLiabilities', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="totalDebt">Total Debt ($)</Label>
                  <Input
                    id="totalDebt"
                    type="number"
                    value={inputs.totalDebt}
                    onChange={(e) => handleInputChange('totalDebt', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* ESG Inputs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  ESG Factors (0-100)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="esgEnvironmental">Environmental Score</Label>
                  <Input
                    id="esgEnvironmental"
                    type="number"
                    min="0"
                    max="100"
                    value={inputs.esgEnvironmental}
                    onChange={(e) => handleInputChange('esgEnvironmental', e.target.value)}
                  />
                  <Progress value={inputs.esgEnvironmental} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="esgSocial">Social Score</Label>
                  <Input
                    id="esgSocial"
                    type="number"
                    min="0"
                    max="100"
                    value={inputs.esgSocial}
                    onChange={(e) => handleInputChange('esgSocial', e.target.value)}
                  />
                  <Progress value={inputs.esgSocial} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="esgGovernance">Governance Score</Label>
                  <Input
                    id="esgGovernance"
                    type="number"
                    min="0"
                    max="100"
                    value={inputs.esgGovernance}
                    onChange={(e) => handleInputChange('esgGovernance', e.target.value)}
                  />
                  <Progress value={inputs.esgGovernance} className="mt-1" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profitability" className="space-y-4">
          {ratios && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Gross Profit Margin</CardTitle>
                  {analysis && (
                    <Badge className={getAssessmentColor(analysis.grossProfitMargin?.assessment || "")}>
                      {analysis.grossProfitMargin?.assessment}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatPercentage(ratios.profitability.grossProfitMargin)}</p>
                  <p className="text-sm text-muted-foreground">
                    % of revenues available to cover operating expenses and yield a profit
                  </p>
                  <p className="text-xs text-green-600 mt-2">Higher is better, should trend up</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Operating Profit Margin</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatPercentage(ratios.profitability.operatingProfitMargin)}</p>
                  <p className="text-sm text-muted-foreground">
                    Profitability without interest charges and income taxes
                  </p>
                  <p className="text-xs text-green-600 mt-2">Higher is better, should trend up</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Net Profit Margin</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatPercentage(ratios.profitability.netProfitMargin)}</p>
                  <p className="text-sm text-muted-foreground">
                    After-tax profits per $ of sales
                  </p>
                  <p className="text-xs text-green-600 mt-2">Higher is better, should trend up</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Return on Total Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatPercentage(ratios.profitability.returnOnAssets)}</p>
                  <p className="text-sm text-muted-foreground">
                    Return on total investment in the enterprise
                  </p>
                  <p className="text-xs text-green-600 mt-2">Higher is better, should trend upward</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Return on Stockholders Equity</CardTitle>
                  {analysis && (
                    <Badge className={getAssessmentColor(analysis.returnOnEquity?.assessment || "")}>
                      {analysis.returnOnEquity?.assessment}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatPercentage(ratios.profitability.returnOnEquity)}</p>
                  <p className="text-sm text-muted-foreground">
                    Return stockholders earn on their investment
                  </p>
                  <p className="text-xs text-green-600 mt-2">12-15% range is average, should trend up</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Earnings per Share</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">${formatNumber(ratios.profitability.earningsPerShare)}</p>
                  <p className="text-sm text-muted-foreground">
                    Earnings for each share of common stock outstanding
                  </p>
                  <p className="text-xs text-green-600 mt-2">Should trend upward, bigger annual gains better</p>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="liquidity" className="space-y-4">
          {ratios && (
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Current Ratio</CardTitle>
                  {analysis && (
                    <Badge className={getAssessmentColor(analysis.currentRatio?.assessment || "")}>
                      {analysis.currentRatio?.assessment}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatNumber(ratios.liquidity.currentRatio)}</p>
                  <p className="text-sm text-muted-foreground">
                    Ability to pay current liabilities using near-term convertible assets
                  </p>
                  <p className="text-xs text-green-600 mt-2">Should definitely be higher than 1, ratios of 2+ are better</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatNumber(ratios.liquidity.quickRatio)}</p>
                  <p className="text-sm text-muted-foreground">
                    Ability to pay current liabilities without relying on inventory sales
                  </p>
                  <p className="text-xs text-green-600 mt-2">Higher values indicate better liquidity</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Working Capital</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatCurrency(ratios.liquidity.workingCapital)}</p>
                  <p className="text-sm text-muted-foreground">
                    Internal funds available for operations and growth
                  </p>
                  <p className="text-xs text-green-600 mt-2">Bigger amounts are better for operational flexibility</p>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="leverage" className="space-y-4">
          {ratios && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Debt-to-Asset Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatPercentage(ratios.leverage.debtToAssetRatio)}</p>
                  <p className="text-sm text-muted-foreground">
                    Extent to which borrowed funds finance operations
                  </p>
                  <p className="text-xs text-red-600 mt-2">Low fractions better - high indicates overuse of debt</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Debt-to-Equity Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatNumber(ratios.leverage.debtToEquityRatio)}</p>
                  <p className="text-sm text-muted-foreground">
                    Debt relative to equity financing
                  </p>
                  <p className="text-xs text-red-600 mt-2">Should be less than 1.0. Above 1.0 signals excessive debt</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Long-term Debt-to-Equity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatNumber(ratios.leverage.longTermDebtToEquityRatio)}</p>
                  <p className="text-sm text-muted-foreground">
                    Balance between debt and equity in long-term capital structure
                  </p>
                  <p className="text-xs text-green-600 mt-2">Low ratios indicate greater capacity to borrow</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Times Interest Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatNumber(ratios.leverage.timesInterestEarned)}</p>
                  <p className="text-sm text-muted-foreground">
                    Ability to pay annual interest charges
                  </p>
                  <p className="text-xs text-green-600 mt-2">Minimum 2.0, ratios above 3.0 signal better creditworthiness</p>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          {ratios && (
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Days of Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatNumber(ratios.activity.daysOfInventory, 0)} days</p>
                  <p className="text-sm text-muted-foreground">
                    Inventory management efficiency
                  </p>
                  <p className="text-xs text-green-600 mt-2">Fewer days of inventory are usually better</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Inventory Turnover</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatNumber(ratios.activity.inventoryTurnover)}x</p>
                  <p className="text-sm text-muted-foreground">
                    Number of inventory turns per year
                  </p>
                  <p className="text-xs text-green-600 mt-2">Higher is better</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Average Collection Period</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatNumber(ratios.activity.averageCollectionPeriod, 0)} days</p>
                  <p className="text-sm text-muted-foreground">
                    Wait time after sale to receive cash payment
                  </p>
                  <p className="text-xs text-green-600 mt-2">Quicker collection time is better</p>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="esg-analysis" className="space-y-4">
          {ratios && (
            <>
              {/* ESG Impact Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-4 w-4" />
                    ESG-Adjusted vs Standard Ratios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ratioComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="standard" fill="#3b82f6" name="Standard" />
                        <Bar dataKey="esgAdjusted" fill="#10b981" name="ESG Adjusted" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* ESG Metrics */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">ESG-Adjusted ROE</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatPercentage(ratios.esgAdjusted.adjustedROE)}</p>
                    <p className="text-sm text-muted-foreground">
                      vs {formatPercentage(ratios.profitability.returnOnEquity)} standard
                    </p>
                    <p className="text-xs text-blue-600 mt-2">ESG factors applied to return calculation</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">ESG-Adjusted ROA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatPercentage(ratios.esgAdjusted.adjustedROA)}</p>
                    <p className="text-sm text-muted-foreground">
                      vs {formatPercentage(ratios.profitability.returnOnAssets)} standard
                    </p>
                    <p className="text-xs text-blue-600 mt-2">Sustainability impact on asset returns</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">ESG Risk Premium</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatPercentage(ratios.esgAdjusted.esgRiskPremium)}</p>
                    <p className="text-sm text-muted-foreground">
                      Risk adjustment for ESG factors
                    </p>
                    <p className="text-xs text-blue-600 mt-2">Positive indicates reduced risk premium</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Sustainability Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatNumber(ratios.esgAdjusted.sustainabilityScore, 0)}/100</p>
                    <p className="text-sm text-muted-foreground">
                      Overall ESG performance
                    </p>
                    <Progress value={ratios.esgAdjusted.sustainabilityScore} className="mt-2" />
                  </CardContent>
                </Card>
              </div>

              {/* ESG Components Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>ESG Components Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium">Environmental</p>
                      <p className="text-xl font-bold">{inputs.esgEnvironmental}/100</p>
                      <Progress value={inputs.esgEnvironmental} className="mt-1" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Social</p>
                      <p className="text-xl font-bold">{inputs.esgSocial}/100</p>
                      <Progress value={inputs.esgSocial} className="mt-1" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Governance</p>
                      <p className="text-xl font-bold">{inputs.esgGovernance}/100</p>
                      <Progress value={inputs.esgGovernance} className="mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}