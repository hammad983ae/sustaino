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
  Layers, Globe, Brain, Lock, Wifi, Smartphone, Play, Volume2,
  Maximize, ThumbsUp, Share2, Heart, ArrowLeft, Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import luxuryApartment from '@/assets/luxury-apartment-demo.jpg';
import commercialBuilding from '@/assets/commercial-building-demo.jpg';
import auction3DInterface from '@/assets/auction-3d-interface.jpg';

const AuctionSphereMarketing = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bidAmount, setBidAmount] = useState(2450000);
  const [timeLeft, setTimeLeft] = useState(323);
  const [marketScore, setMarketScore] = useState(92);
  const [liveUsers, setLiveUsers] = useState(247);
  const [currentProperty, setCurrentProperty] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Demo properties data
  const demoProperties = [
    {
      id: 1,
      title: "15 Harbour View Terrace",
      subtitle: "Luxury Waterfront Apartment • Sydney NSW",
      image: luxuryApartment,
      price: 2650000,
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      features: ["Harbour Views", "Premium Finishes", "Concierge"]
    },
    {
      id: 2,
      title: "Collins Street Tower",
      subtitle: "Premium Commercial Office • Melbourne VIC",
      image: commercialBuilding,
      price: 8500000,
      bedrooms: null,
      bathrooms: null,
      parking: 50,
      features: ["CBD Location", "Modern Facade", "High Yield"]
    },
    {
      id: 3,
      title: "3D Auction Interface",
      subtitle: "Revolutionary Technology Preview",
      image: auction3DInterface,
      price: null,
      bedrooms: null,
      bathrooms: null,
      parking: null,
      features: ["WebGL 3D", "AI Powered", "Real-time"]
    }
  ];

  // Animated counters and live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBidAmount(prev => prev + Math.random() * 15000);
      setTimeLeft(prev => Math.max(0, prev - 1));
      setMarketScore(prev => Math.min(100, prev + Math.random() * 3));
      setLiveUsers(prev => prev + Math.floor(Math.random() * 10) - 5);
      setCurrentProperty(prev => (prev + 1) % demoProperties.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [demoProperties.length]);

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
      title: "International FDI Platform",
      description: "Foreign Direct Investment support with global property listings",
      icon: <Globe className="h-8 w-8" />,
      badge: "Global"
    },
    {
      title: "Currency Exchange Calculator",
      description: "Real-time multi-currency conversion for international transactions",
      icon: <DollarSign className="h-8 w-8" />,
      badge: "Multi-Currency"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 overflow-hidden relative">
      {/* Enhanced 3D Background Effects */}
      <div className="absolute inset-0">
        {/* Primary gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/8 via-cyan-500/5 to-purple-500/8"></div>
        
        {/* Floating 3D orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-violet-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-400/8 to-blue-400/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Dynamic grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        {/* Floating particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400/60 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-blue-400/60 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-40 left-32 w-3 h-3 bg-purple-400/60 rounded-full animate-bounce delay-1100"></div>
        <div className="absolute bottom-20 right-40 w-1.5 h-1.5 bg-violet-400/60 rounded-full animate-bounce delay-1500"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Back to Dashboard Button */}
        <div className="mb-6">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700 font-bold"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        {/* Enhanced Marketing Header with 3D Effects */}
        <div className="text-center mb-12 relative">
          {/* Floating 3D Logo Elements */}
          <div className="relative mb-12">
            <div className="flex items-center justify-center gap-8 mb-8">
              {/* Left 3D Element */}
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-purple-600/40 rounded-full blur-2xl"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl backdrop-blur-xl border border-white/20 flex items-center justify-center transform rotate-12">
                  <Crown className="h-12 w-12 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Center Logo */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 blur-3xl rounded-3xl animate-pulse"></div>
                <div className="relative">
                  <h1 className="text-9xl font-black bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl animate-glow-pulse">
                    Auction-Sphere™
                  </h1>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce shadow-lg flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Right 3D Element */}
              <div className="relative animate-float delay-1000">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-blue-500/40 rounded-full blur-2xl"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full shadow-2xl backdrop-blur-xl border border-white/20 flex items-center justify-center transform -rotate-12">
                  <Rocket className="h-12 w-12 text-white drop-shadow-lg" />
                </div>
              </div>
            </div>

            {/* Tagline with enhanced effects */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl rounded-2xl"></div>
              <p className="relative text-4xl text-slate-200 font-bold drop-shadow-lg bg-black/20 backdrop-blur-sm rounded-2xl py-4 px-8 border border-white/10">
                The Future of Real Estate Auctions
              </p>
            </div>
          </div>
          
          {/* Enhanced Feature Badges */}
          <div className="flex items-center justify-center gap-6 flex-wrap mb-8">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 text-xl font-bold shadow-2xl transform hover:scale-105 transition-transform">
              <Sparkles className="h-6 w-6 mr-3" />
              World's First 3D Platform
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 text-xl font-bold shadow-2xl transform hover:scale-105 transition-transform">
              <Award className="h-6 w-6 mr-3" />
              Patent Protected
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-8 py-4 text-xl font-bold shadow-2xl transform hover:scale-105 transition-transform">
              <Zap className="h-6 w-6 mr-3" />
              AI Intelligence
            </Badge>
          </div>

          {/* Enhanced Description */}
          <div className="max-w-5xl mx-auto">
            <p className="text-2xl text-slate-300 leading-relaxed mb-6">
              Revolutionary real estate auction platform combining cutting-edge 3D visualization, 
              AI-powered bidder qualification, and comprehensive market intelligence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20 backdrop-blur-sm">
                <Building2 className="h-12 w-12 text-blue-400 mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-white mb-2">3D Property Viewing</h3>
                <p className="text-slate-300">Immersive WebGL visualization technology</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20 backdrop-blur-sm">
                <Brain className="h-12 w-12 text-green-400 mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-white mb-2">AI Qualification</h3>
                <p className="text-slate-300">95% accuracy in bidder assessment</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-2xl p-6 border border-orange-500/20 backdrop-blur-sm">
                <Globe className="h-12 w-12 text-orange-400 mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-white mb-2">Global Platform</h3>
                <p className="text-slate-300">International FDI & currency exchange</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-2xl p-6 border border-purple-500/20 backdrop-blur-sm">
                <BarChart3 className="h-12 w-12 text-purple-400 mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-white mb-2">Live Analytics</h3>
                <p className="text-slate-300">Real-time market intelligence</p>
              </div>
            </div>
          </div>
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
              {/* Enhanced Property Showcase */}
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                {/* Property Image */}
                <img 
                  src={demoProperties[currentProperty].image} 
                  alt={demoProperties[currentProperty].title}
                  className="w-full h-full object-cover transition-all duration-1000"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                
                {/* 3D Interface Overlay for tech demo */}
                {currentProperty === 2 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-xl animate-pulse"></div>
                        <Building2 className="h-24 w-24 mx-auto relative text-cyan-300 drop-shadow-lg animate-bounce" />
                      </div>
                      <h3 className="text-3xl font-bold mb-2 drop-shadow-lg">3D WebGL Visualization</h3>
                      <p className="text-xl opacity-90 drop-shadow-lg">Revolutionary Auction Technology</p>
                    </div>
                  </div>
                )}

                {/* Live Video Controls */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-red-500/90 text-white font-bold backdrop-blur-sm border border-white/20">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                    LIVE
                  </Badge>
                  <Badge className="bg-cyan-500/90 text-white font-bold backdrop-blur-sm border border-white/20">
                    <Camera className="h-4 w-4 mr-2" />
                    4K Stream
                  </Badge>
                  {currentProperty !== 2 && (
                    <Badge className="bg-green-500/90 text-white font-bold backdrop-blur-sm border border-white/20">
                      <Eye className="h-4 w-4 mr-2" />
                      Virtual Tour
                    </Badge>
                  )}
                </div>

                {/* Video Controls */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="bg-black/50 border-white/20 text-white hover:bg-black/70 backdrop-blur-sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Volume2 className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="bg-black/50 border-white/20 text-white hover:bg-black/70 backdrop-blur-sm"
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>

                {/* Property Information */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-2xl font-bold drop-shadow-lg">{demoProperties[currentProperty].title}</h4>
                  <p className="text-lg opacity-90 drop-shadow-lg">{demoProperties[currentProperty].subtitle}</p>
                  {demoProperties[currentProperty].bedrooms && (
                    <div className="flex gap-4 mt-2 text-sm">
                      <span className="bg-white/20 px-2 py-1 rounded backdrop-blur-sm">
                        {demoProperties[currentProperty].bedrooms} bed
                      </span>
                      <span className="bg-white/20 px-2 py-1 rounded backdrop-blur-sm">
                        {demoProperties[currentProperty].bathrooms} bath
                      </span>
                      <span className="bg-white/20 px-2 py-1 rounded backdrop-blur-sm">
                        {demoProperties[currentProperty].parking} car
                      </span>
                    </div>
                  )}
                </div>

                {/* Valuation */}
                <div className="absolute bottom-4 right-4 text-white text-right">
                  {demoProperties[currentProperty].price && (
                    <>
                      <p className="text-sm opacity-75 drop-shadow-lg">Live Valuation</p>
                      <p className="text-2xl font-bold drop-shadow-lg">
                        {formatCurrency(demoProperties[currentProperty].price)}
                      </p>
                    </>
                  )}
                  <div className="flex gap-1 mt-2 justify-end">
                    <Button size="sm" variant="ghost" className="text-white/80 hover:text-white p-1">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white/80 hover:text-white p-1">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white/80 hover:text-white p-1">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Property Indicators */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {demoProperties.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentProperty ? 'bg-white' : 'bg-white/40'
                      }`}
                    />
                  ))}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

        {/* International Features Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white mb-4">
              🌍 Global Investment Platform
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto">
              The world's first international real estate auction platform supporting FDI transactions, 
              multi-currency operations, and overseas property listings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Currency Exchange Calculator */}
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border-green-500/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-green-400" />
                  Live Currency Exchange
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 font-bold mb-2 block">From Currency</label>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                      <div className="text-white font-bold text-lg">AUD</div>
                      <div className="text-green-400 text-2xl font-black">$2,650,000</div>
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-300 font-bold mb-2 block">To Currency</label>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                      <div className="text-white font-bold text-lg">USD</div>
                      <div className="text-green-400 text-2xl font-black">$1,764,500</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
                    Live Rate: 1 AUD = 0.6658 USD
                  </Badge>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {['EUR', 'GBP', 'JPY', 'CNY'].map(currency => (
                    <Button key={currency} variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                      {currency}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* FDI Transaction Support */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border-blue-500/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center gap-3">
                  <Globe className="h-8 w-8 text-blue-400" />
                  FDI Transaction Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600">
                    <span className="text-slate-300">FIRB Compliance</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600">
                    <span className="text-slate-300">International Banking</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600">
                    <span className="text-slate-300">Tax Treaty Support</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600">
                    <span className="text-slate-300">Anti-Money Laundering</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                </div>
                <div className="text-center pt-4">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
                    Supporting 45+ Countries
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* International Property Showcase */}
          <div className="mt-8">
            <Card className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 backdrop-blur-xl border-purple-500/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center gap-3">
                  <Building2 className="h-8 w-8 text-purple-400" />
                  Global Property Listings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🇦🇺</div>
                    <h4 className="text-white font-bold text-lg">Australia</h4>
                    <p className="text-slate-300">Premium residential & commercial</p>
                    <Badge className="mt-2 bg-green-500/20 text-green-300">12,500+ Properties</Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🇺🇸</div>
                    <h4 className="text-white font-bold text-lg">United States</h4>
                    <p className="text-slate-300">Commercial real estate investments</p>
                    <Badge className="mt-2 bg-blue-500/20 text-blue-300">8,200+ Properties</Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🇬🇧</div>
                    <h4 className="text-white font-bold text-lg">United Kingdom</h4>
                    <p className="text-slate-300">Luxury estates & developments</p>
                    <Badge className="mt-2 bg-purple-500/20 text-purple-300">5,800+ Properties</Badge>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-slate-300 mb-4">Also supporting: Canada, New Zealand, Singapore, Japan, Germany, France, and more</p>
                  <Button className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white">
                    Browse International Properties
                    <Globe className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
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