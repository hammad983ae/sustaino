/**
 * ============================================================================
 * PROPRIETARY SDA ASSESSMENT METHODOLOGY
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * SDA assessment frameworks, valuation methodologies, and compliance
 * analysis systems are proprietary intellectual property.
 * ============================================================================
 */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Lock } from "lucide-react";

const SDAAssessment = () => {
  const [includeSection, setIncludeSection] = useState(false);
  const [assessmentSections, setAssessmentSections] = useState({
    propertyClassification: false,
    incomeStreamAnalysis: false,
    regulatoryCompliance: false,
    riskFactorAssessment: false,
    marketAnalysis: false
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Specialist Disability Accommodation (SDA) Assessment</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="include-sda-assessment">Include</Label>
            <Switch
              id="include-sda-assessment"
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
          {/* Critical Warning */}
          <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="font-medium text-orange-800 dark:text-orange-200">
                    Critical: SDA Specialist Knowledge Required
                  </h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    SDA is subject to complex NDIS legislation and frequent regulatory changes. This assessment requires 
                    specialist knowledge of SDA Rules, Design Standards, and NDIA enrollment requirements. 
                    Specialist SDA valuation advice is strongly recommended.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Classification */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                SDA Property Classification
                <Switch
                  checked={assessmentSections.propertyClassification}
                  onCheckedChange={(checked) => 
                    setAssessmentSections(prev => ({ ...prev, propertyClassification: checked }))
                  }
                />
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Classification according to SDA Rules and Design Standards.
              </p>
            </CardHeader>
            {assessmentSections.propertyClassification && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sda-building-type">SDA Building Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select building type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa-townhouse">Villa/Townhouse/Duplex</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="group-home">Group Home</SelectItem>
                        <SelectItem value="not-sda">Not SDA Classified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sda-design-category">SDA Design Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select design category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="improved-liveability">Improved Liveability</SelectItem>
                        <SelectItem value="fully-accessible">Fully Accessible</SelectItem>
                        <SelectItem value="robust">Robust</SelectItem>
                        <SelectItem value="high-physical-support">High Physical Support</SelectItem>
                        <SelectItem value="not-certified">Not Certified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sda-stock-type">SDA Stock Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stock type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new-build">New Build SDA</SelectItem>
                        <SelectItem value="existing-stock">Existing Stock SDA</SelectItem>
                        <SelectItem value="legacy-stock">Legacy Stock SDA</SelectItem>
                        <SelectItem value="proposed">Proposed SDA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="enrollment-status">NDIA Enrollment Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select enrollment status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enrolled">Currently Enrolled</SelectItem>
                        <SelectItem value="application-pending">Application Pending</SelectItem>
                        <SelectItem value="not-enrolled">Not Enrolled</SelectItem>
                        <SelectItem value="enrollment-lapsed">Enrollment Lapsed</SelectItem>
                        <SelectItem value="unknown">Unknown Status</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="ooa-provision">On-site Overnight Assistance (OOA)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select OOA status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ooa-included">OOA Space Included</SelectItem>
                        <SelectItem value="no-ooa">No OOA Provision</SelectItem>
                        <SelectItem value="ooa-possible">OOA Possible</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fire-sprinkler">Fire Sprinkler System</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sprinkler status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sprinkler-installed">Fire Sprinkler Installed</SelectItem>
                        <SelectItem value="no-sprinkler">No Fire Sprinkler</SelectItem>
                        <SelectItem value="sprinkler-required">Sprinkler Required</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Income Stream Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                SDA Income Stream Analysis
                <Switch
                  checked={assessmentSections.incomeStreamAnalysis}
                  onCheckedChange={(checked) => 
                    setAssessmentSections(prev => ({ ...prev, incomeStreamAnalysis: checked }))
                  }
                />
              </CardTitle>
            </CardHeader>
            {assessmentSections.incomeStreamAnalysis && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sda-payment-rate">Current SDA Payment Rate (per day)</Label>
                    <Input 
                      id="sda-payment-rate"
                      placeholder="e.g., $150.00"
                      type="number"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mrrc-amount">MRRC Amount (if applicable)</Label>
                    <Input 
                      id="mrrc-amount"
                      placeholder="e.g., $50.00"
                      type="number"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ooa-payment">OOA Payment (if applicable)</Label>
                    <Input 
                      id="ooa-payment"
                      placeholder="e.g., $75.00"
                      type="number"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="occupancy-status">Current Occupancy Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select occupancy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fully-occupied">Fully Occupied</SelectItem>
                        <SelectItem value="partially-occupied">Partially Occupied</SelectItem>
                        <SelectItem value="vacant">Vacant</SelectItem>
                        <SelectItem value="between-tenants">Between Tenants</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="lease-term">Lease/Agreement Term</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short-term">Short Term (&lt; 12 months)</SelectItem>
                        <SelectItem value="medium-term">Medium Term (1-3 years)</SelectItem>
                        <SelectItem value="long-term">Long Term (3+ years)</SelectItem>
                        <SelectItem value="month-to-month">Month to Month</SelectItem>
                        <SelectItem value="no-formal-lease">No Formal Lease</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="income-security">Income Stream Security Assessment</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select security level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-security">High Security (Government Guaranteed)</SelectItem>
                        <SelectItem value="moderate-security">Moderate Security</SelectItem>
                        <SelectItem value="variable-security">Variable Security</SelectItem>
                        <SelectItem value="high-risk">High Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Regulatory Compliance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Regulatory Compliance Assessment
                <Switch
                  checked={assessmentSections.regulatoryCompliance}
                  onCheckedChange={(checked) => 
                    setAssessmentSections(prev => ({ ...prev, regulatoryCompliance: checked }))
                  }
                />
              </CardTitle>
            </CardHeader>
            {assessmentSections.regulatoryCompliance && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sda-provider-registration">SDA Provider Registration Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select registration status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="registered">Currently Registered</SelectItem>
                        <SelectItem value="registration-pending">Registration Pending</SelectItem>
                        <SelectItem value="not-registered">Not Registered</SelectItem>
                        <SelectItem value="registration-suspended">Registration Suspended</SelectItem>
                        <SelectItem value="unknown">Unknown Status</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="design-certificate">Design Standard Certification</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select certification status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="certified">Third-Party Certified</SelectItem>
                        <SelectItem value="pre-construction">Pre-Construction Certificate</SelectItem>
                        <SelectItem value="as-if-built">As-If-Built Certificate</SelectItem>
                        <SelectItem value="not-certified">Not Certified</SelectItem>
                        <SelectItem value="certification-pending">Certification Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="building-code-compliance">Building Code Compliance</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select compliance status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fully-compliant">Fully Compliant</SelectItem>
                        <SelectItem value="minor-issues">Minor Compliance Issues</SelectItem>
                        <SelectItem value="major-issues">Major Compliance Issues</SelectItem>
                        <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                        <SelectItem value="compliance-unknown">Compliance Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sda-rules-compliance">SDA Rules Compliance</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select compliance status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compliant">Fully Compliant</SelectItem>
                        <SelectItem value="minor-variations">Minor Variations</SelectItem>
                        <SelectItem value="requires-rectification">Requires Rectification</SelectItem>
                        <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                        <SelectItem value="assessment-required">Assessment Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Risk Factor Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                SDA Risk Factor Assessment
                <Switch
                  checked={assessmentSections.riskFactorAssessment}
                  onCheckedChange={(checked) => 
                    setAssessmentSections(prev => ({ ...prev, riskFactorAssessment: checked }))
                  }
                />
              </CardTitle>
            </CardHeader>
            {assessmentSections.riskFactorAssessment && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tenant-needs-risk">Changing Tenant Needs Risk</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Risk</SelectItem>
                        <SelectItem value="moderate">Moderate Risk</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                        <SelectItem value="critical">Critical Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="vacancy-risk">Vacancy Risk Assessment</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Vacancy Risk</SelectItem>
                        <SelectItem value="moderate">Moderate Vacancy Risk</SelectItem>
                        <SelectItem value="high">High Vacancy Risk</SelectItem>
                        <SelectItem value="critical">Critical Vacancy Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="legislation-change-risk">SDA Legislation Change Risk</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Impact Expected</SelectItem>
                        <SelectItem value="moderate">Moderate Impact Expected</SelectItem>
                        <SelectItem value="high">High Impact Expected</SelectItem>
                        <SelectItem value="critical">Critical Impact Possible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="obsolescence-risk">Design/Operational Obsolescence Risk</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Obsolescence Risk</SelectItem>
                        <SelectItem value="moderate">Moderate Obsolescence Risk</SelectItem>
                        <SelectItem value="high">High Obsolescence Risk</SelectItem>
                        <SelectItem value="critical">Critical Obsolescence Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="deregistration-risk">De-registration Risk</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">Minimal Risk</SelectItem>
                        <SelectItem value="low">Low Risk</SelectItem>
                        <SelectItem value="moderate">Moderate Risk</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="overcapitalisation-risk">Overcapitalisation Risk</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Risk</SelectItem>
                        <SelectItem value="moderate">Moderate Risk</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                        <SelectItem value="critical">Critical Overcapitalisation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Market Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                SDA Market Analysis
                <Switch
                  checked={assessmentSections.marketAnalysis}
                  onCheckedChange={(checked) => 
                    setAssessmentSections(prev => ({ ...prev, marketAnalysis: checked }))
                  }
                />
              </CardTitle>
            </CardHeader>
            {assessmentSections.marketAnalysis && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="local-sda-supply">Local SDA Supply</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select supply level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="undersupplied">Significantly Undersupplied</SelectItem>
                        <SelectItem value="low-supply">Low Supply</SelectItem>
                        <SelectItem value="balanced">Balanced Supply</SelectItem>
                        <SelectItem value="oversupplied">Oversupplied</SelectItem>
                        <SelectItem value="saturated">Market Saturated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sda-demand">Local SDA Demand</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select demand level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-demand">High Demand</SelectItem>
                        <SelectItem value="moderate-demand">Moderate Demand</SelectItem>
                        <SelectItem value="low-demand">Low Demand</SelectItem>
                        <SelectItem value="limited-demand">Limited Demand</SelectItem>
                        <SelectItem value="unknown">Unknown Demand</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sil-provider-availability">SIL Provider Availability</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="good-availability">Good Availability</SelectItem>
                        <SelectItem value="limited-availability">Limited Availability</SelectItem>
                        <SelectItem value="poor-availability">Poor Availability</SelectItem>
                        <SelectItem value="no-availability">No Local Availability</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="market-evidence">SDA Market Evidence Quality</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select evidence quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="good-evidence">Good Market Evidence</SelectItem>
                        <SelectItem value="limited-evidence">Limited Market Evidence</SelectItem>
                        <SelectItem value="poor-evidence">Poor Market Evidence</SelectItem>
                        <SelectItem value="no-evidence">No Direct Evidence</SelectItem>
                        <SelectItem value="requires-benchmarking">Requires Benchmarking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="market-commentary">SDA Market Commentary</Label>
                  <Textarea
                    id="market-commentary"
                    placeholder="Provide commentary on local SDA market conditions, supply/demand dynamics, competitive positioning, and market outlook..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Overall SDA Assessment Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overall SDA Assessment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sda-viability">SDA Investment Viability</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select viability rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-viability">High Viability</SelectItem>
                      <SelectItem value="moderate-viability">Moderate Viability</SelectItem>
                      <SelectItem value="low-viability">Low Viability</SelectItem>
                      <SelectItem value="not-viable">Not Viable as SDA</SelectItem>
                      <SelectItem value="requires-specialist-assessment">Requires Specialist Assessment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="alternative-use-value">Alternative Use Consideration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select consideration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sda-highest-best">SDA is Highest and Best Use</SelectItem>
                      <SelectItem value="alternative-higher">Alternative Use May Be Higher</SelectItem>
                      <SelectItem value="alternative-required">Alternative Use Assessment Required</SelectItem>
                      <SelectItem value="dual-purpose">Dual Purpose Assessment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="sda-recommendations">SDA Assessment Recommendations</Label>
                <Textarea
                  id="sda-recommendations"
                  placeholder="Provide overall assessment recommendations including specialist advice requirements, due diligence recommendations, and key considerations for decision-making..."
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SDAAssessment;