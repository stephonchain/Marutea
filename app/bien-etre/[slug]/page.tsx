import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllArticles, getArticleBySlug } from '@/lib/blog'
import { formatDate } from '@/lib/utils'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  return (
    <article className="container-site max-w-3xl py-16">
      <Link
        href="/bien-etre"
        className="text-sm text-sage underline-offset-4 hover:underline"
      >
        ← Tous les articles
      </Link>

      <header className="mb-10 mt-6">
        <time className="text-xs uppercase tracking-[0.25em] text-terra">
          {formatDate(article.date)}
        </time>
        <h1 className="mt-3 text-5xl leading-tight text-dark md:text-6xl">
          {article.title}
        </h1>
      </header>

      <div className="prose-marutea">
        <MDXRemote source={article.content} />
      </div>
    </article>
  )
}
