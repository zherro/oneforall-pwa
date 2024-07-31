import SupabaseRepository from "@supabaseutils/types/repository";

export default class ProductRepository extends SupabaseRepository<any> {
  constructor() {
    super("products");
  }
}
