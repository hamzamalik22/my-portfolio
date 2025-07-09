/**
 * Backend Configuration
 * Manages backend type switching between Django and Supabase
 * Supports localStorage persistence and environment variable fallback
 */

const BACKEND_STORAGE_KEY = 'portfolio_backend_type';

/**
 * Get the current backend type
 * Priority: localStorage > environment variable > default (supabase)
 * @returns {string} 'supabase' or 'django'
 */
export const getBackendType = () => {
  // Check localStorage first
  const storedBackend = localStorage.getItem(BACKEND_STORAGE_KEY);
  if (storedBackend && (storedBackend === 'supabase' || storedBackend === 'django')) {
    return storedBackend;
  }
  
  // Fallback to environment variable
  const envBackend = import.meta.env.VITE_BACKEND_TYPE;
  if (envBackend && (envBackend === 'supabase' || envBackend === 'django')) {
    return envBackend;
  }
  
  // Default to supabase
  return 'supabase';
};

/**
 * Set the backend type
 * @param {string} backendType - 'supabase' or 'django'
 */
export const setBackendType = (backendType) => {
  if (backendType !== 'supabase' && backendType !== 'django') {
    throw new Error('Backend type must be either "supabase" or "django"');
  }
  
  localStorage.setItem(BACKEND_STORAGE_KEY, backendType);
  
  // Dispatch custom event for real-time updates
  window.dispatchEvent(new CustomEvent('backendTypeChanged', {
    detail: { backendType }
  }));
};

/**
 * Check if Supabase backend is being used
 * @returns {boolean}
 */
export const useSupabase = () => {
  return getBackendType() === 'supabase';
};

/**
 * Check if Django backend is being used
 * @returns {boolean}
 */
export const useDjango = () => {
  return getBackendType() === 'django';
};

/**
 * Get backend configuration for the current type
 * @returns {object} Backend configuration
 */
export const getBackendConfig = () => {
  const backendType = getBackendType();
  
  if (backendType === 'supabase') {
    return {
      type: 'supabase',
      url: import.meta.env.VITE_SUPABASE_URL,
      key: import.meta.env.VITE_SUPABASE_ANON_KEY,
      enableRealtime: import.meta.env.VITE_ENABLE_REALTIME === 'true'
    };
  } else {
    return {
      type: 'django',
      url: import.meta.env.VITE_DJANGO_BACKEND_URL || 'http://localhost:8000'
    };
  }
}; 