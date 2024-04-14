alter table "public"."company_profile" drop column "employees";

alter table "public"."company_profile" drop column "work_environment";

alter table "public"."company_profile" drop column "work_type";

alter table "public"."profile" add column "user_email" text;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.profile 
  (id, name, keywords, area, avatar, href, user_type, user_email)
  values
  (
    new.id, 
    new.raw_user_meta_data->>'name',
    ARRAY(SELECT jsonb_array_elements_text(NEW.raw_user_meta_data->'keywords')),
    new.raw_user_meta_data->>'area',
    new.raw_user_meta_data->>'avatar',
    new.raw_user_meta_data->>'href',
    new.raw_user_meta_data->>'user_type',
    new.raw_user_meta_data->>'user_email'
  );

IF new.raw_user_meta_data->>'user_type' = 'company' THEN
    insert into public.company_profile 
    (id, contact, location)
    values
    (
      new.id, 
      new.raw_user_meta_data->>'contact',
      ARRAY(SELECT jsonb_array_elements_text(NEW.raw_user_meta_data->'location'))
    );
  end if;

  RETURN NEW;
end;
$function$
;


