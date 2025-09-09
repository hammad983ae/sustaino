import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const markerRef = useRef<google.maps.Marker | null>(null);
  const initializationRef = useRef<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchAddress, setSearchAddress] = useState('');
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const { addressData, updateAddressData, getFormattedAddress } = useProperty();

  // Auto-populate search address from context
  useEffect(() => {
    const fullAddress = getFormattedAddress();
    if (fullAddress && fullAddress !== searchAddress) {
      setSearchAddress(fullAddress);
    }
  }, [addressData, getFormattedAddress]);

  // Initialize Google Maps
  useEffect(() => {
    let isMounted = true;
    
    const initializeMap = async () => {
      // Prevent multiple initializations
      if (initializationRef.current || !isMounted || !mapContainerRef.current) {
        return;
      }
      
      initializationRef.current = true;
      
      try {
        console.log('Initializing Google Maps...');
        
        // Get API key from Supabase function
        const { data: apiKeyData, error } = await supabase.functions.invoke('get-google-maps-key');
        
        if (error || !apiKeyData?.apiKey) {
          console.error('Error fetching Google Maps API key:', error);
          return;
        }

        if (!isMounted) return;

        const loader = new Loader({
          apiKey: apiKeyData.apiKey,
          version: 'weekly',
          libraries: ['places', 'geometry']
        });

        await loader.load();
        
        if (!isMounted || !mapContainerRef.current) return;
        
        setIsLoaded(true);

        // Initialize map directly on the container
        mapInstanceRef.current = new google.maps.Map(mapContainerRef.current, {
          center: { lat: -25.2744, lng: 133.7751 }, // Australia center
          zoom: 6,
          mapTypeId: mapType,
          zoomControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          mapTypeControl: false
        });

        console.log('Google Maps initialized successfully');

        // Search for address if available
        if (searchAddress && isMounted) {
          searchAddressOnMap(searchAddress);
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setIsLoaded(false);
        initializationRef.current = false;
      }
    };

    // Delay initialization to ensure DOM is ready
    const timeoutId = setTimeout(initializeMap, 100);
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      
      // Clean up marker
      if (markerRef.current) {
        try {
          markerRef.current.setMap(null);
        } catch (e) {
          console.log('Marker cleanup error (ignored):', e);
        }
        markerRef.current = null;
      }
      
      // Clear map instance
      mapInstanceRef.current = null;
      initializationRef.current = false;
      setIsLoaded(false);
    };
  }, []);

  const searchAddressOnMap = async (address: string) => {
    if (!mapInstanceRef.current || !isLoaded) {
      console.log('Map not ready for search');
      return;
    }

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

      if (results && results[0]) {
        const location = results[0].geometry.location;
        
        // Center map on the location
        mapInstanceRef.current.setCenter(location);
        mapInstanceRef.current.setZoom(17);

        // Remove existing marker safely
        if (markerRef.current) {
          try {
            markerRef.current.setMap(null);
          } catch (e) {
            console.log('Previous marker cleanup error (ignored):', e);
          }
        }

        // Add new marker
        markerRef.current = new google.maps.Marker({
          position: location,
          map: mapInstanceRef.current,
          title: address,
          animation: google.maps.Animation.DROP
        });

        // Update property context with geocoded address
        const formattedAddress = results[0].formatted_address;
        updateAddressData({ propertyAddress: formattedAddress });
        
        console.log('Address geocoded successfully:', formattedAddress);
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
    }
  };

  const handleSearch = () => {
    if (searchAddress.trim()) {
      searchAddressOnMap(searchAddress);
    }
  };

  const toggleMapType = () => {
    const newMapType = mapType === 'roadmap' ? 'satellite' : 'roadmap';
    setMapType(newMapType);
    
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setMapTypeId(newMapType);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(e.target.value);
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
            onChange={handleAddressChange}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSearch} className="gap-1" disabled={!isLoaded}>
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
            disabled={!isLoaded}
          >
            <MapIcon className="h-3 w-3" />
            Map
          </Button>
          <Button 
            variant={mapType === 'satellite' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => mapType !== 'satellite' && toggleMapType()}
            className="gap-1"
            disabled={!isLoaded}
          >
            <Satellite className="h-3 w-3" />
            Satellite
          </Button>
        </div>
        
        {/* Map Container - React will never manipulate the contents */}
        <div 
          ref={mapContainerRef} 
          style={{ height, width: '100%' }}
          className="rounded-lg border bg-muted flex items-center justify-center"
        >
          {!isLoaded && (
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