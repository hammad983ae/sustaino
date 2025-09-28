/**
 * ============================================================================
 * PROPRIETARY JOB MODEL
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * Sustano Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */

const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  address: {
    street: String,
    city: String,
    state: String,
    postcode: String,
    country: String
  }
}, { _id: false });

const jobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  jobNumber: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  jobType: {
    type: String,
    enum: [
      'Property Valuation',
      'Portfolio Assessment',
      'Agricultural Valuation',
      'Commercial Assessment',
      'Industrial Valuation',
      'Development Feasibility',
      'Insurance Valuation',
      'Mortgage Security Assessment',
      'Rental Assessment',
      'Market Analysis',
      'ESG Assessment'
    ],
    required: true
  },
  purpose: {
    type: String,
    enum: [
      'purchase',
      'sale',
      'refinance',
      'insurance',
      'taxation',
      'development',
      'investment',
      'legal',
      'other'
    ],
    required: true
  },
  client: {
    type: clientSchema,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'review', 'completed', 'cancelled', 'on_hold'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  dueDate: Date,
  estimatedValue: Number,
  actualValue: Number,
  fee: {
    amount: Number,
    currency: { type: String, default: 'AUD' },
    status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' }
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  team: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['valuer', 'reviewer', 'assistant', 'manager'] },
    assignedAt: { type: Date, default: Date.now }
  }],
  timeline: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    notes: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  requirements: {
    reportType: {
      type: String,
      enum: ['full', 'desktop', 'drive-by', 'detailed'],
      default: 'full'
    },
    includePhotos: { type: Boolean, default: true },
    includeDocuments: { type: Boolean, default: true },
    includeMarketAnalysis: { type: Boolean, default: true },
    includeESGAssessment: { type: Boolean, default: false },
    includeRiskAssessment: { type: Boolean, default: true },
    specialInstructions: String
  },
  assessment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment'
  },
  report: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report'
  },
  files: [{
    name: String,
    url: String,
    type: String,
    uploadedAt: { type: Date, default: Date.now },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  notes: String,
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
jobSchema.index({ user: 1 });
jobSchema.index({ property: 1 });
jobSchema.index({ jobNumber: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ jobType: 1 });
jobSchema.index({ dueDate: 1 });
jobSchema.index({ 'client.email': 1 });
jobSchema.index({ createdAt: -1 });

// Pre-save middleware to generate job number
jobSchema.pre('save', function(next) {
  if (!this.jobNumber) {
    const year = new Date().getFullYear();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    this.jobNumber = `VAL-${year}-${random}`;
  }
  next();
});

// Method to update status
jobSchema.methods.updateStatus = function(newStatus, notes, userId) {
  this.status = newStatus;
  this.timeline.push({
    status: newStatus,
    notes: notes,
    user: userId
  });
  return this.save();
};

// Method to assign to user
jobSchema.methods.assignTo = function(userId, role = 'valuer') {
  const existingAssignment = this.team.find(t => t.user.toString() === userId.toString());
  if (!existingAssignment) {
    this.team.push({
      user: userId,
      role: role
    });
  }
  this.assignedTo = userId;
  return this.save();
};

// Method to add file
jobSchema.methods.addFile = function(fileData, userId) {
  this.files.push({
    ...fileData,
    uploadedBy: userId
  });
  return this.save();
};

// Static method to get jobs by status
jobSchema.statics.getJobsByStatus = function(status, userId = null) {
  const query = { status: status, isActive: true };
  if (userId) {
    query.$or = [
      { user: userId },
      { assignedTo: userId },
      { 'team.user': userId }
    ];
  }
  return this.find(query)
    .populate('user', 'firstName lastName email')
    .populate('property', 'address details')
    .populate('assignedTo', 'firstName lastName email')
    .sort({ createdAt: -1 });
};

// Static method to get overdue jobs
jobSchema.statics.getOverdueJobs = function(userId = null) {
  const query = {
    dueDate: { $lt: new Date() },
    status: { $nin: ['completed', 'cancelled'] },
    isActive: true
  };
  
  if (userId) {
    query.$or = [
      { user: userId },
      { assignedTo: userId },
      { 'team.user': userId }
    ];
  }
  
  return this.find(query)
    .populate('user', 'firstName lastName email')
    .populate('property', 'address details')
    .sort({ dueDate: 1 });
};

// Virtual for days until due
jobSchema.virtual('daysUntilDue').get(function() {
  if (!this.dueDate) return null;
  const now = new Date();
  const diffTime = this.dueDate - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for is overdue
jobSchema.virtual('isOverdue').get(function() {
  return this.dueDate && this.dueDate < new Date() && !['completed', 'cancelled'].includes(this.status);
});

module.exports = mongoose.model('Job', jobSchema);
