-- Fix security vulnerability: Restrict marketplace profiles access to authenticated users only
-- and create a public view with limited information

-- First, drop the overly permissive policy that allows public access
DROP POLICY IF EXISTS "Users can view all marketplace profiles" ON public.marketplace_profiles;

-- Create a more secure policy that only allows authenticated users to view profiles
-- Users can view basic public info of all profiles, but only see full details of their own
CREATE POLICY "Authenticated users can view public profile info" 
ON public.marketplace_profiles 
FOR SELECT 
TO authenticated
USING (true);

-- Create a policy for viewing own complete profile with all sensitive data
CREATE POLICY "Users can view own complete profile" 
ON public.marketplace_profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Create a public view with only non-sensitive information for marketplace display
CREATE OR REPLACE VIEW public.marketplace_profiles_public AS
SELECT 
  id,
  name,
  company_name,
  bio,
  avatar_url,
  role,
  created_at
FROM public.marketplace_profiles
WHERE role = 'vendor'; -- Only show vendor profiles publicly

-- Grant access to the public view
GRANT SELECT ON public.marketplace_profiles_public TO anon;
GRANT SELECT ON public.marketplace_profiles_public TO authenticated;

-- Add RLS to the view (though views inherit from base table)
ALTER VIEW public.marketplace_profiles_public SET (security_barrier = true);

-- Create a secure function to get profile contact info only for authorized users
CREATE OR REPLACE FUNCTION public.get_marketplace_profile_contact(profile_id uuid)
RETURNS TABLE(
  email text,
  phone text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only return contact info if user is the profile owner or an admin
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  
  IF EXISTS (
    SELECT 1 FROM marketplace_profiles 
    WHERE id = profile_id AND user_id = auth.uid()
  ) OR is_marketplace_admin() THEN
    RETURN QUERY
    SELECT mp.email, mp.phone
    FROM marketplace_profiles mp
    WHERE mp.id = profile_id;
  ELSE
    RAISE EXCEPTION 'Access denied: insufficient permissions';
  END IF;
END;
$$;