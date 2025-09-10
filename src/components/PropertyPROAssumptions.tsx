import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PropertyPROAssumptionsProps {
  data?: any;
  onUpdate?: (data: any) => void;
}

export const PropertyPROAssumptions: React.FC<PropertyPROAssumptionsProps> = ({
  data = {},
  onUpdate
}) => {
  const handleInputChange = (field: string, value: any) => {
    const updatedData = { ...data, [field]: value };
    onUpdate?.(updatedData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Section 9 - Assumptions, Conditions & Limitations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Lender Specific Information */}
        <div>
          <Label htmlFor="lenderSpecificInfo">Lender Specific Information</Label>
          <Textarea
            id="lenderSpecificInfo"
            value={data.lenderSpecificInfo || ''}
            onChange={(e) => handleInputChange('lenderSpecificInfo', e.target.value)}
            placeholder="List additional parties who may rely on the Report (subject to Valuer's written consent)"
            className="min-h-[80px]"
          />
        </div>

        {/* Qualifications */}
        <div>
          <Label htmlFor="qualifications">Qualifications</Label>
          <Textarea
            id="qualifications"
            value={data.qualifications || ''}
            onChange={(e) => handleInputChange('qualifications', e.target.value)}
            placeholder="Specific assumptions and qualifications upon which the Report is based"
            className="min-h-[120px]"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Client must satisfy itself regarding assumed or qualified matters prior to relying upon the Report.
          </p>
        </div>

        {/* Standard Valuation Clause */}
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">Standard Valuation Limitations</h4>
          <p className="text-sm text-muted-foreground">
            "This valuation is current at the date of valuation only. The value assessed herein may change 
            significantly and unexpectedly over a relatively short period of time (including as a result of 
            general market movements or factors specific to the subject property or factors that the Valuer 
            could not have reasonably become aware as at the date of the Report). We do not accept 
            responsibility or liability for losses arising from such subsequent changes in value. Without 
            limiting the generality of the above comment, we do not assume responsibility or accept liability 
            where the valuation is relied upon after the expiration of 90 days from the date of the valuation 
            or such earlier date if you become aware of any factors that have an effect on the valuation."
          </p>
        </div>

        {/* GST Clause */}
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">GST - Valuations for Residential Mortgage Lending Purposes</h4>
          <p className="text-sm text-muted-foreground">
            "Valuations of residential property for mortgage security purposes are undertaken on the basis 
            that GST is not applicable. This valuation is prepared on the assumption that the subject property 
            does not constitute a 'new residential premises' as defined under ATO Ruling GSTR 2003/3. Further 
            it is assumed that the subject property will transact as a residential property between parties not 
            registered (and not required to be registered) for GST. The market valuation herein reflects a 
            market transaction to which GST is not applicable."
          </p>
        </div>

        {/* Reliance Period */}
        <div>
          <Label htmlFor="reliancePeriod">Reliance Period</Label>
          <Input
            id="reliancePeriod"
            value={data.reliancePeriod || '90 days'}
            onChange={(e) => handleInputChange('reliancePeriod', e.target.value)}
            placeholder="Period for which reliance is considered reasonable"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Valuer will not assume responsibility for reliance after expiration of this period.
          </p>
        </div>

        {/* Professional Indemnity Requirements */}
        <div>
          <Label htmlFor="professionalIndemnity">Professional Indemnity Requirements</Label>
          <Textarea
            id="professionalIndemnity"
            value={data.professionalIndemnity || ''}
            onChange={(e) => handleInputChange('professionalIndemnity', e.target.value)}
            placeholder="Any specific clauses required by professional indemnity insurance policy (e.g. Market Movement or Prudent Lending Clauses)"
            className="min-h-[80px]"
          />
        </div>

        {/* Important Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">Important Assumptions & Limitations</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Report is for first mortgage purposes only</li>
            <li>• Reliance restricted to named Lender and additional parties expressly noted</li>
            <li>• Subject property must always be treated as though GST is not applicable</li>
            <li>• Client should review Report regularly before reliance</li>
            <li>• Reasonable reliance period typically up to 90 days from valuation date</li>
            <li>• Report must be interpreted with PropertyPRO Supporting Memorandum</li>
          </ul>
        </div>

        {/* Supporting Memorandum Reference */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h4 className="font-medium text-primary mb-2">PropertyPRO Supporting Memorandum</h4>
          <p className="text-sm text-primary/80">
            "This Report is made in accordance with the PropertyPRO Supporting Memorandum and must be 
            interpreted with that Memorandum. The agreed parties are bound by the provisions of the 
            Supporting Memorandum which is available at www.api.org.au/propertypro"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};