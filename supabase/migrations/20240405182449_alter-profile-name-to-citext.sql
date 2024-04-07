create extension if not exists "citext" with schema "public" version '1.6';

alter table "public"."profile" alter column "name" set data type citext using "name"::citext;


