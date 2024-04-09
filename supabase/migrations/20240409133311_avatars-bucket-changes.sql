drop policy "Edit Image 1oj01fe_0" on "storage"."objects";

drop policy "Edit Image 1oj01fe_1" on "storage"."objects";

drop policy "Edit Image 1oj01fe_2" on "storage"."objects";

drop policy "Edit Image 1oj01fe_3" on "storage"."objects";

create policy "Edit Image 1oj01fe_0"
on "storage"."objects"
as permissive
for insert
to authenticated
with check ((bucket_id = 'avatars'::text));


create policy "Edit Image 1oj01fe_1"
on "storage"."objects"
as permissive
for update
to authenticated
using ((bucket_id = 'avatars'::text));


create policy "Edit Image 1oj01fe_2"
on "storage"."objects"
as permissive
for delete
to authenticated
using ((bucket_id = 'avatars'::text));


create policy "Edit Image 1oj01fe_3"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'avatars'::text));

