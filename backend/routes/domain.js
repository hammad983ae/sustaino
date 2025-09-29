/**
 * ============================================================================
 * PROPRIETARY DOMAIN API ROUTES
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * Sustano Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const domainAPI = require('../utils/domainAPI');
const Property = require('../models/Property');
const { authenticateToken } = require('../middleware/auth');
const { errorHandler } = require('../middleware/errorHandler');

const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);

// @route   GET /api/domain/suggest
// @desc    Get property address suggestions from Domain.com.au
// @access  Private
router.get('/suggest', async (req, res) => {
  try {
    const { terms, pageSize = 20, channel = 'All' } = req.query;
    
    if (!terms || terms.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Search terms must be at least 3 characters long'
      });
    }
    
    const suggestions = await domainAPI.suggestProperties(terms, {
      pageSize: parseInt(pageSize),
      channel
    });
    
    res.json({
      success: true,
      data: {
        suggestions,
        count: suggestions.length
      }
    });
  } catch (error) {
    console.error('Domain suggest error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch property suggestions',
      error: error.message
    });
  }
});

// @route   GET /api/domain/property/:id
// @desc    Get detailed property information from Domain.com.au
// @access  Private
router.get('/property/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Property ID is required'
      });
    }
    
    console.log('Domain API: Attempting to fetch property details for ID:', id);
    
    const propertyDetails = await domainAPI.getPropertyDetails(id);
    
    console.log('Backend: Domain API property details response:', {
      id,
      hasPhotos: propertyDetails?.photos ? `${propertyDetails.photos.length} photos` : 'no photos',
      photos: propertyDetails?.photos
    });
    
    res.json({
      success: true,
      data: {
        property: propertyDetails
      }
    });
  } catch (error) {
    console.error('Domain property details error:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    
    // Return a more specific error response
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch property details';
    
    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: error.message,
      details: error.response?.data
    });
  }
});

// @route   POST /api/domain/property/save
// @desc    Save Domain.com.au property data to our database
// @access  Private
router.post('/property/save', [
  body('domainId').notEmpty().withMessage('Domain property ID is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('addressComponents').isObject().withMessage('Address components are required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const { domainId, address, addressComponents, jobId, propertyDetails } = req.body;
    
    // Extract the actual property data from the nested structure
    const actualPropertyData = propertyDetails?.property || propertyDetails?.data || propertyDetails;
    
    console.log('Backend: Saving property with data:', {
      domainId,
      address,
      addressComponents,
      jobId,
      propertyDetails: propertyDetails ? 'present' : 'null',
      photos: actualPropertyData?.photos ? `${actualPropertyData.photos.length} photos` : 'no photos'
    });
    
    console.log('Backend: Full propertyDetails object received:', JSON.stringify(propertyDetails, null, 2));
    
    console.log('Backend: actualPropertyData structure:', {
      hasData: !!actualPropertyData,
      hasPhotos: !!actualPropertyData?.photos,
      photosLength: actualPropertyData?.photos?.length || 0,
      keys: actualPropertyData ? Object.keys(actualPropertyData) : []
    });
    
    if (actualPropertyData?.photos) {
      console.log('Backend: Property photos from Domain API:', actualPropertyData.photos);
      console.log('Backend: First photo example:', actualPropertyData.photos[0]);
    } else {
      console.log('Backend: No photos in property data');
    }
    
    // Check if property already exists
    let property = await Property.findOne({
      'address.fullAddress': address,
      user: req.user._id,
      isActive: true
    });
    
    if (property) {
      // Update existing property with Domain data
      property.domainId = domainId;
      property.domainApiResponse = propertyDetails; // Save complete API response
      property.address = {
        streetNumber: addressComponents.streetNumber || '',
        streetName: addressComponents.streetName || '',
        streetType: addressComponents.streetType || '',
        suburb: addressComponents.suburb || '',
        city: addressComponents.suburb || '',
        state: addressComponents.state || '',
        postcode: addressComponents.postcode || addressComponents.postCode || '',
        country: 'Australia',
        fullAddress: address
      };
      
      // Update with detailed property data if available
      if (actualPropertyData) {
        property.details = {
          propertyType: actualPropertyData.propertyType || 'residential',
          landArea: {
            value: actualPropertyData.areaSize || 0,
            unit: 'sqm'
          },
          buildingArea: {
            value: actualPropertyData.internalArea || 0,
            unit: 'sqm'
          },
          yearBuilt: actualPropertyData.created ? new Date(actualPropertyData.created).getFullYear() : null,
          bedrooms: actualPropertyData.bedrooms || 0,
          bathrooms: actualPropertyData.bathrooms || 0,
          carSpaces: actualPropertyData.carSpaces || 0,
          zoning: actualPropertyData.zone || '',
          features: actualPropertyData.features || [],
          lotNumber: actualPropertyData.lotNumber || '',
          planNumber: actualPropertyData.planNumber || '',
          flatNumber: actualPropertyData.flatNumber || '',
          sectionNumber: actualPropertyData.sectionNumber || '',
          storeys: actualPropertyData.storeys || '',
          landUse: actualPropertyData.landUse || '',
          propertyCategory: actualPropertyData.propertyCategory || '',
          title: actualPropertyData.title || '',
          isResidential: actualPropertyData.isResidential || false
        };
        
        // Add coordinates if available
        if (actualPropertyData.addressCoordinate) {
          property.address.coordinates = {
            latitude: actualPropertyData.addressCoordinate.lat,
            longitude: actualPropertyData.addressCoordinate.lon
          };
        }
        
        // Add property photos if available
        if (actualPropertyData?.photos && Array.isArray(actualPropertyData.photos)) {
          console.log('Backend: Adding photos to existing property:', actualPropertyData.photos);
          property.photos = actualPropertyData.photos.map(photo => ({
            url: photo.fullUrl || photo.url || photo.imageUrl || '',
            caption: photo.caption || photo.description || '',
            type: photo.imageType || photo.type || 'exterior',
            uploadedAt: photo.date ? new Date(photo.date) : new Date()
          }));
          console.log('Backend: Mapped photos for existing property:', property.photos);
        } else {
          console.log('Backend: No photos to add to existing property');
        }
      }
      
      await property.save();
    } else {
      // Create new property
      property = new Property({
        user: req.user._id,
        domainId: domainId,
        domainApiResponse: propertyDetails, // Save complete API response
        address: {
          streetNumber: addressComponents.streetNumber || '',
          streetName: addressComponents.streetName || '',
          streetType: addressComponents.streetType || '',
          suburb: addressComponents.suburb || '',
          city: addressComponents.suburb || '',
          state: addressComponents.state || '',
          postcode: addressComponents.postcode || addressComponents.postCode || '',
          country: 'Australia',
          fullAddress: address,
          coordinates: actualPropertyData?.addressCoordinate ? {
            latitude: actualPropertyData.addressCoordinate.lat,
            longitude: actualPropertyData.addressCoordinate.lon
          } : undefined
        },
        details: {
          propertyType: actualPropertyData?.propertyType || 'residential',
          landArea: {
            value: actualPropertyData?.areaSize || 0,
            unit: 'sqm'
          },
          buildingArea: {
            value: actualPropertyData?.internalArea || 0,
            unit: 'sqm'
          },
          yearBuilt: actualPropertyData?.created ? new Date(actualPropertyData.created).getFullYear() : null,
          bedrooms: actualPropertyData?.bedrooms || 0,
          bathrooms: actualPropertyData?.bathrooms || 0,
          carSpaces: actualPropertyData?.carSpaces || 0,
          zoning: actualPropertyData?.zone || '',
          features: actualPropertyData?.features || [],
          lotNumber: actualPropertyData?.lotNumber || '',
          planNumber: actualPropertyData?.planNumber || '',
          flatNumber: actualPropertyData?.flatNumber || '',
          sectionNumber: actualPropertyData?.sectionNumber || '',
          storeys: actualPropertyData?.storeys || '',
          landUse: actualPropertyData?.landUse || '',
          propertyCategory: actualPropertyData?.propertyCategory || '',
          title: actualPropertyData?.title || '',
          isResidential: actualPropertyData?.isResidential || false
        },
        photos: actualPropertyData?.photos && Array.isArray(actualPropertyData.photos) ? 
          (() => {
            console.log('Backend: Adding photos to new property:', actualPropertyData.photos);
            const mappedPhotos = actualPropertyData.photos.map(photo => ({
              url: photo.fullUrl || photo.url || photo.imageUrl || '',
              caption: photo.caption || photo.description || '',
              type: photo.imageType || photo.type || 'exterior',
              uploadedAt: photo.date ? new Date(photo.date) : new Date()
            }));
            console.log('Backend: Mapped photos for new property:', mappedPhotos);
            return mappedPhotos;
          })() : (() => {
            console.log('Backend: No photos to add to new property');
            return [];
          })()
      });
      
      await property.save();
    }
    
    // Populate the property for response
    await property.populate('user', 'firstName lastName email');
    
    console.log('Backend: Property saved successfully:', property._id);
    console.log('Backend: Property address:', property.address);
    console.log('Backend: Property photos after save:', property.photos);
    
    res.status(201).json({
      success: true,
      message: 'Property saved successfully',
      data: {
        property,
        jobId: jobId || null
      }
    });
      } catch (error) {
        console.error('Domain property save error:', error);
        console.error('Domain property save error stack:', error.stack);
        res.status(500).json({
          success: false,
          message: 'Failed to save property',
          error: error.message,
          stack: error.stack
        });
      }
});

// @route   GET /api/domain/listings
// @desc    Get property listings from Domain.com.au
// @access  Private
router.get('/listings', async (req, res) => {
  try {
    const { 
      listingType = 'Sale', 
      propertyTypes = 'House,UnitApartment,Townhouse',
      localities = '',
      pageSize = 20,
      pageNumber = 1
    } = req.query;
    
    const filters = {
      listingType,
      propertyTypes: propertyTypes.split(','),
      localities: localities ? localities.split(',') : [],
      pageSize: parseInt(pageSize),
      pageNumber: parseInt(pageNumber)
    };
    
    const listings = await domainAPI.getListings(filters);
    
    res.json({
      success: true,
      data: {
        listings,
        pagination: {
          current: parseInt(pageNumber),
          pageSize: parseInt(pageSize),
          total: listings.totalCount || 0
        }
      }
    });
  } catch (error) {
    console.error('Domain listings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch listings',
      error: error.message
    });
  }
});

// @route   GET /api/domain/sales-history/:id
// @desc    Get property sales history from Domain.com.au
// @access  Private
router.get('/sales-history/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Property ID is required'
      });
    }
    
    const salesHistory = await domainAPI.getSalesHistory(id);
    
    res.json({
      success: true,
      data: {
        salesHistory
      }
    });
  } catch (error) {
    console.error('Domain sales history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sales history',
      error: error.message
    });
  }
});

// @route   GET /api/domain/price-estimates/:id
// @desc    Get property price estimates from Domain.com.au
// @access  Private
router.get('/price-estimates/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Property ID is required'
      });
    }
    
    const priceEstimates = await domainAPI.getPriceEstimates(id);
    
    res.json({
      success: true,
      data: {
        priceEstimates
      }
    });
  } catch (error) {
    console.error('Domain price estimates error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch price estimates',
      error: error.message
    });
  }
});

// @route   GET /api/domain/statistics
// @desc    Get suburb statistics from Domain.com.au
// @access  Private
router.get('/statistics', async (req, res) => {
  try {
    const { suburb, state } = req.query;
    
    if (!suburb || !state) {
      return res.status(400).json({
        success: false,
        message: 'Suburb and state are required'
      });
    }
    
    const statistics = await domainAPI.getSuburbStatistics(suburb, state);
    
    res.json({
      success: true,
      data: {
        statistics
      }
    });
  } catch (error) {
    console.error('Domain statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch suburb statistics',
      error: error.message
    });
  }
});

// @route   GET /api/domain/validate
// @desc    Validate Domain.com.au API connection
// @access  Private
router.get('/validate', async (req, res) => {
  try {
    const isValid = await domainAPI.validateConnection();
    
    res.json({
      success: true,
      data: {
        connected: isValid,
        message: isValid ? 'Domain API connection successful' : 'Domain API connection failed'
      }
    });
  } catch (error) {
    console.error('Domain validation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to validate Domain API connection',
      error: error.message
    });
  }
});

module.exports = router;
