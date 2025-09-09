import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface RPDataSearchProps {
  onDataSelected: (data: any) => void;
  searchType: 'sales' | 'rentals';
}

export default function RPDataSearch({ onDataSelected, searchType }: RPDataSearchProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [addressQuery, setAddressQuery] = useState('');
  const [lotNumber, setLotNumber] = useState('');
  const [planNumber, setPlanNumber] = useState('');
  const { toast } = useToast();

  const handleAddressSearch = async () => {
    if (!addressQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter an address to search",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('rp-data-search', {
        body: {
          searchType: searchType === 'sales' ? 'sales' : 'rentals',
          query: { address: addressQuery },
          filters: {
            limit: 20,
            sortBy: 'saleDate',
            sortOrder: 'desc'
          }
        }
      });

      if (error) throw error;

      if (data.success && data.data) {
        setSearchResults(data.data.results || []);
        toast({
          title: "Search completed",
          description: `Found ${data.data.results?.length || 0} ${searchType} records`,
        });
      } else {
        throw new Error(data.error || 'No results found');
      }
    } catch (error) {
      console.error('RP Data search error:', error);
      toast({
        title: "Search failed",
        description: error.message || "Failed to search RP Data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLotPlanSearch = async () => {
    if (!lotNumber.trim() || !planNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter both lot and plan numbers",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('rp-data-search', {
        body: {
          searchType: searchType === 'sales' ? 'sales' : 'rentals',
          query: { 
            lot: lotNumber,
            plan: planNumber 
          },
          filters: {
            limit: 20,
            sortBy: searchType === 'sales' ? 'saleDate' : 'leaseDate',
            sortOrder: 'desc'
          }
        }
      });

      if (error) throw error;

      if (data.success && data.data) {
        setSearchResults(data.data.results || []);
        toast({
          title: "Search completed",
          description: `Found ${data.data.results?.length || 0} ${searchType} records`,
        });
      } else {
        throw new Error(data.error || 'No results found');
      }
    } catch (error) {
      console.error('RP Data search error:', error);
      toast({
        title: "Search failed",
        description: error.message || "Failed to search RP Data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU');
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          RP Data {searchType === 'sales' ? 'Sales' : 'Rental'} Search
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="address" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address Search
            </TabsTrigger>
            <TabsTrigger value="lotplan" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Lot & Plan Search
            </TabsTrigger>
          </TabsList>

          <TabsContent value="address" className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="address">Property Address</Label>
                <Input
                  id="address"
                  placeholder="e.g., 123 Main Street, Melbourne VIC 3000"
                  value={addressQuery}
                  onChange={(e) => setAddressQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddressSearch()}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddressSearch} disabled={isLoading}>
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lotplan" className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="lot">Lot Number</Label>
                <Input
                  id="lot"
                  placeholder="e.g., 1"
                  value={lotNumber}
                  onChange={(e) => setLotNumber(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="plan">Plan Number</Label>
                <Input
                  id="plan"
                  placeholder="e.g., PS123456"
                  value={planNumber}
                  onChange={(e) => setPlanNumber(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleLotPlanSearch} disabled={isLoading}>
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {searchResults.length > 0 && (
          <div className="mt-6 space-y-2">
            <h3 className="text-lg font-semibold">Search Results</h3>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {searchResults.map((result, index) => (
                <Card key={index} className="p-3 cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() => onDataSelected(result)}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">{result.address}</p>
                      <p className="text-sm text-muted-foreground">
                        {result.bedrooms}bd, {result.bathrooms}ba, {result.carSpaces}car
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {searchType === 'sales' ? 'Sale Date' : 'Lease Date'}: {formatDate(result[searchType === 'sales' ? 'saleDate' : 'leaseDate'])}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        {searchType === 'sales' ? formatCurrency(result.salePrice) : `${formatCurrency(result.weeklyRent)}/week`}
                      </p>
                      {result.landSize && (
                        <p className="text-sm text-muted-foreground">
                          {result.landSize}m²
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}