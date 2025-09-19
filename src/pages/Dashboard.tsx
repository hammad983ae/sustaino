import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard-3d.css';
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
      {/* Enhanced 3D Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-white to-blue-200 rounded-full blur-3xl animate-pulse" style={{
          transform: 'perspective(1000px) rotateX(45deg) rotateY(45deg)',
          animation: 'pulse 3s ease-in-out infinite, float 6s ease-in-out infinite',
        }}></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-2xl" style={{
          transform: 'perspective(1000px) rotateX(-30deg) rotateZ(30deg)',
          animation: 'bounce 4s ease-in-out infinite, float 8s ease-in-out infinite reverse',
        }}></div>
        <div className="absolute bottom-20 left-32 w-40 h-40 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full blur-3xl animate-pulse delay-1000" style={{
          transform: 'perspective(1000px) rotateY(-45deg) rotateX(30deg)',
          animation: 'pulse 4s ease-in-out infinite 1s, float 10s ease-in-out infinite',
        }}></div>
        <div className="absolute bottom-40 right-20 w-28 h-28 bg-gradient-to-r from-orange-300 to-yellow-300 rounded-full blur-2xl" style={{
          transform: 'perspective(1000px) rotateX(60deg) rotateZ(-30deg)',
          animation: 'bounce 5s ease-in-out infinite 0.5s, float 7s ease-in-out infinite reverse',
        }}></div>
      </div>

      {/* 3D Grid Background */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        transform: 'perspective(1000px) rotateX(60deg)',
        transformOrigin: 'center bottom',
      }}></div>

      {/* Header with Enhanced 3D Logo */}
      <div className="relative z-10 text-center py-12 px-4"
           style={{
             transform: 'perspective(1000px)',
           }}>
        <div className="mb-8">
          <Badge variant="secondary" className="mb-6 bg-white/25 text-white border-white/40 hover:bg-white/35 transition-all duration-300 backdrop-blur-sm" style={{
            transform: 'perspective(1000px) rotateX(-5deg)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2), 0 0 20px rgba(255,255,255,0.1)',
          }}>
            <Sparkles className="h-4 w-4 mr-2" />
            Sustaino Pro - Complete Platform Ecosystem
          </Badge>
        </div>
        
        {/* Enhanced Logo Section */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center gap-4">
                <h1 className="text-7xl font-bold text-white drop-shadow-2xl" style={{
                  textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(59,130,246,0.3), 0 0 60px rgba(139,92,246,0.2)',
                  transform: 'perspective(1000px) rotateX(5deg)',
                }}>
                  Sustaino Pro
                </h1>
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
                  <Moon className="relative h-12 w-12 text-blue-200 animate-pulse" style={{
                    filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.8))',
                    transform: 'perspective(1000px) rotateY(-15deg)',
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-5xl font-semibold text-white/95 mb-6" style={{
          textShadow: '0 0 15px rgba(255,255,255,0.3), 0 0 30px rgba(59,130,246,0.2)',
          transform: 'perspective(1000px) rotateX(2deg)',
        }}>
          ICV (Instant Comprehensive Valuation)™
        </h2>
        
        <p className="text-2xl text-white/85 mb-4 font-medium" style={{
          textShadow: '0 0 10px rgba(255,255,255,0.2)',
          transform: 'perspective(1000px) rotateX(1deg)',
        }}>
          AI-Powered Property Valuation And Assessment Technology
        </p>
        
        <p className="text-white/75 text-base mb-8" style={{
          textShadow: '0 0 8px rgba(255,255,255,0.1)',
        }}>
          Patent Pending • IP Protected • Trademark © • Copyright Protected
        </p>

        {/* Enhanced 3D Stats with Floating Animation */}
        <div className="flex justify-center gap-8 mt-12 mb-12 flex-wrap">
          <div className="bg-gradient-to-br from-white/25 to-white/15 backdrop-blur-lg rounded-2xl px-10 py-8 text-center border border-white/30 hover:border-white/50 transition-all duration-500 group"
               style={{
                 transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                 boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(59,130,246,0.2)',
                 animation: 'float 6s ease-in-out infinite',
               }}>
            <div className="flex items-center justify-center mb-3">
              <Building className="h-8 w-8 text-blue-200 mr-3" style={{
                filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.5))',
              }} />
              <div className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300" style={{
                textShadow: '0 0 15px rgba(255,255,255,0.5)',
              }}>28</div>
            </div>
            <div className="text-white/90 text-base font-medium">Total Platforms</div>
          </div>
          
          <div className="bg-gradient-to-br from-white/25 to-white/15 backdrop-blur-lg rounded-2xl px-10 py-8 text-center border border-white/30 hover:border-white/50 transition-all duration-500 group"
               style={{
                 transform: 'perspective(1000px) rotateY(0deg) rotateX(5deg)',
                 boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(16,185,129,0.2)',
                 animation: 'float 6s ease-in-out infinite 1s',
               }}>
            <div className="flex items-center justify-center mb-3">
              <BarChart3 className="h-8 w-8 text-emerald-200 mr-3" style={{
                filter: 'drop-shadow(0 0 10px rgba(16,185,129,0.5))',
              }} />
              <div className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300" style={{
                textShadow: '0 0 15px rgba(255,255,255,0.5)',
              }}>8</div>
            </div>
            <div className="text-white/90 text-base font-medium">Categories</div>
          </div>
          
          <div className="bg-gradient-to-br from-white/25 to-white/15 backdrop-blur-lg rounded-2xl px-10 py-8 text-center border border-white/30 hover:border-white/50 transition-all duration-500 group"
               style={{
                 transform: 'perspective(1000px) rotateY(5deg) rotateX(5deg)',
                 boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(139,92,246,0.2)',
                 animation: 'float 6s ease-in-out infinite 2s',
               }}>
            <div className="flex items-center justify-center mb-3">
              <Globe className="h-8 w-8 text-purple-200 mr-3" style={{
                filter: 'drop-shadow(0 0 10px rgba(139,92,246,0.5))',
              }} />
              <div className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300" style={{
                textShadow: '0 0 15px rgba(255,255,255,0.5)',
              }}>24/7</div>
            </div>
            <div className="text-white/90 text-base font-medium">Availability</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-400/30 to-red-400/30 backdrop-blur-lg rounded-2xl px-10 py-8 text-center border border-orange-300/40 hover:border-orange-300/70 transition-all duration-500 group"
               style={{
                 transform: 'perspective(1000px) rotateY(10deg) rotateX(5deg)',
                 boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(251,146,60,0.3)',
                 animation: 'float 6s ease-in-out infinite 3s',
               }}>
            <div className="flex items-center justify-center mb-3">
              <Zap className="h-8 w-8 text-orange-200 mr-3" style={{
                filter: 'drop-shadow(0 0 10px rgba(251,146,60,0.7))',
              }} />
              <div className="text-4xl font-bold text-orange-100 group-hover:scale-110 transition-transform duration-300" style={{
                textShadow: '0 0 15px rgba(255,255,255,0.5)',
              }}>AI</div>
            </div>
            <div className="text-orange-200 text-base font-medium">Powered</div>
          </div>
        </div>
      </div>

      {/* Enhanced 3D Navigation Tabs */}
      <div className="relative z-10 px-4 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-white/20 to-white/15 backdrop-blur-xl rounded-3xl p-4 border border-white/30 shadow-2xl"
               style={{
                 transform: 'perspective(1000px) rotateX(-2deg)',
                 boxShadow: '0 25px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
               }}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-transparent space-x-2">
                <TabsTrigger 
                  value="platform-access" 
                  className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/40 data-[state=active]:to-purple-500/40 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/40 rounded-2xl transition-all duration-500 transform hover:scale-105"
                  style={{
                    transform: 'perspective(1000px) rotateX(5deg)',
                    boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1)',
                  }}
                >
                  <Building className="h-4 w-4 mr-1" />
                  Platform Access
                </TabsTrigger>
                <TabsTrigger 
                  value="data-tools" 
                  className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/40 data-[state=active]:to-teal-500/40 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/40 rounded-2xl transition-all duration-500 transform hover:scale-105"
                  style={{
                    transform: 'perspective(1000px) rotateX(5deg)',
                    boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1)',
                  }}
                >
                  <Database className="h-4 w-4 mr-1" />
                  Data Tools
                </TabsTrigger>
                <TabsTrigger 
                  value="marketing-hub" 
                  className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/40 data-[state=active]:to-rose-500/40 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/40 rounded-2xl transition-all duration-500 transform hover:scale-105"
                  style={{
                    transform: 'perspective(1000px) rotateX(5deg)',
                    boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1)',
                  }}
                >
                  <Megaphone className="h-4 w-4 mr-1" />
                  Marketing Hub
                </TabsTrigger>
                <TabsTrigger 
                  value="brochures" 
                  className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/40 data-[state=active]:to-amber-500/40 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/40 rounded-2xl transition-all duration-500 transform hover:scale-105"
                  style={{
                    transform: 'perspective(1000px) rotateX(5deg)',
                    boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1)',
                  }}
                >
                  <BookOpen className="h-4 w-4 mr-1" />
                  Brochures
                </TabsTrigger>
                <TabsTrigger 
                  value="ip-security" 
                  className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500/40 data-[state=active]:to-pink-500/40 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/40 rounded-2xl transition-all duration-500 transform hover:scale-105"
                  style={{
                    transform: 'perspective(1000px) rotateX(5deg)',
                    boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1)',
                  }}
                >
                  <Shield className="h-4 w-4 mr-1" />
                  IP Security
                </TabsTrigger>
                <TabsTrigger 
                  value="advanced-features" 
                  className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500/40 data-[state=active]:to-purple-500/40 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/40 rounded-2xl transition-all duration-500 transform hover:scale-105"
                  style={{
                    transform: 'perspective(1000px) rotateX(5deg)',
                    boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1)',
                  }}
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
                      <Card className="bg-gradient-to-br from-blue-500/25 to-indigo-600/25 backdrop-blur-lg border-blue-300/40 hover:border-blue-300/70 transition-all duration-500 cursor-pointer h-full group hover:scale-110 hover:shadow-2xl"
                            style={{
                              transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                              boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(59,130,246,0.2)',
                            }}>
                        <CardContent className="p-8 text-center">
                          <div className="relative mb-6">
                            <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                                 style={{
                                   transform: 'scale(1.5)',
                                 }}></div>
                            <BarChart3 className="relative h-16 w-16 mx-auto text-blue-300 group-hover:text-blue-200 transition-colors"
                                      style={{
                                        filter: 'drop-shadow(0 0 15px rgba(59,130,246,0.7))',
                                        transform: 'perspective(500px) rotateX(15deg)',
                                      }} />
                          </div>
                          <h4 className="text-xl font-semibold text-white mb-3" style={{
                            textShadow: '0 0 10px rgba(255,255,255,0.3)',
                          }}>Analytics Dashboard</h4>
                          <p className="text-white/80 text-sm mb-4">Comprehensive analytics and reporting</p>
                          <Badge className="bg-gradient-to-r from-green-500/40 to-emerald-500/40 text-green-200 border-green-400/50 hover:from-green-500/50 hover:to-emerald-500/50 transition-all duration-300"
                                 style={{
                                   boxShadow: '0 0 15px rgba(34,197,94,0.3)',
                                 }}>
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