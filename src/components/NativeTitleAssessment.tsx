/**
 * ============================================================================
 * PROPRIETARY NATIVE TITLE ASSESSMENT METHODOLOGY
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Native title assessment frameworks, risk analysis methodologies, and
 * legal compliance systems are proprietary intellectual property.
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

const NativeTitleAssessment = () => {
  const [includeSection, setIncludeSection] = useState(false);
  const [assessmentSections, setAssessmentSections] = useState({
    landTenureAnalysis: false,
    nativeTitleRisk: false,
    dueDiligenceRecommendations: false,
    legalReferralRequirements: false
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Native Title Assessment</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="include-native-title">Include</Label>
            <Switch
              id="include-native-title"
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
                    Critical: Native Title Complexity Warning
                  </h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Native title is governed by Federal legislation and extensive Court decisions. This assessment is preliminary only. 
                    Specialist legal advice is essential for any property where native title considerations are identified.
                    Native title exists over approximately 50% of Australia's landmass.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Land Tenure Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Land Tenure Analysis
                <Switch
                  checked={assessmentSections.landTenureAnalysis}
                  onCheckedChange={(checked) => 
                    setAssessmentSections(prev => ({ ...prev, landTenureAnalysis: checked }))
                  }
                />
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Assessment of existing land tenure and likelihood of native title co-existence.
              </p>
            </CardHeader>
            {assessmentSections.landTenureAnalysis && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="current-tenure">Current Land Tenure</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tenure type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="freehold">Freehold (Low Native Title Risk)</SelectItem>
                        <SelectItem value="crown-lease">Crown Lease</SelectItem>
                        <SelectItem value="pastoral-lease">Pastoral Lease (High Coexistence Risk)</SelectItem>
                        <SelectItem value="crown-land">Crown Land (High Native Title Risk)</SelectItem>
                        <SelectItem value="national-park">National Park/Reserve</SelectItem>
                        <SelectItem value="mining-lease">Mining Lease</SelectItem>
                        <SelectItem value="other">Other (Specify)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="tenure-grant-date">Original Tenure Grant Date</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pre-1975">Before 31 Oct 1975 (Valid)</SelectItem>
                        <SelectItem value="1975-1993">31 Oct 1975 - 31 Dec 1993 (Validated)</SelectItem>
                        <SelectItem value="post-1994">After 1 Jan 1994 (NTA Compliance Required)</SelectItem>
                        <SelectItem value="unknown">Unknown (Requires Investigation)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="geographic-location">Geographic Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urban">Urban/Metropolitan (Lower Risk)</SelectItem>
                        <SelectItem value="suburban">Suburban/Peri-urban</SelectItem>
                        <SelectItem value="regional">Regional Areas (Higher Risk)</SelectItem>
                        <SelectItem value="rural">Rural/Pastoral (High Risk)</SelectItem>
                        <SelectItem value="remote">Remote/Outback (Very High Risk)</SelectItem>
                        <SelectItem value="coastal">Coastal Areas (Variable Risk)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="adjacent-land">Adjacent Land Considerations</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-issues">No Native Title Concerns</SelectItem>
                        <SelectItem value="crown-adjacent">Adjacent to Crown Land</SelectItem>
                        <SelectItem value="determination-area">Near Native Title Determination Area</SelectItem>
                        <SelectItem value="claim-area">Near Native Title Claim Area</SelectItem>
                        <SelectItem value="requires-investigation">Requires Investigation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Native Title Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Native Title Risk Assessment
                <Switch
                  checked={assessmentSections.nativeTitleRisk}
                  onCheckedChange={(checked) => 
                    setAssessmentSections(prev => ({ ...prev, nativeTitleRisk: checked }))
                  }
                />
              </CardTitle>
            </CardHeader>
            {assessmentSections.nativeTitleRisk && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nntt-search">NNTT Database Search Conducted</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completed">Completed - No Issues</SelectItem>
                        <SelectItem value="determination-found">Determination Found</SelectItem>
                        <SelectItem value="claim-found">Active Claim Found</SelectItem>
                        <SelectItem value="not-conducted">Not Conducted</SelectItem>
                        <SelectItem value="requires-specialist">Requires Specialist Search</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="future-act-risk">Future Act Risk Assessment</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Future Acts Required</SelectItem>
                        <SelectItem value="low">Low Risk (Existing Use)</SelectItem>
                        <SelectItem value="moderate">Moderate Risk (Minor Changes)</SelectItem>
                        <SelectItem value="high">High Risk (New Tenure Required)</SelectItem>
                        <SelectItem value="critical">Critical (Development/Infrastructure)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="ilua-requirement">ILUA Requirement Assessment</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select requirement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-required">Not Required</SelectItem>
                        <SelectItem value="possible">Possibly Required</SelectItem>
                        <SelectItem value="likely-required">Likely Required</SelectItem>
                        <SelectItem value="definitely-required">Definitely Required</SelectItem>
                        <SelectItem value="existing-ilua">Existing ILUA in Place</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="cultural-significance">Cultural Significance Indicators</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select indicators" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none-observed">None Observed</SelectItem>
                        <SelectItem value="possible-sites">Possible Cultural Sites</SelectItem>
                        <SelectItem value="water-features">Water Features Present</SelectItem>
                        <SelectItem value="traditional-pathways">Traditional Pathway Area</SelectItem>
                        <SelectItem value="requires-heritage-survey">Requires Heritage Survey</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="native-title-observations">Native Title Observations</Label>
                  <Textarea
                    id="native-title-observations"
                    placeholder="Record any observations regarding potential native title implications, including tenure analysis, proximity to determination areas, and preliminary risk assessment..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Due Diligence Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Due Diligence Recommendations
                <Switch
                  checked={assessmentSections.dueDiligenceRecommendations}
                  onCheckedChange={(checked) => 
                    setAssessmentSections(prev => ({ ...prev, dueDiligenceRecommendations: checked }))
                  }
                />
              </CardTitle>
            </CardHeader>
            {assessmentSections.dueDiligenceRecommendations && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="immediate-actions">Immediate Actions Required</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Immediate Action</SelectItem>
                        <SelectItem value="nntt-search">Conduct NNTT Search</SelectItem>
                        <SelectItem value="legal-advice">Seek Legal Advice</SelectItem>
                        <SelectItem value="specialist-assessment">Specialist Assessment Required</SelectItem>
                        <SelectItem value="urgent-legal">Urgent Legal Advice Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timeline-priority">Timeline Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-urgent">Not Urgent</SelectItem>
                        <SelectItem value="before-settlement">Before Settlement</SelectItem>
                        <SelectItem value="before-development">Before Development</SelectItem>
                        <SelectItem value="immediate">Immediate Investigation</SelectItem>
                        <SelectItem value="halt-proceedings">Halt All Proceedings</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="due-diligence-recommendations">Specific Due Diligence Recommendations</Label>
                  <Textarea
                    id="due-diligence-recommendations"
                    placeholder="Detail specific due diligence steps recommended, including database searches, legal consultations, specialist assessments, and timeline considerations..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Legal Referral Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Legal Referral Requirements
                <Switch
                  checked={assessmentSections.legalReferralRequirements}
                  onCheckedChange={(checked) => 
                    setAssessmentSections(prev => ({ ...prev, legalReferralRequirements: checked }))
                  }
                />
              </CardTitle>
            </CardHeader>
            {assessmentSections.legalReferralRequirements && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="legal-specialist-type">Legal Specialist Type Required</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialist type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Legal Advice Required</SelectItem>
                        <SelectItem value="general-property">General Property Lawyer</SelectItem>
                        <SelectItem value="native-title-specialist">Native Title Specialist</SelectItem>
                        <SelectItem value="federal-court-practitioner">Federal Court Practitioner</SelectItem>
                        <SelectItem value="ilua-specialist">ILUA Negotiation Specialist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="consultation-urgency">Consultation Urgency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-required">Not Required</SelectItem>
                        <SelectItem value="routine">Routine Consultation</SelectItem>
                        <SelectItem value="priority">Priority Consultation</SelectItem>
                        <SelectItem value="urgent">Urgent Consultation</SelectItem>
                        <SelectItem value="immediate">Immediate Expert Advice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="referral-reasons">Legal Referral Reasoning</Label>
                  <Textarea
                    id="referral-reasons"
                    placeholder="Explain the specific reasons for legal referral, including identified risks, complexity factors, and recommended scope of legal advice..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Overall Assessment Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Native Title Assessment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="overall-risk-rating">Overall Native Title Risk Rating</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal Risk</SelectItem>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="moderate">Moderate Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                      <SelectItem value="critical">Critical Risk - Requires Immediate Action</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="valuation-impact">Impact on Property Valuation</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select impact level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Impact Expected</SelectItem>
                      <SelectItem value="minimal">Minimal Impact</SelectItem>
                      <SelectItem value="moderate">Moderate Impact</SelectItem>
                      <SelectItem value="significant">Significant Impact</SelectItem>
                      <SelectItem value="material">Material Impact - Value Qualification Required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="summary-recommendations">Summary and Recommendations</Label>
                <Textarea
                  id="summary-recommendations"
                  placeholder="Provide an overall summary of native title considerations and key recommendations for the client..."
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

export default NativeTitleAssessment;