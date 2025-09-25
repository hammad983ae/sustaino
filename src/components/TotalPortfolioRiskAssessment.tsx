import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, TrendingUp, TrendingDown, Shield, DollarSign, BarChart3, Leaf, Calculator, FileBarChart } from 'lucide-react';

interface PortfolioAsset {
  id: string;
  propertyAddress: string;
  assetValue: number;
  debtAmount: number;
  ltvRatio: number;
  lvmRatio: number;
  lmiRequired: boolean;
  lmiPremium: number;
  esgScore: number;
  riskRating: 'Low' | 'Medium' | 'High' | 'Critical';
  yieldRate: number;
  location: string;
  propertyType: string;
  weight: number;
}

interface RiskMetrics {
  totalAssetValue: number;
  totalDebtExposure: number;
  weightedAverageLTV: number;
  weightedAverageLVM: number;
  totalLMIPremium: number;
  weightedESGScore: number;
  portfolioYield: number;
  concentrationRisk: number;
  overallRiskScore: number;
  riskGrade: string;
}

const TotalPortfolioRiskAssessment: React.FC = () => {
  const [portfolioAssets, setPortfolioAssets] = useState<PortfolioAsset[]>([
    {
      id: '1',
      propertyAddress: '123 Collins Street, Melbourne VIC',
      assetValue: 2500000,
      debtAmount: 2000000,
      ltvRatio: 80,
      lvmRatio: 85,
      lmiRequired: true,
      lmiPremium: 45000,
      esgScore: 75,
      riskRating: 'Medium',
      yieldRate: 4.2,
      location: 'Melbourne CBD',
      propertyType: 'Commercial Office',
      weight: 0.3
    },
    {
      id: '2',
      propertyAddress: '456 George Street, Sydney NSW',
      assetValue: 3200000,
      debtAmount: 2400000,
      ltvRatio: 75,
      lvmRatio: 80,
      lmiRequired: true,
      lmiPremium: 52000,
      esgScore: 82,
      riskRating: 'Low',
      yieldRate: 3.8,
      location: 'Sydney CBD',
      propertyType: 'Commercial Office',
      weight: 0.4
    },
    {
      id: '3',
      propertyAddress: '789 Queen Street, Brisbane QLD',
      assetValue: 1800000,
      debtAmount: 1530000,
      ltvRatio: 85,
      lvmRatio: 90,
      lmiRequired: true,
      lmiPremium: 38000,
      esgScore: 68,
      riskRating: 'High',
      yieldRate: 5.1,
      location: 'Brisbane CBD',
      propertyType: 'Retail',
      weight: 0.3
    }
  ]);

  const [riskMetrics, setRiskMetrics] = useState<RiskMetrics>({
    totalAssetValue: 0,
    totalDebtExposure: 0,
    weightedAverageLTV: 0,
    weightedAverageLVM: 0,
    totalLMIPremium: 0,
    weightedESGScore: 0,
    portfolioYield: 0,
    concentrationRisk: 0,
    overallRiskScore: 0,
    riskGrade: 'A'
  });

  const calculatePortfolioRisk = () => {
    const totalAssetValue = portfolioAssets.reduce((sum, asset) => sum + (asset.assetValue * asset.weight), 0);
    const totalDebtExposure = portfolioAssets.reduce((sum, asset) => sum + (asset.debtAmount * asset.weight), 0);
    const totalLMIPremium = portfolioAssets.reduce((sum, asset) => sum + (asset.lmiPremium * asset.weight), 0);
    
    const weightedAverageLTV = portfolioAssets.reduce((sum, asset) => sum + (asset.ltvRatio * asset.weight), 0);
    const weightedAverageLVM = portfolioAssets.reduce((sum, asset) => sum + (asset.lvmRatio * asset.weight), 0);
    const weightedESGScore = portfolioAssets.reduce((sum, asset) => sum + (asset.esgScore * asset.weight), 0);
    const portfolioYield = portfolioAssets.reduce((sum, asset) => sum + (asset.yieldRate * asset.weight), 0);

    // Calculate concentration risk based on location and property type diversity
    const locationCount = new Set(portfolioAssets.map(a => a.location)).size;
    const propertyTypeCount = new Set(portfolioAssets.map(a => a.propertyType)).size;
    const concentrationRisk = Math.max(0, 100 - (locationCount * 20 + propertyTypeCount * 15));

    // Calculate overall risk score (lower is better)
    const ltvRisk = Math.max(0, (weightedAverageLTV - 70) * 2);
    const lvmRisk = Math.max(0, (weightedAverageLVM - 75) * 1.5);
    const esgRisk = Math.max(0, (80 - weightedESGScore) * 1.2);
    const yieldRisk = Math.max(0, (portfolioYield - 4.0) * 10);
    
    const overallRiskScore = ltvRisk + lvmRisk + esgRisk + concentrationRisk + yieldRisk;
    
    let riskGrade = 'A+';
    if (overallRiskScore > 80) riskGrade = 'D';
    else if (overallRiskScore > 60) riskGrade = 'C';
    else if (overallRiskScore > 40) riskGrade = 'B';
    else if (overallRiskScore > 20) riskGrade = 'A-';

    setRiskMetrics({
      totalAssetValue,
      totalDebtExposure,
      weightedAverageLTV,
      weightedAverageLVM,
      totalLMIPremium,
      weightedESGScore,
      portfolioYield,
      concentrationRisk,
      overallRiskScore,
      riskGrade
    });
  };

  useEffect(() => {
    calculatePortfolioRisk();
  }, [portfolioAssets]);

  const getRiskColor = (score: number) => {
    if (score < 20) return 'text-green-600';
    if (score < 40) return 'text-yellow-600';
    if (score < 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRiskBadgeVariant = (rating: string) => {
    switch (rating) {
      case 'Low': return 'default' as const;
      case 'Medium': return 'secondary' as const;
      case 'High': return 'destructive' as const;
      case 'Critical': return 'destructive' as const;
      default: return 'outline' as const;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Total Portfolio Risk Assessment
          </CardTitle>
          <CardDescription>
            Comprehensive risk analysis for broker/lender portfolios including weighted asset allocation, debt exposure, and risk factors
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
          <TabsTrigger value="assets">Asset Breakdown</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Total Portfolio Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${riskMetrics.totalAssetValue.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Debt Exposure: ${riskMetrics.totalDebtExposure.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Risk Grade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getRiskColor(riskMetrics.overallRiskScore)}`}>
                  {riskMetrics.riskGrade}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Risk Score: {riskMetrics.overallRiskScore.toFixed(1)}/100
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Portfolio Yield
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {riskMetrics.portfolioYield.toFixed(2)}%
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Weighted Average Return
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Risk Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Weighted Average LTV</Label>
                    <span className="font-medium">{riskMetrics.weightedAverageLTV.toFixed(1)}%</span>
                  </div>
                  <Progress value={riskMetrics.weightedAverageLTV} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Weighted Average LVM</Label>
                    <span className="font-medium">{riskMetrics.weightedAverageLVM.toFixed(1)}%</span>
                  </div>
                  <Progress value={riskMetrics.weightedAverageLVM} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Concentration Risk</Label>
                    <span className={`font-medium ${getRiskColor(riskMetrics.concentrationRisk)}`}>
                      {riskMetrics.concentrationRisk.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={riskMetrics.concentrationRisk} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  ESG & LMI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Weighted ESG Score</Label>
                  <Badge variant={riskMetrics.weightedESGScore > 75 ? 'default' : 'secondary'}>
                    {riskMetrics.weightedESGScore.toFixed(1)}/100
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <Label>Total LMI Premium</Label>
                  <span className="font-medium">
                    ${riskMetrics.totalLMIPremium.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <Label>LMI as % of Portfolio</Label>
                  <span className="font-medium">
                    {((riskMetrics.totalLMIPremium / riskMetrics.totalAssetValue) * 100).toFixed(2)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Asset Breakdown</CardTitle>
              <CardDescription>Individual assets with weights and risk ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioAssets.map((asset) => (
                  <div key={asset.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{asset.propertyAddress}</h4>
                        <p className="text-sm text-muted-foreground">
                          {asset.propertyType} • {asset.location}
                        </p>
                      </div>
                      <Badge variant={getRiskBadgeVariant(asset.riskRating)}>
                        {asset.riskRating} Risk
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <Label className="text-xs">Asset Value</Label>
                        <p className="font-medium">${asset.assetValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Portfolio Weight</Label>
                        <p className="font-medium">{(asset.weight * 100).toFixed(1)}%</p>
                      </div>
                      <div>
                        <Label className="text-xs">LTV / LVM</Label>
                        <p className="font-medium">{asset.ltvRatio}% / {asset.lvmRatio}%</p>
                      </div>
                      <div>
                        <Label className="text-xs">Yield / ESG</Label>
                        <p className="font-medium">{asset.yieldRate}% / {asset.esgScore}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Risk Factor Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Credit Risk (LTV/LVM)</span>
                    <span className={`text-sm font-medium ${getRiskColor(Math.max(0, (riskMetrics.weightedAverageLTV - 70) * 2))}`}>
                      {Math.max(0, (riskMetrics.weightedAverageLTV - 70) * 2).toFixed(1)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ESG Risk</span>
                    <span className={`text-sm font-medium ${getRiskColor(Math.max(0, (80 - riskMetrics.weightedESGScore) * 1.2))}`}>
                      {Math.max(0, (80 - riskMetrics.weightedESGScore) * 1.2).toFixed(1)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Concentration Risk</span>
                    <span className={`text-sm font-medium ${getRiskColor(riskMetrics.concentrationRisk)}`}>
                      {riskMetrics.concentrationRisk.toFixed(1)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Yield Risk</span>
                    <span className={`text-sm font-medium ${getRiskColor(Math.max(0, (riskMetrics.portfolioYield - 4.0) * 10))}`}>
                      {Math.max(0, (riskMetrics.portfolioYield - 4.0) * 10).toFixed(1)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  LMI Impact Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total LMI Premium</span>
                    <span className="font-medium">${riskMetrics.totalLMIPremium.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">LMI % of Assets</span>
                    <span className="font-medium">
                      {((riskMetrics.totalLMIPremium / riskMetrics.totalAssetValue) * 100).toFixed(3)}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Assets Requiring LMI</span>
                    <span className="font-medium">
                      {portfolioAssets.filter(a => a.lmiRequired).length}/{portfolioAssets.length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average LMI Rate</span>
                    <span className="font-medium">
                      {((riskMetrics.totalLMIPremium / riskMetrics.totalDebtExposure) * 100).toFixed(3)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileBarChart className="h-4 w-4" />
                Risk Mitigation Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {riskMetrics.concentrationRisk > 50 && (
                  <div className="border-l-4 border-yellow-500 pl-4 py-2">
                    <h4 className="font-medium text-yellow-700">High Concentration Risk</h4>
                    <p className="text-sm text-muted-foreground">
                      Consider diversifying across more locations and property types to reduce concentration risk.
                    </p>
                  </div>
                )}
                
                {riskMetrics.weightedAverageLTV > 80 && (
                  <div className="border-l-4 border-red-500 pl-4 py-2">
                    <h4 className="font-medium text-red-700">High LTV Exposure</h4>
                    <p className="text-sm text-muted-foreground">
                      Weighted average LTV is above 80%. Consider reducing debt exposure or increasing equity buffers.
                    </p>
                  </div>
                )}
                
                {riskMetrics.weightedESGScore < 70 && (
                  <div className="border-l-4 border-orange-500 pl-4 py-2">
                    <h4 className="font-medium text-orange-700">ESG Improvement Opportunity</h4>
                    <p className="text-sm text-muted-foreground">
                      Portfolio ESG score is below target. Consider ESG improvements to reduce regulatory and market risks.
                    </p>
                  </div>
                )}
                
                {((riskMetrics.totalLMIPremium / riskMetrics.totalAssetValue) * 100) > 2 && (
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="font-medium text-blue-700">High LMI Costs</h4>
                    <p className="text-sm text-muted-foreground">
                      LMI costs exceed 2% of portfolio value. Consider strategies to reduce LTV ratios or negotiate better LMI rates.
                    </p>
                  </div>
                )}
                
                {riskMetrics.overallRiskScore < 30 && (
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <h4 className="font-medium text-green-700">Strong Risk Profile</h4>
                    <p className="text-sm text-muted-foreground">
                      Portfolio demonstrates strong risk management with well-balanced exposure across key metrics.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TotalPortfolioRiskAssessment;