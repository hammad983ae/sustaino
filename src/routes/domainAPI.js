import express from "express";
import fetch from "node-fetch";
import { domainAPILimiter, requestLogger } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

// Apply middleware to all domain routes
router.use(requestLogger);
router.use(domainAPILimiter);

const DOMAIN_CLIENT_ID = process.env.DOMAIN_CLIENT_ID;
const DOMAIN_CLIENT_SECRET = process.env.DOMAIN_CLIENT_SECRET;

let cachedToken = null;
let tokenExpiry = null;
let requestCount = 0;
let requestResetTime = Date.now() + 60000; // Reset every minute

// Request counter with warnings
function trackRequest() {
  if (Date.now() > requestResetTime) {
    requestCount = 0;
    requestResetTime = Date.now() + 60000;
  }
  
  requestCount++;
  
  if (requestCount >= 40) {
    console.warn(`⚠️ HIGH USAGE: ${requestCount} Domain API requests in current minute`);
  } else if (requestCount >= 30) {
    console.warn(`⚠️ MODERATE USAGE: ${requestCount} Domain API requests in current minute`);
  }
  
  return requestCount;
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && tokenExpiry && now < tokenExpiry) return cachedToken;

  console.log("🔑 Refreshing Domain API token...");
  
  const res = await fetch("https://auth.domain.com.au/v1/connect/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: DOMAIN_CLIENT_ID,
      client_secret: DOMAIN_CLIENT_SECRET,
      scope: "api_properties_read",
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`❌ Token request failed: ${res.status} ${errorText}`);
    throw new Error(`Token request failed: ${res.statusText}`);
  }
  
  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = now + data.expires_in - 60;
  
  console.log("✅ Domain API token refreshed successfully");
  return cachedToken;
}

// Enhanced Domain API fetcher with monitoring
async function domainFetch(path, options = {}) {
  const requestNum = trackRequest();
  const token = await getAccessToken();
  
  console.log(`📡 Domain API Request #${requestNum}: ${path}`);
  
  const res = await fetch(`https://api.domain.com.au${path}`, {
    headers: { 
      Authorization: `Bearer ${token}`,
      ...options.headers 
    },
    ...options
  });

  // Check Domain's rate limit headers if they exist
  const remaining = res.headers.get("x-ratelimit-remaining");
  const resetTime = res.headers.get("x-ratelimit-reset");
  
  if (remaining !== null) {
    if (Number(remaining) <= 5) {
      console.warn(`🚨 CRITICAL: Only ${remaining} Domain API requests remaining!`);
    } else if (Number(remaining) <= 15) {
      console.warn(`⚠️ WARNING: ${remaining} Domain API requests remaining`);
    }
  }

  if (resetTime !== null) {
    console.log(`⏰ Rate limit resets at: ${new Date(Number(resetTime) * 1000).toISOString()}`);
  }

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`❌ Domain API error: ${res.status} ${res.statusText} - ${errorText}`);
    throw new Error(`Domain API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  console.log(`✅ Domain API success: ${path} returned ${Array.isArray(data) ? data.length : 'object'} result(s)`);
  return data;
}

// Address suggestions
router.get("/suggest", async (req, res) => {
  try {
    const { terms, pageSize = 10, channel = "All" } = req.query;
    
    if (!terms) {
      return res.status(400).json({ 
        error: "Missing 'terms' query parameter",
        example: "/api/domain/suggest?terms=100%20Harris%20St%20Pyrmont"
      });
    }

    const data = await domainFetch(
      `/v1/properties/_suggest?terms=${encodeURIComponent(terms)}&channel=${channel}&pageSize=${pageSize}`
    );
    
    res.json({
      success: true,
      count: data.length,
      data: data
    });
    
  } catch (err) {
    console.error("Suggest endpoint error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Property details by ID
router.get("/properties/:id", async (req, res) => {
  try {
    const data = await domainFetch(`/v1/properties/${req.params.id}`);
    res.json({ success: true, data });
  } catch (err) {
    console.error("Property details error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Commercial listings search
router.post("/listings/commercial", async (req, res) => {
  try {
    const searchCriteria = req.body;
    
    const data = await domainFetch("/v1/listings/commercial/_search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchCriteria)
    });
    
    res.json({ success: true, data });
  } catch (err) {
    console.error("Commercial listings error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Residential listings search
router.post("/listings/residential", async (req, res) => {
  try {
    const searchCriteria = req.body;
    
    const data = await domainFetch("/v1/listings/residential/_search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchCriteria)
    });
    
    res.json({ success: true, data });
  } catch (err) {
    console.error("Residential listings error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Suburb demographics
router.get("/demographics/:state/:suburb/:postcode?", async (req, res) => {
  try {
    const { state, suburb, postcode } = req.params;
    const path = postcode
      ? `/v2/demographics/${state}/${suburb}/${postcode}`
      : `/v2/demographics/${state}/${suburb}`;
    
    const data = await domainFetch(path);
    res.json({ success: true, data });
  } catch (err) {
    console.error("Demographics error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Suburb performance statistics
router.get("/stats/:state/:suburb/:postcode?", async (req, res) => {
  try {
    const { state, suburb, postcode } = req.params;
    const path = postcode
      ? `/v2/suburbPerformanceStatistics/${state}/${suburb}/${postcode}`
      : `/v2/suburbPerformanceStatistics/${state}/${suburb}`;
    
    const data = await domainFetch(path);
    res.json({ success: true, data });
  } catch (err) {
    console.error("Performance stats error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Sales results
router.get("/sales/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const data = await domainFetch(`/v1/salesResults/${city}`);
    res.json({ success: true, data });
  } catch (err) {
    console.error("Sales results error:", err);
    res.status(500).json({ error: err.message });
  }
});

// API status and monitoring endpoint
router.get("/status", (req, res) => {
  res.json({
    status: "healthy",
    tokenCached: !!cachedToken,
    tokenExpiry: tokenExpiry ? new Date(tokenExpiry * 1000).toISOString() : null,
    requestsThisMinute: requestCount,
    resetTime: new Date(requestResetTime).toISOString()
  });
});

export default router;