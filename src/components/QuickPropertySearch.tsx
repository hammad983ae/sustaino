import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, MapPin, AlertCircle } from "lucide-react";
import { useProperty } from "@/contexts/PropertyContext";
import { useReportData } from "@/contexts/ReportDataContext";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const QuickPropertySearch = () => {
  const [address, setAddress] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const { updateAddressData } = useProperty();
  const { updateReportData } = useReportData();

  const handleQuickSearch = async () => {
    if (!address.trim()) {
      toast({
        title: "Please enter an address",
        description: "Enter a property address to begin your valuation report",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    try {
      // Extract basic address components
      const addressParts = address.split(',').map(part => part.trim());
      const propertyAddress = addressParts[0] || address;
      
      // Update property context
      updateAddressData({
        propertyAddress: address,
        streetName: propertyAddress
      });
      
      // Update report data
      updateReportData('propertySearchData', {
        address: address,
        searchTimestamp: new Date().toISOString()
      });

      // Try to create/upsert property in database for authenticated users
      try {
        const { data: user } = await supabase.auth.getUser();
        if (user.user) {
          const { data, error } = await supabase.rpc('upsert_property_from_address', {
            address_text: address,
            property_type_text: 'residential'
          });
          
          if (error) {
            console.warn('Could not create property in database:', error.message);
            // Continue anyway - user can still work with local data
          } else {
            console.log('Property created/found with ID:', data);
          }
        }
      } catch (dbError) {
        console.warn('Database operation failed, continuing with local data:', dbError);
        // Not a critical error - user can still continue
      }
      
      toast({
        title: "Address Saved! ✅",
        description: "Property address saved. Click 'Start Property Valuation' to continue.",
      });
      
      // Auto-navigate to property valuation after short delay
      setTimeout(() => {
        window.location.href = '/property-valuations';
      }, 1500);
      
    } catch (error) {
      console.error('Quick search error:', error);
      toast({
        title: "Search Error",
        description: "There was an issue with the search. Please try again or use the full property analysis.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleQuickSearch();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Search className="h-6 w-6 text-primary" />
          Property Valuation and ESG Assessment Report
        </CardTitle>
        <p className="text-muted-foreground">Find and configure address to begin your valuation report</p>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div>
          <Label htmlFor="quick-property-address" className="text-base font-medium">
            Property Address
          </Label>
          <div className="flex gap-2 mt-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                id="quick-property-address"
                placeholder="320 Deakin Avenue Mildura VIC 3500"
                className="pl-10 h-12 text-base"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isSearching}
              />
            </div>
            <Button 
              onClick={handleQuickSearch}
              disabled={isSearching || !address.trim()}
              className="h-12 px-6 bg-primary hover:bg-primary/90"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
          <AlertCircle className="h-4 w-4 text-blue-500" />
          <span>Enter the property address to start your professional valuation report with automated analysis.</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickPropertySearch;