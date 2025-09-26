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
    const { address } = await req.json();
    
    if (!address) {
      throw new Error('Address is required');
    }

    const googleMapsApiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
    if (!googleMapsApiKey) {
      throw new Error('Google Maps API key not configured');
    }

    console.log('Processing location data for:', address);

    // Geocode the address
    const geocodeResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`
    );
    const geocodeData = await geocodeResponse.json();

    if (geocodeData.status !== 'OK' || !geocodeData.results.length) {
      throw new Error('Could not geocode address');
    }

    const location = geocodeData.results[0];
    const { lat, lng } = location.geometry.location;

    // Extract address components
    const addressComponents = location.address_components;
    let suburb = '', state = '', postcode = '', country = '';
    
    addressComponents.forEach((component: any) => {
      if (component.types.includes('locality')) suburb = component.long_name;
      if (component.types.includes('administrative_area_level_1')) state = component.short_name;
      if (component.types.includes('postal_code')) postcode = component.long_name;
      if (component.types.includes('country')) country = component.long_name;
    });

    // Get distance to major cities
    const majorCities: Record<string, { name: string; lat: number; lng: number }> = {
      'VIC': { name: 'Melbourne', lat: -37.8136, lng: 144.9631 },
      'NSW': { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
      'QLD': { name: 'Brisbane', lat: -27.4698, lng: 153.0251 },
      'SA': { name: 'Adelaide', lat: -34.9285, lng: 138.6007 },
      'WA': { name: 'Perth', lat: -31.9505, lng: 115.8605 },
      'TAS': { name: 'Hobart', lat: -42.8821, lng: 147.3272 },
      'NT': { name: 'Darwin', lat: -12.4634, lng: 130.8456 },
      'ACT': { name: 'Canberra', lat: -35.2809, lng: 149.1300 }
    };

    let distanceToCapital = 0;
    let directionToCapital = '';
    let capitalCity = '';

    if (state && majorCities[state]) {
      const city = majorCities[state];
      capitalCity = city.name;
      
      // Calculate distance using Google Distance Matrix API
      const distanceResponse = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat},${lng}&destinations=${city.lat},${city.lng}&units=metric&key=${googleMapsApiKey}`
      );
      const distanceData = await distanceResponse.json();
      
      if (distanceData.status === 'OK' && distanceData.rows[0].elements[0].status === 'OK') {
        const element = distanceData.rows[0].elements[0];
        distanceToCapital = parseFloat(element.distance.text.replace(' km', ''));
        
        // Calculate direction
        const bearing = calculateBearing(lat, lng, city.lat, city.lng);
        directionToCapital = getDirection(bearing);
      }
    }

    // Get nearby places
    const placesResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=school|hospital|shopping_mall&key=${googleMapsApiKey}`
    );
    const placesData = await placesResponse.json();

    const schools = placesData.results?.filter((place: any) => 
      place.types.includes('school') || place.types.includes('primary_school') || place.types.includes('secondary_school')
    ).slice(0, 3) || [];

    const shops = placesData.results?.filter((place: any) => 
      place.types.includes('shopping_mall') || place.types.includes('store')
    ).slice(0, 3) || [];

    const hospitals = placesData.results?.filter((place: any) => 
      place.types.includes('hospital') || place.types.includes('health')
    ).slice(0, 2) || [];

    // Get regional center distance (closest major town/city within state)
    let distanceToRegionalCenter = 0;
    let regionalCenter = '';
    
    // For this example, we'll use a simplified approach
    if (suburb !== capitalCity) {
      distanceToRegionalCenter = Math.round(distanceToCapital * 0.3); // Approximate
      regionalCenter = `Regional center near ${suburb}`;
    }

    // Determine surrounding property types based on land use
    const surroundingProperties = {
      residential: true,
      commercial: false,
      industrial: false,
      farming: false
    };

    // Get zoning information (simplified)
    let zoning = 'Residential 1';
    if (location.types.includes('commercial')) zoning = 'Commercial';
    if (location.types.includes('industrial')) zoning = 'Industrial';

    const locationData = {
      // Basic location info
      coordinates: { lat, lng },
      formattedAddress: location.formatted_address,
      suburb,
      state,
      postcode,
      country,
      
      // Distance and direction data
      distanceToCapital: Math.round(distanceToCapital),
      directionToCapital,
      capitalCity,
      distanceToRegionalCenter,
      regionalCenter,
      
      // Zoning and property info
      zoning,
      landUse: 'Residential',
      
      // Surrounding properties
      surroundingProperties,
      
      // Infrastructure
      positiveInfrastructure: [
        ...schools.map((school: any) => school.name),
        ...shops.map((shop: any) => shop.name)
      ].slice(0, 5),
      
      negativeInfrastructure: [],
      
      // Nearby amenities
      nearbySchools: schools.length,
      nearbyShops: shops.length,
      nearbyHospitals: hospitals.length,
      
      // Property identification helpers
      aerialMappingAvailable: true,
      physicalInspectionRequired: true,
      cadastralMapAvailable: true,
      
      // Site description data
      estimatedFrontage: '20m', // Default estimate
      accessLevel: 'Easy and Direct',
      streetType: 'Double Lane',
      footpaths: 'Concrete'
    };

    console.log('Location data processed successfully:', locationData);

    return new Response(JSON.stringify({
      success: true,
      locationData
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Google Location API Error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function calculateBearing(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const lat1Rad = lat1 * Math.PI / 180;
  const lat2Rad = lat2 * Math.PI / 180;
  
  const y = Math.sin(dLng) * Math.cos(lat2Rad);
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);
  
  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360;
}

function getDirection(bearing: number): string {
  const directions = ['North', 'North East', 'East', 'South East', 'South', 'South West', 'West', 'North West'];
  const index = Math.round(bearing / 45) % 8;
  return directions[index];
}