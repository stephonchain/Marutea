import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cartes Cadeaux',
  description: 'Offrez du bien-être avec une carte cadeau Marutea. Montants personnalisables.',
}

export default function CartesPage() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-display text-5xl mb-6">Cartes Cadeaux</h1>
        <p className="text-dark/60 max-w-xl mx-auto mb-16">
          Offrez une expérience bien-être unique. Choisissez le montant et
          personnalisez votre message.
        </p>
        {/* GiftCardSelector + GiftCardCheckout components will go here */}
        <p className="text-dark/40">Module de cartes cadeaux à venir.</p>
      </div>
    </section>
  )
}
