/* eslint-disable no-confusing-arrow */
import ObjectUtils from "@utils/helpers/Object.utils";
import toPattern from "./toPattern";

/**
 * function unMask
 * @param {string} value
 * @returns {string}
 */
function unMask(value: string) {
  return value.replace(/\W/g, "");
}

/**
 * function masker
 * @param {string} value
 * @param {string} pattern
 * @param {any} options
 * @returns {string}
 */
function masker(value: string, pattern: string, options: any) {
  return toPattern(value, { pattern, ...options });
}

/**
 * function multimasker
 * @param {string} value
 * @param {string[]} patterns
 * @param {any} options
 * @returns {string}
 */
function multimasker(value: string, patterns: string[], options: any) {
  return masker(
    value,
    patterns.reduce(
      // eslint-disable-next-line prettier/prettier
      (memo: string, pattern: string) =>
        value.length <= unMask(memo).length ? memo : pattern,
      patterns[0]
    ),
    options
  );
}

/**
 * function mask
 * @param {string | number} value
 * @param {string | string[]} pattern
 * @param {any} options
 * @returns {string}
 */
function mask(
  value: string | number,
  pattern: string | string[],
  options?: any
) {
  return typeof pattern === "string"
    ? masker(String(value), pattern || "", options)
    : multimasker(String(value), pattern, options);
}

/**
 * Aplica a máscara ao valor fornecido.
 * @param {string | number} value - Valor a ser mascarado.
 * @param {string} pattern - Máscara a ser aplicada.
 * @param {any} options - Opções adicionais.
 * @returns {string} - Valor mascarado no formato monetário brasileiro.
 */
function maskMoney(
  value: string | number,
  pattern?: string,
  options?: any
): string {
  pattern =
    pattern !== undefined && pattern !== null && pattern.length > 0
      ? pattern
      : "999.999.999.999,99";

  // Verifica se a máscara tem o caractere '#' no início
  const unlimitedPattern = pattern.startsWith("#");

  // Remove o '#' se estiver presente no início da máscara
  const cleanPattern = unlimitedPattern ? pattern.slice(1) : pattern;

  // Remove todos os caracteres não numéricos
  let numericValue = unMask("" + value)
    .replace(/\D/g, "")
    .replace(/^0+/, "");
  const maxLengt = unMask(cleanPattern).replace(/\D/g, "").length;

  if (options?.max != undefined && numericValue > options.max) {
    numericValue = "" + options.max;
  }

  if (numericValue.length <= 0) {
    numericValue = "0";
  } else if (numericValue.length > maxLengt) {
    numericValue = numericValue.substring(0, maxLengt);
  }

  const reverseValue = (numericValue || "").split("").reverse().join("");
  const reversePatter = (cleanPattern || "").split("").reverse().join("");

  // Determina a quantidade de casas decimais <baseado na máscara
  const decimalLength = 2; // Sempre tratamos os dois últimos números como casas decimais

  const revv = reverseValue.split("");
  const revp = reversePatter.split("");

  console.log(revv);
  console.log(revp);

  let formattedValue = "";
  let auxIndx = 0;

  for (let i = 0; i < revv.length; i++) {
    if (revp[auxIndx] == "9") {
      formattedValue += revv[i];
    } else if (ObjectUtils.isNull(revp[auxIndx]) && unlimitedPattern) {
      formattedValue += revv[i];
    } else if (ObjectUtils.nonNull(revp[auxIndx])) {
      formattedValue += revp[auxIndx] + revv[i];
      auxIndx++;
    }
    auxIndx++;
    console.log(formattedValue, revp[i], revv[i]);
  }

  formattedValue = (formattedValue || "").split("").reverse().join("");

  // Formata o valor numérico
  if (numericValue.length <= decimalLength) {
    formattedValue = "0," + numericValue.padStart(decimalLength, "0");
  }

  return formattedValue;
}

// /**
//  * Aplica a máscara ao valor fornecido.
//  * @param {string} value - Valor a ser mascarado.
//  * @param {string} pattern - Máscara a ser aplicada.
//  * @param {any} options - Opções adicionais.
//  * @returns {string} - Valor mascarado.
//  */
// function maskMoney(value: string | number, pattern: string, options?: any): string {
//   // Verifica se a máscara tem o caractere '#' no início
//   const unlimitedPattern = pattern.startsWith('#');

//   // Remove o '#' se estiver presente no início da máscara
//   const cleanPattern = unlimitedPattern ? pattern.slice(1) : pattern;

//   // Aplica a máscara ao valor usando toPattern
//   const maskedValue = toPattern(value, cleanPattern);

//   // Remove todos os caracteres não numéricos
//   const numericValue = unMask(maskedValue);

//   // Determina a quantidade de casas decimais baseado na máscara
//   const decimalLength = cleanPattern.split('.').pop()?.length || 2;

//   // Formata o valor numérico
//   let formattedValue = '';
//   if (numericValue.length <= decimalLength) {
//     formattedValue = '0.' + numericValue.padStart(decimalLength, '0');
//   } else {
//     const integerPart = numericValue.slice(0, -decimalLength);
//     const decimalPart = numericValue.slice(-decimalLength);
//     formattedValue = `${integerPart}.${decimalPart}`;
//   }

//   // Converte para número e aplica a formatação final
//   let num = parseFloat(formattedValue).toFixed(decimalLength);

//   // Aplica limite máximo se especificado
//   if (options && options.max && parseFloat(num) > options.max) {
//     num = options.max.toFixed(decimalLength);
//   }

//   return num;
// }

export { mask, maskMoney, unMask };
