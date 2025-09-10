import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MapPin, FileText } from "lucide-react";
import PlanningDataIntegration from "./PlanningDataIntegration";

const LegalAndPlanning = () => {
  const [planningData, setPlanningData] = useState({
    lga: "",
    zoning: "",
    currentUse: "",
    permissibleUse: "",
    permitNumber: "",
    overlays: "",
    overlayImpactAssessment: "",
    overlayImpactRating: "",
    heightOfBuilding: "",
    floorSpaceRatio: "",
    minimumLotSize: "",
    planningRestrictions: "",
    developmentPotential: ""
  });

  const handlePlanningDataFetched = (data: any) => {
    console.log('Planning data received:', data);
    
    setPlanningData(prev => ({
      ...prev,
      lga: data.lga || data.planningScheme?.replace(' Planning Scheme', '') || "",
      zoning: data.zoning || "",
      overlays: Array.isArray(data.overlays) ? data.overlays.join(", ") : (data.overlays || ""),
      heightOfBuilding: data.heightRestriction || data.buildingHeight || "",
      floorSpaceRatio: data.floorSpaceRatio || "",
      minimumLotSize: data.minimumLotSize || "",
      permissibleUse: data.landUse || "",
      developmentPotential: data.developmentPotential || "",
      planningRestrictions: Array.isArray(data.overlays) && data.overlays.length > 0 
        ? `Planning overlays apply: ${data.overlays.join(", ")}` 
        : (Array.isArray(data.planningRestrictions) ? data.planningRestrictions.join(", ") : (data.planningRestrictions || "")),
      overlayImpactRating: data.overlays && Array.isArray(data.overlays) && data.overlays.length > 0 ? "3" : "1"
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setPlanningData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return (
    <div className="space-y-6">
      {/* Header with Include Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Legal Description & Planning Information</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="include-legal-planning" className="text-sm">Include</Label>
          <Switch id="include-legal-planning" defaultChecked />
        </div>
      </div>

      {/* Interactive Map View */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            Interactive Map View
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-blue-700 mb-2">Interactive Map View</h3>
            <p className="text-sm text-blue-600 mb-4">Aerial imagery provided by State Planning Portals</p>
            <ul className="text-sm text-blue-600 space-y-1 text-left max-w-md mx-auto">
              <li>• Aerial imagery provided by State Planning Portals</li>
              <li>• Use the layer control (top right) to toggle between base map and aerial view</li>
              <li>• Zoom and pan to explore the property and surrounding area</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Planning Data Integration */}
      <PlanningDataIntegration onDataFetched={handlePlanningDataFetched} />

      {/* Planning Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Planning Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* First Row - LGA, Zoning, Current Use, Permissible Use */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="lga-legal">LGA</Label>
              <Input 
                id="lga-legal" 
                placeholder="" 
                className="mt-1" 
                value={planningData.lga}
                onChange={(e) => handleInputChange('lga', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="zoning-legal">Zoning</Label>
              <Input 
                id="zoning-legal" 
                placeholder="" 
                className="mt-1" 
                value={planningData.zoning}
                onChange={(e) => handleInputChange('zoning', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="current-use-legal">Current Use</Label>
              <Input 
                id="current-use-legal" 
                placeholder="" 
                className="mt-1" 
                value={planningData.currentUse}
                onChange={(e) => handleInputChange('currentUse', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="permissible-use">Permissible Use</Label>
              <Input 
                id="permissible-use" 
                placeholder="" 
                className="mt-1" 
                value={planningData.permissibleUse}
                onChange={(e) => handleInputChange('permissibleUse', e.target.value)}
              />
            </div>
          </div>

          {/* Second Row - Permit Number, Overlays */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="permit-number">Permit Number</Label>
              <Input 
                id="permit-number" 
                placeholder="" 
                className="mt-1" 
                value={planningData.permitNumber}
                onChange={(e) => handleInputChange('permitNumber', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="overlays">Overlays</Label>
              <Input 
                id="overlays" 
                placeholder="" 
                className="mt-1" 
                value={planningData.overlays}
                onChange={(e) => handleInputChange('overlays', e.target.value)}
              />
            </div>
          </div>

          {/* Overlay Impact Assessment */}
          <div>
            <Label htmlFor="overlay-impact-assessment">Overlay Impact Assessment</Label>
            <Textarea 
              id="overlay-impact-assessment"
              placeholder=""
              className="mt-1 h-32"
              value={planningData.overlayImpactAssessment}
              onChange={(e) => handleInputChange('overlayImpactAssessment', e.target.value)}
            />
          </div>

          {/* Overlay Impact Rating */}
          <div className="max-w-md">
            <Label htmlFor="overlay-impact-rating">Overlay Impact Rating</Label>
            <Select value={planningData.overlayImpactRating} onValueChange={(value) => handleInputChange('overlayImpactRating', value)}>
              <SelectTrigger className="mt-1 bg-background">
                <SelectValue placeholder="Select impact rating" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="1">1 - Very Low Impact</SelectItem>
                <SelectItem value="2">2 - Low Impact</SelectItem>
                <SelectItem value="3">3 - Medium Impact</SelectItem>
                <SelectItem value="4">4 - High Impact</SelectItem>
                <SelectItem value="5">5 - Very High Impact</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Building Controls Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="height-building">Height of Building</Label>
              <Input 
                id="height-building" 
                placeholder="" 
                className="mt-1" 
                value={planningData.heightOfBuilding}
                onChange={(e) => handleInputChange('heightOfBuilding', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="floor-space-ratio">Floor Space Ratio</Label>
              <Input 
                id="floor-space-ratio" 
                placeholder="" 
                className="mt-1" 
                value={planningData.floorSpaceRatio}
                onChange={(e) => handleInputChange('floorSpaceRatio', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="minimum-lot-size">Minimum Lot Size</Label>
              <Input 
                id="minimum-lot-size" 
                placeholder="" 
                className="mt-1" 
                value={planningData.minimumLotSize}
                onChange={(e) => handleInputChange('minimumLotSize', e.target.value)}
              />
            </div>
          </div>

          {/* Planning Restrictions & Overlays */}
          <div>
            <Label htmlFor="planning-restrictions">Planning Restrictions & Overlays</Label>
            <Textarea 
              id="planning-restrictions"
              placeholder=""
              className="mt-1 h-32"
              value={planningData.planningRestrictions}
              onChange={(e) => handleInputChange('planningRestrictions', e.target.value)}
            />
          </div>

          {/* Development Potential & Future Use */}
          <div>
            <Label htmlFor="development-potential">Development Potential & Future Use</Label>
            <Textarea 
              id="development-potential"
              placeholder=""
              className="mt-1 h-32"
              value={planningData.developmentPotential}
              onChange={(e) => handleInputChange('developmentPotential', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalAndPlanning;