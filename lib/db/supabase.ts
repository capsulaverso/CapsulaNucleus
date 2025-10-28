// lib/db/supabase.ts
// This file initializes the Supabase client.
// It reads the environment variables for the Supabase URL and anon key,
// creating a singleton client instance that can be used throughout the application.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
