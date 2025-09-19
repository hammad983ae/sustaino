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
function unauthorized(msg = "Unauthorized") { return json({ success: false, error: msg }, { status: 401 }); }
function serverError(msg: string, details?: unknown) { return json({ success: false, error: msg, details }, { status: 500 }); }

interface WebScrapingRequest {
  url: string;
  data_type: "sales" | "rental" | "both";
}

interface ExtractedPropertyData {
  address?: string;
  price?: number;
  rental_amount?: number;
  rental_period?: string;
  lease_term_months?: number;
  lease_start_date?: string;
  lease_end_date?: string;
  review_mechanism?: string;
  review_percentage?: number;
  cpi_adjustment_rate?: number;
  fixed_increase_rate?: number;
  net_rent?: number;
  outgoings?: number;
  gross_rent?: number;
  date?: string;
  bedrooms?: number;
  bathrooms?: number;
  car_spaces?: number;
  building_area?: number;
  land_area?: number;
  property_type?: string;
  unit_number?: string;
  street_number?: string;
  street_name?: string;
  street_type?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
  year_built?: number;
  year_renovated?: number;
  condition_rating?: string;
  quality_rating?: string;
  view_rating?: string;
  aspect?: string;
  topography?: string;
  parking_spaces?: number;
  parking_type?: string;
  is_strata?: boolean;
  strata_scheme_number?: string;
  strata_lot_number?: string;
  strata_fees_quarterly?: number;
  strata_fees_annual?: number;
  body_corporate_name?: string;
  air_conditioning?: string;
  heating?: string;
  solar_panels?: boolean;
  pool?: boolean;
  energy_rating?: string;
  water_rating?: string;
  lease_term_months?: number;
  lease_start_date?: string;
  lease_end_date?: string;
}

function getHostname(url: string): string {
  try { return new URL(url).hostname; } catch { return "unknown source"; }
}

// Function to extract actual URL from chrome extension wrapper
function extractActualUrl(inputUrl: string): string {
  // Handle chrome extension URLs like chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://...
  const chromeExtensionMatch = inputUrl.match(/chrome-extension:\/\/[^\/]+\/(https?:\/\/.+)/i);
  if (chromeExtensionMatch) {
    return chromeExtensionMatch[1];
  }
  
  // Handle other common PDF viewer wrappers
  const pdfViewerMatch = inputUrl.match(/\/pdf\/web\/viewer\.html\?file=(.+)/i);
  if (pdfViewerMatch) {
    return decodeURIComponent(pdfViewerMatch[1]);
  }
  
  return inputUrl;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return badRequest("Use POST with JSON body { url, data_type }.");

  let payload: WebScrapingRequest;
  try { payload = await req.json(); } catch { return badRequest("Invalid JSON body"); }

  let { url, data_type } = payload || {} as WebScrapingRequest;
  
  if (!url || !data_type) return badRequest("'url' and 'data_type' are required.");
  if (data_type !== "sales" && data_type !== "rental" && data_type !== "both") return badRequest("data_type must be 'sales', 'rental', or 'both'");

  // Extract actual URL from chrome extension wrapper
  const originalUrl = url;
  url = extractActualUrl(url);
  
  console.log(`Processing URL: ${url} (original: ${originalUrl})`);

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  // Require a valid bearer token so we can attribute rows to the user
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return unauthorized("Missing or invalid Authorization header");
  const jwt = authHeader.replace(/^Bearer\s+/i, "");

  // Get authenticated user
  const { data: userRes, error: userErr } = await supabase.auth.getUser(jwt);
  if (userErr || !userRes?.user) return unauthorized("Invalid or expired session");
  const user = userRes.user;

  try {
    const isPDF = /\.pdf($|\?)/i.test(url) || url.toLowerCase().includes("pdf");

    let extracted: ExtractedPropertyData = {};
    if (isPDF) {
      extracted = await extractFromPDF(url, data_type);
    } else {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const resp = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      }).catch((e) => { throw new Error(`Fetch failed: ${e?.message || e}`); });
      clearTimeout(timeout);
      if (!resp.ok) return badRequest(`Failed to fetch URL (${resp.status})`);
      const html = await resp.text();
      extracted = extractPropertyData(html);
    }

    if (!extracted.address && !extracted.price && !extracted.rental_amount) {
      return badRequest("Could not extract property data from the document");
    }

    const source = getHostname(url);
    const results = { success: true, sales_added: 0, rentals_added: 0, errors: [] };

    // Extract and store sales data if price is found
    if (extracted.price) {
      try {
        const { data: salesData, error: salesError } = await supabase
          .from("sales_evidence")
          .insert({
            user_id: user.id,
            comparable_address: extracted.address || "Address not found",
            sale_price: extracted.price,
            sale_date: extracted.date || new Date().toISOString().slice(0, 10),
            property_type: extracted.property_type || "mixed",
            unit_number: extracted.unit_number ?? null,
            street_number: extracted.street_number ?? null,
            street_name: extracted.street_name ?? null,
            street_type: extracted.street_type ?? null,
            suburb: extracted.suburb ?? null,
            state: extracted.state ?? null,
            postcode: extracted.postcode ?? null,
            bedrooms: extracted.bedrooms ?? null,
            bathrooms: extracted.bathrooms ?? null,
            car_spaces: extracted.car_spaces ?? null,
            parking_spaces: extracted.parking_spaces ?? null,
            parking_type: extracted.parking_type ?? null,
            building_area: extracted.building_area ?? null,
            land_area: extracted.land_area ?? null,
            year_built: extracted.year_built ?? null,
            year_renovated: extracted.year_renovated ?? null,
            condition_rating: extracted.condition_rating ?? null,
            quality_rating: extracted.quality_rating ?? null,
            view_rating: extracted.view_rating ?? null,
            aspect: extracted.aspect ?? null,
            topography: extracted.topography ?? null,
            is_strata: extracted.is_strata ?? false,
            strata_scheme_number: extracted.strata_scheme_number ?? null,
            strata_lot_number: extracted.strata_lot_number ?? null,
            strata_fees_quarterly: extracted.strata_fees_quarterly ?? null,
            strata_fees_annual: extracted.strata_fees_annual ?? null,
            body_corporate_name: extracted.body_corporate_name ?? null,
            air_conditioning: extracted.air_conditioning ?? null,
            heating: extracted.heating ?? null,
            solar_panels: extracted.solar_panels ?? false,
            pool: extracted.pool ?? false,
            energy_rating: extracted.energy_rating ?? null,
            water_rating: extracted.water_rating ?? null,
            source: url,
            notes: `Auto-extracted from ${source}`,
            data_source_verified: true,
            last_verified_date: new Date().toISOString().slice(0, 10),
            extraction_confidence: 85.0,
            data_quality_score: 7,
          })
          .select()
          .single();
        
        if (salesError) {
          results.errors.push(`Sales data: ${salesError.message}`);
        } else {
          results.sales_added = 1;
        }
      } catch (error) {
        results.errors.push(`Sales insertion failed: ${error}`);
      }
    }

    // Extract and store rental data if rental amount is found
    if (extracted.rental_amount) {
      try {
        const { data: rentalData, error: rentalError } = await supabase
          .from("rental_evidence")
          .insert({
            user_id: user.id,
            comparable_address: extracted.address || "Address not found",
            rental_amount: extracted.rental_amount,
            rental_period: extracted.rental_period || "weekly",
            lease_date: extracted.date || new Date().toISOString().slice(0, 10),
            property_type: extracted.property_type || "mixed",
            review_mechanism: extracted.review_mechanism,
            review_percentage: extracted.fixed_increase_rate || extracted.cpi_adjustment_rate,
            cpi_adjustment_rate: extracted.cpi_adjustment_rate,
            fixed_increase_rate: extracted.fixed_increase_rate,
            net_rent: extracted.net_rent,
            outgoings: extracted.outgoings,
            gross_rent: extracted.gross_rent,
            unit_number: extracted.unit_number ?? null,
            street_number: extracted.street_number ?? null,
            street_name: extracted.street_name ?? null,
            street_type: extracted.street_type ?? null,
            suburb: extracted.suburb ?? null,
            state: extracted.state ?? null,
            postcode: extracted.postcode ?? null,
            bedrooms: extracted.bedrooms ?? null,
            bathrooms: extracted.bathrooms ?? null,
            car_spaces: extracted.car_spaces ?? null,
            parking_spaces: extracted.parking_spaces ?? null,
            parking_type: extracted.parking_type ?? null,
            building_area: extracted.building_area ?? null,
            land_area: extracted.land_area ?? null,
            year_built: extracted.year_built ?? null,
            year_renovated: extracted.year_renovated ?? null,
            condition_rating: extracted.condition_rating ?? null,
            quality_rating: extracted.quality_rating ?? null,
            view_rating: extracted.view_rating ?? null,
            aspect: extracted.aspect ?? null,
            topography: extracted.topography ?? null,
            is_strata: extracted.is_strata ?? false,
            strata_scheme_number: extracted.strata_scheme_number ?? null,
            strata_lot_number: extracted.strata_lot_number ?? null,
            strata_fees_quarterly: extracted.strata_fees_quarterly ?? null,
            strata_fees_annual: extracted.strata_fees_annual ?? null,
            body_corporate_name: extracted.body_corporate_name ?? null,
            air_conditioning: extracted.air_conditioning ?? null,
            heating: extracted.heating ?? null,
            solar_panels: extracted.solar_panels ?? false,
            pool: extracted.pool ?? false,
            energy_rating: extracted.energy_rating ?? null,
            water_rating: extracted.water_rating ?? null,
            source: url,
            notes: `Auto-extracted from ${source}`,
            data_source_verified: true,
            last_verified_date: new Date().toISOString().slice(0, 10),
            extraction_confidence: 85.0,
            data_quality_score: 7,
            lease_term_months: extracted.lease_term_months ?? null,
            lease_start_date: extracted.lease_start_date ?? null,
            lease_end_date: extracted.lease_end_date ?? null,
          })
          .select()
          .single();
        
        if (rentalError) {
          results.errors.push(`Rental data: ${rentalError.message}`);
        } else {
          results.rentals_added = 1;
        }
      } catch (error) {
        results.errors.push(`Rental insertion failed: ${error}`);
      }
    }

    // Return comprehensive results
    const message = `Extracted data: ${results.sales_added} sales, ${results.rentals_added} rentals${results.errors.length > 0 ? ` (${results.errors.length} errors)` : ''}`;
    
    return json({ 
      success: true, 
      results,
      extracted_fields: extracted,
      message
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    // Map common network/timeout/PDF errors to 400 to avoid noisy 500s
    if (/timeout|abort|invalid url|failed to download|too large|fetch failed/i.test(msg)) {
      return badRequest(msg);
    }
    return serverError("Unexpected error", msg);
  }
});

async function extractFromPDF(url: string, dataType: "sales" | "rental"): Promise<ExtractedPropertyData> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  const resp = await fetch(url, {
    signal: controller.signal,
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      Accept: "application/pdf,*/*",
    },
  }).catch((e) => { throw new Error(`Failed to download PDF: ${e?.message || e}`); });
  clearTimeout(timeout);
  if (!resp.ok) throw new Error(`Failed to download PDF: ${resp.status} ${resp.statusText}`);
  const buf = await resp.arrayBuffer();
  if (!buf.byteLength) throw new Error("Downloaded file is empty");
  const max = 20 * 1024 * 1024; // 20MB
  if (buf.byteLength > max) throw new Error(`PDF file too large (${Math.round(buf.byteLength/1024/1024)}MB), max 20MB`);

  // Chunked base64 to avoid memory spikes
  const arr = new Uint8Array(buf);
  let base64 = "";
  const CHUNK = 1_000_000;
  for (let i = 0; i < arr.length; i += CHUNK) {
    base64 += btoa(String.fromCharCode(...arr.slice(i, i + CHUNK)));
  }

  const OPENAI = Deno.env.get("OPENAI_API_KEY");
  if (!OPENAI) throw new Error("OpenAI API key not configured");

  const prompt = `Extract comprehensive property ${dataType} data. Return ONLY a JSON array of objects with these fields: address, price, date, bedrooms, bathrooms, car_spaces, parking_spaces, building_area, land_area, property_type, unit_number, street_number, street_name, street_type, suburb, state, postcode, year_built, year_renovated, condition_rating, quality_rating, view_rating, aspect, topography, parking_type, is_strata, strata_scheme_number, strata_lot_number, strata_fees_quarterly, strata_fees_annual, body_corporate_name, air_conditioning, heating, solar_panels, pool, energy_rating, water_rating. Price numeric (no $). Date YYYY-MM-DD. Boolean fields true/false. Omit unknown fields.`;

  const ai = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You extract structured property data from documents." },
        { role: "user", content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: `data:application/pdf;base64,${base64}` } },
        ] },
      ],
      max_tokens: 2000,
      temperature: 0.1,
    }),
  });
  if (!ai.ok) throw new Error(`OpenAI API error: ${ai.status}`);
  const data = await ai.json();
  const content = data?.choices?.[0]?.message?.content ?? "";
  const match = content.match(/\[[\s\S]*\]/);
  if (!match) return {};
  try {
    const arrJson = JSON.parse(match[0]);
    return Array.isArray(arrJson) && arrJson.length ? arrJson[0] : {};
  } catch { return {}; }
}

function extractPropertyData(html: string): ExtractedPropertyData {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").toLowerCase();
  const out: ExtractedPropertyData = {};

  // Enhanced address extraction
  const addrRe = /(\d+[a-z]?\s+[a-z\s]+(?:street|st|road|rd|avenue|ave|drive|dr|lane|ln|court|ct|place|pl|crescent|cres|terrace|tce|highway|hwy),?\s*[a-z\s]+,?\s*[a-z]{2,3}(?:\s+\d{4})?)/i;
  const addr = text.match(addrRe); if (addr) out.address = addr[0].trim();

  // Extract address components
  const unitRe = /(?:unit|apt|apartment)\s*(\d+[a-z]?)/i;
  const unit = text.match(unitRe); if (unit) out.unit_number = unit[1];
  
  const streetNumRe = /\b(\d+[a-z]?)\s+[a-z\s]+(?:street|st|road|rd|avenue|ave|drive|dr|lane|ln|court|ct|place|pl)/i;
  const streetNum = text.match(streetNumRe); if (streetNum) out.street_number = streetNum[1];

  const suburbRe = /,\s*([a-z\s]+),?\s*[a-z]{2,3}\s+\d{4}/i;
  const suburb = text.match(suburbRe); if (suburb) out.suburb = suburb[1].trim();

  const stateRe = /,\s*[a-z\s]+,?\s*([a-z]{2,3})\s+\d{4}/i;
  const state = text.match(stateRe); if (state) out.state = state[1].toUpperCase();

  const postcodeRe = /\b(\d{4})\b/i;
  const postcode = text.match(postcodeRe); if (postcode) out.postcode = postcode[1];

  // Property type detection
  if (text.includes("apartment") || text.includes("unit")) out.property_type = "residential";
  else if (text.includes("house") || text.includes("villa") || text.includes("townhouse")) out.property_type = "residential";
  else if (text.includes("office") || text.includes("retail") || text.includes("commercial")) out.property_type = "commercial";
  else if (text.includes("warehouse") || text.includes("industrial")) out.property_type = "industrial";
  else if (text.includes("farm") || text.includes("agricultural")) out.property_type = "agricultural";
  else out.property_type = "mixed";

  // Enhanced price extraction - both sales and rental
  const priceRe = /\$[\d,]+(?:\.\d{2})?|price[:\s]*\$?([\d,]+)/i;
  const p = text.match(priceRe);
  if (p) { const num = (p[0] || p[1]).replace(/[^\d]/g, ""); const n = parseInt(num); if (n > 1000) out.price = n; }

  // Rental income extraction (Net Income, Rental, etc.)
  const rentalRe = /(?:net\s*income|rental\s*income|rent)[:\s]*\$?([\d,]+)(?:\s*pa|\s*per\s*annum|\s*annually|\s*pw|\s*per\s*week|\s*weekly)?/i;
  const rental = text.match(rentalRe);
  if (rental) {
    const amount = parseInt(rental[1].replace(/[^\d]/g, ""));
    if (amount > 100) {
      out.rental_amount = amount;
      // Determine if it's weekly or annual based on amount and context
      const context = rental[0].toLowerCase();
      if (context.includes("pa") || context.includes("annum") || context.includes("annual") || amount > 50000) {
        out.rental_period = "annual";
      } else {
        out.rental_period = "weekly";
      }
    }
  }

  // Extract net rent specifically
  const netRentMatch = text.match(/net\s+(?:income|rent)[\s:]*\$?([\d,]+)/i);
  if (netRentMatch) {
    out.net_rent = parseInt(netRentMatch[1].replace(/[^\d]/g, ""));
  }

  // Extract outgoings
  const outgoingsMatch = text.match(/outgoings[\s:]*\$?([\d,]+)/i);
  if (outgoingsMatch) {
    out.outgoings = parseInt(outgoingsMatch[1].replace(/[^\d]/g, ""));
  }

  // Extract gross rent
  const grossRentMatch = text.match(/gross\s+rent[\s:]*\$?([\d,]+)/i);
  if (grossRentMatch) {
    out.gross_rent = parseInt(grossRentMatch[1].replace(/[^\d]/g, ""));
  }

  // Extract review mechanism and rates
  const cpiMatch = text.match(/(?:cpi|consumer\s+price\s+index)(?:\s+(?:increase|review|adjustment))?/i);
  const fixedPercentMatch = text.match(/(?:fixed\s+)?(\d+(?:\.\d+)?)%\s*(?:annual\s+)?(?:increase|review|adjustment)/i);
  const marketReviewMatch = text.match(/market\s+review/i);

  if (cpiMatch) {
    out.review_mechanism = 'cpi';
    // Try to extract CPI rate if specified
    const cpiRateMatch = text.match(/cpi[\s+]*(\d+(?:\.\d+)?)%/i);
    if (cpiRateMatch) {
      out.cpi_adjustment_rate = parseFloat(cpiRateMatch[1]);
    }
  } else if (fixedPercentMatch) {
    out.review_mechanism = 'fixed_percentage';
    out.fixed_increase_rate = parseFloat(fixedPercentMatch[1]);
  } else if (marketReviewMatch) {
    out.review_mechanism = 'market_review';
  }

  // Extract lease term
  const leaseTermMatch = text.match(/(\d+)\s*year(?:s)?\s*lease/i);
  if (leaseTermMatch) {
    out.lease_term_months = parseInt(leaseTermMatch[1]) * 12;
  }

  // Basic property details
  const bed = text.match(/(\d+)\s*(?:bed|bedroom)s?/i); if (bed) out.bedrooms = parseInt(bed[1]);
  const bath = text.match(/(\d+)\s*(?:bath|bathroom)s?/i); if (bath) out.bathrooms = parseInt(bath[1]);
  const car = text.match(/(\d+)\s*(?:car|garage|parking)\s*(?:space|bay|spot)s?/i); if (car) {
    out.car_spaces = parseInt(car[1]);
    out.parking_spaces = parseInt(car[1]);
  }

  // Area measurements
  const barea = text.match(/(\d+)\s*(?:m2|sqm|square\s*meter|m²)/i); if (barea) out.building_area = parseInt(barea[1]);
  const larea = text.match(/(?:land|block)\s*(?:size|area)[:\s]*(\d+)\s*(?:m2|sqm|square\s*meter|m²)/i); if (larea) out.land_area = parseInt(larea[1]);

  // Year built
  const yearRe = /(?:built|constructed)\s*(?:in\s*)?(\d{4})/i;
  const year = text.match(yearRe); if (year && parseInt(year[1]) > 1800) out.year_built = parseInt(year[1]);

  // Condition and quality
  if (text.includes("excellent") || text.includes("pristine")) out.condition_rating = "excellent";
  else if (text.includes("good") || text.includes("well maintained")) out.condition_rating = "good";
  else if (text.includes("fair") || text.includes("average")) out.condition_rating = "fair";
  else if (text.includes("poor") || text.includes("needs work")) out.condition_rating = "poor";

  // Strata detection
  out.is_strata = text.includes("strata") || text.includes("body corporate") || text.includes("owners corporation");
  
  const strataFeesRe = /strata\s*fees?[:\s]*\$?(\d+)/i;
  const strataFees = text.match(strataFeesRe); if (strataFees) {
    const fee = parseInt(strataFees[1]);
    if (fee < 2000) out.strata_fees_quarterly = fee;
    else out.strata_fees_annual = fee;
  }

  // Features
  out.air_conditioning = text.includes("air conditioning") || text.includes("air con") || text.includes("a/c") ? "yes" : undefined;
  out.heating = text.includes("heating") || text.includes("ducted heating") ? "yes" : undefined;
  out.solar_panels = text.includes("solar panel") || text.includes("solar power");
  out.pool = text.includes("pool") || text.includes("swimming pool");

  // Lease term extraction
  const leaseRe = /(\d+)\s*year\s*(?:lease|net\s*lease)/i;
  const lease = text.match(leaseRe);
  if (lease) {
    out.lease_term_months = parseInt(lease[1]) * 12;
  }

  // Energy rating
  const energyRe = /energy\s*rating[:\s]*(\d+(?:\.\d+)?)\s*star/i;
  const energy = text.match(energyRe); if (energy) out.energy_rating = `${energy[1]} stars`;

  // Date extraction
  const d1 = text.match(/\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})\b/i) || text.match(/\b(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})\b/i);
  if (d1) { const date = new Date(d1[0]); if (!isNaN(date.getTime()) && date.getFullYear() > 2000) out.date = date.toISOString().slice(0,10); }

  return out;
}