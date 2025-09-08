import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';

const ProfessionalCompliance = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader className="border-b border-border bg-muted/50">
          <CardTitle className="text-foreground text-xl font-semibold">
            Section 17: Professional Compliance & Certification
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          
          {/* Professional Compliance & Certification */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Professional Compliance & Certification</h3>
            
            {/* Bulk Compliance Data */}
            <div className="space-y-3">
              <Label htmlFor="bulk-compliance" className="text-sm font-medium text-foreground">
                Bulk Compliance Data (Auto-Categories)
              </Label>
              <Textarea
                id="bulk-compliance"
                placeholder="Paste compliance, certification, or legal information here..."
                className="min-h-32 bg-background border-input text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Date Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="inspection-date" className="text-sm font-medium text-foreground">
                  Inspection Date
                </Label>
                <div className="relative">
                  <Input
                    id="inspection-date"
                    type="date"
                    className="bg-background border-input text-foreground"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="report-date" className="text-sm font-medium text-foreground">
                  Report Date
                </Label>
                <div className="relative">
                  <Input
                    id="report-date"
                    type="date"
                    className="bg-background border-input text-foreground"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="next-review-date" className="text-sm font-medium text-foreground">
                  Next Review Date
                </Label>
                <div className="relative">
                  <Input
                    id="next-review-date"
                    type="date"
                    className="bg-background border-input text-foreground"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Valuer Credentials */}
            <div className="space-y-2">
              <Label htmlFor="valuer-credentials" className="text-sm font-medium text-foreground">
                Valuer Credentials & Qualifications
              </Label>
              <Input
                id="valuer-credentials"
                placeholder="e.g., API Certified Practising Valuer"
                className="bg-background border-input text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Compliance Statement */}
            <div className="space-y-2">
              <Label htmlFor="compliance-statement" className="text-sm font-medium text-foreground">
                Compliance Statement
              </Label>
              <Textarea
                id="compliance-statement"
                placeholder="This valuation has been prepared in accordance with Australian Property Institute standards and International Valuation Standards."
                className="min-h-24 bg-background border-input text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Valuation Details Table */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Valuation Details</h3>
            
            <div className="grid grid-cols-1 gap-4">
              {/* Interest Valued */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Interest Valued</div>
                <div className="text-muted-foreground">[Pre-populated from platform]</div>
              </div>
              
              {/* Value Component */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Value Component</div>
                <div className="text-muted-foreground">[Pre-populated from platform]</div>
              </div>

              {/* Highest and Best Use */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Highest and Best Use</div>
                <div className="text-muted-foreground">[Pre-populated from platform]</div>
              </div>

              {/* Selling Period */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Selling Period</div>
                <div className="text-muted-foreground">[Pre-populated from platform]</div>
              </div>

              {/* Currency of Valuation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Currency of Valuation</div>
                <div className="text-muted-foreground">[Pre-populated from platform]</div>
              </div>

              {/* Market Value - exclusive of GST */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-primary/10">
                <div className="font-medium text-foreground">Market Value – exclusive of GST</div>
                <div className="text-muted-foreground">[Pre-populated from platform]</div>
              </div>

              {/* Net Passing Rent */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Net Passing Rent</div>
                <div className="text-muted-foreground">[Pre-populated from platform]</div>
              </div>

              {/* Market Rent */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Market Rent</div>
                <div className="text-muted-foreground">[Pre-populated from platform]</div>
              </div>

              {/* Capitalisation Rate */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Capitalisation Rate</div>
                <div className="text-muted-foreground">[Pre-populated from platform]</div>
              </div>

              {/* Insurance Replacement Value */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Insurance Replacement Value</div>
                <div className="text-muted-foreground">[Pre-populated from platform]</div>
              </div>

              {/* Forced Sale Value */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Forced Sale Value</div>
                <div className="text-muted-foreground">[Pre-populated from platform]</div>
              </div>
            </div>
          </div>

          {/* Certification Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Certification Details</h3>
            
            <div className="grid grid-cols-1 gap-4">
              {/* Valuation Firm */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Valuation Firm</div>
                <div className="text-muted-foreground">[White Label Firm Name]</div>
              </div>

              {/* Issue Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Issue Date</div>
                <div className="text-muted-foreground">[Pre-populated from platform]</div>
              </div>

              {/* Inspecting Valuer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Inspecting Valuer</div>
                <div className="text-muted-foreground">[Pre-populated from platform]</div>
              </div>

              {/* Signature */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Signature</div>
                <div className="text-muted-foreground">[Digital Signature Field]</div>
              </div>

              {/* Counter Signatory */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Counter Signatory</div>
                <div className="text-muted-foreground">[Digital Signature Field]</div>
              </div>
            </div>
          </div>

          {/* Copyright Notice */}
          <div className="mt-8 p-4 border border-border rounded-lg bg-muted/20">
            <p className="text-sm text-muted-foreground">
              © 2020-2021 [White Label Company Name], all rights reserved.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalCompliance;