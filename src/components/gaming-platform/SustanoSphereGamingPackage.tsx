/**
 * ============================================================================
 * SUSTANO-SPHERE™ GAMING PLATFORM INTEGRATION PACKAGE
 * Complete UI Components & Logic for Gaming Platform Integration
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 * 
 * TRADEMARKS:
 * - Sustano-Sphere™ (TM 9876543)
 * - ESG Digital Platform™ (TM 8765432)
 * - Sustainable Asset Intelligence™ (TM 7654321)
 * 
 * This package contains all necessary components to integrate
 * Sustaino Sphere into your gaming platform.
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

// Gaming Platform Compact Widget
export const SustanoSphereGamingWidget = () => {
  const [esgScore, setEsgScore] = useState(94);
  const [liveAuctions, setLiveAuctions] = useState(156);
  const [totalVolume, setTotalVolume] = useState(4200000);

  useEffect(() => {
    const interval = setInterval(() => {
      setEsgScore(prev => Math.min(100, prev + Math.random() * 1));
      setLiveAuctions(prev => prev + Math.floor(Math.random() * 3));
      setTotalVolume(prev => prev + Math.random() * 50000);
    }, 3000);

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

  return (
    <Card className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 border-green-500/30 text-white shadow-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">Sustano-Sphere™</CardTitle>
            <p className="text-green-300 text-sm">ESG Digital Marketplace</p>
          </div>
          <Badge className="ml-auto bg-green-500 text-white animate-pulse">
            LIVE
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-300">{liveAuctions}+</div>
            <div className="text-xs text-gray-300">Live Auctions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-300">{esgScore}/100</div>
            <div className="text-xs text-gray-300">ESG Score</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-300">{formatCurrency(totalVolume)}</div>
            <div className="text-xs text-gray-300">Total Volume</div>
          </div>
        </div>
        
        <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold">
          <Play className="h-4 w-4 mr-2" />
          Join ESG Auctions
        </Button>
      </CardContent>
    </Card>
  );
};

// Gaming Platform Hero Banner
export const SustanoSphereHeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-br from-emerald-950 via-green-950 to-teal-950 overflow-hidden rounded-2xl">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/8 via-emerald-500/5 to-teal-500/8"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-400/15 to-emerald-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-teal-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-8 text-center">
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-green-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent">
            Sustano-Sphere™
          </h1>
          <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-500 rounded-full flex items-center justify-center">
            <Globe className="h-8 w-8 text-white" />
          </div>
        </div>

        <p className="text-2xl text-slate-200 mb-6 max-w-4xl mx-auto">
          The world's first ESG-integrated digital asset auction platform for sustainable gaming
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

        <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-8 py-4 text-lg">
          <Rocket className="h-5 w-5 mr-2" />
          Launch Sustano-Sphere
        </Button>
      </div>
    </div>
  );
};

// Gaming Platform Feature Card
export const SustanoSphereFeatureCard = ({ 
  title = "ESG Digital Auctions",
  description = "Sustainable asset trading with real-time ESG scoring",
  icon = <Leaf className="h-8 w-8" />,
  badge = "Green",
  color = "green"
}) => {
  const colorClasses = {
    green: "from-green-500/10 to-emerald-500/10 border-green-500/20",
    blue: "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
    purple: "from-purple-500/10 to-violet-500/10 border-purple-500/20",
    orange: "from-orange-500/10 to-red-500/10 border-orange-500/20"
  };

  return (
    <Card className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm border rounded-2xl hover:shadow-xl transition-all duration-300`}>
      <CardContent className="p-6 text-center">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${color === 'green' ? 'from-green-500 to-emerald-600' : color === 'blue' ? 'from-blue-500 to-cyan-600' : color === 'purple' ? 'from-purple-500 to-violet-600' : 'from-orange-500 to-red-600'} flex items-center justify-center mx-auto mb-4`}>
          {icon}
        </div>
        <Badge className={`mb-3 ${color === 'green' ? 'bg-green-500' : color === 'blue' ? 'bg-blue-500' : color === 'purple' ? 'bg-purple-500' : 'bg-orange-500'} text-white`}>
          {badge}
        </Badge>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </CardContent>
    </Card>
  );
};

// Gaming Platform Live Auction Widget
export const SustanoSphereLiveAuction = () => {
  const [currentBid, setCurrentBid] = useState(250000);
  const [bidders, setBidders] = useState(47);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBid(prev => prev + Math.floor(Math.random() * 5000));
      setBidders(prev => prev + Math.floor(Math.random() * 3) - 1);
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-green-500/30 text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="animate-pulse bg-green-500 w-3 h-3 rounded-full"></div>
            <CardTitle className="text-lg">LIVE ESG AUCTION</CardTitle>
          </div>
          <Badge variant="secondary" className="bg-green-500 text-white">
            <Activity className="h-3 w-3 mr-1" />
            {bidders} bidders
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Current Bid</span>
            <span className="text-sm text-gray-300">Time Left</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-green-300">{formatCurrency(currentBid)}</span>
            <span className="text-lg font-mono text-orange-300">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>ESG Score</span>
            <span className="text-green-300">94/100</span>
          </div>
          <Progress value={94} className="h-2" />
        </div>

        <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
          <Zap className="h-4 w-4 mr-2" />
          Place Bid
        </Button>
      </CardContent>
    </Card>
  );
};

// Gaming Platform Stats Dashboard
export const SustanoSphereStats = () => {
  const stats = [
    { label: "Live Auctions", value: "156+", icon: <Globe className="h-6 w-6" />, color: "green" },
    { label: "ESG Accuracy", value: "97%", icon: <Target className="h-6 w-6" />, color: "blue" },
    { label: "Active Users", value: "12.5K", icon: <Users className="h-6 w-6" />, color: "purple" },
    { label: "Total Volume", value: "$4.2M", icon: <DollarSign className="h-6 w-6" />, color: "orange" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 text-white">
          <CardContent className="p-4 text-center">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${
              stat.color === 'green' ? 'from-green-500 to-emerald-600' :
              stat.color === 'blue' ? 'from-blue-500 to-cyan-600' :
              stat.color === 'purple' ? 'from-purple-500 to-violet-600' :
              'from-orange-500 to-red-600'
            } flex items-center justify-center mx-auto mb-3`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Main Gaming Platform Integration Component
export const SustanoSphereGamingIntegration = () => {
  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen">
      {/* Hero Banner */}
      <SustanoSphereHeroBanner />

      {/* Stats Dashboard */}
      <SustanoSphereStats />

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SustanoSphereFeatureCard 
          title="ESG Auctions"
          description="Sustainable digital asset trading"
          icon={<Leaf className="h-8 w-8 text-white" />}
          badge="Green"
          color="green"
        />
        <SustanoSphereFeatureCard 
          title="AI Analytics"
          description="Smart ESG scoring system"
          icon={<Brain className="h-8 w-8 text-white" />}
          badge="AI"
          color="blue"
        />
        <SustanoSphereFeatureCard 
          title="Live Trading"
          description="Real-time auction platform"
          icon={<Activity className="h-8 w-8 text-white" />}
          badge="Live"
          color="purple"
        />
        <SustanoSphereFeatureCard 
          title="Gaming Ready"
          description="Optimized for gaming platforms"
          icon={<Gamepad2 className="h-8 w-8 text-white" />}
          badge="Gaming"
          color="orange"
        />
      </div>

      {/* Live Auction and Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SustanoSphereLiveAuction />
        </div>
        <div>
          <SustanoSphereGamingWidget />
        </div>
      </div>
    </div>
  );
};

export default SustanoSphereGamingIntegration;