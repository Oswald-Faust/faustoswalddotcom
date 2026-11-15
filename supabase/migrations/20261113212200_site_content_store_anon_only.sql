-- The app calls the save functions with the publishable key (anon role) only.
revoke execute on function public.save_site_content(text, jsonb) from authenticated;
revoke execute on function public.save_site_media(text, text, text, text) from authenticated;
