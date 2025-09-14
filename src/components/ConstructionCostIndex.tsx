import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Calendar, DollarSign, MapPin, Building, Leaf, Zap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ConstructionCostData {
  id: string;
  month: string;
  year: number;
  asset_class: string;
  region_type: 'metro' | 'regional';
  state: string;
  construction_type: 'traditional' | 'esd_esg';
  base_price_per_sqm: number;
  cost_index: number;
  percentage_movement: number;
  esg_premium_percentage?: number;
  sustainability_features?: string[];
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
      // Comprehensive mock data with traditional vs ESD/ESG breakdown
      const mockData: ConstructionCostData[] = [
        // NSW Metro - Traditional
        { id: '1', month: 'December', year: 2024, asset_class: 'residential', region_type: 'metro', state: 'NSW', construction_type: 'traditional', base_price_per_sqm: 3250.00, cost_index: 132.5, percentage_movement: 3.8, created_at: new Date().toISOString() },
        { id: '2', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'metro', state: 'NSW', construction_type: 'traditional', base_price_per_sqm: 4120.00, cost_index: 135.2, percentage_movement: 3.2, created_at: new Date().toISOString() },
        { id: '3', month: 'December', year: 2024, asset_class: 'industrial', region_type: 'metro', state: 'NSW', construction_type: 'traditional', base_price_per_sqm: 2950.00, cost_index: 128.7, percentage_movement: 4.5, created_at: new Date().toISOString() },
        
        // NSW Metro - ESD/ESG
        { id: '4', month: 'December', year: 2024, asset_class: 'residential', region_type: 'metro', state: 'NSW', construction_type: 'esd_esg', base_price_per_sqm: 3900.00, cost_index: 158.7, percentage_movement: 4.2, esg_premium_percentage: 20.0, sustainability_features: ['Solar panels', '7-star energy rating', 'Rainwater harvesting', 'Smart home technology'], created_at: new Date().toISOString() },
        { id: '5', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'metro', state: 'NSW', construction_type: 'esd_esg', base_price_per_sqm: 5146.00, cost_index: 167.9, percentage_movement: 3.8, esg_premium_percentage: 24.9, sustainability_features: ['Green roof systems', 'NABERS 5-star rating', 'LED lighting', 'Advanced HVAC'], created_at: new Date().toISOString() },
        { id: '6', month: 'December', year: 2024, asset_class: 'industrial', region_type: 'metro', state: 'NSW', construction_type: 'esd_esg', base_price_per_sqm: 3540.00, cost_index: 154.4, percentage_movement: 5.1, esg_premium_percentage: 20.0, sustainability_features: ['Solar energy systems', 'Sustainable materials', 'Water recycling'], created_at: new Date().toISOString() },
        
        // NSW Regional - Traditional
        { id: '7', month: 'December', year: 2024, asset_class: 'residential', region_type: 'regional', state: 'NSW', construction_type: 'traditional', base_price_per_sqm: 2680.00, cost_index: 118.3, percentage_movement: 2.8, created_at: new Date().toISOString() },
        { id: '8', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'regional', state: 'NSW', construction_type: 'traditional', base_price_per_sqm: 3280.00, cost_index: 121.5, percentage_movement: 2.4, created_at: new Date().toISOString() },
        { id: '9', month: 'December', year: 2024, asset_class: 'agricultural', region_type: 'regional', state: 'NSW', construction_type: 'traditional', base_price_per_sqm: 1950.00, cost_index: 115.2, percentage_movement: 2.1, created_at: new Date().toISOString() },
        
        // NSW Regional - ESD/ESG
        { id: '10', month: 'December', year: 2024, asset_class: 'residential', region_type: 'regional', state: 'NSW', construction_type: 'esd_esg', base_price_per_sqm: 3216.00, cost_index: 141.9, percentage_movement: 3.2, esg_premium_percentage: 20.0, sustainability_features: ['Solar panels', '6-star energy rating', 'Sustainable materials'], created_at: new Date().toISOString() },
        { id: '11', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'regional', state: 'NSW', construction_type: 'esd_esg', base_price_per_sqm: 3936.00, cost_index: 145.8, percentage_movement: 2.8, esg_premium_percentage: 20.0, sustainability_features: ['Energy efficient systems', 'Green building materials'], created_at: new Date().toISOString() },
        { id: '12', month: 'December', year: 2024, asset_class: 'agricultural', region_type: 'regional', state: 'NSW', construction_type: 'esd_esg', base_price_per_sqm: 2340.00, cost_index: 138.2, percentage_movement: 2.5, esg_premium_percentage: 20.0, sustainability_features: ['Renewable energy', 'Water conservation'], created_at: new Date().toISOString() },
        
        // VIC Metro - Traditional
        { id: '13', month: 'December', year: 2024, asset_class: 'residential', region_type: 'metro', state: 'VIC', construction_type: 'traditional', base_price_per_sqm: 3180.00, cost_index: 130.8, percentage_movement: 3.5, created_at: new Date().toISOString() },
        { id: '14', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'metro', state: 'VIC', construction_type: 'traditional', base_price_per_sqm: 3980.00, cost_index: 133.4, percentage_movement: 3.0, created_at: new Date().toISOString() },
        { id: '15', month: 'December', year: 2024, asset_class: 'industrial', region_type: 'metro', state: 'VIC', construction_type: 'traditional', base_price_per_sqm: 2850.00, cost_index: 126.9, percentage_movement: 4.2, created_at: new Date().toISOString() },
        
        // VIC Metro - ESD/ESG
        { id: '16', month: 'December', year: 2024, asset_class: 'residential', region_type: 'metro', state: 'VIC', construction_type: 'esd_esg', base_price_per_sqm: 3816.00, cost_index: 156.9, percentage_movement: 3.9, esg_premium_percentage: 20.0, sustainability_features: ['7-star energy rating', 'Solar hot water', 'Smart home systems'], created_at: new Date().toISOString() },
        { id: '17', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'metro', state: 'VIC', construction_type: 'esd_esg', base_price_per_sqm: 4776.00, cost_index: 160.1, percentage_movement: 3.4, esg_premium_percentage: 20.0, sustainability_features: ['Green Star rating', 'Advanced building management'], created_at: new Date().toISOString() },
        { id: '18', month: 'December', year: 2024, asset_class: 'industrial', region_type: 'metro', state: 'VIC', construction_type: 'esd_esg', base_price_per_sqm: 3420.00, cost_index: 152.3, percentage_movement: 4.6, esg_premium_percentage: 20.0, sustainability_features: ['Solar systems', 'Efficient manufacturing processes'], created_at: new Date().toISOString() },
        
        // QLD Metro - Traditional  
        { id: '19', month: 'December', year: 2024, asset_class: 'residential', region_type: 'metro', state: 'QLD', construction_type: 'traditional', base_price_per_sqm: 2950.00, cost_index: 125.2, percentage_movement: 4.1, created_at: new Date().toISOString() },
        { id: '20', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'metro', state: 'QLD', construction_type: 'traditional', base_price_per_sqm: 3650.00, cost_index: 128.6, percentage_movement: 3.6, created_at: new Date().toISOString() },
        
        // QLD Metro - ESD/ESG
        { id: '21', month: 'December', year: 2024, asset_class: 'residential', region_type: 'metro', state: 'QLD', construction_type: 'esd_esg', base_price_per_sqm: 3540.00, cost_index: 150.2, percentage_movement: 4.5, esg_premium_percentage: 20.0, sustainability_features: ['Climate-responsive design', 'Solar panels', 'Natural ventilation'], created_at: new Date().toISOString() },
        { id: '22', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'metro', state: 'QLD', construction_type: 'esd_esg', base_price_per_sqm: 4380.00, cost_index: 154.3, percentage_movement: 4.0, esg_premium_percentage: 20.0, sustainability_features: ['Tropical climate optimization', 'Energy efficiency'], created_at: new Date().toISOString() },
        
        // WA Metro - Traditional
        { id: '23', month: 'December', year: 2024, asset_class: 'residential', region_type: 'metro', state: 'WA', construction_type: 'traditional', base_price_per_sqm: 2880.00, cost_index: 122.7, percentage_movement: 3.9, created_at: new Date().toISOString() },
        { id: '24', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'metro', state: 'WA', construction_type: 'traditional', base_price_per_sqm: 3520.00, cost_index: 125.8, percentage_movement: 3.4, created_at: new Date().toISOString() },
        
        // WA Metro - ESD/ESG
        { id: '25', month: 'December', year: 2024, asset_class: 'residential', region_type: 'metro', state: 'WA', construction_type: 'esd_esg', base_price_per_sqm: 3456.00, cost_index: 147.2, percentage_movement: 4.3, esg_premium_percentage: 20.0, sustainability_features: ['Solar systems', 'Water-wise design', 'Energy efficiency'], created_at: new Date().toISOString() },
        { id: '26', month: 'December', year: 2024, asset_class: 'commercial', region_type: 'metro', state: 'WA', construction_type: 'esd_esg', base_price_per_sqm: 4224.00, cost_index: 150.9, percentage_movement: 3.8, esg_premium_percentage: 20.0, sustainability_features: ['Sustainable materials', 'Advanced HVAC'], created_at: new Date().toISOString() }
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

  const getDataByConstructionType = (constructionType: 'traditional' | 'esd_esg') => 
    constructionData?.filter(item => item.construction_type === constructionType) || [];

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
        <div className="flex items-center gap-2">
          <h4 className="font-semibold capitalize">{item.asset_class}</h4>
          {item.construction_type === 'esd_esg' && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Leaf className="h-3 w-3 mr-1" />
              ESD/ESG
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="capitalize">{item.region_type}</span>
          <span>•</span>
          <span>{item.state}</span>
          <span>•</span>
          <span>{item.month} {item.year}</span>
        </div>
        {item.sustainability_features && (
          <div className="mt-1 text-xs text-green-600">
            {item.sustainability_features.slice(0, 2).join(', ')}
            {item.sustainability_features.length > 2 && '...'}
          </div>
        )}
      </div>
      <div className="text-right space-y-1">
        <p className="font-medium">{formatCurrency(item.base_price_per_sqm)}/m²</p>
        {item.esg_premium_percentage && (
          <p className="text-xs text-green-600">+{item.esg_premium_percentage}% ESG Premium</p>
        )}
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

  const renderConstructionTypeComparison = () => {
    const traditionalData = getDataByConstructionType('traditional');
    const esdEsgData = getDataByConstructionType('esd_esg');
    
    const assetClasses = [...new Set(constructionData?.map(item => item.asset_class) || [])];
    
    return (
      <div className="space-y-6">
        {assetClasses.map(assetClass => {
          const traditional = traditionalData.filter(item => item.asset_class === assetClass);
          const esdEsg = esdEsgData.filter(item => item.asset_class === assetClass);
          
          if (traditional.length === 0 && esdEsg.length === 0) return null;
          
          return (
            <Card key={assetClass}>
              <CardHeader>
                <CardTitle className="text-lg capitalize flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  {assetClass} Construction
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Traditional vs ESD/ESG construction cost comparison
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-3">Traditional Construction</h4>
                    <div className="space-y-2">
                      {traditional.map(renderCostCard)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-600" />
                      ESD/ESG Construction
                    </h4>
                    <div className="space-y-2">
                      {esdEsg.map(renderCostCard)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Construction Cost Index - Australia
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Construction costs per square meter by location, asset class, and sustainability standards
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="traditional-vs-esg" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="traditional-vs-esg" className="flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                Traditional vs ESD/ESG
              </TabsTrigger>
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

            <TabsContent value="traditional-vs-esg" className="space-y-6">
              {renderConstructionTypeComparison()}
            </TabsContent>

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
                        {stateData.length} construction type{stateData.length !== 1 ? 's' : ''} tracked
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
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Leaf className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-900">ESD/ESG Premium</h4>
                        <p className="text-sm text-green-700 mt-1">
                          Environmentally Sustainable Design and ESG-compliant construction typically commands a 15-25% premium over traditional methods, 
                          driven by advanced materials, energy-efficient systems, and sustainability certifications.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Building className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">Metro vs Regional Cost Differential</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Metropolitan areas show 15-25% higher construction costs for both traditional and ESD/ESG construction, 
                          with sustainable building premiums remaining consistent across regions.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-900">Sustainability Features</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          Common ESD/ESG features include solar panels, energy-efficient ratings (6-7 stars), smart home technology, 
                          green roof systems, water recycling, and sustainable materials, contributing to long-term operational savings.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-purple-900">Market Trends</h4>
                        <p className="text-sm text-purple-700 mt-1">
                          ESD/ESG construction shows stronger growth (4.0-5.1% increase) compared to traditional methods (2.1-4.5%), 
                          reflecting increased demand for sustainable building practices and government incentives.
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