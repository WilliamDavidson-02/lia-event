drop policy "Enable delete for users based on user_id" on "public"."student_profile";

drop policy "Enable insert for all users" on "public"."student_profile";

drop policy "Enable read access for all users" on "public"."student_profile";

drop policy "Enable update for users based on user_id" on "public"."student_profile";

revoke delete on table "public"."student_profile" from "anon";

revoke insert on table "public"."student_profile" from "anon";

revoke references on table "public"."student_profile" from "anon";

revoke select on table "public"."student_profile" from "anon";

revoke trigger on table "public"."student_profile" from "anon";

revoke truncate on table "public"."student_profile" from "anon";

revoke update on table "public"."student_profile" from "anon";

revoke delete on table "public"."student_profile" from "authenticated";

revoke insert on table "public"."student_profile" from "authenticated";

revoke references on table "public"."student_profile" from "authenticated";

revoke select on table "public"."student_profile" from "authenticated";

revoke trigger on table "public"."student_profile" from "authenticated";

revoke truncate on table "public"."student_profile" from "authenticated";

revoke update on table "public"."student_profile" from "authenticated";

revoke delete on table "public"."student_profile" from "service_role";

revoke insert on table "public"."student_profile" from "service_role";

revoke references on table "public"."student_profile" from "service_role";

revoke select on table "public"."student_profile" from "service_role";

revoke trigger on table "public"."student_profile" from "service_role";

revoke truncate on table "public"."student_profile" from "service_role";

revoke update on table "public"."student_profile" from "service_role";

alter table "public"."student_profile" drop constraint "student_profile_id_fkey";

alter table "public"."student_profile" drop constraint "student_profile_pkey";

drop index if exists "public"."student_profile_pkey";

drop table "public"."student_profile";

alter table "public"."company_profile" drop column "area";

alter table "public"."company_profile" drop column "avatar";

alter table "public"."company_profile" drop column "href";

alter table "public"."profile" add column "area" text;

alter table "public"."profile" add column "avatar" text;

alter table "public"."profile" add column "href" text;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.profile 
  (id, name, keywords, area, avatar, href)
  values
  (
    new.id, 
    new.raw_user_meta_data->>'name',
    ARRAY(SELECT jsonb_array_elements_text(NEW.raw_user_meta_data->'keywords')),
    new.raw_user_meta_data->>'area',
    new.raw_user_meta_data->>'avatar',
    new.raw_user_meta_data->>'href'
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


