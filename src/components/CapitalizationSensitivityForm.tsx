import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart3, Calculator, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CapSensitivityInputs {
  netIncome: number;
  baseCapRate: number;
  capRateRange: {
    min: number;
    max: number;
    increment: number;
  };
  marketScenarios: {
    optimistic: number;
    realistic: number;
    pessimistic: number;
  };
}

interface CapitalizationSensitivityFormProps {
  onSubmit: (data: any) => void;
}

const CapitalizationSensitivityForm = ({ onSubmit }: CapitalizationSensitivityFormProps) => {
  const [inputs, setInputs] = useState<CapSensitivityInputs>({
    netIncome: 0,
    baseCapRate: 0,
    capRateRange: {
      min: 4.0,
      max: 8.0,
      increment: 0.25
    },
    marketScenarios: {
      optimistic: 5.0,
      realistic: 6.0,
      pessimistic: 7.5
    }
  });

  const [results, setResults] = useState<any>(null);

  const handleInputChange = (field: string, value: number) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setInputs(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof CapSensitivityInputs] as any),
          [child]: value
        }
      }));
    } else {
      setInputs(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const calculateSensitivity = () => {
    // Generate sensitivity table
    const sensitivityTable = [];
    for (let rate = inputs.capRateRange.min; rate <= inputs.capRateRange.max; rate += inputs.capRateRange.increment) {
      const value = inputs.netIncome / (rate / 100);
      const percentageChange = ((value - (inputs.netIncome / (inputs.baseCapRate / 100))) / (inputs.netIncome / (inputs.baseCapRate / 100))) * 100;
      
      sensitivityTable.push({
        capRate: rate,
        value: Math.round(value),
        percentageChange: Math.round(percentageChange * 100) / 100
      });
    }

    // Scenario analysis
    const scenarios = {
      optimistic: {
        rate: inputs.marketScenarios.optimistic,
        value: Math.round(inputs.netIncome / (inputs.marketScenarios.optimistic / 100)),
        impact: 'Positive market conditions, lower cap rates'
      },
      realistic: {
        rate: inputs.marketScenarios.realistic,
        value: Math.round(inputs.netIncome / (inputs.marketScenarios.realistic / 100)),
        impact: 'Current market conditions maintained'
      },
      pessimistic: {
        rate: inputs.marketScenarios.pessimistic,
        value: Math.round(inputs.netIncome / (inputs.marketScenarios.pessimistic / 100)),
        impact: 'Economic downturn, higher cap rates required'
      }
    };

    // Risk analysis
    const baseValue = inputs.netIncome / (inputs.baseCapRate / 100);
    const valueRange = {
      max: Math.max(...sensitivityTable.map(item => item.value)),
      min: Math.min(...sensitivityTable.map(item => item.value))
    };
    
    const volatility = ((valueRange.max - valueRange.min) / baseValue) * 100;
    const riskLevel = volatility > 40 ? 'High' : volatility > 20 ? 'Medium' : 'Low';

    const calculationResults = {
      sensitivityTable,
      scenarios,
      baseValue: Math.round(baseValue),
      valueRange,
      volatility: Math.round(volatility * 100) / 100,
      riskLevel,
      optimalRange: {
        min: inputs.marketScenarios.optimistic,
        max: inputs.marketScenarios.realistic
      }
    };

    setResults(calculationResults);
    onSubmit(calculationResults);
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-info">
          <BarChart3 className="w-5 h-5" />
          Capitalization Rate Sensitivity Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Analyze how changes in cap rates affect property valuation across different market scenarios
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="netIncome">Net Operating Income ($)</Label>
              <Input
                id="netIncome"
                type="number"
                placeholder="e.g., 85,000"
                value={inputs.netIncome || ""}
                onChange={(e) => handleInputChange('netIncome', Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="baseCapRate">Base Cap Rate (%)</Label>
              <Input
                id="baseCapRate"
                type="number"
                step="0.1"
                placeholder="e.g., 6.0"
                value={inputs.baseCapRate || ""}
                onChange={(e) => handleInputChange('baseCapRate', Number(e.target.value))}
              />
            </div>

            <Card className="bg-gradient-to-br from-card to-accent/5">
              <CardHeader>
                <CardTitle className="text-base">Sensitivity Range</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="minRate">Minimum Cap Rate (%)</Label>
                  <Input
                    id="minRate"
                    type="number"
                    step="0.25"
                    value={inputs.capRateRange.min}
                    onChange={(e) => handleInputChange('capRateRange.min', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="maxRate">Maximum Cap Rate (%)</Label>
                  <Input
                    id="maxRate"
                    type="number"
                    step="0.25"
                    value={inputs.capRateRange.max}
                    onChange={(e) => handleInputChange('capRateRange.max', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="increment">Increment (%)</Label>
                  <Input
                    id="increment"
                    type="number"
                    step="0.05"
                    value={inputs.capRateRange.increment}
                    onChange={(e) => handleInputChange('capRateRange.increment', Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <CardTitle className="text-base">Market Scenarios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="optimistic" className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    Optimistic Scenario (%)
                  </Label>
                  <Input
                    id="optimistic"
                    type="number"
                    step="0.1"
                    value={inputs.marketScenarios.optimistic}
                    onChange={(e) => handleInputChange('marketScenarios.optimistic', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="realistic" className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-info" />
                    Realistic Scenario (%)
                  </Label>
                  <Input
                    id="realistic"
                    type="number"
                    step="0.1"
                    value={inputs.marketScenarios.realistic}
                    onChange={(e) => handleInputChange('marketScenarios.realistic', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="pessimistic" className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-destructive" />
                    Pessimistic Scenario (%)
                  </Label>
                  <Input
                    id="pessimistic"
                    type="number"
                    step="0.1"
                    value={inputs.marketScenarios.pessimistic}
                    onChange={(e) => handleInputChange('marketScenarios.pessimistic', Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={calculateSensitivity} 
              className="w-full"
              disabled={!inputs.netIncome || !inputs.baseCapRate}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Sensitivity
            </Button>
          </div>
        </div>

        {/* Results Display */}
        {results && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="text-xl font-bold text-primary">
                  ${results.baseValue.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Base Valuation</p>
              </div>

              <div className="text-center p-3 bg-success/10 rounded-lg">
                <div className="text-xl font-bold text-success">
                  ${results.valueRange.max.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Maximum Value</p>
              </div>

              <div className="text-center p-3 bg-destructive/10 rounded-lg">
                <div className="text-xl font-bold text-destructive">
                  ${results.valueRange.min.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Minimum Value</p>
              </div>

              <div className="text-center p-3 bg-warning/10 rounded-lg">
                <Badge 
                  variant={results.riskLevel === 'Low' ? 'default' : 
                          results.riskLevel === 'Medium' ? 'secondary' : 'destructive'}
                  className="text-base px-3 py-1"
                >
                  {results.riskLevel} Risk
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">{results.volatility}% Volatility</p>
              </div>
            </div>

            {/* Scenario Analysis */}
            <Card className="bg-gradient-to-br from-card to-info/5 border-info/20">
              <CardHeader>
                <CardTitle>Market Scenario Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-success/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-success" />
                      <h4 className="font-semibold text-success">Optimistic</h4>
                    </div>
                    <p className="text-2xl font-bold">${results.scenarios.optimistic.value.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">at {results.scenarios.optimistic.rate}% cap rate</p>
                    <p className="text-xs mt-2">{results.scenarios.optimistic.impact}</p>
                  </div>

                  <div className="p-4 bg-info/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-4 h-4 text-info" />
                      <h4 className="font-semibold text-info">Realistic</h4>
                    </div>
                    <p className="text-2xl font-bold">${results.scenarios.realistic.value.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">at {results.scenarios.realistic.rate}% cap rate</p>
                    <p className="text-xs mt-2">{results.scenarios.realistic.impact}</p>
                  </div>

                  <div className="p-4 bg-destructive/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-4 h-4 text-destructive" />
                      <h4 className="font-semibold text-destructive">Pessimistic</h4>
                    </div>
                    <p className="text-2xl font-bold">${results.scenarios.pessimistic.value.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">at {results.scenarios.pessimistic.rate}% cap rate</p>
                    <p className="text-xs mt-2">{results.scenarios.pessimistic.impact}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sensitivity Table */}
            <Card>
              <CardHeader>
                <CardTitle>Sensitivity Analysis Table</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Cap Rate (%)</th>
                        <th className="text-right p-2">Property Value ($)</th>
                        <th className="text-right p-2">Change from Base (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.sensitivityTable.map((row: any, index: number) => (
                        <tr key={index} className={`border-b ${Math.abs(row.capRate - inputs.baseCapRate) < 0.1 ? 'bg-primary/10' : ''}`}>
                          <td className="p-2 font-medium">{row.capRate.toFixed(2)}%</td>
                          <td className="p-2 text-right">${row.value.toLocaleString()}</td>
                          <td className={`p-2 text-right font-medium ${row.percentageChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {row.percentageChange > 0 ? '+' : ''}{row.percentageChange}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CapitalizationSensitivityForm;