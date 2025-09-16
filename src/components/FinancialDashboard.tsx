import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  PieChart,
  Activity,
  AlertTriangle,
  TrendingDown,
  CheckCircle
} from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart as RechartsPieChart, 
  Cell,
  BarChart,
  Bar,
  Pie
} from "recharts";

interface DashboardData {
  totalRevenue: number;
  totalAssets: number;
  netProfit: number;
  roe: number;
  currentRatio: number;
  debtToEquity: number;
  recentMetrics: any[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const FinancialDashboard = () => {
  const { toast } = useToast();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalRevenue: 0,
    totalAssets: 0,
    netProfit: 0,
    roe: 0,
    currentRatio: 0,
    debtToEquity: 0,
    recentMetrics: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const { data: metrics, error } = await supabase
        .from('financial_metrics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12);

      if (error) throw error;

      if (metrics && metrics.length > 0) {
        const latest = metrics[0];
        const recentData = metrics.slice(0, 6).reverse();

        setDashboardData({
          totalRevenue: latest.sales || 0,
          totalAssets: latest.total_assets || 0,
          netProfit: latest.net_profit || 0,
          roe: latest.total_stockholders_equity > 0 ? (latest.net_profit / latest.total_stockholders_equity) * 100 : 0,
          currentRatio: latest.current_liabilities > 0 ? latest.current_assets / latest.current_liabilities : 0,
          debtToEquity: latest.total_stockholders_equity > 0 ? latest.total_liabilities / latest.total_stockholders_equity : 0,
          recentMetrics: recentData
        });
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getHealthScore = () => {
    let score = 0;
    if (dashboardData.currentRatio >= 1.5) score += 25;
    if (dashboardData.roe >= 10) score += 25;
    if (dashboardData.debtToEquity <= 1) score += 25;
    if (dashboardData.netProfit > 0) score += 25;
    return score;
  };

  const pieChartData = [
    { name: 'Assets', value: dashboardData.totalAssets },
    { name: 'Liabilities', value: dashboardData.totalAssets * 0.6 },
    { name: 'Equity', value: dashboardData.totalAssets * 0.4 }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          Financial Dashboard
        </h2>
        <p className="text-muted-foreground">
          Real-time overview of your financial performance and key metrics
        </p>
      </div>

      {/* Financial Health Score */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Financial Health Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{getHealthScore()}%</span>
              {getHealthScore() >= 75 ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-orange-500" />
              )}
            </div>
            <Badge variant={getHealthScore() >= 75 ? "default" : "secondary"}>
              {getHealthScore() >= 75 ? "Excellent" : getHealthScore() >= 50 ? "Good" : "Needs Attention"}
            </Badge>
          </div>
          <Progress value={getHealthScore()} className="h-3" />
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(dashboardData.totalRevenue)}</div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>Current period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Net Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(dashboardData.netProfit)}</div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              {dashboardData.netProfit >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span>{dashboardData.netProfit >= 0 ? "Profitable" : "Loss"}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-purple-500" />
              ROE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.roe.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Return on Equity</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-orange-500" />
              Current Ratio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.currentRatio.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">
              {dashboardData.currentRatio >= 1.5 ? "Healthy" : "Monitor"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData.recentMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="period_end" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip 
                    formatter={(value: any) => [formatCurrency(value), 'Revenue']}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Tooltip formatter={(value: any) => formatCurrency(value)} />
                  <Pie 
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={loadDashboardData} variant="outline">
              <Activity className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline">
              <PieChart className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Export Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};