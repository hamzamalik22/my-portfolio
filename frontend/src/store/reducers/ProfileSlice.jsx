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
      console.log('🔄 ProfileSlice: getProfileStart called');
      state.loading = true;
      state.error = null;
    },
    getProfileSuccess: (state, action) => {
      console.log('✅ ProfileSlice: getProfileSuccess called with payload:', action.payload);
      state.list = action.payload;
      state.loading = false;
      console.log('📊 ProfileSlice: Updated state.list to:', state.list);
    },
    getProfileFailure: (state, action) => {
      console.log('❌ ProfileSlice: getProfileFailure called with error:', action.payload);
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getProfileStart, getProfileSuccess, getProfileFailure } =
  ProfileSlice.actions;

export default ProfileSlice.reducer;
