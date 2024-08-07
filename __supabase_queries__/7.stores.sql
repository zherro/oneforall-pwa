
-- public.stores definition

-- Drop table

-- DROP TABLE public.stores;

CREATE TABLE public.stores (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamp DEFAULT now() NOT NULL,
	updated_at timestamp NULL,
	status varchar DEFAULT 'A'::character varying NULL,
	deleted bool DEFAULT false NULL,
	"name" varchar NULL,
	market_type varchar NULL,
	person_type varchar NULL,
	document_number varchar NOT NULL,
	document_number_owner varchar NULL,
	user_id uuid DEFAULT auth.uid() NOT NULL,
	tenant_id uuid DEFAULT gen_random_uuid() NOT NULL,
	CONSTRAINT stores_pkey PRIMARY KEY (id)
);

-- Table Triggers

create trigger auto_insert_tenant_store_owner after
insert
    on
    public.stores for each row execute function auto_insert_tenant();



alter table "stores" enable row level security;


CREATE OR REPLACE FUNCTION public.auto_insert_tenant()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
	INSERT INTO public.tenants
	(id, created_at, updated_at, status, deleted, tenant_id, user_id, owner_id)
	VALUES(new.id, now(), now(), 'A', false, new.id, auth.uid(), auth.uid());

    RETURN new;
END;
$function$
;

create policy "Can update own store" on "public"."stores" as permissive for update to public using ((( SELECT uid() AS uid) = user_id));
create policy "Enable insert for users based on user_id" on "public"."stores" as permissive for insert to public with check ((( SELECT uid() AS uid) = user_id));
create policy "Public select stores" on "public"."stores" as permissive for select to anon, authenticated using (true);
