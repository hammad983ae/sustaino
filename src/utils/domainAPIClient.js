// Frontend utility for calling Domain API endpoints through your backend
class DomainAPIClient {
  constructor(baseURL = 'https://cxcfxnbvtddwebqprile.supabase.co/functions/v1/domain-integration') {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}/proxy`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4Y2Z4bmJ2dGRkd2VicXByaWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxOTQwMjksImV4cCI6MjA3MDc3MDAyOX0.-tSWd97U0rxEZcW1ejcAJlX2EPVBDAFI-dEuQf6CDys`,
          ...options.headers
        },
        body: JSON.stringify({
          path: endpoint,
          method: options.method || 'GET',
          query: options.query,
          body: options.body ? JSON.parse(options.body) : undefined,
          auth: { use: 'oauth' }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 429) {
          console.warn('⚠️ Rate limit hit - please slow down requests');
          throw new Error(errorData.error || 'Rate limit exceeded');
        }
        
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Domain API call failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Address suggestions with debouncing
  async getPropertySuggestions(terms, options = {}) {
    return this.request('/v1/addressLocators', {
      method: 'GET',
      query: {
        search: terms,
        pageSize: options.pageSize || 10,
        channel: options.channel || 'All'
      }
    });
  }

  // Property details
  async getPropertyDetails(propertyId) {
    return this.request(`/v1/properties/${propertyId}`);
  }

  // Commercial listings search
  async searchCommercialListings(criteria) {
    return this.request('/listings/commercial', {
      method: 'POST',
      body: JSON.stringify(criteria)
    });
  }

  // Residential listings search  
  async searchResidentialListings(criteria) {
    return this.request('/listings/residential', {
      method: 'POST',
      body: JSON.stringify(criteria)
    });
  }

  // Save sales evidence to database
  async saveSalesEvidence(salesData) {
    return this.request('/save-sales-evidence', {
      method: 'POST',
      body: JSON.stringify(salesData)
    });
  }

  // Save leasing evidence to database
  async saveLeasingEvidence(leasingData) {
    return this.request('/save-leasing-evidence', {
      method: 'POST',
      body: JSON.stringify(leasingData)
    });
  }

  // Demographics data
  async getDemographics(state, suburb, postcode = null) {
    const endpoint = postcode 
      ? `/demographics/${state}/${suburb}/${postcode}`
      : `/demographics/${state}/${suburb}`;
    return this.request(endpoint);
  }

  // Performance statistics
  async getSuburbStats(state, suburb, postcode = null) {
    const endpoint = postcode 
      ? `/stats/${state}/${suburb}/${postcode}`
      : `/stats/${state}/${suburb}`;
    return this.request(endpoint);
  }

  // Sales results
  async getSalesResults(city) {
    return this.request(`/sales/${city}`);
  }

  // Monitor API status
  async getStatus() {
    return this.request('/status');
  }
}

// Debounced search helper for autocomplete
export function createDebouncedSearch(apiClient, delay = 300) {
  let timeoutId;
  
  return (terms, callback) => {
    clearTimeout(timeoutId);
    
    if (!terms || terms.length < 3) {
      callback([]);
      return;
    }
    
    timeoutId = setTimeout(async () => {
      try {
        const response = await apiClient.getPropertySuggestions(terms);
        callback(response.data || []);
      } catch (error) {
        console.error('Search failed:', error);
        callback([]);
      }
    }, delay);
  };
}

export default DomainAPIClient;