import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import MenuReducer from "./MenuSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    menu: MenuReducer,
  },
});
