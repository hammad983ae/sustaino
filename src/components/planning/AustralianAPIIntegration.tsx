import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Database, Globe, MapPin, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface APIEndpoint {
  name: string;
  url: string;
  method: 'GET' | 'POST';
  description: string;
  parameters: Record<string, string>;
  example: string;
  status: 'active' | 'partial' | 'requires-auth' | 'manual';
}

const AUSTRALIAN_PLANNING_APIS: Record<string, APIEndpoint[]> = {
  NSW: [
    {
      name: 'SIX Maps Address Location',
      url: 'http://mapsq.six.nsw.gov.au/services/public/Address_Location',
      method: 'GET',
      description: 'Geocode NSW addresses and get property coordinates',
      parameters: {
        houseNumber: 'Property number (e.g., 346)',
        roadName: 'Street name without type (e.g., Panorama)',
        roadType: 'Street type (Ave, St, Rd, etc.)',
        suburb: 'Suburb name',
        postCode: 'Postcode',
        projection: 'Coordinate system (EPSG:4326 for WGS84)'
      },
      example: 'http://mapsq.six.nsw.gov.au/services/public/Address_Location?houseNumber=346&roadName=Panorama&roadType=Ave&suburb=Bathurst&postCode=2795&projection=EPSG%3A4326',
      status: 'active'
    },
    {
      name: 'NSW Base Map Service',
      url: 'https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Base_Map/MapServer',
      method: 'GET',
      description: 'ArcGIS REST service for NSW base mapping data',
      parameters: {
        f: 'Response format (json, html)',
        layers: 'Layer IDs to query',
        bbox: 'Bounding box for spatial query'
      },
      example: 'https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Base_Map/MapServer?f=json',
      status: 'active'
    },
    {
      name: 'NSW Cadastre Service',
      url: 'https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Cadastre/MapServer',
      method: 'GET',
      description: 'Property boundary and cadastral information',
      parameters: {
        f: 'Response format',
        geometry: 'Query geometry',
        geometryType: 'Type of geometry query'
      },
      example: 'https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Cadastre/MapServer?f=json',
      status: 'active'
    },
    {
      name: 'Planning Portal Spatial Viewer',
      url: 'https://www.planningportal.nsw.gov.au/spatialviewer',
      method: 'GET',
      description: 'Interactive planning controls and zoning information',
      parameters: {
        address: 'Property address for lookup'
      },
      example: 'https://www.planningportal.nsw.gov.au/spatialviewer/#/find-a-property/address',
      status: 'manual'
    }
  ],
  VIC: [
    {
      name: 'DEECA WMS Services',
      url: 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wms',
      method: 'GET',
      description: 'Web Map Service for Victorian spatial data',
      parameters: {
        SERVICE: 'WMS',
        VERSION: '1.1.1',
        REQUEST: 'GetMap or GetFeatureInfo',
        LAYERS: 'Planning zones, overlays, etc.',
        BBOX: 'Bounding box',
        WIDTH: 'Image width',
        HEIGHT: 'Image height',
        SRS: 'Spatial reference system'
      },
      example: 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetCapabilities',
      status: 'active'
    },
    {
      name: 'VicPlan Planning Schemes',
      url: 'https://planning-schemes.app.land.vic.gov.au',
      method: 'GET',
      description: 'Planning scheme documents and controls',
      parameters: {
        scheme: 'Planning scheme name',
        zone: 'Planning zone code'
      },
      example: 'https://planning-schemes.app.land.vic.gov.au/ballarat',
      status: 'manual'
    },
    {
      name: 'MapShareVic Portal',
      url: 'https://mapshare.vic.gov.au',
      method: 'GET',
      description: 'Interactive mapping with planning overlays',
      parameters: {
        layers: 'Map layers to display',
        extent: 'Map extent'
      },
      example: 'https://mapshare.vic.gov.au/mapsharevic/',
      status: 'manual'
    }
  ],
  SA: [
    {
      name: 'SAPPA Property Search',
      url: 'https://sappa.plan.sa.gov.au',
      method: 'GET',
      description: 'South Australian Property and Planning Atlas',
      parameters: {
        address: 'Property address',
        parcel: 'Parcel identifier',
        title: 'Title reference'
      },
      example: 'https://sappa.plan.sa.gov.au/',
      status: 'manual'
    }
  ],
  QLD: [
    {
      name: 'QLD Planning Portal',
      url: 'https://planning.statedevelopment.qld.gov.au',
      method: 'GET',
      description: 'Queensland planning information portal',
      parameters: {
        address: 'Property address lookup'
      },
      example: 'https://planning.statedevelopment.qld.gov.au/planning/planning-our-places/state-planning-instruments',
      status: 'manual'
    }
  ],
  WA: [
    {
      name: 'WA Planning Portal',
      url: 'https://www.wa.gov.au/government/publications/planning-wa',
      method: 'GET',
      description: 'Western Australia planning information',
      parameters: {
        region: 'Planning region',
        scheme: 'Local planning scheme'
      },
      example: 'https://www.wa.gov.au/government/publications/planning-wa',
      status: 'manual'
    }
  ],
  TAS: [
    {
      name: 'Tasmania Planning Portal',
      url: 'https://www.planning.tas.gov.au',
      method: 'GET',
      description: 'Tasmanian planning information portal',
      parameters: {
        council: 'Local council area',
        zone: 'Planning zone'
      },
      example: 'https://www.planning.tas.gov.au/',
      status: 'manual'
    }
  ]
};

export const AustralianAPIIntegration: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('NSW');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">API Active</Badge>;
      case 'partial':
        return <Badge variant="secondary">Partial Support</Badge>;
      case 'requires-auth':
        return <Badge variant="outline">Requires Auth</Badge>;
      case 'manual':
        return <Badge variant="destructive">Manual Portal</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const testAPI = async (endpoint: APIEndpoint) => {
    try {
      if (endpoint.status === 'manual') {
        window.open(endpoint.url, '_blank');
        return;
      }

      // For demonstration - would need CORS proxy for actual API calls
      console.log(`Testing API: ${endpoint.name}`);
      console.log(`URL: ${endpoint.example}`);
    } catch (error) {
      console.error('API test failed:', error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Australian Planning API Integration
        </CardTitle>
        <CardDescription>
          Technical documentation and integration guide for Australian state planning APIs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedState} onValueChange={setSelectedState} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            {Object.keys(AUSTRALIAN_PLANNING_APIS).map((state) => (
              <TabsTrigger key={state} value={state}>
                {state}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(AUSTRALIAN_PLANNING_APIS).map(([state, apis]) => (
            <TabsContent key={state} value={state} className="space-y-4">
              <div className="grid gap-4">
                {apis.map((api, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {api.status === 'active' ? (
                              <Code className="h-4 w-4" />
                            ) : (
                              <Globe className="h-4 w-4" />
                            )}
                            {api.name}
                          </CardTitle>
                          <CardDescription>{api.description}</CardDescription>
                        </div>
                        {getStatusBadge(api.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Endpoint</h4>
                        <code className="bg-muted p-2 rounded text-sm block break-all">
                          {api.method} {api.url}
                        </code>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Parameters</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {Object.entries(api.parameters).map(([param, description]) => (
                            <div key={param} className="text-sm">
                              <code className="bg-muted px-1 rounded">{param}</code>
                              <span className="text-muted-foreground ml-2">{description}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Example Request</h4>
                        <code className="bg-muted p-2 rounded text-xs block break-all">
                          {api.example}
                        </code>
                      </div>

                      <Button 
                        onClick={() => testAPI(api)}
                        variant={api.status === 'active' ? 'default' : 'outline'}
                        className="w-full"
                      >
                        {api.status === 'active' ? (
                          <>
                            <Code className="h-4 w-4 mr-2" />
                            Test API
                          </>
                        ) : (
                          <>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open Portal
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Alert className="mt-6">
          <MapPin className="h-4 w-4" />
          <AlertDescription>
            <strong>Integration Notes:</strong> Most state planning APIs require CORS proxies for browser-based 
            access. NSW SIX Maps and Victoria WMS services are the most API-friendly. Other states primarily 
            offer interactive portals that require manual searches.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default AustralianAPIIntegration;