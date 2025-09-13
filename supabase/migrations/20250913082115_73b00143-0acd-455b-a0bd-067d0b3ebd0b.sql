-- Add client_type column to valuation_jobs table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'valuation_jobs' 
        AND column_name = 'client_type'
    ) THEN
        ALTER TABLE valuation_jobs 
        ADD COLUMN client_type TEXT DEFAULT 'long-term' CHECK (client_type IN ('long-term', 'one-time'));
    END IF;
END $$;