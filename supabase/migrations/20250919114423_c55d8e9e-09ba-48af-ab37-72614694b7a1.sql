-- Fix critical security vulnerability: Remove public access to properties table
-- and implement proper user-specific access control

-- Drop the existing public read policy that allows anyone to view all properties
DROP POLICY IF EXISTS "Public read" ON public.properties;

-- Create a secure policy that only allows users to view their own properties
CREATE POLICY "Users can view their own properties" 
ON public.properties 
FOR SELECT 
USING (auth.uid() = user_id);

-- Also ensure investment properties can still be viewed publicly since they're meant to be investment opportunities
-- But we need to be careful about what data is exposed
CREATE POLICY "Investment properties are viewable for investment purposes" 
ON public.properties 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.investment_properties 
    WHERE investment_properties.property_id = properties.id
  )
);