import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useProperty } from "@/contexts/PropertyContext";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Search } from "lucide-react";

const PropertyAddressForm = () => {
  const { addressData, updateAddressData, getFormattedAddress } = useProperty();
  const autocompleteRef = useRef<HTMLInputElement>(null);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);

  // Initialize Google Places API
  useEffect(() => {
    const initGooglePlaces = async () => {
      try {
        // Get API key from edge function
        const { data: apiKeyData, error } = await supabase.functions.invoke('get-google-maps-key');
        if (error || !apiKeyData?.apiKey) {
          console.error('Failed to get Google Maps API key:', error);
          return;
        }

        // Load Google Maps API if not already loaded
        if (!window.google) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKeyData.apiKey}&libraries=places`;
          script.async = true;
          script.defer = true;
          script.onload = () => {
            setIsGoogleLoaded(true);
            initServices();
          };
          document.head.appendChild(script);
        } else {
          setIsGoogleLoaded(true);
          initServices();
        }
      } catch (error) {
        console.error('Error initializing Google Places:', error);
      }
    };

    const initServices = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
        
        // Create a dummy map for PlacesService (required)
        const map = new window.google.maps.Map(document.createElement('div'));
        placesServiceRef.current = new window.google.maps.places.PlacesService(map);
      }
    };

    initGooglePlaces();
  }, []);

  const handleAddressSearch = async (value: string) => {
    updateAddressData({ propertyAddress: value });
    
    if (!autocompleteServiceRef.current || !value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const request = {
        input: value,
        componentRestrictions: { country: 'au' }, // Restrict to Australia
        types: ['address']
      };

      autocompleteServiceRef.current.getPlacePredictions(request, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSuggestions(predictions.slice(0, 5)); // Show top 5 suggestions
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      });
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
    }
  };

  const handleSuggestionSelect = (prediction: google.maps.places.AutocompletePrediction) => {
    if (!placesServiceRef.current) return;

    const request = {
      placeId: prediction.place_id,
      fields: ['formatted_address', 'address_components', 'geometry']
    };

    placesServiceRef.current.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
        // Parse address components
        const components = place.address_components || [];
        const addressData: any = {
          propertyAddress: place.formatted_address || prediction.description
        };

        components.forEach((component) => {
          const types = component.types;
          if (types.includes('street_number')) {
            addressData.streetNumber = component.long_name;
          } else if (types.includes('route')) {
            addressData.streetName = component.long_name;
            addressData.streetType = component.short_name.split(' ').pop() || '';
          } else if (types.includes('locality')) {
            addressData.suburb = component.long_name;
          } else if (types.includes('administrative_area_level_1')) {
            addressData.state = component.short_name;
          } else if (types.includes('postal_code')) {
            addressData.postcode = component.long_name;
          } else if (types.includes('country')) {
            addressData.country = component.long_name;
          }
        });

        updateAddressData(addressData);
        setShowSuggestions(false);
      }
    });
  };

  const handleGenerateAddress = () => {
    const formatted = getFormattedAddress();
    updateAddressData({ propertyAddress: formatted });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Property Valuation and ESG Assessment Report</CardTitle>
        <p className="text-sm text-muted-foreground">Find and configure address to begin your valuation report</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Property Address Section with Google Places Autocomplete */}
        <div className="space-y-4">
          <div className="relative">
            <Label htmlFor="property-address" className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Property Address
              {isGoogleLoaded && (
                <span className="text-xs text-success bg-success/10 px-2 py-1 rounded">
                  Address Identifier Active
                </span>
              )}
            </Label>
            <div className="relative">
              <Input 
                ref={autocompleteRef}
                id="property-address"
                placeholder="Start typing an Australian address..."
                className="mt-1 pr-10"
                value={addressData.propertyAddress}
                onChange={(e) => handleAddressSearch(e.target.value)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onFocus={() => addressData.propertyAddress && suggestions.length > 0 && setShowSuggestions(true)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            
            {/* Address Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.place_id}
                    className="w-full text-left px-4 py-3 hover:bg-accent hover:text-accent-foreground border-b border-border last:border-b-0 text-sm"
                    onClick={() => handleSuggestionSelect(suggestion)}
                    type="button"
                  >
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{suggestion.structured_formatting.main_text}</div>
                        <div className="text-muted-foreground text-xs">{suggestion.structured_formatting.secondary_text}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Quick Address Entry Section */}
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Quick Address Entry</Label>
            <p className="text-xs text-muted-foreground mt-1">Enter property address to begin your valuation report.</p>
          </div>

          {/* First Row - Lot Number and Plan Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lot-number" className="text-sm">Lot Number</Label>
              <Input 
                id="lot-number"
                placeholder="Lot number"
                className="mt-1"
                value={addressData.lotNumber}
                onChange={(e) => updateAddressData({ lotNumber: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="plan-number" className="text-sm">Plan Number</Label>
              <Input 
                id="plan-number"
                placeholder="Plan number"
                className="mt-1"
                value={addressData.planNumber}
                onChange={(e) => updateAddressData({ planNumber: e.target.value })}
              />
            </div>
          </div>

          {/* Second Row - Unit Number, Street Number, Street Name, Street Type */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="unit-number" className="text-sm">Unit Number</Label>
              <Input 
                id="unit-number"
                placeholder="Unit"
                className="mt-1"
                value={addressData.unitNumber}
                onChange={(e) => updateAddressData({ unitNumber: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="street-number" className="text-sm">Street Number</Label>
              <Input 
                id="street-number"
                placeholder="Street number"
                className="mt-1"
                value={addressData.streetNumber}
                onChange={(e) => updateAddressData({ streetNumber: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="street-name" className="text-sm">Street Name</Label>
              <Input 
                id="street-name"
                placeholder="Street name"
                className="mt-1"
                value={addressData.streetName}
                onChange={(e) => updateAddressData({ streetName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="street-type" className="text-sm">Street Type</Label>
              <Select value={addressData.streetType} onValueChange={(value) => updateAddressData({ streetType: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select street type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="street">Street</SelectItem>
                  <SelectItem value="avenue">Avenue</SelectItem>
                  <SelectItem value="road">Road</SelectItem>
                  <SelectItem value="lane">Lane</SelectItem>
                  <SelectItem value="drive">Drive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Third Row - State, Postcode, Country */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="state" className="text-sm">State</Label>
            <Select value={addressData.state} onValueChange={(value) => updateAddressData({ state: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nsw">NSW</SelectItem>
                  <SelectItem value="vic">VIC</SelectItem>
                  <SelectItem value="qld">QLD</SelectItem>
                  <SelectItem value="wa">WA</SelectItem>
                  <SelectItem value="sa">SA</SelectItem>
                  <SelectItem value="tas">TAS</SelectItem>
                  <SelectItem value="act">ACT</SelectItem>
                  <SelectItem value="nt">NT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="postcode" className="text-sm">Postcode</Label>
              <Input 
                id="postcode"
                placeholder="Postcode"
                className="mt-1"
                value={addressData.postcode}
                onChange={(e) => updateAddressData({ postcode: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="country" className="text-sm">Country</Label>
              <Input 
                id="country"
                value={addressData.country}
                onChange={(e) => updateAddressData({ country: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          {/* Generate Address Button */}
          <div className="flex justify-end pt-4">
            <Button 
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6"
              onClick={handleGenerateAddress}
            >
              Generate Address
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyAddressForm;