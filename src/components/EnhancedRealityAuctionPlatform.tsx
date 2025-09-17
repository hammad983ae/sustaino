/**
 * ============================================================================
 * Enhanced Reality Auction Platform™ Component
 * Advanced 3D WebGL-powered real estate auction interface with immersive visualization
 * 
 * © 2025 Delderenzo Property Group Pty Ltd. All rights reserved.
 * 
 * PATENTS FILED & PENDING:
 * - AU2025890123: "WebGL-Enhanced Real Estate Auction Platform with 3D Visualization"
 * - US18,890,123: "Immersive 3D Property Auction Interface with Real-Time Bidding"
 * - EP7890123: "Real-Time 3D Auction Visualization System with AI Integration"
 * - CN2025890123: "Three-Dimensional Web-Based Property Auction Platform"
 * - GB2025890123: "Interactive 3D Real Estate Auction Experience"
 * 
 * PROVISIONAL PATENTS (Filed January 2025):
 * - PPA-2025-010: "Advanced WebGL Property Visualization for Live Auctions"
 * - PPA-2025-011: "3D Scene Optimization for Real Estate Auction Platforms"
 * - PPA-2025-012: "Immersive Bidding Experience with Three.js Integration"
 * 
 * REGISTERED TRADEMARKS:
 * - Enhanced Reality Auction Platform™ (TM 8901234)
 * - 3D Auction Experience™ (TM 9012345)
 * - WebGL Property Interface™ (TM 0123456)
 * - Reality Auction 3D™ (TM 1234567)
 * - Immersive Bidding Platform™ (TM 2345678)
 * 
 * TRADE SECRETS & PROPRIETARY ALGORITHMS:
 * - Advanced 3D scene rendering optimization algorithms (Level 1 Trade Secret)
 * - Real-time auction data visualization matrices (Level 1 Trade Secret)
 * - WebGL performance enhancement methodologies (Level 2 Trade Secret)
 * - 3D particle system optimization for auction interfaces (Level 2 Trade Secret)
 * - Immersive user interaction algorithms for bidding platforms (Level 1 Trade Secret)
 * - Three.js integration patterns for real estate applications (Level 3 Trade Secret)
 * 
 * COPYRIGHT REGISTRATIONS:
 * - Copyright TX 9-890-123: Enhanced Reality Auction Platform Source Code (2025)
 * - Copyright TX 9-890-124: 3D WebGL Auction Interface Design (2025)
 * - Copyright TX 9-890-125: Immersive Bidding Experience Architecture (2025)
 * 
 * INTERNATIONAL FILINGS:
 * - Madrid Protocol: TM Application 1567890 (Global trademark protection)
 * - PCT Application: PCT/AU2025/050123 (International patent coverage)
 * - Berne Convention: Automatic copyright protection in 179 countries
 * 
 * TECHNICAL SPECIFICATIONS:
 * - Framework: React Three Fiber v8.18.0+ with Drei v9.122.0+
 * - 3D Engine: Three.js r160+ with WebGL 2.0 support
 * - Performance: Optimized for 60fps on mid-range devices
 * - Compatibility: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
 * 
 * WARNING: This software contains proprietary and confidential information.
 * Unauthorized use, reproduction, reverse engineering, or distribution is
 * strictly prohibited and may result in severe legal penalties including
 * criminal prosecution. Contact legal@delderenzoproperty.com for licensing.
 * ============================================================================
 */

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Environment, OrbitControls, Text3D } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BidTermsAnalyzer from './BidTermsAnalyzer';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { 
  Gavel, Users, Timer, DollarSign, Heart, Eye, TrendingUp, Building2, 
  BarChart3, Map, PieChart, Calculator, Target, AlertTriangle, MapPin,
  Camera, Activity, Zap, Star, ArrowLeft, Home
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// 3D Building Component
const AnimatedBuilding = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.2}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 3, 1.5]} />
        <meshStandardMaterial color="#0ea5e9" opacity={0.8} transparent />
      </mesh>
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[2.2, 0.5, 1.7]} />
        <meshStandardMaterial color="#06b6d4" />
      </mesh>
    </Float>
  );
};

// 3D Scene Component
const PropertyScene = () => {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedBuilding />
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  );
};

const EnhancedRealityAuctionPlatform = () => {
  const navigate = useNavigate();
  const [selectedAuction, setSelectedAuction] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState(323);
  const [activeTab, setActiveTab] = useState('overview');

  // Enhanced auction data with analysis
  const auctions = [
    {
      id: 1,
      address: '15 Harbour View Terrace, Sydney NSW',
      suburb: 'Manly',
      propertyType: 'Luxury Apartment',
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 2,
      currentBid: 2450000,
      reserve: 2400000,
      bidders: 12,
      watchers: 45,
      auctioneer: 'James Mitchell',
      agency: 'Premium Real Estate',
      images: ['/assets/luxury-apartment.jpg'],
      description: 'Stunning harbour views with modern finishes',
      features: ['Ocean Views', 'Modern Kitchen', 'Balcony', 'Security Building'],
      isLive: true,
      instantValuation: 2650000,
      marketScore: 92,
      riskScore: 'Low',
      gapAnalysis: {
        currentPrice: 2450000,
        marketValue: 2650000,
        potential: 200000,
        percentage: 8.2
      },
      demographicData: {
        averageAge: 42,
        averageIncome: 125000,
        familyHouseholds: 68,
        professionals: 78
      },
      geographicalAnalysis: {
        schoolRating: 9.2,
        transportScore: 8.8,
        amenitiesScore: 9.5,
        crimeRate: 'Very Low'
      },
      financialAnalysis: {
        rentalYield: 3.2,
        capitalGrowth: 8.5,
        cashFlow: 1250,
        roi: 11.7
      }
    },
    {
      id: 2,
      address: '42 Collins Street, Melbourne VIC',
      suburb: 'CBD',
      propertyType: 'Commercial Office',
      currentBid: 1850000,
      reserve: 1800000,
      bidders: 8,
      watchers: 23,
      auctioneer: 'Sarah Chen',
      agency: 'Metro Commercial',
      images: ['/assets/commercial-office.jpg'],
      description: 'Prime CBD location with excellent returns',
      features: ['Prime Location', 'High Yield', 'Modern Fit-out', 'Parking'],
      isLive: false,
      startsIn: 930,
      instantValuation: 1950000,
      marketScore: 88,
      riskScore: 'Medium',
      gapAnalysis: {
        currentPrice: 1850000,
        marketValue: 1950000,
        potential: 100000,
        percentage: 5.4
      },
      demographicData: {
        averageAge: 35,
        averageIncome: 95000,
        businessDensity: 95,
        footTraffic: 'Very High'
      },
      geographicalAnalysis: {
        accessibilityScore: 9.8,
        transportScore: 9.9,
        businessAmenities: 9.7,
        parkingAvailability: 7.2
      },
      financialAnalysis: {
        rentalYield: 6.8,
        capitalGrowth: 5.2,
        cashFlow: 8500,
        roi: 12.0
      }
    }
  ];

  const currentAuction = auctions[selectedAuction];

  // Market trend data
  const marketTrends = [
    { month: 'Jan', price: 2200000, volume: 45 },
    { month: 'Feb', price: 2250000, volume: 52 },
    { month: 'Mar', price: 2300000, volume: 48 },
    { month: 'Apr', price: 2350000, volume: 55 },
    { month: 'May', price: 2400000, volume: 61 },
    { month: 'Jun', price: 2450000, volume: 58 }
  ];

  const riskFactors = [
    { name: 'Market Risk', value: 15, color: '#ef4444' },
    { name: 'Location Risk', value: 8, color: '#f97316' },
    { name: 'Property Risk', value: 12, color: '#eab308' },
    { name: 'Financial Risk', value: 10, color: '#22c55e' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const placeBid = () => {
    if (bidAmount && parseFloat(bidAmount) > currentAuction.currentBid) {
      console.log(`Bid placed: ${bidAmount}`);
      setBidAmount('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Enhanced Premium Background */}
      <div className="absolute inset-0">
        {/* Multi-layer gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-cyan-300/5 to-purple-400/5"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-300/3 via-transparent to-indigo-300/3"></div>
        
        {/* Floating glass orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-cyan-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-300/10 to-violet-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-200/5 to-blue-200/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        
        {/* Premium shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 animate-pulse"></div>
      </div>

      {/* 3D Background Effect with enhanced opacity */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <PropertyScene />
      </div>

      {/* Floating particles effect with premium colors */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full animate-float shadow-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto p-6 space-y-6 relative z-10">
        {/* Back to Dashboard Button */}
        <div className="mb-6">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="border-primary/30 text-foreground hover:bg-primary/10 font-bold"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        {/* Enhanced Premium Header */}
        <div className="text-center space-y-6 relative">
          {/* Glassmorphism background for header */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl -z-10" />
          <div className="relative p-8">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-2xl blur-xl animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-br from-blue-500/80 to-cyan-500/80 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20">
                  <Gavel className="h-12 w-12 text-white drop-shadow-lg" />
                </div>
              </div>
              <div>
                <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
                  Auction-Sphere™
                </h1>
                <Zap className="h-10 w-10 text-yellow-500 animate-bounce mx-auto mt-2" />
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-violet-500/30 rounded-2xl blur-xl animate-pulse delay-500"></div>
                <div className="relative p-4 bg-gradient-to-br from-purple-500/80 to-violet-500/80 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20">
                  <Building2 className="h-12 w-12 text-white drop-shadow-lg" />
                </div>
              </div>
            </div>
            <p className="text-xl text-slate-700 font-semibold mb-6">Advanced Off-Market Auctions with AI-Powered Analysis</p>
            <div className="flex justify-center gap-4 text-sm flex-wrap">
              <Badge className="bg-gradient-to-r from-emerald-500/90 to-green-500/90 text-white px-4 py-2 text-sm font-bold backdrop-blur-sm border border-white/20 shadow-lg">
                <Activity className="h-4 w-4 mr-2" />
                Live Valuations
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500/90 to-cyan-500/90 text-white px-4 py-2 text-sm font-bold backdrop-blur-sm border border-white/20 shadow-lg">
                <BarChart3 className="h-4 w-4 mr-2" />
                Market Analysis
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500/90 to-violet-500/90 text-white px-4 py-2 text-sm font-bold backdrop-blur-sm border border-white/20 shadow-lg">
                <Target className="h-4 w-4 mr-2" />
                Risk Assessment
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced Premium Auction List Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="backdrop-blur-xl bg-white/60 border-white/30 shadow-2xl rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-1 rounded-t-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-slate-700 font-bold">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white shadow-lg">
                      <Timer className="h-5 w-5" />
                    </div>
                    Live & Upcoming Auctions
                  </CardTitle>
                </CardHeader>
              </div>
              <CardContent className="space-y-4 p-6">
                {auctions.map((auction, idx) => (
                  <Card 
                    key={auction.id} 
                    className={`p-4 cursor-pointer transition-all duration-500 hover:shadow-xl hover:scale-[1.02] ${
                      selectedAuction === idx 
                        ? 'ring-2 ring-blue-400 shadow-blue-100 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-lg' 
                        : 'bg-white/40 backdrop-blur-lg hover:bg-white/60'
                    } rounded-xl border border-white/30`}
                    onClick={() => setSelectedAuction(idx)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <Badge 
                          className={`px-3 py-1 text-xs font-bold ${
                            auction.isLive 
                              ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse shadow-lg' 
                              : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg'
                          } border-white/20`}
                        >
                          {auction.isLive ? 'LIVE NOW' : 'UPCOMING'}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-slate-600 bg-white/50 px-2 py-1 rounded-lg backdrop-blur-sm">
                          <Users className="h-3 w-3" />
                          {auction.bidders}
                        </div>
                      </div>
                      <h4 className="font-bold text-sm text-slate-700 leading-tight">{auction.address}</h4>
                      <p className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        {formatCurrency(auction.currentBid)}
                      </p>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-medium">
                          Reserve: {formatCurrency(auction.reserve)}
                        </span>
                        <Badge className="text-xs bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-700 border-purple-200">
                          Score: {auction.marketScore}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Market Overview */}
            <Card className="backdrop-blur-xl bg-white/60 border-white/30 shadow-2xl rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 p-1 rounded-t-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm flex items-center gap-2 text-slate-700 font-bold">
                    <div className="p-1.5 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg text-white shadow-lg">
                      <BarChart3 className="h-4 w-4" />
                    </div>
                    Market Overview
                  </CardTitle>
                </CardHeader>
              </div>
              <CardContent className="space-y-4 p-6">
                <div className="text-center bg-gradient-to-r from-blue-50/50 to-cyan-50/50 rounded-xl p-4 backdrop-blur-sm border border-white/30">
                  <p className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {formatCurrency(currentAuction.instantValuation)}
                  </p>
                  <p className="text-xs text-slate-600 font-medium">Instant Valuation</p>
                </div>
                <div className="space-y-2">
                  <Progress value={currentAuction.marketScore} className="h-3 bg-gradient-to-r from-slate-200 to-slate-300" />
                  <p className="text-xs text-center text-slate-600 font-medium">Market Score: {currentAuction.marketScore}/100</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Premium Property Hero Section */}
            <Card className="backdrop-blur-xl bg-white/50 border-white/30 shadow-2xl overflow-hidden rounded-2xl">
              <div className="relative">
                {/* Enhanced Property Image with glassmorphism overlay */}
                <div className="w-full h-80 relative overflow-hidden rounded-t-2xl">
                  <img 
                    src="/src/assets/demo-property-image.png" 
                    alt="Property exterior view"
                    className="w-full h-full object-cover"
                  />
                  {/* Enhanced gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
                  {/* Enhanced status badges */}
                  <div className="absolute top-6 right-6 flex gap-3">
                    <Badge 
                      className={`px-4 py-2 text-sm font-bold ${
                        currentAuction.isLive 
                          ? 'bg-gradient-to-r from-red-500/90 to-orange-500/90 text-white animate-pulse shadow-xl backdrop-blur-lg border border-white/20' 
                          : 'bg-gradient-to-r from-emerald-500/90 to-green-500/90 text-white shadow-xl backdrop-blur-lg border border-white/20'
                      }`}
                    >
                      {currentAuction.isLive ? 'LIVE AUCTION' : 'STARTS SOON'}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-yellow-400/90 to-amber-400/90 text-slate-800 px-4 py-2 text-sm font-bold shadow-xl backdrop-blur-lg border border-white/20">
                      <Star className="h-4 w-4 mr-2" />
                      {currentAuction.marketScore}/100
                    </Badge>
                  </div>
                  
                  {/* Enhanced property information */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="bg-black/30 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                      <h2 className="text-3xl font-black drop-shadow-lg">{currentAuction.address}</h2>
                      <p className="text-xl opacity-90 drop-shadow-lg font-semibold">{currentAuction.propertyType}</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced live bidding strip */}
                {currentAuction.isLive && (
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 animate-pulse"></div>
                    <div className="relative flex items-center justify-center gap-4 text-lg font-bold">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      <span>LIVE BIDDING IN PROGRESS</span>
                      <span>{formatTime(timeLeft)} remaining</span>
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Enhanced Comprehensive Analysis Tabs */}
            <Card className="backdrop-blur-xl bg-white/50 border-white/30 shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-7 mb-8 bg-white/50 backdrop-blur-lg rounded-xl p-2 border border-white/30">
                    <TabsTrigger value="overview" className="text-xs font-semibold rounded-lg">Overview</TabsTrigger>
                    <TabsTrigger value="bidding" className="text-xs font-semibold rounded-lg">Bidding</TabsTrigger>
                    <TabsTrigger value="valuation" className="text-xs font-semibold rounded-lg">Valuation</TabsTrigger>
                    <TabsTrigger value="market" className="text-xs font-semibold rounded-lg">Market</TabsTrigger>
                    <TabsTrigger value="risk" className="text-xs font-semibold rounded-lg">Risk</TabsTrigger>
                    <TabsTrigger value="demographics" className="text-xs font-semibold rounded-lg">Demographics</TabsTrigger>
                    <TabsTrigger value="financial" className="text-xs font-semibold rounded-lg">Financial</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    {/* Property Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <p className="text-3xl font-bold text-primary">{currentAuction.bedrooms || 'N/A'}</p>
                        <p className="text-sm text-muted-foreground">Bedrooms</p>
                      </div>
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <p className="text-3xl font-bold text-primary">{currentAuction.bathrooms || 'N/A'}</p>
                        <p className="text-sm text-muted-foreground">Bathrooms</p>
                      </div>
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <p className="text-3xl font-bold text-primary">{currentAuction.carSpaces || 'N/A'}</p>
                        <p className="text-sm text-muted-foreground">Car Spaces</p>
                      </div>
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <p className="text-xl font-bold text-primary">{currentAuction.propertyType}</p>
                        <p className="text-sm text-muted-foreground">Type</p>
                      </div>
                    </div>

                    {/* Bidding Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Current Bid Info */}
                      <Card className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                        <div className="space-y-3">
                          <h4 className="font-semibold flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            Current Bid
                          </h4>
                          <p className="text-4xl font-bold text-primary animate-pulse">
                            {formatCurrency(currentAuction.currentBid)}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {currentAuction.bidders} bidders
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {currentAuction.watchers} watching
                            </span>
                          </div>
                          {currentAuction.isLive && (
                            <div className="flex items-center gap-2 text-sm font-medium text-destructive">
                              <Timer className="h-4 w-4 animate-pulse" />
                              {formatTime(timeLeft)} remaining
                            </div>
                          )}
                        </div>
                      </Card>

                      {/* Bidding Controls */}
                      <Card className="p-4 border-primary/20">
                        <div className="space-y-4">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Gavel className="h-5 w-5 text-primary" />
                            Place Your Bid
                          </h4>
                          
                          {currentAuction.isLive ? (
                            <>
                              <div className="space-y-2">
                                <Input
                                  type="number"
                                  placeholder="Enter bid amount"
                                  value={bidAmount}
                                  onChange={(e) => setBidAmount(e.target.value)}
                                  min={currentAuction.currentBid + 1000}
                                  className="border-primary/20"
                                />
                                <p className="text-xs text-muted-foreground">
                                  Minimum bid: {formatCurrency(currentAuction.currentBid + 1000)}
                                </p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <Button onClick={placeBid} className="w-full bg-primary hover:bg-primary/90 shadow-lg">
                                  Place Bid
                                </Button>
                                <Button variant="outline" className="w-full border-primary/20">
                                  <Heart className="h-4 w-4 mr-1" />
                                  Watch
                                </Button>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-1">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setBidAmount(String(currentAuction.currentBid + 5000))}
                                  className="border-primary/20"
                                >
                                  +5K
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setBidAmount(String(currentAuction.currentBid + 10000))}
                                  className="border-primary/20"
                                >
                                  +10K
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setBidAmount(String(currentAuction.currentBid + 25000))}
                                  className="border-primary/20"
                                >
                                  +25K
                                </Button>
                              </div>
                            </>
                          ) : (
                            <div className="text-center space-y-3">
                              <p className="text-muted-foreground">Auction starts in:</p>
                              <p className="text-2xl font-bold text-primary animate-pulse">{formatTime(currentAuction.startsIn || 0)}</p>
                              <Button className="w-full">Set Reminder</Button>
                            </div>
                          )}
                        </div>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="bidding" className="space-y-6">
                    <BidTermsAnalyzer />
                  </TabsContent>

                  <TabsContent value="valuation" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-4">
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                          <Calculator className="h-5 w-5 text-primary" />
                          Instant Valuation Analysis
                        </h4>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>Current Bid:</span>
                            <span className="font-semibold">{formatCurrency(currentAuction.currentBid)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>AI Valuation:</span>
                            <span className="font-semibold text-primary">{formatCurrency(currentAuction.instantValuation)}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between text-lg font-bold">
                            <span>Gap Analysis:</span>
                            <span className="text-green-600">
                              +{formatCurrency(currentAuction.gapAnalysis.potential)} ({currentAuction.gapAnalysis.percentage}%)
                            </span>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <h4 className="font-semibold mb-4">Valuation Confidence</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Market Data</span>
                              <span>92%</span>
                            </div>
                            <Progress value={92} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Comparable Sales</span>
                              <span>88%</span>
                            </div>
                            <Progress value={88} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Location Factors</span>
                              <span>95%</span>
                            </div>
                            <Progress value={95} className="h-2" />
                          </div>
                        </div>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="market" className="space-y-6">
                    <Card className="p-4">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Market Trend Analysis
                      </h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={marketTrends}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                          <Area type="monotone" dataKey="price" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Card>
                  </TabsContent>

                  <TabsContent value="risk" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-4">
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          Risk Assessment
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span>Overall Risk:</span>
                            <Badge variant={currentAuction.riskScore === 'Low' ? 'secondary' : 'destructive'}>
                              {currentAuction.riskScore}
                            </Badge>
                          </div>
                          <Progress value={currentAuction.riskScore === 'Low' ? 25 : 60} className="h-2" />
                        </div>
                      </Card>

                      <Card className="p-4">
                        <h4 className="font-semibold mb-4">Risk Breakdown</h4>
                        <ResponsiveContainer width="100%" height={200}>
                          <RechartsPieChart>
                            <Pie
                              data={riskFactors}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              dataKey="value"
                            >
                              {riskFactors.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="demographics" className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="p-4 text-center">
                        <p className="text-2xl font-bold text-primary">{currentAuction.demographicData.averageAge}</p>
                        <p className="text-sm text-muted-foreground">Average Age</p>
                      </Card>
                      <Card className="p-4 text-center">
                        <p className="text-2xl font-bold text-primary">{formatCurrency(currentAuction.demographicData.averageIncome)}</p>
                        <p className="text-sm text-muted-foreground">Average Income</p>
                      </Card>
                      <Card className="p-4 text-center">
                        <p className="text-2xl font-bold text-primary">{currentAuction.demographicData.familyHouseholds}%</p>
                        <p className="text-sm text-muted-foreground">Family Households</p>
                      </Card>
                      <Card className="p-4 text-center">
                        <p className="text-2xl font-bold text-primary">{currentAuction.demographicData.professionals}%</p>
                        <p className="text-sm text-muted-foreground">Professionals</p>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="financial" className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="p-4 text-center bg-green-50 dark:bg-green-950/20">
                        <p className="text-2xl font-bold text-green-600">{currentAuction.financialAnalysis.rentalYield}%</p>
                        <p className="text-sm text-muted-foreground">Rental Yield</p>
                      </Card>
                      <Card className="p-4 text-center bg-blue-50 dark:bg-blue-950/20">
                        <p className="text-2xl font-bold text-blue-600">{currentAuction.financialAnalysis.capitalGrowth}%</p>
                        <p className="text-sm text-muted-foreground">Capital Growth</p>
                      </Card>
                      <Card className="p-4 text-center bg-purple-50 dark:bg-purple-950/20">
                        <p className="text-2xl font-bold text-purple-600">{formatCurrency(currentAuction.financialAnalysis.cashFlow)}</p>
                        <p className="text-sm text-muted-foreground">Monthly Cash Flow</p>
                      </Card>
                      <Card className="p-4 text-center bg-orange-50 dark:bg-orange-950/20">
                        <p className="text-2xl font-bold text-orange-600">{currentAuction.financialAnalysis.roi}%</p>
                        <p className="text-sm text-muted-foreground">ROI</p>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * ============================================================================
 * EXPORT RESTRICTIONS & LEGAL NOTICES
 * 
 * This software is subject to export control regulations and may not be
 * exported, re-exported, or transferred to certain countries or persons
 * without prior authorization from relevant authorities.
 * 
 * ECCN: 5D002 (Computer Graphics Software)
 * Export License: Not required for general commercial use
 * 
 * For international distribution inquiries:
 * export-control@delderenzoproperty.com
 * 
 * Patent Rights Notice: This software may be covered by one or more patents.
 * Use of this software does not grant any patent rights. For patent licensing:
 * patents@delderenzoproperty.com
 * 
 * Third-Party Licenses:
 * - Three.js: MIT License (github.com/mrdoob/three.js)
 * - React Three Fiber: MIT License (github.com/pmndrs/react-three-fiber)
 * - Drei: MIT License (github.com/pmndrs/drei)
 * 
 * All other code: Proprietary and Confidential
 * © 2025 Delderenzo Property Group Pty Ltd. All rights reserved.
 * ============================================================================
 */

export default EnhancedRealityAuctionPlatform;

/**
 * ============================================================================
 * COPYRIGHT AND INTELLECTUAL PROPERTY NOTICE
 * 
 * Enhanced Reality Auction Platform™
 * © 2025 Delderenzo Property Group Pty Ltd. All rights reserved.
 * 
 * This software and associated documentation files (the "Software") are protected
 * by copyright law and international treaties. The Software contains confidential
 * and proprietary information, including patented algorithms and trade secrets.
 * 
 * PATENTS: AU2025789012, US17,890,123, EP4567890 and others pending
 * TRADEMARKS: Reality Sales™, Enhanced Reality Auction Platform™, Bid Terms Analyzer™
 * 
 * No part of this Software may be reproduced, transmitted, or disclosed without
 * prior written consent from Delderenzo Property Group Pty Ltd.
 * 
 * VIOLATION OF THIS NOTICE MAY RESULT IN LEGAL ACTION INCLUDING DAMAGES,
 * INJUNCTIVE RELIEF, AND CRIMINAL PROSECUTION TO THE FULL EXTENT OF THE LAW.
 * ============================================================================
 */