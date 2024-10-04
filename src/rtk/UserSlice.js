import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, status } from "../utils/constants";

const initialState = {
  error: null,
  user: {},
  status: status.idle,
};

export const getUser = createAsyncThunk("user/user", async (userid) => {
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
      `${BASE_URL}api/user/user?&User_ID=${userid}`,
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

const UserSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.status = status.pending;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = status.succeeded;
        if (action?.payload?.data.length)
          state.user = { ...action?.payload?.data[0] };
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = status.failed;
        state.error = action.error?.data;
      });
  },
});

export const getCurrentUser = (state) => state.user;
export const getUserStatus = (state) => state.user.status;
export const getUserError = (state) => state.user.error;

export default UserSlice.reducer;
