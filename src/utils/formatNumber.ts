import numeral from "numeral";

// --------- CONVERT FORMATTED STRING BACK TO FLOAT ---------
export const convertFormattedStringToFloat = (
  formattedValue: string
): number => {
  // Remove currency symbols and commas, then parse to float
  const numericValue = formattedValue.replace(/[,$]/g, "");
  return parseFloat(numericValue);
};

// --------- CLEAN UP NUMBER FORMATTING ---------

type InputValue = string | number | null;

export function fNumber(number: InputValue) {
  // if number is less than 1, return 2 decimal places, else return 0 decimal places
  // convert to number
  const num = Number(number);
  return number
    ? numeral(num).format(num < 1 && num > -1 ? "0.00" : "0,0")
    : "";
  // return numeral(number).format();
}

export function fCurrency(number: InputValue) {
  // const format = number ? numeral(number).format("$0,0.00") : "";

  // return result(format, ".00");
  // include 2 decimal places
  const num = Number(number);
  return number ? numeral(num).format("$0,0.00") : "";
}

export function fShortenCurrency(number: InputValue) {
  // const format = number ? numeral(number).format("$0a") : "";

  // return result(format, "a");
  const num = Number(number);
  return number
    ? numeral(num).format(num < 10 && num > -10 ? "$0.00" : "$0a")
    : "";
}

export function fPercent(number: InputValue) {
  // multiply number by 100, round to 1 and add % sign. Also, include 2 decimal places
  const format = number ? numeral(Number(number)).format("0.00%") : "";
  return result(format, ".00");
  // return number ? `${Math.round(Number(number) * 100)}%` : "";
}

export function fShortenNumber(number: InputValue, includeDecimals = true) {
  const format = number
    ? numeral(number).format(includeDecimals ? "0.0a" : "0a")
    : "";
  return result(format, ".0");
}

export function fData(number: InputValue) {
  const format = number ? numeral(number).format("0.0 b") : "";

  return result(format, ".0");
}

function result(format: string, key = ".00") {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, "") : format;
}
