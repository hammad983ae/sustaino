import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

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
    const { action, propertyData, settlementData } = await req.json();
    const pexaApiKey = Deno.env.get('PEXA_API_KEY');
    
    if (!pexaApiKey) {
      throw new Error('PEXA API key not configured');
    }

    console.log(`PEXA Integration - Action: ${action}`);

    const pexaBaseUrl = 'https://api.pexa.com.au/v1'; // Production URL
    // For testing: 'https://api-test.pexa.com.au/v1'

    let response;
    let result;

    switch (action) {
      case 'search_property':
        response = await fetch(`${pexaBaseUrl}/properties/search`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${pexaApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: propertyData.address,
            state: propertyData.state,
            postcode: propertyData.postcode
          }),
        });
        result = await response.json();
        break;

      case 'get_property_details':
        response = await fetch(`${pexaBaseUrl}/properties/${propertyData.propertyId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${pexaApiKey}`,
            'Content-Type': 'application/json',
          },
        });
        result = await response.json();
        break;

      case 'create_workspace':
        response = await fetch(`${pexaBaseUrl}/workspaces`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${pexaApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            property: propertyData,
            transaction_type: settlementData.transactionType,
            settlement_date: settlementData.settlementDate,
            participants: settlementData.participants
          }),
        });
        result = await response.json();
        break;

      case 'submit_valuation':
        response = await fetch(`${pexaBaseUrl}/workspaces/${settlementData.workspaceId}/documents`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${pexaApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            document_type: 'valuation_report',
            valuation_amount: propertyData.valuationAmount,
            valuation_date: propertyData.valuationDate,
            valuer_details: propertyData.valuerDetails,
            report_url: propertyData.reportUrl
          }),
        });
        result = await response.json();
        break;

      case 'get_settlement_status':
        response = await fetch(`${pexaBaseUrl}/workspaces/${settlementData.workspaceId}/status`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${pexaApiKey}`,
            'Content-Type': 'application/json',
          },
        });
        result = await response.json();
        break;

      case 'submit_esg_data':
        // Submit ESG assessment data to PEXA for enhanced property information
        response = await fetch(`${pexaBaseUrl}/properties/${propertyData.propertyId}/esg-data`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${pexaApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            energy_rating: propertyData.esgData.energyRating,
            water_rating: propertyData.esgData.waterRating,
            environmental_score: propertyData.esgData.environmentalScore,
            sustainability_features: propertyData.esgData.sustainabilityFeatures,
            carbon_footprint: propertyData.esgData.carbonFootprint
          }),
        });
        result = await response.json();
        break;

      default:
        throw new Error(`Unknown PEXA action: ${action}`);
    }

    if (!response.ok) {
      console.error('PEXA API Error:', response.status, result);
      throw new Error(`PEXA API error: ${response.status} - ${result.message || 'Unknown error'}`);
    }

    console.log('PEXA Integration Success:', action);

    return new Response(JSON.stringify({
      success: true,
      data: result,
      action: action
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('PEXA Integration Error:', error);
    return new Response(JSON.stringify({
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});