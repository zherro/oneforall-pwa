import StringUtils from "./helpers/String.utils";

export default class SupabaseQuerys {
  fulltextSearchQuery(value?: string): string {
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

export const supabaseQuerys = new SupabaseQuerys();
