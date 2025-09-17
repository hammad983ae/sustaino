import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlockchainIntegration } from '@/components/BlockchainIntegration';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Home,
  Calculator,
  Leaf,
  TrendingUp,
  FileText,
  Users,
  DollarSign,
  Award,
  Settings,
  BarChart3,
  PieChart as PieChartIcon,
  Zap,
  Globe,
  ShieldCheck,
  Target,
  ArrowRight,
  Building,
  MapPin,
  Gavel,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lock,
  CreditCard,
  Megaphone
} from 'lucide-react';
import ESGRiskAdjustedCalculator from '@/components/ESGRiskAdjustedCalculator';
import DashboardQuickSearch from '@/components/DashboardQuickSearch';
import { RevolutionarySustainoSphere } from '@/components/RevolutionarySustanoSphere';
import AdvertisingValuationDashboard from '@/components/AdvertisingValuationDashboard';

// Import professional images
import securityAnalysisDashboard from '@/assets/security-analysis-dashboard.jpg';
import propertyValuationDashboard from '@/assets/property-valuation-dashboard.jpg';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for charts
  const portfolioData = [
    { name: 'Jan', traditional: 8.5, esg: 10.2, greenium: 1.7 },
    { name: 'Feb', traditional: 9.1, esg: 11.0, greenium: 1.9 },
    { name: 'Mar', traditional: 8.8, esg: 10.8, greenium: 2.0 },
    { name: 'Apr', traditional: 9.3, esg: 11.5, greenium: 2.2 },
    { name: 'May', traditional: 9.0, esg: 11.2, greenium: 2.2 },
    { name: 'Jun', traditional: 9.5, esg: 11.8, greenium: 2.3 }
  ];

  const propertyTypeData = [
    { name: 'Residential', value: 45, color: '#22c55e' },
    { name: 'Commercial', value: 30, color: '#3b82f6' },
    { name: 'Industrial', value: 15, color: '#f59e0b' },
    { name: 'Agricultural', value: 10, color: '#8b5cf6' }
  ];

  const esgScoreData = [
    { name: 'Energy Efficient', score: 85, properties: 124 },
    { name: 'Carbon Neutral', score: 92, properties: 89 },
    { name: 'Water Conservation', score: 78, properties: 156 },
    { name: 'Sustainable Materials', score: 71, properties: 98 },
    { name: 'Green Transport', score: 83, properties: 67 }
  ];

  // Security Analysis Data
  const securityMetrics = [
    { name: 'System Security', score: 94, status: 'Excellent' },
    { name: 'Data Protection', score: 87, status: 'Good' },
    { name: 'Access Control', score: 92, status: 'Excellent' },
    { name: 'Compliance', score: 89, status: 'Good' }
  ];

  const vulnerabilities = [
    { severity: 'High', count: 2, description: 'Critical security patches needed' },
    { severity: 'Medium', count: 7, description: 'Configuration improvements' },
    { severity: 'Low', count: 15, description: 'Minor security enhancements' }
  ];

  const recentActivities = [
    { id: 1, type: 'valuation', property: '123 Green Street, Sydney', value: '$2.1M', greenium: '+2.3%', time: '2 hours ago' },
    { id: 2, type: 'esg', property: '456 Sustainable Ave, Melbourne', value: '$1.8M', greenium: '+1.9%', time: '4 hours ago' },
    { id: 3, type: 'analysis', property: '789 Eco Lane, Brisbane', value: '$1.5M', greenium: '+2.1%', time: '6 hours ago' },
    { id: 4, type: 'report', property: '321 Carbon Way, Perth', value: '$2.5M', greenium: '+2.8%', time: '1 day ago' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <Home className="h-4 w-4" />
                Back to Main Platform
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Property Analytics Dashboard</h1>
                  <p className="text-sm text-muted-foreground">ESG-Enhanced Property Valuation Platform</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-3 py-1">
                <Leaf className="h-3 w-3 mr-1" />
                Greenium Active
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <Award className="h-3 w-3 mr-1" />
                Sustaino Coins: 2,450
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="esg-calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              ESG Calculator
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Security Analysis
            </TabsTrigger>
            <TabsTrigger value="sustano-sphere" className="flex items-center gap-2">
              <Gavel className="h-4 w-4" />
              Sustaino Sphere™
            </TabsTrigger>
            <TabsTrigger value="advertising" className="flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              Advertising
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Portfolio Value</p>
                      <p className="text-2xl font-bold">$487.2M</p>
                      <p className="text-xs text-green-600">+12.3% from last month</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Properties</p>
                      <p className="text-2xl font-bold">1,247</p>
                      <p className="text-xs text-blue-600">+8.7% ESG Properties</p>
                    </div>
                    <Building className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Average Greenium</p>
                      <p className="text-2xl font-bold">+2.1%</p>
                      <p className="text-xs text-emerald-600">Premium over traditional</p>
                    </div>
                    <Leaf className="h-8 w-8 text-emerald-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">ESG Score</p>
                      <p className="text-2xl font-bold">84.7</p>
                      <p className="text-xs text-purple-600">Excellent rating</p>
                    </div>
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Blockchain Integration */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <BlockchainIntegration variant="compact" />
              </div>
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      Blockchain Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Recent Transactions</span>
                        <Badge variant="secondary">47 today</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Smart Contracts Deployed</span>
                        <Badge variant="secondary">12 this week</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Validation Rewards Earned</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">+156 SUST</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Portfolio Performance vs Greenium
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={portfolioData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="traditional" stroke="#6b7280" name="Traditional %" />
                      <Line type="monotone" dataKey="esg" stroke="#22c55e" name="ESG-Enhanced %" />
                      <Line type="monotone" dataKey="greenium" stroke="#059669" name="Greenium Premium %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5" />
                    Property Type Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={propertyTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {propertyTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Recent Activity
                  </span>
                  <Button variant="outline" size="sm">View All</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
                          {activity.type === 'valuation' && <Calculator className="h-4 w-4 text-green-600" />}
                          {activity.type === 'esg' && <Leaf className="h-4 w-4 text-green-600" />}
                          {activity.type === 'analysis' && <BarChart3 className="h-4 w-4 text-green-600" />}
                          {activity.type === 'report' && <FileText className="h-4 w-4 text-green-600" />}
                        </div>
                        <div>
                          <p className="font-medium">{activity.property}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{activity.value}</p>
                        <Badge variant="secondary" className="text-green-600">{activity.greenium}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="esg-calculator" className="mt-6">
            <ESGRiskAdjustedCalculator />
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>ESG Performance by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={esgScoreData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="score" fill="#22c55e" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sustaino Coin Earnings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">2,450</div>
                    <div className="text-sm text-muted-foreground">Total Sustaino Coins</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span>ESG Assessments</span>
                      <Badge className="bg-emerald-600 text-white">+150 coins</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span>Carbon Reports</span>
                      <Badge className="bg-emerald-600 text-white">+200 coins</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span>Efficiency Improvements</span>
                      <Badge className="bg-emerald-600 text-white">+300 coins</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Market Risk</span>
                      <Badge variant="secondary">Low</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>ESG Risk</span>
                      <Badge variant="secondary">Very Low</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Regulatory Risk</span>
                      <Badge variant="secondary">Low</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Market Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>ESG Demand</span>
                      <span className="text-green-600 font-medium">↗ +15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Green Financing</span>
                      <span className="text-green-600 font-medium">↗ +23%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carbon Pricing</span>
                      <span className="text-blue-600 font-medium">↗ +8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Predictions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Next Quarter</span>
                      <span className="text-green-600 font-medium">+2.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Greenium Growth</span>
                      <span className="text-emerald-600 font-medium">+0.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ESG Adoption</span>
                      <span className="text-blue-600 font-medium">+18%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6 mt-6">
            {/* Professional Security Visual */}
            <Card className="overflow-hidden border-2 border-red-200">
              <div className="relative h-64">
                <img 
                  src={securityAnalysisDashboard} 
                  alt="Professional Security Analysis Dashboard" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 text-white">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Analysis
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Security Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {securityMetrics.map((metric, index) => (
                <Card key={index} className="border-2 hover:border-red-300 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{metric.name}</p>
                        <p className="text-2xl font-bold">{metric.score}%</p>
                        <Badge variant={metric.status === 'Excellent' ? 'default' : 'secondary'} className="mt-1">
                          {metric.status}
                        </Badge>
                      </div>
                      <div className={`p-2 rounded-full ${metric.score >= 90 ? 'bg-green-100' : 'bg-yellow-100'}`}>
                        <ShieldCheck className={`h-6 w-6 ${metric.score >= 90 ? 'text-green-600' : 'text-yellow-600'}`} />
                      </div>
                    </div>
                    <Progress value={metric.score} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Vulnerability Assessment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Vulnerability Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vulnerabilities.map((vuln, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {vuln.severity === 'High' ? (
                            <XCircle className="h-5 w-5 text-red-600" />
                          ) : vuln.severity === 'Medium' ? (
                            <AlertTriangle className="h-5 w-5 text-yellow-600" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                          <div>
                            <p className="font-medium">{vuln.severity} Severity</p>
                            <p className="text-sm text-muted-foreground">{vuln.description}</p>
                          </div>
                        </div>
                        <Badge className={`${vuln.severity === 'High' ? 'bg-red-100 text-red-800' : vuln.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {vuln.count} Issues
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-green-600" />
                    Security Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Multi-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Implement MFA for all admin accounts</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Regular Security Audits</p>
                        <p className="text-sm text-muted-foreground">Conduct quarterly penetration testing</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Encryption Upgrade</p>
                        <p className="text-sm text-muted-foreground">Update to AES-256 encryption standards</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Staff Training</p>
                        <p className="text-sm text-muted-foreground">Security awareness training program</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Compliance Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                  Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-bold text-green-800">GDPR</h3>
                    <p className="text-sm text-green-700">Compliant</p>
                    <p className="text-xs text-green-600 mt-1">95% Score</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <h3 className="font-bold text-yellow-800">ISO 27001</h3>
                    <p className="text-sm text-yellow-700">In Progress</p>
                    <p className="text-xs text-yellow-600 mt-1">78% Score</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-bold text-blue-800">SOC 2</h3>
                    <p className="text-sm text-blue-700">Certified</p>
                    <p className="text-xs text-blue-600 mt-1">92% Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sustano-sphere" className="space-y-6 mt-6">
            <RevolutionarySustainoSphere />
          </TabsContent>

          <TabsContent value="tools" className="space-y-6 mt-6">
            {/* Quick Property Search Tool */}
            <div className="mb-6">
              <DashboardQuickSearch />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/automated-valuation">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Automated Valuation</h3>
                    <p className="text-sm text-muted-foreground">Quick property assessments</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/comprehensive-property-valuation">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Comprehensive Reports</h3>
                    <p className="text-sm text-muted-foreground">Detailed valuation reports</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/reality-sales" className="group">
                <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 via-cyan-400/10 to-purple-500/10 border-white/20 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 rounded-3xl overflow-hidden">
                  <CardContent className="p-8 text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                    <div className="relative">
                      <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
                        <div className="relative p-6 bg-gradient-to-br from-blue-500/80 to-purple-600/80 rounded-full shadow-2xl mx-auto w-fit backdrop-blur-lg border border-white/20">
                          <Gavel className="h-12 w-12 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                        Auction-Sphere™
                      </h3>
                      <p className="text-slate-600 font-semibold leading-relaxed">
                        Revolutionary 3D auction platform with AI-powered bidder qualification
                      </p>
                      <div className="flex justify-center gap-2 mt-4 flex-wrap">
                        <Badge className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-700 border-emerald-200 font-bold text-xs">
                          3D WebGL
                        </Badge>
                        <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 border-blue-200 font-bold text-xs">
                          AI Powered
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/auction-sphere-pos" className="group">
                <Card className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 via-green-400/10 to-blue-500/10 border-white/20 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-105 rounded-3xl overflow-hidden">
                  <CardContent className="p-8 text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5"></div>
                    <div className="relative">
                      <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
                        <div className="relative p-6 bg-gradient-to-br from-emerald-500/80 to-blue-600/80 rounded-full shadow-2xl mx-auto w-fit backdrop-blur-lg border border-white/20">
                          <CreditCard className="h-12 w-12 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-3">
                        Auction-Sphere™ POS
                      </h3>
                      <p className="text-slate-600 font-semibold leading-relaxed">
                        Professional point of sale with social media demo slides
                      </p>
                      <div className="flex justify-center gap-2 mt-4 flex-wrap">
                        <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 border-green-200 font-bold text-xs">
                          Real-Time POS
                        </Badge>
                        <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 border-blue-200 font-bold text-xs">
                          Social Media
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/esg-strategy-analysis">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Leaf className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">ESG Strategy</h3>
                    <p className="text-sm text-muted-foreground">Sustainability analysis</p>
                  </CardContent>
                </Card>
              </Link>

               <Link to="/costa-group-valuations">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Costa Group Portfolio</h3>
                    <p className="text-sm text-muted-foreground">Agricultural property valuations</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/property-valuations">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Building className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Property Management</h3>
                    <p className="text-sm text-muted-foreground">Manage your portfolio</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/work-hub">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Work Hub</h3>
                    <p className="text-sm text-muted-foreground">Collaboration tools</p>
                  </CardContent>
                </Card>
              </Link>

              <Card 
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => setActiveTab('advertising')}
              >
                <CardContent className="p-6 text-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-xl animate-pulse group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="relative p-4 bg-gradient-to-br from-orange-500/80 to-red-600/80 rounded-full shadow-xl mx-auto w-fit backdrop-blur-lg border border-white/20 group-hover:scale-110 transition-transform duration-300">
                      <Megaphone className="h-8 w-8 text-white drop-shadow-lg" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2 mt-4 group-hover:text-primary transition-colors">Advertising Valuations</h3>
                  <p className="text-sm text-muted-foreground">Signage & digital platform valuations</p>
                  <div className="flex justify-center gap-2 mt-3 flex-wrap">
                    <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-700 border-orange-200 font-bold text-xs">
                      Billboard Analysis
                    </Badge>
                    <Badge className="bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-700 border-red-200 font-bold text-xs">
                      Digital Platforms
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Sustaino Marketplace</h3>
                  <p className="text-sm text-muted-foreground">Trade sustainability tokens</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="advertising" className="mt-6">
            <AdvertisingValuationDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;