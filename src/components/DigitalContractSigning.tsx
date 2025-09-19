import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, PenTool, Send, Download, Eye } from 'lucide-react';
import sustanoProLogo from '@/assets/sustano-pro-logo-main.jpg';

interface ContractData {
  propertyAddress: string;
  saleDate: string;
  purchasingEntity: string;
  contactName: string;
  email: string;
  mobile: string;
  offerPrice: string;
  preferredDeposit: string;
  settlementPeriod: string;
  specialConditions: string;
}

export default function DigitalContractSigning() {
  const [activeTab, setActiveTab] = useState('contract-of-sale');
  const [contractData, setContractData] = useState<ContractData>({
    propertyAddress: '',
    saleDate: '',
    purchasingEntity: '',
    contactName: '',
    email: '',
    mobile: '',
    offerPrice: '',
    preferredDeposit: '10% of purchase price',
    settlementPeriod: '30 days',
    specialConditions: ''
  });
  const [agreed, setAgreed] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [contractStatus, setContractStatus] = useState<'draft' | 'sent' | 'signed' | null>(null);

  const handleInputChange = (field: keyof ContractData, value: string) => {
    setContractData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateContract = async () => {
    setIsGenerating(true);
    try {
      // Simulate contract generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setContractStatus('draft');
    } catch (error) {
      console.error('Error generating contract:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendForSigning = async () => {
    try {
      setContractStatus('sent');
      // Here you would integrate with SignNow API
      window.open('https://app.signnow.com/rctapp/documents/c961d0b63e6647dbb32e60550528ff21543c36bd', '_blank');
    } catch (error) {
      console.error('Error sending contract:', error);
    }
  };

  const getStatusBadge = () => {
    switch (contractStatus) {
      case 'draft': return <Badge variant="secondary">Draft Ready</Badge>;
      case 'sent': return <Badge variant="default">Sent for Signature</Badge>;
      case 'signed': return <Badge variant="destructive">Signed</Badge>;
      default: return <Badge variant="outline">Not Generated</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Sustano Pro Branding */}
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={sustanoProLogo} alt="Sustano Pro" className="h-12" />
          </div>
          <CardTitle className="text-2xl">Digital Contract Management</CardTitle>
          <p className="text-muted-foreground">Secure, Digital, and Legally Binding</p>
          <div className="flex justify-center">{getStatusBadge()}</div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contract-of-sale">Contract of Sale</TabsTrigger>
          <TabsTrigger value="due-diligence">Due Diligence</TabsTrigger>
          <TabsTrigger value="auction-terms">Auction Terms</TabsTrigger>
          <TabsTrigger value="esg-compliance">ESG Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="contract-of-sale">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Contract of Sale
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Property Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="propertyAddress">Property Address *</Label>
                    <Input
                      id="propertyAddress"
                      value={contractData.propertyAddress}
                      onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                      placeholder="91-101 Bourbong Street, Bundaberg Central QLD 4670"
                    />
                  </div>
                  <div>
                    <Label htmlFor="saleDate">Sale Date *</Label>
                    <Input
                      id="saleDate"
                      type="date"
                      value={contractData.saleDate}
                      onChange={(e) => handleInputChange('saleDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Purchaser Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Purchaser Details</h3>
                <div>
                  <Label htmlFor="purchasingEntity">Purchasing Entity *</Label>
                  <Input
                    id="purchasingEntity"
                    value={contractData.purchasingEntity}
                    onChange={(e) => handleInputChange('purchasingEntity', e.target.value)}
                    placeholder="Enter Individual Name's or Company Name"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactName">Contact Name *</Label>
                    <Input
                      id="contactName"
                      value={contractData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      placeholder="First Last"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contractData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile *</Label>
                  <Input
                    id="mobile"
                    value={contractData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    placeholder="Mobile number"
                  />
                </div>
              </div>

              {/* Offer Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Offer Details</h3>
                <div>
                  <Label htmlFor="offerPrice">Offer Price $ *</Label>
                  <Input
                    id="offerPrice"
                    value={contractData.offerPrice}
                    onChange={(e) => handleInputChange('offerPrice', e.target.value)}
                    placeholder="Enter offer amount"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Preferred Deposit</Label>
                    <RadioGroup value={contractData.preferredDeposit} onValueChange={(value) => handleInputChange('preferredDeposit', value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="10% of purchase price" id="deposit-10" />
                        <Label htmlFor="deposit-10">10% of purchase price</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="deposit-other" />
                        <Label htmlFor="deposit-other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label>Preferred Settlement Period</Label>
                    <RadioGroup value={contractData.settlementPeriod} onValueChange={(value) => handleInputChange('settlementPeriod', value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="30 days" id="settlement-30" />
                        <Label htmlFor="settlement-30">30 days</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="settlement-other" />
                        <Label htmlFor="settlement-other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Special Conditions */}
              <div className="space-y-4">
                <Label htmlFor="specialConditions">Outline special conditions here:</Label>
                <Textarea
                  id="specialConditions"
                  value={contractData.specialConditions}
                  onChange={(e) => handleInputChange('specialConditions', e.target.value)}
                  placeholder="requested conditions"
                  rows={4}
                />
              </div>

              {/* Agreement Checkbox */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreement"
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  />
                  <Label htmlFor="agreement" className="text-sm">
                    I/We Agree to the below conditions and acknowledge all terms and conditions outlined in this digital contract.
                  </Label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                {!contractStatus && (
                  <Button 
                    onClick={handleGenerateContract}
                    disabled={!agreed || isGenerating}
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    {isGenerating ? 'Generating...' : 'Generate Contract'}
                  </Button>
                )}
                
                {contractStatus === 'draft' && (
                  <Button onClick={handleSendForSigning} className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send for Digital Signature
                  </Button>
                )}

                {contractStatus === 'sent' && (
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">Contract sent for signature</p>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      View in SignNow
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="due-diligence">
          <Card>
            <CardHeader>
              <CardTitle>Due Diligence Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Building Inspection
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Pest Inspection
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Strata Report
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Council Certificates
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auction-terms">
          <Card>
            <CardHeader>
              <CardTitle>Auction Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Auction Registration Agreement
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Bidder Terms & Conditions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Reserve Price Disclosure
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="esg-compliance">
          <Card>
            <CardHeader>
              <CardTitle>ESG Compliance Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Environmental Impact Assessment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Social Responsibility Statement
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Governance Framework
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}