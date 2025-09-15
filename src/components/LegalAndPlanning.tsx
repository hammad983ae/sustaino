import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, FileText, CheckCircle, Sparkles, RefreshCw, Save } from "lucide-react";
import { useReportData } from "@/contexts/ReportDataContext";
import { useProperty } from "@/contexts/PropertyContext";
import { useUniversalSave } from "@/hooks/useUniversalSave";
import { useToast } from "@/hooks/use-toast";

const LegalAndPlanning = () => {
  const { saveData, loadData, isSaving, lastSaved } = useUniversalSave('LegalAndPlanning', { showToast: false });
  const { toast } = useToast();
  const { reportData, updateReportData, getIntegratedData } = useReportData();
  const { addressData } = useProperty();
  const [includeInReport, setIncludeInReport] = useState(true);
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  
  const [planningData, setPlanningData] = useState({
    lga: "",
    zoning: "",
    zoneName: "",
    zoneDescription: "",
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
    developmentPotential: "",
    planningScheme: "",
    mapReference: "",
    lastUpdated: ""
  });

  // Load data from multiple sources and integrate
  useEffect(() => {
    const integratedData = getIntegratedData();
    console.log('Legal and Planning - Loading integrated data:', integratedData);
    
    // Load from planning data first (from assessment workflow)
    if (integratedData.planningData) {
      console.log('Loading from planning data:', integratedData.planningData);
      const planning = integratedData.planningData;
      setPlanningData(prev => ({
        ...prev,
        lga: planning.lga || "",
        zoning: planning.zoneName || planning.zoning || "",
        zoneName: planning.zoneName || "",
        zoneDescription: planning.zoneDescription || "",
        currentUse: planning.currentUse || "",
        permissibleUse: planning.permittedUse || planning.landUse || "",
        overlays: Array.isArray(planning.overlays) ? planning.overlays.join(", ") : (planning.overlays || ""),
        heightOfBuilding: planning.heightRestrictions || planning.heightRestriction || "",
        developmentPotential: planning.developmentPotential || "",
        planningRestrictions: planning.overlays && Array.isArray(planning.overlays) && planning.overlays.length > 0 
          ? `Planning overlays apply: ${planning.overlays.join(", ")}` 
          : "",
        planningScheme: planning.planningScheme || "",
        mapReference: planning.mapReference || "",
        lastUpdated: planning.lastUpdated || new Date().toISOString()
      }));
    }
    
    // Also check for saved data
    loadData().then(savedData => {
      if (savedData?.planningData) {
        setPlanningData(prev => ({
          ...prev,
          ...savedData.planningData
        }));
      }
    });
    
    // Check for existing legal and planning data
    if (integratedData.legalAndPlanning) {
      setPlanningData(prev => ({
        ...prev,
        ...integratedData.legalAndPlanning
      }));
    }
  }, [getIntegratedData, loadData]);

  const handleAutoGenerate = async () => {
    setIsAutoGenerating(true);
    try {
      // Generate intelligent defaults based on address and existing data
      const suburb = addressData?.suburb || 'Local Area';
      const state = addressData?.state || 'State';
      
      const generatedData = {
        lga: `${suburb} ${state === 'VIC' ? 'City Council' : 'Council'}`,
        zoning: planningData.zoning || "Residential 1 Zone (R1Z)",
        zoneName: planningData.zoneName || "Residential 1 Zone",
        zoneDescription: planningData.zoneDescription || "Provides for residential development at a range of densities with complementary uses",
        currentUse: planningData.currentUse || "Residential dwelling",
        permissibleUse: planningData.permissibleUse || "Dwelling, Home based business, Dependent person's unit",
        overlayImpactAssessment: planningData.overlayImpactAssessment || `Assessment of planning overlays affecting the subject property indicates ${planningData.overlays ? 'specific considerations apply' : 'standard residential development provisions apply'}. The property is subject to the relevant planning scheme provisions and any applicable overlays should be considered in future development proposals.`,
        overlayImpactRating: planningData.overlayImpactRating || "low",
        floorSpaceRatio: planningData.floorSpaceRatio || "Not specified",
        minimumLotSize: planningData.minimumLotSize || "300m²",
        planningRestrictions: planningData.planningRestrictions || "Standard planning scheme provisions apply. Any future development should comply with relevant zoning provisions and overlay requirements.",
        developmentPotential: planningData.developmentPotential || "Standard residential development potential subject to planning scheme provisions and overlay requirements. Future development would require appropriate planning permits where applicable.",
        lastUpdated: new Date().toISOString()
      };
      
      setPlanningData(prev => ({
        ...prev,
        ...generatedData
      }));
      
      toast({
        title: "Planning data generated",
        description: "Auto-generated planning information based on property details.",
      });
    } catch (error) {
      console.error('Error auto-generating planning data:', error);
      toast({
        title: "Generation failed",
        description: "Could not auto-generate planning data. Please fill manually.",
        variant: "destructive"
      });
    } finally {
      setIsAutoGenerating(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setPlanningData(prev => ({
      ...prev,
      [field]: value,
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleSave = async () => {
    const dataToSave = {
      planningData,
      includeInReport,
      timestamp: new Date().toISOString()
    };
    
    await saveData(dataToSave);
    
    // Update global report data
    updateReportData('legalAndPlanning', planningData);
    
    toast({
      title: "Legal and Planning saved",
      description: "Your planning information has been saved successfully.",
    });
  };

  // Auto-save when data changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (planningData.lastUpdated) {
        updateReportData('legalAndPlanning', planningData);
      }
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [planningData, updateReportData]);

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Legal Description & Planning Information</h2>
          {lastSaved && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Saved {new Date(lastSaved).toLocaleTimeString()}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2">
            <Label htmlFor="include-legal-planning" className="text-sm">Include</Label>
            <Switch 
              id="include-legal-planning" 
              checked={includeInReport}
              onCheckedChange={setIncludeInReport}
            />
          </div>
          <Button 
            onClick={handleAutoGenerate}
            disabled={isAutoGenerating}
            variant="outline"
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-none"
          >
            {isAutoGenerating ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 mr-2" />
            )}
            {isAutoGenerating ? 'Generating...' : 'Auto-Generate'}
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isSaving ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      {/* Data Source Information */}
      {planningData.lastUpdated && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700">
                Planning data integrated from Property Assessment workflow
              </span>
              <Badge variant="secondary" className="ml-auto">
                Last updated: {new Date(planningData.lastUpdated).toLocaleDateString()}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Core Planning Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Core Planning Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* LGA and Zoning Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lga-legal">Local Government Area (LGA)</Label>
              <Input 
                id="lga-legal" 
                placeholder="Enter LGA" 
                className="mt-1" 
                value={planningData.lga}
                onChange={(e) => handleInputChange('lga', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="zoning-legal">Zoning</Label>
              <Input 
                id="zoning-legal" 
                placeholder="e.g., Residential 1 Zone (R1Z)" 
                className="mt-1" 
                value={planningData.zoning}
                onChange={(e) => handleInputChange('zoning', e.target.value)}
              />
            </div>
          </div>

          {/* Zone Description */}
          {planningData.zoneDescription && (
            <div>
              <Label>Zone Description</Label>
              <div className="mt-1 p-3 bg-blue-50 rounded-md border">
                <p className="text-sm text-blue-700">{planningData.zoneDescription}</p>
              </div>
            </div>
          )}

          {/* Current and Permissible Use */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="current-use-legal">Current Use</Label>
              <Input 
                id="current-use-legal" 
                placeholder="e.g., Residential dwelling" 
                className="mt-1" 
                value={planningData.currentUse}
                onChange={(e) => handleInputChange('currentUse', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="permissible-use">Permissible Use</Label>
              <Input 
                id="permissible-use" 
                placeholder="e.g., Dwelling, Home based business" 
                className="mt-1" 
                value={planningData.permissibleUse}
                onChange={(e) => handleInputChange('permissibleUse', e.target.value)}
              />
            </div>
          </div>

          {/* Permit Number and Overlays */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="permit-number">Permit Number</Label>
              <Input 
                id="permit-number" 
                placeholder="Enter permit number if applicable" 
                className="mt-1" 
                value={planningData.permitNumber}
                onChange={(e) => handleInputChange('permitNumber', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="overlays">Planning Overlays</Label>
              <Input 
                id="overlays" 
                placeholder="e.g., Heritage Overlay, Development Contributions Plan Overlay" 
                className="mt-1" 
                value={planningData.overlays}
                onChange={(e) => handleInputChange('overlays', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Development Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Development Controls & Restrictions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Building Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="height-building">Height of Building</Label>
              <Input 
                id="height-building" 
                placeholder="e.g., 15m maximum" 
                className="mt-1" 
                value={planningData.heightOfBuilding}
                onChange={(e) => handleInputChange('heightOfBuilding', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="floor-space-ratio">Floor Space Ratio</Label>
              <Input 
                id="floor-space-ratio" 
                placeholder="e.g., 0.6:1" 
                className="mt-1" 
                value={planningData.floorSpaceRatio}
                onChange={(e) => handleInputChange('floorSpaceRatio', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="minimum-lot-size">Minimum Lot Size</Label>
              <Input 
                id="minimum-lot-size" 
                placeholder="e.g., 300m²" 
                className="mt-1" 
                value={planningData.minimumLotSize}
                onChange={(e) => handleInputChange('minimumLotSize', e.target.value)}
              />
            </div>
          </div>

          {/* Overlay Impact Assessment */}
          <div>
            <Label htmlFor="overlay-impact-assessment">Overlay Impact Assessment</Label>
            <Textarea 
              id="overlay-impact-assessment"
              placeholder="Describe the impact of planning overlays on the property..."
              className="mt-1 h-32"
              value={planningData.overlayImpactAssessment}
              onChange={(e) => handleInputChange('overlayImpactAssessment', e.target.value)}
            />
          </div>

          {/* Overlay Impact Rating */}
          <div className="max-w-md">
            <Label htmlFor="overlay-impact-rating">Overlay Impact Rating</Label>
            <Select value={planningData.overlayImpactRating} onValueChange={(value) => handleInputChange('overlayImpactRating', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select impact rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Impact</SelectItem>
                <SelectItem value="medium">Medium Impact</SelectItem>
                <SelectItem value="high">High Impact</SelectItem>
                <SelectItem value="very-high">Very High Impact</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Planning Restrictions */}
          <div>
            <Label htmlFor="planning-restrictions">Planning Restrictions & Overlays</Label>
            <Textarea 
              id="planning-restrictions"
              placeholder="Detail any planning restrictions, overlay requirements, or development constraints..."
              className="mt-1 h-32"
              value={planningData.planningRestrictions}
              onChange={(e) => handleInputChange('planningRestrictions', e.target.value)}
            />
          </div>

          {/* Development Potential */}
          <div>
            <Label htmlFor="development-potential">Development Potential & Future Use</Label>
            <Textarea 
              id="development-potential"
              placeholder="Assess the development potential and future use possibilities for the property..."
              className="mt-1 h-32"
              value={planningData.developmentPotential}
              onChange={(e) => handleInputChange('developmentPotential', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Planning Reference Information */}
      {(planningData.planningScheme || planningData.mapReference) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Planning Reference Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {planningData.planningScheme && (
              <div>
                <Label>Planning Scheme</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md border">
                  <p className="text-sm">{planningData.planningScheme}</p>
                </div>
              </div>
            )}
            {planningData.mapReference && (
              <div>
                <Label>Map Reference</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md border">
                  <p className="text-sm">{planningData.mapReference}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LegalAndPlanning;