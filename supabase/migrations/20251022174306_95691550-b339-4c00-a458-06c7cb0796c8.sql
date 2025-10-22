-- Create service_ratings table for star rating system
CREATE TABLE IF NOT EXISTS public.service_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  village_id UUID,
  service_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique constraint to prevent duplicate ratings from same session
CREATE UNIQUE INDEX IF NOT EXISTS service_ratings_session_service_idx 
ON public.service_ratings(session_id, service_id);

-- Enable RLS
ALTER TABLE public.service_ratings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for service_ratings
CREATE POLICY "Everyone can view service ratings"
ON public.service_ratings FOR SELECT
USING (true);

CREATE POLICY "Anyone can create service ratings"
ON public.service_ratings FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can update their own ratings"
ON public.service_ratings FOR UPDATE
USING (session_id = current_setting('app.session_id', true));

-- Create feedback_submissions table
CREATE TABLE IF NOT EXISTS public.feedback_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  village_id UUID,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('feedback', 'suggestion', 'complaint')),
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.feedback_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for feedback_submissions
CREATE POLICY "Anyone can create feedback submissions"
ON public.feedback_submissions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view and manage feedback submissions"
ON public.feedback_submissions FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create notices table
CREATE TABLE IF NOT EXISTS public.notices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  village_id UUID,
  title TEXT NOT NULL,
  notice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  attachment_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;

-- RLS Policies for notices
CREATE POLICY "Everyone can view active notices"
ON public.notices FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage notices"
ON public.notices FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create market_prices table
CREATE TABLE IF NOT EXISTS public.market_prices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  village_id UUID,
  crop_name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  unit TEXT NOT NULL DEFAULT 'quintal',
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.market_prices ENABLE ROW LEVEL SECURITY;

-- RLS Policies for market_prices
CREATE POLICY "Everyone can view market prices"
ON public.market_prices FOR SELECT
USING (true);

CREATE POLICY "Admins can manage market prices"
ON public.market_prices FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create triggers for updated_at columns
CREATE TRIGGER update_service_ratings_updated_at
BEFORE UPDATE ON public.service_ratings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_feedback_submissions_updated_at
BEFORE UPDATE ON public.feedback_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notices_updated_at
BEFORE UPDATE ON public.notices
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_market_prices_updated_at
BEFORE UPDATE ON public.market_prices
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();