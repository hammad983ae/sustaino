import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileUrl, fileName, propertyAddress } = await req.json();
    
    console.log('OCR Processing started for:', fileName);
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Simulate OCR processing with realistic data extraction
    const ocrResults = await processDocument(fileUrl, fileName, propertyAddress);
    
    console.log('OCR Results:', ocrResults);

    return new Response(JSON.stringify({
      success: true,
      ocrResults,
      confidence: ocrResults.confidence || 85,
      processedAt: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('OCR Processing Error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function processDocument(fileUrl: string, fileName: string, propertyAddress?: string): Promise<any> {
  // Simulate different document types and extract relevant data
  const fileType = getDocumentType(fileName);
  
  // Base OCR data structure
  const baseOCR = {
    confidence: Math.floor(Math.random() * 20) + 80, // 80-100% confidence
    extractedAt: new Date().toISOString(),
    documentType: fileType
  };

  switch (fileType) {
    case 'CONTRACT_OF_SALE':
      return {
        ...baseOCR,
        propertyAddress: propertyAddress || extractAddressFromContract(),
        salePrice: Math.floor(Math.random() * 500000) + 500000,
        landArea: Math.floor(Math.random() * 2000) + 600,
        buildingArea: Math.floor(Math.random() * 200) + 150,
        bedrooms: Math.floor(Math.random() * 4) + 2,
        bathrooms: Math.floor(Math.random() * 3) + 1,
        yearBuilt: Math.floor(Math.random() * 30) + 1990,
        contractDate: new Date().toISOString().split('T')[0],
        vendor: "John & Jane Smith",
        purchaser: "Property Investment Group Pty Ltd"
      };

    case 'VALUATION_REPORT':
      return {
        ...baseOCR,
        propertyAddress: propertyAddress || extractAddressFromValuation(),
        marketValue: Math.floor(Math.random() * 400000) + 600000,
        landValue: Math.floor(Math.random() * 200000) + 300000,
        improvementValue: Math.floor(Math.random() * 300000) + 300000,
        rentalEstimate: Math.floor(Math.random() * 200) + 400,
        landArea: Math.floor(Math.random() * 1500) + 700,
        buildingArea: Math.floor(Math.random() * 180) + 170,
        riskRating: Math.floor(Math.random() * 3) + 1, // 1-3 rating
        valuationDate: new Date().toISOString().split('T')[0],
        valuer: "Professional Valuation Services",
        apiNumber: "12345"
      };

    case 'BUILDING_INSPECTION':
      return {
        ...baseOCR,
        propertyAddress: propertyAddress || extractAddressFromInspection(),
        overallCondition: ["Excellent", "Good", "Fair", "Poor"][Math.floor(Math.random() * 4)],
        majorDefects: Math.random() > 0.7,
        minorDefects: Math.random() > 0.3,
        estimatedRepairs: Math.floor(Math.random() * 15000),
        structuralIssues: Math.random() > 0.8,
        electricalIssues: Math.random() > 0.7,
        plumbingIssues: Math.random() > 0.6,
        inspectionDate: new Date().toISOString().split('T')[0],
        inspector: "Building Inspection Services Pty Ltd"
      };

    case 'TITLE_DOCUMENT':
      return {
        ...baseOCR,
        propertyAddress: propertyAddress || extractAddressFromTitle(),
        titleReference: `CT ${Math.floor(Math.random() * 9000) + 1000}/${Math.floor(Math.random() * 900) + 100}`,
        landArea: Math.floor(Math.random() * 2000) + 500,
        zoning: ["Residential 1", "Residential 2", "Mixed Use", "Commercial"][Math.floor(Math.random() * 4)],
        encumbrances: Math.random() > 0.6 ? ["Easement for drainage", "Right of way"] : [],
        landUse: "Residential",
        councilArea: "City Council"
      };

    case 'PLANNING_CERTIFICATE':
      return {
        ...baseOCR,
        propertyAddress: propertyAddress || extractAddressFromPlanning(),
        zoning: ["R1 General Residential", "R2 Low Density", "R3 Medium Density"][Math.floor(Math.random() * 3)],
        maximumHeight: Math.floor(Math.random() * 5) + 8,
        setbacks: {
          front: Math.floor(Math.random() * 3) + 4,
          rear: Math.floor(Math.random() * 3) + 4,
          side: Math.floor(Math.random() * 2) + 1
        },
        floorSpaceRatio: (Math.random() * 0.5 + 0.5).toFixed(1),
        developmentRestrictions: Math.random() > 0.5 ? ["Heritage conservation area"] : [],
        certificateDate: new Date().toISOString().split('T')[0]
      };

    default:
      return {
        ...baseOCR,
        extractedText: `General document content extracted from ${fileName}`,
        keyPhrases: ["property", "valuation", "assessment", "market value"],
        summary: "Document contains property-related information suitable for valuation purposes."
      };
  }
}

function getDocumentType(fileName: string): string {
  const name = fileName.toLowerCase();
  
  if (name.includes('contract') || name.includes('sale')) return 'CONTRACT_OF_SALE';
  if (name.includes('valuation') || name.includes('appraisal')) return 'VALUATION_REPORT';
  if (name.includes('building') || name.includes('inspection')) return 'BUILDING_INSPECTION';
  if (name.includes('title') || name.includes('deed')) return 'TITLE_DOCUMENT';
  if (name.includes('planning') || name.includes('certificate')) return 'PLANNING_CERTIFICATE';
  if (name.includes('survey') || name.includes('plan')) return 'SURVEY_PLAN';
  
  return 'GENERAL_DOCUMENT';
}

function extractAddressFromContract(): string {
  const streets = ["Main Street", "High Street", "Church Street", "Park Avenue", "Oak Drive"];
  const suburbs = ["Springvale", "Glen Waverley", "Box Hill", "Richmond", "Hawthorn"];
  const states = ["VIC", "NSW", "QLD", "SA", "WA"];
  
  const number = Math.floor(Math.random() * 200) + 1;
  const street = streets[Math.floor(Math.random() * streets.length)];
  const suburb = suburbs[Math.floor(Math.random() * suburbs.length)];
  const state = states[Math.floor(Math.random() * states.length)];
  const postcode = Math.floor(Math.random() * 9000) + 1000;
  
  return `${number} ${street}, ${suburb} ${state} ${postcode}`;
}

function extractAddressFromValuation(): string {
  return extractAddressFromContract(); // Same logic for demo
}

function extractAddressFromInspection(): string {
  return extractAddressFromContract(); // Same logic for demo
}

function extractAddressFromTitle(): string {
  return extractAddressFromContract(); // Same logic for demo
}

function extractAddressFromPlanning(): string {
  return extractAddressFromContract(); // Same logic for demo
}