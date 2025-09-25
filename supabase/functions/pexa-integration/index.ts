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

    const pexaBaseUrl = 'https://api.pexa.com.au/v2'; // Updated to v2 API
    // For testing: 'https://api-test.pexa.com.au/v2'

    let response;
    let result;

    switch (action) {
      case 'search_property':
        // Updated endpoint for property search
        response = await fetch(`${pexaBaseUrl}/property/search`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${pexaApiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            searchCriteria: {
              address: {
                fullAddress: propertyData.address,
                state: propertyData.state,
                postcode: propertyData.postcode
              }
            }
          }),
        });
        result = await response.json();
        break;

      case 'get_property_details':
        response = await fetch(`${pexaBaseUrl}/property/${propertyData.propertyId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${pexaApiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        result = await response.json();
        break;

      case 'create_workspace':
        // Updated workspace creation endpoint
        response = await fetch(`${pexaBaseUrl}/workspace`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${pexaApiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            property: {
              propertyId: propertyData.propertyId,
              address: propertyData.address
            },
            transaction: {
              type: settlementData.transactionType || 'sale',
              settlementDate: settlementData.settlementDate,
              purchasePrice: settlementData.purchasePrice
            },
            participants: settlementData.participants || []
          }),
        });
        result = await response.json();
        break;

      case 'submit_valuation':
        // Submit valuation document to workspace
        response = await fetch(`${pexaBaseUrl}/workspace/${settlementData.workspaceId}/document`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${pexaApiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            documentType: 'VALUATION_REPORT',
            metadata: {
              valuationAmount: propertyData.valuationAmount,
              valuationDate: propertyData.valuationDate,
              valuerName: propertyData.valuerDetails?.name,
              valuerLicense: propertyData.valuerDetails?.license,
              firm: propertyData.valuerDetails?.firm
            },
            documentUrl: propertyData.reportUrl
          }),
        });
        result = await response.json();
        break;

      case 'get_settlement_status':
        // Get workspace settlement status
        response = await fetch(`${pexaBaseUrl}/workspace/${settlementData.workspaceId}/status`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${pexaApiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        result = await response.json();
        break;

      case 'track_settlement':
        // New endpoint for settlement tracking
        response = await fetch(`${pexaBaseUrl}/workspace/${settlementData.workspaceId}/timeline`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${pexaApiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        result = await response.json();
        break;

      case 'submit_esg_data':
        // Submit ESG assessment data to PEXA for enhanced property information
        response = await fetch(`${pexaBaseUrl}/property/${propertyData.propertyId}/sustainability`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${pexaApiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            energyRating: propertyData.esgData.energyRating,
            waterRating: propertyData.esgData.waterRating,
            environmentalScore: propertyData.esgData.environmentalScore,
            sustainabilityFeatures: propertyData.esgData.sustainabilityFeatures,
            carbonFootprint: propertyData.esgData.carbonFootprint,
            assessmentDate: new Date().toISOString()
          }),
        });
        result = await response.json();
        break;

      case 'auction_settlement':
        // New endpoint for auction settlement integration
        response = await fetch(`${pexaBaseUrl}/workspace/${settlementData.workspaceId}/auction-settlement`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${pexaApiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            auctionDetails: {
              finalBid: settlementData.finalBid,
              auctionDate: settlementData.auctionDate,
              auctioneer: settlementData.auctioneer,
              depositAmount: settlementData.depositAmount,
              buyerDetails: settlementData.buyerDetails,
              vendorDetails: settlementData.vendorDetails
            },
            settlementTerms: {
              settlementPeriod: settlementData.settlementPeriod,
              conditions: settlementData.conditions || []
            }
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
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});