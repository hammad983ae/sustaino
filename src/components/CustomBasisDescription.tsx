import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CustomBasisDescriptionProps {
  onBasisChange?: (basis: string) => void;
  initialBasis?: string;
}

export const CustomBasisDescription: React.FC<CustomBasisDescriptionProps> = ({
  onBasisChange,
  initialBasis
}) => {
  const [valueComponent, setValueComponent] = useState<string>('');
  const [interestedParty, setInterestedParty] = useState<string>('');
  const [generatedBasis, setGeneratedBasis] = useState<string>('');

  const valueComponentOptions = [
    { value: 'market value', label: 'Market Value' },
    { value: 'forced sale value', label: 'Forced Sale Value' },
    { value: 'insurance replacement value', label: 'Insurance Replacement Value' },
    { value: 'depreciated replacement cost', label: 'Depreciated Replacement Cost' },
    { value: 'going concern value', label: 'Going Concern Value' },
    { value: 'liquidation value', label: 'Liquidation Value' }
  ];

  const interestedPartyOptions = [
    { value: 'willing buyer and willing seller', label: 'Willing Buyer and Willing Seller' },
    { value: 'mortgagee in possession', label: 'Mortgagee in Possession' },
    { value: 'insurance purposes', label: 'Insurance Purposes' },
    { value: 'family law settlement', label: 'Family Law Settlement' },
    { value: 'taxation purposes', label: 'Taxation Purposes' },
    { value: 'compulsory acquisition', label: 'Compulsory Acquisition' },
    { value: 'deceased estate', label: 'Deceased Estate' }
  ];

  useEffect(() => {
    if (valueComponent && interestedParty) {
      const basis = `Valued on a ${valueComponent} ${interestedParty} basis, assuming a reasonable marketing period.`;
      setGeneratedBasis(basis);
      onBasisChange?.(basis);
    } else {
      setGeneratedBasis('');
      onBasisChange?.('');
    }
  }, [valueComponent, interestedParty, onBasisChange]);

  useEffect(() => {
    if (initialBasis) {
      setGeneratedBasis(initialBasis);
    }
  }, [initialBasis]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Basis of Valuation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="value-component">Value Component</Label>
            <Select value={valueComponent} onValueChange={setValueComponent}>
              <SelectTrigger>
                <SelectValue placeholder="Select value component..." />
              </SelectTrigger>
              <SelectContent>
                {valueComponentOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interested-party">Interested Party Basis</Label>
            <Select value={interestedParty} onValueChange={setInterestedParty}>
              <SelectTrigger>
                <SelectValue placeholder="Select interested party basis..." />
              </SelectTrigger>
              <SelectContent>
                {interestedPartyOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {generatedBasis && (
          <div className="space-y-2">
            <Label>Generated Basis Description</Label>
            <Textarea
              value={generatedBasis}
              readOnly
              className="bg-muted/50 border-dashed"
              rows={3}
            />
          </div>
        )}

        {!generatedBasis && (
          <div className="text-sm text-muted-foreground p-4 bg-muted/30 rounded-md">
            Select both value component and interested party basis to generate the description.
          </div>
        )}
      </CardContent>
    </Card>
  );
};