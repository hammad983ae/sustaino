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
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="income-debt">Income & Debt</TabsTrigger>
              <TabsTrigger value="esg">ESG Factors</TabsTrigger>
              <TabsTrigger value="credit">Four C's Credit</TabsTrigger>
              <TabsTrigger value="valuation">Acquisition Valuation</TabsTrigger>
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

            <TabsContent value="valuation" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Acquisition Valuation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Acquisition Valuation Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Conservative Valuation (P/E: 8-10)</div>
                        <div className="text-2xl font-bold">
                          ${creditProfile.propertyValue > 0 ? (creditProfile.propertyValue * 0.85).toLocaleString() : '0'}
                        </div>
                        <div className="text-sm text-green-600">85% of market value</div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Market Valuation (P/E: 12-15)</div>
                        <div className="text-2xl font-bold">
                          ${creditProfile.propertyValue > 0 ? creditProfile.propertyValue.toLocaleString() : '0'}
                        </div>
                        <div className="text-sm text-blue-600">100% of market value</div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Optimistic Valuation (P/E: 18-20)</div>
                        <div className="text-2xl font-bold">
                          ${creditProfile.propertyValue > 0 ? (creditProfile.propertyValue * 1.15).toLocaleString() : '0'}
                        </div>
                        <div className="text-sm text-orange-600">115% of market value</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3">Valuation Factors</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>ESG Premium:</span>
                          <span className="text-green-600">+{(esgScores.overall * 2.5).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Credit Quality Adjustment:</span>
                          <span className="text-blue-600">+{(((fourCs.character + fourCs.capacity + fourCs.capital + fourCs.collateral) / 4) * 1.5).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Market Conditions:</span>
                          <span className="text-yellow-600">Neutral (0%)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sensitivity Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Deal Success Sensitivity Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { scenario: 'Best Case', probability: 85, lvr: 70, conditions: 'Strong credit, high ESG, favorable market' },
                      { scenario: 'Base Case', probability: 70, lvr: 80, conditions: 'Good credit, average ESG, stable market' },
                      { scenario: 'Stress Case', probability: 45, lvr: 85, conditions: 'Average credit, low ESG, tight market' },
                      { scenario: 'Worst Case', probability: 25, lvr: 90, conditions: 'Poor credit, no ESG, declining market' }
                    ].map((scenario) => (
                      <div key={scenario.scenario} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{scenario.scenario}</span>
                          <Badge variant={
                            scenario.probability >= 70 ? 'default' : 
                            scenario.probability >= 50 ? 'secondary' : 'destructive'
                          }>
                            {scenario.probability}% Success
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          LVR: {scenario.lvr}% | Max Loan: ${creditProfile.propertyValue > 0 ? 
                            (creditProfile.propertyValue * (scenario.lvr / 100)).toLocaleString() : '0'}
                        </div>
                        <div className="text-xs text-muted-foreground">{scenario.conditions}</div>
                        <Progress value={scenario.probability} className="h-2 mt-2" />
                      </div>
                    ))}

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Key Risk Factors</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Interest Rate Risk:</span>
                          <span className={
                            creditProfile.annualIncome > 0 && (creditProfile.monthlyDebts * 12 / creditProfile.annualIncome) < 0.3 
                              ? 'text-green-600' : 'text-red-600'
                          }>
                            {creditProfile.annualIncome > 0 && (creditProfile.monthlyDebts * 12 / creditProfile.annualIncome) < 0.3 ? 'Low' : 'High'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Market Risk:</span>
                          <span className="text-yellow-600">Medium</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Liquidity Risk:</span>
                          <span className={creditProfile.savings > 50000 ? 'text-green-600' : 'text-red-600'}>
                            {creditProfile.savings > 50000 ? 'Low' : 'High'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Finance Probability Matrix */}
              <Card>
                <CardHeader>
                  <CardTitle>Finance Approval Probability Matrix</CardTitle>
                  <CardDescription>
                    Shows likelihood of finance approval under different LVR and credit score scenarios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Credit Score</th>
                          <th className="text-center p-2">70% LVR</th>
                          <th className="text-center p-2">75% LVR</th>
                          <th className="text-center p-2">80% LVR</th>
                          <th className="text-center p-2">85% LVR</th>
                          <th className="text-center p-2">90% LVR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { range: '800+', scores: [95, 92, 88, 75, 45] },
                          { range: '750-799', scores: [90, 85, 80, 65, 35] },
                          { range: '700-749', scores: [85, 78, 70, 50, 25] },
                          { range: '650-699', scores: [75, 65, 55, 35, 15] },
                          { range: '600-649', scores: [60, 45, 35, 20, 8] },
                          { range: '<600', scores: [35, 25, 15, 8, 3] }
                        ].map((row) => (
                          <tr key={row.range} className="border-b">
                            <td className="p-2 font-medium">{row.range}</td>
                            {row.scores.map((score, index) => (
                              <td key={index} className="text-center p-2">
                                <span className={`px-2 py-1 rounded text-xs ${
                                  score >= 80 ? 'bg-green-100 text-green-800' :
                                  score >= 60 ? 'bg-blue-100 text-blue-800' :
                                  score >= 40 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {score}%
                                </span>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Your Current Position</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Your Credit Score</div>
                        <div className="text-lg font-bold">{creditProfile.creditScore || 'Not Set'}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Current LVR</div>
                        <div className="text-lg font-bold">
                          {creditProfile.propertyValue > 0 ? 
                            (((creditProfile.propertyValue - creditProfile.downPayment) / creditProfile.propertyValue) * 100).toFixed(1) + '%' 
                            : 'Not Set'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Approval Probability</div>
                        <div className="text-lg font-bold text-primary">
                          {(() => {
                            const currentLVR = creditProfile.propertyValue > 0 ? 
                              ((creditProfile.propertyValue - creditProfile.downPayment) / creditProfile.propertyValue) * 100 : 0;
                            const creditScore = creditProfile.creditScore;
                            
                            let probability = 50; // Default
                            
                            if (creditScore >= 800) {
                              if (currentLVR <= 70) probability = 95;
                              else if (currentLVR <= 80) probability = 88;
                              else if (currentLVR <= 90) probability = 45;
                            } else if (creditScore >= 700) {
                              if (currentLVR <= 70) probability = 85;
                              else if (currentLVR <= 80) probability = 70;
                              else if (currentLVR <= 90) probability = 25;
                            } else if (creditScore >= 650) {
                              if (currentLVR <= 70) probability = 75;
                              else if (currentLVR <= 80) probability = 55;
                              else probability = 15;
                            }
                            
                            return probability + '%';
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                  <CardTitle>Comprehensive Deal Analysis</CardTitle>
                  <CardDescription>
                    Acquisition valuation, minimum values, and sensitivity analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Acquisition Valuations */}
                    <div>
                      <h4 className="font-medium mb-3">Acquisition Valuation Scenarios</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Conservative (85%)</div>
                          <div className="text-xl font-bold text-green-600">
                            ${creditProfile.propertyValue > 0 ? (creditProfile.propertyValue * 0.85).toLocaleString() : '0'}
                          </div>
                          <div className="text-xs text-muted-foreground">Low risk acquisition</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Market Value (100%)</div>
                          <div className="text-xl font-bold text-blue-600">
                            ${creditProfile.propertyValue > 0 ? creditProfile.propertyValue.toLocaleString() : '0'}
                          </div>
                          <div className="text-xs text-muted-foreground">Fair market price</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Premium (115%)</div>
                          <div className="text-xl font-bold text-orange-600">
                            ${creditProfile.propertyValue > 0 ? (creditProfile.propertyValue * 1.15).toLocaleString() : '0'}
                          </div>
                          <div className="text-xs text-muted-foreground">Competitive bidding</div>
                        </div>
                      </div>
                    </div>

                    {/* Finance Scenarios */}
                    <div>
                      <h4 className="font-medium mb-3">Finance Scenarios & Deal Success Probability</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { 
                            name: 'Optimal Deal Structure', 
                            lvr: 75, 
                            probability: 88, 
                            maxLoan: creditProfile.propertyValue * 0.75,
                            description: 'Conservative LVR with strong approval odds'
                          },
                          { 
                            name: 'Balanced Approach', 
                            lvr: 80, 
                            probability: 75, 
                            maxLoan: creditProfile.propertyValue * 0.80,
                            description: 'Standard LVR with good approval chances'
                          },
                          { 
                            name: 'Aggressive Financing', 
                            lvr: 85, 
                            probability: 55, 
                            maxLoan: creditProfile.propertyValue * 0.85,
                            description: 'Higher risk but maximum leverage'
                          },
                          { 
                            name: 'Maximum LVR', 
                            lvr: 90, 
                            probability: 35, 
                            maxLoan: creditProfile.propertyValue * 0.90,
                            description: 'Highest leverage, significant risk'
                          }
                        ].map((scenario) => (
                          <div key={scenario.name} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="font-medium">{scenario.name}</div>
                                <div className="text-sm text-muted-foreground">{scenario.description}</div>
                              </div>
                              <Badge variant={
                                scenario.probability >= 75 ? 'default' : 
                                scenario.probability >= 50 ? 'secondary' : 'destructive'
                              }>
                                {scenario.probability}%
                              </Badge>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>LVR:</span>
                                <span className="font-medium">{scenario.lvr}%</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Max Loan:</span>
                                <span className="font-medium">${scenario.maxLoan.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Required Deposit:</span>
                                <span className="font-medium">${(creditProfile.propertyValue - scenario.maxLoan).toLocaleString()}</span>
                              </div>
                            </div>
                            <Progress value={scenario.probability} className="h-2 mt-3" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Final Recommendation */}
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <div className="font-medium mb-2">Recommended Deal Structure</div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Target Acquisition Price</div>
                          <div className="text-xl font-bold text-primary">
                            ${creditProfile.propertyValue > 0 ? (creditProfile.propertyValue * 0.95).toLocaleString() : '0'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Recommended LVR</div>
                          <div className="text-xl font-bold text-primary">
                            {Math.min(80, 75 + (esgScores.overall * 0.5) + (((fourCs.character + fourCs.capacity + fourCs.capital + fourCs.collateral) / 4) * 0.5)).toFixed(0)}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Maximum Loan</div>
                          <div className="text-xl font-bold text-primary">
                            ${creditProfile.propertyValue > 0 ? 
                              (creditProfile.propertyValue * 0.95 * (Math.min(80, 75 + (esgScores.overall * 0.5) + (((fourCs.character + fourCs.capacity + fourCs.capital + fourCs.collateral) / 4) * 0.5)) / 100)).toLocaleString() 
                              : '0'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Success Probability</div>
                          <div className="text-xl font-bold text-green-600">
                            {Math.min(95, 70 + (esgScores.overall * 2) + (((fourCs.character + fourCs.capacity + fourCs.capital + fourCs.collateral) / 4) * 2)).toFixed(0)}%
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        This structure balances risk and leverage, incorporating ESG benefits and creditworthiness adjustments for optimal approval probability.
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