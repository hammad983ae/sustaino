import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Image, Upload, Download } from "lucide-react";
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

  // Auto-save functionality
  useEffect(() => {
    const saveCurrentData = async () => {
      const propertyDetailsData = {
        includeSection,
        propertyTypes,
        specializedType,
        selectedPropertyType,
        addressData,
        reportConfig: reportData.reportConfig,
        photos: reportData.fileAttachments?.propertyPhotos || []
      };
      
      await saveData(propertyDetailsData);
    };

    const debounceTimer = setTimeout(saveCurrentData, 1000);
    return () => clearTimeout(debounceTimer);
  }, [includeSection, propertyTypes, specializedType, selectedPropertyType, addressData, reportData, saveData]);

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

          {/* Building Attributes and Compliance */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="building-area">Building Area (m²)</Label>
                <Input id="building-area" placeholder="Enter building area" />
              </div>
              <div>
                <Label htmlFor="building-height">Building Height (m)</Label>
                <Input id="building-height" placeholder="Enter building height" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="construction-type">Construction Type</Label>
                <Input id="construction-type" placeholder="e.g., Brick veneer, Steel frame" />
              </div>
              <div>
                <Label htmlFor="year-built">Year Built</Label>
                <Input id="year-built" placeholder="Enter construction year" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="building-condition">Building Condition</Label>
                <Input id="building-condition" placeholder="e.g., Good, Fair, Poor" />
              </div>
              <div>
                <Label htmlFor="compliance-status">Compliance Status</Label>
                <Input id="compliance-status" placeholder="e.g., Compliant, Non-compliant" />
              </div>
            </div>

            <div>
              <Label htmlFor="building-description">Building Description</Label>
              <Input id="building-description" placeholder="Detailed description of building attributes" className="h-24" />
            </div>
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
              reportConfig: reportData.reportConfig,
              photos: reportData.fileAttachments?.propertyPhotos || []
            };
            saveData(propertyDetailsData);
            toast({
              title: "Property Details Saved",
              description: "Your property details have been saved successfully.",
            });
          }}
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          {isSaving ? "✓ Saved" : "Save Property Details"}
        </Button>
      </div>
    </div>
  );
};

export default EnhancedPropertyDetails;