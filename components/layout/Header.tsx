import Link from 'next/link'
import { MobileMenu } from './MobileMenu'

export const NAV_LINKS = [
  { href: '/soins', label: 'Nos soins' },
  { href: '/cartes-cadeaux', label: 'Cartes cadeaux' },
  { href: '/bien-etre', label: 'Bien-être' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-sand/30 bg-cream/90 backdrop-blur">
      <div className="container-site flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-3xl text-sage">
          Marutea
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-dark/70 transition-colors hover:text-dark"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/profil" className="text-sm text-dark/70 hover:text-dark">
            Mon compte
          </Link>
          <Link href="/reservation" className="btn-primary !py-2.5 text-sm">
            Réserver
          </Link>
        </nav>

        <MobileMenu />
      </div>
    </header>
  )
}
