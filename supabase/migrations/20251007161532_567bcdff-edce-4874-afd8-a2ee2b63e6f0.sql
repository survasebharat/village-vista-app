-- Enable realtime for village_config table
ALTER PUBLICATION supabase_realtime ADD TABLE public.village_config;

-- Enable realtime for page_visibility table
ALTER PUBLICATION supabase_realtime ADD TABLE public.page_visibility;