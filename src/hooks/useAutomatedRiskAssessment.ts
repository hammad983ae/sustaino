import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface RiskRating {
  rating: number;
  justification: string;
}

interface RiskAssessmentResult {
  propertyRiskRatings: {
    location: RiskRating;
    land: RiskRating;
    environmental: RiskRating;
    improvements: RiskRating;
  };
  marketRiskRatings: {
    marketDirection: RiskRating;
    marketActivity: RiskRating;
    localEconomy: RiskRating;
    marketSegment: RiskRating;
  };
  overallAssessment: string;
  requiresCommentary: string[];
}

export const useAutomatedRiskAssessment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const assessRisks = async (propertyData: any): Promise<RiskAssessmentResult | null> => {
    setIsLoading(true);
    
    try {
      console.log('Starting automated risk assessment with data:', propertyData);

      const { data, error } = await supabase.functions.invoke('property-risk-assessment', {
        body: { propertyData }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to assess property risks');
      }

      if (!data.success) {
        console.error('Risk assessment failed:', data.error);
        throw new Error(data.error || 'Risk assessment failed');
      }

      const riskAssessment = data.riskAssessment;
      
      toast({
        title: "Risk Assessment Complete",
        description: "AI has analyzed your property and assigned risk ratings based on PropertyPRO guidelines.",
        duration: 4000,
      });

      // Show summary of high-risk items
      if (riskAssessment.requiresCommentary && riskAssessment.requiresCommentary.length > 0) {
        toast({
          title: "Commentary Required",
          description: `High risk ratings (≥3) detected for: ${riskAssessment.requiresCommentary.join(', ')}. Please provide detailed comments in Section 8.`,
          variant: "destructive",
          duration: 6000,
        });
      }

      return riskAssessment;

    } catch (error) {
      console.error('Error in automated risk assessment:', error);
      
      toast({
        title: "Risk Assessment Failed",
        description: error instanceof Error ? error.message : "Unable to complete automated risk assessment. Please assign ratings manually.",
        variant: "destructive",
        duration: 5000,
      });

      return null;

    } finally {
      setIsLoading(false);
    }
  };

  const convertToRiskRatings = (assessment: RiskAssessmentResult) => {
    return {
      // Property Risk Ratings
      location: assessment.propertyRiskRatings.location.rating,
      land: assessment.propertyRiskRatings.land.rating,
      environmental: assessment.propertyRiskRatings.environmental.rating,
      improvements: assessment.propertyRiskRatings.improvements.rating,
      
      // Market Risk Ratings
      marketDirection: assessment.marketRiskRatings.marketDirection.rating,
      marketActivity: assessment.marketRiskRatings.marketActivity.rating,
      localEconomy: assessment.marketRiskRatings.localEconomy.rating,
      marketSegment: assessment.marketRiskRatings.marketSegment.rating,
      
      // Additional metadata
      _aiAnalysis: {
        propertyRiskRatings: assessment.propertyRiskRatings,
        marketRiskRatings: assessment.marketRiskRatings,
        overallAssessment: assessment.overallAssessment,
        requiresCommentary: assessment.requiresCommentary
      }
    };
  };

  return {
    assessRisks,
    convertToRiskRatings,
    isLoading
  };
};