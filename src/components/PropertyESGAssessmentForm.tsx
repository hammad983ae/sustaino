/**
 * ============================================================================
 * PROPERTY ESG ASSESSMENT FORM
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Basic Property Assessment Form for ESG evaluation
 * ============================================================================
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface PropertyESGData {
  propertyName: string;
  location: string;
  propertyType: string;
  yearBuilt: string;
  squareFootage: string;
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
}

export const PropertyESGAssessmentForm: React.FC = () => {
  const [formData, setFormData] = useState<PropertyESGData>({
    propertyName: '',
    location: '',
    propertyType: '',
    yearBuilt: '',
    squareFootage: '',
    actualEnergyUse: '',
    benchmarkEnergyUse: '',
    waterEfficientFixtures: '',
    totalFixtures: '',
    hasRecyclingProgram: false,
    hasComposting: false,
    sustainableMaterialsPercentage: '',
    adaStandardsCompliance: 'Not Compliant',
    goodAirQuality: false,
    naturalLight: false,
    ergonomicDesign: false,
    communitySpace: false,
    localSourcing: false,
    leed: false,
    nabers: false,
    energyStar: false,
    breeam: false,
    greenStar: false,
    other: false,
    esgDataPubliclyAvailable: false,
    esgReportAvailable: false,
    riskManagementPracticesImplemented: '',
    totalPotentialPractices: '10',
    additionalNotes: ''
  });

  const [esgScore, setEsgScore] = useState<number | null>(null);

  const calculateESGScore = () => {
    let totalScore = 0;
    let maxScore = 100;

    // Energy Efficiency (25 points)
    const energyEfficiency = formData.actualEnergyUse && formData.benchmarkEnergyUse 
      ? Math.min(25, (parseFloat(formData.benchmarkEnergyUse) / parseFloat(formData.actualEnergyUse)) * 25)
      : 0;
    totalScore += energyEfficiency;

    // Water Conservation (15 points)
    const waterEfficiency = formData.waterEfficientFixtures && formData.totalFixtures
      ? (parseFloat(formData.waterEfficientFixtures) / parseFloat(formData.totalFixtures)) * 15
      : 0;
    totalScore += waterEfficiency;

    // Waste Management (10 points)
    if (formData.hasRecyclingProgram) totalScore += 5;
    if (formData.hasComposting) totalScore += 5;

    // Sustainable Materials (10 points)
    const sustainableMaterials = formData.sustainableMaterialsPercentage
      ? (parseFloat(formData.sustainableMaterialsPercentage) / 100) * 10
      : 0;
    totalScore += sustainableMaterials;

    // Social Impact (20 points)
    if (formData.adaStandardsCompliance === 'Compliant') totalScore += 4;
    if (formData.goodAirQuality) totalScore += 3;
    if (formData.naturalLight) totalScore += 3;
    if (formData.ergonomicDesign) totalScore += 3;
    if (formData.communitySpace) totalScore += 4;
    if (formData.localSourcing) totalScore += 3;

    // Certifications (10 points)
    let certificationCount = 0;
    if (formData.leed) certificationCount++;
    if (formData.nabers) certificationCount++;
    if (formData.energyStar) certificationCount++;
    if (formData.breeam) certificationCount++;
    if (formData.greenStar) certificationCount++;
    if (formData.other) certificationCount++;
    totalScore += Math.min(10, certificationCount * 2);

    // Governance (10 points)
    if (formData.esgDataPubliclyAvailable) totalScore += 3;
    if (formData.esgReportAvailable) totalScore += 3;
    const riskManagement = formData.riskManagementPracticesImplemented && formData.totalPotentialPractices
      ? (parseFloat(formData.riskManagementPracticesImplemented) / parseFloat(formData.totalPotentialPractices)) * 4
      : 0;
    totalScore += riskManagement;

    const finalScore = Math.min(100, Math.round(totalScore));
    setEsgScore(finalScore);
    toast.success(`ESG Assessment calculated! Score: ${finalScore}/100`);
  };

  const getScoreRating = (score: number) => {
    if (score >= 90) return { rating: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score >= 80) return { rating: 'Very Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (score >= 70) return { rating: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (score >= 60) return { rating: 'Fair', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { rating: 'Poor', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
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
              <SelectTrigger className="z-50 bg-white">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-white border shadow-lg">
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
                <SelectItem value="mixed-use">Mixed Use</SelectItem>
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
            <Label htmlFor="squareFootage">Square Footage</Label>
            <Input
              id="squareFootage"
              value={formData.squareFootage}
              onChange={(e) => setFormData(prev => ({ ...prev, squareFootage: e.target.value }))}
            />
          </div>
        </div>

        {/* Energy Efficiency */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-700">Energy Efficiency</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="actualEnergyUse">Actual Energy Use (kWh/sq ft/year)</Label>
              <Input
                id="actualEnergyUse"
                type="number"
                value={formData.actualEnergyUse}
                onChange={(e) => setFormData(prev => ({ ...prev, actualEnergyUse: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="benchmarkEnergyUse">Benchmark Energy Use (kWh/sq ft/year)</Label>
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

        {/* Social Impact */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-teal-700">Social Impact</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adaCompliance">ADA Standards Compliance</Label>
              <Select
                value={formData.adaStandardsCompliance}
                onValueChange={(value) => setFormData(prev => ({ ...prev, adaStandardsCompliance: value }))}
              >
                <SelectTrigger className="z-40 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-40 bg-white border shadow-lg">
                  <SelectItem value="Not Compliant">Not Compliant</SelectItem>
                  <SelectItem value="Partially Compliant">Partially Compliant</SelectItem>
                  <SelectItem value="Compliant">Compliant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="goodAirQuality"
                  checked={formData.goodAirQuality}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, goodAirQuality: !!checked }))}
                />
                <Label htmlFor="goodAirQuality">Good Air Quality</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="naturalLight"
                  checked={formData.naturalLight}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, naturalLight: !!checked }))}
                />
                <Label htmlFor="naturalLight">Natural Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ergonomicDesign"
                  checked={formData.ergonomicDesign}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, ergonomicDesign: !!checked }))}
                />
                <Label htmlFor="ergonomicDesign">Ergonomic Design</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="communitySpace"
                  checked={formData.communitySpace}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, communitySpace: !!checked }))}
                />
                <Label htmlFor="communitySpace">Community Space</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="localSourcing"
                  checked={formData.localSourcing}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, localSourcing: !!checked }))}
                />
                <Label htmlFor="localSourcing">Local Sourcing</Label>
              </div>
            </div>
          </div>
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
                  checked={formData[cert.id as keyof PropertyESGData] as boolean}
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
          <div className="space-y-4">
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
        </div>

        {/* Additional Notes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Additional Notes</h3>
          <Textarea
            placeholder="Any additional information about the property."
            value={formData.additionalNotes}
            onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
            className="min-h-[100px]"
          />
        </div>

        {/* Calculate Button */}
        <div className="flex justify-center">
          <Button 
            onClick={calculateESGScore}
            className="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            Calculate ESG Assessment
          </Button>
        </div>

        {/* Results Display */}
        {esgScore !== null && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-center">ESG Assessment Results</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className={`inline-block px-6 py-3 rounded-lg ${getScoreRating(esgScore).bgColor}`}>
                <div className="text-3xl font-bold">{esgScore}/100</div>
                <div className={`text-lg font-semibold ${getScoreRating(esgScore).color}`}>
                  {getScoreRating(esgScore).rating}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyESGAssessmentForm;