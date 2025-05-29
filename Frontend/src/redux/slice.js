import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],// [{productId, quamtity, _id(extra)}]
  },

  reducers: {

    setCart: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      const existing = state.items.find(i => i.productId === action.payload.productId);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.productId !== action.payload);
    },
    
    clearCart: (state) => {
      state.items = [];
    },
    


  }
});

export const { setCart, addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
