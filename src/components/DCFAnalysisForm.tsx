import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingDown, Calculator, Target, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DCFInputs {
  initialInvestment: number;
  holdingPeriod: number;
  yearlyInputs: Array<{
    year: number;
    netCashFlow: number;
    rentGrowth: number;
    expenseGrowth: number;
  }>;
  discountRate: number;
  terminalCapRate: number;
  terminalGrowthRate: number;
}

interface DCFAnalysisFormProps {
  onSubmit: (data: any) => void;
}

const DCFAnalysisForm = ({ onSubmit }: DCFAnalysisFormProps) => {
  const [inputs, setInputs] = useState<DCFInputs>({
    initialInvestment: 0,
    holdingPeriod: 10,
    yearlyInputs: Array.from({ length: 10 }, (_, i) => ({
      year: i + 1,
      netCashFlow: 0,
      rentGrowth: 2.5,
      expenseGrowth: 3.0
    })),
    discountRate: 8.0,
    terminalCapRate: 6.5,
    terminalGrowthRate: 2.0
  });

  const [results, setResults] = useState<any>(null);

  const handleInputChange = (field: string, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleYearlyInputChange = (year: number, field: string, value: number) => {
    setInputs(prev => ({
      ...prev,
      yearlyInputs: prev.yearlyInputs.map(input => 
        input.year === year ? { ...input, [field]: value } : input
      )
    }));
  };

  const updateHoldingPeriod = (newPeriod: number) => {
    const newYearlyInputs = Array.from({ length: newPeriod }, (_, i) => {
      const existingInput = inputs.yearlyInputs.find(input => input.year === i + 1);
      return existingInput || {
        year: i + 1,
        netCashFlow: 0,
        rentGrowth: 2.5,
        expenseGrowth: 3.0
      };
    });

    setInputs(prev => ({
      ...prev,
      holdingPeriod: newPeriod,
      yearlyInputs: newYearlyInputs
    }));
  };

  const calculateDCF = () => {
    // Calculate present value of cash flows
    let totalPV = 0;
    const cashFlowAnalysis = [];

    for (let i = 0; i < inputs.holdingPeriod; i++) {
      const yearInput = inputs.yearlyInputs[i];
      const discountFactor = 1 / Math.pow(1 + inputs.discountRate / 100, yearInput.year);
      const presentValue = yearInput.netCashFlow * discountFactor;
      totalPV += presentValue;

      cashFlowAnalysis.push({
        year: yearInput.year,
        cashFlow: yearInput.netCashFlow,
        discountFactor: discountFactor,
        presentValue: Math.round(presentValue)
      });
    }

    // Calculate terminal value
    const lastYearCashFlow = inputs.yearlyInputs[inputs.holdingPeriod - 1]?.netCashFlow || 0;
    const terminalCashFlow = lastYearCashFlow * (1 + inputs.terminalGrowthRate / 100);
    const terminalValue = terminalCashFlow / (inputs.terminalCapRate / 100 - inputs.terminalGrowthRate / 100);
    const terminalDiscountFactor = 1 / Math.pow(1 + inputs.discountRate / 100, inputs.holdingPeriod);
    const terminalPV = terminalValue * terminalDiscountFactor;

    // Calculate total property value and NPV
    const totalPropertyValue = totalPV + terminalPV;
    const npv = totalPropertyValue - inputs.initialInvestment;
    const irr = calculateIRR([...inputs.yearlyInputs.map(y => y.netCashFlow), terminalValue], inputs.initialInvestment);

    // Calculate additional metrics
    const totalCashFlows = inputs.yearlyInputs.reduce((sum, year) => sum + year.netCashFlow, 0);
    const averageAnnualReturn = (totalPropertyValue / inputs.initialInvestment - 1) / inputs.holdingPeriod * 100;
    const paybackPeriod = calculatePaybackPeriod();

    const calculationResults = {
      npv: Math.round(npv),
      irr: Math.round(irr * 10000) / 100,
      totalPropertyValue: Math.round(totalPropertyValue),
      cashFlowPV: Math.round(totalPV),
      terminalValue: Math.round(terminalValue),
      terminalPV: Math.round(terminalPV),
      averageAnnualReturn: Math.round(averageAnnualReturn * 100) / 100,
      paybackPeriod: Math.round(paybackPeriod * 100) / 100,
      profitabilityIndex: Math.round((totalPropertyValue / inputs.initialInvestment) * 100) / 100,
      cashFlowAnalysis,
      investment: {
        initial: inputs.initialInvestment,
        totalCashFlows: Math.round(totalCashFlows),
        totalReturn: Math.round(totalPropertyValue - inputs.initialInvestment),
        returnPercent: Math.round(((totalPropertyValue / inputs.initialInvestment - 1) * 100) * 100) / 100
      }
    };

    setResults(calculationResults);
    onSubmit(calculationResults);
  };

  const calculateIRR = (cashFlows: number[], initialInvestment: number): number => {
    // Simplified IRR calculation using Newton-Raphson method
    let rate = 0.1; // Initial guess
    const tolerance = 0.0001;
    const maxIterations = 100;

    for (let i = 0; i < maxIterations; i++) {
      let npv = -initialInvestment;
      let npvDerivative = 0;

      for (let j = 0; j < cashFlows.length; j++) {
        const period = j + 1;
        npv += cashFlows[j] / Math.pow(1 + rate, period);
        npvDerivative -= (period * cashFlows[j]) / Math.pow(1 + rate, period + 1);
      }

      const newRate = rate - npv / npvDerivative;
      
      if (Math.abs(newRate - rate) < tolerance) {
        return newRate;
      }
      
      rate = newRate;
    }

    return rate;
  };

  const calculatePaybackPeriod = (): number => {
    let cumulativeCashFlow = -inputs.initialInvestment;
    
    for (let i = 0; i < inputs.yearlyInputs.length; i++) {
      cumulativeCashFlow += inputs.yearlyInputs[i].netCashFlow;
      if (cumulativeCashFlow >= 0) {
        const previousCumulative = cumulativeCashFlow - inputs.yearlyInputs[i].netCashFlow;
        const fractionalYear = Math.abs(previousCumulative) / inputs.yearlyInputs[i].netCashFlow;
        return i + 1 - fractionalYear;
      }
    }
    
    return inputs.holdingPeriod; // If payback period exceeds holding period
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-600">
          <TrendingDown className="w-5 h-5" />
          Discounted Cash Flow (DCF) Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Comprehensive DCF analysis with NPV, IRR calculations and terminal value assessment
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
            <Input
              id="initialInvestment"
              type="number"
              placeholder="e.g., 1,000,000"
              value={inputs.initialInvestment || ""}
              onChange={(e) => handleInputChange('initialInvestment', Number(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="holdingPeriod">Holding Period (Years)</Label>
            <Input
              id="holdingPeriod"
              type="number"
              min="3"
              max="20"
              value={inputs.holdingPeriod}
              onChange={(e) => updateHoldingPeriod(Number(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="discountRate">Discount Rate (%)</Label>
            <Input
              id="discountRate"
              type="number"
              step="0.1"
              placeholder="e.g., 8.0"
              value={inputs.discountRate}
              onChange={(e) => handleInputChange('discountRate', Number(e.target.value))}
            />
          </div>
        </div>

        {/* Terminal Value Parameters */}
        <Card className="bg-gradient-to-br from-card to-warning/5 border-warning/20">
          <CardHeader>
            <CardTitle className="text-lg text-warning">Terminal Value Parameters</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="terminalCapRate">Terminal Cap Rate (%)</Label>
              <Input
                id="terminalCapRate"
                type="number"
                step="0.1"
                placeholder="e.g., 6.5"
                value={inputs.terminalCapRate}
                onChange={(e) => handleInputChange('terminalCapRate', Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="terminalGrowthRate">Terminal Growth Rate (%)</Label>
              <Input
                id="terminalGrowthRate"
                type="number"
                step="0.1"
                placeholder="e.g., 2.0"
                value={inputs.terminalGrowthRate}
                onChange={(e) => handleInputChange('terminalGrowthRate', Number(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Yearly Cash Flow Inputs */}
        <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg text-primary">Annual Cash Flow Projections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Year</th>
                    <th className="text-center p-2">Net Cash Flow ($)</th>
                    <th className="text-center p-2">Rent Growth (%)</th>
                    <th className="text-center p-2">Expense Growth (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {inputs.yearlyInputs.map((yearInput, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 font-medium">Year {yearInput.year}</td>
                      <td className="p-2">
                        <Input
                          type="number"
                          placeholder="e.g., 75,000"
                          value={yearInput.netCashFlow || ""}
                          onChange={(e) => handleYearlyInputChange(yearInput.year, 'netCashFlow', Number(e.target.value))}
                          className="text-center"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.1"
                          value={yearInput.rentGrowth}
                          onChange={(e) => handleYearlyInputChange(yearInput.year, 'rentGrowth', Number(e.target.value))}
                          className="text-center"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.1"
                          value={yearInput.expenseGrowth}
                          onChange={(e) => handleYearlyInputChange(yearInput.year, 'expenseGrowth', Number(e.target.value))}
                          className="text-center"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Button 
          onClick={calculateDCF} 
          className="w-full"
          disabled={!inputs.initialInvestment || !inputs.discountRate || inputs.yearlyInputs.some(y => !y.netCashFlow)}
        >
          <Calculator className="w-4 h-4 mr-2" />
          Calculate DCF Analysis
        </Button>

        {/* Results Display */}
        {results && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <Card className="bg-gradient-to-br from-card to-success/5 border-success/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-success" />
                  Investment Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-background rounded-lg">
                    <div className={`text-2xl font-bold ${results.npv >= 0 ? 'text-success' : 'text-destructive'}`}>
                      ${results.npv.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Net Present Value</p>
                    <Badge variant={results.npv >= 0 ? 'default' : 'destructive'} className="mt-1">
                      {results.npv >= 0 ? 'Positive' : 'Negative'}
                    </Badge>
                  </div>

                  <div className="text-center p-4 bg-background rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {results.irr}%
                    </div>
                    <p className="text-sm text-muted-foreground">Internal Rate of Return</p>
                    <Badge variant={results.irr > inputs.discountRate ? 'default' : 'secondary'} className="mt-1">
                      {results.irr > inputs.discountRate ? 'Above Hurdle' : 'Below Hurdle'}
                    </Badge>
                  </div>

                  <div className="text-center p-4 bg-background rounded-lg">
                    <div className="text-xl font-bold text-info">
                      {results.averageAnnualReturn}%
                    </div>
                    <p className="text-sm text-muted-foreground">Average Annual Return</p>
                  </div>

                  <div className="text-center p-4 bg-background rounded-lg">
                    <div className="text-xl font-bold text-warning">
                      {results.paybackPeriod} years
                    </div>
                    <p className="text-sm text-muted-foreground">Payback Period</p>
                  </div>
                </div>

                {/* Investment Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Investment Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Initial Investment:</span>
                        <span className="font-medium">${results.investment.initial.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Cash Flows:</span>
                        <span className="font-medium">${results.investment.totalCashFlows.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Terminal Value (PV):</span>
                        <span className="font-medium">${results.terminalPV.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Total Property Value:</span>
                        <span className="font-bold">${results.totalPropertyValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Return:</span>
                        <span className={`font-bold ${results.investment.totalReturn >= 0 ? 'text-success' : 'text-destructive'}`}>
                          ${results.investment.totalReturn.toLocaleString()} ({results.investment.returnPercent}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Performance Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Profitability Index:</span>
                        <span className="font-medium">{results.profitabilityIndex}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cash Flow PV:</span>
                        <span className="font-medium">${results.cashFlowPV.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Terminal Value:</span>
                        <span className="font-medium">${results.terminalValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Discount Rate:</span>
                        <span className="font-medium">{inputs.discountRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Holding Period:</span>
                        <span className="font-medium">{inputs.holdingPeriod} years</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cash Flow Analysis Table */}
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Year</th>
                        <th className="text-right p-2">Cash Flow ($)</th>
                        <th className="text-right p-2">Discount Factor</th>
                        <th className="text-right p-2">Present Value ($)</th>
                        <th className="text-right p-2">Cumulative PV ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.cashFlowAnalysis.map((analysis: any, index: number) => {
                        const cumulativePV = results.cashFlowAnalysis
                          .slice(0, index + 1)
                          .reduce((sum: number, item: any) => sum + item.presentValue, 0);
                        
                        return (
                          <tr key={index} className="border-b">
                            <td className="p-2 font-medium">Year {analysis.year}</td>
                            <td className="p-2 text-right">${analysis.cashFlow.toLocaleString()}</td>
                            <td className="p-2 text-right">{analysis.discountFactor.toFixed(4)}</td>
                            <td className="p-2 text-right">${analysis.presentValue.toLocaleString()}</td>
                            <td className="p-2 text-right font-medium">${Math.round(cumulativePV).toLocaleString()}</td>
                          </tr>
                        );
                      })}
                      <tr className="border-b bg-muted/20">
                        <td className="p-2 font-bold">Terminal</td>
                        <td className="p-2 text-right font-bold">${results.terminalValue.toLocaleString()}</td>
                        <td className="p-2 text-right">{(1 / Math.pow(1 + inputs.discountRate / 100, inputs.holdingPeriod)).toFixed(4)}</td>
                        <td className="p-2 text-right font-bold">${results.terminalPV.toLocaleString()}</td>
                        <td className="p-2 text-right font-bold">${results.totalPropertyValue.toLocaleString()}</td>
                      </tr>
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

export default DCFAnalysisForm;