import { SupabaseModel } from "../model";

export default interface CategoryModel extends SupabaseModel {
  tenant_id?: string;
  name?: string;
  category_type?: string;
  info?: string;
  disponibility?: string;
}
