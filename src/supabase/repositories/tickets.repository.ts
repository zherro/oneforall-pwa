import { TicketModel } from "@supabaseutils/model/ticket/ticket.model";
import SupabaseRepository from "@supabaseutils/types/repository";

export default class TicketsRepository extends SupabaseRepository<TicketModel> {
  constructor() {
    super("tickets");
  }
}
