import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Shield, FileText, Calendar, User, MapPin } from 'lucide-react';

const ValuationCertificate = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader className="border-b border-border bg-muted/50">
          <CardTitle className="text-foreground text-xl font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Section 17: Valuation Certificate
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          
          {/* Certificate Header */}
          <div className="text-center space-y-4 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground">VALUATION CERTIFICATE</h2>
            <p className="text-sm text-muted-foreground">
              This certificate confirms the valuation details and professional compliance
            </p>
          </div>

          {/* Property Identification */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Property Identification
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="property-address" className="text-sm font-medium">Property Address</Label>
                <Textarea 
                  id="property-address"
                  placeholder="Enter complete property address including lot, plan, and title details..."
                  className="w-full min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title-reference" className="text-sm font-medium">Title Reference</Label>
                <Input 
                  id="title-reference"
                  placeholder="e.g., Lot 1 on Plan PS123456" 
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="property-type" className="text-sm font-medium">Property Type</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential-house">Residential House</SelectItem>
                    <SelectItem value="residential-unit">Residential Unit</SelectItem>
                    <SelectItem value="commercial-office">Commercial Office</SelectItem>
                    <SelectItem value="commercial-retail">Commercial Retail</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="rural">Rural/Agricultural</SelectItem>
                    <SelectItem value="development">Development Site</SelectItem>
                    <SelectItem value="specialised">Specialised Property</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interest-valued" className="text-sm font-medium">Interest Valued</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select interest type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freehold">Freehold</SelectItem>
                    <SelectItem value="leasehold">Leasehold</SelectItem>
                    <SelectItem value="stratum">Stratum Title</SelectItem>
                    <SelectItem value="other">Other (specify in notes)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Valuation Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Valuation Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="valuation-purpose" className="text-sm font-medium">Purpose of Valuation</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mortgage-security">Mortgage Security</SelectItem>
                    <SelectItem value="sale-purchase">Sale/Purchase</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="family-law">Family Law</SelectItem>
                    <SelectItem value="compulsory-acquisition">Compulsory Acquisition</SelectItem>
                    <SelectItem value="taxation">Taxation</SelectItem>
                    <SelectItem value="litigation">Litigation</SelectItem>
                    <SelectItem value="accounting">Accounting</SelectItem>
                    <SelectItem value="other">Other (specify)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="basis-of-valuation" className="text-sm font-medium">Basis of Valuation</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select basis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market-value">Market Value</SelectItem>
                    <SelectItem value="market-rent">Market Rent</SelectItem>
                    <SelectItem value="forced-sale">Forced Sale Value</SelectItem>
                    <SelectItem value="fair-value">Fair Value</SelectItem>
                    <SelectItem value="insurance-replacement">Insurance Replacement Cost</SelectItem>
                    <SelectItem value="depreciated-replacement">Depreciated Replacement Cost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="valuation-amount" className="text-sm font-medium">Valuation Amount ($)</Label>
                <Input 
                  id="valuation-amount"
                  type="number" 
                  placeholder="0"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gst-treatment" className="text-sm font-medium">GST Treatment</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select GST treatment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exclusive">GST Exclusive</SelectItem>
                    <SelectItem value="inclusive">GST Inclusive</SelectItem>
                    <SelectItem value="exempt">GST Exempt</SelectItem>
                    <SelectItem value="input-taxed">Input Taxed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="valuation-date" className="text-sm font-medium">Date of Valuation</Label>
                <Input 
                  id="valuation-date"
                  type="date" 
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inspection-date" className="text-sm font-medium">Date of Inspection</Label>
                <Input 
                  id="inspection-date"
                  type="date" 
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Professional Certification */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Professional Certification
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="valuer-name" className="text-sm font-medium">Valuer Name</Label>
                <Input 
                  id="valuer-name"
                  placeholder="Enter qualified valuer name" 
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="valuer-qualification" className="text-sm font-medium">Professional Qualification</Label>
                <Input 
                  id="valuer-qualification"
                  placeholder="e.g., Certified Practising Valuer (CPV)" 
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="registration-number" className="text-sm font-medium">Registration Number</Label>
                <Input 
                  id="registration-number"
                  placeholder="Enter professional registration number" 
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="firm-name" className="text-sm font-medium">Valuation Firm</Label>
                <Input 
                  id="firm-name"
                  placeholder="Enter firm/company name" 
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Certification Statement */}
          <div className="space-y-4 p-6 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-foreground">Certification Statement</h4>
            <div className="space-y-3 text-sm text-foreground">
              <p>I certify that:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>This valuation has been prepared in accordance with the relevant Australian Property Institute (API) Professional Practice Standards</li>
                <li>The valuation represents my unbiased professional opinion of the market value of the subject property</li>
                <li>I have personally inspected the property and am satisfied with the extent of the inspection</li>
                <li>I have no pecuniary interest in the subject property that could affect the valuation</li>
                <li>The valuation is current as at the date of valuation specified above</li>
                <li>I am appropriately qualified and experienced to undertake this valuation</li>
                <li>I have complied with all applicable professional and ethical standards</li>
              </ul>
            </div>
          </div>

          {/* Limitations and Assumptions */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Limitations and Assumptions</h4>
            <Textarea 
              placeholder="Enter any specific limitations, assumptions, or conditions that apply to this valuation..."
              className="w-full min-h-[100px]"
            />
          </div>

          {/* Important Disclaimers */}
          <div className="space-y-4 p-4 border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 rounded-lg">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-600" />
              Important Disclaimers
            </h4>
            <div className="space-y-2 text-sm text-foreground">
              <p><strong>Market Movement:</strong> This valuation is current at the date of valuation only. Property values may change significantly over short periods due to market movements.</p>
              <p><strong>Limited Liability:</strong> Our liability is limited in accordance with our Professional Indemnity Insurance and applicable professional standards legislation.</p>
              <p><strong>Use Limitations:</strong> This valuation is prepared for the specific purpose stated and should not be used for any other purpose without written consent.</p>
            </div>
          </div>

          {/* Signature Section */}
          <div className="space-y-4 border-t pt-6">
            <h4 className="font-semibold text-foreground">Signature and Date</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Valuer Signature</Label>
                <div className="h-20 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                  Digital signature area
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signature-date" className="text-sm font-medium">Date Signed</Label>
                <Input 
                  id="signature-date"
                  type="date" 
                  className="w-full"
                />
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default ValuationCertificate;