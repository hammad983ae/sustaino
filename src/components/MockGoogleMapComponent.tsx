import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Satellite, Map as MapIcon } from 'lucide-react';

interface MockGoogleMapComponentProps {
  height?: string;
  className?: string;
}

const MockGoogleMapComponent: React.FC<MockGoogleMapComponentProps> = ({ 
  height = "400px", 
  className = "" 
}) => {
  const [searchAddress, setSearchAddress] = useState('');
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (searchAddress.trim()) {
      setHasSearched(true);
    }
  };

  const toggleMapType = () => {
    setMapType(mapType === 'roadmap' ? 'satellite' : 'roadmap');
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
          <CardTitle className="text-lg">Property Location Map</CardTitle>
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
            onClick={() => setMapType('roadmap')}
            className="gap-1"
          >
            <MapIcon className="h-3 w-3" />
            Map
          </Button>
          <Button 
            variant={mapType === 'satellite' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setMapType('satellite')}
            className="gap-1"
          >
            <Satellite className="h-3 w-3" />
            Satellite
          </Button>
        </div>
        
        {/* Mock Map Display */}
        <div 
          style={{ height, width: '100%' }}
          className="rounded-lg border bg-gradient-to-br from-primary/10 to-secondary/20 flex flex-col items-center justify-center relative overflow-hidden"
        >
          {/* Mock Map Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`border border-muted ${mapType === 'satellite' 
                    ? 'bg-green-800/30' 
                    : 'bg-background/50'
                  }`} 
                />
              ))}
            </div>
          </div>
          
          {/* Mock Map Content */}
          <div className="relative z-10 text-center">
            {hasSearched ? (
              <div className="space-y-3">
                <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto shadow-lg">
                  <MapPin className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
                  <p className="font-medium">{searchAddress}</p>
                  <p className="text-sm text-muted-foreground">
                    {mapType === 'satellite' ? 'Satellite View' : 'Street Map View'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="font-medium">Search for a property address</p>
                <p className="text-sm">Enter an address above to view the location</p>
              </div>
            )}
          </div>

          {/* Mock Street Lines */}
          {hasSearched && mapType === 'roadmap' && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted opacity-60" />
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-muted opacity-60" />
            </div>
          )}
        </div>

        {/* Current Location Info */}
        {hasSearched && searchAddress && (
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

export default MockGoogleMapComponent;