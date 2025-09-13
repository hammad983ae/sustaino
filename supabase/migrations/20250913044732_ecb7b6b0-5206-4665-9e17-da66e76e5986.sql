-- Fix missing INSERT policies for properties table
CREATE POLICY "Users can insert their own properties" 
ON public.properties 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Fix missing INSERT policies for valuations table  
CREATE POLICY "Users can insert their own valuations" 
ON public.valuations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Also ensure the PropertyValuationManagement component can work properly
-- by adding a policy for creating properties from address search
CREATE OR REPLACE FUNCTION public.upsert_property_from_address(
  address_text TEXT,
  property_type_text TEXT DEFAULT 'residential'
)
RETURNS UUID AS $$
DECLARE
  property_id UUID;
  current_user_id UUID;
BEGIN
  -- Get current user
  current_user_id := auth.uid();
  
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated';
  END IF;
  
  -- Check if property already exists for this user
  SELECT id INTO property_id 
  FROM public.properties 
  WHERE address_line_1 = address_text 
    AND user_id = current_user_id 
  LIMIT 1;
  
  -- If not found, create new property
  IF property_id IS NULL THEN
    INSERT INTO public.properties (
      address_line_1,
      property_type,
      user_id,
      created_at,
      updated_at
    ) VALUES (
      address_text,
      property_type_text,
      current_user_id,
      NOW(),
      NOW()
    ) RETURNING id INTO property_id;
  END IF;
  
  RETURN property_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;