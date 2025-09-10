import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AerialPhotosRequest {
  address: string;
  lat?: number;
  lng?: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { address, lat, lng }: AerialPhotosRequest = await req.json();
    const apiKey = Deno.env.get("GOOGLE_AERIAL_PHOTOS_API_KEY");

    if (!apiKey) {
      throw new Error("Google Aerial Photos API key not configured");
    }

    console.log('Fetching aerial photos for:', address);

    // Use Google Maps Static API for aerial/satellite imagery
    const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
    
    // Generate multiple aerial views
    const aerialPhotos = [];
    const zoomLevels = [15, 17, 19]; // Different zoom levels for various perspectives
    
    for (const zoom of zoomLevels) {
      let mapUrl = `${baseUrl}?`;
      
      if (lat && lng) {
        mapUrl += `center=${lat},${lng}&`;
      } else {
        mapUrl += `center=${encodeURIComponent(address)}&`;
      }
      
      mapUrl += `zoom=${zoom}&`;
      mapUrl += `size=800x600&`;
      mapUrl += `maptype=satellite&`;
      mapUrl += `format=png&`;
      mapUrl += `key=${apiKey}`;

      aerialPhotos.push({
        url: mapUrl,
        zoom: zoom,
        type: zoom === 15 ? 'overview' : zoom === 17 ? 'detailed' : 'close-up',
        description: `${zoom === 15 ? 'Aerial Overview' : zoom === 17 ? 'Detailed Aerial View' : 'Close-up Aerial View'} - ${address}`
      });
    }

    // Also get street view if coordinates are available
    if (lat && lng) {
      const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=800x600&location=${lat},${lng}&heading=0&pitch=0&key=${apiKey}`;
      
      aerialPhotos.push({
        url: streetViewUrl,
        zoom: 0,
        type: 'street-view',
        description: `Street View - ${address}`
      });
    }

    console.log("Aerial photos generated successfully:", aerialPhotos.length);

    return new Response(JSON.stringify({ 
      success: true, 
      photos: aerialPhotos,
      address: address
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error fetching aerial photos:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);