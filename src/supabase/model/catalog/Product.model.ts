export default interface ProductModel {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  status?: string;
  deleted?: boolean;

  user_id?: string;
  tenant_id?: string;
  category_id?: string;

  sale_delivery?: boolean;
  sale_pickup_in_store?: boolean;
  has_complements?: boolean;
  has_inventory?: boolean;
  qtd_inventory?: number;

  product_type?: string;
  name?: string;
  description?: string;
  disponibility?: string[];

  price?: number;
  cost_price?: number;
  discount?: number;
  discount_percent?: number;
}

export interface FileData {
  id?: number;
  uid?: string;
  extension: string;
  type: string;
  name: string;
  simpleName: string;
  size: number;
  base64: string | any;
}
