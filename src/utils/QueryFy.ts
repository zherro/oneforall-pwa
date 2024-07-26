import Objects from "./helpers/Object.utils";
import StringUtils from "./helpers/String.utils";

export default class Queryfy {
  static toQuery(obj: object, start = ""): string {
    if (!obj) {
      return "";
    }

    // Cria um objeto de parâmetros
    const params: Record<string, any> = {};

    // Percorre as chaves do objeto obj e adiciona ao objeto de parâmetros
    Object.keys(obj).forEach((key) => {
      // Obtém o valor do atributo
      const value = (obj as any)[key];

      if (Objects.nonNull(value)) {
        if (value instanceof String && StringUtils.isEmpty(value) ) {
          return "";
        }
        console.log(value)
        // Verifica se o valor é uma lista (array)
        if (Array.isArray(value)) {
          console.log('is array')
          // Adiciona cada valor do array como um parâmetro
          if (value.length > 0) {
            params[key] = value.join(",");
          }
        } else if (value !== null && value !== undefined) {
          // Adiciona ao objeto de parâmetros se o valor não for nulo ou indefinido
          params[key] = value;
        }
      }
    });

    if (params.length <= 0) return "";

    // Converte o objeto de parâmetros em query parameters
    const queryParams = start + new URLSearchParams(params).toString();

    return queryParams;
  }
}
