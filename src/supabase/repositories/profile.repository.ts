import SupabaseRepository from "@supabaseutils/types/repository";
import StringUtils from "@utils/helpers/String.utils";
import { LOG } from "@utils/log";

export default class ProfileRepository extends SupabaseRepository<any> {
  constructor() {
    super("profiles");
  }

  getByEmail(email: string | undefined) {
    return this.from.select().eq("email", email).limit(1);
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
}
