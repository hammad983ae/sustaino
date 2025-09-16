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
  data_type: "sales" | "rental";
  property_type?: string;
}

interface ExtractedPropertyData {
  address?: string;
  price?: number;
  date?: string;
  bedrooms?: number;
  bathrooms?: number;
  car_spaces?: number;
  building_area?: number;
  land_area?: number;
  property_type?: string;
}

function getHostname(url: string): string {
  try { return new URL(url).hostname; } catch { return "unknown source"; }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return badRequest("Use POST with JSON body { url, data_type }.");

  let payload: WebScrapingRequest;
  try { payload = await req.json(); } catch { return badRequest("Invalid JSON body"); }

  const { url, data_type, property_type = "residential" } = payload || {} as WebScrapingRequest;
  if (!url || !data_type) return badRequest("'url' and 'data_type' are required.");
  if (data_type !== "sales" && data_type !== "rental") return badRequest("data_type must be 'sales' or 'rental'");

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

    if (!extracted.address && !extracted.price) {
      return badRequest("Could not extract property data from the document");
    }

    // Insert evidence
    const source = getHostname(url);
    if (data_type === "sales") {
      const { data, error } = await supabase
        .from("sales_evidence")
        .insert({
          user_id: user.id,
          comparable_address: extracted.address,
          sale_price: extracted.price || 0,
          sale_date: extracted.date || new Date().toISOString().slice(0, 10),
          property_type,
          bedrooms: extracted.bedrooms ?? null,
          bathrooms: extracted.bathrooms ?? null,
          car_spaces: extracted.car_spaces ?? null,
          building_area: extracted.building_area ?? null,
          land_area: extracted.land_area ?? null,
          source: url,
          notes: `Auto-extracted from ${source}`,
        })
        .select()
        .single();
      if (error) return serverError("Database insert failed", error.message);
      return json({ success: true, data, extracted_fields: extracted });
    } else {
      const { data, error } = await supabase
        .from("rental_evidence")
        .insert({
          user_id: user.id,
          comparable_address: extracted.address,
          rental_amount: extracted.price || 0,
          rental_period: "weekly",
          lease_date: extracted.date || new Date().toISOString().slice(0, 10),
          property_type,
          bedrooms: extracted.bedrooms ?? null,
          bathrooms: extracted.bathrooms ?? null,
          car_spaces: extracted.car_spaces ?? null,
          building_area: extracted.building_area ?? null,
          land_area: extracted.land_area ?? null,
          source: url,
          notes: `Auto-extracted from ${source}`,
        })
        .select()
        .single();
      if (error) return serverError("Database insert failed", error.message);
      return json({ success: true, data, extracted_fields: extracted });
    }
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

  const prompt = `Extract property ${dataType} data. Return ONLY a JSON array of objects with fields: address, price, date, bedrooms, bathrooms, car_spaces, building_area, land_area, property_type. Price numeric (no $). Date YYYY-MM-DD. Omit unknown fields.`;

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

  const addrRe = /(\d+[a-z]?\s+[a-z\s]+(?:street|st|road|rd|avenue|ave|drive|dr|lane|ln|court|ct|place|pl|crescent|cres|terrace|tce|highway|hwy),?\s*[a-z\s]+,?\s*[a-z]{2,3}(?:\s+\d{4})?)/i;
  const addr = text.match(addrRe); if (addr) out.address = addr[0].trim();

  const priceRe = /\$[\d,]+(?:\.\d{2})?|price[:\s]*\$?([\d,]+)/i;
  const p = text.match(priceRe);
  if (p) { const num = (p[0] || p[1]).replace(/[^\d]/g, ""); const n = parseInt(num); if (n > 1000) out.price = n; }

  const bed = text.match(/(\d+)\s*(?:bed|bedroom)s?/i); if (bed) out.bedrooms = parseInt(bed[1]);
  const bath = text.match(/(\d+)\s*(?:bath|bathroom)s?/i); if (bath) out.bathrooms = parseInt(bath[1]);
  const car = text.match(/(\d+)\s*(?:car|garage|parking)\s*(?:space|bay|spot)s?/i); if (car) out.car_spaces = parseInt(car[1]);
  const barea = text.match(/(\d+)\s*(?:m2|sqm|square\s*meter|m²)/i); if (barea) out.building_area = parseInt(barea[1]);
  const larea = text.match(/(?:land|block)\s*(?:size|area)[:\s]*(\d+)\s*(?:m2|sqm|square\s*meter|m²)/i); if (larea) out.land_area = parseInt(larea[1]);

  const d1 = text.match(/\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})\b/i) || text.match(/\b(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})\b/i);
  if (d1) { const date = new Date(d1[0]); if (!isNaN(date.getTime()) && date.getFullYear() > 2000) out.date = date.toISOString().slice(0,10); }

  return out;
}