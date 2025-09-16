import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  DollarSign, 
  TrendingUp, 
  Building2, 
  Calculator,
  BarChart3,
  Activity,
  Leaf,
  Save
} from "lucide-react";

interface FinancialMetrics {
  companyName?: string;
  periodStart: string;
  periodEnd: string;
  sales: number;
  cogs: number;
  grossProfit: number;
  operatingIncome: number;
  ebit: number;
  interestExpense: number;
  netProfit: number;
  depreciation?: number;
  totalAssets: number;
  currentAssets: number;
  inventory: number;
  accountsReceivable: number;
  totalLiabilities: number;
  currentLiabilities: number;
  longTermDebt: number;
  totalStockholdersEquity: number;
  operatingCashFlow?: number;
  investingCashFlow?: number;
  financingCashFlow?: number;
  commonStockOutstanding: number;
  annualDividendsPerShare?: number;
  currentMarketPricePerShare?: number;
  ghgEmissionsTons?: number;
  waterUsageMl?: number;
  wasteRecycledPercentage?: number;
  renewableEnergyPercentage?: number;
  biodiversityScore?: number;
  communityInvestment?: number;
}

export const FinancialMetricsForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<FinancialMetrics>({
    periodStart: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
    periodEnd: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0],
    sales: 0,
    cogs: 0,
    grossProfit: 0,
    operatingIncome: 0,
    ebit: 0,
    interestExpense: 0,
    netProfit: 0,
    totalAssets: 0,
    currentAssets: 0,
    inventory: 0,
    accountsReceivable: 0,
    totalLiabilities: 0,
    currentLiabilities: 0,
    longTermDebt: 0,
    totalStockholdersEquity: 0,
    commonStockOutstanding: 0,
  });

  useEffect(() => {
    setMetrics(prev => ({
      ...prev,
      grossProfit: prev.sales - prev.cogs,
    }));
  }, [metrics.sales, metrics.cogs]);

  const handleInputChange = (field: keyof FinancialMetrics, value: string | number) => {
    setMetrics(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? (isNaN(Number(value)) ? value : Number(value)) : value
    }));
  };

  const saveMetrics = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to save financial metrics",
          variant: "destructive",
        });
        return;
      }

      const formData = {
        period_start: metrics.periodStart,
        period_end: metrics.periodEnd,
        sales: metrics.sales,
        gross_profit: metrics.grossProfit,
        operating_income: metrics.operatingIncome,
        net_profit: metrics.netProfit,
        total_assets: metrics.totalAssets,
        current_assets: metrics.currentAssets,
        inventory: metrics.inventory,
        accounts_receivable: metrics.accountsReceivable,
        current_liabilities: metrics.currentLiabilities,
        total_liabilities: metrics.totalLiabilities,
        total_stockholders_equity: metrics.totalStockholdersEquity,
        long_term_debt: metrics.longTermDebt,
        ebit: metrics.ebit,
        interest_expense: metrics.interestExpense,
        cogs: metrics.cogs,
        common_stock_outstanding: metrics.commonStockOutstanding,
        annual_dividends_per_share: metrics.annualDividendsPerShare,
        current_market_price_per_share: metrics.currentMarketPricePerShare,
        depreciation: metrics.depreciation,
        ghg_emissions_tons: metrics.ghgEmissionsTons,
        water_usage_ml: metrics.waterUsageMl,
        waste_recycled_percentage: metrics.wasteRecycledPercentage,
        renewable_energy_percentage: metrics.renewableEnergyPercentage,
        biodiversity_score: metrics.biodiversityScore,
        community_investment: metrics.communityInvestment,
        user_id: user.id
      };

      const { data, error } = await supabase
        .from('financial_metrics')
        .insert([formData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Financial metrics saved successfully",
      });

      await generateRatios(data.id);

    } catch (error) {
      console.error('Error saving metrics:', error);
      toast({
        title: "Error",
        description: "Failed to save financial metrics",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateRatios = async (metricsId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const ratios = {
        current_ratio: metrics.currentAssets / metrics.currentLiabilities || 0,
        quick_ratio: (metrics.currentAssets - metrics.inventory) / metrics.currentLiabilities || 0,
        debt_to_equity_ratio: metrics.totalLiabilities / metrics.totalStockholdersEquity || 0,
        return_on_assets: (metrics.netProfit / metrics.totalAssets) * 100 || 0,
        return_on_stockholders_equity: (metrics.netProfit / metrics.totalStockholdersEquity) * 100 || 0,
        gross_profit_margin: (metrics.grossProfit / metrics.sales) * 100 || 0,
        net_profit_margin: (metrics.netProfit / metrics.sales) * 100 || 0,
        operating_profit_margin: (metrics.operatingIncome / metrics.sales) * 100 || 0,
        earnings_per_share: metrics.netProfit / metrics.commonStockOutstanding || 0,
        working_capital: metrics.currentAssets - metrics.currentLiabilities,
        debt_to_total_assets_ratio: (metrics.totalLiabilities / metrics.totalAssets) * 100 || 0,
        times_interest_earned_ratio: metrics.ebit / metrics.interestExpense || 0,
        inventory_turnover: metrics.cogs / metrics.inventory || 0,
        accounts_receivable_turnover: metrics.sales / metrics.accountsReceivable || 0,
        price_earnings_ratio: metrics.currentMarketPricePerShare ? (metrics.currentMarketPricePerShare / (metrics.netProfit / metrics.commonStockOutstanding)) : 0,
      };

      const { error } = await supabase
        .from('financial_ratios')
        .insert([{
          metrics_id: metricsId,
          user_id: user.id,
          ...ratios
        }]);

      if (error) throw error;

      toast({
        title: "Ratios Generated",
        description: "Financial ratios calculated and saved automatically",
      });

    } catch (error) {
      console.error('Error generating ratios:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Calculator className="h-8 w-8 text-primary" />
          Financial Metrics Input
        </h2>
        <p className="text-muted-foreground">
          Enter comprehensive financial data for analysis and reporting
        </p>
      </div>

      {/* Company & Period Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company & Reporting Period
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Company Name (Optional)</Label>
            <Input
              value={metrics.companyName || ''}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="Company Name"
            />
          </div>
          <div>
            <Label>Period Start</Label>
            <Input
              type="date"
              value={metrics.periodStart}
              onChange={(e) => handleInputChange('periodStart', e.target.value)}
            />
          </div>
          <div>
            <Label>Period End</Label>
            <Input
              type="date"
              value={metrics.periodEnd}
              onChange={(e) => handleInputChange('periodEnd', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Income Statement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Income Statement
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label>Sales Revenue</Label>
            <Input
              type="number"
              value={metrics.sales}
              onChange={(e) => handleInputChange('sales', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Cost of Goods Sold (COGS)</Label>
            <Input
              type="number"
              value={metrics.cogs}
              onChange={(e) => handleInputChange('cogs', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Gross Profit (Auto-calculated)</Label>
            <Input
              type="number"
              value={metrics.grossProfit}
              disabled
              className="bg-muted"
            />
          </div>
          <div>
            <Label>Operating Income</Label>
            <Input
              type="number"
              value={metrics.operatingIncome}
              onChange={(e) => handleInputChange('operatingIncome', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>EBIT</Label>
            <Input
              type="number"
              value={metrics.ebit}
              onChange={(e) => handleInputChange('ebit', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Interest Expense</Label>
            <Input
              type="number"
              value={metrics.interestExpense}
              onChange={(e) => handleInputChange('interestExpense', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Net Profit</Label>
            <Input
              type="number"
              value={metrics.netProfit}
              onChange={(e) => handleInputChange('netProfit', e.target.value)}
              placeholder="0"
            />
          </div>
        </CardContent>
      </Card>

      {/* Balance Sheet */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Balance Sheet
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label>Total Assets</Label>
            <Input
              type="number"
              value={metrics.totalAssets}
              onChange={(e) => handleInputChange('totalAssets', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Current Assets</Label>
            <Input
              type="number"
              value={metrics.currentAssets}
              onChange={(e) => handleInputChange('currentAssets', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Inventory</Label>
            <Input
              type="number"
              value={metrics.inventory}
              onChange={(e) => handleInputChange('inventory', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Accounts Receivable</Label>
            <Input
              type="number"
              value={metrics.accountsReceivable}
              onChange={(e) => handleInputChange('accountsReceivable', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Total Liabilities</Label>
            <Input
              type="number"
              value={metrics.totalLiabilities}
              onChange={(e) => handleInputChange('totalLiabilities', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Current Liabilities</Label>
            <Input
              type="number"
              value={metrics.currentLiabilities}
              onChange={(e) => handleInputChange('currentLiabilities', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Long-term Debt</Label>
            <Input
              type="number"
              value={metrics.longTermDebt}
              onChange={(e) => handleInputChange('longTermDebt', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Total Stockholders' Equity</Label>
            <Input
              type="number"
              value={metrics.totalStockholdersEquity}
              onChange={(e) => handleInputChange('totalStockholdersEquity', e.target.value)}
              placeholder="0"
            />
          </div>
        </CardContent>
      </Card>

      {/* Share Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Share Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Common Stock Outstanding</Label>
            <Input
              type="number"
              value={metrics.commonStockOutstanding}
              onChange={(e) => handleInputChange('commonStockOutstanding', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Annual Dividends Per Share (Optional)</Label>
            <Input
              type="number"
              step="0.01"
              value={metrics.annualDividendsPerShare || ''}
              onChange={(e) => handleInputChange('annualDividendsPerShare', e.target.value)}
              placeholder="0.00"
            />
          </div>
          <div>
            <Label>Current Market Price Per Share (Optional)</Label>
            <Input
              type="number"
              step="0.01"
              value={metrics.currentMarketPricePerShare || ''}
              onChange={(e) => handleInputChange('currentMarketPricePerShare', e.target.value)}
              placeholder="0.00"
            />
          </div>
        </CardContent>
      </Card>

      {/* ESG Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            ESG Metrics (Optional)
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label>GHG Emissions (Tons CO2e)</Label>
            <Input
              type="number"
              value={metrics.ghgEmissionsTons || ''}
              onChange={(e) => handleInputChange('ghgEmissionsTons', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Water Usage (ML)</Label>
            <Input
              type="number"
              value={metrics.waterUsageMl || ''}
              onChange={(e) => handleInputChange('waterUsageMl', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Waste Recycled (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={metrics.wasteRecycledPercentage || ''}
              onChange={(e) => handleInputChange('wasteRecycledPercentage', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Renewable Energy (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={metrics.renewableEnergyPercentage || ''}
              onChange={(e) => handleInputChange('renewableEnergyPercentage', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Biodiversity Score</Label>
            <Input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={metrics.biodiversityScore || ''}
              onChange={(e) => handleInputChange('biodiversityScore', e.target.value)}
              placeholder="0.0"
            />
          </div>
          <div>
            <Label>Community Investment</Label>
            <Input
              type="number"
              value={metrics.communityInvestment || ''}
              onChange={(e) => handleInputChange('communityInvestment', e.target.value)}
              placeholder="0"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button 
          onClick={saveMetrics}
          disabled={isLoading}
          size="lg"
          className="px-8"
        >
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Saving..." : "Save Financial Metrics"}
        </Button>
      </div>
    </div>
  );
};