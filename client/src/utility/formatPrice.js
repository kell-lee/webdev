export const formatPriceString = (price) => {
  const priceFloat = parseFloat(price);

  const twoDecimalString = priceFloat.toFixed(2);

  return twoDecimalString;
};
