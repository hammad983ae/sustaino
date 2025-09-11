import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, MapPin } from "lucide-react";

export default function LeasingEvidenceResidential() {
  const [commencementDate, setCommencementDate] = useState(true);
  const [weeklyRent, setWeeklyRent] = useState(true);
  const [leaseDuration, setLeaseDuration] = useState(true);
  const [bondAmount, setBondAmount] = useState(true);
  const [petPolicy, setPetPolicy] = useState(true);
  const [utilitiesIncluded, setUtilitiesIncluded] = useState(true);
  const [esgFactors, setEsgFactors] = useState(true);
  const [bedrooms, setBedrooms] = useState(true);
  const [bathrooms, setBathrooms] = useState(true);
  const [carParking, setCarParking] = useState(true);
  const [propertyType, setPropertyType] = useState(true);
  const [landArea, setLandArea] = useState(true);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Residential Leasing Evidence</h3>
          
          {/* Property Address Input */}
          <div className="mb-6">
            <div className="flex items-center gap-2 p-3 border border-primary rounded-lg bg-primary/5">
              <Input 
                placeholder="Property Address: Eg. 45 Smith Street Richmond VIC 3121"
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
              <Input placeholder="15th February 2024" className="text-sm" />
              <Input placeholder="Lease commencement comparison..." className="text-sm" />
            </div>

            {/* Weekly Rent */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Weekly Rent</Label>
              <div className="flex justify-center">
                <Switch checked={weeklyRent} onCheckedChange={setWeeklyRent} />
              </div>
              <Input placeholder="$650 per week" className="text-sm" />
              <Input placeholder="Weekly rent comparison..." className="text-sm" />
            </div>

            {/* Lease Duration */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Lease Duration</Label>
              <div className="flex justify-center">
                <Switch checked={leaseDuration} onCheckedChange={setLeaseDuration} />
              </div>
              <Select>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6-months">6 Months</SelectItem>
                  <SelectItem value="12-months">12 Months</SelectItem>
                  <SelectItem value="24-months">24 Months</SelectItem>
                  <SelectItem value="month-to-month">Month to Month</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Lease duration comparison..." className="text-sm" />
            </div>

            {/* Bond Amount */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Bond Amount</Label>
              <div className="flex justify-center">
                <Switch checked={bondAmount} onCheckedChange={setBondAmount} />
              </div>
              <Input placeholder="$2,600 (4 weeks)" className="text-sm" />
              <Input placeholder="Bond amount comparison..." className="text-sm" />
            </div>

            {/* Pet Policy */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Pet Policy</Label>
              <div className="flex justify-center">
                <Switch checked={petPolicy} onCheckedChange={setPetPolicy} />
              </div>
              <Select>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-pets">No Pets</SelectItem>
                  <SelectItem value="cats-only">Cats Only</SelectItem>
                  <SelectItem value="dogs-only">Dogs Only</SelectItem>
                  <SelectItem value="pets-allowed">Pets Allowed</SelectItem>
                  <SelectItem value="negotiable">Negotiable</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Pet policy comparison..." className="text-sm" />
            </div>

            {/* Utilities Included */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Utilities Included</Label>
              <div className="flex justify-center">
                <Switch checked={utilitiesIncluded} onCheckedChange={setUtilitiesIncluded} />
              </div>
              <Input placeholder="Water, gas excluded; electricity included" className="text-sm" />
              <Input placeholder="Utilities comparison..." className="text-sm" />
            </div>

            {/* ESG Factors */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>ESG Factors</Label>
              <div className="flex justify-center">
                <Switch checked={esgFactors} onCheckedChange={setEsgFactors} />
              </div>
              <Input placeholder="Solar panels, rainwater tank, energy efficient" className="text-sm" />
              <Input placeholder="ESG factors comparison..." className="text-sm" />
            </div>

            {/* Bedrooms */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Bedrooms</Label>
              <div className="flex justify-center">
                <Switch checked={bedrooms} onCheckedChange={setBedrooms} />
              </div>
              <Input placeholder="3" className="text-sm" />
              <Input placeholder="Bedroom comparison..." className="text-sm" />
            </div>

            {/* Bathrooms */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Bathrooms</Label>
              <div className="flex justify-center">
                <Switch checked={bathrooms} onCheckedChange={setBathrooms} />
              </div>
              <Input placeholder="2" className="text-sm" />
              <Input placeholder="Bathroom comparison..." className="text-sm" />
            </div>

            {/* Car Parking */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Car Parking</Label>
              <div className="flex justify-center">
                <Switch checked={carParking} onCheckedChange={setCarParking} />
              </div>
              <Input placeholder="2 covered spaces" className="text-sm" />
              <Input placeholder="Parking comparison..." className="text-sm" />
            </div>

            {/* Property Type */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Property Type</Label>
              <div className="flex justify-center">
                <Switch checked={propertyType} onCheckedChange={setPropertyType} />
              </div>
              <Select>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="unit">Unit</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Property type comparison..." className="text-sm" />
            </div>

            {/* Land Area */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Land Area</Label>
              <div className="flex justify-center">
                <Switch checked={landArea} onCheckedChange={setLandArea} />
              </div>
              <div className="flex gap-2">
                <Input placeholder="650" className="text-sm" />
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}