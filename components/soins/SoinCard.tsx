import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { formatPrice } from '@/lib/utils'
import type { Soin } from '@/types/soin'

interface SoinCardProps {
  soin: Soin
}

export function SoinCard({ soin }: SoinCardProps) {
  return (
    <Link href={`/soins/${soin.slug}`}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
        <div className="aspect-[4/3] bg-sand/20 rounded-sm mb-4" />
        <h3 className="font-display text-2xl mb-2">{soin.nom}</h3>
        {soin.description && (
          <p className="text-dark/60 text-sm mb-3 line-clamp-2">{soin.description}</p>
        )}
        <div className="flex items-center justify-between text-sm">
          {soin.duree_minutes && (
            <span className="text-dark/50">{soin.duree_minutes} min</span>
          )}
          <span className="font-medium text-terra">{formatPrice(soin.prix_cents)}</span>
        </div>
      </Card>
    </Link>
  )
}
