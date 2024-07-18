import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

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

  /**
   * Codifica uma string usando uma chave secreta.
   * @param text - A string a ser codificada.
   * @param secretKey - A chave secreta usada para codificar.
   * @returns {string} A string codificada.
   */
  static encrypt(text: string, secretKey: string): string {
    const iv = crypto.randomBytes(16); // Vetor de inicialização de 16 bytes
    const key = crypto.createHash("sha256").update(secretKey).digest(); // Cria uma chave de 256 bits a partir da chave secreta

    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return iv.toString("hex") + ":" + encrypted;
  }

  /**
   * Descriptografa uma string usando uma chave secreta.
   * @param encryptedText - A string codificada.
   * @param secretKey - A chave secreta usada para descriptografar.
   * @returns {string} A string descriptografada.
   */
  static decrypt(encryptedText: string, secretKey: string): string {
    const textParts = encryptedText.split(":");
    const iv = Buffer.from(textParts.shift()!, "hex"); // Extrai o IV do texto criptografado
    const encryptedTextPart = textParts.join(":"); // Obtém a parte criptografada do texto

    const key = crypto.createHash("sha256").update(secretKey).digest(); // Cria uma chave de 256 bits a partir da chave secreta

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedTextPart, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }
}

const generateDigitsCode = (digits: number) =>
  CodeUtils.generateDigitsCode(digits);

const generateCharacterCode = (digits: number) =>
  CodeUtils.generateCharacterCode(digits);

const getUuid = () => CodeUtils.uuid();

const encrypt = (text: string, secretKey: string): string =>
  CodeUtils.encrypt(text, secretKey);
const decrypt = (encryptedText: string, secretKey: string): string =>
  CodeUtils.decrypt(encryptedText, secretKey);

export { encrypt, decrypt, getUuid, generateDigitsCode, generateCharacterCode };
