'use client'

import { createBrowserClient } from '@supabase/ssr'

// NOTE : ajouter le générique <Database> une fois les types générés
// par le CLI Supabase (voir types/supabase.ts).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key'
  )
}
