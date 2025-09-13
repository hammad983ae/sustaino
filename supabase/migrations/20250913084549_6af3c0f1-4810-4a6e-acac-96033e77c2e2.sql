-- Create a function to safely upsert properties for job creation
CREATE OR REPLACE FUNCTION public.upsert_property_for_job(
  address_text TEXT,
  property_type_text TEXT DEFAULT 'residential'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  property_id UUID;
  current_user_id UUID;
  suburb_extracted TEXT := 'Unknown';
  state_extracted TEXT := 'Unknown';
  postcode_extracted TEXT := '0000';
  address_parts TEXT[];
BEGIN
  -- Get current user
  current_user_id := auth.uid();
  
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated';
  END IF;
  
  -- Parse address to extract suburb, state, postcode
  address_parts := string_to_array(address_text, ' ');
  
  -- Look for postcode (4 digits)
  FOR i IN 1..array_length(address_parts, 1) LOOP
    IF address_parts[i] ~ '^\d{4}$' THEN
      postcode_extracted := address_parts[i];
      -- State is usually before postcode
      IF i > 1 THEN
        state_extracted := address_parts[i-1];
      END IF;
      -- Suburb is usually before state
      IF i > 2 THEN
        suburb_extracted := address_parts[i-2];
      END IF;
      EXIT;
    END IF;
  END LOOP;
  
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
      suburb,
      state,
      postcode,
      property_type,
      user_id,
      country,
      created_at,
      updated_at
    ) VALUES (
      address_text,
      suburb_extracted,
      state_extracted,
      postcode_extracted,
      property_type_text,
      current_user_id,
      'Australia',
      NOW(),
      NOW()
    ) RETURNING id INTO property_id;
  END IF;
  
  RETURN property_id;
END;
$$;