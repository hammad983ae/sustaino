import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Bot, Zap, Info } from 'lucide-react';
import { useAutomatedRiskAssessment } from '@/hooks/useAutomatedRiskAssessment';

interface PropertyPRORiskAnalysisProps {
  data?: any;
  onUpdate?: (data: any) => void;
  propertyData?: any; // Full property data for AI analysis
}

export const PropertyPRORiskAnalysis: React.FC<PropertyPRORiskAnalysisProps> = ({
  data = {},
  onUpdate,
  propertyData
}) => {
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const { assessRisks, convertToRiskRatings, isLoading } = useAutomatedRiskAssessment();

  const handleRatingChange = (category: string, rating: number) => {
    const updatedData = { ...data, [category]: rating };
    onUpdate?.(updatedData);
  };

  const handleAIAssessment = async () => {
    if (!propertyData || Object.keys(propertyData).length === 0) {
      alert('Please fill in property details first before running AI risk assessment.');
      return;
    }

    const assessment = await assessRisks(propertyData);
    if (assessment) {
      const riskRatings = convertToRiskRatings(assessment);
      onUpdate?.(riskRatings);
      setShowAIAnalysis(true);
    }
  };

  const getRiskColor = (rating: number) => {
    if (rating <= 1) return 'bg-green-500';
    if (rating <= 2) return 'bg-yellow-500';
    if (rating <= 3) return 'bg-orange-500';
    if (rating <= 4) return 'bg-red-500';
    return 'bg-red-700';
  };

  const getRiskLabel = (rating: number) => {
    if (rating <= 1) return 'Low risk - no readily identifiable adverse issue';
    if (rating <= 2) return 'Low to Medium risk - minor adverse issue only not warranting comment';
    if (rating <= 3) return 'Medium risk - there is an issue for the Client to note';
    if (rating <= 4) return 'Medium to High risk - there is an important adverse issue in the Report';
    return 'High risk - there is an extremely important/urgent adverse issue';
  };

  const propertyRiskCategories = [
    { key: 'location', label: 'Location / Neighbourhood' },
    { key: 'land', label: 'Land (including planning, Title)' },
    { key: 'environmental', label: 'Environmental Issues' },
    { key: 'improvements', label: 'Improvements' }
  ];

  const marketRiskCategories = [
    { key: 'marketDirection', label: 'Market Direction (price)' },
    { key: 'marketActivity', label: 'Market Activity' },
    { key: 'localEconomy', label: 'Local/Regional Economy Impact' },
    { key: 'marketSegment', label: 'Market Segment Conditions' }
  ];

  const RiskRatingSelector = ({ category, label, value }: { category: string, label: string, value?: number }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => handleRatingChange(category, rating)}
            className={`
              h-8 w-full rounded text-xs font-medium transition-colors
              ${value === rating 
                ? `${getRiskColor(rating)} text-white` 
                : 'bg-muted hover:bg-muted-hover text-muted-foreground'
              }
            `}
          >
            {rating}
          </button>
        ))}
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${getRiskColor(value || 0)}`}
          style={{ width: `${((value || 0) / 5) * 100}%` }}
        />
      </div>
      {value && value >= 3 && (
        <div className="space-y-2">
          <p className="text-xs text-red-600 font-medium">
            Risk rating of {value} requires comment in Section 8
          </p>
          {showAIAnalysis && data._aiAnalysis && (
            <div className="bg-amber-50 border border-amber-200 rounded p-2">
              <p className="text-xs text-amber-800">
                <strong>AI Justification:</strong>{' '}
                {category === 'location' && data._aiAnalysis.propertyRiskRatings?.location?.justification}
                {category === 'land' && data._aiAnalysis.propertyRiskRatings?.land?.justification}
                {category === 'environmental' && data._aiAnalysis.propertyRiskRatings?.environmental?.justification}
                {category === 'improvements' && data._aiAnalysis.propertyRiskRatings?.improvements?.justification}
                {category === 'marketDirection' && data._aiAnalysis.marketRiskRatings?.marketDirection?.justification}
                {category === 'marketActivity' && data._aiAnalysis.marketRiskRatings?.marketActivity?.justification}
                {category === 'localEconomy' && data._aiAnalysis.marketRiskRatings?.localEconomy?.justification}
                {category === 'marketSegment' && data._aiAnalysis.marketRiskRatings?.marketSegment?.justification}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Section 2 - Risk Analysis</CardTitle>
            <p className="text-sm text-muted-foreground">
              Risk ratings indicate the level of impact each aspect has on the subject property's 
              value and marketability as at the date of valuation. Any ratings of 3, 4 or 5 must 
              be commented upon in Section 8.
            </p>
          </div>
          <Button
            onClick={handleAIAssessment}
            disabled={isLoading}
            className="flex items-center gap-2"
            variant="outline"
          >
            {isLoading ? (
              <>
                <Zap className="h-4 w-4 animate-pulse" />
                Analyzing...
              </>
            ) : (
              <>
                <Bot className="h-4 w-4" />
                AI Risk Assessment
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Analysis Results */}
        {showAIAnalysis && data._aiAnalysis && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="h-5 w-5 text-blue-600" />
              <h4 className="font-medium text-blue-800">AI Risk Assessment Results</h4>
            </div>
            <div className="text-sm text-blue-700 space-y-2">
              <p><strong>Overall Assessment:</strong> {data._aiAnalysis.overallAssessment}</p>
              {data._aiAnalysis.requiresCommentary.length > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded p-3">
                  <p className="font-medium text-orange-800">Commentary Required For:</p>
                  <ul className="list-disc list-inside mt-1">
                    {data._aiAnalysis.requiresCommentary.map((category: string, index: number) => (
                      <li key={index} className="text-orange-700">{category}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Property Risk Ratings */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Property Risk Ratings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {propertyRiskCategories.map((category) => (
              <RiskRatingSelector
                key={category.key}
                category={category.key}
                label={category.label}
                value={data[category.key]}
              />
            ))}
          </div>
        </div>

        {/* Market Risk Ratings */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Market Risk Ratings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketRiskCategories.map((category) => (
              <RiskRatingSelector
                key={category.key}
                category={category.key}
                label={category.label}
                value={data[category.key]}
              />
            ))}
          </div>
        </div>

        {/* Risk Rating Legend */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Risk Rating Scale</h4>
          <div className="space-y-2 text-sm">
            {[1, 2, 3, 4, 5].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <div className={`w-8 h-4 rounded ${getRiskColor(rating)}`} />
                <span className="font-medium">{rating}</span>
                <span className="text-muted-foreground">{getRiskLabel(rating)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Assessment Guide */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-5 w-5 text-blue-600" />
            <h4 className="font-medium text-blue-800">AI Risk Assessment</h4>
          </div>
          <div className="text-sm text-blue-700 space-y-2">
            <p>The AI system analyzes your property data against the PropertyPRO Risk Matrix to automatically assign risk ratings.</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Ensures consistent application of PropertyPRO guidelines</li>
              <li>Identifies risk factors that require commentary in Section 8</li>
              <li>Provides justifications based on official matrix criteria</li>
              <li>You can still manually override any ratings if needed</li>
            </ul>
          </div>
        </div>

        {/* High Risk Warning */}
        {Object.values(data).some((rating: any) => rating >= 3) && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-medium text-orange-800 mb-2">Risk Ratings Requiring Comment</h4>
            <p className="text-sm text-orange-700">
              You have risk ratings of 3 or higher that require detailed commentary in Section 8 
              (Additional Comments). Please ensure all identified risks are properly documented.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};