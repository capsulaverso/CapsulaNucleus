// types/database.ts
// This file will contain TypeScript types generated from the database schema.
// Tools like `supabase gen types` can automatically create these definitions,
// providing type safety when interacting with the database.

// This is a placeholder. The actual types will be generated.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {}; // Replace with your table columns
        Insert: {}; // Replace with your table columns
        Update: {}; // Replace with your table columns
      };
      // ... other tables
    };
    Views: {
      [_ in never]: never
    };
    Functions: {
      [_ in never]: never
    };
  }
}
