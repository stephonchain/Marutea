import type { Metadata } from 'next'
import { Card } from '@/components/ui/Card'
import { GiftCardSelector } from '@/components/cartes-cadeaux/GiftCardSelector'

export const metadata: Metadata = {
  title: 'Cartes cadeaux',
  description:
    'Offrez un moment de bien-être : cartes cadeaux Marutea valables sur tous nos soins, envoyées par email avec votre message.',
}

export default function CartesCadeauxPage() {
  return (
    <div className="container-site max-w-2xl py-16">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-terra">
          L'attention parfaite
        </p>
        <h1 className="text-6xl text-dark">Cartes cadeaux</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-dark/70">
          Valables sur tous nos soins. Le destinataire reçoit sa carte par
          email, avec votre message et son code personnel.
        </p>
      </div>

      <Card>
        <GiftCardSelector />
      </Card>

      <div className="mt-10 grid gap-4 text-center text-sm text-dark/60 sm:grid-cols-3">
        <p>🎁 Envoi immédiat par email</p>
        <p>🌿 Valable sur tous les soins</p>
        <p>🔒 Paiement sécurisé Stripe</p>
      </div>
    </div>
  )
}
