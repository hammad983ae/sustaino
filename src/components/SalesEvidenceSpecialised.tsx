import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, MapPin } from "lucide-react";

export default function SalesEvidenceSpecialised() {
  const [saleDate, setSaleDate] = useState(true);
  const [salePrice, setSalePrice] = useState(true);
  const [incentives, setIncentives] = useState(true);
  const [saleSettled, setSaleSettled] = useState(true);
  const [saleViaAgent, setSaleViaAgent] = useState(true);
  const [methodOfSale, setMethodOfSale] = useState(true);
  const [marketingPeriod, setMarketingPeriod] = useState(true);
  const [buildingArea, setBuildingArea] = useState(true);
  const [landArea, setLandArea] = useState(true);
  const [specialPurpose, setSpecialPurpose] = useState(true);
  const [operationalAssets, setOperationalAssets] = useState(true);
  const [licenses, setLicenses] = useState(true);
  const [revenue, setRevenue] = useState(true);
  const [operatingCondition, setOperatingCondition] = useState(true);
  const [equipmentValue, setEquipmentValue] = useState(true);
  const [zoning, setZoning] = useState(true);
  const [compliance, setCompliance] = useState(true);
  const [marketSegment, setMarketSegment] = useState(true);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Specialised Sales Evidence</h3>
          
          {/* Property Address Input */}
          <div className="mb-6">
            <div className="flex items-center gap-2 p-3 border border-primary rounded-lg bg-primary/5">
              <Input 
                placeholder="Property Address: Eg. 88 Industrial Drive Dandenong VIC 3175"
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
              <Input placeholder="$3,200,000" className="text-sm" />
              <Input placeholder="Price comparison analysis..." className="text-sm" />
            </div>

            {/* Incentives */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Incentives</Label>
              <div className="flex justify-center">
                <Switch checked={incentives} onCheckedChange={setIncentives} />
              </div>
              <Input placeholder="Equipment included, licenses transferred" className="text-sm" />
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
                  <SelectItem value="specialist">Industry Specialist</SelectItem>
                  <SelectItem value="business-broker">Business Broker</SelectItem>
                  <SelectItem value="commercial">Commercial Agent</SelectItem>
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
              <Input placeholder="Private Treaty, EOI, Business Sale" className="text-sm" />
              <Input placeholder="Method comparison..." className="text-sm" />
            </div>

            {/* Marketing Period */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Marketing Period</Label>
              <div className="flex justify-center">
                <Switch checked={marketingPeriod} onCheckedChange={setMarketingPeriod} />
              </div>
              <Input placeholder="18 months, 12 months, etc." className="text-sm" />
              <Input placeholder="Marketing period comparison..." className="text-sm" />
            </div>

            {/* Building Area */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Building Area</Label>
              <div className="flex justify-center">
                <Switch checked={buildingArea} onCheckedChange={setBuildingArea} />
              </div>
              <div className="flex gap-2">
                <Input placeholder="1,200" className="text-sm" />
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
                <Input placeholder="2,500" className="text-sm" />
                <Select>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="sqm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sqm">sqm</SelectItem>
                    <SelectItem value="hectares">hectares</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input placeholder="Land area comparison..." className="text-sm" />
            </div>

            {/* Specialized Property Type */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Property Type</Label>
              <div className="flex justify-center">
                <Switch checked={true} />
              </div>
              <Select>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select specialized type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="motel">Motel</SelectItem>
                  <SelectItem value="pub">Pub</SelectItem>
                  <SelectItem value="club">Club</SelectItem>
                  <SelectItem value="gaming-venue">Gaming Venue</SelectItem>
                  <SelectItem value="childcare">Childcare</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="sports-stadium">Sports Stadium</SelectItem>
                  <SelectItem value="cinema-theater">Cinema/Theater</SelectItem>
                  <SelectItem value="convention-center">Convention/Conference Center</SelectItem>
                  <SelectItem value="shopping-center">Shopping Center/Mall</SelectItem>
                  <SelectItem value="marina">Marina</SelectItem>
                  <SelectItem value="self-storage">Self Storage Facility</SelectItem>
                  <SelectItem value="funeral-home">Funeral Home</SelectItem>
                  <SelectItem value="veterinary">Veterinary Clinic</SelectItem>
                  <SelectItem value="automotive">Automotive (Service/Dealership)</SelectItem>
                  <SelectItem value="religious">Religious Building</SelectItem>
                  <SelectItem value="data-center">Data Center</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Property type comparison..." className="text-sm" />
            </div>

            {/* Units of Comparison - Rooms/Keys */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Rooms/Keys</Label>
              <div className="flex justify-center">
                <Switch checked={true} />
              </div>
              <Input placeholder="45 rooms" className="text-sm" />
              <Input placeholder="Rooms/keys comparison..." className="text-sm" />
            </div>

            {/* Seating Capacity */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Seating Capacity</Label>
              <div className="flex justify-center">
                <Switch checked={true} />
              </div>
              <Input placeholder="250 seats" className="text-sm" />
              <Input placeholder="Seating capacity comparison..." className="text-sm" />
            </div>

            {/* LDC Placements */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>LDC Placements</Label>
              <div className="flex justify-center">
                <Switch checked={true} />
              </div>
              <Input placeholder="75 licensed placements" className="text-sm" />
              <Input placeholder="LDC placements comparison..." className="text-sm" />
            </div>

            {/* Bed Capacity */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Bed Capacity</Label>
              <div className="flex justify-center">
                <Switch checked={true} />
              </div>
              <Input placeholder="80 beds" className="text-sm" />
              <Input placeholder="Bed capacity comparison..." className="text-sm" />
            </div>

            {/* Lettable Area Type */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Lettable Area Type</Label>
              <div className="flex justify-center">
                <Switch checked={true} />
              </div>
              <Select>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select area type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gla">GLA</SelectItem>
                  <SelectItem value="nla">NLA</SelectItem>
                  <SelectItem value="glar">GLAR</SelectItem>
                  <SelectItem value="gba">GBA</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Area type comparison..." className="text-sm" />
            </div>

            {/* Special Purpose */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Special Purpose</Label>
              <div className="flex justify-center">
                <Switch checked={specialPurpose} onCheckedChange={setSpecialPurpose} />
              </div>
              <Input placeholder="Manufacturing facility, medical centre" className="text-sm" />
              <Input placeholder="Special purpose comparison..." className="text-sm" />
            </div>

            {/* Operational Assets */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Operational Assets</Label>
              <div className="flex justify-center">
                <Switch checked={operationalAssets} onCheckedChange={setOperationalAssets} />
              </div>
              <Input placeholder="Specialized equipment, fit-out included" className="text-sm" />
              <Input placeholder="Operational assets comparison..." className="text-sm" />
            </div>

            {/* Licenses */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Licenses</Label>
              <div className="flex justify-center">
                <Switch checked={licenses} onCheckedChange={setLicenses} />
              </div>
              <Input placeholder="Operating licenses, permits current" className="text-sm" />
              <Input placeholder="Licenses comparison..." className="text-sm" />
            </div>

            {/* Revenue */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Revenue</Label>
              <div className="flex justify-center">
                <Switch checked={revenue} onCheckedChange={setRevenue} />
              </div>
              <Input placeholder="$850,000 annual turnover" className="text-sm" />
              <Input placeholder="Revenue comparison..." className="text-sm" />
            </div>

            {/* Operating Condition */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Operating Condition</Label>
              <div className="flex justify-center">
                <Switch checked={operatingCondition} onCheckedChange={setOperatingCondition} />
              </div>
              <Input placeholder="Fully operational, good condition" className="text-sm" />
              <Input placeholder="Operating condition comparison..." className="text-sm" />
            </div>

            {/* Equipment Value */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Equipment Value</Label>
              <div className="flex justify-center">
                <Switch checked={equipmentValue} onCheckedChange={setEquipmentValue} />
              </div>
              <Input placeholder="$450,000 replacement value" className="text-sm" />
              <Input placeholder="Equipment value comparison..." className="text-sm" />
            </div>

            {/* Zoning */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Zoning</Label>
              <div className="flex justify-center">
                <Switch checked={zoning} onCheckedChange={setZoning} />
              </div>
              <Input placeholder="Industrial 1 Zone, Special Use" className="text-sm" />
              <Input placeholder="Zoning comparison..." className="text-sm" />
            </div>

            {/* Compliance */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Compliance</Label>
              <div className="flex justify-center">
                <Switch checked={compliance} onCheckedChange={setCompliance} />
              </div>
              <Input placeholder="EPA compliant, safety standards met" className="text-sm" />
              <Input placeholder="Compliance comparison..." className="text-sm" />
            </div>

            {/* Market Segment */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Market Segment</Label>
              <div className="flex justify-center">
                <Switch checked={marketSegment} onCheckedChange={setMarketSegment} />
              </div>
              <Input placeholder="Limited market, specialist buyers" className="text-sm" />
              <Input placeholder="Market segment comparison..." className="text-sm" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}