import { z } from 'zod';

// Common validation schemas
export const addressSchema = z.object({
  address_line_1: z.string().min(1, 'Address is required'),
  address_line_2: z.string().optional(),
  suburb: z.string().min(1, 'Suburb is required'),
  state: z.string().min(1, 'State is required'),
  postcode: z.string().regex(/^\d{4}$/, 'Invalid postcode'),
  country: z.string().default('Australia'),
});

export const propertyDetailsSchema = z.object({
  property_type: z.enum(['residential', 'commercial', 'agricultural', 'specialised']),
  bedrooms: z.number().int().positive().optional(),
  bathrooms: z.number().int().positive().optional(),
  car_spaces: z.number().int().min(0).optional(),
  land_area: z.number().positive().optional(),
  building_area: z.number().positive().optional(),
  year_built: z.number().int().min(1800).max(new Date().getFullYear()).optional(),
});

export const rentalComparableSchema = z.object({
  id: z.string(),
  comparable_address: z.string().min(1, 'Address is required'),
  rental_amount: z.number().positive('Rental amount must be positive'),
  rental_period: z.enum(['weekly', 'monthly', 'annually']),
  lease_date: z.string().min(1, 'Lease date is required'),
  lease_term_months: z.number().int().positive().optional(),
  property_type: z.string(),
  bedrooms: z.number().int().positive().optional(),
  bathrooms: z.number().int().positive().optional(),
  car_spaces: z.number().int().min(0).optional(),
  land_area: z.number().positive().optional(),
  building_area: z.number().positive().optional(),
  distance_km: z.number().min(0).optional(),
  weight_percentage: z.number().min(0).max(100).optional(),
  adjustments: z.record(z.string(), z.number()).optional(),
  adjusted_rental: z.number().positive().optional(),
  notes: z.string().optional(),
  source: z.string().optional(),
});

export const salesComparableSchema = z.object({
  id: z.string(),
  comparable_address: z.string().min(1, 'Address is required'),
  sale_price: z.number().positive('Sale price must be positive'),
  sale_date: z.string().min(1, 'Sale date is required'),
  property_type: z.string(),
  bedrooms: z.number().int().positive().optional(),
  bathrooms: z.number().int().positive().optional(),
  car_spaces: z.number().int().min(0).optional(),
  land_area: z.number().positive().optional(),
  building_area: z.number().positive().optional(),
  distance_km: z.number().min(0).optional(),
  weight_percentage: z.number().min(0).max(100).optional(),
  adjustments: z.record(z.string(), z.number()).optional(),
  adjusted_price: z.number().positive().optional(),
  notes: z.string().optional(),
  source: z.string().optional(),
});

export const leasingEvidenceSchema = z.object({
  id: z.string(),
  property_type: z.enum(['residential', 'commercial', 'agricultural', 'specialised']),
  comparables: z.array(rentalComparableSchema),
  market_analysis: z.string().optional(),
  conclusions: z.string().optional(),
});

export const salesEvidenceSchema = z.object({
  id: z.string(),
  property_type: z.enum(['residential', 'commercial', 'agricultural', 'specialised']),
  comparables: z.array(salesComparableSchema),
  market_analysis: z.string().optional(),
  conclusions: z.string().optional(),
});

export const valuationMethodSchema = z.object({
  method: z.enum(['direct_comparison', 'income_approach', 'cost_approach', 'residual', 'profits']),
  primary: z.boolean(),
  land_area: z.number().positive().optional(),
  land_rate_per_sqm: z.number().positive().optional(),
  land_value: z.number().positive().optional(),
  improvement_value: z.number().positive().optional(),
  total_value: z.number().positive().optional(),
  annual_rental: z.number().positive().optional(),
  yield_percentage: z.number().min(0).max(100).optional(),
  capitalised_value: z.number().positive().optional(),
  rationale: z.string().optional(),
});

export const valuationAnalysisSchema = z.object({
  id: z.string(),
  property_type: z.enum(['residential', 'commercial', 'agricultural', 'specialised']),
  methods: z.array(valuationMethodSchema),
  market_value: z.number().positive('Market value is required'),
  primary_method: z.string(),
  adjustments: z.object({
    location: z.number().optional(),
    condition: z.number().optional(),
    size: z.number().optional(),
    age_quality: z.number().optional(),
  }).optional(),
  final_rationale: z.string().optional(),
});

// Property type specific options
export const propertyTypeOptions = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'agricultural', label: 'Agricultural' },
  { value: 'specialised', label: 'Specialised' },
];

export const rentalPeriodOptions = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'annually', label: 'Annually' },
];

export const valuationMethodOptions = [
  { value: 'direct_comparison', label: 'Direct Comparison' },
  { value: 'income_approach', label: 'Income Approach' },
  { value: 'cost_approach', label: 'Cost Approach' },
  { value: 'residual', label: 'Residual Method' },
  { value: 'profits', label: 'Profits Method' },
];

export const stateOptions = [
  { value: 'NSW', label: 'New South Wales' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'SA', label: 'South Australia' },
  { value: 'WA', label: 'Western Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'NT', label: 'Northern Territory' },
  { value: 'ACT', label: 'Australian Capital Territory' },
];

// Utility type exports
export type AddressData = z.infer<typeof addressSchema>;
export type PropertyDetails = z.infer<typeof propertyDetailsSchema>;
export type RentalComparable = z.infer<typeof rentalComparableSchema>;
export type SalesComparable = z.infer<typeof salesComparableSchema>;
export type LeasingEvidence = z.infer<typeof leasingEvidenceSchema>;
export type SalesEvidence = z.infer<typeof salesEvidenceSchema>;
export type ValuationMethod = z.infer<typeof valuationMethodSchema>;
export type ValuationAnalysis = z.infer<typeof valuationAnalysisSchema>;