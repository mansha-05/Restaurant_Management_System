import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],      // cart items
  totalQuantity: 0,
  totalAmount: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);

      state.totalQuantity++;

      if (!existing) {
        state.items.push({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          totalPrice: item.price,
          imageUrl: item.imageUrl
        });
      } else {
        existing.quantity++;
        existing.totalPrice += item.price;
      }

      state.totalAmount += item.price;
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const existing = state.items.find(i => i.id === id);

      if (!existing) return;

      state.totalQuantity--;
      state.totalAmount -= existing.price;

      if (existing.quantity === 1) {
        state.items = state.items.filter(i => i.id !== id);
      } else {
        existing.quantity--;
        existing.totalPrice -= existing.price;
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
