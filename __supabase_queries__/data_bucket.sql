-- public.data_bucket definition

-- Drop table

-- DROP TABLE public.data_bucket;

CREATE TABLE public.data_bucket (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamp DEFAULT now() NOT NULL,
	updated_at timestamp NULL,
	status varchar DEFAULT 'A'::character varying NOT NULL,
	deleted bool DEFAULT false NOT NULL,
	user_id uuid DEFAULT auth.uid() NOT NULL,
	tenant_id uuid NOT NULL,
	file_path varchar NULL,
	"extension" varchar NULL,
	"type" varchar NULL,
	"name" varchar NULL,
	simple_name varchar NULL,
	"size" int8 NULL,
	"base64" text NULL,
	parent_id uuid NULL,
	CONSTRAINT data_bucket_pkey PRIMARY KEY (id)
);

alter table "data_bucket" enable row level security;

create policy "Users can send own data files" on "public"."data_bucket" as permissive for insert to public with check ((( SELECT uid() AS uid) = user_id));

create policy "Can get tenants data files" on "public"."data_bucket" as permissive for select to authenticated using (public.use_has_tenant(auth.uid(), tenant_id));

create policy "Get data bucket " on "public"."data_bucket" as permissive for select to public using (true);

