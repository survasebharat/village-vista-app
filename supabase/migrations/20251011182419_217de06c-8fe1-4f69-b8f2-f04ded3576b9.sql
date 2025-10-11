-- Drop the old unique constraint on village_id only
ALTER TABLE village_config DROP CONSTRAINT IF EXISTS village_config_village_id_key;

-- Add a new unique constraint on the combination of village_id and language
ALTER TABLE village_config ADD CONSTRAINT village_config_village_id_language_key UNIQUE (village_id, language);