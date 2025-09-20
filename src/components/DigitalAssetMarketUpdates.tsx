import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  Zap, 
  DollarSign,
  Clock,
  Building,
  Users,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const DigitalAssetMarketUpdates = () => {
  const nftSales = [
    { 
      id: 1, 
      name: "Bored Ape #3749", 
      collection: "Bored Ape Yacht Club",
      price: "$152,000", 
      priceETH: "45.2 ETH",
      change: "+12.5%", 
      time: "2 hours ago",
      platform: "OpenSea",
      trending: "up"
    },
    { 
      id: 2, 
      name: "CryptoPunk #7804", 
      collection: "CryptoPunks",
      price: "$4.2M", 
      priceETH: "1,250 ETH",
      change: "+8.7%", 
      time: "4 hours ago",
      platform: "LooksRare",
      trending: "up"
    },
    { 
      id: 3, 
      name: "Azuki #9999", 
      collection: "Azuki",
      price: "$89,500", 
      priceETH: "26.8 ETH",
      change: "-3.2%", 
      time: "6 hours ago",
      platform: "OpenSea",
      trending: "down"
    },
    { 
      id: 4, 
      name: "Moonbird #2048", 
      collection: "Moonbirds",
      price: "$67,300", 
      priceETH: "20.1 ETH",
      change: "+15.8%", 
      time: "8 hours ago",
      platform: "X2Y2",
      trending: "up"
    }
  ];

  const platformTokens = [
    {
      name: "Decentraland",
      symbol: "MANA",
      price: "$0.48",
      change: "+5.2%",
      volume: "$24.2M",
      trending: "up"
    },
    {
      name: "The Sandbox",
      symbol: "SAND",
      price: "$0.52",
      change: "+8.1%",
      volume: "$18.7M",
      trending: "up"
    },
    {
      name: "Axie Infinity",
      symbol: "AXS",
      price: "$7.85",
      change: "-2.4%",
      volume: "$31.5M",
      trending: "down"
    },
    {
      name: "ApeCoin",
      symbol: "APE",
      price: "$1.23",
      change: "+12.7%",
      volume: "$89.2M",
      trending: "up"
    }
  ];

  const marketStats = [
    { label: "Total Market Cap", value: "$45.2B", change: "+3.4%" },
    { label: "24h Volume", value: "$2.1B", change: "+18.7%" },
    { label: "Active Users", value: "1.2M", change: "+12.3%" },
    { label: "Floor Price Average", value: "2.8 ETH", change: "+5.8%" }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-500" />
          Digital Asset Market Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="nft-sales" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="nft-sales">NFT Sales</TabsTrigger>
            <TabsTrigger value="platform-tokens">Platform Tokens</TabsTrigger>
            <TabsTrigger value="market-overview">Market Overview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nft-sales" className="space-y-4">
            <div className="grid gap-3">
              {nftSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{sale.name}</p>
                      <p className="text-xs text-muted-foreground">{sale.collection}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{sale.platform}</Badge>
                        <span className="text-xs text-muted-foreground">{sale.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{sale.price}</p>
                    <p className="text-xs text-muted-foreground">{sale.priceETH}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {sale.trending === 'up' ? (
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-xs ${sale.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {sale.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="platform-tokens" className="space-y-4">
            <div className="grid gap-3">
              {platformTokens.map((token, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{token.name}</p>
                      <p className="text-xs text-muted-foreground">{token.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{token.price}</p>
                    <p className="text-xs text-muted-foreground">Vol: {token.volume}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {token.trending === 'up' ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-xs ${token.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {token.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="market-overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {marketStats.map((stat, index) => (
                <div key={index} className="p-4 border rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Market Insights</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• NFT sales volume increased 18.7% in the last 24 hours</li>
                <li>• Gaming tokens showing strong performance with APE leading</li>
                <li>• Metaverse land prices stabilizing after recent volatility</li>
                <li>• Institutional interest in blue-chip NFTs continues to grow</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DigitalAssetMarketUpdates;