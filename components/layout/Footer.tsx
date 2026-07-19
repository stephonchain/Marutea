import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-24 bg-dark text-cream/80">
      <div className="container-site grid gap-10 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl text-sand">Marutea</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            Spa bien-être à Arcachon. Massages, soins du visage et rituels
            100% bio, dans un écrin de douceur.
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm uppercase tracking-widest text-sand">
            Navigation
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/soins" className="hover:text-cream">Nos soins</Link></li>
            <li><Link href="/cartes-cadeaux" className="hover:text-cream">Cartes cadeaux</Link></li>
            <li><Link href="/bien-etre" className="hover:text-cream">Conseils bien-être</Link></li>
            <li><Link href="/reservation" className="hover:text-cream">Réservation</Link></li>
            <li><Link href="/contact" className="hover:text-cream">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm uppercase tracking-widest text-sand">
            Contact
          </p>
          <ul className="space-y-2 text-sm">
            <li>Arcachon, France</li>
            <li>
              <a href="mailto:contact@marutea.fr" className="hover:text-cream">
                contact@marutea.fr
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-6 text-xs text-cream/50 md:flex-row">
          <p>© {new Date().getFullYear()} Marutea — Tous droits réservés</p>
          <p>Site sans trackers tiers 🌿</p>
        </div>
      </div>
    </footer>
  )
}
