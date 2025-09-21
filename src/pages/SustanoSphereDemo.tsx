/**
 * ============================================================================
 * SUSTANO-SPHERE™ DEMO PAGE - WORKING IMPLEMENTATION
 * Complete functional demo of Sustaino Sphere for your platform
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Leaf, Globe, TrendingUp, Shield, Award, Star, Zap, 
  Users, DollarSign, Building2, Eye, Heart, Share2,
  CheckCircle, ArrowRight, Smartphone, Camera, Lock,
  BarChart3, Target, Crown, Sparkles, ArrowLeft, Home,
  Brain, Layers, Activity, Timer, Play, Maximize,
  ThumbsUp, MapPin, Rocket, FileText, Gamepad2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SustanoSphereDemo = () => {
  const navigate = useNavigate();
  
  // Live data simulation
  const [liveData, setLiveData] = useState({
    auctions: 156,
    volume: 4200000,
    esgScore: 94,
    bidders: 1247,
    currentAsset: 0
  });

  // Demo assets
  const demoAssets = [
    {
      id: 1,
      title: "EcoCommerce Platform",
      subtitle: "Sustainable E-commerce Solution • Monthly Revenue $52k",
      currentBid: 250000,
      esgScore: 92,
      monthlyRevenue: 52000,
      features: ["Carbon Neutral", "ESG Tracking", "Green Supply Chain"],
      category: "E-commerce",
      users: 15000
    },
    {
      id: 2,
      title: "FinTech ESG Dashboard", 
      subtitle: "Sustainable Investment Platform • 500+ Enterprise Clients",
      currentBid: 180000,
      esgScore: 88,
      monthlyRevenue: 35000,
      features: ["ESG Analytics", "Impact Reporting", "Carbon Credits"],
      category: "FinTech",
      users: 8500
    },
    {
      id: 3,
      title: "Green Tech Analytics",
      subtitle: "Environmental Impact Platform • AI-Powered Insights", 
      currentBid: 95000,
      esgScore: 96,
      monthlyRevenue: 28000,
      features: ["Climate Risk", "Sustainability Metrics", "AI Predictions"],
      category: "Analytics",
      users: 5200
    }
  ];

  // Live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        auctions: prev.auctions + Math.floor(Math.random() * 3),
        volume: prev.volume + Math.random() * 50000,
        esgScore: Math.min(100, prev.esgScore + Math.random() * 1),
        bidders: prev.bidders + Math.floor(Math.random() * 10) - 5,
        currentAsset: (prev.currentAsset + 1) % demoAssets.length
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const currentAsset = demoAssets[liveData.currentAsset];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-950 to-teal-950 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/8 via-emerald-500/5 to-teal-500/8"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-400/15 to-emerald-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-teal-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500 text-white animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              LIVE DEMO
            </Badge>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-green-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent">
              Sustano-Sphere™
            </h1>
            <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-500 rounded-full flex items-center justify-center shadow-2xl">
              <Globe className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <p className="text-2xl text-slate-200 mb-6 max-w-4xl mx-auto">
            The world's first ESG-integrated digital asset auction platform
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 text-lg font-bold">
              <Gamepad2 className="h-5 w-5 mr-2" />
              Gaming Ready
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 text-lg font-bold">
              <Award className="h-5 w-5 mr-2" />
              ESG Certified
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-6 py-3 text-lg font-bold">
              <Brain className="h-5 w-5 mr-2" />
              AI Powered
            </Badge>
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-green-500/30 text-white">
            <CardContent className="p-6 text-center">
              <Globe className="h-12 w-12 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-300">{liveData.auctions}+</div>
              <div className="text-sm text-gray-300">Live Auctions</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-blue-500/30 text-white">
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-300">{Math.round(liveData.esgScore)}/100</div>
              <div className="text-sm text-gray-300">ESG Score</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 text-white">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-purple-300">{liveData.bidders}</div>
              <div className="text-sm text-gray-300">Active Bidders</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-orange-500/30 text-white">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-12 w-12 text-orange-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-orange-300">{formatCurrency(liveData.volume)}</div>
              <div className="text-sm text-gray-300">Total Volume</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Demo Area */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
          {/* Live Auction */}
          <Card className="xl:col-span-2 bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="animate-pulse bg-green-500 w-4 h-4 rounded-full"></div>
                  <CardTitle className="text-white text-2xl">LIVE ESG AUCTION</CardTitle>
                  <Badge className="bg-green-500 text-white">
                    <Leaf className="h-4 w-4 mr-2" />
                    ESG: {currentAsset.esgScore}/100
                  </Badge>
                </div>
                <div className="text-slate-300">
                  <Activity className="h-5 w-5 inline mr-2" />
                  {liveData.bidders} bidders
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Asset Display */}
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{currentAsset.title}</h3>
                    <p className="text-slate-300">{currentAsset.subtitle}</p>
                    <div className="flex gap-2 mt-2">
                      {currentAsset.features.map((feature, index) => (
                        <span key={index} className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-sm">Current Bid</p>
                    <p className="text-3xl font-bold text-green-300">{formatCurrency(currentAsset.currentBid)}</p>
                    <p className="text-slate-400 text-sm">{currentAsset.users.toLocaleString()} users</p>
                  </div>
                </div>

                {/* ESG Score Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">ESG Score</span>
                    <span className="text-green-300">{currentAsset.esgScore}/100</span>
                  </div>
                  <Progress value={currentAsset.esgScore} className="h-3" />
                </div>
              </div>

              {/* Bidding Interface */}
              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold">
                  <Zap className="h-4 w-4 mr-2" />
                  Place Bid
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Heart className="h-4 w-4 mr-2" />
                  Watch Asset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar Widget */}
          <Card className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 border-green-500/30 text-white">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Sustano-Sphere™</CardTitle>
                  <p className="text-green-300 text-sm">ESG Marketplace</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">Platform Status</span>
                  <Badge className="bg-green-500">LIVE</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Next Auction</span>
                  <span className="text-white">2m 45s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Top ESG Score</span>
                  <span className="text-green-300">96/100</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                <Play className="h-4 w-4 mr-2" />
                Join Next Auction
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Feature Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:shadow-xl transition-all">
            <CardContent className="p-6 text-center">
              <Leaf className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">ESG Scoring</h3>
              <p className="text-slate-300">Comprehensive sustainability analysis for every asset</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:shadow-xl transition-all">
            <CardContent className="p-6 text-center">
              <Brain className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">AI Analytics</h3>
              <p className="text-slate-300">Smart algorithms for accurate valuations</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 hover:shadow-xl transition-all">
            <CardContent className="p-6 text-center">
              <Activity className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Live Trading</h3>
              <p className="text-slate-300">Real-time auctions with instant bidding</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 hover:shadow-xl transition-all">
            <CardContent className="p-6 text-center">
              <Gamepad2 className="h-16 w-16 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Gaming Integration</h3>
              <p className="text-slate-300">Seamlessly integrated for gaming platforms</p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-green-600 to-emerald-600 border-0 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join the world's first ESG-integrated digital asset marketplace
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-bold">
                <Rocket className="h-5 w-5 mr-2" />
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/ceo-chess')}
              >
                <Crown className="h-5 w-5 mr-2" />
                CEO Chess Challenge
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SustanoSphereDemo;