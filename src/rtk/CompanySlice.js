import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, status } from "../utils/constants";

const initialState = {
  error: null,
  company: {},
  status: status.idle,
};

export const getCompany = createAsyncThunk("company", async (branchId) => {
  let auth = window.localStorage.getItem("auth");
  if (auth) {
    try {
      auth = JSON.parse(auth);
    } catch (error) {
      // ignore
    }
  }
  try {
    const response = await axios.get(
      `${BASE_URL}api/setting/system-configuration?Branch_ID=${branchId}`,
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

const CompanySlice = createSlice({
  name: "company",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCompany.pending, (state, action) => {
        state.status = status.pending;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.status = status.succeeded;
        state.company = { ...action.payload };
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.status = status.failed;
        state.error = action.error?.data;
      });
  },
});

export const getCurrentCompany = (state) => state.company.company;
export const getCompanyStatus = (state) => state.company.status;
export const getCompanyError = (state) => state.company.error;

export default CompanySlice.reducer;
