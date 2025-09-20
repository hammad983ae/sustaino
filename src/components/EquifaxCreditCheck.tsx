import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, XCircle, TrendingUp, CreditCard, Home, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CreditCheckFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  phoneNumber: string;
  email: string;
  licenseNumber: string;
}

interface CreditCheckResponse {
  creditScore: number;
  creditRating: string;
  riskLevel: string;
  reportId: string;
  enquiryDate: string;
  reportDetails: {
    creditHistory: Array<{
      creditorName: string;
      accountType: string;
      balance: number;
      status: string;
      openDate: string;
      lastReported: string;
    }>;
    defaultsAndJudgments: Array<any>;
    creditEnquiries: Array<{
      enquiryType: string;
      creditorName: string;
      date: string;
    }>;
    personalDetails: {
      currentAddress: string;
      addressHistory: Array<string>;
      employmentHistory: Array<any>;
    };
  };
  recommendations: Array<string>;
  summary: {
    totalCreditLimit: number;
    totalBalance: number;
    utilizationRatio: number;
    paymentHistory: string;
    accountMix: string;
  };
}

interface EquifaxCreditCheckProps {
  onCreditCheckComplete?: (creditData: CreditCheckResponse) => void;
  applicantType?: 'individual' | 'joint' | 'business' | 'guarantor';
}

export const EquifaxCreditCheck: React.FC<EquifaxCreditCheckProps> = ({
  onCreditCheckComplete,
  applicantType = 'individual'
}) => {
  const [formData, setFormData] = useState<CreditCheckFormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    suburb: '',
    state: '',
    postcode: '',
    phoneNumber: '',
    email: '',
    licenseNumber: ''
  });

  const [creditReport, setCreditReport] = useState<CreditCheckResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof CreditCheckFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreditCheck = async () => {
    if (!formData.firstName || !formData.lastName || !formData.dateOfBirth) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('equifax-credit-check', {
        body: { data: formData }
      });

      if (error) throw error;

      if (data.success) {
        setCreditReport(data.data);
        onCreditCheckComplete?.(data.data);
        toast.success('Credit check completed successfully');
      } else {
        toast.error(data.error || 'Failed to complete credit check');
      }
    } catch (error) {
      console.error('Credit check error:', error);
      toast.error('Failed to complete credit check');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Very Low': return 'text-green-600';
      case 'Low': return 'text-green-500';
      case 'Medium': return 'text-yellow-500';
      case 'High': return 'text-orange-500';
      case 'Very High': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 800) return 'text-green-600';
    if (score >= 740) return 'text-green-500';
    if (score >= 670) return 'text-yellow-500';
    if (score >= 580) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Equifax Credit Assessment - {applicantType.charAt(0).toUpperCase() + applicantType.slice(1)} Application
          </CardTitle>
          <CardDescription>
            Complete credit check using Equifax comprehensive credit reporting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter first name"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter last name"
                required
              />
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="licenseNumber">Driver's License Number</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                placeholder="License number"
              />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="address">Current Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Street address"
              />
            </div>
            <div>
              <Label htmlFor="suburb">Suburb</Label>
              <Input
                id="suburb"
                value={formData.suburb}
                onChange={(e) => handleInputChange('suburb', e.target.value)}
                placeholder="Suburb"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="State"
              />
            </div>
            <div>
              <Label htmlFor="postcode">Postcode</Label>
              <Input
                id="postcode"
                value={formData.postcode}
                onChange={(e) => handleInputChange('postcode', e.target.value)}
                placeholder="Postcode"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="Phone number"
              />
            </div>
          </div>

          <Button 
            onClick={handleCreditCheck} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Processing Credit Check...' : 'Run Equifax Credit Check'}
          </Button>
        </CardContent>
      </Card>

      {creditReport && (
        <div className="space-y-6">
          {/* Credit Score Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Credit Score Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(creditReport.creditScore)}`}>
                    {creditReport.creditScore}
                  </div>
                  <div className="text-sm text-muted-foreground">Credit Score</div>
                  <Badge variant="outline" className="mt-2">
                    {creditReport.creditRating}
                  </Badge>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-semibold ${getRiskColor(creditReport.riskLevel)}`}>
                    {creditReport.riskLevel}
                  </div>
                  <div className="text-sm text-muted-foreground">Risk Level</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold">
                    {creditReport.summary.utilizationRatio.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Credit Utilization</div>
                  <Progress 
                    value={creditReport.summary.utilizationRatio} 
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credit Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Credit Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-lg font-semibold">
                    ${creditReport.summary.totalCreditLimit.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Credit Limit</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">
                    ${creditReport.summary.totalBalance.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Balance</div>
                </div>
                <div>
                  <Badge variant="outline">{creditReport.summary.paymentHistory}</Badge>
                  <div className="text-sm text-muted-foreground mt-1">Payment History</div>
                </div>
                <div>
                  <Badge variant="outline">{creditReport.summary.accountMix}</Badge>
                  <div className="text-sm text-muted-foreground mt-1">Account Mix</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credit History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Credit History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {creditReport.reportDetails.creditHistory.map((account, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{account.creditorName}</div>
                        <div className="text-sm text-muted-foreground">{account.accountType}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${account.balance.toLocaleString()}</div>
                        <Badge 
                          variant={account.status === 'Current' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {account.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Opened: {account.openDate} | Last Reported: {account.lastReported}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {creditReport.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Report Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Report Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Report ID:</span> {creditReport.reportId}
                </div>
                <div>
                  <span className="font-semibold">Enquiry Date:</span> {new Date(creditReport.enquiryDate).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};