const persianFormat = new Intl.NumberFormat("fa-IR", {
  style: "currency",
  currency: "IRR",
});

export const toPersianCurrency = (value: number): string => {
  return persianFormat.format(value);
};
