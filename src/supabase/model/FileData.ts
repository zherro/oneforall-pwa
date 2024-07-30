import { StatusEntity } from "./types/Status.type";

export interface FileData {
  id?: number;
  extension: string;
  type: string;
  name: string;
  simple_name: string;
  size: number;
  base64: string | any;

  user_id?: string;
  tenant_id?: string;
  parent_id?: string;
  file_path: string;

  created_at?: Date;
  updated_at?: Date;

  status?: StatusEntity;
  deleted?: boolean;
}
