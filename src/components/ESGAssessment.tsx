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
  const [envSubsections, setEnvSubsections] = useState({
    environmentalStatement: false,
    epaAudits: false,
    sustainabilityClimate: false
  });
  const [socialSubsections, setSocialSubsections] = useState({
    socioEconomic: false,
    accessibility: false,
    communityImpact: false,
    culturalHeritage: false
  });
  const [govSubsections, setGovSubsections] = useState({
    regulatoryCompliance: false,
    transparencyReporting: false,
    riskManagement: false,
    legalEthical: false
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
                {/* Environmental Statement */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      Environmental Statement
                      <Switch
                        checked={envSubsections.environmentalStatement}
                        onCheckedChange={(checked) => 
                          setEnvSubsections(prev => ({ ...prev, environmentalStatement: checked }))
                        }
                      />
                    </CardTitle>
                  </CardHeader>
                  {envSubsections.environmentalStatement && (
                    <CardContent className="space-y-4">
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
                    </CardContent>
                  )}
                </Card>

                {/* EPA Audits & Regulatory Compliance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      EPA Audits & Regulatory Compliance
                      <Switch
                        checked={envSubsections.epaAudits}
                        onCheckedChange={(checked) => 
                          setEnvSubsections(prev => ({ ...prev, epaAudits: checked }))
                        }
                      />
                    </CardTitle>
                  </CardHeader>
                  {envSubsections.epaAudits && (
                    <CardContent className="space-y-4">
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
                    </CardContent>
                  )}
                </Card>

                {/* Sustainability & Climate Risk */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      Sustainability & Climate Risk
                      <Switch
                        checked={envSubsections.sustainabilityClimate}
                        onCheckedChange={(checked) => 
                          setEnvSubsections(prev => ({ ...prev, sustainabilityClimate: checked }))
                        }
                      />
                    </CardTitle>
                  </CardHeader>
                  {envSubsections.sustainabilityClimate && (
                    <CardContent className="space-y-4">
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
                    </CardContent>
                  )}
                </Card>
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
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      Socio-Economic Indicators
                      <Switch
                        checked={socialSubsections.socioEconomic}
                        onCheckedChange={(checked) => 
                          setSocialSubsections(prev => ({ ...prev, socioEconomic: checked }))
                        }
                      />
                    </CardTitle>
                  </CardHeader>
                  {socialSubsections.socioEconomic && (
                    <CardContent className="space-y-4">
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
                    </CardContent>
                  )}
                </Card>

                {/* Accessibility and Inclusion */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      Accessibility and Inclusion
                      <Switch
                        checked={socialSubsections.accessibility}
                        onCheckedChange={(checked) => 
                          setSocialSubsections(prev => ({ ...prev, accessibility: checked }))
                        }
                      />
                    </CardTitle>
                  </CardHeader>
                  {socialSubsections.accessibility && (
                    <CardContent className="space-y-4">
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
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Community Impact */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      Community Impact
                      <Switch
                        checked={socialSubsections.communityImpact}
                        onCheckedChange={(checked) => 
                          setSocialSubsections(prev => ({ ...prev, communityImpact: checked }))
                        }
                      />
                    </CardTitle>
                  </CardHeader>
                  {socialSubsections.communityImpact && (
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="community-benefits">Community Benefits & Social Value</Label>
                        <Textarea
                          id="community-benefits"
                          placeholder="Describe social benefits, community facilities, local economic impact..."
                          className="min-h-[80px]"
                        />
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Cultural Heritage */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      Cultural Heritage
                      <Switch
                        checked={socialSubsections.culturalHeritage}
                        onCheckedChange={(checked) => 
                          setSocialSubsections(prev => ({ ...prev, culturalHeritage: checked }))
                        }
                      />
                    </CardTitle>
                  </CardHeader>
                  {socialSubsections.culturalHeritage && (
                    <CardContent className="space-y-4">
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
                    </CardContent>
                  )}
                </Card>
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
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      Regulatory Compliance
                      <Switch
                        checked={govSubsections.regulatoryCompliance}
                        onCheckedChange={(checked) => 
                          setGovSubsections(prev => ({ ...prev, regulatoryCompliance: checked }))
                        }
                      />
                    </CardTitle>
                  </CardHeader>
                  {govSubsections.regulatoryCompliance && (
                    <CardContent className="space-y-4">
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
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Transparency and Reporting */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      Transparency and Reporting
                      <Switch
                        checked={govSubsections.transparencyReporting}
                        onCheckedChange={(checked) => 
                          setGovSubsections(prev => ({ ...prev, transparencyReporting: checked }))
                        }
                      />
                    </CardTitle>
                  </CardHeader>
                  {govSubsections.transparencyReporting && (
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="stakeholder-engagement">Stakeholder Engagement</Label>
                        <Textarea
                          id="stakeholder-engagement"
                          placeholder="Describe stakeholder consultation processes, community engagement, tenant relations..."
                          className="min-h-[80px]"
                        />
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Risk Management */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      Risk Management
                      <Switch
                        checked={govSubsections.riskManagement}
                        onCheckedChange={(checked) => 
                          setGovSubsections(prev => ({ ...prev, riskManagement: checked }))
                        }
                      />
                    </CardTitle>
                  </CardHeader>
                  {govSubsections.riskManagement && (
                    <CardContent className="space-y-4">
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
                    </CardContent>
                  )}
                </Card>

                {/* Legal and Ethical Compliance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      Legal and Ethical Compliance
                      <Switch
                        checked={govSubsections.legalEthical}
                        onCheckedChange={(checked) => 
                          setGovSubsections(prev => ({ ...prev, legalEthical: checked }))
                        }
                      />
                    </CardTitle>
                  </CardHeader>
                  {govSubsections.legalEthical && (
                    <CardContent className="space-y-4">
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
                    </CardContent>
                  )}
                </Card>
              </CardContent>
            )}
          </Card>

          {/* Overall ESG Assessment Summary */}
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