-- Create residential sales evidence table
CREATE TABLE public.residential_sales_evidence (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  
  -- Property Details
  property_address TEXT NOT NULL,
  suburb TEXT,
  state TEXT,
  postcode TEXT,
  
  -- Sale Information
  sale_price NUMERIC NOT NULL,
  sale_date DATE NOT NULL,
  sale_status TEXT DEFAULT 'settled',
  
  -- Property Specifications
  land_area NUMERIC, -- in sqm
  living_area NUMERIC, -- in sqm  
  bedrooms INTEGER,
  bathrooms INTEGER,
  car_spaces INTEGER,
  
  -- Calculated Rates (per sqm)
  improved_land_rate NUMERIC,
  improvements_rate NUMERIC,
  
  -- Component Values & Rates
  land_value NUMERIC,
  land_rate NUMERIC,
  dwelling_value NUMERIC,
  dwelling_rate NUMERIC,
  car_accommodation_area NUMERIC,
  car_accommodation_rate NUMERIC,
  car_accommodation_value NUMERIC,
  outdoor_areas_count INTEGER DEFAULT 0,
  outdoor_areas_rate NUMERIC,
  outdoor_areas_value NUMERIC,
  shedding_count INTEGER DEFAULT 0,
  shedding_rate NUMERIC,
  shedding_value NUMERIC,
  pool_count INTEGER DEFAULT 0,
  pool_rate NUMERIC,
  pool_value NUMERIC,
  fpg_count INTEGER DEFAULT 0, -- Fences, Paths, Gardens
  fpg_rate NUMERIC,
  fpg_value NUMERIC,
  
  -- Calculated Totals
  total_calculated NUMERIC,
  total_rounded NUMERIC,
  
  -- Market Information
  comparable BOOLEAN DEFAULT true,
  local_sales_agent TEXT,
  zoning TEXT,
  market_movement_percentage NUMERIC, -- +/- % since sale date to valuation date
  adjusted_sale_price NUMERIC, -- Sale price adjusted for market movement
  
  -- Descriptions
  property_description TEXT,
  comparison_comments TEXT,
  
  -- Automation Fields
  domain_property_id TEXT, -- For linking to Domain API
  source_url TEXT,
  extraction_confidence NUMERIC DEFAULT 0, -- 0-100 confidence score
  
  -- Subject Property Comparison
  subject_property_id UUID, -- Link to properties table
  valuation_date DATE, -- Date for market movement calculation
  
  -- Metadata
  data_source TEXT DEFAULT 'manual', -- 'domain_api', 'web_scrape', 'manual'
  verification_status TEXT DEFAULT 'unverified',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.residential_sales_evidence ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their own residential sales evidence" 
ON public.residential_sales_evidence 
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_residential_sales_evidence_user_id ON public.residential_sales_evidence(user_id);
CREATE INDEX idx_residential_sales_evidence_suburb ON public.residential_sales_evidence(suburb);
CREATE INDEX idx_residential_sales_evidence_postcode ON public.residential_sales_evidence(postcode);
CREATE INDEX idx_residential_sales_evidence_sale_date ON public.residential_sales_evidence(sale_date);
CREATE INDEX idx_residential_sales_evidence_property_type ON public.residential_sales_evidence(bedrooms, bathrooms);
CREATE INDEX idx_residential_sales_evidence_subject_property ON public.residential_sales_evidence(subject_property_id);
CREATE INDEX idx_residential_sales_evidence_domain_id ON public.residential_sales_evidence(domain_property_id);

-- Create function to calculate market movement and adjusted price
CREATE OR REPLACE FUNCTION public.update_market_movement_residential()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate market movement percentage if we have both sale_date and valuation_date
  IF NEW.sale_date IS NOT NULL AND NEW.valuation_date IS NOT NULL THEN
    -- Simple market movement calculation (can be enhanced with real market data)
    -- Assumes 3.5% annual growth, adjusted for time difference
    NEW.market_movement_percentage := EXTRACT(DAYS FROM (NEW.valuation_date - NEW.sale_date)) * (3.5 / 365.0);
    
    -- Calculate adjusted sale price
    NEW.adjusted_sale_price := NEW.sale_price * (1 + (NEW.market_movement_percentage / 100.0));
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic market movement calculation
CREATE TRIGGER trigger_update_market_movement_residential
  BEFORE INSERT OR UPDATE ON public.residential_sales_evidence
  FOR EACH ROW
  EXECUTE FUNCTION public.update_market_movement_residential();

-- Create trigger for updated_at timestamp
CREATE TRIGGER trigger_residential_sales_evidence_updated_at
  BEFORE UPDATE ON public.residential_sales_evidence
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();