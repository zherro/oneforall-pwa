import { StatusEntity } from "./types/Status.type";

export default interface ProfileClaimModel {
  id?: string;
  user_id?: string;
  created_at?: Date;
  status?: StatusEntity;
  deleted?: boolean;
  updated_at?: Date | null;

  created_by?: string;
  claim?: string;
  info?: string;
}
