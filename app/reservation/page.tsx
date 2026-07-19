import type { Metadata } from 'next'
import { Card } from '@/components/ui/Card'
import { ReservationForm } from './ReservationForm'
import { getAllSoins } from '@/lib/soins'

export const metadata: Metadata = {
  title: 'Réservation',
  description:
    'Demandez votre réservation chez Marutea, spa bien-être à Arcachon. Réponse personnelle sous 24h.',
}

interface Props {
  searchParams: { soin?: string }
}

export default function ReservationPage({ searchParams }: Props) {
  const soins = getAllSoins()
  const soinPreselectionne = soins.find((s) => s.slug === searchParams.soin)

  return (
    <div className="container-site max-w-2xl py-16">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-terra">
          À très vite
        </p>
        <h1 className="text-6xl text-dark">Réservation</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-dark/70">
          Indiquez vos disponibilités : Candice vous répond personnellement
          sous 24h pour confirmer votre rendez-vous.
        </p>
      </div>

      <Card>
        <ReservationForm
          soins={soins.map((s) => ({ slug: s.slug, title: s.title }))}
          soinInitial={soinPreselectionne?.title}
        />
      </Card>
    </div>
  )
}
