import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calculator, DollarSign, BarChart3 } from "lucide-react";

interface DeferredManagementInputs {
  // Property Details
  totalUnits: number;
  saleableArea: number;
  entranceFee: number;
  weeklyFee: number;
  
  // Deferred Management Fee Structure
  deferredManagementRate: number;
  yearsDeferredCalculation: number;
  
  // Operating Revenue
  weeklyFeeIncome: number;
  otherIncome: number;
  
  // Operating Expenses
  staffCosts: number;
  administration: number;
  maintenance: number;
  utilities: number;
  insurance: number;
  rates: number;
  other: number;
  
  // Financial Assumptions
  occupancyRate: number;
  capitalGrowthRate: number;
  discountRate: number;
  managementFeeGrowth: number;
  
  // Market Data
  averageResalePrice: number;
  averageTurnoverPeriod: number;
  competitorDMFRate: number;
}

interface DeferredManagementValuationFormProps {
  onSubmit: (data: any) => void;
}

const DeferredManagementValuationForm = ({ onSubmit }: DeferredManagementValuationFormProps) => {
  const [inputs, setInputs] = useState<DeferredManagementInputs>({
    totalUnits: 0,
    saleableArea: 0,
    entranceFee: 0,
    weeklyFee: 0,
    deferredManagementRate: 30,
    yearsDeferredCalculation: 8,
    weeklyFeeIncome: 0,
    otherIncome: 0,
    staffCosts: 0,
    administration: 0,
    maintenance: 0,
    utilities: 0,
    insurance: 0,
    rates: 0,
    other: 0,
    occupancyRate: 95,
    capitalGrowthRate: 4.0,
    discountRate: 8.5,
    managementFeeGrowth: 3.5,
    averageResalePrice: 0,
    averageTurnoverPeriod: 8,
    competitorDMFRate: 30
  });

  const [results, setResults] = useState(null);

  const calculateValuation = () => {
    // Calculate operating income
    const totalIncome = inputs.weeklyFeeIncome + inputs.otherIncome;
    const totalExpenses = inputs.staffCosts + inputs.administration + inputs.maintenance + 
                         inputs.utilities + inputs.insurance + inputs.rates + inputs.other;
    const netOperatingIncome = totalIncome - totalExpenses;

    // Calculate future DMF based on property appreciation
    const futurePropertyValue = inputs.entranceFee * Math.pow(1 + (inputs.capitalGrowthRate / 100), inputs.yearsDeferredCalculation);
    const deferredManagementFeeValue = futurePropertyValue * (inputs.deferredManagementRate / 100);
    
    // Present value of DMF
    const presentValueDMF = deferredManagementFeeValue / Math.pow(1 + (inputs.discountRate / 100), inputs.yearsDeferredCalculation);
    
    // DMF per unit
    const dmfPerUnit = inputs.totalUnits > 0 ? presentValueDMF / inputs.totalUnits : 0;
    
    // Total facility value calculation
    const operatingCapRate = 7.5; // Typical cap rate for retirement facilities
    const operatingValue = netOperatingIncome > 0 ? netOperatingIncome / (operatingCapRate / 100) : 0;
    
    // Total enterprise value
    const totalEnterpriseValue = operatingValue + presentValueDMF;
    
    // Annual DMF income stream calculation (for recurring residents)
    const averageResidencyLength = inputs.averageTurnoverPeriod;
    const annualTurnoverRate = 1 / averageResidencyLength;
    const unitsPerYear = inputs.totalUnits * annualTurnoverRate;
    const annualDMFIncome = unitsPerYear * (inputs.averageResalePrice * (inputs.deferredManagementRate / 100));
    
    // Capitalized DMF income value
    const dmfIncomeCapRate = 10.0; // Higher cap rate due to residual nature
    const capitalizedDMFValue = annualDMFIncome > 0 ? annualDMFIncome / (dmfIncomeCapRate / 100) : 0;

    // Performance metrics
    const revenuePerUnit = inputs.totalUnits > 0 ? totalIncome / inputs.totalUnits : 0;
    const operatingMargin = totalIncome > 0 ? (netOperatingIncome / totalIncome) * 100 : 0;
    const dmfYield = inputs.entranceFee > 0 ? (inputs.deferredManagementRate / inputs.yearsDeferredCalculation) : 0;

    const calculationResults = {
      operatingAnalysis: {
        totalIncome,
        totalExpenses,
        netOperatingIncome,
        operatingValue,
        operatingCapRate
      },
      deferredManagementFee: {
        currentPropertyValue: inputs.entranceFee,
        futurePropertyValue,
        deferredManagementFeeValue,
        presentValueDMF,
        dmfPerUnit,
        yearsDeferred: inputs.yearsDeferredCalculation,
        dmfRate: inputs.deferredManagementRate
      },
      incomeStreamAnalysis: {
        annualTurnoverRate: annualTurnoverRate * 100,
        unitsPerYear,
        annualDMFIncome,
        capitalizedDMFValue,
        dmfIncomeCapRate
      },
      totalValuation: {
        operatingValue,
        dmfValue: Math.max(presentValueDMF, capitalizedDMFValue),
        totalEnterpriseValue: operatingValue + Math.max(presentValueDMF, capitalizedDMFValue)
      },
      performanceMetrics: {
        revenuePerUnit,
        operatingMargin,
        dmfYield,
        occupancyRate: inputs.occupancyRate,
        averageResidencyLength
      }
    };

    setResults(calculationResults);
    onSubmit(calculationResults);
  };

  const updateInput = (field: string, value: number | string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Deferred Management Fee Valuation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="property-details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="property-details">Property Details</TabsTrigger>
            <TabsTrigger value="dmf-structure">DMF Structure</TabsTrigger>
            <TabsTrigger value="operating">Operating Analysis</TabsTrigger>
            <TabsTrigger value="assumptions">Assumptions</TabsTrigger>
          </TabsList>

          <TabsContent value="property-details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Facility Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="totalUnits">Total Units</Label>
                    <Input
                      id="totalUnits"
                      type="number"
                      value={inputs.totalUnits || ''}
                      onChange={(e) => updateInput('totalUnits', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="saleableArea">Saleable Area (sqm)</Label>
                    <Input
                      id="saleableArea"
                      type="number"
                      value={inputs.saleableArea || ''}
                      onChange={(e) => updateInput('saleableArea', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="occupancyRate">Occupancy Rate (%)</Label>
                    <Input
                      id="occupancyRate"
                      type="number"
                      step="0.1"
                      value={inputs.occupancyRate || ''}
                      onChange={(e) => updateInput('occupancyRate', Number(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pricing Structure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="entranceFee">Average Entrance Fee ($)</Label>
                    <Input
                      id="entranceFee"
                      type="number"
                      value={inputs.entranceFee || ''}
                      onChange={(e) => updateInput('entranceFee', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="weeklyFee">Average Weekly Fee ($)</Label>
                    <Input
                      id="weeklyFee"
                      type="number"
                      value={inputs.weeklyFee || ''}
                      onChange={(e) => updateInput('weeklyFee', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="averageResalePrice">Average Resale Price ($)</Label>
                    <Input
                      id="averageResalePrice"
                      type="number"
                      value={inputs.averageResalePrice || ''}
                      onChange={(e) => updateInput('averageResalePrice', Number(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="dmf-structure" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">DMF Parameters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="deferredManagementRate">DMF Rate (%)</Label>
                    <Input
                      id="deferredManagementRate"
                      type="number"
                      step="0.1"
                      value={inputs.deferredManagementRate || ''}
                      onChange={(e) => updateInput('deferredManagementRate', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="yearsDeferredCalculation">Years for DMF Calculation</Label>
                    <Input
                      id="yearsDeferredCalculation"
                      type="number"
                      value={inputs.yearsDeferredCalculation || ''}
                      onChange={(e) => updateInput('yearsDeferredCalculation', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="averageTurnoverPeriod">Average Residency Period (years)</Label>
                    <Input
                      id="averageTurnoverPeriod"
                      type="number"
                      step="0.1"
                      value={inputs.averageTurnoverPeriod || ''}
                      onChange={(e) => updateInput('averageTurnoverPeriod', Number(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Market Comparison</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="competitorDMFRate">Competitor DMF Rate (%)</Label>
                    <Input
                      id="competitorDMFRate"
                      type="number"
                      step="0.1"
                      value={inputs.competitorDMFRate || ''}
                      onChange={(e) => updateInput('competitorDMFRate', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="capitalGrowthRate">Capital Growth Rate (%)</Label>
                    <Input
                      id="capitalGrowthRate"
                      type="number"
                      step="0.1"
                      value={inputs.capitalGrowthRate || ''}
                      onChange={(e) => updateInput('capitalGrowthRate', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="discountRate">Discount Rate (%)</Label>
                    <Input
                      id="discountRate"
                      type="number"
                      step="0.1"
                      value={inputs.discountRate || ''}
                      onChange={(e) => updateInput('discountRate', Number(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="operating" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Operating Income</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="weeklyFeeIncome">Weekly Fee Income (Annual $)</Label>
                    <Input
                      id="weeklyFeeIncome"
                      type="number"
                      value={inputs.weeklyFeeIncome || ''}
                      onChange={(e) => updateInput('weeklyFeeIncome', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="otherIncome">Other Income ($)</Label>
                    <Input
                      id="otherIncome"
                      type="number"
                      value={inputs.otherIncome || ''}
                      onChange={(e) => updateInput('otherIncome', Number(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Operating Expenses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="staffCosts">Staff Costs ($)</Label>
                    <Input
                      id="staffCosts"
                      type="number"
                      value={inputs.staffCosts || ''}
                      onChange={(e) => updateInput('staffCosts', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="administration">Administration ($)</Label>
                    <Input
                      id="administration"
                      type="number"
                      value={inputs.administration || ''}
                      onChange={(e) => updateInput('administration', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maintenance">Maintenance ($)</Label>
                    <Input
                      id="maintenance"
                      type="number"
                      value={inputs.maintenance || ''}
                      onChange={(e) => updateInput('maintenance', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="utilities">Utilities ($)</Label>
                    <Input
                      id="utilities"
                      type="number"
                      value={inputs.utilities || ''}
                      onChange={(e) => updateInput('utilities', Number(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assumptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Valuation Assumptions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="insurance">Insurance ($)</Label>
                    <Input
                      id="insurance"
                      type="number"
                      value={inputs.insurance || ''}
                      onChange={(e) => updateInput('insurance', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rates">Rates & Taxes ($)</Label>
                    <Input
                      id="rates"
                      type="number"
                      value={inputs.rates || ''}
                      onChange={(e) => updateInput('rates', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="other">Other Expenses ($)</Label>
                    <Input
                      id="other"
                      type="number"
                      value={inputs.other || ''}
                      onChange={(e) => updateInput('other', Number(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button onClick={calculateValuation} className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate DMF Valuation
          </Button>
        </div>

        {results && (
          <div className="mt-6 space-y-4">
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Valuation Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Operating Value:</span>
                    <span>${results.totalValuation.operatingValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DMF Value:</span>
                    <span>${results.totalValuation.dmfValue.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Enterprise Value:</span>
                    <span>${results.totalValuation.totalEnterpriseValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>DMF per Unit:</span>
                    <span>${results.deferredManagementFee.dmfPerUnit.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Operating Margin:</span>
                    <span>{results.performanceMetrics.operatingMargin.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenue per Unit:</span>
                    <span>${results.performanceMetrics.revenuePerUnit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Turnover Rate:</span>
                    <span>{results.incomeStreamAnalysis.annualTurnoverRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual DMF Income:</span>
                    <span>${results.incomeStreamAnalysis.annualDMFIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DMF Present Value:</span>
                    <span>${results.deferredManagementFee.presentValueDMF.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed DMF Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Deferred Management Fee Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold">DMF Structure</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Current Property Value:</span>
                        <span>${results.deferredManagementFee.currentPropertyValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Future Property Value:</span>
                        <span>${results.deferredManagementFee.futurePropertyValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DMF Rate:</span>
                        <span>{results.deferredManagementFee.dmfRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Years Deferred:</span>
                        <span>{results.deferredManagementFee.yearsDeferred} years</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Income Stream Analysis</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Units per Year:</span>
                        <span>{results.incomeStreamAnalysis.unitsPerYear.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Capitalized DMF Value:</span>
                        <span>${results.incomeStreamAnalysis.capitalizedDMFValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DMF Cap Rate:</span>
                        <span>{results.incomeStreamAnalysis.dmfIncomeCapRate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeferredManagementValuationForm;