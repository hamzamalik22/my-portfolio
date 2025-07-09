import {
  getTestimonialStart,
  getTestimonialSuccess,
  getTestimonialFailure,
} from "../reducers/TestimonialSlice";

import { getBackendType } from "../../lib/backendConfig";
import { getTestimonials } from "../../lib/supabase/queries/testimonials";
import api from "../../utils/api";

/**
 * Fetch testimonials data from the appropriate backend
 * Supports both Supabase and Django APIs
 */
export const fetchTestimonial = () => async (dispatch) => {
  try {
    dispatch(getTestimonialStart());
    
    const backendType = getBackendType();
    
    if (backendType === 'supabase') {
      // Use Supabase API
      const result = await getTestimonials();
      
      if (result.success) {
        dispatch(getTestimonialSuccess(result.data));
      } else {
        dispatch(getTestimonialFailure(result.error.message));
      }
    } else {
      // Use Django API (existing implementation)
      const response = await api.get("/api/testimonial/");
      dispatch(getTestimonialSuccess(response.data.Testimonial));
    }
  } catch (error) {
    dispatch(getTestimonialFailure(error.message || 'Failed to fetch testimonials'));
  }
};

/**
 * Fetch testimonials with fallback mechanism
 * If primary backend fails, tries the other backend
 */
export const fetchTestimonialWithFallback = () => async (dispatch) => {
  try {
    dispatch(getTestimonialStart());
    
    const backendType = getBackendType();
    let result = null;
    let error = null;
    
    // Try primary backend
    if (backendType === 'supabase') {
      result = await getTestimonials();
      if (result.success) {
        dispatch(getTestimonialSuccess(result.data));
        return;
      }
      error = result.error;
      
      // Fallback to Django
      const response = await api.get("/api/testimonial/");
      dispatch(getTestimonialSuccess(response.data.Testimonial));
    } else {
      try {
        const response = await api.get("/api/testimonial/");
        dispatch(getTestimonialSuccess(response.data.Testimonial));
        return;
      } catch (djangoError) {
        error = djangoError;
        
        // Fallback to Supabase
        result = await getTestimonials();
        if (result.success) {
          dispatch(getTestimonialSuccess(result.data));
        } else {
          dispatch(getTestimonialFailure(result.error.message));
        }
      }
    }
  } catch (error) {
    dispatch(getTestimonialFailure(error.message || 'Failed to fetch testimonials from both backends'));
  }
};
