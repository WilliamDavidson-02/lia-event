create policy "Edit Image 1oj01fe_0"
on "storage"."objects"
as permissive
for insert
to authenticated, supabase_functions_admin, supabase_replication_admin
with check ((bucket_id = 'avatars'::text));


create policy "Edit Image 1oj01fe_1"
on "storage"."objects"
as permissive
for update
to authenticated, supabase_functions_admin, supabase_replication_admin
using ((bucket_id = 'avatars'::text));


create policy "Edit Image 1oj01fe_2"
on "storage"."objects"
as permissive
for delete
to authenticated, supabase_functions_admin, supabase_replication_admin
using ((bucket_id = 'avatars'::text));


create policy "Edit Image 1oj01fe_3"
on "storage"."objects"
as permissive
for select
to authenticated, supabase_functions_admin, supabase_replication_admin
using ((bucket_id = 'avatars'::text));


create policy "Image Viewing 1oj01fe_0"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'avatars'::text));



