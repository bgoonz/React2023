import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initialState,
  reducers: {
    createCustomer(state, action) {
      state.fullName = action.payload.fullName;
      state.nationalId = action.payload.nationalId;
      state.createdAt = action.payload.createdAt;
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;
