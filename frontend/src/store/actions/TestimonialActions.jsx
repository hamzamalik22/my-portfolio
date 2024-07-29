import {
  getTestimonialStart,
  getTestimonialSuccess,
  getTestimonialFailure,
} from "../reducers/TestimonialSlice";

import api from "../../utils/api";

export const fetchTestimonial = () => async (dispatch) => {
  try {
    dispatch(getTestimonialStart());
    const response = await api.get("/api/testimonials/");
    console.log(response);
    dispatch(getTestimonialSuccess(response.data.Testimonials));
  } catch (error) {
    dispatch(getTestimonialFailure(error.message));
  }
};
