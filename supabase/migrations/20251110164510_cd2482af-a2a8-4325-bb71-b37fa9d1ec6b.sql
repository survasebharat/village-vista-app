-- Create items table for buy & sell marketplace
CREATE TABLE public.items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item_name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  village TEXT NOT NULL DEFAULT 'Shivankhed Khurd',
  contact TEXT NOT NULL,
  image_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view items"
  ON public.items
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create items"
  ON public.items
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own items"
  ON public.items
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own items"
  ON public.items
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER update_items_updated_at
  BEFORE UPDATE ON public.items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for item images
INSERT INTO storage.buckets (id, name, public)
VALUES ('items', 'items', true);

-- Storage policies
CREATE POLICY "Anyone can view item images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'items');

CREATE POLICY "Anyone can upload item images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'items');

CREATE POLICY "Users can update their own item images"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'items');

CREATE POLICY "Users can delete their own item images"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'items');