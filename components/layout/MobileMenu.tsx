'use client'

import Link from 'next/link'
import { useEffect } from 'react'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  links: { href: string; label: string }[]
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-dark/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-72 bg-cream shadow-xl p-8 flex flex-col">
        <button
          onClick={onClose}
          className="self-end p-2 mb-8"
          aria-label="Fermer le menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <nav className="flex flex-col gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-lg font-medium text-dark hover:text-terra transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
