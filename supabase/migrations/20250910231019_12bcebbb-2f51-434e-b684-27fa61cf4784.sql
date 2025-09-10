-- Add 'owner' to the app_role enum
ALTER TYPE public.app_role ADD VALUE 'owner';

-- Update your role to owner (or insert if doesn't exist)
INSERT INTO public.user_roles (user_id, role)
VALUES ('f839d063-589f-4b20-aa9b-1368ca7eb2e8', 'owner')
ON CONFLICT (user_id, role) DO NOTHING;

-- Remove admin role since you're now owner
DELETE FROM public.user_roles 
WHERE user_id = 'f839d063-589f-4b20-aa9b-1368ca7eb2e8' 
AND role = 'admin';