import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, MapPin } from "lucide-react";

export default function SalesEvidenceAgricultural() {
  const [saleDate, setSaleDate] = useState(true);
  const [salePrice, setSalePrice] = useState(true);
  const [incentives, setIncentives] = useState(true);
  const [saleSettled, setSaleSettled] = useState(true);
  const [saleViaAgent, setSaleViaAgent] = useState(true);
  const [methodOfSale, setMethodOfSale] = useState(true);
  const [marketingPeriod, setMarketingPeriod] = useState(true);
  const [totalArea, setTotalArea] = useState(true);
  const [arableArea, setArableArea] = useState(true);
  const [landQuality, setLandQuality] = useState(true);
  const [soilType, setSoilType] = useState(true);
  const [waterRights, setWaterRights] = useState(true);
  const [infrastructure, setInfrastructure] = useState(true);
  const [dwellingCondition, setDwellingCondition] = useState(true);
  const [shedFacilities, setShedFacilities] = useState(true);
  const [fencing, setFencing] = useState(true);
  const [roadAccess, setRoadAccess] = useState(true);
  const [zoning, setZoning] = useState(true);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Agricultural Sales Evidence</h3>
          
          {/* Property Address Input */}
          <div className="mb-6">
            <div className="flex items-center gap-2 p-3 border border-primary rounded-lg bg-primary/5">
              <Input 
                placeholder="Property Address: Eg. 155 Rural Road Gippsland VIC 3875"
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
              <Input placeholder="$1,850,000" className="text-sm" />
              <Input placeholder="Price comparison analysis..." className="text-sm" />
            </div>

            {/* Incentives */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Incentives</Label>
              <div className="flex justify-center">
                <Switch checked={incentives} onCheckedChange={setIncentives} />
              </div>
              <Input placeholder="Machinery included, stock transfers..." className="text-sm" />
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
                  <SelectItem value="rural-specialist">Rural Specialist</SelectItem>
                  <SelectItem value="local">Local Agent</SelectItem>
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
              <Input placeholder="Private Treaty, Auction, Tender" className="text-sm" />
              <Input placeholder="Method comparison..." className="text-sm" />
            </div>

            {/* Marketing Period */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Marketing Period</Label>
              <div className="flex justify-center">
                <Switch checked={marketingPeriod} onCheckedChange={setMarketingPeriod} />
              </div>
              <Input placeholder="12 months, 6 months, etc." className="text-sm" />
              <Input placeholder="Marketing period comparison..." className="text-sm" />
            </div>

            {/* Total Area */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Total Area</Label>
              <div className="flex justify-center">
                <Switch checked={totalArea} onCheckedChange={setTotalArea} />
              </div>
              <div className="flex gap-2">
                <Input placeholder="245" className="text-sm" />
                <Select>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="hectares" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hectares">hectares</SelectItem>
                    <SelectItem value="acres">acres</SelectItem>
                    <SelectItem value="sqm">sqm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input placeholder="Area comparison to subject..." className="text-sm" />
            </div>

            {/* Arable Area */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Arable Area</Label>
              <div className="flex justify-center">
                <Switch checked={arableArea} onCheckedChange={setArableArea} />
              </div>
              <div className="flex gap-2">
                <Input placeholder="180" className="text-sm" />
                <Select>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="hectares" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hectares">hectares</SelectItem>
                    <SelectItem value="acres">acres</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input placeholder="Arable area comparison..." className="text-sm" />
            </div>

            {/* Farm Type */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Farm Type</Label>
              <div className="flex justify-center">
                <Switch checked={true} />
              </div>
              <Select>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select farm type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dairy">Dairy Farm</SelectItem>
                  <SelectItem value="broadacre">Broadacre Cropping</SelectItem>
                  <SelectItem value="vineyard">Vineyard</SelectItem>
                  <SelectItem value="orchard">Orchard/Fruit</SelectItem>
                  <SelectItem value="livestock">Livestock Grazing</SelectItem>
                  <SelectItem value="mixed">Mixed Farming</SelectItem>
                  <SelectItem value="aquaculture">Aquaculture</SelectItem>
                  <SelectItem value="poultry">Poultry Farm</SelectItem>
                  <SelectItem value="stud">Stud Farm</SelectItem>
                  <SelectItem value="forestry">Forestry/Plantation</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Farm type comparison..." className="text-sm" />
            </div>

            {/* Carrying Capacity */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Carrying Capacity</Label>
              <div className="flex justify-center">
                <Switch checked={true} />
              </div>
              <div className="flex gap-2">
                <Input placeholder="150" className="text-sm" />
                <Select>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="DSE/ha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dse">DSE/ha</SelectItem>
                    <SelectItem value="head">Head/ha</SelectItem>
                    <SelectItem value="cows">Cows/ha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input placeholder="Carrying capacity comparison..." className="text-sm" />
            </div>

            {/* Annual Rainfall */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Annual Rainfall</Label>
              <div className="flex justify-center">
                <Switch checked={true} />
              </div>
              <div className="flex gap-2">
                <Input placeholder="650" className="text-sm" />
                <span className="text-sm text-muted-foreground">mm</span>
              </div>
              <Input placeholder="Rainfall comparison..." className="text-sm" />
            </div>

            {/* Growing Season */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Growing Season</Label>
              <div className="flex justify-center">
                <Switch checked={true} />
              </div>
              <Input placeholder="7-8 months productive growing" className="text-sm" />
              <Input placeholder="Growing season comparison..." className="text-sm" />
            </div>

            {/* Land Quality */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Land Quality</Label>
              <div className="flex justify-center">
                <Switch checked={landQuality} onCheckedChange={setLandQuality} />
              </div>
              <Input placeholder="Prime agricultural, good drainage" className="text-sm" />
              <Input placeholder="Land quality comparison..." className="text-sm" />
            </div>

            {/* Soil Type */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Soil Type</Label>
              <div className="flex justify-center">
                <Switch checked={soilType} onCheckedChange={setSoilType} />
              </div>
              <Input placeholder="Clay loam, volcanic soil" className="text-sm" />
              <Input placeholder="Soil type comparison..." className="text-sm" />
            </div>

            {/* Water Rights */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Water Rights</Label>
              <div className="flex justify-center">
                <Switch checked={waterRights} onCheckedChange={setWaterRights} />
              </div>
              <Input placeholder="120ML water allocation, bore water" className="text-sm" />
              <Input placeholder="Water rights comparison..." className="text-sm" />
            </div>

            {/* Infrastructure */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Infrastructure</Label>
              <div className="flex justify-center">
                <Switch checked={infrastructure} onCheckedChange={setInfrastructure} />
              </div>
              <Input placeholder="Irrigation systems, silos, dairy" className="text-sm" />
              <Input placeholder="Infrastructure comparison..." className="text-sm" />
            </div>

            {/* Dwelling Condition */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Dwelling Condition</Label>
              <div className="flex justify-center">
                <Switch checked={dwellingCondition} onCheckedChange={setDwellingCondition} />
              </div>
              <Input placeholder="4BR homestead, good condition" className="text-sm" />
              <Input placeholder="Dwelling comparison..." className="text-sm" />
            </div>

            {/* Shed Facilities */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Shed Facilities</Label>
              <div className="flex justify-center">
                <Switch checked={shedFacilities} onCheckedChange={setShedFacilities} />
              </div>
              <Input placeholder="Large machinery shed, hay storage" className="text-sm" />
              <Input placeholder="Shed facilities comparison..." className="text-sm" />
            </div>

            {/* Fencing */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Fencing</Label>
              <div className="flex justify-center">
                <Switch checked={fencing} onCheckedChange={setFencing} />
              </div>
              <Input placeholder="Good boundary fencing, internal paddocks" className="text-sm" />
              <Input placeholder="Fencing comparison..." className="text-sm" />
            </div>

            {/* Road Access */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Road Access</Label>
              <div className="flex justify-center">
                <Switch checked={roadAccess} onCheckedChange={setRoadAccess} />
              </div>
              <Input placeholder="Sealed road frontage, all weather access" className="text-sm" />
              <Input placeholder="Access comparison..." className="text-sm" />
            </div>

            {/* Zoning */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Zoning</Label>
              <div className="flex justify-center">
                <Switch checked={zoning} onCheckedChange={setZoning} />
              </div>
              <Input placeholder="Farming Zone, Rural Activity Zone" className="text-sm" />
              <Input placeholder="Zoning comparison..." className="text-sm" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}