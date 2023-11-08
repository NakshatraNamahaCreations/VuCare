import { createSlice } from "@reduxjs/toolkit";

const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  cartItems: savedCartItems,
  subTotal: calculateSubTotal(savedCartItems),
};

function calculateSubTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item?.pofferprice, 0);
}

const viewCartSlice = createSlice({
  name: "viewCart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.cartItems.push(action.payload);
      state.subTotal = calculateSubTotal(state.cartItems);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeAllItems: (state) => {
      state.cartItems = [];
      state.subTotal = 0;
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addItemToCart, removeAllItems } = viewCartSlice.actions;
export const selectCartItems = (state) => state.viewCart.cartItems;
export const selectSubTotal = (state) => state?.viewCart?.subTotal;
export default viewCartSlice.reducer;
