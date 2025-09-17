import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calculator, PieChart, BarChart3, TrendingUp, AlertTriangle } from "lucide-react";

interface FeasibilityInputs {
  // Revenue
  totalUnits: number;
  averageSalePrice: number;
  commercialSpaceRevenue: number;
  parkingRevenue: number;
  
  // Costs
  landCost: number;
  constructionCostPerSqm: number;
  totalGFA: number;
  professionalFees: number;
  marketingCosts: number;
  financingCosts: number;
  councilContributions: number;
  contingency: number;
  
  // Timing
  developmentPeriod: number;
  salesPeriod: number;
  
  // Finance
  interestRate: number;
  developerProfit: number;
  lvrRequirement: number;
}

interface FeasibilityResult {
  totalRevenue: number;
  totalCosts: number;
  grossProfit: number;
  profitMargin: number;
  roi: number;
  irr: number;
  isViable: boolean;
  riskLevel: string;
}

export default function FeasibilityStudy({ siteData }: { siteData: any }) {
  const [inputs, setInputs] = useState<FeasibilityInputs>({
    totalUnits: siteData?.estimatedUnits || 500,
    averageSalePrice: 850000,
    commercialSpaceRevenue: 15000000,
    parkingRevenue: 2500000,
    landCost: 75000000,
    constructionCostPerSqm: 4500,
    totalGFA: siteData?.proposedGFA || 48051,
    professionalFees: 8,
    marketingCosts: 3,
    financingCosts: 4.5,
    councilContributions: 5000000,
    contingency: 10,
    developmentPeriod: 30,
    salesPeriod: 18,
    interestRate: 7.5,
    developerProfit: 20,
    lvrRequirement: 70
  });

  const [result, setResult] = useState<FeasibilityResult>({
    totalRevenue: 0,
    totalCosts: 0,
    grossProfit: 0,
    profitMargin: 0,
    roi: 0,
    irr: 0,
    isViable: false,
    riskLevel: 'Medium'
  });

  const [lvrAnalysis, setLvrAnalysis] = useState({
    maxLoanAmount: 0,
    equityRequired: 0,
    securityValue: 0,
    lvrRatio: 0,
    recommendation: ''
  });

  const calculateFeasibility = () => {
    // Revenue Calculations
    const residentialRevenue = inputs.totalUnits * inputs.averageSalePrice;
    const totalRevenue = residentialRevenue + inputs.commercialSpaceRevenue + inputs.parkingRevenue;
    
    // Cost Calculations
    const constructionCosts = inputs.totalGFA * inputs.constructionCostPerSqm;
    const professionalFeeCosts = constructionCosts * (inputs.professionalFees / 100);
    const marketingCostsAmount = totalRevenue * (inputs.marketingCosts / 100);
    const financingCostsAmount = (constructionCosts + inputs.landCost) * (inputs.financingCosts / 100);
    const contingencyAmount = constructionCosts * (inputs.contingency / 100);
    
    const totalCosts = inputs.landCost + constructionCosts + professionalFeeCosts + 
                      marketingCostsAmount + financingCostsAmount + inputs.councilContributions + contingencyAmount;
    
    // Profit Calculations
    const grossProfit = totalRevenue - totalCosts;
    const profitMargin = (grossProfit / totalRevenue) * 100;
    const roi = (grossProfit / totalCosts) * 100;
    
    // IRR Calculation (simplified)
    const totalPeriod = inputs.developmentPeriod + inputs.salesPeriod;
    const irr = (Math.pow(totalRevenue / totalCosts, 12 / totalPeriod) - 1) * 100;
    
    // Viability Assessment
    const isViable = profitMargin >= inputs.developerProfit && roi >= 15;
    const riskLevel = profitMargin >= 25 ? 'Low' : profitMargin >= 15 ? 'Medium' : 'High';
    
    setResult({
      totalRevenue,
      totalCosts,
      grossProfit,
      profitMargin,
      roi,
      irr,
      isViable,
      riskLevel
    });
  };

  const calculateLVR = () => {
    const securityValue = result.totalRevenue * 0.7; // Conservative lending approach
    const maxLoanAmount = securityValue * (inputs.lvrRequirement / 100);
    const equityRequired = result.totalCosts - maxLoanAmount;
    const lvrRatio = (maxLoanAmount / securityValue) * 100;
    
    let recommendation = '';
    if (lvrRatio <= 70) {
      recommendation = 'Conservative LVR - Low risk for lenders';
    } else if (lvrRatio <= 80) {
      recommendation = 'Standard LVR - Moderate risk';
    } else {
      recommendation = 'High LVR - Increased risk, may require mortgage insurance';
    }
    
    setLvrAnalysis({
      maxLoanAmount,
      equityRequired,
      securityValue,
      lvrRatio,
      recommendation
    });
  };

  useEffect(() => {
    calculateFeasibility();
  }, [inputs]);

  useEffect(() => {
    if (result.totalRevenue > 0) {
      calculateLVR();
    }
  }, [result, inputs.lvrRequirement]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="inputs" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="lvr">LVR Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Development Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="totalUnits">Total Units</Label>
                  <Input
                    id="totalUnits"
                    type="number"
                    value={inputs.totalUnits}
                    onChange={(e) => setInputs(prev => ({ ...prev, totalUnits: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="totalGFA">Total GFA (sqm)</Label>
                  <Input
                    id="totalGFA"
                    type="number"
                    value={inputs.totalGFA}
                    onChange={(e) => setInputs(prev => ({ ...prev, totalGFA: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="developmentPeriod">Development Period (months)</Label>
                  <Input
                    id="developmentPeriod"
                    type="number"
                    value={inputs.developmentPeriod}
                    onChange={(e) => setInputs(prev => ({ ...prev, developmentPeriod: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="salesPeriod">Sales Period (months)</Label>
                  <Input
                    id="salesPeriod"
                    type="number"
                    value={inputs.salesPeriod}
                    onChange={(e) => setInputs(prev => ({ ...prev, salesPeriod: Number(e.target.value) }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    value={inputs.interestRate}
                    onChange={(e) => setInputs(prev => ({ ...prev, interestRate: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="developerProfit">Target Profit Margin (%)</Label>
                  <Input
                    id="developerProfit"
                    type="number"
                    value={inputs.developerProfit}
                    onChange={(e) => setInputs(prev => ({ ...prev, developerProfit: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="lvrRequirement">LVR Requirement (%)</Label>
                  <Input
                    id="lvrRequirement"
                    type="number"
                    value={inputs.lvrRequirement}
                    onChange={(e) => setInputs(prev => ({ ...prev, lvrRequirement: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="contingency">Contingency (%)</Label>
                  <Input
                    id="contingency"
                    type="number"
                    value={inputs.contingency}
                    onChange={(e) => setInputs(prev => ({ ...prev, contingency: Number(e.target.value) }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Revenue Projections
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="averageSalePrice">Average Sale Price per Unit</Label>
                  <Input
                    id="averageSalePrice"
                    type="number"
                    value={inputs.averageSalePrice}
                    onChange={(e) => setInputs(prev => ({ ...prev, averageSalePrice: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="commercialRevenue">Commercial Space Revenue</Label>
                  <Input
                    id="commercialRevenue"
                    type="number"
                    value={inputs.commercialSpaceRevenue}
                    onChange={(e) => setInputs(prev => ({ ...prev, commercialSpaceRevenue: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="parkingRevenue">Parking Revenue</Label>
                  <Input
                    id="parkingRevenue"
                    type="number"
                    value={inputs.parkingRevenue}
                    onChange={(e) => setInputs(prev => ({ ...prev, parkingRevenue: Number(e.target.value) }))}
                  />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Revenue Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Residential Sales:</span>
                    <span>{formatCurrency(inputs.totalUnits * inputs.averageSalePrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Commercial Revenue:</span>
                    <span>{formatCurrency(inputs.commercialSpaceRevenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Parking Revenue:</span>
                    <span>{formatCurrency(inputs.parkingRevenue)}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Total Revenue:</span>
                    <span>{formatCurrency(result.totalRevenue)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Cost Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="landCost">Land Acquisition Cost</Label>
                  <Input
                    id="landCost"
                    type="number"
                    value={inputs.landCost}
                    onChange={(e) => setInputs(prev => ({ ...prev, landCost: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="constructionCost">Construction Cost per sqm</Label>
                  <Input
                    id="constructionCost"
                    type="number"
                    value={inputs.constructionCostPerSqm}
                    onChange={(e) => setInputs(prev => ({ ...prev, constructionCostPerSqm: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="professionalFees">Professional Fees (%)</Label>
                  <Input
                    id="professionalFees"
                    type="number"
                    value={inputs.professionalFees}
                    onChange={(e) => setInputs(prev => ({ ...prev, professionalFees: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="marketingCosts">Marketing Costs (%)</Label>
                  <Input
                    id="marketingCosts"
                    type="number"
                    value={inputs.marketingCosts}
                    onChange={(e) => setInputs(prev => ({ ...prev, marketingCosts: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="councilContributions">Council Contributions</Label>
                  <Input
                    id="councilContributions"
                    type="number"
                    value={inputs.councilContributions}
                    onChange={(e) => setInputs(prev => ({ ...prev, councilContributions: Number(e.target.value) }))}
                  />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Cost Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Land Cost:</span>
                    <span>{formatCurrency(inputs.landCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Construction:</span>
                    <span>{formatCurrency(inputs.totalGFA * inputs.constructionCostPerSqm)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Professional Fees:</span>
                    <span>{formatCurrency((inputs.totalGFA * inputs.constructionCostPerSqm) * (inputs.professionalFees / 100))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Council Contributions:</span>
                    <span>{formatCurrency(inputs.councilContributions)}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Total Costs:</span>
                    <span>{formatCurrency(result.totalCosts)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Feasibility Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Revenue:</span>
                    <span className="font-medium">{formatCurrency(result.totalRevenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Costs:</span>
                    <span className="font-medium">{formatCurrency(result.totalCosts)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span>Gross Profit:</span>
                    <span className={result.grossProfit > 0 ? 'text-green-600' : 'text-red-600'}>
                      {formatCurrency(result.grossProfit)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex justify-between items-center">
                    <span>Profit Margin:</span>
                    <Badge variant={result.profitMargin >= inputs.developerProfit ? "default" : "destructive"}>
                      {formatPercentage(result.profitMargin)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Return on Investment:</span>
                    <Badge variant={result.roi >= 15 ? "default" : "secondary"}>
                      {formatPercentage(result.roi)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Internal Rate of Return:</span>
                    <Badge variant="outline">
                      {formatPercentage(result.irr)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Viability Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${result.isViable ? 'text-green-600' : 'text-red-600'}`}>
                    {result.isViable ? 'VIABLE' : 'NOT VIABLE'}
                  </div>
                  <Badge variant={result.riskLevel === 'Low' ? "default" : result.riskLevel === 'Medium' ? "secondary" : "destructive"}>
                    {result.riskLevel} Risk
                  </Badge>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Profit Margin Target</span>
                      <span className="text-sm">{formatPercentage(inputs.developerProfit)}</span>
                    </div>
                    <Progress 
                      value={Math.min((result.profitMargin / inputs.developerProfit) * 100, 100)} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">ROI Target (15%)</span>
                      <span className="text-sm">15%</span>
                    </div>
                    <Progress 
                      value={Math.min((result.roi / 15) * 100, 100)} 
                      className="h-2" 
                    />
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    {result.isViable 
                      ? "Project meets financial viability criteria with acceptable returns."
                      : "Project requires optimization to achieve target returns."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lvr" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Loan-to-Value Ratio Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="lvrTarget">Target LVR (%)</Label>
                    <Input
                      id="lvrTarget"
                      type="number"
                      value={inputs.lvrRequirement}
                      onChange={(e) => setInputs(prev => ({ ...prev, lvrRequirement: Number(e.target.value) }))}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Security Value:</span>
                      <span className="font-medium">{formatCurrency(lvrAnalysis.securityValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maximum Loan Amount:</span>
                      <span className="font-medium">{formatCurrency(lvrAnalysis.maxLoanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Equity Required:</span>
                      <span className="font-medium">{formatCurrency(lvrAnalysis.equityRequired)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Actual LVR:</span>
                      <Badge variant={lvrAnalysis.lvrRatio <= 70 ? "default" : lvrAnalysis.lvrRatio <= 80 ? "secondary" : "destructive"}>
                        {formatPercentage(lvrAnalysis.lvrRatio)}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">LVR Recommendation</h4>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">{lvrAnalysis.recommendation}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Mortgage Suitability</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Development Finance:</span>
                        <Badge variant={result.isViable ? "default" : "destructive"}>
                          {result.isViable ? "Suitable" : "Review Required"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">End Loan Finance:</span>
                        <Badge variant={lvrAnalysis.lvrRatio <= 80 ? "default" : "secondary"}>
                          {lvrAnalysis.lvrRatio <= 80 ? "Standard" : "Specialist Required"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}