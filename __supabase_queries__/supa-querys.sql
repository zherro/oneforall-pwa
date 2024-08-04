# deletar user


delete from public.profiles
where
  email ilike 'cleiton.ti%';

DELETE FROM auth.users
WHERE
  email ilike 'cleiton.ti%';


delete from public.profiles
where
  email ilike 'zhero.sub%';

DELETE FROM auth.users
WHERE
  email ilike 'zhero.sub%';
