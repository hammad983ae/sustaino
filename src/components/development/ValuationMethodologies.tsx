import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, DollarSign, BarChart3 } from "lucide-react";

interface ValuationInputs {
  // DCF Analysis
  estimatedSalePrice: number;
  constructionCosts: number;
  professionalFees: number;
  developmentPeriod: number;
  salesPeriod: number;
  interestRate: number;
  developerProfit: number;
  
  // Direct Comparison
  comparablePricePerSqm: number;
  locationAdjustment: number;
  sizeAdjustment: number;
  
  // Residual Land Value
  grossRealisation: number;
  totalCosts: number;
  
  // Hypothetical Development
  completedValue: number;
  developmentCosts: number;
}

interface ValuationResult {
  method: string;
  value: number;
  confidence: number;
  gstExclusive: number;
  gstInclusive: number;
}

export default function ValuationMethodologies({ siteData }: { siteData: any }) {
  const [inputs, setInputs] = useState<ValuationInputs>({
    estimatedSalePrice: 850000,
    constructionCosts: 4500,
    professionalFees: 15,
    developmentPeriod: 24,
    salesPeriod: 12,
    interestRate: 7.5,
    developerProfit: 20,
    comparablePricePerSqm: 12000,
    locationAdjustment: 10,
    sizeAdjustment: 5,
    grossRealisation: 425000000,
    totalCosts: 350000000,
    completedValue: 450000000,
    developmentCosts: 300000000
  });

  const [results, setResults] = useState<ValuationResult[]>([]);

  const calculateDCF = () => {
    const totalSaleValue = inputs.estimatedSalePrice * siteData?.estimatedUnits || 500;
    const totalConstructionCosts = inputs.constructionCosts * (siteData?.proposedGFA || 48051);
    const professionalFeeCosts = totalConstructionCosts * (inputs.professionalFees / 100);
    const financingCosts = (totalConstructionCosts + professionalFeeCosts) * (inputs.interestRate / 100) * (inputs.developmentPeriod / 12);
    const developerProfitAmount = totalSaleValue * (inputs.developerProfit / 100);
    
    const landValue = totalSaleValue - totalConstructionCosts - professionalFeeCosts - financingCosts - developerProfitAmount;
    
    return {
      method: "DCF Analysis",
      value: landValue,
      confidence: 85,
      gstExclusive: landValue / 1.1,
      gstInclusive: landValue
    };
  };

  const calculateDirectComparison = () => {
    const baseValue = inputs.comparablePricePerSqm * (siteData?.landArea || 14561);
    const adjustedValue = baseValue * (1 + (inputs.locationAdjustment / 100)) * (1 + (inputs.sizeAdjustment / 100));
    
    return {
      method: "Direct Comparison",
      value: adjustedValue,
      confidence: 75,
      gstExclusive: adjustedValue / 1.1,
      gstInclusive: adjustedValue
    };
  };

  const calculateResidualLandValue = () => {
    const landValue = inputs.grossRealisation - inputs.totalCosts;
    
    return {
      method: "Residual Land Value",
      value: landValue,
      confidence: 90,
      gstExclusive: landValue / 1.1,
      gstInclusive: landValue
    };
  };

  const calculateHypotheticalDevelopment = () => {
    const landValue = inputs.completedValue - inputs.developmentCosts;
    
    return {
      method: "Hypothetical Development",
      value: landValue,
      confidence: 80,
      gstExclusive: landValue / 1.1,
      gstInclusive: landValue
    };
  };

  const calculateHighestAndBestUse = () => {
    // Take the highest value from all methods
    const allResults = [calculateDCF(), calculateDirectComparison(), calculateResidualLandValue(), calculateHypotheticalDevelopment()];
    const highestValue = Math.max(...allResults.map(r => r.value));
    
    return {
      method: "Highest and Best Use",
      value: highestValue,
      confidence: 95,
      gstExclusive: highestValue / 1.1,
      gstInclusive: highestValue
    };
  };

  useEffect(() => {
    const newResults = [
      calculateDCF(),
      calculateDirectComparison(),
      calculateResidualLandValue(),
      calculateHypotheticalDevelopment(),
      calculateHighestAndBestUse()
    ];
    setResults(newResults);
  }, [inputs, siteData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="dcf" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dcf">DCF Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Direct Comparison</TabsTrigger>
          <TabsTrigger value="residual">Residual Value</TabsTrigger>
          <TabsTrigger value="hypothetical">Hypothetical Dev</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="dcf" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Discounted Cash Flow Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="estimatedSalePrice">Estimated Sale Price per Unit</Label>
                  <Input
                    id="estimatedSalePrice"
                    type="number"
                    value={inputs.estimatedSalePrice}
                    onChange={(e) => setInputs(prev => ({ ...prev, estimatedSalePrice: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="constructionCosts">Construction Costs per sqm</Label>
                  <Input
                    id="constructionCosts"
                    type="number"
                    value={inputs.constructionCosts}
                    onChange={(e) => setInputs(prev => ({ ...prev, constructionCosts: Number(e.target.value) }))}
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
                  <Label htmlFor="developmentPeriod">Development Period (months)</Label>
                  <Input
                    id="developmentPeriod"
                    type="number"
                    value={inputs.developmentPeriod}
                    onChange={(e) => setInputs(prev => ({ ...prev, developmentPeriod: Number(e.target.value) }))}
                  />
                </div>
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
                  <Label htmlFor="developerProfit">Developer Profit (%)</Label>
                  <Input
                    id="developerProfit"
                    type="number"
                    value={inputs.developerProfit}
                    onChange={(e) => setInputs(prev => ({ ...prev, developerProfit: Number(e.target.value) }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Direct Comparison Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="comparablePricePerSqm">Comparable Price per sqm</Label>
                  <Input
                    id="comparablePricePerSqm"
                    type="number"
                    value={inputs.comparablePricePerSqm}
                    onChange={(e) => setInputs(prev => ({ ...prev, comparablePricePerSqm: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="locationAdjustment">Location Adjustment (%)</Label>
                  <Input
                    id="locationAdjustment"
                    type="number"
                    value={inputs.locationAdjustment}
                    onChange={(e) => setInputs(prev => ({ ...prev, locationAdjustment: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="sizeAdjustment">Size Adjustment (%)</Label>
                  <Input
                    id="sizeAdjustment"
                    type="number"
                    value={inputs.sizeAdjustment}
                    onChange={(e) => setInputs(prev => ({ ...prev, sizeAdjustment: Number(e.target.value) }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="residual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Residual Land Value Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="grossRealisation">Gross Realisation Value</Label>
                  <Input
                    id="grossRealisation"
                    type="number"
                    value={inputs.grossRealisation}
                    onChange={(e) => setInputs(prev => ({ ...prev, grossRealisation: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="totalCosts">Total Development Costs</Label>
                  <Input
                    id="totalCosts"
                    type="number"
                    value={inputs.totalCosts}
                    onChange={(e) => setInputs(prev => ({ ...prev, totalCosts: Number(e.target.value) }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hypothetical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Hypothetical Development Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="completedValue">Completed Development Value</Label>
                  <Input
                    id="completedValue"
                    type="number"
                    value={inputs.completedValue}
                    onChange={(e) => setInputs(prev => ({ ...prev, completedValue: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="developmentCosts">Development Costs</Label>
                  <Input
                    id="developmentCosts"
                    type="number"
                    value={inputs.developmentCosts}
                    onChange={(e) => setInputs(prev => ({ ...prev, developmentCosts: Number(e.target.value) }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Valuation Results Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{result.method}</h3>
                      <Badge variant={result.confidence >= 90 ? "default" : result.confidence >= 80 ? "secondary" : "outline"}>
                        {result.confidence}% Confidence
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">GST Exclusive</p>
                        <p className="font-medium">{formatCurrency(result.gstExclusive)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">GST Inclusive</p>
                        <p className="font-medium">{formatCurrency(result.gstInclusive)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}