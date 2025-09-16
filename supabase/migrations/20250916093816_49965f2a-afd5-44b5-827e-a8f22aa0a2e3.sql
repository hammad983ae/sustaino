-- Fix RLS policies to allow anonymous authenticated users to access evidence tables

-- Update sales evidence policies
DROP POLICY IF EXISTS "Users can view their own sales evidence" ON public.sales_evidence;
DROP POLICY IF EXISTS "Users can create their own sales evidence" ON public.sales_evidence;
DROP POLICY IF EXISTS "Users can update their own sales evidence" ON public.sales_evidence;
DROP POLICY IF EXISTS "Users can delete their own sales evidence" ON public.sales_evidence;

CREATE POLICY "Authenticated users can view sales evidence" 
ON public.sales_evidence 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create sales evidence" 
ON public.sales_evidence 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can update their own sales evidence" 
ON public.sales_evidence 
FOR UPDATE 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can delete their own sales evidence" 
ON public.sales_evidence 
FOR DELETE 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Update rental evidence policies  
DROP POLICY IF EXISTS "Users can view their own rental evidence" ON public.rental_evidence;
DROP POLICY IF EXISTS "Users can create their own rental evidence" ON public.rental_evidence;
DROP POLICY IF EXISTS "Users can update their own rental evidence" ON public.rental_evidence;
DROP POLICY IF EXISTS "Users can delete their own rental evidence" ON public.rental_evidence;

CREATE POLICY "Authenticated users can view rental evidence" 
ON public.rental_evidence 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create rental evidence" 
ON public.rental_evidence 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can update their own rental evidence" 
ON public.rental_evidence 
FOR UPDATE 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can delete their own rental evidence" 
ON public.rental_evidence 
FOR DELETE 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Update properties policies too for consistency
DROP POLICY IF EXISTS "Users can view their own properties" ON public.properties;
DROP POLICY IF EXISTS "Users can create their own properties" ON public.properties;
DROP POLICY IF EXISTS "Users can insert their own properties" ON public.properties;
DROP POLICY IF EXISTS "Users can update their own properties" ON public.properties;
DROP POLICY IF EXISTS "Users can delete their own properties" ON public.properties;

CREATE POLICY "Authenticated users can view properties" 
ON public.properties 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create properties" 
ON public.properties 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can update their own properties" 
ON public.properties 
FOR UPDATE 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can delete their own properties" 
ON public.properties 
FOR DELETE 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);