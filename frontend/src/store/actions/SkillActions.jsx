import {
  getSkillStart,
  getSkillSuccess,
  getSkillFailure,
} from "../reducers/SkillSlice";

import { getBackendType } from "../../lib/backendConfig";
import { getSkills } from "../../lib/supabase/queries/skills";
import api from "../../utils/api";

/**
 * Fetch skills data from the appropriate backend
 * Supports both Supabase and Django APIs
 */
export const fetchSkill = () => async (dispatch) => {
  try {
    dispatch(getSkillStart());
    
    const backendType = getBackendType();
    
    if (backendType === 'supabase') {
      // Use Supabase API
      const result = await getSkills();
      
      if (result.success) {
        dispatch(getSkillSuccess(result.data));
      } else {
        dispatch(getSkillFailure(result.error.message));
      }
    } else {
      // Use Django API (existing implementation)
      const response = await api.get("/api/skill/");
      dispatch(getSkillSuccess(response.data.Skill));
    }
  } catch (error) {
    dispatch(getSkillFailure(error.message || 'Failed to fetch skills'));
  }
};

/**
 * Fetch skills with fallback mechanism
 * If primary backend fails, tries the other backend
 */
export const fetchSkillWithFallback = () => async (dispatch) => {
  try {
    dispatch(getSkillStart());
    
    const backendType = getBackendType();
    let result = null;
    let error = null;
    
    // Try primary backend
    if (backendType === 'supabase') {
      result = await getSkills();
      if (result.success) {
        dispatch(getSkillSuccess(result.data));
        return;
      }
      error = result.error;
      
      // Fallback to Django
      const response = await api.get("/api/skill/");
      dispatch(getSkillSuccess(response.data.Skill));
    } else {
      try {
        const response = await api.get("/api/skill/");
        dispatch(getSkillSuccess(response.data.Skill));
        return;
      } catch (djangoError) {
        error = djangoError;
        
        // Fallback to Supabase
        result = await getSkills();
        if (result.success) {
          dispatch(getSkillSuccess(result.data));
        } else {
          dispatch(getSkillFailure(result.error.message));
        }
      }
    }
  } catch (error) {
    dispatch(getSkillFailure(error.message || 'Failed to fetch skills from both backends'));
  }
};
  