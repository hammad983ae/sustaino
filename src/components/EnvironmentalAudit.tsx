/**
 * ============================================================================
 * Environmental Audit Component (Basic EPA Compliance Only)
 * Note: All ESG and Climate functions have been moved to ESGClimateAssessment page
 * ============================================================================
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Shield, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const EnvironmentalAudit = () => {
  const [includeSection, setIncludeSection] = useState(true);
  const [epaAuditRequired, setEpaAuditRequired] = useState("no");
  const [epaAuditStatus, setEpaAuditStatus] = useState("not-applicable");

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">Environmental Audit</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="include-environmental-audit">Include</Label>
          <Switch 
            id="include-environmental-audit" 
            checked={includeSection}
            onCheckedChange={setIncludeSection}
          />
        </div>
      </div>

      {includeSection && (
        <div className="space-y-6">
          {/* EPA Audits & Regulatory Compliance */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <CardTitle>EPA Audits & Regulatory Compliance</CardTitle>
                </div>
                <Switch 
                  checked={true}
                  onCheckedChange={() => {}}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="epa-audit-required">EPA Audit Required</Label>
                  <Select value={epaAuditRequired} onValueChange={setEpaAuditRequired}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select EPA audit requirement" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      <SelectItem value="no">No - Not Required</SelectItem>
                      <SelectItem value="yes">Yes - Required</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                      <SelectItem value="pending">Pending Investigation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="epa-audit-status">EPA Audit Status</Label>
                  <Select value={epaAuditStatus} onValueChange={setEpaAuditStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audit status" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      <SelectItem value="not-applicable">Not Applicable</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="required">Required</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {epaAuditRequired === "no" && epaAuditStatus === "not-applicable" && (
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    Based on EPA searches and client disclosure, no environmental audit is required for this property. 
                    Standard environmental due diligence processes apply.
                  </AlertDescription>
                </Alert>
              )}

              {(epaAuditRequired === "yes" || epaAuditStatus !== "not-applicable") && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Environmental audit requirements detected. Professional environmental assessment recommended 
                    before completion of valuation and/or transaction.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Note about ESG and Climate Functions */}
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/30">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-800 dark:text-blue-200">
                  ESG & Climate Assessment Available
                </h4>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                For comprehensive ESG assessment, climate risk analysis, and carbon farming projects, visit our dedicated ESG & Climate Assessment platform.
              </p>
              <a 
                href="/esg-climate-assessment" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                <Shield className="h-4 w-4" />
                Access ESG & Climate Assessment
              </a>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnvironmentalAudit;