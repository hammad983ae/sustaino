/**
 * ============================================================================
 * PROPRIETARY FINANCIAL VALUATION ANALYSIS
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Financial analysis methodologies and calculation frameworks are proprietary
 * intellectual property protected by international copyright laws.
 * ============================================================================
 */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const EBITDAValuationAnalysis = () => {
  const [includeSection, setIncludeSection] = useState(true);
  const [revenue, setRevenue] = useState(120000);
  const [operatingExpenses, setOperatingExpenses] = useState(33000);
  const [depreciation, setDepreciation] = useState(10000);
  const [amortization, setAmortization] = useState(10000);
  const [interest, setInterest] = useState(0);
  const [capRate, setCapRate] = useState(7.5);
  
  // Adjustment items for Adjusted EBITDA
  const [oneTimeCharges, setOneTimeCharges] = useState(0);
  const [restructuringCosts, setRestructuringCosts] = useState(0);
  const [legalSettlements, setLegalSettlements] = useState(0);
  const [nonCashExpenses, setNonCashExpenses] = useState(0);
  const [otherAdjustments, setOtherAdjustments] = useState(0);

  // Calculations
  const ebitda = revenue - operatingExpenses;
  const totalAdjustments = oneTimeCharges + restructuringCosts + legalSettlements + nonCashExpenses + otherAdjustments;
  const adjustedEbitda = ebitda + totalAdjustments;
  const ebit = ebitda - depreciation - amortization;
  const netOperatingIncome = revenue - operatingExpenses;
  const estimatedValue = netOperatingIncome / (capRate / 100);
  const ebitdaMargin = (ebitda / revenue) * 100;
  const adjustedEbitdaMargin = (adjustedEbitda / revenue) * 100;
  const ebitMargin = (ebit / revenue) * 100;

  if (!includeSection) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>EBITDA & Financial Analysis</CardTitle>
            <div className="flex items-center gap-2">
              <Label htmlFor="include-ebitda">Include</Label>
              <Switch
                id="include-ebitda"
                checked={includeSection}
                onCheckedChange={setIncludeSection}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This section is excluded from the report.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>EBITDA & Financial Analysis</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Comprehensive financial performance analysis including EBITDA, EBIT, and valuation metrics
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="include-ebitda">Include</Label>
              <Switch
                id="include-ebitda"
                checked={includeSection}
                onCheckedChange={setIncludeSection}
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Financial Inputs */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Inputs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="revenue">Annual Revenue ($)</Label>
              <Input
                id="revenue"
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                placeholder="120000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="operating-expenses">Operating Expenses ($)</Label>
              <Input
                id="operating-expenses"
                type="number"
                value={operatingExpenses}
                onChange={(e) => setOperatingExpenses(Number(e.target.value))}
                placeholder="33000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="depreciation">Depreciation ($)</Label>
              <Input
                id="depreciation"
                type="number"
                value={depreciation}
                onChange={(e) => setDepreciation(Number(e.target.value))}
                placeholder="10000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amortization">Amortization ($)</Label>
              <Input
                id="amortization"
                type="number"
                value={amortization}
                onChange={(e) => setAmortization(Number(e.target.value))}
                placeholder="10000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interest">Interest Expenses ($)</Label>
              <Input
                id="interest"
                type="number"
                value={interest}
                onChange={(e) => setInterest(Number(e.target.value))}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cap-rate">Cap Rate (%)</Label>
              <Input
                id="cap-rate"
                type="number"
                step="0.1"
                value={capRate}
                onChange={(e) => setCapRate(Number(e.target.value))}
                placeholder="7.5"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Adjustment Items for Adjusted EBITDA */}
      <Card>
        <CardHeader>
          <CardTitle>EBITDA Adjustments</CardTitle>
          <p className="text-sm text-muted-foreground">
            Add back or subtract non-recurring, extraordinary, or non-operational items
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="one-time-charges">One-time Charges/Gains ($)</Label>
              <Input
                id="one-time-charges"
                type="number"
                value={oneTimeCharges}
                onChange={(e) => setOneTimeCharges(Number(e.target.value))}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="restructuring">Restructuring Costs ($)</Label>
              <Input
                id="restructuring"
                type="number"
                value={restructuringCosts}
                onChange={(e) => setRestructuringCosts(Number(e.target.value))}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="legal-settlements">Legal Settlements ($)</Label>
              <Input
                id="legal-settlements"
                type="number"
                value={legalSettlements}
                onChange={(e) => setLegalSettlements(Number(e.target.value))}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="non-cash">Non-cash Expenses ($)</Label>
              <Input
                id="non-cash"
                type="number"
                value={nonCashExpenses}
                onChange={(e) => setNonCashExpenses(Number(e.target.value))}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="other-adjustments">Other Adjustments ($)</Label>
              <Input
                id="other-adjustments"
                type="number"
                value={otherAdjustments}
                onChange={(e) => setOtherAdjustments(Number(e.target.value))}
                placeholder="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EBITDA Calculation */}
      <Card>
        <CardHeader>
          <CardTitle>EBITDA Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">Revenue</span>
                  <span className="text-green-600 font-semibold">${revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">Less: Operating Expenses</span>
                  <span className="text-red-600 font-semibold">-${operatingExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-b-2 border-primary pb-2">
                  <span className="font-bold text-lg">EBITDA</span>
                  <div className="text-right">
                    <div className="text-primary font-bold text-lg">${ebitda.toLocaleString()}</div>
                    <Badge variant="secondary" className="text-xs">
                      {ebitdaMargin.toFixed(1)}% margin
                    </Badge>
                  </div>
                </div>
                {totalAdjustments !== 0 && (
                  <>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Adjustments</span>
                      <span className={`font-semibold ${totalAdjustments >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {totalAdjustments >= 0 ? '+' : ''}${totalAdjustments.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b-2 border-secondary pb-2">
                      <span className="font-bold text-lg text-secondary">Adjusted EBITDA</span>
                      <div className="text-right">
                        <div className="text-secondary font-bold text-lg">${adjustedEbitda.toLocaleString()}</div>
                        <Badge variant="outline" className="text-xs">
                          {adjustedEbitdaMargin.toFixed(1)}% margin
                        </Badge>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="space-y-2">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">EBITDA Explanation</h4>
                  <p className="text-sm text-muted-foreground">
                    EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) shows the property's 
                    operational cash flow potential. This metric excludes non-cash expenses and financing costs, 
                    providing a clear view of operating performance.
                  </p>
                  {totalAdjustments !== 0 && (
                    <>
                      <h4 className="font-semibold mb-2 mt-4">Adjusted EBITDA</h4>
                      <p className="text-sm text-muted-foreground">
                        Adjusted EBITDA = Net Income + Interest + Taxes + Depreciation + Amortization ± Non-recurring items. 
                        This metric excludes one-time charges, restructuring costs, and other extraordinary items to reflect 
                        ongoing operational performance.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EBIT Calculation */}
      <Card>
        <CardHeader>
          <CardTitle>EBIT Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">EBITDA</span>
                  <span className="text-green-600 font-semibold">${ebitda.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">Less: Depreciation</span>
                  <span className="text-red-600 font-semibold">-${depreciation.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">Less: Amortization</span>
                  <span className="text-red-600 font-semibold">-${amortization.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-b-2 border-primary pb-2">
                  <span className="font-bold text-lg">EBIT</span>
                  <div className="text-right">
                    <div className="text-primary font-bold text-lg">${ebit.toLocaleString()}</div>
                    <Badge variant="secondary" className="text-xs">
                      {ebitMargin.toFixed(1)}% margin
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">EBIT Explanation</h4>
                  <p className="text-sm text-muted-foreground">
                    EBIT (Earnings Before Interest and Taxes) represents the property's operating profit 
                    after accounting for depreciation and amortization. This metric is useful for 
                    comparing properties and assessing operational efficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Valuation Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Valuation Methods Using Financial Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Income Capitalization Method */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-primary mb-3">Income Capitalization Method</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Net Operating Income (NOI)</span>
                    <span className="font-semibold">${netOperatingIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Capitalization Rate</span>
                    <span className="font-semibold">{capRate}%</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg font-bold text-primary">
                    <span>Estimated Market Value</span>
                    <span>${estimatedValue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="bg-muted p-3 rounded">
                  <p className="text-sm text-muted-foreground">
                    <strong>Formula:</strong> Market Value = NOI ÷ Cap Rate
                    <br />
                    <strong>Calculation:</strong> ${netOperatingIncome.toLocaleString()} ÷ {capRate}% = ${estimatedValue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Cash Flow Analysis */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-primary mb-3">Cash Flow Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-green-50 rounded">
                  <div className="text-2xl font-bold text-green-600">${ebitda.toLocaleString()}</div>
                  <div className="text-sm text-green-700">Annual Cash Flow (EBITDA)</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded">
                  <div className="text-2xl font-bold text-blue-600">{ebitdaMargin.toFixed(1)}%</div>
                  <div className="text-sm text-blue-700">EBITDA Margin</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded">
                  <div className="text-2xl font-bold text-purple-600">{((ebitda / estimatedValue) * 100).toFixed(1)}%</div>
                  <div className="text-sm text-purple-700">Cash-on-Cash Return</div>
                </div>
              </div>
            </div>

            {/* Alternative Valuation Multiples */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-primary mb-3">Valuation Multiples</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Revenue Multiple</span>
                    <span className="font-semibold">{(estimatedValue / revenue).toFixed(1)}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>EBITDA Multiple</span>
                    <span className="font-semibold">{(estimatedValue / ebitda).toFixed(1)}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>EBIT Multiple</span>
                    <span className="font-semibold">{(estimatedValue / ebit).toFixed(1)}x</span>
                  </div>
                </div>
                <div className="bg-muted p-3 rounded">
                  <p className="text-sm text-muted-foreground">
                    These multiples can be compared to similar properties to validate the valuation. 
                    Typical commercial property EBITDA multiples range from 8-15x depending on location, 
                    property type, and market conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Provide additional financial analysis commentary..."
            defaultValue="The property demonstrates strong financial performance with an EBITDA of $87,000 representing a healthy 72.5% margin. The solar energy infrastructure contributes significantly to cost efficiency, reducing operational expenses and enhancing overall profitability. The stable rental income stream from worker accommodation provides predictable cash flows, making this an attractive investment proposition."
            className="min-h-[120px]"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EBITDAValuationAnalysis;