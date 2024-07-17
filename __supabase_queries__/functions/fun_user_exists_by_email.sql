create or replace function fun_exists_user_by_email(user_email text) returns bool
LANGUAGE "plpgsql" SECURITY Invoker SET search_path = public
AS $$
begin
  return (select exists(select id from auth.users where email = user_email) as exists_user);
end;
$$;
