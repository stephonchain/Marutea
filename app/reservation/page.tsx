import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Réservation',
  description: 'Réservez votre soin bien-être chez Marutea à Arcachon.',
}

export default function ReservationPage() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-5xl text-center mb-6">Réservation</h1>
        <p className="text-dark/60 text-center mb-12">
          Choisissez votre soin et le créneau qui vous convient. Nous vous
          confirmerons votre rendez-vous par email.
        </p>
        {/* Reservation form will go here */}
        <p className="text-center text-dark/40">Formulaire de réservation à venir.</p>
      </div>
    </section>
  )
}
