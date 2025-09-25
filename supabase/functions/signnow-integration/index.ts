import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SignNowRequest {
  action: 'create_document' | 'send_for_signature' | 'get_document_status' | 'download_document';
  template_type?: 'property_offer' | 'valuation_agreement' | 'auction_contract' | 'esg_compliance' | 'investment_agreement';
  document_data?: any;
  document_id?: string;
  recipient_email?: string;
  recipient_name?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, template_type, document_data, document_id, recipient_email, recipient_name } = await req.json() as SignNowRequest;

    const clientId = Deno.env.get('SIGNNOW_CLIENT_ID');
    const clientSecret = Deno.env.get('SIGNNOW_CLIENT_SECRET');
    const accessToken = Deno.env.get('SIGNNOW_ACCESS_TOKEN');

    if (!clientId || !clientSecret || !accessToken) {
      throw new Error('SignNow API credentials not configured');
    }

    console.log(`SignNow API call: ${action}`);

    switch (action) {
      case 'create_document':
        const documentResult = await createDocument(accessToken, template_type!, document_data);
        return new Response(JSON.stringify(documentResult), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'send_for_signature':
        const sendResult = await sendForSignature(accessToken, document_id!, recipient_email!, recipient_name!);
        return new Response(JSON.stringify(sendResult), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'get_document_status':
        const statusResult = await getDocumentStatus(accessToken, document_id!);
        return new Response(JSON.stringify(statusResult), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'download_document':
        const downloadResult = await downloadDocument(accessToken, document_id!);
        return new Response(JSON.stringify(downloadResult), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      default:
        throw new Error(`Unsupported action: ${action}`);
    }
  } catch (error) {
    console.error('Error in SignNow integration:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function createDocument(accessToken: string, templateType: string, documentData: any) {
  const templates = {
    property_offer: generatePropertyOfferTemplate(documentData),
    valuation_agreement: generateValuationAgreementTemplate(documentData),
    auction_contract: generateAuctionContractTemplate(documentData),
    esg_compliance: generateESGComplianceTemplate(documentData),
    investment_agreement: generateInvestmentAgreementTemplate(documentData),
  };

  const template = templates[templateType as keyof typeof templates];
  if (!template) {
    throw new Error(`Template type ${templateType} not found`);
  }

  // Create document using SignNow API
  const response = await fetch('https://api.signnow.com/document', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      template_id: template.template_id,
      document_name: template.document_name,
      prefill_data: template.prefill_data,
    }),
  });

  if (!response.ok) {
    throw new Error(`SignNow API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

async function sendForSignature(accessToken: string, documentId: string, recipientEmail: string, recipientName: string) {
  const response = await fetch(`https://api.signnow.com/document/${documentId}/invite`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: recipientEmail,
      from: 'noreply@sustanosphere.com',
      subject: 'Document Ready for Signature',
      message: 'Please review and sign the attached document.',
    }),
  });

  if (!response.ok) {
    throw new Error(`SignNow API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

async function getDocumentStatus(accessToken: string, documentId: string) {
  const response = await fetch(`https://api.signnow.com/document/${documentId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`SignNow API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

async function downloadDocument(accessToken: string, documentId: string) {
  const response = await fetch(`https://api.signnow.com/document/${documentId}/download`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`SignNow API error: ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
  
  return { document_data: base64, content_type: 'application/pdf' };
}

// Template generators for different document types
function generatePropertyOfferTemplate(data: any) {
  return {
    template_id: 'property_offer_template',
    document_name: `Property Offer - ${data.property_address}`,
    prefill_data: {
      property_address: data.property_address,
      offer_price: data.offer_price,
      purchaser_name: data.purchaser_name,
      purchaser_email: data.purchaser_email,
      preferred_settlement: data.preferred_settlement,
      special_conditions: data.special_conditions,
      offer_date: new Date().toLocaleDateString(),
    },
  };
}

function generateValuationAgreementTemplate(data: any) {
  return {
    template_id: 'valuation_agreement_template',
    document_name: `Valuation Agreement - ${data.property_address}`,
    prefill_data: {
      property_address: data.property_address,
      client_name: data.client_name,
      valuation_purpose: data.valuation_purpose,
      valuation_fee: data.valuation_fee,
      completion_date: data.completion_date,
      valuer_name: data.valuer_name,
      license_number: data.license_number,
    },
  };
}

function generateAuctionContractTemplate(data: any) {
  return {
    template_id: 'auction_contract_template',
    document_name: `Auction Contract - ${data.property_address}`,
    prefill_data: {
      property_address: data.property_address,
      winning_bid: data.winning_bid,
      bidder_name: data.bidder_name,
      bidder_email: data.bidder_email,
      auction_date: data.auction_date,
      settlement_terms: data.settlement_terms,
      deposit_amount: data.deposit_amount,
    },
  };
}

function generateESGComplianceTemplate(data: any) {
  return {
    template_id: 'esg_compliance_template',
    document_name: `ESG Compliance Certificate - ${data.property_address}`,
    prefill_data: {
      property_address: data.property_address,
      esg_score: data.esg_score,
      environmental_rating: data.environmental_rating,
      social_rating: data.social_rating,
      governance_rating: data.governance_rating,
      assessment_date: data.assessment_date,
      certifying_body: data.certifying_body,
    },
  };
}

function generateInvestmentAgreementTemplate(data: any) {
  return {
    template_id: 'investment_agreement_template',
    document_name: `Investment Agreement - ${data.property_title}`,
    prefill_data: {
      property_title: data.property_title,
      investment_amount: data.investment_amount,
      investor_name: data.investor_name,
      investor_email: data.investor_email,
      expected_return: data.expected_return,
      investment_term: data.investment_term,
      risk_rating: data.risk_rating,
    },
  };
}