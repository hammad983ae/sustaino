import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const googleMapsApiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
const aerialPhotosApiKey = Deno.env.get('GOOGLE_AERIAL_PHOTOS_API_KEY');
const geolocationApiKey = Deno.env.get('Geolocation');

interface PropertyAnalysisRequest {
  address: string;
  propertyType: string;
  jobNumber?: string;
}

interface PropertyAnalysisResponse {
  geolocation: {
    latitude: number;
    longitude: number;
    accuracy: string;
  };
  aerialImagery: {
    satelliteImageUrl: string;
    streetViewUrl: string;
    lastUpdated: string;
  };
  vicPlanData: any;
  marketData: {
    medianPrice: number;
    recentSales: Array<{
      address: string;
      price: number;
      date: string;
      bedrooms: number;
      bathrooms: number;
    }>;
    priceGrowth: {
      annual: number;
      quarterly: number;
    };
  };
  propertyFeatures: {
    landSize: number;
    buildingArea: number;
    yearBuilt: number;
    bedrooms: number;
    bathrooms: number;
    carSpaces: number;
  };
  riskFactors: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
  }>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { address, propertyType, jobNumber }: PropertyAnalysisRequest = await req.json();

    console.log('Enhanced Property Analysis request:', { address, propertyType, jobNumber });

    // 1. Get geolocation data
    let geolocation = { latitude: -34.1873, longitude: 142.1601, accuracy: 'approximate' };
    
    if (address.toLowerCase().includes('mildura')) {
      geolocation = { latitude: -34.1873, longitude: 142.1601, accuracy: 'high' };
    }

    // 2. Get aerial imagery URLs
    const aerialImagery = {
      satelliteImageUrl: `https://maps.googleapis.com/maps/api/staticmap?center=${geolocation.latitude},${geolocation.longitude}&zoom=18&size=800x600&maptype=satellite&key=${googleMapsApiKey}`,
      streetViewUrl: `https://maps.googleapis.com/maps/api/streetview?size=800x600&location=${geolocation.latitude},${geolocation.longitude}&key=${googleMapsApiKey}`,
      lastUpdated: '2024-12-15'
    };

    // 3. Get VicPlan data
    const vicPlanResponse = await supabase.functions.invoke('vicplan-integration', {
      body: { address, propertyType, analysisType: 'comprehensive' }
    });

    const vicPlanData = vicPlanResponse.data || {};

    // 4. Mock market data (in production, integrate with real estate APIs)
    const marketData = {
      medianPrice: address.toLowerCase().includes('mildura') ? 285000 : 750000,
      recentSales: [
        {
          address: "518 Deakin Avenue, Mildura VIC 3500",
          price: 275000,
          date: "2024-11-15",
          bedrooms: 3,
          bathrooms: 1
        },
        {
          address: "522 Deakin Avenue, Mildura VIC 3500", 
          price: 295000,
          date: "2024-10-28",
          bedrooms: 3,
          bathrooms: 2
        },
        {
          address: "516 Deakin Avenue, Mildura VIC 3500",
          price: 265000,
          date: "2024-09-12",
          bedrooms: 2,
          bathrooms: 1
        }
      ],
      priceGrowth: {
        annual: 4.2,
        quarterly: 1.1
      }
    };

    // 5. Property features (mock data - in production, get from property databases)
    const propertyFeatures = {
      landSize: 850,
      buildingArea: 120,
      yearBuilt: 1965,
      bedrooms: 3,
      bathrooms: 1,
      carSpaces: 2
    };

    // 6. Risk factors analysis
    const riskFactors = [
      {
        type: "Market Risk",
        severity: "low" as const,
        description: "Stable regional market with consistent demand"
      },
      {
        type: "Environmental Risk", 
        severity: "medium" as const,
        description: "Potential flood risk during extreme weather events"
      },
      {
        type: "Infrastructure Risk",
        severity: "low" as const,
        description: "Good access to main arterial roads and services"
      }
    ];

    const analysisResponse: PropertyAnalysisResponse = {
      geolocation,
      aerialImagery,
      vicPlanData,
      marketData,
      propertyFeatures,
      riskFactors
    };

    console.log('Property analysis completed successfully');

    return new Response(JSON.stringify(analysisResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in enhanced property analysis:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        geolocation: { latitude: 0, longitude: 0, accuracy: 'unknown' },
        aerialImagery: { satelliteImageUrl: '', streetViewUrl: '', lastUpdated: '' },
        vicPlanData: {},
        marketData: { medianPrice: 0, recentSales: [], priceGrowth: { annual: 0, quarterly: 0 } },
        propertyFeatures: { landSize: 0, buildingArea: 0, yearBuilt: 0, bedrooms: 0, bathrooms: 0, carSpaces: 0 },
        riskFactors: []
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});