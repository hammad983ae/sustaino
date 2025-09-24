import "https://deno.land/x/xhr@0.1.0/mod.ts";
// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ATO_CLIENT_ID = Deno.env.get('ATO_CLIENT_ID');
const ATO_CLIENT_SECRET = Deno.env.get('ATO_CLIENT_SECRET');
const ATO_BASE_URL = 'https://api.ato.gov.au';

interface ATOAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SBRSubmission {
  businessType: string;
  abn: string;
  taxPeriod: string;
  financialData: any;
}

async function getATOAccessToken(): Promise<string> {
  console.log('Getting ATO access token...');
  
  const response = await fetch(`${ATO_BASE_URL}/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${ATO_CLIENT_ID}:${ATO_CLIENT_SECRET}`)}`,
    },
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
      'scope': 'sbr.read sbr.write',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('ATO token error:', errorText);
    throw new Error(`Failed to get ATO access token: ${response.status}`);
  }

  const data: ATOAuthResponse = await response.json();
  console.log('Successfully obtained ATO access token');
  return data.access_token;
}

async function submitSBRData(accessToken: string, submissionData: SBRSubmission) {
  console.log('Submitting SBR data to ATO...');
  
  const response = await fetch(`${ATO_BASE_URL}/sbr/v1/submissions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Client-ID': ATO_CLIENT_ID || '',
    },
    body: JSON.stringify({
      submissionType: 'BAS', // Business Activity Statement
      abn: submissionData.abn,
      taxPeriod: submissionData.taxPeriod,
      financialData: submissionData.financialData,
      submissionDate: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('SBR submission error:', errorText);
    throw new Error(`Failed to submit SBR data: ${response.status}`);
  }

  return await response.json();
}

async function getBusinessDetails(accessToken: string, abn: string) {
  console.log(`Getting business details for ABN: ${abn}`);
  
  const response = await fetch(`${ATO_BASE_URL}/abr/v1/entities/${abn}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Business details error:', errorText);
    throw new Error(`Failed to get business details: ${response.status}`);
  }

  return await response.json();
}

async function validateABN(abn: string): Promise<boolean> {
  console.log(`Validating ABN: ${abn}`);
  
  // Basic ABN validation algorithm
  const abnDigits = abn.replace(/\s/g, '').split('').map(Number);
  if (abnDigits.length !== 11) return false;
  
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const checksum = abnDigits.reduce((sum, digit, index) => {
    return sum + ((digit - (index === 0 ? 1 : 0)) * weights[index]);
  }, 0);
  
  return checksum % 89 === 0;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json();
    
    if (!ATO_CLIENT_ID || !ATO_CLIENT_SECRET) {
      throw new Error('ATO credentials not configured');
    }

    console.log(`Processing ATO action: ${action}`);

    switch (action) {
      case 'validate_abn': {
        const { abn } = data;
        const isValid = await validateABN(abn);
        
        return new Response(JSON.stringify({ 
          valid: isValid,
          abn: abn 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'get_business_details': {
        const { abn } = data;
        
        if (!await validateABN(abn)) {
          throw new Error('Invalid ABN format');
        }

        const accessToken = await getATOAccessToken();
        const businessDetails = await getBusinessDetails(accessToken, abn);
        
        return new Response(JSON.stringify(businessDetails), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'submit_sbr': {
        const submissionData: SBRSubmission = data;
        
        if (!await validateABN(submissionData.abn)) {
          throw new Error('Invalid ABN format');
        }

        const accessToken = await getATOAccessToken();
        const submissionResult = await submitSBRData(accessToken, submissionData);
        
        return new Response(JSON.stringify(submissionResult), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'get_tax_obligations': {
        const { abn } = data;
        const accessToken = await getATOAccessToken();
        
        const response = await fetch(`${ATO_BASE_URL}/obligations/v1/${abn}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to get tax obligations: ${response.status}`);
        }

        const obligations = await response.json();
        
        return new Response(JSON.stringify(obligations), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

  } catch (error) {
    console.error('Error in ATO integration function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});