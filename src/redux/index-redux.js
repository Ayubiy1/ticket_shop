import { configureStore } from "@reduxjs/toolkit";
import UserId from "./slice";

export default configureStore({
  reducer: {
    slices: UserId,
  },
});
