-- Function to assign roles by email
CREATE OR REPLACE FUNCTION assign_role_by_email(user_email TEXT, user_role app_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Get user_id from profiles table
  SELECT id INTO target_user_id
  FROM public.profiles
  WHERE email = user_email;
  
  IF target_user_id IS NOT NULL THEN
    -- Insert role if not exists
    INSERT INTO public.user_roles (user_id, role)
    VALUES (target_user_id, user_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;

-- Assign admin roles
SELECT assign_role_by_email('rajisurvase@yopmail.com', 'admin');
SELECT assign_role_by_email('rajisurvase@gmail.com', 'admin');

-- Assign sub-admin role
SELECT assign_role_by_email('shivankhedkhurd@gmail.com', 'sub_admin');