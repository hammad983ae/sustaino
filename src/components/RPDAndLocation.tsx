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

const RPDAndLocation = () => {
  const { addressData } = useProperty();
  const { analysisData, isGenerating, generateLocationAnalysis, updateAnalysisField } = usePropertyLocationData();
  
  return (
    <div className="space-y-6">
      {/* Auto Generate Button */}
      <div className="flex justify-center gap-3">
        <Button 
          onClick={generateLocationAnalysis}
          disabled={isGenerating || !addressData?.propertyAddress}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
        >
          {isGenerating ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4 mr-2" />
          )}
          {isGenerating ? 'Generating...' : 'Auto-Generate Location Data'}
        </Button>
      </div>

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
                value={analysisData[section.field]}
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