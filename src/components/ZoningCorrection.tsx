import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Save, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useReportData } from "@/contexts/ReportDataContext";

interface ZoningCorrectionProps {
  currentZoning: {
    zoning: string;
    zoneName: string;
    zoneDescription: string;
    currentUse: string;
    permissibleUse: string;
    lga: string;
  };
  onZoningUpdated: (updatedZoning: any) => void;
}

const ZoningCorrection = ({ currentZoning, onZoningUpdated }: ZoningCorrectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [correctedZoning, setCorrectedZoning] = useState(currentZoning);
  const { toast } = useToast();
  const { reportData, updateReportData } = useReportData();

  // Common Australian zoning types
  const commonZoningTypes = {
    commercial: {
      "Commercial 1 Zone (C1Z)": {
        zoneName: "Commercial 1 Zone",
        zoneDescription: "Encourages a mixture of commercial, office and other complementary uses which serve the needs of the wider community",
        currentUse: "Commercial premises",
        permissibleUse: "Office, Shop, Food and drink premises, Medical centre, Place of assembly"
      },
      "Commercial 2 Zone (C2Z)": {
        zoneName: "Commercial 2 Zone", 
        zoneDescription: "Encourages commercial uses which serve the needs of the surrounding neighbourhood",
        currentUse: "Commercial premises",
        permissibleUse: "Shop, Food and drink premises, Office, Medical centre"
      },
      "Business 1 Zone (B1Z)": {
        zoneName: "Business 1 Zone",
        zoneDescription: "Encourages the integrated development of offices and associated commercial and service facilities",
        currentUse: "Office premises",
        permissibleUse: "Office, Shop, Food and drink premises, Medical centre"
      }
    },
    industrial: {
      "Industrial 1 Zone (IN1Z)": {
        zoneName: "Industrial 1 Zone",
        zoneDescription: "Provides for manufacturing industry, the storage and distribution of goods and associated uses in a manner which does not affect the safety and amenity of local communities",
        currentUse: "Industrial premises",
        permissibleUse: "Industry, Warehouse, Transport terminal, Materials recycling"
      }
    },
    residential: {
      "Residential 1 Zone (R1Z)": {
        zoneName: "Residential 1 Zone",
        zoneDescription: "Provides for residential development at a range of densities with complementary uses",
        currentUse: "Residential dwelling",
        permissibleUse: "Dwelling, Home based business, Dependent person's unit"
      }
    }
  };

  const handleZoningSelect = (zoningCode: string) => {
    // Find the zoning details from common types
    let foundZoning = null;
    Object.values(commonZoningTypes).forEach(category => {
      if (category[zoningCode]) {
        foundZoning = {
          zoning: zoningCode,
          ...category[zoningCode]
        };
      }
    });

    if (foundZoning) {
      setCorrectedZoning(prev => ({
        ...prev,
        ...foundZoning
      }));
    } else {
      setCorrectedZoning(prev => ({
        ...prev,
        zoning: zoningCode
      }));
    }
  };

  const handleSaveCorrection = () => {
    // Update the planning data with corrected zoning
    const updatedPlanningData = {
      ...reportData?.planningData,
      ...correctedZoning,
      lastUpdated: new Date().toISOString(),
      dataSource: 'manually_corrected',
      correctionReason: 'User correction - external data was incorrect'
    };

    // Update both planning data and legal/planning sections
    updateReportData('planningData', updatedPlanningData);
    updateReportData('legalAndPlanning', {
      ...reportData?.legalAndPlanning,
      ...correctedZoning,
      lastUpdated: new Date().toISOString()
    });

    onZoningUpdated(correctedZoning);
    
    toast({
      title: "Zoning Data Corrected",
      description: `Successfully updated zoning to ${correctedZoning.zoning}`,
    });
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-orange-200 text-orange-700 hover:bg-orange-50"
        >
          <Edit className="w-4 h-4 mr-2" />
          Correct Zoning Data
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Correct Zoning Information
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current (Incorrect) Data */}
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">Current Data (Incorrect)</h4>
            <div className="text-sm text-red-700">
              <p><strong>Zoning:</strong> {currentZoning.zoning}</p>
              <p><strong>Description:</strong> {currentZoning.zoneDescription}</p>
            </div>
          </div>

          {/* Correction Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="zoning-select">Select Correct Zoning Type</Label>
              <Select value={correctedZoning.zoning} onValueChange={handleZoningSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select zoning type" />
                </SelectTrigger>
                <SelectContent>
                  <optgroup label="Commercial Zones">
                    <SelectItem value="Commercial 1 Zone (C1Z)">Commercial 1 Zone (C1Z)</SelectItem>
                    <SelectItem value="Commercial 2 Zone (C2Z)">Commercial 2 Zone (C2Z)</SelectItem>
                    <SelectItem value="Business 1 Zone (B1Z)">Business 1 Zone (B1Z)</SelectItem>
                  </optgroup>
                  <optgroup label="Industrial Zones">
                    <SelectItem value="Industrial 1 Zone (IN1Z)">Industrial 1 Zone (IN1Z)</SelectItem>
                    <SelectItem value="Industrial 2 Zone (IN2Z)">Industrial 2 Zone (IN2Z)</SelectItem>
                    <SelectItem value="Industrial 3 Zone (IN3Z)">Industrial 3 Zone (IN3Z)</SelectItem>
                  </optgroup>
                  <optgroup label="Residential Zones">
                    <SelectItem value="Residential 1 Zone (R1Z)">Residential 1 Zone (R1Z)</SelectItem>
                    <SelectItem value="Residential 2 Zone (R2Z)">Residential 2 Zone (R2Z)</SelectItem>
                    <SelectItem value="Residential 3 Zone (R3Z)">Residential 3 Zone (R3Z)</SelectItem>
                  </optgroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="zone-name">Zone Name</Label>
              <Input
                id="zone-name"
                value={correctedZoning.zoneName}
                onChange={(e) => setCorrectedZoning(prev => ({ ...prev, zoneName: e.target.value }))}
                placeholder="e.g., Commercial 1 Zone"
              />
            </div>

            <div>
              <Label htmlFor="zone-description">Zone Description</Label>
              <Textarea
                id="zone-description"
                value={correctedZoning.zoneDescription}
                onChange={(e) => setCorrectedZoning(prev => ({ ...prev, zoneDescription: e.target.value }))}
                placeholder="Describe the purpose and intent of this zoning"
                className="min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="current-use">Current Use</Label>
              <Input
                id="current-use"
                value={correctedZoning.currentUse}
                onChange={(e) => setCorrectedZoning(prev => ({ ...prev, currentUse: e.target.value }))}
                placeholder="e.g., Commercial premises"
              />
            </div>

            <div>
              <Label htmlFor="permissible-use">Permissible Use</Label>
              <Textarea
                id="permissible-use"
                value={correctedZoning.permissibleUse}
                onChange={(e) => setCorrectedZoning(prev => ({ ...prev, permissibleUse: e.target.value }))}
                placeholder="e.g., Office, Shop, Food and drink premises, Medical centre"
                className="min-h-[60px]"
              />
            </div>

            <div>
              <Label htmlFor="lga">Local Government Area</Label>
              <Input
                id="lga"
                value={correctedZoning.lga}
                onChange={(e) => setCorrectedZoning(prev => ({ ...prev, lga: e.target.value }))}
                placeholder="e.g., Mildura City Council"
              />
            </div>
          </div>

          {/* Preview Corrected Data */}
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Corrected Data Preview</h4>
            <div className="text-sm text-green-700">
              <p><strong>Zoning:</strong> {correctedZoning.zoning}</p>
              <p><strong>Description:</strong> {correctedZoning.zoneDescription}</p>
              <p><strong>Current Use:</strong> {correctedZoning.currentUse}</p>
              <p><strong>Permissible Use:</strong> {correctedZoning.permissibleUse}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCorrection} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save Correction
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ZoningCorrection;