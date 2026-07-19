import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllSoins, getSoinBySlug } from '@/lib/soins'
import { formatDuree, formatPrix } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllSoins().map((soin) => ({ slug: soin.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const soin = getSoinBySlug(params.slug)
  if (!soin) return {}
  return {
    title: soin.title,
    description: soin.excerpt,
  }
}

export default function SoinDetailPage({ params }: Props) {
  const soin = getSoinBySlug(params.slug)
  if (!soin) notFound()

  return (
    <article className="container-site max-w-3xl py-16">
      <Link
        href="/soins"
        className="text-sm text-sage underline-offset-4 hover:underline"
      >
        ← Tous les soins
      </Link>

      <header className="mb-10 mt-6">
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-terra">
          {soin.categorie}
        </p>
        <h1 className="text-5xl text-dark md:text-6xl">{soin.title}</h1>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-sage/15 px-4 py-2 text-sm text-sage">
            {formatDuree(soin.dureeMinutes)} — {formatPrix(soin.prixCents)}
          </span>
          {soin.variantes?.map((v) => (
            <span
              key={v.dureeMinutes}
              className="rounded-full bg-sand/30 px-4 py-2 text-sm text-dark/70"
            >
              {formatDuree(v.dureeMinutes)} — {formatPrix(v.prixCents)}
            </span>
          ))}
        </div>
      </header>

      <div className="prose-marutea">
        <MDXRemote source={soin.content} />
      </div>

      <div className="mt-12 flex flex-wrap gap-4 border-t border-sand/40 pt-8">
        <Button href={`/reservation?soin=${soin.slug}`}>
          Réserver ce soin
        </Button>
        <Button href="/cartes-cadeaux" variant="outline">
          L'offrir en carte cadeau
        </Button>
      </div>
    </article>
  )
}
