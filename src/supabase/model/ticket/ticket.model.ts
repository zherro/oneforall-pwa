import { SupabaseModel } from "../model";

export interface TicketModel extends SupabaseModel {
  type?: "criar_cardapio";
  name?: string;
  email?: string;
  instagram?: string;
  phone?: string;
  message?: string;
  readed?: boolean;
  status_ticket?: string;
  recaptcha?: string;
  user_id?: string;
  tenant_id?: string;
  asset_data?: any;
}
