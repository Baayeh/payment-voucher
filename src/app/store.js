import { configureStore } from "@reduxjs/toolkit";
import receiptReducer from "../features/Receipt/receiptSlice";

const store = configureStore({
  reducer: {
    receipt: receiptReducer,
  },
});

export default store;
