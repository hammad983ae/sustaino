/**
 * ============================================================================
 * Reality Auction Platform Component
 * Live auction platform for real estate with bidding capabilities
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Gavel, Users, Timer, DollarSign, Heart, Eye, TrendingUp, Building2 } from 'lucide-react';

const RealityAuctionPlatform = () => {
  const [selectedAuction, setSelectedAuction] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState(323); // seconds

  // Mock auction data
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
      images: ['/placeholder-property.jpg'],
      description: 'Stunning harbour views with modern finishes',
      features: ['Ocean Views', 'Modern Kitchen', 'Balcony', 'Security Building'],
      isLive: true
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
      images: ['/placeholder-commercial.jpg'],
      description: 'Prime CBD location with excellent returns',
      features: ['Prime Location', 'High Yield', 'Modern Fit-out', 'Parking'],
      isLive: false,
      startsIn: 930 // seconds
    }
  ];

  const currentAuction = auctions[selectedAuction];

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
      // Simulate bid placement
      console.log(`Bid placed: ${bidAmount}`);
      setBidAmount('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
            <Gavel className="h-10 w-10 text-primary" />
            Reality Auction Platform
          </h1>
          <p className="text-xl text-muted-foreground">Live property auctions with real-time bidding</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Auction List Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  Live & Upcoming Auctions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {auctions.map((auction, idx) => (
                  <Card 
                    key={auction.id} 
                    className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                      selectedAuction === idx ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedAuction(idx)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <Badge variant={auction.isLive ? "destructive" : "secondary"}>
                          {auction.isLive ? 'LIVE NOW' : 'UPCOMING'}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-3 w-3" />
                          {auction.bidders}
                        </div>
                      </div>
                      <h4 className="font-semibold text-sm">{auction.address}</h4>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(auction.currentBid)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Reserve: {formatCurrency(auction.reserve)}
                      </p>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Auction Display */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{currentAuction.address}</CardTitle>
                  <Badge variant={currentAuction.isLive ? "destructive" : "secondary"} className="text-sm">
                    {currentAuction.isLive ? 'LIVE AUCTION' : 'STARTS SOON'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Property Image Placeholder */}
                <div className="w-full h-64 bg-gradient-to-r from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Building2 className="h-16 w-16 text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">Property Image</p>
                  </div>
                </div>

                {/* Property Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{currentAuction.bedrooms || 'N/A'}</p>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{currentAuction.bathrooms || 'N/A'}</p>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{currentAuction.carSpaces || 'N/A'}</p>
                    <p className="text-sm text-muted-foreground">Car Spaces</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{currentAuction.propertyType}</p>
                    <p className="text-sm text-muted-foreground">Type</p>
                  </div>
                </div>

                <Separator />

                {/* Bidding Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Bid Info */}
                  <Card className="p-4 bg-gradient-to-r from-primary/5 to-primary/10">
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        Current Bid
                      </h4>
                      <p className="text-4xl font-bold text-primary">
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
                          <Timer className="h-4 w-4" />
                          {formatTime(timeLeft)} remaining
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Bidding Controls */}
                  <Card className="p-4">
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
                            />
                            <p className="text-xs text-muted-foreground">
                              Minimum bid: {formatCurrency(currentAuction.currentBid + 1000)}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <Button onClick={placeBid} className="w-full bg-primary hover:bg-primary/90">
                              Place Bid
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Heart className="h-4 w-4 mr-1" />
                              Watch
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setBidAmount(String(currentAuction.currentBid + 5000))}
                            >
                              +5K
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setBidAmount(String(currentAuction.currentBid + 10000))}
                            >
                              +10K
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setBidAmount(String(currentAuction.currentBid + 25000))}
                            >
                              +25K
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="text-center space-y-3">
                          <p className="text-muted-foreground">Auction starts in:</p>
                          <p className="text-2xl font-bold text-primary">{formatTime(currentAuction.startsIn || 0)}</p>
                          <Button className="w-full">Set Reminder</Button>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>

                {/* Property Features */}
                <div>
                  <h4 className="font-semibold mb-3">Key Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentAuction.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Agent Info */}
                <Card className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-200 dark:bg-emerald-800 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-emerald-700 dark:text-emerald-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-800 dark:text-emerald-200">
                        {currentAuction.auctioneer}
                      </h4>
                      <p className="text-sm text-emerald-600 dark:text-emerald-300">
                        {currentAuction.agency}
                      </p>
                    </div>
                  </div>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealityAuctionPlatform;