/**
 * API Provider Abstraction Layer
 * Provides a unified interface for both Supabase and Django APIs
 */

import { getBackendType, BACKEND_CONFIG } from '../lib/backendConfig';
import { handleSupabaseOperation } from '../lib/supabase/errorHandler';
import api from './api'; // Existing Django API

/**
 * Supabase API wrapper
 */
class SupabaseAPI {
  constructor(supabaseClient) {
    this.supabase = supabaseClient;
  }

  /**
   * Generic GET request
   * @param {string} endpoint - API endpoint
   * @param {object} options - Query options
   * @returns {Promise<object>} Response data
   */
  async get(endpoint, options = {}) {
    const { table, select = '*', filters = {}, order = null, limit = null } = options;
    
    return handleSupabaseOperation(async () => {
      let query = this.supabase.from(table).select(select);
      
      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });
      
      // Apply ordering
      if (order) {
        query = query.order(order.column, { ascending: order.ascending !== false });
      }
      
      // Apply limit
      if (limit) {
        query = query.limit(limit);
      }
      
      return await query;
    }, `GET ${table}`);
  }

  /**
   * Generic POST request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Data to insert
   * @returns {Promise<object>} Response data
   */
  async post(endpoint, data) {
    const { table, insertData } = data;
    
    return handleSupabaseOperation(async () => {
      return await this.supabase.from(table).insert(insertData);
    }, `POST ${table}`);
  }

  /**
   * Generic PUT request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Data to update
   * @returns {Promise<object>} Response data
   */
  async put(endpoint, data) {
    const { table, updateData, filters = {} } = data;
    
    return handleSupabaseOperation(async () => {
      let query = this.supabase.from(table).update(updateData);
      
      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });
      
      return await query;
    }, `PUT ${table}`);
  }

  /**
   * Generic DELETE request
   * @param {string} endpoint - API endpoint
   * @param {object} options - Delete options
   * @returns {Promise<object>} Response data
   */
  async delete(endpoint, options = {}) {
    const { table, filters = {} } = options;
    
    return handleSupabaseOperation(async () => {
      let query = this.supabase.from(table).delete();
      
      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });
      
      return await query;
    }, `DELETE ${table}`);
  }
}

/**
 * Django API wrapper
 */
class DjangoAPI {
  constructor(axiosInstance) {
    this.api = axiosInstance;
  }

  /**
   * Generic GET request
   * @param {string} endpoint - API endpoint
   * @returns {Promise<object>} Response data
   */
  async get(endpoint) {
    try {
      const response = await this.api.get(endpoint);
      return {
        success: true,
        error: null,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        data: null
      };
    }
  }

  /**
   * Generic POST request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Data to send
   * @returns {Promise<object>} Response data
   */
  async post(endpoint, data) {
    try {
      const response = await this.api.post(endpoint, data);
      return {
        success: true,
        error: null,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        data: null
      };
    }
  }

  /**
   * Generic PUT request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Data to send
   * @returns {Promise<object>} Response data
   */
  async put(endpoint, data) {
    try {
      const response = await this.api.put(endpoint, data);
      return {
        success: true,
        error: null,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        data: null
      };
    }
  }

  /**
   * Generic DELETE request
   * @param {string} endpoint - API endpoint
   * @returns {Promise<object>} Response data
   */
  async delete(endpoint) {
    try {
      const response = await this.api.delete(endpoint);
      return {
        success: true,
        error: null,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        data: null
      };
    }
  }
}

// Initialize API instances
let supabaseAPI = null;
let djangoAPI = null;

/**
 * Get the appropriate API instance based on backend configuration
 * @returns {SupabaseAPI|DjangoAPI} API instance
 */
const getAPIInstance = () => {
  const backendType = getBackendType();
  
  if (backendType === 'supabase') {
    if (!supabaseAPI) {
      const { getSupabaseClient } = require('../lib/supabase/client');
      supabaseAPI = new SupabaseAPI(getSupabaseClient());
    }
    return supabaseAPI;
  } else {
    if (!djangoAPI) {
      djangoAPI = new DjangoAPI(api);
    }
    return djangoAPI;
  }
};

/**
 * Unified API Provider
 * Provides a consistent interface regardless of backend type
 */
export const apiProvider = {
  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {object} options - Additional options
   * @returns {Promise<object>} Response data
   */
  async get(endpoint, options = {}) {
    const apiInstance = getAPIInstance();
    return await apiInstance.get(endpoint, options);
  },

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Data to send
   * @returns {Promise<object>} Response data
   */
  async post(endpoint, data) {
    const apiInstance = getAPIInstance();
    return await apiInstance.post(endpoint, data);
  },

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Data to send
   * @returns {Promise<object>} Response data
   */
  async put(endpoint, data) {
    const apiInstance = getAPIInstance();
    return await apiInstance.put(endpoint, data);
  },

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @param {object} options - Additional options
   * @returns {Promise<object>} Response data
   */
  async delete(endpoint, options = {}) {
    const apiInstance = getAPIInstance();
    return await apiInstance.delete(endpoint, options);
  },

  /**
   * Get current backend type
   * @returns {string} Backend type
   */
  getBackendType() {
    return getBackendType();
  },

  /**
   * Check if using Supabase
   * @returns {boolean}
   */
  isSupabase() {
    return getBackendType() === 'supabase';
  },

  /**
   * Check if using Django
   * @returns {boolean}
   */
  isDjango() {
    return getBackendType() === 'django';
  },

  /**
   * Reset API instances (useful for testing)
   */
  reset() {
    supabaseAPI = null;
    djangoAPI = null;
  }
};

export default apiProvider; 