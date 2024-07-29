// slices/CustomerSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const SkillSlice = createSlice({
  name: "skill",
  initialState: {
    skillList: [],
    skillLoading: false,
    skillError: null,
  },
  reducers: {
    getSkillStart: (state) => {
      state.skillLoading = true;
      state.skillError = null;
    },
    getSkillSuccess: (state, action) => {
      state.skillList = action.payload;
      state.skillLoading = false;
    },
    getSkillFailure: (state, action) => {
      state.skillLoading = false;
      state.skillError = action.payload;
    },
  },
});

export const { getSkillStart, getSkillSuccess, getSkillFailure } =
  SkillSlice.actions;

export default SkillSlice.reducer;
