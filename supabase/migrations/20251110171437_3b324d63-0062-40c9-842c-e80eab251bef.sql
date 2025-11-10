-- Add seller_name and sold columns to items table
ALTER TABLE public.items
ADD COLUMN IF NOT EXISTS seller_name TEXT,
ADD COLUMN IF NOT EXISTS sold BOOLEAN DEFAULT false;

-- Create index for faster seller queries
CREATE INDEX IF NOT EXISTS idx_items_seller_name ON public.items(seller_name);
CREATE INDEX IF NOT EXISTS idx_items_user_id ON public.items(user_id);
CREATE INDEX IF NOT EXISTS idx_items_sold ON public.items(sold) WHERE sold = false;