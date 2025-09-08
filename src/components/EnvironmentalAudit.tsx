import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const EnvironmentalAudit = () => {
  const [includeSection, setIncludeSection] = useState(true);
  const [auditSections, setAuditSections] = useState({
    epaAudits: false,
    contamination: false,
    hazardousMaterials: false,
    sustainability: false,
    climateRisk: false,
    compliance: false,
    remediation: false,
    monitoring: false
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Environmental Audit Checklist</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="include-environmental-audit">Include</Label>
            <Switch
              id="include-environmental-audit"
              checked={includeSection}
              onCheckedChange={setIncludeSection}
            />
          </div>
          <Button variant="outline" size="sm">
            <Lock className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {includeSection && (
        <div className="space-y-6">
          {/* EPA Audits */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                EPA Audits & Regulatory Compliance
                <Switch
                  checked={auditSections.epaAudits}
                  onCheckedChange={(checked) => 
                    setAuditSections(prev => ({ ...prev, epaAudits: checked }))
                  }
                />
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Environmental Protection Authority audits and regulatory requirements for Australian real estate.
              </p>
            </CardHeader>
            {auditSections.epaAudits && (
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="epa-audit-required">EPA Audit Required</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select requirement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes - Required</SelectItem>
                        <SelectItem value="no">No - Not Required</SelectItem>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="pending">Pending Assessment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="epa-audit-status">EPA Audit Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="required">Required</SelectItem>
                        <SelectItem value="not-applicable">Not Applicable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="epa-auditor">EPA Appointed Auditor</Label>
                    <Input id="epa-auditor" placeholder="Auditor name and credentials" />
                  </div>
                  <div>
                    <Label htmlFor="audit-completion-date">Audit Completion Date</Label>
                    <Input id="audit-completion-date" type="date" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="epa-findings">EPA Audit Findings</Label>
                  <Textarea
                    id="epa-findings"
                    placeholder="Summary of EPA audit findings and recommendations..."
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <Label htmlFor="regulatory-notices">Regulatory Notices</Label>
                  <Textarea
                    id="regulatory-notices"
                    placeholder="Any EPA notices, orders, or compliance requirements..."
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Site Contamination Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Site Contamination Assessment
                <Switch
                  checked={auditSections.contamination}
                  onCheckedChange={(checked) => 
                    setAuditSections(prev => ({ ...prev, contamination: checked }))
                  }
                />
              </CardTitle>
            </CardHeader>
            {auditSections.contamination && (
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contamination-risk">Contamination Risk Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="site-history">Historical Land Use</Label>
                    <Input id="site-history" placeholder="e.g., Industrial, Petrol Station, Agricultural" />
                  </div>
                  <div>
                    <Label htmlFor="contamination-type">Known Contamination Types</Label>
                    <Input id="contamination-type" placeholder="e.g., Hydrocarbons, Heavy Metals, Asbestos" />
                  </div>
                  <div>
                    <Label htmlFor="investigation-status">Site Investigation Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="complete">Complete</SelectItem>
                        <SelectItem value="preliminary">Preliminary Only</SelectItem>
                        <SelectItem value="required">Required</SelectItem>
                        <SelectItem value="not-required">Not Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="contamination-details">Contamination Assessment Details</Label>
                  <Textarea
                    id="contamination-details"
                    placeholder="Detailed contamination assessment results, soil and groundwater analysis..."
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <Label htmlFor="management-plan">Contamination Management Plan</Label>
                  <Textarea
                    id="management-plan"
                    placeholder="Management strategies, ongoing monitoring requirements..."
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Hazardous Materials */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Hazardous Materials Assessment
                <Switch
                  checked={auditSections.hazardousMaterials}
                  onCheckedChange={(checked) => 
                    setAuditSections(prev => ({ ...prev, hazardousMaterials: checked }))
                  }
                />
              </CardTitle>
            </CardHeader>
            {auditSections.hazardousMaterials && (
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="asbestos-present">Asbestos Present</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes - Confirmed</SelectItem>
                        <SelectItem value="no">No - Not Found</SelectItem>
                        <SelectItem value="likely">Likely Present</SelectItem>
                        <SelectItem value="unknown">Unknown/Not Tested</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="asbestos-condition">Asbestos Condition</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="good">Good Condition</SelectItem>
                        <SelectItem value="fair">Fair Condition</SelectItem>
                        <SelectItem value="poor">Poor Condition</SelectItem>
                        <SelectItem value="damaged">Damaged/Friable</SelectItem>
                        <SelectItem value="not-applicable">Not Applicable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="lead-paint">Lead Paint Present</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes - Confirmed</SelectItem>
                        <SelectItem value="no">No - Not Found</SelectItem>
                        <SelectItem value="likely">Likely Present</SelectItem>
                        <SelectItem value="unknown">Unknown/Not Tested</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="other-hazmat">Other Hazardous Materials</Label>
                    <Input id="other-hazmat" placeholder="e.g., PCBs, Synthetic Mineral Fibres" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="hazmat-management">Hazardous Materials Management</Label>
                  <Textarea
                    id="hazmat-management"
                    placeholder="Management procedures, removal requirements, safety protocols..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Sustainability Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Sustainability Assessment
                <Switch
                  checked={auditSections.sustainability}
                  onCheckedChange={(checked) => 
                    setAuditSections(prev => ({ ...prev, sustainability: checked }))
                  }
                />
              </CardTitle>
            </CardHeader>
            {auditSections.sustainability && (
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="bulk-sustainability">Bulk Sustainability Data (As-Built Categories)</Label>
                  <Textarea
                    id="bulk-sustainability"
                    placeholder="Paste energy, water, waste, materials, or climate data here..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="energy-rating">Energy Rating</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Star</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="6">6 Stars</SelectItem>
                        <SelectItem value="not-rated">Not Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="nabers-rating">NABERS Rating</Label>
                    <Input id="nabers-rating" placeholder="NABERS energy rating" />
                  </div>
                  <div>
                    <Label htmlFor="overall-sustainability">Overall Sustainability Score</Label>
                    <Input id="overall-sustainability" placeholder="Auto-calculated score" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="energy-efficiency">Energy Efficiency Features & Recommendations</Label>
                  <Textarea
                    id="energy-efficiency"
                    placeholder="Solar panels, insulation, efficient HVAC systems, recommendations for improvements..."
                    className="min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor="water-conservation">Water Conservation Strategies</Label>
                  <Textarea
                    id="water-conservation"
                    placeholder="Rainwater harvesting, greywater systems, water-efficient features..."
                    className="min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor="waste-management">Waste Reduction & Management</Label>
                  <Textarea
                    id="waste-management"
                    placeholder="Recycling facilities, composting, waste reduction strategies..."
                    className="min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor="sustainable-materials">Sustainable Materials & Construction</Label>
                  <Textarea
                    id="sustainable-materials"
                    placeholder="Eco-friendly building materials, sustainable construction practices..."
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Climate Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Climate Risk Assessment
                <Switch
                  checked={auditSections.climateRisk}
                  onCheckedChange={(checked) => 
                    setAuditSections(prev => ({ ...prev, climateRisk: checked }))
                  }
                />
              </CardTitle>
            </CardHeader>
            {auditSections.climateRisk && (
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="climate-risks">Climate Risk Assessment</Label>
                  <Textarea
                    id="climate-risks"
                    placeholder="Flood risk, bushfire risk, extreme weather resilience..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="seifa-score">SEIFA Score</Label>
                    <Input id="seifa-score" placeholder="SEIFA score" />
                  </div>
                  <div>
                    <Label htmlFor="green-star">Green Star (0 to 6)</Label>
                    <Input id="green-star" placeholder="Green Star rating (0-6)" />
                  </div>
                  <div>
                    <Label htmlFor="nathers-rating">NatHERS Rating (0 to 10)</Label>
                    <Input id="nathers-rating" placeholder="NatHERS rating (0-10)" />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Environmental Compliance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Environmental Compliance
                <Switch
                  checked={auditSections.compliance}
                  onCheckedChange={(checked) => 
                    setAuditSections(prev => ({ ...prev, compliance: checked }))
                  }
                />
              </CardTitle>
            </CardHeader>
            {auditSections.compliance && (
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="planning-permits">Planning Permits Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compliant">Compliant</SelectItem>
                        <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                        <SelectItem value="pending">Pending Approval</SelectItem>
                        <SelectItem value="not-required">Not Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="waste-permits">Waste Management Permits</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                        <SelectItem value="not-required">Not Required</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="water-licenses">Water Licenses</Label>
                    <Input id="water-licenses" placeholder="Water extraction/discharge licenses" />
                  </div>
                  <div>
                    <Label htmlFor="air-permits">Air Quality Permits</Label>
                    <Input id="air-permits" placeholder="Air emission permits and compliance" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="compliance-issues">Current Compliance Issues</Label>
                  <Textarea
                    id="compliance-issues"
                    placeholder="Any ongoing compliance issues, penalties, or enforcement actions..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Remediation Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Remediation Requirements
                <Switch
                  checked={auditSections.remediation}
                  onCheckedChange={(checked) => 
                    setAuditSections(prev => ({ ...prev, remediation: checked }))
                  }
                />
              </CardTitle>
            </CardHeader>
            {auditSections.remediation && (
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="remediation-required">Remediation Required</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select requirement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes - Required</SelectItem>
                        <SelectItem value="no">No - Not Required</SelectItem>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="remediation-cost">Estimated Remediation Cost</Label>
                    <Input id="remediation-cost" placeholder="Cost estimate in AUD" />
                  </div>
                  <div>
                    <Label htmlFor="remediation-timeline">Remediation Timeline</Label>
                    <Input id="remediation-timeline" placeholder="Expected completion timeframe" />
                  </div>
                  <div>
                    <Label htmlFor="remediation-method">Remediation Method</Label>
                    <Input id="remediation-method" placeholder="e.g., Excavation, In-situ treatment" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="remediation-details">Remediation Action Plan</Label>
                  <Textarea
                    id="remediation-details"
                    placeholder="Detailed remediation plan, methods, timeline, and expected outcomes..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Ongoing Monitoring */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Ongoing Environmental Monitoring
                <Switch
                  checked={auditSections.monitoring}
                  onCheckedChange={(checked) => 
                    setAuditSections(prev => ({ ...prev, monitoring: checked }))
                  }
                />
              </CardTitle>
            </CardHeader>
            {auditSections.monitoring && (
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="monitoring-required">Monitoring Required</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select requirement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes - Required</SelectItem>
                        <SelectItem value="no">No - Not Required</SelectItem>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="voluntary">Voluntary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="monitoring-frequency">Monitoring Frequency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annual">Annual</SelectItem>
                        <SelectItem value="biannual">Bi-annual</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="monitoring-cost">Annual Monitoring Cost</Label>
                    <Input id="monitoring-cost" placeholder="Annual cost in AUD" />
                  </div>
                  <div>
                    <Label htmlFor="next-review">Next Review Date</Label>
                    <Input id="next-review" type="date" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="monitoring-plan">Environmental Monitoring Plan</Label>
                  <Textarea
                    id="monitoring-plan"
                    placeholder="Ongoing monitoring requirements, parameters to be tested, reporting obligations..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnvironmentalAudit;