/**
 * Supabase Client Configuration
 * Provides a centralized Supabase client instance
 */

import { createClient } from '@supabase/supabase-js';

// Get environment variables using Vite's import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  );
}

// Create Supabase client
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

/**
 * Get the Supabase client instance
 * @returns {SupabaseClient} Supabase client
 */
export const getSupabaseClient = () => {
  return supabaseClient;
};

/**
 * Get Supabase configuration
 * @returns {object} Configuration object
 */
export const getSupabaseConfig = () => {
  return {
    url: supabaseUrl,
    key: supabaseAnonKey,
    enableRealtime: import.meta.env.VITE_ENABLE_REALTIME === 'true'
  };
}; 