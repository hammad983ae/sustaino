import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface PropertyPROSalesEvidenceProps {
  data?: any;
  onUpdate?: (data: any) => void;
  propertyType?: string;
}

interface SaleEvidence {
  address: string;
  saleDate: string;
  price: number;
  briefComments: string;
  comparisonToSubject: string;
  status: 'settled' | 'under-contract' | 'agent-advised';
}

export const PropertyPROSalesEvidence: React.FC<PropertyPROSalesEvidenceProps> = ({
  data = {},
  onUpdate,
  propertyType = 'house'
}) => {
  const handleInputChange = (field: string, value: any) => {
    const updatedData = { ...data, [field]: value };
    onUpdate?.(updatedData);
  };

  const handleSaleChange = (index: number, field: string, value: any) => {
    const sales = [...(data.salesEvidence || [])];
    sales[index] = { ...sales[index], [field]: value };
    handleInputChange('salesEvidence', sales);
  };

  const addSale = () => {
    const newSale: SaleEvidence = {
      address: '',
      saleDate: '',
      price: 0,
      briefComments: '',
      comparisonToSubject: '',
      status: 'settled'
    };
    const sales = [...(data.salesEvidence || []), newSale];
    handleInputChange('salesEvidence', sales);
  };

  const removeSale = (index: number) => {
    const sales = (data.salesEvidence || []).filter((_: any, i: number) => i !== index);
    handleInputChange('salesEvidence', sales);
  };

  const salesEvidence = data.salesEvidence || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Section 7 - Sales Evidence & the Market</CardTitle>
        <p className="text-sm text-muted-foreground">
          Minimum of three (3) comparable sales required. Sales evidence should be re-sales (not first sales from developer). 
          Kerbside inspection of all sales evidence is required.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sales Evidence */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Comparable Sales Evidence</h3>
            <Button onClick={addSale} size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Sale
            </Button>
          </div>

          {salesEvidence.map((sale: SaleEvidence, index: number) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Sale {index + 1}</h4>
                  <Button
                    onClick={() => removeSale(index)}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label>Address</Label>
                    <Input
                      value={sale.address || ''}
                      onChange={(e) => handleSaleChange(index, 'address', e.target.value)}
                      placeholder="Street address of sale property"
                    />
                  </div>
                  <div>
                    <Label>Sale Date</Label>
                    <Input
                      type="date"
                      value={sale.saleDate || ''}
                      onChange={(e) => handleSaleChange(index, 'saleDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Price ($)</Label>
                    <Input
                      type="number"
                      value={sale.price || ''}
                      onChange={(e) => handleSaleChange(index, 'price', parseInt(e.target.value) || 0)}
                      placeholder="Sale price"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <Label>Status</Label>
                  <Select 
                    value={sale.status || 'settled'} 
                    onValueChange={(value) => handleSaleChange(index, 'status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="settled">Settled Sale</SelectItem>
                      <SelectItem value="under-contract">Under Contract</SelectItem>
                      <SelectItem value="agent-advised">Agent Advised</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-4">
                  <Label>Brief Comments</Label>
                  <Textarea
                    value={sale.briefComments || ''}
                    onChange={(e) => handleSaleChange(index, 'briefComments', e.target.value)}
                    placeholder="Description of sale property including living/land areas, level/floor (for units), number of units in complex"
                    className="min-h-[80px]"
                  />
                </div>

                <div>
                  <Label>In Comparison to Subject</Label>
                  <Textarea
                    value={sale.comparisonToSubject || ''}
                    onChange={(e) => handleSaleChange(index, 'comparisonToSubject', e.target.value)}
                    placeholder="Compare location, view, accommodation, topography, aspect, improvements, site area, and conclude: superior, similar, or inferior"
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          {salesEvidence.length < 3 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-orange-700">
                <strong>Minimum Requirement:</strong> At least 3 comparable sales are required. 
                You currently have {salesEvidence.length} sale(s).
              </p>
            </div>
          )}
        </div>

        {/* Previous Sale of Subject Property */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Previous Sale of Subject Property (last 3 years)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="previousSaleDate">Previous Sale Date</Label>
              <Input
                id="previousSaleDate"
                type="date"
                value={data.previousSaleDate || ''}
                onChange={(e) => handleInputChange('previousSaleDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="previousSalePrice">Previous Sale Price ($)</Label>
              <Input
                id="previousSalePrice"
                type="number"
                value={data.previousSalePrice || ''}
                onChange={(e) => handleInputChange('previousSalePrice', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="previousSaleComments">Previous Sale Comments</Label>
            <Textarea
              id="previousSaleComments"
              value={data.previousSaleComments || ''}
              onChange={(e) => handleInputChange('previousSaleComments', e.target.value)}
              placeholder="Comment on previous sale and any changes to subject property or market"
              className="min-h-[60px]"
            />
          </div>
        </div>

        {/* Current/Proposed Sale */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Current/Proposed Sale of Subject Property</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currentSaleDate">Current Sale Date</Label>
              <Input
                id="currentSaleDate"
                type="date"
                value={data.currentSaleDate || ''}
                onChange={(e) => handleInputChange('currentSaleDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="currentSalePrice">Current Sale/Offer Price ($)</Label>
              <Input
                id="currentSalePrice"
                type="number"
                value={data.currentSalePrice || ''}
                onChange={(e) => handleInputChange('currentSalePrice', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="saleInLineWithMarket">Current Sale in line with current local Market?</Label>
            <Select value={data.saleInLineWithMarket || ''} onValueChange={(value) => handleInputChange('saleInLineWithMarket', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
            {data.saleInLineWithMarket === 'no' && (
              <p className="text-sm text-orange-600 mt-2">
                If No, trigger Market Segment Conditions Risk Rating and provide specific comment in Section 8.
              </p>
            )}
          </div>
        </div>

        {/* Contract of Sale */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contract of Sale Information</h3>
          
          <div>
            <Label htmlFor="contractSighted">Copy of Full Contract of Sale sighted?</Label>
            <Select value={data.contractSighted || ''} onValueChange={(value) => handleInputChange('contractSighted', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="contractDocuments">Contract/Transfer/Offer Documents Sighted</Label>
            <Textarea
              id="contractDocuments"
              value={data.contractDocuments || ''}
              onChange={(e) => handleInputChange('contractDocuments', e.target.value)}
              placeholder="Note what documentation has been provided/sighted and relied upon"
              className="min-h-[60px]"
            />
          </div>

          <div>
            <Label htmlFor="sellingPeriod">Selling Period greater than 6 months?</Label>
            <Select value={data.sellingPeriod || ''} onValueChange={(value) => handleInputChange('sellingPeriod', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
            {data.sellingPeriod === 'yes' && (
              <p className="text-sm text-orange-600 mt-2">
                If Yes, provide comment in Section 8 and trigger Market Segment Conditions Risk Rating.
              </p>
            )}
          </div>
        </div>

        {/* Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">Sales Evidence Guidelines</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Sales evidence should ideally be within 6 months of valuation date</li>
            <li>• Sales should be within 15% (plus or minus) of adopted market value</li>
            <li>• For new units/apartments/townhouses, minimum 3 re-sales external to subject development</li>
            <li>• Consider significant ESG attributes that cause value differentiation</li>
            <li>• Use terms 'superior', 'similar', or 'inferior' in comparison conclusions</li>
            <li>• All sales evidence requires kerbside inspection by valuer</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};