-- Create emergency_contacts table for storing helpline numbers
CREATE TABLE IF NOT EXISTS public.emergency_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id UUID REFERENCES public.villages(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  number TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Everyone can view emergency contacts"
  ON public.emergency_contacts
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage emergency contacts"
  ON public.emergency_contacts
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create quick_service_submissions table for storing form submissions
CREATE TABLE IF NOT EXISTS public.quick_service_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id UUID REFERENCES public.villages(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  applicant_name TEXT NOT NULL,
  father_mother_name TEXT,
  date_of_birth DATE,
  address TEXT,
  mobile_number TEXT NOT NULL,
  email TEXT,
  additional_data JSONB,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quick_service_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own submissions"
  ON public.quick_service_submissions
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can create submissions"
  ON public.quick_service_submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can manage all submissions"
  ON public.quick_service_submissions
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create contact_form_submissions table
CREATE TABLE IF NOT EXISTS public.contact_form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id UUID REFERENCES public.villages(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_form_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can create contact submissions"
  ON public.contact_form_submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view and manage contact submissions"
  ON public.contact_form_submissions
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Add update triggers
CREATE TRIGGER update_emergency_contacts_updated_at
  BEFORE UPDATE ON public.emergency_contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quick_service_submissions_updated_at
  BEFORE UPDATE ON public.quick_service_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_form_submissions_updated_at
  BEFORE UPDATE ON public.contact_form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();