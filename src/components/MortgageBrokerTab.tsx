/**
 * ============================================================================
 * Mortgage Broker Tab Component
 * Professional services hub for mortgage brokers
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
import { Calculator, DollarSign, FileText, Users, TrendingUp, Home, Building, Shield } from 'lucide-react';
import LoanAssessmentForms from './LoanAssessmentForms';

const MortgageBrokerTab = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <Home className="h-6 w-6 text-primary" />
          Mortgage Broker Hub
        </h2>
        <p className="text-muted-foreground">Professional tools and calculators for mortgage brokers</p>
      </div>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="calculator">Loan Calculator</TabsTrigger>
          <TabsTrigger value="assessments">Loan Assessments</TabsTrigger>
          <TabsTrigger value="clients">Client Management</TabsTrigger>
          <TabsTrigger value="products">Loan Products</TabsTrigger>
          <TabsTrigger value="analytics">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Mortgage Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Loan Amount</Label>
                  <Input 
                    placeholder="$500,000" 
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Interest Rate (%)</Label>
                  <Input 
                    placeholder="6.5" 
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Loan Term</Label>
                  <Select value={loanTerm} onValueChange={setLoanTerm}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 Years</SelectItem>
                      <SelectItem value="20">20 Years</SelectItem>
                      <SelectItem value="25">25 Years</SelectItem>
                      <SelectItem value="30">30 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full">Calculate Repayments</Button>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Card className="p-4">
                  <h4 className="font-semibold text-sm text-muted-foreground">Monthly Payment</h4>
                  <p className="text-2xl font-bold text-primary">$3,245</p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold text-sm text-muted-foreground">Total Interest</h4>
                  <p className="text-2xl font-bold text-orange-600">$168,200</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-4">
          <LoanAssessmentForms />
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Client Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['John Smith - Pre-approval', 'Sarah Johnson - Application', 'Mike Davis - Settlement'].map((client, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <span>{client}</span>
                    <Badge variant={idx === 0 ? "secondary" : idx === 1 ? "default" : "outline"}>
                      {idx === 0 ? "New" : idx === 1 ? "Active" : "Complete"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Available Loan Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Home Loan Variable', rate: '6.24%', lender: 'Major Bank' },
                  { name: 'Investment Fixed', rate: '6.89%', lender: 'Credit Union' },
                  { name: 'First Home Buyer', rate: '5.99%', lender: 'Non-Bank' },
                  { name: 'Commercial Property', rate: '7.25%', lender: 'Specialist' }
                ].map((product, idx) => (
                  <Card key={idx} className="p-4">
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-2xl font-bold text-primary">{product.rate}</p>
                    <p className="text-sm text-muted-foreground">{product.lender}</p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Performance Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 text-center">
                  <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm text-muted-foreground">Monthly Volume</h4>
                  <p className="text-xl font-bold">$2.4M</p>
                </Card>
                <Card className="p-4 text-center">
                  <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm text-muted-foreground">Active Clients</h4>
                  <p className="text-xl font-bold">23</p>
                </Card>
                <Card className="p-4 text-center">
                  <FileText className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm text-muted-foreground">Applications</h4>
                  <p className="text-xl font-bold">15</p>
                </Card>
                <Card className="p-4 text-center">
                  <TrendingUp className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm text-muted-foreground">Conversion Rate</h4>
                  <p className="text-xl font-bold">87%</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Professional Licensing Notice */}
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/30 mt-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-amber-600" />
            <h4 className="font-medium text-amber-800 dark:text-amber-200">
              Professional Licensing Required
            </h4>
          </div>
          <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
            Mortgage broking requires AFSL and/or Australian Credit License. Ensure you have appropriate licensing before conducting business.
          </p>
          <a 
            href="/licensing-hub" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors text-sm"
          >
            <Shield className="h-4 w-4" />
            View Licensing Hub
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default MortgageBrokerTab;