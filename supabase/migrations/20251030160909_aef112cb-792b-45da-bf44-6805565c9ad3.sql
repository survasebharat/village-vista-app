-- Create approval status enum
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'approval_status') THEN
    CREATE TYPE public.approval_status AS ENUM ('pending', 'approved', 'rejected');
  END IF;
END $$;

-- Update profiles table with additional fields
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS mobile TEXT,
ADD COLUMN IF NOT EXISTS aadhar_number TEXT,
ADD COLUMN IF NOT EXISTS approval_status approval_status DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Update handle_new_user function to set default pending status
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, approval_status, mobile, aadhar_number)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'pending',
    COALESCE(NEW.raw_user_meta_data->>'mobile', ''),
    COALESCE(NEW.raw_user_meta_data->>'aadhar_number', '')
  );
  
  -- Assign default 'user' role to new users
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Update RLS policies for profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Approved users can view their own profile
CREATE POLICY "Approved users can view their own profile"
ON public.profiles
FOR SELECT
USING (
  auth.uid() = id 
  AND approval_status = 'approved'
);

-- Approved users can update their own profile (except approval fields)
CREATE POLICY "Approved users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id AND approval_status = 'approved')
WITH CHECK (auth.uid() = id AND approval_status = 'approved');

-- Admins and gramsevaks can view all profiles
CREATE POLICY "Admins and gramsevaks can view all profiles"
ON public.profiles
FOR SELECT
USING (
  public.has_role(auth.uid(), 'admin') 
  OR public.has_role(auth.uid(), 'gramsevak')
);

-- Admins and gramsevaks can update all profiles
CREATE POLICY "Admins and gramsevaks can update all profiles"
ON public.profiles
FOR UPDATE
USING (
  public.has_role(auth.uid(), 'admin') 
  OR public.has_role(auth.uid(), 'gramsevak')
);

-- Admins can delete profiles
CREATE POLICY "Admins can delete profiles"
ON public.profiles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create function to check if user is approved
CREATE OR REPLACE FUNCTION public.is_user_approved(user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = user_id
    AND approval_status = 'approved'
  )
$$;

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_profiles_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_profiles_updated_at_trigger ON public.profiles;
CREATE TRIGGER update_profiles_updated_at_trigger
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_profiles_updated_at();