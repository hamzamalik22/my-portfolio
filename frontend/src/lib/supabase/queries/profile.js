/**
 * Profile Queries for Supabase
 * Handles all profile-related database operations
 * Uses 'api_profile' table to match Django schema
 */

import { getSupabaseClient } from '../client';
import { handleSupabaseOperation } from '../errorHandler';

/**
 * Get profile data
 * @returns {Promise<object>} Profile data
 */
export const getProfile = async () => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_profile')
      .select('*')
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Get Profile');
};

/**
 * Get profile by ID
 * @param {number} id - Profile ID
 * @returns {Promise<object>} Profile data
 */
export const getProfileById = async (id) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_profile')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Get Profile by ID');
};

/**
 * Create new profile
 * @param {object} profileData - Profile data
 * @returns {Promise<object>} Created profile
 */
export const createProfile = async (profileData) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_profile')
      .insert([profileData])
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Create Profile');
};

/**
 * Update profile
 * @param {number} id - Profile ID
 * @param {object} updateData - Data to update
 * @returns {Promise<object>} Updated profile
 */
export const updateProfile = async (id, updateData) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_profile')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Update Profile');
};

/**
 * Delete profile
 * @param {number} id - Profile ID
 * @returns {Promise<object>} Deletion result
 */
export const deleteProfile = async (id) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('api_profile')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { data: { success: true } };
  }, 'Delete Profile');
};

/**
 * Get profile count
 * @returns {Promise<object>} Profile count
 */
export const getProfileCount = async () => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { count, error } = await supabase
      .from('api_profile')
      .select('*', { count: 'exact', head: true });
    
    if (error) throw error;
    return { data: { count } };
  }, 'Get Profile Count');
};

/**
 * Search profiles by name
 * @param {string} searchTerm - Search term
 * @returns {Promise<object>} Matching profiles
 */
export const searchProfiles = async (searchTerm) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_profile')
      .select('*')
      .ilike('name', `%${searchTerm}%`);
    
    if (error) throw error;
    return { data };
  }, 'Search Profiles');
};

/**
 * Get profiles with pagination
 * @param {number} page - Page number
 * @param {number} pageSize - Page size
 * @returns {Promise<object>} Paginated profiles
 */
export const getProfilesPaginated = async (page = 1, pageSize = 10) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error, count } = await supabase
      .from('api_profile')
      .select('*', { count: 'exact' })
      .range(from, to);
    
    if (error) throw error;
    return { 
      data: {
        profiles: data,
        pagination: {
          page,
          pageSize,
          total: count,
          totalPages: Math.ceil(count / pageSize)
        }
      }
    };
  }, 'Get Profiles Paginated');
}; 