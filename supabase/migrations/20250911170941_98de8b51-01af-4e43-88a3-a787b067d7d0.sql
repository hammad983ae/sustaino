-- Enable pg_cron extension for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule monthly market summary update for 1st of every month at 6:00 AM UTC
SELECT cron.schedule(
  'monthly-market-summary-update',
  '0 6 1 * *', -- 6:00 AM on the 1st day of every month
  $$
  SELECT
    net.http_post(
        url:='https://cxcfxnbvtddwebqprile.supabase.co/functions/v1/monthly-market-summary',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4Y2Z4bmJ2dGRkd2VicXByaWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxOTQwMjksImV4cCI6MjA3MDc3MDAyOX0.-tSWd97U0rxEZcW1ejcAJlX2EPVBDAFI-dEuQf6CDys"}'::jsonb,
        body:=concat('{"scheduled_time": "', now(), '"}')::jsonb
    ) as request_id;
  $$
);