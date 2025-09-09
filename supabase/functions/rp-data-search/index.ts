import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { searchType, query, filters } = await req.json();
    const rpDataApiKey = Deno.env.get('RP_DATA_API_KEY');
    
    if (!rpDataApiKey) {
      console.error('RP Data API key not found');
      return new Response(
        JSON.stringify({ error: 'RP Data API key not configured' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    let endpoint = '';
    let requestBody = {};

    // Configure endpoint based on search type
    switch (searchType) {
      case 'address':
        endpoint = 'https://api.rpdata.com/v1/properties/search/address';
        requestBody = {
          address: query,
          ...filters
        };
        break;
      case 'lotplan':
        endpoint = 'https://api.rpdata.com/v1/properties/search/lotplan';
        requestBody = {
          lot: query.lot,
          plan: query.plan,
          ...filters
        };
        break;
      case 'sales':
        endpoint = 'https://api.rpdata.com/v1/sales/search';
        requestBody = {
          ...query,
          ...filters
        };
        break;
      case 'rentals':
        endpoint = 'https://api.rpdata.com/v1/rentals/search';
        requestBody = {
          ...query,
          ...filters
        };
        break;
      default:
        throw new Error('Invalid search type');
    }

    console.log(`Making RP Data API call to: ${endpoint}`);
    console.log('Request body:', requestBody);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${rpDataApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('RP Data API error:', response.status, errorText);
      throw new Error(`RP Data API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('RP Data API response received:', data);

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in RP Data search:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        success: false 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});