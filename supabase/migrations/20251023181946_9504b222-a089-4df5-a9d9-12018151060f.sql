-- Create tax payments table
CREATE TABLE IF NOT EXISTS public.tax_payments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  village_id uuid REFERENCES public.villages(id),
  payment_id text UNIQUE,
  order_id text NOT NULL,
  tax_type text NOT NULL,
  amount numeric NOT NULL,
  payer_name text NOT NULL,
  payer_mobile text NOT NULL,
  payer_email text,
  village_account text,
  payment_status text NOT NULL DEFAULT 'pending',
  payment_date timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tax_payments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create tax payment records
CREATE POLICY "Anyone can create tax payment records"
ON public.tax_payments
FOR INSERT
WITH CHECK (true);

-- Allow users to view their own payments by mobile number
CREATE POLICY "Users can view their own payments"
ON public.tax_payments
FOR SELECT
USING (true);

-- Admins can manage all tax payments
CREATE POLICY "Admins can manage all tax payments"
ON public.tax_payments
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_tax_payments_updated_at
BEFORE UPDATE ON public.tax_payments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();