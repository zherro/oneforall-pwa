export interface ProductDTO {
  category_id: string;
  category: string;
  category_status: string;
  category_type: string;
  tenant_id: string;
  product_id: string | null;
  product: string | null;
  product_status: string | null;
  qtd_inventory: number | null;
  price: number;
}

export interface GroupedCategoryDTO {
  category_id: string;
  category: string;
  category_status: string;
  category_type: string;
  tenant_id: string;
  products: ProductDTO[];
}
