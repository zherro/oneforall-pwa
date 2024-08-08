-- public.categories definition

-- Drop table

-- DROP TABLE public.categories;

CREATE TABLE public.categories (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	user_id uuid DEFAULT auth.uid() NOT NULL,
	tenant_id uuid NOT NULL,
	created_at timestamp DEFAULT now() NOT NULL,
	updated_at timestamp NULL,
	status varchar DEFAULT 'A'::character varying NULL,
	deleted bool DEFAULT false NULL,
	name varchar NOT NULL,
	category_type varchar NOT NULL,
	info text NULL,
	disponibility jsonb NULL
);


alter table "categories" enable row level security;

create policy "Can insert own categories" on "public"."categories" as permissive for insert to authenticated with check (true);

create policy "Enable read access for own categories" on "public"."categories" as permissive for select to authenticated using (true);