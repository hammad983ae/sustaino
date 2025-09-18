/**
 * ============================================================================
 * SUSTANO-PHERE™ DIGITAL ASSET INTELLIGENCE DATABASE
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * PATENT PENDING: Comprehensive Digital Asset Sales Intelligence System™
 * PATENT PENDING: AI-Enhanced Digital Asset Valuation Attribution Engine™
 * PATENT PENDING: Automated Digital Asset Component Analysis System™
 * TRADEMARK: Sustano-Phere™ Digital Asset Intelligence Database - Registered
 * TRADE SECRETS: Proprietary attribution algorithms and valuation methodologies
 * 
 * CONFIDENTIAL AND PROPRIETARY INFORMATION
 * This software contains revolutionary trade secrets and confidential information.
 * Unauthorized copying, distribution, or use is strictly prohibited.
 * 
 * REVOLUTIONARY IP COMPONENTS:
 * - Digital Asset Sales Intelligence Database™ (PATENT PENDING)
 * - AI-Enhanced Value Attribution Engine™ (PATENT PENDING) 
 * - Automated Component Analysis Framework™ (PATENT PENDING)
 * - Real-Time Market Intelligence System™ (PATENT PENDING)
 * - ESG-Integrated Digital Asset Assessment™ (PATENT PENDING)
 * - Predictive Valuation Algorithms™ (TRADE SECRET)
 * - Comparative Analysis Engine™ (TRADE SECRET)
 * ============================================================================
 */

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { 
  Database, 
  TrendingUp, 
  Brain, 
  Users, 
  DollarSign, 
  Globe, 
  Shield, 
  Award,
  Zap,
  Search,
  Plus,
  FileText,
  BarChart3,
  Target,
  Rocket,
  Building,
  Code2,
  Lightbulb,
  Lock,
  Star,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  TrendingDown,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DigitalAssetSale {
  id: string;
  assetName: string;
  assetType: "website" | "mobile-app" | "platform" | "saas" | "ecommerce" | "marketplace" | "ai-model" | "blockchain" | "api";
  salePrice: number;
  saleDate: string;
  monthlyRevenue: number;
  monthlyUsers: number;
  techStack: string[];
  businessModel: string;
  geography: string;
  seller: {
    type: "individual" | "startup" | "corporation";
    experience: number;
  };
  buyer: {
    type: "individual" | "strategic" | "financial" | "corporation";
    region: string;
  };
  keyAttributes: {
    userBase: number;
    revenue: number;
    growth: number;
    profitability: number;
    techScore: number;
    esgScore: number;
    brandValue: number;
    dataAssets: number;
    ipValue: number;
    marketPosition: number;
  };
  valuation: {
    revenueMultiple: number;
    userMultiple: number;
    ebitdaMultiple: number;
    premiumFactors: string[];
    discountFactors: string[];
  };
  dueDiligence: {
    techAudit: number;
    financialVerification: boolean;
    legalClearance: boolean;
    ipVerification: boolean;
  };
  marketConditions: {
    sectorTrend: "hot" | "growing" | "stable" | "declining";
    competitionLevel: "low" | "medium" | "high";
    demandLevel: "low" | "medium" | "high";
  };
}

interface DigitalAssetComponent {
  id: string;
  type: "website" | "mobile-app" | "platform" | "api" | "database" | "ai-model" | "blockchain" | "iot";
  name: string;
  description: string;
  techStack: string[];
  value: number;
  performance: {
    uptime: number;
    users: number;
    transactions: number;
    revenue: number;
  };
  security: {
    score: number;
    vulnerabilities: number;
    compliance: string[];
  };
  ip: {
    patents: number;
    trademarks: number;
    copyrights: number;
  };
  lastAudit: string;
}

// Sample digital asset sales data for market intelligence
const SAMPLE_DIGITAL_ASSET_SALES: DigitalAssetSale[] = [
  {
    id: "sale_001",
    assetName: "EcoCommerce Platform",
    assetType: "ecommerce",
    salePrice: 2800000,
    saleDate: "2024-12-15",
    monthlyRevenue: 180000,
    monthlyUsers: 45000,
    techStack: ["React", "Node.js", "PostgreSQL", "AWS", "Stripe"],
    businessModel: "B2C Marketplace",
    geography: "Australia",
    seller: {
      type: "startup",
      experience: 3
    },
    buyer: {
      type: "strategic",
      region: "Asia-Pacific"
    },
    keyAttributes: {
      userBase: 45000,
      revenue: 180000,
      growth: 156,
      profitability: 18,
      techScore: 92,
      esgScore: 88,
      brandValue: 85,
      dataAssets: 78,
      ipValue: 82,
      marketPosition: 89
    },
    valuation: {
      revenueMultiple: 15.6,
      userMultiple: 62.2,
      ebitdaMultiple: 18.4,
      premiumFactors: ["ESG Leadership", "Market Dominance", "Tech Innovation"],
      discountFactors: ["Geographic Limitation"]
    },
    dueDiligence: {
      techAudit: 94,
      financialVerification: true,
      legalClearance: true,
      ipVerification: true
    },
    marketConditions: {
      sectorTrend: "hot",
      competitionLevel: "medium",
      demandLevel: "high"
    }
  },
  {
    id: "sale_002", 
    assetName: "FinTech Analytics SaaS",
    assetType: "saas",
    salePrice: 5200000,
    saleDate: "2024-11-28",
    monthlyRevenue: 280000,
    monthlyUsers: 1200,
    techStack: ["Vue.js", "Python", "MongoDB", "Azure", "TensorFlow"],
    businessModel: "B2B SaaS",
    geography: "Global",
    seller: {
      type: "startup",
      experience: 5
    },
    buyer: {
      type: "financial",
      region: "North America"
    },
    keyAttributes: {
      userBase: 1200,
      revenue: 280000,
      growth: 245,
      profitability: 35,
      techScore: 96,
      esgScore: 72,
      brandValue: 91,
      dataAssets: 95,
      ipValue: 88,
      marketPosition: 87
    },
    valuation: {
      revenueMultiple: 18.6,
      userMultiple: 4333,
      ebitdaMultiple: 23.2,
      premiumFactors: ["AI Technology", "Enterprise Clients", "Recurring Revenue"],
      discountFactors: ["Regulatory Risk"]
    },
    dueDiligence: {
      techAudit: 96,
      financialVerification: true,
      legalClearance: true,
      ipVerification: true
    },
    marketConditions: {
      sectorTrend: "hot",
      competitionLevel: "high",
      demandLevel: "high"
    }
  },
  {
    id: "sale_003",
    assetName: "PropTech Mobile App",
    assetType: "mobile-app",
    salePrice: 950000,
    saleDate: "2024-10-12",
    monthlyRevenue: 45000,
    monthlyUsers: 28000,
    techStack: ["React Native", "Firebase", "Google Cloud", "Mapbox"],
    businessModel: "Freemium",
    geography: "Australia",
    seller: {
      type: "individual",
      experience: 2
    },
    buyer: {
      type: "strategic",
      region: "Australia"
    },
    keyAttributes: {
      userBase: 28000,
      revenue: 45000,
      growth: 89,
      profitability: 12,
      techScore: 78,
      esgScore: 65,
      brandValue: 72,
      dataAssets: 85,
      ipValue: 68,
      marketPosition: 74
    },
    valuation: {
      revenueMultiple: 21.1,
      userMultiple: 33.9,
      ebitdaMultiple: 175.9,
      premiumFactors: ["Location Data", "User Engagement"],
      discountFactors: ["Small Revenue", "Geographic Limitation", "Single Founder"]
    },
    dueDiligence: {
      techAudit: 82,
      financialVerification: true,
      legalClearance: true,
      ipVerification: false
    },
    marketConditions: {
      sectorTrend: "growing",
      competitionLevel: "medium",
      demandLevel: "medium"
    }
  }
];

export const SustanoSphereDataCentre = () => {
  const { toast } = useToast();
  const [digitalAssetSales, setDigitalAssetSales] = useState<DigitalAssetSale[]>(SAMPLE_DIGITAL_ASSET_SALES);
  const [selectedSale, setSelectedSale] = useState<DigitalAssetSale | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterPriceRange, setFilterPriceRange] = useState<string>("all");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "idea": return "bg-gray-100 text-gray-800";
      case "mvp": return "bg-blue-100 text-blue-800";
      case "early": return "bg-green-100 text-green-800";
      case "growth": return "bg-purple-100 text-purple-800";
      case "scale": return "bg-orange-100 text-orange-800";
      case "mature": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-green-600";
      case "medium": return "text-yellow-600";
      case "high": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const filteredSales = digitalAssetSales.filter(sale => {
    const matchesSearch = sale.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.assetType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || sale.assetType === filterType;
    const matchesPrice = filterPriceRange === "all" || 
      (filterPriceRange === "under1m" && sale.salePrice < 1000000) ||
      (filterPriceRange === "1m-5m" && sale.salePrice >= 1000000 && sale.salePrice < 5000000) ||
      (filterPriceRange === "over5m" && sale.salePrice >= 5000000);
    return matchesSearch && matchesType && matchesPrice;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ecommerce": return "bg-green-100 text-green-800";
      case "saas": return "bg-blue-100 text-blue-800";
      case "mobile-app": return "bg-purple-100 text-purple-800";
      case "platform": return "bg-orange-100 text-orange-800";
      case "marketplace": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with IP Protection Notice */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Database className="h-10 w-10 text-primary" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full flex items-center justify-center">
                <Brain className="h-2 w-2 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Sustano-Phere™ Intelligence Database
              </CardTitle>
              <CardDescription className="text-lg font-medium">
                Digital Asset Sales Intelligence & Market Analysis
              </CardDescription>
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Shield className="h-3 w-3 mr-1" />
              Patent Pending
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Award className="h-3 w-3 mr-1" />
              AI-Enhanced Analytics™
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <Lock className="h-3 w-3 mr-1" />
              Trade Secrets Protected
            </Badge>
          </div>

          <p className="text-muted-foreground max-w-3xl mx-auto">
            Revolutionary digital asset sales intelligence platform. The world's first comprehensive 
            database analyzing ALL digital asset transactions with AI-powered attribution analysis 
            to identify value-driving components and market patterns.
          </p>

          {/* IP Protection Notice */}
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs text-amber-800 font-medium">
              <Lock className="h-3 w-3 inline mr-1" />
              © 2025 DeLorenzo Property Group Pty Ltd. Sustano-Phere™ Data Centre contains proprietary 
              AI algorithms, trade secrets, and patent-pending technologies. Unauthorized access prohibited.
            </p>
          </div>
        </CardHeader>
      </Card>

      {/* Main Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">📊 Overview</TabsTrigger>
          <TabsTrigger value="sales">💰 Sales Database</TabsTrigger>
          <TabsTrigger value="analytics">📈 Market Analytics</TabsTrigger>
          <TabsTrigger value="attribution">🎯 Value Attribution</TabsTrigger>
          <TabsTrigger value="intelligence">🧠 AI Intelligence</TabsTrigger>
          <TabsTrigger value="ip-tracker">🔒 IP Tracker</TabsTrigger>
        </TabsList>

        {/* Overview Dashboard */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">{digitalAssetSales.length}</div>
                    <div className="text-sm text-muted-foreground">Asset Sales Tracked</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(digitalAssetSales.reduce((sum, s) => sum + s.salePrice, 0))}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Sales Volume</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      {Math.round(digitalAssetSales.reduce((sum, s) => sum + s.keyAttributes.techScore, 0) / digitalAssetSales.length)}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Tech Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      {digitalAssetSales.reduce((sum, s) => sum + s.valuation.premiumFactors.length, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Value Drivers</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Intelligence Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {digitalAssetSales.slice(0, 3).map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{sale.assetName}</div>
                        <div className="text-sm text-muted-foreground">
                          Sold {sale.saleDate} - {formatCurrency(sale.salePrice)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(sale.assetType)}>
                        {sale.assetType.toUpperCase()}
                      </Badge>
                      <div className="text-sm font-medium text-green-600">
                        {sale.valuation.revenueMultiple}x Revenue
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Directory */}
        <TabsContent value="sales" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search Digital Asset Sales</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by asset name or type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="type">Asset Type</Label>
                  <select
                    id="type"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="saas">SaaS</option>
                    <option value="mobile-app">Mobile App</option>
                    <option value="platform">Platform</option>
                    <option value="marketplace">Marketplace</option>
                    <option value="ai-model">AI Model</option>
                    <option value="blockchain">Blockchain</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="price">Price Range</Label>
                  <select
                    id="price"
                    value={filterPriceRange}
                    onChange={(e) => setFilterPriceRange(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="all">All Prices</option>
                    <option value="under1m">Under $1M</option>
                    <option value="1m-5m">$1M - $5M</option>
                    <option value="over5m">Over $5M</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sales Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSales.map((sale) => (
              <Card key={sale.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {sale.assetName}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {sale.assetType} • {sale.businessModel} • {sale.geography}
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Badge className={getTypeColor(sale.assetType)}>
                        {sale.assetType}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Sale Price</div>
                      <div className="text-lg font-semibold">
                        {formatCurrency(sale.salePrice)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Revenue Multiple</div>
                      <div className="text-lg font-semibold text-blue-600">
                        {sale.valuation.revenueMultiple}x
                      </div>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tech Score</span>
                      <span className="font-medium">{sale.keyAttributes.techScore}/100</span>
                    </div>
                    <Progress value={sale.keyAttributes.techScore} className="h-2" />
                  </div>

                  {/* Revenue & Users */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{sale.monthlyUsers.toLocaleString()} users</span>
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      {formatCurrency(sale.monthlyRevenue)}/mo
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1">
                    {sale.techStack.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {sale.techStack.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{sale.techStack.length - 3}

                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      onClick={() => setSelectedSale(sale)}
                      className="flex-1"
                      size="sm"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Market Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Analytics Dashboard</CardTitle>
              <CardDescription>
                Comprehensive market intelligence and trend analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Coming Soon: Advanced Market Analytics
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Value Attribution */}
        <TabsContent value="attribution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Value Attribution Engine</CardTitle>
              <CardDescription>
                Proprietary analysis of what drives value in digital assets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Coming Soon: Revolutionary Value Attribution Analysis
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Intelligence */}
        <TabsContent value="intelligence" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Intelligence Dashboard</CardTitle>
              <CardDescription>
                Advanced AI-powered market intelligence and predictive analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Coming Soon: Revolutionary AI Intelligence Platform
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* IP Tracker */}
        <TabsContent value="ip-tracker" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property Tracker</CardTitle>
              <CardDescription>
                Monitor patents, trademarks, copyrights, and trade secrets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold">15</div>
                        <div className="text-sm text-muted-foreground">Patents Filed</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="text-2xl font-bold">8</div>
                        <div className="text-sm text-muted-foreground">Trademarks</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="text-2xl font-bold">47</div>
                        <div className="text-sm text-muted-foreground">Trade Secrets</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center text-muted-foreground py-8">
                Detailed IP Portfolio Management Coming Soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Selected Sale Modal/Details would go here */}
      {selectedSale && (
        <Card className="fixed inset-4 z-50 bg-background border shadow-lg overflow-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedSale.assetName} - Detailed Analysis</CardTitle>
              <Button variant="ghost" onClick={() => setSelectedSale(null)}>
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              Detailed sale analysis view coming soon...
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SustanoSphereDataCentre;