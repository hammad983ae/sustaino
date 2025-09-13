-- Create a function to safely create reports
CREATE OR REPLACE FUNCTION public.create_report(
  report_data JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  report_id UUID;
  current_user_id UUID;
  property_id_param UUID;
BEGIN
  -- Get current user
  current_user_id := auth.uid();
  
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated';
  END IF;
  
  -- Extract property_id from report_data
  property_id_param := (report_data->>'property_id')::UUID;
  
  IF property_id_param IS NULL THEN
    RAISE EXCEPTION 'Property ID is required';
  END IF;
  
  -- Insert the report
  INSERT INTO public.reports (
    user_id,
    property_id,
    title,
    report_type,
    status,
    current_section,
    progress,
    sections_data
  ) VALUES (
    current_user_id,
    property_id_param,
    report_data->>'title',
    report_data->>'report_type',
    COALESCE(report_data->>'status', 'in_progress'),
    report_data->>'current_section',
    COALESCE((report_data->>'progress')::INTEGER, 10),
    report_data->'sections_data'
  ) RETURNING id INTO report_id;
  
  RETURN report_id;
END;
$$;