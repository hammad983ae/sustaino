-- Security hardening migration to address critical security issues
-- This addresses the four main security errors without affecting UI functionality

-- 1. Fix Business Financial Data Exposure - Strengthen commission_transactions policies
DROP POLICY IF EXISTS "Aggregators can manage commission transactions" ON public.commission_transactions;
DROP POLICY IF EXISTS "Users can view their commission transactions" ON public.commission_transactions;

-- Create more restrictive policies for commission transactions
CREATE POLICY "Authenticated users can view own commission transactions" 
ON public.commission_transactions 
FOR SELECT 
TO authenticated 
USING (auth.uid() = aggregator_id OR auth.uid() = representative_id);

CREATE POLICY "Authenticated aggregators can manage commission transactions" 
ON public.commission_transactions 
FOR ALL 
TO authenticated 
USING (auth.uid() = aggregator_id)
WITH CHECK (auth.uid() = aggregator_id);

-- 2. Fix Auction Platform Revenue Data Exposure
DROP POLICY IF EXISTS "Authenticated users can view active auctions" ON public.auction_platforms;

-- Create authenticated-only policy for auction platforms
CREATE POLICY "Authenticated users can view auctions" 
ON public.auction_platforms 
FOR SELECT 
TO authenticated 
USING (auction_status = 'active');

-- 3. Fix Customer Personal Information Security - Strengthen user profiles
-- Ensure user_profiles table has proper RLS policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.user_profiles;

-- Create secure user_profiles policies
CREATE POLICY "Authenticated users can view own profile only" 
ON public.user_profiles 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update own profile only" 
ON public.user_profiles 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert own profile only" 
ON public.user_profiles 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- 4. Fix Proprietary Market Intelligence Exposure - Secure sensitive business tables
-- Strengthen aggregator_representatives table security
DROP POLICY IF EXISTS "Aggregator can view their representatives" ON public.aggregator_representatives;
DROP POLICY IF EXISTS "Aggregator can manage their representatives" ON public.aggregator_representatives;

CREATE POLICY "Authenticated aggregators can view own representatives" 
ON public.aggregator_representatives 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated aggregators can manage own representatives" 
ON public.aggregator_representatives 
FOR ALL 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Secure financial data tables
-- Financial metrics should only be accessible to authenticated users who own the data
DROP POLICY IF EXISTS "Users can view their own financial metrics" ON public.financial_metrics;
DROP POLICY IF EXISTS "Users can create their own financial metrics" ON public.financial_metrics;
DROP POLICY IF EXISTS "Users can update their own financial metrics" ON public.financial_metrics;
DROP POLICY IF EXISTS "Users can delete their own financial metrics" ON public.financial_metrics;

CREATE POLICY "Authenticated users can view own financial metrics" 
ON public.financial_metrics 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can manage own financial metrics" 
ON public.financial_metrics 
FOR ALL 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Secure investment data
-- Investment properties should have proper access controls
DROP POLICY IF EXISTS "Authenticated users can view investment properties" ON public.investment_properties;

CREATE POLICY "Authenticated users can view public investment properties" 
ON public.investment_properties 
FOR SELECT 
TO authenticated 
USING (investment_status = 'active');

-- Secure valuation jobs client data
DROP POLICY IF EXISTS "Users can view their own jobs" ON public.valuation_jobs;
DROP POLICY IF EXISTS "Users can view jobs they are allowed to access" ON public.valuation_jobs;

CREATE POLICY "Authenticated users can view own valuation jobs" 
ON public.valuation_jobs 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Secure API rate limits to prevent data leakage
DROP POLICY IF EXISTS "Users can view their own rate limits" ON public.api_rate_limits;

CREATE POLICY "Authenticated users can view own rate limits" 
ON public.api_rate_limits 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Remove any anonymous access to sensitive tables
-- Market summaries should be admin-only
DROP POLICY IF EXISTS "Admins can manage market summaries" ON public.market_summaries;
DROP POLICY IF EXISTS "Authenticated users can view market summaries" ON public.market_summaries;

CREATE POLICY "Authenticated admin users only can manage market summaries" 
ON public.market_summaries 
FOR ALL 
TO authenticated 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Secure property market data
CREATE POLICY "Authenticated users can view property market data" 
ON public.property_market_data 
FOR SELECT 
TO authenticated 
USING (true);

-- Lock down search path to prevent schema injection (this affects database-wide, not per-table)
-- Note: This will be applied at the database level