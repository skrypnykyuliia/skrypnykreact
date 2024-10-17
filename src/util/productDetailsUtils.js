
import { addProduct } from "../redux/cartSlice";

export const handleIncrease = (quantity, setQuantity) => {
  setQuantity(quantity + 1);
};

export const handleDecrease = (quantity, setQuantity) => {
  if (quantity > 1) {
    setQuantity(quantity - 1);
  }
};

export const handleAddToCart = (product, quantity, dispatch) => {
  if (product && product.id) {
    dispatch(addProduct({ ...product, quantity }));
  } else {
    alert("Product data is missing or incorrect:", product);
  }
};

export const handleLoading = (product, t) => {
  if (!product.title) {
    return <div>{t('loading')}</div>;
  }
  return null;
};
