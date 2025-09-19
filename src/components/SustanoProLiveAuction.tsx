import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Gavel, 
  Users, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Eye, 
  DollarSign,
  Building,
  Shield,
  Award,
  Globe
} from 'lucide-react';
import sustanoProLogo from '@/assets/sustano-pro-logo-main.jpg';

export default function SustanoProLiveAuction() {
  const [currentBid, setCurrentBid] = useState(15000000);
  const [bidAmount, setBidAmount] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const platformData = {
    title: "SustanoPro™ Digital Intelligence Platform",
    subtitle: "Revolutionary PropTech Ecosystem",
    category: "Digital Platform",
    description: "Complete digital property valuation and auction intelligence platform with AI-powered analytics, ESG integration, and blockchain security.",
    features: [
      "AI-Powered Property Valuation Engine",
      "3D Virtual Auction Platform", 
      "ESG Assessment & Climate Risk Analysis",
      "Blockchain Transaction Security",
      "Automated Financial Reporting",
      "Real-time Market Intelligence",
      "Patent-Protected Algorithms",
      "API Integration Suite"
    ],
    metrics: {
      marketValue: "$15M",
      patents: "15+ Filed",
      markets: "Global",
      users: "10K+ Registered",
      transactions: "$2.8B+ Processed",
      growth: "450% Projected"
    },
    auction: {
      startingBid: 10000000,
      currentBid: currentBid,
      bidders: 47,
      timeRemaining: "2h 15m",
      increment: 250000
    }
  };

  const handleBid = () => {
    const newBid = parseInt(bidAmount);
    if (newBid > currentBid) {
      setCurrentBid(newBid);
      setBidAmount('');
    }
  };

  const handleRegister = () => {
    setIsRegistered(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img src={sustanoProLogo} alt="Sustano Pro" className="h-16 bg-white rounded-lg p-2" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold">
              LIVE PLATFORM AUCTION
            </CardTitle>
            <p className="text-lg opacity-90">SustanoPro™ Digital Intelligence Platform</p>
            <div className="flex justify-center gap-4 mt-4">
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Gavel className="h-4 w-4 mr-1" />
                LIVE NOW
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Users className="h-4 w-4 mr-1" />
                {platformData.auction.bidders} Bidders
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Clock className="h-4 w-4 mr-1" />
                {platformData.auction.timeRemaining}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Platform Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Platform Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{platformData.title}</h3>
                    <p className="text-muted-foreground">{platformData.subtitle}</p>
                  </div>
                  <p className="text-sm">{platformData.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{platformData.metrics.marketValue}</div>
                      <div className="text-sm text-muted-foreground">Market Value</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{platformData.metrics.patents}</div>
                      <div className="text-sm text-muted-foreground">Patents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{platformData.metrics.users}</div>
                      <div className="text-sm text-muted-foreground">Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{platformData.metrics.growth}</div>
                      <div className="text-sm text-muted-foreground">Growth</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Platform Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {platformData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bidding Panel */}
          <div className="space-y-6">
            <Card className="border-2 border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Current Auction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {formatCurrency(currentBid)}
                  </div>
                  <div className="text-sm text-muted-foreground">Current Highest Bid</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold">{platformData.auction.bidders}</div>
                    <div className="text-sm text-muted-foreground">Active Bidders</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{platformData.auction.timeRemaining}</div>
                    <div className="text-sm text-muted-foreground">Time Left</div>
                  </div>
                </div>

                {!isRegistered ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground text-center">
                      Register to participate in this auction
                    </p>
                    <Button onClick={handleRegister} className="w-full">
                      Register to Bid
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bidAmount">Your Bid (AUD)</Label>
                      <Input
                        id="bidAmount"
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder={`Minimum: ${formatCurrency(currentBid + platformData.auction.increment)}`}
                        min={currentBid + platformData.auction.increment}
                      />
                    </div>
                    <Button 
                      onClick={handleBid} 
                      className="w-full" 
                      disabled={!bidAmount || parseInt(bidAmount) <= currentBid}
                    >
                      Place Bid
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Minimum increment: {formatCurrency(platformData.auction.increment)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Investment Highlights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Market Opportunity</span>
                  <span className="text-sm font-semibold">$2.8T TAM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Revenue Growth</span>
                  <span className="text-sm font-semibold">450% Projected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">IP Portfolio Value</span>
                  <span className="text-sm font-semibold">$8M+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Expected ROI</span>
                  <span className="text-sm font-semibold">8-12x Multiple</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Platform Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Successful bidder gains immediate access to the complete SustanoPro™ platform ecosystem.
                </p>
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Platform
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <Card className="mt-8 bg-gradient-to-r from-slate-100 to-blue-100 dark:from-slate-800 dark:to-slate-700">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              🔒 <strong>PROTECTED INTELLECTUAL PROPERTY</strong> - Patent applications filed globally. Unauthorized use prohibited.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              © 2025 DeLorenzo Property Group Pty Ltd. SustanoPro™, SustanoSphere™, DigitalAssetIQ™ are registered trademarks.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}