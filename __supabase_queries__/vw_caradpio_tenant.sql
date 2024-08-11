create or replace view vw_cardapio_tenant as
select 
  c.id category_id, c.name category, c.status category_status, c.category_type, c.tenant_id,
  p.id product_id, p.name product, p.status product_status, p.qtd_inventory, coalesce(p.price, 0) - coalesce(p.discount, 0) as price,
  p.tsv_search
from categories c
left join products p on p.category_id = c.id;
