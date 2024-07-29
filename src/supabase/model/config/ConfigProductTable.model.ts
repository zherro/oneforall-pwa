import { SupabaseModel } from "../model";

export interface ConfigProductTableModel extends SupabaseModel {
  name?: string;
  image_url?: string;
  description?: string;
  ncm?: string;
}
