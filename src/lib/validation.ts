import { z } from 'zod';

// Property validation schemas
export const propertyAddressSchema = z.object({
  address: z.string().min(5, 'Address must be at least 5 characters'),
  suburb: z.string().optional(),
  state: z.string().optional(),
  postcode: z.string().regex(/^\d{4}$/, 'Postcode must be 4 digits').optional(),
});

export const propertyDetailsSchema = z.object({
  propertyType: z.enum(['residential', 'commercial', 'agricultural', 'development', 'specialised']),
  bedrooms: z.number().min(0).max(20).optional(),
  bathrooms: z.number().min(0).max(20).optional(),
  carSpaces: z.number().min(0).max(50).optional(),
  landArea: z.number().min(0).optional(),
  buildingArea: z.number().min(0).optional(),
  yearBuilt: z.number().min(1800).max(new Date().getFullYear() + 5).optional(),
});

// Sales evidence validation
export const salesEvidenceSchema = z.object({
  propertyAddress: z.string().min(5),
  salePrice: z.number().min(0),
  saleDate: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date'),
  propertyType: z.enum(['residential', 'commercial', 'agricultural', 'development', 'specialised']),
  landArea: z.number().min(0).optional(),
  buildingArea: z.number().min(0).optional(),
  bedrooms: z.number().min(0).max(20).optional(),
  bathrooms: z.number().min(0).max(20).optional(),
  carSpaces: z.number().min(0).max(50).optional(),
});

// Leasing evidence validation
export const leasingEvidenceSchema = z.object({
  propertyAddress: z.string().min(5),
  rentAmount: z.number().min(0),
  leaseStartDate: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date'),
  leaseEndDate: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date').optional(),
  leaseDurationMonths: z.number().min(1).max(240).optional(),
  propertyType: z.enum(['residential', 'commercial', 'agricultural', 'development', 'specialised']),
});

// User profile validation
export const userProfileSchema = z.object({
  displayName: z.string().min(2, 'Display name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  role: z.enum(['user', 'admin', 'partner_admin']).optional(),
});

// File upload validation
export const fileUploadSchema = z.object({
  fileName: z.string().min(1, 'File name is required'),
  fileSize: z.number().max(50 * 1024 * 1024, 'File size must be less than 50MB'),
  mimeType: z.string().refine(
    (type) => ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'text/plain'].includes(type),
    'Invalid file type'
  ),
});

// Report data validation
export const reportDataSchema = z.object({
  propertyAddress: z.string().min(5),
  reportType: z.string(),
  currentSection: z.number().min(0).max(10),
  reportProgress: z.number().min(0).max(100),
});

// Utility functions
export const validateRequired = (value: any, fieldName: string): boolean => {
  if (value === null || value === undefined || value === '') {
    throw new Error(`${fieldName} is required`);
  }
  return true;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const validateNumericRange = (value: number, min: number, max: number, fieldName: string): boolean => {
  if (value < min || value > max) {
    throw new Error(`${fieldName} must be between ${min} and ${max}`);
  }
  return true;
};

// Data consistency validators
export const validatePropertyConsistency = (propertyData: any): boolean => {
  // Validate that building area doesn't exceed land area for houses
  if (propertyData.propertyType === 'residential' && 
      propertyData.buildingArea && 
      propertyData.landArea && 
      propertyData.buildingArea > propertyData.landArea) {
    throw new Error('Building area cannot exceed land area');
  }

  // Validate reasonable bedroom to bathroom ratio
  if (propertyData.bedrooms && propertyData.bathrooms && 
      propertyData.bathrooms > propertyData.bedrooms + 2) {
    throw new Error('Unusual bathroom to bedroom ratio detected');
  }

  return true;
};

export const validateDateRange = (startDate: string, endDate: string): boolean => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start >= end) {
    throw new Error('End date must be after start date');
  }
  
  return true;
};