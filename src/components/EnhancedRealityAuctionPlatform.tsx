/**
 * ============================================================================
 * Enhanced Reality Auction Platform Component
 * Comprehensive off-market auction platform with visual effects and analysis
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
import { 
  Gavel, Users, Timer, DollarSign, Heart, Eye, TrendingUp, Building2, 
  BarChart3, Map, PieChart, Calculator, Target, AlertTriangle, MapPin,
  Camera, Activity, Zap, Star
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* 3D Background Effect */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <PropertyScene />
      </div>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto p-6 space-y-6 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center space-y-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-3xl -z-10" />
          <h1 className="text-5xl font-bold text-foreground flex items-center justify-center gap-4">
            <div className="relative">
              <Gavel className="h-12 w-12 text-primary animate-pulse" />
              <div className="absolute inset-0 h-12 w-12 bg-primary/20 rounded-full animate-ping" />
            </div>
            Reality Auction Platform
            <Zap className="h-8 w-8 text-yellow-500 animate-bounce" />
          </h1>
          <p className="text-xl text-muted-foreground">Advanced Off-Market Auctions with AI-Powered Analysis</p>
          <div className="flex justify-center gap-4 text-sm">
            <Badge variant="secondary" className="animate-fade-in">
              <Activity className="h-3 w-3 mr-1" />
              Live Valuations
            </Badge>
            <Badge variant="secondary" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <BarChart3 className="h-3 w-3 mr-1" />
              Market Analysis
            </Badge>
            <Badge variant="secondary" className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Target className="h-3 w-3 mr-1" />
              Risk Assessment
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced Auction List Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="backdrop-blur-lg bg-card/80 border-primary/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary animate-spin" />
                  Live & Upcoming Auctions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {auctions.map((auction, idx) => (
                  <Card 
                    key={auction.id} 
                    className={`p-3 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      selectedAuction === idx ? 'ring-2 ring-primary shadow-primary/20' : ''
                    } backdrop-blur-sm`}
                    onClick={() => setSelectedAuction(idx)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <Badge variant={auction.isLive ? "destructive" : "secondary"} className="animate-pulse">
                          {auction.isLive ? 'LIVE NOW' : 'UPCOMING'}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-3 w-3" />
                          {auction.bidders}
                        </div>
                      </div>
                      <h4 className="font-semibold text-sm">{auction.address}</h4>
                      <p className="text-lg font-bold text-primary animate-bounce">
                        {formatCurrency(auction.currentBid)}
                      </p>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          Reserve: {formatCurrency(auction.reserve)}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          Score: {auction.marketScore}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="backdrop-blur-lg bg-card/80 border-primary/20">
              <CardHeader>
                <CardTitle className="text-sm">Market Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{formatCurrency(currentAuction.instantValuation)}</p>
                  <p className="text-xs text-muted-foreground">Instant Valuation</p>
                </div>
                <Progress value={currentAuction.marketScore} className="h-2" />
                <p className="text-xs text-center">Market Score: {currentAuction.marketScore}/100</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Property Hero Section */}
            <Card className="backdrop-blur-lg bg-card/80 border-primary/20 shadow-2xl overflow-hidden">
              <div className="relative">
                {/* Property Image with overlay effects */}
                <div className="w-full h-80 bg-gradient-to-br from-primary/30 via-primary/10 to-secondary/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge variant={currentAuction.isLive ? "destructive" : "secondary"} className="animate-pulse">
                      {currentAuction.isLive ? 'LIVE AUCTION' : 'STARTS SOON'}
                    </Badge>
                    <Badge variant="secondary">
                      <Star className="h-3 w-3 mr-1" />
                      {currentAuction.marketScore}/100
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-bold">{currentAuction.address}</h2>
                    <p className="text-lg opacity-90">{currentAuction.propertyType}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white/50">
                      <Camera className="h-16 w-16 mx-auto mb-2 animate-pulse" />
                      <p className="text-sm">Property Images</p>
                    </div>
                  </div>
                </div>

                {/* Live bidding strip */}
                {currentAuction.isLive && (
                  <div className="bg-destructive text-destructive-foreground p-2 text-center animate-pulse">
                    <span className="font-semibold">LIVE BIDDING IN PROGRESS</span> • 
                    <span className="ml-2">{formatTime(timeLeft)} remaining</span>
                  </div>
                )}
              </div>
            </Card>

            {/* Comprehensive Analysis Tabs */}
            <Card className="backdrop-blur-lg bg-card/80 border-primary/20 shadow-xl">
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-7 mb-6">
                    <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                    <TabsTrigger value="bidding" className="text-xs">Bidding</TabsTrigger>
                    <TabsTrigger value="valuation" className="text-xs">Valuation</TabsTrigger>
                    <TabsTrigger value="market" className="text-xs">Market</TabsTrigger>
                    <TabsTrigger value="risk" className="text-xs">Risk</TabsTrigger>
                    <TabsTrigger value="demographics" className="text-xs">Demographics</TabsTrigger>
                    <TabsTrigger value="financial" className="text-xs">Financial</TabsTrigger>
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

export default EnhancedRealityAuctionPlatform;