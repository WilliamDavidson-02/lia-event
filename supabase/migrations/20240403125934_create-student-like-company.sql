create table "public"."student_like_company" (
    "id" uuid not null default gen_random_uuid(),
    "company_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "student_id" uuid not null
);


alter table "public"."student_like_company" enable row level security;

CREATE UNIQUE INDEX student_like_company_pkey ON public.student_like_company USING btree (id);

alter table "public"."student_like_company" add constraint "student_like_company_pkey" PRIMARY KEY using index "student_like_company_pkey";

alter table "public"."student_like_company" add constraint "student_like_company_company_id_fkey" FOREIGN KEY (company_id) REFERENCES company_profile(id) ON DELETE CASCADE not valid;

alter table "public"."student_like_company" validate constraint "student_like_company_company_id_fkey";

alter table "public"."student_like_company" add constraint "student_like_company_student_id_fkey" FOREIGN KEY (student_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."student_like_company" validate constraint "student_like_company_student_id_fkey";

grant delete on table "public"."student_like_company" to "anon";

grant insert on table "public"."student_like_company" to "anon";

grant references on table "public"."student_like_company" to "anon";

grant select on table "public"."student_like_company" to "anon";

grant trigger on table "public"."student_like_company" to "anon";

grant truncate on table "public"."student_like_company" to "anon";

grant update on table "public"."student_like_company" to "anon";

grant delete on table "public"."student_like_company" to "authenticated";

grant insert on table "public"."student_like_company" to "authenticated";

grant references on table "public"."student_like_company" to "authenticated";

grant select on table "public"."student_like_company" to "authenticated";

grant trigger on table "public"."student_like_company" to "authenticated";

grant truncate on table "public"."student_like_company" to "authenticated";

grant update on table "public"."student_like_company" to "authenticated";

grant delete on table "public"."student_like_company" to "service_role";

grant insert on table "public"."student_like_company" to "service_role";

grant references on table "public"."student_like_company" to "service_role";

grant select on table "public"."student_like_company" to "service_role";

grant trigger on table "public"."student_like_company" to "service_role";

grant truncate on table "public"."student_like_company" to "service_role";

grant update on table "public"."student_like_company" to "service_role";

create policy "Enable delete for users based on id"
on "public"."student_like_company"
as permissive
for delete
to public
using ((auth.uid() = student_id));


create policy "Enable insert for all"
on "public"."student_like_company"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."student_like_company"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on id"
on "public"."student_like_company"
as permissive
for update
to public
using ((auth.uid() = id))
with check ((auth.uid() = id));



