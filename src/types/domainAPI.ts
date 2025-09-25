// Domain API Types for Backend Integration
// This file defines the complete API contract between frontend and backend

export interface DomainCredentials {
  clientId: string;
  clientSecret: string;
  apiKey: string;
}

export interface PropertySearchRequest {
  terms: string;
  state?: string;
  suburb?: string;
  postcode?: string;
  propertyTypes?: string[];
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface PropertySuggestion {
  id: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  propertyType: string;
  unitNumber?: string;
  streetNumber: string;
  streetName: string;
  streetType: string;
}

export interface PropertyDetailsRequest {
  propertyId: string;
  includeSalesHistory?: boolean;
  includeRentalHistory?: boolean;
}

export interface PropertyDetails {
  id: string;
  address: {
    unitNumber?: string;
    streetNumber: string;
    streetName: string;
    streetType: string;
    suburb: string;
    state: string;
    postcode: string;
    displayAddress: string;
  };
  propertyType: string;
  features: {
    bedrooms: number;
    bathrooms: number;
    parkingSpaces: number;
    landSize?: number;
    buildingSize?: number;
    yearBuilt?: number;
  };
  estimates: {
    currentValue: number;
    confidenceLevel: 'High' | 'Medium' | 'Low';
    valuationRange: {
      min: number;
      max: number;
    };
    lastUpdated: string;
  };
  salesHistory?: PropertySale[];
  rentalHistory?: PropertyRental[];
}

export interface PropertySale {
  date: string;
  price: number;
  propertyType: string;
  source: string;
}

export interface PropertyRental {
  date: string;
  price: number;
  period: 'weekly' | 'monthly';
  propertyType: string;
}

export interface ListingsSearchRequest {
  listingType: 'residential' | 'commercial';
  locations: string[];
  propertyTypes?: string[];
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  keywords?: string[];
  sortBy?: 'price' | 'date' | 'address';
  sortOrder?: 'asc' | 'desc';
  pageSize?: number;
  pageNumber?: number;
}

export interface PropertyListing {
  id: string;
  listingType: 'sale' | 'rent';
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  propertyType: string;
  price: {
    display: string;
    value?: number;
    priceType: 'fixed' | 'range' | 'auction' | 'negotiation';
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    parkingSpaces: number;
    landSize?: number;
    buildingSize?: number;
  };
  description: string;
  images: string[];
  agent: {
    name: string;
    agency: string;
    phone: string;
    email: string;
  };
  dateAvailable?: string;
  inspectionTimes?: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
}

export interface MarketDataRequest {
  state: string;
  suburb: string;
  postcode?: string;
  propertyType?: string;
  timeframe?: 'last12months' | 'last24months' | 'last5years';
}

export interface MarketData {
  location: {
    suburb: string;
    state: string;
    postcode: string;
  };
  marketIndicators: {
    medianPrice: number;
    priceGrowth: {
      quarterly: number;
      yearly: number;
      fiveYear: number;
    };
    salesVolume: {
      totalSales: number;
      averageDaysOnMarket: number;
      clearanceRate: number;
    };
  };
  demographics: {
    population: number;
    medianAge: number;
    medianHouseholdIncome: number;
    occupancyRate: number;
  };
  comparableSales: PropertySale[];
}

export interface SuburbStatsRequest {
  state: string;
  suburb: string;
  postcode?: string;
}

export interface SuburbStats {
  suburb: string;
  state: string;
  postcode: string;
  performance: {
    medianPrice: number;
    growth: {
      quarterly: number;
      yearly: number;
    };
    salesActivity: {
      totalSales: number;
      averageDaysOnMarket: number;
      highestSale: number;
      lowestSale: number;
    };
  };
  demographics: {
    population: number;
    households: number;
    medianAge: number;
    medianIncome: number;
  };
  trends: {
    supplyDemand: 'high-supply' | 'balanced' | 'high-demand';
    marketCondition: 'buyers' | 'balanced' | 'sellers';
    investmentYield: number;
  };
}

export interface SalesResultsRequest {
  city: string;
  suburb?: string;
  propertyType?: string;
  dateFrom?: string;
  dateTo?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface SalesResults {
  results: PropertySale[];
  summary: {
    totalSales: number;
    averagePrice: number;
    medianPrice: number;
    priceRange: {
      min: number;
      max: number;
    };
  };
  dateRange: {
    from: string;
    to: string;
  };
}

export interface APIStatusResponse {
  status: 'online' | 'offline' | 'degraded';
  responseTime: number;
  endpoints: {
    search: 'online' | 'offline';
    details: 'online' | 'offline';
    listings: 'online' | 'offline';
    market: 'online' | 'offline';
  };
  rateLimit: {
    remaining: number;
    resetTime: string;
    dailyLimit: number;
  };
  lastChecked: string;
}

// Error Response Types
export interface DomainAPIError {
  error: string;
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Rate Limiting Types
export interface RateLimitInfo {
  requestsRemaining: number;
  resetTime: string;
  dailyLimit: number;
  currentUsage: number;
}