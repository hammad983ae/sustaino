import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Calculator, TrendingUp, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NetIncomeInputs {
  grossRent: number;
  vacancyRate: number;
  operatingExpenses: {
    insurance: number;
    maintenance: number;
    management: number;
    utilities: number;
    taxes: number;
    other: number;
  };
  capitalizationRate: number;
  rentGrowthRate: number;
  expenseGrowthRate: number;
  projectionYears: number;
}

interface NetIncomeFormProps {
  onSubmit: (data: any) => void;
}

const NetIncomeForm = ({ onSubmit }: NetIncomeFormProps) => {
  const [inputs, setInputs] = useState<NetIncomeInputs>({
    grossRent: 0,
    vacancyRate: 5,
    operatingExpenses: {
      insurance: 0,
      maintenance: 0,
      management: 0,
      utilities: 0,
      taxes: 0,
      other: 0
    },
    capitalizationRate: 6.0,
    rentGrowthRate: 2.5,
    expenseGrowthRate: 3.0,
    projectionYears: 5
  });

  const [results, setResults] = useState<any>(null);

  const handleInputChange = (field: string, value: number) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setInputs(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof NetIncomeInputs] as any),
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

  const calculateNetIncome = () => {
    // Current year calculations
    const effectiveGrossIncome = inputs.grossRent * (1 - inputs.vacancyRate / 100);
    const totalOperatingExpenses = Object.values(inputs.operatingExpenses).reduce((sum, expense) => sum + expense, 0);
    const netOperatingIncome = effectiveGrossIncome - totalOperatingExpenses;
    const propertyValue = netOperatingIncome / (inputs.capitalizationRate / 100);

    // Expense breakdown
    const expenseBreakdown = {
      insurance: inputs.operatingExpenses.insurance,
      maintenance: inputs.operatingExpenses.maintenance,
      management: inputs.operatingExpenses.management,
      utilities: inputs.operatingExpenses.utilities,
      taxes: inputs.operatingExpenses.taxes,
      other: inputs.operatingExpenses.other,
      total: totalOperatingExpenses
    };

    // Multi-year projections
    const projections = [];
    for (let year = 1; year <= inputs.projectionYears; year++) {
      const projectedRent = inputs.grossRent * Math.pow(1 + inputs.rentGrowthRate / 100, year);
      const projectedExpenses = totalOperatingExpenses * Math.pow(1 + inputs.expenseGrowthRate / 100, year);
      const projectedEffectiveIncome = projectedRent * (1 - inputs.vacancyRate / 100);
      const projectedNOI = projectedEffectiveIncome - projectedExpenses;
      const projectedValue = projectedNOI / (inputs.capitalizationRate / 100);

      projections.push({
        year: year + new Date().getFullYear(),
        grossRent: Math.round(projectedRent),
        effectiveIncome: Math.round(projectedEffectiveIncome),
        operatingExpenses: Math.round(projectedExpenses),
        noi: Math.round(projectedNOI),
        propertyValue: Math.round(projectedValue)
      });
    }

    // Performance metrics
    const expenseRatio = (totalOperatingExpenses / effectiveGrossIncome) * 100;
    const cashOnCashReturn = (netOperatingIncome / propertyValue) * 100;
    const grossRentMultiplier = propertyValue / inputs.grossRent;

    const calculationResults = {
      currentYear: {
        grossRent: inputs.grossRent,
        vacancyLoss: inputs.grossRent * (inputs.vacancyRate / 100),
        effectiveGrossIncome,
        operatingExpenses: totalOperatingExpenses,
        netOperatingIncome,
        propertyValue: Math.round(propertyValue)
      },
      expenseBreakdown,
      projections,
      metrics: {
        expenseRatio: Math.round(expenseRatio * 100) / 100,
        cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
        grossRentMultiplier: Math.round(grossRentMultiplier * 100) / 100,
        capitalizationRate: inputs.capitalizationRate
      }
    };

    setResults(calculationResults);
    onSubmit(calculationResults);
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-warning">
          <DollarSign className="w-5 h-5" />
          Net Income Approach Valuation
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Calculate property value using the income capitalization method with multi-year projections
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Section */}
          <Card className="bg-gradient-to-br from-card to-success/5 border-success/20">
            <CardHeader>
              <CardTitle className="text-lg text-success">Revenue Inputs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="grossRent">Gross Annual Rent ($)</Label>
                <Input
                  id="grossRent"
                  type="number"
                  placeholder="e.g., 85,000"
                  value={inputs.grossRent || ""}
                  onChange={(e) => handleInputChange('grossRent', Number(e.target.value))}
                />
              </div>

              <div>
                <Label htmlFor="vacancyRate">Vacancy Rate (%)</Label>
                <Input
                  id="vacancyRate"
                  type="number"
                  placeholder="e.g., 5"
                  max="100"
                  value={inputs.vacancyRate}
                  onChange={(e) => handleInputChange('vacancyRate', Number(e.target.value))}
                />
              </div>

              <div>
                <Label htmlFor="rentGrowthRate">Annual Rent Growth Rate (%)</Label>
                <Input
                  id="rentGrowthRate"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 2.5"
                  value={inputs.rentGrowthRate}
                  onChange={(e) => handleInputChange('rentGrowthRate', Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Operating Expenses Section */}
          <Card className="bg-gradient-to-br from-card to-destructive/5 border-destructive/20">
            <CardHeader>
              <CardTitle className="text-lg text-destructive">Operating Expenses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="insurance">Insurance ($)</Label>
                <Input
                  id="insurance"
                  type="number"
                  placeholder="e.g., 2,500"
                  value={inputs.operatingExpenses.insurance || ""}
                  onChange={(e) => handleInputChange('operatingExpenses.insurance', Number(e.target.value))}
                />
              </div>

              <div>
                <Label htmlFor="maintenance">Maintenance & Repairs ($)</Label>
                <Input
                  id="maintenance"
                  type="number"
                  placeholder="e.g., 5,000"
                  value={inputs.operatingExpenses.maintenance || ""}
                  onChange={(e) => handleInputChange('operatingExpenses.maintenance', Number(e.target.value))}
                />
              </div>

              <div>
                <Label htmlFor="management">Property Management ($)</Label>
                <Input
                  id="management"
                  type="number"
                  placeholder="e.g., 4,250"
                  value={inputs.operatingExpenses.management || ""}
                  onChange={(e) => handleInputChange('operatingExpenses.management', Number(e.target.value))}
                />
              </div>

              <div>
                <Label htmlFor="utilities">Utilities ($)</Label>
                <Input
                  id="utilities"
                  type="number"
                  placeholder="e.g., 1,200"
                  value={inputs.operatingExpenses.utilities || ""}
                  onChange={(e) => handleInputChange('operatingExpenses.utilities', Number(e.target.value))}
                />
              </div>

              <div>
                <Label htmlFor="taxes">Property Taxes ($)</Label>
                <Input
                  id="taxes"
                  type="number"
                  placeholder="e.g., 8,000"
                  value={inputs.operatingExpenses.taxes || ""}
                  onChange={(e) => handleInputChange('operatingExpenses.taxes', Number(e.target.value))}
                />
              </div>

              <div>
                <Label htmlFor="other">Other Expenses ($)</Label>
                <Input
                  id="other"
                  type="number"
                  placeholder="e.g., 1,500"
                  value={inputs.operatingExpenses.other || ""}
                  onChange={(e) => handleInputChange('operatingExpenses.other', Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Valuation Parameters */}
        <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg text-primary">Valuation Parameters</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="capitalizationRate">Capitalization Rate (%)</Label>
              <Input
                id="capitalizationRate"
                type="number"
                step="0.1"
                placeholder="e.g., 6.0"
                value={inputs.capitalizationRate}
                onChange={(e) => handleInputChange('capitalizationRate', Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="expenseGrowthRate">Expense Growth Rate (%)</Label>
              <Input
                id="expenseGrowthRate"
                type="number"
                step="0.1"
                placeholder="e.g., 3.0"
                value={inputs.expenseGrowthRate}
                onChange={(e) => handleInputChange('expenseGrowthRate', Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="projectionYears">Projection Years</Label>
              <Input
                id="projectionYears"
                type="number"
                min="1"
                max="10"
                placeholder="e.g., 5"
                value={inputs.projectionYears}
                onChange={(e) => handleInputChange('projectionYears', Number(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        <Button 
          onClick={calculateNetIncome} 
          className="w-full"
          disabled={!inputs.grossRent || !inputs.capitalizationRate}
        >
          <Calculator className="w-4 h-4 mr-2" />
          Calculate Property Value
        </Button>

        {/* Results Display */}
        {results && (
          <div className="space-y-6">
            {/* Current Year Summary */}
            <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Current Year Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-background rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      ${results.currentYear.propertyValue.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Property Value</p>
                  </div>

                  <div className="text-center p-3 bg-background rounded-lg">
                    <div className="text-xl font-semibold text-success">
                      ${Math.round(results.currentYear.netOperatingIncome).toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Net Operating Income</p>
                  </div>

                  <div className="text-center p-3 bg-background rounded-lg">
                    <div className="text-xl font-semibold text-info">
                      ${Math.round(results.currentYear.effectiveGrossIncome).toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Effective Gross Income</p>
                  </div>

                  <div className="text-center p-3 bg-background rounded-lg">
                    <div className="text-xl font-semibold text-warning">
                      {results.metrics.expenseRatio}%
                    </div>
                    <p className="text-sm text-muted-foreground">Expense Ratio</p>
                  </div>
                </div>

                {/* Income Statement */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between font-medium">
                    <span>Gross Annual Rent:</span>
                    <span>${results.currentYear.grossRent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-destructive">
                    <span className="flex items-center gap-1">
                      <Minus className="w-3 h-3" />
                      Vacancy Loss ({inputs.vacancyRate}%):
                    </span>
                    <span>-${Math.round(results.currentYear.vacancyLoss).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-medium text-success border-t pt-2">
                    <span>Effective Gross Income:</span>
                    <span>${Math.round(results.currentYear.effectiveGrossIncome).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-destructive">
                    <span className="flex items-center gap-1">
                      <Minus className="w-3 h-3" />
                      Operating Expenses:
                    </span>
                    <span>-${results.currentYear.operatingExpenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-primary border-t pt-2 text-base">
                    <span>Net Operating Income:</span>
                    <span>${Math.round(results.currentYear.netOperatingIncome).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="text-lg font-semibold">{results.metrics.cashOnCashReturn}%</div>
                    <p className="text-sm text-muted-foreground">Cash on Cash Return</p>
                  </div>
                  <div className="text-center p-3 bg-info/10 rounded-lg">
                    <div className="text-lg font-semibold">{results.metrics.grossRentMultiplier}</div>
                    <p className="text-sm text-muted-foreground">Gross Rent Multiplier</p>
                  </div>
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <div className="text-lg font-semibold">{results.metrics.capitalizationRate}%</div>
                    <p className="text-sm text-muted-foreground">Cap Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Multi-Year Projections */}
            <Card>
              <CardHeader>
                <CardTitle>Multi-Year Projections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Year</th>
                        <th className="text-right p-2">Gross Rent</th>
                        <th className="text-right p-2">Effective Income</th>
                        <th className="text-right p-2">Operating Expenses</th>
                        <th className="text-right p-2">NOI</th>
                        <th className="text-right p-2">Property Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.projections.map((projection: any, index: number) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium">{projection.year}</td>
                          <td className="p-2 text-right">${projection.grossRent.toLocaleString()}</td>
                          <td className="p-2 text-right">${projection.effectiveIncome.toLocaleString()}</td>
                          <td className="p-2 text-right">${projection.operatingExpenses.toLocaleString()}</td>
                          <td className="p-2 text-right font-medium">${projection.noi.toLocaleString()}</td>
                          <td className="p-2 text-right font-bold">${projection.propertyValue.toLocaleString()}</td>
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

export default NetIncomeForm;