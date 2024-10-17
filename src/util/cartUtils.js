
import { removeProduct } from "../redux/cartSlice";

export const handleIncrease = (productId, quantities, setQuantities) => {
  setQuantities({
    ...quantities,
    [productId]: quantities[productId] + 1,
  });
};

export const handleDecrease = (productId, quantities, setQuantities) => {
  if (quantities[productId] > 1) {
    setQuantities({
      ...quantities,
      [productId]: quantities[productId] - 1,
    });
  }
};

export const handleRemoveProduct = (productId, dispatch, setQuantities) => {
  dispatch(removeProduct(productId));
  setQuantities((prevQuantities) => {
    const newQuantities = { ...prevQuantities };
    delete newQuantities[productId];
    return newQuantities;
  });
};

export const calculateTotalItemsAndSum = (products, quantities) => {
  const totalItems = products.length;
  const totalSum = products.reduce((sum, product) => {
    const productPrice = product.discont_price || product.price;
    return sum + productPrice * quantities[product.id];
  }, 0);
  return { totalItems, totalSum };
};
