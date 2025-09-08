import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, MapPin } from "lucide-react";

export default function SalesEvidenceCommercial() {
  const [saleDate, setSaleDate] = useState(true);
  const [salePrice, setSalePrice] = useState(true);
  const [incentives, setIncentives] = useState(true);
  const [saleSettled, setSaleSettled] = useState(true);
  const [saleViaAgent, setSaleViaAgent] = useState(true);
  const [methodOfSale, setMethodOfSale] = useState(true);
  const [marketingPeriod, setMarketingPeriod] = useState(true);
  const [buildingArea, setBuildingArea] = useState(true);
  const [landArea, setLandArea] = useState(true);
  const [carParking, setCarParking] = useState(true);
  const [tenancy, setTenancy] = useState(true);
  const [lease, setLease] = useState(true);
  const [netRent, setNetRent] = useState(true);
  const [outgoings, setOutgoings] = useState(true);
  const [yieldRate, setYieldRate] = useState(true);
  const [zoning, setZoning] = useState(true);
  const [buildingCondition, setBuildingCondition] = useState(true);
  const [streetAccess, setStreetAccess] = useState(true);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Commercial Sales Evidence</h3>
          
          {/* Property Address Input */}
          <div className="mb-6">
            <div className="flex items-center gap-2 p-3 border border-primary rounded-lg bg-primary/5">
              <Input 
                placeholder="Property Address: Eg. 101 King Avenue Middle Park VIC 3206"
                className="border-0 bg-transparent text-sm font-medium placeholder:text-muted-foreground/60"
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center bg-muted/20">
              <div className="flex flex-col items-center justify-center space-y-3">
                <Upload className="h-8 w-8 text-muted-foreground/40" />
                <div>
                  <Button variant="outline" size="sm">Upload Image/Map</Button>
                  <p className="text-sm text-muted-foreground mt-2">Property photo or location map</p>
                </div>
              </div>
            </div>
            
            <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/10">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Map unavailable – missing location data</span>
              </div>
            </div>
          </div>

          {/* Attributes Table */}
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 text-sm font-medium border-b pb-2">
              <div>Attribute</div>
              <div className="text-center">Include</div>
              <div>Value</div>
              <div>Comparison to Subject</div>
            </div>

            {/* Sale Date */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Sale Date</Label>
              <div className="flex justify-center">
                <Switch checked={saleDate} onCheckedChange={setSaleDate} />
              </div>
              <Input placeholder="01st March 2024 – Unsettled" className="text-sm" />
              <Input placeholder="Comparison notes for sale date..." className="text-sm" />
            </div>

            {/* Sale Price */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Sale Price</Label>
              <div className="flex justify-center">
                <Switch checked={salePrice} onCheckedChange={setSalePrice} />
              </div>
              <Input placeholder="$2,500,000" className="text-sm" />
              <Input placeholder="Price comparison analysis..." className="text-sm" />
            </div>

            {/* Incentives */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Incentives</Label>
              <div className="flex justify-center">
                <Switch checked={incentives} onCheckedChange={setIncentives} />
              </div>
              <Input placeholder="Vendor incentives, fit-out contributions..." className="text-sm" />
              <Input placeholder="Incentives comparison..." className="text-sm" />
            </div>

            {/* Sale Settled */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Sale Settled</Label>
              <div className="flex justify-center">
                <Switch checked={saleSettled} onCheckedChange={setSaleSettled} />
              </div>
              <Select>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="settled">Settled</SelectItem>
                  <SelectItem value="under-contract">Under Contract</SelectItem>
                  <SelectItem value="exchanged">Exchanged</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Settlement comparison..." className="text-sm" />
            </div>

            {/* Sale Via Local Agent */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Sale Via Local Agent</Label>
              <div className="flex justify-center">
                <Switch checked={saleViaAgent} onCheckedChange={setSaleViaAgent} />
              </div>
              <Select>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local Agent</SelectItem>
                  <SelectItem value="national">National Agent</SelectItem>
                  <SelectItem value="private">Private Sale</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Agent comparison..." className="text-sm" />
            </div>

            {/* Method of Sale */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Method of Sale</Label>
              <div className="flex justify-center">
                <Switch checked={methodOfSale} onCheckedChange={setMethodOfSale} />
              </div>
              <Input placeholder="Private Treaty, Auction, Tender, EOI" className="text-sm" />
              <Input placeholder="Method comparison..." className="text-sm" />
            </div>

            {/* Marketing Period */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Marketing Period</Label>
              <div className="flex justify-center">
                <Switch checked={marketingPeriod} onCheckedChange={setMarketingPeriod} />
              </div>
              <Input placeholder="6 months, 8 weeks, etc." className="text-sm" />
              <Input placeholder="Marketing period comparison..." className="text-sm" />
            </div>

            {/* Building Area */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Building Area</Label>
              <div className="flex justify-center">
                <Switch checked={buildingArea} onCheckedChange={setBuildingArea} />
              </div>
              <div className="flex gap-2">
                <Input placeholder="450" className="text-sm" />
                <Select>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="sqm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sqm">sqm</SelectItem>
                    <SelectItem value="sqft">sqft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input placeholder="Building area comparison..." className="text-sm" />
            </div>

            {/* Land Area */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Land Area</Label>
              <div className="flex justify-center">
                <Switch checked={landArea} onCheckedChange={setLandArea} />
              </div>
              <div className="flex gap-2">
                <Input placeholder="850" className="text-sm" />
                <Select>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="sqm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sqm">sqm</SelectItem>
                    <SelectItem value="acres">acres</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input placeholder="Land area comparison..." className="text-sm" />
            </div>

            {/* Car Parking */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Car Parking</Label>
              <div className="flex justify-center">
                <Switch checked={carParking} onCheckedChange={setCarParking} />
              </div>
              <Input placeholder="20 spaces, covered parking" className="text-sm" />
              <Input placeholder="Parking comparison..." className="text-sm" />
            </div>

            {/* Tenancy */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Tenancy</Label>
              <div className="flex justify-center">
                <Switch checked={tenancy} onCheckedChange={setTenancy} />
              </div>
              <Input placeholder="Single tenant, multi-tenant, vacant" className="text-sm" />
              <Input placeholder="Tenancy comparison..." className="text-sm" />
            </div>

            {/* Lease */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Lease</Label>
              <div className="flex justify-center">
                <Switch checked={lease} onCheckedChange={setLease} />
              </div>
              <Input placeholder="5 year lease, 3+3+3 options" className="text-sm" />
              <Input placeholder="Lease comparison..." className="text-sm" />
            </div>

            {/* Net Rent */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Net Rent</Label>
              <div className="flex justify-center">
                <Switch checked={netRent} onCheckedChange={setNetRent} />
              </div>
              <Input placeholder="$120,000 per annum net" className="text-sm" />
              <Input placeholder="Rent comparison..." className="text-sm" />
            </div>

            {/* Outgoings */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Outgoings</Label>
              <div className="flex justify-center">
                <Switch checked={outgoings} onCheckedChange={setOutgoings} />
              </div>
              <Input placeholder="$15,000 per annum" className="text-sm" />
              <Input placeholder="Outgoings comparison..." className="text-sm" />
            </div>

            {/* Yield Rate */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Yield Rate</Label>
              <div className="flex justify-center">
                <Switch checked={yieldRate} onCheckedChange={setYieldRate} />
              </div>
              <Input placeholder="4.8% net yield" className="text-sm" />
              <Input placeholder="Yield comparison..." className="text-sm" />
            </div>

            {/* Zoning */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Zoning</Label>
              <div className="flex justify-center">
                <Switch checked={zoning} onCheckedChange={setZoning} />
              </div>
              <Input placeholder="Commercial 1 Zone" className="text-sm" />
              <Input placeholder="Zoning comparison..." className="text-sm" />
            </div>

            {/* Building Condition */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Building Condition</Label>
              <div className="flex justify-center">
                <Switch checked={buildingCondition} onCheckedChange={setBuildingCondition} />
              </div>
              <Input placeholder="Good condition, recently renovated" className="text-sm" />
              <Input placeholder="Condition comparison..." className="text-sm" />
            </div>

            {/* Street Access */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Street Access</Label>
              <div className="flex justify-center">
                <Switch checked={streetAccess} onCheckedChange={setStreetAccess} />
              </div>
              <Input placeholder="Main road frontage, dual access" className="text-sm" />
              <Input placeholder="Access comparison..." className="text-sm" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}