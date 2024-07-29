// slices/CustomerSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const TestimonialSlice = createSlice({
  name: "testimonial",
  initialState: {
    testList: [],
    testLoading: false,
    testError: null,
  },
  reducers: {
    // Fetch customers actions
    getTestimonialStart: (state) => {
      state.testLoading = true;
      state.testError = null;
    },
    getTestimonialSuccess: (state, action) => {
      state.testList = action.payload;
      state.testLoading = false;
    },
    getTestimonialFailure: (state, action) => {
      state.testLoading = false;
      state.testError = action.payload;
    },
  },
});

export const { getTestimonialStart, getTestimonialSuccess, getTestimonialFailure } =
  TestimonialSlice.actions;

export default TestimonialSlice.reducer;
