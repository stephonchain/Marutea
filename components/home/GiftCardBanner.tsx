import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function GiftCardBanner() {
  return (
    <section className="bg-sage/10 py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-5xl mb-6">
          Offrez du bien-être
        </h2>
        <p className="text-dark/60 max-w-xl mx-auto mb-10 leading-relaxed">
          Faites plaisir à vos proches avec une carte cadeau Marutea. Choisissez
          le montant, personnalisez votre message, et offrez une expérience
          inoubliable.
        </p>
        <Link href="/cartes-cadeaux">
          <Button variant="secondary">Découvrir les cartes cadeaux</Button>
        </Link>
      </div>
    </section>
  )
}
