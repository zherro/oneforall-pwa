import StringUtils from "./String.utils";

export default class NumberUtils {
  static onlyNumber(input: string | any): number {
    // Use regular expression to replace all non-numeric characters with an empty string
    const numericString = ("" + input).replace(/\D/g, "");

    // Convert the resulting numeric string to a number
    const result = StringUtils.isEmpty(numericString)
      ? 0.0
      : Number(numericString);

    // Return the result
    return result;
  }

  static onlyNumberToDecimal(input: string | any): string {
    const num = NumberUtils.onlyNumber(input);
    return num >= 1 ? (num / 100).toFixed(2) : "0.00";
  }
}
