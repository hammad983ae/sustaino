-- Fix RLS policies for esg_assessments table
-- The issue is that the policies are checking user_id = auth.uid() but the table might be missing user_id values

-- First, let's create an INSERT policy that allows authenticated users
DROP POLICY IF EXISTS "Users can create their own ESG assessments" ON public.esg_assessments;
CREATE POLICY "Users can create their own ESG assessments" ON public.esg_assessments
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Update the SELECT policy to be more permissive for testing
DROP POLICY IF EXISTS "Users can view their own ESG assessments" ON public.esg_assessments;
CREATE POLICY "Users can view their own ESG assessments" ON public.esg_assessments
FOR SELECT USING (auth.uid() = user_id);

-- Also fix any null user_id values that might exist
UPDATE public.esg_assessments 
SET user_id = auth.uid() 
WHERE user_id IS NULL AND auth.uid() IS NOT NULL;