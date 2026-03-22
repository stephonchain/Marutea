import { SoinCard } from './SoinCard'
import type { Soin } from '@/types/soin'

interface SoinsListProps {
  soins: Soin[]
}

export function SoinsList({ soins }: SoinsListProps) {
  if (soins.length === 0) {
    return <p className="text-center text-dark/40">Aucun soin disponible pour le moment.</p>
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {soins.map((soin) => (
        <SoinCard key={soin.id} soin={soin} />
      ))}
    </div>
  )
}
