import { createSlice } from "@reduxjs/toolkit";

const UserId = createSlice({
  name: "slices",
  initialState: {
    userID: localStorage.getItem("user-id") || null,
    userIdAdmin: 0,
  },
  reducers: {
    setUserID: (state, action) => {
      state.userID = action.payload;
      localStorage.setItem("user-id", +state.userID);
    },
    setUserIdAdmin: (state, action) => {
      state.userIdAdmin = action.payload;
    },
  },
});

export const { setUserID, setUserIdAdmin } = UserId.actions;

export default UserId.reducer;
