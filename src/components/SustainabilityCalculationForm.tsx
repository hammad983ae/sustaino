import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, Calculator, Award } from "lucide-react";

interface SustainabilityInputs {
  energyRating: string;
  waterRating: string;
  solarCapacity: number;
  energyCostSavings: number;
  waterCostSavings: number;
  carbonReduction: number;
  greenCertification: string;
  sustainableFeatures: string[];
  basePropertyValue: number;
}

interface SustainabilityResults {
  esgScore: number;
  esgGrade: string;
  annualSavings: number;
  carbonOffset: number;
  valuePremium: number;
  adjustedPropertyValue: number;
  sustainabilityIndex: number;
  certificationBonus: number;
}

const SustainabilityCalculationForm: React.FC = () => {
  const [inputs, setInputs] = useState<SustainabilityInputs>({
    energyRating: '',
    waterRating: '',
    solarCapacity: 0,
    energyCostSavings: 0,
    waterCostSavings: 0,
    carbonReduction: 0,
    greenCertification: '',
    sustainableFeatures: [],
    basePropertyValue: 0,
  });

  const [results, setResults] = useState<SustainabilityResults | null>(null);

  const handleInputChange = (field: keyof SustainabilityInputs, value: string | number | string[]) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateSustainability = () => {
    // Energy rating scoring
    const energyScores: { [key: string]: number } = {
      '6-star': 100, '5-star': 85, '4-star': 70, '3-star': 55, '2-star': 40, '1-star': 25
    };

    // Water rating scoring
    const waterScores: { [key: string]: number } = {
      '6-star': 100, '5-star': 85, '4-star': 70, '3-star': 55, '2-star': 40, '1-star': 25
    };

    // Certification scoring
    const certificationScores: { [key: string]: number } = {
      'green-star': 30, 'nabers': 25, 'leed': 25, 'breeam': 20, 'none': 0
    };

    const energyScore = energyScores[inputs.energyRating] || 0;
    const waterScore = waterScores[inputs.waterRating] || 0;
    const certificationBonus = certificationScores[inputs.greenCertification] || 0;

    // Solar scoring (based on capacity)
    const solarScore = Math.min(inputs.solarCapacity * 2, 30); // Max 30 points

    // Carbon reduction scoring
    const carbonScore = Math.min(inputs.carbonReduction * 0.5, 25); // Max 25 points

    // Features scoring
    const featuresScore = inputs.sustainableFeatures.length * 5; // 5 points per feature

    // Calculate total ESG score
    const rawScore = (energyScore * 0.25) + (waterScore * 0.2) + (solarScore * 0.15) + 
                     (carbonScore * 0.15) + (featuresScore * 0.1) + (certificationBonus * 0.15);
    
    const esgScore = Math.min(rawScore, 100);

    // Determine grade
    let esgGrade = 'D';
    if (esgScore >= 90) esgGrade = 'A+';
    else if (esgScore >= 80) esgGrade = 'A';
    else if (esgScore >= 70) esgGrade = 'B+';
    else if (esgScore >= 60) esgGrade = 'B';
    else if (esgScore >= 50) esgGrade = 'C';

    // Calculate financial benefits
    const annualSavings = inputs.energyCostSavings + inputs.waterCostSavings;
    const carbonOffset = inputs.carbonReduction;

    // Value premium calculation (0-15% based on ESG score)
    const valuePremiumPercentage = (esgScore / 100) * 15;
    const valuePremium = (inputs.basePropertyValue * valuePremiumPercentage) / 100;
    const adjustedPropertyValue = inputs.basePropertyValue + valuePremium;

    // Sustainability index (0-10 scale)
    const sustainabilityIndex = esgScore / 10;

    const calculatedResults: SustainabilityResults = {
      esgScore,
      esgGrade,
      annualSavings,
      carbonOffset,
      valuePremium,
      adjustedPropertyValue,
      sustainabilityIndex,
      certificationBonus,
    };

    setResults(calculatedResults);
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    if (inputs.basePropertyValue > 0) {
      calculateSustainability();
    }
  }, [inputs]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-500" />
          <CardTitle>Sustainability & ESG Assessment</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="base-property-value">Base Property Value ($)</Label>
              <Input
                id="base-property-value"
                type="number"
                value={inputs.basePropertyValue || ''}
                onChange={(e) => handleInputChange('basePropertyValue', parseFloat(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="green-certification">Green Certification</Label>
              <Select value={inputs.greenCertification} onValueChange={(value) => handleInputChange('greenCertification', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select certification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="green-star">Green Star</SelectItem>
                  <SelectItem value="nabers">NABERS</SelectItem>
                  <SelectItem value="leed">LEED</SelectItem>
                  <SelectItem value="breeam">BREEAM</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="energy-rating">Energy Rating</Label>
              <Select value={inputs.energyRating} onValueChange={(value) => handleInputChange('energyRating', value)}>
                <SelectTrigger className="mt-1">
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
              <Label htmlFor="water-rating">Water Rating</Label>
              <Select value={inputs.waterRating} onValueChange={(value) => handleInputChange('waterRating', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select water rating" />
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="solar-capacity">Solar Capacity (kW)</Label>
              <Input
                id="solar-capacity"
                type="number"
                value={inputs.solarCapacity || ''}
                onChange={(e) => handleInputChange('solarCapacity', parseFloat(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="energy-cost-savings">Annual Energy Savings ($)</Label>
              <Input
                id="energy-cost-savings"
                type="number"
                value={inputs.energyCostSavings || ''}
                onChange={(e) => handleInputChange('energyCostSavings', parseFloat(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="water-cost-savings">Annual Water Savings ($)</Label>
              <Input
                id="water-cost-savings"
                type="number"
                value={inputs.waterCostSavings || ''}
                onChange={(e) => handleInputChange('waterCostSavings', parseFloat(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="carbon-reduction">Annual Carbon Reduction (tonnes CO2)</Label>
            <Input
              id="carbon-reduction"
              type="number"
              value={inputs.carbonReduction || ''}
              onChange={(e) => handleInputChange('carbonReduction', parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-green-500" />
              <h3 className="text-lg font-semibold">ESG Assessment Results</h3>
            </div>

            {/* ESG Score */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{results.esgScore.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">ESG Score</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{results.esgGrade}</div>
                <div className="text-sm text-muted-foreground">ESG Grade</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">{results.sustainabilityIndex.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">Sustainability Index</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">${results.annualSavings.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Annual Savings</div>
              </div>
            </div>

            {/* Financial Impact */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Financial Impact</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Value Premium</div>
                  <div className="font-semibold text-green-600">
                    +${results.valuePremium.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Adjusted Property Value</div>
                  <div className="font-semibold">
                    ${results.adjustedPropertyValue.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Carbon Offset</div>
                  <div className="font-semibold">
                    {results.carbonOffset.toFixed(1)} tonnes CO2/year
                  </div>
                </div>
              </div>
            </div>

            {/* Calculation Methodology */}
            <div className="bg-yellow-50 p-4 rounded-lg text-sm">
              <h4 className="font-medium mb-2">Calculation Methodology</h4>
              <div className="space-y-1 text-muted-foreground">
                <div>ESG Score = (Energy×25%) + (Water×20%) + (Solar×15%) + (Carbon×15%) + (Features×10%) + (Certification×15%)</div>
                <div>Value Premium = Base Value × (ESG Score/100) × 15% = ${results.valuePremium.toLocaleString()}</div>
                <div>Sustainability Index = ESG Score ÷ 10 = {results.sustainabilityIndex.toFixed(1)}/10</div>
                <div>Annual Savings = Energy Savings + Water Savings = ${results.annualSavings.toLocaleString()}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SustainabilityCalculationForm;