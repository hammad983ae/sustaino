import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const APITestComponent = () => {
  const [testResults, setTestResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const testPropertyCalculation = async () => {
    setIsLoading(true);
    try {
      // Test the property calculation edge function
      const { data, error } = await supabase.functions.invoke('property-calculation', {
        body: {
          type: 'property_valuation',
          data: {
            property_data: {
              building_area: 200,
              annual_rent: 50000
            },
            market_data: {
              cap_rate: 0.05,
              market_adjustment: 0.1
            }
          }
        }
      });

      if (error) throw error;

      setTestResults(data);
      toast({
        title: "API Test Success",
        description: "Property calculation API is working correctly",
      });
    } catch (error) {
      console.error('API test error:', error);
      toast({
        title: "API Test Failed",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testESGCalculation = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('property-calculation', {
        body: {
          type: 'esg_score',
          data: {
            environmental_factors: {
              energy_rating: 4,
              water_efficiency: 3,
              carbon_footprint: 2,
              renewable_energy: 3,
              waste_management: 4
            },
            social_factors: {
              community_impact: 4,
              accessibility: 3,
              health_safety: 4,
              stakeholder_engagement: 3
            },
            governance_factors: {
              transparency: 4,
              compliance: 5,
              risk_management: 4,
              ethics: 4
            }
          }
        }
      });

      if (error) throw error;

      setTestResults(data);
      toast({
        title: "ESG Test Success",
        description: "ESG calculation API is working correctly",
      });
    } catch (error) {
      console.error('ESG test error:', error);
      toast({
        title: "ESG Test Failed",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testSalesAnalysis = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('property-calculation', {
        body: {
          type: 'sales_analysis',
          data: {
            subject_property: {
              building_area: 200,
              location_quality: "good",
              year_built: 2010
            },
            comparable_sales: [
              {
                sale_price: 800000,
                building_area: 180,
                location_quality: "good",
                year_built: 2008
              },
              {
                sale_price: 750000,
                building_area: 190,
                location_quality: "average",
                year_built: 2012
              }
            ]
          }
        }
      });

      if (error) throw error;

      setTestResults(data);
      toast({
        title: "Sales Analysis Success",
        description: "Sales analysis API is working correctly",
      });
    } catch (error) {
      console.error('Sales analysis error:', error);
      toast({
        title: "Sales Analysis Failed",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          API Testing Dashboard
          <Badge variant="outline">Production Ready</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            onClick={testPropertyCalculation} 
            disabled={isLoading}
            variant="outline"
          >
            Test Property Valuation
          </Button>
          
          <Button 
            onClick={testESGCalculation} 
            disabled={isLoading}
            variant="outline"
          >
            Test ESG Scoring
          </Button>
          
          <Button 
            onClick={testSalesAnalysis} 
            disabled={isLoading}
            variant="outline"
          >
            Test Sales Analysis
          </Button>
        </div>

        {testResults && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Test Results:</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(testResults, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};