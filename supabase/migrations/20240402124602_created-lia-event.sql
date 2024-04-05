create table "public"."company_profile" (
    "id" uuid not null default auth.uid(),
    "contact" text not null,
    "area" text[],
    "location" text[],
    "work_environment" text,
    "employees" text,
    "work_type" text,
    "avatar" text,
    "href" text
);


alter table "public"."company_profile" enable row level security;

create table "public"."profile" (
    "id" uuid not null default auth.uid(),
    "name" text,
    "keywords" text[]
);


alter table "public"."profile" enable row level security;

create table "public"."student_profile" (
    "id" uuid not null default auth.uid(),
    "program" text
);


alter table "public"."student_profile" enable row level security;

CREATE UNIQUE INDEX company_profile_pkey ON public.company_profile USING btree (id);

CREATE UNIQUE INDEX profile_pkey ON public.profile USING btree (id);

CREATE UNIQUE INDEX student_profile_pkey ON public.student_profile USING btree (id);

alter table "public"."company_profile" add constraint "company_profile_pkey" PRIMARY KEY using index "company_profile_pkey";

alter table "public"."profile" add constraint "profile_pkey" PRIMARY KEY using index "profile_pkey";

alter table "public"."student_profile" add constraint "student_profile_pkey" PRIMARY KEY using index "student_profile_pkey";

alter table "public"."company_profile" add constraint "company_profile_id_fkey" FOREIGN KEY (id) REFERENCES profile(id) ON DELETE CASCADE not valid;

alter table "public"."company_profile" validate constraint "company_profile_id_fkey";

alter table "public"."profile" add constraint "profile_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profile" validate constraint "profile_id_fkey";

alter table "public"."student_profile" add constraint "student_profile_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."student_profile" validate constraint "student_profile_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql security definer
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
    (id, program)
    values
    (
      new.id, 
      new.raw_user_meta_data->>'program'
    );
  end if;

  RETURN NEW;
end;
$function$
;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

grant delete on table "public"."company_profile" to "anon";

grant insert on table "public"."company_profile" to "anon";

grant references on table "public"."company_profile" to "anon";

grant select on table "public"."company_profile" to "anon";

grant trigger on table "public"."company_profile" to "anon";

grant truncate on table "public"."company_profile" to "anon";

grant update on table "public"."company_profile" to "anon";

grant delete on table "public"."company_profile" to "authenticated";

grant insert on table "public"."company_profile" to "authenticated";

grant references on table "public"."company_profile" to "authenticated";

grant select on table "public"."company_profile" to "authenticated";

grant trigger on table "public"."company_profile" to "authenticated";

grant truncate on table "public"."company_profile" to "authenticated";

grant update on table "public"."company_profile" to "authenticated";

grant delete on table "public"."company_profile" to "service_role";

grant insert on table "public"."company_profile" to "service_role";

grant references on table "public"."company_profile" to "service_role";

grant select on table "public"."company_profile" to "service_role";

grant trigger on table "public"."company_profile" to "service_role";

grant truncate on table "public"."company_profile" to "service_role";

grant update on table "public"."company_profile" to "service_role";

grant delete on table "public"."profile" to "anon";

grant insert on table "public"."profile" to "anon";

grant references on table "public"."profile" to "anon";

grant select on table "public"."profile" to "anon";

grant trigger on table "public"."profile" to "anon";

grant truncate on table "public"."profile" to "anon";

grant update on table "public"."profile" to "anon";

grant delete on table "public"."profile" to "authenticated";

grant insert on table "public"."profile" to "authenticated";

grant references on table "public"."profile" to "authenticated";

grant select on table "public"."profile" to "authenticated";

grant trigger on table "public"."profile" to "authenticated";

grant truncate on table "public"."profile" to "authenticated";

grant update on table "public"."profile" to "authenticated";

grant delete on table "public"."profile" to "service_role";

grant insert on table "public"."profile" to "service_role";

grant references on table "public"."profile" to "service_role";

grant select on table "public"."profile" to "service_role";

grant trigger on table "public"."profile" to "service_role";

grant truncate on table "public"."profile" to "service_role";

grant update on table "public"."profile" to "service_role";

grant delete on table "public"."student_profile" to "anon";

grant insert on table "public"."student_profile" to "anon";

grant references on table "public"."student_profile" to "anon";

grant select on table "public"."student_profile" to "anon";

grant trigger on table "public"."student_profile" to "anon";

grant truncate on table "public"."student_profile" to "anon";

grant update on table "public"."student_profile" to "anon";

grant delete on table "public"."student_profile" to "authenticated";

grant insert on table "public"."student_profile" to "authenticated";

grant references on table "public"."student_profile" to "authenticated";

grant select on table "public"."student_profile" to "authenticated";

grant trigger on table "public"."student_profile" to "authenticated";

grant truncate on table "public"."student_profile" to "authenticated";

grant update on table "public"."student_profile" to "authenticated";

grant delete on table "public"."student_profile" to "service_role";

grant insert on table "public"."student_profile" to "service_role";

grant references on table "public"."student_profile" to "service_role";

grant select on table "public"."student_profile" to "service_role";

grant trigger on table "public"."student_profile" to "service_role";

grant truncate on table "public"."student_profile" to "service_role";

grant update on table "public"."student_profile" to "service_role";

create policy "Enable delete for users based on user_id"
on "public"."company_profile"
as permissive
for delete
to public
using ((auth.uid() = id));


create policy "Enable insert for all users"
on "public"."company_profile"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."company_profile"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on user_id"
on "public"."company_profile"
as permissive
for update
to public
using ((auth.uid() = id))
with check ((auth.uid() = id));


create policy "Enable delete for users based on user_id"
on "public"."profile"
as permissive
for delete
to public
using ((auth.uid() = id));


create policy "Enable insert for all users"
on "public"."profile"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."profile"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on user_id"
on "public"."profile"
as permissive
for update
to public
using ((auth.uid() = id))
with check ((auth.uid() = id));


create policy "Enable delete for users based on user_id"
on "public"."student_profile"
as permissive
for delete
to public
using ((auth.uid() = id));


create policy "Enable insert for all users"
on "public"."student_profile"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."student_profile"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on user_id"
on "public"."student_profile"
as permissive
for update
to public
using ((auth.uid() = id))
with check ((auth.uid() = id));



