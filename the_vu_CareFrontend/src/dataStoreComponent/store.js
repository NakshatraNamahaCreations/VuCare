// store.js
import { configureStore } from "@reduxjs/toolkit";
import viewCartReducer from "../dataStoreComponent/viewcartSlice";

const store = configureStore({
  reducer: {
    viewCart: viewCartReducer,
  },
});


export default store;
