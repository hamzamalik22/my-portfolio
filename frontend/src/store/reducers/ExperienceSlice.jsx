// slices/CustomerSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const ExperienceSlice = createSlice({
  name: "experience",
  initialState: {
    expList: [],
    expLoading: false,
    expError: null,
  },
  reducers: {
    getExperienceStart: (state) => {
      state.expLoading = true;
      state.expError = null;
    },
    getExperienceSuccess: (state, action) => {
      state.expList = action.payload;
      state.expLoading = false;
    },
    getExperienceFailure: (state, action) => {
      state.expLoading = false;
      state.expError = action.payload;
    },
  },
});

export const { getExperienceStart, getExperienceSuccess, getExperienceFailure } =
  ExperienceSlice.actions;

export default ExperienceSlice.reducer;
