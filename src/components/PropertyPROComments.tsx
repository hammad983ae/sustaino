import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Info } from 'lucide-react';

interface PropertyPROCommentsProps {
  data?: any;
  onUpdate?: (data: any) => void;
}

export const PropertyPROComments: React.FC<PropertyPROCommentsProps> = ({
  data = {},
  onUpdate
}) => {
  const handleInputChange = (field: string, value: any) => {
    const updatedData = { ...data, [field]: value };
    onUpdate?.(updatedData);
  };

  const handleVRAChange = (vra: string, checked: boolean) => {
    const vraData = { ...(data.valuationRiskAlerts || {}), [vra]: checked };
    handleInputChange('valuationRiskAlerts', vraData);
  };

  const vraData = data.valuationRiskAlerts || {};
  const hasVRASelected = Object.values(vraData).some((value: any) => value === true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Section 8 - Additional Comments</CardTitle>
        <p className="text-sm text-muted-foreground">
          Comments should follow the order: (1) Amended Report comments, (2) Subject Property commentary, 
          (3) Additional comments, (4) Risk Rating commentary, (5) VRA and comments.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Amended Report Comments */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Checkbox
              id="amendedReport"
              checked={data.isAmendedReport || false}
              onCheckedChange={(checked) => handleInputChange('isAmendedReport', checked)}
            />
            <Label htmlFor="amendedReport">This is an Amended Report</Label>
          </div>
          {data.isAmendedReport && (
            <div className="space-y-3">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-orange-800">Amended Report</span>
                </div>
                <p className="text-sm text-orange-700">
                  Ensure 'Amended Report' is clearly marked on front page and provide summary of changes.
                </p>
              </div>
              <Textarea
                placeholder="Provide summary of changes made to the report"
                value={data.amendedReportSummary || ''}
                onChange={(e) => handleInputChange('amendedReportSummary', e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          )}
        </div>

        {/* Subject Property Commentary */}
        <div>
          <Label htmlFor="subjectPropertyCommentary">Subject Property Commentary</Label>
          <Textarea
            id="subjectPropertyCommentary"
            value={data.subjectPropertyCommentary || ''}
            onChange={(e) => handleInputChange('subjectPropertyCommentary', e.target.value)}
            placeholder="Additional comments about the subject property"
            className="min-h-[120px]"
          />
        </div>

        {/* Additional Comments */}
        <div>
          <Label htmlFor="additionalComments">Additional Comments</Label>
          <Textarea
            id="additionalComments"
            value={data.additionalComments || ''}
            onChange={(e) => handleInputChange('additionalComments', e.target.value)}
            placeholder="Any additional comments that enhance or elaborate on other sections"
            className="min-h-[120px]"
          />
        </div>

        {/* Risk Rating Commentary */}
        <div>
          <Label htmlFor="riskRatingCommentary">Risk Rating Commentary</Label>
          <Textarea
            id="riskRatingCommentary"
            value={data.riskRatingCommentary || ''}
            onChange={(e) => handleInputChange('riskRatingCommentary', e.target.value)}
            placeholder="Commentary for any risk ratings of 3, 4, or 5 (REQUIRED for ratings ≥3)"
            className="min-h-[120px]"
          />
          <p className="text-sm text-orange-600 mt-1">
            Required for any risk ratings of 3, 4, or 5 from Section 2 - Risk Analysis
          </p>
        </div>

        {/* Valuation Risk Alerts (VRA) */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Valuation Risk Alerts (VRA)</h3>
          <p className="text-sm text-muted-foreground">
            Address whether the property is affected by any Valuation Risk Alerts. 
            A 'yes' response requires further comment below.
          </p>

          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="vra1"
                checked={vraData.higherRiskProperty || false}
                onCheckedChange={(checked) => handleVRAChange('higherRiskProperty', !!checked)}
              />
              <Label htmlFor="vra1" className="text-sm leading-relaxed">
                Does the subject property comprise a higher risk or a non-residential property type?
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="vra2"
                checked={vraData.adverseMarketability || false}
                onCheckedChange={(checked) => handleVRAChange('adverseMarketability', !!checked)}
              />
              <Label htmlFor="vra2" className="text-sm leading-relaxed">
                Are there any adverse marketability issues that would require an extended selling period of more than 6 months?
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="vra3"
                checked={vraData.incompleteImprovements || false}
                onCheckedChange={(checked) => handleVRAChange('incompleteImprovements', !!checked)}
              />
              <Label htmlFor="vra3" className="text-sm leading-relaxed">
                Are the existing improvements on the property incomplete, under construction or requiring essential repairs?
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="vra4"
                checked={vraData.criticallyAffected || false}
                onCheckedChange={(checked) => handleVRAChange('criticallyAffected', !!checked)}
              />
              <Label htmlFor="vra4" className="text-sm leading-relaxed">
                Is the subject property critically affected by any Heritage, location or environmental issues?
              </Label>
            </div>
          </div>

          {hasVRASelected && (
            <div>
              <Label htmlFor="vraComments">VRA Comments (Required for selected alerts)</Label>
              <Textarea
                id="vraComments"
                value={data.vraComments || ''}
                onChange={(e) => handleInputChange('vraComments', e.target.value)}
                placeholder="Provide detailed comments for each selected Valuation Risk Alert"
                className="min-h-[120px]"
              />
            </div>
          )}
        </div>

        {/* ESG Attributes */}
        <div>
          <Label htmlFor="esgAttributes">ESG Attributes</Label>
          <Textarea
            id="esgAttributes"
            value={data.esgAttributes || ''}
            onChange={(e) => handleInputChange('esgAttributes', e.target.value)}
            placeholder="Reference significant positive or negative ESG factors/attributes noted at inspection and whether market shows measurable value variation driven by ESG factors (per International Valuation Standards effective 31 Jan 2025)"
            className="min-h-[100px]"
          />
          <p className="text-sm text-blue-600 mt-1">
            Required per International Valuation Standards (effective 31 Jan 2025) - ESG attribute assessment
          </p>
        </div>

        {/* Vacant Land Considerations */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Checkbox
              id="vacantLand"
              checked={data.isVacantLand || false}
              onCheckedChange={(checked) => handleInputChange('isVacantLand', checked)}
            />
            <Label htmlFor="vacantLand">Vacant Residential Land Valuation</Label>
          </div>
          {data.isVacantLand && (
            <div className="space-y-3">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 mb-2">Vacant Land Valuation Considerations</h4>
                <p className="text-sm text-amber-700">
                  When valuing vacant residential land, be aware of potential restrictions on re-sale, 
                  bonding arrangements, and completion requirements.
                </p>
              </div>
              <Textarea
                placeholder="Comment on re-sale restrictions, bonding arrangements, completion of roads/services, and any conditions affecting valuation"
                value={data.vacantLandComments || ''}
                onChange={(e) => handleInputChange('vacantLandComments', e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          )}
        </div>

        {/* Additional Comment Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">Additional Comments Guidelines</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Comments can be in narrative or dot point form</li>
            <li>• Enhance or elaborate on other sections, don't merely repeat</li>
            <li>• Address unusual aspects not covered by report format</li>
            <li>• Include required commentary for risk ratings ≥3</li>
            <li>• Address all selected Valuation Risk Alerts</li>
            <li>• Consider ESG factors per International Valuation Standards</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};