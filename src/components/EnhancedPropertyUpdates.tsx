import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Gavel, 
  Clock, 
  MapPin, 
  DollarSign, 
  ArrowUp, 
  ArrowDown, 
  Building, 
  Home,
  BarChart3,
  Calendar,
  Filter,
  RefreshCw
} from 'lucide-react';

interface PropertyListing {
  id: string;
  address: string;
  type: string;
  price: number;
  change: number;
  status: 'Sold' | 'Passed In' | 'Auction' | 'For Sale';
  daysOnMarket: number;
  bedrooms?: number;
  bathrooms?: number;
  carSpaces?: number;
  landSize?: number;
}

const EnhancedPropertyUpdates = () => {
  const [activeTab, setActiveTab] = useState('auction-results');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const auctionResults: PropertyListing[] = [
    {
      id: '1',
      address: '123 Collins Street, Melbourne',
      type: 'Apartment',
      price: 850000,
      change: 12,
      status: 'Sold',
      daysOnMarket: 28,
      bedrooms: 2,
      bathrooms: 2,
      carSpaces: 1
    },
    {
      id: '2',
      address: '456 Chapel Street, South Yarra',
      type: 'Townhouse',
      price: 1200000,
      change: -3,
      status: 'Passed In',
      daysOnMarket: 45,
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 2
    },
    {
      id: '3',
      address: '789 Toorak Road, Toorak',
      type: 'House',
      price: 2450000,
      change: 8,
      status: 'Sold',
      daysOnMarket: 21,
      bedrooms: 4,
      bathrooms: 3,
      carSpaces: 2,
      landSize: 650
    },
    {
      id: '4',
      address: '321 St Kilda Road, Melbourne',
      type: 'Apartment',
      price: 675000,
      change: 5,
      status: 'Sold',
      daysOnMarket: 35,
      bedrooms: 1,
      bathrooms: 1,
      carSpaces: 1
    },
    {
      id: '5',
      address: '567 Burke Road, Camberwell',
      type: 'House',
      price: 1850000,
      change: -1,
      status: 'Passed In',
      daysOnMarket: 52,
      bedrooms: 4,
      bathrooms: 2,
      carSpaces: 3,
      landSize: 580
    }
  ];

  const marketMovements = [
    { suburb: 'Melbourne', median: 850000, change: 8.5, volume: 245 },
    { suburb: 'South Yarra', median: 1200000, change: 12.3, volume: 189 },
    { suburb: 'Toorak', median: 2800000, change: 5.7, volume: 87 },
    { suburb: 'St Kilda', median: 750000, change: -2.1, volume: 156 },
    { suburb: 'Camberwell', median: 1650000, change: 6.8, volume: 198 }
  ];

  const upcomingAuctions = [
    { address: '45 Domain Road, South Yarra', time: '11:00 AM', estimate: '$1.8M - $2M' },
    { address: '78 Collins Street, Melbourne', time: '11:30 AM', estimate: '$950K - $1.1M' },
    { address: '123 Punt Road, Richmond', time: '12:00 PM', estimate: '$1.2M - $1.4M' },
    { address: '56 Chapel Street, Windsor', time: '12:30 PM', estimate: '$750K - $850K' }
  ];

  const marketStats = {
    totalSales: 1247,
    averagePrice: 1350000,
    clearanceRate: 68.5,
    medianDaysOnMarket: 32
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sold': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'Passed In': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'Auction': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Property Market Updates
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
            <p className="text-xs text-muted-foreground">
              Updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Market Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{marketStats.totalSales}</div>
            <div className="text-sm text-blue-800 dark:text-blue-200">Total Sales</div>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{formatPrice(marketStats.averagePrice)}</div>
            <div className="text-sm text-green-800 dark:text-green-200">Average Price</div>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{marketStats.clearanceRate}%</div>
            <div className="text-sm text-purple-800 dark:text-purple-200">Clearance Rate</div>
          </div>
          <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{marketStats.medianDaysOnMarket}</div>
            <div className="text-sm text-orange-800 dark:text-orange-200">Median DOM</div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="auction-results">
              <Gavel className="w-4 h-4 mr-1" />
              Auction Results
            </TabsTrigger>
            <TabsTrigger value="market-movements">
              <BarChart3 className="w-4 h-4 mr-1" />
              Market Movements
            </TabsTrigger>
            <TabsTrigger value="upcoming-auctions">
              <Calendar className="w-4 h-4 mr-1" />
              Upcoming Auctions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="auction-results" className="space-y-3 max-h-96 overflow-y-auto">
            {auctionResults.map((property) => (
              <div key={property.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-sm">{property.address}</h4>
                      <Badge className={getStatusColor(property.status)}>
                        {property.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        {property.type}
                      </span>
                      {property.bedrooms && (
                        <span>{property.bedrooms} bed</span>
                      )}
                      {property.bathrooms && (
                        <span>{property.bathrooms} bath</span>
                      )}
                      {property.carSpaces && (
                        <span>{property.carSpaces} car</span>
                      )}
                      {property.landSize && (
                        <span>{property.landSize}m²</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{formatPrice(property.price)}</span>
                      <div className={`flex items-center gap-1 text-xs ${
                        property.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {property.change >= 0 ? (
                          <ArrowUp className="w-3 h-3" />
                        ) : (
                          <ArrowDown className="w-3 h-3" />
                        )}
                        {Math.abs(property.change)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {property.daysOnMarket} days
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="market-movements" className="space-y-3 max-h-96 overflow-y-auto">
            {marketMovements.map((market, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <h4 className="font-semibold">{market.suburb}</h4>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {market.volume} properties sold
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-lg">{formatPrice(market.median)}</div>
                    <div className={`flex items-center gap-1 text-sm ${
                      market.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {market.change >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {Math.abs(market.change)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="upcoming-auctions" className="space-y-3 max-h-96 overflow-y-auto">
            {upcomingAuctions.map((auction, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{auction.address}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {auction.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {auction.estimate}
                      </span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    Set Alert
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnhancedPropertyUpdates;