/**
 * ============================================================================
 * MODULAR PLATFORM VALUATION SYSTEM
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Individual Platform Component Valuations for Auction
 * Full ecosystem or individual component sales
 * ============================================================================
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Globe, 
  Shield, 
  Award,
  Package,
  Layers,
  Gavel,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Brain,
  Leaf,
  Coins,
  Gamepad2,
  FileText,
  Building,
  Zap,
  Eye,
  Download,
  Send
} from "lucide-react";

export const ModularPlatformValuation = () => {
  const [auctionMode, setAuctionMode] = useState<'full' | 'components'>('full');
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [bidAmount, setBidAmount] = useState('');
  const { toast } = useToast();

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    }
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  // Individual Platform Components with Separate Valuations & IP
  const platformComponents = {
    "sustano-sphere": {
      name: "Sustano-Sphere™ Digital Asset Marketplace",
      value: 12500000000, // $12.5B
      ipValue: 2500000000, // $2.5B in IP
      revenue: 180000000, // $180M annual
      patents: ["Digital Asset ESG Scoring", "Auction Algorithm", "Blockchain Integration"],
      trademarks: ["Sustano-Sphere™"],
      description: "Revolutionary digital asset auction platform with ESG integration",
      category: "marketplace",
      completion: 85,
      auctionable: true,
      icon: <Gavel className="w-5 h-5" />,
      color: "text-blue-600"
    },
    "property-valuations": {
      name: "AI Property Valuation Engine",
      value: 8500000000, // $8.5B
      ipValue: 1800000000, // $1.8B in IP
      revenue: 125000000, // $125M annual
      patents: ["Automated Valuation Model", "ESG Property Scoring", "Risk Assessment AI"],
      trademarks: ["SustanoVal™"],
      description: "Advanced AI-powered property valuation with climate risk assessment",
      category: "ai-platform",
      completion: 90,
      auctionable: true,
      icon: <Brain className="w-5 h-5" />,
      color: "text-purple-600"
    },
    "esg-platform": {
      name: "ESG Climate Assessment Platform",
      value: 6200000000, // $6.2B
      ipValue: 1200000000, // $1.2B in IP
      revenue: 95000000, // $95M annual
      patents: ["Climate Risk Modeling", "ESG Scoring Algorithm", "Greenium Calculation"],
      trademarks: ["ClimateVal™", "Greenium™"],
      description: "Comprehensive ESG and climate risk assessment for real estate",
      category: "esg-platform",
      completion: 80,
      auctionable: true,
      icon: <Leaf className="w-5 h-5" />,
      color: "text-green-600"
    },
    "auction-sphere": {
      name: "3D WebGL Auction Platform",
      value: 4800000000, // $4.8B
      ipValue: 950000000, // $950M in IP
      revenue: 75000000, // $75M annual
      patents: ["3D Auction Interface", "Real-time Bidding Engine", "VR Integration"],
      trademarks: ["Auction-Sphere™"],
      description: "Immersive 3D auction experience with WebGL technology",
      category: "3d-platform",
      completion: 75,
      auctionable: true,
      icon: <Globe className="w-5 h-5" />,
      color: "text-cyan-600"
    },
    "investment-platform": {
      name: "Fractional Investment Platform",
      value: 3500000000, // $3.5B
      ipValue: 650000000, // $650M in IP
      revenue: 55000000, // $55M annual
      patents: ["Fractional Ownership Algorithm", "Pool Investment System"],
      trademarks: ["InvestSphere™"],
      description: "Fractional real estate investment with blockchain verification",
      category: "fintech",
      completion: 70,
      auctionable: true,
      icon: <Building className="w-5 h-5" />,
      color: "text-orange-600"
    },
    "sam-token": {
      name: "SAM Cryptocurrency & Ecosystem",
      value: 2800000000, // $2.8B
      ipValue: 480000000, // $480M in IP
      revenue: 42000000, // $42M annual
      patents: ["Token Economics Model", "Staking Algorithm"],
      trademarks: ["SAM Token™"],
      description: "Native cryptocurrency with DeFi staking and rewards",
      category: "crypto",
      completion: 65,
      auctionable: true,
      icon: <Coins className="w-5 h-5" />,
      color: "text-yellow-600"
    },
    "betting-agency": {
      name: "Non-Profit Betting Agency (Social Impact)",
      value: 1500000000, // $1.5B
      ipValue: 280000000, // $280M in IP
      revenue: 25000000, // $25M annual (reinvested)
      patents: ["Social Impact Algorithm", "Transparent Betting System"],
      trademarks: ["SocialBet™"],
      description: "100% profit reinvestment into social and environmental projects",
      category: "social-impact",
      completion: 60,
      auctionable: true,
      esgPremium: 25, // Additional 25% for social impact
      icon: <Gamepad2 className="w-5 h-5" />,
      color: "text-pink-600"
    },
    "financial-reporting": {
      name: "AI Financial Analysis Platform",
      value: 1200000000, // $1.2B
      ipValue: 220000000, // $220M in IP
      revenue: 18000000, // $18M annual
      patents: ["Financial Ratio AI", "Automated Report Generation"],
      trademarks: ["FinanceAI™"],
      description: "Automated financial analysis and reporting with AI insights",
      category: "fintech",
      completion: 75,
      auctionable: true,
      icon: <BarChart3 className="w-5 h-5" />,
      color: "text-indigo-600"
    }
  };

  const totalEcosystemValue = Object.values(platformComponents).reduce((sum, comp) => sum + comp.value, 0);
  const totalIPValue = Object.values(platformComponents).reduce((sum, comp) => sum + comp.ipValue, 0);
  const totalRevenue = Object.values(platformComponents).reduce((sum, comp) => sum + comp.revenue, 0);

  const toggleComponentSelection = (componentId: string) => {
    setSelectedComponents(prev => 
      prev.includes(componentId) 
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  const getSelectedValue = () => {
    return selectedComponents.reduce((sum, id) => sum + platformComponents[id as keyof typeof platformComponents].value, 0);
  };

  const handlePlaceBid = () => {
    const amount = parseFloat(bidAmount);
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Bid",
        description: "Please enter a valid bid amount",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bid Placed Successfully! 🎯",
      description: `Your bid of ${formatCurrency(amount)} has been submitted for review`,
    });
    setBidAmount("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Platform Ecosystem Auction
          </CardTitle>
          <CardDescription className="text-lg">
            Purchase the complete ecosystem or individual platform components
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Auction Mode Selector */}
      <div className="flex gap-4">
        <Button
          variant={auctionMode === 'full' ? 'default' : 'outline'}
          onClick={() => setAuctionMode('full')}
          className="flex-1"
        >
          <Package className="w-4 h-4 mr-2" />
          Complete Ecosystem
        </Button>
        <Button
          variant={auctionMode === 'components' ? 'default' : 'outline'}
          onClick={() => setAuctionMode('components')}
          className="flex-1"
        >
          <Layers className="w-4 h-4 mr-2" />
          Individual Components
        </Button>
      </div>

      {auctionMode === 'full' ? (
        // Full Ecosystem Package
        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-6 h-6 text-green-600" />
              Complete Platform Ecosystem Package
            </CardTitle>
            <CardDescription>
              Acquire the entire platform ecosystem including all IP, technology, and revenue streams
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-4xl font-bold text-green-600">
                  {formatCurrency(totalEcosystemValue)}
                </div>
                <div className="text-sm text-muted-foreground">Total Platform Value</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(totalIPValue)}
                </div>
                <div className="text-sm text-muted-foreground">IP Portfolio Value</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">
                  {formatCurrency(totalRevenue)}
                </div>
                <div className="text-sm text-muted-foreground">Annual Revenue</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Package Includes:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Object.entries(platformComponents).map(([key, component]) => (
                  <div key={key} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                    <div className={component.color}>
                      {component.icon}
                    </div>
                    <span className="text-sm">{component.name}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      {formatCurrency(component.value)}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Input
                placeholder="Enter bid amount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handlePlaceBid} className="px-8">
                <Gavel className="w-4 h-4 mr-2" />
                Place Bid
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Individual Components Selection
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Components for Auction</CardTitle>
              <CardDescription>
                Choose individual platform components to purchase separately
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedComponents.length > 0 && (
                <div className="mb-6 p-4 bg-primary/5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Selected Components Value:</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(getSelectedValue())}
                    </span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(platformComponents).map(([key, component]) => (
                  <Card 
                    key={key} 
                    className={`cursor-pointer transition-all ${
                      selectedComponents.includes(key) 
                        ? 'ring-2 ring-primary shadow-lg' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => toggleComponentSelection(key)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className={component.color}>
                            {component.icon}
                          </div>
                          <CardTitle className="text-base">{component.name}</CardTitle>
                        </div>
                        <Badge variant={component.auctionable ? 'default' : 'secondary'}>
                          {component.auctionable ? 'Available' : 'Bundle Only'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Platform Value:</span>
                          <div className="font-semibold text-green-600">
                            {formatCurrency(component.value)}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">IP Value:</span>
                          <div className="font-semibold text-blue-600">
                            {formatCurrency(component.ipValue)}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Annual Revenue:</span>
                          <div className="font-semibold text-purple-600">
                            {formatCurrency(component.revenue)}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Completion:</span>
                          <div className="font-semibold">{component.completion}%</div>
                        </div>
                      </div>

                      <Progress value={component.completion} className="h-2" />
                      
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">Patents Included:</div>
                        <div className="flex flex-wrap gap-1">
                          {component.patents.map((patent, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {patent}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">Trademarks:</div>
                        <div className="flex flex-wrap gap-1">
                          {component.trademarks.map((trademark, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {trademark}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground">{component.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedComponents.length > 0 && (
                <div className="mt-6 flex gap-4">
                  <Input
                    placeholder="Enter bid amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handlePlaceBid} className="px-8">
                    <Gavel className="w-4 h-4 mr-2" />
                    Place Bid
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ModularPlatformValuation;