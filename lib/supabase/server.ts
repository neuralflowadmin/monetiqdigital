import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service role key.
 * Never import this file from a Client Component.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
