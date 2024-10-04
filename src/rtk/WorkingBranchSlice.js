import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  branch: {},
};

export const currentBranchSlice = createSlice({
  name: "currentBranch",
  initialState,
  reducers: {
    setCurrentBranch: (state, action) => {
      state.branch = action.payload;
    },
  },
});

export const { setCurrentBranch } = currentBranchSlice.actions;
export const getCurrentBranch = (state) => state.currentBranch.branch;

export default currentBranchSlice.reducer;
