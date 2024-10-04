import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, status } from "../utils/constants";

const initialState = {
  error: null,
  branch: [],
  status: status.idle,
};

export const getBranch = createAsyncThunk("branch", async (userid) => {
  let auth = window.localStorage.getItem("auth");
  if (auth) {
    try {
      auth = JSON.parse(auth);
    } catch (error) {
      // ignore
    }
  }
  try {
    const response = await window.axios.get(
      `${BASE_URL}api/user/user-branch?User_ID=${userid}`,
      {
        headers: { Authorization: auth ? `${auth.type} ${auth.token}` : null },
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.response.status == 401 || error.response.status == 403)
      window.location.href = "/";
    return error.response.data;
  }
});

const BranchSlice = createSlice({
  name: "branch",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBranch.pending, (state, action) => {
        state.status = status.pending;
      })
      .addCase(getBranch.fulfilled, (state, action) => {
        state.status = status.succeeded;
        state.branch = [
          ...action.payload.map((val) => ({
            value: val.Branch_ID,
            label: val.Branch_Name,
            ...val,
          })),
        ];
      })
      .addCase(getBranch.rejected, (state, action) => {
        state.status = status.failed;
        state.error = action.error?.data;
      });
  },
});

export const getUserBranch = (state) => state.branch;
export const getBranchStatus = (state) => state.branch.status;
export const getBranchError = (state) => state.branch.error;

export default BranchSlice.reducer;
