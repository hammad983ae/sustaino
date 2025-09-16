-- Fix RLS policies for sales_evidence table
DROP POLICY IF EXISTS "Owner insert" ON public.sales_evidence;

-- Create proper INSERT policy that allows authenticated users to insert their own data
CREATE POLICY "Users can insert their own sales evidence" 
ON public.sales_evidence 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Also fix the rental_evidence table with the same issue
DROP POLICY IF EXISTS "Owner insert" ON public.rental_evidence;

CREATE POLICY "Users can insert their own rental evidence" 
ON public.rental_evidence 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);