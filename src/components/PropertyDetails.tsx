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
                    <Label htmlFor="development-potential">Development Potential</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select potential use" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="mixed-use">Mixed Use</SelectItem>
                        <SelectItem value="agricultural">Agricultural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="potential-yield">Potential Yield</Label>
                    <Input id="potential-yield" placeholder="Estimated lots/units" />
                  </div>

                  <div>
                    <Label htmlFor="total-area-hectares">Total Area (hectares)</Label>
                    <Input id="total-area-hectares" placeholder="Total land area" />
                  </div>

                  <div>
                    <Label htmlFor="infrastructure">Infrastructure</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Infrastructure status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fully-serviced">Fully Serviced</SelectItem>
                        <SelectItem value="partial">Partial Services</SelectItem>
                        <SelectItem value="minimal">Minimal Services</SelectItem>
                        <SelectItem value="none">No Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="zoning">Zoning</Label>
                    <Input id="zoning" placeholder="Current zoning designation" />
                  </div>

                  <div>
                    <Label htmlFor="access">Access</Label>
                    <Input id="access" placeholder="Road access details" />
                  </div>

                  <div>
                    <Label htmlFor="planning-status">Planning Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="pending">Pending Approval</SelectItem>
                        <SelectItem value="pre-application">Pre-Application</SelectItem>
                        <SelectItem value="none">No Application</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="development-timeframe">Development Timeframe</Label>
                    <Input id="development-timeframe" placeholder="Estimated development period" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="development-constraints">Development Constraints</Label>
                  <Textarea 
                    id="development-constraints" 
                    placeholder="Describe topography, environmental factors, planning restrictions..."
                    className="min-h-[120px]"
                  />
                </div>

                <div>
                  <Label htmlFor="general-property-description">General Property Description</Label>
                  <Textarea 
                    id="general-property-description" 
                    placeholder="Provide overall property description, location context, and key characteristics..."
                    className="min-h-[120px]"
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
                    <Label htmlFor="building-condition-spec">Building Condition</Label>
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
                    <Label htmlFor="year-built-spec">Year Built</Label>
                    <Input id="year-built-spec" placeholder="Construction year" />
                  </div>

                  <div>
                    <Label htmlFor="car-parking-spec">Car Parking Spaces</Label>
                    <Input id="car-parking-spec" placeholder="Number of spaces" />
                  </div>
                </div>

                {/* Specialized Measurements */}
                <div className="space-y-4">
                  <h4 className="font-medium">Specialized Measurements & Units of Comparison</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Motel Specific */}
                    <div>
                      <Label htmlFor="rooms-keys">Rooms/Keys</Label>
                      <Input id="rooms-keys" placeholder="Number of rooms/keys" />
                    </div>
                    <div>
                      <Label htmlFor="ask-rate">ASK (Average Selling Rate)</Label>
                      <Input id="ask-rate" placeholder="Average selling rate per room" />
                    </div>
                    <div>
                      <Label htmlFor="revpar">RevPAR (Revenue Per Available Room)</Label>
                      <Input id="revpar" placeholder="Revenue per available room" />
                    </div>
                    <div>
                      <Label htmlFor="occupancy-rate">Occupancy Rate (%)</Label>
                      <Input id="occupancy-rate" placeholder="Annual occupancy percentage" />
                    </div>

                    {/* Pub/Club/Gaming Specific */}
                    <div>
                      <Label htmlFor="gaming-machines">Gaming Machines</Label>
                      <Input id="gaming-machines" placeholder="Number of gaming machines" />
                    </div>
                    <div>
                      <Label htmlFor="gaming-tables">Gaming Tables</Label>
                      <Input id="gaming-tables" placeholder="Number of gaming tables" />
                    </div>
                    {/* Sports Stadium/Entertainment Specific */}
                    <div>
                      <Label htmlFor="seating-capacity">Seating Capacity</Label>
                      <Input id="seating-capacity" placeholder="Total seating capacity" />
                    </div>
                    <div>
                      <Label htmlFor="field-court-size">Field/Court Size (sqm)</Label>
                      <Input id="field-court-size" placeholder="Playing surface area" />
                    </div>
                    <div>
                      <Label htmlFor="screens-theaters">Screens/Theaters</Label>
                      <Input id="screens-theaters" placeholder="Number of screens/theaters" />
                    </div>
                    <div>
                      <Label htmlFor="vip-corporate-boxes">VIP/Corporate Boxes</Label>
                      <Input id="vip-corporate-boxes" placeholder="Number of premium boxes" />
                    </div>

                    {/* Shopping Center/Mall Specific */}
                    <div>
                      <Label htmlFor="retail-tenancies">Retail Tenancies</Label>
                      <Input id="retail-tenancies" placeholder="Number of retail spaces" />
                    </div>
                    <div>
                      <Label htmlFor="anchor-tenants">Anchor Tenants</Label>
                      <Input id="anchor-tenants" placeholder="Number of anchor tenants" />
                    </div>
                    <div>
                      <Label htmlFor="food-court-seats">Food Court Seating</Label>
                      <Input id="food-court-seats" placeholder="Food court capacity" />
                    </div>

                    {/* Marina/Self Storage Specific */}
                    <div>
                      <Label htmlFor="berths-units">Berths/Storage Units</Label>
                      <Input id="berths-units" placeholder="Number of berths or storage units" />
                    </div>
                    <div>
                      <Label htmlFor="unit-sizes">Unit Size Range</Label>
                      <Input id="unit-sizes" placeholder="e.g., 5x5m to 10x20m" />
                    </div>
                    <div>
                      <Label htmlFor="boat-length-capacity">Boat Length Capacity</Label>
                      <Input id="boat-length-capacity" placeholder="Maximum boat length (meters)" />
                    </div>

                    {/* Automotive/Service Specific */}
                    <div>
                      <Label htmlFor="service-bays">Service Bays</Label>
                      <Input id="service-bays" placeholder="Number of service bays" />
                    </div>
                    <div>
                      <Label htmlFor="fuel-pumps">Fuel Pumps</Label>
                      <Input id="fuel-pumps" placeholder="Number of fuel dispensers" />
                    </div>
                    <div>
                      <Label htmlFor="vehicle-display">Vehicle Display Area</Label>
                      <Input id="vehicle-display" placeholder="Vehicle display capacity" />
                    </div>

                    {/* Convention/Conference Specific */}
                    <div>
                      <Label htmlFor="meeting-rooms">Meeting Rooms</Label>
                      <Input id="meeting-rooms" placeholder="Number of meeting rooms" />
                    </div>
                    <div>
                      <Label htmlFor="exhibition-space">Exhibition Space (sqm)</Label>
                      <Input id="exhibition-space" placeholder="Total exhibition area" />
                    </div>
                    <div>
                      <Label htmlFor="delegate-capacity">Delegate Capacity</Label>
                      <Input id="delegate-capacity" placeholder="Maximum delegate capacity" />
                    </div>

                    {/* Data Center/Technical Specific */}
                    <div>
                      <Label htmlFor="server-racks">Server Racks</Label>
                      <Input id="server-racks" placeholder="Number of server racks" />
                    </div>
                    <div>
                      <Label htmlFor="power-capacity">Power Capacity (kW)</Label>
                      <Input id="power-capacity" placeholder="Total power capacity" />
                    </div>
                    <div>
                      <Label htmlFor="cooling-capacity">Cooling Capacity</Label>
                      <Input id="cooling-capacity" placeholder="HVAC/cooling specifications" />
                    </div>

                    {/* Childcare Specific */}
                    <div>
                      <Label htmlFor="ldc-placements">LDC Placements (Licensed Day Care)</Label>
                      <Input id="ldc-placements" placeholder="Licensed placement capacity" />
                    </div>
                    <div>
                      <Label htmlFor="child-capacity">Total Child Capacity</Label>
                      <Input id="child-capacity" placeholder="Maximum child capacity" />
                    <div>
                      <Label htmlFor="liquor-license">Liquor License Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select license type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="on-premises">On-Premises</SelectItem>
                          <SelectItem value="off-premises">Off-Premises</SelectItem>
                          <SelectItem value="club">Club License</SelectItem>
                          <SelectItem value="restaurant">Restaurant License</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Funeral/Religious/Community Specific */}
                    <div>
                      <Label htmlFor="chapel-capacity">Chapel/Sanctuary Capacity</Label>
                      <Input id="chapel-capacity" placeholder="Seating capacity" />
                    </div>
                    <div>
                      <Label htmlFor="preparation-facilities">Preparation Facilities</Label>
                      <Input id="preparation-facilities" placeholder="Number of preparation rooms" />
                    </div>
                    <div>
                      <Label htmlFor="parking-spaces-spec">Parking Spaces</Label>
                      <Input id="parking-spaces-spec" placeholder="Total parking capacity" />
                    </div>
                    <div>
                      <Label htmlFor="age-groups">Age Groups Served</Label>
                      <Input id="age-groups" placeholder="e.g., 0-2 years, 3-5 years" />
                    </div>

                    {/* Healthcare Specific */}
                    <div>
                      <Label htmlFor="bed-capacity">Bed Capacity</Label>
                      <Input id="bed-capacity" placeholder="Number of beds" />
                    </div>
                    <div>
                      <Label htmlFor="treatment-rooms">Treatment Rooms</Label>
                      <Input id="treatment-rooms" placeholder="Number of treatment rooms" />
                    </div>
                    <div>
                      <Label htmlFor="consultation-rooms">Consultation Rooms</Label>
                      <Input id="consultation-rooms" placeholder="Number of consultation rooms" />
                    </div>
                    <div>
                      <Label htmlFor="operating-theaters">Operating Theaters</Label>
                      <Input id="operating-theaters" placeholder="Number of operating theaters" />
                    </div>
                    
                    {/* Funeral/Religious/Community Specific */}
                    <div>
                      <Label htmlFor="chapel-capacity">Chapel/Sanctuary Capacity</Label>
                      <Input id="chapel-capacity" placeholder="Seating capacity" />
                    </div>
                    <div>
                      <Label htmlFor="preparation-facilities">Preparation Facilities</Label>
                      <Input id="preparation-facilities" placeholder="Number of preparation rooms" />
                    </div>
                    <div>
                      <Label htmlFor="parking-spaces-spec">Parking Spaces</Label>
                      <Input id="parking-spaces-spec" placeholder="Total parking capacity" />
                    </div>
                  </div>
                </div>

                    {/* General Commercial Area */}
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
                    <div>
                      <Label htmlFor="area-measurement-spec">Measurement (sqm)</Label>
                      <Input id="area-measurement-spec" placeholder="Enter area in sqm" />
                    </div>
                    </div>
                  </div>
                </div>

                {/* Specialized Features */}
                <div className="space-y-4">
                  <h4 className="font-medium">Specialized Features & Amenities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="kitchen-facilities">Kitchen Facilities</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select kitchen type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="commercial">Commercial Kitchen</SelectItem>
                          <SelectItem value="domestic">Domestic Kitchen</SelectItem>
                          <SelectItem value="none">No Kitchen</SelectItem>
                          <SelectItem value="catering">Catering Kitchen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="function-rooms">Function Rooms</Label>
                      <Input id="function-rooms" placeholder="Number of function rooms" />
                    </div>
                    <div>
                      <Label htmlFor="outdoor-areas-spec">Outdoor Areas</Label>
                      <Input id="outdoor-areas-spec" placeholder="Beer garden, playground, etc." />
                    </div>
                    <div>
                      <Label htmlFor="storage-areas">Storage Areas</Label>
                      <Input id="storage-areas" placeholder="Storage facilities" />
                    </div>
                    <div>
                      <Label htmlFor="specialized-equipment">Specialized Equipment</Label>
                      <Textarea id="specialized-equipment" placeholder="List specialized equipment (medical equipment, gaming systems, playground equipment, etc.)" />
                    </div>
                    <div>
                      <Label htmlFor="licensing-compliance">Licensing & Compliance</Label>
                      <Textarea id="licensing-compliance" placeholder="Current licenses, compliance certifications, regulatory requirements" />
                    </div>
                  </div>
                </div>

                {/* Revenue Streams */}
                <div className="space-y-4">
                  <h4 className="font-medium">Revenue Streams & Operations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primary-revenue">Primary Revenue Source</Label>
                      <Input id="primary-revenue" placeholder="e.g., Accommodation, Gaming, Food & Beverage" />
                    </div>
                    <div>
                      <Label htmlFor="secondary-revenue">Secondary Revenue Sources</Label>
                      <Input id="secondary-revenue" placeholder="Additional revenue streams" />
                    </div>
                    <div>
                      <Label htmlFor="operating-hours">Operating Hours</Label>
                      <Input id="operating-hours" placeholder="Daily operating hours" />
                    </div>
                    <div>
                      <Label htmlFor="seasonal-operations">Seasonal Operations</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select operation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="year-round">Year Round</SelectItem>
                          <SelectItem value="seasonal">Seasonal</SelectItem>
                          <SelectItem value="peak-periods">Peak Periods Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="operational-notes">Operational Notes</Label>
                    <Textarea 
                      id="operational-notes" 
                      placeholder="Additional operational details, special considerations, market position, etc."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                {/* Construction Details */}
                <div className="space-y-4">
                  <h4 className="font-medium">Construction Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="foundation-spec">Foundation</Label>
                      <Input id="foundation-spec" placeholder="Foundation type" />
                    </div>
                    <div>
                      <Label htmlFor="roof-spec">Roof</Label>
                      <Input id="roof-spec" placeholder="Roof material" />
                    </div>
                    <div>
                      <Label htmlFor="windows-spec">Windows</Label>
                      <Input id="windows-spec" placeholder="Window type" />
                    </div>
                    <div>
                      <Label htmlFor="exterior-cladding-spec">Exterior Cladding</Label>
                      <Input id="exterior-cladding-spec" placeholder="Cladding material" />
                    </div>
                    <div>
                      <Label htmlFor="internal-cladding-spec">Internal Cladding</Label>
                      <Input id="internal-cladding-spec" placeholder="Internal cladding" />
                    </div>
                    <div>
                      <Label htmlFor="floor-coverings-spec">Floor Coverings</Label>
                      <Input id="floor-coverings-spec" placeholder="Floor covering type" />
                    </div>
                    <div>
                      <Label htmlFor="accessibility-features">Accessibility Features</Label>
                      <Input id="accessibility-features" placeholder="Disability access features" />
                    </div>
                    <div>
                      <Label htmlFor="security-systems">Security Systems</Label>
                      <Input id="security-systems" placeholder="Security installations" />
                    </div>
                  </div>
                </div>

                {/* Areas Summary */}
                <div className="space-y-4">
                  <h4 className="font-medium">Areas Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="total-area-spec">Total Building Area (sqm)</Label>
                      <Input id="total-area-spec" placeholder="Total building area" />
                    </div>
                    <div>
                      <Label htmlFor="land-area-spec">Land Area (sqm)</Label>
                      <Input id="land-area-spec" placeholder="Total land area" />
                    </div>
                    <div>
                      <Label htmlFor="customer-area">Customer/Public Area (sqm)</Label>
                      <Input id="customer-area" placeholder="Public accessible area" />
                    </div>
                    <div>
                      <Label htmlFor="service-area">Service/Staff Area (sqm)</Label>
                      <Input id="service-area" placeholder="Staff/service area" />
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