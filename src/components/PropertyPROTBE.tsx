import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Info } from 'lucide-react';

interface PropertyPROTBEProps {
  data?: any;
  onUpdate?: (data: any) => void;
}

export const PropertyPROTBE: React.FC<PropertyPROTBEProps> = ({
  data = {},
  onUpdate
}) => {
  const handleInputChange = (field: string, value: any) => {
    const updatedData = { ...data, [field]: value };
    onUpdate?.(updatedData);
  };

  const contractPrice = parseFloat(data.contractPrice) || 0;
  const checkCost = parseFloat(data.checkCost) || 0;
  const costDifference = Math.abs(contractPrice - checkCost);
  const isSignificantDifference = costDifference > (contractPrice * 0.1); // 10% threshold

  return (
    <Card>
      <CardHeader>
        <CardTitle>TBE (To Be Erected) / Construction Report</CardTitle>
        <p className="text-sm text-muted-foreground">
          Valuation on 'As if Complete' basis as at the date of inspection/valuation
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Builder Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="builder">Builder</Label>
            <Input
              id="builder"
              value={data.builder || ''}
              onChange={(e) => handleInputChange('builder', e.target.value)}
              placeholder="Primary builder contracted for construction"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ownerBuilder"
              checked={data.ownerBuilder || false}
              onCheckedChange={(checked) => handleInputChange('ownerBuilder', checked)}
            />
            <Label htmlFor="ownerBuilder">Owner Builder</Label>
          </div>
        </div>

        {/* Contract Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contractPrice">Contract/Tender Price ($)</Label>
            <Input
              id="contractPrice"
              type="number"
              value={data.contractPrice || ''}
              onChange={(e) => handleInputChange('contractPrice', e.target.value)}
              placeholder="Building contract price including variations"
            />
          </div>
          <div>
            <Label htmlFor="contractDate">Contract/Tender Date</Label>
            <Input
              id="contractDate"
              type="date"
              value={data.contractDate || ''}
              onChange={(e) => handleInputChange('contractDate', e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use "Undated" if documentation provided is not dated
            </p>
          </div>
        </div>

        {/* Check Cost */}
        <div>
          <Label htmlFor="checkCost">Check Cost ($)</Label>
          <Input
            id="checkCost"
            type="number"
            value={data.checkCost || ''}
            onChange={(e) => handleInputChange('checkCost', e.target.value)}
            placeholder="Valuer's cost assessment or 'Expert Advice Recommended'"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Only provide where adequate cost indicators available. Express as whole $ figure, not rate per sqm.
          </p>
          
          {/* Check Cost Comparison */}
          {contractPrice > 0 && checkCost > 0 && (
            <div className={`mt-2 p-3 rounded-lg ${isSignificantDifference ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
              <div className="flex items-center gap-2">
                {isSignificantDifference ? <AlertTriangle className="h-4 w-4 text-orange-600" /> : <Info className="h-4 w-4 text-green-600" />}
                <span className={`text-sm font-medium ${isSignificantDifference ? 'text-orange-800' : 'text-green-800'}`}>
                  Cost Comparison
                </span>
              </div>
              <p className={`text-sm mt-1 ${isSignificantDifference ? 'text-orange-700' : 'text-green-700'}`}>
                Difference: ${costDifference.toLocaleString()} ({((costDifference / contractPrice) * 100).toFixed(1)}%)
                {isSignificantDifference && ' - Significant difference requires comment in Section 8'}
              </p>
            </div>
          )}
        </div>

        {/* Out of Contract Items */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="outOfContractItems"
              checked={data.outOfContractItems || false}
              onCheckedChange={(checked) => handleInputChange('outOfContractItems', checked)}
            />
            <Label htmlFor="outOfContractItems">Out of Contract Items</Label>
          </div>
          
          {data.outOfContractItems && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="outOfContractTotal">Out of Contract Items Total Price ($)</Label>
                <Input
                  id="outOfContractTotal"
                  type="number"
                  value={data.outOfContractTotal || ''}
                  onChange={(e) => handleInputChange('outOfContractTotal', e.target.value)}
                  placeholder="Sum of all out of contract items"
                />
              </div>
              <div>
                <Label htmlFor="outOfContractList">Out of Contract Items List</Label>
                <Textarea
                  id="outOfContractList"
                  value={data.outOfContractList || ''}
                  onChange={(e) => handleInputChange('outOfContractList', e.target.value)}
                  placeholder="Itemised list of out of contract items (to be included in Section 8)"
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Information Supplied to Valuer */}
        <div className="space-y-4">
          <h4 className="font-medium">Information Supplied to the Valuer</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="approvedPlans"
                checked={data.approvedPlans || false}
                onCheckedChange={(checked) => handleInputChange('approvedPlans', checked)}
              />
              <Label htmlFor="approvedPlans">Council Approved/Endorsed Plans</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="specifications"
                checked={data.specifications || false}
                onCheckedChange={(checked) => handleInputChange('specifications', checked)}
              />
              <Label htmlFor="specifications">Detailed Specifications</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="documentationNotes">Documentation Notes</Label>
            <Textarea
              id="documentationNotes"
              value={data.documentationNotes || ''}
              onChange={(e) => handleInputChange('documentationNotes', e.target.value)}
              placeholder="Indicate what information has been supplied and whether plans/specifications are Council approved/endorsed"
              className="min-h-[80px]"
            />
          </div>
        </div>

        {/* Progress Payment Schedule Assessment */}
        {!data.ownerBuilder && (
          <div className="space-y-4">
            <h4 className="font-medium">Progress Payment Schedule Assessment</h4>
            
            <div>
              <Label htmlFor="progressScheduleCompliance">Progress Schedule Compliance</Label>
              <Select value={data.progressScheduleCompliance || ''} onValueChange={(value) => handleInputChange('progressScheduleCompliance', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select compliance status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compliant">Complies with legislative/industry parameters</SelectItem>
                  <SelectItem value="non-compliant-legislative">Outside legislative parameters</SelectItem>
                  <SelectItem value="non-compliant-industry">Outside industry standards</SelectItem>
                  <SelectItem value="not-provided">Progress schedule not provided</SelectItem>
                  <SelectItem value="incomplete">Does not reflect final contract price</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {data.progressScheduleCompliance && !['compliant', 'not-provided'].includes(data.progressScheduleCompliance) && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-orange-800">Non-Compliant Progress Schedule</span>
                </div>
                <p className="text-sm text-orange-700">
                  This progress payment schedule requires comment in Section 8 and appropriate risk rating adjustment.
                  Recommend Lender/LMI make enquiries about the contract between borrower and builder.
                </p>
              </div>
            )}

            <div>
              <Label htmlFor="progressScheduleDetails">Progress Schedule Details</Label>
              <Textarea
                id="progressScheduleDetails"
                value={data.progressScheduleDetails || ''}
                onChange={(e) => handleInputChange('progressScheduleDetails', e.target.value)}
                placeholder="Note agreed progress payment schedule and any deviations from standard parameters"
                className="min-h-[80px]"
              />
            </div>
          </div>
        )}

        {/* TBE Specific Warnings */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">TBE Valuation Requirements</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Valuation assumes completion to tradesman-like manner in accordance with provided plans/specifications</li>
            <li>• All TBE valuations require Medium to High risk rating (3) for Improvements</li>
            <li>• Additional inspection recommended prior to settlement to confirm completion</li>
            <li>• For staged developments, assumes whole development completed as at valuation date</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};