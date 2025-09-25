import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Calculator, TrendingUp, DollarSign, Shield, Users, Globe, CreditCard, Leaf } from 'lucide-react';

interface ServiceabilityInputs {
  grossIncome: number;
  existingDebt: number;
  livingExpenses: number;
  interestRate: number;
  loanTerm: number;
  dependents: number;
  employmentType: string;
  propertyValue: number;
  depositAmount: number;
}

interface ComprehensiveESGFactors {
  environmental: {
    energyRating: number;
    waterEfficiency: number;
    sustainableFeatures: number;
    wasteManagement: number;
    renewableEnergy: number;
  };
  social: {
    communityImpact: number;
    accessibilityFeatures: number;
    healthSafety: number;
    socialInfrastructure: number;
    stakeholderEngagement: number;
  };
  governance: {
    transparencyReporting: number;
    complianceManagement: number;
    riskManagement: number;
    ethicsIntegrity: number;
    boardDiversity: number;
  };
  climateChange: {
    carbonFootprint: number;
    climateResilience: number;
    emissionReduction: number;
    adaptationMeasures: number;
    transitionRisk: number;
  };
}

interface CreditProfile {
  annualIncome: number;
  monthlyDebts: number;
  creditScore: number;
  employmentYears: number;
  assets: number;
  savings: number;
  propertyValue: number;
  downPayment: number;
}

const FinancialAssessmentTools: React.FC = () => {
  const [inputs, setInputs] = useState<ServiceabilityInputs>({
    grossIncome: 0,
    existingDebt: 0,
    livingExpenses: 0,
    interestRate: 5.5,
    loanTerm: 25,
    dependents: 0,
    employmentType: 'permanent',
    propertyValue: 0,
    depositAmount: 0
  });

  const [esgFactors, setEsgFactors] = useState<ComprehensiveESGFactors>({
    environmental: {
      energyRating: 0,
      waterEfficiency: 0,
      sustainableFeatures: 0,
      wasteManagement: 0,
      renewableEnergy: 0,
    },
    social: {
      communityImpact: 0,
      accessibilityFeatures: 0,
      healthSafety: 0,
      socialInfrastructure: 0,
      stakeholderEngagement: 0,
    },
    governance: {
      transparencyReporting: 0,
      complianceManagement: 0,
      riskManagement: 0,
      ethicsIntegrity: 0,
      boardDiversity: 0,
    },
    climateChange: {
      carbonFootprint: 0,
      climateResilience: 0,
      emissionReduction: 0,
      adaptationMeasures: 0,
      transitionRisk: 0,
    }
  });

  const [creditProfile, setCreditProfile] = useState<CreditProfile>({
    annualIncome: 0,
    monthlyDebts: 0,
    creditScore: 0,
    employmentYears: 0,
    assets: 0,
    savings: 0,
    propertyValue: 0,
    downPayment: 0,
  });

  // Calculate automated Four C's based on input data
  const calculateFourCs = () => {
    // Character: Based on credit score and employment stability
    const character = Math.min(10, 
      (creditProfile.creditScore >= 750 ? 8 : 
       creditProfile.creditScore >= 700 ? 6 : 
       creditProfile.creditScore >= 650 ? 4 : 2) +
      (creditProfile.employmentYears >= 3 ? 2 : 
       creditProfile.employmentYears >= 1 ? 1 : 0)
    );

    // Capacity: Debt-to-Income ratio
    const monthlyIncome = creditProfile.annualIncome / 12;
    const debtToIncomeRatio = monthlyIncome > 0 ? (creditProfile.monthlyDebts / monthlyIncome) * 100 : 0;
    const capacity = debtToIncomeRatio <= 28 ? 10 : 
                    debtToIncomeRatio <= 36 ? 8 : 
                    debtToIncomeRatio <= 43 ? 6 : 
                    debtToIncomeRatio <= 50 ? 4 : 2;

    // Capital: Net worth and savings
    const netWorth = creditProfile.assets + creditProfile.savings;
    const capital = netWorth >= 100000 ? 10 : 
                   netWorth >= 50000 ? 8 : 
                   netWorth >= 25000 ? 6 : 
                   netWorth >= 10000 ? 4 : 2;

    // Collateral: Loan-to-Value ratio
    const loanAmount = creditProfile.propertyValue - creditProfile.downPayment;
    const ltvRatio = creditProfile.propertyValue > 0 ? (loanAmount / creditProfile.propertyValue) * 100 : 0;
    const collateral = ltvRatio <= 70 ? 10 : 
                      ltvRatio <= 80 ? 8 : 
                      ltvRatio <= 90 ? 6 : 
                      ltvRatio <= 95 ? 4 : 2;

    return { character, capacity, capital, collateral };
  };

  // Calculate overall ESG score
  const calculateESGScore = () => {
    const envScore = Object.values(esgFactors.environmental).reduce((sum, val) => sum + val, 0) / 5;
    const socialScore = Object.values(esgFactors.social).reduce((sum, val) => sum + val, 0) / 5;
    const govScore = Object.values(esgFactors.governance).reduce((sum, val) => sum + val, 0) / 5;
    const climateScore = Object.values(esgFactors.climateChange).reduce((sum, val) => sum + val, 0) / 5;
    
    return {
      environmental: envScore,
      social: socialScore,
      governance: govScore,
      climate: climateScore,
      overall: (envScore + socialScore + govScore + climateScore) / 4
    };
  };

  const fourCs = calculateFourCs();
  const esgScores = calculateESGScore();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Professional Financial Assessment Tools
          </CardTitle>
          <CardDescription>
            Industry-standard serviceability, LVR analysis with ESG factors and Four C's of credit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="income-debt" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="income-debt">Income & Debt</TabsTrigger>
              <TabsTrigger value="esg">ESG Factors</TabsTrigger>
              <TabsTrigger value="credit">Four C's Credit</TabsTrigger>
              <TabsTrigger value="results">Assessment Results</TabsTrigger>
            </TabsList>

            <TabsContent value="income-debt" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Income & Debt Analysis</CardTitle>
                  <CardDescription>
                    Provide financial details for automated Four C's assessment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Annual Income ($)</Label>
                      <Input
                        type="number"
                        value={creditProfile.annualIncome}
                        onChange={(e) => setCreditProfile(prev => ({ ...prev, annualIncome: Number(e.target.value) }))}
                        placeholder="Enter annual income"
                      />
                    </div>
                    <div>
                      <Label>Monthly Debts ($)</Label>
                      <Input
                        type="number"
                        value={creditProfile.monthlyDebts}
                        onChange={(e) => setCreditProfile(prev => ({ ...prev, monthlyDebts: Number(e.target.value) }))}
                        placeholder="Total monthly debt payments"
                      />
                    </div>
                    <div>
                      <Label>Credit Score</Label>
                      <Input
                        type="number"
                        min="300"
                        max="850"
                        value={creditProfile.creditScore}
                        onChange={(e) => setCreditProfile(prev => ({ ...prev, creditScore: Number(e.target.value) }))}
                        placeholder="Enter credit score"
                      />
                    </div>
                    <div>
                      <Label>Years of Employment</Label>
                      <Input
                        type="number"
                        value={creditProfile.employmentYears}
                        onChange={(e) => setCreditProfile(prev => ({ ...prev, employmentYears: Number(e.target.value) }))}
                        placeholder="Years in current employment"
                      />
                    </div>
                    <div>
                      <Label>Total Assets ($)</Label>
                      <Input
                        type="number"
                        value={creditProfile.assets}
                        onChange={(e) => setCreditProfile(prev => ({ ...prev, assets: Number(e.target.value) }))}
                        placeholder="Total asset value"
                      />
                    </div>
                    <div>
                      <Label>Savings ($)</Label>
                      <Input
                        type="number"
                        value={creditProfile.savings}
                        onChange={(e) => setCreditProfile(prev => ({ ...prev, savings: Number(e.target.value) }))}
                        placeholder="Available savings"
                      />
                    </div>
                    <div>
                      <Label>Property Value ($)</Label>
                      <Input
                        type="number"
                        value={creditProfile.propertyValue}
                        onChange={(e) => setCreditProfile(prev => ({ ...prev, propertyValue: Number(e.target.value) }))}
                        placeholder="Property valuation"
                      />
                    </div>
                    <div>
                      <Label>Down Payment ($)</Label>
                      <Input
                        type="number"
                        value={creditProfile.downPayment}
                        onChange={(e) => setCreditProfile(prev => ({ ...prev, downPayment: Number(e.target.value) }))}
                        placeholder="Down payment amount"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="esg" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Environmental Factors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-4 w-4" />
                      Environmental Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(esgFactors.environmental).map(([key, value]) => (
                      <div key={key}>
                        <Label className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}: {value}/10
                        </Label>
                        <Slider
                          value={[value]}
                          onValueChange={(newValue) => setEsgFactors(prev => ({
                            ...prev,
                            environmental: { ...prev.environmental, [key]: newValue[0] }
                          }))}
                          max={10}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Social Factors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Social Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(esgFactors.social).map(([key, value]) => (
                      <div key={key}>
                        <Label className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}: {value}/10
                        </Label>
                        <Slider
                          value={[value]}
                          onValueChange={(newValue) => setEsgFactors(prev => ({
                            ...prev,
                            social: { ...prev.social, [key]: newValue[0] }
                          }))}
                          max={10}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Governance Factors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Governance Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(esgFactors.governance).map(([key, value]) => (
                      <div key={key}>
                        <Label className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}: {value}/10
                        </Label>
                        <Slider
                          value={[value]}
                          onValueChange={(newValue) => setEsgFactors(prev => ({
                            ...prev,
                            governance: { ...prev.governance, [key]: newValue[0] }
                          }))}
                          max={10}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Climate Change Factors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Climate Change Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(esgFactors.climateChange).map(([key, value]) => (
                      <div key={key}>
                        <Label className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}: {value}/10
                        </Label>
                        <Slider
                          value={[value]}
                          onValueChange={(newValue) => setEsgFactors(prev => ({
                            ...prev,
                            climateChange: { ...prev.climateChange, [key]: newValue[0] }
                          }))}
                          max={10}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="credit" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Four C's Assessment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Four C's of Credit Assessment
                    </CardTitle>
                    <CardDescription>
                      Professional credit risk evaluation framework
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Character (Credit History):</span>
                        <Badge variant="outline">{fourCs.character}/10</Badge>
                      </div>
                      <Progress value={fourCs.character * 10} className="h-2" />
                      <p className="text-sm text-muted-foreground">Payment history, credit behavior, reliability</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Capacity (Debt-to-Income):</span>
                        <Badge variant="outline">{fourCs.capacity}/10</Badge>
                      </div>
                      <Progress value={fourCs.capacity * 10} className="h-2" />
                      <p className="text-sm text-muted-foreground">Income stability, debt service capacity</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Capital (Net Worth):</span>
                        <Badge variant="outline">{fourCs.capital}/10</Badge>
                      </div>
                      <Progress value={fourCs.capital * 10} className="h-2" />
                      <p className="text-sm text-muted-foreground">Assets, savings, financial reserves</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Collateral (Security Value):</span>
                        <Badge variant="outline">{fourCs.collateral}/10</Badge>
                      </div>
                      <Progress value={fourCs.collateral * 10} className="h-2" />
                      <p className="text-sm text-muted-foreground">Property value, location, marketability</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Credit Profile Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Credit Profile Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Overall Credit Score</span>
                        <span className="font-medium">{((fourCs.character + fourCs.capacity + fourCs.capital + fourCs.collateral) / 4).toFixed(1)}/10</span>
                      </div>
                      <Progress value={((fourCs.character + fourCs.capacity + fourCs.capital + fourCs.collateral) / 4) * 10} className="h-2" />
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Strong credit profiles can reduce LVR requirements by up to 5% and secure better interest rates.
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Character</div>
                        <div className="font-medium">{fourCs.character}/10</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Capacity</div>
                        <div className="font-medium">{fourCs.capacity}/10</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Capital</div>
                        <div className="font-medium">{fourCs.capital}/10</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Collateral</div>
                        <div className="font-medium">{fourCs.collateral}/10</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ESG Impact Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      ESG Impact Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Environmental Score:</span>
                        <Badge variant="outline">{esgScores.environmental.toFixed(1)}/10</Badge>
                      </div>
                      <Progress value={esgScores.environmental * 10} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Social Score:</span>
                        <Badge variant="outline">{esgScores.social.toFixed(1)}/10</Badge>
                      </div>
                      <Progress value={esgScores.social * 10} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Governance Score:</span>
                        <Badge variant="outline">{esgScores.governance.toFixed(1)}/10</Badge>
                      </div>
                      <Progress value={esgScores.governance * 10} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Climate Score:</span>
                        <Badge variant="outline">{esgScores.climate.toFixed(1)}/10</Badge>
                      </div>
                      <Progress value={esgScores.climate * 10} className="h-2" />
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Overall ESG Score:</span>
                        <Badge variant="default">{esgScores.overall.toFixed(1)}/10</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Higher ESG scores can reduce LVR requirements by up to 2.5% and improve lending terms.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Credit Assessment Results */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit Assessment Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Character:</span>
                        <Badge variant="outline">{fourCs.character}/10</Badge>
                      </div>
                      <Progress value={fourCs.character * 10} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Capacity:</span>
                        <Badge variant="outline">{fourCs.capacity}/10</Badge>
                      </div>
                      <Progress value={fourCs.capacity * 10} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Capital:</span>
                        <Badge variant="outline">{fourCs.capital}/10</Badge>
                      </div>
                      <Progress value={fourCs.capital * 10} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Collateral:</span>
                        <Badge variant="outline">{fourCs.collateral}/10</Badge>
                      </div>
                      <Progress value={fourCs.collateral * 10} className="h-2" />
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Overall Credit Score:</span>
                        <Badge variant="default">
                          {((fourCs.character + fourCs.capacity + fourCs.capital + fourCs.collateral) / 4).toFixed(1)}/10
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <div className="text-sm text-muted-foreground">
                          DTI Ratio: {creditProfile.annualIncome > 0 ? ((creditProfile.monthlyDebts * 12 / creditProfile.annualIncome) * 100).toFixed(1) : 0}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          LTV Ratio: {creditProfile.propertyValue > 0 ? (((creditProfile.propertyValue - creditProfile.downPayment) / creditProfile.propertyValue) * 100).toFixed(1) : 0}%
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Minimum Value Calculation */}
              <Card>
                <CardHeader>
                  <CardTitle>Minimum Value to Secure Deal</CardTitle>
                  <CardDescription>
                    Based on LVR requirements, ESG factors, and Four C's assessment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Base LVR (80%)</div>
                        <div className="text-2xl font-bold">
                          ${creditProfile.propertyValue > 0 ? (creditProfile.propertyValue * 0.8).toLocaleString() : '0'}
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">ESG Adjusted</div>
                        <div className="text-2xl font-bold text-green-600">
                          ${creditProfile.propertyValue > 0 ? (creditProfile.propertyValue * (0.8 + (esgScores.overall * 0.025))).toLocaleString() : '0'}
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Four C's Adjusted</div>
                        <div className="text-2xl font-bold text-blue-600">
                          ${creditProfile.propertyValue > 0 ? (creditProfile.propertyValue * (0.8 + (((fourCs.character + fourCs.capacity + fourCs.capital + fourCs.collateral) / 4) * 0.05))).toLocaleString() : '0'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <div className="font-medium mb-2">Final Recommended Maximum Loan</div>
                      <div className="text-3xl font-bold text-primary">
                        ${creditProfile.propertyValue > 0 ? 
                          (creditProfile.propertyValue * Math.min(0.95, 0.8 + (esgScores.overall * 0.025) + (((fourCs.character + fourCs.capacity + fourCs.capital + fourCs.collateral) / 4) * 0.05))).toLocaleString() 
                          : '0'}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        This includes ESG and creditworthiness adjustments, capped at 95% LVR for security.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline">
                Reset Assessment
              </Button>
              <Button>
                Generate Report
              </Button>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialAssessmentTools;