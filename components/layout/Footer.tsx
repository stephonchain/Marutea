import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-dark text-cream/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display text-2xl text-cream mb-4">Marutea</h3>
            <p className="text-sm leading-relaxed">
              Votre spa bien-être à Arcachon. Un espace dédié à la détente et au
              ressourcement.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-cream mb-4 uppercase text-sm tracking-wide">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/soins" className="hover:text-terra transition-colors">
                Nos Soins
              </Link>
              <Link href="/cartes-cadeaux" className="hover:text-terra transition-colors">
                Cartes Cadeaux
              </Link>
              <Link href="/bien-etre" className="hover:text-terra transition-colors">
                Blog Bien-être
              </Link>
              <Link href="/reservation" className="hover:text-terra transition-colors">
                Réservation
              </Link>
              <Link href="/contact" className="hover:text-terra transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-medium text-cream mb-4 uppercase text-sm tracking-wide">
              Contact
            </h4>
            <div className="text-sm space-y-2">
              <p>Arcachon, France</p>
              <p>
                <a
                  href="mailto:contact@marutea.fr"
                  className="hover:text-terra transition-colors"
                >
                  contact@marutea.fr
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 text-center text-xs text-cream/50">
          &copy; {new Date().getFullYear()} Marutea. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
