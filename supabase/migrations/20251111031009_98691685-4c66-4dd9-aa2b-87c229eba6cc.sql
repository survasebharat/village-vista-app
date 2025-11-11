-- Add availability column to items table
ALTER TABLE public.items
ADD COLUMN is_available boolean NOT NULL DEFAULT true;

-- Add index for faster queries on available items
CREATE INDEX idx_items_available ON public.items(is_available) WHERE is_available = true AND status = 'approved';

-- Add comment
COMMENT ON COLUMN public.items.is_available IS 'Controls whether the item is displayed on the sell page. Users can toggle this to mark items as sold or unavailable.';