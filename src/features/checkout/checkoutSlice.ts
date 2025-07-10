import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CheckoutInfo {
  address: {
    street: string;
    house: string;
    apartment: string;
    comment?: string;
  };
  person: {
    firstname: string;
    lastname: string;
    middlename?: string;
    phone: string;
  };
  debitCard: {
    pan: string;
    expireDate: string;
    cvv: string;
  };
}

const initialState: CheckoutInfo = {
  address: { street: "", house: "", apartment: "", comment: "" },
  person: { firstname: "", lastname: "", middlename: "", phone: "" },
  debitCard: { pan: "", expireDate: "", cvv: "" },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutData(state, action: PayloadAction<CheckoutInfo>) {
      return action.payload;
    },
    resetCheckout(state) {
      return initialState;
    },
  },
});

export const { setCheckoutData, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
