/**
 * ============================================================================
 * ECONOMIC, GEOGRAPHICAL AND CATCHMENT AREA ANALYSIS
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { TrendingUp, MapPin, Users, Building, DollarSign } from "lucide-react";
import { useUniversalSave } from "@/hooks/useUniversalSave";
import { useReportData } from "@/contexts/ReportDataContext";
import { useProperty } from "@/contexts/PropertyContext";

interface EconomicAnalysisData {
  include: boolean;
  
  // Economic Factors
  unemploymentRate: string;
  medianIncome: string;
  populationGrowth: string;
  economicDiversification: string;
  majorEmployers: string;
  
  // Geographical Factors
  proximityToCBD: string;
  transportAccessibility: string;
  infrastructureQuality: string;
  naturalFeatures: string;
  climateFactors: string;
  
  // Catchment Area Analysis
  populationDemographics: string;
  householdComposition: string;
  educationLevels: string;
  competitorAnalysis: string;
  marketPenetration: string;
  
  // Market Dynamics
  supplyDemandBalance: string;
  priceMovements: string;
  rentalYields: string;
  vacancyRates: string;
  
  // Summary Assessment
  overallAssessment: string;
  keyOpportunities: string;
  potentialRisks: string;
}

const EconomicGeographicalCatchmentAnalysis: React.FC = () => {
  const { saveData, loadData, isSaving } = useUniversalSave('EconomicGeographicalCatchmentAnalysis');
  const { reportData } = useReportData();
  const { addressData } = useProperty();

  const [data, setData] = useState<EconomicAnalysisData>({
    include: true,
    unemploymentRate: '',
    medianIncome: '',
    populationGrowth: '',
    economicDiversification: '',
    majorEmployers: '',
    proximityToCBD: '',
    transportAccessibility: '',
    infrastructureQuality: '',
    naturalFeatures: '',
    climateFactors: '',
    populationDemographics: '',
    householdComposition: '',
    educationLevels: '',
    competitorAnalysis: '',
    marketPenetration: '',
    supplyDemandBalance: '',
    priceMovements: '',
    rentalYields: '',
    vacancyRates: '',
    overallAssessment: '',
    keyOpportunities: '',
    potentialRisks: ''
  });

  // Load saved data on component mount
  useEffect(() => {
    const savedData = loadData();
    if (savedData) {
      setData(prev => ({ ...prev, ...savedData }));
    }
  }, [loadData]);

  // Auto-save when data changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      saveData(data);
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [data, saveData]);

  // Extract data from PAF and property context
  useEffect(() => {
    if (reportData.propertySearchData || addressData.suburb) {
      setData(prev => ({
        ...prev,
        proximityToCBD: addressData.suburb ? `${addressData.suburb} location analysis required` : prev.proximityToCBD,
        transportAccessibility: 'Assessment based on location mapping required',
        infrastructureQuality: 'Local infrastructure assessment required',
        populationDemographics: addressData.suburb ? `${addressData.suburb} demographic analysis required` : prev.populationDemographics,
      }));
    }
  }, [reportData.propertySearchData, addressData]);

  const updateField = (field: keyof EconomicAnalysisData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  if (!data.include) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">Economic, Geographical and Catchment Area Analysis</CardTitle>
            <div className="flex items-center gap-2">
              <Label htmlFor="include-section">Include</Label>
              <Switch
                id="include-section"
                checked={data.include}
                onCheckedChange={(checked) => updateField('include', checked)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This section is currently excluded from the report.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Economic, Geographical and Catchment Area Analysis
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Market dynamics, location factors, and catchment area assessment
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="include-section">Include</Label>
              <Switch
                id="include-section"
                checked={data.include}
                onCheckedChange={(checked) => updateField('include', checked)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Economic Factors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Economic Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unemployment-rate">Unemployment Rate (%)</Label>
                  <Input
                    id="unemployment-rate"
                    value={data.unemploymentRate}
                    onChange={(e) => updateField('unemploymentRate', e.target.value)}
                    placeholder="e.g. 4.2%"
                  />
                </div>
                <div>
                  <Label htmlFor="median-income">Median Household Income</Label>
                  <Input
                    id="median-income"
                    value={data.medianIncome}
                    onChange={(e) => updateField('medianIncome', e.target.value)}
                    placeholder="e.g. $85,000"
                  />
                </div>
                <div>
                  <Label htmlFor="population-growth">Population Growth Rate (%)</Label>
                  <Input
                    id="population-growth"
                    value={data.populationGrowth}
                    onChange={(e) => updateField('populationGrowth', e.target.value)}
                    placeholder="e.g. 2.1% annually"
                  />
                </div>
                <div>
                  <Label htmlFor="economic-diversification">Economic Diversification</Label>
                  <Select value={data.economicDiversification} onValueChange={(value) => updateField('economicDiversification', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select diversification level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High - Multiple industries</SelectItem>
                      <SelectItem value="moderate">Moderate - Several key sectors</SelectItem>
                      <SelectItem value="low">Low - Limited industry base</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="major-employers">Major Employers & Industries</Label>
                <Textarea
                  id="major-employers"
                  value={data.majorEmployers}
                  onChange={(e) => updateField('majorEmployers', e.target.value)}
                  placeholder="List key employers and major industries in the area..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Geographical Factors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Geographical Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="proximity-cbd">Proximity to CBD (km)</Label>
                  <Input
                    id="proximity-cbd"
                    value={data.proximityToCBD}
                    onChange={(e) => updateField('proximityToCBD', e.target.value)}
                    placeholder="e.g. 15km from Melbourne CBD"
                  />
                </div>
                <div>
                  <Label htmlFor="transport-accessibility">Transport Accessibility</Label>
                  <Select value={data.transportAccessibility} onValueChange={(value) => updateField('transportAccessibility', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select accessibility level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent - Multiple transport modes</SelectItem>
                      <SelectItem value="good">Good - Adequate public transport</SelectItem>
                      <SelectItem value="moderate">Moderate - Limited options</SelectItem>
                      <SelectItem value="poor">Poor - Car dependent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="infrastructure-quality">Infrastructure Quality</Label>
                <Textarea
                  id="infrastructure-quality"
                  value={data.infrastructureQuality}
                  onChange={(e) => updateField('infrastructureQuality', e.target.value)}
                  placeholder="Assess roads, utilities, telecommunications, healthcare facilities..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="natural-features">Natural Features & Environment</Label>
                <Textarea
                  id="natural-features"
                  value={data.naturalFeatures}
                  onChange={(e) => updateField('naturalFeatures', e.target.value)}
                  placeholder="Parks, waterways, topography, environmental constraints..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Catchment Area Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-4 w-4" />
                Catchment Area Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="population-demographics">Population Demographics</Label>
                <Textarea
                  id="population-demographics"
                  value={data.populationDemographics}
                  onChange={(e) => updateField('populationDemographics', e.target.value)}
                  placeholder="Age distribution, income brackets, ethnic composition..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="household-composition">Household Composition</Label>
                  <Textarea
                    id="household-composition"
                    value={data.householdComposition}
                    onChange={(e) => updateField('householdComposition', e.target.value)}
                    placeholder="Family types, household sizes..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="education-levels">Education Levels</Label>
                  <Textarea
                    id="education-levels"
                    value={data.educationLevels}
                    onChange={(e) => updateField('educationLevels', e.target.value)}
                    placeholder="Educational attainment levels..."
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Dynamics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building className="h-4 w-4" />
                Market Dynamics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="supply-demand">Supply & Demand Balance</Label>
                  <Select value={data.supplyDemandBalance} onValueChange={(value) => updateField('supplyDemandBalance', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select balance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="undersupplied">Undersupplied - High demand</SelectItem>
                      <SelectItem value="balanced">Balanced - Stable market</SelectItem>
                      <SelectItem value="oversupplied">Oversupplied - Excess stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price-movements">Recent Price Movements</Label>
                  <Input
                    id="price-movements"
                    value={data.priceMovements}
                    onChange={(e) => updateField('priceMovements', e.target.value)}
                    placeholder="e.g. +5.2% in last 12 months"
                  />
                </div>
                <div>
                  <Label htmlFor="rental-yields">Rental Yields (%)</Label>
                  <Input
                    id="rental-yields"
                    value={data.rentalYields}
                    onChange={(e) => updateField('rentalYields', e.target.value)}
                    placeholder="e.g. 3.8% gross yield"
                  />
                </div>
                <div>
                  <Label htmlFor="vacancy-rates">Vacancy Rates (%)</Label>
                  <Input
                    id="vacancy-rates"
                    value={data.vacancyRates}
                    onChange={(e) => updateField('vacancyRates', e.target.value)}
                    placeholder="e.g. 2.1% vacancy rate"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assessment Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assessment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="overall-assessment">Overall Assessment</Label>
                <Textarea
                  id="overall-assessment"
                  value={data.overallAssessment}
                  onChange={(e) => updateField('overallAssessment', e.target.value)}
                  placeholder="Summarize the economic, geographical and catchment area findings..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="key-opportunities">Key Opportunities</Label>
                  <Textarea
                    id="key-opportunities"
                    value={data.keyOpportunities}
                    onChange={(e) => updateField('keyOpportunities', e.target.value)}
                    placeholder="List key opportunities for the property..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="potential-risks">Potential Risks</Label>
                  <Textarea
                    id="potential-risks"
                    value={data.potentialRisks}
                    onChange={(e) => updateField('potentialRisks', e.target.value)}
                    placeholder="Identify potential risks or concerns..."
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

        </CardContent>
      </Card>
    </div>
  );
};

export default EconomicGeographicalCatchmentAnalysis;