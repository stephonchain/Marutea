import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Mes Réservations' }

export default function ReservationsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl mb-6">Mes Réservations</h1>
      <p className="text-dark/40">Historique des réservations à venir.</p>
    </div>
  )
}
