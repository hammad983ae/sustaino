-- Fix security issues identified by the linter

-- 1. Fix function search path issue by setting proper search path for the trigger function
CREATE OR REPLACE FUNCTION update_auto_saved_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.auto_saved_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;