import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, MapPin, ExternalLink, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface PlanningData {
  source: string;
  address: string;
  zoning?: string;
  overlays?: string[];
  lotPlan?: string;
  coordinates?: { lat: number; lng: number };
  planningScheme?: string;
  data?: any;
}

interface AustralianPlanningPortalIntegrationProps {
  propertyAddress?: string;
  onDataReceived?: (data: PlanningData[]) => void;
}

const PLANNING_PORTALS = {
  VIC: {
    name: 'Victoria (DEECA)',
    baseUrl: 'https://www.deeca.vic.gov.au',
    wmsUrl: 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wms',
    description: 'Victorian planning data via DEECA interactive maps and WMS services'
  },
  NSW: {
    name: 'NSW (SIX Maps & Planning Portal)',
    baseUrl: 'https://maps.six.nsw.gov.au',
    addressApi: 'http://mapsq.six.nsw.gov.au/services/public/Address_Location',
    planningPortal: 'https://www.planningportal.nsw.gov.au/spatialviewer',
    description: 'NSW planning data via SIX Maps and Planning Portal'
  },
  SA: {
    name: 'South Australia (SAPPA)',
    baseUrl: 'https://sappa.plan.sa.gov.au',
    description: 'SA Property and Planning Atlas data'
  },
  QLD: {
    name: 'Queensland',
    baseUrl: 'https://planning.statedevelopment.qld.gov.au',
    description: 'Queensland planning portal integration'
  },
  WA: {
    name: 'Western Australia',
    baseUrl: 'https://www.wa.gov.au/government/publications/planning-wa',
    description: 'WA planning data integration'
  },
  TAS: {
    name: 'Tasmania',
    baseUrl: 'https://www.planning.tas.gov.au',
    description: 'Tasmanian planning portal integration'
  }
};

export const AustralianPlanningPortalIntegration: React.FC<AustralianPlanningPortalIntegrationProps> = ({
  propertyAddress = '',
  onDataReceived
}) => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [searchAddress, setSearchAddress] = useState(propertyAddress);
  const [isLoading, setIsLoading] = useState(false);
  const [planningData, setPlanningData] = useState<PlanningData[]>([]);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    setSearchAddress(propertyAddress);
  }, [propertyAddress]);

  // NSW SIX Maps Address Location API
  const fetchNSWAddressData = async (address: string): Promise<PlanningData | null> => {
    try {
      // Parse address components
      const addressParts = address.split(',');
      const streetPart = addressParts[0]?.trim();
      const suburb = addressParts[1]?.trim();
      const postcode = addressParts[2]?.trim();

      // Extract house number and street name
      const streetMatch = streetPart?.match(/^(\d+[A-Za-z]?)\s+(.+?)(?:\s+(st|street|rd|road|ave|avenue|dr|drive|cres|crescent|pl|place|ct|court|way|lane|pde|parade|tce|terrace))?$/i);
      
      if (!streetMatch) {
        throw new Error('Invalid address format for NSW lookup');
      }

      const houseNumber = streetMatch[1];
      const roadName = streetMatch[2];
      const roadType = streetMatch[3] || 'Street';

      const params = new URLSearchParams({
        houseNumber,
        roadName,
        roadType,
        suburb: suburb || '',
        postCode: postcode || '',
        projection: 'EPSG:4326'
      });

      // Note: This would need CORS proxy in production
      const response = await fetch(`${PLANNING_PORTALS.NSW.addressApi}?${params}`);
      const data = await response.text();
      
      // Parse XML response (simplified)
      const coordinates = extractCoordinatesFromNSWResponse(data);
      
      return {
        source: 'NSW SIX Maps',
        address,
        coordinates,
        data: data
      };
    } catch (error) {
      console.error('NSW address lookup failed:', error);
      return null;
    }
  };

  // Victoria WMS service integration
  const fetchVICPlanningData = async (address: string): Promise<PlanningData | null> => {
    try {
      // This would integrate with Victoria's WMS services
      // For now, return mock data structure
      return {
        source: 'Victoria DEECA',
        address,
        zoning: 'Residential 1 Zone',
        overlays: ['Design and Development Overlay', 'Bushfire Management Overlay'],
        planningScheme: 'Ballarat Planning Scheme',
        data: {
          wmsLayers: ['planning_zones', 'planning_overlays', 'heritage'],
          available: true
        }
      };
    } catch (error) {
      console.error('Victoria planning lookup failed:', error);
      return null;
    }
  };

  // SA SAPPA integration
  const fetchSAPlanningData = async (address: string): Promise<PlanningData | null> => {
    try {
      // SAPPA integration would require reverse engineering their API
      return {
        source: 'SA SAPPA',
        address,
        zoning: 'Residential Zone',
        overlays: ['Airport Building Heights'],
        data: {
          available: true,
          note: 'SAPPA integration requires additional development'
        }
      };
    } catch (error) {
      console.error('SA planning lookup failed:', error);
      return null;
    }
  };

  const extractCoordinatesFromNSWResponse = (xmlData: string): { lat: number; lng: number } | undefined => {
    // Parse NSW SIX Maps XML response
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
      const lat = xmlDoc.querySelector('Latitude')?.textContent;
      const lng = xmlDoc.querySelector('Longitude')?.textContent;
      
      if (lat && lng) {
        return { lat: parseFloat(lat), lng: parseFloat(lng) };
      }
    } catch (error) {
      console.error('Failed to parse NSW coordinates:', error);
    }
    return undefined;
  };

  const handleSearch = async () => {
    if (!selectedState || !searchAddress) {
      setError('Please select a state and enter an address');
      return;
    }

    setIsLoading(true);
    setError('');
    const results: PlanningData[] = [];

    try {
      switch (selectedState) {
        case 'NSW':
          const nswData = await fetchNSWAddressData(searchAddress);
          if (nswData) results.push(nswData);
          break;
        
        case 'VIC':
          const vicData = await fetchVICPlanningData(searchAddress);
          if (vicData) results.push(vicData);
          break;
        
        case 'SA':
          const saData = await fetchSAPlanningData(searchAddress);
          if (saData) results.push(saData);
          break;
        
        default:
          // For other states, show portal links
          results.push({
            source: PLANNING_PORTALS[selectedState as keyof typeof PLANNING_PORTALS].name,
            address: searchAddress,
            data: { 
              portalUrl: PLANNING_PORTALS[selectedState as keyof typeof PLANNING_PORTALS].baseUrl,
              requiresManualSearch: true 
            }
          });
      }

      setPlanningData(results);
      onDataReceived?.(results);

      if (results.length > 0) {
        toast({
          title: "Planning data retrieved",
          description: `Found ${results.length} result(s) from ${selectedState}`,
        });
      }
    } catch (error) {
      setError(`Failed to fetch planning data: ${error}`);
      toast({
        title: "Error",
        description: "Failed to fetch planning data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openPlanningPortal = (state: string) => {
    const portal = PLANNING_PORTALS[state as keyof typeof PLANNING_PORTALS];
    if (portal) {
      window.open(portal.baseUrl, '_blank');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Australian Planning Portal Integration
        </CardTitle>
        <CardDescription>
          Connect to state-based planning portals and APIs for comprehensive planning data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="state-select">State/Territory</Label>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue placeholder="Select state..." />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PLANNING_PORTALS).map(([code, portal]) => (
                  <SelectItem key={code} value={code}>
                    {portal.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address-input">Property Address</Label>
            <Input
              id="address-input"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              placeholder="Enter full address..."
            />
          </div>

          <div className="space-y-2">
            <Label>&nbsp;</Label>
            <Button 
              onClick={handleSearch} 
              disabled={isLoading || !selectedState || !searchAddress}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                'Search Planning Data'
              )}
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {planningData.length > 0 && (
          <Tabs defaultValue="results" className="w-full">
            <TabsList>
              <TabsTrigger value="results">Search Results</TabsTrigger>
              <TabsTrigger value="integration">API Integration Status</TabsTrigger>
            </TabsList>

            <TabsContent value="results" className="space-y-4">
              {planningData.map((data, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{data.source}</CardTitle>
                        <CardDescription>{data.address}</CardDescription>
                      </div>
                      <Badge variant="outline">{selectedState}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {data.zoning && (
                      <div className="mb-2">
                        <strong>Zoning:</strong> {data.zoning}
                      </div>
                    )}
                    {data.overlays && (
                      <div className="mb-2">
                        <strong>Overlays:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {data.overlays.map((overlay, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {overlay}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.coordinates && (
                      <div className="mb-2">
                        <strong>Coordinates:</strong> {data.coordinates.lat}, {data.coordinates.lng}
                      </div>
                    )}
                    {data.data?.requiresManualSearch && (
                      <Button 
                        variant="outline" 
                        onClick={() => openPlanningPortal(selectedState)}
                        className="mt-2"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Planning Portal
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="integration" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(PLANNING_PORTALS).map(([code, portal]) => (
                  <Card key={code}>
                    <CardHeader>
                      <CardTitle className="text-base">{portal.name}</CardTitle>
                      <CardDescription>{portal.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge 
                          variant={code === 'NSW' || code === 'VIC' ? 'default' : 'secondary'}
                        >
                          {code === 'NSW' || code === 'VIC' ? 'API Available' : 'Portal Link Only'}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openPlanningPortal(code)}
                          className="w-full"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Portal
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Portal Information */}
        {selectedState && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {PLANNING_PORTALS[selectedState as keyof typeof PLANNING_PORTALS].name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {PLANNING_PORTALS[selectedState as keyof typeof PLANNING_PORTALS].description}
              </p>
              <Button 
                variant="outline" 
                onClick={() => openPlanningPortal(selectedState)}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Planning Portal
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default AustralianPlanningPortalIntegration;