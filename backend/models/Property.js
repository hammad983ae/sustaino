/**
 * ============================================================================
 * PROPRIETARY PROPERTY MODEL
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * Sustano Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */

const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  streetNumber: String,
  streetName: String,
  streetType: String,
  suburb: String,
  city: String,
  state: String,
  postcode: String,
  country: { type: String, default: 'Australia' },
  fullAddress: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  }
}, { _id: false });

const propertyDetailsSchema = new mongoose.Schema({
  propertyType: {
    type: String,
    enum: ['residential', 'commercial', 'industrial', 'agricultural', 'retail', 'office', 'warehouse', 'mixed-use'],
    required: true
  },
  landArea: {
    value: Number,
    unit: { type: String, enum: ['sqm', 'hectares', 'acres'], default: 'sqm' }
  },
  buildingArea: {
    value: Number,
    unit: { type: String, enum: ['sqm', 'sqft'], default: 'sqm' }
  },
  yearBuilt: Number,
  zoning: String,
  currentUse: String,
  titleType: {
    type: String,
    enum: ['freehold', 'leasehold', 'strata', 'community'],
    default: 'freehold'
  },
  bedrooms: Number,
  bathrooms: Number,
  carSpaces: Number,
  features: [String],
  condition: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor', 'very-poor']
  },
  renovations: [{
    year: Number,
    description: String,
    cost: Number
  }]
}, { _id: false });

const propertySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  domainId: {
    type: String,
    unique: true,
    sparse: true // Allows multiple null values
  },
  domainApiResponse: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  address: {
    type: addressSchema,
    required: true
  },
  details: {
    type: propertyDetailsSchema,
    required: true
  },
  ownership: {
    ownerName: String,
    ownerType: { type: String, enum: ['individual', 'company', 'trust', 'partnership'] },
    ownershipPercentage: Number,
    purchaseDate: Date,
    purchasePrice: Number
  },
  planning: {
    zoning: String,
    overlays: [String],
    restrictions: [String],
    developmentPotential: String,
    planningPermits: [{
      type: String,
      status: String,
      date: Date,
      description: String
    }]
  },
  market: {
    estimatedValue: Number,
    lastValuation: Date,
    marketTrend: {
      type: String,
      enum: ['rising', 'stable', 'declining']
    },
    comparableSales: [{
      address: String,
      saleDate: Date,
      salePrice: Number,
      landArea: Number,
      buildingArea: Number,
      distance: Number
    }]
  },
  photos: [{
    url: String,
    caption: String,
    type: { type: String, enum: ['exterior', 'interior', 'aerial', 'street', 'other'] },
    uploadedAt: { type: Date, default: Date.now }
  }],
  documents: [{
    name: String,
    url: String,
    type: String,
    uploadedAt: { type: Date, default: Date.now },
    ocrText: String
  }],
  assessments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [String],
  notes: String
}, {
  timestamps: true
});

// Indexes
propertySchema.index({ user: 1 });
propertySchema.index({ domainId: 1 });
propertySchema.index({ 'address.postcode': 1 });
propertySchema.index({ 'address.state': 1 });
propertySchema.index({ 'details.propertyType': 1 });
propertySchema.index({ 'address.coordinates.latitude': 1, 'address.coordinates.longitude': 1 });
propertySchema.index({ createdAt: -1 });

// Virtual for full address
propertySchema.virtual('fullAddress').get(function() {
  const addr = this.address;
  return `${addr.streetNumber || ''} ${addr.streetName || ''} ${addr.streetType || ''}, ${addr.suburb || ''}, ${addr.state || ''} ${addr.postcode || ''}`.trim();
});

// Method to get nearby properties
propertySchema.methods.getNearbyProperties = function(radiusKm = 5) {
  if (!this.address.coordinates.latitude || !this.address.coordinates.longitude) {
    return [];
  }
  
  const lat = this.address.coordinates.latitude;
  const lng = this.address.coordinates.longitude;
  const radius = radiusKm / 111.32; // Rough conversion to degrees
  
  return this.constructor.find({
    _id: { $ne: this._id },
    'address.coordinates.latitude': {
      $gte: lat - radius,
      $lte: lat + radius
    },
    'address.coordinates.longitude': {
      $gte: lng - radius,
      $lte: lng + radius
    }
  });
};

// Static method to search properties
propertySchema.statics.searchProperties = function(query, filters = {}) {
  const searchQuery = { isActive: true };
  
  if (query) {
    searchQuery.$or = [
      { 'address.fullAddress': { $regex: query, $options: 'i' } },
      { 'address.suburb': { $regex: query, $options: 'i' } },
      { 'address.streetName': { $regex: query, $options: 'i' } }
    ];
  }
  
  if (filters.propertyType) {
    searchQuery['details.propertyType'] = filters.propertyType;
  }
  
  if (filters.state) {
    searchQuery['address.state'] = filters.state;
  }
  
  if (filters.postcode) {
    searchQuery['address.postcode'] = filters.postcode;
  }
  
  return this.find(searchQuery).populate('user', 'firstName lastName email');
};

module.exports = mongoose.model('Property', propertySchema);
