-- Add job_number column to valuation_jobs table
ALTER TABLE valuation_jobs ADD COLUMN job_number SERIAL;

-- Set the sequence to start at 10001
SELECT setval(pg_get_serial_sequence('valuation_jobs', 'job_number'), 10000, false);

-- Update existing records to have job numbers starting from 10001
UPDATE valuation_jobs SET job_number = nextval(pg_get_serial_sequence('valuation_jobs', 'job_number'));