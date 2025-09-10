-- Create profiles table for user information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT,
  company_name TEXT,
  phone TEXT,
  address TEXT,
  professional_license TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  suburb TEXT NOT NULL,
  state TEXT NOT NULL,
  postcode TEXT NOT NULL,
  country TEXT DEFAULT 'Australia',
  property_type TEXT NOT NULL CHECK (property_type IN ('residential', 'commercial', 'agricultural', 'specialised', 'development')),
  lot_number TEXT,
  plan_number TEXT,
  unit_number TEXT,
  street_number TEXT,
  street_name TEXT,
  street_type TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  land_area DECIMAL(10, 2),
  building_area DECIMAL(10, 2),
  year_built INTEGER,
  bedrooms INTEGER,
  bathrooms INTEGER,
  car_spaces INTEGER,
  zoning TEXT,
  council TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create valuations table
CREATE TABLE IF NOT EXISTS public.valuations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  valuation_type TEXT NOT NULL CHECK (valuation_type IN ('market', 'insurance', 'mortgage', 'family_law', 'taxation', 'development')),
  valuation_purpose TEXT NOT NULL,
  valuation_date DATE NOT NULL DEFAULT CURRENT_DATE,
  effective_date DATE NOT NULL DEFAULT CURRENT_DATE,
  market_value DECIMAL(15, 2),
  forced_sale_value DECIMAL(15, 2),
  rental_value DECIMAL(10, 2),
  yield_percentage DECIMAL(5, 2),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'reviewed')),
  methodology TEXT,
  assumptions TEXT,
  limiting_conditions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ESG assessments table
CREATE TABLE IF NOT EXISTS public.esg_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  valuation_id UUID REFERENCES public.valuations(id) ON DELETE CASCADE,
  environmental_score INTEGER CHECK (environmental_score >= 0 AND environmental_score <= 100),
  social_score INTEGER CHECK (social_score >= 0 AND social_score <= 100),
  governance_score INTEGER CHECK (governance_score >= 0 AND governance_score <= 100),
  overall_esg_score INTEGER CHECK (overall_esg_score >= 0 AND overall_esg_score <= 100),
  carbon_footprint DECIMAL(10, 2),
  energy_efficiency_rating TEXT,
  water_efficiency_rating TEXT,
  sustainability_features JSONB,
  climate_risk_assessment JSONB,
  esg_compliance_status TEXT DEFAULT 'pending' CHECK (esg_compliance_status IN ('pending', 'compliant', 'non_compliant', 'requires_improvement')),
  estimated_esg_premium DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reports table
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  valuation_id UUID REFERENCES public.valuations(id) ON DELETE CASCADE,
  esg_assessment_id UUID REFERENCES public.esg_assessments(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL CHECK (report_type IN ('valuation', 'esg', 'combined', 'portfolio')),
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'completed', 'archived')),
  pdf_file_path TEXT,
  sections_data JSONB,
  current_section TEXT,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create valuation jobs table for work management
CREATE TABLE IF NOT EXISTS public.valuation_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  job_number TEXT UNIQUE NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  instruction_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled', 'on_hold')),
  job_type TEXT NOT NULL CHECK (job_type IN ('valuation', 'esg_assessment', 'combined', 'portfolio_review')),
  estimated_hours DECIMAL(5, 2),
  actual_hours DECIMAL(5, 2),
  fee_quoted DECIMAL(10, 2),
  fee_charged DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sales evidence table
CREATE TABLE IF NOT EXISTS public.sales_evidence (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  valuation_id UUID REFERENCES public.valuations(id) ON DELETE CASCADE,
  comparable_address TEXT NOT NULL,
  sale_date DATE NOT NULL,
  sale_price DECIMAL(15, 2) NOT NULL,
  land_area DECIMAL(10, 2),
  building_area DECIMAL(10, 2),
  bedrooms INTEGER,
  bathrooms INTEGER,
  car_spaces INTEGER,
  property_type TEXT NOT NULL,
  adjustments JSONB,
  adjusted_price DECIMAL(15, 2),
  weight_percentage DECIMAL(5, 2),
  distance_km DECIMAL(5, 2),
  source TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rental evidence table
CREATE TABLE IF NOT EXISTS public.rental_evidence (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  valuation_id UUID REFERENCES public.valuations(id) ON DELETE CASCADE,
  comparable_address TEXT NOT NULL,
  lease_date DATE NOT NULL,
  rental_amount DECIMAL(10, 2) NOT NULL,
  rental_period TEXT NOT NULL CHECK (rental_period IN ('weekly', 'monthly', 'annually')),
  lease_term_months INTEGER,
  land_area DECIMAL(10, 2),
  building_area DECIMAL(10, 2),
  bedrooms INTEGER,
  bathrooms INTEGER,
  car_spaces INTEGER,
  property_type TEXT NOT NULL,
  adjustments JSONB,
  adjusted_rental DECIMAL(10, 2),
  weight_percentage DECIMAL(5, 2),
  distance_km DECIMAL(5, 2),
  source TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valuations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esg_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valuation_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_evidence ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own properties" ON public.properties FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own properties" ON public.properties FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own properties" ON public.properties FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own properties" ON public.properties FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own valuations" ON public.valuations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own valuations" ON public.valuations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own valuations" ON public.valuations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own valuations" ON public.valuations FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own ESG assessments" ON public.esg_assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own ESG assessments" ON public.esg_assessments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ESG assessments" ON public.esg_assessments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ESG assessments" ON public.esg_assessments FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own reports" ON public.reports FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own reports" ON public.reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reports" ON public.reports FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reports" ON public.reports FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own jobs" ON public.valuation_jobs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own jobs" ON public.valuation_jobs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own jobs" ON public.valuation_jobs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own jobs" ON public.valuation_jobs FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own sales evidence" ON public.sales_evidence FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own sales evidence" ON public.sales_evidence FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own sales evidence" ON public.sales_evidence FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own sales evidence" ON public.sales_evidence FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own rental evidence" ON public.rental_evidence FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own rental evidence" ON public.rental_evidence FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own rental evidence" ON public.rental_evidence FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own rental evidence" ON public.rental_evidence FOR DELETE USING (auth.uid() = user_id);

-- Create functions for automatic job number generation
CREATE OR REPLACE FUNCTION generate_job_number()
RETURNS TRIGGER AS $$
DECLARE
  next_number INTEGER;
  formatted_number TEXT;
BEGIN
  -- Get the next sequential number for this user
  SELECT COALESCE(
    (SELECT MAX(CAST(SUBSTRING(job_number FROM '(\d+)$') AS INTEGER)) + 1 
     FROM public.valuation_jobs 
     WHERE user_id = NEW.user_id), 
    1
  ) INTO next_number;
  
  -- Format as VAL-YYYY-NNNN
  formatted_number := 'VAL-' || EXTRACT(YEAR FROM CURRENT_DATE) || '-' || LPAD(next_number::TEXT, 4, '0');
  
  NEW.job_number := formatted_number;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic job number generation
CREATE TRIGGER generate_job_number_trigger
  BEFORE INSERT ON public.valuation_jobs
  FOR EACH ROW
  WHEN (NEW.job_number IS NULL)
  EXECUTE FUNCTION generate_job_number();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_valuations_updated_at BEFORE UPDATE ON public.valuations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_esg_assessments_updated_at BEFORE UPDATE ON public.esg_assessments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON public.reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_valuation_jobs_updated_at BEFORE UPDATE ON public.valuation_jobs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_properties_user_id ON public.properties(user_id);
CREATE INDEX idx_properties_property_type ON public.properties(property_type);
CREATE INDEX idx_valuations_user_id ON public.valuations(user_id);
CREATE INDEX idx_valuations_property_id ON public.valuations(property_id);
CREATE INDEX idx_valuations_status ON public.valuations(status);
CREATE INDEX idx_esg_assessments_user_id ON public.esg_assessments(user_id);
CREATE INDEX idx_esg_assessments_property_id ON public.esg_assessments(property_id);
CREATE INDEX idx_reports_user_id ON public.reports(user_id);
CREATE INDEX idx_reports_status ON public.reports(status);
CREATE INDEX idx_valuation_jobs_user_id ON public.valuation_jobs(user_id);
CREATE INDEX idx_valuation_jobs_status ON public.valuation_jobs(status);
CREATE INDEX idx_sales_evidence_user_id ON public.sales_evidence(user_id);
CREATE INDEX idx_rental_evidence_user_id ON public.rental_evidence(user_id);