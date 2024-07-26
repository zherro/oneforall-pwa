export default class StringUtils {
  /**
   * Verifica se uma string está vazia ou contém apenas espaços em branco.
   * @param str - A string a ser verificada.
   * @returns {boolean} Verdadeiro se a string estiver vazia, contiver apenas espaços em branco ou não for uma string, caso contrário, falso.
   */
  static isEmpty(str: any): boolean {
    if (typeof str !== "string") return true;
    return !str || str.trim().length === 0;
  }

  /**
   * Converte a primeira letra de uma string para maiúscula.
   * @param str - A string a ser convertida.
   * @returns {string} A string com a primeira letra em maiúscula.
   */
  static capitalizeFirstLetter(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Verifica se uma string contém apenas caracteres alfanuméricos.
   * @param str - A string a ser verificada.
   * @returns {boolean} Verdadeiro se a string contiver apenas caracteres alfanuméricos, caso contrário, falso.
   */
  static isAlphanumeric(str: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(str);
  }

  /**
   * Adiciona um caractere específico após cada caractere de uma string.
   * @param inputString - A string original.
   * @param charToAdd - O caractere a ser adicionado após cada caractere da string original.
   * @param addCharToEnd - Indica se o caractere deve ser adicionado ao final da string (opcional).
   * @returns {string} A nova string com o caractere adicionado.
   */
  static addCharacterAfterEach(inputString: string, charToAdd: string): string {
    let result = "";

    for (let i = 0; i < inputString.length; i++) {
      result += i == 0 ? inputString[i] : charToAdd + inputString[i];
    }

    return result;
  }

  static slugfy(str) {
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  }
}

const isEmpty = (str: any): boolean => StringUtils.isEmpty(str);
const notBlank = (str: any): boolean => !StringUtils.isEmpty(str);
const addCharacterAfterEach = (inputString: string, charToAdd: string) =>
  StringUtils.addCharacterAfterEach(inputString, charToAdd);

export { isEmpty, notBlank, addCharacterAfterEach };
