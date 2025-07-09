/**
 * Projects Queries for Supabase
 * Handles all project-related database operations
 * Uses 'api_project' table to match Django schema
 */

import { getSupabaseClient } from '../client';
import { handleSupabaseOperation } from '../errorHandler';

/**
 * Transform project data to include full Cloudinary URLs
 * @param {Array|Object} data - Project data from database
 * @returns {Array|Object} Transformed project data
 */
const transformProjectData = (data) => {
  const cloudinaryBaseUrl = 'https://res.cloudinary.com/dut0so6xj/';
  
  const transformSingleProject = (project) => {
    if (!project) return project;
    
    return {
      ...project,
      featured_image: project.featured_image 
        ? `${cloudinaryBaseUrl}${project.featured_image}`
        : project.featured_image
    };
  };
  
  if (Array.isArray(data)) {
    return data.map(transformSingleProject);
  }
  
  return transformSingleProject(data);
};

/**
 * Get all projects
 * @returns {Promise<object>} Projects data
 */
export const getProjects = async () => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_project')
      .select(`
        *,
        category:api_category(title)
      `)
      .order('order', { ascending: true });
    
    if (error) throw error;
    
    // Transform the data to include full Cloudinary URLs
    const transformedData = transformProjectData(data);
    
    return { data: transformedData };
  }, 'Get Projects');
};

/**
 * Get project by ID
 * @param {number} id - Project ID
 * @returns {Promise<object>} Project data
 */
export const getProjectById = async (id) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_project')
      .select(`
        *,
        category:api_category(title)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    // Transform the data to include full Cloudinary URL
    const transformedData = transformProjectData(data);
    
    return { data: transformedData };
  }, 'Get Project by ID');
};

/**
 * Create new project
 * @param {object} projectData - Project data
 * @returns {Promise<object>} Created project
 */
export const createProject = async (projectData) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_project')
      .insert([projectData])
      .select(`
        *,
        category:api_category(title)
      `)
      .single();
    
    if (error) throw error;
    
    // Transform the data to include full Cloudinary URL
    const transformedData = transformProjectData(data);
    
    return { data: transformedData };
  }, 'Create Project');
};

/**
 * Update project
 * @param {number} id - Project ID
 * @param {object} updateData - Data to update
 * @returns {Promise<object>} Updated project
 */
export const updateProject = async (id, updateData) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_project')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        category:api_category(title)
      `)
      .single();
    
    if (error) throw error;
    
    // Transform the data to include full Cloudinary URL
    const transformedData = transformProjectData(data);
    
    return { data: transformedData };
  }, 'Update Project');
};

/**
 * Delete project
 * @param {number} id - Project ID
 * @returns {Promise<object>} Deletion result
 */
export const deleteProject = async (id) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('api_project')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { data: { success: true } };
  }, 'Delete Project');
};

/**
 * Get projects by category
 * @param {number} categoryId - Category ID
 * @returns {Promise<object>} Filtered projects
 */
export const getProjectsByCategory = async (categoryId) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_project')
      .select(`
        *,
        category:api_category(title)
      `)
      .eq('category_id', categoryId)
      .order('order', { ascending: true });
    
    if (error) throw error;
    
    // Transform the data to include full Cloudinary URLs
    const transformedData = transformProjectData(data);
    
    return { data: transformedData };
  }, 'Get Projects by Category');
};

/**
 * Search projects by title
 * @param {string} searchTerm - Search term
 * @returns {Promise<object>} Matching projects
 */
export const searchProjects = async (searchTerm) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_project')
      .select(`
        *,
        category:api_category(title)
      `)
      .ilike('title', `%${searchTerm}%`)
      .order('order', { ascending: true });
    
    if (error) throw error;
    
    // Transform the data to include full Cloudinary URLs
    const transformedData = transformProjectData(data);
    
    return { data: transformedData };
  }, 'Search Projects');
};

/**
 * Get projects with pagination
 * @param {number} page - Page number
 * @param {number} pageSize - Page size
 * @returns {Promise<object>} Paginated projects
 */
export const getProjectsPaginated = async (page = 1, pageSize = 10) => {
  return handleSupabaseOperation(async () => {
    const supabase = getSupabaseClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error, count } = await supabase
      .from('api_project')
      .select(`
        *,
        category:api_category(title)
      `, { count: 'exact' })
      .order('order', { ascending: true })
      .range(from, to);
    
    if (error) throw error;
    
    // Transform the data to include full Cloudinary URLs
    const transformedData = transformProjectData(data);
    
    return { 
      data: {
        projects: transformedData,
        pagination: {
          page,
          pageSize,
          total: count,
          totalPages: Math.ceil(count / pageSize)
        }
      }
    };
  }, 'Get Projects Paginated');
}; 