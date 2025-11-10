-- Add status and review fields to items table
ALTER TABLE public.items 
ADD COLUMN status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
ADD COLUMN reviewed_by UUID REFERENCES auth.users(id),
ADD COLUMN reviewed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN rejection_reason TEXT;

-- Drop existing RLS policies
DROP POLICY IF EXISTS "Everyone can view items" ON public.items;
DROP POLICY IF EXISTS "Anyone can create items" ON public.items;

-- Create new RLS policies for marketplace moderation
CREATE POLICY "Admins can view all items"
ON public.items
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view approved items"
ON public.items
FOR SELECT
USING (status = 'approved');

CREATE POLICY "Anyone can create items (pending by default)"
ON public.items
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can update any item"
ON public.items
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete any item"
ON public.items
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));