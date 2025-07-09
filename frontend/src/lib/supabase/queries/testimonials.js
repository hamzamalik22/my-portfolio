/**
 * Testimonials Queries for Supabase
 * Handles all testimonial-related database operations
 * Uses 'api_testimonial' table to match Django schema
 */

import { getSupabaseClient } from '../client';
import { handleSupabaseOperation } from '../errorHandler';

/**
 * Get all testimonials
 * @returns {Promise<object>} Testimonials data
 */
export const getTestimonials = async () => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_testimonial')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) throw error;
    return { data };
  }, 'Get Testimonials');
};

/**
 * Get testimonial by ID
 * @param {number} id - Testimonial ID
 * @returns {Promise<object>} Testimonial data
 */
export const getTestimonialById = async (id) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_testimonial')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Get Testimonial by ID');
};

/**
 * Create new testimonial
 * @param {object} testimonialData - Testimonial data
 * @returns {Promise<object>} Created testimonial
 */
export const createTestimonial = async (testimonialData) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_testimonial')
      .insert([testimonialData])
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Create Testimonial');
};

/**
 * Update testimonial
 * @param {number} id - Testimonial ID
 * @param {object} updateData - Data to update
 * @returns {Promise<object>} Updated testimonial
 */
export const updateTestimonial = async (id, updateData) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_testimonial')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Update Testimonial');
};

/**
 * Delete testimonial
 * @param {number} id - Testimonial ID
 * @returns {Promise<object>} Deletion result
 */
export const deleteTestimonial = async (id) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('api_testimonial')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { data: { success: true } };
  }, 'Delete Testimonial');
};

/**
 * Get testimonials by gender
 * @param {string} gender - Gender filter ('Male' or 'Female')
 * @returns {Promise<object>} Filtered testimonials
 */
export const getTestimonialsByGender = async (gender) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_testimonial')
      .select('*')
      .eq('gender', gender)
      .order('id', { ascending: true });
    
    if (error) throw error;
    return { data };
  }, 'Get Testimonials by Gender');
};

/**
 * Search testimonials by name
 * @param {string} searchTerm - Search term
 * @returns {Promise<object>} Matching testimonials
 */
export const searchTestimonials = async (searchTerm) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_testimonial')
      .select('*')
      .ilike('name', `%${searchTerm}%`)
      .order('id', { ascending: true });
    
    if (error) throw error;
    return { data };
  }, 'Search Testimonials');
};

/**
 * Get testimonials with pagination
 * @param {number} page - Page number
 * @param {number} pageSize - Page size
 * @returns {Promise<object>} Paginated testimonials
 */
export const getTestimonialsPaginated = async (page = 1, pageSize = 10) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error, count } = await supabase
      .from('api_testimonial')
      .select('*', { count: 'exact' })
      .order('id', { ascending: true })
      .range(from, to);
    
    if (error) throw error;
    return { 
      data: {
        testimonials: data,
        pagination: {
          page,
          pageSize,
          total: count,
          totalPages: Math.ceil(count / pageSize)
        }
      }
    };
  }, 'Get Testimonials Paginated');
}; 