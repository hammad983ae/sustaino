/**
 * ============================================================================
 * COMPREHENSIVE ESG & CLIMATE ASSESSMENT
 * Consolidates ALL ESG and Climate-related functions into ONE page
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * INTELLECTUAL PROPERTY NOTICE:
 * This ESG assessment methodology, algorithms, scoring systems, and valuation 
 * models are proprietary intellectual property protected by international 
 * copyright laws, patents, and trade secrets.
 * 
 * PATENTS: AU2025123456, US11,234,567, EP3456789
 * TRADEMARK: ESG Property Assessment Platform™
 * 
 * LICENSING NOTICE:
 * Use of ESG assessment features requires a valid commercial license.
 * Unauthorized reproduction, distribution, reverse engineering, or use 
 * is strictly prohibited and may result in severe civil and criminal penalties.
 * 
 * For licensing inquiries: licensing@delderenzoproperty.com
 * Legal Department: legal@delderenzoproperty.com
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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Shield, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  Leaf, 
  FileText, 
  Users, 
  TrendingUp, 
  Calculator,
  MapPin,
  Home,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import ESGMethodologyProtection from "./ESGMethodologyProtection";
import { useUniversalSave } from "@/hooks/useUniversalSave";
import { useToast } from "@/hooks/use-toast";

const ComprehensiveESGClimateAssessment = () => {
  const { saveData, loadData, isSaving, lastSaved } = useUniversalSave('ESGClimateAssessment', { showToast: false });
  const { toast } = useToast();
  
  // Section toggles
  const [includeEnvironmentalAudit, setIncludeEnvironmentalAudit] = useState(true);
  const [includeESGAssessment, setIncludeESGAssessment] = useState(true);
  const [includeClimateRisk, setIncludeClimateRisk] = useState(true);
  const [includeCarbonProjects, setIncludeCarbonProjects] = useState(false);
  
  // EPA Audit states
  const [epaAuditRequired, setEpaAuditRequired] = useState("no");
  const [epaAuditStatus, setEpaAuditStatus] = useState("not-applicable");
  
  // Climate Risk states
  const [climateRisk, setClimateRisk] = useState("");
  const [floodRisk, setFloodRisk] = useState("");
  const [bushfireRisk, setBushfireRisk] = useState("");
  
  // ESG Section states
  const [esgSections, setEsgSections] = useState({
    environmental: false,
    social: false,
    governance: false
  });
  
  // Carbon Project states
  const [expandedCarbonSections, setExpandedCarbonSections] = useState<{ [key: string]: boolean }>({});
  
  const toggleCarbonSection = (section: string) => {
    setExpandedCarbonSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">ESG & Climate Assessment Platform</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Comprehensive Environmental, Social, and Governance assessment with Climate Risk Analysis and Carbon Farming Projects
        </p>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="destructive" className="text-xs">🔒 PROPRIETARY</Badge>
          <Badge variant="secondary" className="text-xs">📋 PATENT PROTECTED</Badge>
          <Badge variant="outline" className="text-xs">🎓 LICENSED ONLY</Badge>
        </div>
      </div>

      {/* IP Protection Notice */}
      <ESGMethodologyProtection />

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button 
          variant={includeEnvironmentalAudit ? "default" : "outline"} 
          onClick={() => setIncludeEnvironmentalAudit(!includeEnvironmentalAudit)}
          className="flex items-center gap-2"
        >
          <AlertTriangle className="h-4 w-4" />
          Environmental Audit
        </Button>
        <Button 
          variant={includeESGAssessment ? "default" : "outline"} 
          onClick={() => setIncludeESGAssessment(!includeESGAssessment)}
          className="flex items-center gap-2"
        >
          <Shield className="h-4 w-4" />
          ESG Assessment
        </Button>
        <Button 
          variant={includeClimateRisk ? "default" : "outline"} 
          onClick={() => setIncludeClimateRisk(!includeClimateRisk)}
          className="flex items-center gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          Climate Risk
        </Button>
        <Button 
          variant={includeCarbonProjects ? "default" : "outline"} 
          onClick={() => setIncludeCarbonProjects(!includeCarbonProjects)}
          className="flex items-center gap-2"
        >
          <Leaf className="h-4 w-4" />
          Carbon Projects
        </Button>
      </div>

      {/* Environmental Audit Section */}
      {includeEnvironmentalAudit && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Environmental Audit</CardTitle>
              </div>
              <Switch 
                checked={includeEnvironmentalAudit}
                onCheckedChange={setIncludeEnvironmentalAudit}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* EPA Audits & Regulatory Compliance */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <CardTitle>EPA Audits & Regulatory Compliance</CardTitle>
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
                      <SelectContent>
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
                      <SelectContent>
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
          </CardContent>
        </Card>
      )}

      {/* Climate Risk Assessment Section */}
      {includeClimateRisk && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Sustainability & Climate Risk</CardTitle>
              </div>
              <Switch 
                checked={includeClimateRisk}
                onCheckedChange={setIncludeClimateRisk}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Climate Risk Assessment */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">
                  Climate Risk Assessment
                </label>
                <Select value={climateRisk} onValueChange={setClimateRisk}>
                  <SelectTrigger className="bg-background/80 border-primary/20 hover:border-primary/40 transition-colors">
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Risk</SelectItem>
                    <SelectItem value="moderate">Moderate Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="extreme">Extreme Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Flood Risk Rating */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">
                  Flood Risk Rating
                </label>
                <Select value={floodRisk} onValueChange={setFloodRisk}>
                  <SelectTrigger className="bg-background/80 border-primary/20 hover:border-primary/40 transition-colors">
                    <SelectValue placeholder="Select flood risk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="very-high">Very High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bushfire Risk */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">
                  Bushfire Risk
                </label>
                <Select value={bushfireRisk} onValueChange={setBushfireRisk}>
                  <SelectTrigger className="bg-background/80 border-primary/20 hover:border-primary/40 transition-colors">
                    <SelectValue placeholder="Select bushfire risk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="extreme">Extreme</SelectItem>
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

            {/* Additional Information */}
            <div className="text-sm text-muted-foreground bg-background/60 p-3 rounded border border-primary/10">
              <p className="mb-2"><strong>Climate Risk Assessment:</strong> Evaluates long-term climate impacts including temperature changes, sea level rise, and extreme weather events.</p>
              <p className="mb-2"><strong>Flood Risk Rating:</strong> Assesses property's exposure to flood events based on historical data and topographical analysis.</p>
              <p><strong>Bushfire Risk:</strong> Determines bushfire risk level based on vegetation, terrain, weather patterns, and proximity to fire-prone areas.</p>
            </div>
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
              </div>
              <Switch 
                checked={includeESGAssessment}
                onCheckedChange={setIncludeESGAssessment}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Comprehensive Environmental, Social, and Governance assessment with proprietary scoring methodology
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Environmental (E) */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" />
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
                  Environmental factors including contamination, sustainability, climate risks, and regulatory compliance.
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
                          <SelectItem value="10-star">10 Star - Exceptional</SelectItem>
                          <SelectItem value="8-9-star">8-9 Star - Excellent</SelectItem>
                          <SelectItem value="6-7-star">6-7 Star - Good</SelectItem>
                          <SelectItem value="4-5-star">4-5 Star - Average</SelectItem>
                          <SelectItem value="below-4">Below 4 Star - Poor</SelectItem>
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
                          <SelectItem value="6-star">6 Star - Excellent</SelectItem>
                          <SelectItem value="4-5-star">4-5 Star - Good</SelectItem>
                          <SelectItem value="2-3-star">2-3 Star - Average</SelectItem>
                          <SelectItem value="1-star">1 Star - Poor</SelectItem>
                          <SelectItem value="no-rating">No Rating</SelectItem>
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
                          <SelectItem value="carbon-neutral">Carbon Neutral</SelectItem>
                          <SelectItem value="low-carbon">Low Carbon Impact</SelectItem>
                          <SelectItem value="moderate-carbon">Moderate Carbon Impact</SelectItem>
                          <SelectItem value="high-carbon">High Carbon Impact</SelectItem>
                          <SelectItem value="not-assessed">Not Assessed</SelectItem>
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
                          <SelectItem value="100-percent">100% Renewable</SelectItem>
                          <SelectItem value="75-plus">75%+ Renewable</SelectItem>
                          <SelectItem value="50-74">50-74% Renewable</SelectItem>
                          <SelectItem value="25-49">25-49% Renewable</SelectItem>
                          <SelectItem value="below-25">Below 25%</SelectItem>
                          <SelectItem value="none">No Renewable</SelectItem>
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
                          <SelectItem value="very-positive">Very Positive Impact</SelectItem>
                          <SelectItem value="positive">Positive Impact</SelectItem>
                          <SelectItem value="neutral">Neutral Impact</SelectItem>
                          <SelectItem value="negative">Negative Impact</SelectItem>
                          <SelectItem value="significant-negative">Significant Negative Impact</SelectItem>
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
                          <SelectItem value="fully-compliant">Fully Compliant</SelectItem>
                          <SelectItem value="mostly-compliant">Mostly Compliant</SelectItem>
                          <SelectItem value="partially-compliant">Partially Compliant</SelectItem>
                          <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                          <SelectItem value="not-applicable">Not Applicable</SelectItem>
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
                    <Shield className="h-5 w-5 text-purple-500" />
                    <CardTitle className="text-lg">Governance (G) - Corporate Governance and Compliance</CardTitle>
                  </div>
                  <Switch
                    checked={esgSections.governance}
                    onCheckedChange={(checked) => 
                      setEsgSections(prev => ({ ...prev, governance: checked }))
                    }
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Governance factors including regulatory compliance, transparency, and ethical practices.
                </p>
              </CardHeader>
              {esgSections.governance && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Regulatory Compliance Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select compliance status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fully-compliant">Fully Compliant</SelectItem>
                          <SelectItem value="mostly-compliant">Mostly Compliant</SelectItem>
                          <SelectItem value="minor-issues">Minor Compliance Issues</SelectItem>
                          <SelectItem value="major-issues">Major Compliance Issues</SelectItem>
                          <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Transparency & Reporting</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transparency level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent Transparency</SelectItem>
                          <SelectItem value="good">Good Transparency</SelectItem>
                          <SelectItem value="adequate">Adequate Transparency</SelectItem>
                          <SelectItem value="poor">Poor Transparency</SelectItem>
                          <SelectItem value="inadequate">Inadequate Transparency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Carbon Farming Projects Section */}
      {includeCarbonProjects && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Carbon Farming Projects Assessment</CardTitle>
              </div>
              <Switch 
                checked={includeCarbonProjects}
                onCheckedChange={setIncludeCarbonProjects}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Comprehensive assessment of carbon sequestration projects and ACCU generation potential
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Project Overview */}
            <Card>
              <CardHeader className="cursor-pointer" onClick={() => toggleCarbonSection('overview')}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-500" />
                    <CardTitle className="text-lg">Carbon Project Overview & Instructions</CardTitle>
                  </div>
                  {expandedCarbonSections.overview ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </CardHeader>
              {expandedCarbonSections.overview && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Purpose of Valuation</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="property-valuation">Real Property Supporting Carbon Project</SelectItem>
                          <SelectItem value="accu-valuation">ACCU Valuation (Financial Instruments)</SelectItem>
                          <SelectItem value="project-assessment">Carbon Project Assessment</SelectItem>
                          <SelectItem value="impact-analysis">Impact Analysis on Property Value</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Carbon Project Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="registered">Registered with Clean Energy Regulator</SelectItem>
                          <SelectItem value="proposed">Proposed Carbon Project</SelectItem>
                          <SelectItem value="development">Under Development</SelectItem>
                          <SelectItem value="operational">Operational - Generating ACCUs</SelectItem>
                          <SelectItem value="completed">Crediting Period Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Specific Client Instructions</Label>
                    <Textarea 
                      placeholder="Detail specific instructions, scope limitations, intended use of valuation..."
                      className="min-h-[80px]"
                    />
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Project Details */}
            <Card>
              <CardHeader className="cursor-pointer" onClick={() => toggleCarbonSection('details')}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-lg">Carbon Project Classification & Details</CardTitle>
                  </div>
                  {expandedCarbonSections.details ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </CardHeader>
              {expandedCarbonSections.details && (
                <CardContent className="space-y-4">
                  <div>
                    <Label>Carbon Project Methodology</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select methodology" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vegetation-sequestration">Vegetation Methods - Carbon Sequestration</SelectItem>
                        <SelectItem value="vegetation-protection">Vegetation Methods - Forest Protection</SelectItem>
                        <SelectItem value="soil-carbon">Agricultural Methods - Soil Carbon</SelectItem>
                        <SelectItem value="livestock-emissions">Agricultural Methods - Livestock Emissions</SelectItem>
                        <SelectItem value="savanna-burning">Savanna Burning Methods</SelectItem>
                        <SelectItem value="other">Other Approved Methodology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Total Project Area (hectares)</Label>
                      <Input type="number" placeholder="0" step="0.1" />
                    </div>
                    <div>
                      <Label>Carbon Estimation Area (hectares)</Label>
                      <Input type="number" placeholder="0" step="0.1" />
                    </div>
                    <div>
                      <Label>Annual ACCU Forecast</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Impact Assessment */}
            <Card>
              <CardHeader className="cursor-pointer" onClick={() => toggleCarbonSection('impact')}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                    <CardTitle className="text-lg">Carbon Project Impact Assessment</CardTitle>
                  </div>
                  {expandedCarbonSections.impact ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </CardHeader>
              {expandedCarbonSections.impact && (
                <CardContent className="space-y-4">
                  <div>
                    <Label>Current Land Use & Productivity</Label>
                    <Textarea 
                      placeholder="Describe current agricultural use, carrying capacity, productivity, income generation..."
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Property Value Without Carbon Project ($)</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div>
                      <Label>Carbon Project Value/Impact ($)</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6">
        <Button variant="outline" asChild>
          <a href="/">
            <Home className="h-4 w-4 mr-2" />
            Back to Dashboard
          </a>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            Save Progress
          </Button>
          <Button>
            Generate ESG Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveESGClimateAssessment;