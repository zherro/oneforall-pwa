insert into gathu_posts (user_id, tenant_id, title, content, category_id, type, sub_type, reference_id, open_hours, extra_info) 
select 'a82748cd-7243-4c6a-9721-6885b5e2cdd4' user_id, 'a82748cd-7243-4c6a-9721-6885b5e2cdd4' tenant_id, p.name title, p.formatted_address content, 'bc858250-f1b6-4d59-b0cb-b44ca85fced4' category_id,
'places' type, 'bar' sub_type,  place_id reference_id, simplified_open_hours, 
jsonb_build_array(
  jsonb_build_object('version', 'v1', 'value', p.website, 'label', 'Site', 'type', 'link', 'id', uuid_generate_v4()),
  jsonb_build_object('version', 'v1', 'value', p.formatted_phone_number, 'label', 'Telefone', 'type', 'telefone', 'id', uuid_generate_v4()),
  jsonb_build_object('version', 'v1', 'value', p.formatted_address, 'label', 'Endereço', 'type', 'localizacao', 'id', uuid_generate_v4())
) extra_info
from gathu_places p 
where types::text like '%"bar"%'
and not exists ( select 1 from gathu_posts gp where p.place_id = gp.reference_id)


    SELECT
        id,
        opening_hours->'open_now' AS open_now,
        jsonb_agg(jsonb_build_object(
            'day', p.value->'open'->>'day',
            'open', p.value->'open'->>'time',
            'close', p.value->'close'->>'time'
        )) AS periods,
        opening_hours->'weekday_text' AS weekday_text
    FROM
        gathu_places,
        jsonb_array_elements(opening_hours::jsonb->'periods') AS p
    GROUP BY
        id, opening_hours::jsonb->'open_now', opening_hours::jsonb->'weekday_text'




 WITH extracted_data AS (
    SELECT
        id,
        place_id,
        opening_hours->'open_now' AS open_now,
        jsonb_agg(jsonb_build_object(
            'id',  uuid_generate_v4(), 
            'day', p.value->'open'->>'day',
            'open', p.value->'open'->>'time',
            'close', p.value->'close'->>'time'
        )) AS periods,
        opening_hours->'weekday_text' AS weekday_text
    FROM
        gathu_places,
        jsonb_array_elements(opening_hours::jsonb->'periods') AS p
    GROUP BY
        id, opening_hours::jsonb->'open_now', opening_hours::jsonb->'weekday_text'
)
UPDATE gathu_places
SET simplified_open_hours =  periods
FROM extracted_data
WHERE gathu_places.id = extracted_data.id;






 WITH extracted_data AS (
    SELECT
        id,
        place_id,
        opening_hours->'open_now' AS open_now,
        jsonb_agg(jsonb_build_object(
            'id',  uuid_generate_v4(), 
            'day', p.value->'open'->>'day',
            'open', p.value->'open'->>'time',
            'close', p.value->'close'->>'time'
        )) AS periods,
        opening_hours->'weekday_text' AS weekday_text
    FROM
        gathu_places,
        jsonb_array_elements(opening_hours::jsonb->'periods') AS p
    GROUP BY
        id, opening_hours::jsonb->'open_now', opening_hours::jsonb->'weekday_text'
)
UPDATE gathu_posts
SET open_hours =  periods
FROM extracted_data
WHERE gathu_posts.reference_id = extracted_data.place_id;


