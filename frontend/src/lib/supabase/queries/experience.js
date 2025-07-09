/**
 * Experience Queries for Supabase
 * Handles all experience-related database operations
 * Uses 'api_experience' table to match Django schema
 */

import { getSupabaseClient } from '../client';
import { handleSupabaseOperation } from '../errorHandler';

/**
 * Get all experience entries
 * @returns {Promise<object>} Experience data
 */
export const getExperience = async () => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_experience')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) throw error;
    return { data };
  }, 'Get Experience');
};

/**
 * Get experience by ID
 * @param {number} id - Experience ID
 * @returns {Promise<object>} Experience data
 */
export const getExperienceById = async (id) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_experience')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Get Experience by ID');
};

/**
 * Create new experience entry
 * @param {object} experienceData - Experience data
 * @returns {Promise<object>} Created experience
 */
export const createExperience = async (experienceData) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_experience')
      .insert([experienceData])
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Create Experience');
};

/**
 * Update experience entry
 * @param {number} id - Experience ID
 * @param {object} updateData - Data to update
 * @returns {Promise<object>} Updated experience
 */
export const updateExperience = async (id, updateData) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_experience')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Update Experience');
};

/**
 * Delete experience entry
 * @param {number} id - Experience ID
 * @returns {Promise<object>} Deletion result
 */
export const deleteExperience = async (id) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('api_experience')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { data: { success: true } };
  }, 'Delete Experience');
};

/**
 * Get experience by year range
 * @param {number} startYear - Start year
 * @param {string} endYear - End year
 * @returns {Promise<object>} Filtered experience
 */
export const getExperienceByYearRange = async (startYear, endYear) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_experience')
      .select('*')
      .gte('start_year', startYear)
      .lte('end_year', endYear)
      .order('order', { ascending: true });
    
    if (error) throw error;
    return { data };
  }, 'Get Experience by Year Range');
};

/**
 * Search experience by company name
 * @param {string} searchTerm - Search term
 * @returns {Promise<object>} Matching experience
 */
export const searchExperience = async (searchTerm) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_experience')
      .select('*')
      .ilike('company_name', `%${searchTerm}%`)
      .order('order', { ascending: true });
    
    if (error) throw error;
    return { data };
  }, 'Search Experience');
};

/**
 * Get experience with pagination
 * @param {number} page - Page number
 * @param {number} pageSize - Page size
 * @returns {Promise<object>} Paginated experience
 */
export const getExperiencePaginated = async (page = 1, pageSize = 10) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error, count } = await supabase
      .from('api_experience')
      .select('*', { count: 'exact' })
      .order('order', { ascending: true })
      .range(from, to);
    
    if (error) throw error;
    return { 
      data: {
        experience: data,
        pagination: {
          page,
          pageSize,
          total: count,
          totalPages: Math.ceil(count / pageSize)
        }
      }
    };
  }, 'Get Experience Paginated');
}; 