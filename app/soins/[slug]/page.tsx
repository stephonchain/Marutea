import type { Metadata } from 'next'

interface SoinDetailPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: SoinDetailPageProps): Promise<Metadata> {
  return {
    title: params.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  }
}

export default function SoinDetailPage({ params }: SoinDetailPageProps) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl mb-6">
          {params.slug.replace(/-/g, ' ')}
        </h1>
        <p className="text-dark/60">Détail du soin à venir (chargement MDX).</p>
      </div>
    </section>
  )
}
