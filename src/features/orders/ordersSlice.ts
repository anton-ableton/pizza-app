import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Order {
  id: string;
  totalPrice: number;
  status: number;
  cancellable: boolean;
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    clearOrders(state) {
      state.orders = [];
    },
  },
});

export const { setOrders, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
