import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Satellite, Map as MapIcon } from 'lucide-react';
import { useProperty } from '@/contexts/PropertyContext';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    google: typeof google;
  }
}

interface GoogleMapComponentProps {
  height?: string;
  className?: string;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ 
  height = "400px", 
  className = "" 
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerInstanceRef = useRef<google.maps.Marker | null>(null);
  const isInitializedRef = useRef(false);
  const [searchAddress, setSearchAddress] = useState('');
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMapReady, setIsMapReady] = useState(false);
  const { addressData, updateAddressData, getFormattedAddress } = useProperty();

  // Auto-populate search address from context
  useEffect(() => {
    const fullAddress = getFormattedAddress();
    if (fullAddress && fullAddress !== searchAddress) {
      setSearchAddress(fullAddress);
    }
  }, [addressData, getFormattedAddress, searchAddress]);

  // Map type change effect
  useEffect(() => {
    if (mapInstanceRef.current && isMapReady) {
      mapInstanceRef.current.setMapTypeId(mapType);
    }
  }, [mapType, isMapReady]);

  const searchOnMap = useCallback(async (address: string) => {
    if (!mapInstanceRef.current || !address.trim()) return;

    const geocoder = new google.maps.Geocoder();
    
    try {
      const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK' && results) {
            resolve(results);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        });
      });

      if (results?.[0] && mapInstanceRef.current) {
        const location = results[0].geometry.location;
        
        mapInstanceRef.current.setCenter(location);
        mapInstanceRef.current.setZoom(17);

        // Remove old marker
        if (markerInstanceRef.current) {
          markerInstanceRef.current.setMap(null);
        }

        // Add new marker
        markerInstanceRef.current = new google.maps.Marker({
          position: location,
          map: mapInstanceRef.current,
          title: address,
          animation: google.maps.Animation.DROP
        });

        updateAddressData({ propertyAddress: results[0].formatted_address });
        setError(null);
      }
    } catch (err) {
      console.error('Geocoding error:', err);
      setError('Failed to find address');
    }
  }, [updateAddressData]);

  // Cleanup function that can be called safely
  const cleanupMap = useCallback(() => {
    if (markerInstanceRef.current) {
      try {
        markerInstanceRef.current.setMap(null);
      } catch (e) {
        // Ignore cleanup errors
      }
      markerInstanceRef.current = null;
    }
    
    if (mapInstanceRef.current) {
      try {
        // Don't try to manipulate DOM, just clear the reference
        mapInstanceRef.current = null;
      } catch (e) {
        // Ignore cleanup errors
      }
    }
    
    // Clear the container by creating a new div inside it
    if (mapContainerRef.current && mapContainerRef.current.firstChild) {
      try {
        const newDiv = document.createElement('div');
        newDiv.style.width = '100%';
        newDiv.style.height = '100%';
        mapContainerRef.current.innerHTML = '';
        mapContainerRef.current.appendChild(newDiv);
      } catch (e) {
        // Ignore DOM manipulation errors
      }
    }
    
    setIsMapReady(false);
    isInitializedRef.current = false;
  }, []);

  // Use useLayoutEffect for cleanup to run before React commits DOM changes
  useLayoutEffect(() => {
    return () => {
      cleanupMap();
    };
  }, [cleanupMap]);

  // Initial map setup
  useEffect(() => {
    if (isInitializedRef.current) return;

    const initializeMap = async () => {
      if (!mapContainerRef.current || isInitializedRef.current) return;

      try {
        setIsLoading(true);
        setError(null);
        isInitializedRef.current = true;

        // Get API key
        const { data: apiKeyData, error } = await supabase.functions.invoke('get-google-maps-key');
        if (error) {
          console.warn('API key error:', error);
          // Use a fallback or continue without API key for development
          throw new Error('Google Maps API key not available');
        }
        
        if (!apiKeyData?.apiKey) {
          throw new Error('Google Maps API key not found');
        }

        if (!mapContainerRef.current) return;

        // Create a child div to isolate from React's DOM management
        const mapDiv = document.createElement('div');
        mapDiv.style.width = '100%';
        mapDiv.style.height = '100%';
        mapContainerRef.current.appendChild(mapDiv);

        // Load Google Maps
        const loader = new Loader({
          apiKey: apiKeyData.apiKey,
          version: 'weekly',
          libraries: ['places', 'geometry']
        });

        await loader.load();
        if (!mapDiv.parentElement) return;

        // Create map in the isolated div
        mapInstanceRef.current = new google.maps.Map(mapDiv, {
          center: { lat: -25.2744, lng: 133.7751 },
          zoom: 6,
          mapTypeId: mapType,
          zoomControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          mapTypeControl: false
        });

        setIsMapReady(true);
        setIsLoading(false);

      } catch (err) {
        console.error('Map initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load map');
        setIsLoading(false);
        isInitializedRef.current = false;
      }
    };

    initializeMap();
  }, []); // Only run once on mount

  // Search effect
  useEffect(() => {
    if (isMapReady && searchAddress && mapInstanceRef.current) {
      searchOnMap(searchAddress);
    }
  }, [isMapReady, searchAddress, searchOnMap]);

  const handleSearch = () => {
    if (searchAddress.trim() && isMapReady) {
      setError(null);
      searchOnMap(searchAddress);
    }
  };

  const toggleMapType = () => {
    setMapType(prev => prev === 'roadmap' ? 'satellite' : 'roadmap');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Google Maps - Property Location</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Controls */}
        <div className="flex gap-2">
          <Input
            placeholder="Enter property address..."
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSearch} className="gap-1" disabled={!isMapReady}>
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>

        {/* Map Type Controls */}
        <div className="flex gap-2">
          <Button 
            variant={mapType === 'roadmap' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => mapType !== 'roadmap' && toggleMapType()}
            className="gap-1"
            disabled={!isMapReady}
          >
            <MapIcon className="h-3 w-3" />
            Map
          </Button>
          <Button 
            variant={mapType === 'satellite' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => mapType !== 'satellite' && toggleMapType()}
            className="gap-1"
            disabled={!isMapReady}
          >
            <Satellite className="h-3 w-3" />
            Satellite
          </Button>
        </div>
        
        {/* Error Display */}
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
        
        {/* Map Container */}
        <div 
          ref={mapContainerRef} 
          style={{ height, width: '100%' }}
          className="rounded-lg border bg-muted flex items-center justify-center"
        >
          {isLoading && !error && (
            <div className="text-center text-muted-foreground">
              <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Loading Google Maps...</p>
            </div>
          )}
        </div>

        {/* Map Info */}
        {searchAddress && (
          <div className="p-3 bg-secondary/50 rounded-lg">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Current Location:</span>
              <span className="text-sm">{searchAddress}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoogleMapComponent;