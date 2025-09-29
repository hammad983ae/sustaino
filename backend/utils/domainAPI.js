/**
 * ============================================================================
 * PROPRIETARY DOMAIN.COM.AU API CLIENT
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * Sustano Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */

const axios = require('axios');

class DomainAPI {
  constructor() {
    this.baseURL = 'https://api.domain.com.au/v1';
    this.apiKey = process.env.DOMAIN_API_KEY || 'key_2b44fe8e64ba8bf39ff3b9d6cda10224';
    this.clientId = process.env.DOMAIN_CLIENT_ID || 'client_5484e0d03b33a72b843efa7e1a768f53';
    this.clientSecret = process.env.DOMAIN_CLIENT_SECRET || 'secret_13f92df41a993db6ade84456390e4f81';
    
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Search for suggested addresses
   * @param {string} terms - Address search terms
   * @param {Object} options - Additional options
   * @returns {Promise<Array>} Array of property suggestions
   */
  async suggestProperties(terms, options = {}) {
    try {
      const params = {
        terms: terms,
        pageSize: options.pageSize || 20,
        channel: options.channel || 'All'
      };

      const response = await this.client.get('/properties/_suggest', { params });
      
      return response.data.map(property => ({
        id: property.id,
        address: property.address,
        addressComponents: property.addressComponents,
        relativeScore: property.relativeScore,
        // Normalize the data structure
        normalized: {
          unitNumber: property.addressComponents.unitNumber || '',
          streetNumber: property.addressComponents.streetNumber || '',
          streetName: property.addressComponents.streetName || '',
          streetType: property.addressComponents.streetType || '',
          streetTypeLong: property.addressComponents.streetTypeLong || '',
          suburb: property.addressComponents.suburb || '',
          postcode: property.addressComponents.postcode || property.addressComponents.postCode || '',
          state: property.addressComponents.state || '',
          fullAddress: property.address
        }
      }));
    } catch (error) {
      console.error('Domain API suggestProperties error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch property suggestions: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get detailed property information by ID
   * @param {string} propertyId - Domain property ID
   * @returns {Promise<Object>} Detailed property information
   */
  async getPropertyDetails(propertyId) {
    try {
      console.log('Domain API: Fetching property details for ID:', propertyId);
      console.log('Domain API: Full URL will be:', `${this.baseURL}/properties/${propertyId}`);
      console.log('Domain API: Using API key:', this.apiKey ? 'Present' : 'Missing');
      
      const response = await this.client.get(`/properties/${propertyId}`);
      console.log('Domain API: Raw response data:', {
        hasPhotos: response.data?.photos ? `${response.data.photos.length} photos` : 'no photos',
        photos: response.data?.photos
      });
      return response.data;
    } catch (error) {
      console.error('Domain API getPropertyDetails error:', error.response?.data || error.message);
      console.error('Domain API error status:', error.response?.status);
      console.error('Domain API error URL:', error.config?.url);
      console.error('Domain API error headers:', error.config?.headers);
      
      // Check for specific error types
      if (error.response?.status === 401) {
        throw new Error('Domain API authentication failed. Please check API credentials.');
      } else if (error.response?.status === 403) {
        throw new Error('Domain API access forbidden. Please check API permissions.');
      } else if (error.response?.status === 404) {
        throw new Error(`Property with ID ${propertyId} not found in Domain API.`);
      } else if (error.response?.status === 429) {
        throw new Error('Domain API rate limit exceeded. Please try again later.');
      }
      
      throw new Error(`Failed to fetch property details: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get property listings
   * @param {Object} filters - Search filters
   * @returns {Promise<Object>} Property listings
   */
  async getListings(filters = {}) {
    try {
      const params = {
        listingType: filters.listingType || 'Sale',
        propertyTypes: filters.propertyTypes || ['House', 'UnitApartment', 'Townhouse'],
        localities: filters.localities || [],
        pageSize: filters.pageSize || 20,
        pageNumber: filters.pageNumber || 1
      };

      const response = await this.client.get('/listings/residential/_search', { params });
      return response.data;
    } catch (error) {
      console.error('Domain API getListings error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch listings: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get property sales history
   * @param {string} propertyId - Domain property ID
   * @returns {Promise<Array>} Sales history
   */
  async getSalesHistory(propertyId) {
    try {
      const response = await this.client.get(`/properties/${propertyId}/salesHistory`);
      return response.data;
    } catch (error) {
      console.error('Domain API getSalesHistory error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch sales history: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get property price estimates
   * @param {string} propertyId - Domain property ID
   * @returns {Promise<Object>} Price estimates
   */
  async getPriceEstimates(propertyId) {
    try {
      const response = await this.client.get(`/properties/${propertyId}/priceEstimate`);
      return response.data;
    } catch (error) {
      console.error('Domain API getPriceEstimates error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch price estimates: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Search properties with advanced filters
   * @param {Object} searchCriteria - Search criteria
   * @returns {Promise<Object>} Search results
   */
  async searchProperties(searchCriteria) {
    try {
      const response = await this.client.post('/properties/_search', searchCriteria);
      return response.data;
    } catch (error) {
      console.error('Domain API searchProperties error:', error.response?.data || error.message);
      throw new Error(`Failed to search properties: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get suburb statistics
   * @param {string} suburb - Suburb name
   * @param {string} state - State abbreviation
   * @returns {Promise<Object>} Suburb statistics
   */
  async getSuburbStatistics(suburb, state) {
    try {
      const params = {
        suburb: suburb,
        state: state
      };

      const response = await this.client.get('/statistics', { params });
      return response.data;
    } catch (error) {
      console.error('Domain API getSuburbStatistics error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch suburb statistics: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Validate API connection
   * @returns {Promise<boolean>} Connection status
   */
  async validateConnection() {
    try {
      await this.client.get('/properties/_suggest?terms=test');
      return true;
    } catch (error) {
      console.error('Domain API connection validation failed:', error.message);
      return false;
    }
  }
}

module.exports = new DomainAPI();
