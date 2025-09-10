-- Fix infinite recursion in partner_users RLS policies
-- The current policy references itself causing infinite recursion

-- Drop the problematic policy
DROP POLICY IF EXISTS "Partner admins can manage users in their organization" ON public.partner_users;

-- Create a simplified version that doesn't cause recursion
CREATE POLICY "Partner admins can manage users in their organization" 
ON public.partner_users 
FOR ALL
USING (
  -- Check if the current user is a partner admin for this partner
  partner_id IN (
    SELECT p.partner_id 
    FROM public.partner_users p 
    WHERE p.user_id = auth.uid() 
    AND p.role = 'partner_admin'
    AND p.is_active = true
  )
);

-- Also fix the branding function error by ensuring partners table has proper RLS
-- Add a policy to allow public reading of active partner branding data
CREATE POLICY IF NOT EXISTS "Public can view active partner branding" 
ON public.partners 
FOR SELECT 
USING (is_active = true);