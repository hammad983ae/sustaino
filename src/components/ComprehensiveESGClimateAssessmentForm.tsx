/**
 * ============================================================================
 * COMPREHENSIVE ESG AND CLIMATE ASSESSMENT FORM
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Complete assessment form matching user's design specifications
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ComprehensiveESGData {
  // Property Assessment Form
  propertyName: string;
  location: string;
  propertyType: string;
  yearBuilt: string;
  squareMetres: string;
  
  // Energy Efficiency
  actualEnergyUse: string;
  benchmarkEnergyUse: string;
  
  // Water Conservation
  waterEfficientFixtures: string;
  totalFixtures: string;
  
  // Waste Management
  hasRecyclingProgram: boolean;
  hasComposting: boolean;
  
  // Sustainable Materials
  sustainableMaterialsPercentage: string;
  
  // Social Impact
  adaStandardsCompliance: string;
  goodAirQuality: boolean;
  naturalLight: boolean;
  ergonomicDesign: boolean;
  communitySpace: boolean;
  localSourcing: boolean;
  
  // Certifications
  leed: boolean;
  nabers: boolean;
  energyStar: boolean;
  breeam: boolean;
  greenStar: boolean;
  other: boolean;
  
  // Governance & Transparency
  esgDataPubliclyAvailable: boolean;
  esgReportAvailable: boolean;
  riskManagementPracticesImplemented: string;
  totalPotentialPractices: string;
  additionalNotes: string;
  
  // Advanced Property Risk - Sustainability Ratings & Weights
  energyRating: string;
  nabersRating: string;
  greenStarRating: string;
  energyWeight: string;
  nabersWeight: string;
  greenStarWeight: string;
  
  // Energy Efficiency Features (0-10 each)
  solarPanels: string;
  insulation: string;
  ledLighting: string;
  hvacEfficiency: string;
  smartSystems: string;
  energyManagement: string;
  
  // Water Conservation Strategies (0-10 each)
  rainwaterHarvesting: string;
  greyWaterRecycling: string;
  lowFlowFixtures: string;
  droughtResistantLandscaping: string;
  waterMonitoring: string;
  irrigationEfficiency: string;
  
  // Climate Risk Assessment
  floodRisk: string;
  bushfireRisk: string;
  cycloneRisk: string;
  heatwaveRisk: string;
  droughtRisk: string;
  
  // Risk Thresholds
  floodThreshold: string;
  bushfireThreshold: string;
  cycloneThreshold: string;
  heatwaveThreshold: string;
  droughtThreshold: string;
  
  // Socioeconomic Index (SEIFA)
  seifaScore: string;
  
  // Financial Risk Factors
  propertyAge: string;
  vacancyRate: string;
  debtToValueRatio: string;
  maintenanceBacklog: string;
  marketVolatility: string;
  
  // Overall Risk Weights
  climateRiskWeight: string;
  financialRiskWeight: string;
  esgRiskWeight: string;
  
  // DCF Analysis
  enableDCFAnalysis: boolean;
}

export const ComprehensiveESGClimateAssessmentForm: React.FC = () => {
  const [formData, setFormData] = useState<ComprehensiveESGData>({
    // Property Assessment Form defaults
    propertyName: '',
    location: '',
    propertyType: '',
    yearBuilt: '2025',
    squareMetres: '0',
    actualEnergyUse: '0',
    benchmarkEnergyUse: '0',
    waterEfficientFixtures: '0',
    totalFixtures: '0',
    hasRecyclingProgram: false,
    hasComposting: false,
    sustainableMaterialsPercentage: '0',
    
    // Social Impact defaults
    adaStandardsCompliance: 'Not Compliant',
    goodAirQuality: false,
    naturalLight: false,
    ergonomicDesign: false,
    communitySpace: false,
    localSourcing: false,
    
    // Certifications defaults
    leed: false,
    nabers: false,
    energyStar: false,
    breeam: false,
    greenStar: false,
    other: false,
    
    // Governance defaults
    esgDataPubliclyAvailable: false,
    esgReportAvailable: false,
    riskManagementPracticesImplemented: '0',
    totalPotentialPractices: '10',
    additionalNotes: '',
    
    // Sustainability Ratings defaults
    energyRating: '0',
    nabersRating: '0',
    greenStarRating: '0',
    energyWeight: '0.3',
    nabersWeight: '0.3',
    greenStarWeight: '0.25',
    
    // Energy Features defaults
    solarPanels: '0',
    insulation: '0',
    ledLighting: '0',
    hvacEfficiency: '0',
    smartSystems: '0',
    energyManagement: '0',
    
    // Water Conservation defaults
    rainwaterHarvesting: '0',
    greyWaterRecycling: '0',
    lowFlowFixtures: '0',
    droughtResistantLandscaping: '0',
    waterMonitoring: '0',
    irrigationEfficiency: '0',
    
    // Climate Risk defaults
    floodRisk: '0',
    bushfireRisk: '0',
    cycloneRisk: '0',
    heatwaveRisk: '0',
    droughtRisk: '0',
    
    // Risk Thresholds defaults
    floodThreshold: '30',
    bushfireThreshold: '25',
    cycloneThreshold: '20',
    heatwaveThreshold: '35',
    droughtThreshold: '40',
    
    // SEIFA defaults
    seifaScore: '1000',
    
    // Financial Risk defaults
    propertyAge: '0',
    vacancyRate: '0',
    debtToValueRatio: '0',
    maintenanceBacklog: '0',
    marketVolatility: '5',
    
    // Risk Weights defaults
    climateRiskWeight: '0.4',
    financialRiskWeight: '0.3',
    esgRiskWeight: '0.3',
    
    enableDCFAnalysis: false
  });

  const [calculatedResults, setCalculatedResults] = useState<any>(null);

  const calculateESGAssessment = () => {
    // Basic ESG Score
    let esgScore = 0;
    
    // Energy Efficiency (25 points)
    if (parseFloat(formData.actualEnergyUse) > 0 && parseFloat(formData.benchmarkEnergyUse) > 0) {
      esgScore += Math.min(25, (parseFloat(formData.benchmarkEnergyUse) / parseFloat(formData.actualEnergyUse)) * 25);
    }
    
    // Water Conservation (15 points)
    if (parseFloat(formData.waterEfficientFixtures) > 0 && parseFloat(formData.totalFixtures) > 0) {
      esgScore += (parseFloat(formData.waterEfficientFixtures) / parseFloat(formData.totalFixtures)) * 15;
    }
    
    // Waste Management (10 points)
    if (formData.hasRecyclingProgram) esgScore += 5;
    if (formData.hasComposting) esgScore += 5;
    
    // Sustainable Materials (10 points)
    esgScore += (parseFloat(formData.sustainableMaterialsPercentage) / 100) * 10;
    
    // Social Impact (20 points)
    if (formData.adaStandardsCompliance === 'Compliant') esgScore += 4;
    if (formData.goodAirQuality) esgScore += 3;
    if (formData.naturalLight) esgScore += 3;
    if (formData.ergonomicDesign) esgScore += 3;
    if (formData.communitySpace) esgScore += 4;
    if (formData.localSourcing) esgScore += 3;
    
    // Certifications (10 points)
    let certCount = 0;
    if (formData.leed) certCount++;
    if (formData.nabers) certCount++;
    if (formData.energyStar) certCount++;
    if (formData.breeam) certCount++;
    if (formData.greenStar) certCount++;
    if (formData.other) certCount++;
    esgScore += Math.min(10, certCount * 2);
    
    // Governance (10 points)
    if (formData.esgDataPubliclyAvailable) esgScore += 3;
    if (formData.esgReportAvailable) esgScore += 3;
    if (parseFloat(formData.riskManagementPracticesImplemented) > 0 && parseFloat(formData.totalPotentialPractices) > 0) {
      esgScore += (parseFloat(formData.riskManagementPracticesImplemented) / parseFloat(formData.totalPotentialPractices)) * 4;
    }
    
    // Advanced Risk Calculations
    const sustainabilityScore = (
      parseFloat(formData.energyRating) * parseFloat(formData.energyWeight) +
      parseFloat(formData.nabersRating) * parseFloat(formData.nabersWeight) +
      parseFloat(formData.greenStarRating) * parseFloat(formData.greenStarWeight)
    );
    
    const energyFeaturesScore = (
      parseFloat(formData.solarPanels) + parseFloat(formData.insulation) + 
      parseFloat(formData.ledLighting) + parseFloat(formData.hvacEfficiency) + 
      parseFloat(formData.smartSystems) + parseFloat(formData.energyManagement)
    ) / 6;
    
    const waterConservationScore = (
      parseFloat(formData.rainwaterHarvesting) + parseFloat(formData.greyWaterRecycling) + 
      parseFloat(formData.lowFlowFixtures) + parseFloat(formData.droughtResistantLandscaping) + 
      parseFloat(formData.waterMonitoring) + parseFloat(formData.irrigationEfficiency)
    ) / 6;
    
    // Climate Risk Score
    const climateRiskScore = (
      parseFloat(formData.floodRisk) + parseFloat(formData.bushfireRisk) + 
      parseFloat(formData.cycloneRisk) + parseFloat(formData.heatwaveRisk) + 
      parseFloat(formData.droughtRisk)
    ) / 5;
    
    // Financial Risk Score
    const financialRiskScore = (
      parseFloat(formData.propertyAge) + parseFloat(formData.vacancyRate) + 
      parseFloat(formData.debtToValueRatio) + parseFloat(formData.maintenanceBacklog) + 
      parseFloat(formData.marketVolatility)
    ) / 5;
    
    // Overall Assessment
    const overallScore = Math.min(100, esgScore + sustainabilityScore + energyFeaturesScore);
    
    const results = {
      esgScore: Math.round(esgScore),
      sustainabilityScore: Math.round(sustainabilityScore * 10) / 10,
      energyFeaturesScore: Math.round(energyFeaturesScore * 10) / 10,
      waterConservationScore: Math.round(waterConservationScore * 10) / 10,
      climateRiskScore: Math.round(climateRiskScore * 10) / 10,
      financialRiskScore: Math.round(financialRiskScore * 10) / 10,
      overallScore: Math.round(overallScore),
      riskLevel: overallScore >= 80 ? 'Low Risk' : overallScore >= 60 ? 'Medium Risk' : 'High Risk',
      esgRating: overallScore >= 90 ? 'A+' : overallScore >= 80 ? 'A' : overallScore >= 70 ? 'B' : overallScore >= 60 ? 'C' : 'D'
    };
    
    setCalculatedResults(results);
    toast.success(`ESG & Climate Assessment calculated! Overall Score: ${results.overallScore}/100`);
  };

  const calculateAdvancedRiskAssessment = () => {
    calculateESGAssessment();
  };

  return (
    <div className="space-y-6">
      {/* Property Assessment Form */}
      <Card className="w-full">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardTitle className="text-xl text-green-800">Property Assessment Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Basic Property Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyName">Property Name</Label>
              <Input
                id="propertyName"
                value={formData.propertyName}
                onChange={(e) => setFormData(prev => ({ ...prev, propertyName: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select
                value={formData.propertyType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="agricultural">Agricultural</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearBuilt">Year Built</Label>
              <Input
                id="yearBuilt"
                value={formData.yearBuilt}
                onChange={(e) => setFormData(prev => ({ ...prev, yearBuilt: e.target.value }))}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="squareMetres">Square Metres</Label>
              <Input
                id="squareMetres"
                type="number"
                value={formData.squareMetres}
                onChange={(e) => setFormData(prev => ({ ...prev, squareMetres: e.target.value }))}
              />
            </div>
          </div>

          {/* Energy Efficiency */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-700">Energy Efficiency</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="actualEnergyUse">Actual Energy Use (kWh/sqm/year)</Label>
                <Input
                  id="actualEnergyUse"
                  type="number"
                  value={formData.actualEnergyUse}
                  onChange={(e) => setFormData(prev => ({ ...prev, actualEnergyUse: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="benchmarkEnergyUse">Benchmark Energy Use (kWh/sqm/year)</Label>
                <Input
                  id="benchmarkEnergyUse"
                  type="number"
                  value={formData.benchmarkEnergyUse}
                  onChange={(e) => setFormData(prev => ({ ...prev, benchmarkEnergyUse: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Water Conservation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-700">Water Conservation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="waterEfficientFixtures">Water Efficient Fixtures</Label>
                <Input
                  id="waterEfficientFixtures"
                  type="number"
                  value={formData.waterEfficientFixtures}
                  onChange={(e) => setFormData(prev => ({ ...prev, waterEfficientFixtures: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalFixtures">Total Fixtures</Label>
                <Input
                  id="totalFixtures"
                  type="number"
                  value={formData.totalFixtures}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalFixtures: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Waste Management */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-700">Waste Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recyclingProgram"
                  checked={formData.hasRecyclingProgram}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hasRecyclingProgram: !!checked }))}
                />
                <Label htmlFor="recyclingProgram">Has Recycling Program</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="composting"
                  checked={formData.hasComposting}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hasComposting: !!checked }))}
                />
                <Label htmlFor="composting">Has Composting</Label>
              </div>
            </div>
          </div>

          {/* Sustainable Materials */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-700">Sustainable Materials</h3>
            <div className="space-y-2">
              <Label htmlFor="sustainableMaterials">Sustainable Materials Percentage (%)</Label>
              <Input
                id="sustainableMaterials"
                type="number"
                min="0"
                max="100"
                value={formData.sustainableMaterialsPercentage}
                onChange={(e) => setFormData(prev => ({ ...prev, sustainableMaterialsPercentage: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Impact */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg text-teal-700">Social Impact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="adaCompliance">ADA Standards Compliance</Label>
            <Select
              value={formData.adaStandardsCompliance}
              onValueChange={(value) => setFormData(prev => ({ ...prev, adaStandardsCompliance: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Not Compliant">Not Compliant</SelectItem>
                <SelectItem value="Partially Compliant">Partially Compliant</SelectItem>
                <SelectItem value="Compliant">Compliant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { id: 'goodAirQuality', label: 'Good Air Quality' },
              { id: 'naturalLight', label: 'Natural Light' },
              { id: 'ergonomicDesign', label: 'Ergonomic Design' },
              { id: 'communitySpace', label: 'Community Space' },
              { id: 'localSourcing', label: 'Local Sourcing' }
            ].map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  id={item.id}
                  checked={formData[item.id as keyof ComprehensiveESGData] as boolean}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, [item.id]: !!checked }))}
                />
                <Label htmlFor={item.id}>{item.label}</Label>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-700">Certifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { id: 'leed', label: 'LEED' },
                { id: 'nabers', label: 'NABERS' },
                { id: 'energyStar', label: 'ENERGY STAR' },
                { id: 'breeam', label: 'BREEAM' },
                { id: 'greenStar', label: 'Green Star' },
                { id: 'other', label: 'Other' }
              ].map((cert) => (
                <div key={cert.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={cert.id}
                    checked={formData[cert.id as keyof ComprehensiveESGData] as boolean}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, [cert.id]: !!checked }))}
                  />
                  <Label htmlFor={cert.id}>{cert.label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Governance & Transparency */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-700">Governance & Transparency</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="esgDataPublic"
                  checked={formData.esgDataPubliclyAvailable}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, esgDataPubliclyAvailable: !!checked }))}
                />
                <Label htmlFor="esgDataPublic">ESG Data Publicly Available</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="esgReport"
                  checked={formData.esgReportAvailable}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, esgReportAvailable: !!checked }))}
                />
                <Label htmlFor="esgReport">ESG Report Available</Label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="riskManagement">Risk Management Practices Implemented</Label>
                <Input
                  id="riskManagement"
                  type="number"
                  value={formData.riskManagementPracticesImplemented}
                  onChange={(e) => setFormData(prev => ({ ...prev, riskManagementPracticesImplemented: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalPractices">Total Potential Practices</Label>
                <Input
                  id="totalPractices"
                  type="number"
                  value={formData.totalPotentialPractices}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalPotentialPractices: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              placeholder="Any additional information about the property..."
              value={formData.additionalNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
            />
          </div>

          <Button onClick={calculateESGAssessment} className="w-full bg-green-600 hover:bg-green-700">
            Calculate ESG Assessment
          </Button>
        </CardContent>
      </Card>

      {/* Advanced Property Risk Calculations */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl text-blue-800">Advanced Property Risk Calculations</CardTitle>
          <p className="text-sm text-blue-600">Comprehensive risk assessment with automated calculations for sustainability, climate, and financial risk factors.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sustainability Ratings & Weights */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-700">Sustainability Ratings & Weights</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Energy Rating (0-10)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.energyRating}
                    onChange={(e) => setFormData(prev => ({ ...prev, energyRating: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>NABERS Rating (0-6)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="6"
                    value={formData.nabersRating}
                    onChange={(e) => setFormData(prev => ({ ...prev, nabersRating: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Green Star Rating (0-6)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="6"
                    value={formData.greenStarRating}
                    onChange={(e) => setFormData(prev => ({ ...prev, greenStarRating: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Weights (should sum to 1.0)</h4>
                <div className="space-y-2">
                  <Label>Energy Weight</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={formData.energyWeight}
                    onChange={(e) => setFormData(prev => ({ ...prev, energyWeight: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>NABERS Weight</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={formData.nabersWeight}
                    onChange={(e) => setFormData(prev => ({ ...prev, nabersWeight: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Green Star Weight</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={formData.greenStarWeight}
                    onChange={(e) => setFormData(prev => ({ ...prev, greenStarWeight: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Energy Efficiency Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-700">Energy Efficiency Features (Score 0-10 each)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { key: 'solarPanels', label: 'Solar Panels' },
                { key: 'insulation', label: 'Insulation' },
                { key: 'ledLighting', label: 'Led Lighting' },
                { key: 'hvacEfficiency', label: 'Hvac Efficiency' },
                { key: 'smartSystems', label: 'Smart Systems' },
                { key: 'energyManagement', label: 'Energy Management' }
              ].map((item) => (
                <div key={item.key} className="space-y-2">
                  <Label>{item.label}</Label>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    value={formData[item.key as keyof ComprehensiveESGData] as string}
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
                { key: 'rainwaterHarvesting', label: 'Rainwater Harvesting' },
                { key: 'greyWaterRecycling', label: 'Grey Water Recycling' },
                { key: 'lowFlowFixtures', label: 'Low Flow Fixtures' },
                { key: 'droughtResistantLandscaping', label: 'Drought Resistant Landscaping' },
                { key: 'waterMonitoring', label: 'Water Monitoring' },
                { key: 'irrigationEfficiency', label: 'Irrigation Efficiency' }
              ].map((item) => (
                <div key={item.key} className="space-y-2">
                  <Label>{item.label}</Label>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    value={formData[item.key as keyof ComprehensiveESGData] as string}
                    onChange={(e) => setFormData(prev => ({ ...prev, [item.key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Climate Risk Assessment */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl text-red-800">Climate Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-700">Risk Levels (0-100)</h3>
              {[
                { key: 'floodRisk', label: 'Flood Risk Risk' },
                { key: 'bushfireRisk', label: 'Bushfire Risk Risk' },
                { key: 'cycloneRisk', label: 'Cyclone Risk Risk' },
                { key: 'heatwaveRisk', label: 'Heatwave Risk Risk' },
                { key: 'droughtRisk', label: 'Drought Risk Risk' }
              ].map((item) => (
                <div key={item.key} className="space-y-2">
                  <Label>{item.label}</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData[item.key as keyof ComprehensiveESGData] as string}
                    onChange={(e) => setFormData(prev => ({ ...prev, [item.key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-700">Risk Thresholds</h3>
              {[
                { key: 'floodThreshold', label: 'Flood Threshold', defaultValue: '30' },
                { key: 'bushfireThreshold', label: 'Bushfire Threshold', defaultValue: '25' },
                { key: 'cycloneThreshold', label: 'Cyclone Threshold', defaultValue: '20' },
                { key: 'heatwaveThreshold', label: 'Heatwave Threshold', defaultValue: '35' },
                { key: 'droughtThreshold', label: 'Drought Threshold', defaultValue: '40' }
              ].map((item) => (
                <div key={item.key} className="space-y-2">
                  <Label>{item.label}</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData[item.key as keyof ComprehensiveESGData] as string}
                    onChange={(e) => setFormData(prev => ({ ...prev, [item.key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Socioeconomic Index */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-700">Socioeconomic Index (SEIFA)</h3>
            <div className="space-y-2">
              <Label>SEIFA Score (500-1500)</Label>
              <Input
                type="number"
                min="500"
                max="1500"
                value={formData.seifaScore}
                onChange={(e) => setFormData(prev => ({ ...prev, seifaScore: e.target.value }))}
              />
            </div>
          </div>

          {/* Financial Risk Factors */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-700">Financial Risk Factors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Property Age (years)</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.propertyAge}
                  onChange={(e) => setFormData(prev => ({ ...prev, propertyAge: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Vacancy Rate (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.vacancyRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, vacancyRate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Debt to Value Ratio (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.debtToValueRatio}
                  onChange={(e) => setFormData(prev => ({ ...prev, debtToValueRatio: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Maintenance Backlog ($000s)</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.maintenanceBacklog}
                  onChange={(e) => setFormData(prev => ({ ...prev, maintenanceBacklog: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Market Volatility (1-10)</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.marketVolatility}
                  onChange={(e) => setFormData(prev => ({ ...prev, marketVolatility: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Overall Risk Weights */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-teal-700">Overall Risk Weights (should sum to 1.0)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Climate Risk Weight</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  value={formData.climateRiskWeight}
                  onChange={(e) => setFormData(prev => ({ ...prev, climateRiskWeight: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Financial Risk Weight</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  value={formData.financialRiskWeight}
                  onChange={(e) => setFormData(prev => ({ ...prev, financialRiskWeight: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>ESG Risk Weight</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  value={formData.esgRiskWeight}
                  onChange={(e) => setFormData(prev => ({ ...prev, esgRiskWeight: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* DCF Analysis */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-700">DCF Analysis (Optional)</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enableDCF"
                checked={formData.enableDCFAnalysis}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, enableDCFAnalysis: !!checked }))}
              />
              <Label htmlFor="enableDCF">Enable DCF Analysis</Label>
            </div>
          </div>

          <Button onClick={calculateAdvancedRiskAssessment} className="w-full bg-green-600 hover:bg-green-700">
            Calculate Advanced Risk Assessment
          </Button>
        </CardContent>
      </Card>

      {/* Results Display */}
      {calculatedResults && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl text-purple-800">Assessment Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">ESG Scores</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Basic ESG Score:</span>
                    <Badge variant="outline">{calculatedResults.esgScore}/100</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sustainability Score:</span>
                    <Badge variant="outline">{calculatedResults.sustainabilityScore}/10</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Energy Features:</span>
                    <Badge variant="outline">{calculatedResults.energyFeaturesScore}/10</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Water Conservation:</span>
                    <Badge variant="outline">{calculatedResults.waterConservationScore}/10</Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Risk Assessment</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Climate Risk:</span>
                    <Badge variant="outline">{calculatedResults.climateRiskScore}/10</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Financial Risk:</span>
                    <Badge variant="outline">{calculatedResults.financialRiskScore}/10</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Overall Score:</span>
                    <Badge className="bg-green-600">{calculatedResults.overallScore}/100</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>ESG Rating:</span>
                    <Badge className="bg-blue-600">{calculatedResults.esgRating}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Risk Level:</span>
                    <Badge variant="outline">{calculatedResults.riskLevel}</Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Progress value={calculatedResults.overallScore} className="w-full" />
              <p className="text-center mt-2 text-sm text-muted-foreground">
                Overall Assessment Score: {calculatedResults.overallScore}%
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComprehensiveESGClimateAssessmentForm;