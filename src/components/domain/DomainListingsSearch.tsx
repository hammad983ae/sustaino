import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import DomainAPIClient from '@/utils/domainAPIClient';

export const DomainListingsSearch: React.FC = () => {
  const [listingType, setListingType] = useState<'residential' | 'commercial'>('residential');
  const [searchCriteria, setSearchCriteria] = useState({
    suburb: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: ''
  });
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const apiClient = new DomainAPIClient();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const criteria = {
        ...searchCriteria,
        minPrice: searchCriteria.minPrice ? parseInt(searchCriteria.minPrice) : undefined,
        maxPrice: searchCriteria.maxPrice ? parseInt(searchCriteria.maxPrice) : undefined,
        bedrooms: searchCriteria.bedrooms ? parseInt(searchCriteria.bedrooms) : undefined,
        bathrooms: searchCriteria.bathrooms ? parseInt(searchCriteria.bathrooms) : undefined
      };

      let searchResults;
      if (listingType === 'residential') {
        searchResults = await apiClient.searchResidentialListings(criteria);
      } else {
        searchResults = await apiClient.searchCommercialListings(criteria);
      }

      setResults(searchResults.data || []);
      toast({
        title: "Search Complete",
        description: `Found ${searchResults.data?.length || 0} listings`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Search Failed",
        description: "Unable to fetch listings",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToEvidence = async (listing: any, type: 'sales' | 'leasing') => {
    try {
      if (type === 'sales') {
        await apiClient.saveSalesEvidence({
          property_address: listing.address,
          sale_price: listing.price,
          property_type: listing.propertyType,
          bedrooms: listing.bedrooms,
          bathrooms: listing.bathrooms,
          suburb: listing.suburb,
          state: listing.state,
          postcode: listing.postcode,
          source_url: listing.url,
          notes: `Imported from Domain API - ${new Date().toLocaleDateString()}`
        });
      } else {
        await apiClient.saveLeasingEvidence({
          property_address: listing.address,
          rental_amount: listing.rent || listing.price || 0,
          property_type: listing.propertyType,
          bedrooms: listing.bedrooms,
          bathrooms: listing.bathrooms,
          suburb: listing.suburb,
          state: listing.state,
          postcode: listing.postcode,
          source_url: listing.url,
          notes: `Imported from Domain API - ${new Date().toLocaleDateString()}`
        });
      }
      
      toast({
        title: "Evidence saved",
        description: `Listing saved to ${type} evidence database`,
      });
    } catch (error: any) {
      console.error('Failed to save evidence:', error);
      toast({
        title: "Save failed",
        description: "Failed to save to evidence database",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Domain Listings Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Listing Type</Label>
            <Select value={listingType} onValueChange={(value: 'residential' | 'commercial') => setListingType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Suburb</Label>
              <Input
                value={searchCriteria.suburb}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, suburb: e.target.value }))}
                placeholder="Enter suburb"
              />
            </div>
            <div>
              <Label>Property Type</Label>
              <Input
                value={searchCriteria.propertyType}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, propertyType: e.target.value }))}
                placeholder="House, Unit, Apartment..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Min Price</Label>
              <Input
                type="number"
                value={searchCriteria.minPrice}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, minPrice: e.target.value }))}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Max Price</Label>
              <Input
                type="number"
                value={searchCriteria.maxPrice}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, maxPrice: e.target.value }))}
                placeholder="1000000"
              />
            </div>
          </div>

          {listingType === 'residential' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Bedrooms</Label>
                <Input
                  type="number"
                  value={searchCriteria.bedrooms}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, bedrooms: e.target.value }))}
                  placeholder="Any"
                />
              </div>
              <div>
                <Label>Bathrooms</Label>
                <Input
                  type="number"
                  value={searchCriteria.bathrooms}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, bathrooms: e.target.value }))}
                  placeholder="Any"
                />
              </div>
            </div>
          )}

          <Button onClick={handleSearch} disabled={loading} className="w-full">
            {loading ? 'Searching...' : 'Search Listings'}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results ({results.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {results.map((listing, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="font-medium">{listing.address}</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {listing.suburb}, {listing.state} {listing.postcode}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">${listing.price?.toLocaleString() || 'Price on application'}</span>
                    <span className="text-sm">{listing.propertyType}</span>
                  </div>
                  {listing.bedrooms && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {listing.bedrooms} bed, {listing.bathrooms} bath
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSaveToEvidence(listing, 'sales')}
                    >
                      Save to Sales Evidence
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSaveToEvidence(listing, 'leasing')}
                    >
                      Save to Leasing Evidence
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};