import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Lock
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('platform-access');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      {/* Header */}
      <div className="text-center py-8 px-4">
        <div className="mb-4">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
            ✓ Sustaino Pro - Complete Platform Ecosystem
          </Badge>
        </div>
        
        <h1 className="text-5xl font-bold text-white mb-2">
          Sustaino Pro <Moon className="inline h-8 w-8 ml-2" />
        </h1>
        
        <h2 className="text-3xl font-semibold text-white/90 mb-4">
          ICV (Instant Comprehensive Valuation)™
        </h2>
        
        <p className="text-xl text-white/80 mb-2">
          AI-Powered Property Valuation And Assessment Technology
        </p>
        
        <p className="text-white/70 text-sm">
          Patent Pending • IP Protected • Trademark © • Copyright Protected
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-4 mt-8 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4 text-center">
            <div className="text-2xl font-bold text-white">28</div>
            <div className="text-white/80 text-sm">Total Platforms</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4 text-center">
            <div className="text-2xl font-bold text-white">8</div>
            <div className="text-white/80 text-sm">Categories</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4 text-center">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-white/80 text-sm">Availability</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4 text-center">
            <div className="text-2xl font-bold text-orange-300">AI</div>
            <div className="text-white/80 text-sm">Powered</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-transparent">
                <TabsTrigger value="platform-access" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                  Platform Access
                </TabsTrigger>
                <TabsTrigger value="data-tools" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                  Data Tools
                </TabsTrigger>
                <TabsTrigger value="marketing-hub" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                  Marketing Hub
                </TabsTrigger>
                <TabsTrigger value="brochures" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                  Brochures
                </TabsTrigger>
                <TabsTrigger value="ip-security" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                  IP Security
                </TabsTrigger>
                <TabsTrigger value="advanced-features" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                  Advanced Features
                </TabsTrigger>
              </TabsList>

              <TabsContent value="platform-access" className="mt-6">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Platform Access</h3>
                    <p className="text-white/80">Comprehensive analytics and reporting</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/icv-dashboard">
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer h-full">
                        <CardContent className="p-6 text-center">
                          <BarChart3 className="h-12 w-12 mx-auto mb-4 text-blue-300" />
                          <h4 className="text-lg font-semibold text-white mb-2">Analytics Dashboard</h4>
                          <p className="text-white/70 text-sm">Comprehensive analytics and reporting</p>
                          <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
                        </CardContent>
                      </Card>
                    </Link>

                    <Link to="/esg-strategy-analysis">
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer h-full">
                        <CardContent className="p-6 text-center">
                          <Leaf className="h-12 w-12 mx-auto mb-4 text-green-300" />
                          <h4 className="text-lg font-semibold text-white mb-2">ESG Platform</h4>
                          <p className="text-white/70 text-sm">Environmental & sustainability analysis</p>
                          <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">Active Platform</Badge>
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

      {/* Start Property Valuation Button */}
      <div className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-center">
            <Link to="/workhub" className="inline-flex items-center gap-2 text-white font-semibold text-lg hover:no-underline">
              🚀 Start Property Valuation
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-white/60 text-sm">
        © 2025 Sustaino Pro. All platforms integrated and ready to use.
      </div>
    </div>
  );
};

export default Dashboard;