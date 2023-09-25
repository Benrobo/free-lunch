export const sleep = (time = 1) =>
  new Promise((res) => setTimeout(res, time * 1000));

export const isEmpty = (param) =>
  param === null || typeof param === "undefined" || param.length == 0;

export const capitalizeFirstCharacter = (str) => {
  if (isEmpty(str)) return str;
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export const CurrencySymbol = {
  NGN: "₦",
  USD: "$",
};

export function formatCurrency(amount, currency) {
  const formatedNumber = amount.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  // @ts-ignore
  const curr = CurrencySymbol[currency];
  return `${curr ?? ""}${formatedNumber}`;
}

export function randomId(count) {
  const length = count ?? 5;
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }
  return result;
}
