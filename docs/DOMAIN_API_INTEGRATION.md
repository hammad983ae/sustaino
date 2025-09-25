# Domain API Integration Guide

## Overview
This document outlines the complete integration requirements for the Domain API backend implementation.

## Authentication
The Domain API uses OAuth 2.0 with the following credentials:
- **Client ID**: `client_5484e0d03b33a72b843efa7e1a768f53`
- **Client Secret**: (stored in Supabase secrets as `DOMAIN_CLIENT_SECRET`)
- **API Keys**: 
  - Primary: (stored in Supabase secrets as `DOMAIN_API_KEY_PRIMARY`)
  - Secondary: `key_8899c93cf6b27ffabfc64e0c03dddd25`
  - Tertiary: `key_9c5d7623566572e036edcee05252843f`

## Base URL
```
https://api.domain.com.au
```

## Required Endpoints

### 1. Property Search
**Frontend Request:**
```typescript
POST /api/domain/search/properties
{
  "terms": "123 Collins Street Melbourne",
  "state": "VIC",
  "suburb": "Melbourne",
  "postcode": "3000",
  "propertyTypes": ["Apartment", "House"],
  "minBedrooms": 2,
  "maxBedrooms": 4,
  "minPrice": 500000,
  "maxPrice": 1000000
}
```

**Backend Should Call:**
```
GET https://api.domain.com.au/v1/addressLocators
```

**Expected Response:**
```typescript
{
  "suggestions": [
    {
      "id": "PD-123456",
      "address": "123 Collins Street",
      "suburb": "Melbourne",
      "state": "VIC",
      "postcode": "3000",
      "propertyType": "Apartment",
      "unitNumber": "12",
      "streetNumber": "123",
      "streetName": "Collins",
      "streetType": "Street"
    }
  ]
}
```

### 2. Property Details
**Frontend Request:**
```typescript
GET /api/domain/properties/{propertyId}?includeSalesHistory=true&includeRentalHistory=true
```

**Backend Should Call:**
```
GET https://api.domain.com.au/v1/properties/{propertyId}
```

**Expected Response:**
```typescript
{
  "id": "PD-123456",
  "address": {
    "displayAddress": "12/123 Collins Street, Melbourne VIC 3000",
    "unitNumber": "12",
    "streetNumber": "123",
    "streetName": "Collins",
    "streetType": "Street",
    "suburb": "Melbourne",
    "state": "VIC",
    "postcode": "3000"
  },
  "propertyType": "Apartment",
  "features": {
    "bedrooms": 2,
    "bathrooms": 1,
    "parkingSpaces": 1,
    "landSize": 0,
    "buildingSize": 85,
    "yearBuilt": 2018
  },
  "estimates": {
    "currentValue": 750000,
    "confidenceLevel": "High",
    "valuationRange": {
      "min": 720000,
      "max": 780000
    },
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "salesHistory": [
    {
      "date": "2023-06-15",
      "price": 675000,
      "propertyType": "Apartment",
      "source": "Domain"
    }
  ]
}
```

### 3. Listings Search
**Frontend Request:**
```typescript
POST /api/domain/search/listings
{
  "listingType": "residential",
  "locations": ["Melbourne, VIC"],
  "propertyTypes": ["Apartment"],
  "minPrice": 500000,
  "maxPrice": 800000,
  "minBedrooms": 2,
  "sortBy": "price",
  "sortOrder": "asc",
  "pageSize": 20,
  "pageNumber": 1
}
```

**Backend Should Call:**
```
POST https://api.domain.com.au/v1/listings/residential/_search
```

**Expected Response:**
```typescript
{
  "listings": [
    {
      "id": "2019385991",
      "listingType": "sale",
      "address": "12/123 Collins Street, Melbourne VIC 3000",
      "suburb": "Melbourne",
      "state": "VIC",
      "postcode": "3000",
      "propertyType": "Apartment",
      "price": {
        "display": "$750,000",
        "value": 750000,
        "priceType": "fixed"
      },
      "features": {
        "bedrooms": 2,
        "bathrooms": 1,
        "parkingSpaces": 1,
        "buildingSize": 85
      },
      "description": "Stunning apartment in the heart of Melbourne...",
      "images": ["https://bucket-api.domain.com.au/v1/bucket/image/123.jpg"],
      "agent": {
        "name": "John Smith",
        "agency": "Melbourne Real Estate",
        "phone": "03 9123 4567",
        "email": "john@melbournere.com.au"
      }
    }
  ],
  "totalResults": 45,
  "pageSize": 20,
  "pageNumber": 1
}
```

### 4. Market Data
**Frontend Request:**
```typescript
POST /api/domain/market/data
{
  "state": "VIC",
  "suburb": "Melbourne",
  "postcode": "3000",
  "propertyType": "Apartment",
  "timeframe": "last12months"
}
```

**Backend Should Call:**
```
GET https://api.domain.com.au/v1/suburbPerformanceStatistics
```

**Expected Response:**
```typescript
{
  "location": {
    "suburb": "Melbourne",
    "state": "VIC",
    "postcode": "3000"
  },
  "marketIndicators": {
    "medianPrice": 785000,
    "priceGrowth": {
      "quarterly": 2.5,
      "yearly": 8.3,
      "fiveYear": 45.2
    },
    "salesVolume": {
      "totalSales": 145,
      "averageDaysOnMarket": 28,
      "clearanceRate": 72
    }
  },
  "demographics": {
    "population": 12450,
    "medianAge": 34,
    "medianHouseholdIncome": 95000,
    "occupancyRate": 94.5
  }
}
```

### 5. API Status
**Frontend Request:**
```typescript
GET /api/domain/status
```

**Expected Response:**
```typescript
{
  "status": "online",
  "responseTime": 245,
  "endpoints": {
    "search": "online",
    "details": "online",
    "listings": "online",
    "market": "online"
  },
  "rateLimit": {
    "remaining": 850,
    "resetTime": "2024-01-15T14:00:00Z",
    "dailyLimit": 1000
  },
  "lastChecked": "2024-01-15T13:45:30Z"
}
```

## Rate Limiting
- **Daily Limit**: 1,000 requests per day
- **Per Minute**: 60 requests per minute
- **Concurrent**: Maximum 5 concurrent requests

## Error Handling
All endpoints should return standardized error responses:

```typescript
{
  "error": "RATE_LIMIT_EXCEEDED",
  "code": "429",
  "message": "Daily rate limit of 1000 requests exceeded",
  "details": {
    "resetTime": "2024-01-16T00:00:00Z",
    "currentUsage": 1000
  },
  "timestamp": "2024-01-15T13:45:30Z"
}
```

Common error codes:
- `400`: Invalid request parameters
- `401`: Authentication failed
- `403`: Insufficient permissions
- `404`: Resource not found
- `429`: Rate limit exceeded
- `500`: Internal server error
- `503`: Service unavailable

## Security Requirements
1. **Never expose** Domain API credentials in frontend code
2. **Store all secrets** in Supabase Edge Function environment variables
3. **Implement request validation** on all endpoints
4. **Log all API calls** for monitoring and debugging
5. **Implement circuit breaker** pattern for external API calls

## Implementation Notes
1. Use Supabase Edge Functions for all Domain API calls
2. Implement proper error handling and retries
3. Cache responses where appropriate (market data can be cached for 1 hour)
4. Monitor rate limits and implement queuing if necessary
5. Validate all input parameters before making external API calls

## Frontend Usage Examples
See `src/components/domain/DomainIntegrationDemo.tsx` for complete UI implementation that demonstrates all API endpoints.

## Testing
Use the Domain Integration Demo component to test all endpoints:
1. Navigate to `/domain-integration` (or add the component to any route)
2. Test each API endpoint with various parameters
3. Verify error handling with invalid inputs
4. Monitor rate limiting behavior