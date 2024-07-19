import { StatusEntity } from "../types/Status.type";

export interface CompanyTenantyDTO {
    id?: string;
    avatar_url?: string;
    company_name?: string;
    company_short_name: string;
    status: StatusEntity;
    user_id?: string;
}