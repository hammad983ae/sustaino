import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Calendar, DollarSign, MapPin, Building } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ConstructionCostData {
  id: string;
  month: string;
  year: number;
  asset_class: string;
  region_type: 'metro' | 'regional';
  state: string;
  base_price_per_sqm: number;
  cost_index: number;
  percentage_movement: number;
  created_at: string;
}

interface CPIData {
  id: string;
  month: string;
  year: number;
  cpi_value: number;
  percentage_change: number;
  created_at: string;
}

const ConstructionCostIndex: React.FC = () => {
  const { data: constructionData, isLoading: constructionLoading } = useQuery({
    queryKey: ['construction-cost-index'],
    queryFn: async () => {
      // Comprehensive mock data with state and metro/regional breakdowns
      const mockData: ConstructionCostData[] = [
        // NSW Metro
        { id: '1', month: 'December', year: 2024, asset_class: 'residential', region_type: 'metro', state: 'NSW', base_price_per_sqm: 3250.00, cost_index: 132.5, percentage_movement: 3.8, created_at: new Date().toISOString() },
        { id: '2', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'metro', state: 'NSW', base_price_per_sqm: 4120.00, cost_index: 135.2, percentage_movement: 3.2, created_at: new Date().toISOString() },
        { id: '3', month: 'December', year: 2024, asset_class: 'industrial', region_type: 'metro', state: 'NSW', base_price_per_sqm: 2950.00, cost_index: 128.7, percentage_movement: 4.5, created_at: new Date().toISOString() },
        
        // NSW Regional
        { id: '4', month: 'December', year: 2024, asset_class: 'residential', region_type: 'regional', state: 'NSW', base_price_per_sqm: 2680.00, cost_index: 118.3, percentage_movement: 2.8, created_at: new Date().toISOString() },
        { id: '5', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'regional', state: 'NSW', base_price_per_sqm: 3280.00, cost_index: 121.5, percentage_movement: 2.4, created_at: new Date().toISOString() },
        { id: '6', month: 'December', year: 2024, asset_class: 'agricultural', region_type: 'regional', state: 'NSW', base_price_per_sqm: 1950.00, cost_index: 115.2, percentage_movement: 2.1, created_at: new Date().toISOString() },
        
        // VIC Metro
        { id: '7', month: 'December', year: 2024, asset_class: 'residential', region_type: 'metro', state: 'VIC', base_price_per_sqm: 3180.00, cost_index: 130.8, percentage_movement: 3.5, created_at: new Date().toISOString() },
        { id: '8', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'metro', state: 'VIC', base_price_per_sqm: 3980.00, cost_index: 133.4, percentage_movement: 3.0, created_at: new Date().toISOString() },
        { id: '9', month: 'December', year: 2024, asset_class: 'industrial', region_type: 'metro', state: 'VIC', base_price_per_sqm: 2850.00, cost_index: 126.9, percentage_movement: 4.2, created_at: new Date().toISOString() },
        
        // VIC Regional
        { id: '10', month: 'December', year: 2024, asset_class: 'residential', region_type: 'regional', state: 'VIC', base_price_per_sqm: 2550.00, cost_index: 116.7, percentage_movement: 2.6, created_at: new Date().toISOString() },
        { id: '11', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'regional', state: 'VIC', base_price_per_sqm: 3150.00, cost_index: 119.8, percentage_movement: 2.2, created_at: new Date().toISOString() },
        { id: '12', month: 'December', year: 2024, asset_class: 'agricultural', region_type: 'regional', state: 'VIC', base_price_per_sqm: 1880.00, cost_index: 114.5, percentage_movement: 2.0, created_at: new Date().toISOString() },
        
        // QLD Metro
        { id: '13', month: 'December', year: 2024, asset_class: 'residential', region_type: 'metro', state: 'QLD', base_price_per_sqm: 2950.00, cost_index: 125.2, percentage_movement: 4.1, created_at: new Date().toISOString() },
        { id: '14', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'metro', state: 'QLD', base_price_per_sqm: 3650.00, cost_index: 128.6, percentage_movement: 3.6, created_at: new Date().toISOString() },
        { id: '15', month: 'December', year: 2024, asset_class: 'industrial', region_type: 'metro', state: 'QLD', base_price_per_sqm: 2680.00, cost_index: 123.4, percentage_movement: 4.8, created_at: new Date().toISOString() },
        
        // QLD Regional
        { id: '16', month: 'December', year: 2024, asset_class: 'residential', region_type: 'regional', state: 'QLD', base_price_per_sqm: 2420.00, cost_index: 112.8, percentage_movement: 3.2, created_at: new Date().toISOString() },
        { id: '17', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'regional', state: 'QLD', base_price_per_sqm: 2980.00, cost_index: 115.6, percentage_movement: 2.8, created_at: new Date().toISOString() },
        { id: '18', month: 'December', year: 2024, asset_class: 'agricultural', region_type: 'regional', state: 'QLD', base_price_per_sqm: 1780.00, cost_index: 110.3, percentage_movement: 2.5, created_at: new Date().toISOString() },
        
        // WA Metro
        { id: '19', month: 'December', year: 2024, asset_class: 'residential', region_type: 'metro', state: 'WA', base_price_per_sqm: 2880.00, cost_index: 122.7, percentage_movement: 3.9, created_at: new Date().toISOString() },
        { id: '20', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'metro', state: 'WA', base_price_per_sqm: 3520.00, cost_index: 125.8, percentage_movement: 3.4, created_at: new Date().toISOString() },
        { id: '21', month: 'December', year: 2024, asset_class: 'industrial', region_type: 'metro', state: 'WA', base_price_per_sqm: 2580.00, cost_index: 120.9, percentage_movement: 4.6, created_at: new Date().toISOString() },
        
        // SA Metro
        { id: '22', month: 'December', year: 2024, asset_class: 'residential', region_type: 'metro', state: 'SA', base_price_per_sqm: 2720.00, cost_index: 119.5, percentage_movement: 3.1, created_at: new Date().toISOString() },
        { id: '23', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'metro', state: 'SA', base_price_per_sqm: 3380.00, cost_index: 122.4, percentage_movement: 2.7, created_at: new Date().toISOString() },
        
        // TAS
        { id: '24', month: 'December', year: 2024, asset_class: 'residential', region_type: 'regional', state: 'TAS', base_price_per_sqm: 2450.00, cost_index: 114.2, percentage_movement: 2.9, created_at: new Date().toISOString() },
        { id: '25', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'regional', state: 'TAS', base_price_per_sqm: 3080.00, cost_index: 117.3, percentage_movement: 2.3, created_at: new Date().toISOString() },
        
        // ACT
        { id: '26', month: 'December', year: 2024, asset_class: 'residential', region_type: 'metro', state: 'ACT', base_price_per_sqm: 3420.00, cost_index: 135.8, percentage_movement: 3.7, created_at: new Date().toISOString() },
        { id: '27', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'metro', state: 'ACT', base_price_per_sqm: 4280.00, cost_index: 138.9, percentage_movement: 3.3, created_at: new Date().toISOString() },
        
        // NT
        { id: '28', month: 'December', year: 2024, asset_class: 'residential', region_type: 'regional', state: 'NT', base_price_per_sqm: 3180.00, cost_index: 128.6, percentage_movement: 4.2, created_at: new Date().toISOString() },
        { id: '29', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'regional', state: 'NT', base_price_per_sqm: 3850.00, cost_index: 131.7, percentage_movement: 3.8, created_at: new Date().toISOString() }
      ];
      return mockData;
    }
  });

  const { data: cpiData, isLoading: cpiLoading } = useQuery({
    queryKey: ['cpi-index'],
    queryFn: async () => {
      const mockData: CPIData[] = [
        { id: '1', month: 'December', year: 2024, cpi_value: 136.8, percentage_change: 3.4, created_at: new Date().toISOString() },
        { id: '2', month: 'November', year: 2024, cpi_value: 135.2, percentage_change: 3.1, created_at: new Date().toISOString() },
        { id: '3', month: 'October', year: 2024, cpi_value: 134.5, percentage_change: 2.8, created_at: new Date().toISOString() },
        { id: '4', month: 'September', year: 2024, cpi_value: 133.1, percentage_change: 2.7, created_at: new Date().toISOString() },
        { id: '5', month: 'August', year: 2024, cpi_value: 131.9, percentage_change: 3.5, created_at: new Date().toISOString() },
        { id: '6', month: 'July', year: 2024, cpi_value: 130.2, percentage_change: 3.8, created_at: new Date().toISOString() }
      ];
      return mockData;
    }
  });

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(value);

  const formatPercentage = (value: number) => 
    `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;

  const getTrendIcon = (movement: number) => 
    movement > 0 ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />;

  const getDataByState = (state: string) => 
    constructionData?.filter(item => item.state === state) || [];

  const getDataByRegionType = (regionType: 'metro' | 'regional') => 
    constructionData?.filter(item => item.region_type === regionType) || [];

  const states = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];

  if (constructionLoading || cpiLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Construction Cost Index & CPI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Loading cost index data...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderCostCard = (item: ConstructionCostData) => (
    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex-1">
        <h4 className="font-semibold capitalize">{item.asset_class}</h4>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="capitalize">{item.region_type}</span>
          <span>•</span>
          <span>{item.state}</span>
          <span>•</span>
          <span>{item.month} {item.year}</span>
        </div>
      </div>
      <div className="text-right space-y-1">
        <p className="font-medium">{formatCurrency(item.base_price_per_sqm)}/m²</p>
        <div className="flex items-center gap-2">
          <Badge variant={item.percentage_movement > 0 ? "default" : "destructive"}>
            {getTrendIcon(item.percentage_movement)}
            {formatPercentage(item.percentage_movement)}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Index: {item.cost_index.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Construction Cost Index - Australia
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Current construction costs per square meter by location, asset class, and region type
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="metro-regional" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="metro-regional" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Metro vs Regional
              </TabsTrigger>
              <TabsTrigger value="by-state" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                By State
              </TabsTrigger>
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Overview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="metro-regional" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Metropolitan Areas</CardTitle>
                    <p className="text-sm text-muted-foreground">Major cities and urban centers</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {getDataByRegionType('metro').map(renderCostCard)}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Regional Areas</CardTitle>
                    <p className="text-sm text-muted-foreground">Rural and regional locations</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {getDataByRegionType('regional').map(renderCostCard)}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="by-state" className="space-y-4">
              {states.map(state => {
                const stateData = getDataByState(state);
                if (stateData.length === 0) return null;
                
                return (
                  <Card key={state}>
                    <CardHeader>
                      <CardTitle className="text-lg">{state}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {stateData.length} asset class{stateData.length !== 1 ? 'es' : ''} tracked
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {stateData.map(renderCostCard)}
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Building className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">Metro vs Regional Cost Differential</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Metropolitan areas typically show 15-25% higher construction costs compared to regional areas, 
                          driven by higher land costs, labor rates, and regulatory complexity.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-900">State Variations</h4>
                        <p className="text-sm text-green-700 mt-1">
                          NSW and ACT show the highest construction costs, followed by VIC and WA. 
                          QLD, SA, and TAS demonstrate more moderate pricing, while NT reflects higher costs due to logistics.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-900">Market Trends</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          Industrial construction shows the strongest growth (4.0-4.8% increase), 
                          while agricultural and commercial sectors demonstrate more moderate increases (2.0-3.6%).
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Consumer Price Index (CPI)
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            12-month CPI movement and inflation indicators
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {cpiData?.slice(0, 6).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{item.month} {item.year}</h4>
                </div>
                <div className="text-right">
                  <p className="font-medium">CPI: {item.cpi_value.toFixed(1)}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.percentage_change > 0 ? "default" : "destructive"}>
                      {getTrendIcon(item.percentage_change)}
                      {formatPercentage(item.percentage_change)}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-2">
            <Calendar className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-orange-900">Monthly Update Schedule</h4>
              <p className="text-sm text-orange-700 mt-1">
                Construction cost index and CPI data are automatically updated on the 1st of each month. 
                Email notifications are sent to all valuers when new data is available.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConstructionCostIndex;