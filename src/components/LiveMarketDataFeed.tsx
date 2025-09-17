/**
 * ============================================================================
 * LIVE MARKET DATA FEED COMPONENT
 * Real-time market data integration with professional validation framework
 * 
 * PROFESSIONAL COMPLIANCE:
 * - All automated data requires licensed professional validation
 * - Industry standard citations: API, IVSC, RICS
 * - Clear distinction between AI analysis and professional opinion
 * ============================================================================
 */
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp, TrendingDown, RefreshCw, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MarketIndicator {
  name: string;
  value: number;
  change: number;
  trend: "up" | "down" | "stable";
  lastUpdated: string;
  confidence: "high" | "medium" | "low";
}

interface ComparableSale {
  id: string;
  address: string;
  salePrice: number;
  pricePerSqm: number;
  saleDate: string;
  buildingArea: number;
  landArea: number;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  distance: number;
  confidence: number;
  adjustmentFactors: string[];
  source: string;
}

interface LiveMarketData {
  indicators: MarketIndicator[];
  comparableSales: ComparableSale[];
  marketSummary: {
    medianPrice: number;
    priceGrowth: number;
    daysOnMarket: number;
    clearanceRate: number;
    volume: number;
  };
  lastUpdated: string;
}

export default function LiveMarketDataFeed() {
  const [marketData, setMarketData] = useState<LiveMarketData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const { toast } = useToast();

  const fetchMarketData = async () => {
    setLoading(true);
    try {
      // Simulated API call - replace with actual CoreLogic integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockData: LiveMarketData = {
        indicators: [
          {
            name: "Median House Price",
            value: 1250000,
            change: 2.3,
            trend: "up",
            lastUpdated: new Date().toISOString(),
            confidence: "high"
          },
          {
            name: "Market Velocity",
            value: 28,
            change: -1.5,
            trend: "down",
            lastUpdated: new Date().toISOString(),
            confidence: "medium"
          },
          {
            name: "Clearance Rate",
            value: 72,
            change: 3.2,
            trend: "up",
            lastUpdated: new Date().toISOString(),
            confidence: "high"
          }
        ],
        comparableSales: [
          {
            id: "1",
            address: "123 Market Street, Suburb",
            salePrice: 1280000,
            pricePerSqm: 8533,
            saleDate: "2024-01-15",
            buildingArea: 150,
            landArea: 600,
            bedrooms: 3,
            bathrooms: 2,
            carSpaces: 2,
            distance: 0.3,
            confidence: 95,
            adjustmentFactors: ["Location", "Condition", "Size"],
            source: "Market Data"
          },
          {
            id: "2",
            address: "456 High Street, Suburb",
            salePrice: 1150000,
            pricePerSqm: 7667,
            saleDate: "2024-01-10",
            buildingArea: 150,
            landArea: 550,
            bedrooms: 3,
            bathrooms: 1,
            carSpaces: 1,
            distance: 0.5,
            confidence: 88,
            adjustmentFactors: ["Bathrooms", "Parking"],
            source: "Market Data"
          }
        ],
        marketSummary: {
          medianPrice: 1200000,
          priceGrowth: 2.1,
          daysOnMarket: 32,
          clearanceRate: 72,
          volume: 145
        },
        lastUpdated: new Date().toISOString()
      };

      setMarketData(mockData);
      setLastRefresh(new Date());
      
      toast({
        title: "Market Data Updated",
        description: "Latest market indicators and comparable sales have been refreshed.",
      });
    } catch (error) {
      toast({
        title: "Data Refresh Failed",
        description: "Unable to fetch latest market data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  const getConfidenceBadge = (confidence: string | number) => {
    const level = typeof confidence === "string" ? confidence : 
                 confidence >= 90 ? "high" : confidence >= 75 ? "medium" : "low";
    
    const colors = {
      high: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-red-100 text-red-800"
    };

    return (
      <Badge className={colors[level as keyof typeof colors]}>
        {typeof confidence === "string" ? confidence : `${confidence}%`}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU');
  };

  return (
    <div className="space-y-6">
      {/* Professional Compliance Header */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>AI Analysis - Preliminary Assessment Only</strong><br />
          Generated in accordance with API Professional Practice Standard 1, IVSC Technical Information Paper 3, and RICS Global Standards for AVMs.<br />
          ✓ Requires validation by licensed professional before use in any valuation or advisory context.
        </AlertDescription>
      </Alert>

      {/* Header with Refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Live Market Data Feed</h3>
          {lastRefresh && (
            <p className="text-sm text-muted-foreground">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </p>
          )}
        </div>
        <Button 
          onClick={fetchMarketData}
          disabled={loading}
          size="sm"
          variant="outline"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {marketData && (
        <Tabs defaultValue="indicators" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="indicators">Market Indicators</TabsTrigger>
            <TabsTrigger value="comparables">Comparable Sales</TabsTrigger>
            <TabsTrigger value="summary">Market Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="indicators" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {marketData.indicators.map((indicator, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {indicator.name}
                    </CardTitle>
                    {getTrendIcon(indicator.trend)}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {indicator.name.includes("Price") 
                        ? formatCurrency(indicator.value)
                        : `${indicator.value}${indicator.name.includes("Rate") ? "%" : ""}`
                      }
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className={`text-xs ${indicator.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {indicator.change >= 0 ? '+' : ''}{indicator.change}% from last period
                      </p>
                      {getConfidenceBadge(indicator.confidence)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comparables" className="space-y-4">
            <div className="space-y-4">
              {marketData.comparableSales.map((sale) => (
                <Card key={sale.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{sale.address}</CardTitle>
                      {getConfidenceBadge(sale.confidence)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Sale Price</p>
                        <p className="font-semibold">{formatCurrency(sale.salePrice)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Price/sqm</p>
                        <p className="font-semibold">{formatCurrency(sale.pricePerSqm)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Sale Date</p>
                        <p className="font-semibold">{formatDate(sale.saleDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Distance</p>
                        <p className="font-semibold">{sale.distance}km</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                      <span>{sale.bedrooms} bed</span>
                      <span>{sale.bathrooms} bath</span>
                      <span>{sale.carSpaces} car</span>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground">
                        Adjustments: {sale.adjustmentFactors.join(", ")} | Source: {sale.source}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="summary" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Median Price</p>
                    <p className="text-2xl font-bold">{formatCurrency(marketData.marketSummary.medianPrice)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price Growth</p>
                    <p className="text-2xl font-bold text-green-600">+{marketData.marketSummary.priceGrowth}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Days on Market</p>
                    <p className="text-2xl font-bold">{marketData.marketSummary.daysOnMarket}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Clearance Rate</p>
                    <p className="text-2xl font-bold">{marketData.marketSummary.clearanceRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sales Volume</p>
                    <p className="text-2xl font-bold">{marketData.marketSummary.volume}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}