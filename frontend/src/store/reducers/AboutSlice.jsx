// slices/CustomerSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const AboutSlice = createSlice({
  name: "about",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Fetch customers actions
    getAboutStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAboutSuccess: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    getAboutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getAboutStart, getAboutSuccess, getAboutFailure } =
  AboutSlice.actions;

export default AboutSlice.reducer;
