import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart as PieChartIcon,
  Calculator, Building, Users, Globe, ArrowLeft, Download, FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FinancialReport = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [esgView, setEsgView] = useState<'inclusive' | 'exclusive' | 'comparison'>('comparison');

  // Financial data with and without ESG considerations
  const financialData = useMemo(() => ({
    annual: [
      { year: '2020', 
        revenueExclusive: 485.2, revenueInclusive: 478.8,
        profitExclusive: 62.3, profitInclusive: 59.1,
        assetsExclusive: 892.1, assetsInclusive: 885.7,
        esgScore: 65
      },
      { year: '2021', 
        revenueExclusive: 512.7, revenueInclusive: 518.4,
        profitExclusive: 71.8, profitInclusive: 76.2,
        assetsExclusive: 934.5, assetsInclusive: 948.3,
        esgScore: 72
      },
      { year: '2022', 
        revenueExclusive: 587.3, revenueInclusive: 602.1,
        profitExclusive: 89.4, profitInclusive: 97.8,
        assetsExclusive: 1021.8, assetsInclusive: 1045.2,
        esgScore: 78
      },
      { year: '2023', 
        revenueExclusive: 634.9, revenueInclusive: 658.7,
        profitExclusive: 102.7, profitInclusive: 115.3,
        assetsExclusive: 1156.3, assetsInclusive: 1189.4,
        esgScore: 83
      },
      { year: '2024', 
        revenueExclusive: 698.1, revenueInclusive: 731.2,
        profitExclusive: 118.9, profitInclusive: 134.6,
        assetsExclusive: 1289.7, assetsInclusive: 1334.8,
        esgScore: 87
      }
    ],
    ratios: {
      exclusive: {
        roe: 9.2, roa: 7.8, currentRatio: 1.4, debtToEquity: 0.65, 
        grossMargin: 42.3, netMargin: 17.0, assetTurnover: 0.54
      },
      inclusive: {
        roe: 10.1, roa: 8.4, currentRatio: 1.6, debtToEquity: 0.58, 
        grossMargin: 45.1, netMargin: 18.4, assetTurnover: 0.58
      }
    },
    sectors: [
      { name: 'Technology', exclusive: 28.5, inclusive: 32.1, esgImpact: '+12.6%' },
      { name: 'Healthcare', exclusive: 22.3, inclusive: 25.8, esgImpact: '+15.7%' },
      { name: 'Finance', exclusive: 18.7, inclusive: 19.2, esgImpact: '+2.7%' },
      { name: 'Energy', exclusive: 15.2, inclusive: 12.4, esgImpact: '-18.4%' },
      { name: 'Manufacturing', exclusive: 15.3, inclusive: 10.5, esgImpact: '-31.4%' }
    ]
  }), []);

  const riskMetrics = [
    { category: 'Climate Risk', exclusive: 85, inclusive: 45, improvement: '47%' },
    { category: 'Regulatory Risk', exclusive: 72, inclusive: 38, improvement: '47%' },
    { category: 'Reputation Risk', exclusive: 68, inclusive: 25, improvement: '63%' },
    { category: 'Operational Risk', exclusive: 55, inclusive: 42, improvement: '24%' }
  ];

  const esgMetrics = [
    { category: 'Environmental', score: 88, weight: 40, impact: '+8.2%' },
    { category: 'Social', score: 85, weight: 35, impact: '+6.7%' },
    { category: 'Governance', score: 91, weight: 25, impact: '+4.1%' }
  ];

  const COLORS = {
    primary: 'hsl(var(--primary))',
    success: 'hsl(var(--success))',
    warning: 'hsl(var(--warning))',
    destructive: 'hsl(var(--destructive))',
    info: 'hsl(var(--info))',
    muted: 'hsl(var(--muted))'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="space-y-2">
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2 mb-4">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                  ESG Financial Impact Report
                </h1>
                <p className="text-lg text-muted-foreground">
                  Comprehensive Analysis: ESG-Inclusive vs ESG-Exclusive Performance
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* ESG View Toggle */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Analysis Perspective</h3>
                <p className="text-sm text-muted-foreground">
                  Compare financial performance with and without ESG considerations
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={esgView === 'exclusive' ? 'default' : 'outline'}
                  onClick={() => setEsgView('exclusive')}
                  size="sm"
                >
                  ESG Exclusive
                </Button>
                <Button 
                  variant={esgView === 'comparison' ? 'default' : 'outline'}
                  onClick={() => setEsgView('comparison')}
                  size="sm"
                >
                  Comparison View
                </Button>
                <Button 
                  variant={esgView === 'inclusive' ? 'default' : 'outline'}
                  onClick={() => setEsgView('inclusive')}
                  size="sm"
                >
                  ESG Inclusive
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Revenue Growth</span>
              </div>
              <p className="text-2xl font-bold text-success">
                {esgView === 'inclusive' ? '+4.7%' : esgView === 'exclusive' ? '+9.9%' : '+4.7%'}
              </p>
              <p className="text-sm text-muted-foreground">
                ESG Impact: {esgView === 'comparison' ? '+4.7% vs +9.9%' : '2024 YoY'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-info/10 to-info/5 border-info/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-info" />
                <span className="text-sm font-medium">Net Profit Margin</span>
              </div>
              <p className="text-2xl font-bold text-info">
                {esgView === 'inclusive' ? '18.4%' : esgView === 'exclusive' ? '17.0%' : '18.4%'}
              </p>
              <p className="text-sm text-muted-foreground">
                ESG Impact: {esgView === 'comparison' ? '+1.4pp improvement' : '2024'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">ROE</span>
              </div>
              <p className="text-2xl font-bold text-warning">
                {esgView === 'inclusive' ? '10.1%' : esgView === 'exclusive' ? '9.2%' : '10.1%'}
              </p>
              <p className="text-sm text-muted-foreground">
                ESG Impact: {esgView === 'comparison' ? '+0.9pp improvement' : '2024'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">ESG Score</span>
              </div>
              <p className="text-2xl font-bold text-primary">87</p>
              <p className="text-sm text-muted-foreground">+4pts vs 2023</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analysis Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="ratios">Financial Ratios</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="sectors">Sector Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 5-Year Revenue Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    5-Year Revenue Comparison
                  </CardTitle>
                  <CardDescription>
                    Revenue performance with and without ESG considerations ($M)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={financialData.annual}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" />
                      <XAxis dataKey="year" stroke="hsl(var(--foreground))" />
                      <YAxis stroke="hsl(var(--foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      {(esgView === 'exclusive' || esgView === 'comparison') && (
                        <Line 
                          type="monotone" 
                          dataKey="revenueExclusive" 
                          stroke={COLORS.destructive}
                          strokeWidth={2}
                          name="ESG Exclusive"
                        />
                      )}
                      {(esgView === 'inclusive' || esgView === 'comparison') && (
                        <Line 
                          type="monotone" 
                          dataKey="revenueInclusive" 
                          stroke={COLORS.success}
                          strokeWidth={2}
                          name="ESG Inclusive"
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Profit Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-success" />
                    Net Profit Comparison
                  </CardTitle>
                  <CardDescription>
                    Profit margins and ESG impact analysis ($M)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={financialData.annual}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" />
                      <XAxis dataKey="year" stroke="hsl(var(--foreground))" />
                      <YAxis stroke="hsl(var(--foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      {(esgView === 'exclusive' || esgView === 'comparison') && (
                        <Bar dataKey="profitExclusive" fill={COLORS.warning} name="ESG Exclusive" />
                      )}
                      {(esgView === 'inclusive' || esgView === 'comparison') && (
                        <Bar dataKey="profitInclusive" fill={COLORS.success} name="ESG Inclusive" />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* ESG Score Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    ESG Score Evolution
                  </CardTitle>
                  <CardDescription>
                    ESG performance improvement over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={financialData.annual}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" />
                      <XAxis dataKey="year" stroke="hsl(var(--foreground))" />
                      <YAxis stroke="hsl(var(--foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="esgScore" 
                        stroke={COLORS.primary}
                        fill={COLORS.primary}
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* ESG Component Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5 text-info" />
                    ESG Component Analysis
                  </CardTitle>
                  <CardDescription>
                    Environmental, Social, and Governance impact breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {esgMetrics.map((metric, index) => (
                      <div key={metric.category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{metric.category}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{metric.score}/100</Badge>
                            <Badge variant="secondary" className="text-success">
                              {metric.impact}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={metric.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Asset Growth */}
              <Card>
                <CardHeader>
                  <CardTitle>Total Assets Growth</CardTitle>
                  <CardDescription>Asset base expansion with ESG considerations ($M)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={financialData.annual}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" />
                      <XAxis dataKey="year" stroke="hsl(var(--foreground))" />
                      <YAxis stroke="hsl(var(--foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      {(esgView === 'exclusive' || esgView === 'comparison') && (
                        <Area 
                          type="monotone" 
                          dataKey="assetsExclusive" 
                          stackId="1"
                          stroke={COLORS.warning}
                          fill={COLORS.warning}
                          fillOpacity={0.6}
                          name="ESG Exclusive"
                        />
                      )}
                      {(esgView === 'inclusive' || esgView === 'comparison') && (
                        <Area 
                          type="monotone" 
                          dataKey="assetsInclusive" 
                          stackId="2"
                          stroke={COLORS.success}
                          fill={COLORS.success}
                          fillOpacity={0.6}
                          name="ESG Inclusive"
                        />
                      )}
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Performance Metrics Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Performance Indicators</CardTitle>
                  <CardDescription>2024 financial metrics comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                      <span>Metric</span>
                      <span>ESG Exclusive</span>
                      <span>ESG Inclusive</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4 items-center">
                        <span className="font-medium">Revenue ($M)</span>
                        <span>698.1</span>
                        <span className="text-success font-semibold">731.2</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 items-center">
                        <span className="font-medium">Net Profit ($M)</span>
                        <span>118.9</span>
                        <span className="text-success font-semibold">134.6</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 items-center">
                        <span className="font-medium">Total Assets ($M)</span>
                        <span>1,289.7</span>
                        <span className="text-success font-semibold">1,334.8</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 items-center">
                        <span className="font-medium">Profit Margin</span>
                        <span>17.0%</span>
                        <span className="text-success font-semibold">18.4%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ratios" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Financial Ratios Radar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Financial Ratios Comparison</CardTitle>
                  <CardDescription>Multi-dimensional ratio analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <RadarChart data={[
                      { ratio: 'ROE', exclusive: 9.2, inclusive: 10.1, fullMark: 15 },
                      { ratio: 'ROA', exclusive: 7.8, inclusive: 8.4, fullMark: 12 },
                      { ratio: 'Current Ratio', exclusive: 1.4, inclusive: 1.6, fullMark: 2.5 },
                      { ratio: 'Asset Turnover', exclusive: 0.54, inclusive: 0.58, fullMark: 1 },
                      { ratio: 'Gross Margin', exclusive: 42.3, inclusive: 45.1, fullMark: 60 },
                      { ratio: 'Net Margin', exclusive: 17.0, inclusive: 18.4, fullMark: 25 }
                    ]}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="ratio" />
                      <PolarRadiusAxis angle={90} domain={[0, 'dataMax']} />
                      <Radar 
                        name="ESG Exclusive" 
                        dataKey="exclusive" 
                        stroke={COLORS.warning} 
                        fill={COLORS.warning} 
                        fillOpacity={0.3} 
                      />
                      <Radar 
                        name="ESG Inclusive" 
                        dataKey="inclusive" 
                        stroke={COLORS.success} 
                        fill={COLORS.success} 
                        fillOpacity={0.3} 
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Detailed Ratios */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Financial Ratios</CardTitle>
                  <CardDescription>2024 ratio analysis with ESG impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(financialData.ratios.exclusive).map(([key, exclusiveValue]) => {
                      const inclusiveValue = financialData.ratios.inclusive[key as keyof typeof financialData.ratios.inclusive];
                      const improvement = ((inclusiveValue - exclusiveValue) / exclusiveValue * 100);
                      
                      return (
                        <div key={key} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium capitalize">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </h4>
                            <Badge 
                              variant={improvement > 0 ? "default" : "secondary"}
                              className={improvement > 0 ? "bg-success text-success-foreground" : ""}
                            >
                              {improvement > 0 ? '+' : ''}{improvement.toFixed(1)}%
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">ESG Exclusive:</span>
                              <div className="font-semibold">{exclusiveValue}%</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">ESG Inclusive:</span>
                              <div className="font-semibold text-success">{inclusiveValue}%</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-destructive" />
                    Risk Mitigation Analysis
                  </CardTitle>
                  <CardDescription>
                    Risk reduction through ESG integration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {riskMetrics.map((risk, index) => (
                      <div key={risk.category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{risk.category}</span>
                          <Badge variant="outline" className="text-success">
                            -{risk.improvement} risk
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm text-muted-foreground">ESG Exclusive</span>
                            <Progress value={risk.exclusive} className="mt-1" />
                            <span className="text-xs text-destructive">{risk.exclusive}% risk</span>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">ESG Inclusive</span>
                            <Progress value={risk.inclusive} className="mt-1" />
                            <span className="text-xs text-success">{risk.inclusive}% risk</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Risk Comparison Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Profile Comparison</CardTitle>
                  <CardDescription>Risk levels with and without ESG</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={riskMetrics} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" />
                      <XAxis type="number" stroke="hsl(var(--foreground))" />
                      <YAxis dataKey="category" type="category" stroke="hsl(var(--foreground))" width={100} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="exclusive" fill={COLORS.destructive} name="ESG Exclusive" />
                      <Bar dataKey="inclusive" fill={COLORS.success} name="ESG Inclusive" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sectors" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sector Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Sector-wise ESG Impact</CardTitle>
                  <CardDescription>Performance by business sector (%)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={financialData.sectors}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" />
                      <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
                      <YAxis stroke="hsl(var(--foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="exclusive" fill={COLORS.warning} name="ESG Exclusive" />
                      <Bar dataKey="inclusive" fill={COLORS.success} name="ESG Inclusive" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Sector Impact Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Sector Impact Analysis</CardTitle>
                  <CardDescription>Detailed breakdown by sector</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {financialData.sectors.map((sector, index) => (
                      <div key={sector.name} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium">{sector.name}</h4>
                          <Badge 
                            variant={sector.esgImpact.startsWith('+') ? "default" : "secondary"}
                            className={sector.esgImpact.startsWith('+') ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}
                          >
                            {sector.esgImpact}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">ESG Exclusive:</span>
                            <div className="font-semibold">{sector.exclusive}%</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">ESG Inclusive:</span>
                            <div className={`font-semibold ${sector.inclusive > sector.exclusive ? 'text-success' : 'text-destructive'}`}>
                              {sector.inclusive}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Executive Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Executive Summary
            </CardTitle>
            <CardDescription>
              Key findings from ESG financial impact analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-success">Positive Impacts</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• 13.2% increase in revenue through ESG integration</li>
                  <li>• 1.4pp improvement in net profit margin</li>
                  <li>• 0.9pp increase in ROE</li>
                  <li>• 47% reduction in climate and regulatory risks</li>
                  <li>• Enhanced access to sustainable financing</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-warning">Key Drivers</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Operational efficiency improvements</li>
                  <li>• Premium pricing for sustainable products</li>
                  <li>• Lower cost of capital</li>
                  <li>• Reduced regulatory compliance costs</li>
                  <li>• Enhanced brand reputation and customer loyalty</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-info">Strategic Recommendations</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Continue ESG investment program</li>
                  <li>• Expand sustainable product portfolio</li>
                  <li>• Enhance ESG reporting and transparency</li>
                  <li>• Integrate ESG metrics into performance KPIs</li>
                  <li>• Develop ESG-linked compensation structures</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialReport;