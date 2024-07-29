
CREATE OR REPLACE FUNCTION func_remove_acentos_lowercase(text)
 RETURNS text
 LANGUAGE plpgsql
 IMMUTABLE
AS $function$
DECLARE
    original text[] := ARRAY[
        'á', 'é', 'í', 'ó', 'ú', 'â', 'ê', 'î', 'ô', 'û', 'ã', 'õ', 'ç', 'à', 'è', 'ì', 'ò', 'ù', 'ç',
        'Á', 'É', 'Í', 'Ó', 'Ú', 'Â', 'Ê', 'Î', 'Ô', 'Û', 'Ã', 'Õ', 'Ç', 'À', 'È', 'Ì', 'Ò', 'Ù', 'Ç'
    ];
    sem_acento text[] := ARRAY[
        'a', 'e', 'i', 'o', 'u', 'a', 'e', 'i', 'o', 'u', 'a', 'o', 'c', 'a', 'e', 'i', 'o', 'u', 'c',
        'A', 'E', 'I', 'O', 'U', 'A', 'E', 'I', 'O', 'U', 'A', 'O', 'C', 'A', 'E', 'I', 'O', 'U', 'C'
    ];
    resultado text := $1;
BEGIN
    FOR i IN 1 .. array_length(original, 1) LOOP
        resultado := lower(replace(resultado, original[i], sem_acento[i]));
    END LOOP;
    RETURN resultado;
END;
$function$
;



CREATE OR REPLACE FUNCTION func_remove_acentos(text)
 RETURNS text
 LANGUAGE plpgsql
 IMMUTABLE
AS $function$
DECLARE
    original text[] := ARRAY[
        'á', 'é', 'í', 'ó', 'ú', 'â', 'ê', 'î', 'ô', 'û', 'ã', 'õ', 'ç', 'à', 'è', 'ì', 'ò', 'ù', 'ç',
        'Á', 'É', 'Í', 'Ó', 'Ú', 'Â', 'Ê', 'Î', 'Ô', 'Û', 'Ã', 'Õ', 'Ç', 'À', 'È', 'Ì', 'Ò', 'Ù', 'Ç'
    ];
    sem_acento text[] := ARRAY[
        'a', 'e', 'i', 'o', 'u', 'a', 'e', 'i', 'o', 'u', 'a', 'o', 'c', 'a', 'e', 'i', 'o', 'u', 'c',
        'A', 'E', 'I', 'O', 'U', 'A', 'E', 'I', 'O', 'U', 'A', 'O', 'C', 'A', 'E', 'I', 'O', 'U', 'C'
    ];
    resultado text := $1;
BEGIN
    FOR i IN 1 .. array_length(original, 1) LOOP
        resultado := replace(resultado, original[i], sem_acento[i]);
    END LOOP;
    RETURN resultado;
END;
$function$
;


-- ALTER TABLE gathu_posts
-- ADD COLUMN ts_query_search text
-- GENERATED ALWAYS AS (
--     func_remove_acentos_lowercase(title::text) || ' |J01N| ' || 
--     func_remove_acentos_lowercase(title::text) || ' |J01N| ' || 
--     func_remove_acentos_lowercase(tags::text)
-- ) STORED;













CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE OR REPLACE FUNCTION remove_acentos_lowercase(text)
RETURNS text AS $$
BEGIN
    RETURN lower(unaccent($1));
END;
$$ LANGUAGE plpgsql;


-- SELECT remove_acentos_lowercase('Olá, Mundo!');
