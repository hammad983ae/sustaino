-- Create a test user in auth.users table for testing
-- Note: This is for development/testing purposes only

-- First, let's check if the test user already exists and create if not
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  aud,
  role
) 
SELECT 
  '00000000-0000-0000-0000-000000000001'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'test@example.com',
  crypt('password123', gen_salt('bf')),
  now(),
  now(),
  now(),
  'authenticated',
  'authenticated'
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'test@example.com'
);

-- Create corresponding profile
INSERT INTO public.profiles (
  user_id,
  email,
  display_name,
  role
) 
SELECT 
  '00000000-0000-0000-0000-000000000001'::uuid,
  'test@example.com',
  'Test User',
  'user'
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE user_id = '00000000-0000-0000-0000-000000000001'::uuid
);