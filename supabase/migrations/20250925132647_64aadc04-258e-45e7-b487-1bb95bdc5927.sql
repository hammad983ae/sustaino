-- Fix Function Search Path Security Issues
-- Update all functions to have secure search_path settings

-- Fix function search path vulnerabilities
ALTER FUNCTION public.update_property_assessments_updated_at() SET search_path TO 'public';
ALTER FUNCTION public.update_jobs_updated_at() SET search_path TO 'public';
ALTER FUNCTION public.update_auction_current_bid() SET search_path TO 'public';
ALTER FUNCTION public.create_user_profile() SET search_path TO 'public';
ALTER FUNCTION public.set_owner_id() SET search_path TO 'public';
ALTER FUNCTION public.calculate_adjusted_rental(base_rental numeric, review_mechanism text, review_percentage numeric, months_since_last_review integer, current_cpi_rate numeric) SET search_path TO 'public';
ALTER FUNCTION public.update_rental_adjustments() SET search_path TO 'public';
ALTER FUNCTION public.create_default_report_config(p_job_id text, p_user_id uuid) SET search_path TO 'public';
ALTER FUNCTION public.create_valuation_job(job_data jsonb) SET search_path TO 'public';
ALTER FUNCTION public.create_report(report_data jsonb) SET search_path TO 'public';
ALTER FUNCTION public.is_session_valid() SET search_path TO 'public';
ALTER FUNCTION public.update_updated_at_column() SET search_path TO 'public';
ALTER FUNCTION public.has_role(_user_id uuid, _role app_role) SET search_path TO 'public';
ALTER FUNCTION public.update_valuations_updated_at() SET search_path TO 'public';
ALTER FUNCTION public.get_construction_cost_index() SET search_path TO 'public';
ALTER FUNCTION public.get_cpi_index() SET search_path TO 'public';
ALTER FUNCTION public.trigger_monthly_cost_update() SET search_path TO 'public';
ALTER FUNCTION public.update_ownership_percentage() SET search_path TO 'public';
ALTER FUNCTION public.update_pool_totals() SET search_path TO 'public';
ALTER FUNCTION public.calculate_property_valuation(property_data jsonb, market_data jsonb, comparable_sales jsonb) SET search_path TO 'public';
ALTER FUNCTION public.calculate_esg_score(environmental_factors jsonb, social_factors jsonb, governance_factors jsonb) SET search_path TO 'public';
ALTER FUNCTION public.analyze_sales_evidence(subject_property jsonb, comparable_sales jsonb[]) SET search_path TO 'public';
ALTER FUNCTION public.upsert_property_from_address(address_text text, property_type_text text) SET search_path TO 'public';

-- Create secure policies that require authentication while preserving functionality
-- Update auction platforms policy to require authentication
DROP POLICY IF EXISTS "Anyone can view active auctions" ON public.auction_platforms;
CREATE POLICY "Authenticated users can view active auctions" 
ON public.auction_platforms 
FOR SELECT 
TO authenticated 
USING (auction_status = 'active');

-- Update auction bids policy to require authentication  
DROP POLICY IF EXISTS "Anyone can view bids on active auctions" ON public.auction_bids;
CREATE POLICY "Authenticated users can view auction bids" 
ON public.auction_bids 
FOR SELECT 
TO authenticated 
USING (EXISTS (
  SELECT 1 FROM auction_platforms 
  WHERE auction_platforms.id = auction_bids.auction_id 
  AND auction_platforms.auction_status = 'active'
));

-- Update investment properties policy to require authentication
DROP POLICY IF EXISTS "Investment properties are viewable by everyone" ON public.investment_properties;
CREATE POLICY "Authenticated users can view investment properties" 
ON public.investment_properties 
FOR SELECT 
TO authenticated 
USING (true);

-- Update investment pools policy to require authentication  
DROP POLICY IF EXISTS "Investment pools are viewable by everyone" ON public.investment_pools;
CREATE POLICY "Authenticated users can view investment pools" 
ON public.investment_pools 
FOR SELECT 
TO authenticated 
USING (true);

-- Update clients table to require authentication
DROP POLICY IF EXISTS "Users can view all clients" ON public.clients;
CREATE POLICY "Authenticated users can view clients" 
ON public.clients 
FOR SELECT 
TO authenticated 
USING (true);

-- Update market summaries to require authentication for viewing
DROP POLICY IF EXISTS "Authenticated users can view market summaries" ON public.market_summaries;
CREATE POLICY "Authenticated users can view market summaries" 
ON public.market_summaries 
FOR SELECT 
TO authenticated 
USING (true);

-- Update evidence files public access policy to be more restrictive
DROP POLICY IF EXISTS "Authenticated users can read public evidence" ON public.evidence_files;
CREATE POLICY "Authenticated users can read public evidence" 
ON public.evidence_files 
FOR SELECT 
TO authenticated 
USING (is_public = true);

-- Enable stronger password policies (this creates a more secure auth configuration)
-- Note: This is configured at the Supabase project level, not in SQL

-- Create a function to remove RP Data dependencies safely
CREATE OR REPLACE FUNCTION public.cleanup_rp_data_references()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Log the cleanup operation
  INSERT INTO public.system_logs (operation, details, created_at)
  VALUES ('rp_data_cleanup', 'Removing RP Data API references', NOW())
  ON CONFLICT DO NOTHING;
  
  -- Remove any RP Data specific API keys from evidence_files if they exist
  UPDATE public.evidence_files 
  SET extracted_data = extracted_data - 'rp_data_source' 
  WHERE extracted_data ? 'rp_data_source';
  
  -- Update any jobs that might reference RP Data
  UPDATE public.jobs 
  SET job_data = job_data - 'rp_data_config'
  WHERE job_data ? 'rp_data_config';
  
  RAISE NOTICE 'RP Data references cleaned up successfully';
END;
$$;

-- Create system_logs table if it doesn't exist for audit trail
CREATE TABLE IF NOT EXISTS public.system_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  operation TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id)
);

-- Enable RLS on system logs
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for system logs (admin only)
CREATE POLICY "Admin users can manage system logs" 
ON public.system_logs 
FOR ALL 
TO authenticated 
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Run the cleanup function
SELECT public.cleanup_rp_data_references();