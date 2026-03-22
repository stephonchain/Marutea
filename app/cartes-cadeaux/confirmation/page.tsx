import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Confirmation — Carte Cadeau',
}

export default function ConfirmationPage() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-display text-4xl mb-6">Merci pour votre achat !</h1>
        <p className="text-dark/60 leading-relaxed">
          Votre carte cadeau a bien été envoyée au destinataire par email.
          Vous recevrez également un récapitulatif à votre adresse email.
        </p>
      </div>
    </section>
  )
}
