// Frontend utility for calling Domain API endpoints through your backend
class DomainAPIClient {
  constructor(baseURL = '/api/domain') {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
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
    const params = new URLSearchParams({
      terms,
      pageSize: options.pageSize || 10,
      channel: options.channel || 'All'
    });
    
    return this.request(`/suggest?${params}`);
  }

  // Property details
  async getPropertyDetails(propertyId) {
    return this.request(`/properties/${propertyId}`);
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