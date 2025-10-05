-- Create villages table
CREATE TABLE IF NOT EXISTS public.villages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  state text NOT NULL,
  district text NOT NULL,
  pincode text NOT NULL,
  established text,
  area text,
  latitude text,
  longitude text,
  altitude text,
  description text,
  vision text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create village_population table
CREATE TABLE IF NOT EXISTS public.village_population (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id uuid REFERENCES public.villages(id) ON DELETE CASCADE,
  total integer,
  male integer,
  female integer,
  literacy_rate text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(village_id)
);

-- Create panchayat_members table
CREATE TABLE IF NOT EXISTS public.panchayat_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id uuid REFERENCES public.villages(id) ON DELETE CASCADE,
  name text NOT NULL,
  role text NOT NULL,
  contact text,
  email text,
  tenure text,
  education text,
  message text,
  ward text,
  department text,
  office_hours text,
  image_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create announcements table
CREATE TABLE IF NOT EXISTS public.announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id uuid REFERENCES public.villages(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  announcement_date date NOT NULL,
  type text,
  priority text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create schemes table
CREATE TABLE IF NOT EXISTS public.schemes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id uuid REFERENCES public.villages(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  eligibility text,
  benefits text,
  application_process text,
  documents jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create development_works table
CREATE TABLE IF NOT EXISTS public.development_works (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id uuid REFERENCES public.villages(id) ON DELETE CASCADE,
  title text NOT NULL,
  status text NOT NULL,
  budget text,
  start_date date,
  completion_date date,
  expected_completion date,
  description text,
  progress integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create village_services table
CREATE TABLE IF NOT EXISTS public.village_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id uuid REFERENCES public.villages(id) ON DELETE CASCADE,
  category text NOT NULL,
  name text NOT NULL,
  owner text,
  contact text,
  address text,
  hours text,
  speciality text,
  image_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create village_gallery table
CREATE TABLE IF NOT EXISTS public.village_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id uuid REFERENCES public.villages(id) ON DELETE CASCADE,
  title text NOT NULL,
  type text,
  date date,
  image_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.villages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.village_population ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.panchayat_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_works ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.village_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.village_gallery ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Everyone can view, only admins can manage
CREATE POLICY "Everyone can view villages" ON public.villages FOR SELECT USING (true);
CREATE POLICY "Admins can manage villages" ON public.villages FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Everyone can view population" ON public.village_population FOR SELECT USING (true);
CREATE POLICY "Admins can manage population" ON public.village_population FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Everyone can view panchayat members" ON public.panchayat_members FOR SELECT USING (true);
CREATE POLICY "Admins can manage panchayat members" ON public.panchayat_members FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Everyone can view announcements" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Admins can manage announcements" ON public.announcements FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Everyone can view schemes" ON public.schemes FOR SELECT USING (true);
CREATE POLICY "Admins can manage schemes" ON public.schemes FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Everyone can view development works" ON public.development_works FOR SELECT USING (true);
CREATE POLICY "Admins can manage development works" ON public.development_works FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Everyone can view services" ON public.village_services FOR SELECT USING (true);
CREATE POLICY "Admins can manage services" ON public.village_services FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Everyone can view gallery" ON public.village_gallery FOR SELECT USING (true);
CREATE POLICY "Admins can manage gallery" ON public.village_gallery FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert initial village data for Shivankhed
INSERT INTO public.villages (name, state, district, pincode, established, area, latitude, longitude, altitude, description, vision)
VALUES (
  'Shivankhed',
  'Maharashtra',
  'Latur',
  '413512',
  '1995',
  '15.2 sq km',
  '18.5204',
  '73.8567',
  '560 meters',
  'A progressive village known for its sustainable farming practices, rich cultural heritage, and strong community participation in development activities.',
  'To become a model village demonstrating sustainable development, digital empowerment, and inclusive growth.'
);

-- Insert initial village data for Gudsoor
INSERT INTO public.villages (name, state, district, pincode, established, area, latitude, longitude, altitude, description, vision)
VALUES (
  'Gudsoor',
  'Maharashtra',
  'Latur',
  '413512',
  '1998',
  '12.8 sq km',
  '18.4500',
  '73.9000',
  '540 meters',
  'A vibrant village focused on agricultural innovation and community development.',
  'To achieve holistic development through education, technology, and sustainable practices.'
);