import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabaseutils/utils/server";

export default abstract class SupabaseRepository {
  protected supabase: SupabaseClient;
  protected TABLE: string;

  constructor(table: string, supabase?: SupabaseClient) {
    this.TABLE = table;
    this.supabase = supabase ? supabase : createClient();
  }

  public save(entity: any) {
    return this.supabase.from(this.TABLE).upsert(entity).select();
  }

  public findById(id: string) {
    return this.supabase.from(this.TABLE).select().eq("id", id);
  }

  public findBy(query: any[]) {
    const builder = this.supabase.from(this.TABLE).select();

    Object.keys(query).forEach((key) => {
      builder.eq(key, query[key]);
    });
  }
}
