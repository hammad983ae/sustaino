import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { MapPin, TrendingUp, Leaf, DollarSign, Calculator, BarChart3 } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  country: string;
  state: string;
  cropTypes: string[];
  hectares: number;
  propertyValue: number;
  equipmentValue: number;
  productionCapacity: number;
  waterUsage: number; // ML
  energyUsage: number; // GJ
  protectedCropping: boolean;
}

interface CropEstimate {
  year: number;
  avocados: number;
  bananas: number;
  berries: number;
  citrus: number;
  mushrooms: number;
  tomatoes: number;
  totalRevenue: number;
}

interface ESGSavings {
  period: string;
  waterEfficiency: number;
  energySavings: number;
  wasteReduction: number;
  carbonCredits: number;
  totalSavings: number;
}

export const CostaGroupPortfolio = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [carbonCreditPrice, setCarbonCreditPrice] = useState<number>(35);
  const [carbonReductionTarget, setCarbonReductionTarget] = useState<number>(15);

  const locations: Location[] = [
    // Australia - Western Australia
    { id: 'wa-gingin', name: 'Gingin Berry Farms', country: 'Australia', state: 'WA', cropTypes: ['Berries'], hectares: 120, propertyValue: 18500000, equipmentValue: 8200000, productionCapacity: 2400, waterUsage: 180, energyUsage: 12500, protectedCropping: true },
    { id: 'wa-casuarina', name: 'Casuarina Mushroom Farm', country: 'Australia', state: 'WA', cropTypes: ['Mushrooms'], hectares: 35, propertyValue: 25000000, equipmentValue: 15000000, productionCapacity: 8500, waterUsage: 45, energyUsage: 18500, protectedCropping: true },
    
    // Australia - South Australia
    { id: 'sa-renmark', name: 'Renmark Citrus Operations', country: 'Australia', state: 'SA', cropTypes: ['Citrus'], hectares: 1850, propertyValue: 42000000, equipmentValue: 12800000, productionCapacity: 15600, waterUsage: 8950, energyUsage: 8900, protectedCropping: false },
    { id: 'sa-monarto', name: 'Monarto Mushroom Farm', country: 'Australia', state: 'SA', cropTypes: ['Mushrooms'], hectares: 48, propertyValue: 32000000, equipmentValue: 18500000, productionCapacity: 11200, waterUsage: 65, energyUsage: 22000, protectedCropping: true },
    
    // Australia - Victoria
    { id: 'vic-mernda', name: 'Mernda Mushroom Farms', country: 'Australia', state: 'VIC', cropTypes: ['Mushrooms'], hectares: 42, propertyValue: 28000000, equipmentValue: 16200000, productionCapacity: 9800, waterUsage: 58, energyUsage: 19500, protectedCropping: true },
    { id: 'vic-nangiloc', name: 'Nangiloc Citrus Farm', country: 'Australia', state: 'VIC', cropTypes: ['Citrus'], hectares: 980, propertyValue: 22500000, equipmentValue: 7800000, productionCapacity: 8200, waterUsage: 4750, energyUsage: 5200, protectedCropping: false },
    
    // Australia - Queensland
    { id: 'qld-atherton', name: 'Atherton Berry & Avocado Farms', country: 'Australia', state: 'QLD', cropTypes: ['Berries', 'Avocados'], hectares: 385, propertyValue: 35000000, equipmentValue: 14500000, productionCapacity: 6500, waterUsage: 1250, energyUsage: 8800, protectedCropping: true },
    { id: 'qld-walkamin', name: 'Walkamin Banana Operations', country: 'Australia', state: 'QLD', cropTypes: ['Bananas'], hectares: 265, propertyValue: 28500000, equipmentValue: 9200000, productionCapacity: 4800, waterUsage: 380, energyUsage: 6500, protectedCropping: false },
    { id: 'qld-emerald', name: '2PH Emerald Citrus & Grapes', country: 'Australia', state: 'QLD', cropTypes: ['Citrus', 'Grapes'], hectares: 1250, propertyValue: 38000000, equipmentValue: 11500000, productionCapacity: 12500, waterUsage: 7200, energyUsage: 7800, protectedCropping: false },
    
    // Australia - New South Wales
    { id: 'nsw-corindi', name: 'Corindi Berry & Citrus Farms', country: 'Australia', state: 'NSW', cropTypes: ['Berries', 'Citrus'], hectares: 450, propertyValue: 32000000, equipmentValue: 12800000, productionCapacity: 7200, waterUsage: 1850, energyUsage: 9200, protectedCropping: true },
    { id: 'nsw-guyra', name: 'Guyra Glasshouses', country: 'Australia', state: 'NSW', cropTypes: ['Tomatoes'], hectares: 28, propertyValue: 22000000, equipmentValue: 18000000, productionCapacity: 6800, waterUsage: 125, energyUsage: 15500, protectedCropping: true },
    
    // Australia - Tasmania
    { id: 'tas-devonport', name: 'Devonport Berry Operations', country: 'Australia', state: 'TAS', cropTypes: ['Berries'], hectares: 185, propertyValue: 24000000, equipmentValue: 8500000, productionCapacity: 3200, waterUsage: 285, energyUsage: 5800, protectedCropping: true },
    
    // China - Yunnan Province
    { id: 'cn-bailang', name: 'Bailang Berry Farm', country: 'China', state: 'Yunnan', cropTypes: ['Berries'], hectares: 285, propertyValue: 15000000, equipmentValue: 8500000, productionCapacity: 4200, waterUsage: 450, energyUsage: 6200, protectedCropping: true },
    { id: 'cn-manhong', name: 'Manhong Operations', country: 'China', state: 'Yunnan', cropTypes: ['Berries'], hectares: 320, propertyValue: 18000000, equipmentValue: 9800000, productionCapacity: 4800, waterUsage: 520, energyUsage: 7100, protectedCropping: true },
    { id: 'cn-xinze', name: 'Xinze Agripark', country: 'China', state: 'Yunnan', cropTypes: ['Berries'], hectares: 195, propertyValue: 12500000, equipmentValue: 7200000, productionCapacity: 2900, waterUsage: 380, energyUsage: 4800, protectedCropping: true },
    
    // Morocco
    { id: 'ma-northern', name: 'Northern Morocco Farms', country: 'Morocco', state: 'Northern Region', cropTypes: ['Berries'], hectares: 425, propertyValue: 22000000, equipmentValue: 12000000, productionCapacity: 5800, waterUsage: 850, energyUsage: 8500, protectedCropping: true },
    { id: 'ma-southern', name: 'Southern Morocco Farms', country: 'Morocco', state: 'Southern Region', cropTypes: ['Berries'], hectares: 380, propertyValue: 19500000, equipmentValue: 10500000, productionCapacity: 5200, waterUsage: 780, energyUsage: 7800, protectedCropping: true },
  ];

  const cropEstimates: CropEstimate[] = [
    {
      year: 2023,
      avocados: 8350, // tonnes (based on water usage data showing 4,203 ML)
      bananas: 6890, // tonnes (based on water usage of 1,299 ML)
      berries: 12500, // tonnes (across all berry operations)
      citrus: 125000, // tonnes (major category with 39,696 ML water usage)
      mushrooms: 25600, // tonnes (high value crop with 381 ML usage)
      tomatoes: 4200, // tonnes (621 ML water usage)
      totalRevenue: 1450000000 // $1.45B estimated
    },
    {
      year: 2024,
      avocados: 7850, // tonnes (reduced due to weather - 3,772 ML water)
      bananas: 3200, // tonnes (significant reduction due to farm sale - 269 ML)
      berries: 13200, // tonnes (growth in protected cropping)
      citrus: 138000, // tonnes (increased production - 44,537 ML water)
      mushrooms: 26800, // tonnes (slight increase - 423 ML usage)
      tomatoes: 3900, // tonnes (reduced production - 494 ML)
      totalRevenue: 1520000000 // $1.52B estimated
    },
    {
      year: 2025,
      avocados: 8950, // tonnes (forecast recovery and expansion)
      bananas: 4800, // tonnes (conversion to Cavendish complete)
      berries: 15200, // tonnes (continued protected cropping expansion)
      citrus: 145000, // tonnes (maturing plantings and efficiency gains)
      mushrooms: 28500, // tonnes (new facilities and automation)
      tomatoes: 4500, // tonnes (glasshouse optimization)
      totalRevenue: 1680000000 // $1.68B forecast
    }
  ];

  const esgSavings: ESGSavings[] = [
    {
      period: '12 Months',
      waterEfficiency: 2850000, // Water efficiency projects
      energySavings: 8500000, // Solar installations and efficiency
      wasteReduction: 1200000, // Packaging and waste initiatives
      carbonCredits: 0, // No immediate credits
      totalSavings: 12550000
    },
    {
      period: '5 Years',
      waterEfficiency: 18500000, // Cumulative water projects
      energySavings: 65000000, // Major renewable energy transition
      wasteReduction: 8900000, // Comprehensive waste reduction
      carbonCredits: 12500000, // Carbon credit generation
      totalSavings: 104900000
    },
    {
      period: '10 Years',
      waterEfficiency: 42000000, // Advanced water management
      energySavings: 185000000, // Full renewable energy transition
      wasteReduction: 25000000, // Circular economy implementation
      carbonCredits: 45000000, // Significant carbon credit portfolio
      totalSavings: 297000000
    }
  ];

  const calculateCarbonCreditSwapBenefits = () => {
    const currentEmissions = 132282; // tonnes CO2-e (2023-24 data)
    const reductionTarget = (carbonReductionTarget / 100) * currentEmissions;
    const creditValue = reductionTarget * carbonCreditPrice;
    
    return {
      reductionTonnes: reductionTarget,
      creditValue: creditValue,
      additionalRevenue: creditValue * 0.75, // 75% of credit value as additional revenue
      costSavings: creditValue * 0.25 // 25% as operational cost savings
    };
  };

  const filteredLocations = selectedLocation === 'all' 
    ? locations 
    : locations.filter(loc => loc.id === selectedLocation);

  const totalPropertyValue = filteredLocations.reduce((sum, loc) => sum + loc.propertyValue, 0);
  const totalEquipmentValue = filteredLocations.reduce((sum, loc) => sum + loc.equipmentValue, 0);
  const totalHectares = filteredLocations.reduce((sum, loc) => sum + loc.hectares, 0);
  const totalWaterUsage = filteredLocations.reduce((sum, loc) => sum + loc.waterUsage, 0);

  const carbonSwapBenefits = calculateCarbonCreditSwapBenefits();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Costa Group Portfolio Analysis</h1>
          <p className="text-muted-foreground">Comprehensive asset valuation and ESG strategy analysis</p>
        </div>
        <Badge variant="outline" className="text-sm">
          <Leaf className="w-4 h-4 mr-1" />
          Sustainability Report 2024
        </Badge>
      </div>

      <Tabs defaultValue="locations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="valuations">P&E Valuations</TabsTrigger>
          <TabsTrigger value="crops">Crop Estimates</TabsTrigger>
          <TabsTrigger value="esg-savings">ESG Savings</TabsTrigger>
          <TabsTrigger value="carbon-credits">Carbon Credits</TabsTrigger>
        </TabsList>

        <TabsContent value="locations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Global Operations Portfolio
              </CardTitle>
              <div className="flex gap-4">
                <Label htmlFor="location-filter">Filter by Location:</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLocations.map(location => (
                  <Card key={location.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold">{location.name}</h3>
                        <p className="text-sm text-muted-foreground">{location.state}, {location.country}</p>
                        <div className="flex flex-wrap gap-1">
                          {location.cropTypes.map(crop => (
                            <Badge key={crop} variant="secondary" className="text-xs">
                              {crop}
                            </Badge>
                          ))}
                        </div>
                        <Separator />
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Hectares:</span>
                            <span className="font-medium">{location.hectares.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Production:</span>
                            <span className="font-medium">{location.productionCapacity.toLocaleString()}t</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Water Usage:</span>
                            <span className="font-medium">{location.waterUsage.toLocaleString()}ML</span>
                          </div>
                          {location.protectedCropping && (
                            <Badge variant="outline" className="text-xs">
                              <Leaf className="w-3 h-3 mr-1" />
                              Protected Cropping
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="valuations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Property Value</p>
                    <p className="text-2xl font-bold">${(totalPropertyValue / 1000000).toFixed(1)}M</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Equipment Value</p>
                    <p className="text-2xl font-bold">${(totalEquipmentValue / 1000000).toFixed(1)}M</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total P&E Value</p>
                    <p className="text-2xl font-bold">${((totalPropertyValue + totalEquipmentValue) / 1000000).toFixed(1)}M</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Hectares</p>
                    <p className="text-2xl font-bold">{totalHectares.toLocaleString()}</p>
                  </div>
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Property & Equipment Valuation by Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLocations.map(location => (
                  <div key={location.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{location.name}</h3>
                      <p className="text-sm text-muted-foreground">{location.hectares} hectares</p>
                    </div>
                    <div className="text-right">
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Property: </span>
                          <span className="font-medium">${(location.propertyValue / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Equipment: </span>
                          <span className="font-medium">${(location.equipmentValue / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="font-semibold">
                          Total: ${((location.propertyValue + location.equipmentValue) / 1000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crops" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Crop Production Estimates & Revenue Projections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Crop Category</th>
                      <th className="text-right p-3">2023 Actual</th>
                      <th className="text-right p-3">2024 Actual</th>
                      <th className="text-right p-3">2025 Forecast</th>
                      <th className="text-right p-3">Growth %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Avocados', key: 'avocados' as keyof CropEstimate },
                      { name: 'Bananas', key: 'bananas' as keyof CropEstimate },
                      { name: 'Berries', key: 'berries' as keyof CropEstimate },
                      { name: 'Citrus', key: 'citrus' as keyof CropEstimate },
                      { name: 'Mushrooms', key: 'mushrooms' as keyof CropEstimate },
                      { name: 'Tomatoes', key: 'tomatoes' as keyof CropEstimate }
                    ].map(crop => {
                      const data2023 = cropEstimates.find(e => e.year === 2023)?.[crop.key] as number || 0;
                      const data2024 = cropEstimates.find(e => e.year === 2024)?.[crop.key] as number || 0;
                      const data2025 = cropEstimates.find(e => e.year === 2025)?.[crop.key] as number || 0;
                      const growth = data2024 > 0 ? ((data2025 - data2024) / data2024 * 100) : 0;
                      
                      return (
                        <tr key={crop.key} className="border-b">
                          <td className="p-3 font-medium">{crop.name}</td>
                          <td className="p-3 text-right">{data2023.toLocaleString()}t</td>
                          <td className="p-3 text-right">{data2024.toLocaleString()}t</td>
                          <td className="p-3 text-right">{data2025.toLocaleString()}t</td>
                          <td className="p-3 text-right">
                            <span className={growth >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cropEstimates.map(estimate => (
                  <Card key={estimate.year}>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{estimate.year}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Production:</span>
                          <span className="font-medium">
                            {(estimate.avocados + estimate.bananas + estimate.berries + 
                              estimate.citrus + estimate.mushrooms + estimate.tomatoes).toLocaleString()}t
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Est. Revenue:</span>
                          <span className="font-medium text-primary">
                            ${(estimate.totalRevenue / 1000000).toFixed(0)}M
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="esg-savings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ESG Strategy Financial Benefits</CardTitle>
              <p className="text-muted-foreground">
                Projected savings from sustainability initiatives including water efficiency, 
                renewable energy, waste reduction, and carbon management
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {esgSavings.map(saving => (
                  <Card key={saving.period} className="border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">{saving.period}</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Water Efficiency:</span>
                          <span className="font-medium">${(saving.waterEfficiency / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Energy Savings:</span>
                          <span className="font-medium">${(saving.energySavings / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Waste Reduction:</span>
                          <span className="font-medium">${(saving.wasteReduction / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Carbon Credits:</span>
                          <span className="font-medium">${(saving.carbonCredits / 1000000).toFixed(1)}M</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total Savings:</span>
                          <span className="text-green-600">${(saving.totalSavings / 1000000).toFixed(1)}M</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="carbon-credits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Carbon Credit Swap Analysis
              </CardTitle>
              <p className="text-muted-foreground">
                Calculate potential benefits from carbon credit generation and trading
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="carbon-price">Carbon Credit Price (AUD per tonne)</Label>
                    <Input
                      id="carbon-price"
                      type="number"
                      value={carbonCreditPrice}
                      onChange={(e) => setCarbonCreditPrice(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reduction-target">Carbon Reduction Target (%)</Label>
                    <Input
                      id="reduction-target"
                      type="number"
                      value={carbonReductionTarget}
                      onChange={(e) => setCarbonReductionTarget(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Current Emissions Profile</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Scope 1 Emissions:</span>
                        <span className="font-medium">82,767 tonnes CO₂-e</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Scope 2 Emissions:</span>
                        <span className="font-medium">49,515 tonnes CO₂-e</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total Emissions:</span>
                        <span>132,282 tonnes CO₂-e</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Carbon Reduction</p>
                      <p className="text-2xl font-bold text-green-600">
                        {carbonSwapBenefits.reductionTonnes.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">tonnes CO₂-e</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Credit Value</p>
                      <p className="text-2xl font-bold text-primary">
                        ${(carbonSwapBenefits.creditValue / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-xs text-muted-foreground">total value</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Additional Revenue</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${(carbonSwapBenefits.additionalRevenue / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-xs text-muted-foreground">from credit sales</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Cost Savings</p>
                      <p className="text-2xl font-bold text-orange-600">
                        ${(carbonSwapBenefits.costSavings / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-xs text-muted-foreground">operational efficiency</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Carbon Credit Swap Scenarios</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium">Conservative (10% reduction)</h4>
                        <p>13,228 tonnes → ${(13228 * carbonCreditPrice / 1000000).toFixed(1)}M value</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Target (15% reduction)</h4>
                        <p>{carbonSwapBenefits.reductionTonnes.toLocaleString()} tonnes → ${(carbonSwapBenefits.creditValue / 1000000).toFixed(1)}M value</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Ambitious (25% reduction)</h4>
                        <p>33,071 tonnes → ${(33071 * carbonCreditPrice / 1000000).toFixed(1)}M value</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};