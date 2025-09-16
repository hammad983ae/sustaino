/**
 * ============================================================================
 * Environmental Audit Component (Comprehensive Assessment)
 * Full environmental assessment including EPA, contamination, climate, and sustainability
 * ============================================================================
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, CheckCircle2, CloudRain, Flame, Leaf, Users, Building } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const EnvironmentalAudit = () => {
  const [includeSection, setIncludeSection] = useState(true);
  const [epaAuditRequired, setEpaAuditRequired] = useState("no");
  const [epaAuditStatus, setEpaAuditStatus] = useState("not-applicable");

  // Climate risk states
  const [climateRisk, setClimateRisk] = useState("");
  const [floodRisk, setFloodRisk] = useState("");
  const [bushfireRisk, setBushfireRisk] = useState("");

  // Carbon Projects states
  const [carbonSections, setCarbonSections] = useState({
    overview: true,
    classification: true,
    impact: true
  });

  const toggleCarbonSection = (section: keyof typeof carbonSections) => {
    setCarbonSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

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

          {/* Climate Risk Assessment */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CloudRain className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">Climate Risk Assessment</CardTitle>
                </div>
                <Switch 
                  checked={true}
                  onCheckedChange={() => {}}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Climate Risk Level</Label>
                  <Select value={climateRisk} onValueChange={setClimateRisk}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select climate risk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="moderate">Moderate Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                      <SelectItem value="extreme">Extreme Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Flood Risk Rating</Label>
                  <Select value={floodRisk} onValueChange={setFloodRisk}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select flood risk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal Risk</SelectItem>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="moderate">Moderate Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                      <SelectItem value="extreme">Extreme Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Bushfire Risk</Label>
                  <Select value={bushfireRisk} onValueChange={setBushfireRisk}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bushfire risk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal Risk</SelectItem>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="moderate">Moderate Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                      <SelectItem value="extreme">Extreme Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Risk Assessment Summary */}
              {(climateRisk || floodRisk || bushfireRisk) && (
                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-medium mb-3 text-foreground">Risk Assessment Summary</h4>
                  <div className="flex flex-wrap gap-2">
                    {climateRisk && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        Climate: {climateRisk}
                      </Badge>
                    )}
                    {floodRisk && (
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                        Flood: {floodRisk}
                      </Badge>
                    )}
                    {bushfireRisk && (
                      <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 border-orange-500/20">
                        Bushfire: {bushfireRisk}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
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

          {/* Carbon Farming Projects */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Leaf className="h-6 w-6 text-green-500" />
                  <CardTitle className="text-xl">Carbon Farming Projects</CardTitle>
                </div>
                <Switch 
                  checked={true}
                  onCheckedChange={() => {}}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Carbon Project Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-green-500" />
                      <CardTitle className="text-lg">Carbon Project Overview</CardTitle>
                    </div>
                    <Switch 
                      checked={carbonSections.overview}
                      onCheckedChange={() => toggleCarbonSection('overview')}
                    />
                  </div>
                </CardHeader>
                {carbonSections.overview && (
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Carbon Project Status</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No Carbon Projects</SelectItem>
                            <SelectItem value="planned">Planned</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="under-review">Under Review</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Project Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vegetation">Vegetation Management</SelectItem>
                            <SelectItem value="soil-carbon">Soil Carbon</SelectItem>
                            <SelectItem value="forestry">Forestry</SelectItem>
                            <SelectItem value="agricultural">Agricultural</SelectItem>
                            <SelectItem value="mixed">Mixed Methods</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Methodology Used</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select methodology" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cfm-14">CFM 14 - Sequestration by Revegetation</SelectItem>
                            <SelectItem value="cfm-15">CFM 15 - Avoided Deforestation</SelectItem>
                            <SelectItem value="cfm-16">CFM 16 - Soil Carbon</SelectItem>
                            <SelectItem value="cfm-18">CFM 18 - Vegetation Management</SelectItem>
                            <SelectItem value="other">Other Approved Methodology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Project Registration</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select registration status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="not-registered">Not Registered</SelectItem>
                            <SelectItem value="application-submitted">Application Submitted</SelectItem>
                            <SelectItem value="registered">Registered</SelectItem>
                            <SelectItem value="conditional">Conditional Registration</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Carbon Classification & Eligibility */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <CardTitle className="text-lg">Carbon Classification & Eligibility</CardTitle>
                    </div>
                    <Switch 
                      checked={carbonSections.classification}
                      onCheckedChange={() => toggleCarbonSection('classification')}
                    />
                  </div>
                </CardHeader>
                {carbonSections.classification && (
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Land Eligibility</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select eligibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="eligible">Eligible</SelectItem>
                            <SelectItem value="conditionally-eligible">Conditionally Eligible</SelectItem>
                            <SelectItem value="not-eligible">Not Eligible</SelectItem>
                            <SelectItem value="under-assessment">Under Assessment</SelectItem>
                            <SelectItem value="unknown">Unknown</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Native Title Considerations</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select native title status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no-issues">No Known Issues</SelectItem>
                            <SelectItem value="consent-obtained">Consent Obtained</SelectItem>
                            <SelectItem value="consultation-required">Consultation Required</SelectItem>
                            <SelectItem value="claim-exists">Native Title Claim Exists</SelectItem>
                            <SelectItem value="under-review">Under Review</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Historical Land Use</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select historical use" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cleared-agriculture">Cleared Agricultural Land</SelectItem>
                            <SelectItem value="grazing">Grazing Land</SelectItem>
                            <SelectItem value="forestry">Forestry</SelectItem>
                            <SelectItem value="native-vegetation">Native Vegetation</SelectItem>
                            <SelectItem value="degraded">Degraded Land</SelectItem>
                            <SelectItem value="mixed">Mixed Use</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Baseline Establishment</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select baseline status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="established">Baseline Established</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="required">Required</SelectItem>
                            <SelectItem value="pending-approval">Pending Approval</SelectItem>
                            <SelectItem value="not-started">Not Started</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Regulatory Compliance Notes</Label>
                      <Textarea 
                        placeholder="Enter any relevant compliance considerations, permits required, or regulatory issues..."
                        className="min-h-[80px]"
                      />
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Carbon Impact Assessment */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-purple-500" />
                      <CardTitle className="text-lg">Carbon Impact Assessment</CardTitle>
                    </div>
                    <Switch 
                      checked={carbonSections.impact}
                      onCheckedChange={() => toggleCarbonSection('impact')}
                    />
                  </div>
                </CardHeader>
                {carbonSections.impact && (
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Estimated Carbon Yield (tCO2-e/ha/year)</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select estimated yield" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-2">0-2 tCO2-e/ha/year</SelectItem>
                            <SelectItem value="2-5">2-5 tCO2-e/ha/year</SelectItem>
                            <SelectItem value="5-10">5-10 tCO2-e/ha/year</SelectItem>
                            <SelectItem value="10-15">10-15 tCO2-e/ha/year</SelectItem>
                            <SelectItem value="15-plus">15+ tCO2-e/ha/year</SelectItem>
                            <SelectItem value="tbd">To Be Determined</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Project Duration</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="25-years">25 Years (Standard)</SelectItem>
                            <SelectItem value="50-years">50 Years</SelectItem>
                            <SelectItem value="100-years">100 Years (Permanent)</SelectItem>
                            <SelectItem value="other">Other Duration</SelectItem>
                            <SelectItem value="tbd">To Be Determined</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Economic Viability</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select viability assessment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="highly-viable">Highly Viable</SelectItem>
                            <SelectItem value="viable">Viable</SelectItem>
                            <SelectItem value="marginal">Marginal</SelectItem>
                            <SelectItem value="not-viable">Not Viable</SelectItem>
                            <SelectItem value="under-assessment">Under Assessment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Risk Assessment</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select risk level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low-risk">Low Risk</SelectItem>
                            <SelectItem value="moderate-risk">Moderate Risk</SelectItem>
                            <SelectItem value="high-risk">High Risk</SelectItem>
                            <SelectItem value="very-high-risk">Very High Risk</SelectItem>
                            <SelectItem value="assessment-required">Assessment Required</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Impact on Property Value</Label>
                      <Textarea 
                        placeholder="Describe the potential impact of carbon projects on property valuation, including revenue streams, land use restrictions, and market considerations..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </CardContent>
                )}
              </Card>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnvironmentalAudit;