import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface PropertyPROProgressProps {
  data?: any;
  onUpdate?: (data: any) => void;
}

export const PropertyPROProgress: React.FC<PropertyPROProgressProps> = ({
  data = {},
  onUpdate
}) => {
  const handleInputChange = (field: string, value: any) => {
    const updatedData = { ...data, [field]: value };
    onUpdate?.(updatedData);
  };

  const contractPrice = parseFloat(data.contractPrice) || 0;
  const costToDate = parseFloat(data.costToDate) || 0;
  const costToComplete = contractPrice - costToDate;
  const worksCompleted = contractPrice > 0 ? (costToDate / contractPrice) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>PropertyPRO Progress Inspection Report</CardTitle>
        <p className="text-sm text-muted-foreground">
          Progress payment inspections are undertaken in our capacity as Valuers, not as building 
          inspectors or building experts, and do not constitute a structural survey or building report.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Property Address */}
        <div>
          <Label htmlFor="propertyAddress">Property Address</Label>
          <Input
            id="propertyAddress"
            value={data.propertyAddress || ''}
            onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
            placeholder="Full street address including locality, state and postcode"
          />
        </div>

        {/* Primary Building Contract */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Primary Building Contract</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="approvedPlansSighted"
                checked={data.approvedPlansSighted || false}
                onCheckedChange={(checked) => handleInputChange('approvedPlansSighted', checked)}
              />
              <Label htmlFor="approvedPlansSighted">Approved/Endorsed Plans Sighted?</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="buildingContractSighted"
                checked={data.buildingContractSighted || false}
                onCheckedChange={(checked) => handleInputChange('buildingContractSighted', checked)}
              />
              <Label htmlFor="buildingContractSighted">Fully Executed Building Contract Sighted?</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ownerBuilder"
                checked={data.ownerBuilder || false}
                onCheckedChange={(checked) => handleInputChange('ownerBuilder', checked)}
              />
              <Label htmlFor="ownerBuilder">Owner Builder?</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="contractPrice">Contract Price ($)</Label>
            <Input
              id="contractPrice"
              type="number"
              value={data.contractPrice || ''}
              onChange={(e) => handleInputChange('contractPrice', e.target.value)}
              placeholder="Contract price including variations (excluding out of contract items)"
            />
          </div>
        </div>

        {/* Progress Assessment */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Progress Assessment</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="worksCompletedPercent">Works Completed (%)</Label>
              <Input
                id="worksCompletedPercent"
                type="number"
                min="0"
                max="100"
                value={worksCompleted.toFixed(1)}
                readOnly
                className="bg-muted"
              />
              <Progress value={worksCompleted} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="costToDate">Cost to Date ($)</Label>
              <Input
                id="costToDate"
                type="number"
                value={data.costToDate || ''}
                onChange={(e) => handleInputChange('costToDate', e.target.value)}
                placeholder="Total cost of works substantially completed"
              />
            </div>
            <div>
              <Label htmlFor="costToComplete">Cost to Complete ($)</Label>
              <Input
                id="costToComplete"
                type="number"
                value={costToComplete.toFixed(2)}
                readOnly
                className="bg-muted"
                placeholder="Balance to contract"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="currentScheduledPayment">Current Scheduled Payment ($)</Label>
            <Input
              id="currentScheduledPayment"
              type="number"
              value={data.currentScheduledPayment || ''}
              onChange={(e) => handleInputChange('currentScheduledPayment', e.target.value)}
              placeholder="Current amount claimed by builder for works completed"
            />
          </div>

          <div>
            <Label htmlFor="paymentType">Payment Type</Label>
            <Select value={data.paymentType || ''} onValueChange={(value) => handleInputChange('paymentType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="progress">Progress Payment</SelectItem>
                <SelectItem value="practical-completion">Practical Completion</SelectItem>
                <SelectItem value="final">Final Payment</SelectItem>
                <SelectItem value="variation">Variation Payment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Progress and Final Comments */}
        <div>
          <Label htmlFor="progressComments">'Progress' and 'Final' Comments</Label>
          <Textarea
            id="progressComments"
            value={data.progressComments || ''}
            onChange={(e) => handleInputChange('progressComments', e.target.value)}
            placeholder="Additional information/comments regarding current progress inspection and/or discussion around approved/endorsed plans"
            className="min-h-[120px]"
          />
        </div>

        {/* Out of Contract Items */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Out of Contract Items</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="outOfContractTotal">Out of Contract Items Total Price ($)</Label>
              <Input
                id="outOfContractTotal"
                type="number"
                value={data.outOfContractTotal || ''}
                onChange={(e) => handleInputChange('outOfContractTotal', e.target.value)}
                placeholder="Sum of all out of contract items from original TBE report"
              />
            </div>
            <div>
              <Label htmlFor="currentAppropriatePayments">Current Appropriate Payment(s) ($)</Label>
              <Input
                id="currentAppropriatePayments"
                type="number"
                value={data.currentAppropriatePayments || ''}
                onChange={(e) => handleInputChange('currentAppropriatePayments', e.target.value)}
                placeholder="Current amount for out of contract works completed"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="outOfContractComments">Out of Contract Works Comments</Label>
            <Textarea
              id="outOfContractComments"
              value={data.outOfContractComments || ''}
              onChange={(e) => handleInputChange('outOfContractComments', e.target.value)}
              placeholder="List out of contract works completed and dollar amounts deemed appropriate for payment"
              className="min-h-[100px]"
            />
          </div>
        </div>

        {/* Payment Recommendation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Payment Recommendation</h3>
          
          <div>
            <Label htmlFor="paymentRecommendation">Payment Recommendation</Label>
            <Select value={data.paymentRecommendation || ''} onValueChange={(value) => handleInputChange('paymentRecommendation', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select recommendation..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approve-full">Approve Full Payment</SelectItem>
                <SelectItem value="approve-partial">Approve Partial Payment</SelectItem>
                <SelectItem value="approve-practical">Approve Practical Completion (with conditions)</SelectItem>
                <SelectItem value="decline">Decline Payment</SelectItem>
                <SelectItem value="conditional">Conditional Approval</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {data.paymentRecommendation === 'approve-practical' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">Practical Completion Payment</span>
              </div>
              <p className="text-sm text-yellow-700">
                Construction works have substantially reached 'practical completion' except for installation of specific items. 
                Recommend borrower confirm satisfactory completion prior to handover.
              </p>
            </div>
          )}

          {data.paymentRecommendation === 'decline' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="font-medium text-red-800">Payment Not Recommended</span>
              </div>
              <p className="text-sm text-red-700">
                Building works do not appear to be completed for the current progress claim. 
                Please provide additional comments explaining the reasons for declining payment.
              </p>
            </div>
          )}

          <div>
            <Label htmlFor="recommendationComments">Recommendation Comments</Label>
            <Textarea
              id="recommendationComments"
              value={data.recommendationComments || ''}
              onChange={(e) => handleInputChange('recommendationComments', e.target.value)}
              placeholder="Detailed comments supporting the payment recommendation"
              className="min-h-[100px]"
            />
          </div>
        </div>

        {/* Inspection Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Inspection Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="inspectionDate">Inspection Date</Label>
              <Input
                id="inspectionDate"
                type="date"
                value={data.inspectionDate || ''}
                onChange={(e) => handleInputChange('inspectionDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="inspectedBy">Inspected By</Label>
              <Input
                id="inspectedBy"
                value={data.inspectedBy || ''}
                onChange={(e) => handleInputChange('inspectedBy', e.target.value)}
                placeholder="Valuer name and credentials"
              />
            </div>
          </div>
        </div>

        {/* Progress Inspection Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">Progress Inspection Guidelines</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Valuer's role is to assess if construction stage appears substantially completed per agreed progress schedule</li>
            <li>• If works do not appear completed for current claim, do not confirm part payment</li>
            <li>• Exception: Practical completion where some items may not be installed due to security issues</li>
            <li>• Include photographs showing extent of works completed and any unfinished works</li>
            <li>• Progress payments should not be undertaken if contract lacks fixed/defined stage progress draws</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};