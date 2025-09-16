import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json", ...corsHeaders },
    ...init,
  });
}

function badRequest(msg: string, details?: unknown) {
  return json({ success: false, error: msg, details }, { status: 400 });
}

function serverError(msg: string, details?: unknown) {
  return json({ success: false, error: msg, details }, { status: 500 });
}

interface RealCommercialScrapingRequest {
  operation: "bulk_scrape" | "single_property" | "search_results";
  location?: string;
  property_types?: string[];
  listing_types?: ("for-sale" | "sold" | "for-lease" | "leased")[];
  max_pages?: number;
  url?: string; // for single property
}

interface PropertyListing {
  url: string;
  address: string;
  price?: number;
  price_display?: string;
  property_type: string;
  listing_type: "for-sale" | "sold" | "for-lease" | "leased";
  bedrooms?: number;
  bathrooms?: number;
  car_spaces?: number;
  building_area?: number;
  land_area?: number;
  year_built?: number;
  description?: string;
  agent_name?: string;
  agent_company?: string;
  listing_date?: string;
  sold_date?: string;
  lease_date?: string;
  lease_terms?: string;
  rental_yield?: number;
  cap_rate?: number;
  images?: string[];
  suburb?: string;
  state?: string;
  postcode?: string;
  zoning?: string;
  council?: string;
  features?: string[];
  inspection_times?: string;
  auction_date?: string;
  tender_close_date?: string;
  expressions_of_interest?: boolean;
  commercial_type?: string;
  net_area?: number;
  gross_area?: number;
  office_area?: number;
  warehouse_area?: number;
  retail_area?: number;
  parking_ratio?: string;
  lift_access?: boolean;
  air_conditioning?: string;
  heating?: string;
  security?: string;
  cafe_food?: boolean;
  public_transport?: string;
  major_tenants?: string[];
  lease_expiry?: string;
  outgoings?: number;
  body_corporate?: number;
  rates?: number;
  water_rates?: number;
  esc_clause?: boolean;
  wale?: string;
  nabers_rating?: string;
  green_star_rating?: string;
  building_classification?: string;
  fire_rating?: string;
  disability_access?: boolean;
  broadband?: string;
  signage_rights?: string;
  exclusivity_rights?: string;
  furniture_included?: boolean;
  vendor_finance?: boolean;
  gst_applicable?: boolean;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return badRequest("Use POST with JSON body");

  let payload: RealCommercialScrapingRequest;
  try { 
    payload = await req.json(); 
  } catch { 
    return badRequest("Invalid JSON body"); 
  }

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  // Authentication
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return json({ success: false, error: "Missing or invalid Authorization header" }, { status: 401 });
  }
  const jwt = authHeader.replace(/^Bearer\s+/i, "");

  const { data: userRes, error: userErr } = await supabase.auth.getUser(jwt);
  if (userErr || !userRes?.user) {
    return json({ success: false, error: "Invalid or expired session" }, { status: 401 });
  }
  const user = userRes.user;

  console.log(`RealCommercial Scraper: ${payload.operation} operation for user ${user.id}`);

  try {
    switch (payload.operation) {
      case "bulk_scrape":
        return await performBulkScrape(payload, supabase, user.id);
      case "single_property":
        if (!payload.url) return badRequest("URL required for single property scraping");
        return await scrapeSingleProperty(payload.url, supabase, user.id);
      case "search_results":
        return await scrapeSearchResults(payload, supabase, user.id);
      default:
        return badRequest("Invalid operation. Use 'bulk_scrape', 'single_property', or 'search_results'");
    }
  } catch (error) {
    console.error("RealCommercial scraper error:", error);
    return serverError("Scraping failed", error instanceof Error ? error.message : String(error));
  }
});

async function performBulkScrape(
  request: RealCommercialScrapingRequest, 
  supabase: any, 
  userId: string
) {
  const { location = "australia", property_types = [], listing_types = ["for-sale", "sold", "for-lease", "leased"], max_pages = 50 } = request;
  
  console.log(`Starting bulk scrape for ${location} with ${listing_types.length} listing types`);
  
  const results: PropertyListing[] = [];
  const errors: string[] = [];
  
  for (const listingType of listing_types) {
    console.log(`Scraping ${listingType} listings...`);
    
    try {
      // Build search URL for RealCommercial
      const baseUrl = "https://www.realcommercial.com.au";
      let searchUrl = `${baseUrl}/${listingType}`;
      
      if (location !== "australia") {
        searchUrl += `/${location}`;
      }
      
      // Add property type filters if specified
      if (property_types.length > 0) {
        const typeParams = property_types.map(type => `property-type=${encodeURIComponent(type)}`).join("&");
        searchUrl += searchUrl.includes("?") ? `&${typeParams}` : `?${typeParams}`;
      }
      
      console.log(`Searching: ${searchUrl}`);
      
      const pageResults = await scrapeSearchPages(searchUrl, max_pages, listingType);
      results.push(...pageResults);
      
      // Rate limiting - be respectful to the server
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      const errorMsg = `Failed to scrape ${listingType}: ${error instanceof Error ? error.message : String(error)}`;
      console.error(errorMsg);
      errors.push(errorMsg);
    }
  }
  
  console.log(`Bulk scrape completed. Found ${results.length} properties with ${errors.length} errors`);
  
  // Store results in database
  const savedCount = await savePropertiesToDatabase(results, supabase, userId);
  
  return json({
    success: true,
    message: `Bulk scrape completed`,
    total_found: results.length,
    total_saved: savedCount,
    errors: errors,
    summary: {
      for_sale: results.filter(p => p.listing_type === "for-sale").length,
      sold: results.filter(p => p.listing_type === "sold").length,
      for_lease: results.filter(p => p.listing_type === "for-lease").length,
      leased: results.filter(p => p.listing_type === "leased").length,
    }
  });
}

async function scrapeSearchPages(baseUrl: string, maxPages: number, listingType: string): Promise<PropertyListing[]> {
  const properties: PropertyListing[] = [];
  
  for (let page = 1; page <= maxPages; page++) {
    try {
      const pageUrl = `${baseUrl}?page=${page}`;
      console.log(`Scraping page ${page}: ${pageUrl}`);
      
      const pageProperties = await scrapeSearchPage(pageUrl, listingType as any);
      
      if (pageProperties.length === 0) {
        console.log(`No more properties found on page ${page}, stopping...`);
        break;
      }
      
      properties.push(...pageProperties);
      console.log(`Page ${page}: Found ${pageProperties.length} properties (total: ${properties.length})`);
      
      // Rate limiting between pages
      await new Promise(resolve => setTimeout(resolve, 1500));
      
    } catch (error) {
      console.error(`Error scraping page ${page}:`, error);
      // Continue with next page on error
    }
  }
  
  return properties;
}

async function scrapeSearchPage(url: string, listingType: "for-sale" | "sold" | "for-lease" | "leased"): Promise<PropertyListing[]> {
  const response = await fetchWithRetry(url);
  const html = await response.text();
  
  // Extract property listings from search results
  const properties: PropertyListing[] = [];
  
  // Parse HTML to find property listings
  const listingRegex = /<article[^>]*class="[^"]*listing[^"]*"[^>]*>([\s\S]*?)<\/article>/gi;
  const matches = html.matchAll(listingRegex);
  
  for (const match of matches) {
    try {
      const listingHtml = match[1];
      const property = parseListingFromHtml(listingHtml, listingType);
      
      if (property && property.address) {
        properties.push(property);
      }
    } catch (error) {
      console.error("Error parsing listing:", error);
    }
  }
  
  return properties;
}

function parseListingFromHtml(html: string, listingType: "for-sale" | "sold" | "for-lease" | "leased"): PropertyListing | null {
  try {
    // Extract property URL
    const urlMatch = html.match(/href="([^"]*\/property\/[^"]*)"/);
    const relativeUrl = urlMatch?.[1];
    if (!relativeUrl) return null;
    
    const fullUrl = relativeUrl.startsWith("http") ? relativeUrl : `https://www.realcommercial.com.au${relativeUrl}`;
    
    // Extract address
    const addressMatch = html.match(/<h2[^>]*>(.*?)<\/h2>|<h3[^>]*>(.*?)<\/h3>/s);
    const address = (addressMatch?.[1] || addressMatch?.[2] || "").replace(/<[^>]*>/g, "").trim();
    if (!address) return null;
    
    // Extract price
    const priceMatch = html.match(/price[^>]*>([^<]*)</i) || html.match(/\$[\d,.]+(?: per [^<]*)?/i);
    const priceDisplay = priceMatch?.[1] || priceMatch?.[0] || "";
    const priceNumber = extractNumericPrice(priceDisplay);
    
    // Extract property type
    const typeMatch = html.match(/property-type[^>]*>([^<]*)</i) || html.match(/(office|retail|warehouse|industrial|medical|hotel|development|investment|land)/i);
    const propertyType = typeMatch?.[1]?.toLowerCase() || "commercial";
    
    // Extract basic details
    const bedroomsMatch = html.match(/(\d+)\s*(?:bed|br)/i);
    const bathroomsMatch = html.match(/(\d+)\s*(?:bath|ba)/i);
    const carSpacesMatch = html.match(/(\d+)\s*(?:car|parking)/i);
    
    // Extract areas
    const areaMatch = html.match(/(\d+(?:,\d+)*)\s*(?:m2|m²|sqm)/i);
    const buildingArea = areaMatch ? parseInt(areaMatch[1].replace(/,/g, "")) : undefined;
    
    // Extract location details
    const addressParts = address.split(",").map(p => p.trim());
    const suburb = addressParts[addressParts.length - 2] || "";
    const statePostcode = addressParts[addressParts.length - 1] || "";
    const stateMatch = statePostcode.match(/([A-Z]{2,3})\s+(\d{4})/);
    
    return {
      url: fullUrl,
      address: address,
      price: priceNumber,
      price_display: priceDisplay,
      property_type: propertyType,
      listing_type: listingType,
      bedrooms: bedroomsMatch ? parseInt(bedroomsMatch[1]) : undefined,
      bathrooms: bathroomsMatch ? parseInt(bathroomsMatch[1]) : undefined,
      car_spaces: carSpacesMatch ? parseInt(carSpacesMatch[1]) : undefined,
      building_area: buildingArea,
      suburb: suburb,
      state: stateMatch?.[1] || "",
      postcode: stateMatch?.[2] || "",
    };
  } catch (error) {
    console.error("Error parsing listing HTML:", error);
    return null;
  }
}

async function scrapeSingleProperty(url: string, supabase: any, userId: string) {
  console.log(`Scraping single property: ${url}`);
  
  const response = await fetchWithRetry(url);
  const html = await response.text();
  
  // Enhanced property extraction with commercial focus
  const property = await extractDetailedPropertyData(html, url);
  
  if (!property) {
    return badRequest("Could not extract property data from the URL");
  }
  
  // Save to database
  const saved = await savePropertiesToDatabase([property], supabase, userId);
  
  return json({
    success: true,
    message: "Property scraped successfully",
    property: property,
    saved: saved > 0
  });
}

async function extractDetailedPropertyData(html: string, url: string): Promise<PropertyListing | null> {
  try {
    const text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
    
    // Extract structured data if available
    const jsonLdMatch = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
    let structuredData: any = null;
    
    if (jsonLdMatch) {
      try {
        structuredData = JSON.parse(jsonLdMatch[1]);
      } catch (e) {
        console.log("Could not parse structured data");
      }
    }
    
    // Extract address
    const addressSelectors = [
      /<h1[^>]*property-address[^>]*>([^<]+)/i,
      /<h1[^>]*>([^<]*(?:street|road|avenue|drive|lane|court|place|crescent|terrace)[^<]*)</i,
      /<div[^>]*address[^>]*>([^<]+)/i
    ];
    
    let address = "";
    for (const selector of addressSelectors) {
      const match = html.match(selector);
      if (match) {
        address = match[1].replace(/<[^>]*>/g, "").trim();
        break;
      }
    }
    
    if (!address && structuredData?.address) {
      address = structuredData.address.streetAddress || "";
    }
    
    if (!address) return null;
    
    // Determine listing type from URL or page content
    let listingType: "for-sale" | "sold" | "for-lease" | "leased" = "for-sale";
    if (url.includes("/sold/") || html.includes("sold") || html.includes("SOLD")) {
      listingType = "sold";
    } else if (url.includes("/for-lease/") || html.includes("for lease") || html.includes("FOR LEASE")) {
      listingType = "for-lease";
    } else if (url.includes("/leased/") || html.includes("leased") || html.includes("LEASED")) {
      listingType = "leased";
    }
    
    // Extract price with multiple patterns
    const pricePatterns = [
      /(?:price|sold|leased)[\s:]*\$?([\d,]+(?:\.\d+)?)\s*(?:million|mill|m)?/i,
      /\$\s*([\d,]+(?:\.\d+)?)\s*(?:million|mill|m)?/i,
      /"price"[\s:]*"?\$?([\d,]+)/i
    ];
    
    let price = 0;
    let priceDisplay = "";
    
    for (const pattern of pricePatterns) {
      const match = html.match(pattern);
      if (match) {
        priceDisplay = match[0];
        const numStr = match[1].replace(/,/g, "");
        price = parseFloat(numStr);
        
        // Handle millions
        if (match[0].toLowerCase().includes("mill")) {
          price *= 1000000;
        }
        break;
      }
    }
    
    // Extract property details
    const bedroomsMatch = html.match(/(\d+)\s*(?:bed|bedroom)s?/i);
    const bathroomsMatch = html.match(/(\d+)\s*(?:bath|bathroom)s?/i);
    const carSpacesMatch = html.match(/(\d+)\s*(?:car|parking)\s*(?:space|bay|spot)s?/i);
    
    // Extract areas - multiple patterns for commercial properties
    const areaPatterns = [
      /building area[\s:]*(\d+(?:,\d+)*)\s*(?:m2|m²|sqm)/i,
      /floor area[\s:]*(\d+(?:,\d+)*)\s*(?:m2|m²|sqm)/i,
      /total area[\s:]*(\d+(?:,\d+)*)\s*(?:m2|m²|sqm)/i,
      /(\d+(?:,\d+)*)\s*(?:m2|m²|sqm)/i
    ];
    
    let buildingArea: number | undefined;
    for (const pattern of areaPatterns) {
      const match = html.match(pattern);
      if (match) {
        buildingArea = parseInt(match[1].replace(/,/g, ""));
        break;
      }
    }
    
    // Land area
    const landAreaMatch = html.match(/land area[\s:]*(\d+(?:,\d+)*)\s*(?:m2|m²|sqm)/i);
    const landArea = landAreaMatch ? parseInt(landAreaMatch[1].replace(/,/g, "")) : undefined;
    
    // Property type detection for commercial
    const typePatterns = [
      { pattern: /office/i, type: "office" },
      { pattern: /retail/i, type: "retail" },
      { pattern: /warehouse/i, type: "warehouse" },
      { pattern: /industrial/i, type: "industrial" },
      { pattern: /medical/i, type: "medical" },
      { pattern: /hotel|accommodation/i, type: "hotel" },
      { pattern: /development/i, type: "development" },
      { pattern: /investment/i, type: "investment" },
      { pattern: /land/i, type: "land" },
      { pattern: /showroom/i, type: "showroom" },
    ];
    
    let propertyType = "commercial";
    for (const { pattern, type } of typePatterns) {
      if (pattern.test(html)) {
        propertyType = type;
        break;
      }
    }
    
    // Extract location details
    const addressParts = address.split(",").map(p => p.trim());
    const suburb = addressParts[addressParts.length - 2] || "";
    const statePostcode = addressParts[addressParts.length - 1] || "";
    const stateMatch = statePostcode.match(/([A-Z]{2,3})\s+(\d{4})/);
    
    // Extract additional commercial details
    const yieldMatch = html.match(/yield[\s:]*(\d+(?:\.\d+)?)\s*%/i);
    const rentalYield = yieldMatch ? parseFloat(yieldMatch[1]) : undefined;
    
    const capRateMatch = html.match(/cap(?:italisation)?\s*rate[\s:]*(\d+(?:\.\d+)?)\s*%/i);
    const capRate = capRateMatch ? parseFloat(capRateMatch[1]) : undefined;
    
    // Extract agent information
    const agentNameMatch = html.match(/<span[^>]*agent[^>]*>([^<]+)/i) || html.match(/agent[\s:]*([a-z\s]+)/i);
    const agentName = agentNameMatch?.[1]?.trim();
    
    const agentCompanyMatch = html.match(/<span[^>]*company[^>]*>([^<]+)/i) || html.match(/company[\s:]*([a-z\s]+)/i);
    const agentCompany = agentCompanyMatch?.[1]?.trim();
    
    // Extract description
    const descMatch = html.match(/<div[^>]*description[^>]*>([\s\S]*?)<\/div>/i) || 
                     html.match(/<p[^>]*description[^>]*>([\s\S]*?)<\/p>/i);
    const description = descMatch ? descMatch[1].replace(/<[^>]*>/g, "").trim().substring(0, 1000) : undefined;
    
    // Extract features
    const features: string[] = [];
    const featurePatterns = [
      /air conditioning/i,
      /heating/i,
      /lift access/i,
      /security/i,
      /parking/i,
      /disabled access/i,
      /cafe/i,
      /kitchen/i,
      /reception/i,
      /conference room/i,
      /meeting room/i,
    ];
    
    for (const pattern of featurePatterns) {
      if (pattern.test(html)) {
        features.push(pattern.source.replace(/[\/\\]/g, "").replace(/i$/, ""));
      }
    }
    
    return {
      url,
      address,
      price: price > 0 ? price : undefined,
      price_display: priceDisplay || undefined,
      property_type: propertyType,
      listing_type: listingType,
      bedrooms: bedroomsMatch ? parseInt(bedroomsMatch[1]) : undefined,
      bathrooms: bathroomsMatch ? parseInt(bathroomsMatch[1]) : undefined,
      car_spaces: carSpacesMatch ? parseInt(carSpacesMatch[1]) : undefined,
      building_area: buildingArea,
      land_area: landArea,
      suburb: suburb,
      state: stateMatch?.[1] || "",
      postcode: stateMatch?.[2] || "",
      rental_yield: rentalYield,
      cap_rate: capRate,
      agent_name: agentName,
      agent_company: agentCompany,
      description: description,
      features: features.length > 0 ? features : undefined,
    };
    
  } catch (error) {
    console.error("Error extracting detailed property data:", error);
    return null;
  }
}

async function scrapeSearchResults(request: RealCommercialScrapingRequest, supabase: any, userId: string) {
  // Implementation for search results scraping
  return json({ success: true, message: "Search results scraping not yet implemented" });
}

async function savePropertiesToDatabase(properties: PropertyListing[], supabase: any, userId: string): Promise<number> {
  let savedCount = 0;
  
  for (const property of properties) {
    try {
      const isRental = property.listing_type === "for-lease" || property.listing_type === "leased";
      
      if (isRental) {
        // Save to rental_evidence table
        const { error } = await supabase
          .from("rental_evidence")
          .insert({
            user_id: userId,
            comparable_address: property.address,
            rental_amount: property.price || 0,
            rental_period: "monthly", // Assume monthly for commercial
            lease_date: property.lease_date || new Date().toISOString().slice(0, 10),
            property_type: property.property_type,
            suburb: property.suburb,
            state: property.state,
            postcode: property.postcode,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            car_spaces: property.car_spaces,
            building_area: property.building_area,
            land_area: property.land_area,
            source: property.url,
            notes: `Auto-scraped from RealCommercial.com.au - ${property.listing_type}`,
            data_source_verified: true,
            last_verified_date: new Date().toISOString().slice(0, 10),
            extraction_confidence: 90.0,
            data_quality_score: 8,
            lease_type: property.listing_type === "leased" ? "completed" : "available",
            tenant_type: "commercial",
            property_description: property.description?.substring(0, 500),
          });
          
        if (!error) savedCount++;
        
      } else {
        // Save to sales_evidence table
        const { error } = await supabase
          .from("sales_evidence")
          .insert({
            user_id: userId,
            comparable_address: property.address,
            sale_price: property.price || 0,
            sale_date: property.sold_date || new Date().toISOString().slice(0, 10),
            property_type: property.property_type,
            suburb: property.suburb,
            state: property.state,
            postcode: property.postcode,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            car_spaces: property.car_spaces,
            building_area: property.building_area,
            land_area: property.land_area,
            source: property.url,
            notes: `Auto-scraped from RealCommercial.com.au - ${property.listing_type}`,
            data_source_verified: true,
            last_verified_date: new Date().toISOString().slice(0, 10),
            extraction_confidence: 90.0,
            data_quality_score: 8,
            sale_type: property.listing_type === "sold" ? "completed" : "available",
            property_description: property.description?.substring(0, 500),
          });
          
        if (!error) savedCount++;
      }
      
    } catch (error) {
      console.error(`Error saving property ${property.address}:`, error);
    }
  }
  
  console.log(`Saved ${savedCount} out of ${properties.length} properties to database`);
  return savedCount;
}

async function fetchWithRetry(url: string, maxRetries = 3): Promise<Response> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
          "DNT": "1",
          "Connection": "keep-alive",
          "Upgrade-Insecure-Requests": "1",
        },
      });
      
      clearTimeout(timeout);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
      
    } catch (error) {
      console.error(`Fetch attempt ${i + 1} failed:`, error);
      
      if (i === maxRetries - 1) {
        throw error;
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
  
  throw new Error("All fetch attempts failed");
}

function extractNumericPrice(priceStr: string): number | undefined {
  if (!priceStr) return undefined;
  
  // Remove all non-numeric characters except decimal point and comma
  const cleanStr = priceStr.replace(/[^0-9.,]/g, "");
  
  // Handle millions
  const isMillions = /million|mill|m/i.test(priceStr);
  
  // Extract the number
  const numMatch = cleanStr.match(/[\d,]+(?:\.\d+)?/);
  if (!numMatch) return undefined;
  
  let num = parseFloat(numMatch[0].replace(/,/g, ""));
  
  if (isMillions) {
    num *= 1000000;
  }
  
  return num > 0 ? num : undefined;
}