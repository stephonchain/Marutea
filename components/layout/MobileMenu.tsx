'use client'

import { useState } from 'react'
import Link from 'next/link'

const LINKS = [
  { href: '/soins', label: 'Nos soins' },
  { href: '/cartes-cadeaux', label: 'Cartes cadeaux' },
  { href: '/bien-etre', label: 'Bien-être' },
  { href: '/reservation', label: 'Réserver' },
  { href: '/contact', label: 'Contact' },
  { href: '/profil', label: 'Mon compte' },
]

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={open}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`h-0.5 w-6 bg-dark transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}
        />
        <span className={`h-0.5 w-6 bg-dark transition-opacity ${open ? 'opacity-0' : ''}`} />
        <span
          className={`h-0.5 w-6 bg-dark transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}
        />
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-20 border-b border-sand/30 bg-cream shadow-lg">
          <ul className="container-site flex flex-col py-4">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-lg text-dark/80 hover:text-sage"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
