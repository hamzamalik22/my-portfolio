/**
 * About Queries for Supabase
 * Handles all about-related database operations
 * Uses 'api_about' table to match Django schema
 */

import { getSupabaseClient } from '../client';
import { handleSupabaseOperation } from '../errorHandler';

/**
 * Get about data
 * @returns {Promise<object>} About data
 */
export const getAbout = async () => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_about')
      .select('*')
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Get About');
};

/**
 * Get about by ID
 * @param {number} id - About ID
 * @returns {Promise<object>} About data
 */
export const getAboutById = async (id) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_about')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Get About by ID');
};

/**
 * Create new about section
 * @param {object} aboutData - About data
 * @returns {Promise<object>} Created about data
 */
export const createAbout = async (aboutData) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_about')
      .insert([aboutData])
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Create About');
};

/**
 * Update about section
 * @param {number} id - About ID
 * @param {object} updateData - Data to update
 * @returns {Promise<object>} Updated about data
 */
export const updateAbout = async (id, updateData) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_about')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Update About');
};

/**
 * Delete about section
 * @param {number} id - About ID
 * @returns {Promise<object>} Deletion result
 */
export const deleteAbout = async (id) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('api_about')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { data: { success: true } };
  }, 'Delete About');
};

/**
 * Get all about sections
 * @returns {Promise<object>} All about data
 */
export const getAllAbout = async () => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_about')
      .select('*');
    
    if (error) throw error;
    return { data };
  }, 'Get All About');
}; 