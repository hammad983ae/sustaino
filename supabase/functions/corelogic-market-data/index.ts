import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { location, radius = 1000 } = await req.json();
    const apiKey = Deno.env.get('CORELOGIC_API_KEY');

    if (!apiKey) {
      throw new Error('CoreLogic API key not configured');
    }

    // Fetch market data from CoreLogic API
    const response = await fetch(`https://api.corelogic.com.au/v1/market-data`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location,
        radius,
        includeComparables: true,
        includeMarketIndicators: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`CoreLogic API error: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify({
      success: true,
      data: {
        marketIndicators: data.indicators || [],
        comparableSales: data.sales || [],
        marketSummary: data.summary || {},
        lastUpdated: new Date().toISOString(),
      },
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in corelogic-market-data function:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});