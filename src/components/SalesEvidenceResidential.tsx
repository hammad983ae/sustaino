import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, MapPin } from "lucide-react";

export default function SalesEvidenceResidential() {
  const [saleDate, setSaleDate] = useState(true);
  const [salePrice, setSalePrice] = useState(true);
  const [landArea, setLandArea] = useState(true);
  const [livingArea, setLivingArea] = useState(true);
  const [improvedLandRate, setImprovedLandRate] = useState(true);
  const [improvementsRate, setImprovementsRate] = useState(true);
  const [marketConditions, setMarketConditions] = useState(true);
  const [zoning, setZoning] = useState(true);
  const [localSalesAgent, setLocalSalesAgent] = useState(true);
  const [propertyDescription, setPropertyDescription] = useState(true);
  const [comparisonComments, setComparisonComments] = useState(true);
  const [nathersRating, setNathersRating] = useState(true);
  const [seifaScore, setSeifaScore] = useState(true);
  const [schoolingZone, setSchoolingZone] = useState(true);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Residential Sales Evidence</h3>
          
          {/* Property Address Input */}
          <div className="mb-6">
            <div className="flex items-center gap-2 p-3 border border-primary rounded-lg bg-primary/5">
              <Input 
                placeholder="Property Address: Eg. 3 St Andrews Drive Cabarita VIC 3505"
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
              <Input placeholder="2/09/2024 - Not Settled" className="text-sm" />
              <Input placeholder="Comparison notes for sale date..." className="text-sm" />
            </div>

            {/* Sale Price */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Sale Price</Label>
              <div className="flex justify-center">
                <Switch checked={salePrice} onCheckedChange={setSalePrice} />
              </div>
              <Input placeholder="$998,000" className="text-sm" />
              <Input placeholder="Price comparison analysis..." className="text-sm" />
            </div>

            {/* Land Area */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Land Area</Label>
              <div className="flex justify-center">
                <Switch checked={landArea} onCheckedChange={setLandArea} />
              </div>
              <div className="flex gap-2">
                <Input placeholder="4062" className="text-sm" />
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

            {/* Living Area */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Living Area</Label>
              <div className="flex justify-center">
                <Switch checked={livingArea} onCheckedChange={setLivingArea} />
              </div>
              <div className="flex gap-2">
                <Input placeholder="285" className="text-sm" />
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
              <Input placeholder="Living area comparison..." className="text-sm" />
            </div>

            {/* Improved Land Rate */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Improved Land Rate</Label>
              <div className="flex justify-center">
                <Switch checked={improvedLandRate} onCheckedChange={setImprovedLandRate} />
              </div>
              <Input placeholder="$ 246.30" className="text-sm" />
              <Input placeholder="Improved land rate comparison..." className="text-sm" />
            </div>

            {/* Improvements Rate */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Improvements Rate</Label>
              <div className="flex justify-center">
                <Switch checked={improvementsRate} onCheckedChange={setImprovementsRate} />
              </div>
              <Input placeholder="$ 3,501.75" className="text-sm" />
              <Input placeholder="Improvements rate comparison..." className="text-sm" />
            </div>

            {/* Market Conditions */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Market Conditions</Label>
              <div className="flex justify-center">
                <Switch checked={marketConditions} onCheckedChange={setMarketConditions} />
              </div>
              <Input placeholder="Comparable" className="text-sm" />
              <Input placeholder="Market conditions comparison..." className="text-sm" />
            </div>

            {/* Zoning */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Zoning</Label>
              <div className="flex justify-center">
                <Switch checked={zoning} onCheckedChange={setZoning} />
              </div>
              <Input placeholder="Low Density Residential Zone" className="text-sm" />
              <Input placeholder="Zoning comparison..." className="text-sm" />
            </div>

            {/* Local Sales Agent */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Local Sales Agent</Label>
              <div className="flex justify-center">
                <Switch checked={localSalesAgent} onCheckedChange={setLocalSalesAgent} />
              </div>
              <Input placeholder="Yes – Ray White" className="text-sm" />
              <Input placeholder="Agent comparison..." className="text-sm" />
            </div>

            {/* Property Description */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Property Description</Label>
              <div className="flex justify-center">
                <Switch checked={propertyDescription} onCheckedChange={setPropertyDescription} />
              </div>
              <Textarea 
                placeholder="Renovated single level recently renovated to a very good quality dwelling featuring 4 bedrooms and 2" 
                className="text-sm min-h-16"
              />
              <Input placeholder="Property description comparison..." className="text-sm" />
            </div>

            {/* Comparison Comments */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Comparison Comments</Label>
              <div className="flex justify-center">
                <Switch checked={comparisonComments} onCheckedChange={setComparisonComments} />
              </div>
              <Textarea 
                placeholder="Nearby inferior location due to no lake views. Smaller dwelling in superior condition. Similar ancillary" 
                className="text-sm min-h-16"
              />
              <Input placeholder="Overall comparison summary..." className="text-sm" />
            </div>

            {/* NaTHERS Rating */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>NaTHERS Rating</Label>
              <div className="flex justify-center">
                <Switch checked={nathersRating} onCheckedChange={setNathersRating} />
              </div>
              <Select>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="NaTHERS rating (0-10)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="6">6 Stars</SelectItem>
                  <SelectItem value="7">7 Stars</SelectItem>
                  <SelectItem value="8">8 Stars</SelectItem>
                  <SelectItem value="9">9 Stars</SelectItem>
                  <SelectItem value="10">10 Stars</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="NaTHERS comparison..." className="text-sm" />
            </div>

            {/* SEIFA Score */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>SEIFA Score</Label>
              <div className="flex justify-center">
                <Switch checked={seifaScore} onCheckedChange={setSeifaScore} />
              </div>
              <Input placeholder="SEIFA score" className="text-sm" />
              <Input placeholder="SEIFA score comparison..." className="text-sm" />
            </div>

            {/* Schooling Zone */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Schooling Zone</Label>
              <div className="flex justify-center">
                <Switch checked={schoolingZone} onCheckedChange={setSchoolingZone} />
              </div>
              <Input placeholder="Primary and secondary school zones" className="text-sm" />
              <Input placeholder="Schooling zone comparison..." className="text-sm" />
            </div>
          </div>

          {/* Sale Analysis Summation */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-4">Sale Analysis Summation</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-4 text-sm font-medium border-b pb-2">
                <div>Component</div>
                <div className="text-center">Include</div>
                <div className="text-center">Area | Rate</div>
                <div className="text-center">Added Value</div>
                <div></div>
              </div>

              {/* Land Value */}
              <div className="grid grid-cols-5 gap-4 items-center py-2">
                <Label>Land Value</Label>
                <div className="flex justify-center">
                  <Switch defaultChecked />
                </div>
                <div className="text-center text-sm">4052 | 85</div>
                <div className="text-center text-sm">$ 344,420.00</div>
                <div></div>
              </div>

              {/* Dwelling Value */}
              <div className="grid grid-cols-5 gap-4 items-center py-2">
                <Label>Dwelling Value</Label>
                <div className="flex justify-center">
                  <Switch defaultChecked />
                </div>
                <div className="text-center text-sm">285 | 1700</div>
                <div className="text-center text-sm">$ 484,500.00</div>
                <div></div>
              </div>

              {/* Car Accommodation */}
              <div className="grid grid-cols-5 gap-4 items-center py-2">
                <Label>Car Accommodation</Label>
                <div className="flex justify-center">
                  <Switch defaultChecked />
                </div>
                <div className="text-center text-sm">36 | 400</div>
                <div className="text-center text-sm">$ 14,400.00</div>
                <div></div>
              </div>

              {/* Outdoor Areas */}
              <div className="grid grid-cols-5 gap-4 items-center py-2">
                <Label>Outdoor Areas</Label>
                <div className="flex justify-center">
                  <Switch defaultChecked />
                </div>
                <div className="text-center text-sm">1 | 40000</div>
                <div className="text-center text-sm">$ 40,000.00</div>
                <div></div>
              </div>

              {/* Shedding */}
              <div className="grid grid-cols-5 gap-4 items-center py-2">
                <Label>Shedding</Label>
                <div className="flex justify-center">
                  <Switch defaultChecked />
                </div>
                <div className="text-center text-sm">240 | 300</div>
                <div className="text-center text-sm">$ 72,000.00</div>
                <div></div>
              </div>

              {/* Pool */}
              <div className="grid grid-cols-5 gap-4 items-center py-2">
                <Label>Pool</Label>
                <div className="flex justify-center">
                  <Switch defaultChecked />
                </div>
                <div className="text-center text-sm">1 | 0</div>
                <div className="text-center text-sm">$ 0</div>
                <div></div>
              </div>

              {/* FPG */}
              <div className="grid grid-cols-5 gap-4 items-center py-2">
                <Label>FPG</Label>
                <div className="flex justify-center">
                  <Switch defaultChecked />
                </div>
                <div className="text-center text-sm">1 | 45000</div>
                <div className="text-center text-sm">$ 45,000.00</div>
                <div></div>
              </div>

              {/* Total */}
              <div className="grid grid-cols-5 gap-4 items-center py-2 border-t pt-2">
                <Label className="font-semibold">Total</Label>
                <div></div>
                <div className="text-center text-sm font-medium">Calculated</div>
                <div className="text-center text-sm font-semibold">$ 1,000,320.00</div>
                <div></div>
              </div>

              {/* Rounded */}
              <div className="grid grid-cols-5 gap-4 items-center py-2">
                <Label className="font-semibold">Rounded</Label>
                <div></div>
                <div className="text-center text-sm font-medium">Final</div>
                <div className="text-center text-sm font-semibold">$ 998,000.00</div>
                <div></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}