/**
 * ============================================================================
 * ESG & Climate Assessment Component (Valuation Impact Analysis)
 * Separate from Environmental Audit - this is for ESG scoring and climate risk
 * that affects property valuations (add/deduct value)
 * ============================================================================
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Shield, Users, Building, Leaf, CloudRain, Flame, Target, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ESGClimateAssessment = () => {
  const [includeESGAssessment, setIncludeESGAssessment] = useState(true);
  const [includeClimateRisk, setIncludeClimateRisk] = useState(true);
  const { toast } = useToast();

  // ESG Section toggles
  const [esgSections, setEsgSections] = useState({
    environmental: true,
    social: true,
    governance: true
  });

  // Climate risk states
  const [climateRisk, setClimateRisk] = useState("");
  const [floodRisk, setFloodRisk] = useState("");
  const [bushfireRisk, setBushfireRisk] = useState("");

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">ESG & Climate Assessment</h2>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Valuation Impact Analysis
          </Badge>
        </div>
      </div>

      {/* Climate Risk Assessment Section */}
      {includeClimateRisk && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CloudRain className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Climate Risk Assessment</CardTitle>
                <Badge variant="secondary" className="bg-orange-500/10 text-orange-600">
                  Risk-Adjusted Valuation
                </Badge>
              </div>
              <Switch 
                checked={includeClimateRisk}
                onCheckedChange={setIncludeClimateRisk}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Climate risk analysis for property valuation adjustments and long-term investment considerations.
            </p>
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
                    <SelectItem value="low">Low Risk (+0% to +2% value)</SelectItem>
                    <SelectItem value="moderate">Moderate Risk (-2% to -5% value)</SelectItem>
                    <SelectItem value="high">High Risk (-5% to -10% value)</SelectItem>
                    <SelectItem value="extreme">Extreme Risk (-10%+ value)</SelectItem>
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
      )}

      {/* ESG Assessment Section */}
      {includeESGAssessment && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">ESG Assessment Framework</CardTitle>
                <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                  Value Enhancement
                </Badge>
              </div>
              <Switch 
                checked={includeESGAssessment}
                onCheckedChange={setIncludeESGAssessment}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Environmental, Social, and Governance assessment with proprietary scoring methodology for valuation adjustments
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Environmental (E) */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-500" />
                    <CardTitle className="text-lg">Environmental (E) - Environmental Impact Assessment</CardTitle>
                  </div>
                  <Switch
                    checked={esgSections.environmental}
                    onCheckedChange={(checked) => 
                      setEsgSections(prev => ({ ...prev, environmental: checked }))
                    }
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Environmental factors including energy efficiency, sustainability, and environmental performance.
                </p>
              </CardHeader>
              {esgSections.environmental && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Energy Efficiency Rating</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10-star">10 Star - Exceptional (+5% value)</SelectItem>
                          <SelectItem value="8-9-star">8-9 Star - Excellent (+3% value)</SelectItem>
                          <SelectItem value="6-7-star">6-7 Star - Good (+1% value)</SelectItem>
                          <SelectItem value="4-5-star">4-5 Star - Average (neutral)</SelectItem>
                          <SelectItem value="below-4">Below 4 Star - Poor (-2% value)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Water Efficiency Rating</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6-star">6 Star - Excellent (+2% value)</SelectItem>
                          <SelectItem value="4-5-star">4-5 Star - Good (+1% value)</SelectItem>
                          <SelectItem value="2-3-star">2-3 Star - Average (neutral)</SelectItem>
                          <SelectItem value="1-star">1 Star - Poor (-1% value)</SelectItem>
                          <SelectItem value="no-rating">No Rating (-0.5% value)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Carbon Footprint Assessment</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select assessment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="carbon-neutral">Carbon Neutral (+3% value)</SelectItem>
                          <SelectItem value="low-carbon">Low Carbon Impact (+1% value)</SelectItem>
                          <SelectItem value="moderate-carbon">Moderate Carbon Impact (neutral)</SelectItem>
                          <SelectItem value="high-carbon">High Carbon Impact (-2% value)</SelectItem>
                          <SelectItem value="not-assessed">Not Assessed (-0.5% value)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Renewable Energy Usage</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select usage level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100-percent">100% Renewable (+4% value)</SelectItem>
                          <SelectItem value="75-plus">75%+ Renewable (+2% value)</SelectItem>
                          <SelectItem value="50-74">50-74% Renewable (+1% value)</SelectItem>
                          <SelectItem value="25-49">25-49% Renewable (neutral)</SelectItem>
                          <SelectItem value="below-25">Below 25% (-1% value)</SelectItem>
                          <SelectItem value="none">No Renewable (-2% value)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Social (S) */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-lg">Social (S) - Community and Social Impact</CardTitle>
                  </div>
                  <Switch
                    checked={esgSections.social}
                    onCheckedChange={(checked) => 
                      setEsgSections(prev => ({ ...prev, social: checked }))
                    }
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Social factors including community impact, accessibility, and socio-economic considerations.
                </p>
              </CardHeader>
              {esgSections.social && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Community Impact Assessment</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select impact level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="very-positive">Very Positive Impact (+3% value)</SelectItem>
                          <SelectItem value="positive">Positive Impact (+1% value)</SelectItem>
                          <SelectItem value="neutral">Neutral Impact (neutral)</SelectItem>
                          <SelectItem value="negative">Negative Impact (-2% value)</SelectItem>
                          <SelectItem value="significant-negative">Significant Negative Impact (-5% value)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Accessibility Compliance</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select compliance level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fully-compliant">Fully Compliant (+2% value)</SelectItem>
                          <SelectItem value="mostly-compliant">Mostly Compliant (+1% value)</SelectItem>
                          <SelectItem value="partially-compliant">Partially Compliant (-1% value)</SelectItem>
                          <SelectItem value="non-compliant">Non-Compliant (-3% value)</SelectItem>
                          <SelectItem value="not-applicable">Not Applicable (neutral)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Affordable Housing Contribution</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select contribution level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="significant">Significant Contribution (+2% value)</SelectItem>
                          <SelectItem value="moderate">Moderate Contribution (+1% value)</SelectItem>
                          <SelectItem value="minimal">Minimal Contribution (neutral)</SelectItem>
                          <SelectItem value="none">No Contribution (-0.5% value)</SelectItem>
                          <SelectItem value="not-applicable">Not Applicable (neutral)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Health & Wellbeing Features</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select features level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="comprehensive">Comprehensive Features (+3% value)</SelectItem>
                          <SelectItem value="good">Good Features (+1% value)</SelectItem>
                          <SelectItem value="basic">Basic Features (neutral)</SelectItem>
                          <SelectItem value="limited">Limited Features (-1% value)</SelectItem>
                          <SelectItem value="none">No Features (-2% value)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Governance (G) */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-purple-500" />
                    <CardTitle className="text-lg">Governance (G) - Management and Compliance</CardTitle>
                  </div>
                  <Switch
                    checked={esgSections.governance}
                    onCheckedChange={(checked) => 
                      setEsgSections(prev => ({ ...prev, governance: checked }))
                    }
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Governance factors including management quality, transparency, and regulatory compliance.
                </p>
              </CardHeader>
              {esgSections.governance && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Management Quality</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select quality level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent Management (+2% value)</SelectItem>
                          <SelectItem value="good">Good Management (+1% value)</SelectItem>
                          <SelectItem value="average">Average Management (neutral)</SelectItem>
                          <SelectItem value="poor">Poor Management (-2% value)</SelectItem>
                          <SelectItem value="concerning">Concerning Management (-4% value)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Transparency & Disclosure</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transparency level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent Transparency (+1% value)</SelectItem>
                          <SelectItem value="good">Good Transparency (neutral)</SelectItem>
                          <SelectItem value="limited">Limited Transparency (-1% value)</SelectItem>
                          <SelectItem value="poor">Poor Transparency (-2% value)</SelectItem>
                          <SelectItem value="concerning">Concerning Issues (-3% value)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Regulatory Compliance History</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select compliance history" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent Track Record (+1% value)</SelectItem>
                          <SelectItem value="good">Good Compliance (neutral)</SelectItem>
                          <SelectItem value="minor-issues">Minor Issues (-1% value)</SelectItem>
                          <SelectItem value="significant-issues">Significant Issues (-3% value)</SelectItem>
                          <SelectItem value="major-violations">Major Violations (-5% value)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Financial Transparency</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transparency level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fully-transparent">Fully Transparent (+1% value)</SelectItem>
                          <SelectItem value="mostly-transparent">Mostly Transparent (neutral)</SelectItem>
                          <SelectItem value="limited-disclosure">Limited Disclosure (-1% value)</SelectItem>
                          <SelectItem value="poor-disclosure">Poor Disclosure (-2% value)</SelectItem>
                          <SelectItem value="concerning">Concerning Issues (-3% value)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* ESG Score Calculator */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <CardTitle>ESG Score & Valuation Impact</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Calculate ESG Impact on Valuation</span>
                  <Button variant="outline" size="sm">
                    Calculate ESG Score
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  ESG assessment will calculate total valuation adjustment based on environmental, social, and governance factors.
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ESGClimateAssessment;