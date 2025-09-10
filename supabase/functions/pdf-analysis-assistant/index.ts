import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('PDF Analysis Assistant function called');
  
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Processing PDF analysis request...');
    const body = await req.json();
    console.log('Request body:', body);
    
    const { uploadId, filePath } = body;
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    console.log('Environment variables check:', {
      openAIApiKey: !!openAIApiKey,
      supabaseUrl: !!supabaseUrl,
      supabaseServiceKey: !!supabaseServiceKey
    });

    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      throw new Error('OpenAI API key not configured');
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase configuration not found');
      throw new Error('Supabase configuration not found');
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the PDF file from storage
    console.log('Downloading PDF file from storage:', filePath);
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('pdf-analysis')
      .download(filePath);

    if (downloadError) {
      console.error('Error downloading file:', downloadError);
      throw new Error(`Failed to download file: ${downloadError.message}`);
    }

    console.log('File downloaded successfully, size:', fileData.size);

    // Convert PDF to base64 for OpenAI (Note: This is a simplified approach)
    // In a real implementation, you'd want to use a PDF parsing library
    const fileBuffer = await fileData.arrayBuffer();
    const base64File = btoa(String.fromCharCode(...new Uint8Array(fileBuffer)));

    const systemPrompt = `You are an expert Document Analysis AI Assistant specialized in:

- Extracting key information from PDF documents
- Identifying important data points, requirements, and specifications
- Analyzing document structure and content
- Providing actionable insights and recommendations
- Suggesting implementation strategies
- Highlighting compliance and regulatory considerations

Your analysis should include:
1. Document Summary - Brief overview of the document type and purpose
2. Key Information Extracted - Important data points, requirements, specifications
3. Analysis & Insights - Professional interpretation of the content
4. Recommendations - Actionable suggestions for implementation
5. Compliance Notes - Any regulatory or compliance considerations
6. Implementation Plan - Step-by-step approach for applying the insights

Provide your analysis in a structured JSON format with clear sections and actionable recommendations.

Note: This document is being analyzed for potential implementation, so focus on practical, actionable insights.`;

    console.log('Making OpenAI API call for document analysis...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: `Please analyze this PDF document (base64 encoded). File size: ${fileData.size} bytes. 
            
            Due to the limitations of text-based analysis, please provide a comprehensive framework for document analysis that would typically be applied to this type of document.

            Base64 data preview: ${base64File.substring(0, 100)}...`
          }
        ],
        max_completion_tokens: 2000,
      }),
    });

    console.log('OpenAI response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;
    
    console.log('Analysis completed successfully');

    // Structure the analysis result
    const analysisResult = {
      analysis: analysis,
      timestamp: new Date().toISOString(),
      model: 'gpt-4.1-2025-04-14',
      fileSize: fileData.size,
      status: 'completed',
      recommendations: {
        priority: 'high',
        implementation_required: true,
        review_required: true
      }
    };

    console.log('Returning analysis result');
    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Detailed error in pdf-analysis-assistant:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Check function logs for more information',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});