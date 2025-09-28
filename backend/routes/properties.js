/**
 * ============================================================================
 * PROPRIETARY PROPERTY ROUTES
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * Sustano Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const Property = require('../models/Property');
const { authenticateToken } = require('../middleware/auth');
const { errorHandler } = require('../middleware/errorHandler');

const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);

// Validation middleware
const validateProperty = [
  body('address.streetNumber').notEmpty().withMessage('Street number is required'),
  body('address.streetName').notEmpty().withMessage('Street name is required'),
  body('address.suburb').notEmpty().withMessage('Suburb is required'),
  body('address.state').notEmpty().withMessage('State is required'),
  body('address.postcode').notEmpty().withMessage('Postcode is required'),
  body('details.propertyType').isIn([
    'residential', 'commercial', 'industrial', 'agricultural',
    'retail', 'office', 'warehouse', 'mixed-use'
  ]).withMessage('Invalid property type')
];

// @route   GET /api/properties
// @desc    Get all properties for the authenticated user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { propertyType, state, postcode, page = 1, limit = 10, search } = req.query;
    
    const query = { 
      user: req.user._id,
      isActive: true 
    };
    
    if (propertyType) query['details.propertyType'] = propertyType;
    if (state) query['address.state'] = state;
    if (postcode) query['address.postcode'] = postcode;
    
    let properties;
    
    if (search) {
      properties = await Property.searchProperties(search, {
        propertyType,
        state,
        postcode
      });
    } else {
      properties = await Property.find(query)
        .populate('user', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);
    }
    
    const total = await Property.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        properties,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   GET /api/properties/:id
// @desc    Get a specific property
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      user: req.user._id,
      isActive: true
    })
    .populate('user', 'firstName lastName email')
    .populate('assessments', 'assessmentNumber status progress');
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
    res.json({
      success: true,
      data: { property }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   POST /api/properties
// @desc    Create a new property
// @access  Private
router.post('/', validateProperty, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const property = new Property({
      ...req.body,
      user: req.user._id
    });
    
    await property.save();
    
    // Populate the property for response
    await property.populate('user', 'firstName lastName email');
    
    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: { property }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   PUT /api/properties/:id
// @desc    Update a property
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      user: req.user._id,
      isActive: true
    });
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
    // Update property fields
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined && key !== '_id') {
        property[key] = req.body[key];
      }
    });
    
    await property.save();
    
    // Populate the property for response
    await property.populate('user', 'firstName lastName email');
    
    res.json({
      success: true,
      message: 'Property updated successfully',
      data: { property }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   DELETE /api/properties/:id
// @desc    Delete a property (soft delete)
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      user: req.user._id,
      isActive: true
    });
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
    property.isActive = false;
    await property.save();
    
    res.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   GET /api/properties/:id/nearby
// @desc    Get nearby properties
// @access  Private
router.get('/:id/nearby', async (req, res) => {
  try {
    const { radius = 5 } = req.query;
    
    const property = await Property.findOne({
      _id: req.params.id,
      user: req.user._id,
      isActive: true
    });
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
    const nearbyProperties = await property.getNearbyProperties(parseInt(radius));
    
    res.json({
      success: true,
      data: { nearbyProperties }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   POST /api/properties/:id/photos
// @desc    Add photo to property
// @access  Private
router.post('/:id/photos', async (req, res) => {
  try {
    const { url, caption, type } = req.body;
    
    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'Photo URL is required'
      });
    }
    
    const property = await Property.findOne({
      _id: req.params.id,
      user: req.user._id,
      isActive: true
    });
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
    property.photos.push({
      url,
      caption: caption || '',
      type: type || 'other',
      uploadedAt: new Date()
    });
    
    await property.save();
    
    res.json({
      success: true,
      message: 'Photo added successfully',
      data: { property }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   POST /api/properties/:id/documents
// @desc    Add document to property
// @access  Private
router.post('/:id/documents', async (req, res) => {
  try {
    const { name, url, type, ocrText } = req.body;
    
    if (!name || !url) {
      return res.status(400).json({
        success: false,
        message: 'Document name and URL are required'
      });
    }
    
    const property = await Property.findOne({
      _id: req.params.id,
      user: req.user._id,
      isActive: true
    });
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
    property.documents.push({
      name,
      url,
      type: type || 'document',
      ocrText: ocrText || '',
      uploadedAt: new Date()
    });
    
    await property.save();
    
    res.json({
      success: true,
      message: 'Document added successfully',
      data: { property }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   GET /api/properties/search
// @desc    Search properties
// @access  Private
router.get('/search', async (req, res) => {
  try {
    const { q, propertyType, state, postcode } = req.query;
    
    const properties = await Property.searchProperties(q, {
      propertyType,
      state,
      postcode
    });
    
    res.json({
      success: true,
      data: { properties }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

module.exports = router;
