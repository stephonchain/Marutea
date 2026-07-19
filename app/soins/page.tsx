import type { Metadata } from 'next'
import { getSoinsByCategorie, CATEGORIES_ORDER } from '@/lib/soins'
import { SoinsList } from '@/components/soins/SoinsList'

export const metadata: Metadata = {
  title: 'Nos soins',
  description:
    'Massages, soins du visage et rituels 100% bio à Arcachon : coquillages chauds, Kobido, Chi Nei Tsang, soin Hydralis…',
}

export default function SoinsPage() {
  const parCategorie = getSoinsByCategorie()

  const groupes = [...parCategorie.entries()].sort(([a], [b]) => {
    const ia = CATEGORIES_ORDER.indexOf(a)
    const ib = CATEGORIES_ORDER.indexOf(b)
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
  })

  return (
    <div className="container-site py-16">
      <div className="mb-16 max-w-2xl">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-terra">
          La carte des soins
        </p>
        <h1 className="text-6xl text-dark">Nos soins</h1>
        <p className="mt-4 text-lg text-dark/70">
          Des rituels 100% bio, pensés pour vous offrir une vraie parenthèse.
          Chaque soin commence par un temps d'accueil et se termine en douceur.
        </p>
      </div>

      <SoinsList groupes={groupes} />
    </div>
  )
}
