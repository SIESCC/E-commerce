
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;
let isSupabaseConfigured = false;

if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    isSupabaseConfigured = true;
} else {
    console.warn('Supabase credentials missing! Fallback to local storage mode.');
}

export { supabase, isSupabaseConfigured };


// Instructions:
// 1. Create a project at https://supabase.com
// 2. Get the URL and Anon Key from Project Settings > API
// 3. Create a .env file in the root of your project
// 4. Add:
//    VITE_SUPABASE_URL=your_project_url
//    VITE_SUPABASE_ANON_KEY=your_anon_key
