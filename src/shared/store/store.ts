import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import authReducer from "../../features/auth/authSlice";
import cartReducer from "../../features/cart/cartSlice";
import checkoutReducer from "../../features/checkout/checkoutSlice";
import ordersReducer from "../../features/orders/ordersSlice";
import themeReducer from "../../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: ordersReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
