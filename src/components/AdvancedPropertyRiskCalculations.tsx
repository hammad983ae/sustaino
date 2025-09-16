/**
 * ============================================================================
 * ADVANCED PROPERTY RISK CALCULATIONS
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Advanced Property Risk Calculations with Enhanced Social and Government Factors
 * ============================================================================
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface AdvancedRiskData {
  // Sustainability Ratings & Weights
  longTermRisk: string;
  energyImpact: string;
  nabesRating: string;
  greenStarRating: string;
  
  // Energy Efficiency Features
  solarPanels: string;
  insulation: string;
  ledLighting: string;
  smartSystems: string;
  energyManagement: string;
  
  // Water Conservation Strategies
  educationIncentives: string;
  greyWaterRecycling: string;
  lowFlowFixtures: string;
  localResourceLandscaping: string;
  wasteMixManagement: string;
  irrigationEfficiency: string;
  
  // Waste Management Strategies
  recyclingPrograms: string;
  composting: string;
  wasteReduction: string;
  hazardousWasteHandling: string;
  constructionWasteManagement: string;
  
  // Sustainable Materials & Construction
  ecoFriendlyMaterialsUsed: string;
  totalMaterialsAssessed: string;
  
  // Climate Risk Assessments
  soilLevelRise: string;
  shoreLineRisk: string;
  stormThreshold: string;
  bushThreshold: string;
  cycloneThreshold: string;
  droughtThreshold: string;
  
  // Financial Risk Factors
  impactsSpreads: string;
  marketVolatility: string;
  maximumLendingValues: string;
  overallRiskWeighted: string;
  esgScoreIndex: string;
  
  // Enhanced Social Factors (15 factors)
  communityImpact: string;
  socialEquity: string;
  accessibilityCompliance: string;
  healthWellbeing: string;
  affordableHousing: string;
  localEmployment: string;
  culturalHeritage: string;
  educationFacilities: string;
  healthcareAccess: string;
  publicTransport: string;
  crimeRates: string;
  demographicDiversity: string;
  tenantSatisfaction: string;
  socialCohesion: string;
  communityEngagement: string;
  
  // Enhanced Government/Governance Factors (15 factors)
  regulatoryCompliance: string;
  policyAlignment: string;
  planningCompliance: string;
  buildingCodeCompliance: string;
  taxTransparency: string;
  antiCorruption: string;
  cybersecurity: string;
  dataPrivacy: string;
  boardDiversity: string;
  stakeholderEngagement: string;
  riskManagement: string;
  ethicalPractices: string;
  reportingTransparency: string;
  auditCompliance: string;
  legalFramework: string;
}

export const AdvancedPropertyRiskCalculations: React.FC = () => {
  const [formData, setFormData] = useState<AdvancedRiskData>({
    longTermRisk: '5',
    energyImpact: '3',
    nabesRating: '4',
    greenStarRating: '3',
    solarPanels: '8',
    insulation: '7',
    ledLighting: '9',
    smartSystems: '6',
    energyManagement: '7',
    educationIncentives: '5',
    greyWaterRecycling: '4',
    lowFlowFixtures: '8',
    localResourceLandscaping: '6',
    wasteMixManagement: '5',
    irrigationEfficiency: '7',
    recyclingPrograms: '8',
    composting: '6',
    wasteReduction: '7',
    hazardousWasteHandling: '9',
    constructionWasteManagement: '6',
    ecoFriendlyMaterialsUsed: '75',
    totalMaterialsAssessed: '100',
    soilLevelRise: '3',
    shoreLineRisk: '2',
    stormThreshold: '4',
    bushThreshold: '5',
    cycloneThreshold: '2',
    droughtThreshold: '6',
    impactsSpreads: '45',
    marketVolatility: '35',
    maximumLendingValues: '75',
    overallRiskWeighted: '55',
    esgScoreIndex: '425',
    // Enhanced Social Factors
    communityImpact: '8',
    socialEquity: '7',
    accessibilityCompliance: '9',
    healthWellbeing: '8',
    affordableHousing: '6',
    localEmployment: '7',
    culturalHeritage: '5',
    educationFacilities: '8',
    healthcareAccess: '7',
    publicTransport: '6',
    crimeRates: '8',
    demographicDiversity: '7',
    tenantSatisfaction: '8',
    socialCohesion: '6',
    communityEngagement: '7',
    // Enhanced Government/Governance Factors
    regulatoryCompliance: '9',
    policyAlignment: '8',
    planningCompliance: '9',
    buildingCodeCompliance: '10',
    taxTransparency: '8',
    antiCorruption: '9',
    cybersecurity: '7',
    dataPrivacy: '8',
    boardDiversity: '6',
    stakeholderEngagement: '7',
    riskManagement: '8',
    ethicalPractices: '9',
    reportingTransparency: '8',
    auditCompliance: '9',
    legalFramework: '9'
  });

  const [calculatedResults, setCalculatedResults] = useState<any>(null);

  const calculateAdvancedRiskAssessment = () => {
    // Environmental Score (30%)
    const sustainabilityScore = (
      parseFloat(formData.longTermRisk) + 
      parseFloat(formData.energyImpact) + 
      parseFloat(formData.nabesRating) + 
      parseFloat(formData.greenStarRating)
    ) / 4;

    const energyEfficiencyScore = (
      parseFloat(formData.solarPanels) + 
      parseFloat(formData.insulation) + 
      parseFloat(formData.ledLighting) + 
      parseFloat(formData.smartSystems) + 
      parseFloat(formData.energyManagement)
    ) / 5;

    const waterConservationScore = (
      parseFloat(formData.educationIncentives) + 
      parseFloat(formData.greyWaterRecycling) + 
      parseFloat(formData.lowFlowFixtures) + 
      parseFloat(formData.localResourceLandscaping) + 
      parseFloat(formData.wasteMixManagement) + 
      parseFloat(formData.irrigationEfficiency)
    ) / 6;

    const wasteManagementScore = (
      parseFloat(formData.recyclingPrograms) + 
      parseFloat(formData.composting) + 
      parseFloat(formData.wasteReduction) + 
      parseFloat(formData.hazardousWasteHandling) + 
      parseFloat(formData.constructionWasteManagement)
    ) / 5;

    const sustainableMaterialsScore = (parseFloat(formData.ecoFriendlyMaterialsUsed) / parseFloat(formData.totalMaterialsAssessed)) * 10;

    const environmentalScore = (
      sustainabilityScore * 0.2 + 
      energyEfficiencyScore * 0.25 + 
      waterConservationScore * 0.2 + 
      wasteManagementScore * 0.2 + 
      sustainableMaterialsScore * 0.15
    );

    // Enhanced Social Score (35%)
    const socialFactors = [
      parseFloat(formData.communityImpact),
      parseFloat(formData.socialEquity),
      parseFloat(formData.accessibilityCompliance),
      parseFloat(formData.healthWellbeing),
      parseFloat(formData.affordableHousing),
      parseFloat(formData.localEmployment),
      parseFloat(formData.culturalHeritage),
      parseFloat(formData.educationFacilities),
      parseFloat(formData.healthcareAccess),
      parseFloat(formData.publicTransport),
      parseFloat(formData.crimeRates),
      parseFloat(formData.demographicDiversity),
      parseFloat(formData.tenantSatisfaction),
      parseFloat(formData.socialCohesion),
      parseFloat(formData.communityEngagement)
    ];
    const socialScore = socialFactors.reduce((a, b) => a + b, 0) / socialFactors.length;

    // Enhanced Governance Score (35%)
    const governanceFactors = [
      parseFloat(formData.regulatoryCompliance),
      parseFloat(formData.policyAlignment),
      parseFloat(formData.planningCompliance),
      parseFloat(formData.buildingCodeCompliance),
      parseFloat(formData.taxTransparency),
      parseFloat(formData.antiCorruption),
      parseFloat(formData.cybersecurity),
      parseFloat(formData.dataPrivacy),
      parseFloat(formData.boardDiversity),
      parseFloat(formData.stakeholderEngagement),
      parseFloat(formData.riskManagement),
      parseFloat(formData.ethicalPractices),
      parseFloat(formData.reportingTransparency),
      parseFloat(formData.auditCompliance),
      parseFloat(formData.legalFramework)
    ];
    const governanceScore = governanceFactors.reduce((a, b) => a + b, 0) / governanceFactors.length;

    // Climate Risk Assessment
    const climateRiskScore = (
      parseFloat(formData.soilLevelRise) + 
      parseFloat(formData.shoreLineRisk) + 
      parseFloat(formData.stormThreshold) + 
      parseFloat(formData.bushThreshold) + 
      parseFloat(formData.cycloneThreshold) + 
      parseFloat(formData.droughtThreshold)
    ) / 6;

    // Financial Risk Assessment
    const financialRiskScore = (
      parseFloat(formData.impactsSpreads) + 
      parseFloat(formData.marketVolatility) + 
      parseFloat(formData.maximumLendingValues) + 
      parseFloat(formData.overallRiskWeighted)
    ) / 4;

    // Overall ESG Score
    const overallESGScore = (
      environmentalScore * 0.30 + 
      socialScore * 0.35 + 
      governanceScore * 0.35
    );

    // Risk-Adjusted Score (lower climate and financial risk = higher score)
    const riskAdjustment = (10 - climateRiskScore) * 0.1 + (100 - financialRiskScore) * 0.05;
    const finalScore = Math.min(100, overallESGScore + riskAdjustment);

    const results = {
      environmentalScore: Math.round(environmentalScore * 10) / 10,
      socialScore: Math.round(socialScore * 10) / 10,
      governanceScore: Math.round(governanceScore * 10) / 10,
      climateRiskScore: Math.round(climateRiskScore * 10) / 10,
      financialRiskScore: Math.round(financialRiskScore * 10) / 10,
      overallESGScore: Math.round(overallESGScore * 10) / 10,
      finalScore: Math.round(finalScore * 10) / 10,
      riskLevel: finalScore >= 80 ? 'Low Risk' : finalScore >= 60 ? 'Medium Risk' : 'High Risk',
      recommendation: finalScore >= 80 ? 'Excellent investment opportunity' : 
                      finalScore >= 60 ? 'Good investment with some improvements needed' : 
                      'High risk - significant improvements required'
    };

    setCalculatedResults(results);
    toast.success(`Advanced Risk Assessment calculated! Overall Score: ${results.finalScore}/100`);
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardTitle className="text-xl text-blue-800">Advanced Property Risk Calculations</CardTitle>
        <p className="text-sm text-blue-600">Comprehensive assessment calculated by sustainability, climate, and financial risk factors</p>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        
        {/* Sustainability Ratings & Weights */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-700">Sustainability Ratings & Weights</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Long Term Risk (0-10)</Label>
              <Input
                type="number"
                min="0"
                max="10"
                value={formData.longTermRisk}
                onChange={(e) => setFormData(prev => ({ ...prev, longTermRisk: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Energy Impact</Label>
              <Input
                type="number"
                min="0"
                max="10"
                value={formData.energyImpact}
                onChange={(e) => setFormData(prev => ({ ...prev, energyImpact: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>NABES Rating</Label>
              <Input
                type="number"
                min="0"
                max="10"
                value={formData.nabesRating}
                onChange={(e) => setFormData(prev => ({ ...prev, nabesRating: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Green Star Rating</Label>
              <Input
                type="number"
                min="0"
                max="10"
                value={formData.greenStarRating}
                onChange={(e) => setFormData(prev => ({ ...prev, greenStarRating: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* Energy Efficiency Features */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-yellow-700">Energy Efficiency Features (Score 0-10 each)</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { key: 'solarPanels', label: 'Solar Panels' },
              { key: 'insulation', label: 'Insulation' },
              { key: 'ledLighting', label: 'LED Lighting' },
              { key: 'smartSystems', label: 'Smart Systems' },
              { key: 'energyManagement', label: 'Energy Management' }
            ].map((item) => (
              <div key={item.key} className="space-y-2">
                <Label>{item.label}</Label>
                <Input
                  type="number"
                  min="0"
                  max="10"
                  value={formData[item.key as keyof AdvancedRiskData]}
                  onChange={(e) => setFormData(prev => ({ ...prev, [item.key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Water Conservation Strategies */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-700">Water Conservation Strategies (Score 0-10 each)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { key: 'educationIncentives', label: 'Education Incentives' },
              { key: 'greyWaterRecycling', label: 'Grey Water Recycling' },
              { key: 'lowFlowFixtures', label: 'Low Flow Fixtures' },
              { key: 'localResourceLandscaping', label: 'Local Resource Landscaping' },
              { key: 'wasteMixManagement', label: 'Waste Mix Management' },
              { key: 'irrigationEfficiency', label: 'Irrigation Efficiency' }
            ].map((item) => (
              <div key={item.key} className="space-y-2">
                <Label>{item.label}</Label>
                <Input
                  type="number"
                  min="0"
                  max="10"
                  value={formData[item.key as keyof AdvancedRiskData]}
                  onChange={(e) => setFormData(prev => ({ ...prev, [item.key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Social Factors */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-teal-700">Enhanced Social Factors (Score 0-10 each)</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { key: 'communityImpact', label: 'Community Impact' },
              { key: 'socialEquity', label: 'Social Equity' },
              { key: 'accessibilityCompliance', label: 'Accessibility Compliance' },
              { key: 'healthWellbeing', label: 'Health & Wellbeing' },
              { key: 'affordableHousing', label: 'Affordable Housing' },
              { key: 'localEmployment', label: 'Local Employment' },
              { key: 'culturalHeritage', label: 'Cultural Heritage' },
              { key: 'educationFacilities', label: 'Education Facilities' },
              { key: 'healthcareAccess', label: 'Healthcare Access' },
              { key: 'publicTransport', label: 'Public Transport' },
              { key: 'crimeRates', label: 'Crime Rates' },
              { key: 'demographicDiversity', label: 'Demographic Diversity' },
              { key: 'tenantSatisfaction', label: 'Tenant Satisfaction' },
              { key: 'socialCohesion', label: 'Social Cohesion' },
              { key: 'communityEngagement', label: 'Community Engagement' }
            ].map((item) => (
              <div key={item.key} className="space-y-2">
                <Label className="text-xs">{item.label}</Label>
                <Input
                  type="number"
                  min="0"
                  max="10"
                  value={formData[item.key as keyof AdvancedRiskData]}
                  onChange={(e) => setFormData(prev => ({ ...prev, [item.key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Government/Governance Factors */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-700">Enhanced Government/Governance Factors (Score 0-10 each)</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { key: 'regulatoryCompliance', label: 'Regulatory Compliance' },
              { key: 'policyAlignment', label: 'Policy Alignment' },
              { key: 'planningCompliance', label: 'Planning Compliance' },
              { key: 'buildingCodeCompliance', label: 'Building Code Compliance' },
              { key: 'taxTransparency', label: 'Tax Transparency' },
              { key: 'antiCorruption', label: 'Anti-corruption' },
              { key: 'cybersecurity', label: 'Cybersecurity' },
              { key: 'dataPrivacy', label: 'Data Privacy' },
              { key: 'boardDiversity', label: 'Board Diversity' },
              { key: 'stakeholderEngagement', label: 'Stakeholder Engagement' },
              { key: 'riskManagement', label: 'Risk Management' },
              { key: 'ethicalPractices', label: 'Ethical Practices' },
              { key: 'reportingTransparency', label: 'Reporting Transparency' },
              { key: 'auditCompliance', label: 'Audit Compliance' },
              { key: 'legalFramework', label: 'Legal Framework' }
            ].map((item) => (
              <div key={item.key} className="space-y-2">
                <Label className="text-xs">{item.label}</Label>
                <Input
                  type="number"
                  min="0"
                  max="10"
                  value={formData[item.key as keyof AdvancedRiskData]}
                  onChange={(e) => setFormData(prev => ({ ...prev, [item.key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Climate Risk Assessments */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-red-700">Climate Risk Assessments</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { key: 'soilLevelRise', label: 'Soil Level on SEA' },
              { key: 'shoreLineRisk', label: 'Shore Line Risk' },
              { key: 'stormThreshold', label: 'Storm Threshold' },
              { key: 'bushThreshold', label: 'Bush Threshold' },
              { key: 'cycloneThreshold', label: 'Cyclone Threshold' },
              { key: 'droughtThreshold', label: 'Drought Threshold' }
            ].map((item) => (
              <div key={item.key} className="space-y-2">
                <Label className="text-xs">{item.label}</Label>
                <Input
                  type="number"
                  min="0"
                  max="10"
                  value={formData[item.key as keyof AdvancedRiskData]}
                  onChange={(e) => setFormData(prev => ({ ...prev, [item.key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Financial Risk Factors */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-orange-700">Financial Risk Factors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: 'impactsSpreads', label: 'Impacts Spreads (%)' },
              { key: 'marketVolatility', label: 'Market Volatility (%)' },
              { key: 'maximumLendingValues', label: 'Max Lending Values (%)' },
              { key: 'overallRiskWeighted', label: 'Overall Risk Weighted (%)' }
            ].map((item) => (
              <div key={item.key} className="space-y-2">
                <Label>{item.label}</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData[item.key as keyof AdvancedRiskData]}
                  onChange={(e) => setFormData(prev => ({ ...prev, [item.key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex justify-center">
          <Button 
            onClick={calculateAdvancedRiskAssessment}
            className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Calculate Advanced Risk Assessment
          </Button>
        </div>

        {/* Results Display */}
        {calculatedResults && (
          <Card className="mt-6 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-center text-blue-800">Advanced Risk Assessment Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overall Score */}
              <div className="text-center">
                <div className={`inline-block px-8 py-4 rounded-lg ${getRiskColor(calculatedResults.finalScore)}`}>
                  <div className="text-4xl font-bold">{calculatedResults.finalScore}/100</div>
                  <div className="text-lg font-semibold">{calculatedResults.riskLevel}</div>
                </div>
                <p className="mt-2 text-gray-600">{calculatedResults.recommendation}</p>
              </div>

              {/* Detailed Scores */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Environmental</span>
                    <span>{calculatedResults.environmentalScore}/10</span>
                  </div>
                  <Progress value={calculatedResults.environmentalScore * 10} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Social</span>
                    <span>{calculatedResults.socialScore}/10</span>
                  </div>
                  <Progress value={calculatedResults.socialScore * 10} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Governance</span>
                    <span>{calculatedResults.governanceScore}/10</span>
                  </div>
                  <Progress value={calculatedResults.governanceScore * 10} className="h-2" />
                </div>
              </div>

              {/* Risk Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Climate Risk</span>
                    <Badge variant={calculatedResults.climateRiskScore <= 3 ? "default" : calculatedResults.climateRiskScore <= 6 ? "secondary" : "destructive"}>
                      {calculatedResults.climateRiskScore}/10
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Financial Risk</span>
                    <Badge variant={calculatedResults.financialRiskScore <= 30 ? "default" : calculatedResults.financialRiskScore <= 60 ? "secondary" : "destructive"}>
                      {calculatedResults.financialRiskScore}%
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedPropertyRiskCalculations;