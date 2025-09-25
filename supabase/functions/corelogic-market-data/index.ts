import "https://deno.land/x/xhr@0.1.0/mod.ts";
// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'",
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { location, radius = 1000 } = body;
    
    // Input validation
    if (!location || typeof location !== 'string' || location.trim().length === 0) {
      throw new Error('Invalid location parameter');
    }
    if (typeof radius !== 'number' || radius < 100 || radius > 50000) {
      throw new Error('Invalid radius parameter (must be between 100 and 50000)');
    }
    
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
      error: error instanceof Error ? error.message : 'Unknown error',
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});