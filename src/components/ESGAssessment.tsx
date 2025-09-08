import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const ESGAssessment = () => {
  const [includeSection, setIncludeSection] = useState(true);
  const [esgSections, setEsgSections] = useState({
    environmental: false,
    social: false,
    governance: false
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">ESG Assessment and Audit</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="include-esg-assessment">Include</Label>
            <Switch
              id="include-esg-assessment"
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
          {/* Environmental (E) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Environmental (E) - Environmental Impact Assessment
                <Switch
                  checked={esgSections.environmental}
                  onCheckedChange={(checked) => 
                    setEsgSections(prev => ({ ...prev, environmental: checked }))
                  }
                />
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Environmental factors including contamination, sustainability, climate risks, and regulatory compliance.
              </p>
            </CardHeader>
            {esgSections.environmental && (
              <CardContent className="space-y-6">
                {/* Environmental Statement Checklist */}
                <div className="space-y-4">
                  <h4 className="font-medium">Environmental Statement</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="prev-contaminating-use">Previous Potential Contaminating Use</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-evident">Not Evident</SelectItem>
                          <SelectItem value="evident">Evident</SelectItem>
                          <SelectItem value="possible">Possible</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="env-planning-overlay">Environmental Planning Overlay</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-evident">Not Evident</SelectItem>
                          <SelectItem value="evident">Evident</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="contaminated-adjoining">Contaminated Use on Adjoining Properties</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-evident">Not Evident</SelectItem>
                          <SelectItem value="evident">Evident</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="contamination-surrounding">Known Contamination in Surrounding Areas</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-evident">Not Evident</SelectItem>
                          <SelectItem value="evident">Evident</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="contaminating-processes">Potentially Contaminating Processes or Materials on Site</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-evident">Not Evident</SelectItem>
                          <SelectItem value="evident">Evident</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="underground-storage">Known Past Underground Storage of Contaminant Materials</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-evident">Not Evident</SelectItem>
                          <SelectItem value="evident">Evident</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="contaminated-registers">Listed on Contaminated or Environmental Site Registers</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="env-licensing">Do Operations Require Environmental Licensing</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="noxious-weeds">Noxious Weeds</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-applicable">Not Applicable</SelectItem>
                          <SelectItem value="not-evident">Not Evident</SelectItem>
                          <SelectItem value="evident">Evident</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="salinity-erosion">Identifiable Salinity or Erosion Issues</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="biosecurity-issues">Bio-Security Issues</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-evident">Not Evident</SelectItem>
                          <SelectItem value="evident">Evident</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="flooding-issues">Known Flooding Issues</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="minor">Minor Risk</SelectItem>
                          <SelectItem value="moderate">Moderate Risk</SelectItem>
                          <SelectItem value="major">Major Risk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="landslip-subsidence">Landslip or Mines Subsidence</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="possible">Possible</SelectItem>
                          <SelectItem value="evident">Evident</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="road-acquisition">Main Road Acquisition</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="possible">Possible</SelectItem>
                          <SelectItem value="planned">Planned</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="compliant-materials">Compliant Building Materials</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="asbestos-materials">Asbestos Related Materials</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="likely">Likely</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="env-other">Other Environmental Issues</Label>
                    <Textarea
                      id="env-other"
                      placeholder="Describe any other environmental issues or concerns..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>

                {/* EPA and Regulatory Compliance */}
                <div className="space-y-4">
                  <h4 className="font-medium">EPA Audits & Regulatory Compliance</h4>
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
                  </div>
                </div>

                {/* Sustainability & Climate Risk */}
                <div className="space-y-4">
                  <h4 className="font-medium">Sustainability & Climate Risk</h4>
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
                      <Label htmlFor="green-star">Green Star (0 to 6)</Label>
                      <Input id="green-star" placeholder="Green Star rating (0-6)" />
                    </div>
                    <div>
                      <Label htmlFor="nathers-rating">NatHERS Rating (0 to 10)</Label>
                      <Input id="nathers-rating" placeholder="NatHERS rating (0-10)" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="climate-risks">Climate Risk Assessment</Label>
                    <Textarea
                      id="climate-risks"
                      placeholder="Flood risk, bushfire risk, extreme weather resilience, sea level rise impacts..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Social (S) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Social (S) - Community and Social Impact
                <Switch
                  checked={esgSections.social}
                  onCheckedChange={(checked) => 
                    setEsgSections(prev => ({ ...prev, social: checked }))
                  }
                />
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Social factors including community impact, accessibility, and socio-economic considerations.
              </p>
            </CardHeader>
            {esgSections.social && (
              <CardContent className="space-y-6">
                {/* Socio-Economic Indicators */}
                <div className="space-y-4">
                  <h4 className="font-medium">Socio-Economic Indicators</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="seifa-score">SEIFA Score</Label>
                      <Input id="seifa-score" placeholder="Socio-Economic Index score" />
                    </div>
                    <div>
                      <Label htmlFor="seifa-decile">SEIFA Decile</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select decile" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1st Decile (Most Disadvantaged)</SelectItem>
                          <SelectItem value="2">2nd Decile</SelectItem>
                          <SelectItem value="3">3rd Decile</SelectItem>
                          <SelectItem value="4">4th Decile</SelectItem>
                          <SelectItem value="5">5th Decile</SelectItem>
                          <SelectItem value="6">6th Decile</SelectItem>
                          <SelectItem value="7">7th Decile</SelectItem>
                          <SelectItem value="8">8th Decile</SelectItem>
                          <SelectItem value="9">9th Decile</SelectItem>
                          <SelectItem value="10">10th Decile (Most Advantaged)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="community-services">Community Services Access</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select access level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Accessibility and Inclusion */}
                <div className="space-y-4">
                  <h4 className="font-medium">Accessibility and Inclusion</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="disability-access">Disability Access Compliance</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select compliance level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fully-compliant">Fully Compliant</SelectItem>
                          <SelectItem value="partially-compliant">Partially Compliant</SelectItem>
                          <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                          <SelectItem value="not-applicable">Not Applicable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="public-transport">Public Transport Access</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select access level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="education-facilities">Education Facilities Access</Label>
                      <Input id="education-facilities" placeholder="Schools, universities, training centers" />
                    </div>
                    <div>
                      <Label htmlFor="healthcare-facilities">Healthcare Facilities Access</Label>
                      <Input id="healthcare-facilities" placeholder="Hospitals, clinics, medical centers" />
                    </div>
                  </div>
                </div>

                {/* Community Impact */}
                <div className="space-y-4">
                  <h4 className="font-medium">Community Impact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="affordable-housing">Affordable Housing Contribution</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select contribution" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="planned">Planned</SelectItem>
                          <SelectItem value="not-applicable">Not Applicable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="employment-creation">Local Employment Creation</Label>
                      <Input id="employment-creation" placeholder="Number of jobs created/supported" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="community-benefits">Community Benefits & Social Value</Label>
                    <Textarea
                      id="community-benefits"
                      placeholder="Describe social benefits, community facilities, local economic impact..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>

                {/* Cultural Heritage */}
                <div className="space-y-4">
                  <h4 className="font-medium">Cultural Heritage</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="heritage-significance">Heritage Significance</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select significance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="local">Local Significance</SelectItem>
                          <SelectItem value="state">State Significance</SelectItem>
                          <SelectItem value="national">National Significance</SelectItem>
                          <SelectItem value="world">World Heritage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="indigenous-heritage">Indigenous Cultural Heritage</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-identified">Not Identified</SelectItem>
                          <SelectItem value="possible">Possible</SelectItem>
                          <SelectItem value="identified">Identified</SelectItem>
                          <SelectItem value="protected">Protected Site</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Governance (G) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Governance (G) - Corporate Governance and Compliance
                <Switch
                  checked={esgSections.governance}
                  onCheckedChange={(checked) => 
                    setEsgSections(prev => ({ ...prev, governance: checked }))
                  }
                />
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Governance factors including regulatory compliance, transparency, and ethical practices.
              </p>
            </CardHeader>
            {esgSections.governance && (
              <CardContent className="space-y-6">
                {/* Regulatory Compliance */}
                <div className="space-y-4">
                  <h4 className="font-medium">Regulatory Compliance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="planning-compliance">Planning Compliance Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compliant">Compliant</SelectItem>
                          <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                          <SelectItem value="pending">Pending Approval</SelectItem>
                          <SelectItem value="under-review">Under Review</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="building-compliance">Building Code Compliance</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compliant">Compliant</SelectItem>
                          <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                          <SelectItem value="under-review">Under Review</SelectItem>
                          <SelectItem value="grandfathered">Grandfathered</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="fire-safety-compliance">Fire Safety Compliance</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compliant">Compliant</SelectItem>
                          <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                          <SelectItem value="upgrade-required">Upgrade Required</SelectItem>
                          <SelectItem value="not-applicable">Not Applicable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="occupational-health">Occupational Health & Safety</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compliant">Compliant</SelectItem>
                          <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                          <SelectItem value="improvement-required">Improvement Required</SelectItem>
                          <SelectItem value="not-applicable">Not Applicable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Transparency and Reporting */}
                <div className="space-y-4">
                  <h4 className="font-medium">Transparency and Reporting</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="esg-reporting">ESG Reporting Standards</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select standard" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gri">GRI Standards</SelectItem>
                          <SelectItem value="sasb">SASB Standards</SelectItem>
                          <SelectItem value="tcfd">TCFD Framework</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="developing">Developing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="certification-standards">Certification Standards</Label>
                      <Input id="certification-standards" placeholder="ISO, BREEAM, LEED, etc." />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="stakeholder-engagement">Stakeholder Engagement</Label>
                    <Textarea
                      id="stakeholder-engagement"
                      placeholder="Describe stakeholder consultation processes, community engagement, tenant relations..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>

                {/* Risk Management */}
                <div className="space-y-4">
                  <h4 className="font-medium">Risk Management</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="risk-management-framework">Risk Management Framework</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select framework" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="comprehensive">Comprehensive</SelectItem>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="developing">Developing</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="insurance-coverage">Insurance Coverage</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select coverage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="comprehensive">Comprehensive</SelectItem>
                          <SelectItem value="adequate">Adequate</SelectItem>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="insufficient">Insufficient</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="governance-policies">Governance Policies & Procedures</Label>
                    <Textarea
                      id="governance-policies"
                      placeholder="Describe governance structure, policies, compliance procedures, ethics framework..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>

                {/* Legal and Ethical Compliance */}
                <div className="space-y-4">
                  <h4 className="font-medium">Legal and Ethical Compliance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="legal-disputes">Outstanding Legal Disputes</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="minor">Minor</SelectItem>
                          <SelectItem value="significant">Significant</SelectItem>
                          <SelectItem value="material">Material</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="compliance-violations">Recent Compliance Violations</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="minor">Minor</SelectItem>
                          <SelectItem value="significant">Significant</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="ethical-considerations">Ethical Considerations & Corporate Responsibility</Label>
                    <Textarea
                      id="ethical-considerations"
                      placeholder="Describe ethical business practices, corporate responsibility initiatives, supply chain ethics..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Overall ESG Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overall ESG Assessment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="esg-score-environmental">Environmental Score (0-100)</Label>
                  <Input id="esg-score-environmental" placeholder="Environmental score" />
                </div>
                <div>
                  <Label htmlFor="esg-score-social">Social Score (0-100)</Label>
                  <Input id="esg-score-social" placeholder="Social score" />
                </div>
                <div>
                  <Label htmlFor="esg-score-governance">Governance Score (0-100)</Label>
                  <Input id="esg-score-governance" placeholder="Governance score" />
                </div>
                <div>
                  <Label htmlFor="esg-score-overall">Overall ESG Score</Label>
                  <Input id="esg-score-overall" placeholder="Composite ESG score" />
                </div>
                <div>
                  <Label htmlFor="esg-rating">ESG Rating</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aaa">AAA (Leader)</SelectItem>
                      <SelectItem value="aa">AA (Leader)</SelectItem>
                      <SelectItem value="a">A (Average)</SelectItem>
                      <SelectItem value="bbb">BBB (Average)</SelectItem>
                      <SelectItem value="bb">BB (Average)</SelectItem>
                      <SelectItem value="b">B (Laggard)</SelectItem>
                      <SelectItem value="ccc">CCC (Laggard)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="esg-trend">ESG Performance Trend</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trend" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="improving">Improving</SelectItem>
                      <SelectItem value="stable">Stable</SelectItem>
                      <SelectItem value="declining">Declining</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="esg-recommendations">ESG Improvement Recommendations</Label>
                <Textarea
                  id="esg-recommendations"
                  placeholder="Provide specific recommendations for improving ESG performance across environmental, social, and governance dimensions..."
                  className="min-h-[120px]"
                />
              </div>
              <div>
                <Label htmlFor="esg-impact-valuation">Impact on Property Valuation</Label>
                <Textarea
                  id="esg-impact-valuation"
                  placeholder="Explain how ESG factors impact property valuation, marketability, investment attractiveness, and future value trends..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ESGAssessment;