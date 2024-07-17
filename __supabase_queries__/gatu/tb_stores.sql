-- public.lara_stores definition

-- Drop table

-- DROP TABLE public.lara_stores;

CREATE TABLE public.lara_stores (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamp DEFAULT now() NOT NULL,
	updated_at timestamp NULL,
	status varchar DEFAULT 'A'::character varying NOT NULL,
	deleted bool DEFAULT false NOT NULL,
	created_by uuid DEFAULT auth.uid() NOT NULL,
	person_type varchar DEFAULT 'PJ'::character varying NOT NULL,
	document_number varchar NULL,
	document_owner varchar NOT NULL,
	company_name varchar NULL,
	company_short_name varchar NOT NULL,
	market_type varchar NOT NULL,
	avatar_url text NULL,
	CONSTRAINT lara_stores_pkey PRIMARY KEY (id)
);

alter table "lara_stores" enable row level security;

create policy "Users can create your own stores" on "public"."lara_stores" as permissive for insert to authenticated with check (true);

-- DROP FUNCTION public.auto_insert_tenant();

CREATE OR REPLACE FUNCTION public.auto_insert_tenant()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
	INSERT INTO public.tenants
	(id, created_at, updated_at, status, deleted, tenant_id, user_id, owner_id)
	VALUES(gen_random_uuid(), now(), now(), 'A', false, new.id, new.created_by, auth.uid());

    RETURN new;
END;
$function$
;


CREATE TRIGGER auto_insert_tenant_store_owner
 AFTER INSERT ON public.lara_stores
 FOR EACH ROW
 EXECUTE PROCEDURE auto_insert_tenant();

