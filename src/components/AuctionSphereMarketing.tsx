/**
 * ============================================================================
 * Auction-Sphere™ Marketing Demo Component
 * Professional real estate auction platform marketing showcase
 * 
 * © 2025 Delderenzo Property Group Pty Ltd. All rights reserved.
 * 
 * TRADEMARKS:
 * - Auction-Sphere™ (TM 8901234)
 * - Live Auction Intelligence™ (TM 9012345)
 * - 3D Property Bidding™ (TM 0123456)
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
  BarChart3, MapPin, Camera, Activity, CheckCircle, ArrowRight,
  Layers, Globe, Brain, Lock, Wifi, Smartphone
} from 'lucide-react';

const AuctionSphereMarketing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bidAmount, setBidAmount] = useState(2450000);
  const [timeLeft, setTimeLeft] = useState(323);
  const [marketScore, setMarketScore] = useState(92);
  const [liveUsers, setLiveUsers] = useState(247);

  // Animated counters and live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBidAmount(prev => prev + Math.random() * 15000);
      setTimeLeft(prev => Math.max(0, prev - 1));
      setMarketScore(prev => Math.min(100, prev + Math.random() * 3));
      setLiveUsers(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Marketing slides rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % marketingSlides.length);
    }, 5000);

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

  const marketingSlides = [
    {
      title: "World's First 3D Auction Platform",
      subtitle: "Experience properties like never before",
      icon: <Layers className="h-12 w-12" />,
      color: "from-blue-500 to-cyan-500",
      features: ["WebGL 3D Visualization", "Virtual Property Tours", "Immersive Bidding"]
    },
    {
      title: "AI-Powered Bidder Intelligence",
      subtitle: "95% accuracy in financial assessment",
      icon: <Brain className="h-12 w-12" />,
      color: "from-green-500 to-emerald-500",
      features: ["Smart Qualification", "Risk Analysis", "Automated Pre-approval"]
    },
    {
      title: "Real-Time Market Analytics",
      subtitle: "150+ data points analyzed instantly",
      icon: <BarChart3 className="h-12 w-12" />,
      color: "from-purple-500 to-violet-500",
      features: ["Live Market Data", "Predictive Analytics", "ESG Climate Risk"]
    },
    {
      title: "Enterprise Security & Compliance",
      subtitle: "Bank-grade security for professionals",
      icon: <Shield className="h-12 w-12" />,
      color: "from-orange-500 to-red-500",
      features: ["ASIC Compliant", "Encrypted Transactions", "Audit Trails"]
    }
  ];

  const stats = [
    { number: "10,000+", label: "Properties Auctioned", icon: <Building2 className="h-6 w-6" /> },
    { number: "95%", label: "AI Accuracy Rate", icon: <Target className="h-6 w-6" /> },
    { number: "24/7", label: "Global Platform", icon: <Globe className="h-6 w-6" /> },
    { number: "100+", label: "Advanced Features", icon: <Zap className="h-6 w-6" /> }
  ];

  const keyFeatures = [
    {
      title: "Live 3D Auctions",
      description: "Industry-first WebGL property visualization with real-time bidding",
      icon: <Gavel className="h-8 w-8" />,
      badge: "Patented"
    },
    {
      title: "AI Bidder Qualification",
      description: "Comprehensive financial assessment with 95% accuracy",
      icon: <Brain className="h-8 w-8" />,
      badge: "AI-Powered"
    },
    {
      title: "Market Intelligence",
      description: "Real-time analytics with 150+ data points analysis",
      icon: <BarChart3 className="h-8 w-8" />,
      badge: "Advanced"
    },
    {
      title: "ESG Climate Risk",
      description: "Comprehensive environmental and sustainability scoring",
      icon: <Shield className="h-8 w-8" />,
      badge: "Innovation"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden relative">
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Main Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
              <Crown className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-7xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Auction-Sphere™
              </h1>
              <p className="text-2xl text-slate-300 font-bold">The Future of Real Estate Auctions</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl shadow-2xl">
              <Rocket className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-6 flex-wrap mb-8">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 text-lg font-bold">
              <Sparkles className="h-5 w-5 mr-2" />
              World's First 3D Auction Platform
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 text-lg font-bold">
              <Award className="h-5 w-5 mr-2" />
              Patent Protected Technology
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-6 py-3 text-lg font-bold">
              <Zap className="h-5 w-5 mr-2" />
              AI-Powered Intelligence
            </Badge>
          </div>

          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Revolutionary real estate auction platform combining cutting-edge 3D visualization, 
            AI-powered bidder qualification, and comprehensive market intelligence for the world's 
            most advanced property auction experience.
          </p>
        </div>

        {/* Live Demo Section */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-12">
          {/* Main Auction Interface */}
          <Card className="xl:col-span-3 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border-slate-700/50 shadow-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="animate-pulse bg-red-500 w-4 h-4 rounded-full"></div>
                  <CardTitle className="text-white text-2xl font-bold">LIVE AUCTION</CardTitle>
                  <Badge variant="destructive" className="animate-pulse text-lg px-4 py-2">
                    <Timer className="h-4 w-4 mr-2" />
                    {formatTime(timeLeft)} left
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Wifi className="h-5 w-5 text-green-400" />
                  <span className="font-bold">{liveUsers} users online</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Property Showcase */}
              <div className="relative h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Building2 className="h-20 w-20 mx-auto mb-4 animate-bounce text-cyan-400" />
                    <h3 className="text-2xl font-bold mb-2">3D WebGL Visualization</h3>
                    <p className="text-lg opacity-90">Immersive Property Experience</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-cyan-500 text-white font-bold">
                    <Camera className="h-4 w-4 mr-2" />
                    WebGL 3D
                  </Badge>
                  <Badge className="bg-green-500 text-white font-bold">
                    <Eye className="h-4 w-4 mr-2" />
                    Virtual Tour
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-bold">15 Harbour View Terrace</h4>
                  <p className="text-lg opacity-90">Luxury Apartment • Sydney NSW</p>
                </div>
                <div className="absolute bottom-4 right-4 text-white">
                  <div className="text-right">
                    <p className="text-sm opacity-75">Instant Valuation</p>
                    <p className="text-lg font-bold">{formatCurrency(2650000)}</p>
                  </div>
                </div>
              </div>

              {/* Bidding Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30">
                  <CardContent className="p-6 text-center">
                    <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-3" />
                    <p className="text-green-400 text-sm font-bold mb-2">CURRENT BID</p>
                    <p className="text-3xl font-black text-white animate-pulse">
                      {formatCurrency(bidAmount)}
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-4 text-slate-300">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span className="font-bold">12 bidders</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span className="font-bold">45 watching</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30">
                  <CardContent className="p-6 text-center">
                    <Target className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                    <p className="text-blue-400 text-sm font-bold mb-2">MARKET SCORE</p>
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <p className="text-3xl font-black text-white">{marketScore.toFixed(0)}/100</p>
                      <Star className="h-8 w-8 text-yellow-400 fill-current animate-pulse" />
                    </div>
                    <Progress value={marketScore} className="h-3" />
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 border-purple-500/30">
                  <CardContent className="p-6 text-center">
                    <Brain className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                    <p className="text-purple-400 text-sm font-bold mb-2">AI QUALIFICATION</p>
                    <p className="text-3xl font-black text-white mb-3">95%</p>
                    <p className="text-sm text-slate-300 font-bold">Accuracy Rate</p>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-lg py-4">
                  <Gavel className="h-5 w-5 mr-2" />
                  Place Bid Now
                </Button>
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 font-bold">
                  <Eye className="h-5 w-5 mr-2" />
                  Watch Auction
                </Button>
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 font-bold">
                  <Smartphone className="h-5 w-5 mr-2" />
                  Mobile App
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Marketing Slides */}
          <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border-slate-700/50 shadow-2xl">
            <CardContent className="p-6 h-full flex flex-col justify-center">
              <div className={`text-center p-6 rounded-xl bg-gradient-to-r ${marketingSlides[currentSlide].color} bg-opacity-20 border border-opacity-30`}>
                <div className="text-white mb-4">
                  {marketingSlides[currentSlide].icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {marketingSlides[currentSlide].title}
                </h3>
                <p className="text-slate-300 mb-4">
                  {marketingSlides[currentSlide].subtitle}
                </p>
                <div className="space-y-2">
                  {marketingSlides[currentSlide].features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg border-slate-700/50 hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center">
                <div className="text-blue-400 mb-4">{stat.icon}</div>
                <p className="text-3xl font-black text-white mb-2">{stat.number}</p>
                <p className="text-slate-300 font-bold">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {keyFeatures.map((feature, index) => (
            <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg border-slate-700/50 hover:scale-105 transition-transform">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-blue-400">{feature.icon}</div>
                  <Badge variant="secondary" className="font-bold">{feature.badge}</Badge>
                </div>
                <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border-blue-500/30 shadow-2xl">
          <CardContent className="p-12 text-center">
            <h3 className="text-4xl font-black text-white mb-6">
              Ready to Experience the Future?
            </h3>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Join thousands of real estate professionals using Auction-Sphere™ to revolutionize 
              property auctions with cutting-edge 3D technology and AI-powered insights.
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 text-xl font-bold">
                Start Free Trial
                <ArrowRight className="h-6 w-6 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 px-12 py-4 text-xl font-bold">
                Watch Demo
                <Camera className="h-6 w-6 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12">
          <Badge className="bg-gradient-to-r from-slate-700 to-slate-800 text-slate-300 px-8 py-3 text-lg font-bold">
            © 2025 Auction-Sphere™ - Revolutionary Patent Protected Technology
          </Badge>
          <p className="text-slate-400 mt-4 text-sm">
            Experience the world's most advanced real estate auction platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuctionSphereMarketing;