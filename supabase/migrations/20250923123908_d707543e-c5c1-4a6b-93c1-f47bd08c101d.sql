-- Create comprehensive sales and leasing database structure

-- Sales evidence table (enhanced)
DROP TABLE IF EXISTS public.sales_evidence CASCADE;
CREATE TABLE public.sales_evidence (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  property_address TEXT NOT NULL,
  sale_date DATE,
  sale_price NUMERIC,
  property_type TEXT,
  bedrooms INTEGER,
  bathrooms INTEGER,
  car_spaces INTEGER,
  land_area NUMERIC,
  building_area NUMERIC,
  sale_method TEXT, -- auction, private treaty, etc
  vendor_type TEXT, -- owner occupier, investor, etc
  settlement_period INTEGER,
  conditions TEXT,
  agent_name TEXT,
  agent_commission NUMERIC,
  
  -- Location data
  suburb TEXT,
  state TEXT,
  postcode TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  
  -- Market context
  days_on_market INTEGER,
  listing_price NUMERIC,
  price_per_sqm NUMERIC,
  
  -- Data source tracking
  data_source TEXT NOT NULL, -- rpdata, corelogic, manual, domain, etc
  source_url TEXT,
  extraction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data_quality_score INTEGER DEFAULT 0,
  verification_status TEXT DEFAULT 'unverified',
  
  -- Additional metadata
  comparable_rating INTEGER, -- 1-5 rating for comparability
  adjustments JSONB, -- store adjustment calculations
  notes TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Leasing evidence table
CREATE TABLE public.leasing_evidence (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  property_address TEXT NOT NULL,
  lease_start_date DATE,
  lease_end_date DATE,
  rental_amount NUMERIC NOT NULL,
  rental_period TEXT DEFAULT 'weekly', -- weekly, monthly, annually
  bond_amount NUMERIC,
  property_type TEXT,
  bedrooms INTEGER,
  bathrooms INTEGER,
  car_spaces INTEGER,
  land_area NUMERIC,
  building_area NUMERIC,
  
  -- Location data
  suburb TEXT,
  state TEXT,
  postcode TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  
  -- Lease details
  lease_type TEXT, -- residential, commercial, retail
  tenant_type TEXT, -- family, single, corporate, etc
  furnished BOOLEAN DEFAULT false,
  pets_allowed BOOLEAN DEFAULT false,
  utilities_included JSONB DEFAULT '[]'::jsonb,
  
  -- Market context
  days_to_lease INTEGER,
  listing_rent NUMERIC,
  rent_per_sqm NUMERIC,
  yield_calculation NUMERIC,
  
  -- Data source tracking
  data_source TEXT NOT NULL,
  source_url TEXT,
  extraction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data_quality_score INTEGER DEFAULT 0,
  verification_status TEXT DEFAULT 'unverified',
  
  -- Additional metadata
  comparable_rating INTEGER,
  adjustments JSONB,
  notes TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Property market data (aggregated insights)
CREATE TABLE public.property_market_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  suburb TEXT NOT NULL,
  state TEXT NOT NULL,
  postcode TEXT,
  property_type TEXT NOT NULL,
  
  -- Sales metrics
  median_sale_price NUMERIC,
  average_sale_price NUMERIC,
  sale_price_growth_12m NUMERIC,
  total_sales_12m INTEGER,
  days_on_market_average INTEGER,
  
  -- Rental metrics
  median_rental NUMERIC,
  average_rental NUMERIC,
  rental_growth_12m NUMERIC,
  total_leases_12m INTEGER,
  average_yield NUMERIC,
  vacancy_rate NUMERIC,
  
  -- Market indicators
  supply_demand_ratio NUMERIC,
  market_strength TEXT, -- strong, moderate, weak
  price_trend TEXT, -- rising, stable, declining
  
  -- Data metadata
  data_source TEXT NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data_period_start DATE,
  data_period_end DATE,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  
  UNIQUE(suburb, state, property_type, data_source, data_period_start)
);

-- Data extraction jobs tracking
CREATE TABLE public.data_extraction_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  job_type TEXT NOT NULL, -- sales, leasing, market_data
  status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, completed, failed
  source_type TEXT NOT NULL, -- url, api, file
  source_identifier TEXT NOT NULL, -- URL or file path
  
  -- Progress tracking
  total_records_expected INTEGER,
  records_processed INTEGER DEFAULT 0,
  records_successful INTEGER DEFAULT 0,
  records_failed INTEGER DEFAULT 0,
  
  -- Error handling
  error_log JSONB DEFAULT '[]'::jsonb,
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,
  
  -- Results
  extracted_data JSONB,
  quality_metrics JSONB,
  
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.sales_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leasing_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_market_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_extraction_jobs ENABLE ROW LEVEL SECURITY;

-- Sales evidence policies
CREATE POLICY "Users can manage their own sales evidence"
ON public.sales_evidence
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Leasing evidence policies  
CREATE POLICY "Users can manage their own leasing evidence"
ON public.leasing_evidence
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Market data policies
CREATE POLICY "Users can view all market data"
ON public.property_market_data
FOR SELECT
USING (true);

CREATE POLICY "Users can manage their own market data"
ON public.property_market_data
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Extraction jobs policies
CREATE POLICY "Users can manage their own extraction jobs"
ON public.data_extraction_jobs
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE OR REPLACE TRIGGER update_sales_evidence_updated_at
    BEFORE UPDATE ON public.sales_evidence
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_leasing_evidence_updated_at
    BEFORE UPDATE ON public.leasing_evidence
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_property_market_data_updated_at
    BEFORE UPDATE ON public.property_market_data
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_data_extraction_jobs_updated_at
    BEFORE UPDATE ON public.data_extraction_jobs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for performance
CREATE INDEX idx_sales_evidence_location ON public.sales_evidence(suburb, state, postcode);
CREATE INDEX idx_sales_evidence_date ON public.sales_evidence(sale_date);
CREATE INDEX idx_sales_evidence_price ON public.sales_evidence(sale_price);
CREATE INDEX idx_sales_evidence_source ON public.sales_evidence(data_source);

CREATE INDEX idx_leasing_evidence_location ON public.leasing_evidence(suburb, state, postcode);
CREATE INDEX idx_leasing_evidence_date ON public.leasing_evidence(lease_start_date);
CREATE INDEX idx_leasing_evidence_rent ON public.leasing_evidence(rental_amount);
CREATE INDEX idx_leasing_evidence_source ON public.leasing_evidence(data_source);

CREATE INDEX idx_market_data_location ON public.property_market_data(suburb, state, property_type);
CREATE INDEX idx_market_data_updated ON public.property_market_data(last_updated);

CREATE INDEX idx_extraction_jobs_status ON public.data_extraction_jobs(status);
CREATE INDEX idx_extraction_jobs_type ON public.data_extraction_jobs(job_type);