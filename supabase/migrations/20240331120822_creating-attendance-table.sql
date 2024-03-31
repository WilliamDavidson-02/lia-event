create table "public"."attendance" (
    "id" uuid not null default auth.uid(),
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."attendance" enable row level security;

CREATE UNIQUE INDEX attendance_pkey ON public.attendance USING btree (id);

alter table "public"."attendance" add constraint "attendance_pkey" PRIMARY KEY using index "attendance_pkey";

grant delete on table "public"."attendance" to "anon";

grant insert on table "public"."attendance" to "anon";

grant references on table "public"."attendance" to "anon";

grant select on table "public"."attendance" to "anon";

grant trigger on table "public"."attendance" to "anon";

grant truncate on table "public"."attendance" to "anon";

grant update on table "public"."attendance" to "anon";

grant delete on table "public"."attendance" to "authenticated";

grant insert on table "public"."attendance" to "authenticated";

grant references on table "public"."attendance" to "authenticated";

grant select on table "public"."attendance" to "authenticated";

grant trigger on table "public"."attendance" to "authenticated";

grant truncate on table "public"."attendance" to "authenticated";

grant update on table "public"."attendance" to "authenticated";

grant delete on table "public"."attendance" to "service_role";

grant insert on table "public"."attendance" to "service_role";

grant references on table "public"."attendance" to "service_role";

grant select on table "public"."attendance" to "service_role";

grant trigger on table "public"."attendance" to "service_role";

grant truncate on table "public"."attendance" to "service_role";

grant update on table "public"."attendance" to "service_role";

create policy "Enable delete for users based on id"
on "public"."attendance"
as permissive
for delete
to public
using ((auth.uid() = id));


create policy "Enable insert for authenticated users only"
on "public"."attendance"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."attendance"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on id"
on "public"."attendance"
as permissive
for update
to public
using ((auth.uid() = id))
with check ((auth.uid() = id));



