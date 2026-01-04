import { createBrowserClient } from '@supabase/ssr';

/**
 * Create a Supabase client for use in the browser (Client Components)
 * Returns null if environment variables are not configured
 */
export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        // Return a mock client for build time
        console.warn('Supabase environment variables not configured');
        return null;
    }

    return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
