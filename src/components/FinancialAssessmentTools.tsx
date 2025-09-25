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
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  Target,
  Shield,
  Leaf,
  User,
  CreditCard,
  Building,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Minus
} from 'lucide-react';

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

interface ESGFactors {
  energyRating: number; // 1-10
  waterEfficiency: number; // 1-10
  sustainableFeatures: number; // 1-10
  environmentalImpact: number; // 1-10
}

interface CreditFactors {
  character: number; // 1-10 (credit history, payment behavior)
  capacity: number; // 1-10 (income vs debt)
  capital: number; // 1-10 (assets and net worth)
  collateral: number; // 1-10 (property value and security)
}

interface AssessmentResults {
  serviceability: {
    optimistic: number;
    realistic: number;
    pessimistic: number;
    recommendedLoan: number;
  };
  lvr: {
    standardLVR: number;
    esgAdjustedLVR: number;
    creditAdjustedLVR: number;
    finalLVR: number;
  };
  minimumValue: {
    dealValue: number;
    financeValue: number;
    securityMargin: number;
  };
  riskAssessment: {
    overall: string;
    factors: string[];
    recommendations: string[];
  };
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

  const [esgFactors, setEsgFactors] = useState<ESGFactors>({
    energyRating: 5,
    waterEfficiency: 5,
    sustainableFeatures: 5,
    environmentalImpact: 5
  });

  const [creditFactors, setCreditFactors] = useState<CreditFactors>({
    character: 7,
    capacity: 7,
    capital: 7,
    collateral: 7
  });

  const [results, setResults] = useState<AssessmentResults | null>(null);

  const calculateServiceability = () => {
    const { grossIncome, existingDebt, livingExpenses, interestRate, loanTerm, dependents, employmentType } = inputs;
    
    // Net income after tax (simplified calculation)
    const taxRate = grossIncome > 180000 ? 0.45 : grossIncome > 120000 ? 0.37 : grossIncome > 45000 ? 0.325 : 0.19;
    const netIncome = grossIncome * (1 - taxRate);
    
    // Employment stability factor
    const employmentFactor = employmentType === 'permanent' ? 1.0 : 
                            employmentType === 'contract' ? 0.9 : 0.8;
    
    // Adjusted income for dependents
    const dependentsCost = dependents * 2500; // Annual cost per dependent
    
    // Available income for debt service
    const availableIncome = (netIncome - livingExpenses - dependentsCost - existingDebt) * employmentFactor;
    
    // Monthly payment capacity
    const monthlyCapacity = availableIncome / 12;
    
    // Serviceability scenarios
    const baseRate = interestRate / 100;
    const optimisticRate = Math.max(baseRate - 0.01, 0.025); // -1% with floor
    const pessimisticRate = baseRate + 0.03; // +3% stress test
    
    const calculateLoanAmount = (rate: number, capacity: number) => {
      const monthlyRate = rate / 12;
      const numPayments = loanTerm * 12;
      if (monthlyRate === 0) return capacity * numPayments;
      return (capacity * (1 - Math.pow(1 + monthlyRate, -numPayments))) / monthlyRate;
    };
    
    const optimisticLoan = calculateLoanAmount(optimisticRate, monthlyCapacity * 0.9);
    const realisticLoan = calculateLoanAmount(baseRate, monthlyCapacity * 0.8);
    const pessimisticLoan = calculateLoanAmount(pessimisticRate, monthlyCapacity * 0.7);
    
    return {
      optimistic: Math.max(0, optimisticLoan),
      realistic: Math.max(0, realisticLoan),
      pessimistic: Math.max(0, pessimisticLoan),
      recommendedLoan: Math.max(0, realisticLoan * 0.9) // 90% of realistic for safety
    };
  };

  const calculateLVR = () => {
    const { propertyValue, depositAmount } = inputs;
    const loanAmount = propertyValue - depositAmount;
    
    // Standard LVR
    const standardLVR = (loanAmount / propertyValue) * 100;
    
    // ESG adjustment (better ESG = lower LVR requirement)
    const esgScore = (esgFactors.energyRating + esgFactors.waterEfficiency + 
                     esgFactors.sustainableFeatures + esgFactors.environmentalImpact) / 4;
    const esgAdjustment = (esgScore - 5) * 0.5; // ±2.5% adjustment
    
    // Credit (Four C's) adjustment
    const creditScore = (creditFactors.character + creditFactors.capacity + 
                        creditFactors.capital + creditFactors.collateral) / 4;
    const creditAdjustment = (creditScore - 5) * 1.0; // ±5% adjustment
    
    const esgAdjustedLVR = Math.max(0, standardLVR - esgAdjustment);
    const creditAdjustedLVR = Math.max(0, standardLVR - creditAdjustment);
    const finalLVR = Math.max(0, standardLVR - esgAdjustment - creditAdjustment);
    
    return {
      standardLVR,
      esgAdjustedLVR,
      creditAdjustedLVR,
      finalLVR
    };
  };

  const calculateMinimumValues = () => {
    const serviceability = calculateServiceability();
    const { propertyValue } = inputs;
    
    // Minimum value to secure deal (based on serviceability)
    const dealValue = Math.min(serviceability.realistic + inputs.depositAmount, propertyValue);
    
    // Minimum value for finance approval
    const financeValue = serviceability.recommendedLoan + inputs.depositAmount;
    
    // Security margin (typically 10-20%)
    const securityMargin = financeValue * 0.15;
    
    return {
      dealValue,
      financeValue: financeValue + securityMargin,
      securityMargin
    };
  };

  const performRiskAssessment = () => {
    const serviceability = calculateServiceability();
    const lvr = calculateLVR();
    const factors: string[] = [];
    const recommendations: string[] = [];
    
    // Risk factors analysis
    if (lvr.finalLVR > 80) factors.push('High LVR');
    if (serviceability.realistic < inputs.propertyValue * 0.6) factors.push('Limited serviceability');
    if (inputs.existingDebt > inputs.grossIncome * 0.3) factors.push('High existing debt');
    if (creditFactors.character < 6) factors.push('Credit history concerns');
    if (inputs.employmentType !== 'permanent') factors.push('Employment stability');
    
    // ESG benefits
    const esgScore = (esgFactors.energyRating + esgFactors.waterEfficiency + 
                     esgFactors.sustainableFeatures + esgFactors.environmentalImpact) / 4;
    if (esgScore > 7) factors.push('Strong ESG profile (positive)');
    
    // Recommendations
    if (lvr.finalLVR > 80) recommendations.push('Consider increasing deposit to reduce LVR');
    if (serviceability.realistic < serviceability.optimistic * 0.8) 
      recommendations.push('Review expenses to improve serviceability');
    if (esgScore < 6) recommendations.push('Consider ESG improvements for better lending terms');
    
    const riskScore = factors.filter(f => !f.includes('positive')).length;
    const overall = riskScore <= 1 ? 'Low' : riskScore <= 3 ? 'Medium' : 'High';
    
    return { overall, factors, recommendations };
  };

  const runFullAssessment = () => {
    const serviceability = calculateServiceability();
    const lvr = calculateLVR();
    const minimumValue = calculateMinimumValues();
    const riskAssessment = performRiskAssessment();
    
    setResults({
      serviceability,
      lvr,
      minimumValue,
      riskAssessment
    });
  };

  const updateInput = (field: keyof ServiceabilityInputs, value: number | string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const updateESG = (field: keyof ESGFactors, value: number) => {
    setEsgFactors(prev => ({ ...prev, [field]: value }));
  };

  const updateCredit = (field: keyof CreditFactors, value: number) => {
    setCreditFactors(prev => ({ ...prev, [field]: value }));
  };

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
          <Tabs defaultValue="inputs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="inputs">Income & Debt</TabsTrigger>
              <TabsTrigger value="esg">ESG Factors</TabsTrigger>
              <TabsTrigger value="credit">Four C's Credit</TabsTrigger>
              <TabsTrigger value="results">Assessment Results</TabsTrigger>
            </TabsList>

            <TabsContent value="inputs" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Income & Employment</h3>
                  <div>
                    <Label htmlFor="grossIncome">Gross Annual Income ($)</Label>
                    <Input
                      id="grossIncome"
                      type="number"
                      value={inputs.grossIncome || ''}
                      onChange={(e) => updateInput('grossIncome', parseFloat(e.target.value) || 0)}
                      placeholder="120000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="employmentType">Employment Type</Label>
                    <Select value={inputs.employmentType} onValueChange={(value) => updateInput('employmentType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="permanent">Permanent Full-time</SelectItem>
                        <SelectItem value="contract">Contract/Casual</SelectItem>
                        <SelectItem value="self-employed">Self-employed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dependents">Number of Dependents</Label>
                    <Input
                      id="dependents"
                      type="number"
                      value={inputs.dependents || ''}
                      onChange={(e) => updateInput('dependents', parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Expenses & Debt</h3>
                  <div>
                    <Label htmlFor="livingExpenses">Annual Living Expenses ($)</Label>
                    <Input
                      id="livingExpenses"
                      type="number"
                      value={inputs.livingExpenses || ''}
                      onChange={(e) => updateInput('livingExpenses', parseFloat(e.target.value) || 0)}
                      placeholder="40000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="existingDebt">Annual Existing Debt Payments ($)</Label>
                    <Input
                      id="existingDebt"
                      type="number"
                      value={inputs.existingDebt || ''}
                      onChange={(e) => updateInput('existingDebt', parseFloat(e.target.value) || 0)}
                      placeholder="12000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      value={inputs.interestRate || ''}
                      onChange={(e) => updateInput('interestRate', parseFloat(e.target.value) || 0)}
                      placeholder="5.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                    <Input
                      id="loanTerm"
                      type="number"
                      value={inputs.loanTerm || ''}
                      onChange={(e) => updateInput('loanTerm', parseInt(e.target.value) || 0)}
                      placeholder="25"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                <div>
                  <Label htmlFor="propertyValue">Property Value ($)</Label>
                  <Input
                    id="propertyValue"
                    type="number"
                    value={inputs.propertyValue || ''}
                    onChange={(e) => updateInput('propertyValue', parseFloat(e.target.value) || 0)}
                    placeholder="800000"
                  />
                </div>
                <div>
                  <Label htmlFor="depositAmount">Deposit Amount ($)</Label>
                  <Input
                    id="depositAmount"
                    type="number"
                    value={inputs.depositAmount || ''}
                    onChange={(e) => updateInput('depositAmount', parseFloat(e.target.value) || 0)}
                    placeholder="160000"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="esg" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Leaf className="h-4 w-4" />
                      Environmental Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Energy Rating: {esgFactors.energyRating}/10</Label>
                      <Slider
                        value={[esgFactors.energyRating]}
                        onValueChange={(value) => updateESG('energyRating', value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Water Efficiency: {esgFactors.waterEfficiency}/10</Label>
                      <Slider
                        value={[esgFactors.waterEfficiency]}
                        onValueChange={(value) => updateESG('waterEfficiency', value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Sustainable Features: {esgFactors.sustainableFeatures}/10</Label>
                      <Slider
                        value={[esgFactors.sustainableFeatures]}
                        onValueChange={(value) => updateESG('sustainableFeatures', value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Environmental Impact: {esgFactors.environmentalImpact}/10</Label>
                      <Slider
                        value={[esgFactors.environmentalImpact]}
                        onValueChange={(value) => updateESG('environmentalImpact', value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">ESG Impact Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Overall ESG Score</span>
                        <Badge variant="outline">
                          {((esgFactors.energyRating + esgFactors.waterEfficiency + 
                            esgFactors.sustainableFeatures + esgFactors.environmentalImpact) / 4).toFixed(1)}/10
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Higher ESG scores can reduce LVR requirements by up to 2.5% and improve lending terms.
                      </div>
                      <Progress 
                        value={((esgFactors.energyRating + esgFactors.waterEfficiency + 
                               esgFactors.sustainableFeatures + esgFactors.environmentalImpact) / 4) * 10} 
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="credit" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Four C's of Credit Assessment
                    </CardTitle>
                    <CardDescription>
                      Professional credit risk evaluation framework
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        Character (Credit History): {creditFactors.character}/10
                      </Label>
                      <Slider
                        value={[creditFactors.character]}
                        onValueChange={(value) => updateCredit('character', value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        Payment history, credit behavior, reliability
                      </div>
                    </div>
                    
                    <div>
                      <Label className="flex items-center gap-2">
                        <CreditCard className="h-3 w-3" />
                        Capacity (Debt-to-Income): {creditFactors.capacity}/10
                      </Label>
                      <Slider
                        value={[creditFactors.capacity]}
                        onValueChange={(value) => updateCredit('capacity', value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        Income stability, debt service capacity
                      </div>
                    </div>
                    
                    <div>
                      <Label className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3" />
                        Capital (Net Worth): {creditFactors.capital}/10
                      </Label>
                      <Slider
                        value={[creditFactors.capital]}
                        onValueChange={(value) => updateCredit('capital', value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        Assets, savings, financial reserves
                      </div>
                    </div>
                    
                    <div>
                      <Label className="flex items-center gap-2">
                        <Building className="h-3 w-3" />
                        Collateral (Security Value): {creditFactors.collateral}/10
                      </Label>
                      <Slider
                        value={[creditFactors.collateral]}
                        onValueChange={(value) => updateCredit('collateral', value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        Property value, location, marketability
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Credit Profile Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Overall Credit Score</span>
                        <Badge variant="outline">
                          {((creditFactors.character + creditFactors.capacity + 
                            creditFactors.capital + creditFactors.collateral) / 4).toFixed(1)}/10
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Strong credit profiles can reduce LVR requirements by up to 5% and secure better interest rates.
                      </div>
                      <Progress 
                        value={((creditFactors.character + creditFactors.capacity + 
                               creditFactors.capital + creditFactors.collateral) / 4) * 10} 
                        className="mt-2"
                      />
                      
                      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-medium">Character</div>
                          <div>{creditFactors.character}/10</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-medium">Capacity</div>
                          <div>{creditFactors.capacity}/10</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-medium">Capital</div>
                          <div>{creditFactors.capital}/10</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-medium">Collateral</div>
                          <div>{creditFactors.collateral}/10</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Assessment Results</h3>
                <Button onClick={runFullAssessment} className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Run Complete Assessment
                </Button>
              </div>

              {results && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Serviceability Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Serviceability Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-2">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            Optimistic Scenario
                          </span>
                          <span className="font-medium">${results.serviceability.optimistic.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-2">
                            <Minus className="h-3 w-3 text-blue-500" />
                            Realistic Scenario
                          </span>
                          <span className="font-medium">${results.serviceability.realistic.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-2">
                            <TrendingDown className="h-3 w-3 text-red-500" />
                            Pessimistic Scenario
                          </span>
                          <span className="font-medium">${results.serviceability.pessimistic.toLocaleString()}</span>
                        </div>
                        <div className="pt-2 border-t">
                          <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2 font-medium">
                              <Target className="h-3 w-3 text-primary" />
                              Recommended Loan
                            </span>
                            <span className="font-bold text-primary">${results.serviceability.recommendedLoan.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* LVR Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        LVR Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Standard LVR</span>
                          <span className="font-medium">{results.lvr.standardLVR.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ESG Adjusted</span>
                          <span className="font-medium text-green-600">{results.lvr.esgAdjustedLVR.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Credit Adjusted</span>
                          <span className="font-medium text-blue-600">{results.lvr.creditAdjustedLVR.toFixed(1)}%</span>
                        </div>
                        <div className="pt-2 border-t">
                          <div className="flex justify-between">
                            <span className="font-medium">Final LVR</span>
                            <Badge variant={results.lvr.finalLVR <= 80 ? 'default' : 'destructive'}>
                              {results.lvr.finalLVR.toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Minimum Values */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Minimum Value Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Deal Security Value</span>
                          <span className="font-medium">${results.minimumValue.dealValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Finance Approval Value</span>
                          <span className="font-medium">${results.minimumValue.financeValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Security Margin</span>
                          <span className="font-medium text-muted-foreground">${results.minimumValue.securityMargin.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Risk Assessment */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Risk Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Overall Risk Level</span>
                        <Badge variant={
                          results.riskAssessment.overall === 'Low' ? 'default' :
                          results.riskAssessment.overall === 'Medium' ? 'secondary' : 'destructive'
                        }>
                          {results.riskAssessment.overall}
                        </Badge>
                      </div>
                      
                      {results.riskAssessment.factors.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Risk Factors:</h4>
                          <ul className="text-sm space-y-1">
                            {results.riskAssessment.factors.map((factor, index) => (
                              <li key={index} className="flex items-center gap-2">
                                {factor.includes('positive') ? 
                                  <CheckCircle className="h-3 w-3 text-green-500" /> :
                                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                                }
                                {factor}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {results.riskAssessment.recommendations.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Recommendations:</h4>
                          <ul className="text-sm space-y-1">
                            {results.riskAssessment.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-blue-500 mt-0.5" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialAssessmentTools;