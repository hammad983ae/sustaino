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
    case 'PROPERTY_PHOTOS':
      return {
        ...baseOCR,
        dwellingStyle: detectDwellingStyle(),
        streetAppeal: detectStreetAppeal(),
        mainWalls: detectWallMaterial(),
        roofMaterial: detectRoofMaterial(),
        windowFrames: detectWindowFrames(),
        externalCondition: detectExternalCondition(),
        landscaping: detectLandscaping(),
        ancillaryImprovements: detectAncillaryImprovements(),
        carAccommodation: Math.floor(Math.random() * 4) + 1,
        outdoorFeatures: extractOutdoorFeatures()
      };

    case 'DOMAIN_LISTING':
      return {
        ...baseOCR,
        propertyAddress: propertyAddress || extractAddressFromContract(),
        bedrooms: Math.floor(Math.random() * 4) + 2,
        bathrooms: Math.floor(Math.random() * 3) + 1,
        carSpaces: Math.floor(Math.random() * 3) + 1,
        landArea: Math.floor(Math.random() * 2000) + 600,
        buildingArea: Math.floor(Math.random() * 200) + 150,
        dwellingDescription: generateDwellingDescription(),
        features: extractListingFeatures(),
        marketingDescription: generateMarketingText(),
        listingPrice: Math.floor(Math.random() * 500000) + 500000
      };

    case 'ARCHITECTURAL_PLANS':
      return {
        ...baseOCR,
        buildingArea: Math.floor(Math.random() * 300) + 200,
        roomLayout: extractRoomLayout(),
        structuralDetails: extractStructuralDetails(),
        specifications: extractBuildingSpecs(),
        compliance: extractComplianceInfo(),
        materials: extractMaterialSpecs(),
        dwellingOrientation: ['North', 'South', 'East', 'West'][Math.floor(Math.random() * 4)]
      };

    case 'BUILDING_CONTRACT':
      return {
        ...baseOCR,
        contractValue: Math.floor(Math.random() * 400000) + 300000,
        constructionSpecs: extractConstructionSpecs(),
        finishSchedule: extractFinishSchedule(),
        inclusions: extractInclusions(),
        exclusions: extractExclusions(),
        completionDate: generateFutureDate(),
        builderDetails: generateBuilderInfo()
      };

    case 'SPECIFICATIONS':
      return {
        ...baseOCR,
        interiorFinishes: extractInteriorFinishes(),
        fixturesAndFittings: extractFixturesAndFittings(),
        flooringTypes: extractFlooringDetails(),
        kitchenSpecs: extractKitchenSpecs(),
        bathroomSpecs: extractBathroomSpecs(),
        heatingCooling: extractHVACDetails(),
        electricalSpecs: extractElectricalSpecs(),
        plumbingSpecs: extractPlumbingSpecs()
      };

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
        riskRating: Math.floor(Math.random() * 3) + 1,
        valuationDate: new Date().toISOString().split('T')[0],
        valuer: "Professional Valuation Services",
        apiNumber: "12345"
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
  
  // Check for image file types (likely property photos)
  if (name.match(/\.(jpg|jpeg|png|gif|bmp|tiff)$/)) {
    if (name.includes('domain') || name.includes('listing')) return 'DOMAIN_LISTING';
    if (name.includes('plan') || name.includes('architectural')) return 'ARCHITECTURAL_PLANS';
    return 'PROPERTY_PHOTOS';
  }
  
  // Document type detection
  if (name.includes('contract') || name.includes('sale')) return 'CONTRACT_OF_SALE';
  if (name.includes('valuation') || name.includes('appraisal')) return 'VALUATION_REPORT';
  if (name.includes('building') || name.includes('inspection')) return 'BUILDING_INSPECTION';
  if (name.includes('title') || name.includes('deed')) return 'TITLE_DOCUMENT';
  if (name.includes('planning') || name.includes('certificate')) return 'PLANNING_CERTIFICATE';
  if (name.includes('survey') || name.includes('plan')) return 'SURVEY_PLAN';
  if (name.includes('spec') || name.includes('specification')) return 'SPECIFICATIONS';
  if (name.includes('domain') || name.includes('listing')) return 'DOMAIN_LISTING';
  if (name.includes('architectural') || name.includes('drawing')) return 'ARCHITECTURAL_PLANS';
  
  return 'GENERAL_DOCUMENT';
}

// Helper functions for property photo analysis
function detectDwellingStyle(): string {
  const styles = [
    'Single storey brick veneer dwelling',
    'Double storey brick veneer dwelling', 
    'Contemporary rendered dwelling',
    'Period style cottage',
    'Modern split-level home',
    'Federation style home',
    'Colonial style dwelling'
  ];
  return styles[Math.floor(Math.random() * styles.length)];
}

function detectStreetAppeal(): string {
  const appeals = ['Excellent', 'Good', 'Average', 'Fair', 'Poor'];
  return appeals[Math.floor(Math.random() * appeals.length)];
}

function detectWallMaterial(): string {
  const materials = [
    'Rendered Brick Walls Tiled',
    'Double Brick Construction',
    'Brick Veneer with Render',
    'Weatherboard Cladding',
    'Colorbond Steel Cladding'
  ];
  return materials[Math.floor(Math.random() * materials.length)];
}

function detectRoofMaterial(): string {
  const materials = ['Concrete Tiles', 'Terracotta Tiles', 'Colorbond Steel', 'Slate Tiles'];
  return materials[Math.floor(Math.random() * materials.length)];
}

function detectWindowFrames(): string {
  const frames = ['Aluminium', 'Timber', 'UPVC', 'Steel'];
  return frames[Math.floor(Math.random() * frames.length)];
}

function detectExternalCondition(): string {
  const conditions = ['Excellent', 'Good', 'Average', 'Fair', 'Poor'];
  return conditions[Math.floor(Math.random() * conditions.length)];
}

function detectLandscaping(): string {
  return 'Established gardens with lawn areas, mature trees and garden beds';
}

function detectAncillaryImprovements(): string {
  const improvements = [
    'Balcony, verandah/outdoor area, undercover BBQ area with built in BBQ, workshop, fernery, extensive gardens with removable garden beds and gravel surrounds, automated irrigation, clothes line, fountain/pond, full concrete pathing throughout gardens and house surrounds, colorbond and powdered coating aluminium fencing.',
    'Double garage with automatic doors, workshop area, garden shed, pergola, swimming pool with decking, landscaped gardens with irrigation system.',
    'Carport, outdoor entertaining area, storage shed, vegetable garden, greenhouse, water tank, solar panels.',
    'Triple garage, home office/studio, tennis court, swimming pool, outdoor kitchen, extensive landscaping.'
  ];
  return improvements[Math.floor(Math.random() * improvements.length)];
}

function extractOutdoorFeatures(): string[] {
  const features = [
    'Swimming pool', 'Outdoor entertaining area', 'Garden shed', 'Workshop',
    'Greenhouse', 'Water tank', 'Solar panels', 'Tennis court', 'Basketball court',
    'Playground equipment', 'Fire pit', 'Outdoor kitchen', 'Pergola', 'Gazebo'
  ];
  return features.slice(0, Math.floor(Math.random() * 5) + 2);
}

function generateDwellingDescription(): string {
  return 'Dwelling 3 Bedroom(s) And 2 Bathroom(s) Plus study/fourth bedroom, laundry, powdered room, walk-in pantry, lounge/theatre room, family/meals/kitchen, gallery, entry, 2 x walk in robes.';
}

function extractListingFeatures(): string[] {
  return [
    'Split system air conditioning',
    'Dishwasher',
    'Built-in wardrobes',
    'Outdoor entertaining area',
    'Garden shed',
    'Double garage'
  ];
}

function generateMarketingText(): string {
  return 'Beautifully presented family home in sought-after location with quality finishes throughout.';
}

function extractRoomLayout(): any {
  return {
    bedrooms: Math.floor(Math.random() * 4) + 2,
    bathrooms: Math.floor(Math.random() * 3) + 1,
    livingAreas: Math.floor(Math.random() * 3) + 1,
    kitchen: 'Open plan kitchen with island bench',
    study: Math.random() > 0.5,
    laundry: true,
    garage: Math.floor(Math.random() * 3) + 1
  };
}

function extractStructuralDetails(): any {
  return {
    foundation: 'Concrete slab',
    framing: 'Timber frame',
    roofStructure: 'Timber trusses',
    loadBearing: 'Standard residential construction'
  };
}

function extractBuildingSpecs(): any {
  return {
    wallInsulation: 'R2.5 bulk insulation',
    roofInsulation: 'R6.0 bulk insulation',
    energyRating: Math.floor(Math.random() * 4) + 6,
    accessibility: 'Standard residential access'
  };
}

function extractComplianceInfo(): any {
  return {
    buildingCode: 'BCA 2019 compliant',
    energyEfficiency: '6 star energy rating',
    accessibility: 'Accessible bathroom and entry',
    fireRating: 'Standard residential requirements'
  };
}

function extractMaterialSpecs(): any {
  return {
    external: 'Brick veneer with render',
    internal: 'Plasterboard with paint finish',
    flooring: 'Tiles and carpet',
    roofing: 'Concrete tiles'
  };
}

function extractConstructionSpecs(): any {
  return {
    structuralWarranty: '6 year structural warranty',
    completionTimeframe: '24 weeks',
    qualityStandards: 'HIA standards',
    variations: 'Variations subject to approval'
  };
}

function extractFinishSchedule(): any {
  return {
    flooring: 'Porcelain tiles to wet areas, carpet to bedrooms, timber-look flooring to living areas',
    kitchen: 'Stone benchtops, soft-close drawers, stainless steel appliances',
    bathroom: 'Floor to ceiling tiles, stone vanity tops, quality tapware',
    paint: 'Low VOC paint throughout'
  };
}

function extractInclusions(): string[] {
  return [
    'Split system air conditioning',
    'Dishwasher',
    'Clothesline',
    'TV antenna',
    'Garden taps',
    'Driveway and paths'
  ];
}

function extractExclusions(): string[] {
  return [
    'Landscaping beyond basic preparation',
    'Fencing (unless specified)',
    'Window coverings',
    'Light fittings (unless specified)'
  ];
}

function generateFutureDate(): string {
  const today = new Date();
  today.setMonth(today.getMonth() + Math.floor(Math.random() * 12) + 6);
  return today.toISOString().split('T')[0];
}

function generateBuilderInfo(): any {
  return {
    name: 'Quality Homes Pty Ltd',
    license: 'DB-U12345',
    insurance: 'Covered by Home Warranty Insurance',
    contact: 'contact@qualityhomes.com.au'
  };
}

function extractInteriorFinishes(): any {
  return {
    walls: 'Plasterboard with low VOC paint',
    ceilings: '2.7m high ceilings with decorative cornices',
    doors: 'Hollow core doors with brushed nickel handles',
    windows: 'Double hung windows with flyscreens'
  };
}

function extractFixturesAndFittings(): any {
  return {
    lighting: 'LED downlights throughout, pendant lights over island',
    switches: 'White plastic switches and power points',
    tapware: 'Chrome mixer taps throughout',
    handles: 'Brushed nickel door and cabinet handles'
  };
}

function extractFlooringDetails(): any {
  return {
    kitchen: 'Porcelain tiles 600x600mm',
    bathrooms: 'Porcelain tiles 300x300mm',
    bedrooms: 'Carpet with quality underlay',
    living: 'Timber-look vinyl planks'
  };
}

function extractKitchenSpecs(): any {
  return {
    benchtops: 'Engineered stone 40mm thick',
    cabinets: 'Polyurethane finish with soft-close drawers',
    splashback: 'Subway tile splashback',
    appliances: 'Stainless steel cooking appliances'
  };
}

function extractBathroomSpecs(): any {
  return {
    tiles: 'Floor to ceiling wall tiles',
    vanity: 'Timber vanity with stone top',
    shower: 'Semi-frameless shower screen',
    toilet: 'Wall-faced toilet suite'
  };
}

function extractHVACDetails(): any {
  return {
    heating: 'Reverse cycle split system air conditioning',
    cooling: 'Split system to main living areas',
    ventilation: 'Exhaust fans to wet areas',
    insulation: 'Bulk and reflective insulation'
  };
}

function extractElectricalSpecs(): any {
  return {
    switchboard: 'Modern safety switch board',
    outlets: 'Double power points throughout',
    lighting: 'LED downlights and pendant lights',
    safety: 'Smoke detectors hard-wired'
  };
}

function extractPlumbingSpecs(): any {
  return {
    hotWater: 'Instantaneous gas hot water system',
    drainage: 'PVC stormwater and sewer drainage',
    taps: 'Water efficient tapware throughout',
    fixtures: 'WELS rated fixtures'
  };
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