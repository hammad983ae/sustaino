/**
 * ============================================================================
 * PROPRIETARY ASSESSMENT MODEL
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * Sustano Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */

const mongoose = require('mongoose');

const stepDataSchema = new mongoose.Schema({
  stepId: String,
  stepName: String,
  completed: { type: Boolean, default: false },
  data: mongoose.Schema.Types.Mixed,
  completedAt: Date,
  notes: String
}, { _id: false });

const addressDataSchema = new mongoose.Schema({
  propertyAddress: String,
  lotNumber: String,
  planNumber: String,
  unitNumber: String,
  streetNumber: String,
  streetName: String,
  streetType: String,
  suburb: String,
  state: String,
  postcode: String,
  country: { type: String, default: 'Australia' },
  coordinates: {
    latitude: Number,
    longitude: Number
  }
}, { _id: false });

const reportConfigSchema = new mongoose.Schema({
  reportType: {
    type: String,
    enum: ['full', 'desktop', 'drive-by', 'detailed', 'market-analysis', 'esg-assessment'],
    default: 'full'
  },
  propertyType: {
    type: String,
    enum: ['residential', 'commercial', 'industrial', 'agricultural', 'retail', 'office', 'warehouse', 'mixed-use'],
    required: true
  },
  purpose: {
    type: String,
    enum: ['purchase', 'sale', 'refinance', 'insurance', 'taxation', 'development', 'investment', 'legal', 'other'],
    required: true
  },
  clientName: String,
  clientEmail: String,
  clientPhone: String,
  instructions: String,
  specialRequirements: [String],
  includeSections: {
    executiveSummary: { type: Boolean, default: true },
    propertyDescription: { type: Boolean, default: true },
    marketAnalysis: { type: Boolean, default: true },
    valuationAnalysis: { type: Boolean, default: true },
    salesEvidence: { type: Boolean, default: true },
    riskAssessment: { type: Boolean, default: true },
    esgAssessment: { type: Boolean, default: false },
    recommendations: { type: Boolean, default: true },
    appendices: { type: Boolean, default: true }
  }
}, { _id: false });

const assessmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  assessmentNumber: {
    type: String,
    unique: true,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'in_progress', 'review', 'completed', 'cancelled'],
    default: 'draft'
  },
  currentStep: {
    type: Number,
    default: 0
  },
  completedSteps: [Boolean],
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  // Core assessment data
  addressData: {
    type: addressDataSchema,
    required: true
  },
  reportConfig: {
    type: reportConfigSchema,
    required: true
  },
  // Step-by-step data
  steps: [stepDataSchema],
  // Photos and documents
  photos: [{
    url: String,
    caption: String,
    type: { type: String, enum: ['exterior', 'interior', 'aerial', 'street', 'other'] },
    ocrText: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  documents: [{
    name: String,
    url: String,
    type: String,
    ocrText: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  // AI-generated content
  aiAnalysis: {
    propertyDescription: String,
    marketCommentary: String,
    valuationRationale: String,
    riskFactors: [String],
    recommendations: [String],
    generatedAt: Date
  },
  // Quality control
  qualityControl: {
    reviewed: { type: Boolean, default: false },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: Date,
    reviewNotes: String,
    approved: { type: Boolean, default: false },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvedAt: Date
  },
  // Metadata
  startedAt: { type: Date, default: Date.now },
  completedAt: Date,
  lastSaved: { type: Date, default: Date.now },
  version: { type: Number, default: 1 },
  tags: [String],
  notes: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
assessmentSchema.index({ user: 1 });
assessmentSchema.index({ job: 1 });
assessmentSchema.index({ property: 1 });
assessmentSchema.index({ assessmentNumber: 1 });
assessmentSchema.index({ status: 1 });
assessmentSchema.index({ createdAt: -1 });

// Pre-save middleware to generate assessment number
assessmentSchema.pre('save', function(next) {
  if (!this.assessmentNumber) {
    const year = new Date().getFullYear();
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    this.assessmentNumber = `ASS-${year}-${random}`;
  }
  
  // Update progress based on completed steps
  if (this.completedSteps && this.completedSteps.length > 0) {
    const completedCount = this.completedSteps.filter(step => step).length;
    this.progress = Math.round((completedCount / this.completedSteps.length) * 100);
  }
  
  // Update last saved timestamp
  this.lastSaved = new Date();
  
  next();
});

// Method to complete a step
assessmentSchema.methods.completeStep = function(stepIndex, stepData) {
  if (stepIndex >= 0 && stepIndex < this.completedSteps.length) {
    this.completedSteps[stepIndex] = true;
    
    // Update step data
    const step = this.steps.find(s => s.stepId === stepIndex.toString());
    if (step) {
      step.completed = true;
      step.data = stepData;
      step.completedAt = new Date();
    }
    
    // Update current step
    if (stepIndex === this.currentStep) {
      this.currentStep = Math.min(stepIndex + 1, this.completedSteps.length - 1);
    }
    
    // Check if assessment is complete
    if (this.completedSteps.every(step => step)) {
      this.status = 'completed';
      this.completedAt = new Date();
    }
  }
  
  return this.save();
};

// Method to update step data
assessmentSchema.methods.updateStepData = function(stepIndex, data) {
  if (stepIndex >= 0 && stepIndex < this.steps.length) {
    this.steps[stepIndex].data = { ...this.steps[stepIndex].data, ...data };
    this.lastSaved = new Date();
  }
  return this.save();
};

// Method to add photo
assessmentSchema.methods.addPhoto = function(photoData) {
  this.photos.push({
    ...photoData,
    uploadedAt: new Date()
  });
  return this.save();
};

// Method to add document
assessmentSchema.methods.addDocument = function(documentData) {
  this.documents.push({
    ...documentData,
    uploadedAt: new Date()
  });
  return this.save();
};

// Static method to get assessments by status
assessmentSchema.statics.getAssessmentsByStatus = function(status, userId = null) {
  const query = { status: status, isActive: true };
  if (userId) {
    query.user = userId;
  }
  
  return this.find(query)
    .populate('user', 'firstName lastName email')
    .populate('job', 'title jobNumber status')
    .populate('property', 'address details')
    .sort({ createdAt: -1 });
};

// Virtual for completion percentage
assessmentSchema.virtual('completionPercentage').get(function() {
  if (!this.completedSteps || this.completedSteps.length === 0) return 0;
  const completedCount = this.completedSteps.filter(step => step).length;
  return Math.round((completedCount / this.completedSteps.length) * 100);
});

// Virtual for is complete
assessmentSchema.virtual('isComplete').get(function() {
  return this.status === 'completed' || this.completionPercentage === 100;
});

module.exports = mongoose.model('Assessment', assessmentSchema);
