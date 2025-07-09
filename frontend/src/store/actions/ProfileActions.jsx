import {
  getProfileStart,
  getProfileSuccess,
  getProfileFailure,
} from "../reducers/ProfileSlice";

import { getBackendType } from "../../lib/backendConfig";
import { getProfile } from "../../lib/supabase/queries/profile";
import api from "../../utils/api";

/**
 * Fetch profile data from the appropriate backend
 * Supports both Supabase and Django APIs
 */
export const fetchProfile = () => async (dispatch) => {
  try {
    dispatch(getProfileStart());
    
    const backendType = getBackendType();
    
    if (backendType === 'supabase') {
      // Use Supabase API
      const result = await getProfile();
      
      if (result.success) {
        dispatch(getProfileSuccess(result.data));
      } else {
        dispatch(getProfileFailure(result.error.message));
      }
    } else {
      // Use Django API (existing implementation)
      const response = await api.get("/api/profile/");
      dispatch(getProfileSuccess(response.data.Profile));
    }
  } catch (error) {
    dispatch(getProfileFailure(error.message || 'Failed to fetch profile'));
  }
};

/**
 * Fetch profile with fallback mechanism
 * If primary backend fails, tries the other backend
 */
export const fetchProfileWithFallback = () => async (dispatch) => {
  try {
    dispatch(getProfileStart());
    
    const backendType = getBackendType();
    let result = null;
    let error = null;
    
    // Try primary backend
    if (backendType === 'supabase') {
      result = await getProfile();
      if (result.success) {
        dispatch(getProfileSuccess(result.data));
        return;
      }
      error = result.error;
      
      // Fallback to Django
      const response = await api.get("/api/profile/");
      dispatch(getProfileSuccess(response.data.Profile));
    } else {
      try {
        const response = await api.get("/api/profile/");
        dispatch(getProfileSuccess(response.data.Profile));
        return;
      } catch (djangoError) {
        error = djangoError;
        
        // Fallback to Supabase
        result = await getProfile();
        if (result.success) {
          dispatch(getProfileSuccess(result.data));
        } else {
          dispatch(getProfileFailure(result.error.message));
        }
      }
    }
  } catch (error) {
    dispatch(getProfileFailure(error.message || 'Failed to fetch profile from both backends'));
  }
};

/**
 * Update profile data
 * @param {object} profileData - Profile data to update
 */
export const updateProfile = (profileData) => async (dispatch) => {
  try {
    dispatch(getProfileStart());
    
    const backendType = getBackendType();
    
    if (backendType === 'supabase') {
      // TODO: Implement Supabase update when needed
      console.log('Supabase update not implemented yet');
      dispatch(getProfileFailure('Update not implemented for Supabase yet'));
    } else {
      // TODO: Implement Django update when needed
      console.log('Django update not implemented yet');
      dispatch(getProfileFailure('Update not implemented for Django yet'));
    }
  } catch (error) {
    console.error('Profile update error:', error);
    dispatch(getProfileFailure(error.message || 'Failed to update profile'));
  }
};

/**
 * Test backend connectivity
 * @returns {Promise<object>} Test results
 */
export const testBackendConnectivity = async () => {
  const backendType = getBackendType();
  const results = {
    backendType,
    supabase: null,
    django: null
  };
  
  // Test Supabase
  try {
    const supabaseResult = await getProfile();
    results.supabase = {
      success: supabaseResult.success,
      error: supabaseResult.error?.message || null
    };
  } catch (error) {
    results.supabase = {
      success: false,
      error: error.message
    };
  }
  
  // Test Django
  try {
    const response = await api.get("/api/profile/");
    results.django = {
      success: true,
      error: null
    };
  } catch (error) {
    results.django = {
      success: false,
      error: error.message
    };
  }
  
  return results;
};
