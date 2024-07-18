import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabaseutils/utils/server";

export default abstract class SupabaseRepository<T> {
  protected supabase: SupabaseClient;
  protected TABLE: string;
  protected from;

  constructor(table: string, supabase?: SupabaseClient) {
    this.TABLE = table;
    this.supabase = supabase ? supabase : createClient();
    this.from = this.supabase.from(this.TABLE);
  }

  public save(entity: T) {
    return this.saveAndFlush(entity).select().single();
  }

  public saveAndFlush(entity: T) {
    return this.supabase.from(this.TABLE).upsert(entity);
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
