import type { Metadata } from 'next'

interface ArticlePageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  return {
    title: params.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto prose">
        <h1 className="font-display text-4xl mb-6">
          {params.slug.replace(/-/g, ' ')}
        </h1>
        <p className="text-dark/60">Contenu de l&apos;article à venir (MDX).</p>
      </div>
    </section>
  )
}
