import { v4 as uuidv4 } from "uuid";

export default class CodeUtils {
  /**
   * Gera um código numérico aleatório de 6 dígitos.
   * @returns {string} O código numérico de 6 dígitos.
   */
  static generateDigitsCode(digits: number): string {
    // Gera um número aleatório entre 0 e 999999
    const randomNum = Math.floor(Math.random() * 1000000);

    // Converte o número para uma string e preenche com zeros à esquerda se necessário
    const sixDigitCode = randomNum.toString().padStart(digits, "0");

    return sixDigitCode;
  }

  /**
   * Gera um código aleatório de 6 caracteres (números e letras).
   * @returns {string} O código aleatório de 6 caracteres.
   */
  static generateCharacterCode(digits: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // abcdefghijklmnopqrstuvwxyz;
    const charactersLength = characters.length;
    let result = "";

    for (let i = 0; i < digits; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters[randomIndex];
    }

    return result;
  }

  static uuid() {
    return uuidv4();
  }
}

const generateDigitsCode = (digits: number) =>
  CodeUtils.generateDigitsCode(digits);

const generateCharacterCode = (digits: number) =>
  CodeUtils.generateCharacterCode(digits);

const getUuid = () => CodeUtils.uuid();

export { getUuid, generateDigitsCode, generateCharacterCode };
