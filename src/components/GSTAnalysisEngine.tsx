import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface GSTAnalysisResult {
  gstApplicable: boolean;
  gstRate: number;
  gstAmount: number;
  gstScheme: 'standard' | 'margin' | 'gst-free' | 'input-taxed';
  registrationRequired: boolean;
  compliance: {
    warnings: string[];
    requirements: string[];
    recommendations: string[];
  };
  reasoning: string;
  confidence: number;
}

interface PropertyData {
  propertyType: 'residential' | 'commercial' | 'development' | 'agricultural' | 'specialised';
  propertySubType: string;
  transactionType: 'sale' | 'lease' | 'development' | 'rental';
  isNewProperty: boolean;
  purchasePrice: number;
  developmentCost?: number;
  intendedUse: 'private' | 'business' | 'investment' | 'development';
  supplierGSTRegistered: boolean;
  supplierTurnover: number;
  purchaserGSTRegistered: boolean;
  isGoingConcern: boolean;
  marginSchemeEligible: boolean;
  previousGSTCredits: number;
}

interface GSTAnalysisEngineProps {
  propertyData: PropertyData;
  onAnalysisComplete: (result: GSTAnalysisResult) => void;
}

export const GSTAnalysisEngine: React.FC<GSTAnalysisEngineProps> = ({
  propertyData,
  onAnalysisComplete
}) => {
  const [analysis, setAnalysis] = useState<GSTAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeGSTRequirements = (): GSTAnalysisResult => {
    const warnings: string[] = [];
    const requirements: string[] = [];
    const recommendations: string[] = [];
    let gstApplicable = false;
    let gstRate = 0.1;
    let gstScheme: 'standard' | 'margin' | 'gst-free' | 'input-taxed' = 'standard';
    let registrationRequired = false;
    let reasoning = '';
    let confidence = 0.9;

    // GST Registration Analysis
    if (propertyData.supplierTurnover > 75000 || 
        (propertyData.transactionType === 'development' && propertyData.intendedUse === 'business')) {
      registrationRequired = true;
      requirements.push('GST registration required due to turnover threshold or development activity');
    }

    // Property Type Analysis
    switch (propertyData.propertyType) {
      case 'residential':
        if (propertyData.isNewProperty && propertyData.transactionType === 'sale') {
          gstApplicable = true;
          reasoning = 'New residential property sales are taxable supplies subject to GST';
          if (propertyData.marginSchemeEligible) {
            gstScheme = 'margin';
            recommendations.push('Consider margin scheme to reduce GST liability');
          }
        } else if (!propertyData.isNewProperty && propertyData.transactionType === 'sale') {
          gstScheme = 'input-taxed';
          reasoning = 'Existing residential property sales are input taxed - no GST applies';
        } else if (propertyData.transactionType === 'rental') {
          gstScheme = 'input-taxed';
          reasoning = 'Residential rental income is input taxed - no GST applies';
          warnings.push('GST credits cannot be claimed on expenses related to input taxed supplies');
        }
        break;

      case 'commercial':
        gstApplicable = true;
        reasoning = 'Commercial property transactions are generally taxable supplies';
        if (propertyData.isGoingConcern) {
          gstScheme = 'gst-free';
          gstApplicable = false;
          reasoning = 'Sale of going concern is GST-free';
          requirements.push('Must meet all going concern criteria');
        }
        break;

      case 'development':
        gstApplicable = true;
        reasoning = 'Development activities are taxable supplies when conducted as enterprise';
        registrationRequired = true;
        requirements.push('GST registration mandatory for development enterprises');
        if (propertyData.marginSchemeEligible) {
          recommendations.push('Margin scheme may be beneficial for land acquired before GST registration');
        }
        break;

      case 'agricultural':
        if (propertyData.isGoingConcern) {
          gstScheme = 'gst-free';
          gstApplicable = false;
          reasoning = 'Farmland sold as going concern is GST-free';
        } else {
          gstApplicable = true;
          reasoning = 'Agricultural property sales are taxable unless GST-free farmland criteria met';
        }
        break;

      case 'specialised':
        gstApplicable = true;
        reasoning = 'Specialised property transactions require individual assessment';
        confidence = 0.7;
        warnings.push('Complex property type - seek professional GST advice');
        break;
    }

    // Transaction Value Analysis
    const transactionValue = propertyData.purchasePrice + (propertyData.developmentCost || 0);
    const gstAmount = gstApplicable ? transactionValue * gstRate : 0;

    // Compliance Checks
    if (gstApplicable && propertyData.supplierGSTRegistered) {
      requirements.push('Valid tax invoice required to claim GST credits');
      requirements.push('GST must be reported in activity statement at settlement');
    }

    if (propertyData.transactionType === 'sale' && 
        (propertyData.propertyType === 'residential' || propertyData.propertySubType === 'potential residential land') &&
        propertyData.isNewProperty) {
      requirements.push('GST withholding at settlement may apply');
      warnings.push('Purchaser may need to withhold GST amount and pay directly to ATO');
    }

    if (propertyData.previousGSTCredits > 0 && 
        propertyData.intendedUse !== propertyData.transactionType) {
      warnings.push('Change in creditable purpose - GST adjustment may be required');
      recommendations.push('Calculate potential increasing/decreasing adjustment');
    }

    return {
      gstApplicable,
      gstRate,
      gstAmount,
      gstScheme,
      registrationRequired,
      compliance: { warnings, requirements, recommendations },
      reasoning,
      confidence
    };
  };

  useEffect(() => {
    if (propertyData) {
      setIsAnalyzing(true);
      // Simulate API call delay
      setTimeout(() => {
        const result = analyzeGSTRequirements();
        setAnalysis(result);
        onAnalysisComplete(result);
        setIsAnalyzing(false);
      }, 1000);
    }
  }, [propertyData]);

  const getSchemeColor = (scheme: string) => {
    switch (scheme) {
      case 'standard': return 'bg-blue-500';
      case 'margin': return 'bg-green-500';
      case 'gst-free': return 'bg-emerald-500';
      case 'input-taxed': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analyzing GST Requirements...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span>Processing ATO compliance requirements...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) return null;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            GST Analysis Result
            <Badge className={getSchemeColor(analysis.gstScheme)}>
              {analysis.gstScheme.toUpperCase()}
            </Badge>
          </CardTitle>
          <CardDescription>
            Analysis confidence: <span className={getConfidenceColor(analysis.confidence)}>
              {(analysis.confidence * 100).toFixed(0)}%
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center space-x-2">
                {analysis.gstApplicable ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className="font-medium">
                  GST {analysis.gstApplicable ? 'Applicable' : 'Not Applicable'}
                </span>
              </div>
              {analysis.gstApplicable && (
                <div className="mt-2">
                  <div>GST Rate: {(analysis.gstRate * 100)}%</div>
                  <div>GST Amount: ${analysis.gstAmount.toLocaleString()}</div>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                {analysis.registrationRequired ? (
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
                <span className="font-medium">
                  GST Registration {analysis.registrationRequired ? 'Required' : 'Not Required'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Analysis Reasoning:</h4>
            <p className="text-sm text-muted-foreground">{analysis.reasoning}</p>
          </div>

          {analysis.compliance.warnings.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-medium mb-1">Warnings:</div>
                <ul className="list-disc list-inside space-y-1">
                  {analysis.compliance.warnings.map((warning, index) => (
                    <li key={index} className="text-sm">{warning}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {analysis.compliance.requirements.length > 0 && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <div className="font-medium mb-1">Requirements:</div>
                <ul className="list-disc list-inside space-y-1">
                  {analysis.compliance.requirements.map((req, index) => (
                    <li key={index} className="text-sm">{req}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {analysis.compliance.recommendations.length > 0 && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-medium mb-1">Recommendations:</div>
                <ul className="list-disc list-inside space-y-1">
                  {analysis.compliance.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm">{rec}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GSTAnalysisEngine;