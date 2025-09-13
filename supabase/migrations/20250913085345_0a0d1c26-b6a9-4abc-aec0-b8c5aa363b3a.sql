-- Create a function to safely create valuation jobs
CREATE OR REPLACE FUNCTION public.create_valuation_job(
  job_data JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  job_id UUID;
  current_user_id UUID;
  property_id_param UUID;
BEGIN
  -- Get current user
  current_user_id := auth.uid();
  
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated';
  END IF;
  
  -- Extract property_id from job_data
  property_id_param := (job_data->>'property_id')::UUID;
  
  IF property_id_param IS NULL THEN
    RAISE EXCEPTION 'Property ID is required';
  END IF;
  
  -- Insert the valuation job
  INSERT INTO public.valuation_jobs (
    job_title,
    client_name,
    client_email,
    client_phone,
    job_type,
    property_address,
    property_id,
    priority,
    estimated_hours,
    due_date,
    client_type,
    user_id,
    status,
    instruction_date,
    notes
  ) VALUES (
    job_data->>'job_title',
    job_data->>'client_name',
    job_data->>'client_email',
    job_data->>'client_phone',
    job_data->>'job_type',
    job_data->>'property_address',
    property_id_param,
    COALESCE(job_data->>'priority', 'medium'),
    COALESCE((job_data->>'estimated_hours')::NUMERIC, 1.0),
    COALESCE((job_data->>'due_date')::DATE, CURRENT_DATE + INTERVAL '7 days'),
    COALESCE(job_data->>'client_type', 'long-term'),
    current_user_id,
    'pending',
    CURRENT_DATE,
    job_data->>'notes'
  ) RETURNING id INTO job_id;
  
  RETURN job_id;
END;
$$;