import SupabaseRepository from "@supabaseutils/types/repository";

export default class CategoriesRepository extends SupabaseRepository<any> {
  constructor() {
    super("categories");
  }
}
