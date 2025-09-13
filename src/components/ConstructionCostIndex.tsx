import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ConstructionCostData {
  id: string;
  month: string;
  year: number;
  asset_class: string;
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
      // Mock data until database functions are available in types
      const mockData: ConstructionCostData[] = [
        { id: '1', month: 'December', year: 2024, asset_class: 'residential', base_price_per_sqm: 2850.00, cost_index: 125.5, percentage_movement: 3.2, created_at: new Date().toISOString() },
        { id: '2', month: 'December', year: 2024, asset_class: 'commercial', base_price_per_sqm: 3420.00, cost_index: 128.3, percentage_movement: 2.8, created_at: new Date().toISOString() },
        { id: '3', month: 'December', year: 2024, asset_class: 'industrial', base_price_per_sqm: 2650.00, cost_index: 122.1, percentage_movement: 4.1, created_at: new Date().toISOString() },
        { id: '4', month: 'December', year: 2024, asset_class: 'agricultural', base_price_per_sqm: 1890.00, cost_index: 118.7, percentage_movement: 2.5, created_at: new Date().toISOString() },
        { id: '5', month: 'December', year: 2024, asset_class: 'specialised', base_price_per_sqm: 4200.00, cost_index: 132.4, percentage_movement: 3.7, created_at: new Date().toISOString() }
      ];
      return mockData;
    }
  });

  const { data: cpiData, isLoading: cpiLoading } = useQuery({
    queryKey: ['cpi-index'],
    queryFn: async () => {
      // Mock data until database functions are available in types
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

  const latestConstructionData = constructionData?.filter((item, index, self) => 
    index === self.findIndex(t => t.asset_class === item.asset_class)
  );

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(value);

  const formatPercentage = (value: number) => 
    `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;

  const getTrendIcon = (movement: number) => 
    movement > 0 ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />;

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Construction Cost Index
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Current construction costs per square meter by asset class
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {latestConstructionData?.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold capitalize">{item.asset_class}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.month} {item.year}
                  </p>
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
            ))}
          </div>
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