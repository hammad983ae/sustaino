import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Shield, FileText, Users, Scale } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

interface ProfessionalDeclarationsProps {
  onComplete: (data: any) => void;
}

const ProfessionalDeclarations: React.FC<ProfessionalDeclarationsProps> = ({ onComplete }) => {
  const [conflictOfInterest, setConflictOfInterest] = useState(false);
  const [conflictDetails, setConflictDetails] = useState('');
  const [inScopeItems, setInScopeItems] = useState<string[]>([]);
  const [outOfScopeItems, setOutOfScopeItems] = useState<string[]>([]);
  const [customInScope, setCustomInScope] = useState('');
  const [customOutOfScope, setCustomOutOfScope] = useState('');
  const [professionalIndemnity, setProfessionalIndemnity] = useState(false);
  const [cpvCompliance, setCpvCompliance] = useState(false);
  const [declarations, setDeclarations] = useState({
    independentValuer: false,
    noMaterialInterest: false,
    competentValuer: false,
    compliantWithStandards: false,
    appropriateInstructions: false,
  });

  const predefinedInScopeItems = [
    'Property inspection and analysis',
    'Market research and comparable sales',
    'Valuation methodology application',
    'Risk assessment and analysis',
    'ESG compliance assessment',
    'Planning and zoning analysis',
    'Statutory requirements review',
    'Market commentary preparation',
    'Executive summary preparation',
  ];

  const predefinedOutOfScopeItems = [
    'Legal advice or interpretation',
    'Tax advice or implications',
    'Building or structural engineering advice',
    'Environmental contamination assessment',
    'Asbestos or hazardous materials assessment',
    'Strata or body corporate advice',
    'Insurance advice',
    'Investment or financial planning advice',
    'Property management advice',
    'Development feasibility analysis',
  ];

  const handleInScopeChange = (item: string, checked: boolean) => {
    if (checked) {
      setInScopeItems([...inScopeItems, item]);
    } else {
      setInScopeItems(inScopeItems.filter(i => i !== item));
    }
  };

  const handleOutOfScopeChange = (item: string, checked: boolean) => {
    if (checked) {
      setOutOfScopeItems([...outOfScopeItems, item]);
    } else {
      setOutOfScopeItems(outOfScopeItems.filter(i => i !== item));
    }
  };

  const handleDeclarationChange = (key: string, checked: boolean) => {
    setDeclarations(prev => ({ ...prev, [key]: checked }));
  };

  const isFormValid = () => {
    return Object.values(declarations).every(Boolean) && 
           professionalIndemnity && 
           cpvCompliance && 
           (inScopeItems.length > 0 || customInScope.trim()) &&
           (outOfScopeItems.length > 0 || customOutOfScope.trim());
  };

  const handleSubmit = () => {
    const data = {
      conflictOfInterest,
      conflictDetails,
      inScopeItems: [...inScopeItems, ...(customInScope ? [customInScope] : [])],
      outOfScopeItems: [...outOfScopeItems, ...(customOutOfScope ? [customOutOfScope] : [])],
      professionalIndemnity,
      cpvCompliance,
      declarations,
      completedAt: new Date().toISOString(),
    };
    onComplete(data);
  };

  return (
    <div className="space-y-6">
      <Alert className="border-amber-200 bg-amber-50/50">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>For Valuers and Other Professionals Only:</strong> The following declarations are required to complete your professional valuation report.
        </AlertDescription>
      </Alert>

      {/* Conflict of Interest Declaration */}
      <Card className="bg-white/90 backdrop-blur-sm border border-purple-200/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-lg text-purple-800">
            <div className="p-2 bg-red-100 rounded-lg text-red-700">
              <Shield className="h-5 w-5" />
            </div>
            Conflict of Interest Declaration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50/50 rounded-lg border border-red-200/50">
            <div>
              <Label className="text-sm font-medium text-red-800">
                Do you have any conflict of interest in relation to this valuation?
              </Label>
              <p className="text-xs text-red-600 mt-1">
                This includes any financial, personal, or professional interest in the subject property
              </p>
            </div>
            <Switch 
              checked={conflictOfInterest} 
              onCheckedChange={setConflictOfInterest}
              className="data-[state=checked]:bg-red-500"
            />
          </div>

          {conflictOfInterest && (
            <div>
              <Label htmlFor="conflict-details" className="text-sm font-medium text-red-800">
                Please provide details of the conflict of interest:
              </Label>
              <Textarea 
                id="conflict-details"
                value={conflictDetails}
                onChange={(e) => setConflictDetails(e.target.value)}
                placeholder="Describe the nature of the conflict of interest and how it will be managed..."
                className="mt-1 bg-white border-red-300"
                rows={4}
                required
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* In Scope Declaration */}
      <Card className="bg-white/90 backdrop-blur-sm border border-purple-200/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-lg text-purple-800">
            <div className="p-2 bg-green-100 rounded-lg text-green-700">
              <FileText className="h-5 w-5" />
            </div>
            In Scope Declaration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Select all services that are included within the scope of this valuation:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {predefinedInScopeItems.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox
                  id={`in-scope-${item}`}
                  checked={inScopeItems.includes(item)}
                  onCheckedChange={(checked) => handleInScopeChange(item, checked as boolean)}
                />
                <Label htmlFor={`in-scope-${item}`} className="text-sm">
                  {item}
                </Label>
              </div>
            ))}
          </div>

          <div>
            <Label htmlFor="custom-in-scope" className="text-sm font-medium">
              Additional In-Scope Items:
            </Label>
            <Textarea 
              id="custom-in-scope"
              value={customInScope}
              onChange={(e) => setCustomInScope(e.target.value)}
              placeholder="List any additional services included in this valuation..."
              className="mt-1 bg-white"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Out of Scope Declaration */}
      <Card className="bg-white/90 backdrop-blur-sm border border-purple-200/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-lg text-purple-800">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-700">
              <AlertTriangle className="h-5 w-5" />
            </div>
            Out of Scope Declaration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Select all services that are explicitly excluded from the scope of this valuation:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {predefinedOutOfScopeItems.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox
                  id={`out-scope-${item}`}
                  checked={outOfScopeItems.includes(item)}
                  onCheckedChange={(checked) => handleOutOfScopeChange(item, checked as boolean)}
                />
                <Label htmlFor={`out-scope-${item}`} className="text-sm">
                  {item}
                </Label>
              </div>
            ))}
          </div>

          <div>
            <Label htmlFor="custom-out-scope" className="text-sm font-medium">
              Additional Out-of-Scope Items:
            </Label>
            <Textarea 
              id="custom-out-scope"
              value={customOutOfScope}
              onChange={(e) => setCustomOutOfScope(e.target.value)}
              placeholder="List any additional services explicitly excluded from this valuation..."
              className="mt-1 bg-white"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Professional Compliance */}
      <Card className="bg-white/90 backdrop-blur-sm border border-purple-200/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-lg text-purple-800">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
              <Scale className="h-5 w-5" />
            </div>
            Professional Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="professional-indemnity"
                checked={professionalIndemnity}
                onCheckedChange={(checked) => setProfessionalIndemnity(checked as boolean)}
                required
              />
              <Label htmlFor="professional-indemnity" className="text-sm">
                I confirm that I hold current Professional Indemnity Insurance
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="cpv-compliance"
                checked={cpvCompliance}
                onCheckedChange={(checked) => setCpvCompliance(checked as boolean)}
                required
              />
              <Label htmlFor="cpv-compliance" className="text-sm">
                I confirm compliance with Certified Practising Valuer (CPV) requirements
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Declarations */}
      <Card className="bg-white/90 backdrop-blur-sm border border-purple-200/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-lg text-purple-800">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
              <Users className="h-5 w-5" />
            </div>
            Professional Declarations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="independent-valuer"
                checked={declarations.independentValuer}
                onCheckedChange={(checked) => handleDeclarationChange('independentValuer', checked as boolean)}
                required
              />
              <Label htmlFor="independent-valuer" className="text-sm">
                I declare that I am acting as an independent valuer
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="no-material-interest"
                checked={declarations.noMaterialInterest}
                onCheckedChange={(checked) => handleDeclarationChange('noMaterialInterest', checked as boolean)}
                required
              />
              <Label htmlFor="no-material-interest" className="text-sm">
                I have no material interest in the subject property
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="competent-valuer"
                checked={declarations.competentValuer}
                onCheckedChange={(checked) => handleDeclarationChange('competentValuer', checked as boolean)}
                required
              />
              <Label htmlFor="competent-valuer" className="text-sm">
                I am a competent valuer with relevant experience for this property type
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="compliant-standards"
                checked={declarations.compliantWithStandards}
                onCheckedChange={(checked) => handleDeclarationChange('compliantWithStandards', checked as boolean)}
                required
              />
              <Label htmlFor="compliant-standards" className="text-sm">
                This valuation complies with relevant professional standards (RICS, AASB, etc.)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="appropriate-instructions"
                checked={declarations.appropriateInstructions}
                onCheckedChange={(checked) => handleDeclarationChange('appropriateInstructions', checked as boolean)}
                required
              />
              <Label htmlFor="appropriate-instructions" className="text-sm">
                I have received appropriate instructions and sufficient information to complete this valuation
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
        >
          Complete Professional Declarations
        </Button>
      </div>
    </div>
  );
};

export default ProfessionalDeclarations;