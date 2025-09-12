import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Leaf, Calculator, Award, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ESGMethodologyProtection from "@/components/ESGMethodologyProtection";

interface ESGInputs {
  energyRating: number;
  waterEfficiency: number;
  wasteManagement: number;
  greenCertification: string;
  socialImpact: number;
  communityEngagement: number;
  accessibilityCompliance: number;
  boardDiversity: number;
  transparencyScore: number;
  ethicalPractices: number;
  basePropertyValue: number;
}

interface ESGCalculationFormProps {
  onSubmit: (data: any) => void;
}

const ESGCalculationForm = ({ onSubmit }: ESGCalculationFormProps) => {
  const [inputs, setInputs] = useState<ESGInputs>({
    energyRating: 5,
    waterEfficiency: 5,
    wasteManagement: 5,
    greenCertification: "",
    socialImpact: 5,
    communityEngagement: 5,
    accessibilityCompliance: 5,
    boardDiversity: 5,
    transparencyScore: 5,
    ethicalPractices: 5,
    basePropertyValue: 0
  });

  const [results, setResults] = useState<any>(null);

  const handleInputChange = (field: keyof ESGInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateESG = () => {
    // Environmental Score (40% weight)
    const environmentalScore = (
      (inputs.energyRating * 0.4) +
      (inputs.waterEfficiency * 0.3) +
      (inputs.wasteManagement * 0.3)
    );

    // Green certification bonus
    let certificationBonus = 0;
    switch (inputs.greenCertification) {
      case 'green-star': certificationBonus = 1.5; break;
      case 'nabers': certificationBonus = 1.2; break;
      case 'bca-green': certificationBonus = 1.0; break;
      case 'leed': certificationBonus = 1.3; break;
      default: certificationBonus = 0;
    }

    const adjustedEnvironmental = Math.min(10, environmentalScore + certificationBonus);

    // Social Score (30% weight)
    const socialScore = (
      (inputs.socialImpact * 0.4) +
      (inputs.communityEngagement * 0.3) +
      (inputs.accessibilityCompliance * 0.3)
    );

    // Governance Score (30% weight)
    const governanceScore = (
      (inputs.boardDiversity * 0.35) +
      (inputs.transparencyScore * 0.35) +
      (inputs.ethicalPractices * 0.3)
    );

    // Overall ESG Score
    const overallESG = (
      (adjustedEnvironmental * 0.4) +
      (socialScore * 0.3) +
      (governanceScore * 0.3)
    );

    // ESG Adjustment Factor (can add 0-15% premium or -5% discount)
    let esgAdjustment = 0;
    if (overallESG >= 8.5) esgAdjustment = 0.15; // 15% premium
    else if (overallESG >= 7.5) esgAdjustment = 0.10; // 10% premium
    else if (overallESG >= 6.5) esgAdjustment = 0.05; // 5% premium
    else if (overallESG >= 5.5) esgAdjustment = 0.00; // No adjustment
    else if (overallESG >= 4.0) esgAdjustment = -0.03; // 3% discount
    else esgAdjustment = -0.05; // 5% discount

    const adjustedPropertyValue = inputs.basePropertyValue * (1 + esgAdjustment);
    const valueImpact = adjustedPropertyValue - inputs.basePropertyValue;

    // Risk Rating
    let riskRating = 'Low';
    if (overallESG < 4) riskRating = 'High';
    else if (overallESG < 6) riskRating = 'Medium';

    const calculationResults = {
      environmentalScore: adjustedEnvironmental,
      socialScore,
      governanceScore,
      overallESG,
      esgGrade: overallESG >= 8.5 ? 'A+' : overallESG >= 7.5 ? 'A' : overallESG >= 6.5 ? 'B+' : overallESG >= 5.5 ? 'B' : overallESG >= 4.0 ? 'C' : 'D',
      esgAdjustment: esgAdjustment * 100,
      baseValue: inputs.basePropertyValue,
      adjustedValue: adjustedPropertyValue,
      valueImpact,
      riskRating,
      certificationBonus: certificationBonus > 0 ? inputs.greenCertification : 'None'
    };

    setResults(calculationResults);
    onSubmit(calculationResults);
  };

  return (
    <div className="space-y-6">
      {/* IP Protection Notice */}
      <ESGMethodologyProtection />

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-success">
            <Leaf className="w-5 h-5" />
            ESG Assessment & Valuation Impact Analysis
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Comprehensive Environmental, Social, and Governance assessment with property value impact calculation
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Base Property Value */}
          <div className="mb-6">
            <Label htmlFor="basePropertyValue">Base Property Value ($)</Label>
            <Input
              id="basePropertyValue"
              type="number"
              placeholder="e.g., 1,000,000"
              value={inputs.basePropertyValue || ""}
              onChange={(e) => handleInputChange('basePropertyValue', Number(e.target.value))}
            />
          </div>

          {/* Environmental Factors */}
          <Card className="bg-gradient-to-br from-card to-success/5 border-success/20">
            <CardHeader>
              <CardTitle className="text-lg text-success">Environmental Factors (40% weight)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Energy Efficiency Rating: {inputs.energyRating}/10</Label>
                <Slider
                  value={[inputs.energyRating]}
                  onValueChange={(value) => handleInputChange('energyRating', value[0])}
                  max={10}
                  min={1}
                  step={0.5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Water Efficiency: {inputs.waterEfficiency}/10</Label>
                <Slider
                  value={[inputs.waterEfficiency]}
                  onValueChange={(value) => handleInputChange('waterEfficiency', value[0])}
                  max={10}
                  min={1}
                  step={0.5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Waste Management: {inputs.wasteManagement}/10</Label>
                <Slider
                  value={[inputs.wasteManagement]}
                  onValueChange={(value) => handleInputChange('wasteManagement', value[0])}
                  max={10}
                  min={1}
                  step={0.5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="greenCertification">Green Building Certification</Label>
                <Select onValueChange={(value) => handleInputChange('greenCertification', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select certification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="green-star">Green Star</SelectItem>
                    <SelectItem value="nabers">NABERS</SelectItem>
                    <SelectItem value="bca-green">BCA Green Mark</SelectItem>
                    <SelectItem value="leed">LEED</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Social Factors */}
          <Card className="bg-gradient-to-br from-card to-info/5 border-info/20">
            <CardHeader>
              <CardTitle className="text-lg text-info">Social Factors (30% weight)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Social Impact & Community Benefits: {inputs.socialImpact}/10</Label>
                <Slider
                  value={[inputs.socialImpact]}
                  onValueChange={(value) => handleInputChange('socialImpact', value[0])}
                  max={10}
                  min={1}
                  step={0.5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Community Engagement: {inputs.communityEngagement}/10</Label>
                <Slider
                  value={[inputs.communityEngagement]}
                  onValueChange={(value) => handleInputChange('communityEngagement', value[0])}
                  max={10}
                  min={1}
                  step={0.5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Accessibility Compliance: {inputs.accessibilityCompliance}/10</Label>
                <Slider
                  value={[inputs.accessibilityCompliance]}
                  onValueChange={(value) => handleInputChange('accessibilityCompliance', value[0])}
                  max={10}
                  min={1}
                  step={0.5}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Governance Factors */}
          <Card className="bg-gradient-to-br from-card to-warning/5 border-warning/20">
            <CardHeader>
              <CardTitle className="text-lg text-warning">Governance Factors (30% weight)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Board/Management Diversity: {inputs.boardDiversity}/10</Label>
                <Slider
                  value={[inputs.boardDiversity]}
                  onValueChange={(value) => handleInputChange('boardDiversity', value[0])}
                  max={10}
                  min={1}
                  step={0.5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Transparency & Reporting: {inputs.transparencyScore}/10</Label>
                <Slider
                  value={[inputs.transparencyScore]}
                  onValueChange={(value) => handleInputChange('transparencyScore', value[0])}
                  max={10}
                  min={1}
                  step={0.5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Ethical Business Practices: {inputs.ethicalPractices}/10</Label>
                <Slider
                  value={[inputs.ethicalPractices]}
                  onValueChange={(value) => handleInputChange('ethicalPractices', value[0])}
                  max={10}
                  min={1}
                  step={0.5}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={calculateESG} 
            className="w-full"
            disabled={!inputs.basePropertyValue}
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate ESG Impact
          </Button>

          {/* Results Display */}
          {results && (
            <Card className="bg-gradient-to-br from-card to-success/5 border-success/20 mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-success" />
                  ESG Assessment Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-background rounded-lg">
                    <div className="text-2xl font-bold text-success">
                      {results.esgGrade}
                    </div>
                    <p className="text-sm text-muted-foreground">ESG Grade</p>
                  </div>

                  <div className="text-center p-3 bg-background rounded-lg">
                    <div className="text-xl font-semibold text-primary">
                      {results.overallESG.toFixed(1)}/10
                    </div>
                    <p className="text-sm text-muted-foreground">Overall ESG Score</p>
                  </div>

                  <div className="text-center p-3 bg-background rounded-lg">
                    <div className={`text-xl font-semibold ${results.esgAdjustment >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {results.esgAdjustment > 0 ? '+' : ''}{results.esgAdjustment.toFixed(1)}%
                    </div>
                    <p className="text-sm text-muted-foreground">Value Adjustment</p>
                  </div>

                  <div className="text-center p-3 bg-background rounded-lg">
                    <Badge 
                      variant={results.riskRating === 'Low' ? 'default' : 
                              results.riskRating === 'Medium' ? 'secondary' : 'destructive'}
                    >
                      {results.riskRating} Risk
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">ESG Risk</p>
                  </div>
                </div>

                {/* Detailed Scores */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <div className="text-lg font-semibold text-success">
                      {results.environmentalScore.toFixed(1)}/10
                    </div>
                    <p className="text-sm">Environmental</p>
                  </div>

                  <div className="text-center p-3 bg-info/10 rounded-lg">
                    <div className="text-lg font-semibold text-info">
                      {results.socialScore.toFixed(1)}/10
                    </div>
                    <p className="text-sm">Social</p>
                  </div>

                  <div className="text-center p-3 bg-warning/10 rounded-lg">
                    <div className="text-lg font-semibold text-warning">
                      {results.governanceScore.toFixed(1)}/10
                    </div>
                    <p className="text-sm">Governance</p>
                  </div>
                </div>

                {/* Financial Impact */}
                <Card className="bg-gradient-to-br from-background to-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg">Financial Impact Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Base Property Value:</span>
                        <span className="font-semibold">${results.baseValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ESG Adjusted Value:</span>
                        <span className="font-semibold">${results.adjustedValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Value Impact:</span>
                        <span className={`font-bold ${results.valueImpact >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {results.valueImpact >= 0 ? '+' : ''}${results.valueImpact.toLocaleString()}
                        </span>
                      </div>
                      {results.certificationBonus !== 'None' && (
                        <div className="flex justify-between">
                          <span>Green Certification:</span>
                          <span className="font-semibold text-success">{results.certificationBonus}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ESGCalculationForm;