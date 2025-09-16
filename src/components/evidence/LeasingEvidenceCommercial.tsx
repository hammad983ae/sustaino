import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, MapPin } from "lucide-react";

export default function LeasingEvidenceCommercial() {
  const [commencementDate, setCommencementDate] = useState(true);
  const [incentives, setIncentives] = useState(true);
  const [termsOptions, setTermsOptions] = useState(true);
  const [reviewMechanism, setReviewMechanism] = useState(true);
  const [faceRent, setFaceRent] = useState(true);
  const [effectiveRent, setEffectiveRent] = useState(true);
  const [grossRent, setGrossRent] = useState(true);
  const [outgoings, setOutgoings] = useState(true);
  const [landTax, setLandTax] = useState(true);
  const [netRent, setNetRent] = useState(true);
  const [ratesPerSqm, setRatesPerSqm] = useState(true);
  const [wale, setWale] = useState(true);
  const [esgFactors, setEsgFactors] = useState(true);
  const [buildingArea, setBuildingArea] = useState(true);
  const [tenancy, setTenancy] = useState(true);
  const [zoning, setZoning] = useState(true);
  const [buildingCondition, setBuildingCondition] = useState(true);
  const [streetAccess, setStreetAccess] = useState(true);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Commercial Leasing Evidence</h3>
          
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

            {/* Commencement Date */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Commencement Date</Label>
              <div className="flex justify-center">
                <Switch checked={commencementDate} onCheckedChange={setCommencementDate} />
              </div>
              <Input placeholder="01 March 2024" className="text-sm" />
              <Input placeholder="Lease commencement comparison..." className="text-sm" />
            </div>

            {/* Incentives */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Incentives</Label>
              <div className="flex justify-center">
                <Switch checked={incentives} onCheckedChange={setIncentives} />
              </div>
              <Input placeholder="6 months rent-free, fit-out" className="text-sm" />
              <Input placeholder="Incentives comparison..." className="text-sm" />
            </div>

            {/* Terms/Options */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Terms/Options</Label>
              <div className="flex justify-center">
                <Switch checked={termsOptions} onCheckedChange={setTermsOptions} />
              </div>
              <Input placeholder="5 year + 5 year option" className="text-sm" />
              <Input placeholder="Terms comparison..." className="text-sm" />
            </div>

            {/* Review Mechanism */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Review Mechanism</Label>
              <div className="flex justify-center">
                <Switch checked={reviewMechanism} onCheckedChange={setReviewMechanism} />
              </div>
              <Select>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Fixed %, CPI, Market Review" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed-percent">Fixed %</SelectItem>
                  <SelectItem value="cpi">CPI</SelectItem>
                  <SelectItem value="fixed-amount">Fixed Amount</SelectItem>
                  <SelectItem value="market-review">Market Review</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Review mechanism comparison..." className="text-sm" />
            </div>

            {/* Face Rent */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Face Rent</Label>
              <div className="flex justify-center">
                <Switch checked={faceRent} onCheckedChange={setFaceRent} />
              </div>
              <Input placeholder="$120,000 p.a." className="text-sm" />
              <Input placeholder="Face rent comparison..." className="text-sm" />
            </div>

            {/* Effective Rent */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Effective Rent</Label>
              <div className="flex justify-center">
                <Switch checked={effectiveRent} onCheckedChange={setEffectiveRent} />
              </div>
              <Input placeholder="$110,000 p.a." className="text-sm" />
              <Input placeholder="Effective rent comparison..." className="text-sm" />
            </div>

            {/* Gross Rent */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Gross Rent</Label>
              <div className="flex justify-center">
                <Switch checked={grossRent} onCheckedChange={setGrossRent} />
              </div>
              <Input placeholder="$135,000 p.a." className="text-sm" />
              <Input placeholder="Gross rent comparison..." className="text-sm" />
            </div>

            {/* Outgoings */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Outgoings</Label>
              <div className="flex justify-center">
                <Switch checked={outgoings} onCheckedChange={setOutgoings} />
              </div>
              <Input placeholder="$15,000 p.a." className="text-sm" />
              <Input placeholder="Outgoings comparison..." className="text-sm" />
            </div>

            {/* Land Tax */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Land Tax</Label>
              <div className="flex justify-center">
                <Switch checked={landTax} onCheckedChange={setLandTax} />
              </div>
              <Input placeholder="$8,500 p.a." className="text-sm" />
              <Input placeholder="Land tax comparison..." className="text-sm" />
            </div>

            {/* Net Rent */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Net Rent</Label>
              <div className="flex justify-center">
                <Switch checked={netRent} onCheckedChange={setNetRent} />
              </div>
              <Input placeholder="$120,000 p.a." className="text-sm" />
              <Input placeholder="Net rent comparison..." className="text-sm" />
            </div>

            {/* Rate per sqm */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Rate per sqm</Label>
              <div className="flex justify-center">
                <Switch checked={ratesPerSqm} onCheckedChange={setRatesPerSqm} />
              </div>
              <Input placeholder="$267/sqm" className="text-sm" />
              <Input placeholder="Rate per sqm comparison..." className="text-sm" />
            </div>

            {/* WALE */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>WALE</Label>
              <div className="flex justify-center">
                <Switch checked={wale} onCheckedChange={setWale} />
              </div>
              <Input placeholder="3.2 years" className="text-sm" />
              <Input placeholder="WALE comparison..." className="text-sm" />
            </div>

            {/* ESG Factors */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>ESG Factors</Label>
              <div className="flex justify-center">
                <Switch checked={esgFactors} onCheckedChange={setEsgFactors} />
              </div>
              <Input placeholder="NABERS 4.5 stars, solar" className="text-sm" />
              <Input placeholder="ESG factors comparison..." className="text-sm" />
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

            {/* Tenancy */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Tenancy</Label>
              <div className="flex justify-center">
                <Switch checked={tenancy} onCheckedChange={setTenancy} />
              </div>
              <Input placeholder="Single tenant" className="text-sm" />
              <Input placeholder="Tenancy comparison..." className="text-sm" />
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
              <Input placeholder="Good condition" className="text-sm" />
              <Input placeholder="Building condition comparison..." className="text-sm" />
            </div>

            {/* Street Access */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Street Access</Label>
              <div className="flex justify-center">
                <Switch checked={streetAccess} onCheckedChange={setStreetAccess} />
              </div>
              <Input placeholder="Main road frontage" className="text-sm" />
              <Input placeholder="Street access comparison..." className="text-sm" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}