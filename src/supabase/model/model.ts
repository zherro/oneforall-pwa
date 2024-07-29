import { StatusEntity } from "./types/Status.type";

export interface SupabaseModel {
  id?: string | number;
  uid?: string;
  created_at?: Date;
  updated_at?: Date;
  status?: StatusEntity;
  deleted?: boolean;
  user_id?: string;
}
