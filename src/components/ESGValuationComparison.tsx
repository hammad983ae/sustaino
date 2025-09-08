/**
 * ============================================================================
 * ROBINSON ESG VALUATION METHODOLOGY
 * Based on "Property Valuation and Analysis Applied to Environmentally 
 * Sustainable Development" by Prof. Jon Robinson, University of Melbourne
 * 
 * Implementation of residual analysis comparing conventional vs ESD buildings
 * with risk-adjusted returns and comprehensive financial modeling
 * ============================================================================
 */
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Building2, TrendingUp, Leaf, Calculator, DollarSign, Target, AlertTriangle, CheckCircle } from "lucide-react";

interface ValuationInputs {
  floorArea: number;
  baseRent: number;
  outgoings: number;
  buildingCost: number;
  constructionPeriod: number;
  interestRate: number;
  profitMargin: number;
  capRate: number;
  // ESD specific
  rentalPremium: number;
  productivitySavings: number;
  outgoingsReduction: number;
  capRateImprovement: number;
  riskPremium: number;
}

interface ValuationResults {
  grossRental: number;
  netRental: number;
  netIncome: number;
  capitalValue: number;
  buildingCosts: number;
  constructionFinance: number;
  totalCosts: number;
  residualLandValue: number;
  netResidualLandValue: number;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

export default function ESGValuationComparison() {
  const [conventionalInputs, setConventionalInputs] = useState<ValuationInputs>({
    floorArea: 10000,
    baseRent: 400,
    outgoings: 80,
    buildingCost: 30000000,
    constructionPeriod: 24,
    interestRate: 8.0,
    profitMargin: 10.0,
    capRate: 8.0,
    rentalPremium: 0,
    productivitySavings: 0,
    outgoingsReduction: 0,
    capRateImprovement: 0,
    riskPremium: 0
  });

  const [esdInputs, setEsdInputs] = useState<ValuationInputs>({
    floorArea: 10000,
    baseRent: 400,
    outgoings: 80,
    buildingCost: 35000000, // 16.7% premium
    constructionPeriod: 24,
    interestRate: 8.5, // Risk premium for ESD uncertainty
    profitMargin: 15.0, // Higher risk premium
    capRate: 7.75, // Psychic income benefit
    rentalPremium: 5.0, // 5% rental premium
    productivitySavings: 100, // $100/sqm productivity benefit
    outgoingsReduction: 10, // $10/sqm reduction ($80 to $70)
    capRateImprovement: 0.25, // 25bp psychic income benefit
    riskPremium: 0.5 // 50bp construction risk premium
  });

  const [conventionalResults, setConventionalResults] = useState<ValuationResults>();
  const [esdResults, setEsdResults] = useState<ValuationResults>();

  const calculateValuation = (inputs: ValuationInputs): ValuationResults => {
    // Gross rental calculation
    const grossRental = inputs.baseRent * (1 + inputs.rentalPremium / 100) + inputs.productivitySavings;
    const adjustedOutgoings = inputs.outgoings - inputs.outgoingsReduction;
    const netRental = grossRental - adjustedOutgoings;
    const netIncome = netRental * inputs.floorArea;

    // Capital value calculation
    const adjustedCapRate = inputs.capRate - inputs.capRateImprovement;
    const capitalValue = netIncome / (adjustedCapRate / 100);
    
    // Less sales costs (1.5%)
    const afterSalesCosts = capitalValue * 0.985;
    
    // Less letting commissions (15% of first year rent)
    const lettingCommissions = (grossRental * inputs.floorArea) * 0.15;
    const netReturns = afterSalesCosts - lettingCommissions;

    // Development costs
    const adjustedInterestRate = inputs.interestRate + inputs.riskPremium;
    const constructionFinance = inputs.buildingCost * (adjustedInterestRate / 100) * (inputs.constructionPeriod / 12) * 0.5;
    const totalBuildingCosts = inputs.buildingCost + constructionFinance;
    
    // Profit calculation
    const profitAmount = netReturns * (inputs.profitMargin / 100) / (1 + inputs.profitMargin / 100);
    const totalCosts = totalBuildingCosts + profitAmount;
    
    // Residual land value
    const grossResidual = netReturns - totalCosts;
    const holdingCosts = grossResidual * (adjustedInterestRate / 100) * (6 / 12); // 6 month holding
    const purchaseExpenses = grossResidual * 0.06;
    const netResidualLandValue = grossResidual - holdingCosts - purchaseExpenses - 100000; // rates/taxes

    return {
      grossRental,
      netRental,
      netIncome,
      capitalValue,
      buildingCosts: totalBuildingCosts,
      constructionFinance,
      totalCosts,
      residualLandValue: grossResidual,
      netResidualLandValue: Math.max(0, netResidualLandValue)
    };
  };

  useEffect(() => {
    setConventionalResults(calculateValuation(conventionalInputs));
    setEsdResults(calculateValuation(esdInputs));
  }, [conventionalInputs, esdInputs]);

  const comparisonData = conventionalResults && esdResults ? [
    {
      metric: "Capital Value",
      conventional: conventionalResults.capitalValue / 1000000,
      esd: esdResults.capitalValue / 1000000,
      unit: "$M"
    },
    {
      metric: "Net Land Value",
      conventional: conventionalResults.netResidualLandValue / 1000000,
      esd: esdResults.netResidualLandValue / 1000000,
      unit: "$M"
    },
    {
      metric: "Net Income",
      conventional: conventionalResults.netIncome / 1000000,
      esd: esdResults.netIncome / 1000000,
      unit: "$M p.a."
    },
    {
      metric: "Net Rental",
      conventional: conventionalResults.netRental,
      esd: esdResults.netRental,
      unit: "$/sqm"
    }
  ] : [];

  const riskAnalysisData = [
    { factor: "Construction Risk", conventional: 8.0, esd: 8.5 },
    { factor: "Market Risk", conventional: 8.0, esd: 7.75 },
    { factor: "Profit Margin", conventional: 10.0, esd: 15.0 },
    { factor: "Overall Return", conventional: conventionalResults?.capitalValue || 0, esd: esdResults?.capitalValue || 0 }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">ESG Valuation Methodology</h1>
        <p className="text-muted-foreground">
          Robinson Residual Analysis: Conventional vs Environmentally Sustainable Development
        </p>
        <Badge variant="outline" className="text-xs">
          Based on University of Melbourne Research - Prof. Jon Robinson
        </Badge>
      </div>

      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="conventional">Conventional</TabsTrigger>
          <TabsTrigger value="esd">ESD Building</TabsTrigger>
          <TabsTrigger value="analysis">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Conventional Building
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {conventionalResults && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Capital Value:</span>
                      <span className="font-semibold">${(conventionalResults.capitalValue / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Net Land Value:</span>
                      <span className="font-semibold">${(conventionalResults.netResidualLandValue / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cap Rate:</span>
                      <span>{conventionalInputs.capRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Premium:</span>
                      <span>{conventionalInputs.profitMargin}%</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  ESD Building
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {esdResults && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Capital Value:</span>
                      <span className="font-semibold text-green-600">${(esdResults.capitalValue / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Net Land Value:</span>
                      <span className="font-semibold text-green-600">${(esdResults.netResidualLandValue / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cap Rate:</span>
                      <span>{esdInputs.capRate}% (psychic benefit)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Premium:</span>
                      <span>{esdInputs.profitMargin}% (higher risk)</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {comparisonData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Value Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: any, name: string) => [
                        `${typeof value === 'number' ? value.toFixed(1) : value}`,
                        name === 'conventional' ? 'Conventional' : 'ESD'
                      ]}
                    />
                    <Bar dataKey="conventional" fill={COLORS[0]} name="Conventional" />
                    <Bar dataKey="esd" fill={COLORS[1]} name="ESD" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {conventionalResults && esdResults && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Key Performance Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {((esdResults.capitalValue / conventionalResults.capitalValue - 1) * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Value Premium</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      ${((esdResults.netResidualLandValue - conventionalResults.netResidualLandValue) / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-muted-foreground">Land Value Uplift</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      ${esdInputs.productivitySavings}/sqm
                    </div>
                    <div className="text-sm text-muted-foreground">Productivity Benefit</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {esdInputs.rentalPremium}%
                    </div>
                    <div className="text-sm text-muted-foreground">Rental Premium</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="conventional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conventional Building Inputs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>Floor Area (sqm)</Label>
                  <Input 
                    type="number"
                    value={conventionalInputs.floorArea}
                    onChange={(e) => setConventionalInputs({...conventionalInputs, floorArea: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label>Base Rent ($/sqm)</Label>
                  <Input 
                    type="number"
                    value={conventionalInputs.baseRent}
                    onChange={(e) => setConventionalInputs({...conventionalInputs, baseRent: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label>Outgoings ($/sqm)</Label>
                  <Input 
                    type="number"
                    value={conventionalInputs.outgoings}
                    onChange={(e) => setConventionalInputs({...conventionalInputs, outgoings: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label>Building Cost ($)</Label>
                  <Input 
                    type="number"
                    value={conventionalInputs.buildingCost}
                    onChange={(e) => setConventionalInputs({...conventionalInputs, buildingCost: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label>Interest Rate (%)</Label>
                  <Input 
                    type="number"
                    step="0.1"
                    value={conventionalInputs.interestRate}
                    onChange={(e) => setConventionalInputs({...conventionalInputs, interestRate: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label>Cap Rate (%)</Label>
                  <Input 
                    type="number"
                    step="0.1"
                    value={conventionalInputs.capRate}
                    onChange={(e) => setConventionalInputs({...conventionalInputs, capRate: Number(e.target.value)})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {conventionalResults && (
            <Card>
              <CardHeader>
                <CardTitle>Residual Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Income Analysis</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Gross Rental:</span>
                          <span>${conventionalResults.grossRental}/sqm</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Net Rental:</span>
                          <span>${conventionalResults.netRental}/sqm</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Net Income:</span>
                          <span>${(conventionalResults.netIncome / 1000000).toFixed(2)}M</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Value Analysis</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Capital Value:</span>
                          <span>${(conventionalResults.capitalValue / 1000000).toFixed(2)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Building Costs:</span>
                          <span>${(conventionalResults.buildingCosts / 1000000).toFixed(2)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Net Land Value:</span>
                          <span>${(conventionalResults.netResidualLandValue / 1000000).toFixed(2)}M</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="esd" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ESD Building Inputs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>Rental Premium (%)</Label>
                  <Input 
                    type="number"
                    step="0.1"
                    value={esdInputs.rentalPremium}
                    onChange={(e) => setEsdInputs({...esdInputs, rentalPremium: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label>Productivity Savings ($/sqm)</Label>
                  <Input 
                    type="number"
                    value={esdInputs.productivitySavings}
                    onChange={(e) => setEsdInputs({...esdInputs, productivitySavings: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label>Outgoings Reduction ($/sqm)</Label>
                  <Input 
                    type="number"
                    value={esdInputs.outgoingsReduction}
                    onChange={(e) => setEsdInputs({...esdInputs, outgoingsReduction: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label>Building Cost Premium ($)</Label>
                  <Input 
                    type="number"
                    value={esdInputs.buildingCost}
                    onChange={(e) => setEsdInputs({...esdInputs, buildingCost: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label>Interest Rate Risk Premium (%)</Label>
                  <Input 
                    type="number"
                    step="0.1"
                    value={esdInputs.riskPremium}
                    onChange={(e) => setEsdInputs({...esdInputs, riskPremium: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label>Cap Rate Improvement (bp)</Label>
                  <Input 
                    type="number"
                    step="0.01"
                    value={esdInputs.capRateImprovement}
                    onChange={(e) => setEsdInputs({...esdInputs, capRateImprovement: Number(e.target.value)})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {esdResults && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  ESD Residual Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-green-600">Enhanced Income</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Gross Rental:</span>
                          <span>${esdResults.grossRental}/sqm</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Net Rental:</span>
                          <span>${esdResults.netRental}/sqm</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Net Income:</span>
                          <span>${(esdResults.netIncome / 1000000).toFixed(2)}M</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-green-600">Superior Value</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Capital Value:</span>
                          <span>${(esdResults.capitalValue / 1000000).toFixed(2)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Building Costs:</span>
                          <span>${(esdResults.buildingCosts / 1000000).toFixed(2)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Net Land Value:</span>
                          <span>${(esdResults.netResidualLandValue / 1000000).toFixed(2)}M</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk-Adjusted Return Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Risk Premium Analysis</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Construction Risk (Interest Rate):</span>
                        <div className="flex gap-2">
                          <Badge variant="outline">{conventionalInputs.interestRate}%</Badge>
                          <Badge variant="outline">{(esdInputs.interestRate).toFixed(1)}%</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Developer Profit Margin:</span>
                        <div className="flex gap-2">
                          <Badge variant="outline">{conventionalInputs.profitMargin}%</Badge>
                          <Badge variant="outline">{esdInputs.profitMargin}%</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Capitalisation Rate:</span>
                        <div className="flex gap-2">
                          <Badge variant="outline">{conventionalInputs.capRate}%</Badge>
                          <Badge variant="outline">{esdInputs.capRate}%</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4">Robinson Methodology Benefits</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>5% rental premium for improved environment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>$100/sqm productivity savings</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Reduced outgoings from efficiency</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Psychic income (25bp cap rate firming)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span>Higher construction risk (50bp premium)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span>Higher profit margin (15% vs 10%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-4">Financial Impact Summary</h4>
                  {conventionalResults && esdResults && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-4 border rounded-lg bg-green-50">
                        <div className="text-xl font-bold text-green-600">
                          +${((esdResults.capitalValue - conventionalResults.capitalValue) / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-sm text-muted-foreground">Capital Value Uplift</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg bg-blue-50">
                        <div className="text-xl font-bold text-blue-600">
                          +${((esdResults.netResidualLandValue - conventionalResults.netResidualLandValue) / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-sm text-muted-foreground">Land Value Premium</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg bg-purple-50">
                        <div className="text-xl font-bold text-purple-600">
                          {((esdResults.capitalValue / conventionalResults.capitalValue - 1) * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Total Return Premium</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg bg-orange-50">
                        <div className="text-xl font-bold text-orange-600">
                          {((esdInputs.buildingCost / conventionalInputs.buildingCost - 1) * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Construction Premium</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}