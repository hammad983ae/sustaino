/**
 * ============================================================================
 * CLIMATE RISK ASSESSMENT METHODOLOGY
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Climate risk analysis algorithms and valuation methodologies are proprietary
 * intellectual property protected by international copyright laws.
 * ============================================================================
 */
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";

interface ClimateRiskFactor {
  id: string;
  name: string;
  weight: number;
  riskLevel: number;
  description: string;
}

export default function ClimateRiskAssessment() {
  const [includeAssessment, setIncludeAssessment] = useState(true);
  const [basePropertyValue, setBasePropertyValue] = useState<number>(0);
  const [sensitivityCoefficient, setSensitivityCoefficient] = useState<number>(0.15);
  const [benchmarkRiskScore, setBenchmarkRiskScore] = useState<number>(0.5);
  
  const [riskFactors, setRiskFactors] = useState<ClimateRiskFactor[]>([
    {
      id: "water_scarcity",
      name: "Water Scarcity & Water Stress",
      weight: 0.4,
      riskLevel: 0,
      description: "Regional drought frequency, water availability, irrigation access"
    },
    {
      id: "temperature_extremes",
      name: "Temperature Extremes & Heat Stress",
      weight: 0.3,
      riskLevel: 0,
      description: "Heat waves, frost risk, temperature variability impacts"
    },
    {
      id: "extreme_weather",
      name: "Extreme Weather Events",
      weight: 0.2,
      riskLevel: 0,
      description: "Floods, cyclones, storms, hail events frequency and severity"
    },
    {
      id: "climate_resilience",
      name: "Climate Resilience & Adaptation",
      weight: 0.1,
      riskLevel: 0,
      description: "Infrastructure resilience, crop variety adaptation, mitigation measures"
    }
  ]);

  const [calculatedResults, setCalculatedResults] = useState({
    climateRiskScore: 0,
    adjustedPropertyValue: 0,
    riskDifferential: 0,
    valueImpact: 0,
    riskRating: "Low"
  });

  // Climate Risk Score Calculation
  const calculateClimateRiskScore = () => {
    return riskFactors.reduce((total, factor) => total + (factor.weight * factor.riskLevel), 0);
  };

  // Property Value Adjustment Formula
  const calculateAdjustedPropertyValue = (riskScore: number) => {
    return basePropertyValue * (1 - sensitivityCoefficient * riskScore);
  };

  // Risk Differential Calculation
  const calculateRiskDifferential = (riskScore: number) => {
    return benchmarkRiskScore > 0 ? riskScore / benchmarkRiskScore : 1;
  };

  // Comparative Value Calculation
  const calculateComparativeValue = (riskDifferential: number) => {
    return basePropertyValue * (1 - sensitivityCoefficient * riskDifferential);
  };

  // Risk Rating Determination
  const getRiskRating = (score: number) => {
    if (score <= 0.2) return "Very Low";
    if (score <= 0.4) return "Low";
    if (score <= 0.6) return "Moderate";
    if (score <= 0.8) return "High";
    return "Very High";
  };

  // Update calculations when values change
  useEffect(() => {
    const riskScore = calculateClimateRiskScore();
    const adjustedValue = calculateAdjustedPropertyValue(riskScore);
    const riskDiff = calculateRiskDifferential(riskScore);
    const valueImpact = basePropertyValue - adjustedValue;
    
    setCalculatedResults({
      climateRiskScore: riskScore,
      adjustedPropertyValue: adjustedValue,
      riskDifferential: riskDiff,
      valueImpact: valueImpact,
      riskRating: getRiskRating(riskScore)
    });
  }, [riskFactors, basePropertyValue, sensitivityCoefficient, benchmarkRiskScore]);

  const updateRiskFactor = (id: string, field: keyof ClimateRiskFactor, value: number) => {
    setRiskFactors(factors => 
      factors.map(factor => 
        factor.id === id ? { ...factor, [field]: value } : factor
      )
    );
  };

  const getRiskColor = (rating: string) => {
    switch (rating) {
      case "Very Low": return "text-green-600";
      case "Low": return "text-green-500";
      case "Moderate": return "text-yellow-500";
      case "High": return "text-orange-500";
      case "Very High": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getRiskIcon = (rating: string) => {
    if (rating === "Very Low" || rating === "Low") return <TrendingDown className="h-4 w-4" />;
    if (rating === "Moderate") return <Calculator className="h-4 w-4" />;
    return <AlertTriangle className="h-4 w-4" />;
  };

  if (!includeAssessment) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Climate Risk Assessment</CardTitle>
          <Switch
            checked={includeAssessment}
            onCheckedChange={setIncludeAssessment}
            className="ml-auto"
          />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Climate risk assessment excluded from analysis</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with Toggle */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calculator className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Climate Risk Assessment</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Comprehensive climate risk evaluation with property value impact analysis
                </p>
              </div>
            </div>
            <Switch
              checked={includeAssessment}
              onCheckedChange={setIncludeAssessment}
            />
          </div>
        </CardHeader>
      </Card>

      {/* Quick Results Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-gradient-to-br from-background to-muted/20">
          <CardContent className="p-4 text-center">
            <div className="text-sm font-medium text-muted-foreground mb-1">Risk Score</div>
            <div className="text-xl font-bold">{calculatedResults.climateRiskScore.toFixed(3)}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-background to-muted/20">
          <CardContent className="p-4 text-center">
            <div className="text-sm font-medium text-muted-foreground mb-1">Risk Rating</div>
            <div className={`text-xl font-bold ${getRiskColor(calculatedResults.riskRating)}`}>
              {calculatedResults.riskRating}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-background to-muted/20">
          <CardContent className="p-4 text-center">
            <div className="text-sm font-medium text-muted-foreground mb-1">Value Impact</div>
            <div className="text-lg font-bold text-red-600">
              -${(calculatedResults.valueImpact / 1000).toFixed(0)}k
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-background to-muted/20">
          <CardContent className="p-4 text-center">
            <div className="text-sm font-medium text-muted-foreground mb-1">vs Benchmark</div>
            <div className="text-xl font-bold">
              {calculatedResults.riskDifferential.toFixed(1)}x
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessment Parameters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Assessment Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="baseValue" className="text-sm font-medium">Base Property Value ($)</Label>
              <Input
                id="baseValue"
                type="number"
                value={basePropertyValue}
                onChange={(e) => setBasePropertyValue(Number(e.target.value))}
                placeholder="10000000"
                className="h-9"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sensitivity" className="text-sm font-medium">Sensitivity Coefficient (β)</Label>
              <Input
                id="sensitivity"
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={sensitivityCoefficient}
                onChange={(e) => setSensitivityCoefficient(Number(e.target.value))}
                placeholder="0.15"
                className="h-9"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="benchmark" className="text-sm font-medium">Benchmark Risk Score</Label>
              <Input
                id="benchmark"
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={benchmarkRiskScore}
                onChange={(e) => setBenchmarkRiskScore(Number(e.target.value))}
                placeholder="0.5"
                className="h-9"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Climate Risk Factors */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Climate Risk Factors</CardTitle>
          <p className="text-sm text-muted-foreground">
            Risk levels: 0.0 = No Risk, 0.5 = Moderate Risk, 1.0 = Maximum Risk
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {riskFactors.map((factor, index) => (
              <div key={factor.id} className="p-4 bg-muted/30 rounded-lg border border-border/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                      <h4 className="font-medium text-sm">{factor.name}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">{factor.description}</p>
                  </div>
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Weight: {(factor.weight * 100).toFixed(0)}%
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Weight (W_j)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={factor.weight}
                      onChange={(e) => updateRiskFactor(factor.id, 'weight', Number(e.target.value))}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Risk Level (R_j)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={factor.riskLevel}
                      onChange={(e) => updateRiskFactor(factor.id, 'riskLevel', Number(e.target.value))}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Calculation Results */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded">
              <Calculator className="h-4 w-4 text-primary" />
            </div>
            Detailed Risk Calculations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Compact Formula Section */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-sm font-medium">Risk Score Formula</h4>
                <Badge variant="outline" className={`text-xs ${getRiskColor(calculatedResults.riskRating)}`}>
                  {getRiskIcon(calculatedResults.riskRating)}
                  {calculatedResults.riskRating}
                </Badge>
              </div>
              <div className="bg-muted/50 p-3 rounded border text-xs font-mono">
                Climate Risk Score = Σ(W_j × R_j)<br/>
                <span className="font-bold">= {calculatedResults.climateRiskScore.toFixed(4)}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Value Adjustment</h4>
              <div className="bg-muted/50 p-3 rounded border text-xs font-mono space-y-1">
                <div>V_adj = V_base × (1 - β × Risk)</div>
                <div>= ${basePropertyValue.toLocaleString()} × (1 - {sensitivityCoefficient} × {calculatedResults.climateRiskScore.toFixed(4)})</div>
                <div className="font-bold">= ${calculatedResults.adjustedPropertyValue.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Benchmark Comparison */}
          <div className="bg-accent/20 p-3 rounded border">
            <h4 className="text-sm font-medium mb-2">Benchmark Comparison</h4>
            <div className="text-xs font-mono">
              Risk Differential = {calculatedResults.climateRiskScore.toFixed(4)} / {benchmarkRiskScore} = <span className="font-bold">{calculatedResults.riskDifferential.toFixed(4)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment Commentary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Risk Assessment Commentary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="riskAnalysis" className="text-sm font-medium">Climate Risk Analysis & Regional Comparison</Label>
            <Textarea
              id="riskAnalysis"
              placeholder="Provide detailed analysis of climate risks specific to this location, comparison with benchmark properties, and regional climate projections..."
              rows={3}
              className="text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mitigationMeasures" className="text-sm font-medium">Climate Risk Mitigation Measures</Label>
            <Textarea
              id="mitigationMeasures"
              placeholder="Detail existing and recommended climate adaptation measures, infrastructure improvements, and risk management strategies..."
              rows={3}
              className="text-sm"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}