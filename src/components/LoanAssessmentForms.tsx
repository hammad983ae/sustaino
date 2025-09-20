/**
 * ============================================================================
 * Loan Assessment Forms Component
 * Comprehensive loan assessment forms for different categories and application types
 * ============================================================================
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Calculator, 
  DollarSign, 
  FileText, 
  Users, 
  Building, 
  TrendingUp, 
  Shield,
  Wallet,
  CreditCard,
  Coins,
  Factory,
  Zap,
  Bitcoin,
  UserCheck,
  Building2,
  User
} from 'lucide-react';
import { EquifaxCreditCheck } from './EquifaxCreditCheck';
import { Separator } from '@/components/ui/separator';

interface LoanFormData {
  loanCategory: string;
  applicationType: string;
  loanAmount: string;
  purpose: string;
  term: string;
  interestType: string;
  securityType: string;
  applicantDetails: {
    name: string;
    email: string;
    phone: string;
    income: string;
    employment: string;
    creditScore: string;
  };
  guarantorDetails?: {
    name: string;
    relationship: string;
    income: string;
  };
  businessDetails?: {
    name: string;
    abn: string;
    industry: string;
    revenue: string;
    yearsOperating: string;
  };
}

const LoanAssessmentForms = () => {
  const [formData, setFormData] = useState<LoanFormData>({
    loanCategory: '',
    applicationType: '',
    loanAmount: '',
    purpose: '',
    term: '',
    interestType: '',
    securityType: '',
    applicantDetails: {
      name: '',
      email: '',
      phone: '',
      income: '',
      employment: '',
      creditScore: ''
    }
  });

  const loanCategories = [
    { id: 'consumer-credit', name: 'Consumer Credit', icon: CreditCard, color: 'bg-blue-500' },
    { id: 'commercial-mainstream', name: 'Commercial Mainstream', icon: Building2, color: 'bg-green-500' },
    { id: 'second-tier', name: '2nd Tier', icon: TrendingUp, color: 'bg-orange-500' },
    { id: 'private', name: 'Private', icon: Shield, color: 'bg-purple-500' },
    { id: 'development', name: 'Development', icon: Building, color: 'bg-cyan-500' },
    { id: 'specialised', name: 'Specialised', icon: Factory, color: 'bg-indigo-500' },
    { id: 'plant-equipment', name: 'Plant and Equipment', icon: Factory, color: 'bg-yellow-500' },
    { id: 'digital-assets', name: 'Digital Based Assets', icon: Zap, color: 'bg-pink-500' },
    { id: 'crypto', name: 'Crypto', icon: Bitcoin, color: 'bg-amber-500' }
  ];

  const applicationTypes = [
    { id: 'individual', name: 'Individual Application', icon: User },
    { id: 'joint', name: 'Joint Applications', icon: Users },
    { id: 'business', name: 'Business Applications', icon: Building2 },
    { id: 'guarantor', name: 'Guarantor Application', icon: UserCheck }
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedFormData = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof LoanFormData] as any),
        [field]: value
      }
    }));
  };

  const renderLoanCategoryForm = () => {
    const category = loanCategories.find(c => c.id === formData.loanCategory);
    if (!category) return null;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <category.icon className="h-5 w-5" />
            {category.name} Loan Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Loan Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="loanAmount">Loan Amount</Label>
              <Input
                id="loanAmount"
                placeholder="$500,000"
                value={formData.loanAmount}
                onChange={(e) => updateFormData('loanAmount', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="purpose">Loan Purpose</Label>
              <Select value={formData.purpose} onValueChange={(value) => updateFormData('purpose', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  {getPurposeOptions(formData.loanCategory).map(purpose => (
                    <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="term">Loan Term</Label>
              <Select value={formData.term} onValueChange={(value) => updateFormData('term', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Year</SelectItem>
                  <SelectItem value="2">2 Years</SelectItem>
                  <SelectItem value="3">3 Years</SelectItem>
                  <SelectItem value="5">5 Years</SelectItem>
                  <SelectItem value="10">10 Years</SelectItem>
                  <SelectItem value="15">15 Years</SelectItem>
                  <SelectItem value="20">20 Years</SelectItem>
                  <SelectItem value="25">25 Years</SelectItem>
                  <SelectItem value="30">30 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="interestType">Interest Type</Label>
              <Select value={formData.interestType} onValueChange={(value) => updateFormData('interestType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select interest type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="variable">Variable</SelectItem>
                  <SelectItem value="fixed">Fixed</SelectItem>
                  <SelectItem value="split">Split (Variable/Fixed)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Security Type */}
          <div>
            <Label htmlFor="securityType">Security Type</Label>
            <Select value={formData.securityType} onValueChange={(value) => updateFormData('securityType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select security type" />
              </SelectTrigger>
              <SelectContent>
                {getSecurityOptions(formData.loanCategory).map(security => (
                  <SelectItem key={security} value={security}>{security}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category-specific fields */}
          {renderCategorySpecificFields()}
        </CardContent>
      </Card>
    );
  };

  const renderCategorySpecificFields = () => {
    switch (formData.loanCategory) {
      case 'crypto':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold">Cryptocurrency Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Cryptocurrency Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crypto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                    <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                    <SelectItem value="mixed-portfolio">Mixed Portfolio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Wallet Verification</Label>
                <Input placeholder="Wallet address for verification" />
              </div>
            </div>
          </div>
        );
      case 'digital-assets':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold">Digital Asset Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Asset Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="domain-names">Domain Names</SelectItem>
                    <SelectItem value="intellectual-property">Intellectual Property</SelectItem>
                    <SelectItem value="software">Software/Apps</SelectItem>
                    <SelectItem value="online-business">Online Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Valuation Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue-multiple">Revenue Multiple</SelectItem>
                    <SelectItem value="comparable-sales">Comparable Sales</SelectItem>
                    <SelectItem value="expert-appraisal">Expert Appraisal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 'development':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold">Development Project Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Development Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential Development</SelectItem>
                    <SelectItem value="commercial">Commercial Development</SelectItem>
                    <SelectItem value="mixed-use">Mixed Use</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Project Stage</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="land-acquisition">Land Acquisition</SelectItem>
                    <SelectItem value="planning">Planning/DA Stage</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="completion">Pre-completion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderApplicationTypeForm = () => {
    if (!formData.applicationType) return null;

    return (
      <div className="space-y-6">
        {/* Primary Applicant Details */}
        <Card>
          <CardHeader>
            <CardTitle>Primary Applicant Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.applicantDetails.name}
                  onChange={(e) => updateNestedFormData('applicantDetails', 'name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.applicantDetails.email}
                  onChange={(e) => updateNestedFormData('applicantDetails', 'email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.applicantDetails.phone}
                  onChange={(e) => updateNestedFormData('applicantDetails', 'phone', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="income">Annual Income</Label>
                <Input
                  id="income"
                  placeholder="$120,000"
                  value={formData.applicantDetails.income}
                  onChange={(e) => updateNestedFormData('applicantDetails', 'income', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="employment">Employment Status</Label>
                <Select 
                  value={formData.applicantDetails.employment} 
                  onValueChange={(value) => updateNestedFormData('applicantDetails', 'employment', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time Employee</SelectItem>
                    <SelectItem value="part-time">Part-time Employee</SelectItem>
                    <SelectItem value="self-employed">Self-employed</SelectItem>
                    <SelectItem value="contractor">Contractor</SelectItem>
                    <SelectItem value="casual">Casual Employee</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="creditScore">Credit Score (if known)</Label>
                <Input
                  id="creditScore"
                  placeholder="750"
                  value={formData.applicantDetails.creditScore}
                  onChange={(e) => updateNestedFormData('applicantDetails', 'creditScore', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equifax Credit Check */}
        <Card>
          <CardHeader>
            <CardTitle>Credit Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <EquifaxCreditCheck
              applicantType={formData.applicationType as any}
              onCreditCheckComplete={(creditData) => {
                console.log('Credit check completed for loan application:', creditData);
              }}
            />
          </CardContent>
        </Card>

        {/* Joint Application Additional Applicant */}
        {formData.applicationType === 'joint' && (
          <Card>
            <CardHeader>
              <CardTitle>Joint Applicant Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input placeholder="Joint applicant name" />
                </div>
                <div>
                  <Label>Relationship</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                      <SelectItem value="business-partner">Business Partner</SelectItem>
                      <SelectItem value="family">Family Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Annual Income</Label>
                  <Input placeholder="$80,000" />
                </div>
                <div>
                  <Label>Employment Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time Employee</SelectItem>
                      <SelectItem value="part-time">Part-time Employee</SelectItem>
                      <SelectItem value="self-employed">Self-employed</SelectItem>
                      <SelectItem value="contractor">Contractor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Business Application Details */}
        {formData.applicationType === 'business' && (
          <Card>
            <CardHeader>
              <CardTitle>Business Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Business Name</Label>
                  <Input placeholder="Business name" />
                </div>
                <div>
                  <Label>ABN</Label>
                  <Input placeholder="12 345 678 901" />
                </div>
                <div>
                  <Label>Industry</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="services">Professional Services</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Annual Revenue</Label>
                  <Input placeholder="$2,500,000" />
                </div>
                <div>
                  <Label>Years Operating</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Business Structure</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select structure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sole-trader">Sole Trader</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                      <SelectItem value="trust">Trust</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Guarantor Application Details */}
        {formData.applicationType === 'guarantor' && (
          <Card>
            <CardHeader>
              <CardTitle>Guarantor Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Guarantor Name</Label>
                  <Input placeholder="Guarantor full name" />
                </div>
                <div>
                  <Label>Relationship to Applicant</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="family">Family Member</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="business-associate">Business Associate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Guarantor Income</Label>
                  <Input placeholder="$150,000" />
                </div>
                <div>
                  <Label>Guarantee Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="limited">Limited Guarantee</SelectItem>
                      <SelectItem value="unlimited">Unlimited Guarantee</SelectItem>
                      <SelectItem value="security-guarantee">Security Guarantee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const getPurposeOptions = (category: string) => {
    switch (category) {
      case 'consumer-credit':
        return ['Home Purchase', 'Refinancing', 'Investment Property', 'Personal Use'];
      case 'commercial-mainstream':
        return ['Property Purchase', 'Business Expansion', 'Equipment Finance', 'Working Capital'];
      case 'development':
        return ['Land Acquisition', 'Construction Finance', 'Development Capital', 'Project Completion'];
      case 'crypto':
        return ['Portfolio Leverage', 'Asset Acquisition', 'Trading Capital', 'Yield Farming'];
      default:
        return ['Purchase', 'Refinancing', 'Investment', 'Business Purpose'];
    }
  };

  const getSecurityOptions = (category: string) => {
    switch (category) {
      case 'consumer-credit':
        return ['Residential Property', 'Vehicle', 'Cash Security', 'Unsecured'];
      case 'commercial-mainstream':
        return ['Commercial Property', 'Business Assets', 'Director Guarantee', 'Mixed Security'];
      case 'crypto':
        return ['Cryptocurrency Holdings', 'Traditional Property', 'Mixed Portfolio', 'Cash Security'];
      case 'digital-assets':
        return ['Digital Assets', 'Intellectual Property', 'Revenue Stream', 'Traditional Security'];
      default:
        return ['Property Security', 'Asset Security', 'Personal Guarantee', 'Unsecured'];
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          Loan Assessment Forms
        </h2>
        <p className="text-muted-foreground">Comprehensive loan assessment across all categories and application types</p>
      </div>

      {/* Loan Category Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Loan Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {loanCategories.map((category) => (
              <Button
                key={category.id}
                variant={formData.loanCategory === category.id ? "default" : "outline"}
                className="h-20 flex flex-col items-center gap-2"
                onClick={() => updateFormData('loanCategory', category.id)}
              >
                <category.icon className="h-5 w-5" />
                <span className="text-xs text-center">{category.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Application Type Selection */}
      {formData.loanCategory && (
        <Card>
          <CardHeader>
            <CardTitle>Select Application Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {applicationTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={formData.applicationType === type.id ? "default" : "outline"}
                  className="h-16 flex flex-col items-center gap-2"
                  onClick={() => updateFormData('applicationType', type.id)}
                >
                  <type.icon className="h-5 w-5" />
                  <span className="text-xs text-center">{type.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loan Category Form */}
      {formData.loanCategory && renderLoanCategoryForm()}

      {/* Application Type Form */}
      {formData.applicationType && renderApplicationTypeForm()}

      {/* Submit Button */}
      {formData.loanCategory && formData.applicationType && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Ready to submit your {formData.loanCategory} loan assessment
                </p>
              </div>
              <Button size="lg" className="px-8">
                Submit Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LoanAssessmentForms;