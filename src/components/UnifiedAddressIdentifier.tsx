import React, { useState, useEffect, useCallback } from 'react';
import { Search, MapPin, Building, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useProperty } from '@/contexts/PropertyContext';

interface UnifiedAddressIdentifierProps {
  onAddressIdentified?: (addressData: any) => void;
  onIntegrationData?: (data: any) => void;
  initialAddress?: string;
  showIntegrations?: boolean;
  className?: string;
}

interface AddressSuggestion {
  address: string;
  confidence: number;
  source: string;
  details?: any;
}

interface IntegrationStatus {
  rpData: 'idle' | 'loading' | 'success' | 'error';
  vicPlan: 'idle' | 'loading' | 'success' | 'error';
  googleMaps: 'idle' | 'loading' | 'success' | 'error';
  enhanced: 'idle' | 'loading' | 'success' | 'error';
}

export const UnifiedAddressIdentifier: React.FC<UnifiedAddressIdentifierProps> = ({
  onAddressIdentified,
  onIntegrationData,
  initialAddress = '',
  showIntegrations = true,
  className = ''
}) => {
  const { toast } = useToast();
  const { addressData, updateAddressData } = useProperty();
  
  const [address, setAddress] = useState(initialAddress);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [integrationStatus, setIntegrationStatus] = useState<IntegrationStatus>({
    rpData: 'idle',
    vicPlan: 'idle',
    googleMaps: 'idle',
    enhanced: 'idle'
  });
  const [integrationData, setIntegrationData] = useState<any>({});

  // Update address when addressData changes
  useEffect(() => {
    if (addressData && addressData.propertyAddress) {
      setAddress(addressData.propertyAddress);
    }
  }, [addressData]);

  // Debounced address search
  const searchAddresses = useCallback(async (searchTerm: string) => {
    if (!searchTerm || searchTerm.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      // Search multiple sources for address suggestions
      const [rpDataResult, enhancedResult] = await Promise.allSettled([
        supabase.functions.invoke('rp-data-search', {
          body: { query: searchTerm, type: 'address' }
        }),
        supabase.functions.invoke('enhanced-property-analysis', {
          body: { address: searchTerm, quick: true }
        })
      ]);

      const newSuggestions: AddressSuggestion[] = [];

      // Process RP Data results
      if (rpDataResult.status === 'fulfilled' && rpDataResult.value.data) {
        const rpSuggestions = rpDataResult.value.data.suggestions || [];
        rpSuggestions.forEach((suggestion: any) => {
          newSuggestions.push({
            address: suggestion.address || suggestion.formatted_address,
            confidence: suggestion.confidence || 0.8,
            source: 'RP Data',
            details: suggestion
          });
        });
      }

      // Process Enhanced Analysis results
      if (enhancedResult.status === 'fulfilled' && enhancedResult.value.data) {
        const enhanced = enhancedResult.value.data;
        if (enhanced.geolocation?.formatted_address) {
          newSuggestions.push({
            address: enhanced.geolocation.formatted_address,
            confidence: 0.9,
            source: 'Google Maps',
            details: enhanced
          });
        }
      }

      // Remove duplicates and sort by confidence
      const uniqueSuggestions = newSuggestions.reduce((acc, current) => {
        const exists = acc.find(item => item.address.toLowerCase() === current.address.toLowerCase());
        if (!exists) {
          acc.push(current);
        }
        return acc;
      }, [] as AddressSuggestion[]);

      setSuggestions(uniqueSuggestions.sort((a, b) => b.confidence - a.confidence));
    } catch (error) {
      console.error('Error searching addresses:', error);
      toast({
        title: "Search Error",
        description: "Failed to search for addresses. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  }, [toast]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchAddresses(address);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [address, searchAddresses]);

  const handleAddressSelect = async (suggestion: AddressSuggestion) => {
    setAddress(suggestion.address);
    setSuggestions([]);
    
    // Update property context
    updateAddressData({ propertyAddress: suggestion.address });
    
    // Notify parent component
    if (onAddressIdentified) {
      onAddressIdentified({
        address: suggestion.address,
        source: suggestion.source,
        details: suggestion.details
      });
    }

    // If integrations are enabled, fetch additional data
    if (showIntegrations) {
      await fetchIntegrationData(suggestion.address);
    }
  };

  const fetchIntegrationData = async (selectedAddress: string) => {
    const newData: any = {};
    
    // Update all statuses to loading
    setIntegrationStatus({
      rpData: 'loading',
      vicPlan: 'loading', 
      googleMaps: 'loading',
      enhanced: 'loading'
    });

    // Parallel fetch from all integrations
    const integrationPromises = [
      // RP Data
      supabase.functions.invoke('rp-data-search', {
        body: { query: selectedAddress, detailed: true }
      }).then(result => ({ type: 'rpData', result })),

      // Enhanced Property Analysis
      supabase.functions.invoke('enhanced-property-analysis', {
        body: { address: selectedAddress }
      }).then(result => ({ type: 'enhanced', result })),

      // VicPlan Integration
      supabase.functions.invoke('vicplan-integration', {
        body: { address: selectedAddress }
      }).then(result => ({ type: 'vicPlan', result })),

      // Property Risk Assessment
      supabase.functions.invoke('property-risk-assessment', {
        body: { address: selectedAddress }
      }).then(result => ({ type: 'googleMaps', result }))
    ];

    // Process results as they come in
    const results = await Promise.allSettled(integrationPromises);
    
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const { type, result: apiResult } = result.value;
        
        if (apiResult.data && !apiResult.error) {
          newData[type] = apiResult.data;
          setIntegrationStatus(prev => ({ ...prev, [type]: 'success' }));
        } else {
          setIntegrationStatus(prev => ({ ...prev, [type]: 'error' }));
        }
      } else {
        const integrationTypes = ['rpData', 'enhanced', 'vicPlan', 'googleMaps'];
        setIntegrationStatus(prev => ({ ...prev, [integrationTypes[index]]: 'error' }));
      }
    });

    setIntegrationData(newData);
    
    if (onIntegrationData) {
      onIntegrationData(newData);
    }

    // Show completion notification
    const successCount = Object.values(integrationStatus).filter(status => status === 'success').length;
    toast({
      title: "Integration Data Fetched",
      description: `Successfully loaded data from ${successCount} sources`,
    });
  };

  const renderIntegrationStatus = () => {
    if (!showIntegrations) return null;

    return (
      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Integration Status</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(integrationStatus).map(([key, status]) => (
            <div key={key} className="flex items-center gap-2">
              {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin text-warning" />}
              {status === 'success' && <CheckCircle className="h-4 w-4 text-success" />}
              {status === 'error' && <AlertCircle className="h-4 w-4 text-destructive" />}
              {status === 'idle' && <div className="h-4 w-4 rounded-full bg-muted" />}
              <span className="text-sm capitalize">
                {key === 'rpData' ? 'RP Data' : 
                 key === 'vicPlan' ? 'VicPlan' :
                 key === 'googleMaps' ? 'Risk Assessment' : 'Enhanced Analysis'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className={`p-4 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Building className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Property Address Identifier</h3>
        </div>

        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Start typing a property address..."
              className="pl-10"
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
            )}
          </div>

          {suggestions.length > 0 && (
            <Card className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto">
              <div className="p-2 space-y-1">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => handleAddressSelect(suggestion)}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{suggestion.address}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {suggestion.source}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {Math.round(suggestion.confidence * 100)}% match
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {renderIntegrationStatus()}

        {Object.keys(integrationData).length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Available Data</h4>
            <div className="flex flex-wrap gap-2">
              {Object.keys(integrationData).map((key) => (
                <Badge key={key} variant="outline">
                  {key === 'rpData' ? 'RP Data' : 
                   key === 'vicPlan' ? 'VicPlan' :
                   key === 'googleMaps' ? 'Risk Data' : 'Enhanced Analysis'}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};