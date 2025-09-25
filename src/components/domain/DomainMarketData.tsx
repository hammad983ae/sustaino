import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import DomainAPIClient from '@/utils/domainAPIClient';

export const DomainMarketData: React.FC = () => {
  const [location, setLocation] = useState({
    state: '',
    suburb: '',
    postcode: ''
  });
  const [demographics, setDemographics] = useState<any>(null);
  const [suburbStats, setSuburbStats] = useState<any>(null);
  const [salesResults, setSalesResults] = useState<any>(null);
  const [loading, setLoading] = useState({
    demographics: false,
    stats: false,
    sales: false
  });
  const { toast } = useToast();

  const apiClient = new DomainAPIClient();

  const fetchDemographics = async () => {
    if (!location.state || !location.suburb) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter state and suburb",
      });
      return;
    }

    setLoading(prev => ({ ...prev, demographics: true }));
    try {
      const data = await apiClient.getDemographics(
        location.state, 
        location.suburb, 
        location.postcode || null
      );
      setDemographics(data);
      toast({
        title: "Demographics Loaded",
        description: `Retrieved data for ${location.suburb}, ${location.state}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load demographics data",
      });
    } finally {
      setLoading(prev => ({ ...prev, demographics: false }));
    }
  };

  const fetchSuburbStats = async () => {
    if (!location.state || !location.suburb) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter state and suburb",
      });
      return;
    }

    setLoading(prev => ({ ...prev, stats: true }));
    try {
      const data = await apiClient.getSuburbStats(
        location.state, 
        location.suburb, 
        location.postcode || null
      );
      setSuburbStats(data);
      toast({
        title: "Suburb Stats Loaded",
        description: `Retrieved statistics for ${location.suburb}, ${location.state}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load suburb statistics",
      });
    } finally {
      setLoading(prev => ({ ...prev, stats: false }));
    }
  };

  const fetchSalesResults = async () => {
    if (!location.suburb) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter suburb/city",
      });
      return;
    }

    setLoading(prev => ({ ...prev, sales: true }));
    try {
      const data = await apiClient.getSalesResults(location.suburb);
      setSalesResults(data);
      toast({
        title: "Sales Results Loaded",
        description: `Retrieved sales data for ${location.suburb}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load sales results",
      });
    } finally {
      setLoading(prev => ({ ...prev, sales: false }));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Domain Market Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>State</Label>
              <Input
                value={location.state}
                onChange={(e) => setLocation(prev => ({ ...prev, state: e.target.value }))}
                placeholder="NSW, VIC, QLD..."
              />
            </div>
            <div>
              <Label>Suburb</Label>
              <Input
                value={location.suburb}
                onChange={(e) => setLocation(prev => ({ ...prev, suburb: e.target.value }))}
                placeholder="Sydney, Melbourne..."
              />
            </div>
            <div>
              <Label>Postcode (Optional)</Label>
              <Input
                value={location.postcode}
                onChange={(e) => setLocation(prev => ({ ...prev, postcode: e.target.value }))}
                placeholder="2000"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Button 
              onClick={fetchDemographics} 
              disabled={loading.demographics}
              variant="outline"
            >
              {loading.demographics ? 'Loading...' : 'Get Demographics'}
            </Button>
            <Button 
              onClick={fetchSuburbStats} 
              disabled={loading.stats}
              variant="outline"
            >
              {loading.stats ? 'Loading...' : 'Get Suburb Stats'}
            </Button>
            <Button 
              onClick={fetchSalesResults} 
              disabled={loading.sales}
              variant="outline"
            >
              {loading.sales ? 'Loading...' : 'Get Sales Results'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="demographics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="stats">Suburb Stats</TabsTrigger>
          <TabsTrigger value="sales">Sales Results</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics">
          <Card>
            <CardHeader>
              <CardTitle>Demographics Data</CardTitle>
            </CardHeader>
            <CardContent>
              {demographics ? (
                <pre className="text-sm bg-muted p-4 rounded-lg overflow-auto max-h-96">
                  {JSON.stringify(demographics, null, 2)}
                </pre>
              ) : (
                <p className="text-muted-foreground">No demographics data loaded yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Suburb Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              {suburbStats ? (
                <pre className="text-sm bg-muted p-4 rounded-lg overflow-auto max-h-96">
                  {JSON.stringify(suburbStats, null, 2)}
                </pre>
              ) : (
                <p className="text-muted-foreground">No suburb statistics loaded yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Sales Results</CardTitle>
            </CardHeader>
            <CardContent>
              {salesResults ? (
                <pre className="text-sm bg-muted p-4 rounded-lg overflow-auto max-h-96">
                  {JSON.stringify(salesResults, null, 2)}
                </pre>
              ) : (
                <p className="text-muted-foreground">No sales results loaded yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};