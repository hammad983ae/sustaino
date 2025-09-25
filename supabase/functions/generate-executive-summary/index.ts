import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SummaryRequest {
  sectionSummaries: Record<string, any>;
  propertyAddress: string;
  propertyType: string;
  reportType: string;
  valuationPurpose: string;
  marketValue?: number;
  keyFindings: {
    hasPlanning: boolean;
    hasValuation: boolean;
    hasSalesEvidence: boolean;
    hasRiskAssessment: boolean;
    hasTenancy: boolean;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const summaryRequest: SummaryRequest = await req.json();
    
    console.log('Generating executive summary for:', summaryRequest.propertyAddress);

    // Prepare comprehensive prompt for AI analysis
    const prompt = createExecutiveSummaryPrompt(summaryRequest);

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
            content: 'You are a professional property valuer with expertise in creating comprehensive executive summaries for property valuation reports. Focus on key findings, market value conclusions, investment recommendations, and critical risk factors.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const generatedSummary = data.choices[0].message.content;

    // Enhance the AI summary with structured analysis
    const enhancedSummary = enhanceWithStructuredAnalysis(generatedSummary, summaryRequest);

    console.log('Executive summary generated successfully');

    return new Response(JSON.stringify({ 
      success: true,
      summary: enhancedSummary,
      metadata: {
        sectionsAnalyzed: Object.keys(summaryRequest.sectionSummaries).length,
        propertyType: summaryRequest.propertyType,
        reportType: summaryRequest.reportType,
        generatedAt: new Date().toISOString()
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating executive summary:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate executive summary'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function createExecutiveSummaryPrompt(request: SummaryRequest): string {
  const { sectionSummaries, propertyAddress, propertyType, reportType, valuationPurpose, marketValue, keyFindings } = request;

  let prompt = `Create a professional executive summary for a ${reportType} ${propertyType} property valuation report.

**Property Details:**
- Address: ${propertyAddress}
- Property Type: ${propertyType}
- Report Type: ${reportType}
- Valuation Purpose: ${valuationPurpose}`;

  if (marketValue) {
    prompt += `\n- Market Value: $${marketValue.toLocaleString()}`;
  }

  prompt += `\n\n**Available Report Sections:**\n`;

  // Add section summaries
  Object.entries(sectionSummaries).forEach(([key, section]: [string, any]) => {
    prompt += `\n**${section.title}:**\n${section.content}\n`;
    if (section.keyPoints?.length > 0) {
      section.keyPoints.forEach((point: string) => {
        prompt += `• ${point}\n`;
      });
    }
  });

  prompt += `\n**Analysis Completeness:**
- Planning Analysis: ${keyFindings.hasPlanning ? 'Complete' : 'Limited'}
- Valuation Analysis: ${keyFindings.hasValuation ? 'Complete' : 'Limited'}
- Sales Evidence: ${keyFindings.hasSalesEvidence ? 'Available' : 'Limited'}
- Risk Assessment: ${keyFindings.hasRiskAssessment ? 'Complete' : 'Limited'}
- Tenancy Analysis: ${keyFindings.hasTenancy ? 'Complete' : 'Not Applicable'}

**Requirements:**
1. Create a concise but comprehensive executive summary (300-400 words)
2. Highlight key valuation conclusions and market value assessment
3. Summarize critical risk factors and investment considerations
4. Include specific recommendations based on the analysis
5. Maintain professional valuation terminology
6. Focus on actionable insights for the intended audience

Please generate the executive summary now:`;

  return prompt;
}

function enhanceWithStructuredAnalysis(aiSummary: string, request: SummaryRequest): string {
  let enhanced = aiSummary;

  // Add investment grade assessment
  const sectionsComplete = Object.keys(request.keyFindings).filter(key => 
    request.keyFindings[key as keyof typeof request.keyFindings]
  ).length;

  const analysisQuality = sectionsComplete >= 4 ? 'Comprehensive' : 
                         sectionsComplete >= 3 ? 'Substantial' : 'Limited';

  enhanced += `\n\n**Analysis Quality:** ${analysisQuality} analysis completed with ${sectionsComplete} of 5 key assessment areas addressed.`;

  // Add market value confidence indicator
  if (request.marketValue) {
    const confidenceLevel = request.keyFindings.hasValuation && request.keyFindings.hasSalesEvidence ? 'High' :
                           request.keyFindings.hasValuation || request.keyFindings.hasSalesEvidence ? 'Medium' : 'Preliminary';
    
    enhanced += `\n\n**Market Value Confidence:** ${confidenceLevel} confidence in the assessed market value of $${request.marketValue.toLocaleString()} based on available evidence and analysis depth.`;
  }

  return enhanced;
}