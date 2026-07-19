import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SignOutButton } from './SignOutButton'

export const dynamic = 'force-dynamic'

const DASHBOARD_LINKS = [
  { href: '/profil', label: 'Mon profil' },
  { href: '/reservations', label: 'Mes réservations' },
  { href: '/cartes', label: 'Mes cartes cadeaux' },
]

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="container-site py-16">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-5xl text-dark">Mon espace</h1>
        <SignOutButton />
      </div>

      <nav className="mb-10 flex flex-wrap gap-3">
        {DASHBOARD_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-sand/60 bg-white/60 px-5 py-2 text-sm text-dark/80 transition-colors hover:border-sage hover:text-sage"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  )
}
