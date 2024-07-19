import { StatusEntity } from "../types/Status.type";

export interface UserData {
  sub: string;
  email: string;
  tenant: {
    id: string;
    status: StatusEntity;
    user_id: string;
    avatar_url: string;
    company_name: string;
    company_short_name: string;
  };
  completed: boolean;
  email_verified: boolean;
  phone_verified: boolean;
}
