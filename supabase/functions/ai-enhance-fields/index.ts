import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pageType, currentData, missingFields, propertyDetails } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create a contextual prompt based on page type and property details
    const systemPrompt = getSystemPromptForPageType(pageType);
    const userPrompt = createUserPrompt(pageType, currentData, missingFields, propertyDetails);

    console.log('AI Enhancement Request:', { pageType, missingFields });

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
        max_tokens: 1500
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API Error:', error);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    let enhancedData;

    try {
      enhancedData = JSON.parse(data.choices[0].message.content);
    } catch (parseError) {
      console.error('Failed to parse AI response:', data.choices[0].message.content);
      throw new Error('Invalid AI response format');
    }

    console.log('AI Enhancement Response:', enhancedData);

    return new Response(JSON.stringify({ enhancedData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-enhance-fields function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to enhance fields'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getSystemPromptForPageType(pageType: string): string {
  const basePrompt = `You are an AI assistant specialized in property valuation and real estate analysis. Your task is to analyze property data and provide professional, accurate suggestions for missing or incomplete fields.

Always respond with valid JSON format only. Do not include any explanatory text outside the JSON structure.`;

  const pageSpecificPrompts: Record<string, string> = {
    'valuation-summary': `${basePrompt}
    
Focus on valuation summary fields including:
- Interest valued (freehold, leasehold, etc.)
- Highest and best use
- Value components
- Currency considerations
- Market value estimations based on property characteristics

Provide realistic, professional assessments based on Australian property standards.`,

    'property-identification': `${basePrompt}
    
Focus on property identification aspects:
- Physical inspection requirements
- Survey and mapping needs
- Legal documentation requirements
- Property boundaries and identification methods

Base suggestions on standard Australian property identification practices.`,

    'location-analysis': `${basePrompt}
    
Focus on location and market analysis:
- Area demographics and characteristics
- Transport and infrastructure
- Local amenities and services
- Market trends and comparable sales
- Location advantages and disadvantages

Use knowledge of Australian property markets and locations.`,

    'risk-assessment': `${basePrompt}
    
Focus on property and investment risk factors:
- Physical risks (flooding, fire, structural)
- Market risks (demand, supply, economic factors)
- Legal risks (planning, zoning, compliance)
- Environmental risks and considerations

Apply Australian property risk assessment standards.`
  };

  return pageSpecificPrompts[pageType] || basePrompt;
}

function createUserPrompt(pageType: string, currentData: any, missingFields: string[], propertyDetails: any): string {
  return `
Property Details:
${JSON.stringify(propertyDetails, null, 2)}

Current ${pageType} Data:
${JSON.stringify(currentData, null, 2)}

Missing or incomplete fields that need enhancement:
${missingFields.join(', ')}

Please analyze the property details and current data to suggest appropriate values for the missing fields. 

Respond with ONLY a JSON object containing the field names as keys and the suggested values. For example:
{
  "fieldName1": "suggested value",
  "fieldName2": "suggested value",
  "fieldName3": "suggested value"
}

Ensure all suggestions are:
- Professional and realistic
- Based on Australian property standards
- Appropriate for the property type and location
- Consistent with existing data
- Industry-standard terminology and values
`;
}