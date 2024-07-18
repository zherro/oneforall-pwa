export default class ObjectUtils {
  /**
   * Verifica se um valor é nulo ou indefinido.
   * @param value - O valor a ser verificado.
   * @returns {boolean} Verdadeiro se o valor for nulo ou indefinido, caso contrário, falso.
   */
  static isNull(value: any): boolean {
    return value === null || value === undefined;
  }

  static nonNull(value: any): boolean {
    return !this.isNull(value);
  }

  /**
   * Verifica se um objeto está vazio.
   * @param obj - O objeto a ser verificado.
   * @returns {boolean} Verdadeiro se o objeto estiver vazio, caso contrário, falso.
   */
  static isEmptyObject(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }

  /**
   * Verifica se todos os valores em um objeto são nulos ou indefinidos.
   * @param obj - O objeto a ser verificado.
   * @returns {boolean} Verdadeiro se todos os valores \forem nulos ou indefinidos, caso contrário, falso.
   */
  static areAllValuesNullOrUndefined(obj: object): boolean {
    return Object.values(obj).every(
      (value) => value === null || value === undefined
    );
  }

  /**
   * Clona um objeto profundamente.
   * @param obj - O objeto a ser clonado.
   * @returns {object} Uma nova cópia do objeto.
   */
  static deepClone(obj: object): object {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Mescla dois objetos profundamente.
   * @param target - O objeto alvo.
   * @param source - O objeto fonte.
   * @returns {object} O objeto mesclado.
   */
  static deepMerge(target: object, source: object): object {
    const isObject = (obj: any) => obj && typeof obj === "object";

    if (!isObject(target) || !isObject(source)) {
      return source;
    }

    Object.keys(source).forEach((key) => {
      const targetValue = (target as any)[key];
      const sourceValue = (source as any)[key];

      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        (target as any)[key] = targetValue.concat(...sourceValue);
      } else if (isObject(targetValue) && isObject(sourceValue)) {
        (target as any)[key] = ObjectUtils.deepMerge(targetValue, sourceValue);
      } else {
        (target as any)[key] = sourceValue;
      }
    });

    return target;
  }
}

//   // Exemplos de uso:
//   const obj1 = { a: 1, b: null };
//   const obj2 = { b: 2, c: 3 };

//   console.log(ObjectUtils.isNullOrUndefined(null)); // true
//   console.log(ObjectUtils.isEmptyObject({})); // true
//   console.log(ObjectUtils.areAllValuesNullOrUndefined({ a: null, b: undefined })); // true
//   console.log(ObjectUtils.deepClone(obj1)); // { a: 1, b: null }
//   console.log(ObjectUtils.deepMerge(obj1, obj2)); // { a: 1, b: 2, c: 3 }
