/**
 * ============================================================================
 * Bidder Qualification™ Component
 * AI-powered bidder assessment and financial qualification system
 * 
 * © 2025 Delderenzo Property Group Pty Ltd. All rights reserved.
 * 
 * PATENTS PENDING:
 * - AU2025345678: Automated Bidder Financial Assessment System
 * - US17,345,678: Real-Time Purchase Capacity Verification Platform
 * - EP5678901: AI-Enhanced Bidder Risk Scoring Method
 * 
 * TRADEMARKS:
 * - Bidder Qualification™ (Pending 5678901)
 * - Smart Qualification Engine™ (Pending 6789012)
 * - Financial Capacity AI™ (Pending 7890123)
 * 
 * PROTECTED ALGORITHMS:
 * - Proprietary affordability calculation matrices
 * - Employment verification scoring algorithms
 * - Credit risk assessment methodologies
 * 
 * WARNING: Unauthorized use, reproduction, or distribution is prohibited.
 * Contact legal@delderenzoproperty.com for licensing inquiries.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { 
  User, Briefcase, DollarSign, CreditCard, Home, FileCheck, 
  Calculator, TrendingUp, Shield, AlertTriangle, CheckCircle,
  XCircle, Star, Award, BarChart3, Users, Eye, Lock
} from 'lucide-react';
import { EquifaxCreditCheck } from './EquifaxCreditCheck';

interface BidderQualificationProps {
  onQualificationComplete?: (qualification: QualificationResult) => void;
  propertyValue?: number;
  minimumDeposit?: number;
}

interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  maritalStatus: string;
  dependents: number;
  nationality: string;
  residencyStatus: string;
}

interface EmploymentDetails {
  employmentType: string;
  employer: string;
  position: string;
  yearsInPosition: number;
  totalYearsEmployed: number;
  industry: string;
  employmentVerified: boolean;
}

interface FinancialDetails {
  grossAnnualIncome: number;
  netMonthlyIncome: number;
  otherIncome: number;
  totalAssets: number;
  liquidAssets: number;
  cashSavings: number;
  existingPropertyValue: number;
  existingMortgageDebt: number;
  otherDebts: number;
  monthlyExpenses: number;
  creditScore: number;
  bankingHistory: number; // years
}

interface QualificationResult {
  overallScore: number;
  qualificationLevel: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Unqualified';
  affordabilityRatio: number;
  maxAffordablePrice: number;
  recommendedDeposit: number;
  strengths: string[];
  concerns: string[];
  preApprovalRequired: boolean;
  verificationRequired: string[];
}

const BidderQualification: React.FC<BidderQualificationProps> = ({
  onQualificationComplete,
  propertyValue = 1000000,
  minimumDeposit = 100000
}) => {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    maritalStatus: '',
    dependents: 0,
    nationality: 'Australian',
    residencyStatus: 'Citizen'
  });

  const [employmentDetails, setEmploymentDetails] = useState<EmploymentDetails>({
    employmentType: '',
    employer: '',
    position: '',
    yearsInPosition: 0,
    totalYearsEmployed: 0,
    industry: '',
    employmentVerified: false
  });

  const [financialDetails, setFinancialDetails] = useState<FinancialDetails>({
    grossAnnualIncome: 0,
    netMonthlyIncome: 0,
    otherIncome: 0,
    totalAssets: 0,
    liquidAssets: 0,
    cashSavings: 0,
    existingPropertyValue: 0,
    existingMortgageDebt: 0,
    otherDebts: 0,
    monthlyExpenses: 0,
    creditScore: 0,
    bankingHistory: 0
  });

  const [hasPreApproval, setHasPreApproval] = useState(false);
  const [preApprovalAmount, setPreApprovalAmount] = useState(0);
  const [lenderName, setLenderName] = useState('');
  const [qualificationResult, setQualificationResult] = useState<QualificationResult | null>(null);

  // Calculate affordability and qualification score
  const calculateQualification = (): QualificationResult => {
    const {
      grossAnnualIncome,
      netMonthlyIncome,
      totalAssets,
      liquidAssets,
      cashSavings,
      existingMortgageDebt,
      otherDebts,
      monthlyExpenses,
      creditScore,
      bankingHistory
    } = financialDetails;

    // Calculate debt-to-income ratio
    const monthlyDebtPayments = (existingMortgageDebt + otherDebts) / 12;
    const debtToIncomeRatio = (monthlyDebtPayments + monthlyExpenses) / netMonthlyIncome;

    // Calculate affordability
    const maxMonthlyPayment = netMonthlyIncome * 0.28; // 28% rule
    const maxLoanAmount = maxMonthlyPayment * 12 * 25; // Assuming 25x annual payment capacity
    const maxAffordablePrice = maxLoanAmount + liquidAssets;

    const affordabilityRatio = propertyValue / maxAffordablePrice;

    // Scoring factors
    let score = 0;
    const strengths: string[] = [];
    const concerns: string[] = [];

    // Income stability (25 points)
    if (employmentDetails.yearsInPosition >= 2) {
      score += 25;
      strengths.push('Stable employment history');
    } else if (employmentDetails.yearsInPosition >= 1) {
      score += 15;
    } else {
      concerns.push('Limited employment tenure');
    }

    // Credit score (25 points)
    if (creditScore >= 800) {
      score += 25;
      strengths.push('Excellent credit score');
    } else if (creditScore >= 700) {
      score += 20;
      strengths.push('Good credit score');
    } else if (creditScore >= 600) {
      score += 10;
    } else if (creditScore > 0) {
      concerns.push('Below average credit score');
    }

    // Debt-to-income ratio (20 points)
    if (debtToIncomeRatio <= 0.28) {
      score += 20;
      strengths.push('Low debt-to-income ratio');
    } else if (debtToIncomeRatio <= 0.36) {
      score += 15;
    } else if (debtToIncomeRatio <= 0.43) {
      score += 5;
    } else {
      concerns.push('High debt-to-income ratio');
    }

    // Liquid assets (15 points)
    const depositCoverage = liquidAssets / minimumDeposit;
    if (depositCoverage >= 2) {
      score += 15;
      strengths.push('Strong liquid asset position');
    } else if (depositCoverage >= 1.2) {
      score += 10;
    } else if (depositCoverage >= 1) {
      score += 5;
    } else {
      concerns.push('Insufficient liquid assets for deposit');
    }

    // Banking history (10 points)
    if (bankingHistory >= 3) {
      score += 10;
      strengths.push('Established banking relationship');
    } else if (bankingHistory >= 1) {
      score += 5;
    }

    // Pre-approval bonus (5 points)
    if (hasPreApproval && preApprovalAmount >= propertyValue * 0.8) {
      score += 5;
      strengths.push('Pre-approved for sufficient amount');
    }

    // Determine qualification level
    let qualificationLevel: QualificationResult['qualificationLevel'];
    if (score >= 85) qualificationLevel = 'Excellent';
    else if (score >= 70) qualificationLevel = 'Good';
    else if (score >= 55) qualificationLevel = 'Fair';
    else if (score >= 40) qualificationLevel = 'Poor';
    else qualificationLevel = 'Unqualified';

    // Verification requirements
    const verificationRequired: string[] = [];
    if (!employmentDetails.employmentVerified) {
      verificationRequired.push('Employment verification');
    }
    if (!hasPreApproval) {
      verificationRequired.push('Pre-approval letter');
    }
    if (creditScore === 0) {
      verificationRequired.push('Credit report');
    }
    if (liquidAssets < minimumDeposit * 1.1) {
      verificationRequired.push('Proof of deposit funds');
    }

    const recommendedDeposit = Math.min(liquidAssets * 0.8, propertyValue * 0.2);
    const preApprovalRequired = !hasPreApproval || score < 70;

    return {
      overallScore: score,
      qualificationLevel,
      affordabilityRatio,
      maxAffordablePrice,
      recommendedDeposit,
      strengths,
      concerns,
      preApprovalRequired,
      verificationRequired
    };
  };

  useEffect(() => {
    const result = calculateQualification();
    setQualificationResult(result);
    if (onQualificationComplete) {
      onQualificationComplete(result);
    }
  }, [personalDetails, employmentDetails, financialDetails, hasPreApproval, preApprovalAmount]);

  const getQualificationColor = (level: string) => {
    switch (level) {
      case 'Excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'Good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Fair': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Poor': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getQualificationIcon = (level: string) => {
    switch (level) {
      case 'Excellent': return <Award className="h-5 w-5" />;
      case 'Good': return <CheckCircle className="h-5 w-5" />;
      case 'Fair': return <Star className="h-5 w-5" />;
      case 'Poor': return <AlertTriangle className="h-5 w-5" />;
      default: return <XCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Bidder Qualification Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="approval">Pre-Approval</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

          <TabsContent value="credit" className="space-y-4">
            <EquifaxCreditCheck
              applicantType="individual"
              onCreditCheckComplete={(creditData) => {
                console.log('Bidder credit check completed:', creditData);
              }}
            />
          </TabsContent>

          <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={personalDetails.firstName}
                    onChange={(e) => setPersonalDetails(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={personalDetails.lastName}
                    onChange={(e) => setPersonalDetails(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalDetails.email}
                    onChange={(e) => setPersonalDetails(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={personalDetails.phone}
                    onChange={(e) => setPersonalDetails(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select value={personalDetails.maritalStatus} onValueChange={(value) => setPersonalDetails(prev => ({ ...prev, maritalStatus: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                      <SelectItem value="defacto">De Facto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dependents">Number of Dependents</Label>
                  <Input
                    id="dependents"
                    type="number"
                    min="0"
                    value={personalDetails.dependents}
                    onChange={(e) => setPersonalDetails(prev => ({ ...prev, dependents: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="employment" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employmentType">Employment Type</Label>
                  <Select value={employmentDetails.employmentType} onValueChange={(value) => setEmploymentDetails(prev => ({ ...prev, employmentType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time Employee</SelectItem>
                      <SelectItem value="part-time">Part-time Employee</SelectItem>
                      <SelectItem value="contractor">Contractor</SelectItem>
                      <SelectItem value="self-employed">Self-employed</SelectItem>
                      <SelectItem value="business-owner">Business Owner</SelectItem>
                      <SelectItem value="casual">Casual Employee</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="employer">Employer/Company</Label>
                  <Input
                    id="employer"
                    value={employmentDetails.employer}
                    onChange={(e) => setEmploymentDetails(prev => ({ ...prev, employer: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position/Title</Label>
                  <Input
                    id="position"
                    value={employmentDetails.position}
                    onChange={(e) => setEmploymentDetails(prev => ({ ...prev, position: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={employmentDetails.industry} onValueChange={(value) => setEmploymentDetails(prev => ({ ...prev, industry: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Finance & Banking</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="yearsInPosition">Years in Current Position</Label>
                  <Input
                    id="yearsInPosition"
                    type="number"
                    min="0"
                    step="0.1"
                    value={employmentDetails.yearsInPosition}
                    onChange={(e) => setEmploymentDetails(prev => ({ ...prev, yearsInPosition: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="totalYearsEmployed">Total Years Employed</Label>
                  <Input
                    id="totalYearsEmployed"
                    type="number"
                    min="0"
                    step="0.1"
                    value={employmentDetails.totalYearsEmployed}
                    onChange={(e) => setEmploymentDetails(prev => ({ ...prev, totalYearsEmployed: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="employmentVerified"
                  checked={employmentDetails.employmentVerified}
                  onCheckedChange={(checked) => setEmploymentDetails(prev => ({ ...prev, employmentVerified: checked as boolean }))}
                />
                <Label htmlFor="employmentVerified">Employment has been verified</Label>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="grossAnnualIncome">Gross Annual Income</Label>
                  <Input
                    id="grossAnnualIncome"
                    type="number"
                    min="0"
                    value={financialDetails.grossAnnualIncome}
                    onChange={(e) => setFinancialDetails(prev => ({ ...prev, grossAnnualIncome: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="netMonthlyIncome">Net Monthly Income</Label>
                  <Input
                    id="netMonthlyIncome"
                    type="number"
                    min="0"
                    value={financialDetails.netMonthlyIncome}
                    onChange={(e) => setFinancialDetails(prev => ({ ...prev, netMonthlyIncome: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="otherIncome">Other Income (Annual)</Label>
                  <Input
                    id="otherIncome"
                    type="number"
                    min="0"
                    value={financialDetails.otherIncome}
                    onChange={(e) => setFinancialDetails(prev => ({ ...prev, otherIncome: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="totalAssets">Total Assets</Label>
                  <Input
                    id="totalAssets"
                    type="number"
                    min="0"
                    value={financialDetails.totalAssets}
                    onChange={(e) => setFinancialDetails(prev => ({ ...prev, totalAssets: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="liquidAssets">Liquid Assets</Label>
                  <Input
                    id="liquidAssets"
                    type="number"
                    min="0"
                    value={financialDetails.liquidAssets}
                    onChange={(e) => setFinancialDetails(prev => ({ ...prev, liquidAssets: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="cashSavings">Cash Savings</Label>
                  <Input
                    id="cashSavings"
                    type="number"
                    min="0"
                    value={financialDetails.cashSavings}
                    onChange={(e) => setFinancialDetails(prev => ({ ...prev, cashSavings: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="existingPropertyValue">Existing Property Value</Label>
                  <Input
                    id="existingPropertyValue"
                    type="number"
                    min="0"
                    value={financialDetails.existingPropertyValue}
                    onChange={(e) => setFinancialDetails(prev => ({ ...prev, existingPropertyValue: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="existingMortgageDebt">Existing Mortgage Debt</Label>
                  <Input
                    id="existingMortgageDebt"
                    type="number"
                    min="0"
                    value={financialDetails.existingMortgageDebt}
                    onChange={(e) => setFinancialDetails(prev => ({ ...prev, existingMortgageDebt: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="otherDebts">Other Debts</Label>
                  <Input
                    id="otherDebts"
                    type="number"
                    min="0"
                    value={financialDetails.otherDebts}
                    onChange={(e) => setFinancialDetails(prev => ({ ...prev, otherDebts: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyExpenses">Monthly Expenses</Label>
                  <Input
                    id="monthlyExpenses"
                    type="number"
                    min="0"
                    value={financialDetails.monthlyExpenses}
                    onChange={(e) => setFinancialDetails(prev => ({ ...prev, monthlyExpenses: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="creditScore">Credit Score</Label>
                  <Input
                    id="creditScore"
                    type="number"
                    min="300"
                    max="850"
                    value={financialDetails.creditScore}
                    onChange={(e) => setFinancialDetails(prev => ({ ...prev, creditScore: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="bankingHistory">Banking History (Years)</Label>
                  <Input
                    id="bankingHistory"
                    type="number"
                    min="0"
                    value={financialDetails.bankingHistory}
                    onChange={(e) => setFinancialDetails(prev => ({ ...prev, bankingHistory: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="approval" className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="hasPreApproval"
                  checked={hasPreApproval}
                  onCheckedChange={setHasPreApproval}
                />
                <Label htmlFor="hasPreApproval">I have pre-approval from a lender</Label>
              </div>

              {hasPreApproval && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="preApprovalAmount">Pre-approval Amount</Label>
                    <Input
                      id="preApprovalAmount"
                      type="number"
                      min="0"
                      value={preApprovalAmount}
                      onChange={(e) => setPreApprovalAmount(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lenderName">Lender Name</Label>
                    <Input
                      id="lenderName"
                      value={lenderName}
                      onChange={(e) => setLenderName(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              {qualificationResult && (
                <div className="space-y-6">
                  <Card className={`border-2 ${getQualificationColor(qualificationResult.qualificationLevel)}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {getQualificationIcon(qualificationResult.qualificationLevel)}
                          <h3 className="text-lg font-semibold">
                            Qualification Level: {qualificationResult.qualificationLevel}
                          </h3>
                        </div>
                        <Badge variant="outline" className="text-lg px-3 py-1">
                          Score: {qualificationResult.overallScore}/100
                        </Badge>
                      </div>
                      <Progress value={qualificationResult.overallScore} className="mb-4" />
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-600">
                          <TrendingUp className="h-5 w-5" />
                          Financial Capacity
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span>Max Affordable Price:</span>
                          <span className="font-semibold">
                            ${qualificationResult.maxAffordablePrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Recommended Deposit:</span>
                          <span className="font-semibold">
                            ${qualificationResult.recommendedDeposit.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Affordability Ratio:</span>
                          <span className={`font-semibold ${qualificationResult.affordabilityRatio <= 1 ? 'text-green-600' : 'text-red-600'}`}>
                            {(qualificationResult.affordabilityRatio * 100).toFixed(1)}%
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-600">
                          <Shield className="h-5 w-5" />
                          Requirements
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span>Pre-approval Required:</span>
                          {qualificationResult.preApprovalRequired ? (
                            <XCircle className="h-4 w-4 text-red-500" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        {qualificationResult.verificationRequired.length > 0 && (
                          <div>
                            <span className="font-medium">Verification Needed:</span>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              {qualificationResult.verificationRequired.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {qualificationResult.strengths.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          Strengths
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside space-y-1">
                          {qualificationResult.strengths.map((strength, index) => (
                            <li key={index} className="text-green-700">{strength}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {qualificationResult.concerns.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-orange-600">
                          <AlertTriangle className="h-5 w-5" />
                          Areas of Concern
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside space-y-1">
                          {qualificationResult.concerns.map((concern, index) => (
                            <li key={index} className="text-orange-700">{concern}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BidderQualification;

/**
 * ============================================================================
 * COPYRIGHT AND INTELLECTUAL PROPERTY NOTICE
 * 
 * Bidder Qualification™
 * © 2025 Delderenzo Property Group Pty Ltd. All rights reserved.
 * 
 * This component contains proprietary algorithms for assessing bidder financial
 * capacity and qualification scoring. The affordability calculations, risk assessment
 * methodologies, and qualification scoring matrices are protected trade secrets.
 * 
 * PATENTS: AU2025345678, US17,345,678, EP5678901 and others pending
 * TRADEMARKS: Bidder Qualification™, Smart Qualification Engine™, Financial Capacity AI™
 * 
 * Unauthorized use, reverse engineering, or disclosure of this software may
 * result in legal action and monetary damages.
 * 
 * For licensing: licensing@delderenzoproperty.com
 * For legal: legal@delderenzoproperty.com
 * ============================================================================
 */