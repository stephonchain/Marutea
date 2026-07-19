import Link from 'next/link'
import { getAllSoins } from '@/lib/soins'
import { SoinCard } from '@/components/soins/SoinCard'

const FEATURED_SLUGS = [
  'rituel-feminin-sacre',
  'soin-hydralis',
  'coquillages-chauds',
]

export function ServicesPreview() {
  const soins = getAllSoins()
  const featured = FEATURED_SLUGS.map((slug) =>
    soins.find((s) => s.slug === slug)
  ).filter((s): s is NonNullable<typeof s> => Boolean(s))

  return (
    <section className="container-site py-20">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-terra">
            Nos soins
          </p>
          <h2 className="text-5xl text-dark">Rituels signature</h2>
        </div>
        <Link
          href="/soins"
          className="hidden text-sm text-sage underline-offset-4 hover:underline md:block"
        >
          Voir tous les soins →
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {featured.map((soin) => (
          <SoinCard key={soin.slug} soin={soin} />
        ))}
      </div>

      <div className="mt-10 text-center md:hidden">
        <Link href="/soins" className="text-sage underline-offset-4 hover:underline">
          Voir tous les soins →
        </Link>
      </div>
    </section>
  )
}
