CREATE OR REPLACE FUNCTION public.handle_updated_user() 
RETURNS TRIGGER
LANGUAGE plpgsql 
SECURITY DEFINER 
AS $$
BEGIN
  UPDATE public.profile 
  SET 
    name = new.raw_user_meta_data->>'name',
    keywords = ARRAY(SELECT jsonb_array_elements_text(new.raw_user_meta_data->'keywords')),
    area = new.raw_user_meta_data->>'area',
    avatar = new.raw_user_meta_data->>'avatar',
    href = new.raw_user_meta_data->>'href',
    user_type = new.raw_user_meta_data->>'user_type',
    user_email = new.raw_user_meta_data->>'user_email'
  WHERE id = new.id;

  IF new.raw_user_meta_data->>'user_type' = 'company' THEN
    UPDATE public.company_profile 
    SET 
      contact = new.raw_user_meta_data->>'contact',
      location = ARRAY(SELECT jsonb_array_elements_text(new.raw_user_meta_data->'location'))
    WHERE id = new.id;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_updated
AFTER UPDATE ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_user();