-- public.tenants definition

-- Drop table

-- DROP TABLE public.tenants;

CREATE TABLE public.tenants (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamp DEFAULT now() NOT NULL,
	updated_at timestamp NULL,
	status varchar DEFAULT 'A'::character varying NOT NULL,
	deleted bool DEFAULT false NOT NULL,
	tenant_id uuid NULL,
	user_id uuid NULL,
	owner_id uuid DEFAULT auth.uid() NULL,
	CONSTRAINT tenants_pkey PRIMARY KEY (id)
);

-- DROP FUNCTION public.auto_insert_tenant();

CREATE OR REPLACE FUNCTION public.auto_insert_tenant()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
	INSERT INTO public.tenants
	(id, created_at, updated_at, status, deleted, tenant_id, user_id, owner_id)
	VALUES(new.id, now(), now(), 'A', false, new.tenant_id, auth.uid(), auth.uid());

    RETURN new;
END;
$function$
;


-- DROP FUNCTION public.get_user_tenants();

CREATE OR REPLACE FUNCTION public.get_user_tenants()
 RETURNS TABLE(id text, status text, company_name text, company_short_name text, avatar_url text, user_id text)
 LANGUAGE sql
AS $function$  
  	select ls.id, ls.status, ls.company_name, ls.company_short_name, ls.avatar_url, auth.uid() as user_id
 	from lara_stores ls 
 	inner join tenants t on ls.id = t.tenant_id and t.user_id = auth.uid();
$function$
;

-- DROP FUNCTION public.get_user_tenants_has_actives();

CREATE OR REPLACE FUNCTION public.get_user_tenants_has_actives()
 RETURNS bool
 LANGUAGE sql
AS $function$  
  	select exists(select 1 from lara_stores ls 
 	inner join tenants t on ls.id = t.tenant_id and t.user_id = auth.uid());
$function$
;

-- select get_user_tenants_has_actives()


-- DROP FUNCTION public.use_has_tenant;

CREATE OR REPLACE FUNCTION public.use_has_tenant(p_user_id uuid, p_tenant_id uuid)
 RETURNS boolean
 LANGUAGE sql
AS $function$  
  	 select exists(select 1 from public.tenants t where t.tenant_id = p_tenant_id and t.user_id = p_user_id);
$function$
;


select  use_has_tenant(gen_random_uuid(), gen_random_uuid());


-- DROP FUNCTION public.auto_create_user_tenant();

CREATE OR REPLACE FUNCTION public.auto_create_user_tenant()
 RETURNS void
 LANGUAGE sql
AS $function$
 INSERT INTO public.tenants
	(created_at, updated_at, status, deleted, tenant_id, user_id, owner_id, id)
	SELECT now(), null, 'A'::character varying, false,  auth.uid(),  auth.uid(), auth.uid(), gen_random_uuid()
	FROM (select coalesce((select t.tenant_id::varchar from public.tenants t where  t.tenant_id = auth.uid() AND  t.user_id = auth.uid()), 'no_tenant') tenant ) a
	where a.tenant = 'no_tenant';
$function$
;


-- DROP FUNCTION public.get_user_individual_tenant();

CREATE OR REPLACE FUNCTION public.get_user_individual_tenant()
 RETURNS TABLE(id text, status text, company_name text, company_short_name text, avatar_url text, user_id text)
 LANGUAGE sql
AS $function$  
  	select t.id, t.status, '', p.username , p.avatar_url , t.user_id
 	from public.tenants t 
 	inner join public.profiles p on p.id = t.user_id
	where t.tenant_id = auth.uid() and t.user_id = auth.uid()
	and t.status = 'A' and t.deleted = false;
$function$
