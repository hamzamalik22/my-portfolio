import {
  getAboutStart,
  getAboutSuccess,
  getAboutFailure,
} from "../reducers/AboutSlice";

import { getBackendType } from "../../lib/backendConfig";
import { getAbout } from "../../lib/supabase/queries/about";
import api from "../../utils/api";

/**
 * Fetch about data from the appropriate backend
 * Supports both Supabase and Django APIs
 */
export const fetchAbout = () => async (dispatch) => {
  try {
    dispatch(getAboutStart());
    
    const backendType = getBackendType();
    
    if (backendType === 'supabase') {
      // Use Supabase API
      const result = await getAbout();
      
      if (result.success) {
        dispatch(getAboutSuccess(result.data));
      } else {
        dispatch(getAboutFailure(result.error.message));
      }
    } else {
      // Use Django API (existing implementation)
      const response = await api.get("/api/about/");
      dispatch(getAboutSuccess(response.data.About));
    }
  } catch (error) {
    dispatch(getAboutFailure(error.message || 'Failed to fetch about'));
  }
};

/**
 * Fetch about with fallback mechanism
 * If primary backend fails, tries the other backend
 */
export const fetchAboutWithFallback = () => async (dispatch) => {
  try {
    dispatch(getAboutStart());
    
    const backendType = getBackendType();
    let result = null;
    let error = null;
    
    // Try primary backend
    if (backendType === 'supabase') {
      result = await getAbout();
      if (result.success) {
        dispatch(getAboutSuccess(result.data));
        return;
      }
      error = result.error;
      
      // Fallback to Django
      const response = await api.get("/api/about/");
      dispatch(getAboutSuccess(response.data.About));
    } else {
      try {
        const response = await api.get("/api/about/");
        dispatch(getAboutSuccess(response.data.About));
        return;
      } catch (djangoError) {
        error = djangoError;
        
        // Fallback to Supabase
        result = await getAbout();
        if (result.success) {
          dispatch(getAboutSuccess(result.data));
        } else {
          dispatch(getAboutFailure(result.error.message));
        }
      }
    }
  } catch (error) {
    dispatch(getAboutFailure(error.message || 'Failed to fetch about from both backends'));
  }
};
  