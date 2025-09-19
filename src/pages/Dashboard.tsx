import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PerfectSustanoLogo from '@/components/PerfectSustanoLogo';
import {
  BarChart3,
  Leaf,
  Target,
  Zap,
  Globe,
  Building,
  Gavel,
  Users,
  Moon,
  Calculator,
  FileText,
  ShieldCheck,
  Megaphone,
  Palette,
  BookOpen,
  Lock,
  TrendingUp,
  DollarSign,
  Shield,
  Award,
  Sparkles,
  Database,
  ChartLine,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('platform-access');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-300 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-20 left-32 w-40 h-40 bg-emerald-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-20 w-28 h-28 bg-orange-300 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>

      {/* Header with Enhanced Logo */}
      <div className="relative z-10 text-center py-8 px-4">
        <div className="mb-6">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-300">
            <Sparkles className="h-3 w-3 mr-1" />
            Sustaino Pro - Complete Platform Ecosystem
          </Badge>
        </div>
        
        {/* Enhanced Logo Section */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <PerfectSustanoLogo 
              size="xl" 
              variant="white" 
              className="relative z-10 transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-white mb-2 bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
          Sustaino Pro <Moon className="inline h-10 w-10 ml-2 text-blue-200 animate-pulse" />
        </h1>
        
        <h2 className="text-4xl font-semibold text-white/90 mb-4 bg-gradient-to-r from-blue-100 to-purple-200 bg-clip-text text-transparent">
          ICV (Instant Comprehensive Valuation)™
        </h2>
        
        <p className="text-xl text-white/80 mb-2 font-medium">
          AI-Powered Property Valuation And Assessment Technology
        </p>
        
        <p className="text-white/70 text-sm mb-8">
          Patent Pending • IP Protected • Trademark © • Copyright Protected
        </p>

        {/* Enhanced Stats with Icons */}
        <div className="flex justify-center gap-6 mt-8 mb-8 flex-wrap">
          <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-xl px-8 py-6 text-center border border-white/20 hover:border-white/40 transition-all duration-300 group">
            <div className="flex items-center justify-center mb-2">
              <Building className="h-6 w-6 text-blue-200 mr-2" />
              <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform">28</div>
            </div>
            <div className="text-white/80 text-sm font-medium">Total Platforms</div>
          </div>
          <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-xl px-8 py-6 text-center border border-white/20 hover:border-white/40 transition-all duration-300 group">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="h-6 w-6 text-emerald-200 mr-2" />
              <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform">8</div>
            </div>
            <div className="text-white/80 text-sm font-medium">Categories</div>
          </div>
          <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-xl px-8 py-6 text-center border border-white/20 hover:border-white/40 transition-all duration-300 group">
            <div className="flex items-center justify-center mb-2">
              <Globe className="h-6 w-6 text-purple-200 mr-2" />
              <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform">24/7</div>
            </div>
            <div className="text-white/80 text-sm font-medium">Availability</div>
          </div>
          <div className="bg-gradient-to-br from-orange-400/30 to-red-400/30 backdrop-blur-sm rounded-xl px-8 py-6 text-center border border-orange-300/30 hover:border-orange-300/60 transition-all duration-300 group">
            <div className="flex items-center justify-center mb-2">
              <Zap className="h-6 w-6 text-orange-200 mr-2" />
              <div className="text-3xl font-bold text-orange-100 group-hover:scale-110 transition-transform">AI</div>
            </div>
            <div className="text-orange-200 text-sm font-medium">Powered</div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Tabs */}
      <div className="relative z-10 px-4 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-lg rounded-2xl p-3 border border-white/20 shadow-2xl">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-transparent space-x-1">
                <TabsTrigger 
                  value="platform-access" 
                  className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/30 data-[state=active]:to-purple-500/30 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/30 rounded-xl transition-all duration-300"
                >
                  <Building className="h-4 w-4 mr-1" />
                  Platform Access
                </TabsTrigger>
                <TabsTrigger 
                  value="data-tools" 
                  className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/30 data-[state=active]:to-teal-500/30 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/30 rounded-xl transition-all duration-300"
                >
                  <Database className="h-4 w-4 mr-1" />
                  Data Tools
                </TabsTrigger>
                <TabsTrigger 
                  value="marketing-hub" 
                  className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/30 data-[state=active]:to-rose-500/30 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/30 rounded-xl transition-all duration-300"
                >
                  <Megaphone className="h-4 w-4 mr-1" />
                  Marketing Hub
                </TabsTrigger>
                <TabsTrigger 
                  value="brochures" 
                  className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/30 data-[state=active]:to-amber-500/30 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/30 rounded-xl transition-all duration-300"
                >
                  <BookOpen className="h-4 w-4 mr-1" />
                  Brochures
                </TabsTrigger>
                <TabsTrigger 
                  value="ip-security" 
                  className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500/30 data-[state=active]:to-pink-500/30 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/30 rounded-xl transition-all duration-300"
                >
                  <Shield className="h-4 w-4 mr-1" />
                  IP Security
                </TabsTrigger>
                <TabsTrigger 
                  value="advanced-features" 
                  className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500/30 data-[state=active]:to-purple-500/30 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/30 rounded-xl transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  Advanced Features
                </TabsTrigger>
              </TabsList>

              <TabsContent value="platform-access" className="mt-6">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      Platform Access
                    </h3>
                    <p className="text-white/80 text-lg">Comprehensive analytics and reporting platforms</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/icv-dashboard">
                      <Card className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 backdrop-blur-sm border-blue-300/30 hover:border-blue-300/60 transition-all duration-300 cursor-pointer h-full group hover:scale-105 hover:shadow-2xl">
                        <CardContent className="p-6 text-center">
                          <div className="relative mb-4">
                            <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                            <BarChart3 className="relative h-12 w-12 mx-auto text-blue-300 group-hover:text-blue-200 transition-colors" />
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-2">Analytics Dashboard</h4>
                          <p className="text-white/70 text-sm mb-3">Comprehensive analytics and reporting</p>
                          <Badge className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-200 border-green-400/40 hover:from-green-500/40 hover:to-emerald-500/40 transition-all">
                            <ChartLine className="h-3 w-3 mr-1" />
                            Active Platform
                          </Badge>
                        </CardContent>
                      </Card>
                    </Link>

                    <Link to="/esg-strategy-analysis">
                      <Card className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 backdrop-blur-sm border-emerald-300/30 hover:border-emerald-300/60 transition-all duration-300 cursor-pointer h-full group hover:scale-105 hover:shadow-2xl">
                        <CardContent className="p-6 text-center">
                          <div className="relative mb-4">
                            <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                            <Leaf className="relative h-12 w-12 mx-auto text-emerald-300 group-hover:text-emerald-200 transition-colors" />
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-2">ESG Platform</h4>
                          <p className="text-white/70 text-sm mb-3">Environmental & sustainability analysis</p>
                          <Badge className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-200 border-green-400/40 hover:from-green-500/40 hover:to-emerald-500/40 transition-all">
                            <Leaf className="h-3 w-3 mr-1" />
                            Active Platform
                          </Badge>
                        </CardContent>
                      </Card>
                    </Link>

                    <Link to="/sam-platform">
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer h-full">
                        <CardContent className="p-6 text-center">
                          <Target className="h-12 w-12 mx-auto mb-4 text-purple-300" />
                          <h4 className="text-lg font-semibold text-white mb-2">SAM Platform</h4>
                          <p className="text-white/70 text-sm">Strategic Asset Management</p>
                          <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                        </CardContent>
                      </Card>
                    </Link>

                    <Link to="/brick-by-brick">
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer h-full">
                        <CardContent className="p-6 text-center">
                          <Zap className="h-12 w-12 mx-auto mb-4 text-orange-300" />
                          <h4 className="text-lg font-semibold text-white mb-2">Blockchain Hub</h4>
                          <p className="text-white/70 text-sm">Cryptocurrency & blockchain tools</p>
                          <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                        </CardContent>
                      </Card>
                    </Link>

                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer h-full">
                      <CardContent className="p-6 text-center">
                        <Globe className="h-12 w-12 mx-auto mb-4 text-teal-300" />
                        <h4 className="text-lg font-semibold text-white mb-2">Sustaino Sphere™</h4>
                        <p className="text-white/70 text-sm">Revolutionary platform ecosystem</p>
                        <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Building className="h-10 w-10 mx-auto mb-3 text-red-300" />
                        <h4 className="text-lg font-semibold text-white mb-2">Mortgage Broker</h4>
                        <p className="text-white/70 text-sm">Mortgage and finance services</p>
                        <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                      </CardContent>
                    </Card>

                    <Link to="/reality-sales">
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <Gavel className="h-10 w-10 mx-auto mb-3 text-pink-300" />
                          <h4 className="text-lg font-semibold text-white mb-2">Reality Sales</h4>
                          <p className="text-white/70 text-sm">Real estate sales platform</p>
                          <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                        </CardContent>
                      </Card>
                    </Link>

                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Users className="h-10 w-10 mx-auto mb-3 text-blue-300" />
                        <h4 className="text-lg font-semibold text-white mb-2">Property Management</h4>
                        <p className="text-white/70 text-sm">Property management tools</p>
                        <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="data-tools" className="mt-6">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Data Tools</h3>
                    <p className="text-white/80">Advanced data analysis and processing tools</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/property-valuations">
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <Calculator className="h-10 w-10 mx-auto mb-3 text-blue-300" />
                          <h4 className="text-lg font-semibold text-white mb-2">Property Valuations</h4>
                          <p className="text-white/70 text-sm">Comprehensive property analysis</p>
                          <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                        </CardContent>
                      </Card>
                    </Link>

                    <Link to="/workhub">
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <FileText className="h-10 w-10 mx-auto mb-3 text-green-300" />
                          <h4 className="text-lg font-semibold text-white mb-2">Work Hub</h4>
                          <p className="text-white/70 text-sm">Central job and task management</p>
                          <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                        </CardContent>
                      </Card>
                    </Link>

                    <Link to="/automated-valuation">
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <Zap className="h-10 w-10 mx-auto mb-3 text-orange-300" />
                          <h4 className="text-lg font-semibold text-white mb-2">Automated Valuation</h4>
                          <p className="text-white/70 text-sm">AI-powered instant valuations</p>
                          <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="marketing-hub" className="mt-6">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Marketing Hub</h3>
                    <p className="text-white/80">Marketing and promotional tools</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/marketing">
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <Megaphone className="h-10 w-10 mx-auto mb-3 text-purple-300" />
                          <h4 className="text-lg font-semibold text-white mb-2">Marketing Tools</h4>
                          <p className="text-white/70 text-sm">Comprehensive marketing suite</p>
                          <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                        </CardContent>
                      </Card>
                    </Link>

                    <Link to="/social-media-assets">
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <Palette className="h-10 w-10 mx-auto mb-3 text-pink-300" />
                          <h4 className="text-lg font-semibold text-white mb-2">Social Media Assets</h4>
                          <p className="text-white/70 text-sm">Social media content creation</p>
                          <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                        </CardContent>
                      </Card>
                    </Link>

                    <Link to="/advertising-platforms">
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <BarChart3 className="h-10 w-10 mx-auto mb-3 text-blue-300" />
                          <h4 className="text-lg font-semibold text-white mb-2">Advertising Platforms</h4>
                          <p className="text-white/70 text-sm">Advertising management tools</p>
                          <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="brochures" className="mt-6">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Brochures</h3>
                    <p className="text-white/80">Information and documentation</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/brochure-viewer">
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <BookOpen className="h-10 w-10 mx-auto mb-3 text-blue-300" />
                          <h4 className="text-lg font-semibold text-white mb-2">Brochure Viewer</h4>
                          <p className="text-white/70 text-sm">View all product brochures</p>
                          <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                        </CardContent>
                      </Card>
                    </Link>

                    <Link to="/concepts-and-plans">
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <FileText className="h-10 w-10 mx-auto mb-3 text-green-300" />
                          <h4 className="text-lg font-semibold text-white mb-2">Concepts & Plans</h4>
                          <p className="text-white/70 text-sm">Platform concepts and planning</p>
                          <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ip-security" className="mt-6">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">IP Security</h3>
                    <p className="text-white/80">Intellectual property and security features</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <ShieldCheck className="h-10 w-10 mx-auto mb-3 text-green-300" />
                        <h4 className="text-lg font-semibold text-white mb-2">Security Dashboard</h4>
                        <p className="text-white/70 text-sm">Comprehensive security monitoring</p>
                        <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Lock className="h-10 w-10 mx-auto mb-3 text-orange-300" />
                        <h4 className="text-lg font-semibold text-white mb-2">IP Protection</h4>
                        <p className="text-white/70 text-sm">Intellectual property protection</p>
                        <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced-features" className="mt-6">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Advanced Features</h3>
                    <p className="text-white/80">Cutting-edge platform capabilities</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/crypto-trading-dashboard">
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <Zap className="h-10 w-10 mx-auto mb-3 text-orange-300" />
                          <h4 className="text-lg font-semibold text-white mb-2">Crypto Trading</h4>
                          <p className="text-white/70 text-sm">Cryptocurrency trading dashboard</p>
                          <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                        </CardContent>
                      </Card>
                    </Link>

                    <Link to="/investment-platform">
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <Target className="h-10 w-10 mx-auto mb-3 text-purple-300" />
                          <h4 className="text-lg font-semibold text-white mb-2">Investment Platform</h4>
                          <p className="text-white/70 text-sm">Investment management tools</p>
                          <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Enhanced Start Property Valuation Button */}
      <div className="relative z-10 px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 text-center relative overflow-hidden group hover:scale-105 transition-all duration-300 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <Sparkles className="h-8 w-8 mx-auto mb-4 text-white animate-pulse" />
              <Link to="/workhub" className="inline-flex items-center gap-3 text-white font-bold text-2xl hover:no-underline group-hover:scale-110 transition-transform">
                🚀 Start Property Valuation
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <p className="text-white/80 mt-2 text-sm">Begin your comprehensive property assessment journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="relative z-10 text-center py-6">
        <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-xl mx-4 p-4 border border-white/20">
          <p className="text-white/80 text-sm font-medium">
            © 2025 Sustaino Pro. All platforms integrated and ready to use.
          </p>
          <div className="flex justify-center items-center mt-2 space-x-4">
            <Badge variant="secondary" className="bg-white/20 text-white/80 border-white/30">
              <Award className="h-3 w-3 mr-1" />
              Award Winning Platform
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white/80 border-white/30">
              <Shield className="h-3 w-3 mr-1" />
              Enterprise Security
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;