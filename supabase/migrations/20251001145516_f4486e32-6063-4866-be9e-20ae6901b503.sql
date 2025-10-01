-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create page_visibility table to store visibility per village
CREATE TABLE public.page_visibility (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  village_name TEXT NOT NULL,
  page_key TEXT NOT NULL,
  page_label TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id),
  UNIQUE(village_name, page_key)
);

ALTER TABLE public.page_visibility ENABLE ROW LEVEL SECURITY;

-- Insert default pages for villages
INSERT INTO public.page_visibility (village_name, page_key, page_label, is_visible) VALUES
  ('Shivankhed', 'about', 'About', true),
  ('Shivankhed', 'panchayat', 'Panchayat', true),
  ('Shivankhed', 'services', 'Services', true),
  ('Shivankhed', 'schemes', 'Schemes', true),
  ('Shivankhed', 'development', 'Development', true),
  ('Shivankhed', 'gallery', 'Gallery', true),
  ('Shivankhed', 'contact', 'Contact', true),
  ('Gudsoor', 'about', 'About', true),
  ('Gudsoor', 'panchayat', 'Panchayat', true),
  ('Gudsoor', 'services', 'Services', true),
  ('Gudsoor', 'schemes', 'Schemes', true),
  ('Gudsoor', 'development', 'Development', true),
  ('Gudsoor', 'gallery', 'Gallery', true),
  ('Gudsoor', 'contact', 'Contact', true);

-- Function to check if user has a role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for page_visibility
CREATE POLICY "Everyone can view page visibility"
  ON public.page_visibility FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage page visibility"
  ON public.page_visibility FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));