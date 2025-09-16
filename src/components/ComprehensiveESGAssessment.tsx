/**
 * ============================================================================
 * COMPREHENSIVE ESG ASSESSMENT - SINGLE PAGE
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * This comprehensive ESG assessment methodology consolidates all Environmental,
 * Social, and Governance analysis into a single page for PropertyPRO reports.
 * ============================================================================
 */

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { 
  Leaf, 
  TrendingUp, 
  Users, 
  Shield, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Calculator,
  FileText,
  BarChart3,
  Zap,
  Save
} from "lucide-react";
import { toast } from "sonner";

export default function ComprehensiveESGAssessment() {
  const [includeSection, setIncludeSection] = useState(true);
  
  // Environmental data
  const [energyRating, setEnergyRating] = useState("");
  const [carbonFootprint, setCarbonFootprint] = useState("");
  const [documents, setDocuments] = useState({
    energyCertificate: null,
    environmentalReport: null
  });
  
  // Social & Governance data
  const [socialImpact, setSocialImpact] = useState("");
  const [governanceScore, setGovernanceScore] = useState("");
  
  // ESG Summary data
  const [environmentalScore, setEnvironmentalScore] = useState("");
  const [socialScore, setSocialScore] = useState("");
  const [governanceScoreNum, setGovernanceScoreNum] = useState("");
  const [overallScore, setOverallScore] = useState("");
  const [esgRating, setEsgRating] = useState("");
  const [performanceTrend, setPerformanceTrend] = useState("");
  const [improvements, setImprovements] = useState("");
  const [valuationImpact, setValuationImpact] = useState("");

  const handleSave = () => {
    toast.success("Comprehensive ESG Assessment saved successfully!");
  };

  const calculateOverallScore = () => {
    const env = parseFloat(environmentalScore) || 0;
    const soc = parseFloat(socialScore) || 0;
    const gov = parseFloat(governanceScoreNum) || 0;
    
    if (env && soc && gov) {
      const overall = Math.round((env + soc + gov) / 3);
      setOverallScore(overall.toString());
    }
  };

  const handleFileUpload = (documentType: string, file: File) => {
    setDocuments(prev => ({ ...prev, [documentType]: file }));
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">Comprehensive ESG Assessment</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleSave} size="sm" variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Label htmlFor="include-esg">Include</Label>
          <Switch 
            id="include-esg" 
            checked={includeSection}
            onCheckedChange={setIncludeSection}
          />
        </div>
      </div>

      {includeSection && (
        <div className="space-y-6">
          {/* Environmental Impact Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Leaf className="w-5 h-5 mr-2 text-green-600" />
                Environmental Impact Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Document Upload Areas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                     onClick={() => document.getElementById('energyCertificate')?.click()}>
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">Energy Certificate</p>
                  <p className="text-xs text-muted-foreground mb-4">Upload building energy rating certificate</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('energyCertificate', e.target.files[0])}
                    className="hidden"
                    id="energyCertificate"
                  />
                  <Button variant="outline" size="sm" type="button">
                    {documents.energyCertificate ? 'Change File' : 'Choose File'}
                  </Button>
                  {documents.energyCertificate && (
                    <p className="text-xs text-green-600 mt-2">✓ {documents.energyCertificate.name}</p>
                  )}
                </div>

                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                     onClick={() => document.getElementById('environmentalReport')?.click()}>
                  <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">Environmental Report</p>
                  <p className="text-xs text-muted-foreground mb-4">Upload environmental impact assessment</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('environmentalReport', e.target.files[0])}
                    className="hidden"
                    id="environmentalReport"
                  />
                  <Button variant="outline" size="sm" type="button">
                    {documents.environmentalReport ? 'Change File' : 'Choose File'}
                  </Button>
                  {documents.environmentalReport && (
                    <p className="text-xs text-green-600 mt-2">✓ {documents.environmentalReport.name}</p>
                  )}
                </div>
              </div>

              {/* Environmental Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="energyRating">Energy Rating</Label>
                  <Select value={energyRating} onValueChange={setEnergyRating}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select energy rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6-star">6 Star</SelectItem>
                      <SelectItem value="5-star">5 Star</SelectItem>
                      <SelectItem value="4-star">4 Star</SelectItem>
                      <SelectItem value="3-star">3 Star</SelectItem>
                      <SelectItem value="2-star">2 Star</SelectItem>
                      <SelectItem value="1-star">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="carbonFootprint">Carbon Footprint (tCO2e/year)</Label>
                  <Input
                    id="carbonFootprint"
                    value={carbonFootprint}
                    onChange={(e) => setCarbonFootprint(e.target.value)}
                    placeholder="Enter annual carbon emissions"
                  />
                </div>
                <div>
                  <Label htmlFor="environmental-score">Environmental Score (0-100)</Label>
                  <Input 
                    id="environmental-score" 
                    placeholder="Environmental score"
                    value={environmentalScore}
                    onChange={(e) => setEnvironmentalScore(e.target.value)}
                    onBlur={calculateOverallScore}
                    type="number"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              {/* AI Analysis Progress */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-blue-600" />
                    AI Environmental Analysis
                  </h4>
                  <span className="text-sm text-blue-600">85% Complete</span>
                </div>
                <Progress value={85} className="w-full mb-2" />
                <p className="text-sm text-muted-foreground">
                  Analyzing energy efficiency, carbon impact, and environmental compliance...
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Social & Governance Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Social & Governance Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="socialImpact">Social Impact Score</Label>
                  <Select value={socialImpact} onValueChange={setSocialImpact}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select social impact level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent (9-10)</SelectItem>
                      <SelectItem value="good">Good (7-8)</SelectItem>
                      <SelectItem value="fair">Fair (5-6)</SelectItem>
                      <SelectItem value="poor">Poor (1-4)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="governanceScore">Governance Rating</Label>
                  <Select value={governanceScore} onValueChange={setGovernanceScore}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select governance rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a-plus">A+ (Exceptional)</SelectItem>
                      <SelectItem value="a">A (Strong)</SelectItem>
                      <SelectItem value="b">B (Adequate)</SelectItem>
                      <SelectItem value="c">C (Needs Improvement)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="social-score">Social Score (0-100)</Label>
                  <Input 
                    id="social-score" 
                    placeholder="Social score"
                    value={socialScore}
                    onChange={(e) => setSocialScore(e.target.value)}
                    onBlur={calculateOverallScore}
                    type="number"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="governance-score-num">Governance Score (0-100)</Label>
                  <Input 
                    id="governance-score-num" 
                    placeholder="Governance score"
                    value={governanceScoreNum}
                    onChange={(e) => setGovernanceScoreNum(e.target.value)}
                    onBlur={calculateOverallScore}
                    type="number"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              {/* AI Analysis Progress */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Social & Governance Analysis Complete
                  </h4>
                  <span className="text-sm text-green-600">100% Complete</span>
                </div>
                <Progress value={100} className="w-full mb-2" />
                <p className="text-sm text-muted-foreground">
                  Community impact, accessibility, and governance structures analyzed.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* ESG Market Premium Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                ESG Market Premium Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-secondary/50 rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Sustainability Premium</div>
                  <div className="text-2xl font-bold text-green-600">+12.5%</div>
                  <div className="text-xs text-muted-foreground">Above market rate</div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-1">ESG Risk Discount</div>
                  <div className="text-2xl font-bold text-red-600">-3.2%</div>
                  <div className="text-xs text-muted-foreground">Risk adjustment</div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Net ESG Impact</div>
                  <div className="text-2xl font-bold text-blue-600">+9.3%</div>
                  <div className="text-xs text-muted-foreground">Value adjustment</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overall ESG Assessment Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overall ESG Assessment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overall Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="overall-esg-score">Overall ESG Score</Label>
                  <Input 
                    id="overall-esg-score" 
                    placeholder="Composite ESG score"
                    value={overallScore}
                    onChange={(e) => setOverallScore(e.target.value)}
                    type="number"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <Label htmlFor="esg-rating">ESG Rating</Label>
                  <Select value={esgRating} onValueChange={setEsgRating}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
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
                  <Label htmlFor="esg-performance-trend">ESG Performance Trend</Label>
                  <Select value={performanceTrend} onValueChange={setPerformanceTrend}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trend" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      <SelectItem value="improving">Improving</SelectItem>
                      <SelectItem value="stable">Stable</SelectItem>
                      <SelectItem value="declining">Declining</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* ESG Improvement Recommendations */}
              <div>
                <Label htmlFor="esg-improvement-recommendations">ESG Improvement Recommendations</Label>
                <Textarea
                  id="esg-improvement-recommendations"
                  placeholder="Provide specific recommendations for improving ESG performance across environmental, social, and governance dimensions..."
                  value={improvements}
                  onChange={(e) => setImprovements(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              {/* Impact on Property Valuation */}
              <div>
                <Label htmlFor="impact-property-valuation">Impact on Property Valuation</Label>
                <Textarea
                  id="impact-property-valuation"
                  placeholder="Explain how ESG factors impact property valuation, marketability, investment attractiveness, and future value trends..."
                  value={valuationImpact}
                  onChange={(e) => setValuationImpact(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {/* AI Market Analysis */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <Calculator className="h-4 w-4 mr-2 text-blue-600" />
                  AI Market Analysis Summary
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on comparable sales and ESG metrics, this property demonstrates strong sustainability credentials 
                  that command a market premium. Key value drivers include energy efficiency, location accessibility, 
                  and governance compliance.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Detailed Analysis
                  </Button>
                  <Button size="sm" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate ESG Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}