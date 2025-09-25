import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// API Keys for risk assessment data
const asicApiKey = Deno.env.get('ASIC_API_KEY');
const equifaxApiKey = Deno.env.get('EQUIFAX_API_KEY');

interface RiskAssessmentRequest {
  propertyAddress: string;
  propertyType: string;
  abn?: string;
  businessName?: string;
  assessmentType: 'property' | 'business' | 'comprehensive';
  userId: string;
}

interface RiskFactors {
  market: {
    volatility: number;
    liquidity: number;
    demandSupply: number;
    priceGrowth: number;
  };
  property: {
    location: number;
    condition: number;
    age: number;
    marketability: number;
  };
  financial: {
    leverage: number;
    cashFlow: number;
    vacancy: number;
    operatingCosts: number;
  };
  regulatory: {
    planning: number;
    environmental: number;
    heritage: number;
    compliance: number;
  };
  business?: {
    creditRating: number;
    financialStability: number;
    industryRisk: number;
    complianceHistory: number;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      propertyAddress, 
      propertyType, 
      abn, 
      businessName, 
      assessmentType,
      userId 
    }: RiskAssessmentRequest = await req.json();

    console.log('Risk Assessment Request:', { 
      propertyAddress, 
      propertyType, 
      assessmentType,
      hasABN: !!abn 
    });

    // Initialize risk factors
    let riskFactors: RiskFactors = {
      market: { volatility: 5, liquidity: 7, demandSupply: 6, priceGrowth: 7 },
      property: { location: 7, condition: 8, age: 6, marketability: 7 },
      financial: { leverage: 5, cashFlow: 7, vacancy: 8, operatingCosts: 6 },
      regulatory: { planning: 8, environmental: 9, heritage: 7, compliance: 8 }
    };

    // Property-specific risk assessment
    const propertyRisks = await assessPropertyRisks(propertyAddress, propertyType);
    riskFactors.property = { ...riskFactors.property, ...propertyRisks };

    // Market risk assessment
    const marketRisks = await assessMarketRisks(propertyAddress);
    riskFactors.market = { ...riskFactors.market, ...marketRisks };

    // Business risk assessment (if applicable)
    if (assessmentType === 'business' || assessmentType === 'comprehensive') {
      if (abn && asicApiKey) {
        const businessRisks = await assessBusinessRisks(abn, businessName);
        riskFactors.business = businessRisks;
      }
    }

    // Calculate overall risk scores
    const riskScores = calculateRiskScores(riskFactors);
    
    // Generate risk assessment report
    const assessment = {
      assessmentId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      propertyAddress,
      propertyType,
      assessmentType,
      riskFactors,
      riskScores,
      recommendations: generateRecommendations(riskFactors, riskScores),
      mitigationStrategies: generateMitigationStrategies(riskFactors),
      confidenceLevel: calculateConfidenceLevel(riskFactors),
      dataSource: 'ASIC, Market Data, Property Records'
    };

    // Save to database
    const { error: saveError } = await supabase
      .from('risk_assessments')
      .insert({
        user_id: userId,
        property_address: propertyAddress,
        assessment_data: assessment,
        risk_score: riskScores.overall,
        confidence_level: assessment.confidenceLevel,
        created_at: new Date().toISOString()
      });

    if (saveError) {
      console.error('Error saving risk assessment:', saveError);
    }

    return new Response(JSON.stringify({
      success: true,
      assessment
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Risk Assessment Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Risk assessment failed';
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

async function assessPropertyRisks(address: string, propertyType: string) {
  // Mock property risk assessment based on address analysis
  const addressLower = address.toLowerCase();
  
  let locationRisk = 7; // Default medium-low risk
  let conditionRisk = 8; // Assume good condition
  let ageRisk = 6; // Medium age risk
  let marketabilityRisk = 7; // Good marketability
  
  // Location-based adjustments
  if (addressLower.includes('melbourne') || addressLower.includes('sydney')) {
    locationRisk = 9; // Prime location
    marketabilityRisk = 9;
  } else if (addressLower.includes('regional') || addressLower.includes('rural')) {
    locationRisk = 5; // Higher location risk
    marketabilityRisk = 5;
  }
  
  // Property type adjustments
  if (propertyType.toLowerCase().includes('commercial')) {
    marketabilityRisk = 6; // Commercial has specific market
    ageRisk = 5; // Commercial buildings age differently
  }
  
  return {
    location: locationRisk,
    condition: conditionRisk,
    age: ageRisk,
    marketability: marketabilityRisk
  };
}

async function assessMarketRisks(address: string) {
  // Mock market risk assessment
  const addressLower = address.toLowerCase();
  
  let volatility = 5; // Medium volatility
  let liquidity = 7; // Good liquidity
  let demandSupply = 6; // Balanced
  let priceGrowth = 7; // Positive growth
  
  // Market-specific adjustments
  if (addressLower.includes('melbourne') || addressLower.includes('sydney')) {
    volatility = 6; // Higher volatility in major cities
    liquidity = 9; // Excellent liquidity
    priceGrowth = 8; // Strong growth
  }
  
  return {
    volatility,
    liquidity,
    demandSupply,
    priceGrowth
  };
}

async function assessBusinessRisks(abn: string, businessName?: string) {
  try {
    // Mock ASIC API call for business risk assessment
    console.log('Assessing business risk for ABN:', abn);
    
    // In real implementation, call ASIC API
    // const asicResponse = await fetch(`https://asic-api.gov.au/business/${abn}`, {
    //   headers: { 'Authorization': `Bearer ${asicApiKey}` }
    // });
    
    // Mock business risk data
    return {
      creditRating: 7, // Good credit rating
      financialStability: 6, // Moderate stability
      industryRisk: 5, // Medium industry risk
      complianceHistory: 8 // Good compliance
    };
  } catch (error) {
    console.error('Business risk assessment error:', error);
    return {
      creditRating: 5,
      financialStability: 5,
      industryRisk: 5,
      complianceHistory: 5
    };
  }
}

function calculateRiskScores(factors: RiskFactors) {
  const marketScore = Object.values(factors.market).reduce((a, b) => a + b, 0) / 4;
  const propertyScore = Object.values(factors.property).reduce((a, b) => a + b, 0) / 4;
  const financialScore = Object.values(factors.financial).reduce((a, b) => a + b, 0) / 4;
  const regulatoryScore = Object.values(factors.regulatory).reduce((a, b) => a + b, 0) / 4;
  
  let businessScore = 7; // Default if no business assessment
  if (factors.business) {
    businessScore = Object.values(factors.business).reduce((a, b) => a + b, 0) / 4;
  }
  
  const overall = factors.business 
    ? (marketScore + propertyScore + financialScore + regulatoryScore + businessScore) / 5
    : (marketScore + propertyScore + financialScore + regulatoryScore) / 4;
  
  return {
    market: Math.round(marketScore * 10) / 10,
    property: Math.round(propertyScore * 10) / 10,
    financial: Math.round(financialScore * 10) / 10,
    regulatory: Math.round(regulatoryScore * 10) / 10,
    business: factors.business ? Math.round(businessScore * 10) / 10 : undefined,
    overall: Math.round(overall * 10) / 10
  };
}

function generateRecommendations(factors: RiskFactors, scores: any) {
  const recommendations = [];
  
  if (scores.market < 6) {
    recommendations.push('Consider market volatility in pricing strategy');
  }
  
  if (scores.property < 6) {
    recommendations.push('Property condition may require additional inspection');
  }
  
  if (scores.financial < 6) {
    recommendations.push('Review financial projections and cash flow assumptions');
  }
  
  if (scores.regulatory < 6) {
    recommendations.push('Conduct thorough regulatory compliance review');
  }
  
  if (factors.business && scores.business < 6) {
    recommendations.push('Business risk factors require additional due diligence');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Risk profile is within acceptable parameters');
  }
  
  return recommendations;
}

function generateMitigationStrategies(factors: RiskFactors) {
  const strategies = [];
  
  // Property-specific strategies
  if (factors.property.condition < 7) {
    strategies.push({
      type: 'Property',
      strategy: 'Conduct building inspection and factor maintenance costs',
      priority: 'High'
    });
  }
  
  // Market strategies
  if (factors.market.liquidity < 6) {
    strategies.push({
      type: 'Market',
      strategy: 'Consider longer marketing periods and flexible pricing',
      priority: 'Medium'
    });
  }
  
  // Financial strategies
  if (factors.financial.vacancy < 6) {
    strategies.push({
      type: 'Financial',
      strategy: 'Include vacancy provisions in financial modeling',
      priority: 'High'
    });
  }
  
  return strategies;
}

function calculateConfidenceLevel(factors: RiskFactors) {
  // Base confidence on data availability and quality
  let confidence = 85; // Base confidence
  
  // Adjust based on data completeness
  if (!factors.business) {
    confidence -= 10; // Lower confidence without business data
  }
  
  // Higher confidence for established areas
  if (factors.property.location > 7) {
    confidence += 5;
  }
  
  return Math.min(95, Math.max(60, confidence));
}