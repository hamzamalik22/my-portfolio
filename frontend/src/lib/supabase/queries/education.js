/**
 * Education Queries for Supabase
 * Handles all education-related database operations
 * Uses 'api_education' table to match Django schema
 */

import { getSupabaseClient } from '../client';
import { handleSupabaseOperation } from '../errorHandler';

/**
 * Get all education entries
 * @returns {Promise<object>} Education data
 */
export const getEducation = async () => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_education')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) throw error;
    return { data };
  }, 'Get Education');
};

/**
 * Get education by ID
 * @param {number} id - Education ID
 * @returns {Promise<object>} Education data
 */
export const getEducationById = async (id) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_education')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Get Education by ID');
};

/**
 * Create new education entry
 * @param {object} educationData - Education data
 * @returns {Promise<object>} Created education
 */
export const createEducation = async (educationData) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_education')
      .insert([educationData])
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Create Education');
};

/**
 * Update education entry
 * @param {number} id - Education ID
 * @param {object} updateData - Data to update
 * @returns {Promise<object>} Updated education
 */
export const updateEducation = async (id, updateData) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_education')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Update Education');
};

/**
 * Delete education entry
 * @param {number} id - Education ID
 * @returns {Promise<object>} Deletion result
 */
export const deleteEducation = async (id) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('api_education')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { data: { success: true } };
  }, 'Delete Education');
};

/**
 * Get education by year range
 * @param {number} startYear - Start year
 * @param {number} endYear - End year
 * @returns {Promise<object>} Filtered education
 */
export const getEducationByYearRange = async (startYear, endYear) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_education')
      .select('*')
      .gte('start_year', startYear)
      .lte('end_year', endYear)
      .order('order', { ascending: true });
    
    if (error) throw error;
    return { data };
  }, 'Get Education by Year Range');
};

/**
 * Search education by school name
 * @param {string} searchTerm - Search term
 * @returns {Promise<object>} Matching education
 */
export const searchEducation = async (searchTerm) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_education')
      .select('*')
      .ilike('school_name', `%${searchTerm}%`)
      .order('order', { ascending: true });
    
    if (error) throw error;
    return { data };
  }, 'Search Education');
};

/**
 * Get education with pagination
 * @param {number} page - Page number
 * @param {number} pageSize - Page size
 * @returns {Promise<object>} Paginated education
 */
export const getEducationPaginated = async (page = 1, pageSize = 10) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error, count } = await supabase
      .from('api_education')
      .select('*', { count: 'exact' })
      .order('order', { ascending: true })
      .range(from, to);
    
    if (error) throw error;
    return { 
      data: {
        education: data,
        pagination: {
          page,
          pageSize,
          total: count,
          totalPages: Math.ceil(count / pageSize)
        }
      }
    };
  }, 'Get Education Paginated');
}; 