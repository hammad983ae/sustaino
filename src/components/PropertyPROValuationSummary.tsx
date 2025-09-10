import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface PropertyPROValuationSummaryProps {
  data?: any;
  onUpdate?: (data: any) => void;
  isTBE?: boolean;
}

export const PropertyPROValuationSummary: React.FC<PropertyPROValuationSummaryProps> = ({
  data = {},
  onUpdate,
  isTBE = false
}) => {
  const handleInputChange = (field: string, value: any) => {
    const updatedData = { ...data, [field]: value };
    onUpdate?.(updatedData);
  };

  const convertNumberToWords = (num: number): string => {
    // Simple number to words conversion for demonstration
    // In production, use a proper library like 'number-to-words'
    return `${num.toLocaleString()} dollars`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Section 3 - Valuation and Assessments Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Interest Valued */}
        <div>
          <Label htmlFor="interestValued">Interest Valued</Label>
          <Select value={data.interestValued || ''} onValueChange={(value) => handleInputChange('interestValued', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select interest type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fee-simple">Fee Simple Vacant Possession (including Chattels)</SelectItem>
              <SelectItem value="long-term-lease">Subject to Long Term Lease (including Chattels)</SelectItem>
              <SelectItem value="crown-leasehold">Crown Leasehold (including Chattels)</SelectItem>
              <SelectItem value="company-title">Shares in a Company Title Development (including Chattels)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Value Component */}
        <div>
          <Label htmlFor="valueComponent">Value Component</Label>
          <Select value={data.valueComponent || ''} onValueChange={(value) => handleInputChange('valueComponent', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select value component..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="existing">Existing property</SelectItem>
              <SelectItem value="as-if-complete">As If Complete</SelectItem>
            </SelectContent>
          </Select>
          {data.valueComponent === 'as-if-complete' && (
            <p className="text-sm text-orange-600 mt-2">
              Valuer should recommend additional inspection prior to settlement to confirm completion.
            </p>
          )}
        </div>

        {/* Market Value */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="landValue">Land Value ($)</Label>
              <Input
                id="landValue"
                type="number"
                value={data.landValue || ''}
                onChange={(e) => handleInputChange('landValue', parseInt(e.target.value) || 0)}
                placeholder="Land component value"
              />
            </div>
            <div>
              <Label htmlFor="improvementsValue">Improvements Value ($)</Label>
              <Input
                id="improvementsValue"
                type="number"
                value={data.improvementsValue || ''}
                onChange={(e) => handleInputChange('improvementsValue', parseInt(e.target.value) || 0)}
                placeholder="Improvements component value"
              />
            </div>
            <div>
              <Label htmlFor="totalMarketValue">Total Market Value ($)</Label>
              <Input
                id="totalMarketValue"
                type="number"
                value={data.totalMarketValue || (data.landValue || 0) + (data.improvementsValue || 0)}
                onChange={(e) => handleInputChange('totalMarketValue', parseInt(e.target.value) || 0)}
                className="font-semibold"
              />
            </div>
          </div>

          {/* Market Value in Words */}
          <div>
            <Label htmlFor="marketValueWords">Market Value in Words</Label>
            <Input
              id="marketValueWords"
              value={data.marketValueWords || (data.totalMarketValue ? convertNumberToWords(data.totalMarketValue) : '')}
              onChange={(e) => handleInputChange('marketValueWords', e.target.value)}
              placeholder="Market value written in words"
              className="italic"
            />
          </div>
        </div>

        {/* Basis and Premise of Value */}
        <div className="space-y-4">
          <div>
            <Label>Basis of Value</Label>
            <div className="p-3 bg-muted rounded-md text-sm">
              <strong>Market Value</strong> - "The estimated amount for which an asset or liability should 
              exchange on the valuation date between a willing buyer and a willing seller in an arm's length 
              transaction, after proper marketing and where the parties had each acted knowledgeably, 
              prudently and without compulsion." (IVSC definition adopted by API)
            </div>
          </div>

          <div>
            <Label>Premise of Value</Label>
            <div className="p-3 bg-muted rounded-md text-sm">
              <strong>Highest and Best Use</strong> - "The use of an asset that would produce the highest 
              value and must be physically possible, legally permissible and financially feasible."
            </div>
          </div>
        </div>

        {/* Rental Assessment */}
        <div>
          <Label htmlFor="rentalAssessment">Rental Assessment (Unfurnished) - Weekly ($)</Label>
          <Input
            id="rentalAssessment"
            type="number"
            value={data.rentalAssessment || ''}
            onChange={(e) => handleInputChange('rentalAssessment', parseInt(e.target.value) || 0)}
            placeholder="Estimated weekly market rental"
          />
          <p className="text-xs text-muted-foreground mt-1">
            If unsuitable for rent, enter "Not Suitable for Rent"
          </p>
        </div>

        {/* Insurance Assessment */}
        <div>
          <Label htmlFor="insuranceAssessment">Insurance Assessment ($)</Label>
          <Input
            id="insuranceAssessment"
            type="number"
            value={data.insuranceAssessment || ''}
            onChange={(e) => handleInputChange('insuranceAssessment', parseInt(e.target.value) || 0)}
            placeholder="Estimated replacement cost including allowances"
          />
          <p className="text-xs text-muted-foreground mt-1">
            For units, use "Body Corporate Responsibility". For heritage properties requiring expert advice, use "Expert Advice Recommended"
          </p>
        </div>

        {/* Unit-specific fields */}
        {data.propertyType === 'unit' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="unitsInDevelopment">Units/Lots in Development</Label>
              <Input
                id="unitsInDevelopment"
                type="number"
                value={data.unitsInDevelopment || ''}
                onChange={(e) => handleInputChange('unitsInDevelopment', parseInt(e.target.value) || 0)}
                placeholder="Total units in development"
              />
            </div>
            <div>
              <Label htmlFor="unitEntitlement">Unit/Lot Entitlement</Label>
              <Input
                id="unitEntitlement"
                value={data.unitEntitlement || ''}
                onChange={(e) => handleInputChange('unitEntitlement', e.target.value)}
                placeholder="e.g. 123 out of 1000"
              />
            </div>
          </div>
        )}

        {/* Documents to be Sighted */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Checkbox
              id="documentsRequired"
              checked={data.documentsRequired || false}
              onCheckedChange={(checked) => handleInputChange('documentsRequired', checked)}
            />
            <Label htmlFor="documentsRequired">Are there any documents to be sighted by the Client?</Label>
          </div>
          {data.documentsRequired && (
            <Textarea
              placeholder="List documents to be sighted by the Client (to be detailed in Section 8)"
              value={data.documentsList || ''}
              onChange={(e) => handleInputChange('documentsList', e.target.value)}
              className="min-h-[100px]"
            />
          )}
        </div>

        {/* Valuer Declaration */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Valuer Declaration</h4>
          <div className="space-y-4">
            <div>
              <Label htmlFor="inspectionDate">Inspection/Valuation Date</Label>
              <Input
                id="inspectionDate"
                type="date"
                value={data.inspectionDate || ''}
                onChange={(e) => handleInputChange('inspectionDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="issueDate">Date of Issue</Label>
              <Input
                id="issueDate"
                type="date"
                value={data.issueDate || ''}
                onChange={(e) => handleInputChange('issueDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="valuer">Valuer</Label>
              <Input
                id="valuer"
                value={data.valuer || ''}
                onChange={(e) => handleInputChange('valuer', e.target.value)}
                placeholder="Name, qualifications, certifications and API membership number"
              />
            </div>
            <div>
              <Label htmlFor="counterSignatory">Counter Signatory (if required)</Label>
              <Input
                id="counterSignatory"
                value={data.counterSignatory || ''}
                onChange={(e) => handleInputChange('counterSignatory', e.target.value)}
                placeholder="Supervising Member details (if applicable)"
              />
            </div>
            <div>
              <Label htmlFor="valuationFirm">Valuation Firm</Label>
              <Input
                id="valuationFirm"
                value={data.valuationFirm || ''}
                onChange={(e) => handleInputChange('valuationFirm', e.target.value)}
                placeholder="Name of valuation firm"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};