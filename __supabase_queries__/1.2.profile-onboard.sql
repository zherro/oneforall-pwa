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

create policy "Users can insert their own profiles_onboard." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profiles_onboard." on profiles
  for update using ((select auth.uid()) = id);

-- DROP FUNCTION fun_update_welcome_task;

CREATE OR REPLACE FUNCTION fun_update_welcome_task(p_user_id uuid, p_task_id text) 
RETURNS void AS $$
BEGIN
    UPDATE profiles_onboard
    SET steps = (
        SELECT jsonb_agg(
            CASE 
                WHEN elem->>'id' = p_task_id THEN
                    jsonb_set(
                        jsonb_set(elem, '{completed}', 'true'::jsonb),
                        '{completedAt}', to_jsonb(now())
                    )
                ELSE
                    elem
            END
        )
        FROM jsonb_array_elements(steps) AS elem
    )
    WHERE profiles_onboard.user_id = p_user_id
    AND EXISTS (
        SELECT 1
        FROM jsonb_array_elements(steps) AS elem
        WHERE elem->>'id' = p_task_id AND (elem->>'completed')::boolean = false
    );
END;
$$ LANGUAGE plpgsql;

-- Exemplo de uso:
-- SELECT update_task_status_by_user_id('user-uuid', 'complete-your-profile');





CREATE OR REPLACE FUNCTION fun_update_welcome_task_complete_your_profile()
RETURNS trigger AS $$
DECLARE
    dynamic_table_name text := 'profiles';  -- Nome da tabela estático ou definido por outra lógica
    task_id text := 'complete_your_profile';  -- ID da tarefa estático ou definido por outra lógica
    query text;
    result_exists boolean;
BEGIN
    -- Construindo a query dinâmica para verificar a condição
    query := format('
        SELECT 1 
        FROM %I 
        WHERE id = %L 
        AND onboard = false
    ', dynamic_table_name, NEW.id);

    -- Executa a consulta dinâmica e armazena o resultado
    EXECUTE query INTO result_exists;

    -- Verifique a condição na tabela dinâmica
    IF result_exists THEN
        -- Chama a função de atualização se a condição for atendida
        PERFORM fun_update_welcome_task(NEW.id::uuid, task_id::text);

        -- Atualiza o campo 'onboard' para true na tabela dinâmica
        query := format('
            UPDATE %I
            SET onboard = true
            WHERE id = %L
        ', dynamic_table_name, NEW.id);
        EXECUTE query;
    END IF;
    
    -- Retorna NEW para prosseguir com o update na tabela original
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_onboard_complete_your_profile
AFTER UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION fun_update_welcome_task_complete_your_profile();