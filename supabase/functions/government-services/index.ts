import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ASIC_API_KEY = Deno.env.get('ASIC_API_KEY');
const ASIC_BASE_URL = 'https://api.asic.gov.au';

interface CompanySearchResult {
  acn: string;
  name: string;
  status: string;
  type: string;
  registrationDate: string;
}

interface ASICResponse {
  data: CompanySearchResult[];
  total: number;
  page: number;
}

async function searchASICCompany(searchTerm: string, searchType: 'name' | 'acn' = 'name'): Promise<ASICResponse> {
  console.log(`Searching ASIC for ${searchType}: ${searchTerm}`);
  
  const params = new URLSearchParams({
    'search_type': searchType,
    'query': searchTerm,
    'format': 'json',
    'page': '1',
    'per_page': '10'
  });

  const response = await fetch(`${ASIC_BASE_URL}/companies/search?${params}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${ASIC_API_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('ASIC search error:', errorText);
    throw new Error(`Failed to search ASIC: ${response.status}`);
  }

  return await response.json();
}

async function getCompanyDetails(acn: string) {
  console.log(`Getting company details for ACN: ${acn}`);
  
  const response = await fetch(`${ASIC_BASE_URL}/companies/${acn}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${ASIC_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Company details error:', errorText);
    throw new Error(`Failed to get company details: ${response.status}`);
  }

  return await response.json();
}

async function validateACN(acn: string): Promise<boolean> {
  console.log(`Validating ACN: ${acn}`);
  
  // Remove spaces and validate format
  const cleanACN = acn.replace(/\s/g, '');
  if (!/^\d{9}$/.test(cleanACN)) return false;
  
  // ACN check digit algorithm
  const digits = cleanACN.split('').map(Number);
  const weights = [8, 7, 6, 5, 4, 3, 2, 1];
  
  const sum = digits.slice(0, 8).reduce((total, digit, index) => {
    return total + (digit * weights[index]);
  }, 0);
  
  const remainder = sum % 10;
  const checkDigit = remainder === 0 ? 0 : 10 - remainder;
  
  return checkDigit === digits[8];
}

async function getAustralianBusinessRegister(abn: string) {
  console.log(`Getting ABR details for ABN: ${abn}`);
  
  // ABR Web Services API (free tier)
  const response = await fetch(`https://abr.business.gov.au/json/AbnDetails.aspx?abn=${abn}&includeHistoricalDetails=N&authenticationGuid=${ASIC_API_KEY}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get ABR details: ${response.status}`);
  }

  return await response.json();
}

async function submitGovernmentForm(formType: string, formData: any) {
  console.log(`Submitting government form: ${formType}`);
  
  // This would be implemented based on specific government service APIs
  // Each department has different endpoints and requirements
  
  const supportedForms = {
    'annual_return': 'ASIC Annual Return',
    'change_of_details': 'ASIC Change of Company Details',
    'business_names': 'Business Names Registration',
    'tax_registration': 'Tax File Number Application',
  };

  if (!supportedForms[formType as keyof typeof supportedForms]) {
    throw new Error(`Unsupported form type: ${formType}`);
  }

  // Simulate form submission
  return {
    submissionId: `SUBM-${Date.now()}`,
    status: 'submitted',
    formType: supportedForms[formType as keyof typeof supportedForms],
    submissionDate: new Date().toISOString(),
    estimatedProcessingTime: '5-10 business days',
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { service, action, data } = await req.json();
    
    console.log(`Processing government service: ${service}, action: ${action}`);

    switch (service) {
      case 'asic': {
        if (!ASIC_API_KEY) {
          throw new Error('ASIC API key not configured');
        }

        switch (action) {
          case 'search_company': {
            const { searchTerm, searchType } = data;
            const results = await searchASICCompany(searchTerm, searchType);
            
            return new Response(JSON.stringify(results), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }

          case 'get_company_details': {
            const { acn } = data;
            
            if (!await validateACN(acn)) {
              throw new Error('Invalid ACN format');
            }

            const companyDetails = await getCompanyDetails(acn);
            
            return new Response(JSON.stringify(companyDetails), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }

          case 'validate_acn': {
            const { acn } = data;
            const isValid = await validateACN(acn);
            
            return new Response(JSON.stringify({ 
              valid: isValid,
              acn: acn 
            }), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }

          default:
            throw new Error(`Unknown ASIC action: ${action}`);
        }
      }

      case 'abr': {
        switch (action) {
          case 'get_business_details': {
            const { abn } = data;
            const businessDetails = await getAustralianBusinessRegister(abn);
            
            return new Response(JSON.stringify(businessDetails), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }

          default:
            throw new Error(`Unknown ABR action: ${action}`);
        }
      }

      case 'forms': {
        switch (action) {
          case 'submit': {
            const { formType, formData } = data;
            const result = await submitGovernmentForm(formType, formData);
            
            return new Response(JSON.stringify(result), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }

          case 'get_available_forms': {
            const availableForms = [
              {
                id: 'annual_return',
                name: 'ASIC Annual Return',
                description: 'Annual company return submission to ASIC',
                department: 'ASIC',
                fee: '$263',
              },
              {
                id: 'change_of_details',
                name: 'Change of Company Details',
                description: 'Update company information with ASIC',
                department: 'ASIC',
                fee: '$37',
              },
              {
                id: 'business_names',
                name: 'Business Names Registration',
                description: 'Register or renew business names',
                department: 'ASIC',
                fee: '$40',
              },
              {
                id: 'tax_registration',
                name: 'Tax File Number Application',
                description: 'Apply for Tax File Number with ATO',
                department: 'ATO',
                fee: 'Free',
              },
            ];
            
            return new Response(JSON.stringify(availableForms), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }

          default:
            throw new Error(`Unknown forms action: ${action}`);
        }
      }

      default:
        throw new Error(`Unknown service: ${service}`);
    }

  } catch (error) {
    console.error('Error in government services function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});