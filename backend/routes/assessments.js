/**
 * ============================================================================
 * PROPRIETARY ASSESSMENT ROUTES
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * Sustano Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const Assessment = require('../models/Assessment');
const Job = require('../models/Job');
const Property = require('../models/Property');
const { authenticateToken } = require('../middleware/auth');
const { errorHandler } = require('../middleware/errorHandler');

const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);

// Validation middleware
const validateAssessment = [
  body('jobId').isMongoId().withMessage('Valid job ID is required'),
  body('propertyId').isMongoId().withMessage('Valid property ID is required'),
  body('addressData.propertyAddress').notEmpty().withMessage('Property address is required'),
  body('reportConfig.propertyType').isIn([
    'residential', 'commercial', 'industrial', 'agricultural',
    'retail', 'office', 'warehouse', 'mixed-use'
  ]).withMessage('Invalid property type'),
  body('reportConfig.purpose').isIn([
    'purchase', 'sale', 'refinance', 'insurance', 'taxation',
    'development', 'investment', 'legal', 'other'
  ]).withMessage('Invalid purpose')
];

// @route   GET /api/assessments
// @desc    Get all assessments for the authenticated user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = { 
      user: req.user._id,
      isActive: true 
    };
    
    if (status) query.status = status;
    
    const assessments = await Assessment.find(query)
      .populate('user', 'firstName lastName email')
      .populate('job', 'title jobNumber status')
      .populate('property', 'address details')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Assessment.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        assessments,
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

// @route   GET /api/assessments/:id
// @desc    Get a specific assessment
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const assessment = await Assessment.findOne({
      _id: req.params.id,
      user: req.user._id,
      isActive: true
    })
    .populate('user', 'firstName lastName email')
    .populate('job', 'title jobNumber status')
    .populate('property', 'address details');
    
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }
    
    res.json({
      success: true,
      data: { assessment }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   POST /api/assessments
// @desc    Create a new assessment
// @access  Private
router.post('/', validateAssessment, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Assessment validation errors:', errors.array());
      console.log('Request body:', req.body);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const { jobId, propertyId, ...assessmentData } = req.body;
    
    // Verify job exists and belongs to user
    const job = await Job.findOne({
      _id: jobId,
      user: req.user._id,
      isActive: true
    });
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // Verify property exists and belongs to user
    const property = await Property.findOne({
      _id: propertyId,
      user: req.user._id,
      isActive: true
    });
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
    // Initialize steps array (9 steps for property assessment)
    const steps = [
      { stepId: '0', stepName: 'Property Address', completed: false, data: {} },
      { stepId: '1', stepName: 'Report Configuration', completed: false, data: {} },
      { stepId: '2', stepName: 'Planning Search', completed: false, data: {} },
      { stepId: '3', stepName: 'Search & Analysis', completed: false, data: {} },
      { stepId: '4', stepName: 'Property Photos', completed: false, data: {} },
      { stepId: '5', stepName: 'Accountancy & Financials', completed: false, data: {} },
      { stepId: '6', stepName: 'Sales & Leasing Recommendations', completed: false, data: {} },
      { stepId: '7', stepName: 'Intelligent Enhancement', completed: false, data: {} },
      { stepId: '8', stepName: 'Review & Generate', completed: false, data: {} }
    ];
    
    const assessment = new Assessment({
      ...assessmentData,
      user: req.user._id,
      job: jobId,
      property: propertyId,
      steps: steps,
      completedSteps: new Array(9).fill(false)
    });
    
    await assessment.save();
    
    // Update job with assessment reference
    job.assessment = assessment._id;
    await job.save();
    
    // Populate the assessment for response
    await assessment.populate([
      { path: 'user', select: 'firstName lastName email' },
      { path: 'job', select: 'title jobNumber status' },
      { path: 'property', select: 'address details' }
    ]);
    
    res.status(201).json({
      success: true,
      message: 'Assessment created successfully',
      data: { assessment }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   PUT /api/assessments/:id
// @desc    Update an assessment
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const assessment = await Assessment.findOne({
      _id: req.params.id,
      user: req.user._id,
      isActive: true
    });
    
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }
    
    // Update assessment fields
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined && key !== '_id') {
        assessment[key] = req.body[key];
      }
    });
    
    await assessment.save();
    
    // Populate the assessment for response
    await assessment.populate([
      { path: 'user', select: 'firstName lastName email' },
      { path: 'job', select: 'title jobNumber status' },
      { path: 'property', select: 'address details' }
    ]);
    
    res.json({
      success: true,
      message: 'Assessment updated successfully',
      data: { assessment }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   PUT /api/assessments/:id/step/:stepIndex
// @desc    Update a specific step in the assessment
// @access  Private
router.put('/:id/step/:stepIndex', async (req, res) => {
  try {
    const { stepIndex } = req.params;
    const { data, completed } = req.body;
    
    const assessment = await Assessment.findOne({
      _id: req.params.id,
      user: req.user._id,
      isActive: true
    });
    
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }
    
    const stepIdx = parseInt(stepIndex);
    
    if (stepIdx < 0 || stepIdx >= assessment.steps.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid step index'
      });
    }
    
    // Update step data
    if (data) {
      await assessment.updateStepData(stepIdx, data);
    }
    
    // Complete step if requested
    if (completed) {
      await assessment.completeStep(stepIdx, data);
    }
    
    // Populate the assessment for response
    await assessment.populate([
      { path: 'user', select: 'firstName lastName email' },
      { path: 'job', select: 'title jobNumber status' },
      { path: 'property', select: 'address details' }
    ]);
    
    res.json({
      success: true,
      message: 'Step updated successfully',
      data: { assessment }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   POST /api/assessments/:id/photos
// @desc    Add photo to assessment
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
    
    const assessment = await Assessment.findOne({
      _id: req.params.id,
      user: req.user._id,
      isActive: true
    });
    
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }
    
    await assessment.addPhoto({
      url,
      caption: caption || '',
      type: type || 'other'
    });
    
    res.json({
      success: true,
      message: 'Photo added successfully',
      data: { assessment }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   POST /api/assessments/:id/documents
// @desc    Add document to assessment
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
    
    const assessment = await Assessment.findOne({
      _id: req.params.id,
      user: req.user._id,
      isActive: true
    });
    
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }
    
    await assessment.addDocument({
      name,
      url,
      type: type || 'document',
      ocrText: ocrText || ''
    });
    
    res.json({
      success: true,
      message: 'Document added successfully',
      data: { assessment }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   DELETE /api/assessments/:id
// @desc    Delete an assessment (soft delete)
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const assessment = await Assessment.findOne({
      _id: req.params.id,
      user: req.user._id,
      isActive: true
    });
    
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }
    
    assessment.isActive = false;
    await assessment.save();
    
    res.json({
      success: true,
      message: 'Assessment deleted successfully'
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   GET /api/assessments/status/:status
// @desc    Get assessments by status
// @access  Private
router.get('/status/:status', async (req, res) => {
  try {
    const { status } = req.params;
    const assessments = await Assessment.getAssessmentsByStatus(status, req.user._id);
    
    res.json({
      success: true,
      data: { assessments }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

module.exports = router;
