import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Calculator, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  User,
  Building,
  CreditCard,
  Target,
  Zap,
  CheckCircle
} from 'lucide-react';

interface LMIInputs {
  loanAmount: number;
  propertyValue: number;
  creditScore: number;
  incomeMultiple: number;
  employmentYears: number;
  employmentType: 'permanent' | 'contract' | 'casual' | 'self-employed';
  dependents: number;
  existingDebts: number;
  savings: number;
  propertyType: 'owner-occupied' | 'investment';
  location: 'metro' | 'regional' | 'remote';
  firstHomeBuyer: boolean;
}

interface FourCs {
  character: {
    score: number;
    factors: {
      creditScore: number;
      creditHistory: number;
      employmentStability: number;
      personalStability: number;
    };
  };
  capacity: {
    score: number;
    factors: {
      incomeLevel: number;
      incomeStability: number;
      debtToIncomeRatio: number;
      serviceabilityRatio: number;
    };
  };
  capital: {
    score: number;
    factors: {
      downPayment: number;
      savings: number;
      netWorth: number;
      liquidAssets: number;
    };
  };
  collateral: {
    score: number;
    factors: {
      propertyValue: number;
      locationScore: number;
      propertyType: number;
      marketConditions: number;
    };
  };
}

interface RiskAdjustments {
  geographic: number;
  economic: number;
  regulatory: number;
  market: number;
  borrowerProfile: number;
  propertySpecific: number;
}

interface LMIResult {
  basePremium: number;
  adjustedPremium: number;
  riskMultiplier: number;
  fourCsScore: number;
  serviceabilityScore: number;
  recommendedLVR: number;
  totalPremiumCost: number;
  monthlyComponent: number;
  riskRating: 'Low' | 'Medium' | 'High' | 'Very High';
  recommendations: string[];
}

const WeightedLMICalculator: React.FC = () => {
  const { toast } = useToast();
  
  const [inputs, setInputs] = useState<LMIInputs>({
    loanAmount: 0,
    propertyValue: 0,
    creditScore: 0,
    incomeMultiple: 0,
    employmentYears: 0,
    employmentType: 'permanent',
    dependents: 0,
    existingDebts: 0,
    savings: 0,
    propertyType: 'owner-occupied',
    location: 'metro',
    firstHomeBuyer: false
  });

  const [fourCs, setFourCs] = useState<FourCs>({
    character: {
      score: 0,
      factors: {
        creditScore: 0,
        creditHistory: 0,
        employmentStability: 0,
        personalStability: 0
      }
    },
    capacity: {
      score: 0,
      factors: {
        incomeLevel: 0,
        incomeStability: 0,
        debtToIncomeRatio: 0,
        serviceabilityRatio: 0
      }
    },
    capital: {
      score: 0,
      factors: {
        downPayment: 0,
        savings: 0,
        netWorth: 0,
        liquidAssets: 0
      }
    },
    collateral: {
      score: 0,
      factors: {
        propertyValue: 0,
        locationScore: 0,
        propertyType: 0,
        marketConditions: 0
      }
    }
  });

  const [riskAdjustments, setRiskAdjustments] = useState<RiskAdjustments>({
    geographic: 1.0,
    economic: 1.0,
    regulatory: 1.0,
    market: 1.0,
    borrowerProfile: 1.0,
    propertySpecific: 1.0
  });

  // Calculate LVR
  const calculateLVR = (): number => {
    if (inputs.propertyValue === 0) return 0;
    return (inputs.loanAmount / inputs.propertyValue) * 100;
  };

  // Calculate Four C's scores automatically
  useEffect(() => {
    const newFourCs = { ...fourCs };

    // Character - Based on credit and stability
    newFourCs.character.factors.creditScore = inputs.creditScore >= 750 ? 10 : 
                                              inputs.creditScore >= 700 ? 8 : 
                                              inputs.creditScore >= 650 ? 6 : 
                                              inputs.creditScore >= 600 ? 4 : 2;
    
    newFourCs.character.factors.employmentStability = inputs.employmentYears >= 3 ? 10 : 
                                                      inputs.employmentYears >= 2 ? 8 : 
                                                      inputs.employmentYears >= 1 ? 6 : 4;
    
    newFourCs.character.factors.creditHistory = inputs.creditScore >= 700 ? 9 : 
                                               inputs.creditScore >= 650 ? 7 : 
                                               inputs.creditScore >= 600 ? 5 : 3;
    
    newFourCs.character.factors.personalStability = inputs.dependents <= 2 ? 8 : 
                                                   inputs.dependents <= 4 ? 6 : 4;
    
    newFourCs.character.score = (
      newFourCs.character.factors.creditScore +
      newFourCs.character.factors.creditHistory +
      newFourCs.character.factors.employmentStability +
      newFourCs.character.factors.personalStability
    ) / 4;

    // Capacity - Based on income and debt ratios
    const monthlyIncome = (inputs.loanAmount / inputs.incomeMultiple) / 12;
    const monthlyDebts = inputs.existingDebts / 12;
    const debtToIncomeRatio = monthlyIncome > 0 ? (monthlyDebts / monthlyIncome) * 100 : 0;
    
    newFourCs.capacity.factors.incomeLevel = inputs.incomeMultiple <= 5 ? 10 : 
                                           inputs.incomeMultiple <= 6 ? 8 : 
                                           inputs.incomeMultiple <= 7 ? 6 : 4;
    
    newFourCs.capacity.factors.debtToIncomeRatio = debtToIncomeRatio <= 30 ? 10 : 
                                                  debtToIncomeRatio <= 40 ? 8 : 
                                                  debtToIncomeRatio <= 50 ? 6 : 4;
    
    newFourCs.capacity.factors.incomeStability = inputs.employmentType === 'permanent' ? 10 : 
                                               inputs.employmentType === 'contract' ? 7 : 
                                               inputs.employmentType === 'casual' ? 5 : 3;
    
    newFourCs.capacity.factors.serviceabilityRatio = calculateServiceability();
    
    newFourCs.capacity.score = (
      newFourCs.capacity.factors.incomeLevel +
      newFourCs.capacity.factors.incomeStability +
      newFourCs.capacity.factors.debtToIncomeRatio +
      newFourCs.capacity.factors.serviceabilityRatio
    ) / 4;

    // Capital - Based on down payment and savings
    const downPaymentPercent = inputs.propertyValue > 0 ? ((inputs.propertyValue - inputs.loanAmount) / inputs.propertyValue) * 100 : 0;
    
    newFourCs.capital.factors.downPayment = downPaymentPercent >= 20 ? 10 : 
                                          downPaymentPercent >= 15 ? 8 : 
                                          downPaymentPercent >= 10 ? 6 : 
                                          downPaymentPercent >= 5 ? 4 : 2;
    
    newFourCs.capital.factors.savings = inputs.savings >= 50000 ? 10 : 
                                       inputs.savings >= 25000 ? 8 : 
                                       inputs.savings >= 10000 ? 6 : 4;
    
    newFourCs.capital.factors.netWorth = inputs.savings >= 100000 ? 10 : 
                                        inputs.savings >= 50000 ? 8 : 6;
    
    newFourCs.capital.factors.liquidAssets = inputs.savings >= 20000 ? 9 : 
                                           inputs.savings >= 10000 ? 7 : 5;
    
    newFourCs.capital.score = (
      newFourCs.capital.factors.downPayment +
      newFourCs.capital.factors.savings +
      newFourCs.capital.factors.netWorth +
      newFourCs.capital.factors.liquidAssets
    ) / 4;

    // Collateral - Based on property value and location
    newFourCs.collateral.factors.propertyValue = inputs.propertyValue >= 800000 ? 10 : 
                                                inputs.propertyValue >= 600000 ? 8 : 
                                                inputs.propertyValue >= 400000 ? 6 : 4;
    
    newFourCs.collateral.factors.locationScore = inputs.location === 'metro' ? 9 : 
                                               inputs.location === 'regional' ? 7 : 5;
    
    newFourCs.collateral.factors.propertyType = inputs.propertyType === 'owner-occupied' ? 8 : 6;
    
    newFourCs.collateral.factors.marketConditions = 7; // Neutral market conditions
    
    newFourCs.collateral.score = (
      newFourCs.collateral.factors.propertyValue +
      newFourCs.collateral.factors.locationScore +
      newFourCs.collateral.factors.propertyType +
      newFourCs.collateral.factors.marketConditions
    ) / 4;

    setFourCs(newFourCs);
  }, [inputs]);

  // Calculate serviceability score
  const calculateServiceability = (): number => {
    if (inputs.incomeMultiple === 0) return 0;
    
    const serviceabilityScore = inputs.incomeMultiple <= 5 ? 10 : 
                               inputs.incomeMultiple <= 6 ? 8 : 
                               inputs.incomeMultiple <= 7 ? 6 : 
                               inputs.incomeMultiple <= 8 ? 4 : 2;
    
    return serviceabilityScore;
  };

  // Calculate risk adjustments based on various factors
  useEffect(() => {
    const newRiskAdjustments = { ...riskAdjustments };

    // Geographic risk
    newRiskAdjustments.geographic = inputs.location === 'metro' ? 1.0 : 
                                   inputs.location === 'regional' ? 1.15 : 1.3;

    // Economic risk (based on employment type)
    newRiskAdjustments.economic = inputs.employmentType === 'permanent' ? 1.0 : 
                                 inputs.employmentType === 'contract' ? 1.1 : 
                                 inputs.employmentType === 'casual' ? 1.25 : 1.4;

    // Borrower profile risk
    const lvrRatio = calculateLVR();
    newRiskAdjustments.borrowerProfile = lvrRatio <= 80 ? 1.0 : 
                                        lvrRatio <= 85 ? 1.1 : 
                                        lvrRatio <= 90 ? 1.25 : 
                                        lvrRatio <= 95 ? 1.5 : 1.8;

    // Property specific risk
    newRiskAdjustments.propertySpecific = inputs.propertyType === 'owner-occupied' ? 1.0 : 1.2;

    setRiskAdjustments(newRiskAdjustments);
  }, [inputs]);

  // Calculate final LMI result
  const calculateLMI = (): LMIResult => {
    const lvrRatio = calculateLVR();
    
    // Base LMI premium rates (simplified)
    let basePremiumRate = 0;
    if (lvrRatio <= 80) basePremiumRate = 0;
    else if (lvrRatio <= 85) basePremiumRate = 0.4;
    else if (lvrRatio <= 90) basePremiumRate = 1.0;
    else if (lvrRatio <= 95) basePremiumRate = 2.0;
    else basePremiumRate = 3.5;

    const basePremium = inputs.loanAmount * (basePremiumRate / 100);

    // Calculate overall risk multiplier
    const riskMultiplier = Object.values(riskAdjustments).reduce((acc, val) => acc * val, 1);

    // Calculate Four C's overall score
    const fourCsScore = (fourCs.character.score + fourCs.capacity.score + fourCs.capital.score + fourCs.collateral.score) / 4;

    // Apply Four C's adjustment to risk multiplier
    const fourCsAdjustment = fourCsScore >= 8 ? 0.9 : fourCsScore >= 6 ? 1.0 : fourCsScore >= 4 ? 1.15 : 1.3;
    
    const finalRiskMultiplier = riskMultiplier * fourCsAdjustment;
    const adjustedPremium = basePremium * finalRiskMultiplier;

    // Serviceability score
    const serviceabilityScore = calculateServiceability();

    // Risk rating
    let riskRating: 'Low' | 'Medium' | 'High' | 'Very High' = 'Medium';
    if (fourCsScore >= 8 && finalRiskMultiplier <= 1.1) riskRating = 'Low';
    else if (fourCsScore >= 6 && finalRiskMultiplier <= 1.3) riskRating = 'Medium';
    else if (fourCsScore >= 4 && finalRiskMultiplier <= 1.6) riskRating = 'High';
    else riskRating = 'Very High';

    // Recommendations
    const recommendations: string[] = [];
    if (fourCs.character.score < 6) recommendations.push("Improve credit score and payment history");
    if (fourCs.capacity.score < 6) recommendations.push("Reduce debt-to-income ratio or increase income");
    if (fourCs.capital.score < 6) recommendations.push("Increase down payment or build more savings");
    if (fourCs.collateral.score < 6) recommendations.push("Consider property in better location or different type");
    if (lvrRatio > 90) recommendations.push("Consider larger down payment to reduce LVR below 90%");

    return {
      basePremium,
      adjustedPremium,
      riskMultiplier: finalRiskMultiplier,
      fourCsScore,
      serviceabilityScore,
      recommendedLVR: Math.min(lvrRatio, 95),
      totalPremiumCost: adjustedPremium,
      monthlyComponent: adjustedPremium / 240, // Assuming 20-year loan term
      riskRating,
      recommendations
    };
  };

  const lmiResult = calculateLMI();
  const currentLVR = calculateLVR();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Weighted LMI Calculator™
            <Badge variant="outline" className="ml-2">Professional Grade</Badge>
          </CardTitle>
          <CardDescription>
            Comprehensive Lenders Mortgage Insurance calculation incorporating Four C's credit assessment, 
            serviceability analysis, and advanced risk adjustments
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Input Parameters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Loan Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Property Value ($)</Label>
                <Input
                  type="number"
                  value={inputs.propertyValue}
                  onChange={(e) => setInputs(prev => ({ ...prev, propertyValue: Number(e.target.value) }))}
                  placeholder="800,000"
                />
              </div>
              <div>
                <Label>Loan Amount ($)</Label>
                <Input
                  type="number"
                  value={inputs.loanAmount}
                  onChange={(e) => setInputs(prev => ({ ...prev, loanAmount: Number(e.target.value) }))}
                  placeholder="640,000"
                />
              </div>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Current LVR:</span>
                <span className="text-lg font-bold text-primary">{currentLVR.toFixed(1)}%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Property Type</Label>
                <Select value={inputs.propertyType} onValueChange={(value: any) => setInputs(prev => ({ ...prev, propertyType: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner-occupied">Owner Occupied</SelectItem>
                    <SelectItem value="investment">Investment Property</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Location</Label>
                <Select value={inputs.location} onValueChange={(value: any) => setInputs(prev => ({ ...prev, location: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metro">Metropolitan</SelectItem>
                    <SelectItem value="regional">Regional</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Borrower Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Credit Score</Label>
                <Input
                  type="number"
                  min="300"
                  max="900"
                  value={inputs.creditScore}
                  onChange={(e) => setInputs(prev => ({ ...prev, creditScore: Number(e.target.value) }))}
                  placeholder="750"
                />
              </div>
              <div>
                <Label>Income Multiple</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={inputs.incomeMultiple}
                  onChange={(e) => setInputs(prev => ({ ...prev, incomeMultiple: Number(e.target.value) }))}
                  placeholder="5.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Employment Years</Label>
                <Input
                  type="number"
                  value={inputs.employmentYears}
                  onChange={(e) => setInputs(prev => ({ ...prev, employmentYears: Number(e.target.value) }))}
                  placeholder="3"
                />
              </div>
              <div>
                <Label>Employment Type</Label>
                <Select value={inputs.employmentType} onValueChange={(value: any) => setInputs(prev => ({ ...prev, employmentType: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="permanent">Permanent</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="self-employed">Self-Employed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Dependents</Label>
                <Input
                  type="number"
                  min="0"
                  value={inputs.dependents}
                  onChange={(e) => setInputs(prev => ({ ...prev, dependents: Number(e.target.value) }))}
                  placeholder="2"
                />
              </div>
              <div>
                <Label>Savings ($)</Label>
                <Input
                  type="number"
                  value={inputs.savings}
                  onChange={(e) => setInputs(prev => ({ ...prev, savings: Number(e.target.value) }))}
                  placeholder="50,000"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Four C's Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Four C's Credit Assessment™
          </CardTitle>
          <CardDescription>
            Automated analysis of Character, Capacity, Capital, and Collateral
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Character */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Character
                </h4>
                <Badge variant={fourCs.character.score >= 7 ? "default" : fourCs.character.score >= 5 ? "secondary" : "destructive"}>
                  {fourCs.character.score.toFixed(1)}/10
                </Badge>
              </div>
              <Progress value={fourCs.character.score * 10} className="h-2" />
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Credit Score:</span>
                  <span>{fourCs.character.factors.creditScore}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Employment:</span>
                  <span>{fourCs.character.factors.employmentStability}/10</span>
                </div>
              </div>
            </div>

            {/* Capacity */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Capacity
                </h4>
                <Badge variant={fourCs.capacity.score >= 7 ? "default" : fourCs.capacity.score >= 5 ? "secondary" : "destructive"}>
                  {fourCs.capacity.score.toFixed(1)}/10
                </Badge>
              </div>
              <Progress value={fourCs.capacity.score * 10} className="h-2" />
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Income Level:</span>
                  <span>{fourCs.capacity.factors.incomeLevel}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Debt Ratio:</span>
                  <span>{fourCs.capacity.factors.debtToIncomeRatio}/10</span>
                </div>
              </div>
            </div>

            {/* Capital */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Capital
                </h4>
                <Badge variant={fourCs.capital.score >= 7 ? "default" : fourCs.capital.score >= 5 ? "secondary" : "destructive"}>
                  {fourCs.capital.score.toFixed(1)}/10
                </Badge>
              </div>
              <Progress value={fourCs.capital.score * 10} className="h-2" />
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Down Payment:</span>
                  <span>{fourCs.capital.factors.downPayment}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Savings:</span>
                  <span>{fourCs.capital.factors.savings}/10</span>
                </div>
              </div>
            </div>

            {/* Collateral */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Collateral
                </h4>
                <Badge variant={fourCs.collateral.score >= 7 ? "default" : fourCs.collateral.score >= 5 ? "secondary" : "destructive"}>
                  {fourCs.collateral.score.toFixed(1)}/10
                </Badge>
              </div>
              <Progress value={fourCs.collateral.score * 10} className="h-2" />
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Property Value:</span>
                  <span>{fourCs.collateral.factors.propertyValue}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span>{fourCs.collateral.factors.locationScore}/10</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* LMI Results */}
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Weighted LMI Assessment Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Total LMI Premium</Label>
              <div className="text-2xl font-bold text-primary">
                ${lmiResult.totalPremiumCost.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                Monthly: ${lmiResult.monthlyComponent.toLocaleString()}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Risk Rating</Label>
              <Badge 
                variant={lmiResult.riskRating === 'Low' ? "default" : 
                        lmiResult.riskRating === 'Medium' ? "secondary" : 
                        lmiResult.riskRating === 'High' ? "secondary" : "destructive"}
                className="text-lg px-3 py-1"
              >
                {lmiResult.riskRating}
              </Badge>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Four C's Score</Label>
              <div className="text-2xl font-bold">
                {lmiResult.fourCsScore.toFixed(1)}/10
              </div>
              <Progress value={lmiResult.fourCsScore * 10} className="h-2" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Risk Multiplier</Label>
              <div className="text-2xl font-bold">
                {lmiResult.riskMultiplier.toFixed(2)}x
              </div>
              <div className="text-xs text-muted-foreground">
                Base: ${lmiResult.basePremium.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {lmiResult.recommendations.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-blue-600" />
                Recommendations for Improvement
              </h4>
              <ul className="space-y-1 text-sm">
                {lmiResult.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WeightedLMICalculator;