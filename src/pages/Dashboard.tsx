import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlockchainIntegration } from '@/components/BlockchainIntegration';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import BottomChatAssistant from '@/components/BottomChatAssistant';
import EnhancedPropertyUpdates from '@/components/EnhancedPropertyUpdates';
import DigitalAssetMarketUpdates from '@/components/DigitalAssetMarketUpdates';
import SustanoProEcosystemDemo from '@/components/SustanoProEcosystemDemo';
import SustanoSphereWidget from '@/components/SustanoSphereWidget';
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
  Megaphone,
  Play
} from 'lucide-react';
import ESGRiskAdjustedCalculator from '@/components/ESGRiskAdjustedCalculator';
import DashboardQuickSearch from '@/components/DashboardQuickSearch';
import { RevolutionarySustainoSphere } from '@/components/RevolutionarySustanoSphere';
import AdvertisingValuationDashboard from '@/components/AdvertisingValuationDashboard';
import ICVDashboard from '@/components/ICVDashboard';
import { SustanoSphere } from '@/components/SustanoSphere';

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
      {/* Header with High Contrast */}
      <div className="border-b toolbar-high-contrast">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="nav-high-contrast rounded-lg px-3 py-2 flex items-center gap-2 text-sm hover:no-underline">
                <Home className="h-4 w-4" />
                Back to Main Platform
              </Link>
              <div className="h-6 w-px bg-toolbar-border" />
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-toolbar-foreground">Property Analytics Dashboard</h1>
                  <p className="text-sm text-toolbar-muted">ESG-Enhanced Property Valuation Platform</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-3 py-1 toolbar-high-contrast">
                <Leaf className="h-3 w-3 mr-1" />
                Greenium Active
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 toolbar-high-contrast">
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
          <TabsList className="grid w-full grid-cols-2 toolbar-high-contrast">
            <TabsTrigger value="overview" className="toolbar-item flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="sustaino-world" className="toolbar-item flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Sustaino World
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

            {/* Property Updates - Full Width */}
            <EnhancedPropertyUpdates />

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

          <TabsContent value="sustaino-world" className="mt-6">
            <div className="space-y-6">
              <div className="text-center py-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
                  Welcome to Sustaino World
                </h2>
                <p className="text-muted-foreground text-lg">
                  Your comprehensive ESG-powered property ecosystem
                </p>
              </div>
              
              {/* Platform Navigation Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-4 mb-8">
                <Link to="/dashboard" className="no-underline">
                  <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-emerald-500 text-white border-0">
                    <div className="text-center">
                      <Home className="h-6 w-6 mx-auto mb-2" />
                      <p className="text-sm font-medium">Back to Dashboard</p>
                    </div>
                  </Card>
                </Link>

                <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-emerald-500 text-white border-0" onClick={() => setActiveTab('analytics')}>
                  <div className="text-center">
                    <BarChart3 className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">Analytics Dashboard</p>
                  </div>
                </Card>


                <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-emerald-500 text-white border-0" onClick={() => setActiveTab('mortgage')}>
                  <div className="text-center">
                    <Building className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">Mortgage Broker</p>
                  </div>
                </Card>

                <Link to="/reality-sales" className="no-underline">
                  <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-emerald-500 text-white border-0">
                    <div className="text-center">
                      <Gavel className="h-6 w-6 mx-auto mb-2" />
                      <p className="text-sm font-medium">Reality Sales</p>
                    </div>
                  </Card>
                </Link>

                <Link to="/work-hub" className="no-underline">
                  <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-emerald-500 text-white border-0">
                    <div className="text-center">
                      <Users className="h-6 w-6 mx-auto mb-2" />
                      <p className="text-sm font-medium">Property Management</p>
                    </div>
                  </Card>
                </Link>

              </div>
              
              <Tabs defaultValue="analytics" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="analytics" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="mortgage" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Mortgage
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="advertising" className="flex items-center gap-2">
                    <Megaphone className="h-4 w-4" />
                    Advertising
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="analytics" className="mt-6">
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



                <TabsContent value="mortgage" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mortgage Broker Platform</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">Connect with leading mortgage brokers and financing options</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Prime Lending</h4>
                          <p className="text-sm text-muted-foreground">From 4.2% variable</p>
                          <Button size="sm" className="mt-2">Get Quote</Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">ESG Green Loans</h4>
                          <p className="text-sm text-muted-foreground">From 3.8% for ESG properties</p>
                          <Button size="sm" className="mt-2">Get Quote</Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Commercial Finance</h4>
                          <p className="text-sm text-muted-foreground">Competitive rates</p>
                          <Button size="sm" className="mt-2">Get Quote</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          Vulnerability Assessment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {vulnerabilities.map((vuln, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${
                                  vuln.severity === 'High' ? 'bg-red-100 text-red-600' : 
                                  vuln.severity === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 
                                  'bg-blue-100 text-blue-600'
                                }`}>
                                  {vuln.severity === 'High' && <XCircle className="h-4 w-4" />}
                                  {vuln.severity === 'Medium' && <AlertTriangle className="h-4 w-4" />}
                                  {vuln.severity === 'Low' && <CheckCircle className="h-4 w-4" />}
                                </div>
                                <div>
                                  <p className="font-medium">{vuln.severity} Priority</p>
                                  <p className="text-sm text-muted-foreground">{vuln.description}</p>
                                </div>
                              </div>
                              <Badge variant="outline" className={
                                vuln.severity === 'High' ? 'border-red-200 text-red-600' : 
                                vuln.severity === 'Medium' ? 'border-yellow-200 text-yellow-600' : 
                                'border-blue-200 text-blue-600'
                              }>
                                {vuln.count}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Lock className="h-5 w-5 text-green-500" />
                          Security Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 border border-green-200 bg-green-50 dark:bg-green-950/20 rounded-lg">
                            <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">Immediate Actions</h4>
                            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                              <li>• Update critical security patches</li>
                              <li>• Review admin access permissions</li>
                              <li>• Enable multi-factor authentication</li>
                            </ul>
                          </div>
                          <div className="p-4 border border-blue-200 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                            <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Recommended Improvements</h4>
                            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                              <li>• Implement automated security monitoring</li>
                              <li>• Schedule regular penetration testing</li>
                              <li>• Update incident response procedures</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>


                <TabsContent value="advertising" className="mt-6">
                  <AdvertisingValuationDashboard />
                </TabsContent>

              </Tabs>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* AI Assistant Video Section */}
      {/* Sustaino Pro Ecosystem Demo - Reduced Size */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Play className="w-6 h-6" />
                Sustaino Pro AI Demo
              </CardTitle>
              <p className="text-emerald-100 text-sm">
                Revolutionary AI-powered analysis
              </p>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-black/20 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <Play className="w-4 h-4 mr-2" />
                    Play Demo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <SustanoSphereWidget />
        </div>
      </div>

      {/* Digital Asset Market Updates - Full Width */}
      <DigitalAssetMarketUpdates />

      {/* Bottom Left Chat Assistant */}
      <BottomChatAssistant />
    </div>
  );
};

export default Dashboard;