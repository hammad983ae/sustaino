import React, { useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, Search } from 'lucide-react';
import { createDebouncedSearch } from '@/utils/domainAPIClient';
import DomainAPIClient from '@/utils/domainAPIClient';

interface PropertySuggestion {
  id: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  propertyType: string;
  unitNumber?: string;
  streetNumber?: string;
  streetName?: string;
  streetType?: string;
}

interface PropertyDetails {
  id: string;
  address: {
    displayAddress: string;
    unitNumber?: string;
    streetNumber: string;
    streetName: string;
    streetType: string;
    suburb: string;
    state: string;
    postcode: string;
  };
  propertyType: string;
  features: {
    bedrooms?: number;
    bathrooms?: number;
    parkingSpaces?: number;
    landSize?: number;
    buildingSize?: number;
    yearBuilt?: number;
  };
  estimates?: {
    currentValue?: number;
    confidenceLevel?: string;
    valuationRange?: {
      min: number;
      max: number;
    };
    lastUpdated?: string;
  };
  salesHistory?: Array<{
    date: string;
    price: number;
    propertyType: string;
    source: string;
  }>;
}

interface DomainAddressLookupProps {
  value: string;
  onChange: (address: string) => void;
  onPropertySelected?: (propertyData: PropertyDetails) => void;
  placeholder?: string;
  label?: string;
}

const DomainAddressLookup: React.FC<DomainAddressLookupProps> = ({
  value,
  onChange,
  onPropertySelected,
  placeholder = "Start typing an address...",
  label = "Property Address"
}) => {
  const [suggestions, setSuggestions] = useState<PropertySuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const apiClient = new DomainAPIClient();
  const debouncedSearch = createDebouncedSearch(apiClient, 500);

  const searchProperties = useCallback(async (searchTerm: string) => {
    if (searchTerm.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await apiClient.getPropertySuggestions(searchTerm);
      
      if (response?.suggestions) {
        setSuggestions(response.suggestions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Error searching properties:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsSearching(false);
    }
  }, [apiClient]);

  const handleInputChange = (newValue: string) => {
    onChange(newValue);
    setSelectedProperty(null);
    debouncedSearch(newValue, searchProperties);
  };

  const handleSuggestionSelect = async (suggestion: PropertySuggestion) => {
    const fullAddress = `${suggestion.address}, ${suggestion.suburb} ${suggestion.state} ${suggestion.postcode}`;
    onChange(fullAddress);
    setShowSuggestions(false);
    setSuggestions([]);

    // Fetch detailed property information
    setIsLoadingDetails(true);
    try {
      const details = await apiClient.getPropertyDetails(suggestion.id);
      if (details) {
        setSelectedProperty(details);
        onPropertySelected?.(details);
      }
    } catch (error) {
      console.error('Error fetching property details:', error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleClearSelection = () => {
    onChange('');
    setSelectedProperty(null);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="address-lookup">{label}</Label>
      <div className="relative">
        <div className="relative">
          <Input
            id="address-lookup"
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholder}
            className="pr-10"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <Search className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto">
            <CardContent className="p-2">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-2 hover:bg-accent cursor-pointer rounded-md transition-colors"
                  onClick={() => handleSuggestionSelect(suggestion)}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-sm">
                        {suggestion.address}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {suggestion.suburb}, {suggestion.state} {suggestion.postcode}
                      </div>
                    </div>
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {suggestion.propertyType}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {isLoadingDetails && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading property details...
        </div>
      )}

      {selectedProperty && (
        <Card className="mt-3">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-sm">Property Details</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedProperty.address.displayAddress}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">
                    {selectedProperty.propertyType}
                  </Badge>
                  {selectedProperty.features.bedrooms && (
                    <Badge variant="outline">
                      {selectedProperty.features.bedrooms} bed
                    </Badge>
                  )}
                  {selectedProperty.features.bathrooms && (
                    <Badge variant="outline">
                      {selectedProperty.features.bathrooms} bath
                    </Badge>
                  )}
                  {selectedProperty.features.parkingSpaces && (
                    <Badge variant="outline">
                      {selectedProperty.features.parkingSpaces} car
                    </Badge>
                  )}
                </div>
                {selectedProperty.estimates?.currentValue && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">
                      Estimated Value: ${selectedProperty.estimates.currentValue.toLocaleString()}
                    </p>
                    {selectedProperty.estimates.confidenceLevel && (
                      <p className="text-xs text-muted-foreground">
                        Confidence: {selectedProperty.estimates.confidenceLevel}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSelection}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DomainAddressLookup;