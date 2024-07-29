import { StatusEntity } from "../types/Status.type";

export interface StoreMenuFile {
  id?: number;
  created_at?: Date;
  updated_at?: Date;

  status?: StatusEntity;
  deleted?: boolean;

  store_id: string;
  file_path: string;

  write_status?: string;
  writed_by?: string;
  writed_at?: Date;
}
