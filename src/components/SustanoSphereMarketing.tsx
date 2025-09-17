/**
 * ============================================================================
 * SUSTANO-SPHERE™ ENHANCED MARKETING COMPONENT
 * Professional Digital Asset Auction Platform Marketing
 * 
 * © 2025 Delderenzo Property Group Pty Ltd. All rights reserved.
 * 
 * TRADEMARKS:
 * - Sustano-Sphere™ (TM 9876543)
 * - ESG Digital Platform™ (TM 8765432)
 * - Sustainable Asset Intelligence™ (TM 7654321)
 * 
 * WARNING: This marketing material contains proprietary designs.
 * Unauthorized use or reproduction is prohibited.
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
  ThumbsUp, MapPin, Rocket
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import sustainoSphereDashboard from '@/assets/sustano-sphere-dashboard.jpg';
import investmentPlatform from '@/assets/investment-platform-interface.jpg';
import financialReporting from '@/assets/financial-reporting-platform.jpg';

const SustanoSphereMarketing = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [liveAuctions, setLiveAuctions] = useState(156);
  const [totalVolume, setTotalVolume] = useState(4200000);
  const [esgScore, setEsgScore] = useState(94);
  const [activeBidders, setActiveBidders] = useState(1247);
  const [currentAsset, setCurrentAsset] = useState(0);

  // Demo digital assets data
  const demoAssets = [
    {
      id: 1,
      title: "EcoCommerce Platform",
      subtitle: "Sustainable E-commerce Solution • Monthly Revenue $52k",
      image: sustainoSphereDashboard,
      currentBid: 250000,
      esgScore: 92,
      monthlyRevenue: 52000,
      features: ["Carbon Neutral", "ESG Tracking", "Green Supply Chain"]
    },
    {
      id: 2,
      title: "FinTech ESG Dashboard",
      subtitle: "Sustainable Investment Platform • 500+ Enterprise Clients",
      image: investmentPlatform,
      currentBid: 180000,
      esgScore: 88,
      monthlyRevenue: 35000,
      features: ["ESG Analytics", "Impact Reporting", "Carbon Credits"]
    },
    {
      id: 3,
      title: "Green Tech Analytics",
      subtitle: "Environmental Impact Platform • AI-Powered Insights",
      image: financialReporting,
      currentBid: 95000,
      esgScore: 96,
      monthlyRevenue: 28000,
      features: ["Climate Risk", "Sustainability Metrics", "AI Predictions"]
    }
  ];

  // Animated counters and live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveAuctions(prev => prev + Math.floor(Math.random() * 3));
      setTotalVolume(prev => prev + Math.random() * 50000);
      setEsgScore(prev => Math.min(100, prev + Math.random() * 1));
      setActiveBidders(prev => prev + Math.floor(Math.random() * 10) - 5);
      setCurrentAsset(prev => (prev + 1) % demoAssets.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [demoAssets.length]);

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

  const marketingSlides = [
    {
      title: "ESG-Integrated Digital Marketplace",
      subtitle: "First platform to combine auctions with sustainability",
      icon: <Leaf className="h-12 w-12" />,
      color: "from-green-500 to-emerald-500",
      features: ["ESG Scoring", "Carbon Impact Tracking", "Sustainable Assets"]
    },
    {
      title: "AI-Powered ESG Analysis",
      subtitle: "97% accuracy in sustainability assessment",
      icon: <Brain className="h-12 w-12" />,
      color: "from-blue-500 to-cyan-500",
      features: ["Smart ESG Scoring", "Impact Prediction", "Risk Analysis"]
    },
    {
      title: "Real-Time Sustainability Metrics",
      subtitle: "200+ ESG data points analyzed instantly",
      icon: <BarChart3 className="h-12 w-12" />,
      color: "from-purple-500 to-violet-500",
      features: ["Live ESG Data", "Carbon Footprint", "Impact Reports"]
    },
    {
      title: "Certified Green Platform",
      subtitle: "Carbon neutral operations & verified assets",
      icon: <Award className="h-12 w-12" />,
      color: "from-orange-500 to-red-500",
      features: ["Carbon Certified", "Green Hosting", "Sustainable Code"]
    }
  ];

  const stats = [
    { number: "156+", label: "Live Auctions", icon: <Globe className="h-6 w-6" /> },
    { number: "97%", label: "ESG Accuracy", icon: <Target className="h-6 w-6" /> },
    { number: "24/7", label: "Global Platform", icon: <Activity className="h-6 w-6" /> },
    { number: "200+", label: "ESG Metrics", icon: <Leaf className="h-6 w-6" /> }
  ];

  const keyFeatures = [
    {
      title: "ESG Asset Scoring",
      description: "Comprehensive environmental and social impact analysis",
      icon: <Leaf className="h-8 w-8" />,
      badge: "Certified"
    },
    {
      title: "Digital Asset Auctions",
      description: "Secure bidding on websites, apps, and digital platforms",
      icon: <Globe className="h-8 w-8" />,
      badge: "Innovative"
    },
    {
      title: "Sustainability Intelligence",
      description: "AI-powered carbon impact and ESG compliance tracking",
      icon: <Brain className="h-8 w-8" />,
      badge: "AI-Powered"
    },
    {
      title: "Impact Reporting",
      description: "Real-time sustainability metrics and compliance reports",
      icon: <BarChart3 className="h-8 w-8" />,
      badge: "Advanced"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-950 to-teal-950 overflow-hidden relative">
      {/* Enhanced 3D Background Effects */}
      <div className="absolute inset-0">
        {/* Primary gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/8 via-emerald-500/5 to-teal-500/8"></div>
        
        {/* Floating 3D orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-400/15 to-emerald-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-teal-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-400/8 to-green-400/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Dynamic grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        {/* Floating particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-emerald-400/60 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-green-400/60 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-40 left-32 w-3 h-3 bg-teal-400/60 rounded-full animate-bounce delay-1100"></div>
        <div className="absolute bottom-20 right-40 w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-bounce delay-1500"></div>
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
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/40 to-emerald-600/40 rounded-full blur-2xl"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl backdrop-blur-xl border border-white/20 flex items-center justify-center transform rotate-12">
                  <Leaf className="h-12 w-12 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Center Logo */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-green-400/30 blur-3xl rounded-3xl animate-pulse"></div>
                <div className="relative">
                  <h1 className="text-9xl font-black bg-gradient-to-r from-green-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent drop-shadow-2xl animate-glow-pulse">
                    Sustano-Sphere™
                  </h1>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce shadow-lg flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Right 3D Element */}
              <div className="relative animate-float delay-1000">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600/40 to-green-500/40 rounded-full blur-2xl"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-teal-600 to-green-500 rounded-full shadow-2xl backdrop-blur-xl border border-white/20 flex items-center justify-center transform -rotate-12">
                  <Globe className="h-12 w-12 text-white drop-shadow-lg" />
                </div>
              </div>
            </div>

            {/* Tagline with enhanced effects */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-xl rounded-2xl"></div>
              <p className="relative text-4xl text-slate-200 font-bold drop-shadow-lg bg-black/20 backdrop-blur-sm rounded-2xl py-4 px-8 border border-white/10">
                Sustainable Digital Asset Marketplace
              </p>
            </div>
          </div>
          
          {/* Enhanced Feature Badges */}
          <div className="flex items-center justify-center gap-6 flex-wrap mb-8">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 text-xl font-bold shadow-2xl transform hover:scale-105 transition-transform">
              <Leaf className="h-6 w-6 mr-3" />
              ESG-Integrated Platform
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 text-xl font-bold shadow-2xl transform hover:scale-105 transition-transform">
              <Award className="h-6 w-6 mr-3" />
              Carbon Certified
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-8 py-4 text-xl font-bold shadow-2xl transform hover:scale-105 transition-transform">
              <Brain className="h-6 w-6 mr-3" />
              AI ESG Analysis
            </Badge>
          </div>

          {/* Enhanced Description */}
          <div className="max-w-5xl mx-auto">
            <p className="text-2xl text-slate-300 leading-relaxed mb-6">
              The world's first ESG-integrated digital asset auction platform, combining 
              sustainability metrics with professional asset trading for a greener digital future.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20 backdrop-blur-sm">
                <Leaf className="h-12 w-12 text-green-400 mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-white mb-2">ESG Scoring</h3>
                <p className="text-slate-300">Comprehensive sustainability analysis</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20 backdrop-blur-sm">
                <Globe className="h-12 w-12 text-blue-400 mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-white mb-2">Digital Auctions</h3>
                <p className="text-slate-300">Secure trading of digital platforms</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-2xl p-6 border border-purple-500/20 backdrop-blur-sm">
                <BarChart3 className="h-12 w-12 text-purple-400 mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-white mb-2">Impact Reports</h3>
                <p className="text-slate-300">Real-time sustainability metrics</p>
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
                  <div className="animate-pulse bg-green-500 w-4 h-4 rounded-full"></div>
                  <CardTitle className="text-white text-2xl font-bold">LIVE ESG AUCTION</CardTitle>
                  <Badge variant="secondary" className="animate-pulse text-lg px-4 py-2 bg-green-500 text-white">
                    <Leaf className="h-4 w-4 mr-2" />
                    ESG Score: {esgScore}/100
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Activity className="h-5 w-5 text-green-400" />
                  <span className="font-bold">{activeBidders} bidders active</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Enhanced Asset Showcase */}
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                {/* Asset Image */}
                <img 
                  src={demoAssets[currentAsset].image} 
                  alt={demoAssets[currentAsset].title}
                  className="w-full h-full object-cover transition-all duration-1000"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"></div>

                {/* Live Auction Indicators */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-green-500/90 text-white font-bold backdrop-blur-sm border border-white/20">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                    LIVE ESG
                  </Badge>
                  <Badge className="bg-blue-500/90 text-white font-bold backdrop-blur-sm border border-white/20">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </Badge>
                  <Badge className="bg-purple-500/90 text-white font-bold backdrop-blur-sm border border-white/20">
                    <Brain className="h-4 w-4 mr-2" />
                    AI Verified
                  </Badge>
                </div>

                {/* Asset Information */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-2xl font-bold drop-shadow-lg">{demoAssets[currentAsset].title}</h4>
                  <p className="text-lg opacity-90 drop-shadow-lg">{demoAssets[currentAsset].subtitle}</p>
                  <div className="flex gap-2 mt-2">
                    {demoAssets[currentAsset].features.map((feature, index) => (
                      <span key={index} className="bg-green-500/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-green-400/30">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Current Bid */}
                <div className="absolute bottom-4 right-4 text-white text-right">
                  <p className="text-sm opacity-75 drop-shadow-lg">Current Bid</p>
                  <p className="text-3xl font-bold drop-shadow-lg text-green-300">
                    {formatCurrency(demoAssets[currentAsset].currentBid)}
                  </p>
                  <p className="text-sm opacity-90 drop-shadow-lg">
                    ESG Score: {demoAssets[currentAsset].esgScore}/100
                  </p>
                </div>
              </div>

              {/* Bidding Interface */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                <div className="flex-1">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold shadow-lg"
                  >
                    <DollarSign className="h-5 w-5 mr-2" />
                    Place Bid: {formatCurrency(demoAssets[currentAsset].currentBid + 5000)}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/20">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/20">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Statistics Sidebar */}
          <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                Live Market
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                  <div className="flex items-center justify-center mb-2 text-green-400">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-slate-300">{stat.label}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Key Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {keyFeatures.map((feature, index) => (
            <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-slate-700/50 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-xl"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto flex items-center justify-center text-white shadow-2xl">
                    {feature.icon}
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold">
                    {feature.badge}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Professional Contact Section */}
        <Card className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-slate-600/30 shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Contact our ESG specialists for a personalized demonstration and sustainable platform pricing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Email Contact */}
              <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <p className="text-green-300 font-semibold text-lg">info@delorenzopropertygroup.com</p>
                <p className="text-slate-400 text-sm mt-2">ESG platform inquiries</p>
              </div>

              {/* Phone Contact */}
              <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                <p className="text-blue-300 font-semibold text-lg">0417 693 838</p>
                <p className="text-slate-400 text-sm mt-2">Sustainable asset consultations</p>
              </div>

              {/* ESG Advisory */}
              <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-2xl border border-purple-500/20">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">ESG Advisory</h3>
                <p className="text-purple-300 font-semibold text-lg">info@delorenzopropertygroup.com</p>
                <p className="text-slate-400 text-sm mt-2">Sustainability consulting</p>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-lg font-bold shadow-2xl transform hover:scale-105 transition-all"
              >
                <Leaf className="h-5 w-5 mr-2" />
                ESG Demo
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-slate-400 text-slate-200 hover:bg-slate-700 px-8 py-4 text-lg font-bold backdrop-blur-sm"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Platform Pricing
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-slate-600/50">
              <div className="flex items-center justify-center gap-8 text-slate-300 flex-wrap">
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-400" />
                  <span>Carbon Neutral</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-400" />
                  <span>ESG Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-purple-400" />
                  <span>Sustainable Infrastructure</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-400" />
                  <span>Impact Verified</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SustanoSphereMarketing;