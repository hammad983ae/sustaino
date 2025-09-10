-- Fix security definer view by dropping and recreating without SECURITY DEFINER
-- The marketplace_profiles_public view should not use SECURITY DEFINER as it bypasses RLS

-- Drop the existing view
DROP VIEW IF EXISTS marketplace_profiles_public;

-- Recreate the view without SECURITY DEFINER property
-- This view shows only public vendor profiles, which should be accessible to everyone
CREATE VIEW marketplace_profiles_public AS
SELECT 
  id,
  name,
  company_name,
  bio,
  avatar_url,
  role,
  created_at
FROM marketplace_profiles
WHERE role = 'vendor'::marketplace_user_role;