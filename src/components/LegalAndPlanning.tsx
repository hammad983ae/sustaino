import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, MapPin, CheckCircle } from "lucide-react";
import PlanningDataIntegration from "./PlanningDataIntegration";
import GoogleMapComponent from "./GoogleMapComponent";

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

  const [fetchedPlanningData, setFetchedPlanningData] = useState<any>(null);

  const handlePlanningDataFetched = (data: any) => {
    console.log('Planning data fetched in LegalAndPlanning:', data);
    setFetchedPlanningData(data);
    
    // Update the form with fetched data
    setPlanningData(prev => ({
      ...prev,
      lga: data.lga || data.council || data.municipality || "",
      zoning: data.zoning || data.zone_primary || "",
      currentUse: data.currentUse || data.land_use || "",
      permissibleUse: data.permissibleUse || "",
      permitNumber: data.permitNumber || "",
      overlays: Array.isArray(data.overlays) ? data.overlays.map((o: any) => o.code || o).join(", ") : "",
      overlayImpactAssessment: data.overlayImpactAssessment || "",
      overlayImpactRating: data.overlayImpactRating || "3 - Medium Impact",
      heightOfBuilding: data.heightOfBuilding || "",
      floorSpaceRatio: data.floorSpaceRatio || "",
      minimumLotSize: data.minimumLotSize || "",
      planningRestrictions: data.planningRestrictions || "",
      developmentPotential: data.developmentPotential || data.development_potential || ""
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
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-500" />
            <CardTitle className="text-lg">Interactive Map</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <GoogleMapComponent />
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Map Navigation Tips:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use the search box to locate your property</li>
              <li>• Switch between Map and Satellite views</li>
              <li>• Zoom and pan to explore the property and surrounding area</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Planning Data Integration */}
      <PlanningDataIntegration onDataFetched={handlePlanningDataFetched} />

      {/* Enhanced Planning Information with Green Background */}
      {fetchedPlanningData && (
        <Card className="border-emerald-200 bg-emerald-50">
          <CardHeader className="bg-emerald-100 border-b border-emerald-200">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              <CardTitle className="text-lg text-emerald-800">Planning Information Retrieved</CardTitle>
              <Badge variant="outline" className="ml-auto text-xs border-emerald-300 text-emerald-700">
                {fetchedPlanningData.dataSource || fetchedPlanningData.data_source || 'VicMap Planning API'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 bg-emerald-50">
            {/* First Row - LGA, Zoning, Current Use, Permissible Use */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="lga-legal" className="text-emerald-700 font-medium">LGA</Label>
                <Input 
                  id="lga-legal" 
                  className="mt-1 bg-white border-emerald-200" 
                  value={planningData.lga}
                  onChange={(e) => handleInputChange('lga', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="zoning-legal" className="text-emerald-700 font-medium">Zoning</Label>
                <Input 
                  id="zoning-legal" 
                  className="mt-1 bg-white border-emerald-200" 
                  value={planningData.zoning}
                  onChange={(e) => handleInputChange('zoning', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="current-use-legal" className="text-emerald-700 font-medium">Current Use</Label>
                <Input 
                  id="current-use-legal" 
                  className="mt-1 bg-white border-emerald-200" 
                  value={planningData.currentUse}
                  onChange={(e) => handleInputChange('currentUse', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="permissible-use" className="text-emerald-700 font-medium">Permissible Use</Label>
                <Input 
                  id="permissible-use" 
                  className="mt-1 bg-white border-emerald-200" 
                  value={planningData.permissibleUse}
                  onChange={(e) => handleInputChange('permissibleUse', e.target.value)}
                />
              </div>
            </div>

            {/* Second Row - Permit Number, Overlays */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="permit-number" className="text-emerald-700 font-medium">Permit Number</Label>
                <Input 
                  id="permit-number" 
                  className="mt-1 bg-white border-emerald-200" 
                  value={planningData.permitNumber}
                  onChange={(e) => handleInputChange('permitNumber', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="overlays" className="text-emerald-700 font-medium">Overlays</Label>
                <div className="mt-1 p-2 bg-white border border-emerald-200 rounded-md">
                  {fetchedPlanningData.overlays && Array.isArray(fetchedPlanningData.overlays) && fetchedPlanningData.overlays.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {fetchedPlanningData.overlays.map((overlay: any, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-emerald-100 text-emerald-800">
                          {overlay.code || overlay}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">No overlays</span>
                  )}
                </div>
              </div>
            </div>

            {/* Third Row - Overlay Impact Assessment */}
            <div>
              <Label htmlFor="overlay-impact" className="text-emerald-700 font-medium">Overlay Impact Assessment</Label>
              <Textarea 
                id="overlay-impact" 
                rows={3}
                className="mt-1 bg-white border-emerald-200" 
                value={planningData.overlayImpactAssessment}
                onChange={(e) => handleInputChange('overlayImpactAssessment', e.target.value)}
              />
            </div>

            {/* Fourth Row - Impact Rating, Building Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="impact-rating" className="text-emerald-700 font-medium">Overlay Impact Rating</Label>
                <Select value={planningData.overlayImpactRating} onValueChange={(value) => handleInputChange('overlayImpactRating', value)}>
                  <SelectTrigger className="mt-1 bg-white border-emerald-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 - Low Impact">1 - Low Impact</SelectItem>
                    <SelectItem value="2 - Low-Medium Impact">2 - Low-Medium Impact</SelectItem>
                    <SelectItem value="3 - Medium Impact">3 - Medium Impact</SelectItem>
                    <SelectItem value="4 - Medium-High Impact">4 - Medium-High Impact</SelectItem>
                    <SelectItem value="5 - High Impact">5 - High Impact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="height-building" className="text-emerald-700 font-medium">Height of Building</Label>
                <Input 
                  id="height-building" 
                  className="mt-1 bg-white border-emerald-200" 
                  value={planningData.heightOfBuilding}
                  onChange={(e) => handleInputChange('heightOfBuilding', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="floor-space-ratio" className="text-emerald-700 font-medium">Floor Space Ratio</Label>
                <Input 
                  id="floor-space-ratio" 
                  className="mt-1 bg-white border-emerald-200" 
                  value={planningData.floorSpaceRatio}
                  onChange={(e) => handleInputChange('floorSpaceRatio', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="minimum-lot-size" className="text-emerald-700 font-medium">Minimum Lot Size</Label>
                <Input 
                  id="minimum-lot-size" 
                  className="mt-1 bg-white border-emerald-200" 
                  value={planningData.minimumLotSize}
                  onChange={(e) => handleInputChange('minimumLotSize', e.target.value)}
                />
              </div>
            </div>

            {/* Fifth Row - Planning Restrictions & Overlays */}
            <div>
              <Label htmlFor="planning-restrictions" className="text-emerald-700 font-medium">Planning Restrictions & Overlays</Label>
              <Textarea 
                id="planning-restrictions" 
                rows={3}
                className="mt-1 bg-white border-emerald-200" 
                value={planningData.planningRestrictions}
                onChange={(e) => handleInputChange('planningRestrictions', e.target.value)}
              />
            </div>

            {/* Sixth Row - Development Potential & Future Use */}
            <div>
              <Label htmlFor="development-potential" className="text-emerald-700 font-medium">Development Potential & Future Use</Label>
              <Textarea 
                id="development-potential" 
                rows={3}
                className="mt-1 bg-white border-emerald-200" 
                value={planningData.developmentPotential}
                onChange={(e) => handleInputChange('developmentPotential', e.target.value)}
              />
            </div>

            {/* Data Source Information */}
            <div className="pt-3 border-t border-emerald-200">
              <p className="text-xs text-emerald-600">
                Data from {fetchedPlanningData.dataSource || fetchedPlanningData.data_source || 'VicMap Planning API'} • Last updated: {fetchedPlanningData.lastUpdated || fetchedPlanningData.last_updated ? new Date(fetchedPlanningData.lastUpdated || fetchedPlanningData.last_updated).toLocaleDateString() : 'Unknown'}
                {fetchedPlanningData.coordinates && (
                  <span className="ml-4">
                    Coordinates: {fetchedPlanningData.coordinates.lat?.toFixed(6) || fetchedPlanningData.coordinates.latitude?.toFixed(6)}, {fetchedPlanningData.coordinates.lng?.toFixed(6) || fetchedPlanningData.coordinates.longitude?.toFixed(6)}
                  </span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Original Planning Information Form (fallback when no data) */}
      {!fetchedPlanningData && (
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

            {/* Rest of original form */}
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
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LegalAndPlanning;