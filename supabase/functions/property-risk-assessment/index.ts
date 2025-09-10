import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PROPERTY_RISK_MATRIX = `
## PropertyPRO Risk Rating Matrix

### PROPERTY RISK RATINGS (1-5 scale)

#### Location / Neighbourhood
1 - Low risk: Sought after residential location with similar surrounding development, prestige locations
2 - Low to medium risk: Standard/established residential areas
3 - Medium risk: Secondary locations, limited facilities and amenities, proximity to inferior quality properties, proximity to low impact 'non-residential' land uses
4 - Medium to high risk: Non sought after location, uncomplimentary surrounding development, proximity to non-residential property uses with negative impact, remote from major facilities and amenities, market stigma to area
5 - High risk: Proximity to major industry, isolated community, poorly perceived location, other extreme risk

#### Land (including planning, Title)
1 - Low risk: Block is freehold, level, Title and Title Plan sighted, no apparent adverse issues, residential zoning
2 - Low to medium risk: Block is freehold, near level, Title and Title Plan not sighted, known encumbrances/easements having little/no impact on marketability/value
3 - Medium risk: Secure Leasehold Interest/Perpetual Leases, adverse impact to marketability due to physical characteristics, valuation subject to issue of Title, poor vehicular access, normal utility services available but not connected, known encumbrances/easements that may adversely affect marketability/value, overlays/zones such as Heritage, bonding agreement covering completion of land subdivision
4 - Medium to high risk: Characteristics of land result in specialised construction techniques required, Leasehold title where 'term certain' results in poor security, known encumbrances/easements that adversely affect marketability/value, access issues (e.g. by ferry only), property protected by 'existing use rights/provisions', 'Limited Title' scenario in NSW
5 - High risk: Illegal use of property, cultural/heritage issues, extremely difficult access, affected adversely by current/known future authority proposals/requirements, other extreme risk

#### Environmental Issues
1 - Low risk: No environmental issues noted or identified
2 - Low to medium risk: Non-invasive environmental issues typical for locality that don't warrant additional comment
3 - Medium risk: Proximity to main road/train line/moderate traffic noise/coastal issues, known flood zone/water over property but not adversely impacting existing improvements, storm surge area, overlays/zones such as bushfire/flood/cyclone/mine subsidence district, previous site contamination rehabilitated but restrictions on use remain
4 - Medium to high risk: Property adjacent to/affected by airport/major arterial roadway/train line/major traffic noise/high tension transmission lines/service stations/electrical substation, known flood zone/water over property impacting existing improvements, geotechnical issues such as landslip, elevated/high bushfire risk locations
5 - High risk: Known/suspected site contamination from previous land use, evidence of soil contamination (not rehabilitated) or radioactive material, next to polluting site, property adversely affected by mining subsidence, property directly affected by coastal erosion, other extreme risk

#### Improvements
1 - Low risk: Fully established dwelling and associated ground improvements with sound layout/design/appearance, Certificate of Completion or Certification sighted for recently completed dwelling
2 - Low to medium risk: Existing dwelling/ancillary improvements with normal wear and tear in average to good condition for age, typical for locality
3 - Medium risk: Dwelling without standard ancillary improvements for locality, maintenance required but not considered 'essential repairs', dwellings with unusual layout or design, all TBE valuations, any evidence of past termite damage, presence of stable asbestos but not unusual for age of improvements and locality/market
4 - Medium to high risk: Essential repairs required, dwelling under construction/renovation, observable unstable asbestos (broken/cracked), possible building code issues (low ceiling height/non-approved improvements), partial damage by fire/flood, suspected active termites, dwellings with less than 50m² living areas, progress payment schedule not supplied for TBE/renovation, TBEs where progress payment schedule doesn't reflect final contract price, TBEs where progress payments are front-end loaded or outside legislative/industry parameters, overcapitalised property, unit/apartment development 'appears to be clad' or 'known to be clad', dwellings with significant/adverse design issues
5 - High risk: Evidence of major structural faults or issues, entire dwelling gutted, observable friable asbestos, unit/apartment development known to contain 'non-compliant/non-conforming cladding', other extreme risk

#### Cold Storage Facility Improvements (specialized criteria)
1 - Low risk: Fully operational cold storage with current refrigeration systems, all certifications current, modern energy-efficient equipment
2 - Low to medium risk: Operational facility with minor maintenance required, certifications current, standard efficiency systems
3 - Medium risk: Operational but aging refrigeration systems (10-15 years), some certifications pending renewal, moderate energy efficiency, requires routine maintenance
4 - Medium to high risk: Older refrigeration systems (15+ years), expired or pending critical certifications (HACCP, building certificates), high energy costs, significant maintenance required, limited backup systems
5 - High risk: Non-operational or failing refrigeration systems, no current certifications, obsolete technology, structural issues affecting temperature control, environmental compliance issues, no backup power/refrigeration

### MARKET RISK RATINGS (1-5 scale)

#### Market Direction (price)
1 - Low risk: Stable, steady and consistent market prices
2 - Low to medium risk: Consistent low to moderate increase in market prices
3 - Medium risk: Early signs of change (either increase or decrease) in market prices
4 - Medium to high risk: Definite signs of change (either increase or decrease) in market prices
5 - High risk: Continuous and significant change (increase or decrease) in market prices, steeply rising or declining market prices

#### Market Activity
1 - Low risk: High demand and low supply of competing product to subject property at date of valuation
2 - Low to medium risk: Supply and demand of competing product to subject property in equilibrium at date of valuation
3 - Medium risk: Potential oversupply of competing product to subject property at date of valuation or expected in next 6-12 months
4 - Medium to high risk: Apparent oversupply of competing product to subject property at date of valuation or expected in next 3-6 months
5 - High risk: Known/current oversupply of competing product to subject property at date of valuation

#### Local/Regional Economy Impact
1 - Low risk: Local/regional economy stable, broad based and not reliant on one or two major industries
2 - Low to medium risk: Normal seasonal fluctuation in local/regional economy
3 - Medium risk: Above average seasonal fluctuation in local/regional economy, evidence of softening in local/regional economy
4 - Medium to high risk: Significant fluctuations in local/regional economy (e.g. mining/rural/drought exposed industries), local/regional economy not broad based and reliant on one or two major industries
5 - High risk: Significant decline evident in local/regional economy, other extreme risk

#### Market Segment Conditions
1 - Low risk: Readily saleable property with expected selling period of up to 6 weeks, demand underpinned by owner occupier market, AMV supported by sales evidence within past 6 months
2 - Low to medium risk: Expected marketing/selling period of up to 3 months, AMV supported by sales evidence within last 6 months
3 - Medium risk: Expected marketing/selling period of up to 6 months, limited available sales evidence within last 6 months that supports AMV, sales evidence suggests fairly broad range in value, known restriction on re-sale of subject property in open market, Over 55's unit/apartment with restriction on occupation/ownership
4 - Medium to high risk: Expected marketing/selling period of up to 12 months, unique property for locality, limited available sales evidence within last 12 months that supports AMV, market largely driven by interstate/overseas investors and/or other factors, contract price unable to be supported by available sales evidence
5 - High risk: Expected marketing/selling period of over 12 months, limited potential purchasers for subject property, no available sales evidence within last 12 months that supports AMV, AMV not meeting current sale price by 10% or more, other extreme risk

#### Cold Storage Market Segment Conditions (specialized criteria)
1 - Low risk: Strong demand from cold storage operators, readily saleable to specialized market within 6 weeks, supported by recent comparable sales
2 - Low to medium risk: Moderate demand in specialized market, expected selling period up to 3 months, some comparable sales evidence
3 - Medium risk: Limited specialized market demand, expected selling period up to 6 months, limited comparable sales, may require conversion considerations
4 - Medium to high risk: Very limited market demand, expected selling period up to 12 months, virtually no comparable sales, high conversion costs to alternative use, market driven by very few specialized operators
5 - High risk: Extremely limited market (single-purpose facility), expected selling period over 12 months, no comparable sales evidence, prohibitive conversion costs, obsolete technology limiting appeal to modern operators
`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { propertyData } = await req.json();

    console.log('Risk assessment request received:', { propertyData });

    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const prompt = `
You are a professional property valuer analyzing a property for risk assessment according to the PropertyPRO Supporting Memorandum guidelines.

Based on the following property data, assign risk ratings (1-5) for each category according to the PropertyPRO Risk Rating Matrix:

PROPERTY DATA:
${JSON.stringify(propertyData, null, 2)}

RISK RATING MATRIX:
${PROPERTY_RISK_MATRIX}

Analyze the property data and assign appropriate risk ratings for each of the 8 categories:

PROPERTY RISK RATINGS:
1. Location / Neighbourhood
2. Land (including planning, Title)
3. Environmental Issues
4. Improvements

MARKET RISK RATINGS:
5. Market Direction (price)
6. Market Activity
7. Local/Regional Economy Impact
8. Market Segment Conditions

For each rating, provide:
- The rating number (1-5)
- Brief justification based on the criteria
- Any specific factors from the property data that influenced the rating

Return your response as a JSON object with this structure:
{
  "propertyRiskRatings": {
    "location": { "rating": number, "justification": "string" },
    "land": { "rating": number, "justification": "string" },
    "environmental": { "rating": number, "justification": "string" },
    "improvements": { "rating": number, "justification": "string" }
  },
  "marketRiskRatings": {
    "marketDirection": { "rating": number, "justification": "string" },
    "marketActivity": { "rating": number, "justification": "string" },
    "localEconomy": { "rating": number, "justification": "string" },
    "marketSegment": { "rating": number, "justification": "string" }
  },
  "overallAssessment": "string",
  "requiresCommentary": ["array of categories with ratings >= 3"]
}

Be conservative in your ratings and ensure they align precisely with the PropertyPRO matrix criteria.
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: 'You are a professional property valuer with expertise in PropertyPRO risk assessment. Analyze property data strictly according to the provided risk matrix and assign accurate risk ratings.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.3
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      return new Response(JSON.stringify({ 
        error: 'OpenAI API request failed', 
        details: errorText 
      }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('OpenAI response received');

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response structure:', data);
      return new Response(JSON.stringify({ error: 'Invalid response from OpenAI' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const analysisText = data.choices[0].message.content;
    
    try {
      // Extract JSON from the response
      const jsonStart = analysisText.indexOf('{');
      const jsonEnd = analysisText.lastIndexOf('}') + 1;
      const jsonText = analysisText.slice(jsonStart, jsonEnd);
      const riskAssessment = JSON.parse(jsonText);

      console.log('Risk assessment completed successfully');

      return new Response(JSON.stringify({
        success: true,
        riskAssessment,
        rawAnalysis: analysisText
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (parseError) {
      console.error('Failed to parse JSON from OpenAI response:', parseError);
      console.error('Raw response:', analysisText);
      
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to parse risk assessment',
        rawAnalysis: analysisText
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in property-risk-assessment function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error', 
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});