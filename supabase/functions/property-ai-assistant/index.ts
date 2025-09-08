import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Property AI Assistant function called');
  
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Processing AI request...');
    const body = await req.json();
    console.log('Request body:', body);
    
    const { message, context } = body;
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    console.log('OpenAI API Key available:', !!openAIApiKey);

    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `You are an expert Property Analysis AI Assistant for DeLorenzo Property Group. You specialize in:

- Property valuations and market analysis
- Investment property assessments
- Rental yield calculations
- Market trends and insights
- Risk assessment and mitigation
- ESG (Environmental, Social, Governance) analysis
- Compliance and regulatory guidance
- Property portfolio optimization

Key capabilities:
- Analyze property data and provide detailed insights
- Calculate investment returns and projections
- Assess market conditions and trends
- Provide ESG scoring and recommendations
- Help with compliance and licensing requirements
- Offer strategic investment advice

Always provide professional, accurate, and actionable advice. When discussing financial matters, remind users to consult with qualified professionals for personalized advice.

Context about the user's current activity: ${context || 'General property consultation'}`;

    console.log('Making OpenAI API call...');
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
          { role: 'user', content: message }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    console.log('OpenAI response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      const error = JSON.parse(errorText);
      throw new Error(error.error?.message || 'Failed to get AI response');
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log('AI response received successfully');
    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in property-ai-assistant:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});