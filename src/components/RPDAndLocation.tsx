import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MapPin, Sparkles, Building, RefreshCw, Save, CheckCircle } from "lucide-react";
import { AutofillAddressFields } from "@/components/AutofillAddressFields";
import GoogleMapComponent from "@/components/GoogleMapComponent";
import { usePropertyLocationData } from "@/hooks/usePropertyLocationData";
import { useProperty } from "@/contexts/PropertyContext";
import { useReportData } from "@/contexts/ReportDataContext";
import { useSaveSystem } from "@/hooks/useSaveSystem";
import { useState, useEffect } from "react";

const RPDAndLocation = () => {
  const { addressData } = useProperty();
  const { analysisData, isGenerating, generateLocationAnalysis, updateAnalysisField } = usePropertyLocationData();
  const { saveData, loadData, isSaving, lastSaved } = useSaveSystem('RPD_and_Location');
  const { reportData, updateReportData, getIntegratedData } = useReportData();
  
  const [propertyIdentification, setPropertyIdentification] = useState({
    physicalInspection: true,
    surveyorPeg: false,
    plan: false,
    cadastralMap: true,
    certificateTitle: false,
    aerialMapping: true,
    includeInReport: true,
    other: '',
    otherChecked: false
  });

  // Load saved data on component mount and integrate from planning
  useEffect(() => {
    const integratedData = getIntegratedData();
    
    // Load from local save first
    const savedData = loadData();
    if (savedData?.propertyIdentification) {
      setPropertyIdentification(savedData.propertyIdentification);
    }
    if (savedData?.analysisData) {
      const fields = ['location','access','siteDescription','neighbourhood','amenities','services'] as const;
      fields.forEach((f) => {
        if (savedData.analysisData[f]) {
          updateAnalysisField(f, savedData.analysisData[f]);
        }
      });
    }
    
    // Override with integrated planning data if available
    if (integratedData.planningData) {
      if (integratedData.propertyIdentification) {
        setPropertyIdentification(prev => ({
          ...prev,
          ...integratedData.propertyIdentification
        }));
      }
    }
  }, [loadData, updateAnalysisField, getIntegratedData]);

  const handleSave = async () => {
    const dataToSave = {
      addressData,
      analysisData,
      propertyIdentification,
      timestamp: new Date().toISOString()
    };
    
    await saveData(dataToSave);
    
    // Also update global report data
    updateReportData('locationData', analysisData);
    updateReportData('propertyIdentification', propertyIdentification);
  };
  
  // Auto-save when data changes (debounced)
  useEffect(() => {
    const id = window.setTimeout(() => {
      const dataToSave = {
        addressData,
        analysisData,
        propertyIdentification,
        timestamp: new Date().toISOString()
      };
      
      saveData(dataToSave);
      updateReportData('locationData', analysisData);
      updateReportData('propertyIdentification', propertyIdentification);
    }, 800);
    return () => window.clearTimeout(id);
  }, [addressData, analysisData, propertyIdentification, saveData, updateReportData]);
  
  return (
    <div className="space-y-6">
      {/* Header with Save and Auto Generate */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">RPD and Location</h2>
          {lastSaved && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Saved {new Date(lastSaved).toLocaleTimeString()}
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={generateLocationAnalysis}
            disabled={isGenerating || !addressData?.propertyAddress}
            variant="outline"
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-none"
          >
            {isGenerating ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 mr-2" />
            )}
            {isGenerating ? 'Generating...' : 'Auto-Generate'}
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

      {/* 1. Street Address with Lot/Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg">Street Address / Lot Plan</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <AutofillAddressFields showUnit={true} showSuburb={true} showLotPlan={true} />
        </CardContent>
      </Card>

      {/* 2. Google Maps Integration */}
      <GoogleMapComponent height="400px" />

      {/* 3. Property Identification */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-500" />
            <CardTitle className="text-lg">Property Identification</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              Property Identified By
              <Switch 
                checked={propertyIdentification.includeInReport}
                onCheckedChange={(checked) => 
                  setPropertyIdentification(prev => ({...prev, includeInReport: checked}))
                }
              />
              <span className="text-sm text-muted-foreground">Include in report</span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="physical-inspection" 
                  checked={propertyIdentification.physicalInspection}
                  onCheckedChange={(checked) => 
                    setPropertyIdentification(prev => ({...prev, physicalInspection: !!checked}))
                  }
                />
                <Label htmlFor="physical-inspection" className="text-sm">Physical Inspection</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="surveyor-peg" 
                  checked={propertyIdentification.surveyorPeg}
                  onCheckedChange={(checked) => 
                    setPropertyIdentification(prev => ({...prev, surveyorPeg: !!checked}))
                  }
                />
                <Label htmlFor="surveyor-peg" className="text-sm">Surveyor Peg</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="plan" 
                  checked={propertyIdentification.plan}
                  onCheckedChange={(checked) => 
                    setPropertyIdentification(prev => ({...prev, plan: !!checked}))
                  }
                />
                <Label htmlFor="plan" className="text-sm">Plan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="cadastral-map" 
                  checked={propertyIdentification.cadastralMap}
                  onCheckedChange={(checked) => 
                    setPropertyIdentification(prev => ({...prev, cadastralMap: !!checked}))
                  }
                />
                <Label htmlFor="cadastral-map" className="text-sm">Cadastral Map</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="certificate-title" 
                  checked={propertyIdentification.certificateTitle}
                  onCheckedChange={(checked) => 
                    setPropertyIdentification(prev => ({...prev, certificateTitle: !!checked}))
                  }
                />
                <Label htmlFor="certificate-title" className="text-sm">Certificate of Title</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="aerial-mapping" 
                  checked={propertyIdentification.aerialMapping}
                  onCheckedChange={(checked) => 
                    setPropertyIdentification(prev => ({...prev, aerialMapping: !!checked}))
                  }
                />
                <Label htmlFor="aerial-mapping" className="text-sm">Aerial Mapping</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="other" 
                  checked={propertyIdentification.otherChecked}
                  onCheckedChange={(checked) => 
                    setPropertyIdentification(prev => ({...prev, otherChecked: !!checked}))
                  }
                />
                <Label htmlFor="other" className="text-sm">Other (Please specify)</Label>
              </div>
            </div>
            {propertyIdentification.otherChecked && (
              <div className="mt-3">
                <Textarea 
                  placeholder="Please specify other identification method..." 
                  className="h-20"
                  value={propertyIdentification.other}
                  onChange={(e) => setPropertyIdentification(prev => ({...prev, other: e.target.value}))}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 4. Property Location and Site Analysis */}
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