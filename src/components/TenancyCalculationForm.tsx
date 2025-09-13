import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp } from "lucide-react";

interface TenancyInputs {
  netLettableArea: number;
  grossPassingRent: number;
  outgoingsPerSqm: number;
  netPassingRent: number;
  marketRentPerSqm: number;
  marketRent: number;
  lettingUpAllowance: number;
  reviewPeriod: number;
  leaseLength: number;
}

interface TenancyResults {
  noi: number;
  netPassingRentPerPlacement: number;
  wale: number;
  grossRentPerSqm: number;
  netRentPerSqm: number;
  marketAnalysis: {
    rentGap: number;
    rentGapPercentage: number;
    potentialIncome: number;
  };
  capitalisation: {
    yieldPassingRent: number;
    yieldMarketRent: number;
  };
}

const TenancyCalculationForm: React.FC = () => {
  const [inputs, setInputs] = useState<TenancyInputs>({
    netLettableArea: 0,
    grossPassingRent: 0,
    outgoingsPerSqm: 0,
    netPassingRent: 0,
    marketRentPerSqm: 0,
    marketRent: 0,
    lettingUpAllowance: 0,
    reviewPeriod: 0,
    leaseLength: 0,
  });

  const [results, setResults] = useState<TenancyResults | null>(null);

  const handleInputChange = (field: keyof TenancyInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const calculateTenancy = () => {
    // NOI Calculation
    const totalOutgoings = inputs.netLettableArea * inputs.outgoingsPerSqm;
    const noi = inputs.grossPassingRent - totalOutgoings;

    // Rent per sqm calculations
    const grossRentPerSqm = inputs.netLettableArea > 0 ? inputs.grossPassingRent / inputs.netLettableArea : 0;
    const netRentPerSqm = inputs.netLettableArea > 0 ? inputs.netPassingRent / inputs.netLettableArea : 0;

    // Market analysis
    const rentGap = inputs.marketRent - inputs.netPassingRent;
    const rentGapPercentage = inputs.netPassingRent > 0 ? (rentGap / inputs.netPassingRent) * 100 : 0;
    const potentialIncome = inputs.marketRent - totalOutgoings;

    // WALE calculation (simplified)
    const wale = inputs.leaseLength;

    // Net Passing Rent Per Placement
    const netPassingRentPerPlacement = inputs.netPassingRent;

    // Yield calculations (requires property value input - placeholder for now)
    const yieldPassingRent = 0; // Would need property value
    const yieldMarketRent = 0;   // Would need property value

    const calculatedResults: TenancyResults = {
      noi,
      netPassingRentPerPlacement,
      wale,
      grossRentPerSqm,
      netRentPerSqm,
      marketAnalysis: {
        rentGap,
        rentGapPercentage,
        potentialIncome,
      },
      capitalisation: {
        yieldPassingRent,
        yieldMarketRent,
      }
    };

    setResults(calculatedResults);
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    if (Object.values(inputs).some(val => val > 0)) {
      calculateTenancy();
    }
  }, [inputs]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-500" />
          <CardTitle>Tenancy Financial Calculations</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="net-lettable-area">Net Lettable Area (sqm)</Label>
            <Input
              id="net-lettable-area"
              type="number"
              value={inputs.netLettableArea || ''}
              onChange={(e) => handleInputChange('netLettableArea', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="gross-passing-rent">Gross Passing Rent ($)</Label>
            <Input
              id="gross-passing-rent"
              type="number"
              value={inputs.grossPassingRent || ''}
              onChange={(e) => handleInputChange('grossPassingRent', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="outgoings-per-sqm">Outgoings per sqm ($)</Label>
            <Input
              id="outgoings-per-sqm"
              type="number"
              value={inputs.outgoingsPerSqm || ''}
              onChange={(e) => handleInputChange('outgoingsPerSqm', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="net-passing-rent">Net Passing Rent ($)</Label>
            <Input
              id="net-passing-rent"
              type="number"
              value={inputs.netPassingRent || ''}
              onChange={(e) => handleInputChange('netPassingRent', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="market-rent-per-sqm">Market Rent per sqm ($)</Label>
            <Input
              id="market-rent-per-sqm"
              type="number"
              value={inputs.marketRentPerSqm || ''}
              onChange={(e) => handleInputChange('marketRentPerSqm', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="market-rent">Market Rent ($)</Label>
            <Input
              id="market-rent"
              type="number"
              value={inputs.marketRent || ''}
              onChange={(e) => handleInputChange('marketRent', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="letting-up-allowance">Letting Up Allowance ($)</Label>
            <Input
              id="letting-up-allowance"
              type="number"
              value={inputs.lettingUpAllowance || ''}
              onChange={(e) => handleInputChange('lettingUpAllowance', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="lease-length">Lease Length (years)</Label>
            <Input
              id="lease-length"
              type="number"
              value={inputs.leaseLength || ''}
              onChange={(e) => handleInputChange('leaseLength', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <h3 className="text-lg font-semibold">Calculated Results</h3>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-muted-foreground">NOI (Net Operating Income)</div>
                <div className="text-lg font-semibold text-blue-600">
                  ${results.noi.toLocaleString()}
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm text-muted-foreground">WALE</div>
                <div className="text-lg font-semibold text-green-600">
                  {results.wale.toFixed(1)} years
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-sm text-muted-foreground">Gross Rent per sqm</div>
                <div className="text-lg font-semibold text-purple-600">
                  ${results.grossRentPerSqm.toFixed(2)}
                </div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-sm text-muted-foreground">Net Rent per sqm</div>
                <div className="text-lg font-semibold text-orange-600">
                  ${results.netRentPerSqm.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Market Analysis */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Market Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Rent Gap</div>
                  <div className="font-semibold">
                    ${results.marketAnalysis.rentGap.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Rent Gap %</div>
                  <div className="font-semibold">
                    {results.marketAnalysis.rentGapPercentage.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Potential Income</div>
                  <div className="font-semibold">
                    ${results.marketAnalysis.potentialIncome.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Calculation Workings */}
            <div className="bg-yellow-50 p-4 rounded-lg text-sm">
              <h4 className="font-medium mb-2">Calculation Workings</h4>
              <div className="space-y-1 text-muted-foreground">
                <div>NOI = Gross Passing Rent - (Net Lettable Area × Outgoings per sqm)</div>
                <div>NOI = ${inputs.grossPassingRent.toLocaleString()} - ({inputs.netLettableArea} × ${inputs.outgoingsPerSqm}) = ${results.noi.toLocaleString()}</div>
                <div>Gross Rent per sqm = Gross Passing Rent ÷ Net Lettable Area = ${results.grossRentPerSqm.toFixed(2)}</div>
                <div>Rent Gap = Market Rent - Net Passing Rent = ${results.marketAnalysis.rentGap.toLocaleString()}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TenancyCalculationForm;