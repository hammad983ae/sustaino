import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, MapPin } from "lucide-react";

export default function LeasingEvidenceAgricultural() {
  const [commencementDate, setCommencementDate] = useState(true);
  const [seasonalRates, setSeasonalRates] = useState(true);
  const [grazingRights, setGrazingRights] = useState(true);
  const [waterRights, setWaterRights] = useState(true);
  const [cropSharing, setCropSharing] = useState(true);
  const [netRent, setNetRent] = useState(true);
  const [ratesPerUnit, setRatesPerUnit] = useState(true);
  const [esgFactors, setEsgFactors] = useState(true);
  const [farmType, setFarmType] = useState(true);
  const [carryingCapacity, setCarryingCapacity] = useState(true);
  const [annualRainfall, setAnnualRainfall] = useState(true);
  const [growingSeason, setGrowingSeason] = useState(true);
  const [landArea, setLandArea] = useState(true);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Agricultural Leasing Evidence</h3>
          
          {/* Property Address Input */}
          <div className="mb-6">
            <div className="flex items-center gap-2 p-3 border border-primary rounded-lg bg-primary/5">
              <Input 
                placeholder="Property Address: Eg. 1234 Rural Road Ballarat VIC 3350"
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

            {/* Commencement Date */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Commencement Date</Label>
              <div className="flex justify-center">
                <Switch checked={commencementDate} onCheckedChange={setCommencementDate} />
              </div>
              <Input placeholder="1st April 2024" className="text-sm" />
              <Input placeholder="Lease commencement comparison..." className="text-sm" />
            </div>

            {/* Seasonal Rates */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Seasonal Rates</Label>
              <div className="flex justify-center">
                <Switch checked={seasonalRates} onCheckedChange={setSeasonalRates} />
              </div>
              <Input placeholder="$45 per hectare per season" className="text-sm" />
              <Input placeholder="Seasonal rates comparison..." className="text-sm" />
            </div>

            {/* Grazing Rights */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Grazing Rights</Label>
              <div className="flex justify-center">
                <Switch checked={grazingRights} onCheckedChange={setGrazingRights} />
              </div>
              <Input placeholder="150 DSE grazing rights included" className="text-sm" />
              <Input placeholder="Grazing rights comparison..." className="text-sm" />
            </div>

            {/* Water Rights */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Water Rights</Label>
              <div className="flex justify-center">
                <Switch checked={waterRights} onCheckedChange={setWaterRights} />
              </div>
              <Input placeholder="50ML water allocation included" className="text-sm" />
              <Input placeholder="Water rights comparison..." className="text-sm" />
            </div>

            {/* Crop Sharing */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Crop Sharing</Label>
              <div className="flex justify-center">
                <Switch checked={cropSharing} onCheckedChange={setCropSharing} />
              </div>
              <Input placeholder="50/50 crop share arrangement" className="text-sm" />
              <Input placeholder="Crop sharing comparison..." className="text-sm" />
            </div>

            {/* Net Rent */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Net Rent</Label>
              <div className="flex justify-center">
                <Switch checked={netRent} onCheckedChange={setNetRent} />
              </div>
              <Input placeholder="$25,000 per annum net" className="text-sm" />
              <Input placeholder="Net rent comparison..." className="text-sm" />
            </div>

            {/* Rates Per Unit */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Rates Per Unit</Label>
              <div className="flex justify-center">
                <Switch checked={ratesPerUnit} onCheckedChange={setRatesPerUnit} />
              </div>
              <div className="flex gap-2">
                <Input placeholder="45" className="text-sm" />
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="$/hectare" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hectare">$/hectare</SelectItem>
                    <SelectItem value="acre">$/acre</SelectItem>
                    <SelectItem value="dse">$/DSE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input placeholder="Rate per unit comparison..." className="text-sm" />
            </div>

            {/* ESG Factors */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>ESG Factors</Label>
              <div className="flex justify-center">
                <Switch checked={esgFactors} onCheckedChange={setEsgFactors} />
              </div>
              <Input placeholder="Organic certification, carbon farming" className="text-sm" />
              <Input placeholder="ESG factors comparison..." className="text-sm" />
            </div>

            {/* Farm Type */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Farm Type</Label>
              <div className="flex justify-center">
                <Switch checked={farmType} onCheckedChange={setFarmType} />
              </div>
              <Select>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select farm type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dairy">Dairy</SelectItem>
                  <SelectItem value="beef">Beef Cattle</SelectItem>
                  <SelectItem value="sheep">Sheep</SelectItem>
                  <SelectItem value="cropping">Cropping</SelectItem>
                  <SelectItem value="mixed">Mixed Farming</SelectItem>
                  <SelectItem value="horticulture">Horticulture</SelectItem>
                  <SelectItem value="viticulture">Viticulture</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Farm type comparison..." className="text-sm" />
            </div>

            {/* Carrying Capacity */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Carrying Capacity</Label>
              <div className="flex justify-center">
                <Switch checked={carryingCapacity} onCheckedChange={setCarryingCapacity} />
              </div>
              <div className="flex gap-2">
                <Input placeholder="150" className="text-sm" />
                <Select>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="DSE" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dse">DSE</SelectItem>
                    <SelectItem value="head">Head</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input placeholder="Carrying capacity comparison..." className="text-sm" />
            </div>

            {/* Annual Rainfall */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Annual Rainfall</Label>
              <div className="flex justify-center">
                <Switch checked={annualRainfall} onCheckedChange={setAnnualRainfall} />
              </div>
              <Input placeholder="650mm average" className="text-sm" />
              <Input placeholder="Rainfall comparison..." className="text-sm" />
            </div>

            {/* Growing Season */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Growing Season</Label>
              <div className="flex justify-center">
                <Switch checked={growingSeason} onCheckedChange={setGrowingSeason} />
              </div>
              <Input placeholder="April to October" className="text-sm" />
              <Input placeholder="Growing season comparison..." className="text-sm" />
            </div>

            {/* Land Area */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Land Area</Label>
              <div className="flex justify-center">
                <Switch checked={landArea} onCheckedChange={setLandArea} />
              </div>
              <div className="flex gap-2">
                <Input placeholder="250" className="text-sm" />
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
              <Input placeholder="Land area comparison..." className="text-sm" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}