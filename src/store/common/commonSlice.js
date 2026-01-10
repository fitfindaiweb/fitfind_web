import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  packages: [],
  footerData: null,
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    setPackages(state, action) {
      state.packages = action.payload;
    },
    setFooterData(state, action) {
      state.footerData = action.payload;
    },
  },
});

export const { setPackages, setFooterData } = commonSlice.actions;

export default commonSlice.reducer;
