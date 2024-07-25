--RLS policies (4 for each table)
--replace table_name with your table's name
alter table public.table_name enable row level security;

create policy "Enable read for authenticated users" 
on table_name
for select
to authenticated
using (
    exists(
        select 1
        from rbac.granular_permissions gp
        where 
          gp.user_id = auth.uid() --Supabase specific function
          and gp.permission = 'SELECT on TABLE_NAME'
    )
);

create policy "Enable insert for authenticated users" 
on table_name
for insert
to authenticated
with check (
    exists(
        select 1
        from rbac.granular_permissions gp
        where 
          gp.user_id = auth.uid() --Supabase specific function
          and gp.permission = 'INSERT on TABLE_NAME'
    )
);

create policy "Enable update for authenticated users" 
on table_name
for update
to authenticated
using (
    exists(
        select 1
        from rbac.granular_permissions gp
        where 
          gp.user_id = auth.uid() --Supabase specific function
          and gp.permission = 'UPDATE on TABLE_NAME'
    )
)
with check (
    exists(
        select 1
        from rbac.granular_permissions gp
        where 
          gp.user_id = auth.uid() --Supabase specific function
          and gp.permission = 'UPDATE on TABLE_NAME'
    )
);

create policy "Enable delete for authenticated users" 
on table_name
for update
to authenticated
using (
    exists(
        select 1
        from rbac.granular_permissions gp
        where 
          gp.user_id = auth.uid() --Supabase specific function
          and gp.permission = 'DELETE on TABLE_NAME'
    )
);