import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("sendit_user");
const savedToken = localStorage.getItem("sendit_token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken || null,
  },
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.access_token;
      localStorage.setItem("sendit_user", JSON.stringify(action.payload.user));
      localStorage.setItem("sendit_token", action.payload.access_token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("sendit_user");
      localStorage.removeItem("sendit_token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
