alter table "public"."student_profile" drop column "program";

alter table "public"."student_profile" add column "area" text;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.profile 
  (id, name, keywords)
  values
  (
    new.id, 
    new.raw_user_meta_data->>'name',
    ARRAY(SELECT jsonb_array_elements_text(NEW.raw_user_meta_data->'keywords'))
  );

  if new.raw_user_meta_data ? 'contact' then
    insert into public.company_profile 
    (id, contact, area, location, work_environment, employees, work_type, avatar, href)
    values
    (
      new.id, 
      new.raw_user_meta_data->>'contact',
      ARRAY(SELECT jsonb_array_elements_text(NEW.raw_user_meta_data->'area')),
      ARRAY(SELECT jsonb_array_elements_text(NEW.raw_user_meta_data->'location')),
      new.raw_user_meta_data->>'work_environment',
      new.raw_user_meta_data->>'employees',
      new.raw_user_meta_data->>'work_type',
      new.raw_user_meta_data->>'avatar',
      new.raw_user_meta_data->>'href'
    );
  else
    insert into public.student_profile 
    (id, area)
    values
    (
      new.id, 
      new.raw_user_meta_data->>'area'
    );
  end if;

  RETURN NEW;
end;
$function$
;


