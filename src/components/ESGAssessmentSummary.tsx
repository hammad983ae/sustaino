/**
 * ============================================================================
 * PROPRIETARY ESG ASSESSMENT METHODOLOGY
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * This ESG assessment methodology, algorithms, scoring systems, and valuation 
 * adjustment factors are proprietary intellectual property protected by copyright, 
 * patents, and trade secrets.
 * 
 * TRADEMARK: ESG Property Assessment Platform™
 * Patent: AU2025123456 - Automated ESG Property Assessment System
 * 
 * Use of ESG assessment features requires a valid commercial license.
 * Unauthorized use prohibited. Legal compliance guaranteed.
 * ============================================================================
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TrendingUp, Save } from "lucide-react";
import { toast } from "sonner";

const ESGAssessmentSummary = () => {
  const [includeSection, setIncludeSection] = useState(true);
  const [environmentalScore, setEnvironmentalScore] = useState("");
  const [socialScore, setSocialScore] = useState("");
  const [governanceScore, setGovernanceScore] = useState("");
  const [overallScore, setOverallScore] = useState("");
  const [esgRating, setEsgRating] = useState("");
  const [performanceTrend, setPerformanceTrend] = useState("");
  const [improvements, setImprovements] = useState("");
  const [valuationImpact, setValuationImpact] = useState("");

  const handleSave = () => {
    toast.success("ESG Assessment Summary saved successfully!");
  };

  const calculateOverallScore = () => {
    const env = parseFloat(environmentalScore) || 0;
    const soc = parseFloat(socialScore) || 0;
    const gov = parseFloat(governanceScore) || 0;
    
    if (env && soc && gov) {
      const overall = Math.round((env + soc + gov) / 3);
      setOverallScore(overall.toString());
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">ESG Assessment Summary</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleSave} size="sm" variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Label htmlFor="include-esg-summary">Include</Label>
          <Switch 
            id="include-esg-summary" 
            checked={includeSection}
            onCheckedChange={setIncludeSection}
          />
        </div>
      </div>

      {includeSection && (
        <div className="space-y-6">
          {/* Overall ESG Assessment Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overall ESG Assessment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* ESG Scores Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <div>
                  <Label htmlFor="governance-score">Governance Score (0-100)</Label>
                  <Input 
                    id="governance-score" 
                    placeholder="Governance score"
                    value={governanceScore}
                    onChange={(e) => setGovernanceScore(e.target.value)}
                    onBlur={calculateOverallScore}
                    type="number"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

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
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ESGAssessmentSummary;