/**
 * ============================================================================
 * SAM (SUSTAINABLE ASSESSMENT MANAGEMENT) PLATFORM
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * SAM Platform - Complete ESG Assessment & Management System
 * Crypto Banking, ESG BET™, Social Impact Tracking Platform
 * ============================================================================
 */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Leaf, 
  Target, 
  TrendingUp, 
  Coins, 
  CreditCard, 
  Send, 
  Home, 
  Trophy, 
  Gift,
  Shield,
  BarChart3,
  Settings,
  Users,
  Zap,
  Sparkles,
  ChevronRight,
  Building,
  DollarSign,
  Globe,
  Lock,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandedHeader from '@/components/BrandedHeader';
import AuthStatus from '@/components/AuthStatus';
import PropertyValuation3DBackground from '@/components/PropertyValuation3DBackground';
import AIAssistantToggle from '@/components/AIAssistantToggle';
import SAMForecastingEngine from '@/components/SAMForecastingEngine';

const SAMPlatform = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [esgScore, setEsgScore] = useState(87);
  const [cryptoBalance, setCryptoBalance] = useState({ STNO: 1250.50, GRN: 850.75 });
  const [socialImpactFund, setSocialImpactFund] = useState(125000);

  // Mock data for demonstration
  const esgMetrics = {
    environmental: 92,
    social: 85,
    governance: 84,
    overall: 87
  };

  const cryptoData = [
    { symbol: 'STNO', name: 'SustainoCoin', price: 2.45, change: 8.3, balance: 1250.50 },
    { symbol: 'GRN', name: 'Greenium Token', price: 1.89, change: -2.1, balance: 850.75 },
    { symbol: 'BTC', name: 'Bitcoin', price: 45680.12, change: 5.7, balance: 0.025 },
  ];

  const airdropCampaigns = [
    { name: 'Green Building Incentive', reward: '100 STNO', participants: 2450, ends: '2025-01-15' },
    { name: 'Solar Installation Bonus', reward: '250 GRN', participants: 890, ends: '2025-01-20' },
    { name: 'ESG Champions Program', reward: '500 STNO', participants: 156, ends: '2025-01-30' },
  ];

  const esgBetMarkets = [
    { property: '123 Green Street, Sydney', currentBid: '$1.2M', timeLeft: '2h 34m', participants: 15 },
    { property: '456 Solar Ave, Melbourne', currentBid: '$850K', timeLeft: '5h 12m', participants: 8 },
    { property: '789 Wind Lane, Brisbane', currentBid: '$2.1M', timeLeft: '1d 3h', participants: 23 },
  ];

  return (
    <div className="min-h-screen hero-green-background relative overflow-hidden">
      {/* Enhanced 3D Background Effect */}
      <div className="absolute inset-0 green-glow-effect opacity-40"></div>
      <div className="absolute inset-0">
        <PropertyValuation3DBackground />
      </div>
      
      {/* Enhanced green gradient background */}
      <div className="absolute inset-0 hero-green-background backdrop-blur-sm" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full blur-xl animate-green-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-teal-400/25 to-emerald-400/25 rounded-full blur-2xl animate-green-glow" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10">
        <BrandedHeader />
        
        {/* Navigation Links */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="green-3d-button flex items-center gap-2 px-4 py-2 hover:shadow-green-glow rounded-lg transition-all duration-300 text-white font-medium animate-green-glow backdrop-blur-sm border border-green-300/70"
              >
                🏠 Back to Dashboard
              </Link>
              <Link 
                to="/dashboard" 
                className="green-3d-button flex items-center gap-2 px-4 py-2 hover:shadow-green-glow rounded-lg transition-all duration-300 text-white font-medium animate-green-pulse backdrop-blur-sm border border-green-300/70"
              >
                📊 Analytics Dashboard
              </Link>
              <Link 
                to="/index" 
                className="green-3d-button flex items-center gap-2 px-4 py-2 hover:shadow-green-glow rounded-lg transition-all duration-300 text-white font-medium animate-green-pulse backdrop-blur-sm border border-green-300/70"
              >
                🌍 ESG Platform
              </Link>
              <Link 
                to="/crypto-trading" 
                className="green-3d-button flex items-center gap-2 px-4 py-2 hover:shadow-green-glow rounded-lg transition-all duration-300 text-white font-medium animate-green-pulse backdrop-blur-sm border border-green-300/70"
              >
                ⚡ Blockchain Hub
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <AuthStatus />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6 animate-float-3d">
              <div className="green-glow-effect">
                <Target className="h-12 w-12 text-primary animate-green-glow" />
              </div>
              <Sparkles className="h-10 w-10 text-secondary animate-green-pulse" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent mb-6 animate-scale-in">
              SAM Platform
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-emerald-600 mb-4">
              Sustainable Assessment Management
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Complete ESG Assessment & Management System with Crypto Banking, ESG BET™, and Social Impact Tracking
            </p>
          </div>

          {/* Main Platform Tabs */}
          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-7 lg:grid-cols-7 bg-background/50 backdrop-blur-sm border border-green-200/50">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="esg-assessment" className="flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  ESG Assessment
                </TabsTrigger>
                <TabsTrigger value="ai-forecasting" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  AI Forecasting
                </TabsTrigger>
                <TabsTrigger value="crypto-banking" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Crypto Banking
                </TabsTrigger>
                <TabsTrigger value="esg-bet" className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  ESG BET™
                </TabsTrigger>
                <TabsTrigger value="airdrops" className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Airdrops
                </TabsTrigger>
                <TabsTrigger value="social-impact" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Social Impact
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-emerald-700">Overall ESG Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-emerald-600">{esgScore}/100</div>
                      <Progress value={esgScore} className="mt-2" />
                      <p className="text-xs text-emerald-600 mt-1">Excellent Rating</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-blue-700">Crypto Portfolio</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">$5,247</div>
                      <p className="text-xs text-blue-600 mt-1">+12.5% this month</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">STNO: {cryptoBalance.STNO}</Badge>
                        <Badge variant="outline" className="text-xs">GRN: {cryptoBalance.GRN}</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-purple-700">Social Impact Fund</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-600">${(socialImpactFund / 1000).toFixed(0)}K</div>
                      <p className="text-xs text-purple-600 mt-1">Community projects funded</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Users className="h-3 w-3 text-purple-500" />
                        <span className="text-xs text-purple-600">2,450+ beneficiaries</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-orange-700">Active Bets</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-orange-600">12</div>
                      <p className="text-xs text-orange-600 mt-1">ESG BET™ markets</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Trophy className="h-3 w-3 text-orange-500" />
                        <span className="text-xs text-orange-600">86% win rate</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Leaf className="h-5 w-5 text-emerald-600" />
                          <div>
                            <p className="font-medium">ESG Assessment Completed</p>
                            <p className="text-sm text-muted-foreground">Property at 123 Green Street</p>
                          </div>
                        </div>
                        <Badge variant="secondary">+5 STNO</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">Crypto Transfer Completed</p>
                            <p className="text-sm text-muted-foreground">Sent 100 GRN to solar project</p>
                          </div>
                        </div>
                        <Badge variant="secondary">-100 GRN</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Trophy className="h-5 w-5 text-purple-600" />
                          <div>
                            <p className="font-medium">ESG BET™ Won</p>
                            <p className="text-sm text-muted-foreground">Sustainable building auction</p>
                          </div>
                        </div>
                        <Badge variant="secondary">+250 STNO</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ESG Assessment Tab */}
              <TabsContent value="esg-assessment" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-6 w-6 text-emerald-600" />
                      Comprehensive ESG Assessment
                    </CardTitle>
                    <CardDescription>
                      40+ factor comprehensive scoring with property-type specific weighting
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center p-4 bg-emerald-50 rounded-lg">
                        <div className="text-3xl font-bold text-emerald-600 mb-2">{esgMetrics.environmental}</div>
                        <div className="text-sm font-medium text-emerald-700">Environmental</div>
                        <Progress value={esgMetrics.environmental} className="mt-2" />
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{esgMetrics.social}</div>
                        <div className="text-sm font-medium text-blue-700">Social</div>
                        <Progress value={esgMetrics.social} className="mt-2" />
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-3xl font-bold text-purple-600 mb-2">{esgMetrics.governance}</div>
                        <div className="text-sm font-medium text-purple-700">Governance</div>
                        <Progress value={esgMetrics.governance} className="mt-2" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button className="w-full" size="lg">
                        <Zap className="h-5 w-5 mr-2" />
                        Start New ESG Assessment
                      </Button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Detailed Report
                        </Button>
                        <Button variant="outline" className="w-full">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Benchmarking Analysis
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* AI Forecasting Tab */}
              <TabsContent value="ai-forecasting" className="space-y-6">
                <SAMForecastingEngine />
              </TabsContent>

              {/* Crypto Banking Tab */}
              <TabsContent value="crypto-banking" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Coins className="h-6 w-6 text-blue-600" />
                        Token Portfolio
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {cryptoData.map((token, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                {token.symbol.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{token.name}</div>
                                <div className="text-sm text-muted-foreground">{token.symbol}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">${token.price.toFixed(2)}</div>
                              <div className={`text-sm ${token.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {token.change > 0 ? '+' : ''}{token.change}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-6 w-6 text-green-600" />
                        Debit Cards & Transfers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">SAM Visa Debit</span>
                            <span className="text-sm">**** 4521</span>
                          </div>
                          <div className="text-2xl font-bold">$5,247.89</div>
                          <div className="text-sm opacity-90">Available Balance</div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <Button className="w-full">
                            <Send className="h-4 w-4 mr-2" />
                            Send Money
                          </Button>
                          <Button variant="outline" className="w-full">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Card Settings
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* ESG BET™ Tab */}
              <TabsContent value="esg-bet" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-6 w-6 text-orange-600" />
                      ESG BET™ - Real Estate Auction Betting
                    </CardTitle>
                    <CardDescription>
                      Bet on sustainable real estate auctions with 5% house edge going to social impact fund
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {esgBetMarkets.map((market, index) => (
                        <div key={index} className="p-4 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{market.property}</div>
                              <div className="text-sm text-muted-foreground">
                                {market.participants} participants • {market.timeLeft} left
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-orange-600">{market.currentBid}</div>
                              <Button size="sm" className="mt-2">Place Bet</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Airdrops Tab */}
              <TabsContent value="airdrops" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="h-6 w-6 text-pink-600" />
                      Airdrop Campaigns
                    </CardTitle>
                    <CardDescription>
                      Join token distribution campaigns for sustainable initiatives
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {airdropCampaigns.map((campaign, index) => (
                        <div key={index} className="p-4 border border-pink-200 rounded-lg hover:bg-pink-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{campaign.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {campaign.participants} participants • Ends {campaign.ends}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-pink-600">{campaign.reward}</div>
                              <Button size="sm" variant="outline" className="mt-2">Join Campaign</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Social Impact Tab */}
              <TabsContent value="social-impact" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-6 w-6 text-purple-600" />
                      Social Impact Tracking
                    </CardTitle>
                    <CardDescription>
                      Track community projects funded through SAM platform activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-3xl font-bold text-purple-600 mb-2">${(socialImpactFund / 1000).toFixed(0)}K</div>
                        <div className="text-sm font-medium text-purple-700">Total Fund</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-600 mb-2">47</div>
                        <div className="text-sm font-medium text-green-700">Projects Funded</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600 mb-2">2,450</div>
                        <div className="text-sm font-medium text-blue-700">Lives Impacted</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">Solar Panel Installation - Community Center</div>
                          <Badge variant="secondary">Funded</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">$15,000 • 150 families benefited</div>
                        <Progress value={100} className="mt-2" />
                      </div>

                      <div className="p-4 border border-yellow-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">Water Filtration System - Rural School</div>
                          <Badge variant="outline">In Progress</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">$8,500 • 300 students</div>
                        <Progress value={65} className="mt-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Footer */}
        <div className="container mx-auto px-4 py-8 border-t border-emerald-200/30 mt-16">
          <div className="text-center space-y-2 animate-fade-in">
            <p className="text-sm font-medium text-gray-700">
              © 2025 Delderenzo Property Group Pty Ltd - SAM Platform™
            </p>
            <p className="text-sm text-gray-600">
              Sustainable Assessment Management - Complete ESG Ecosystem
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Secured by Blockchain
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                ESG Certified
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                KYC Compliant
              </Badge>
            </div>
          </div>
        </div>

        <AIAssistantToggle context="SAM Platform" />
      </div>
    </div>
  );
};

export default SAMPlatform;