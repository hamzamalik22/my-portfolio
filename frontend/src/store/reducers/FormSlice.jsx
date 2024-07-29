// slices/ContactFormSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const FormSlice = createSlice({
  name: "contactForm",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Create ContactForm actions
    createContactFormStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createContactFormSuccess: (state, action) => {
      state.list.push(action.payload);
      state.loading = false;
    },
    createContactFormFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createContactFormStart,
  createContactFormSuccess,
  createContactFormFailure,
} = FormSlice.actions;

export default FormSlice.reducer;
