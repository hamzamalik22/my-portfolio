import {
  getEducationStart,
  getEducationSuccess,
  getEducationFailure,
} from "../reducers/EducationSlice";

import { getBackendType } from "../../lib/backendConfig";
import { getEducation } from "../../lib/supabase/queries/education";
import api from "../../utils/api";

/**
 * Fetch education data from the appropriate backend
 * Supports both Supabase and Django APIs
 */
export const fetchEducation = () => async (dispatch) => {
  try {
    dispatch(getEducationStart());
    
    const backendType = getBackendType();
    
    if (backendType === 'supabase') {
      // Use Supabase API
      const result = await getEducation();
      
      if (result.success) {
        dispatch(getEducationSuccess(result.data));
      } else {
        dispatch(getEducationFailure(result.error.message));
      }
    } else {
      // Use Django API (existing implementation)
      const response = await api.get("/api/education/");
      dispatch(getEducationSuccess(response.data.Education));
    }
  } catch (error) {
    dispatch(getEducationFailure(error.message || 'Failed to fetch education'));
  }
};

/**
 * Fetch education with fallback mechanism
 * If primary backend fails, tries the other backend
 */
export const fetchEducationWithFallback = () => async (dispatch) => {
  try {
    dispatch(getEducationStart());
    
    const backendType = getBackendType();
    let result = null;
    let error = null;
    
    // Try primary backend
    if (backendType === 'supabase') {
      result = await getEducation();
      if (result.success) {
        dispatch(getEducationSuccess(result.data));
        return;
      }
      error = result.error;
      
      // Fallback to Django
      const response = await api.get("/api/education/");
      dispatch(getEducationSuccess(response.data.Education));
    } else {
      try {
        const response = await api.get("/api/education/");
        dispatch(getEducationSuccess(response.data.Education));
        return;
      } catch (djangoError) {
        error = djangoError;
        
        // Fallback to Supabase
        result = await getEducation();
        if (result.success) {
          dispatch(getEducationSuccess(result.data));
        } else {
          dispatch(getEducationFailure(result.error.message));
        }
      }
    }
  } catch (error) {
    dispatch(getEducationFailure(error.message || 'Failed to fetch education from both backends'));
  }
};
  