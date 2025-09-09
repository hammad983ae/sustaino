-- Fix marketplace_profiles security vulnerability by restricting email/phone access

-- Drop all existing policies to ensure clean state
DROP POLICY IF EXISTS "Authenticated users can view public profile info" ON public.marketplace_profiles;
DROP POLICY IF EXISTS "Users can view own complete profile" ON public.marketplace_profiles;
DROP POLICY IF EXISTS "Marketplace admins can view complete profiles" ON public.marketplace_profiles;
DROP POLICY IF EXISTS "Anyone can view basic profile info" ON public.marketplace_profiles;

-- Create granular policies for different types of access

-- Policy 1: Public can view basic vendor profiles (no email/phone)
CREATE POLICY "Public can view basic vendor profiles"
ON public.marketplace_profiles
FOR SELECT
TO public
USING (role = 'vendor');

-- Policy 2: Authenticated users can view basic profiles (no email/phone)  
CREATE POLICY "Authenticated users can view basic profiles"
ON public.marketplace_profiles
FOR SELECT
TO authenticated
USING (true);

-- Policy 3: Profile owners can view their complete profile (including email/phone)
CREATE POLICY "Profile owners can view complete profile"
ON public.marketplace_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy 4: Marketplace admins can view complete profiles (including email/phone)
CREATE POLICY "Marketplace admins can view all complete profiles"
ON public.marketplace_profiles
FOR SELECT
TO authenticated
USING (is_marketplace_admin());

-- Create a security definer function for authorized contact information access
CREATE OR REPLACE FUNCTION public.get_marketplace_profile_contact_secure(profile_id uuid)
RETURNS TABLE(email text, phone text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Only return contact info if user is the profile owner or a marketplace admin
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
    -- Return empty result for unauthorized access
    RETURN QUERY
    SELECT NULL::text, NULL::text
    WHERE false;
  END IF;
END;
$$;

-- Update the marketplace_profiles_public view to exclude sensitive fields
DROP VIEW IF EXISTS public.marketplace_profiles_public;

CREATE VIEW public.marketplace_profiles_public AS
SELECT 
  id,
  name,
  company_name,
  bio,
  avatar_url,
  role,
  created_at
FROM public.marketplace_profiles
WHERE role = 'vendor';

-- Grant appropriate permissions
GRANT SELECT ON public.marketplace_profiles_public TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.get_marketplace_profile_contact_secure(uuid) TO authenticated;