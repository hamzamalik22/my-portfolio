// slices/CustomerSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Fetch customers actions
    getProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProfileSuccess: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    getProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getProfileStart, getProfileSuccess, getProfileFailure } =
  ProfileSlice.actions;

export default ProfileSlice.reducer;
