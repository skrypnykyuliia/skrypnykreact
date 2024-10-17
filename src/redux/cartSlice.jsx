import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
  addedProducts: [],
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    addProduct: (state, action) => {
      const product = action.payload;
      if (product && product.id && !state.addedProducts.includes(product.id)) {
        state.addedProducts.push(product.id);
        state.products.push(product);
        state.count += 1;
      }
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      state.addedProducts = state.addedProducts.filter(id => id !== productId);
      state.products = state.products.filter(product => product.id !== productId);
      state.count -= 1;
    },
    clearCart: (state) => {
      state.count = 0;
      state.addedProducts = [];
      state.products = [];
    },
  },
});

export const { increment, addProduct, removeProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
