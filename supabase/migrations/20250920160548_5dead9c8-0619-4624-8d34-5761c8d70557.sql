-- Fix security issue: Restrict investment_returns access to authenticated users only
-- This replaces the overly permissive policy that allowed public access to sensitive financial data

-- Drop the existing public read policy
DROP POLICY IF EXISTS "Investment returns are viewable by everyone" ON public.investment_returns;

-- Create a new policy that requires authentication and limits access to relevant users
CREATE POLICY "Authenticated users can view relevant investment returns" 
ON public.investment_returns 
FOR SELECT 
TO authenticated
USING (
  -- Property owners can see returns for their properties
  EXISTS (
    SELECT 1 
    FROM public.investment_properties 
    WHERE investment_properties.id = investment_returns.investment_property_id 
      AND investment_properties.user_id = auth.uid()
  ) 
  OR 
  -- Investors can see returns for pools they've invested in
  EXISTS (
    SELECT 1 
    FROM public.pool_investments 
    WHERE pool_investments.pool_id = investment_returns.pool_id 
      AND pool_investments.investor_id = auth.uid()
  )
);