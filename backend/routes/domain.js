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
    
    const propertyDetails = await domainAPI.getPropertyDetails(id);
    
    res.json({
      success: true,
      data: {
        property: propertyDetails
      }
    });
  } catch (error) {
    console.error('Domain property details error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch property details',
      error: error.message
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
    
    const { domainId, address, addressComponents, jobId } = req.body;
    
    // Check if property already exists
    let property = await Property.findOne({
      'address.fullAddress': address,
      user: req.user._id,
      isActive: true
    });
    
    if (property) {
      // Update existing property with Domain data
      property.domainId = domainId;
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
      
      await property.save();
    } else {
      // Create new property
      property = new Property({
        user: req.user._id,
        domainId: domainId,
        address: {
          streetNumber: addressComponents.streetNumber || '',
          streetName: addressComponents.streetName || '',
          streetType: addressComponents.streetType || '',
          suburb: addressComponents.suburb || '',
          city: addressComponents.suburb || '',
          state: addressComponents.state || '',
          postcode: addressComponents.postcode || addressComponents.postCode || '',
          country: 'Australia',
          fullAddress: address
        },
        details: {
          propertyType: 'residential', // Default, can be updated later
          landArea: { value: 0, unit: 'sqm' },
          buildingArea: { value: 0, unit: 'sqm' }
        }
      });
      
      await property.save();
    }
    
    // Populate the property for response
    await property.populate('user', 'firstName lastName email');
    
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
    res.status(500).json({
      success: false,
      message: 'Failed to save property',
      error: error.message
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
