-- Add sub_admin to the app_role enum
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'sub_admin';