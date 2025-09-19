import React, { useEffect, useRef, useState } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface GoogleLocationMapProps {
  address: string;
  className?: string;
  height?: string;
}

const GoogleLocationMap: React.FC<GoogleLocationMapProps> = ({ 
  address, 
  className = "",
  height = "200px" 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        // Check if Google Maps is already loaded
        if (typeof window.google !== 'undefined') {
          initMap();
          return;
        }

        // Get API key from Supabase edge function
        const response = await fetch('/functions/v1/get-google-maps-key', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to get Google Maps API key');
        }

        const { apiKey } = await response.json();

        // Load Google Maps script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        script.onerror = () => setError('Failed to load Google Maps');
        
        document.head.appendChild(script);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load map');
      }
    };

    const initMap = () => {
      if (!mapRef.current || !address) return;

      const geocoder = new window.google.maps.Geocoder();
      
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const map = new window.google.maps.Map(mapRef.current!, {
            zoom: 15,
            center: results[0].geometry.location,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          });

          new window.google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            title: address,
          });

          setMapLoaded(true);
        } else {
          setError('Could not locate address on map');
        }
      });
    };

    if (address) {
      loadGoogleMaps();
    }
  }, [address]);

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!address) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">No address provided</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-0">
        {!mapLoaded && (
          <div className="flex items-center justify-center p-4" style={{ height }}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 animate-pulse" />
              <span className="text-sm">Loading map...</span>
            </div>
          </div>
        )}
        <div 
          ref={mapRef} 
          style={{ height, display: mapLoaded ? 'block' : 'none' }}
          className="rounded-lg"
        />
      </CardContent>
    </Card>
  );
};

export default GoogleLocationMap;