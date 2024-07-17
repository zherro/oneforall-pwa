-- public.gathu_posts definition

-- Drop table

-- DROP TABLE public.gathu_posts;

CREATE TABLE public.gathu_posts (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamp DEFAULT now() NOT NULL,
	updated_at timestamp NULL,
	status varchar DEFAULT 'A'::character varying NOT NULL,
	deleted bool DEFAULT false NOT NULL,
	user_id uuid DEFAULT auth.uid() NULL,
	tenant_id uuid DEFAULT auth.uid() NULL,
	title varchar NULL,
	"content" text NULL,
	category_id uuid NULL,
	tags text NULL,
	image varchar NULL,
	slug varchar NULL,
	published_at timestamp NULL,
	unpublised_at timestamp NULL,
	event_date date NULL,
	img_thumbnail text NULL,
	files json NULL,
	"version" integer NOT NULL DEFAULT 0,
	CONSTRAINT gathu_posts_pkey PRIMARY KEY (id)
);

alter table "gathu_posts" enable row level security;

create policy "Can insert any post" on "public"."gathu_posts" as permissive for insert to authenticated with check (true);

create policy "Can list tenant posts" on "public"."gathu_posts" as permissive for select to authenticated using (use_has_tenant(auth.uid(), tenant_id));

create policy "Can update tenant posts" on "public"."gathu_posts" as permissive for update to authenticated using (use_has_tenant(auth.uid(), tenant_id));

create policy "Get published posts" on "public"."gathu_posts" as permissive for select to anon using (((status)::text = 'P'::text));

-- ALTER TABLE gathu_posts DROP COLUMN ts_query_search;

-- ALTER TABLE gathu_posts
-- ADD COLUMN ts_query_search text
-- GENERATED ALWAYS AS (
--     func_remove_acentos_lowercase(title::text) || ' |J01N| ' || 
--     func_remove_acentos_lowercase(content::text) || ' |J01N| ' || 
--     func_remove_acentos_lowercase(tags::text)
-- ) STORED;



drop view gathu_vw_published_posts;

create or replace view gathu_vw_published_posts 
AS
select 
	gp.id,
	(DATE(coalesce(gp.event_date, now())) >= now())  open_date,
	gp.category_id,
	gc."name" category,
	gc.type category_type,
	gp.created_at,
	gp.updated_at,
	gp.status,
	gp.deleted,
	gp.user_id,
	gp.tenant_id,
	gp.title,
	gp."content",
	gp.tags,
	gp.image,
	gp.slug,
	gp.published_at,
	gp.unpublised_at,
	gp.event_date,
	gp.img_thumbnail,
	gp.files,
	gp.prices,
	gp."version",
	gp.type,
	tsv_search,
	case 
    when gp.type = 'cinema' then exists (
                        SELECT 1
                        FROM jsonb_array_elements(gp.prices::jsonb) AS elem
                        WHERE elem->>'status' IN ('esgotado', 'em_cartaz', 'em_breve') limit 1
                    )
  else true end as will_happen
from
	public.gathu_posts gp
inner join gatu_categories gc on gc.id  = gp.category_id
where gp.status = 'P'
and gp.deleted  = false;
