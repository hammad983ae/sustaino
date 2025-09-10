-- Remove the test user from auth.users
DELETE FROM auth.users 
WHERE id = '00000000-0000-0000-0000-000000000001';

-- Also remove any related data in user_roles if it exists
DELETE FROM public.user_roles 
WHERE user_id = '00000000-0000-0000-0000-000000000001';