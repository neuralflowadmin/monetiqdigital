"use client";

import { createClient, SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

/**
 * Returns a singleton Supabase client for use in Client Components.
 * Returns null if env vars are not configured yet, so the UI can
 * degrade gracefully instead of crashing during setup/preview.
 */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;

  if (!browserClient) {
    browserClient = createClient(url, anonKey);
  }
  return browserClient;
}
