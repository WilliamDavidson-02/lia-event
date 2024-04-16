insert into "storage"."buckets" (id, name, public, file_size_limit, allowed_mime_types)
values (
    'avatars',
    'avatars',
    true,
    5242880,
    ARRAY['image/jpeg','image/png','image/webp','image/gif','image/jpg']
)