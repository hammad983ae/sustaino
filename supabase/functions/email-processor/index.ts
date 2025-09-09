import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

interface EmailProcessorRequest {
  emailContent: string;
  attachments?: Array<{
    filename: string;
    content: string; // base64 encoded
    mimeType: string;
  }>;
  sender: string;
  subject: string;
}

interface ExtractedData {
  propertyAddress?: string;
  propertyType?: string;
  estimatedValue?: number;
  reportType?: string;
  clientName?: string;
  contactEmail?: string;
  contactPhone?: string;
  dueDate?: string;
  priority?: string;
  description?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { emailContent, attachments, sender, subject }: EmailProcessorRequest = await req.json();
    
    console.log('Processing email from:', sender);
    console.log('Subject:', subject);

    let extractedText = emailContent;
    
    // Process attachments with OCR if any
    if (attachments && attachments.length > 0) {
      for (const attachment of attachments) {
        if (attachment.mimeType.startsWith('image/') || attachment.mimeType === 'application/pdf') {
          console.log('Processing attachment:', attachment.filename);
          
          // Use OpenAI Vision API for OCR
          const ocrText = await performOCR(attachment.content, attachment.mimeType);
          if (ocrText) {
            extractedText += '\n\nExtracted from ' + attachment.filename + ':\n' + ocrText;
          }
        }
      }
    }

    // Extract structured data using AI
    const extractedData = await extractDataWithAI(extractedText, subject);
    
    // Create appropriate records in database
    const result = await createRecordsFromExtractedData(extractedData, sender, subject);

    return new Response(JSON.stringify({ 
      success: true, 
      extractedData,
      createdRecords: result
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in email-processor function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function performOCR(base64Content: string, mimeType: string): Promise<string | null> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Extract all text from this document/image. Focus on property details, valuations, addresses, contact information, and any numerical data. Return the text as accurately as possible.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${base64Content}`
                }
              }
            ]
          }
        ],
        max_tokens: 2000
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;

  } catch (error) {
    console.error('OCR processing error:', error);
    return null;
  }
}

async function extractDataWithAI(text: string, subject: string): Promise<ExtractedData> {
  try {
    const prompt = `
    Extract structured data from the following email content and subject. Return a JSON object with the following fields (only include fields where you have confident information):

    - propertyAddress: full property address
    - propertyType: residential/commercial/agricultural/specialised
    - estimatedValue: numerical value in dollars
    - reportType: type of valuation report requested
    - clientName: name of the person/organization requesting
    - contactEmail: email address for contact
    - contactPhone: phone number for contact
    - dueDate: when the work is due (format: YYYY-MM-DD)
    - priority: low/medium/high/urgent
    - description: brief description of the request

    Subject: ${subject}
    
    Content: ${text}

    Return only valid JSON, no other text.
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are an expert at extracting structured property valuation data from emails and documents. Always return valid JSON.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.1
      }),
    });

    const data = await response.json();
    const extractedText = data.choices?.[0]?.message?.content;
    
    if (extractedText) {
      try {
        return JSON.parse(extractedText);
      } catch (parseError) {
        console.error('Failed to parse extracted data as JSON:', parseError);
        return {};
      }
    }
    
    return {};

  } catch (error) {
    console.error('Data extraction error:', error);
    return {};
  }
}

async function createRecordsFromExtractedData(data: ExtractedData, sender: string, subject: string) {
  const results = [];

  try {
    // Create a property record if we have property information
    if (data.propertyAddress) {
      const { data: propertyData, error: propertyError } = await supabase
        .from('properties')
        .insert({
          address: data.propertyAddress,
          property_type: data.propertyType,
          description: data.description || `Property from email: ${subject}`,
          status: 'pending',
          user_id: null // Will need to be linked to a user later
        })
        .select()
        .single();

      if (propertyError) {
        console.error('Error creating property:', propertyError);
      } else {
        results.push({ type: 'property', id: propertyData.id });
      }
    }

    // Create a valuation job record
    const { data: jobData, error: jobError } = await supabase
      .from('valuation_jobs')
      .insert({
        title: data.clientName ? `Valuation for ${data.clientName}` : subject,
        description: data.description || `Valuation request from email: ${subject}`,
        property_type: data.propertyType || 'residential',
        address: data.propertyAddress,
        estimated_value: data.estimatedValue,
        priority: data.priority || 'medium',
        status: 'pending',
        due_date: data.dueDate ? new Date(data.dueDate).toISOString() : null,
        notes: `Email from: ${sender}\nSubject: ${subject}\nContact: ${data.contactEmail || ''} ${data.contactPhone || ''}`,
        user_id: null // Will need to be linked to a user later
      })
      .select()
      .single();

    if (jobError) {
      console.error('Error creating valuation job:', jobError);
    } else {
      results.push({ type: 'valuation_job', id: jobData.id });
    }

    return results;

  } catch (error) {
    console.error('Error creating records:', error);
    return [];
  }
}