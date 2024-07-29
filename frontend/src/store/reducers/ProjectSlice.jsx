// slices/CustomerSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const ProjectSlice = createSlice({
  name: "project",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    getProjectStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProjectSuccess: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    getProjectFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getProjectStart, getProjectSuccess, getProjectFailure } =
  ProjectSlice.actions;

export default ProjectSlice.reducer;
