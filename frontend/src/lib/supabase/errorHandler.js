/**
 * Supabase Error Handler
 * Provides centralized error handling for Supabase operations
 */

/**
 * Handle Supabase operations with error handling
 * @param {Function} operation - The Supabase operation to execute
 * @param {string} operationName - Name of the operation for error context
 * @returns {Promise<object>} Result object with success/error status
 */
export const handleSupabaseOperation = async (operation, operationName = 'Unknown') => {
  try {
    const result = await operation();
    return {
      success: true,
      data: result.data,
      message: `${operationName} completed successfully`
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message: error.message || `Failed to ${operationName.toLowerCase()}`,
        code: error.code,
        details: error.details,
        hint: error.hint
      },
      message: `${operationName} failed`
    };
  }
};

/**
 * Format Supabase error for display
 * @param {object} error - Supabase error object
 * @returns {string} Formatted error message
 */
export const formatSupabaseError = (error) => {
  if (!error) return 'Unknown error occurred';
  
  if (error.message) {
    return error.message;
  }
  
  if (error.details) {
    return error.details;
  }
  
  if (error.hint) {
    return error.hint;
  }
  
  return 'An unexpected error occurred';
};

/**
 * Check if error is a network error
 * @param {object} error - Error object
 * @returns {boolean} True if network error
 */
export const isNetworkError = (error) => {
  return error && (
    error.message?.includes('network') ||
    error.message?.includes('fetch') ||
    error.message?.includes('connection') ||
    error.code === 'NETWORK_ERROR'
  );
};

/**
 * Check if error is an authentication error
 * @param {object} error - Error object
 * @returns {boolean} True if auth error
 */
export const isAuthError = (error) => {
  return error && (
    error.message?.includes('auth') ||
    error.message?.includes('unauthorized') ||
    error.message?.includes('forbidden') ||
    error.code === 'PGRST116'
  );
}; 