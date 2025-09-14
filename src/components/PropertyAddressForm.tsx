import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useProperty } from "@/contexts/PropertyContext";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lock, LockOpen, RotateCcw } from "lucide-react";

const PropertyAddressForm = () => {
  const { addressData, updateAddressData, getFormattedAddress, clearAddressData } = useProperty();
  const [isLocked, setIsLocked] = useState(false);

  const handleGenerateAddress = async () => {
    const formatted = getFormattedAddress();
    updateAddressData({ propertyAddress: formatted });

    // Try to create/upsert property in database for authenticated users
    if (formatted) {
      try {
        const { data: user } = await supabase.auth.getUser();
        if (user.user) {
          const { data, error } = await supabase.rpc('upsert_property_from_address', {
            address_text: formatted,
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
        title: "Address Generated! ✅",
        description: "Property address has been generated and saved.",
      });
    }
  };

  const handleLockToggle = () => {
    setIsLocked(!isLocked);
    toast({
      title: isLocked ? "Address Unlocked 🔓" : "Address Locked 🔒",
      description: isLocked ? "Address fields are now editable." : "Address fields are now locked from editing.",
    });
  };

  const handleRefreshAddress = () => {
    clearAddressData();
    setIsLocked(false);
    toast({
      title: "Address Reset 🔄",
      description: "All address fields have been cleared.",
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Property Valuation and ESG Assessment Report</CardTitle>
        <p className="text-sm text-muted-foreground">Find and configure address to begin your valuation report</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Property Address Section */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="property-address" className="text-sm font-medium">Property Address</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLockToggle}
                  className="flex items-center gap-1"
                >
                  {isLocked ? <Lock className="h-3 w-3" /> : <LockOpen className="h-3 w-3" />}
                  {isLocked ? "Unlock" : "Lock"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefreshAddress}
                  className="flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" />
                  Refresh
                </Button>
              </div>
            </div>
            <Input 
              id="property-address"
              placeholder="Enter property address"
              className="mt-1"
              value={addressData.propertyAddress}
              onChange={(e) => updateAddressData({ propertyAddress: e.target.value })}
              disabled={isLocked}
            />
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
                disabled={isLocked}
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
                disabled={isLocked}
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
                disabled={isLocked}
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
                disabled={isLocked}
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
                disabled={isLocked}
              />
            </div>
            <div>
              <Label htmlFor="street-type" className="text-sm">Street Type</Label>
              <Select value={addressData.streetType} onValueChange={(value) => updateAddressData({ streetType: value })} disabled={isLocked}>
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
            <Select value={addressData.state} onValueChange={(value) => updateAddressData({ state: value })} disabled={isLocked}>
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
                disabled={isLocked}
              />
            </div>
            <div>
              <Label htmlFor="country" className="text-sm">Country</Label>
              <Input 
                id="country"
                value={addressData.country}
                onChange={(e) => updateAddressData({ country: e.target.value })}
                className="mt-1"
                disabled={isLocked}
              />
            </div>
          </div>

          {/* Generate Address Button */}
          <div className="flex justify-end pt-4">
            <Button 
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6"
              onClick={handleGenerateAddress}
              disabled={isLocked}
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