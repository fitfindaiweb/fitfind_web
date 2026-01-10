import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    saveUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    signOutRequest(state) {
      state.access_token = "";
      state.isLogin = false;
      state.user = null;
    },
  },
});

export const { saveUserInfo, signOutRequest } = authSlice.actions;

export default authSlice.reducer;
