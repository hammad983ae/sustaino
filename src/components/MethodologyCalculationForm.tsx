import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calculator, BookOpen, AlertTriangle } from "lucide-react";

interface MethodologyInputs {
  primaryMethod: string;
  secondaryMethod: string;
  propertyType: string;
  landValue: number;
  buildingValue: number;
  totalValue: number;
  capitalisationRate: number;
  netIncome: number;
  marketEvidence: number;
  depreciation: number;
  adjustments: number;
}

interface MethodologyResults {
  incomeApproach: number;
  costApproach: number;
  comparisonApproach: number;
  weightedValue: number;
  methodologyWeights: {
    income: number;
    cost: number;
    comparison: number;
  };
  confidence: string;
  varianceAnalysis: {
    highValue: number;
    lowValue: number;
    variance: number;
    variancePercentage: number;
  };
}

const MethodologyCalculationForm: React.FC = () => {
  const [inputs, setInputs] = useState<MethodologyInputs>({
    primaryMethod: '',
    secondaryMethod: '',
    propertyType: '',
    landValue: 0,
    buildingValue: 0,
    totalValue: 0,
    capitalisationRate: 0,
    netIncome: 0,
    marketEvidence: 0,
    depreciation: 0,
    adjustments: 0,
  });

  const [results, setResults] = useState<MethodologyResults | null>(null);

  const handleInputChange = (field: keyof MethodologyInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateMethodology = () => {
    // Income Approach Calculation
    const incomeApproach = inputs.capitalisationRate > 0 ? 
      (inputs.netIncome / inputs.capitalisationRate) * 100 : 0;

    // Cost Approach Calculation
    const costApproach = inputs.landValue + inputs.buildingValue - inputs.depreciation + inputs.adjustments;

    // Comparison Approach (using market evidence as base)
    const comparisonApproach = inputs.marketEvidence + inputs.adjustments;

    // Determine methodology weights based on property type and primary method
    let weights = { income: 0.5, cost: 0.25, comparison: 0.25 };

    switch (inputs.propertyType) {
      case 'commercial':
        weights = { income: 0.6, cost: 0.15, comparison: 0.25 };
        break;
      case 'residential':
        weights = { income: 0.2, cost: 0.2, comparison: 0.6 };
        break;
      case 'agricultural':
        weights = { income: 0.4, cost: 0.3, comparison: 0.3 };
        break;
      case 'specialised':
        weights = { income: 0.3, cost: 0.5, comparison: 0.2 };
        break;
    }

    // Adjust weights based on primary method
    if (inputs.primaryMethod === 'income') {
      weights.income += 0.2;
      weights.cost -= 0.1;
      weights.comparison -= 0.1;
    } else if (inputs.primaryMethod === 'cost') {
      weights.cost += 0.2;
      weights.income -= 0.1;
      weights.comparison -= 0.1;
    } else if (inputs.primaryMethod === 'comparison') {
      weights.comparison += 0.2;
      weights.income -= 0.1;
      weights.cost -= 0.1;
    }

    // Calculate weighted value
    const weightedValue = (incomeApproach * weights.income) + 
                         (costApproach * weights.cost) + 
                         (comparisonApproach * weights.comparison);

    // Variance analysis
    const values = [incomeApproach, costApproach, comparisonApproach].filter(v => v > 0);
    const highValue = Math.max(...values);
    const lowValue = Math.min(...values);
    const variance = highValue - lowValue;
    const variancePercentage = lowValue > 0 ? (variance / lowValue) * 100 : 0;

    // Confidence assessment
    let confidence = 'Medium';
    if (variancePercentage < 10) confidence = 'High';
    else if (variancePercentage > 25) confidence = 'Low';

    const calculatedResults: MethodologyResults = {
      incomeApproach,
      costApproach,
      comparisonApproach,
      weightedValue,
      methodologyWeights: weights,
      confidence,
      varianceAnalysis: {
        highValue,
        lowValue,
        variance,
        variancePercentage,
      }
    };

    setResults(calculatedResults);
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    if (Object.values(inputs).some(val => val > 0)) {
      calculateMethodology();
    }
  }, [inputs]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-purple-500" />
          <CardTitle>Valuation Methodology & Calculation</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="property-type">Property Type</Label>
              <Select value={inputs.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="agricultural">Agricultural</SelectItem>
                  <SelectItem value="specialised">Specialised</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="primary-method">Primary Method</Label>
              <Select value={inputs.primaryMethod} onValueChange={(value) => handleInputChange('primaryMethod', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select primary method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income Approach</SelectItem>
                  <SelectItem value="cost">Cost Approach</SelectItem>
                  <SelectItem value="comparison">Sales Comparison</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="secondary-method">Secondary Method</Label>
              <Select value={inputs.secondaryMethod} onValueChange={(value) => handleInputChange('secondaryMethod', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select secondary method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income Approach</SelectItem>
                  <SelectItem value="cost">Cost Approach</SelectItem>
                  <SelectItem value="comparison">Sales Comparison</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Income Approach Inputs */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">Income Approach</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="net-income">Net Income ($)</Label>
                <Input
                  id="net-income"
                  type="number"
                  value={inputs.netIncome || ''}
                  onChange={(e) => handleInputChange('netIncome', parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="capitalisation-rate">Capitalisation Rate (%)</Label>
                <Input
                  id="capitalisation-rate"
                  type="number"
                  step="0.01"
                  value={inputs.capitalisationRate || ''}
                  onChange={(e) => handleInputChange('capitalisationRate', parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Cost Approach Inputs */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">Cost Approach</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="land-value">Land Value ($)</Label>
                <Input
                  id="land-value"
                  type="number"
                  value={inputs.landValue || ''}
                  onChange={(e) => handleInputChange('landValue', parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="building-value">Building Value ($)</Label>
                <Input
                  id="building-value"
                  type="number"
                  value={inputs.buildingValue || ''}
                  onChange={(e) => handleInputChange('buildingValue', parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="depreciation">Depreciation ($)</Label>
                <Input
                  id="depreciation"
                  type="number"
                  value={inputs.depreciation || ''}
                  onChange={(e) => handleInputChange('depreciation', parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="adjustments">Adjustments ($)</Label>
                <Input
                  id="adjustments"
                  type="number"
                  value={inputs.adjustments || ''}
                  onChange={(e) => handleInputChange('adjustments', parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Comparison Approach Inputs */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">Sales Comparison Approach</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="market-evidence">Market Evidence Value ($)</Label>
                <Input
                  id="market-evidence"
                  type="number"
                  value={inputs.marketEvidence || ''}
                  onChange={(e) => handleInputChange('marketEvidence', parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-semibold">Methodology Results</h3>
            </div>

            {/* Approach Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Income Approach</div>
                <div className="text-xl font-semibold text-blue-600">
                  ${results.incomeApproach.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Weight: {(results.methodologyWeights.income * 100).toFixed(0)}%
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Cost Approach</div>
                <div className="text-xl font-semibold text-green-600">
                  ${results.costApproach.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Weight: {(results.methodologyWeights.cost * 100).toFixed(0)}%
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Sales Comparison</div>
                <div className="text-xl font-semibold text-purple-600">
                  ${results.comparisonApproach.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Weight: {(results.methodologyWeights.comparison * 100).toFixed(0)}%
                </div>
              </div>
            </div>

            {/* Final Weighted Value */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg border-2 border-orange-200">
              <div className="text-center">
                <div className="text-lg text-muted-foreground">Weighted Market Value</div>
                <div className="text-3xl font-bold text-orange-600">
                  ${results.weightedValue.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Confidence Level: <span className={`font-medium ${
                    results.confidence === 'High' ? 'text-green-600' : 
                    results.confidence === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>{results.confidence}</span>
                </div>
              </div>
            </div>

            {/* Variance Analysis */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Variance Analysis
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">High Value</div>
                  <div className="font-semibold">${results.varianceAnalysis.highValue.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Low Value</div>
                  <div className="font-semibold">${results.varianceAnalysis.lowValue.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Variance</div>
                  <div className="font-semibold">${results.varianceAnalysis.variance.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Variance %</div>
                  <div className="font-semibold">{results.varianceAnalysis.variancePercentage.toFixed(1)}%</div>
                </div>
              </div>
            </div>

            {/* Calculation Workings */}
            <div className="bg-yellow-50 p-4 rounded-lg text-sm">
              <h4 className="font-medium mb-2">Calculation Workings</h4>
              <div className="space-y-1 text-muted-foreground">
                <div>Income Approach = Net Income ÷ Cap Rate = ${inputs.netIncome.toLocaleString()} ÷ {inputs.capitalisationRate}% = ${results.incomeApproach.toLocaleString()}</div>
                <div>Cost Approach = Land + Building - Depreciation + Adjustments = ${results.costApproach.toLocaleString()}</div>
                <div>Sales Comparison = Market Evidence + Adjustments = ${results.comparisonApproach.toLocaleString()}</div>
                <div>Weighted Value = (Income×{(results.methodologyWeights.income*100).toFixed(0)}%) + (Cost×{(results.methodologyWeights.cost*100).toFixed(0)}%) + (Comparison×{(results.methodologyWeights.comparison*100).toFixed(0)}%)</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MethodologyCalculationForm;