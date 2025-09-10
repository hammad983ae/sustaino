import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    // Get Google Maps API key from Supabase secrets - try multiple possible secret names
    let googleMapsApiKey = Deno.env.get('GOOGLE_MAPS_API_KEY') || 
                          Deno.env.get('Geolocation') || 
                          Deno.env.get('GOOGLE_MAPS_API_KE');
    
    console.log('Available env vars:', Object.keys(Deno.env.toObject()).filter(key => key.toLowerCase().includes('google') || key.toLowerCase().includes('map') || key.toLowerCase().includes('geo')));
    console.log('Google Maps API key found:', !!googleMapsApiKey);
    console.log('Key source:', googleMapsApiKey ? (Deno.env.get('GOOGLE_MAPS_API_KEY') ? 'GOOGLE_MAPS_API_KEY' : Deno.env.get('Geolocation') ? 'Geolocation' : 'GOOGLE_MAPS_API_KE') : 'none');
    
    if (!googleMapsApiKey) {
      console.error('Google Maps API key not found in environment variables');
      console.error('Checked: GOOGLE_MAPS_API_KEY, Google Maps, GM');
      return new Response(
        JSON.stringify({ error: 'Google Maps API key not configured' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Successfully retrieved Google Maps API key');
    
    return new Response(
      JSON.stringify({ apiKey: googleMapsApiKey }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error in get-google-maps-key function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { 
 status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
})