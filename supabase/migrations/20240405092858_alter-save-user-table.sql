drop policy "Enable delete for users based on id" on "public"."student_like_company";

drop policy "Enable insert for all" on "public"."student_like_company";

drop policy "Enable read access for all users" on "public"."student_like_company";

drop policy "Enable update for users based on id" on "public"."student_like_company";

revoke delete on table "public"."student_like_company" from "anon";

revoke insert on table "public"."student_like_company" from "anon";

revoke references on table "public"."student_like_company" from "anon";

revoke select on table "public"."student_like_company" from "anon";

revoke trigger on table "public"."student_like_company" from "anon";

revoke truncate on table "public"."student_like_company" from "anon";

revoke update on table "public"."student_like_company" from "anon";

revoke delete on table "public"."student_like_company" from "authenticated";

revoke insert on table "public"."student_like_company" from "authenticated";

revoke references on table "public"."student_like_company" from "authenticated";

revoke select on table "public"."student_like_company" from "authenticated";

revoke trigger on table "public"."student_like_company" from "authenticated";

revoke truncate on table "public"."student_like_company" from "authenticated";

revoke update on table "public"."student_like_company" from "authenticated";

revoke delete on table "public"."student_like_company" from "service_role";

revoke insert on table "public"."student_like_company" from "service_role";

revoke references on table "public"."student_like_company" from "service_role";

revoke select on table "public"."student_like_company" from "service_role";

revoke trigger on table "public"."student_like_company" from "service_role";

revoke truncate on table "public"."student_like_company" from "service_role";

revoke update on table "public"."student_like_company" from "service_role";

alter table "public"."student_like_company" drop constraint "student_like_company_company_id_fkey";

alter table "public"."student_like_company" drop constraint "student_like_company_student_id_fkey";

alter table "public"."student_like_company" drop constraint "student_like_company_pkey";

drop index if exists "public"."student_like_company_pkey";

drop table "public"."student_like_company";

create table "public"."saved_users" (
    "id" uuid not null default gen_random_uuid(),
    "saved_id" uuid not null,
    "user_id" uuid not null
);


alter table "public"."saved_users" enable row level security;

CREATE UNIQUE INDEX student_like_company_pkey ON public.saved_users USING btree (id);

alter table "public"."saved_users" add constraint "student_like_company_pkey" PRIMARY KEY using index "student_like_company_pkey";

alter table "public"."saved_users" add constraint "saved_users_saved_id_fkey" FOREIGN KEY (saved_id) REFERENCES profile(id) ON DELETE CASCADE not valid;

alter table "public"."saved_users" validate constraint "saved_users_saved_id_fkey";

alter table "public"."saved_users" add constraint "saved_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."saved_users" validate constraint "saved_users_user_id_fkey";

grant delete on table "public"."saved_users" to "anon";

grant insert on table "public"."saved_users" to "anon";

grant references on table "public"."saved_users" to "anon";

grant select on table "public"."saved_users" to "anon";

grant trigger on table "public"."saved_users" to "anon";

grant truncate on table "public"."saved_users" to "anon";

grant update on table "public"."saved_users" to "anon";

grant delete on table "public"."saved_users" to "authenticated";

grant insert on table "public"."saved_users" to "authenticated";

grant references on table "public"."saved_users" to "authenticated";

grant select on table "public"."saved_users" to "authenticated";

grant trigger on table "public"."saved_users" to "authenticated";

grant truncate on table "public"."saved_users" to "authenticated";

grant update on table "public"."saved_users" to "authenticated";

grant delete on table "public"."saved_users" to "service_role";

grant insert on table "public"."saved_users" to "service_role";

grant references on table "public"."saved_users" to "service_role";

grant select on table "public"."saved_users" to "service_role";

grant trigger on table "public"."saved_users" to "service_role";

grant truncate on table "public"."saved_users" to "service_role";

grant update on table "public"."saved_users" to "service_role";

create policy "Enable delete for users based on user_id"
on "public"."saved_users"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Enable insert for all"
on "public"."saved_users"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."saved_users"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on user_id"
on "public"."saved_users"
as permissive
for update
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



