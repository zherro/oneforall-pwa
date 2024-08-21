-- public.profiles_onboard definition

-- Drop table

-- DROP TABLE public.profiles_onboard;

CREATE TABLE public.profiles_onboard (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamp DEFAULT now() NOT NULL,
	updated_at timestamp NULL,
	status varchar DEFAULT 'A'::character varying NOT NULL,
	deleted bool DEFAULT false NOT NULL,
	user_id uuid NOT NULL,
	steps jsonb NULL,
	CONSTRAINT profiles_onboard_pkey PRIMARY KEY (id)
);


alter table "profiles_onboard" enable row level security;

create policy "Enable read access for all authenticated users" on "public"."profiles_onboard" as permissive for select to authenticated using (true);