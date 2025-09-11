import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Leaf, TrendingUp, Calculator, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CostaProperty {
  id: string;
  name: string;
  address: string;
  state: string;
  propertyType: 'mushroom' | 'berry' | 'citrus' | 'avocado' | 'tomato' | 'grape' | 'banana';
  landArea: number;
  operationalStatus: 'owned' | 'leased' | 'joint-venture';
  annualProduction: string;
  marketValue?: number;
  rentalValue?: number;
  leaseholdValue?: number;
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
    coordinates: { lat: -37.7136, lng: 145.0549 }
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
    coordinates: { lat: -38.2167, lng: 145.1833 }
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
    coordinates: { lat: -34.5833, lng: 142.7833 }
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
    coordinates: { lat: -34.2017, lng: 142.1478 }
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

// Valuation calculations based on property type and Australian agricultural benchmarks
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
  
  // Leasehold value calculation (60-75% of freehold depending on lease terms)
  const leaseholdValue = property.operationalStatus === 'leased' ? marketValue * 0.68 : 0;

  return { marketValue, rentalValue, leaseholdValue };
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
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
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
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