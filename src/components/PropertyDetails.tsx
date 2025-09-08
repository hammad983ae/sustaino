import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, Printer } from "lucide-react";

const PropertyDetails = () => {
  const [includeSection, setIncludeSection] = useState(true);
  const [lockData, setLockData] = useState(false);
  const [propertyTypes, setPropertyTypes] = useState({
    commercial: true,
    residential: false,
    agriculture: false,
    developmentLand: false
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Property Details</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="include-property-details">Include</Label>
            <Switch
              id="include-property-details"
              checked={includeSection}
              onCheckedChange={setIncludeSection}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="lock-property-data">Lock Data</Label>
            <Switch
              id="lock-property-data"
              checked={lockData}
              onCheckedChange={setLockData}
            />
          </div>
          <Button variant="outline" size="sm">
            <Lock className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Property Description</CardTitle>
          <p className="text-sm text-muted-foreground">
            Select property type and provide detailed description based on property characteristics.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Property Type Selection */}
          <div>
            <Label className="text-base font-medium mb-4 block">Property Type</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={propertyTypes.commercial}
                  onCheckedChange={(checked) => 
                    setPropertyTypes(prev => ({ ...prev, commercial: checked }))
                  }
                />
                <Label>Commercial</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={propertyTypes.residential}
                  onCheckedChange={(checked) => 
                    setPropertyTypes(prev => ({ ...prev, residential: checked }))
                  }
                />
                <Label>Residential</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={propertyTypes.agriculture}
                  onCheckedChange={(checked) => 
                    setPropertyTypes(prev => ({ ...prev, agriculture: checked }))
                  }
                />
                <Label>Agriculture</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={propertyTypes.developmentLand}
                  onCheckedChange={(checked) => 
                    setPropertyTypes(prev => ({ ...prev, developmentLand: checked }))
                  }
                />
                <Label>Development Land</Label>
              </div>
            </div>
          </div>

          {/* Commercial Property Details */}
          {propertyTypes.commercial && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Commercial Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="building-type">Building Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select building type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="warehouse">Warehouse</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="building-quality">Building Quality</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="average">Average</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="net-lettable-area">Net Lettable Area (sqm)</Label>
                    <Input id="net-lettable-area" placeholder="Enter lettable area" />
                  </div>

                  <div>
                    <Label htmlFor="current-tenancy">Current Tenancy</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tenancy status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner-occupied">Owner Occupied</SelectItem>
                        <SelectItem value="leased">Leased</SelectItem>
                        <SelectItem value="vacant">Vacant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="car-parking">Car Parking Spaces</Label>
                    <Input id="car-parking" placeholder="Number of spaces" />
                  </div>

                  <div>
                    <Label htmlFor="building-condition">Building Condition</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="year-built">Year Built</Label>
                    <Input id="year-built" placeholder="Construction year" />
                  </div>

                  <div>
                    <Label htmlFor="access-loading">Access & Loading</Label>
                    <Textarea id="access-loading" placeholder="Describe access facilities" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="additional-features">Additional Features</Label>
                  <Textarea 
                    id="additional-features" 
                    placeholder="Describe additional commercial features, amenities, and characteristics..."
                    className="min-h-[100px]"
                  />
                </div>

                {/* Construction Details */}
                <div className="space-y-4">
                  <h4 className="font-medium">Construction Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="foundation">Foundation</Label>
                      <Input id="foundation" placeholder="Foundation type" />
                    </div>
                    <div>
                      <Label htmlFor="roof">Roof</Label>
                      <Input id="roof" placeholder="Roof material" />
                    </div>
                    <div>
                      <Label htmlFor="windows">Windows</Label>
                      <Input id="windows" placeholder="Window type" />
                    </div>
                    <div>
                      <Label htmlFor="exterior-cladding">Exterior Cladding</Label>
                      <Input id="exterior-cladding" placeholder="Cladding material" />
                    </div>
                    <div>
                      <Label htmlFor="internal-cladding">Internal Cladding</Label>
                      <Input id="internal-cladding" placeholder="Internal cladding" />
                    </div>
                    <div>
                      <Label htmlFor="layout">Layout</Label>
                      <Input id="layout" placeholder="Layout description" />
                    </div>
                    <div>
                      <Label htmlFor="ceilings">Ceilings</Label>
                      <Input id="ceilings" placeholder="Ceiling type" />
                    </div>
                    <div>
                      <Label htmlFor="external-condition">External Condition</Label>
                      <Input id="external-condition" placeholder="External condition" />
                    </div>
                    <div>
                      <Label htmlFor="internal-condition">Internal Condition</Label>
                      <Input id="internal-condition" placeholder="Internal condition" />
                    </div>
                    <div>
                      <Label htmlFor="signage">Signage</Label>
                      <Input id="signage" placeholder="Signage details" />
                    </div>
                    <div>
                      <Label htmlFor="floor-coverings">Floor Coverings</Label>
                      <Input id="floor-coverings" placeholder="Floor covering type" />
                    </div>
                    <div>
                      <Label htmlFor="fixtures-fittings">Fixtures and Fittings</Label>
                      <Input id="fixtures-fittings" placeholder="Fixtures and fittings" />
                    </div>
                    <div>
                      <Label htmlFor="pathways">Pathways</Label>
                      <Input id="pathways" placeholder="Pathway details" />
                    </div>
                    <div>
                      <Label htmlFor="fencing">Fencing</Label>
                      <Input id="fencing" placeholder="Fencing details" />
                    </div>
                    <div>
                      <Label htmlFor="parking">Parking</Label>
                      <Input id="parking" placeholder="Parking arrangements" />
                    </div>
                    <div>
                      <Label htmlFor="disability-amenities">Disability Amenities</Label>
                      <Input id="disability-amenities" placeholder="Disability amenities" />
                    </div>
                    <div>
                      <Label htmlFor="communal-areas">Communal Areas</Label>
                      <Input id="communal-areas" placeholder="Communal areas" />
                    </div>
                  </div>
                </div>

                {/* Areas */}
                <div className="space-y-4">
                  <h4 className="font-medium">Areas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="glar">GLAR (sqm)</Label>
                      <Input id="glar" placeholder="Gross lettable area" />
                    </div>
                    <div>
                      <Label htmlFor="awning">Awning (sqm)</Label>
                      <Input id="awning" placeholder="Awning area" />
                    </div>
                    <div>
                      <Label htmlFor="atrium">Atrium (sqm)</Label>
                      <Input id="atrium" placeholder="Atrium area" />
                    </div>
                    <div>
                      <Label htmlFor="total-area">Total Area (sqm)</Label>
                      <Input id="total-area" placeholder="Total area" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Residential Property Details */}
          {propertyTypes.residential && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Residential Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Building Description */}
                <div className="space-y-4">
                  <h4 className="font-medium">Building Description</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="built-about">Built About</Label>
                      <Input id="built-about" placeholder="e.g., Circa 2005" />
                    </div>
                    <div>
                      <Label htmlFor="additions">Additions</Label>
                      <Input id="additions" placeholder="e.g., N/A" />
                    </div>
                    <div>
                      <Label htmlFor="main-walls">Main Walls</Label>
                      <Input id="main-walls" placeholder="e.g., Rendered Brick Walls" />
                    </div>
                    <div>
                      <Label htmlFor="roof">Roof</Label>
                      <Input id="roof" placeholder="e.g., Tiled" />
                    </div>
                    <div>
                      <Label htmlFor="flooring">Flooring</Label>
                      <Input id="flooring" placeholder="e.g., Concrete slab and timber for second storey" />
                    </div>
                    <div>
                      <Label htmlFor="interior-linings">Interior Linings</Label>
                      <Input id="interior-linings" placeholder="e.g., Plasterboard" />
                    </div>
                    <div>
                      <Label htmlFor="window-frames">Window Frames</Label>
                      <Input id="window-frames" placeholder="e.g., Aluminium" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="accommodation">Accommodation</Label>
                    <Textarea 
                      id="accommodation" 
                      placeholder="e.g., 3 Bedroom(s) And 3 Bathroom(s) Plus study/fourth bedroom, laundry, powdered room, walk in pantry, lounge/theatre room, family/meals/kitchen, gallery, entry, 2 x walk in robes"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="fixtures-features">Fixtures & Features</Label>
                    <Textarea 
                      id="fixtures-features" 
                      placeholder="e.g., reverse cycle heating and cooling, split systems, 2 x gas log fires, evaporative cooling, integrated audio speakers throughout, laminate and marble benchtops, tiles, carpet, high decorative ceilings, timber stair case, 900 mm gas stove, double wall oven, 900 mm rangehood, timber cupboards (floor and wall), down lights, instant gas HWS"
                      className="min-h-[120px]"
                    />
                  </div>
                </div>

                {/* Areas */}
                <div className="space-y-4">
                  <h4 className="font-medium">Areas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="living-areas">Living Areas</Label>
                      <Input id="living-areas" placeholder="e.g., 336.00 Sqm" />
                    </div>
                    <div>
                      <Label htmlFor="outdoor-areas">Outdoor Areas</Label>
                      <Input id="outdoor-areas" placeholder="e.g., 14.00 Sqm" />
                    </div>
                    <div>
                      <Label htmlFor="car-areas">Car Areas</Label>
                      <Input id="car-areas" placeholder="e.g., 72.00 Sqm" />
                    </div>
                    <div>
                      <Label htmlFor="other-areas">Other Areas</Label>
                      <Input id="other-areas" placeholder="e.g., 0.00 Sqm" />
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ancillary-improvements">Ancillary Improvements</Label>
                    <Textarea 
                      id="ancillary-improvements" 
                      placeholder="e.g., Balcony, verandahs/outdoor area, undercover BBQ area with built in BBQ, workshop, fernery, extensive gardens with removable garden beds and gravel surrounds, automated irrigation, clothes line, fountain/pond, full concrete pathing throughout gardens and house surrounds, color bond and powdered coating aluminium fencing"
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="internal-condition">Internal Condition</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="external-condition">External Condition</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="essential-repairs">Essential Repairs</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Agricultural Property Details */}
          {propertyTypes.agriculture && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Agricultural Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="total-land-area">Total Land Area (hectares)</Label>
                    <Input id="total-land-area" placeholder="Total land area" />
                  </div>
                  <div>
                    <Label htmlFor="arable-area">Arable Area (hectares)</Label>
                    <Input id="arable-area" placeholder="Arable area" />
                  </div>
                  <div>
                    <Label htmlFor="pasture-area">Pasture Area (hectares)</Label>
                    <Input id="pasture-area" placeholder="Pasture area" />
                  </div>
                  <div>
                    <Label htmlFor="water-rights">Water Rights</Label>
                    <Input id="water-rights" placeholder="Water rights details" />
                  </div>
                  <div>
                    <Label htmlFor="soil-type">Soil Type</Label>
                    <Input id="soil-type" placeholder="Soil classification" />
                  </div>
                  <div>
                    <Label htmlFor="irrigation">Irrigation</Label>
                    <Input id="irrigation" placeholder="Irrigation systems" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="agricultural-features">Agricultural Features</Label>
                  <Textarea 
                    id="agricultural-features" 
                    placeholder="Describe agricultural infrastructure, buildings, and features..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Development Land Details */}
          {propertyTypes.developmentLand && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Development Land Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="site-area">Site Area (sqm)</Label>
                    <Input id="site-area" placeholder="Site area" />
                  </div>
                  <div>
                    <Label htmlFor="zoning">Zoning</Label>
                    <Input id="zoning" placeholder="Current zoning" />
                  </div>
                  <div>
                    <Label htmlFor="development-potential">Development Potential</Label>
                    <Input id="development-potential" placeholder="Development potential" />
                  </div>
                  <div>
                    <Label htmlFor="planning-permits">Planning Permits</Label>
                    <Input id="planning-permits" placeholder="Existing permits" />
                  </div>
                  <div>
                    <Label htmlFor="infrastructure">Infrastructure</Label>
                    <Input id="infrastructure" placeholder="Available infrastructure" />
                  </div>
                  <div>
                    <Label htmlFor="site-constraints">Site Constraints</Label>
                    <Input id="site-constraints" placeholder="Development constraints" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="development-features">Development Features</Label>
                  <Textarea 
                    id="development-features" 
                    placeholder="Describe development opportunities and constraints..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyDetails;