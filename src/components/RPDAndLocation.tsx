import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Sparkles, Building, FileText } from "lucide-react";

const RPDAndLocation = () => {
  return (
    <div className="space-y-6">
      {/* Auto Generate Button */}
      <div className="flex justify-center">
        <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
          <Sparkles className="h-4 w-4 mr-2" />
          Auto-Generate Location Data
        </Button>
      </div>

      {/* 1. Street Address/Lot/Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg">Street Address / Lot Plan</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="street-address" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="street-address" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Street Address
              </TabsTrigger>
              <TabsTrigger value="lot-plan" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Lot/Plan
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="street-address" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unit">Unit (Optional)</Label>
                  <Input id="unit" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="street-number">Street Number *</Label>
                  <Input id="street-number" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="street-name">Street Name *</Label>
                  <Input id="street-name" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="street-type">Street Type</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="street">Street</SelectItem>
                      <SelectItem value="road">Road</SelectItem>
                      <SelectItem value="avenue">Avenue</SelectItem>
                      <SelectItem value="court">Court</SelectItem>
                      <SelectItem value="close">Close</SelectItem>
                      <SelectItem value="drive">Drive</SelectItem>
                      <SelectItem value="lane">Lane</SelectItem>
                      <SelectItem value="place">Place</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="suburb">Suburb *</Label>
                  <Input id="suburb" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Select>
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
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input id="postcode" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" value="Australia" readOnly className="mt-1 bg-muted" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="lot-plan" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lot-number">Lot Number *</Label>
                  <Input id="lot-number" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="plan-number">Plan Number *</Label>
                  <Input id="plan-number" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lot-suburb">Suburb *</Label>
                  <Input id="lot-suburb" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lot-state">State *</Label>
                  <Select>
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
                  <Label htmlFor="lot-postcode">Postcode</Label>
                  <Input id="lot-postcode" placeholder="" className="mt-1" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 2. LGA, Zoning, Current Use */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">LGA, Zoning & Current Use</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="lga">LGA</Label>
              <Input id="lga" placeholder="" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="zoning">Zoning</Label>
              <Input id="zoning" placeholder="" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="current-use">Current Use</Label>
              <Input id="current-use" placeholder="" className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Google Maps and Property Identified by */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-500" />
            <CardTitle className="text-lg">Google Maps - Subject Property Location</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="3 Freshwater Court" className="w-full" />
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Map View</Button>
            <Button variant="outline" size="sm">Satellite</Button>
            <Button className="ml-auto bg-emerald-500 hover:bg-emerald-600 text-white">Search</Button>
          </div>
          
          {/* Map Placeholder */}
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Interactive Map View</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              Property Identified By
              <Switch />
              <span className="text-sm text-muted-foreground">Include</span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="physical-inspection" />
                <Label htmlFor="physical-inspection" className="text-sm">Physical Inspection</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="surveyor-peg" />
                <Label htmlFor="surveyor-peg" className="text-sm">Surveyor Peg</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="plan" />
                <Label htmlFor="plan" className="text-sm">Plan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cadastral-map" />
                <Label htmlFor="cadastral-map" className="text-sm">Cadastral Map</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="certificate-title" />
                <Label htmlFor="certificate-title" className="text-sm">Certificate of Title</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="aerial-mapping" />
                <Label htmlFor="aerial-mapping" className="text-sm">Aerial Mapping</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="other" />
                <Label htmlFor="other" className="text-sm">Other (Please specify)</Label>
              </div>
            </div>
            <div className="mt-2">
              <Textarea placeholder="Please specify other identification method..." className="h-20" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Property Location and Site Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Property Location & Site Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            {
              title: "Location",
              placeholder: "Describe the property location in relation to major landmarks, transport routes, and commercial centers..."
            },
            {
              title: "Access",
              placeholder: "Describe property access including road types, traffic conditions, public transport, and parking availability..."
            },
            {
              title: "Site Description",
              placeholder: "Describe the physical characteristics of the site including shape, topography, frontage, and area..."
            },
            {
              title: "Neighbourhood",
              placeholder: "Describe the surrounding area including property types, land use, and general character..."
            },
            {
              title: "Amenities",
              placeholder: "List nearby amenities including shopping centers, schools, hospitals, recreational facilities, and their distances..."
            },
            {
              title: "Services",
              placeholder: "Describe available services including utilities (water, gas, electricity, sewerage), telecommunications, and internet..."
            }
          ].map((section, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">{section.title}</h4>
                <div className="flex items-center space-x-2">
                  <Label htmlFor={`include-${section.title.toLowerCase()}`} className="text-sm">Include in report</Label>
                  <Switch id={`include-${section.title.toLowerCase()}`} defaultChecked />
                </div>
              </div>
              <Textarea 
                placeholder={section.placeholder}
                className="h-24"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RPDAndLocation;