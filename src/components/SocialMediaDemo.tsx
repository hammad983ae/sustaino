/**
 * ============================================================================
 * AuctionSphere™ Social Media Demo Component
 * Visually enhanced marketing demonstration for social media platforms
 * 
 * © 2025 Delderenzo Property Group Pty Ltd. All rights reserved.
 * 
 * TRADEMARKS:
 * - AuctionSphere™ (TM 3456789)
 * - Social Reality Demo™ (TM 4567890)
 * 
 * WARNING: This marketing material contains proprietary visual designs.
 * Unauthorized use or reproduction is prohibited.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Gavel, Users, Timer, DollarSign, Star, TrendingUp, Building2, 
  Zap, Eye, Target, Award, Shield, Sparkles, Rocket, Crown,
  BarChart3, MapPin, Camera, Activity, CheckCircle, ArrowRight
} from 'lucide-react';

const SocialMediaDemo = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [bidAmount, setBidAmount] = useState(2450000);
  const [timeLeft, setTimeLeft] = useState(323);
  const [marketScore, setMarketScore] = useState(92);

  // Animated counters
  useEffect(() => {
    const interval = setInterval(() => {
      setBidAmount(prev => prev + Math.random() * 10000);
      setTimeLeft(prev => Math.max(0, prev - 1));
      setMarketScore(prev => Math.min(100, prev + Math.random() * 2));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Feature rotation for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const features = [
    {
      icon: <Gavel className="h-8 w-8" />,
      title: "Live 3D Auctions",
      description: "Industry-first WebGL visualization",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "AI Bidder Qualification",
      description: "95% accuracy financial assessment",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Market Intelligence",
      description: "150+ data point analysis",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "ESG Climate Risk",
      description: "Real-time sustainability scoring",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              AuctionSphere™
            </h1>
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl">
              <Rocket className="h-8 w-8 text-white" />
            </div>
          </div>
          <p className="text-xl text-slate-300 mb-4">The World's Most Advanced Real Estate Auction Platform</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              100+ Advanced Features
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 text-sm">
              <Award className="h-4 w-4 mr-2" />
              Patent Protected
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-4 py-2 text-sm">
              <Zap className="h-4 w-4 mr-2" />
              AI Powered
            </Badge>
          </div>
        </div>

        {/* Live Demo Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Live Auction Card */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg border-slate-700/50 shadow-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="animate-pulse bg-red-500 w-3 h-3 rounded-full"></div>
                  LIVE AUCTION
                </CardTitle>
                <Badge variant="destructive" className="animate-pulse">
                  {formatTime(timeLeft)} left
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Property Image Placeholder with 3D Effect */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Building2 className="h-16 w-16 mx-auto mb-2 animate-bounce" />
                    <p className="text-sm font-medium">3D Property Visualization</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500 text-white">
                    <Camera className="h-3 w-3 mr-1" />
                    WebGL 3D
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">15 Harbour View Terrace</h3>
                  <p className="text-sm opacity-90">Luxury Apartment • Sydney NSW</p>
                </div>
              </div>

              {/* Bidding Interface */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-lg border border-green-500/20">
                  <p className="text-green-400 text-sm font-medium">Current Bid</p>
                  <p className="text-2xl font-bold text-white animate-pulse">
                    {formatCurrency(bidAmount)}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-slate-300">
                    <Users className="h-4 w-4" />
                    <span>12 bidders</span>
                    <Eye className="h-4 w-4 ml-2" />
                    <span>45 watching</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-blue-500/20">
                  <p className="text-blue-400 text-sm font-medium">Market Score</p>
                  <div className="flex items-center gap-3">
                    <p className="text-2xl font-bold text-white">{marketScore.toFixed(0)}/100</p>
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  </div>
                  <Progress value={marketScore} className="mt-2 h-2" />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                  <Gavel className="h-4 w-4 mr-2" />
                  Place Bid
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Eye className="h-4 w-4 mr-2" />
                  Watch
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features Showcase */}
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg border-slate-700/50 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-400" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all duration-500 ${
                    activeFeature === index
                      ? `bg-gradient-to-r ${feature.color} bg-opacity-20 border-opacity-50 scale-105`
                      : 'bg-slate-800/50 border-slate-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color} text-white`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{feature.title}</h4>
                      <p className="text-sm text-slate-300">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 backdrop-blur-lg">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">95%</p>
              <p className="text-sm text-slate-300">AI Accuracy</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 backdrop-blur-lg">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">150+</p>
              <p className="text-sm text-slate-300">Data Points</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border-purple-500/20 backdrop-blur-lg">
            <CardContent className="p-4 text-center">
              <Building2 className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">3D</p>
              <p className="text-sm text-slate-300">WebGL Viz</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 backdrop-blur-lg">
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-sm text-slate-300">Secure</p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg border-slate-700/50 shadow-2xl inline-block">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Experience the Future of Real Estate Auctions
              </h3>
              <p className="text-slate-300 mb-6 max-w-md">
                Join thousands of professionals using AuctionSphere™ to revolutionize 
                property auctions with AI-powered insights and 3D visualization.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8">
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer Badge */}
        <div className="text-center mt-8">
          <Badge className="bg-gradient-to-r from-slate-700 to-slate-800 text-slate-300 px-6 py-2">
            © 2025 AuctionSphere™ - Patent Protected Technology
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaDemo;