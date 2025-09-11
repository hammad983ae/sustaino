import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { type, data } = await req.json();
    console.log('Calculation request:', { type, data });

    let result;

    switch (type) {
      case 'property_valuation':
        result = await supabase.rpc('calculate_property_valuation', {
          property_data: data.property_data,
          market_data: data.market_data,
          comparable_sales: data.comparable_sales || null
        });
        break;

      case 'esg_score':
        result = await supabase.rpc('calculate_esg_score', {
          environmental_factors: data.environmental_factors,
          social_factors: data.social_factors,
          governance_factors: data.governance_factors
        });
        break;

      case 'sales_analysis':
        result = await supabase.rpc('analyze_sales_evidence', {
          subject_property: data.subject_property,
          comparable_sales: data.comparable_sales
        });
        break;

      default:
        throw new Error(`Unknown calculation type: ${type}`);
    }

    if (result.error) {
      console.error('Database calculation error:', result.error);
      throw new Error(result.error.message);
    }

    console.log('Calculation result:', result.data);

    return new Response(JSON.stringify({
      success: true,
      calculation: result.data,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in property-calculation function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});