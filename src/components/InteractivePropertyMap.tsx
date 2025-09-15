/**
 * ============================================================================
 * INTERACTIVE PROPERTY MAP COMPONENT
 * Advanced mapping with property boundaries, sales heatmaps, and planning overlays
 * 
 * PROFESSIONAL COMPLIANCE:
 * - Maps supplement professional analysis, do not replace valuer judgment
 * - All automated selections require professional validation
 * - Industry standard citations maintained
 * ============================================================================
 */
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MapPin, Layers, Search, AlertTriangle, Home, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PropertySale {
  id: string;
  coordinates: [number, number];
  address: string;
  price: number;
  pricePerSqm: number;
  saleDate: string;
  bedrooms: number;
  bathrooms: number;
  buildingArea: number;
}

interface MapLayerState {
  salesHeatmap: boolean;
  propertyBoundaries: boolean;
  zoning: boolean;
  planning: boolean;
  transport: boolean;
}

interface MapFilters {
  radius: number;
  minPrice: number;
  maxPrice: number;
  salesPeriod: number; // months
}

// Use environment variable for Mapbox token
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'; // Demo token - replace with actual

export default function InteractivePropertyMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertySale | null>(null);
  const [layers, setLayers] = useState<MapLayerState>({
    salesHeatmap: true,
    propertyBoundaries: false,
    zoning: false,
    planning: false,
    transport: false,
  });
  const [filters, setFilters] = useState<MapFilters>({
    radius: 1000,
    minPrice: 0,
    maxPrice: 2000000,
    salesPeriod: 12,
  });
  const { toast } = useToast();

  // Mock sales data - replace with actual API data
  const salesData: PropertySale[] = [
    {
      id: '1',
      coordinates: [151.2093, -33.8688],
      address: '123 Market Street, Sydney',
      price: 1250000,
      pricePerSqm: 8333,
      saleDate: '2024-01-15',
      bedrooms: 3,
      bathrooms: 2,
      buildingArea: 150,
    },
    {
      id: '2',
      coordinates: [151.2103, -33.8698],
      address: '456 High Street, Sydney',
      price: 980000,
      pricePerSqm: 7000,
      saleDate: '2024-01-10',
      bedrooms: 2,
      bathrooms: 1,
      buildingArea: 140,
    },
    // Add more mock data...
  ];

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [151.2093, -33.8688], // Sydney coordinates
      zoom: 13,
      pitch: 45,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      setMapLoaded(true);
      initializeMapLayers();
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const initializeMapLayers = () => {
    if (!map.current) return;

    // Add sales data source
    map.current.addSource('sales-data', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: salesData.map(sale => ({
          type: 'Feature',
          properties: {
            ...sale,
            price: sale.price,
          },
          geometry: {
            type: 'Point',
            coordinates: sale.coordinates,
          },
        })),
      },
    });

    // Add heatmap layer
    map.current.addLayer({
      id: 'sales-heatmap',
      type: 'heatmap',
      source: 'sales-data',
      layout: {
        visibility: layers.salesHeatmap ? 'visible' : 'none',
      },
      paint: {
        'heatmap-weight': ['interpolate', ['linear'], ['get', 'price'], 500000, 0, 2000000, 1],
        'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(33,102,172,0)',
          0.2, 'rgb(103,169,207)',
          0.4, 'rgb(209,229,240)',
          0.6, 'rgb(253,219,199)',
          0.8, 'rgb(239,138,98)',
          1, 'rgb(178,24,43)',
        ],
        'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
        'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0],
      },
    });

    // Add sales points layer
    map.current.addLayer({
      id: 'sales-points',
      type: 'circle',
      source: 'sales-data',
      layout: {
        visibility: 'visible',
      },
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 7, ['interpolate', ['linear'], ['get', 'price'], 500000, 4, 2000000, 10], 16, ['interpolate', ['linear'], ['get', 'price'], 500000, 10, 2000000, 20]],
        'circle-color': ['interpolate', ['linear'], ['get', 'price'], 500000, '#3b82f6', 1000000, '#f59e0b', 2000000, '#ef4444'],
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff',
        'circle-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.8],
      },
    });

    // Add click handlers
    map.current.on('click', 'sales-points', (e) => {
      if (e.features && e.features[0]) {
        const feature = e.features[0];
        const sale = salesData.find(s => s.id === feature.properties?.id);
        if (sale) {
          setSelectedProperty(sale);
          
          // Create popup
          new mapboxgl.Popup()
            .setLngLat(sale.coordinates)
            .setHTML(`
              <div class="p-2">
                <h3 class="font-semibold">${sale.address}</h3>
                <p class="text-sm">Price: ${formatCurrency(sale.price)}</p>
                <p class="text-sm">Per sqm: ${formatCurrency(sale.pricePerSqm)}</p>
                <p class="text-sm">${sale.bedrooms} bed, ${sale.bathrooms} bath</p>
                <p class="text-xs text-gray-500">Sold: ${formatDate(sale.saleDate)}</p>
              </div>
            `)
            .addTo(map.current!);
        }
      }
    });

    // Change cursor on hover
    map.current.on('mouseenter', 'sales-points', () => {
      if (map.current) {
        map.current.getCanvas().style.cursor = 'pointer';
      }
    });

    map.current.on('mouseleave', 'sales-points', () => {
      if (map.current) {
        map.current.getCanvas().style.cursor = '';
      }
    });
  };

  const toggleLayer = (layerName: keyof MapLayerState) => {
    setLayers(prev => ({
      ...prev,
      [layerName]: !prev[layerName],
    }));

    if (map.current && mapLoaded) {
      const visibility = layers[layerName] ? 'none' : 'visible';
      
      switch (layerName) {
        case 'salesHeatmap':
          map.current.setLayoutProperty('sales-heatmap', 'visibility', visibility);
          break;
        // Add other layer toggles as needed
      }
    }
  };

  const updateRadius = (newRadius: number[]) => {
    setFilters(prev => ({ ...prev, radius: newRadius[0] }));
    
    if (map.current && mapLoaded) {
      // Add radius circle visualization
      const center = map.current.getCenter();
      
      // Remove existing radius circle
      if (map.current.getSource('radius-circle')) {
        map.current.removeLayer('radius-circle');
        map.current.removeSource('radius-circle');
      }

      // Add new radius circle
      const radiusInDegrees = newRadius[0] / 111000; // Rough conversion
      const circle = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [createCircle([center.lng, center.lat], radiusInDegrees)],
        },
      };

      map.current.addSource('radius-circle', {
        type: 'geojson',
        data: circle as any,
      });

      map.current.addLayer({
        id: 'radius-circle',
        type: 'line',
        source: 'radius-circle',
        paint: {
          'line-color': '#3b82f6',
          'line-width': 2,
          'line-dasharray': [2, 2],
        },
      });
    }
  };

  const createCircle = (center: [number, number], radiusInDegrees: number, points = 64) => {
    const coords = [];
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * 2 * Math.PI;
      const lat = center[1] + radiusInDegrees * Math.cos(angle);
      const lng = center[0] + radiusInDegrees * Math.sin(angle);
      coords.push([lng, lat]);
    }
    coords.push(coords[0]); // Close the circle
    return coords;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU');
  };

  return (
    <div className="space-y-6">
      {/* Professional Compliance Header */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>AI-Powered Mapping Analysis - Professional Validation Required</strong><br />
          Map-based insights supplement professional analysis in accordance with API and RICS standards.<br />
          ✓ All automated selections and analysis require licensed professional review.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Map Controls Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Map Layers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="heatmap" className="text-sm">Sales Heatmap</Label>
                  <Switch
                    id="heatmap"
                    checked={layers.salesHeatmap}
                    onCheckedChange={() => toggleLayer('salesHeatmap')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="boundaries" className="text-sm">Property Boundaries</Label>
                  <Switch
                    id="boundaries"
                    checked={layers.propertyBoundaries}
                    onCheckedChange={() => toggleLayer('propertyBoundaries')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="zoning" className="text-sm">Zoning</Label>
                  <Switch
                    id="zoning"
                    checked={layers.zoning}
                    onCheckedChange={() => toggleLayer('zoning')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="planning" className="text-sm">Planning Applications</Label>
                  <Switch
                    id="planning"
                    checked={layers.planning}
                    onCheckedChange={() => toggleLayer('planning')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="transport" className="text-sm">Transport</Label>
                  <Switch
                    id="transport"
                    checked={layers.transport}
                    onCheckedChange={() => toggleLayer('transport')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm">Search Radius: {filters.radius}m</Label>
                <Slider
                  value={[filters.radius]}
                  onValueChange={updateRadius}
                  max={2000}
                  min={250}
                  step={250}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-sm">Price Range</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <Label className="text-xs">Min</Label>
                    <p className="text-sm font-medium">{formatCurrency(filters.minPrice)}</p>
                  </div>
                  <div>
                    <Label className="text-xs">Max</Label>
                    <p className="text-sm font-medium">{formatCurrency(filters.maxPrice)}</p>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm">Sales Period: {filters.salesPeriod} months</Label>
                <Slider
                  value={[filters.salesPeriod]}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, salesPeriod: value[0] }))}
                  max={24}
                  min={3}
                  step={3}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {selectedProperty && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Selected Property
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium text-sm">{selectedProperty.address}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Price:</span>
                      <p className="font-medium">{formatCurrency(selectedProperty.price)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Per sqm:</span>
                      <p className="font-medium">{formatCurrency(selectedProperty.pricePerSqm)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Bedrooms:</span>
                      <p className="font-medium">{selectedProperty.bedrooms}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Bathrooms:</span>
                      <p className="font-medium">{selectedProperty.bathrooms}</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Badge variant="outline">{formatDate(selectedProperty.saleDate)}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Map Container */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Interactive Property Analysis Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                ref={mapContainer}
                className="w-full h-96 lg:h-[600px] rounded-lg"
                style={{ minHeight: '400px' }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}