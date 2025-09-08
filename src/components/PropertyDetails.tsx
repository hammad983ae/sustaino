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
    developmentLand: false,
    specialized: false
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
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
              <div className="flex items-center gap-2">
                <Switch
                  checked={propertyTypes.specialized}
                  onCheckedChange={(checked) => 
                    setPropertyTypes(prev => ({ ...prev, specialized: checked }))
                  }
                />
                <Label>Specialized</Label>
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
                    <Label htmlFor="lettable-area-type">Lettable Area Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gla">GLA</SelectItem>
                        <SelectItem value="nla">NLA</SelectItem>
                        <SelectItem value="glar">GLAR</SelectItem>
                        <SelectItem value="gba">GBA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="area-measurement">Measurement (sqm)</Label>
                    <Input id="area-measurement" placeholder="Enter area in sqm" />
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
                  
                  <div>
                    <Label htmlFor="additional-features">Additional Features</Label>
                    <Textarea 
                      id="additional-features" 
                      placeholder="Describe additional commercial features, amenities, and characteristics..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                {/* Areas */}
                <div className="space-y-4">
                  <h4 className="font-medium">Areas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="glar-type">Lettable Area Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gla">GLA</SelectItem>
                          <SelectItem value="nla">NLA</SelectItem>
                          <SelectItem value="glar">GLAR</SelectItem>
                          <SelectItem value="gba">GBA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="glar-measurement">Measurement (sqm)</Label>
                      <Input id="glar-measurement" placeholder="Enter area in sqm" />
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

          {propertyTypes.residential && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Residential Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input id="bedrooms" placeholder="Number of bedrooms" />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input id="bathrooms" placeholder="Number of bathrooms" />
                  </div>
                  <div>
                    <Label htmlFor="parking-spaces">Parking Spaces</Label>
                    <Input id="parking-spaces" placeholder="Number of parking spaces" />
                  </div>
                  <div>
                    <Label htmlFor="land-size">Land Size (sqm)</Label>
                    <Input id="land-size" placeholder="Land size in sqm" />
                  </div>
                  <div>
                    <Label htmlFor="building-size">Building Size (sqm)</Label>
                    <Input id="building-size" placeholder="Building size in sqm" />
                  </div>
                  <div>
                    <Label htmlFor="year-built-res">Year Built</Label>
                    <Input id="year-built-res" placeholder="Construction year" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="additional-features-res">Additional Features</Label>
                  <Textarea
                    id="additional-features-res"
                    placeholder="Describe additional residential features, amenities, and characteristics..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Agriculture Property Details */}
          {propertyTypes.agriculture && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Agriculture Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="land-size-agri">Land Size (hectares)</Label>
                    <Input id="land-size-agri" placeholder="Land size in hectares" />
                  </div>
                  <div>
                    <Label htmlFor="water-rights">Water Rights</Label>
                    <Input id="water-rights" placeholder="Water rights details" />
                  </div>
                  <div>
                    <Label htmlFor="soil-type">Soil Type</Label>
                    <Input id="soil-type" placeholder="Soil type description" />
                  </div>
                  <div>
                    <Label htmlFor="irrigation-systems">Irrigation Systems</Label>
                    <Input id="irrigation-systems" placeholder="Irrigation systems details" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="additional-features-agri">Additional Features</Label>
                  <Textarea
                    id="additional-features-agri"
                    placeholder="Describe additional agricultural features, amenities, and characteristics..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Development Land Property Details */}
          {propertyTypes.developmentLand && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Development Land Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="land-size-dev">Land Size (sqm)</Label>
                    <Input id="land-size-dev" placeholder="Land size in sqm" />
                  </div>
                  <div>
                    <Label htmlFor="zoning">Zoning</Label>
                    <Input id="zoning" placeholder="Zoning description" />
                  </div>
                  <div>
                    <Label htmlFor="development-approvals">Development Approvals</Label>
                    <Input id="development-approvals" placeholder="Development approvals details" />
                  </div>
                  <div>
                    <Label htmlFor="utilities">Utilities</Label>
                    <Input id="utilities" placeholder="Utilities availability" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="additional-features-dev">Additional Features</Label>
                  <Textarea
                    id="additional-features-dev"
                    placeholder="Describe additional development land features, amenities, and characteristics..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Specialized Property Details */}
          {propertyTypes.specialized && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Specialized Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property Type Selection */}
                <div>
                  <Label htmlFor="specialized-type">Specialized Property Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialized property type" />
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
                </div>

                {/* Basic Property Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="building-quality-spec">Building Quality</Label>
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
                    <Label htmlFor="year-built-spec">Year Built</Label>
                    <Input id="year-built-spec" placeholder="Construction year" />
                  </div>
                </div>

                {/* Specialized Measurements */}
                <div className="space-y-4">
                  <h4 className="font-medium">Specialized Measurements & Units of Comparison</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Key Measurements */}
                    <div>
                      <Label htmlFor="rooms-keys">Rooms/Keys</Label>
                      <Input id="rooms-keys" placeholder="Number of rooms/keys" />
                    </div>
                    <div>
                      <Label htmlFor="seating-capacity">Seating Capacity</Label>
                      <Input id="seating-capacity" placeholder="Total seating capacity" />
                    </div>
                    <div>
                      <Label htmlFor="ldc-placements">LDC Placements (Licensed Day Care)</Label>
                      <Input id="ldc-placements" placeholder="Licensed placement capacity" />
                    </div>
                    <div>
                      <Label htmlFor="bed-capacity">Bed Capacity</Label>
                      <Input id="bed-capacity" placeholder="Number of beds" />
                    </div>
                    <div>
                      <Label htmlFor="lettable-area-type-spec">Lettable Area Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gla">GLA</SelectItem>
                          <SelectItem value="nla">NLA</SelectItem>
                          <SelectItem value="glar">GLAR</SelectItem>
                          <SelectItem value="gba">GBA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="area-measurement-spec">Measurement (sqm)</Label>
                      <Input id="area-measurement-spec" placeholder="Enter area in sqm" />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="additional-features-spec">Additional Features & Comments</Label>
                  <Textarea 
                    id="additional-features-spec" 
                    placeholder="Describe any additional specialized features, unique characteristics, market positioning, competitive advantages, etc."
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
