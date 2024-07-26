import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabaseutils/utils/server";
import StringUtils from "@utils/helpers/String.utils";

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

  public fulltextSearchQuery(value?: string): string {
    if (StringUtils.isEmpty(value)) {
      return "";
    }
    // Divide a string em palavras usando espaços como delimitadores
    const words = (value || "").split(" ");

    let query = "";

    // Ajusta cada palavra conforme necessário
    words
      .filter((w) => w.length > 2)
      .forEach(
        (word) =>
          (query = query.length <= 0 ? `${word}:*` : `${query} | ${word}:*`)
      );

    return query;
  }
}
