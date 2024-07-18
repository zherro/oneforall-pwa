export default class DateUtils {
  /**
   * Valida se uma string é uma data válida.
   * @param dateString - A string a ser validada.
   * @returns {boolean} Verdadeiro se a string for uma data válida, caso contrário, falso.
   */
  static isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  /**
   * Verifica se uma data é anterior a outra.
   * @param date1 - A primeira data.
   * @param date2 - A segunda data.
   * @returns {boolean} Verdadeiro se a primeira data for anterior à segunda, caso contrário, falso.
   */
  static isBefore(date1: Date, date2: Date): boolean {
    return date1.getTime() < date2.getTime();
  }

  /**
   * Verifica se uma data é posterior a outra.
   * @param date1 - A primeira data.
   * @param date2 - A segunda data.
   * @returns {boolean} Verdadeiro se a primeira data for posterior à segunda, caso contrário, falso.
   */
  static isAfter(date1: Date, date2: Date): boolean {
    return date1.getTime() > date2.getTime();
  }

  /**
   * Converte um timestamp para uma data.
   * @param timestamp - O timestamp a ser convertido.
   * @returns {Date} A data convertida.
   */
  static timestampToDate(timestamp: number): Date {
    return new Date(timestamp);
  }

  /**
   * Converte uma data para um timestamp.
   * @param date - A data a ser convertida.
   * @returns {number} O timestamp da data.
   */
  static dateToTimestamp(date: Date): number {
    return date.getTime();
  }

  /**
   * Obtém o dia de uma data.
   * @param date - A data.
   * @returns {number} O dia da data.
   */
  static getDay(date: Date): number {
    return date.getDate();
  }

  /**
   * Obtém o mês de uma data.
   * @param date - A data.
   * @returns {number} O mês da data (0-11).
   */
  static getMonth(date: Date): number {
    return date.getMonth();
  }

  /**
   * Obtém o ano de uma data.
   * @param date - A data.
   * @returns {number} O ano da data.
   */
  static getYear(date: Date): number {
    return date.getFullYear();
  }

  /**
   * Formata uma data para uma string no formato 'YYYY-MM-DD'.
   * @param date - A data a ser formatada.
   * @returns {string} A string formatada.
   */
  static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}

// Exemplos de uso:
//   console.log(DateUtils.isValidDate("2024-07-17")); // true
//   console.log(DateUtils.isBefore(new Date("2024-07-17"), new Date("2024-07-18"))); // true
//   console.log(DateUtils.isAfter(new Date("2024-07-19"), new Date("2024-07-18"))); // true
//   console.log(DateUtils.timestampToDate(1626518400000)); // Date correspondente
//   console.log(DateUtils.dateToTimestamp(new Date("2024-07-17"))); // 1626470400000 (timestamp)
//   console.log(DateUtils.getDay(new Date("2024-07-17"))); // 17
//   console.log(DateUtils.getMonth(new Date("2024-07-17"))); // 6 (julho, zero-indexado)
//   console.log(DateUtils.getYear(new Date("2024-07-17"))); // 2024
//   console.log(DateUtils.formatDate(new Date("2024-07-17"))); // '2024-07-17'
