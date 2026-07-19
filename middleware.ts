import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  matcher: [
    // Routes protégées du dashboard client
    '/profil/:path*',
    '/reservations/:path*',
    '/cartes/:path*',
  ],
}
