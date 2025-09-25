import rateLimit from "express-rate-limit";

// Domain API rate limiter (conservative approach)
export const domainAPILimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 45, // Allow 45 requests per minute (conservative under typical limits)
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => `domain-api-${req.ip}`, // Per IP tracking
  handler: (req, res) => {
    console.warn(`🚨 Rate limit exceeded for IP: ${req.ip} on Domain API`);
    res.status(429).json({
      error: "Too many requests to Domain API. Please wait before retrying.",
      retryAfter: Math.ceil(60), // seconds
      tip: "Consider caching results or reducing request frequency"
    });
  },
  onLimitReached: (req, res) => {
    console.warn(`⚠️ Rate limit approaching for IP: ${req.ip}`);
  }
});

// Request logger middleware
export const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const method = req.method;
    const url = req.originalUrl;
    
    console.log(`${method} ${url} - ${status} (${duration}ms)`);
    
    // Warn on slow responses
    if (duration > 5000) {
      console.warn(`🐌 Slow Domain API response: ${duration}ms for ${url}`);
    }
    
    // Track error responses
    if (status >= 400) {
      console.error(`❌ Domain API error: ${status} for ${url}`);
    }
  });
  
  next();
};