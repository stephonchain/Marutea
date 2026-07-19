import Link from 'next/link'
import type { Article } from '@/lib/blog'
import { formatDate } from '@/lib/utils'

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/bien-etre/${article.slug}`}
      className="group flex flex-col rounded-3xl bg-white/70 p-8 shadow-[0_4px_30px_rgba(44,36,25,0.06)] transition-shadow hover:shadow-[0_8px_40px_rgba(44,36,25,0.12)]"
    >
      <time className="text-xs uppercase tracking-[0.25em] text-terra">
        {formatDate(article.date)}
      </time>
      <h3 className="mt-3 text-3xl text-dark transition-colors group-hover:text-sage">
        {article.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-dark/70">
        {article.excerpt}
      </p>
      {article.tags && article.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
