-- Update RLS policies to work without authentication for public access
-- Since authentication has been removed, we need to allow public access

-- Allow public access to properties table
DROP POLICY IF EXISTS "Users can view their own properties" ON properties;
DROP POLICY IF EXISTS "Users can update their own properties" ON properties;
DROP POLICY IF EXISTS "Users can insert their own properties" ON properties;
DROP POLICY IF EXISTS "Users can delete their own properties" ON properties;

CREATE POLICY "Allow public access to properties" ON properties FOR ALL USING (true);

-- Allow public access to jobs table  
DROP POLICY IF EXISTS "Users can create their own jobs" ON jobs;
DROP POLICY IF EXISTS "Users can view their own jobs" ON jobs;
DROP POLICY IF EXISTS "Users can update their own jobs" ON jobs;
DROP POLICY IF EXISTS "Users can delete their own jobs" ON jobs;
DROP POLICY IF EXISTS "Users can view jobs they are allowed to access" ON jobs;
DROP POLICY IF EXISTS "Allowed users can update jobs" ON jobs;

CREATE POLICY "Allow public access to jobs" ON jobs FOR ALL USING (true);

-- Allow public access to property_assessments table
DROP POLICY IF EXISTS "Users can view their own assessments" ON property_assessments;
DROP POLICY IF EXISTS "Users can update their own assessments" ON property_assessments;

CREATE POLICY "Allow public access to property_assessments" ON property_assessments FOR ALL USING (true);

-- Allow public access to report_configurations table if it exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'report_configurations') THEN
        EXECUTE 'DROP POLICY IF EXISTS "Users can view their own configurations" ON report_configurations';
        EXECUTE 'DROP POLICY IF EXISTS "Users can update their own configurations" ON report_configurations';
        EXECUTE 'CREATE POLICY "Allow public access to report_configurations" ON report_configurations FOR ALL USING (true)';
    END IF;
END $$;

-- Allow public access to report_sections table if it exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'report_sections') THEN
        EXECUTE 'DROP POLICY IF EXISTS "Users can view sections for their configurations" ON report_sections';
        EXECUTE 'DROP POLICY IF EXISTS "Users can update sections for their configurations" ON report_sections';
        EXECUTE 'CREATE POLICY "Allow public access to report_sections" ON report_sections FOR ALL USING (true)';
    END IF;
END $$;

-- Allow public access to job_sections table if it exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'job_sections') THEN
        EXECUTE 'CREATE POLICY "Allow public access to job_sections" ON job_sections FOR ALL USING (true)';
    END IF;
END $$;