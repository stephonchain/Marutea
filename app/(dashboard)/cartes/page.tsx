import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Mes Cartes Cadeaux' }

export default function CartesPage() {
  return (
    <div>
      <h1 className="font-display text-3xl mb-6">Mes Cartes Cadeaux</h1>
      <p className="text-dark/40">Liste des cartes cadeaux à venir.</p>
    </div>
  )
}
