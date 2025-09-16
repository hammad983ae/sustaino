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

          {/* Contamination Assessment */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <CardTitle>Contamination Assessment</CardTitle>
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
                  <Label>Contamination Risk Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="moderate">Moderate Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                      <SelectItem value="confirmed">Confirmed Contamination</SelectItem>
                      <SelectItem value="unknown">Unknown/Under Investigation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Site Investigation Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-required">Not Required</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="required">Required</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="recommended">Recommended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Previous Land Use</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select previous use" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="agricultural">Agricultural</SelectItem>
                      <SelectItem value="fuel-station">Fuel Station</SelectItem>
                      <SelectItem value="dry-cleaner">Dry Cleaner</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Remediation Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-applicable">Not Applicable</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="required">Required</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="ongoing">Ongoing Monitoring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hazardous Materials Assessment */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <CardTitle>Hazardous Materials Assessment</CardTitle>
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
                  <Label>Asbestos Assessment</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select asbestos status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-present">Not Present</SelectItem>
                      <SelectItem value="present-managed">Present - Managed</SelectItem>
                      <SelectItem value="present-unmanaged">Present - Unmanaged</SelectItem>
                      <SelectItem value="requires-survey">Requires Survey</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Lead Paint Assessment</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lead paint status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-present">Not Present</SelectItem>
                      <SelectItem value="present-stable">Present - Stable</SelectItem>
                      <SelectItem value="present-deteriorating">Present - Deteriorating</SelectItem>
                      <SelectItem value="requires-testing">Requires Testing</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Underground Storage Tanks</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select UST status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None Present</SelectItem>
                      <SelectItem value="active">Active - Compliant</SelectItem>
                      <SelectItem value="inactive">Inactive/Abandoned</SelectItem>
                      <SelectItem value="removed">Removed</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Other Hazardous Materials</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none-identified">None Identified</SelectItem>
                      <SelectItem value="present-minor">Present - Minor</SelectItem>
                      <SelectItem value="present-significant">Present - Significant</SelectItem>
                      <SelectItem value="requires-assessment">Requires Assessment</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Site History */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <CardTitle>Environmental Site History</CardTitle>
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
                  <Label>Historical Aerial Review</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="required">Required</SelectItem>
                      <SelectItem value="not-available">Not Available</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Government Database Search</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="required">Required</SelectItem>
                      <SelectItem value="limited-data">Limited Data Available</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Chain of Title Review</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="required">Required</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="not-available">Not Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Environmental Reports Available</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Reports Available</SelectItem>
                      <SelectItem value="outdated">Outdated Reports Only</SelectItem>
                      <SelectItem value="none">No Reports Available</SelectItem>
                      <SelectItem value="pending">Pending Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Compliance & Permits */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <CardTitle>Environmental Compliance & Permits</CardTitle>
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
                  <Label>Environmental Permits Current</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">All Current</SelectItem>
                      <SelectItem value="some-expired">Some Expired</SelectItem>
                      <SelectItem value="requires-renewal">Requires Renewal</SelectItem>
                      <SelectItem value="not-applicable">Not Applicable</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Waste Management Compliance</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select compliance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compliant">Fully Compliant</SelectItem>
                      <SelectItem value="minor-issues">Minor Issues</SelectItem>
                      <SelectItem value="significant-issues">Significant Issues</SelectItem>
                      <SelectItem value="not-applicable">Not Applicable</SelectItem>
                      <SelectItem value="requires-review">Requires Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Water Quality Compliance</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select compliance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compliant">Compliant</SelectItem>
                      <SelectItem value="minor-exceedances">Minor Exceedances</SelectItem>
                      <SelectItem value="significant-issues">Significant Issues</SelectItem>
                      <SelectItem value="not-applicable">Not Applicable</SelectItem>
                      <SelectItem value="testing-required">Testing Required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Air Quality Compliance</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select compliance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compliant">Compliant</SelectItem>
                      <SelectItem value="minor-issues">Minor Issues</SelectItem>
                      <SelectItem value="significant-issues">Significant Issues</SelectItem>
                      <SelectItem value="not-applicable">Not Applicable</SelectItem>
                      <SelectItem value="monitoring-required">Monitoring Required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnvironmentalAudit;