-- Fix infinite recursion in partner_users RLS policies
-- The current policy references itself causing infinite recursion

-- Drop the problematic policy
DROP POLICY IF EXISTS "Partner admins can manage users in their organization" ON public.partner_users;

-- Create a security definer function to check partner admin status
-- This prevents the infinite recursion by avoiding direct table references in policies
CREATE OR REPLACE FUNCTION public.is_partner_admin_for_partner(target_partner_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.partner_users pu
    WHERE pu.partner_id = target_partner_id 
    AND pu.user_id = auth.uid() 
    AND pu.role = 'partner_admin'
    AND pu.is_active = true
  );
$$;

-- Create a simplified policy using the security definer function
CREATE POLICY "Partner admins can manage users in their organization" 
ON public.partner_users 
FOR ALL
USING (public.is_partner_admin_for_partner(partner_id));

-- Add a policy to allow public reading of active partner branding data
DROP POLICY IF EXISTS "Public can view active partner branding" ON public.partners;
CREATE POLICY "Public can view active partner branding" 
ON public.partners 
FOR SELECT 
USING (is_active = true);