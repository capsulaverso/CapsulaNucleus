// lib/db/queries.ts
// This file will contain reusable database query functions.
// Using a dedicated file for queries helps to centralize data access logic
// and makes it easier to manage, test, and reuse.

import { supabase } from './supabase';

// Example query function
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
}
