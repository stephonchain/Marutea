import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-dark/5">
      {/* Placeholder for full-screen background image */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/20 to-dark/40" />

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="font-display text-5xl md:text-7xl text-dark mb-6">
          Marutea
        </h1>
        <p className="text-lg md:text-xl text-dark/70 mb-10 leading-relaxed">
          Votre parenthèse bien-être à Arcachon. Massages, soins du visage et
          rituels personnalisés dans un cadre apaisant.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/reservation">
            <Button>Réserver un soin</Button>
          </Link>
          <Link href="/cartes-cadeaux">
            <Button variant="outline">Offrir une carte cadeau</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
