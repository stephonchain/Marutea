import type { Metadata } from 'next'
import { getAllArticles } from '@/lib/blog'
import { ArticlesList } from '@/components/blog/ArticlesList'

export const metadata: Metadata = {
  title: 'Conseils bien-être',
  description:
    'Rituels, auto-massages, conseils sommeil et émotions : le blog bien-être de Marutea, spa bio à Arcachon.',
}

export default function BienEtrePage() {
  const articles = getAllArticles()

  return (
    <div className="container-site py-16">
      <div className="mb-16 max-w-2xl">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-terra">
          Le journal
        </p>
        <h1 className="text-6xl text-dark">Conseils bien-être</h1>
        <p className="mt-4 text-lg text-dark/70">
          Prolongez l'expérience Marutea chez vous : rituels, auto-massages et
          petites sagesses du quotidien.
        </p>
      </div>

      <ArticlesList articles={articles} />
    </div>
  )
}
