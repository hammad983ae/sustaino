import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import DomainAPIClient, { createDebouncedSearch } from '@/utils/domainAPIClient';

interface PropertySuggestion {
  id: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  propertyType: string;
}

export const DomainPropertySearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<PropertySuggestion[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const apiClient = new DomainAPIClient();
  const debouncedSearch = createDebouncedSearch(apiClient);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm, (results) => {
        setSuggestions(results);
      });
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, debouncedSearch]);

  const handlePropertySelect = async (suggestion: PropertySuggestion) => {
    setLoading(true);
    try {
      const details = await apiClient.getPropertyDetails(suggestion.id);
      setSelectedProperty(details);
      toast({
        title: "Property Details Loaded",
        description: `Loaded details for ${suggestion.address}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load property details",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Domain Property Search</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Start typing an address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          
          {suggestions.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-accent"
                  onClick={() => handlePropertySelect(suggestion)}
                >
                  <div className="font-medium">{suggestion.address}</div>
                  <div className="text-sm text-muted-foreground">
                    {suggestion.suburb}, {suggestion.state} {suggestion.postcode}
                  </div>
                  <Badge variant="secondary">{suggestion.propertyType}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedProperty && (
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-sm bg-muted p-4 rounded-lg overflow-auto">
              {JSON.stringify(selectedProperty, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};