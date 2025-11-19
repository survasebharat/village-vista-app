-- Create service_categories table
CREATE TABLE IF NOT EXISTS public.service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies for service_categories
CREATE POLICY "Everyone can view active categories"
ON public.service_categories
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage categories"
ON public.service_categories
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default categories
INSERT INTO public.service_categories (name, display_order) VALUES
  ('Transportation', 1),
  ('Food Services', 2),
  ('Shops', 3),
  ('Hospital / Health', 4),
  ('School / Education', 5),
  ('Emergency Contacts', 6),
  ('Government Offices', 7),
  ('Tourist Places', 8)
ON CONFLICT (name) DO NOTHING;

-- Add trigger for updated_at
CREATE TRIGGER update_service_categories_updated_at
BEFORE UPDATE ON public.service_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();