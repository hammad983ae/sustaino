// Core Application Types
export interface User {
  id: string;
  email: string;
  display_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Session {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

// Property Related Types
export interface PropertyAddress {
  address_line_1: string;
  address_line_2?: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface PropertyDetails {
  id: string;
  user_id: string;
  property_type: PropertyType;
  bedrooms?: number;
  bathrooms?: number;
  car_spaces?: number;
  land_area?: number;
  building_area?: number;
  year_built?: number;
  created_at: string;
  updated_at: string;
}

export interface Property extends PropertyAddress, PropertyDetails {}

// Report Related Types
export interface Report {
  id: string;
  user_id: string;
  property_id: string;
  valuation_id?: string;
  esg_assessment_id?: string;
  title: string;
  report_type: ReportType;
  status: ReportStatus;
  sections_data?: Record<string, unknown>;
  progress: number;
  current_section?: string;
  pdf_file_path?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface ValuationJob {
  id: string;
  user_id: string;
  property_id: string;
  job_number: string;
  job_type: string;
  client_name: string;
  client_email?: string;
  client_phone?: string;
  status: JobStatus;
  priority: Priority;
  instruction_date: string;
  due_date?: string;
  estimated_hours?: number;
  actual_hours?: number;
  fee_quoted?: number;
  fee_charged?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Valuation {
  id: string;
  user_id: string;
  property_id: string;
  valuation_type: ValuationType;
  valuation_purpose: string;
  valuation_date: string;
  effective_date: string;
  market_value?: number;
  rental_value?: number;
  forced_sale_value?: number;
  yield_percentage?: number;
  methodology?: string;
  assumptions?: string;
  limiting_conditions?: string;
  status: ValuationStatus;
  created_at: string;
  updated_at: string;
}

// Evidence Types
export interface SalesComparable {
  id: string;
  user_id: string;
  property_id?: string;
  valuation_id?: string;
  comparable_address: string;
  property_type: PropertyType;
  sale_price: number;
  sale_date: string;
  bedrooms?: number;
  bathrooms?: number;
  car_spaces?: number;
  land_area?: number;
  building_area?: number;
  distance_km?: number;
  weight_percentage?: number;
  adjustments?: Record<string, number>;
  adjusted_price?: number;
  notes?: string;
  source?: string;
  created_at: string;
}

export interface RentalComparable {
  id: string;
  user_id: string;
  property_id?: string;
  valuation_id?: string;
  comparable_address: string;
  property_type: PropertyType;
  rental_amount: number;
  rental_period: RentalPeriod;
  lease_date: string;
  lease_term_months?: number;
  bedrooms?: number;
  bathrooms?: number;
  car_spaces?: number;
  land_area?: number;
  building_area?: number;
  distance_km?: number;
  weight_percentage?: number;
  adjustments?: Record<string, number>;
  adjusted_rental?: number;
  notes?: string;
  source?: string;
  created_at: string;
}

// ESG Types
export interface ESGAssessment {
  id: string;
  user_id: string;
  property_id: string;
  valuation_id?: string;
  environmental_score?: number;
  social_score?: number;
  governance_score?: number;
  overall_esg_score?: number;
  carbon_footprint?: number;
  energy_efficiency_rating?: string;
  water_efficiency_rating?: string;
  sustainability_features?: Record<string, unknown>;
  climate_risk_assessment?: Record<string, unknown>;
  estimated_esg_premium?: number;
  esg_compliance_status: ESGComplianceStatus;
  created_at: string;
  updated_at: string;
}

// Enum Types
export type PropertyType = 'residential' | 'commercial' | 'agricultural' | 'specialised';
export type ReportType = 'short-form' | 'long-form' | 'statutory' | 'insurance' | 'market-appraisal';
export type ReportStatus = 'draft' | 'in_progress' | 'completed' | 'reviewed' | 'archived';
export type ValuationType = 'market' | 'rental' | 'insurance' | 'mortgage' | 'statutory';
export type ValuationStatus = 'draft' | 'in_progress' | 'completed' | 'reviewed';
export type JobStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled' | 'on-hold' | 'overdue';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type JobPriority = 'low' | 'medium' | 'high';

// Job interface for Work Hub
export interface Job {
  id: string;
  propertyAddress: string;
  clientName: string;
  clientEmail: string;
  jobType: string;
  status: JobStatus;
  priority: JobPriority;
  dueDate: string;
  progress: number;
  estimatedHours: number;
  actualHours: number;
  feeQuoted: number;
  lastUpdated: string;
}
export type RentalPeriod = 'weekly' | 'monthly' | 'annually';
export type ESGComplianceStatus = 'pending' | 'compliant' | 'non_compliant' | 'needs_review';

// Form State Types
export interface FormFieldError {
  message: string;
  type: string;
}

export interface ValidationErrors {
  [key: string]: FormFieldError;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: Record<string, unknown>;
  };
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface FormComponentProps extends BaseComponentProps {
  onSubmit?: (data: unknown) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

// Store Types
export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export interface FormState {
  currentStep: number;
  propertyData: Partial<Property>;
  reportData: Record<string, unknown>;
  selectedSections: string[];
  enhancedAnalysisData: Record<string, unknown> | null;
}

// Additional API Types
export interface PropertySearchParams {
  address: string;
  propertyType?: string;
}

export interface PropertyAnalysisResult {
  property: Property;
  marketData?: Record<string, unknown>;
  comparables?: unknown[];
  riskAssessment?: Record<string, unknown>;
}

// Theme and UI Types
export type ThemeMode = 'light' | 'dark' | 'system';
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';