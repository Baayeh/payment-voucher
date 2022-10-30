import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  receipts: [],
  singleReceipt: {},
};

const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {
    getAllReceipts: (state, action) => {
      state.receipts = action.payload;
    },
    createReceipt: (state, action) => {
      state.singleReceipt = action.payload;
    },
  },
});

export const { getAllReceipts, createReceipt } = receiptSlice.actions;

export default receiptSlice.reducer;
