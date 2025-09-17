import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
  console.log(`Request from IP: ${clientIP}`);

  try {
    // Try multiple possible secret names for Google Maps API key
    const googleMapsApiKey = Deno.env.get('GOOGLE_MAPS_API_KEY2') ||
                             Deno.env.get('GOOGLE_MAPS_API_KEY') || 
                             Deno.env.get('GOOGLE_AERIAL_PHOTOS_API_KEY') ||
                             Deno.env.get('Google Maps') || 
                             Deno.env.get('GM');
    
    console.log('Available env vars:', Object.keys(Deno.env.toObject()).filter(key => key.toLowerCase().includes('google') || key.toLowerCase().includes('map') || key.toLowerCase().includes('gm')));
    console.log('Google Maps API key found:', !!googleMapsApiKey);
    
    if (!googleMapsApiKey) {
      console.error('Google Maps API key not found in environment variables');
      console.error('Checked: GOOGLE_MAPS_API_KEY2, GOOGLE_MAPS_API_KEY, GOOGLE_AERIAL_PHOTOS_API_KEY, Google Maps, GM');
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