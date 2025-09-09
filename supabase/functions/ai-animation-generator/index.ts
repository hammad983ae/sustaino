import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenerateAnimationRequest {
  prompt: string;
  width?: number;
  height?: number;
  model?: string;
  steps?: number;
}

interface RunwareResponse {
  taskType: string;
  taskUUID: string;
  imageUUID?: string;
  imageURL?: string;
  NSFWContent?: boolean;
  cost?: number;
  seed?: number;
  positivePrompt?: string;
  error?: string;
  errorMessage?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RUNWARE_API_KEY = Deno.env.get('RUNWARE_API_KEY');
    if (!RUNWARE_API_KEY) {
      console.error('RUNWARE_API_KEY is not set');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const body: GenerateAnimationRequest = await req.json();
    console.log('Received request:', body);

    if (!body.prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const taskUUID = crypto.randomUUID();
    console.log('Generated taskUUID:', taskUUID);

    // Prepare the request for Runware API
    const runwareRequest = [
      {
        taskType: "authentication",
        apiKey: RUNWARE_API_KEY
      },
      {
        taskType: "imageInference",
        taskUUID: taskUUID,
        positivePrompt: body.prompt,
        width: body.width || 1024,
        height: body.height || 1024,
        model: body.model || "runware:100@1",
        numberResults: 1,
        outputFormat: "WEBP",
        CFGScale: 7,
        scheduler: "FlowMatchEulerDiscreteScheduler",
        steps: body.steps || 4,
        strength: 0.8
      }
    ];

    console.log('Sending request to Runware API:', JSON.stringify(runwareRequest, null, 2));

    // Call Runware API
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(runwareRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Runware API error response:', response.status, errorText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to generate animation',
          details: `API returned ${response.status}: ${errorText}`
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    console.log('Runware API response:', JSON.stringify(data, null, 2));

    // Find the image generation result
    const imageResult = data.data?.find((item: RunwareResponse) => 
      item.taskType === 'imageInference' && item.taskUUID === taskUUID
    );

    if (!imageResult) {
      console.error('No image result found in response:', data);
      return new Response(
        JSON.stringify({ 
          error: 'No image generated',
          details: 'The API did not return an image result'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (imageResult.error) {
      console.error('Image generation error:', imageResult.errorMessage);
      return new Response(
        JSON.stringify({ 
          error: 'Image generation failed',
          details: imageResult.errorMessage 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Return the successful result
    const result = {
      success: true,
      imageURL: imageResult.imageURL,
      prompt: imageResult.positivePrompt,
      seed: imageResult.seed,
      cost: imageResult.cost,
      taskUUID: imageResult.taskUUID,
      NSFWContent: imageResult.NSFWContent || false
    };

    console.log('Returning successful result:', result);

    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in ai-animation-generator function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});