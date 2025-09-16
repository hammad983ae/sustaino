import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Calculator, 
  TrendingUp, 
  Activity, 
  Zap,
  Shield,
  Target,
  BarChart3,
  PieChart
} from "lucide-react";

interface FinancialRatio {
  id: string;
  current_ratio: number;
  quick_ratio: number;
  debt_to_equity_ratio: number;
  return_on_assets: number;
  return_on_stockholders_equity: number;
  gross_profit_margin: number;
  net_profit_margin: number;
  operating_profit_margin: number;
  earnings_per_share: number;
  working_capital: number;
  debt_to_total_assets_ratio: number;
  times_interest_earned_ratio: number;
  inventory_turnover: number;
  accounts_receivable_turnover: number;
  price_earnings_ratio: number;
  created_at: string;
}

export const FinancialRatiosDisplay = () => {
  const { toast } = useToast();
  const [ratios, setRatios] = useState<FinancialRatio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRatios();
  }, []);

  const loadRatios = async () => {
    try {
      const { data, error } = await supabase
        .from('financial_ratios')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setRatios(data || []);
    } catch (error) {
      console.error('Error loading ratios:', error);
      toast({
        title: "Error",
        description: "Failed to load financial ratios",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getRatioStatus = (value: number, benchmarks: { good: number; poor: number }, higher_is_better: boolean = true) => {
    if (higher_is_better) {
      if (value >= benchmarks.good) return { status: "excellent", color: "bg-green-500" };
      if (value >= benchmarks.poor) return { status: "good", color: "bg-yellow-500" };
      return { status: "poor", color: "bg-red-500" };
    } else {
      if (value <= benchmarks.good) return { status: "excellent", color: "bg-green-500" };
      if (value <= benchmarks.poor) return { status: "good", color: "bg-yellow-500" };
      return { status: "poor", color: "bg-red-500" };
    }
  };

  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;
  const formatNumber = (value: number) => value.toFixed(2);
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading Financial Ratios...</h2>
        </div>
      </div>
    );
  }

  if (ratios.length === 0) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">No Financial Ratios Available</h2>
        <p className="text-muted-foreground">Input financial metrics first to see calculated ratios.</p>
      </div>
    );
  }

  const latestRatio = ratios[0];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Calculator className="h-8 w-8 text-primary" />
          Financial Ratios Analysis
        </h2>
        <p className="text-muted-foreground">
          Comprehensive ratio analysis based on your financial metrics
        </p>
      </div>

      <Tabs defaultValue="liquidity" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
          <TabsTrigger value="profitability">Profitability</TabsTrigger>
          <TabsTrigger value="leverage">Leverage</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Liquidity Ratios */}
        <TabsContent value="liquidity" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  Current Ratio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(latestRatio.current_ratio)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`h-2 w-2 rounded-full ${getRatioStatus(latestRatio.current_ratio, { good: 2, poor: 1.5 }).color}`} />
                  <span className="text-sm text-muted-foreground">
                    {getRatioStatus(latestRatio.current_ratio, { good: 2, poor: 1.5 }).status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Current Assets ÷ Current Liabilities
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-500" />
                  Quick Ratio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(latestRatio.quick_ratio)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`h-2 w-2 rounded-full ${getRatioStatus(latestRatio.quick_ratio, { good: 1.5, poor: 1 }).color}`} />
                  <span className="text-sm text-muted-foreground">
                    {getRatioStatus(latestRatio.quick_ratio, { good: 1.5, poor: 1 }).status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  (Current Assets - Inventory) ÷ Current Liabilities
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-purple-500" />
                  Working Capital
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(latestRatio.working_capital)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`h-2 w-2 rounded-full ${latestRatio.working_capital > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm text-muted-foreground">
                    {latestRatio.working_capital > 0 ? "Positive" : "Negative"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Current Assets - Current Liabilities
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profitability Ratios */}
        <TabsContent value="profitability" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  Gross Profit Margin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPercentage(latestRatio.gross_profit_margin)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`h-2 w-2 rounded-full ${getRatioStatus(latestRatio.gross_profit_margin, { good: 40, poor: 20 }).color}`} />
                  <span className="text-sm text-muted-foreground">
                    {getRatioStatus(latestRatio.gross_profit_margin, { good: 40, poor: 20 }).status}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  Net Profit Margin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPercentage(latestRatio.net_profit_margin)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`h-2 w-2 rounded-full ${getRatioStatus(latestRatio.net_profit_margin, { good: 10, poor: 5 }).color}`} />
                  <span className="text-sm text-muted-foreground">
                    {getRatioStatus(latestRatio.net_profit_margin, { good: 10, poor: 5 }).status}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4 text-purple-500" />
                  ROA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPercentage(latestRatio.return_on_assets)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`h-2 w-2 rounded-full ${getRatioStatus(latestRatio.return_on_assets, { good: 15, poor: 5 }).color}`} />
                  <span className="text-sm text-muted-foreground">
                    {getRatioStatus(latestRatio.return_on_assets, { good: 15, poor: 5 }).status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Return on Assets</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <PieChart className="h-4 w-4 text-orange-500" />
                  ROE
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPercentage(latestRatio.return_on_stockholders_equity)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`h-2 w-2 rounded-full ${getRatioStatus(latestRatio.return_on_stockholders_equity, { good: 20, poor: 10 }).color}`} />
                  <span className="text-sm text-muted-foreground">
                    {getRatioStatus(latestRatio.return_on_stockholders_equity, { good: 20, poor: 10 }).status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Return on Equity</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-red-500" />
                  EPS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(latestRatio.earnings_per_share)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`h-2 w-2 rounded-full ${latestRatio.earnings_per_share > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm text-muted-foreground">
                    {latestRatio.earnings_per_share > 0 ? "Positive" : "Negative"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Earnings per Share</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Leverage Ratios */}
        <TabsContent value="leverage" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  Debt-to-Equity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(latestRatio.debt_to_equity_ratio)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`h-2 w-2 rounded-full ${getRatioStatus(latestRatio.debt_to_equity_ratio, { good: 0.5, poor: 1 }, false).color}`} />
                  <span className="text-sm text-muted-foreground">
                    {getRatioStatus(latestRatio.debt_to_equity_ratio, { good: 0.5, poor: 1 }, false).status}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-purple-500" />
                  Debt-to-Assets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPercentage(latestRatio.debt_to_total_assets_ratio)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`h-2 w-2 rounded-full ${getRatioStatus(latestRatio.debt_to_total_assets_ratio, { good: 30, poor: 60 }, false).color}`} />
                  <span className="text-sm text-muted-foreground">
                    {getRatioStatus(latestRatio.debt_to_total_assets_ratio, { good: 30, poor: 60 }, false).status}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  Interest Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(latestRatio.times_interest_earned_ratio)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`h-2 w-2 rounded-full ${getRatioStatus(latestRatio.times_interest_earned_ratio, { good: 5, poor: 2.5 }).color}`} />
                  <span className="text-sm text-muted-foreground">
                    {getRatioStatus(latestRatio.times_interest_earned_ratio, { good: 5, poor: 2.5 }).status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Times Interest Earned</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Ratios */}
        <TabsContent value="activity" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-500" />
                  Inventory Turnover
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(latestRatio.inventory_turnover)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`h-2 w-2 rounded-full ${getRatioStatus(latestRatio.inventory_turnover, { good: 6, poor: 3 }).color}`} />
                  <span className="text-sm text-muted-foreground">
                    {getRatioStatus(latestRatio.inventory_turnover, { good: 6, poor: 3 }).status}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  A/R Turnover
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(latestRatio.accounts_receivable_turnover)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`h-2 w-2 rounded-full ${getRatioStatus(latestRatio.accounts_receivable_turnover, { good: 12, poor: 6 }).color}`} />
                  <span className="text-sm text-muted-foreground">
                    {getRatioStatus(latestRatio.accounts_receivable_turnover, { good: 12, poor: 6 }).status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Accounts Receivable Turnover</p>
              </CardContent>
            </Card>

            {latestRatio.price_earnings_ratio > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Target className="h-4 w-4 text-purple-500" />
                    P/E Ratio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatNumber(latestRatio.price_earnings_ratio)}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`h-2 w-2 rounded-full ${getRatioStatus(latestRatio.price_earnings_ratio, { good: 15, poor: 25 }, false).color}`} />
                    <span className="text-sm text-muted-foreground">
                      {getRatioStatus(latestRatio.price_earnings_ratio, { good: 15, poor: 25 }, false).status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Price-to-Earnings Ratio</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <Button onClick={loadRatios} variant="outline">
          <Calculator className="h-4 w-4 mr-2" />
          Refresh Ratios
        </Button>
      </div>
    </div>
  );
};