import Link from 'next/link'
import type { Soin } from '@/types/soin'
import { formatDuree, formatPrix } from '@/lib/utils'

export function SoinCard({ soin }: { soin: Soin }) {
  return (
    <Link
      href={`/soins/${soin.slug}`}
      className="group flex flex-col rounded-3xl bg-white/70 p-8 shadow-[0_4px_30px_rgba(44,36,25,0.06)] transition-shadow hover:shadow-[0_8px_40px_rgba(44,36,25,0.12)]"
    >
      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-terra">
        {soin.categorie}
      </p>
      <h3 className="text-3xl text-dark transition-colors group-hover:text-sage">
        {soin.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-dark/70">
        {soin.excerpt}
      </p>
      <div className="mt-6 flex items-center justify-between border-t border-sand/40 pt-4 text-sm">
        <span className="text-dark/60">{formatDuree(soin.dureeMinutes)}</span>
        <span className="font-medium text-sage">{formatPrix(soin.prixCents)}</span>
      </div>
    </Link>
  )
}
