export const calculateDiscountPercentage = (price, discountPrice) => {
  if (!price || !discountPrice) return null;
  return Math.round(((price - discountPrice) / price) * 100);
};
