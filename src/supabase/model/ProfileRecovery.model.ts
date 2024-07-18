import { StatusEntity } from "./types/Status.type";

export default interface ProfileRecoveryModel {
  id?: string;
  created_at?: Date;
  status?: StatusEntity;
  deleted?: boolean;
  updated_at?: Date | null;
  recovery_code: string;
  recovery_hash: string;
  email: string;
  used_at?: Date | null;
}
