--create schema
create schema if not exists rbac;


--create tables
create table if not exists rbac.role(
  id UUID DEFAULT gen_random_uuid() primary key,
  name TEXT NOT NULL,
  description TEXT NULL,
  active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NULL,
  deleted_at TIMESTAMPTZ NULL
);

create table if not exists rbac.permission(
  id UUID DEFAULT gen_random_uuid() primary key,
  type TEXT NOT NULL, --select or insert or update or delete
  object TEXT NOT NULL, --table name
  action TEXT GENERATED ALWAYS AS (type || ' on ' || object) STORED,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NULL,
  deleted_at TIMESTAMPTZ NULL
);

create table if not exists rbac.role_permission(
  role_id UUID NOT NULL REFERENCES rbac.role(id),
  permission_id UUID NOT NULL REFERENCES rbac.permission(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NULL,
  deleted_at TIMESTAMPTZ NULL,
  
  PRIMARY KEY(role_id, permission_id)
);

create table if not exists rbac.user_role(
  user_id UUID NOT NULL REFERENCES auth.users(id), --Supabase specific field
  role_id UUID NOT NULL REFERENCES rbac.role(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NULL,
  deleted_at TIMESTAMPTZ NULL,
  
  PRIMARY KEY(user_id, role_id)
);


--create view to make RLS easier/readable
create or replace view rbac.granular_permissions as 
select

  ur.user_id as user_id,
  r.name as role,
  p.action as permission

from rbac.permission p

left join rbac.role_permission rp on
  rp.permission_id = p.id

left join rbac.role r on
  r.id = rp.role_id

left join rbac.user_role ur on
  ur.role_id = r.id
  
where 
  (r.active = true and r.deleted_at is null)
  and ur.deleted_at is null
  and rp.deleted_at is null
  and p.deleted_at is null;




  