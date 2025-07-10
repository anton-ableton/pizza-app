import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PizzaItem {
  id: string;
  name: string;
  size: string;
  dough: string;
  toppings: string[];
  quantity: number;
  price: number;
}

interface CartState {
  items: PizzaItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<PizzaItem>) {
      state.items.push(action.payload);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
