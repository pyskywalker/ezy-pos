import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
// import MenuReducer from "./MenuSlice";
import CompanyReducer from "./CompanySlice";
import BranchReducer from "./BranchSlice";
import currentBranchReducer from "./WorkingBranchSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    branch: BranchReducer,
    company: CompanyReducer,
    currentBranch: currentBranchReducer,
  },
});
