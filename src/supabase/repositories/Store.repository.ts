import SupabaseRepository from "@supabaseutils/types/repository";

export default class StoreRepository extends SupabaseRepository<any> {
  constructor() {
    super("stores");
  }
}
