/**
 * ============================================================================
 * PROPRIETARY JOB ROUTES
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * Sustano Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const Job = require('../models/Job');
const Property = require('../models/Property');
const { authenticateToken } = require('../middleware/auth');
const { errorHandler } = require('../middleware/errorHandler');

const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);

// Validation middleware
const validateJob = [
  body('title').notEmpty().withMessage('Title is required'),
  body('jobType').isIn([
    'Property Valuation', 'Portfolio Assessment', 'Agricultural Valuation',
    'Commercial Assessment', 'Industrial Valuation', 'Development Feasibility',
    'Insurance Valuation', 'Mortgage Security Assessment', 'Rental Assessment',
    'Market Analysis', 'ESG Assessment'
  ]).withMessage('Invalid job type'),
  body('purpose').isIn([
    'purchase', 'sale', 'refinance', 'insurance', 'taxation',
    'development', 'investment', 'legal', 'other'
  ]).withMessage('Invalid purpose'),
  body('client.name').notEmpty().withMessage('Client name is required'),
  body('client.email').isEmail().withMessage('Valid client email is required'),
  body('propertyId').isMongoId().withMessage('Valid property ID is required')
];

// @route   GET /api/jobs
// @desc    Get all jobs for the authenticated user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { status, jobType, page = 1, limit = 10 } = req.query;
    
    const query = { 
      $or: [
        { user: req.user._id },
        { assignedTo: req.user._id },
        { 'team.user': req.user._id }
      ],
      isActive: true 
    };
    
    if (status) query.status = status;
    if (jobType) query.jobType = jobType;
    
    const jobs = await Job.find(query)
      .populate('user', 'firstName lastName email')
      .populate('property', 'address details')
      .populate('assignedTo', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Job.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        jobs,
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

// @route   GET /api/jobs/:id
// @desc    Get a specific job
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      $or: [
        { user: req.user._id },
        { assignedTo: req.user._id },
        { 'team.user': req.user._id }
      ],
      isActive: true
    })
    .populate('user', 'firstName lastName email')
    .populate('property', 'address details')
    .populate('assignedTo', 'firstName lastName email')
    .populate('team.user', 'firstName lastName email')
    .populate('assessment', 'assessmentNumber status progress');
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.json({
      success: true,
      data: { job }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   POST /api/jobs
// @desc    Create a new job
// @access  Private
router.post('/', validateJob, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const { propertyId, ...jobData } = req.body;
    
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
    
    const job = new Job({
      ...jobData,
      user: req.user._id,
      property: propertyId
    });
    
    await job.save();
    
    // Populate the job for response
    await job.populate([
      { path: 'user', select: 'firstName lastName email' },
      { path: 'property', select: 'address details' }
    ]);
    
    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: { job }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   PUT /api/jobs/:id
// @desc    Update a job
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user._id,
      isActive: true
    });
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // Update job fields
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        job[key] = req.body[key];
      }
    });
    
    await job.save();
    
    // Populate the job for response
    await job.populate([
      { path: 'user', select: 'firstName lastName email' },
      { path: 'property', select: 'address details' },
      { path: 'assignedTo', select: 'firstName lastName email' }
    ]);
    
    res.json({
      success: true,
      message: 'Job updated successfully',
      data: { job }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete a job (soft delete)
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user._id,
      isActive: true
    });
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    job.isActive = false;
    await job.save();
    
    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   PUT /api/jobs/:id/status
// @desc    Update job status
// @access  Private
router.put('/:id/status', async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }
    
    const job = await Job.findOne({
      _id: req.params.id,
      $or: [
        { user: req.user._id },
        { assignedTo: req.user._id },
        { 'team.user': req.user._id }
      ],
      isActive: true
    });
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    await job.updateStatus(status, notes, req.user._id);
    
    res.json({
      success: true,
      message: 'Job status updated successfully',
      data: { job }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   PUT /api/jobs/:id/assign
// @desc    Assign job to user
// @access  Private
router.put('/:id/assign', async (req, res) => {
  try {
    const { userId, role = 'valuer' } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }
    
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user._id,
      isActive: true
    });
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    await job.assignTo(userId, role);
    
    res.json({
      success: true,
      message: 'Job assigned successfully',
      data: { job }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   GET /api/jobs/overdue
// @desc    Get overdue jobs
// @access  Private
router.get('/overdue', async (req, res) => {
  try {
    const jobs = await Job.getOverdueJobs(req.user._id);
    
    res.json({
      success: true,
      data: { jobs }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// @route   GET /api/jobs/status/:status
// @desc    Get jobs by status
// @access  Private
router.get('/status/:status', async (req, res) => {
  try {
    const { status } = req.params;
    const jobs = await Job.getJobsByStatus(status, req.user._id);
    
    res.json({
      success: true,
      data: { jobs }
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

module.exports = router;
