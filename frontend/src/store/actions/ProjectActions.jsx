import {
  getProjectStart,
  getProjectSuccess,
  getProjectFailure,
} from "../reducers/ProjectSlice";

import { getBackendType } from "../../lib/backendConfig";
import { getProjects } from "../../lib/supabase/queries/projects";
import api from "../../utils/api";

/**
 * Fetch projects data from the appropriate backend
 * Supports both Supabase and Django APIs
 */
export const fetchProject = () => async (dispatch) => {
  try {
    dispatch(getProjectStart());
    
    const backendType = getBackendType();
    
    if (backendType === 'supabase') {
      // Use Supabase API
      const result = await getProjects();
      
      if (result.success) {
        dispatch(getProjectSuccess(result.data));
      } else {
        dispatch(getProjectFailure(result.error.message));
      }
    } else {
      // Use Django API (existing implementation)
      const response = await api.get("/api/project/");
      dispatch(getProjectSuccess(response.data.Project));
    }
  } catch (error) {
    dispatch(getProjectFailure(error.message || 'Failed to fetch projects'));
  }
};

/**
 * Fetch projects with fallback mechanism
 * If primary backend fails, tries the other backend
 */
export const fetchProjectWithFallback = () => async (dispatch) => {
  try {
    dispatch(getProjectStart());
    
    const backendType = getBackendType();
    let result = null;
    let error = null;
    
    // Try primary backend
    if (backendType === 'supabase') {
      result = await getProjects();
      if (result.success) {
        dispatch(getProjectSuccess(result.data));
        return;
      }
      error = result.error;
      
      // Fallback to Django
      const response = await api.get("/api/project/");
      dispatch(getProjectSuccess(response.data.Project));
    } else {
      try {
        const response = await api.get("/api/project/");
        dispatch(getProjectSuccess(response.data.Project));
        return;
      } catch (djangoError) {
        error = djangoError;
        
        // Fallback to Supabase
        result = await getProjects();
        if (result.success) {
          dispatch(getProjectSuccess(result.data));
        } else {
          dispatch(getProjectFailure(result.error.message));
        }
      }
    }
  } catch (error) {
    dispatch(getProjectFailure(error.message || 'Failed to fetch projects from both backends'));
  }
};
  