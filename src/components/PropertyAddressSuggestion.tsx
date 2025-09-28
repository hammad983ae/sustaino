import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api';

interface AddressComponent {
  unitNumber: string;
  streetNumber: string;
  streetName: string;
  streetType: string;
  streetTypeLong: string;
  suburb: string;
  postcode: string;
  state: string;
}

interface PropertySuggestion {
  id: string;
  address: string;
  addressComponents: AddressComponent;
  relativeScore: number;
  normalized: {
    unitNumber: string;
    streetNumber: string;
    streetName: string;
    streetType: string;
    streetTypeLong: string;
    suburb: string;
    postcode: string;
    state: string;
    fullAddress: string;
  };
}

interface PropertyAddressSuggestionProps {
  value?: string;
  onChange: (value: string) => void;
  onSelect: (property: PropertySuggestion) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const PropertyAddressSuggestion: React.FC<PropertyAddressSuggestionProps> = ({
  value = '',
  onChange,
  onSelect,
  placeholder = 'Enter property address...',
  className = '',
  disabled = false
}) => {
  const [suggestions, setSuggestions] = useState<PropertySuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Debounced search function
  const searchProperties = async (searchTerm: string) => {
    if (searchTerm.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await apiClient.suggestProperties(searchTerm, { pageSize: 10 });
      
      if (data.success) {
        setSuggestions(data.data.suggestions);
        setShowSuggestions(true);
        setSelectedIndex(-1);
      } else {
        throw new Error(data.message || 'Failed to fetch suggestions');
      }
    } catch (err) {
      console.error('Property suggestion error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch suggestions');
      setSuggestions([]);
      setShowSuggestions(false);
      
      toast({
        title: "Error",
        description: "Failed to fetch property suggestions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change with debouncing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    // Clear previous timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer
    const timer = setTimeout(() => {
      searchProperties(newValue);
    }, 300);

    setDebounceTimer(timer);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: PropertySuggestion) => {
    onChange(suggestion.address);
    onSelect(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    
    toast({
      title: "Property Selected",
      description: `Selected: ${suggestion.address}`,
    });
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  // Format address for display
  const formatAddress = (suggestion: PropertySuggestion) => {
    const { addressComponents } = suggestion;
    const parts = [];
    
    if (addressComponents.unitNumber) {
      parts.push(`Unit ${addressComponents.unitNumber}`);
    }
    
    parts.push(
      `${addressComponents.streetNumber} ${addressComponents.streetName} ${addressComponents.streetType}`
    );
    parts.push(
      `${addressComponents.suburb} ${addressComponents.state} ${addressComponents.postcode}`
    );
    
    return parts.join(', ');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          className="pr-10"
        />
        
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
        
        {error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="h-4 w-4 text-destructive" />
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <Card 
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto shadow-lg border"
        >
          <CardContent className="p-0">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.id}
                className={`p-3 cursor-pointer border-b last:border-b-0 transition-colors ${
                  index === selectedIndex
                    ? 'bg-primary/10 border-primary/20'
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => handleSuggestionSelect(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">
                      {formatAddress(suggestion)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {suggestion.addressComponents.suburb}, {suggestion.addressComponents.state} {suggestion.addressComponents.postcode}
                    </div>
                    {suggestion.relativeScore > 80 && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        High Match
                      </Badge>
                    )}
                  </div>
                  {index === selectedIndex && (
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="text-xs text-destructive mt-1 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </div>
      )}
    </div>
  );
};

export default PropertyAddressSuggestion;
