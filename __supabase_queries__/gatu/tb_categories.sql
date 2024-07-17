-- public.gatu_categories definition

-- Drop table

-- DROP TABLE public.gatu_categories;

CREATE TABLE public.gatu_categories (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamp DEFAULT now() NOT NULL,
	updated_at timestamp NULL,
	status varchar DEFAULT 'A'::character varying NOT NULL,
	deleted bool DEFAULT false NOT NULL,
	tenant_id uuid DEFAULT auth.uid() NOT NULL,
	user_id uuid DEFAULT auth.uid() NULL,
	name varchar NOT NULL,
	slug varchar NOT NULL,
	description varchar NULL,
	"type" varchar NOT NULL,
	icon varchar NULL,
	image varchar NULL,
	tags json NULL,
	CONSTRAINT gatu_categories_pkey PRIMARY KEY (id)
);

alter table "gatu_categories" enable row level security;

create policy "Can insert any category" on "public"."gatu_categories" as permissive for insert to authenticated with check (true);

create policy "Can list tenant categories" on "public"."gatu_categories" as permissive for select to authenticated using (use_has_tenant(auth.uid(), tenant_id));

create policy "Can update tenant categories" on "public"."gatu_categories" as permissive for update to authenticated using (use_has_tenant(auth.uid(), tenant_id));
