import { CompanyTenantyDTO } from "../dto/CompanyTenanty.dto";
import { StatusEntity } from "../types/Status.type";

export interface UserData {
  id?: string;
  sub: string;
  email: string;
  user_metadata: {
    first_name: string;
    name: string;
    tenant: {
      id: string;
      status: StatusEntity;
      user_id: string;
      avatar_url: string;
      company_name: string;
      company_short_name: string;
    };
  };
  completed: boolean;
  email_verified: boolean;
  phone_verified: boolean;
}

export interface UserMetaData {
  name?: string;
  first_name?: string;
  signature: string;
  completed: boolean;
  onboardCompleted?: boolean;
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
  tenant: CompanyTenantyDTO;
}
