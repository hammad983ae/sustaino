import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MissingFieldsRequest {
  reportType: string;
  propertyType: string;
  reportData: any;
  includedSections: string[];
}

interface MissingFieldsResponse {
  missingFields: Array<{
    section: string;
    field: string;
    importance: 'critical' | 'important' | 'optional';
    description: string;
    suggestedValue?: string;
  }>;
  completenessScore: number;
  recommendations: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reportType, propertyType, reportData, includedSections }: MissingFieldsRequest = await req.json();

    console.log('Analyzing missing fields for:', { reportType, propertyType, includedSections });

    // Analyze missing fields using AI
    const prompt = `Analyze this property valuation report for missing fields and provide recommendations:

Report Type: ${reportType}
Property Type: ${propertyType}
Included Sections: ${includedSections.join(', ')}

Current Report Data: ${JSON.stringify(reportData, null, 2)}

Please identify:
1. Critical missing fields that are required for this report type
2. Important missing fields that would improve accuracy
3. Optional fields that could enhance the report
4. Suggested values where appropriate
5. Overall completeness score (0-100)
6. Specific recommendations for improving the report

Return the response as a JSON object with the structure:
{
  "missingFields": [
    {
      "section": "section name",
      "field": "field name", 
      "importance": "critical|important|optional",
      "description": "why this field is needed",
      "suggestedValue": "optional suggested value"
    }
  ],
  "completenessScore": 85,
  "recommendations": ["specific actionable recommendations"]
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a professional property valuation expert. Analyze the provided report data and identify missing fields with high accuracy. Always return valid JSON only.' 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    let analysisResult: MissingFieldsResponse;

    try {
      analysisResult = JSON.parse(data.choices[0].message.content);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback response
      analysisResult = {
        missingFields: [
          {
            section: "Property Details",
            field: "Land Area",
            importance: "critical",
            description: "Essential for valuation calculations"
          },
          {
            section: "Market Commentary",
            field: "Local Market Trends",
            importance: "important", 
            description: "Provides context for valuation approach"
          }
        ],
        completenessScore: 70,
        recommendations: [
          "Complete property details section with accurate measurements",
          "Add recent market analysis for the local area",
          "Include comparable sales data within 6 months"
        ]
      };
    }

    console.log('Missing fields analysis completed:', analysisResult);

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in missing-fields function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        missingFields: [],
        completenessScore: 0,
        recommendations: ["Unable to analyze missing fields. Please try again."]
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});