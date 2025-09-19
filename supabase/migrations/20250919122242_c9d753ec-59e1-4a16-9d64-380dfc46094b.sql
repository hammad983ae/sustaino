-- Fix critical security vulnerability: Remove public access to pool_investments table
-- and implement proper access control for investor financial data

-- Drop the existing public read policy that allows anyone to view all investments
DROP POLICY IF EXISTS "Users can view all pool investments" ON public.pool_investments;

-- Create a secure policy that only allows investors to view their own investments
CREATE POLICY "Investors can view their own investments" 
ON public.pool_investments 
FOR SELECT 
USING (auth.uid() = investor_id);

-- Create a policy that allows property owners to view investments in their properties
CREATE POLICY "Property owners can view investments in their properties" 
ON public.pool_investments 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.investment_properties 
    WHERE investment_properties.id = pool_investments.investment_property_id 
    AND investment_properties.user_id = auth.uid()
  )
);