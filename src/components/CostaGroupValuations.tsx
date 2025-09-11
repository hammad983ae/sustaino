import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Leaf, TrendingUp, Calculator, FileText, Droplets, CloudRain, Calendar, BarChart3 } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { supabase } from '@/integrations/supabase/client';

interface WaterRights {
  allocation: number; // ML per year
  securityLevel: 'high' | 'medium' | 'low';
  tradableValue: number; // $/ML
  annualUsage: number; // ML
  carryoverCapacity: number; // ML
}

interface CropForecast {
  currentSeason: {
    expectedYield: number;
    qualityGrade: 'premium' | 'standard' | 'processing';
    harvestWindow: { start: string; end: string };
    marketPrice: number; // $/tonne
  };
  nextSeason: {
    plantedArea: number;
    expectedYield: number;
    projectedRevenue: number;
  };
  risks: string[];
  opportunities: string[];
}

interface CostaProperty {
  id: string;
  name: string;
  address: string;
  state: string;
  propertyType: 'mushroom' | 'berry' | 'citrus' | 'avocado' | 'tomato' | 'grape' | 'banana';
  landArea: number;
  operationalStatus: 'owned' | 'leased' | 'joint-venture';
  annualProduction: string;
  waterRights?: WaterRights;
  cropForecast?: CropForecast;
  marketValue?: number;
  rentalValue?: number;
  leaseholdValue?: number;
  waterValue?: number;
  coordinates?: { lat: number; lng: number };
}

const costaProperties: CostaProperty[] = [
  // Victorian Properties
  {
    id: 'costa-mushroom-bundoora',
    name: 'Bundoora Mushroom Farm',
    address: '2045 Plenty Road, Bundoora, VIC 3083',
    state: 'VIC',
    propertyType: 'mushroom',
    landArea: 15.5,
    operationalStatus: 'owned',
    annualProduction: '2.8M kg mushrooms',
    coordinates: { lat: -37.7136, lng: 145.0549 },
    waterRights: {
      allocation: 45,
      securityLevel: 'high',
      tradableValue: 2800,
      annualUsage: 42,
      carryoverCapacity: 15
    },
    cropForecast: {
      currentSeason: {
        expectedYield: 2850000,
        qualityGrade: 'premium',
        harvestWindow: { start: '2024-01-01', end: '2024-12-31' },
        marketPrice: 8.50
      },
      nextSeason: {
        plantedArea: 15.5,
        expectedYield: 2950000,
        projectedRevenue: 25075000
      },
      risks: ['Supply chain disruption', 'Labor shortage'],
      opportunities: ['Premium market expansion', 'Organic certification']
    }
  },
  {
    id: 'costa-mushroom-somerville',
    name: 'Somerville Mushroom Complex',
    address: '1520 Frankston-Dandenong Road, Somerville, VIC 3912',
    state: 'VIC',
    propertyType: 'mushroom',
    landArea: 28.3,
    operationalStatus: 'owned',
    annualProduction: '4.2M kg mushrooms',
    coordinates: { lat: -38.2167, lng: 145.1833 },
    waterRights: {
      allocation: 68,
      securityLevel: 'high',
      tradableValue: 2750,
      annualUsage: 65,
      carryoverCapacity: 20
    },
    cropForecast: {
      currentSeason: {
        expectedYield: 4350000,
        qualityGrade: 'premium',
        harvestWindow: { start: '2024-01-01', end: '2024-12-31' },
        marketPrice: 8.20
      },
      nextSeason: {
        plantedArea: 28.3,
        expectedYield: 4500000,
        projectedRevenue: 36900000
      },
      risks: ['Energy cost increases', 'Substrate supply'],
      opportunities: ['Export market growth', 'Value-added products']
    }
  },
  {
    id: 'costa-citrus-robinvale',
    name: 'Robinvale Citrus Orchards',
    address: 'Murray Valley Highway, Robinvale, VIC 3549',
    state: 'VIC',
    propertyType: 'citrus',
    landArea: 420.8,
    operationalStatus: 'owned',
    annualProduction: '12,500 tonnes citrus',
    coordinates: { lat: -34.5833, lng: 142.7833 },
    waterRights: {
      allocation: 2850,
      securityLevel: 'medium',
      tradableValue: 1950,
      annualUsage: 2750,
      carryoverCapacity: 570
    },
    cropForecast: {
      currentSeason: {
        expectedYield: 12800,
        qualityGrade: 'premium',
        harvestWindow: { start: '2024-05-01', end: '2024-09-30' },
        marketPrice: 2850
      },
      nextSeason: {
        plantedArea: 420.8,
        expectedYield: 13200,
        projectedRevenue: 37620000
      },
      risks: ['Climate variability', 'Water allocation cuts'],
      opportunities: ['Premium export markets', 'Juice processing expansion']
    }
  },
  {
    id: 'costa-grape-mildura',
    name: 'Mildura Table Grape Operations',
    address: '1855 Fifteenth Street, Mildura, VIC 3500',
    state: 'VIC',
    propertyType: 'grape',
    landArea: 185.2,
    operationalStatus: 'leased',
    annualProduction: '3,200 tonnes grapes',
    coordinates: { lat: -34.2017, lng: 142.1478 },
    waterRights: {
      allocation: 1250,
      securityLevel: 'medium',
      tradableValue: 2100,
      annualUsage: 1180,
      carryoverCapacity: 250
    },
    cropForecast: {
      currentSeason: {
        expectedYield: 3350,
        qualityGrade: 'premium',
        harvestWindow: { start: '2024-01-15', end: '2024-03-31' },
        marketPrice: 4200
      },
      nextSeason: {
        plantedArea: 185.2,
        expectedYield: 3450,
        projectedRevenue: 14490000
      },
      risks: ['Hail damage', 'Labor costs'],
      opportunities: ['Asian export growth', 'Premium varietals']
    }
  },

  // South Australian Properties
  {
    id: 'costa-mushroom-monarto',
    name: 'Monarto Mushroom Farm',
    address: '680 Princes Highway, Monarto, SA 5254',
    state: 'SA',
    propertyType: 'mushroom',
    landArea: 18.7,
    operationalStatus: 'owned',
    annualProduction: '3.1M kg mushrooms',
    coordinates: { lat: -35.0833, lng: 139.0833 }
  },
  {
    id: 'costa-citrus-renmark',
    name: 'Renmark Citrus Operations',
    address: 'Sturt Highway, Renmark, SA 5341',
    state: 'SA',
    propertyType: 'citrus',
    landArea: 890.5,
    operationalStatus: 'owned',
    annualProduction: '28,500 tonnes citrus',
    coordinates: { lat: -34.1781, lng: 140.7450 }
  },
  {
    id: 'costa-avocado-riverland',
    name: 'Riverland Avocado Plantation',
    address: '2840 Mallee Highway, Loxton, SA 5333',
    state: 'SA',
    propertyType: 'avocado',
    landArea: 165.3,
    operationalStatus: 'joint-venture',
    annualProduction: '2,850 tonnes avocados',
    coordinates: { lat: -34.4511, lng: 140.5675 }
  },

  // Western Australian Properties
  {
    id: 'costa-mushroom-wanneroo',
    name: 'Wanneroo Mushroom Complex',
    address: '1245 Wanneroo Road, Wanneroo, WA 6065',
    state: 'WA',
    propertyType: 'mushroom',
    landArea: 22.4,
    operationalStatus: 'owned',
    annualProduction: '3.8M kg mushrooms',
    coordinates: { lat: -31.7489, lng: 115.8033 }
  },
  {
    id: 'costa-berry-gingin',
    name: 'Gingin Berry Farms',
    address: '4580 Great Northern Highway, Gingin, WA 6503',
    state: 'WA',
    propertyType: 'berry',
    landArea: 120.0,
    operationalStatus: 'owned',
    annualProduction: '2,400 tonnes berries',
    coordinates: { lat: -31.3500, lng: 115.9000 }
  },
  {
    id: 'costa-avocado-kununurra',
    name: 'Kununurra Avocado Farm',
    address: '850 Victoria Highway, Kununurra, WA 6743',
    state: 'WA',
    propertyType: 'avocado',
    landArea: 95.7,
    operationalStatus: 'leased',
    annualProduction: '1,680 tonnes avocados',
    coordinates: { lat: -15.7781, lng: 128.7375 }
  },

  // Queensland Properties
  {
    id: 'costa-berry-coffs-harbour',
    name: 'Coffs Harbour Berry Farm',
    address: '1820 Pacific Highway, Coffs Harbour, NSW 2450',
    state: 'NSW',
    propertyType: 'berry',
    landArea: 85.2,
    operationalStatus: 'owned',
    annualProduction: '1,950 tonnes berries',
    coordinates: { lat: -30.2963, lng: 153.1309 }
  },
  {
    id: 'costa-banana-tully',
    name: 'Tully Banana Plantation',
    address: '2340 Bruce Highway, Tully, QLD 4854',
    state: 'QLD',
    propertyType: 'banana',
    landArea: 245.8,
    operationalStatus: 'leased',
    annualProduction: '8,500 tonnes bananas',
    coordinates: { lat: -17.9344, lng: 145.9189 }
  },
  {
    id: 'costa-citrus-emerald',
    name: 'Emerald Citrus Operations',
    address: '1450 Capricorn Highway, Emerald, QLD 4720',
    state: 'QLD',
    propertyType: 'citrus',
    landArea: 680.4,
    operationalStatus: 'owned',
    annualProduction: '18,200 tonnes citrus',
    coordinates: { lat: -23.5253, lng: 148.1544 }
  },

  // New South Wales Properties
  {
    id: 'costa-tomato-guyra',
    name: 'Guyra Tomato Exchange',
    address: '1650 New England Highway, Guyra, NSW 2365',
    state: 'NSW',
    propertyType: 'tomato',
    landArea: 32.5,
    operationalStatus: 'owned',
    annualProduction: '14,500 tonnes tomatoes',
    coordinates: { lat: -30.2167, lng: 151.6667 }
  },
  {
    id: 'costa-berry-tumut',
    name: 'Tumut Berry Operations',
    address: '2850 Snowy Mountains Highway, Tumut, NSW 2720',
    state: 'NSW',
    propertyType: 'berry',
    landArea: 156.3,
    operationalStatus: 'joint-venture',
    annualProduction: '3,800 tonnes berries',
    coordinates: { lat: -35.3081, lng: 148.2167 }
  },
  {
    id: 'costa-avocado-atherton',
    name: 'Atherton Tablelands Avocado Farm',
    address: '3450 Kennedy Highway, Atherton, QLD 4883',
    state: 'QLD',
    propertyType: 'avocado',
    landArea: 128.9,
    operationalStatus: 'owned',
    annualProduction: '2,200 tonnes avocados',
    coordinates: { lat: -17.2667, lng: 145.4833 }
  }
];

// Enhanced valuation calculations including water rights
const calculatePropertyValuation = (property: CostaProperty) => {
  const baseRates = {
    mushroom: { landRate: 180000, buildingRate: 3200, rentYield: 6.5 },
    berry: { landRate: 42000, buildingRate: 1800, rentYield: 7.2 },
    citrus: { landRate: 28000, buildingRate: 1200, rentYield: 5.8 },
    avocado: { landRate: 35000, buildingRate: 1500, rentYield: 6.8 },
    tomato: { landRate: 95000, buildingRate: 4500, rentYield: 7.5 },
    grape: { landRate: 38000, buildingRate: 1600, rentYield: 6.2 },
    banana: { landRate: 25000, buildingRate: 1100, rentYield: 5.5 }
  };

  const rates = baseRates[property.propertyType];
  const marketValue = (property.landArea * rates.landRate) + (property.landArea * rates.buildingRate);
  const rentalValue = marketValue * (rates.rentYield / 100);
  
  // Water rights valuation
  const waterValue = property.waterRights ? 
    property.waterRights.allocation * property.waterRights.tradableValue : 0;
  
  // Leasehold value calculation (60-75% of freehold depending on lease terms)
  const leaseholdValue = property.operationalStatus === 'leased' ? marketValue * 0.68 : 0;

  return { marketValue, rentalValue, leaseholdValue, waterValue };
};

export default function CostaGroupValuations() {
  const [selectedProperty, setSelectedProperty] = useState<CostaProperty | null>(null);
  const [valuationsData, setValuationsData] = useState<Record<string, any>>({});
  const { toast } = useToast();

  useEffect(() => {
    const valuations: Record<string, any> = {};
    costaProperties.forEach(property => {
      valuations[property.id] = calculatePropertyValuation(property);
    });
    setValuationsData(valuations);
  }, []);

  const saveValuationToDatabase = async (property: CostaProperty) => {
    try {
      const valuation = valuationsData[property.id];
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to save valuations",
          variant: "destructive",
        });
        return;
      }
      
      // Create property record
      const { data: propertyData, error: propertyError } = await supabase
        .from('properties')
        .insert({
          user_id: user.id,
          address_line_1: property.address,
          suburb: property.address.split(',')[1]?.trim() || '',
          state: property.state,
          postcode: property.address.match(/\d{4}/)?.[0] || '0000',
          property_type: 'agricultural',
          land_area: property.landArea,
          latitude: property.coordinates?.lat,
          longitude: property.coordinates?.lng
        })
        .select()
        .single();

      if (propertyError) throw propertyError;

      // Create valuation record
      const { error: valuationError } = await supabase
        .from('valuations')
        .insert({
          user_id: user.id,
          property_id: propertyData.id,
          valuation_type: 'agricultural',
          valuation_purpose: 'market_assessment',
          market_value: valuation.marketValue,
          rental_value: valuation.rentalValue,
          methodology: 'productive_capacity_income_capitalisation',
          status: 'completed'
        });

      if (valuationError) throw valuationError;

      toast({
        title: "Valuation Saved",
        description: `${property.name} valuation saved successfully`,
      });

    } catch (error) {
      console.error('Error saving valuation:', error);
      toast({
        title: "Error",
        description: "Failed to save valuation to database",
        variant: "destructive",
      });
    }
  };

  const totalPortfolioValue = Object.values(valuationsData).reduce((sum, val) => sum + val.marketValue, 0);
  const totalRentalValue = Object.values(valuationsData).reduce((sum, val) => sum + val.rentalValue, 0);
  const totalLeaseholdValue = Object.values(valuationsData).reduce((sum, val) => sum + val.leaseholdValue, 0);
  const totalWaterValue = Object.values(valuationsData).reduce((sum, val) => sum + val.waterValue, 0);

  // Generate forecast data for charts
  const forecastData = [
    { month: 'Jan 2024', production: 95, revenue: 8.2, waterUsage: 85 },
    { month: 'Feb 2024', production: 98, revenue: 8.5, waterUsage: 88 },
    { month: 'Mar 2024', production: 102, revenue: 8.8, waterUsage: 92 },
    { month: 'Apr 2024', production: 105, revenue: 9.1, waterUsage: 95 },
    { month: 'May 2024', production: 108, revenue: 9.4, waterUsage: 98 },
    { month: 'Jun 2024', production: 112, revenue: 9.8, waterUsage: 102 }
  ];

  const cropYieldData = [
    { crop: 'Citrus', current: 12500, forecast: 13200, variance: 5.6 },
    { crop: 'Berries', current: 8150, forecast: 8650, variance: 6.1 },
    { crop: 'Mushrooms', current: 7200, forecast: 7450, variance: 3.5 },
    { crop: 'Avocados', current: 4730, forecast: 4950, variance: 4.6 },
    { crop: 'Grapes', current: 3200, forecast: 3450, variance: 7.8 }
  ];

  const propertyTypeColors = {
    mushroom: 'bg-amber-100 text-amber-800',
    berry: 'bg-purple-100 text-purple-800',
    citrus: 'bg-orange-100 text-orange-800',
    avocado: 'bg-green-100 text-green-800',
    tomato: 'bg-red-100 text-red-800',
    grape: 'bg-violet-100 text-violet-800',
    banana: 'bg-yellow-100 text-yellow-800'
  };

  const groupedProperties = costaProperties.reduce((acc, property) => {
    if (!acc[property.state]) acc[property.state] = [];
    acc[property.state].push(property);
    return acc;
  }, {} as Record<string, CostaProperty[]>);

  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Costa Group Holdings Limited</h1>
        <p className="text-xl text-muted-foreground">Comprehensive Property Portfolio Valuation Analysis</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">
                ${(totalPortfolioValue / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calculator className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">
                ${(totalRentalValue / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-muted-foreground">Annual Rental Value</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">
                ${(totalWaterValue / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-muted-foreground">Water Rights Value</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Leaf className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-orange-600">
                ${(totalLeaseholdValue / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-muted-foreground">Leasehold Value</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="forecasting">Crop Forecasting</TabsTrigger>
          <TabsTrigger value="water">Water Analysis</TabsTrigger>
          <TabsTrigger value="VIC">Victoria</TabsTrigger>
          <TabsTrigger value="SA">South Australia</TabsTrigger>
          <TabsTrigger value="WA">Western Australia</TabsTrigger>
          <TabsTrigger value="QLD">Queensland</TabsTrigger>
          <TabsTrigger value="NSW">New South Wales</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {costaProperties.map((property) => {
              const valuation = valuationsData[property.id];
              return (
                <Card key={property.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{property.name}</CardTitle>
                      <Badge className={propertyTypeColors[property.propertyType]}>
                        {property.propertyType}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.address}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-semibold">Land Area:</span> {property.landArea} ha
                      </div>
                      <div>
                        <span className="font-semibold">Status:</span> {property.operationalStatus}
                      </div>
                      <div className="col-span-2">
                        <span className="font-semibold">Production:</span> {property.annualProduction}
                      </div>
                      {property.waterRights && (
                        <div className="col-span-2">
                          <span className="font-semibold">Water Allocation:</span> {property.waterRights.allocation} ML
                        </div>
                      )}
                    </div>
                    
                    {valuation && (
                      <div className="border-t pt-3 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Market Value:</span>
                          <span className="text-sm font-bold text-primary">
                            ${(valuation.marketValue / 1000000).toFixed(2)}M
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Annual Rental:</span>
                          <span className="text-sm font-bold text-green-600">
                            ${(valuation.rentalValue / 1000).toFixed(0)}K
                          </span>
                        </div>
                        {valuation.waterValue > 0 && (
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Water Rights:</span>
                            <span className="text-sm font-bold text-blue-600">
                              ${(valuation.waterValue / 1000000).toFixed(2)}M
                            </span>
                          </div>
                        )}
                        {valuation.leaseholdValue > 0 && (
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Leasehold Value:</span>
                            <span className="text-sm font-bold text-orange-600">
                              ${(valuation.leaseholdValue / 1000000).toFixed(2)}M
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => saveValuationToDatabase(property)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Save to Database
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Crop Yield Forecasting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cropYieldData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="crop" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="current" fill="#8884d8" name="Current (tonnes)" />
                    <Bar dataKey="forecast" fill="#82ca9d" name="Forecast (tonnes)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Production & Revenue Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="production" stroke="#8884d8" name="Production %" />
                    <Line type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue ($M)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {costaProperties.filter(p => p.cropForecast).slice(0, 3).map((property) => (
              <Card key={property.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{property.name}</CardTitle>
                  <Badge className={propertyTypeColors[property.propertyType]}>
                    {property.propertyType}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  {property.cropForecast && (
                    <>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Current Season</h4>
                        <div className="text-xs space-y-1">
                          <div className="flex justify-between">
                            <span>Expected Yield:</span>
                            <span>{(property.cropForecast.currentSeason.expectedYield / 1000).toFixed(0)}K units</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Quality Grade:</span>
                            <Badge variant="secondary">{property.cropForecast.currentSeason.qualityGrade}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Market Price:</span>
                            <span>${property.cropForecast.currentSeason.marketPrice}/tonne</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Next Season Forecast</h4>
                        <div className="text-xs space-y-1">
                          <div className="flex justify-between">
                            <span>Projected Revenue:</span>
                            <span className="font-bold text-green-600">
                              ${(property.cropForecast.nextSeason.projectedRevenue / 1000000).toFixed(1)}M
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Yield Growth:</span>
                            <span className="text-blue-600">
                              +{(((property.cropForecast.nextSeason.expectedYield - property.cropForecast.currentSeason.expectedYield) / property.cropForecast.currentSeason.expectedYield) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <h5 className="font-semibold text-xs mb-2">Key Risks:</h5>
                        <div className="space-y-1">
                          {property.cropForecast.risks.map((risk, idx) => (
                            <Badge key={idx} variant="destructive" className="text-xs mr-1 mb-1">
                              {risk}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <h5 className="font-semibold text-xs mb-2">Opportunities:</h5>
                        <div className="space-y-1">
                          {property.cropForecast.opportunities.map((opp, idx) => (
                            <Badge key={idx} className="bg-green-100 text-green-800 text-xs mr-1 mb-1">
                              {opp}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="water" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  Water Usage vs Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="waterUsage" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.6} name="Water Usage %" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Water Rights Portfolio Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      ${(totalWaterValue / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-muted-foreground">Total Water Rights Value</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span>High Security Water</span>
                      <Badge className="bg-blue-600 text-white">
                        {costaProperties.filter(p => p.waterRights?.securityLevel === 'high').reduce((sum, p) => sum + (p.waterRights?.allocation || 0), 0)} ML
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span>Medium Security Water</span>
                      <Badge className="bg-orange-600 text-white">
                        {costaProperties.filter(p => p.waterRights?.securityLevel === 'medium').reduce((sum, p) => sum + (p.waterRights?.allocation || 0), 0)} ML
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span>Average Trading Price</span>
                      <Badge variant="secondary">
                        ${Math.round(costaProperties.filter(p => p.waterRights).reduce((sum, p, _, arr) => sum + (p.waterRights?.tradableValue || 0), 0) / costaProperties.filter(p => p.waterRights).length)}/ML
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {costaProperties.filter(p => p.waterRights).map((property) => (
              <Card key={property.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {property.name}
                    <Badge 
                      className={
                        property.waterRights?.securityLevel === 'high' ? 'bg-blue-100 text-blue-800' :
                        property.waterRights?.securityLevel === 'medium' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }
                    >
                      {property.waterRights?.securityLevel} security
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-semibold">Allocation:</span><br />
                      {property.waterRights?.allocation} ML/year
                    </div>
                    <div>
                      <span className="font-semibold">Usage:</span><br />
                      {property.waterRights?.annualUsage} ML/year
                    </div>
                    <div>
                      <span className="font-semibold">Trading Value:</span><br />
                      ${property.waterRights?.tradableValue}/ML
                    </div>
                    <div>
                      <span className="font-semibold">Carryover:</span><br />
                      {property.waterRights?.carryoverCapacity} ML
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Utilization Rate</span>
                      <span className="text-sm">
                        {property.waterRights ? Math.round((property.waterRights.annualUsage / property.waterRights.allocation) * 100) : 0}%
                      </span>
                    </div>
                    <Progress 
                      value={property.waterRights ? (property.waterRights.annualUsage / property.waterRights.allocation) * 100 : 0}
                      className="h-2"
                    />
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Water Rights Value:</span>
                      <span className="font-bold text-blue-600">
                        ${property.waterRights ? ((property.waterRights.allocation * property.waterRights.tradableValue) / 1000000).toFixed(2) : 0}M
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {Object.entries(groupedProperties).map(([state, properties]) => (
          <TabsContent key={state} value={state} className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">{state} Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {properties.map((property) => {
                const valuation = valuationsData[property.id];
                return (
                  <Card key={property.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{property.name}</CardTitle>
                        <Badge className={propertyTypeColors[property.propertyType]}>
                          {property.propertyType}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.address}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold">Land Area:</span><br />
                          {property.landArea} hectares
                        </div>
                        <div>
                          <span className="font-semibold">Status:</span><br />
                          {property.operationalStatus}
                        </div>
                        <div className="col-span-2">
                          <span className="font-semibold">Annual Production:</span><br />
                          {property.annualProduction}
                        </div>
                      </div>
                      
                      {valuation && (
                        <div className="border-t pt-4 space-y-3">
                          <h4 className="font-semibold text-primary">Valuation Summary</h4>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="flex justify-between p-2 bg-primary/5 rounded">
                              <span className="font-medium">Market Value:</span>
                              <span className="font-bold text-primary">
                                ${(valuation.marketValue / 1000000).toFixed(2)}M
                              </span>
                            </div>
                            <div className="flex justify-between p-2 bg-green-50 rounded">
                              <span className="font-medium">Annual Rental Value:</span>
                              <span className="font-bold text-green-600">
                                ${(valuation.rentalValue / 1000).toFixed(0)}K
                              </span>
                            </div>
                            {valuation.leaseholdValue > 0 && (
                              <div className="flex justify-between p-2 bg-orange-50 rounded">
                                <span className="font-medium">Leasehold Value:</span>
                                <span className="font-bold text-orange-600">
                                  ${(valuation.leaseholdValue / 1000000).toFixed(2)}M
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        className="w-full"
                        onClick={() => saveValuationToDatabase(property)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Save Valuation Report
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}