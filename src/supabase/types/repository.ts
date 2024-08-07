import { PostgrestQueryBuilder } from "@supabase/postgrest-js";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { UserData } from "@supabaseutils/model/user/UserData";
import { createClient } from "@supabaseutils/utils/server";
import StringUtils from "@utils/helpers/String.utils";
import { LOG } from "@utils/log";
import { promises } from "dns";

export default abstract class SupabaseRepository<T> {
  protected supabase: SupabaseClient;
  protected TABLE: string;
  protected from: PostgrestQueryBuilder<any, any, any>;

  constructor(table: string, supabase?: SupabaseClient) {
    this.TABLE = table;
    this.supabase = supabase ? supabase : createClient();
    this.from = this.supabase.from(this.TABLE);
  }

  public getSupabase() {
    return this.supabase;
  }

  public save(entity: T) {
    return this.saveAndFlush(entity);
  }

  public saveAndFlush(entity: T) {
    return this.supabase.from(this.TABLE).upsert(entity);
  }

  public saveAndGet(entity: T) {
    return this.save(entity).select().single();
  }

  public findById(id: string) {
    return this.supabase.from(this.TABLE).select().eq("id", id);
  }

  public findByTenant(uuid: string) {
    return this.supabase.from(this.TABLE).select().eq("tenant_id", uuid);
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

  async getUserId(): Promise<any> {
    const data: any = await this.supabase.auth.getUser();
    return data?.data?.user?.id;
  }

  async getUser(): Promise<any> {
    const data: UserData | any = await this.supabase.auth.getUser();
    return data?.data?.user;
  }

  paginated(
    page: number,
    size: number,
    query: {
      tsv_search?: string;
      order?: string[][];
    }
  ) {
    const start = page <= 1 ? 0 : (page - 1) * size;

    const queryRunner = this.from.select("*", { count: "exact" });

    const textSearch = this.fulltextSearchQuery(query.tsv_search);
    if (!StringUtils.isEmpty(textSearch)) {
      queryRunner.textSearch("tsv_search", textSearch, {
        config: process.env.APP_LANGUAGE,
      });
    }

    if (start == 0) {
      queryRunner.limit(size);
    } else {
      queryRunner.range(start, start + size);
    }

    if (query.order != undefined && query.order.length > 0) {
    }

    LOG.debug(
      `Search paginated on '${this.TABLE}' with: start={${start}}, size={${size}} `
    );

    return queryRunner.order("created_at", { ascending: false });
  }

  async paginatedTenant(
    page: number,
    size: number,
    query: {
      tsv_search?: string;
      order?: string[][];
    }
  ) {
    const start = page <= 1 ? 0 : (page - 1) * size;

    const queryRunner = this.from.select("*", { count: "exact" });

    const user: UserData = await this.getUser();
    const tenantId = user.user_metadata.tenant.id;
    queryRunner.or(`user_id.eq.${tenantId}, id.eq.${tenantId}`);

    const textSearch = this.fulltextSearchQuery(query.tsv_search);
    if (!StringUtils.isEmpty(textSearch)) {
      queryRunner.textSearch("tsv_search", textSearch, {
        config: process.env.APP_LANGUAGE,
      });
    }

    if (start == 0) {
      queryRunner.limit(size);
    } else {
      queryRunner.range(start, start + size);
    }

    if (query.order != undefined && query.order.length > 0) {
    }

    LOG.debug(
      `Search paginated on '${this.TABLE}' with: start={${start}}, size={${size}} `
    );

    return queryRunner.order("created_at", { ascending: false });
  }
}
