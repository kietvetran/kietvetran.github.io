import { StringObject } from "../domain/Types";

const splitText = (text: string, split: number) => {
  let i = (text || "").length % split;
  const list = i ? [text.substr(0, i)] : [];
  for (i; i < text.length; i += split) {
    list.push(text.substr(i, split));
  }
  return list;
};

/** ****************************************************************************
  Amount formatter
***************************************************************************** */
export const formatAmount = (
  value?: string | number,
  round?: boolean | number,
  toFixed = false,
): string => {
  if (!value) {
    return typeof value === "number" ? `${value}` : "";
  }

  let text = `${value}`.replace(/[\s]+/g, "");
  let number = parseFloat(text.replace(/,/g, "."));

  if (round && number) {
    const opt = [0, 10, 100, 100, 1000, 1000, 10000, 100000];
    number =
      typeof round === "number" && opt[round]
        ? Math.round(number * opt[round]) / opt[round]
        : Math.round(number);

    text =
      typeof round === "number" && (toFixed || /\./.test(`${number}`))
        ? `${number.toFixed(round)}`
        : `${number}`;
  }

  const isNegative = number < 0;
  if (isNegative) {
    number *= -1;
    text = text.replace(/-/g, "");
  }

  let end = "";
  if (/(\.|,)\d+/.test(text)) {
    end = (text.match(/((\.|,)\d+)/) ?? [])[0] ?? "";
    text = `${parseInt(`${number}`, 10)}`;
  }

  return (
    (isNegative ? "- " : "") +
    (`${number}`.length < 4 ? number : splitText(text, 3).join(" ") + end)
  ).replace(".", ",");
};

/** ****************************************************************************
  Personalid formatter
***************************************************************************** */
export const formatPersonalId = (
  value?: string | number,
  country = "no",
): string => {
  if (!value) {
    return "";
  }
  const text = `${value}`.replace(/[\s-]+/g, "");
  const option: StringObject = { no: " ", sv: "-", da: "-" };
  const separator = option[country] || option.no;
  return text.length <= 6
    ? text
    : text.substring(0, 6) + (separator || " ") + text.substring(6);
};

/** ****************************************************************************
  Bank account formatter
***************************************************************************** */
export const formatOrgNumber = (value?: string | number): string => {
  if (!value) {
    return "";
  }

  const text = `${value}`.replace(/[\s-]+/g, "");
  return splitText(text, 3).join(" ");
};

/** ****************************************************************************
  Bank account formatter
***************************************************************************** */
export const formatBankAccount = (
  value?: string | number,
  country = "no",
): string => {
  if (!value) {
    return "";
  }

  const text = `${value}`.replace(/[\s-]+/g, "");
  const option: StringObject = { no: " ", sv: " ", da: " " };
  const separator = option[country] || option.no;
  return text.length <= 6
    ? text
    : text.substring(0, 4) +
        (separator || "") +
        text.substring(4, 6) +
        (separator || "") +
        text.substring(6);
};
