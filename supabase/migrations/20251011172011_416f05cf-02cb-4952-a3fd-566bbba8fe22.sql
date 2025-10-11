-- Add language support to village_config table
ALTER TABLE public.village_config 
ADD COLUMN language text NOT NULL DEFAULT 'en';

-- Add unique constraint on village_id and language combination
-- First, we need to handle any existing duplicates by keeping only one per village
-- This ensures the unique constraint can be added
DELETE FROM public.village_config a
USING public.village_config b
WHERE a.id < b.id 
AND a.village_id = b.village_id;

-- Now add the unique constraint
ALTER TABLE public.village_config 
ADD CONSTRAINT village_config_village_language_unique UNIQUE (village_id, language);

-- Add check constraint for valid languages (English, Hindi, Marathi)
ALTER TABLE public.village_config 
ADD CONSTRAINT village_config_language_check CHECK (language IN ('en', 'hi', 'mr'));

-- Add comment for documentation
COMMENT ON COLUMN public.village_config.language IS 'Language code: en (English), hi (Hindi), mr (Marathi)';

-- Create index for better query performance
CREATE INDEX idx_village_config_village_language ON public.village_config(village_id, language);