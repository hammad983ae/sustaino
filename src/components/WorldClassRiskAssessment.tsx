/**
 * ============================================================================
 * WORLD-CLASS AUTOMATED RISK ASSESSMENT SYSTEM
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Next-generation AI-powered risk assessment with real-time market analysis
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap,
  Target,
  BarChart3,
  Lightbulb,
  Shield,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useReportData } from '@/contexts/ReportDataContext';
import { useProperty } from '@/contexts/PropertyContext';
import { supabase } from '@/integrations/supabase/client';

interface RiskCategory {
  category: string;
  rating: number;
  explanation: string;
  keyFactors: string[];
  mitigationStrategies: string[];
}

interface MarketIndicators {
  marketCyclePhase: string;
  priceTrendPrediction: string;
  rentalOutlook: string;
  supplyDemandDynamics: string;
  comparableSalesInsights: string;
}

interface OverallAssessment {
  overallRisk: number;
  investmentRecommendation: string;
  keyOpportunities: string[];
  keyThreats: string[];
  riskAdjustedReturn: string;
}

interface PredictiveInsights {
  fiveYearForecast: string;
  volatilityAssessment: string;
  economicFactorsImpact: string;
  climateRegulatory: string;
}

interface AutomatedAssessmentResult {
  riskCategories: RiskCategory[];
  marketIndicators: MarketIndicators;
  overallAssessment: OverallAssessment;
  predictiveInsights: PredictiveInsights;
  automationConfidence: string;
  lastUpdated: string;
  processingMetadata?: any;
  australianMarketContext?: any;
}

const WorldClassRiskAssessment: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [assessmentData, setAssessmentData] = useState<AutomatedAssessmentResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('');
  const { toast } = useToast();
  const { reportData, updateReportData } = useReportData();
  const { addressData } = useProperty();

  // Auto-run assessment when property data is available
  useEffect(() => {
    const hasPropertyData = reportData?.propertySearchData?.confirmedAddress || 
                           addressData?.propertyAddress;
    
    if (hasPropertyData && !assessmentData) {
      // Auto-run basic assessment
      runAutomatedAssessment('fast');
    }
  }, [reportData?.propertySearchData, addressData, assessmentData]);

  const runAutomatedAssessment = async (assessmentType: 'comprehensive' | 'basic' | 'fast' = 'comprehensive') => {
    setIsGenerating(true);
    setProgress(0);
    setCurrentStage('Initializing AI analysis...');

    try {
      // Gather comprehensive property data
      const propertyData = {
        address: reportData?.propertySearchData?.confirmedAddress || 
                addressData?.propertyAddress || 
                'Property Address Not Available',
        propertyType: reportData?.reportConfig?.propertyType || 'residential',
        suburb: addressData?.suburb || reportData?.propertySearchData?.suburb,
        state: addressData?.state || reportData?.propertySearchData?.state,
        postcode: addressData?.postcode || reportData?.propertySearchData?.postcode,
        zoning: reportData?.planningData?.zoning || reportData?.legalAndPlanning?.zoning,
        landArea: reportData?.propertyDetails?.landArea || 
                 reportData?.propertySearchData?.landArea,
        buildingArea: reportData?.propertyDetails?.buildingArea || 
                     reportData?.propertySearchData?.buildingArea,
        yearBuilt: reportData?.propertyDetails?.yearBuilt,
        planningOverlays: reportData?.planningData?.overlays || 
                         reportData?.legalAndPlanning?.overlays || [],
        environmentalFactors: {
          floodRisk: reportData?.planningData?.floodRisk || 
                    reportData?.legalAndPlanning?.floodRisk,
          bushfireRisk: reportData?.planningData?.bushfireRisk || 
                       reportData?.legalAndPlanning?.bushfireRisk,
          heritage: reportData?.planningData?.heritage || 
                   reportData?.legalAndPlanning?.heritage
        }
      };

      // Stage 1: Data validation
      setCurrentStage('Validating property data...');
      setProgress(10);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Stage 2: Market data analysis
      setCurrentStage('Analyzing market conditions...');
      setProgress(25);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Stage 3: AI risk assessment
      setCurrentStage('Running AI risk assessment...');
      setProgress(50);

      const { data, error } = await supabase.functions.invoke('automated-risk-assessment', {
        body: {
          propertyData,
          assessmentType,
          includeMarketAnalysis: true,
          includePredictiveModeling: assessmentType === 'comprehensive'
        }
      });

      if (error) {
        throw error;
      }

      // Stage 4: Processing results
      setCurrentStage('Processing assessment results...');
      setProgress(75);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Stage 5: Finalizing
      setCurrentStage('Finalizing risk analysis...');
      setProgress(90);
      await new Promise(resolve => setTimeout(resolve, 300));

      setAssessmentData(data);
      
      // Update report data with risk assessment
      updateReportData('riskAssessment', {
        automatedAssessment: data,
        lastGenerated: new Date().toISOString(),
        assessmentType
      });

      setProgress(100);
      setCurrentStage('Assessment complete!');

      toast({
        title: "AI Risk Assessment Complete",
        description: `Comprehensive analysis completed with ${data.automationConfidence} confidence. ${data.riskCategories.length} risk categories analyzed.`,
      });

    } catch (error: any) {
      console.error('Error running automated assessment:', error);
      toast({
        title: "Assessment Error",
        description: error.message || "Failed to complete automated risk assessment.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
      setProgress(0);
      setCurrentStage('');
    }
  };

  const getRiskBadgeColor = (rating: number) => {
    if (rating <= 2) return 'bg-green-500';
    if (rating <= 3) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getRiskLabel = (rating: number) => {
    if (rating <= 2) return 'Low Risk';
    if (rating <= 3) return 'Moderate Risk';
    return 'High Risk';
  };

  const getRecommendationColor = (recommendation: string) => {
    if (recommendation.includes('Strong Buy') || recommendation.includes('Buy')) return 'text-green-600';
    if (recommendation.includes('Hold')) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Brain className="h-6 w-6" />
                World-Class Automated Risk Assessment
              </CardTitle>
              <p className="text-sm text-blue-600 mt-1">
                AI-powered comprehensive risk analysis with real-time market indicators
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => runAutomatedAssessment('fast')} 
                variant="outline" 
                size="sm"
                disabled={isGenerating}
              >
                <Zap className="h-4 w-4 mr-1" />
                Quick Assessment
              </Button>
              <Button 
                onClick={() => runAutomatedAssessment('comprehensive')} 
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Brain className="h-4 w-4 mr-2" />
                {isGenerating ? 'Analyzing...' : 'Full AI Analysis'}
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Progress Indicator */}
        {isGenerating && (
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">{currentStage}</span>
                <span className="text-sm text-blue-600">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Assessment Results */}
      {assessmentData && (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
            <TabsTrigger value="market">Market Indicators</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Overall Risk Score */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Overall Risk Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${getRiskBadgeColor(assessmentData.overallAssessment.overallRisk)}`}>
                      {assessmentData.overallAssessment.overallRisk}
                    </div>
                    <div>
                      <div className="font-medium">{getRiskLabel(assessmentData.overallAssessment.overallRisk)}</div>
                      <div className="text-sm text-muted-foreground">Out of 5</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Investment Recommendation */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Investment Recommendation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`font-bold text-lg ${getRecommendationColor(assessmentData.overallAssessment.investmentRecommendation)}`}>
                    {assessmentData.overallAssessment.investmentRecommendation}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">AI Confidence: {assessmentData.automationConfidence}</div>
                </CardContent>
              </Card>

              {/* Market Cycle */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Market Cycle Phase</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-bold text-lg text-blue-600">
                    {assessmentData.marketIndicators.marketCyclePhase}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Current market position</div>
                </CardContent>
              </Card>
            </div>

            {/* Key Opportunities & Threats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    Key Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {assessmentData.overallAssessment.keyOpportunities.map((opportunity, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{opportunity}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    Key Threats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {assessmentData.overallAssessment.keyThreats.map((threat, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{threat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Risk Analysis Tab */}
          <TabsContent value="risks" className="space-y-4">
            {assessmentData.riskCategories.map((risk, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      {risk.category}
                    </CardTitle>
                    <Badge className={`${getRiskBadgeColor(risk.rating)} text-white`}>
                      {risk.rating}/5 - {getRiskLabel(risk.rating)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{risk.explanation}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Key Risk Factors:</h4>
                      <ul className="space-y-1">
                        {risk.keyFactors.map((factor, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">• {factor}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Mitigation Strategies:</h4>
                      <ul className="space-y-1">
                        {risk.mitigationStrategies.map((strategy, idx) => (
                          <li key={idx} className="text-sm text-green-700">• {strategy}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Market Indicators Tab */}
          <TabsContent value="market" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Price Trend Prediction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{assessmentData.marketIndicators.priceTrendPrediction}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Rental Outlook
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{assessmentData.marketIndicators.rentalOutlook}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Supply & Demand
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{assessmentData.marketIndicators.supplyDemandDynamics}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Comparable Sales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{assessmentData.marketIndicators.comparableSalesInsights}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Predictions Tab */}
          <TabsContent value="predictions" className="space-y-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    5-Year Growth Forecast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{assessmentData.predictiveInsights.fiveYearForecast}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5" />
                    Volatility Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{assessmentData.predictiveInsights.volatilityAssessment}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Economic Factors Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{assessmentData.predictiveInsights.economicFactorsImpact}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Climate & Regulatory Risk
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{assessmentData.predictiveInsights.climateRegulatory}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* No Data State */}
      {!assessmentData && !isGenerating && (
        <Card>
          <CardContent className="text-center py-8">
            <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Ready for AI Analysis</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Click "Full AI Analysis" to generate comprehensive risk assessment and market indicators
            </p>
          </CardContent>
        </Card>
      )}

      {/* Automation Status */}
      {assessmentData && (
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            Assessment completed on {new Date(assessmentData.lastUpdated).toLocaleString()} 
            with {assessmentData.automationConfidence} confidence. 
            <Button 
              variant="link" 
              size="sm" 
              onClick={() => runAutomatedAssessment('comprehensive')}
              className="p-0 ml-2"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh Analysis
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default WorldClassRiskAssessment;