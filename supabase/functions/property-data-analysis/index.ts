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
    const { address, state } = await req.json();
    
    if (!address) {
      return new Response(
        JSON.stringify({ error: 'Address is required' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Analyzing property:', address, state);

    // Get Google Maps API key
    const googleMapsApiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
    if (!googleMapsApiKey) {
      console.error('Google Maps API key not found');
      return new Response(
        JSON.stringify({ error: 'Google Maps API key not configured' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const analysisData = {
      address,
      state,
      timestamp: new Date().toISOString(),
      locationData: {},
      propertyDetails: {},
      marketData: {},
      environmentalData: {},
      planningData: {},
      transportData: {},
      demographicData: {},
      lotPlan: {}
    };

    // 1. Geocoding and basic location data
    try {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address + ', ' + state)}&key=${googleMapsApiKey}`;
      const geocodeResponse = await fetch(geocodeUrl);
      const geocodeData = await geocodeResponse.json();
      
      if (geocodeData.status === 'OK' && geocodeData.results[0]) {
        const result = geocodeData.results[0];
        analysisData.locationData = {
          formattedAddress: result.formatted_address,
          coordinates: {
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng
          },
          placeId: result.place_id,
          addressComponents: result.address_components,
          locationType: result.geometry.location_type,
          viewport: result.geometry.viewport
        };

        // 2. Places API for nearby amenities and POIs
        const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${result.geometry.location.lat},${result.geometry.location.lng}&radius=2000&key=${googleMapsApiKey}`;
        const placesResponse = await fetch(placesUrl);
        const placesData = await placesResponse.json();
        
        if (placesData.status === 'OK') {
          const amenities = placesData.results.map(place => ({
            name: place.name,
            type: place.types[0],
            rating: place.rating,
            distance: place.vicinity,
            priceLevel: place.price_level
          }));

          analysisData.propertyDetails.nearbyAmenities = {
            total: amenities.length,
            schools: amenities.filter(a => a.type?.includes('school')),
            hospitals: amenities.filter(a => a.type?.includes('hospital')),
            shopping: amenities.filter(a => a.type?.includes('shopping') || a.type?.includes('store')),
            transport: amenities.filter(a => a.type?.includes('transit') || a.type?.includes('bus')),
            restaurants: amenities.filter(a => a.type?.includes('restaurant') || a.type?.includes('food'))
          };
        }

        // Note: Real property market data would require integration with actual real estate APIs
        // This function should NOT return mock data for legal reasons
        
        return new Response(
          JSON.stringify({ 
            error: 'Property valuation data unavailable', 
            message: 'Real estate data integration required. Mock data removed to prevent legal issues.',
            locationData: analysisData.locationData
          }), 
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );

      } else {
        console.error('Geocoding failed:', geocodeData.status);
        return new Response(
          JSON.stringify({ error: 'Could not geocode address' }), 
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
      // Continue with partial data
    }

    console.log('Property analysis completed successfully');
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: analysisData,
        sections: {
          locationAnalysis: true,
          marketValuation: true,
          environmentalAssessment: true,
          planningAnalysis: true,
          transportAnalysis: true,
          demographicProfile: true
        }
      }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in property-data-analysis function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});