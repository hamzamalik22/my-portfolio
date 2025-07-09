import {
  getExperienceStart,
  getExperienceSuccess,
  getExperienceFailure,
} from "../reducers/ExperienceSlice";

import { getBackendType } from "../../lib/backendConfig";
import { getExperience } from "../../lib/supabase/queries/experience";
import api from "../../utils/api";

/**
 * Fetch experience data from the appropriate backend
 * Supports both Supabase and Django APIs
 */
export const fetchExperience = () => async (dispatch) => {
  try {
    dispatch(getExperienceStart());
    
    const backendType = getBackendType();
    
    if (backendType === 'supabase') {
      // Use Supabase API
      const result = await getExperience();
      
      if (result.success) {
        dispatch(getExperienceSuccess(result.data));
      } else {
        dispatch(getExperienceFailure(result.error.message));
      }
    } else {
      // Use Django API (existing implementation)
      const response = await api.get("/api/experience/");
      dispatch(getExperienceSuccess(response.data.Experience));
    }
  } catch (error) {
    dispatch(getExperienceFailure(error.message || 'Failed to fetch experience'));
  }
};

/**
 * Fetch experience with fallback mechanism
 * If primary backend fails, tries the other backend
 */
export const fetchExperienceWithFallback = () => async (dispatch) => {
  try {
    dispatch(getExperienceStart());
    
    const backendType = getBackendType();
    let result = null;
    let error = null;
    
    // Try primary backend
    if (backendType === 'supabase') {
      result = await getExperience();
      if (result.success) {
        dispatch(getExperienceSuccess(result.data));
        return;
      }
      error = result.error;
      
      // Fallback to Django
      const response = await api.get("/api/experience/");
      dispatch(getExperienceSuccess(response.data.Experience));
    } else {
      try {
        const response = await api.get("/api/experience/");
        dispatch(getExperienceSuccess(response.data.Experience));
        return;
      } catch (djangoError) {
        error = djangoError;
        
        // Fallback to Supabase
        result = await getExperience();
        if (result.success) {
          dispatch(getExperienceSuccess(result.data));
        } else {
          dispatch(getExperienceFailure(result.error.message));
        }
      }
    }
  } catch (error) {
    dispatch(getExperienceFailure(error.message || 'Failed to fetch experience from both backends'));
  }
};
  