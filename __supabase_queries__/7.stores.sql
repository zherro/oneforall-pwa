

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


CREATE TRIGGER auto_insert_tenant_store_owner AFTER INSERT ON public.stores  
FOR EACH ROW  EXECUTE PROCEDURE auto_insert_tenant();