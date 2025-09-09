import React, { useEffect, useRef, useState } from 'react';
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
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchAddress, setSearchAddress] = useState('');
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [isInitialized, setIsInitialized] = useState(false);
  const { addressData, updateAddressData, getFormattedAddress } = useProperty();

  useEffect(() => {
    // Auto-populate search address from context
    const fullAddress = getFormattedAddress();
    if (fullAddress && fullAddress !== searchAddress) {
      setSearchAddress(fullAddress);
    }
  }, [addressData, getFormattedAddress]);

  useEffect(() => {
    let isMounted = true;
    let initializationPromise: Promise<void> | null = null;
    
    const initializeMap = async () => {
      // Prevent multiple initializations
      if (isInitialized || !isMounted || initializationPromise) return;
      
      initializationPromise = (async () => {
        try {
          setIsInitialized(true);
          
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
          
          if (!isMounted || !mapRef.current) return;
          
          setIsLoaded(true);

          // Clear any existing content and create a fresh div for Google Maps
          const mapContainer = mapRef.current;
          mapContainer.innerHTML = '';
          
          const googleMapDiv = document.createElement('div');
          googleMapDiv.style.width = '100%';
          googleMapDiv.style.height = '100%';
          googleMapDiv.style.borderRadius = '0.5rem';
          mapContainer.appendChild(googleMapDiv);

          // Initialize map on the fresh div
          mapInstanceRef.current = new google.maps.Map(googleMapDiv, {
            center: { lat: -25.2744, lng: 133.7751 }, // Australia center
            zoom: 6,
            mapTypeId: mapType,
            zoomControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            mapTypeControl: false
          });

          // Search for address if available
          if (searchAddress && isMounted) {
            searchAddressOnMap(searchAddress);
          }
        } catch (error) {
          console.error('Error loading Google Maps:', error);
        }
      })();
      
      await initializationPromise;
    };

    // Use a timeout to ensure DOM is ready
    const timeoutId = setTimeout(initializeMap, 100);
    
    // Cleanup function
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      
      if (markerRef.current) {
        try {
          markerRef.current.setMap(null);
        } catch (e) {
          // Ignore cleanup errors
        }
        markerRef.current = null;
      }
      
      // Clear map instance reference
      mapInstanceRef.current = null;
      setIsLoaded(false);
      setIsInitialized(false);
    };
  }, []);

  const searchAddressOnMap = async (address: string) => {
    if (!mapInstanceRef.current || !isLoaded) return;

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
            // Ignore cleanup errors
          }
          markerRef.current = null;
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
          <Button onClick={handleSearch} className="gap-1">
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
          >
            <MapIcon className="h-3 w-3" />
            Map
          </Button>
          <Button 
            variant={mapType === 'satellite' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => mapType !== 'satellite' && toggleMapType()}
            className="gap-1"
          >
            <Satellite className="h-3 w-3" />
            Satellite
          </Button>
        </div>
        
        {/* Map Container */}
        <div 
          ref={mapRef} 
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