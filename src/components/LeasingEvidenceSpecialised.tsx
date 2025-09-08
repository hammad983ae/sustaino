import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, MapPin } from "lucide-react";

export default function LeasingEvidenceSpecialised() {
  const [commencementDate, setCommencementDate] = useState(true);
  const [specializedTerms, setSpecializedTerms] = useState(true);
  const [equipmentIncluded, setEquipmentIncluded] = useState(true);
  const [regulatoryCompliance, setRegulatoryCompliance] = useState(true);
  const [netRent, setNetRent] = useState(true);
  const [ratesPerUnit, setRatesPerUnit] = useState(true);
  const [esgFactors, setEsgFactors] = useState(true);
  const [specializedType, setSpecializedType] = useState(true);
  const [roomsKeys, setRoomsKeys] = useState(true);
  const [seatingCapacity, setSeatingCapacity] = useState(true);
  const [ldcPlacements, setLdcPlacements] = useState(true);
  const [bedCapacity, setBedCapacity] = useState(true);
  const [lettableAreaType, setLettableAreaType] = useState(true);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Specialised Leasing Evidence</h3>
          
          {/* Property Address Input */}
          <div className="mb-6">
            <div className="flex items-center gap-2 p-3 border border-primary rounded-lg bg-primary/5">
              <Input 
                placeholder="Property Address: Eg. 789 Healthcare Drive Melbourne VIC 3000"
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
              <Input placeholder="1st June 2024" className="text-sm" />
              <Input placeholder="Lease commencement comparison..." className="text-sm" />
            </div>

            {/* Specialized Terms */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Specialized Terms</Label>
              <div className="flex justify-center">
                <Switch checked={specializedTerms} onCheckedChange={setSpecializedTerms} />
              </div>
              <Input placeholder="10 year initial + 5 year option" className="text-sm" />
              <Input placeholder="Terms comparison..." className="text-sm" />
            </div>

            {/* Equipment Included */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Equipment Included</Label>
              <div className="flex justify-center">
                <Switch checked={equipmentIncluded} onCheckedChange={setEquipmentIncluded} />
              </div>
              <Input placeholder="Medical equipment, kitchen facilities" className="text-sm" />
              <Input placeholder="Equipment comparison..." className="text-sm" />
            </div>

            {/* Regulatory Compliance */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Regulatory Compliance</Label>
              <div className="flex justify-center">
                <Switch checked={regulatoryCompliance} onCheckedChange={setRegulatoryCompliance} />
              </div>
              <Input placeholder="ACQHS accredited, fire safety compliant" className="text-sm" />
              <Input placeholder="Compliance comparison..." className="text-sm" />
            </div>

            {/* Net Rent */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Net Rent</Label>
              <div className="flex justify-center">
                <Switch checked={netRent} onCheckedChange={setNetRent} />
              </div>
              <Input placeholder="$180,000 per annum net" className="text-sm" />
              <Input placeholder="Net rent comparison..." className="text-sm" />
            </div>

            {/* Rates Per Unit */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Rates Per Unit</Label>
              <div className="flex justify-center">
                <Switch checked={ratesPerUnit} onCheckedChange={setRatesPerUnit} />
              </div>
              <div className="flex gap-2">
                <Input placeholder="450" className="text-sm" />
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="$/sqm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sqm">$/sqm</SelectItem>
                    <SelectItem value="bed">$/bed</SelectItem>
                    <SelectItem value="room">$/room</SelectItem>
                    <SelectItem value="key">$/key</SelectItem>
                    <SelectItem value="seat">$/seat</SelectItem>
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
              <Input placeholder="NABERS 5 stars, accessibility features" className="text-sm" />
              <Input placeholder="ESG factors comparison..." className="text-sm" />
            </div>

            {/* Specialized Property Type */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Specialized Property Type</Label>
              <div className="flex justify-center">
                <Switch checked={specializedType} onCheckedChange={setSpecializedType} />
              </div>
              <Select>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aged-care">Aged Care</SelectItem>
                  <SelectItem value="childcare">Childcare</SelectItem>
                  <SelectItem value="medical">Medical Centre</SelectItem>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="education">Educational</SelectItem>
                  <SelectItem value="leisure">Leisure/Entertainment</SelectItem>
                  <SelectItem value="service-station">Service Station</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Property type comparison..." className="text-sm" />
            </div>

            {/* Rooms/Keys */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Rooms/Keys</Label>
              <div className="flex justify-center">
                <Switch checked={roomsKeys} onCheckedChange={setRoomsKeys} />
              </div>
              <Input placeholder="120 rooms/keys" className="text-sm" />
              <Input placeholder="Rooms/keys comparison..." className="text-sm" />
            </div>

            {/* Seating Capacity */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Seating Capacity</Label>
              <div className="flex justify-center">
                <Switch checked={seatingCapacity} onCheckedChange={setSeatingCapacity} />
              </div>
              <Input placeholder="300 seats" className="text-sm" />
              <Input placeholder="Seating capacity comparison..." className="text-sm" />
            </div>

            {/* LDC Placements */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>LDC Placements</Label>
              <div className="flex justify-center">
                <Switch checked={ldcPlacements} onCheckedChange={setLdcPlacements} />
              </div>
              <Input placeholder="75 licensed places" className="text-sm" />
              <Input placeholder="LDC placements comparison..." className="text-sm" />
            </div>

            {/* Bed Capacity */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Bed Capacity</Label>
              <div className="flex justify-center">
                <Switch checked={bedCapacity} onCheckedChange={setBedCapacity} />
              </div>
              <Input placeholder="80 beds" className="text-sm" />
              <Input placeholder="Bed capacity comparison..." className="text-sm" />
            </div>

            {/* Lettable Area Type */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Lettable Area Type</Label>
              <div className="flex justify-center">
                <Switch checked={lettableAreaType} onCheckedChange={setLettableAreaType} />
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
              <Input placeholder="Lettable area comparison..." className="text-sm" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}