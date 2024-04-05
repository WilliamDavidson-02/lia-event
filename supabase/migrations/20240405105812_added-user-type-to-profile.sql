alter table "public"."profile" add column "user_type" text not null;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.profile 
  (id, name, keywords, area, avatar, href, user_type)
  values
  (
    new.id, 
    new.raw_user_meta_data->>'name',
    ARRAY(SELECT jsonb_array_elements_text(NEW.raw_user_meta_data->'keywords')),
    ARRAY(SELECT jsonb_array_elements_text(NEW.raw_user_meta_data->'area')),
    new.raw_user_meta_data->>'avatar',
    new.raw_user_meta_data->>'href',
    new.raw_user_meta_data->>'user_type'
  );

IF new.raw_user_meta_data->>'user_type' = 'company' THEN
    insert into public.company_profile 
    (id, contact, location, work_environment, employees, work_type)
    values
    (
      new.id, 
      new.raw_user_meta_data->>'contact',
      ARRAY(SELECT jsonb_array_elements_text(NEW.raw_user_meta_data->'location')),
      new.raw_user_meta_data->>'work_environment',
      new.raw_user_meta_data->>'employees',
      new.raw_user_meta_data->>'work_type'
    );
  end if;

  RETURN NEW;
end;
$function$
;


