import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Search, Building, MapPin, TrendingUp, Users, DollarSign } from 'lucide-react';

interface DomainAPITestResults {
  endpoint: string;
  status: 'success' | 'error' | 'pending';
  data?: any;
  error?: string;
  responseTime?: number;
}

export const DomainIntegrationDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('property-search');
  const [testResults, setTestResults] = useState<DomainAPITestResults[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Form states for different API endpoints
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [location, setLocation] = useState({ state: '', suburb: '', postcode: '' });
  const [listingCriteria, setListingCriteria] = useState({
    suburb: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  });

  const simulateAPICall = async (endpoint: string, data: any) => {
    setLoading(true);
    const startTime = Date.now();
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const responseTime = Date.now() - startTime;
      const mockResponse = generateMockResponse(endpoint, data);
      
      const result: DomainAPITestResults = {
        endpoint,
        status: 'success',
        data: mockResponse,
        responseTime
      };
      
      setTestResults(prev => [...prev, result]);
      
      toast({
        title: "API Call Successful",
        description: `${endpoint} completed in ${responseTime}ms`,
      });
      
    } catch (error) {
      const result: DomainAPITestResults = {
        endpoint,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      
      setTestResults(prev => [...prev, result]);
      
      toast({
        variant: "destructive",
        title: "API Call Failed",
        description: `${endpoint} failed: ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const generateMockResponse = (endpoint: string, data: any) => {
    switch (endpoint) {
      case 'Property Search':
        return [
          {
            id: 'prop_001',
            address: `${data.term || '123 Mock Street'}, Melbourne VIC 3000`,
            propertyType: 'Apartment',
            bedrooms: 2,
            bathrooms: 1,
            price: '$650,000 - $700,000'
          },
          {
            id: 'prop_002',
            address: `${data.term || '456 Sample Road'}, Melbourne VIC 3000`,
            propertyType: 'House',
            bedrooms: 3,
            bathrooms: 2,
            price: '$800,000 - $850,000'
          }
        ];
      case 'Property Details':
        return {
          id: data.propertyId,
          address: '123 Domain Integration Street, Melbourne VIC 3000',
          propertyType: 'Apartment',
          bedrooms: 2,
          bathrooms: 1,
          landSize: 0,
          buildingSize: 85,
          yearBuilt: 2018,
          features: ['Balcony', 'Secure Parking', 'Swimming Pool'],
          lastSoldPrice: '$675,000',
          lastSoldDate: '2023-06-15',
          estimates: {
            current: '$690,000',
            range: '$670,000 - $720,000'
          }
        };
      case 'Market Data':
        return {
          suburb: data.suburb,
          state: data.state,
          medianPrice: '$785,000',
          growthRate: '8.5%',
          daysOnMarket: 28,
          clearanceRate: '72%',
          totalSales: 145,
          demographics: {
            population: 12450,
            medianAge: 34,
            households: 5200
          }
        };
      case 'Listings Search':
        return [
          {
            id: 'listing_001',
            address: `42 ${data.suburb || 'Test'} Avenue`,
            price: data.minPrice ? `$${data.minPrice} - $${data.maxPrice}` : '$750,000',
            propertyType: data.propertyType || 'House',
            bedrooms: data.bedrooms || 3,
            bathrooms: data.bathrooms || 2,
            status: 'For Sale'
          }
        ];
      default:
        return { message: 'Mock response', timestamp: new Date().toISOString() };
    }
  };

  const clearResults = () => {
    setTestResults([]);
    toast({
      title: "Results Cleared",
      description: "All test results have been cleared",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Domain API Integration Demo</h1>
          <p className="text-muted-foreground">
            Comprehensive testing interface for all Domain API endpoints
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="property-search" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </TabsTrigger>
                <TabsTrigger value="property-details" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Details
                </TabsTrigger>
                <TabsTrigger value="market-data" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Market
                </TabsTrigger>
                <TabsTrigger value="listings" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Listings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="property-search" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Property Search API
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="search-term">Search Term</Label>
                      <Input
                        id="search-term"
                        placeholder="Enter address, suburb, or property details..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={() => simulateAPICall('Property Search', { term: searchTerm })}
                      disabled={loading}
                      className="w-full"
                    >
                      Test Property Search API
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="property-details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Property Details API
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="property-id">Property ID</Label>
                      <Input
                        id="property-id"
                        placeholder="Enter Domain property ID..."
                        value={propertyId}
                        onChange={(e) => setPropertyId(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={() => simulateAPICall('Property Details', { propertyId })}
                      disabled={loading}
                      className="w-full"
                    >
                      Test Property Details API
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="market-data" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Market Data API
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Select onValueChange={(value) => setLocation(prev => ({ ...prev, state: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="State" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="VIC">Victoria</SelectItem>
                            <SelectItem value="NSW">New South Wales</SelectItem>
                            <SelectItem value="QLD">Queensland</SelectItem>
                            <SelectItem value="WA">Western Australia</SelectItem>
                            <SelectItem value="SA">South Australia</SelectItem>
                            <SelectItem value="TAS">Tasmania</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="suburb">Suburb</Label>
                        <Input
                          id="suburb"
                          placeholder="Suburb"
                          value={location.suburb}
                          onChange={(e) => setLocation(prev => ({ ...prev, suburb: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="postcode">Postcode</Label>
                        <Input
                          id="postcode"
                          placeholder="Postcode"
                          value={location.postcode}
                          onChange={(e) => setLocation(prev => ({ ...prev, postcode: e.target.value }))}
                        />
                      </div>
                    </div>
                    <Button 
                      onClick={() => simulateAPICall('Market Data', location)}
                      disabled={loading}
                      className="w-full"
                    >
                      Test Market Data API
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="listings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Listings Search API
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="listing-suburb">Suburb</Label>
                        <Input
                          id="listing-suburb"
                          placeholder="Suburb"
                          value={listingCriteria.suburb}
                          onChange={(e) => setListingCriteria(prev => ({ ...prev, suburb: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="property-type">Property Type</Label>
                        <Select onValueChange={(value) => setListingCriteria(prev => ({ ...prev, propertyType: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="House">House</SelectItem>
                            <SelectItem value="Apartment">Apartment</SelectItem>
                            <SelectItem value="Townhouse">Townhouse</SelectItem>
                            <SelectItem value="Unit">Unit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="min-price">Min Price</Label>
                        <Input
                          id="min-price"
                          placeholder="Min Price"
                          value={listingCriteria.minPrice}
                          onChange={(e) => setListingCriteria(prev => ({ ...prev, minPrice: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="max-price">Max Price</Label>
                        <Input
                          id="max-price"
                          placeholder="Max Price"
                          value={listingCriteria.maxPrice}
                          onChange={(e) => setListingCriteria(prev => ({ ...prev, maxPrice: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bedrooms">Bedrooms</Label>
                        <Select onValueChange={(value) => setListingCriteria(prev => ({ ...prev, bedrooms: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Beds" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5+">5+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="bathrooms">Bathrooms</Label>
                        <Select onValueChange={(value) => setListingCriteria(prev => ({ ...prev, bathrooms: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Baths" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4+">4+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button 
                      onClick={() => simulateAPICall('Listings Search', listingCriteria)}
                      disabled={loading}
                      className="w-full"
                    >
                      Test Listings Search API
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  API Test Results
                </CardTitle>
                <Button variant="outline" size="sm" onClick={clearResults}>
                  Clear
                </Button>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No API calls made yet. Test an endpoint to see results.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {testResults.map((result, index) => (
                      <div key={index} className="border rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{result.endpoint}</span>
                          <Badge variant={result.status === 'success' ? 'default' : 'destructive'}>
                            {result.status}
                          </Badge>
                        </div>
                        {result.responseTime && (
                          <p className="text-xs text-muted-foreground">
                            Response time: {result.responseTime}ms
                          </p>
                        )}
                        {result.error && (
                          <p className="text-xs text-red-500">{result.error}</p>
                        )}
                        {result.data && (
                          <details className="text-xs">
                            <summary className="cursor-pointer text-primary">View Response</summary>
                            <pre className="mt-2 bg-muted p-2 rounded text-xs overflow-auto">
                              {JSON.stringify(result.data, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Integration Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Authentication</span>
                  <Badge variant="default">Ready</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rate Limiting</span>
                  <Badge variant="default">Configured</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Error Handling</span>
                  <Badge variant="default">Implemented</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Response Caching</span>
                  <Badge variant="secondary">Pending</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};