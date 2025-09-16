import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, MapPin } from "lucide-react";

export default function SalesEvidenceDevelopment() {
  const [saleDate, setSaleDate] = useState(true);
  const [salePrice, setSalePrice] = useState(true);
  const [incentives, setIncentives] = useState(true);
  const [saleSettled, setSaleSettled] = useState(true);
  const [saleViaAgent, setSaleViaAgent] = useState(true);
  const [methodOfSale, setMethodOfSale] = useState(true);
  const [marketingPeriod, setMarketingPeriod] = useState(true);
  const [landArea, setLandArea] = useState(true);
  const [developmentPotential, setDevelopmentPotential] = useState(true);
  const [zoning, setZoning] = useState(true);
  const [planningPermits, setPlanningPermits] = useState(true);
  const [infrastructure, setInfrastructure] = useState(true);
  const [services, setServices] = useState(true);
  const [contamination, setContamination] = useState(true);
  const [topography, setTopography] = useState(true);
  const [roadAccess, setRoadAccess] = useState(true);
  const [existingImprovements, setExistingImprovements] = useState(true);
  const [marketConditions, setMarketConditions] = useState(true);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Development Sales Evidence</h3>
          
          {/* Property Address Input */}
          <div className="mb-6">
            <div className="flex items-center gap-2 p-3 border border-primary rounded-lg bg-primary/5">
              <Input 
                placeholder="Property Address: Eg. 45-55 Development Street Brunswick VIC 3056"
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
              <Input placeholder="$4,500,000" className="text-sm" />
              <Input placeholder="Price comparison analysis..." className="text-sm" />
            </div>

            {/* Incentives */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Incentives</Label>
              <div className="flex justify-center">
                <Switch checked={incentives} onCheckedChange={setIncentives} />
              </div>
              <Input placeholder="Planning permits included, DA approved" className="text-sm" />
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
                  <SelectItem value="development-specialist">Development Specialist</SelectItem>
                  <SelectItem value="commercial">Commercial Agent</SelectItem>
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
              <Input placeholder="EOI, Tender, Private Treaty" className="text-sm" />
              <Input placeholder="Method comparison..." className="text-sm" />
            </div>

            {/* Marketing Period */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Marketing Period</Label>
              <div className="flex justify-center">
                <Switch checked={marketingPeriod} onCheckedChange={setMarketingPeriod} />
              </div>
              <Input placeholder="9 months, 12 months, etc." className="text-sm" />
              <Input placeholder="Marketing period comparison..." className="text-sm" />
            </div>

            {/* Land Area */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Land Area</Label>
              <div className="flex justify-center">
                <Switch checked={landArea} onCheckedChange={setLandArea} />
              </div>
              <div className="flex gap-2">
                <Input placeholder="2,850" className="text-sm" />
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

            {/* Development Potential */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Development Potential</Label>
              <div className="flex justify-center">
                <Switch checked={developmentPotential} onCheckedChange={setDevelopmentPotential} />
              </div>
              <Input placeholder="45 apartments, mixed use development" className="text-sm" />
              <Input placeholder="Development potential comparison..." className="text-sm" />
            </div>

            {/* Zoning */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Zoning</Label>
              <div className="flex justify-center">
                <Switch checked={zoning} onCheckedChange={setZoning} />
              </div>
              <Input placeholder="Residential Growth Zone, Mixed Use" className="text-sm" />
              <Input placeholder="Zoning comparison..." className="text-sm" />
            </div>

            {/* Planning Permits */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Planning Permits</Label>
              <div className="flex justify-center">
                <Switch checked={planningPermits} onCheckedChange={setPlanningPermits} />
              </div>
              <Input placeholder="DA approved, permits current" className="text-sm" />
              <Input placeholder="Planning permits comparison..." className="text-sm" />
            </div>

            {/* Infrastructure */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Infrastructure</Label>
              <div className="flex justify-center">
                <Switch checked={infrastructure} onCheckedChange={setInfrastructure} />
              </div>
              <Input placeholder="All services available, contribution paid" className="text-sm" />
              <Input placeholder="Infrastructure comparison..." className="text-sm" />
            </div>

            {/* Services */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Services</Label>
              <div className="flex justify-center">
                <Switch checked={services} onCheckedChange={setServices} />
              </div>
              <Input placeholder="Water, sewer, gas, power available" className="text-sm" />
              <Input placeholder="Services comparison..." className="text-sm" />
            </div>

            {/* Contamination */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Contamination</Label>
              <div className="flex justify-center">
                <Switch checked={contamination} onCheckedChange={setContamination} />
              </div>
              <Input placeholder="Site assessment clear, no issues" className="text-sm" />
              <Input placeholder="Contamination comparison..." className="text-sm" />
            </div>

            {/* Topography */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Topography</Label>
              <div className="flex justify-center">
                <Switch checked={topography} onCheckedChange={setTopography} />
              </div>
              <Input placeholder="Level site, minor slope" className="text-sm" />
              <Input placeholder="Topography comparison..." className="text-sm" />
            </div>

            {/* Road Access */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Road Access</Label>
              <div className="flex justify-center">
                <Switch checked={roadAccess} onCheckedChange={setRoadAccess} />
              </div>
              <Input placeholder="Main road frontage, dual access" className="text-sm" />
              <Input placeholder="Access comparison..." className="text-sm" />
            </div>

            {/* Existing Improvements */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Existing Improvements</Label>
              <div className="flex justify-center">
                <Switch checked={existingImprovements} onCheckedChange={setExistingImprovements} />
              </div>
              <Input placeholder="Vacant land, old dwelling to demolish" className="text-sm" />
              <Input placeholder="Improvements comparison..." className="text-sm" />
            </div>

            {/* Market Conditions */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Market Conditions</Label>
              <div className="flex justify-center">
                <Switch checked={marketConditions} onCheckedChange={setMarketConditions} />
              </div>
              <Input placeholder="Strong development market" className="text-sm" />
              <Input placeholder="Market conditions comparison..." className="text-sm" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
