-- Create function to update timestamps (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create table to store village configuration as JSONB
CREATE TABLE public.village_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  village_id UUID NOT NULL REFERENCES public.villages(id) ON DELETE CASCADE,
  config_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id),
  UNIQUE(village_id)
);

-- Enable RLS
ALTER TABLE public.village_config ENABLE ROW LEVEL SECURITY;

-- Everyone can view village config
CREATE POLICY "Everyone can view village config"
ON public.village_config
FOR SELECT
USING (true);

-- Admins can manage village config
CREATE POLICY "Admins can manage village config"
ON public.village_config
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_village_config_updated_at
BEFORE UPDATE ON public.village_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_village_config_village_id ON public.village_config(village_id);