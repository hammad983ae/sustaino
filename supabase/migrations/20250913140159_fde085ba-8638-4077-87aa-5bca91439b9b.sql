-- Create a monthly cron job to update construction costs and CPI on the 1st of each month
-- This requires pg_cron extension to be enabled

-- First, enable the pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the monthly update function to run on the 1st of every month at 9:00 AM
SELECT cron.schedule(
  'monthly-construction-cost-update',
  '0 9 1 * *', -- At 9:00 AM on the 1st day of every month
  $$
  SELECT
    net.http_post(
        url:='https://cxcfxnbvtddwebqprile.supabase.co/functions/v1/monthly-cost-update',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4Y2Z4bmJ2dGRkd2VicXByaWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxOTQwMjksImV4cCI6MjA3MDc3MDAyOX0.-tSWd97U0rxEZcW1ejcAJlX2EPVBDAFI-dEuQf6CDys"}'::jsonb,
        body:=concat('{"scheduled_update": true, "timestamp": "', now(), '"}')::jsonb
    ) as request_id;
  $$
);

-- Create a function to manually trigger the update (for testing)
CREATE OR REPLACE FUNCTION public.trigger_monthly_cost_update()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  result jsonb;
BEGIN
  -- Call the edge function to trigger the update
  SELECT net.http_post(
    url:='https://cxcfxnbvtddwebqprile.supabase.co/functions/v1/monthly-cost-update',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4Y2Z4bmJ2dGRkd2VicXByaWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxOTQwMjksImV4cCI6MjA3MDc3MDAyOX0.-tSWd97U0rxEZcW1ejcAJlX2EPVBDAFI-dEuQf6CDys"}'::jsonb,
    body:='{"manual_trigger": true}'::jsonb
  ) INTO result;
  
  RETURN result;
END;
$function$;