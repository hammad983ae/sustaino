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
          
          {/* Definitions Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Key Definitions</h3>
            
            <div className="grid grid-cols-1 gap-4">
              {/* Market Value Definition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Market Value Definition</div>
                <div className="text-foreground text-sm">
                  The estimated amount for which an asset or liability should exchange on the valuation date between a willing buyer and a willing seller in an arm's length transaction, after proper marketing, where the parties had each acted knowledgeably, prudently, and without compulsion.
                </div>
              </div>
              
              {/* Market Rent Definition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Market Rent Definition</div>
                <div className="text-foreground text-sm">
                  The estimated amount for which an interest in real property should be leased on the valuation date between a willing lessor and a willing lessee on appropriate lease terms in an arm's length transaction, after proper marketing and where the parties had each acted knowledgeably, prudently and without compulsion.
                </div>
              </div>

              {/* Market Movement Clause */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Market Movement Clause</div>
                <div className="text-foreground text-sm">
                  "This valuation is current at the date of valuation only. The value assessed herein may change significantly and unexpectedly over a relatively short period of time (including as a result of general market movements or factors specific to the particular property). Liability for losses arising from such subsequent changes in value is excluded as is liability where the"
                </div>
              </div>

              {/* Prudent Lender Clause */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Prudent Lender Clause</div>
                <div className="text-foreground text-sm">
                  "This valuation is prepared on the assumption that the lender as referred to in the valuation report (and no other), may rely on the valuation for mortgage finance purposes and the lender has complied with its own lending guidelines as well as prudent finance industry lending practices, and has considered all prudent aspects of credit risk for any potential borrower, including the borrower's ability to service and repay any mortgage loan. Further, the valuation is prepared on the assumption that any such lender is providing mortgage financing at a conservative and prudent loan to value ratio. This clause (Prudent Lender Clause) only applies if the lender is not a lender regulated by the Banking Act of 1959"."
                </div>
              </div>
            </div>
          </div>

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

            {/* Environmental and Contamination Qualifications */}
            <div className="space-y-2">
              <Label htmlFor="environmental-qualifications" className="text-sm font-medium text-foreground">
                Environmental and Contamination Assessment Qualifications
              </Label>
              <Textarea
                id="environmental-qualifications"
                defaultValue="The valuer is not an environmental specialist or expert in contamination assessment. This valuation does not constitute an environmental audit or contamination assessment. Any environmental observations are based on visual inspection only and are general in nature.

Where potential contamination risks have been identified, it is strongly recommended that the client engage qualified environmental consultants to conduct detailed environmental investigations including soil testing, air quality monitoring, and specialist assessment of hazardous substances.

This valuation excludes consideration of:
• Hidden or non-apparent contamination
• Subsurface contamination requiring specialist testing
• Asbestos content (unless visible and obvious)
• Lead paint or other hazardous building materials (unless obvious)
• PFAS or other chemical contamination
• Illegal drug activity residues
• Underground storage tanks or buried materials
• Radioactive materials or electromagnetic radiation impacts

The valuer excludes all liability for environmental contamination, hazardous substances, or environmental conditions that are not readily apparent during inspection or that require specialist knowledge to identify."
                className="min-h-32 bg-background border-input text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Contamination Impact Disclaimer */}
            <div className="space-y-2">
              <Label htmlFor="contamination-disclaimer" className="text-sm font-medium text-foreground">
                Contamination Impact on Value Disclaimer
              </Label>
              <Textarea
                id="contamination-disclaimer"
                defaultValue="The presence of contamination may significantly impact property value through:
• Direct remediation and clean-up costs
• Ongoing monitoring and compliance costs
• Legal and regulatory compliance expenses
• Reduced marketability and longer selling periods
• Financing difficulties or restrictions
• Potential liability for past and future contamination
• Market stigma that may persist beyond remediation

Where contamination is suspected or identified, the assessed value assumes no contamination unless specifically stated. Any contamination discovered subsequent to this valuation may materially affect the property value and this valuation should be reviewed accordingly."
                className="min-h-24 bg-background border-input text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Expert Referral Requirements */}
            <div className="space-y-2">
              <Label htmlFor="expert-referral" className="text-sm font-medium text-foreground">
                Expert Referral Requirements
              </Label>
              <Textarea
                id="expert-referral"
                defaultValue="In accordance with API Guidance Paper on Contamination Issues, where potential contamination is identified, the client should engage:

• Qualified environmental consultants for contamination assessment
• Environmental engineers for remediation planning
• Occupational hygienists for health risk assessment
• Legal advisors for liability and compliance matters
• Specialist testing laboratories for soil, air, and water analysis

The valuer recommends that environmental investigation be undertaken prior to:
• Property acquisition or disposal
• Development or redevelopment activities
• Financing decisions
• Any change of use that may trigger regulatory requirements

This recommendation applies particularly where the property has current or historical use that appears on the list of potentially contaminating activities as defined in the API Guidance Paper."
                className="min-h-28 bg-background border-input text-foreground placeholder:text-muted-foreground"
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

              {/* Forced Sale Price Estimate */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="font-medium text-foreground">Forced Sale Price Estimate (Range)</div>
                <div className="text-muted-foreground">[Pre-populated from platform]</div>
              </div>

              {/* Forced Sale Disclaimers */}
              <div className="grid grid-cols-1 gap-4 p-4 border border-orange-200 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                <div className="font-medium text-orange-800 dark:text-orange-200">Forced Sale Price Estimate Qualifications</div>
                <div className="text-sm text-orange-700 dark:text-orange-300 space-y-2">
                  <p><strong>Important:</strong> This is a "forced sale price estimate" not a "forced sale value." The estimate reflects the most probable price under constrained selling conditions and does not represent market value.</p>
                  <p><strong>Special Assumptions Applied:</strong> This estimate assumes specific constraints including restricted marketing period, potential seller duress, and non-arms length transaction conditions as detailed in the engagement letter.</p>
                  <p><strong>Range Assessment:</strong> In accordance with API guidelines, forced sale estimates are provided as a range rather than a single figure to reflect the uncertainty of constrained sale conditions.</p>
                  <p><strong>Market Evidence Limitation:</strong> Limited comparable sales evidence exists for identical forced sale conditions, requiring professional judgment and market adjustments.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Forced Sale Assessment Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Forced Sale Assessment Details</h3>
            
            {/* Special Assumptions */}
            <div className="space-y-2">
              <Label htmlFor="forced-sale-assumptions" className="text-sm font-medium text-foreground">
                Special Assumptions for Forced Sale Scenario
              </Label>
              <Textarea
                id="forced-sale-assumptions"
                placeholder="Detail the specific constraints and assumptions including marketing period, method of sale, market conditions, seller circumstances..."
                className="min-h-20 bg-background border-input text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Marketing Constraints */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="marketing-period" className="text-sm font-medium text-foreground">
                  Restricted Marketing Period
                </Label>
                <Input
                  id="marketing-period"
                  placeholder="e.g., 30 days, immediate sale required"
                  className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sale-method" className="text-sm font-medium text-foreground">
                  Method of Sale
                </Label>
                <Input
                  id="sale-method"
                  placeholder="e.g., auction, private treaty, mortgagee sale"
                  className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Valuation Approach for Forced Sale */}
            <div className="space-y-2">
              <Label htmlFor="forced-sale-methodology" className="text-sm font-medium text-foreground">
                Valuation Methodology and Adjustments Applied
              </Label>
              <Textarea
                id="forced-sale-methodology"
                placeholder="Explain the valuation approach used, market evidence considered, and specific adjustments made to account for forced sale constraints..."
                className="min-h-24 bg-background border-input text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Forced Sale vs Market Value Distinction */}
            <div className="space-y-2">
              <Label htmlFor="forced-sale-distinction" className="text-sm font-medium text-foreground">
                Distinction from Market Value
              </Label>
              <Textarea
                id="forced-sale-distinction"
                defaultValue="This forced sale price estimate does not represent market value and should not be confused with market value. The estimate reflects the impact of constrained selling conditions including:

• Inadequate exposure to the market
• Unreasonably short selling period  
• Inappropriate method of sale for optimal results
• Seller under duress or compulsion to sell
• Limited buyer due diligence opportunity
• Buyers' awareness of seller's weakened position

Market value assumes willing buyer and seller, adequate marketing, and arms-length transaction conditions which are not present in this forced sale scenario."
                className="min-h-32 bg-background border-input text-foreground placeholder:text-muted-foreground"
              />
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