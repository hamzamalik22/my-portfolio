/**
 * Skills Queries for Supabase
 * Handles all skill-related database operations
 * Uses 'api_skill' table to match Django schema
 */

import { getSupabaseClient } from '../client';
import { handleSupabaseOperation } from '../errorHandler';

/**
 * Get all skills
 * @returns {Promise<object>} Skills data
 */
export const getSkills = async () => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_skill')
      .select('*')
      .order('level_in_percent', { ascending: false });
    
    if (error) throw error;
    return { data };
  }, 'Get Skills');
};

/**
 * Get skill by ID
 * @param {number} id - Skill ID
 * @returns {Promise<object>} Skill data
 */
export const getSkillById = async (id) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_skill')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Get Skill by ID');
};

/**
 * Create new skill
 * @param {object} skillData - Skill data
 * @returns {Promise<object>} Created skill
 */
export const createSkill = async (skillData) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_skill')
      .insert([skillData])
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Create Skill');
};

/**
 * Update skill
 * @param {number} id - Skill ID
 * @param {object} updateData - Data to update
 * @returns {Promise<object>} Updated skill
 */
export const updateSkill = async (id, updateData) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_skill')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  }, 'Update Skill');
};

/**
 * Delete skill
 * @param {number} id - Skill ID
 * @returns {Promise<object>} Deletion result
 */
export const deleteSkill = async (id) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('api_skill')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { data: { success: true } };
  }, 'Delete Skill');
};

/**
 * Get skills by level range
 * @param {number} minLevel - Minimum level percentage
 * @param {number} maxLevel - Maximum level percentage
 * @returns {Promise<object>} Filtered skills
 */
export const getSkillsByLevel = async (minLevel, maxLevel) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_skill')
      .select('*')
      .gte('level_in_percent', minLevel)
      .lte('level_in_percent', maxLevel)
      .order('level_in_percent', { ascending: false });
    
    if (error) throw error;
    return { data };
  }, 'Get Skills by Level');
};

/**
 * Search skills by name
 * @param {string} searchTerm - Search term
 * @returns {Promise<object>} Matching skills
 */
export const searchSkills = async (searchTerm) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_skill')
      .select('*')
      .ilike('name', `%${searchTerm}%`)
      .order('level_in_percent', { ascending: false });
    
    if (error) throw error;
    return { data };
  }, 'Search Skills');
};

/**
 * Get skills with pagination
 * @param {number} page - Page number
 * @param {number} pageSize - Page size
 * @returns {Promise<object>} Paginated skills
 */
export const getSkillsPaginated = async (page = 1, pageSize = 10) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error, count } = await supabase
      .from('api_skill')
      .select('*', { count: 'exact' })
      .order('level_in_percent', { ascending: false })
      .range(from, to);
    
    if (error) throw error;
    return { 
      data: {
        skills: data,
        pagination: {
          page,
          pageSize,
          total: count,
          totalPages: Math.ceil(count / pageSize)
        }
      }
    };
  }, 'Get Skills Paginated');
}; 