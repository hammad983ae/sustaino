import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Sparkles, Building, FileText, RefreshCw } from "lucide-react";
import { AutofillAddressFields } from "@/components/AutofillAddressFields";
import GoogleMapComponent from "@/components/GoogleMapComponent";
import { usePropertyLocationData } from "@/hooks/usePropertyLocationData";
import { useProperty } from "@/contexts/PropertyContext";
import { useState } from "react";

const getDefaultContent = (field: string) => {
  const defaultData: Record<string, string> = {
    location: "The subject property is located at 320 Deakin Avenue, Mildura, situated approximately 1.2km from Mildura's Central Business District. The property is positioned in an established residential area, with convenient access to the Murray River foreshore (800m) and Mildura Base Hospital (1.5km). The location benefits from proximity to major arterial roads including Deakin Avenue and Fifteenth Street, providing excellent connectivity to shopping precincts and recreational facilities.",
    access: "Vehicle access to the property is via Deakin Avenue, a sealed arterial road that experiences moderate traffic volumes during peak periods. The property features a concrete driveway providing secure off-street parking for two vehicles. Public transport is available via the Mildura bus network with stops located within 200 metres. The location provides excellent pedestrian access to local amenities and the CBD via established footpath networks.",
    siteDescription: "The subject property comprises an 850 square metre rectangular allotment with a 20-metre frontage to Deakin Avenue. The site is relatively flat with a gentle slope toward the rear boundary. The property is fully fenced with established gardens and mature trees providing privacy and amenity. The allotment is well-proportioned and suitable for the existing improvements with adequate space for future enhancement.",
    neighbourhood: "The immediate neighbourhood is characterised by established residential properties predominantly constructed between 1960-1990. Housing styles include brick veneer dwellings, weatherboard cottages, and modern renovated homes. The area maintains an excellent reputation as a family-friendly precinct with well-maintained streetscapes and minimal commercial intrusion. Property maintenance standards are generally high, contributing to the area's desirability.",
    amenities: "Local amenities include Mildura Central Shopping Centre (2.1km), Mildura Primary School (800m), Mildura South Primary School (1.2km), and Mildura Senior College (1.8km). The property is within walking distance of Jaycee Park and sporting facilities, while the Murray River recreation precinct is easily accessible. Medical facilities include Mildura Base Hospital and numerous specialist practices within 2km radius.",
    services: "The property is connected to all essential services including reticulated water, natural gas, electricity (overhead), and sewerage. NBN high-speed internet is available to the premises. Waste collection services are provided by Mildura Rural City Council with weekly general waste and fortnightly recycling collection. Storm water drainage is via kerb and channel to the municipal system."
  };
  return defaultData[field] || '';
};

const RPDAndLocation = () => {
  const { addressData } = useProperty();
  const { 
    analysisData, 
    isGenerating, 
    generateLocationAnalysis, 
    updateAnalysisField 
  } = usePropertyLocationData();

  // Property Identification Methods state
  const [includeIdentificationMethods, setIncludeIdentificationMethods] = useState(true);
  const [identificationMethods, setIdentificationMethods] = useState({
    physicalInspection: true,  // Pre-selected
    cadastralMap: true,       // Pre-selected  
    aerialMapping: true,      // Pre-selected
    surveyorPeg: false,
    plan: false,
    certificateTitle: false,
    other: false
  });

  const handleIdentificationMethodChange = (method: string, checked: boolean) => {
    setIdentificationMethods(prev => ({
      ...prev,
      [method]: checked
    }));
  };

  const handleGenerateAnalysis = async () => {
    await generateLocationAnalysis();
  };
  
  return (
    <div className="space-y-6">
      {/* Auto Generate Button */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <CardTitle>Property Location Data Generation</CardTitle>
            </div>
            <Button 
              onClick={handleGenerateAnalysis}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              {isGenerating ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Auto-Generate Location Data
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* 1. Street Address and RPD */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg">Street Address and RPD</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <AutofillAddressFields showUnit={true} showLotPlan={true} showSuburb={true} />
        </CardContent>
      </Card>

      {/* 2. Google Maps - Property Location */}
      <GoogleMapComponent height="400px" />

      {/* 3. Property Identification Methods */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-500" />
            <CardTitle className="text-lg">Property Identification Methods</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              Property Identified By
              <Switch 
                checked={includeIdentificationMethods}
                onCheckedChange={setIncludeIdentificationMethods}
              />
              <span className="text-sm text-muted-foreground">Include</span>
            </h4>
            
            {includeIdentificationMethods && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="physical-inspection" 
                      checked={identificationMethods.physicalInspection}
                      onCheckedChange={(checked) => handleIdentificationMethodChange('physicalInspection', !!checked)}
                    />
                    <Label htmlFor="physical-inspection" className="text-sm">Physical Inspection</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="surveyor-peg" 
                      checked={identificationMethods.surveyorPeg}
                      onCheckedChange={(checked) => handleIdentificationMethodChange('surveyorPeg', !!checked)}
                    />
                    <Label htmlFor="surveyor-peg" className="text-sm">Surveyor Peg</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="plan" 
                      checked={identificationMethods.plan}
                      onCheckedChange={(checked) => handleIdentificationMethodChange('plan', !!checked)}
                    />
                    <Label htmlFor="plan" className="text-sm">Plan</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="cadastral-map" 
                      checked={identificationMethods.cadastralMap}
                      onCheckedChange={(checked) => handleIdentificationMethodChange('cadastralMap', !!checked)}
                    />
                    <Label htmlFor="cadastral-map" className="text-sm">Cadastral Map</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="certificate-title" 
                      checked={identificationMethods.certificateTitle}
                      onCheckedChange={(checked) => handleIdentificationMethodChange('certificateTitle', !!checked)}
                    />
                    <Label htmlFor="certificate-title" className="text-sm">Certificate of Title</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="aerial-mapping" 
                      checked={identificationMethods.aerialMapping}
                      onCheckedChange={(checked) => handleIdentificationMethodChange('aerialMapping', !!checked)}
                    />
                    <Label htmlFor="aerial-mapping" className="text-sm">Aerial Mapping</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="other" 
                      checked={identificationMethods.other}
                      onCheckedChange={(checked) => handleIdentificationMethodChange('other', !!checked)}
                    />
                    <Label htmlFor="other" className="text-sm">Other (Please specify)</Label>
                  </div>
                </div>
                
                {identificationMethods.other && (
                  <div className="mt-2">
                    <Textarea placeholder="Please specify other identification method..." className="h-20" />
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 4. Property Location & Site Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Property Location & Site Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            {
              title: "Location",
              field: "location" as const,
              placeholder: "Describe the property location in relation to major landmarks, transport routes, and commercial centers..."
            },
            {
              title: "Access", 
              field: "access" as const,
              placeholder: "Describe property access including road types, traffic conditions, public transport, and parking availability..."
            },
            {
              title: "Site Description",
              field: "siteDescription" as const,
              placeholder: "Describe the physical characteristics of the site including shape, topography, frontage, and area..."
            },
            {
              title: "Neighbourhood",
              field: "neighbourhood" as const,
              placeholder: "Describe the surrounding area including property types, land use, and general character..."
            },
            {
              title: "Amenities",
              field: "amenities" as const,
              placeholder: "List nearby amenities including shopping centers, schools, hospitals, recreational facilities, and their distances..."
            },
            {
              title: "Services",
              field: "services" as const,
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
                value={analysisData[section.field] || getDefaultContent(section.field)}
                onChange={(e) => updateAnalysisField(section.field, e.target.value)}
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