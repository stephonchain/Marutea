import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Mon Profil' }

export default function ProfilPage() {
  return (
    <div>
      <h1 className="font-display text-3xl mb-6">Mon Profil</h1>
      <p className="text-dark/40">Gestion du profil à venir.</p>
    </div>
  )
}
