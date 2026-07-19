import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// NOTE : ajouter le générique <Database> une fois les types générés
// par le CLI Supabase (voir types/supabase.ts).

/** Client Supabase côté serveur (Server Components, Route Handlers, Server Actions). */
export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(
          cookiesToSet: {
            name: string
            value: string
            options?: Record<string, unknown>
          }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Appelé depuis un Server Component : les cookies sont posés par le middleware.
          }
        },
      },
    }
  )
}

/**
 * Client admin (service role) — usage serveur UNIQUEMENT (webhooks, admin).
 * Ne jamais importer côté client.
 */
export function createAdminClient() {
  const { createClient: createSupabaseClient } =
    require('@supabase/supabase-js') as typeof import('@supabase/supabase-js')

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'placeholder-service-key',
    { auth: { persistSession: false } }
  )
}
