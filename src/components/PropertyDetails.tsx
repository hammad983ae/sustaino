/**
 * ============================================================================
 * PROPRIETARY PROPERTY ASSESSMENT FRAMEWORK
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Property assessment methodologies and data collection frameworks are
 * proprietary IP. Commercial licensing required for use.
 * ============================================================================
 */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, Printer, Plus, Minus, Upload, Image, Download } from "lucide-react";
import { PropertyTypeSpecificPrompt } from "@/components/PropertyTypeSpecificPrompt";
import { usePropertyTypeLock } from "@/components/PropertyTypeLockProvider";

const PropertyDetails = () => {
  const [includeSection, setIncludeSection] = useState(true);
  const [propertyDescription, setPropertyDescription] = useState('');
  const { selectedPropertyType, isPropertyTypeLocked } = usePropertyTypeLock();
  const [propertyTypes, setPropertyTypes] = useState({
    commercial: true,
    residential: false,
    buildToRent: false,
    agriculture: false,
    developmentLand: false,
    specialized: false
  });
  const [certifications, setCertifications] = useState({
    include: false,
    bulkData: false,
    professionalDates: false,
    valuerCredentials: false,
    complianceStatement: false,
    greenBuilding: false,
    sustainability: false,
    improvements: false
  });
  const [propertyCount, setPropertyCount] = useState(1);
  const [tbeToggles, setTbeToggles] = useState({
    commercial: false,
    residential: false,
    buildToRent: false,
    agriculture: false,
    developmentLand: false,
    specialized: false
  });

  // Helper function to check if a property type is specialized
  const isSpecializedPropertyType = (propertyType: string | null): boolean => {
    if (!propertyType) return false;
    const specializedTypes = [
      'childcare-centre', 'hotel-motel', 'carpark', 'cinema', 'service-station',
      'licensed-venue', 'healthcare-facility', 'workers-accommodation', 
      'petrol-station', 'fast-food-restaurant', 'medical-centre', 'aged-care',
      'student-accommodation', 'data-centre', 'self-storage', 'funeral-home',
      'veterinary-clinic', 'drive-through', 'car-wash', 'bowling-alley',
      'gymnasiums-fitness', 'telecommunications-tower', 'cold-storage',
      'warehouse-distribution', 'manufacturing', 'research-facility'
    ];
    return specializedTypes.includes(propertyType);
  };

  const addPropertySection = () => {
    setPropertyCount(prev => prev + 1);
  };

  const removePropertySection = () => {
    if (propertyCount > 1) {
      setPropertyCount(prev => prev - 1);
    }
  };

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
            <Button 
              variant="outline" 
              size="sm"
              onClick={addPropertySection}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Property
            </Button>
            {propertyCount > 1 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={removePropertySection}
                className="flex items-center gap-2"
              >
                <Minus className="h-4 w-4" />
                Remove Property
              </Button>
            )}
            <span className="text-sm text-muted-foreground">
              Property {propertyCount} of {propertyCount}
            </span>
          </div>
          <Button variant="outline" size="sm">
            <Lock className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Property Photos Upload Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg">Property Photos</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="include-photos">Include in Report</Label>
              <Switch id="include-photos" defaultChecked />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center bg-muted/20">
              <div className="flex justify-center mb-4">
                <Upload className="h-12 w-12 text-muted-foreground" />
              </div>
              <h4 className="text-lg font-medium mb-2 text-foreground">Upload Property Photos</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Photos will be automatically timestamped for report inclusion
              </p>
              <div className="flex flex-col items-center gap-3">
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Choose Photos
                </Button>
                <p className="text-xs text-muted-foreground">
                  Supports: JPG, PNG, GIF, WebP
                </p>
              </div>
            </div>
            
            {/* Photo Gallery Preview Area */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 min-h-[100px] p-4 border rounded-lg bg-background">
              <div className="text-center text-sm text-muted-foreground col-span-full">
                Uploaded photos will appear here with timestamps
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
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
                  checked={propertyTypes.buildToRent}
                  onCheckedChange={(checked) => 
                    setPropertyTypes(prev => ({ ...prev, buildToRent: checked }))
                  }
                />
                <Label>Build to Rent</Label>
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

                {/* TBE (To Be Erected) Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">TBE (To Be Erected/As If Complete)</h4>
                    <Switch
                      checked={tbeToggles.commercial}
                      onCheckedChange={(checked) => 
                        setTbeToggles(prev => ({ ...prev, commercial: checked }))
                      }
                    />
                  </div>
                  {tbeToggles.commercial && (
                    <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="builders-name-commercial">Builders Name</Label>
                          <Input id="builders-name-commercial" placeholder="Enter builders name" />
                        </div>
                        <div>
                          <Label htmlFor="tender-price-commercial">Tender Price</Label>
                          <Input id="tender-price-commercial" placeholder="Enter tender price" />
                        </div>
                        <div>
                          <Label htmlFor="contract-type-commercial">Contract Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select contract type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fixed">Fixed Contract</SelectItem>
                              <SelectItem value="item-plus">Item Plus Contract</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="contract-reasonable-commercial">Is Contract Price Reasonable</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select assessment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="review">Under Review</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="completion-status-commercial">Will Project Be Complete on Completion</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select completion status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="partial">Partial</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="out-of-contract-commercial">Out of Contract Items</Label>
                        <Textarea 
                          id="out-of-contract-commercial" 
                          placeholder="List items not included in contract..."
                          className="min-h-[80px]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="payment-schedule-commercial">Progress Payment Schedule</Label>
                        <Textarea 
                          id="payment-schedule-commercial" 
                          placeholder="Describe payment milestones and schedule..."
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>
                  )}
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

                {/* TBE Section for Residential */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">TBE (To Be Erected/As If Complete)</h4>
                    <Switch
                      checked={tbeToggles.residential}
                      onCheckedChange={(checked) => 
                        setTbeToggles(prev => ({ ...prev, residential: checked }))
                      }
                    />
                  </div>
                  {tbeToggles.residential && (
                    <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="builders-name-residential">Builders Name</Label>
                          <Input id="builders-name-residential" placeholder="Enter builders name" />
                        </div>
                        <div>
                          <Label htmlFor="tender-price-residential">Tender Price</Label>
                          <Input id="tender-price-residential" placeholder="Enter tender price" />
                        </div>
                        <div>
                          <Label htmlFor="contract-type-residential">Contract Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select contract type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fixed">Fixed Contract</SelectItem>
                              <SelectItem value="item-plus">Item Plus Contract</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="contract-reasonable-residential">Is Contract Price Reasonable</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select assessment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="review">Under Review</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="completion-status-residential">Will Project Be Complete on Completion</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select completion status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="partial">Partial</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="out-of-contract-residential">Out of Contract Items</Label>
                        <Textarea 
                          id="out-of-contract-residential" 
                          placeholder="List items not included in contract..."
                          className="min-h-[80px]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="payment-schedule-residential">Progress Payment Schedule</Label>
                        <Textarea 
                          id="payment-schedule-residential" 
                          placeholder="Describe payment milestones and schedule..."
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>
                  )}
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
              <CardContent className="space-y-6">
                {/* Agricultural Property Type Selection */}
                <div>
                  <Label htmlFor="agricultural-type">Agricultural Property Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select agricultural property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grazing">Grazing Land</SelectItem>
                      <SelectItem value="dairy">Dairy Farm</SelectItem>
                      <SelectItem value="broadacre">Broadacre Cropping</SelectItem>
                      <SelectItem value="vineyard">Vineyard</SelectItem>
                      <SelectItem value="orchard">Orchard</SelectItem>
                      <SelectItem value="aquaculture">Aquaculture</SelectItem>
                      <SelectItem value="mixed">Mixed Farming</SelectItem>
                      <SelectItem value="horticulture">Horticulture</SelectItem>
                      <SelectItem value="poultry">Poultry Farm</SelectItem>
                      <SelectItem value="stud">Stud Farm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Basic Agricultural Information - Always Shown */}
                <div className="space-y-4">
                  <h4 className="font-medium">Basic Property Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="total-area-agri">Total Area (hectares)</Label>
                      <Input id="total-area-agri" placeholder="Total area in hectares" />
                    </div>
                    <div>
                      <Label htmlFor="effective-area">Effective Area (hectares)</Label>
                      <Input id="effective-area" placeholder="Effective farming area" />
                    </div>
                    <div>
                      <Label htmlFor="rainfall">Annual Rainfall (mm)</Label>
                      <Input id="rainfall" placeholder="Average annual rainfall" />
                    </div>
                    <div>
                      <Label htmlFor="soil-type">Soil Classification</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select soil type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clay">Clay</SelectItem>
                          <SelectItem value="loam">Loam</SelectItem>
                          <SelectItem value="sandy">Sandy</SelectItem>
                          <SelectItem value="volcanic">Volcanic</SelectItem>
                          <SelectItem value="alluvial">Alluvial</SelectItem>
                          <SelectItem value="red-brown">Red Brown Earth</SelectItem>
                          <SelectItem value="black-earth">Black Earth</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="topography">Topography</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select topography" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flat">Flat</SelectItem>
                          <SelectItem value="undulating">Undulating</SelectItem>
                          <SelectItem value="hilly">Hilly</SelectItem>
                          <SelectItem value="mountainous">Mountainous</SelectItem>
                          <SelectItem value="rolling">Rolling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="aspect">Aspect</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select aspect" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="north">North</SelectItem>
                          <SelectItem value="northeast">North East</SelectItem>
                          <SelectItem value="east">East</SelectItem>
                          <SelectItem value="southeast">South East</SelectItem>
                          <SelectItem value="south">South</SelectItem>
                          <SelectItem value="southwest">South West</SelectItem>
                          <SelectItem value="west">West</SelectItem>
                          <SelectItem value="northwest">North West</SelectItem>
                          <SelectItem value="multiple">Multiple</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Water Resources - Always Shown */}
                <div className="space-y-4">
                  <h4 className="font-medium">Water Resources</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="water-allocation">Water Allocation (ML)</Label>
                      <Input id="water-allocation" placeholder="Megalitres per year" />
                    </div>
                    <div>
                      <Label htmlFor="water-source">Water Source</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select water source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bore">Bore Water</SelectItem>
                          <SelectItem value="river">River</SelectItem>
                          <SelectItem value="dam">Farm Dam</SelectItem>
                          <SelectItem value="channel">Irrigation Channel</SelectItem>
                          <SelectItem value="rainfall">Rainfall Dependent</SelectItem>
                          <SelectItem value="multiple">Multiple Sources</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="irrigation-type">Irrigation System</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select irrigation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="drip">Drip Irrigation</SelectItem>
                          <SelectItem value="spray">Spray Irrigation</SelectItem>
                          <SelectItem value="flood">Flood Irrigation</SelectItem>
                          <SelectItem value="centre-pivot">Centre Pivot</SelectItem>
                          <SelectItem value="lateral-move">Lateral Move</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Grazing Land Specific Fields */}
                <div className="space-y-4">
                  <h4 className="font-medium">Grazing Land Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="carrying-capacity">Carrying Capacity (DSE/ha)</Label>
                      <Input id="carrying-capacity" placeholder="Dry Sheep Equivalent per hectare" />
                    </div>
                    <div>
                      <Label htmlFor="stocking-rate">Current Stocking Rate</Label>
                      <Input id="stocking-rate" placeholder="Current stock numbers" />
                    </div>
                    <div>
                      <Label htmlFor="pasture-type">Pasture Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pasture type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="native">Native Pasture</SelectItem>
                          <SelectItem value="improved">Improved Pasture</SelectItem>
                          <SelectItem value="annual">Annual Pasture</SelectItem>
                          <SelectItem value="perennial">Perennial Pasture</SelectItem>
                          <SelectItem value="lucerne">Lucerne</SelectItem>
                          <SelectItem value="mixed">Mixed Pasture</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="paddock-count">Number of Paddocks</Label>
                      <Input id="paddock-count" placeholder="Number of paddocks" />
                    </div>
                    <div>
                      <Label htmlFor="fencing-condition">Fencing Condition</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Fencing condition" />
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
                      <Label htmlFor="livestock-facilities">Livestock Facilities</Label>
                      <Input id="livestock-facilities" placeholder="Yards, races, crush, etc." />
                    </div>
                  </div>
                </div>

                {/* Dairy Farm Specific Fields */}
                <div className="space-y-4">
                  <h4 className="font-medium">Dairy Farm Operations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="milking-platform">Milking Platform (hectares)</Label>
                      <Input id="milking-platform" placeholder="Effective milking area" />
                    </div>
                    <div>
                      <Label htmlFor="dairy-shed-type">Dairy Shed Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select dairy shed type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rotary">Rotary</SelectItem>
                          <SelectItem value="herringbone">Herringbone</SelectItem>
                          <SelectItem value="swing-over">Swing Over</SelectItem>
                          <SelectItem value="parallel">Parallel</SelectItem>
                          <SelectItem value="robotic">Robotic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bail-count">Number of Bails</Label>
                      <Input id="bail-count" placeholder="Milking bails" />
                    </div>
                    <div>
                      <Label htmlFor="cow-capacity">Cow Capacity</Label>
                      <Input id="cow-capacity" placeholder="Maximum cow numbers" />
                    </div>
                    <div>
                      <Label htmlFor="milk-production">Annual Milk Production (L)</Label>
                      <Input id="milk-production" placeholder="Litres per annum" />
                    </div>
                    <div>
                      <Label htmlFor="vat-capacity">Vat Capacity (L)</Label>
                      <Input id="vat-capacity" placeholder="Milk vat capacity" />
                    </div>
                  </div>
                </div>

                {/* Broadacre Cropping Specific Fields */}
                <div className="space-y-4">
                  <h4 className="font-medium">Broadacre Cropping</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="primary-crops">Primary Crops</Label>
                      <Input id="primary-crops" placeholder="e.g., Wheat, Barley, Canola" />
                    </div>
                    <div>
                      <Label htmlFor="crop-yield">Average Yield (t/ha)</Label>
                      <Input id="crop-yield" placeholder="Average tonnes per hectare" />
                    </div>
                    <div>
                      <Label htmlFor="cropping-history">Cropping History (years)</Label>
                      <Input id="cropping-history" placeholder="Years under cultivation" />
                    </div>
                    <div>
                      <Label htmlFor="silo-capacity">Silo Capacity (tonnes)</Label>
                      <Input id="silo-capacity" placeholder="Total grain storage" />
                    </div>
                    <div>
                      <Label htmlFor="machinery-sheds">Machinery Sheds (sqm)</Label>
                      <Input id="machinery-sheds" placeholder="Covered machinery storage" />
                    </div>
                    <div>
                      <Label htmlFor="field-bins">Field Bins</Label>
                      <Input id="field-bins" placeholder="Number and capacity" />
                    </div>
                  </div>
                </div>

                {/* Vineyard Specific Fields */}
                <div className="space-y-4">
                  <h4 className="font-medium">Vineyard Operations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="vineyard-area">Total Vineyard Area (hectares)</Label>
                      <Input id="vineyard-area" placeholder="Area under vine" />
                    </div>
                    <div>
                      <Label htmlFor="grape-varieties">Grape Varieties</Label>
                      <Input id="grape-varieties" placeholder="e.g., Shiraz, Chardonnay, Sauvignon Blanc" />
                    </div>
                    <div>
                      <Label htmlFor="vine-density">Vine Density (vines/ha)</Label>
                      <Input id="vine-density" placeholder="Vines per hectare" />
                    </div>
                    <div>
                      <Label htmlFor="vine-age">Average Vine Age (years)</Label>
                      <Input id="vine-age" placeholder="Average age of vines" />
                    </div>
                    <div>
                      <Label htmlFor="grape-purpose">Grape Purpose</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select grape purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wine">Wine Grapes</SelectItem>
                          <SelectItem value="table">Table Grapes</SelectItem>
                          <SelectItem value="dried">Dried Grapes/Raisins</SelectItem>
                          <SelectItem value="mixed">Mixed Purpose</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="grape-yield">Average Yield (t/ha)</Label>
                      <Input id="grape-yield" placeholder="Tonnes per hectare" />
                    </div>
                    <div>
                      <Label htmlFor="trellis-system">Trellis System</Label>
                      <Input id="trellis-system" placeholder="e.g., VSP, Scott Henry" />
                    </div>
                    <div>
                      <Label htmlFor="harvest-method">Harvest Method</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select harvest method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hand">Hand Harvested</SelectItem>
                          <SelectItem value="mechanical">Mechanical</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="winery-facilities">Winery Facilities</Label>
                      <Input id="winery-facilities" placeholder="On-site processing facilities" />
                    </div>
                  </div>
                </div>

                {/* Orchard Specific Fields */}
                <div className="space-y-4">
                  <h4 className="font-medium">Orchard Operations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="orchard-area">Total Orchard Area (hectares)</Label>
                      <Input id="orchard-area" placeholder="Area under orchard" />
                    </div>
                    <div>
                      <Label htmlFor="orchard-type">Orchard Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select orchard type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="citrus">Citrus (Orange, Lemon, Grapefruit)</SelectItem>
                          <SelectItem value="stone-fruit">Stone Fruit (Peach, Plum, Apricot)</SelectItem>
                          <SelectItem value="apple">Apple Orchard</SelectItem>
                          <SelectItem value="pear">Pear Orchard</SelectItem>
                          <SelectItem value="avocado">Avocado Orchard</SelectItem>
                          <SelectItem value="mango">Mango Orchard</SelectItem>
                          <SelectItem value="cherry">Cherry Orchard</SelectItem>
                          <SelectItem value="almond">Almond Orchard</SelectItem>
                          <SelectItem value="walnut">Walnut Orchard</SelectItem>
                          <SelectItem value="macadamia">Macadamia Orchard</SelectItem>
                          <SelectItem value="olive">Olive Grove</SelectItem>
                          <SelectItem value="mixed">Mixed Orchard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="tree-density">Tree Density (trees/ha)</Label>
                      <Input id="tree-density" placeholder="Trees per hectare" />
                    </div>
                    <div>
                      <Label htmlFor="tree-age">Average Tree Age (years)</Label>
                      <Input id="tree-age" placeholder="Average age of trees" />
                    </div>
                    <div>
                      <Label htmlFor="fruit-yield">Average Yield (t/ha)</Label>
                      <Input id="fruit-yield" placeholder="Tonnes per hectare" />
                    </div>
                    <div>
                      <Label htmlFor="picking-method">Picking Method</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select picking method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hand">Hand Picked</SelectItem>
                          <SelectItem value="mechanical">Mechanical</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="rootstock">Rootstock</Label>
                      <Input id="rootstock" placeholder="Rootstock variety" />
                    </div>
                    <div>
                      <Label htmlFor="pollination">Pollination</Label>
                      <Input id="pollination" placeholder="Pollination requirements/method" />
                    </div>
                    <div>
                      <Label htmlFor="processing-facilities">Processing Facilities</Label>
                      <Input id="processing-facilities" placeholder="On-site processing/packing" />
                    </div>
                  </div>
                </div>

                {/* Aquaculture Specific Fields */}
                <div className="space-y-4">
                  <h4 className="font-medium">Aquaculture Operations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="water-body-type">Water Body Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select water body type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="earthen-ponds">Earthen Ponds</SelectItem>
                          <SelectItem value="concrete-tanks">Concrete Tanks</SelectItem>
                          <SelectItem value="cage-culture">Cage Culture</SelectItem>
                          <SelectItem value="raceway">Raceway System</SelectItem>
                          <SelectItem value="recirculating">Recirculating System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="water-area">Total Water Area (hectares)</Label>
                      <Input id="water-area" placeholder="Area of water bodies" />
                    </div>
                    <div>
                      <Label htmlFor="species-cultured">Species Cultured</Label>
                      <Input id="species-cultured" placeholder="e.g., Barramundi, Trout, Prawns" />
                    </div>
                    <div>
                      <Label htmlFor="production-capacity">Production Capacity (kg/year)</Label>
                      <Input id="production-capacity" placeholder="Annual production capacity" />
                    </div>
                    <div>
                      <Label htmlFor="stocking-density">Stocking Density (fish/m³)</Label>
                      <Input id="stocking-density" placeholder="Fish per cubic metre" />
                    </div>
                    <div>
                      <Label htmlFor="water-exchange">Water Exchange Rate</Label>
                      <Input id="water-exchange" placeholder="Water turnover rate" />
                    </div>
                    <div>
                      <Label htmlFor="aeration-system">Aeration System</Label>
                      <Input id="aeration-system" placeholder="Type of aeration" />
                    </div>
                    <div>
                      <Label htmlFor="processing-plant">Processing Plant</Label>
                      <Input id="processing-plant" placeholder="On-site processing facilities" />
                    </div>
                  </div>
                </div>

                {/* Infrastructure & Improvements */}
                <div className="space-y-4">
                  <h4 className="font-medium">Infrastructure & Improvements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="homestead">Homestead</Label>
                      <Textarea id="homestead" placeholder="Describe homestead details..." className="min-h-[80px]" />
                    </div>
                    <div>
                      <Label htmlFor="worker-accommodation">Worker Accommodation</Label>
                      <Textarea id="worker-accommodation" placeholder="Describe worker housing..." className="min-h-[80px]" />
                    </div>
                    <div>
                      <Label htmlFor="farm-buildings">Farm Buildings</Label>
                      <Textarea id="farm-buildings" placeholder="Describe sheds, barns, workshops..." className="min-h-[80px]" />
                    </div>
                    <div>
                      <Label htmlFor="machinery-equipment">Machinery & Equipment</Label>
                      <Textarea id="machinery-equipment" placeholder="List included machinery..." className="min-h-[80px]" />
                    </div>
                  </div>
                </div>

                {/* Additional Features */}
                <div>
                  <Label htmlFor="additional-features-agri">Additional Agricultural Features</Label>
                  <Textarea
                    id="additional-features-agri"
                    placeholder="Describe additional agricultural features, certifications (organic, biodynamic), conservation programs, renewable energy, storage facilities, processing equipment, etc..."
                    className="min-h-[120px]"
                  />
                </div>

                {/* TBE Section for Agriculture */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">TBE (To Be Erected/As If Complete)</h4>
                    <Switch
                      checked={tbeToggles.agriculture}
                      onCheckedChange={(checked) => 
                        setTbeToggles(prev => ({ ...prev, agriculture: checked }))
                      }
                    />
                  </div>
                  {tbeToggles.agriculture && (
                    <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="builders-name-agriculture">Builders Name</Label>
                          <Input id="builders-name-agriculture" placeholder="Enter builders name" />
                        </div>
                        <div>
                          <Label htmlFor="tender-price-agriculture">Tender Price</Label>
                          <Input id="tender-price-agriculture" placeholder="Enter tender price" />
                        </div>
                        <div>
                          <Label htmlFor="contract-type-agriculture">Contract Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select contract type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fixed">Fixed Contract</SelectItem>
                              <SelectItem value="item-plus">Item Plus Contract</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="contract-reasonable-agriculture">Is Contract Price Reasonable</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select assessment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="review">Under Review</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="completion-status-agriculture">Will Project Be Complete on Completion</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select completion status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="partial">Partial</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="out-of-contract-agriculture">Out of Contract Items</Label>
                        <Textarea 
                          id="out-of-contract-agriculture" 
                          placeholder="List items not included in contract..."
                          className="min-h-[80px]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="payment-schedule-agriculture">Progress Payment Schedule</Label>
                        <Textarea 
                          id="payment-schedule-agriculture" 
                          placeholder="Describe payment milestones and schedule..."
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>
                  )}
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

                {/* TBE Section for Development Land */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">TBE (To Be Erected/As If Complete)</h4>
                    <Switch
                      checked={tbeToggles.developmentLand}
                      onCheckedChange={(checked) => 
                        setTbeToggles(prev => ({ ...prev, developmentLand: checked }))
                      }
                    />
                  </div>
                  {tbeToggles.developmentLand && (
                    <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="builders-name-development">Builders Name</Label>
                          <Input id="builders-name-development" placeholder="Enter builders name" />
                        </div>
                        <div>
                          <Label htmlFor="tender-price-development">Tender Price</Label>
                          <Input id="tender-price-development" placeholder="Enter tender price" />
                        </div>
                        <div>
                          <Label htmlFor="contract-type-development">Contract Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select contract type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fixed">Fixed Contract</SelectItem>
                              <SelectItem value="item-plus">Item Plus Contract</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="contract-reasonable-development">Is Contract Price Reasonable</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select assessment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="review">Under Review</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="completion-status-development">Will Project Be Complete on Completion</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select completion status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="partial">Partial</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="out-of-contract-development">Out of Contract Items</Label>
                        <Textarea 
                          id="out-of-contract-development" 
                          placeholder="List items not included in contract..."
                          className="min-h-[80px]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="payment-schedule-development">Progress Payment Schedule</Label>
                        <Textarea 
                          id="payment-schedule-development" 
                          placeholder="Describe payment milestones and schedule..."
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>
                  )}
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

                {/* TBE Section for Specialized */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">TBE (To Be Erected/As If Complete)</h4>
                    <Switch
                      checked={tbeToggles.specialized}
                      onCheckedChange={(checked) => 
                        setTbeToggles(prev => ({ ...prev, specialized: checked }))
                      }
                    />
                  </div>
                  {tbeToggles.specialized && (
                    <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="builders-name-specialized">Builders Name</Label>
                          <Input id="builders-name-specialized" placeholder="Enter builders name" />
                        </div>
                        <div>
                          <Label htmlFor="tender-price-specialized">Tender Price</Label>
                          <Input id="tender-price-specialized" placeholder="Enter tender price" />
                        </div>
                        <div>
                          <Label htmlFor="contract-type-specialized">Contract Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select contract type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fixed">Fixed Contract</SelectItem>
                              <SelectItem value="item-plus">Item Plus Contract</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="contract-reasonable-specialized">Is Contract Price Reasonable</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select assessment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="review">Under Review</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="completion-status-specialized">Will Project Be Complete on Completion</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select completion status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="partial">Partial</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="out-of-contract-specialized">Out of Contract Items</Label>
                        <Textarea 
                          id="out-of-contract-specialized" 
                          placeholder="List items not included in contract..."
                          className="min-h-[80px]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="payment-schedule-specialized">Progress Payment Schedule</Label>
                        <Textarea 
                          id="payment-schedule-specialized" 
                          placeholder="Describe payment milestones and schedule..."
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Certifications & Compliance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Professional Compliance & Certification
                <Switch
                  checked={certifications.include}
                  onCheckedChange={(checked) => 
                    setCertifications(prev => ({ ...prev, include: checked }))
                  }
                />
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Document professional compliance, certifications, and valuation standards adherence.
              </p>
            </CardHeader>
            {certifications.include && (
              <CardContent className="space-y-6">
                {/* Bulk Compliance Data */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Bulk Compliance Data (Auto-Categorizes)</Label>
                    <Switch
                      checked={certifications.bulkData}
                      onCheckedChange={(checked) => 
                        setCertifications(prev => ({ ...prev, bulkData: checked }))
                      }
                    />
                  </div>
                  {certifications.bulkData && (
                    <Textarea
                      placeholder="Paste compliance, certification, or legal information here..."
                      className="min-h-[120px]"
                    />
                  )}
                </div>

                {/* Professional Dates */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Professional Dates</Label>
                    <Switch
                      checked={certifications.professionalDates}
                      onCheckedChange={(checked) => 
                        setCertifications(prev => ({ ...prev, professionalDates: checked }))
                      }
                    />
                  </div>
                  {certifications.professionalDates && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="inspection-date">Inspection Date</Label>
                        <Input 
                          id="inspection-date" 
                          type="date"
                          placeholder="dd/mm/yyyy" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="report-date">Report Date</Label>
                        <Input 
                          id="report-date" 
                          type="date"
                          placeholder="dd/mm/yyyy" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="next-review-date">Next Review Date</Label>
                        <Input 
                          id="next-review-date" 
                          type="date"
                          placeholder="dd/mm/yyyy" 
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Valuer Credentials & Qualifications */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Valuer Credentials & Qualifications</Label>
                    <Switch
                      checked={certifications.valuerCredentials}
                      onCheckedChange={(checked) => 
                        setCertifications(prev => ({ ...prev, valuerCredentials: checked }))
                      }
                    />
                  </div>
                  {certifications.valuerCredentials && (
                    <Input
                      placeholder="API Certified Practicing Valuer"
                      className="min-h-[40px]"
                    />
                  )}
                </div>

                {/* Compliance Statement */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Compliance Statement</Label>
                    <Switch
                      checked={certifications.complianceStatement}
                      onCheckedChange={(checked) => 
                        setCertifications(prev => ({ ...prev, complianceStatement: checked }))
                      }
                    />
                  </div>
                  {certifications.complianceStatement && (
                    <Textarea
                      placeholder="This valuation has been prepared in accordance with Australian Property Institute standards and International Valuation Standards."
                      className="min-h-[80px]"
                    />
                  )}
                </div>

                {/* Green Building Certifications */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Green Building Certifications</Label>
                    <Switch
                      checked={certifications.greenBuilding}
                      onCheckedChange={(checked) => 
                        setCertifications(prev => ({ ...prev, greenBuilding: checked }))
                      }
                    />
                  </div>
                  {certifications.greenBuilding && (
                    <Textarea
                      placeholder="Green Star, LEED, BREEAM, Living Building Challenge..."
                      className="min-h-[80px]"
                    />
                  )}
                </div>

                {/* Sustainability Compliance Status */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Sustainability Compliance Status</Label>
                    <Switch
                      checked={certifications.sustainability}
                      onCheckedChange={(checked) => 
                        setCertifications(prev => ({ ...prev, sustainability: checked }))
                      }
                    />
                  </div>
                  {certifications.sustainability && (
                    <Textarea
                      placeholder="Current compliance with sustainability legislation and requirements..."
                      className="min-h-[80px]"
                    />
                  )}
                </div>

                {/* Recommended Improvements */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Recommended Improvements</Label>
                    <Switch
                      checked={certifications.improvements}
                      onCheckedChange={(checked) => 
                        setCertifications(prev => ({ ...prev, improvements: checked }))
                      }
                    />
                  </div>
                  {certifications.improvements && (
                    <Textarea
                      placeholder="Specific recommendations for improving sustainability rating and compliance..."
                      className="min-h-[80px]"
                    />
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        </CardContent>
      </Card>

      {/* Build to Rent Property Details */}
      {propertyTypes.buildToRent && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Build to Rent Property Details</CardTitle>
            <p className="text-sm text-muted-foreground">BTR-specific characteristics and management structure</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="btr-unit-count">Total Number of Units</Label>
                <Input id="btr-unit-count" placeholder="e.g., 200" />
              </div>
              <div>
                <Label htmlFor="btr-ownership-structure">Ownership Structure</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ownership structure" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-50">
                    <SelectItem value="single-entity">Single Entity Ownership</SelectItem>
                    <SelectItem value="unified">Unified Ownership Structure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="btr-management-model">Management Model</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select management model" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-50">
                    <SelectItem value="opco-propco">OpCo/PropCo Structure</SelectItem>
                    <SelectItem value="fund-structure">Fund Structure</SelectItem>
                    <SelectItem value="direct-ownership">Direct Ownership</SelectItem>
                    <SelectItem value="third-party-managed">Third Party Managed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="btr-target-demographic">Target Demographic</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target demographic" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-50">
                    <SelectItem value="young-professionals">Young Professionals</SelectItem>
                    <SelectItem value="families">Families</SelectItem>
                    <SelectItem value="downsizers">Downsizers</SelectItem>
                    <SelectItem value="corporate-tenants">Corporate Tenants</SelectItem>
                    <SelectItem value="mixed-demographic">Mixed Demographic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="btr-unit-mix">Unit Mix</Label>
                <Textarea id="btr-unit-mix" placeholder="e.g., 50x Studio, 80x 1BR, 60x 2BR, 10x 3BR" />
              </div>
              <div>
                <Label htmlFor="btr-shared-amenities">Shared Amenities</Label>
                <Textarea id="btr-shared-amenities" placeholder="e.g., Gym, Pool, Rooftop Terrace, Concierge, Co-working spaces" />
              </div>
            </div>

            {/* BTR Income Streams */}
            <div className="space-y-4">
              <h4 className="font-medium">Income Streams</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="btr-rental-income">Unit Rental Income (Annual)</Label>
                  <Input id="btr-rental-income" placeholder="$8,500,000" />
                </div>
                <div>
                  <Label htmlFor="btr-parking-income">Parking Income (Annual)</Label>
                  <Input id="btr-parking-income" placeholder="$450,000" />
                </div>
                <div>
                  <Label htmlFor="btr-storage-income">Storage Income (Annual)</Label>
                  <Input id="btr-storage-income" placeholder="$120,000" />
                </div>
                <div>
                  <Label htmlFor="btr-service-income">Service Income (Annual)</Label>
                  <Input id="btr-service-income" placeholder="$250,000" />
                </div>
                <div>
                  <Label htmlFor="btr-furniture-income">Furniture Hire Income (Annual)</Label>
                  <Input id="btr-furniture-income" placeholder="$180,000" />
                </div>
                <div>
                  <Label htmlFor="btr-other-income">Other Income (Annual)</Label>
                  <Input id="btr-other-income" placeholder="$75,000" />
                </div>
              </div>
            </div>

            {/* BTR Operating Considerations */}
            <div className="space-y-4">
              <h4 className="font-medium">Operating Considerations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="btr-vacancy-allowance">Vacancy Allowance (%)</Label>
                  <Input id="btr-vacancy-allowance" placeholder="3.5%" />
                </div>
                <div>
                  <Label htmlFor="btr-bad-debt-allowance">Bad Debt Allowance (%)</Label>
                  <Input id="btr-bad-debt-allowance" placeholder="1.2%" />
                </div>
                <div>
                  <Label htmlFor="btr-management-fee">Property Management Fee (%)</Label>
                  <Input id="btr-management-fee" placeholder="4.5%" />
                </div>
                <div>
                  <Label htmlFor="btr-let-up-period">Average Let-up Period (weeks)</Label>
                  <Input id="btr-let-up-period" placeholder="2.5" />
                </div>
              </div>
              <div>
                <Label htmlFor="btr-affordable-housing">Affordable Housing Requirements</Label>
                <Textarea id="btr-affordable-housing" placeholder="Describe any affordable housing obligations, discount percentages, or social housing requirements..." />
              </div>
              <div>
                <Label htmlFor="btr-market-absorption">Market Absorption Analysis</Label>
                <Textarea id="btr-market-absorption" placeholder="Assessment of local market capacity to absorb additional rental stock, competition analysis, and market depth..." />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PropertyDetails;
