import { StatusEntity } from "../types/Status.type";

export interface CompanyTenantyDTO {
    id?: string;
    avatar_url?: string;
    name?: string;
    market_type: string;
    status: StatusEntity;
    user_id?: string;
    tenant_id?: string;
    type: "user" | "store";
}