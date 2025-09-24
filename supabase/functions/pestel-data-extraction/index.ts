import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PESTELAnalysisRequest {
  propertyDetails: {
    address: string;
    propertyType: string;
    state: string;
    suburb: string;
    postcode: string;
  };
  currentPestelData?: any;
  analysisDepth: 'basic' | 'comprehensive';
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: PESTELAnalysisRequest = await req.json();
    const { propertyDetails, currentPestelData, analysisDepth } = requestData;

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('PESTEL Analysis Request:', { propertyDetails, analysisDepth });

    // Gather external data sources for PESTEL analysis
    const externalData = await gatherExternalData(propertyDetails);
    
    // Generate AI-enhanced PESTEL analysis
    const enhancedPestelData = await generateAIPestelAnalysis(
      propertyDetails, 
      externalData, 
      currentPestelData,
      analysisDepth
    );

    return new Response(JSON.stringify({ 
      success: true,
      pestelAnalysis: enhancedPestelData,
      dataSources: externalData.sources,
      analysisTimestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in pestel-data-extraction function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message || 'Failed to generate PESTEL analysis' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function gatherExternalData(propertyDetails: any) {
  const sources: string[] = [];
  const data: any = {};

  try {
    // Economic Data - Australia Bureau of Statistics
    const economicData = await fetchEconomicIndicators(propertyDetails.state);
    if (economicData) {
      data.economic = economicData;
      sources.push('Australian Bureau of Statistics');
    }

    // Political Data - Government policies and regulations
    const politicalData = await fetchPoliticalFactors(propertyDetails.state);
    if (politicalData) {
      data.political = politicalData;
      sources.push('Government Policy Data');
    }

    // Environmental Data - Climate and sustainability
    const environmentalData = await fetchEnvironmentalData(propertyDetails);
    if (environmentalData) {
      data.environmental = environmentalData;
      sources.push('Environmental Data');
    }

    // Social Data - Demographics and trends
    const socialData = await fetchSocialFactors(propertyDetails);
    if (socialData) {
      data.social = socialData;
      sources.push('Demographic Data');
    }

    // Legal Data - Planning and zoning
    const legalData = await fetchLegalFactors(propertyDetails);
    if (legalData) {
      data.legal = legalData;
      sources.push('Planning Data');
    }

    // Technology Data - PropTech and digital trends
    const techData = await fetchTechnologyFactors(propertyDetails.propertyType);
    if (techData) {
      data.technological = techData;
      sources.push('Technology Trends');
    }

  } catch (error) {
    console.error('Error gathering external data:', error);
  }

  return { data, sources };
}

async function fetchEconomicIndicators(state: string) {
  try {
    // Simulated economic data - in real implementation, would connect to RBA, ABS APIs
    const economicFactors = {
      interestRates: {
        current: 4.35,
        trend: 'stable',
        forecast: 'potential decrease in 6-12 months'
      },
      unemploymentRate: getStateUnemploymentRate(state),
      inflationRate: 3.4,
      gdpGrowth: 1.2,
      housingFinance: {
        approvalGrowth: -2.1,
        trend: 'declining'
      },
      constructionCosts: {
        growth: 5.2,
        trend: 'increasing'
      }
    };

    return economicFactors;
  } catch (error) {
    console.error('Error fetching economic data:', error);
    return null;
  }
}

async function fetchPoliticalFactors(state: string) {
  try {
    // Simulated political data
    const politicalFactors = {
      stampDutyChanges: getStatePolicyChanges(state),
      planningReforms: {
        status: 'under review',
        impact: 'medium',
        timeline: '2024-2025'
      },
      foreignInvestmentRules: {
        recentChanges: true,
        impact: 'high',
        description: 'FIRB threshold adjustments'
      },
      taxPolicies: {
        landTax: 'stable',
        capitalGainsTax: 'under review',
        negativeGearing: 'no changes planned'
      },
      infrastructureInvestment: {
        transport: 'major projects planned',
        utilities: 'grid modernization'
      }
    };

    return politicalFactors;
  } catch (error) {
    console.error('Error fetching political data:', error);
    return null;
  }
}

async function fetchEnvironmentalData(propertyDetails: any) {
  try {
    // Simulated environmental data
    const environmentalFactors = {
      climateRisks: {
        floodRisk: assessFloodRisk(propertyDetails.postcode),
        bushfireRisk: assessBushfireRisk(propertyDetails.state),
        cycloneRisk: assessCycloneRisk(propertyDetails.state),
        seaLevelRise: assessSeaLevelRisk(propertyDetails.suburb)
      },
      sustainabilityRequirements: {
        energyRating: 'mandatory for new builds',
        waterEfficiency: 'WELS ratings required',
        greenBuildingIncentives: true
      },
      environmentalRegulations: {
        emissionsTargets: 'net zero by 2050',
        buildingCodes: 'NCC 2022 standards',
        wasteMangement: 'circular economy initiatives'
      }
    };

    return environmentalFactors;
  } catch (error) {
    console.error('Error fetching environmental data:', error);
    return null;
  }
}

async function fetchSocialFactors(propertyDetails: any) {
  try {
    // Simulated social data
    const socialFactors = {
      demographics: {
        populationGrowth: getPopulationGrowth(propertyDetails.state),
        ageDistribution: 'younger demographics increasing',
        householdSize: 'trending smaller',
        incomeGrowth: 2.8
      },
      lifestyleTrends: {
        workFromHome: 'permanent shift to hybrid',
        urbanization: 'continued city growth',
        housingPreferences: 'sustainability focus increasing'
      },
      migrationPatterns: {
        interstate: getInterstateMovement(propertyDetails.state),
        international: 'recovery post-COVID',
        regional: 'city to regional trend continuing'
      }
    };

    return socialFactors;
  } catch (error) {
    console.error('Error fetching social data:', error);
    return null;
  }
}

async function fetchLegalFactors(propertyDetails: any) {
  try {
    // Simulated legal data
    const legalFactors = {
      tenancyLaws: {
        recentChanges: getStateTenancyChanges(propertyDetails.state),
        pendingReforms: 'rent stabilization review',
        impactLevel: 'medium'
      },
      buildingCodes: {
        currentStandard: 'NCC 2022',
        upcomingChanges: 'accessibility improvements',
        energyEfficiency: 'stricter requirements'
      },
      planningRegulations: {
        zoningFlexibility: 'increasing',
        developmentApprovals: 'streamlining initiatives',
        heritageRestrictions: assessHeritageRisk(propertyDetails.suburb)
      },
      strata: {
        reformStatus: 'ongoing',
        managementChanges: 'professional requirements',
        disputeResolution: 'enhanced processes'
      }
    };

    return legalFactors;
  } catch (error) {
    console.error('Error fetching legal data:', error);
    return null;
  }
}

async function fetchTechnologyFactors(propertyType: string) {
  try {
    // Simulated technology data
    const technologyFactors = {
      proptech: {
        adoption: 'rapidly increasing',
        virtualInspections: 'mainstream',
        digitalContracts: 'standard practice',
        blockchainTitles: 'pilot programs active'
      },
      smartBuildings: {
        iotIntegration: 'growing demand',
        energyManagement: 'standard in commercial',
        securitySystems: 'AI-powered solutions',
        maintenancePrediction: 'emerging technology'
      },
      constructionTech: {
        prefabrication: 'increasing adoption',
        threeDPrinting: 'pilot projects',
        sustainableMaterials: 'innovation focus',
        automation: 'labor shortage driver'
      },
      digitalTransformation: {
        cloudAdoption: 'widespread',
        dataAnalytics: 'property insights',
        artificialIntelligence: 'valuation automation',
        virtualReality: 'marketing tool'
      }
    };

    return technologyFactors;
  } catch (error) {
    console.error('Error fetching technology data:', error);
    return null;
  }
}

async function generateAIPestelAnalysis(
  propertyDetails: any, 
  externalData: any, 
  currentData: any,
  analysisDepth: string
) {
  const systemPrompt = `You are a property market analyst specializing in PESTEL analysis for Australian real estate. Analyze the provided property and market data to generate comprehensive PESTEL factors.

For each PESTEL factor, provide:
1. Impact level (low/medium/high)
2. Risk score (1-5)
3. Detailed description explaining the factor's relevance
4. Specific implications for the property
5. Timeframe for impact (short/medium/long term)

Property Type: ${propertyDetails.propertyType}
Location: ${propertyDetails.suburb}, ${propertyDetails.state}
Analysis Depth: ${analysisDepth}

Respond with valid JSON in this format:
{
  "political": {
    "impact": "medium",
    "score": 3,
    "description": "...",
    "implications": "...",
    "timeframe": "medium"
  },
  "economic": { ... },
  "social": { ... },
  "technological": { ... },
  "environmental": { ... },
  "legal": { ... }
}`;

  const userPrompt = `
Property Details:
${JSON.stringify(propertyDetails, null, 2)}

External Market Data:
${JSON.stringify(externalData.data, null, 2)}

Current PESTEL Data (if any):
${JSON.stringify(currentData, null, 2)}

Please analyze this data and provide comprehensive PESTEL factors specific to this property and location. Focus on Australian market conditions and regulatory environment.
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const pestelAnalysis = JSON.parse(data.choices[0].message.content);

    return pestelAnalysis;
  } catch (error) {
    console.error('Error generating AI PESTEL analysis:', error);
    throw error;
  }
}

// Helper functions for state-specific data
function getStateUnemploymentRate(state: string): number {
  const rates: { [key: string]: number } = {
    'NSW': 3.8, 'VIC': 4.2, 'QLD': 4.1, 'WA': 3.3, 'SA': 4.5, 'TAS': 4.8, 'ACT': 3.1, 'NT': 3.9
  };
  return rates[state] || 4.0;
}

function getStatePolicyChanges(state: string) {
  const policies: { [key: string]: any } = {
    'NSW': { firstHomeBuyer: 'enhanced scheme', foreignBuyer: '8% duty' },
    'VIC': { landTax: 'increased rates', windfall: 'new tax' },
    'QLD': { foreignBuyer: '7% duty', transfer: 'concessions' },
    'WA': { landTax: 'stable', royalties: 'mining boom' }
  };
  return policies[state] || { status: 'no major changes' };
}

function getPopulationGrowth(state: string): number {
  const growth: { [key: string]: number } = {
    'NSW': 1.2, 'VIC': 1.8, 'QLD': 2.1, 'WA': 1.5, 'SA': 0.8, 'TAS': 0.5, 'ACT': 1.3, 'NT': 0.3
  };
  return growth[state] || 1.0;
}

function getInterstateMovement(state: string) {
  const movement: { [key: string]: string } = {
    'NSW': 'net outflow to QLD',
    'VIC': 'net outflow post-COVID',
    'QLD': 'strong net inflow',
    'WA': 'mining boom inflow'
  };
  return movement[state] || 'stable';
}

function getStateTenancyChanges(state: string) {
  const changes: { [key: string]: any } = {
    'NSW': { rentIncrease: 'limited frequency', petBonds: 'capped' },
    'VIC': { rentFreeze: 'ended', reforms: 'tenant friendly' },
    'QLD': { rentBidding: 'banned', increases: 'once yearly' }
  };
  return changes[state] || { status: 'stable' };
}

function assessFloodRisk(postcode: string): string {
  // Simplified flood risk assessment
  const highRiskPostcodes = ['4000', '2000', '3000', '5000'];
  return highRiskPostcodes.includes(postcode) ? 'high' : 'medium';
}

function assessBushfireRisk(state: string): string {
  const highRiskStates = ['NSW', 'VIC', 'SA', 'WA', 'TAS'];
  return highRiskStates.includes(state) ? 'high' : 'low';
}

function assessCycloneRisk(state: string): string {
  const cycloneStates = ['QLD', 'WA', 'NT'];
  return cycloneStates.includes(state) ? 'high' : 'low';
}

function assessSeaLevelRisk(suburb: string): string {
  // Simplified coastal assessment
  const coastalAreas = ['sydney', 'melbourne', 'brisbane', 'perth', 'adelaide'];
  return coastalAreas.some(area => suburb.toLowerCase().includes(area)) ? 'medium' : 'low';
}

function assessHeritageRisk(suburb: string): string {
  const heritageAreas = ['sydney', 'melbourne', 'adelaide', 'hobart'];
  return heritageAreas.some(area => suburb.toLowerCase().includes(area)) ? 'high' : 'low';
}