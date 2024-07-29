import SupabaseRepository from "@supabaseutils/types/repository";

export default class ConfigProductTableRepository extends SupabaseRepository<any> {
  constructor() {
    super("config_products_table");
  }
}
