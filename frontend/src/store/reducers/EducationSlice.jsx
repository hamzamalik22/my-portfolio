// slices/CustomerSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const EducationSlice = createSlice({
  name: "education",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    getEducationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getEducationSuccess: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    getEducationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getEducationStart, getEducationSuccess, getEducationFailure } =
  EducationSlice.actions;

export default EducationSlice.reducer;
