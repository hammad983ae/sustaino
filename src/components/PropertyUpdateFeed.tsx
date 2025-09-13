import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Calendar, DollarSign, Home, Gavel } from 'lucide-react';

export default function PropertyUpdateFeed() {
  const auctionResults = [
    {
      address: "123 Collins Street, Melbourne",
      type: "Apartment",
      result: "Sold",
      price: "$850,000",
      trend: "up",
      percentage: "+12%"
    },
    {
      address: "456 Chapel Street, South Yarra",
      type: "Townhouse", 
      result: "Passed In",
      price: "$1,200,000",
      trend: "down",
      percentage: "-3%"
    },
    {
      address: "789 Toorak Road, Toorak",
      type: "House",
      result: "Sold",
      price: "$2,450,000",
      trend: "up",
      percentage: "+8%"
    }
  ];

  const marketMovements = [
    {
      region: "Melbourne Metro",
      median: "$720,000",
      change: "+2.3%",
      trend: "up"
    },
    {
      region: "Sydney Metro", 
      median: "$950,000",
      change: "+1.8%",
      trend: "up"
    },
    {
      region: "Brisbane Metro",
      median: "$685,000",
      change: "+4.1%",
      trend: "up"
    },
    {
      region: "Perth Metro",
      median: "$510,000",
      change: "-0.5%",
      trend: "down"
    }
  ];

  const propertyNews = [
    {
      title: "Interest Rates Hold Steady at 4.35%",
      time: "2 hours ago",
      category: "Finance"
    },
    {
      title: "Melbourne Auction Clearance Rate Hits 68%",
      time: "5 hours ago", 
      category: "Market"
    },
    {
      title: "New Planning Zones Released for Outer Melbourne",
      time: "1 day ago",
      category: "Planning"
    },
    {
      title: "First Home Buyer Activity Increases 15%",
      time: "2 days ago",
      category: "Market"
    }
  ];

  return (
    <Card className="green-3d-card animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Home className="h-6 w-6 text-primary animate-green-glow" />
          Property Market Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="auctions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 green-3d-button">
            <TabsTrigger value="auctions" className="text-sm">
              <Gavel className="h-4 w-4 mr-2" />
              Auction Results
            </TabsTrigger>
            <TabsTrigger value="movements" className="text-sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Market Movements
            </TabsTrigger>
            <TabsTrigger value="news" className="text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              Property News
            </TabsTrigger>
          </TabsList>

          <TabsContent value="auctions" className="space-y-4 mt-4">
            {auctionResults.map((auction, index) => (
              <div key={index} className="p-4 border border-green-200/50 rounded-lg green-glow-effect">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{auction.address}</h4>
                    <p className="text-sm text-muted-foreground">{auction.type}</p>
                  </div>
                  <Badge variant={auction.result === "Sold" ? "default" : "secondary"}>
                    {auction.result}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg text-foreground">{auction.price}</span>
                  <div className={`flex items-center gap-1 ${auction.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {auction.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span className="text-sm font-medium">{auction.percentage}</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="movements" className="space-y-4 mt-4">
            {marketMovements.map((market, index) => (
              <div key={index} className="p-4 border border-green-200/50 rounded-lg green-glow-effect">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-foreground">{market.region}</h4>
                    <p className="text-lg font-semibold text-foreground">{market.median}</p>
                  </div>
                  <div className={`flex items-center gap-1 ${market.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {market.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span className="font-medium">{market.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="news" className="space-y-4 mt-4">
            {propertyNews.map((news, index) => (
              <div key={index} className="p-4 border border-green-200/50 rounded-lg green-glow-effect hover:shadow-green-glow transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground hover:text-primary cursor-pointer">{news.title}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">{news.category}</Badge>
                      <span className="text-xs text-muted-foreground">{news.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}