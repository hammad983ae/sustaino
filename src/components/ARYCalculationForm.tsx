import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, Calculator, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useUniversalSave } from "@/hooks/useUniversalSave";
import { useToast } from "@/hooks/use-toast";

interface ARYInputs {
  propertyValue: number;
  annualRent: number;
  operatingExpenses: number;
  vacancyRate: number;
  propertyType: string;
  location: string;
  marketCondition: string;
}

interface ARYCalculationFormProps {
  onSubmit: (data: any) => void;
}

const ARYCalculationForm = ({ onSubmit }: ARYCalculationFormProps) => {
  const { saveData, loadData, isSaving, lastSaved } = useUniversalSave('ARYCalculationForm', { showToast: false });
  const { toast } = useToast();
  
  const [inputs, setInputs] = useState<ARYInputs>({
    propertyValue: 0,
    annualRent: 0,
    operatingExpenses: 0,
    vacancyRate: 0,
    propertyType: "",
    location: "",
    marketCondition: ""
  });

  const [results, setResults] = useState<any>(null);

  const handleInputChange = (field: keyof ARYInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateARY = () => {
    const effectiveRent = inputs.annualRent * (1 - inputs.vacancyRate / 100);
    const netIncome = effectiveRent - inputs.operatingExpenses;
    const aryPercentage = inputs.propertyValue > 0 ? (netIncome / inputs.propertyValue) * 100 : 0;
    
    // Market adjustment factors
    let marketAdjustment = 1;
    switch (inputs.marketCondition) {
      case 'strong': marketAdjustment = 0.95; break;
      case 'weak': marketAdjustment = 1.05; break;
      default: marketAdjustment = 1;
    }

    const adjustedARY = aryPercentage * marketAdjustment;
    const yieldRating = adjustedARY > 6 ? 'High' : adjustedARY > 4 ? 'Medium' : 'Low';

    const calculationResults = {
      grossRent: inputs.annualRent,
      effectiveRent,
      netIncome,
      rawARY: aryPercentage,
      adjustedARY,
      yieldRating,
      marketAdjustment: (marketAdjustment - 1) * 100,
      netYield: adjustedARY
    };

    setResults(calculationResults);
    onSubmit(calculationResults);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Target className="w-5 h-5" />
          All Risks Yield (ARY) Calculation
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Calculate the All Risks Yield for investment property analysis
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="propertyValue">Property Value ($)</Label>
              <Input
                id="propertyValue"
                type="number"
                placeholder="e.g., 1,000,000"
                value={inputs.propertyValue || ""}
                onChange={(e) => handleInputChange('propertyValue', Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="annualRent">Annual Rent ($)</Label>
              <Input
                id="annualRent"
                type="number"
                placeholder="e.g., 65,000"
                value={inputs.annualRent || ""}
                onChange={(e) => handleInputChange('annualRent', Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="operatingExpenses">Operating Expenses ($)</Label>
              <Input
                id="operatingExpenses"
                type="number"
                placeholder="e.g., 15,000"
                value={inputs.operatingExpenses || ""}
                onChange={(e) => handleInputChange('operatingExpenses', Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="vacancyRate">Vacancy Rate (%)</Label>
              <Input
                id="vacancyRate"
                type="number"
                placeholder="e.g., 5"
                max="100"
                value={inputs.vacancyRate || ""}
                onChange={(e) => handleInputChange('vacancyRate', Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="propertyType">Property Type</Label>
              <Select onValueChange={(value) => handleInputChange('propertyType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Location Grade</Label>
              <Select onValueChange={(value) => handleInputChange('location', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prime">Prime Location</SelectItem>
                  <SelectItem value="good">Good Location</SelectItem>
                  <SelectItem value="average">Average Location</SelectItem>
                  <SelectItem value="poor">Poor Location</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="marketCondition">Market Condition</Label>
              <Select onValueChange={(value) => handleInputChange('marketCondition', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select market condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strong">Strong Market</SelectItem>
                  <SelectItem value="stable">Stable Market</SelectItem>
                  <SelectItem value="weak">Weak Market</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={calculateARY} 
              className="w-full mt-6"
              disabled={!inputs.propertyValue || !inputs.annualRent}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculate ARY
            </Button>
          </div>
        </div>

        {/* Results Display */}
        {results && (
          <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20 mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                ARY Calculation Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-background rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {results.adjustedARY.toFixed(2)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Adjusted ARY</p>
                </div>

                <div className="text-center p-3 bg-background rounded-lg">
                  <div className="text-xl font-semibold text-success">
                    ${results.netIncome.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Net Income</p>
                </div>

                <div className="text-center p-3 bg-background rounded-lg">
                  <div className="text-xl font-semibold text-info">
                    ${results.effectiveRent.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Effective Rent</p>
                </div>

                <div className="text-center p-3 bg-background rounded-lg">
                  <Badge 
                    variant={results.yieldRating === 'High' ? 'default' : 
                            results.yieldRating === 'Medium' ? 'secondary' : 'outline'}
                    className="text-base px-3 py-1"
                  >
                    {results.yieldRating} Yield
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">Yield Rating</p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <h4 className="font-semibold">Calculation Breakdown:</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Gross Rent: ${results.grossRent.toLocaleString()}</p>
                  <p>• Effective Rent: ${results.effectiveRent.toLocaleString()} (after {inputs.vacancyRate}% vacancy)</p>
                  <p>• Operating Expenses: ${inputs.operatingExpenses.toLocaleString()}</p>
                  <p>• Net Income: ${results.netIncome.toLocaleString()}</p>
                  <p>• Raw ARY: {results.rawARY.toFixed(2)}%</p>
                  <p>• Market Adjustment: {results.marketAdjustment.toFixed(1)}%</p>
                  <p>• <strong>Final ARY: {results.adjustedARY.toFixed(2)}%</strong></p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default ARYCalculationForm;