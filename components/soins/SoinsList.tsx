import type { Soin } from '@/types/soin'
import { SoinCard } from './SoinCard'

interface SoinsListProps {
  groupes: [string, Soin[]][]
}

export function SoinsList({ groupes }: SoinsListProps) {
  return (
    <div className="space-y-16">
      {groupes.map(([categorie, soins]) => (
        <section key={categorie} id={categorie}>
          <h2 className="mb-8 text-4xl text-dark">{categorie}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {soins.map((soin) => (
              <SoinCard key={soin.slug} soin={soin} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
