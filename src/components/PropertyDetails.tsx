import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Image, Upload, Download, AlertCircle, CheckCircle2, Shield } from "lucide-react";
import { usePropertyTypeLock } from "@/components/PropertyTypeLockProvider";
import { useReportData } from "@/contexts/ReportDataContext";
import { useProperty } from "@/contexts/PropertyContext";
import { useUniversalSave } from "@/hooks/useUniversalSave";
import { useToast } from "@/hooks/use-toast";

const EnhancedPropertyDetails = () => {
  const [includeSection, setIncludeSection] = useState(true);
  const { selectedPropertyType, isPropertyTypeLocked } = usePropertyTypeLock();
  const { reportData, updateReportData } = useReportData();
  const { addressData } = useProperty();
  const { saveData, isSaving, lastSaved } = useUniversalSave('PropertyDetails', { showToast: false });
  const { toast } = useToast();

  // Enhanced property details state
  const [propertyDetails, setPropertyDetails] = useState({
    buildingArea: '',
    buildingHeight: '',
    constructionType: '',
    yearBuilt: '',
    buildingCondition: '',
    numberOfFloors: '',
    carParkingSpaces: '',
    accessibility: '',
    airConditioning: '',
    heating: '',
    lighting: '',
    description: '',
    // Pre-populated for 320 Deakin Avenue Mildura
    streetNumber: '320',
    streetName: 'Deakin',
    streetType: 'Avenue',
    suburb: 'Mildura',
    state: 'VIC',
    postcode: '3500',
    country: 'Australia'
  });

  // Commercial compliance state
  const [complianceChecks, setComplianceChecks] = useState({
    fireSafety: false,
    buildingCode: false,
    disabilityAccess: false,
    environmental: false,
    healthSafety: false,
    zoning: false,
    structural: false,
    electrical: false,
    plumbing: false,
    hvac: false,
    lifeSafety: false,
    asbestos: false,
    energyEfficiency: false,
    waterCompliance: false
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

  const [propertyTypes, setPropertyTypes] = useState({
    commercial: selectedPropertyType === 'commercial',
    residential: selectedPropertyType === 'residential',
    buildToRent: selectedPropertyType === 'build-to-rent',
    agriculture: selectedPropertyType === 'agricultural',
    developmentLand: selectedPropertyType === 'development',
    specialized: selectedPropertyType === 'specialised' || isSpecializedPropertyType(selectedPropertyType)
  });

  const [specializedType, setSpecializedType] = useState(
    selectedPropertyType === 'workers-accommodation' ? 'workers-accommodation' : ''
  );

  // Auto-save functionality - changed to 10 seconds
  useEffect(() => {
    const saveCurrentData = async () => {
      const propertyDetailsData = {
        includeSection,
        propertyTypes,
        specializedType,
        selectedPropertyType,
        addressData,
        propertyDetails,
        complianceChecks,
        reportConfig: reportData.reportConfig,
        photos: reportData.fileAttachments?.propertyPhotos || []
      };
      
      await saveData(propertyDetailsData);
    };

    const debounceTimer = setTimeout(saveCurrentData, 10000); // Changed to 10 seconds
    return () => clearTimeout(debounceTimer);
  }, [includeSection, propertyTypes, specializedType, selectedPropertyType, addressData, propertyDetails, complianceChecks, reportData, saveData]);

  const handlePropertyDetailChange = (field: string, value: string) => {
    setPropertyDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleComplianceChange = (field: string, checked: boolean) => {
    setComplianceChecks(prev => ({ ...prev, [field]: checked }));
  };

  const getComplianceStatus = () => {
    const totalChecks = Object.keys(complianceChecks).length;
    const completedChecks = Object.values(complianceChecks).filter(Boolean).length;
    return { completedChecks, totalChecks, percentage: Math.round((completedChecks / totalChecks) * 100) };
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
          <div className="text-sm text-muted-foreground">
            {isSaving ? "Saving..." : lastSaved ? "✅ Saved" : "Unsaved"}
          </div>
        </div>
      </div>

      {/* Property Photos Integration */}
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
            {/* Show Photos from Property Assessment Form */}
            {reportData.fileAttachments?.propertyPhotos && reportData.fileAttachments.propertyPhotos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {reportData.fileAttachments.propertyPhotos.map((photo, index) => (
                  <div key={photo.id || index} className="relative group">
                    <img 
                      src={photo.url} 
                      alt={photo.description || `Property photo ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 rounded-b-lg">
                      {photo.name || `Photo ${index + 1}`}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center bg-muted/20">
                <div className="flex justify-center mb-4">
                  <Upload className="h-12 w-12 text-muted-foreground" />
                </div>
                <h4 className="text-lg font-medium mb-2 text-foreground">No Photos Found</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Photos from Property Assessment Form will appear here automatically
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Property Type Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Property Type Configuration</CardTitle>
          <p className="text-sm text-muted-foreground">
            Property type configuration from assessment form. Modify as needed.
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
                  checked={propertyTypes.agriculture}
                  onCheckedChange={(checked) => 
                    setPropertyTypes(prev => ({ ...prev, agriculture: checked }))
                  }
                />
                <Label>Agriculture</Label>
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

            {/* Specialized Property Type Dropdown */}
            {propertyTypes.specialized && (
              <div className="mt-4">
                <Label htmlFor="specialized-type">Specialized Property Type</Label>
                <Select value={specializedType} onValueChange={setSpecializedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialized property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workers-accommodation">Workers Accommodation</SelectItem>
                    <SelectItem value="childcare-centre">Childcare Centre</SelectItem>
                    <SelectItem value="hotel-motel">Hotel/Motel</SelectItem>
                    <SelectItem value="carpark">Carpark</SelectItem>
                    <SelectItem value="cinema">Cinema</SelectItem>
                    <SelectItem value="service-station">Service Station</SelectItem>
                    <SelectItem value="licensed-venue">Licensed Venue</SelectItem>
                    <SelectItem value="healthcare-facility">Healthcare Facility</SelectItem>
                    <SelectItem value="aged-care">Aged Care</SelectItem>
                    <SelectItem value="student-accommodation">Student Accommodation</SelectItem>
                    <SelectItem value="self-storage">Self Storage</SelectItem>
                    <SelectItem value="data-centre">Data Centre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Auto-filled Property Information Alert */}
          {selectedPropertyType === 'workers-accommodation' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">✅ Pre-filled from Property Assessment</h4>
              <p className="text-sm text-blue-700">
                Property type "Workers Accommodation" has been automatically selected based on your property assessment form.
              </p>
            </div>
          )}

          {/* Enhanced Building Attributes */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Building Specifications
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="building-area">Building Area (m²)</Label>
                  <Input 
                    id="building-area" 
                    value={propertyDetails.buildingArea}
                    onChange={(e) => handlePropertyDetailChange('buildingArea', e.target.value)}
                    placeholder="Enter total building area" 
                  />
                </div>
                <div>
                  <Label htmlFor="building-height">Building Height (m)</Label>
                  <Input 
                    id="building-height" 
                    value={propertyDetails.buildingHeight}
                    onChange={(e) => handlePropertyDetailChange('buildingHeight', e.target.value)}
                    placeholder="Maximum height" 
                  />
                </div>
                <div>
                  <Label htmlFor="number-floors">Number of Floors</Label>
                  <Input 
                    id="number-floors" 
                    value={propertyDetails.numberOfFloors}
                    onChange={(e) => handlePropertyDetailChange('numberOfFloors', e.target.value)}
                    placeholder="Total floors" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="construction-type">Construction Type</Label>
                  <Select value={propertyDetails.constructionType} onValueChange={(value) => handlePropertyDetailChange('constructionType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select construction type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brick-veneer">Brick Veneer</SelectItem>
                      <SelectItem value="steel-frame">Steel Frame</SelectItem>
                      <SelectItem value="concrete-block">Concrete Block</SelectItem>
                      <SelectItem value="timber-frame">Timber Frame</SelectItem>
                      <SelectItem value="reinforced-concrete">Reinforced Concrete</SelectItem>
                      <SelectItem value="composite">Composite Construction</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="year-built">Year Built</Label>
                  <Input 
                    id="year-built" 
                    value={propertyDetails.yearBuilt}
                    onChange={(e) => handlePropertyDetailChange('yearBuilt', e.target.value)}
                    placeholder="Construction year" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div>
                  <Label htmlFor="building-condition">Building Condition</Label>
                  <Select value={propertyDetails.buildingCondition} onValueChange={(value) => handlePropertyDetailChange('buildingCondition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="very-good">Very Good</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                      <SelectItem value="requires-renovation">Requires Renovation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="car-parking">Car Parking Spaces</Label>
                  <Input 
                    id="car-parking" 
                    value={propertyDetails.carParkingSpaces}
                    onChange={(e) => handlePropertyDetailChange('carParkingSpaces', e.target.value)}
                    placeholder="Number of spaces" 
                  />
                </div>
                <div>
                  <Label htmlFor="accessibility">Accessibility Features</Label>
                  <Select value={propertyDetails.accessibility} onValueChange={(value) => handlePropertyDetailChange('accessibility', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select accessibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fully-accessible">Fully Accessible</SelectItem>
                      <SelectItem value="partially-accessible">Partially Accessible</SelectItem>
                      <SelectItem value="limited-access">Limited Access</SelectItem>
                      <SelectItem value="not-accessible">Not Accessible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <Label htmlFor="air-conditioning">Air Conditioning</Label>
                  <Select value={propertyDetails.airConditioning} onValueChange={(value) => handlePropertyDetailChange('airConditioning', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select A/C type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="central">Central Air</SelectItem>
                      <SelectItem value="split-system">Split System</SelectItem>
                      <SelectItem value="ducted">Ducted</SelectItem>
                      <SelectItem value="window-units">Window Units</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="heating">Heating System</Label>
                  <Select value={propertyDetails.heating} onValueChange={(value) => handlePropertyDetailChange('heating', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select heating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gas">Gas Heating</SelectItem>
                      <SelectItem value="electric">Electric Heating</SelectItem>
                      <SelectItem value="hydronic">Hydronic</SelectItem>
                      <SelectItem value="solar">Solar Heating</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="lighting">Lighting Type</Label>
                  <Select value={propertyDetails.lighting} onValueChange={(value) => handlePropertyDetailChange('lighting', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lighting" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="led">LED</SelectItem>
                      <SelectItem value="fluorescent">Fluorescent</SelectItem>
                      <SelectItem value="halogen">Halogen</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Comprehensive Property Description Table */}
              <div className="mt-6">
                <Label className="text-base font-medium mb-4 block">Comprehensive Property Description</Label>
                
                {/* Construction Details */}
                <div className="border rounded-lg overflow-hidden mb-4">
                  <div className="bg-muted px-4 py-2 border-b">
                    <h5 className="font-medium text-sm">Construction Details</h5>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-3 gap-4 p-3">
                      <Label className="text-sm font-medium">Year Built</Label>
                      <Input 
                        value={propertyDetails.yearBuilt}
                        onChange={(e) => handlePropertyDetailChange('yearBuilt', e.target.value)}
                        placeholder="e.g., 1985"
                        className="text-sm"
                      />
                      <div className="text-xs text-muted-foreground">Construction year</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-3">
                      <Label className="text-sm font-medium">Construction</Label>
                      <Select value={propertyDetails.constructionType} onValueChange={(value) => handlePropertyDetailChange('constructionType', value)}>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="concrete">Concrete</SelectItem>
                          <SelectItem value="brick-veneer">Brick Veneer</SelectItem>
                          <SelectItem value="steel-frame">Steel Frame</SelectItem>
                          <SelectItem value="timber-frame">Timber Frame</SelectItem>
                          <SelectItem value="reinforced-concrete">Reinforced Concrete</SelectItem>
                          <SelectItem value="composite">Composite</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="text-xs text-muted-foreground">Primary construction method</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-3">
                      <Label className="text-sm font-medium">Foundation</Label>
                      <Select onValueChange={(value) => handlePropertyDetailChange('foundation', value)}>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Select foundation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="concrete-slab">Concrete Slab</SelectItem>
                          <SelectItem value="strip-footing">Strip Footing</SelectItem>
                          <SelectItem value="pile-foundation">Pile Foundation</SelectItem>
                          <SelectItem value="basement">Basement</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="text-xs text-muted-foreground">Foundation type</div>
                    </div>
                  </div>
                </div>

                {/* External Features */}
                <div className="border rounded-lg overflow-hidden mb-4">
                  <div className="bg-muted px-4 py-2 border-b">
                    <h5 className="font-medium text-sm">External Features</h5>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-3 gap-4 p-3">
                      <Label className="text-sm font-medium">Roof</Label>
                      <Select onValueChange={(value) => handlePropertyDetailChange('roofType', value)}>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Select roof type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tile">Tile</SelectItem>
                          <SelectItem value="metal">Metal Sheeting</SelectItem>
                          <SelectItem value="concrete">Concrete</SelectItem>
                          <SelectItem value="composite">Composite</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="text-xs text-muted-foreground">Roof material</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-3">
                      <Label className="text-sm font-medium">Windows</Label>
                      <Select onValueChange={(value) => handlePropertyDetailChange('windowType', value)}>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Select window type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard Windows</SelectItem>
                          <SelectItem value="double-glazed">Double Glazed</SelectItem>
                          <SelectItem value="aluminium">Aluminium Frame</SelectItem>
                          <SelectItem value="timber">Timber Frame</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="text-xs text-muted-foreground">Window specifications</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-3">
                      <Label className="text-sm font-medium">External Cladding</Label>
                      <Select onValueChange={(value) => handlePropertyDetailChange('externalCladding', value)}>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Select cladding" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="brick">Brick Render</SelectItem>
                          <SelectItem value="weatherboard">Weatherboard</SelectItem>
                          <SelectItem value="vinyl">Vinyl Cladding</SelectItem>
                          <SelectItem value="cement-render">Cement Render</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="text-xs text-muted-foreground">External wall finish</div>
                    </div>
                  </div>
                </div>

                {/* Internal Features */}
                <div className="border rounded-lg overflow-hidden mb-4">
                  <div className="bg-muted px-4 py-2 border-b">
                    <h5 className="font-medium text-sm">Internal Features</h5>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-3 gap-4 p-3">
                      <Label className="text-sm font-medium">Layout</Label>
                      <Input 
                        onChange={(e) => handlePropertyDetailChange('layoutDescription', e.target.value)}
                        placeholder="e.g., Open plan office areas for office plan"
                        className="text-sm"
                      />
                      <div className="text-xs text-muted-foreground">General layout description</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-3">
                      <Label className="text-sm font-medium">Floor Coverings</Label>
                      <Select onValueChange={(value) => handlePropertyDetailChange('floorCoverings', value)}>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Select flooring" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="carpet-tile">Carpet and Tile</SelectItem>
                          <SelectItem value="timber">Timber Flooring</SelectItem>
                          <SelectItem value="concrete">Polished Concrete</SelectItem>
                          <SelectItem value="vinyl">Vinyl Flooring</SelectItem>
                          <SelectItem value="ceramic">Ceramic Tiles</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="text-xs text-muted-foreground">Primary floor covering</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-3">
                      <Label className="text-sm font-medium">Fixtures and Fittings</Label>
                      <Input 
                        onChange={(e) => handlePropertyDetailChange('fixturesAndFittings', e.target.value)}
                        placeholder="e.g., Blind, hot light, front desk, dishwasher, electric stove-top, oven"
                        className="text-sm"
                      />
                      <div className="text-xs text-muted-foreground">Included fixtures</div>
                    </div>
                  </div>
                </div>

                {/* Amenities and Services */}
                <div className="border rounded-lg overflow-hidden mb-4">
                  <div className="bg-muted px-4 py-2 border-b">
                    <h5 className="font-medium text-sm">Amenities and Services</h5>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-3 gap-4 p-3">
                      <Label className="text-sm font-medium">External Condition</Label>
                      <Select value={propertyDetails.buildingCondition} onValueChange={(value) => handlePropertyDetailChange('buildingCondition', value)}>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="very-good">Very Good</SelectItem>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="text-xs text-muted-foreground">Overall external condition</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-3">
                      <Label className="text-sm font-medium">Internal Condition</Label>
                      <Select onValueChange={(value) => handlePropertyDetailChange('internalCondition', value)}>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="very-good">Very Good</SelectItem>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="text-xs text-muted-foreground">Overall internal condition</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-3">
                      <Label className="text-sm font-medium">Parking</Label>
                      <Select onValueChange={(value) => handlePropertyDetailChange('parkingType', value)}>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Select parking" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="street-parking">Street Parking</SelectItem>
                          <SelectItem value="covered-parking">Covered Parking</SelectItem>
                          <SelectItem value="basement-parking">Basement Parking</SelectItem>
                          <SelectItem value="dedicated-spaces">Dedicated Spaces</SelectItem>
                          <SelectItem value="no-parking">No Parking</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="text-xs text-muted-foreground">Parking arrangements</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-3">
                      <Label className="text-sm font-medium">Disability Amenities</Label>
                      <Select value={propertyDetails.accessibility} onValueChange={(value) => handlePropertyDetailChange('accessibility', value)}>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Select accessibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="partial">Partial</SelectItem>
                          <SelectItem value="not-applicable">Not Applicable</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="text-xs text-muted-foreground">Accessibility features</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-3">
                      <Label className="text-sm font-medium">Communal Areas</Label>
                      <Input 
                        onChange={(e) => handlePropertyDetailChange('communalAreas', e.target.value)}
                        placeholder="e.g., Not Applicable or describe areas"
                        className="text-sm"
                      />
                      <div className="text-xs text-muted-foreground">Shared facilities</div>
                    </div>
                  </div>
                </div>

                {/* Area Summary Table */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted px-4 py-2 border-b">
                    <h5 className="font-medium text-sm">Area Summary</h5>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-3 gap-4 p-3">
                      <Label className="text-sm font-medium">GLAR</Label>
                      <Input 
                        onChange={(e) => handlePropertyDetailChange('glar', e.target.value)}
                        placeholder="950 sqm"
                        className="text-sm"
                      />
                      <div className="text-xs text-muted-foreground">Gross lettable area</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-3">
                      <Label className="text-sm font-medium">Annex</Label>
                      <Input 
                        onChange={(e) => handlePropertyDetailChange('annexArea', e.target.value)}
                        placeholder="0 sqm"
                        className="text-sm"
                      />
                      <div className="text-xs text-muted-foreground">Additional area</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-3">
                      <Label className="text-sm font-medium">Land Area</Label>
                      <Input 
                        onChange={(e) => handlePropertyDetailChange('landArea', e.target.value)}
                        placeholder="950 sqm"
                        className="text-sm"
                      />
                      <div className="text-xs text-muted-foreground">Total land area</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-3">
                      <Label className="text-sm font-medium">Total Area</Label>
                      <Input 
                        value={propertyDetails.buildingArea}
                        onChange={(e) => handlePropertyDetailChange('buildingArea', e.target.value)}
                        placeholder="950 sqm"
                        className="text-sm"
                      />
                      <div className="text-xs text-muted-foreground">Combined total area</div>
                    </div>
                  </div>
                </div>

                {/* Comprehensive Description */}
                <div className="mt-4">
                  <Label htmlFor="building-description">Additional Property Notes</Label>
                  <Textarea 
                    id="building-description" 
                    value={propertyDetails.description}
                    onChange={(e) => handlePropertyDetailChange('description', e.target.value)}
                    placeholder="Any additional notes, unique features, or important details not covered above..."
                    className="min-h-[80px] mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Commercial Compliance Checks */}
            {(propertyTypes.commercial || propertyTypes.specialized) && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Commercial Compliance Checks
                  </h4>
                  <Badge variant="outline" className="text-sm">
                    {getComplianceStatus().completedChecks}/{getComplianceStatus().totalChecks} Complete ({getComplianceStatus().percentage}%)
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                  {Object.entries({
                    fireSafety: 'Fire Safety Systems',
                    buildingCode: 'Building Code Compliance',
                    disabilityAccess: 'Disability Access (DDA)',
                    environmental: 'Environmental Compliance',
                    healthSafety: 'Health & Safety (WHS)',
                    zoning: 'Zoning Compliance',
                    structural: 'Structural Certification',
                    electrical: 'Electrical Compliance',
                    plumbing: 'Plumbing Compliance',
                    hvac: 'HVAC Compliance',
                    lifeSafety: 'Life Safety Systems',
                    asbestos: 'Asbestos Management',
                    energyEfficiency: 'Energy Efficiency Rating',
                    waterCompliance: 'Water Compliance'
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-3 p-2 bg-background rounded border">
                      <Checkbox
                        id={key}
                        checked={complianceChecks[key as keyof typeof complianceChecks]}
                        onCheckedChange={(checked) => handleComplianceChange(key, checked as boolean)}
                      />
                      <Label htmlFor={key} className="text-sm cursor-pointer flex-1">
                        {label}
                      </Label>
                      {complianceChecks[key as keyof typeof complianceChecks] ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                      )}
                    </div>
                  ))}
                </div>

                {getComplianceStatus().percentage < 80 && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-medium text-amber-800">Compliance Warning</span>
                    </div>
                    <p className="text-sm text-amber-700 mt-1">
                      Less than 80% of compliance checks completed. Ensure all relevant certifications are verified before finalizing the valuation.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Save Progress Button */}
      <div className="flex justify-end">
        <Button 
          onClick={() => {
            const propertyDetailsData = {
              includeSection,
              propertyTypes,
              specializedType,
              selectedPropertyType,
              propertyDetails,
              complianceChecks,
              reportConfig: reportData.reportConfig,
              photos: reportData.fileAttachments?.propertyPhotos || []
            };
            saveData(propertyDetailsData);
            toast({
              title: "Property Details Saved",
              description: `Enhanced property details saved. Auto-save every 10 seconds. Compliance: ${getComplianceStatus().percentage}% complete.`,
            });
          }}
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          {isSaving ? "Saving..." : "Save Property Details"}
        </Button>
      </div>
    </div>
  );
};

export default EnhancedPropertyDetails;