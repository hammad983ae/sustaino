import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { FileText } from "lucide-react";

interface ValuationBasisStatementProps {
  onUpdate?: (data: any) => void;
  initialData?: any;
}

const ValuationBasisStatement = ({ onUpdate, initialData }: ValuationBasisStatementProps) => {
  const [completionBasis, setCompletionBasis] = useState(initialData?.completionBasis || "as complete");
  const [tenureBasis, setTenureBasis] = useState(initialData?.tenureBasis || "freehold");
  const [operationalBasis, setOperationalBasis] = useState(initialData?.operationalBasis || "going concern");
  const [customDescription, setCustomDescription] = useState(initialData?.customDescription || "");

  // Auto-generate the complete statement
  const generateStatement = () => {
    const completionText = completionBasis === "as if complete" ? "as if complete" : "as complete";
    const tenureText = tenureBasis;
    const operationalText = operationalBasis;
    
    return `The valuation has been completed on an (${completionText}) (${tenureText}) (${operationalText}) basis assuming a reasonable marketing period.`;
  };

  // Update parent component when values change
  useEffect(() => {
    const data = {
      completionBasis,
      tenureBasis,
      operationalBasis,
      customDescription,
      generatedStatement: generateStatement()
    };
    onUpdate?.(data);
  }, [completionBasis, tenureBasis, operationalBasis, customDescription, onUpdate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Valuation Basis Statement
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dropdown Selections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="completion-basis">Completion Basis</Label>
            <Select value={completionBasis} onValueChange={setCompletionBasis}>
              <SelectTrigger>
                <SelectValue placeholder="Select completion basis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="as complete">As Complete</SelectItem>
                <SelectItem value="as if complete">As If Complete</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenure-basis">Tenure</Label>
            <Select value={tenureBasis} onValueChange={setTenureBasis}>
              <SelectTrigger>
                <SelectValue placeholder="Select tenure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freehold">Freehold</SelectItem>
                <SelectItem value="leasehold">Leasehold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="operational-basis">Operational Status</Label>
            <Select value={operationalBasis} onValueChange={setOperationalBasis}>
              <SelectTrigger>
                <SelectValue placeholder="Select operational basis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="going concern">Going Concern</SelectItem>
                <SelectItem value="vacant possession">Vacant Possession</SelectItem>
                <SelectItem value="partially occupied">Partially Occupied</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Generated Statement Display */}
        <div className="space-y-2">
          <Label>Generated Valuation Basis Statement</Label>
          <div className="p-4 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/30">
            <p className="text-sm font-medium text-foreground">
              {generateStatement()}
            </p>
          </div>
        </div>

        {/* Custom Basis Description */}
        <div className="space-y-2">
          <Label htmlFor="custom-basis-description">Custom Basis Description (if applicable)</Label>
          <Textarea
            id="custom-basis-description"
            placeholder="Enter any additional custom basis requirements or modifications to the standard statement..."
            value={customDescription}
            onChange={(e) => setCustomDescription(e.target.value)}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            Use this field to override or supplement the auto-generated statement with specific custom requirements.
          </p>
        </div>

        {/* Final Statement Preview */}
        {customDescription && (
          <div className="space-y-2">
            <Label>Final Statement (with custom description)</Label>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-medium text-foreground mb-2">
                {generateStatement()}
              </p>
              <p className="text-sm text-muted-foreground italic">
                {customDescription}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ValuationBasisStatement;