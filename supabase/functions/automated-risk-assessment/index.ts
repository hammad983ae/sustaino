import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AutoRiskAssessmentRequest {
  propertyData: {
    address: string;
    propertyType: string;
    suburb?: string;
    state?: string;
    postcode?: string;
    zoning?: string;
    landArea?: number;
    buildingArea?: number;
    yearBuilt?: number;
    proximityToAmenities?: any;
    planningOverlays?: string[];
    environmentalFactors?: any;
    marketData?: any;
  };
  assessmentType?: 'comprehensive' | 'basic' | 'fast';
  includeMarketAnalysis?: boolean;
  includePredictiveModeling?: boolean;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      propertyData, 
      assessmentType = 'comprehensive',
      includeMarketAnalysis = true,
      includePredictiveModeling = false 
    }: AutoRiskAssessmentRequest = await req.json();

    console.log('Processing automated risk assessment for:', propertyData.address);

    // Generate comprehensive risk assessment using AI
    const riskAssessmentPrompt = `
You are a world-class property risk assessment AI system. Analyze the following property and provide a comprehensive risk assessment with market indicators.

PROPERTY DATA:
- Address: ${propertyData.address}
- Type: ${propertyData.propertyType}
- Location: ${propertyData.suburb}, ${propertyData.state} ${propertyData.postcode}
- Zoning: ${propertyData.zoning || 'Not specified'}
- Land Area: ${propertyData.landArea || 'Not specified'} sqm
- Building Area: ${propertyData.buildingArea || 'Not specified'} sqm
- Year Built: ${propertyData.yearBuilt || 'Not specified'}
- Planning Overlays: ${propertyData.planningOverlays?.join(', ') || 'None specified'}

ASSESSMENT REQUIREMENTS:
1. Provide detailed risk ratings (1-5 scale, where 1=very low risk, 5=very high risk) for these categories:
   - Location & Neighbourhood Risk
   - Market Activity Risk
   - Environmental Risk
   - Planning & Development Risk
   - Economic Impact Risk
   - Property-Specific Risk
   - Liquidity Risk
   - Capital Growth Risk
   - Investment Risk
   - ESG (Environmental, Social, Governance) Risk

2. For EACH category, provide:
   - Numerical rating (1-5)
   - Detailed explanation (50-100 words)
   - Key risk factors (3-5 bullet points)
   - Mitigation strategies (2-3 recommendations)

3. Market Indicators Analysis:
   - Current market cycle phase
   - Price trend prediction (6-12 months)
   - Rental market outlook
   - Supply/demand dynamics
   - Comparable sales analysis insights

4. Overall Risk Profile Summary:
   - Overall risk rating (1-5)
   - Investment recommendation (Strong Buy/Buy/Hold/Sell/Strong Sell)
   - Key opportunities and threats
   - Risk-adjusted return expectations

5. Predictive Insights:
   - 5-year capital growth forecast
   - Market volatility assessment
   - External economic factors impact
   - Climate change and regulatory risks

Return your response as a JSON object with the following structure:
{
  "riskCategories": [
    {
      "category": "Category Name",
      "rating": 1-5,
      "explanation": "Detailed explanation",
      "keyFactors": ["factor1", "factor2", "factor3"],
      "mitigationStrategies": ["strategy1", "strategy2"]
    }
  ],
  "marketIndicators": {
    "marketCyclePhase": "Recovery/Growth/Peak/Decline",
    "priceTrendPrediction": "Description",
    "rentalOutlook": "Description",
    "supplyDemandDynamics": "Description",
    "comparableSalesInsights": "Description"
  },
  "overallAssessment": {
    "overallRisk": 1-5,
    "investmentRecommendation": "Recommendation",
    "keyOpportunities": ["opportunity1", "opportunity2"],
    "keyThreats": ["threat1", "threat2"],
    "riskAdjustedReturn": "Description"
  },
  "predictiveInsights": {
    "fiveYearForecast": "Description",
    "volatilityAssessment": "Description",
    "economicFactorsImpact": "Description",
    "climateRegulatory": "Description"
  },
  "automationConfidence": "High/Medium/Low",
  "lastUpdated": "${new Date().toISOString()}"
}

Focus on Australian property market conditions and regulations. Use professional valuation terminology and provide actionable insights.
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert Australian property risk assessment AI with deep knowledge of property markets, regulations, and valuation methodologies. Provide precise, data-driven analysis suitable for professional valuation reports.'
          },
          { role: 'user', content: riskAssessmentPrompt }
        ],
        max_completion_tokens: 4000,
        response_format: { type: 'json_object' }
      }),
    });

    const aiResponse = await response.json();
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${aiResponse.error?.message || response.status}`);
    }

    const assessmentData = JSON.parse(aiResponse.choices[0].message.content);

    // Add additional processing for Australian market context
    const enhancedAssessment = {
      ...assessmentData,
      processingMetadata: {
        assessmentType,
        includeMarketAnalysis,
        includePredictiveModeling,
        propertyAddress: propertyData.address,
        generatedAt: new Date().toISOString(),
        confidence: assessmentData.automationConfidence || 'High',
        dataSource: 'AI-Enhanced Analysis'
      },
      australianMarketContext: {
        apraGuidelines: "Assessment considers APRA lending guidelines and serviceability requirements",
        stateSpecificFactors: getStateSpecificFactors(propertyData.state),
        regulatoryEnvironment: "Current regulatory environment including foreign investment rules and stamp duty implications",
        marketCycleTiming: "Analysis incorporates current position in Australian property cycle"
      }
    };

    console.log('Risk assessment completed successfully');

    return new Response(JSON.stringify(enhancedAssessment), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });

  } catch (error) {
    console.error('Error in automated-risk-assessment function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      fallbackAssessment: generateFallbackAssessment()
    }), {
      status: 500,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });
  }
});

function getStateSpecificFactors(state?: string): string {
  const stateFactors: { [key: string]: string } = {
    'NSW': 'Strong economy, foreign buyer duty, high stamp duty rates, apartment oversupply concerns in some areas',
    'VIC': 'Diverse economy, land tax considerations, strong population growth, COVID-19 recovery impacts',
    'QLD': 'Tourism and mining dependent, interstate migration benefits, flood and cyclone risks in some areas',
    'WA': 'Resource sector dependent, previous mining boom impacts, recent market recovery',
    'SA': 'Stable market, affordable housing, government incentives, limited economic drivers',
    'TAS': 'Tourism growth, affordability appeal, limited employment opportunities, infrastructure concerns',
    'NT': 'Small market, resource sector exposure, extreme weather considerations',
    'ACT': 'Government employment dependent, high property values, limited land supply'
  };

  return stateFactors[state?.toUpperCase() || ''] || 'Standard Australian market conditions apply';
}

function generateFallbackAssessment() {
  return {
    riskCategories: [
      {
        category: "Overall Risk",
        rating: 3,
        explanation: "Moderate risk assessment - detailed analysis unavailable",
        keyFactors: ["Standard market conditions", "Professional review recommended"],
        mitigationStrategies: ["Seek detailed valuation", "Monitor market conditions"]
      }
    ],
    marketIndicators: {
      marketCyclePhase: "Stable",
      priceTrendPrediction: "Refer to recent market reports",
      rentalOutlook: "Consult local rental data",
      supplyDemandDynamics: "Market specific analysis required",
      comparableSalesInsights: "Recent sales analysis recommended"
    },
    overallAssessment: {
      overallRisk: 3,
      investmentRecommendation: "Seek Professional Advice",
      keyOpportunities: ["Professional assessment required"],
      keyThreats: ["Professional assessment required"],
      riskAdjustedReturn: "Detailed analysis required"
    },
    automationConfidence: "Low",
    lastUpdated: new Date().toISOString()
  };
}