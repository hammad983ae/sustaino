import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useProperty } from "@/contexts/PropertyContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PropertyAddressForm = () => {
  const { addressData, updateAddressData, getFormattedAddress, setJobNumber } = useProperty();
  const { toast } = useToast();
  const [isCreatingJob, setIsCreatingJob] = useState(false);

  const handleGenerateAddress = async () => {
    const formatted = getFormattedAddress();
    updateAddressData({ propertyAddress: formatted });
    
    // Auto-create job file
    await createJobFile(formatted);
  };

  const createJobFile = async (propertyAddress: string) => {
    if (!propertyAddress.trim()) {
      toast({
        title: "Address Required",
        description: "Please enter a property address before creating a job file",
        variant: "destructive"
      });
      return;
    }

    setIsCreatingJob(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required", 
          description: "Please log in to create a job file",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('valuation_jobs')
        .insert([{
          title: `Property Valuation - ${propertyAddress}`,
          description: `Valuation job for property at ${propertyAddress}`,
          property_type: 'residential',
          address: propertyAddress,
          user_id: user.id,
          status: 'pending',
          priority: 'medium',
          notes: 'Auto-created from property address form'
        }])
        .select('job_number, id')
        .single();

      if (error) throw error;

      // Save job number to context
      setJobNumber(data.job_number.toString());

      toast({
        title: "Job File Created Successfully! 📋",
        description: `Job #${data.job_number} has been created and saved to your Work Hub for ${propertyAddress}`,
        className: "bg-green-50 border-green-200"
      });

    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: "Failed to Create Job File",
        description: "There was an error creating your job file. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreatingJob(false);
    }
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
            <Label htmlFor="property-address" className="text-sm font-medium">Property Address</Label>
            <Input 
              id="property-address"
              placeholder="Enter property address"
              className="mt-1"
              value={addressData.propertyAddress}
              onChange={(e) => updateAddressData({ propertyAddress: e.target.value })}
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
              disabled={isCreatingJob}
            >
              {isCreatingJob ? "Creating Job File..." : "Generate Address & Create Job"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyAddressForm;