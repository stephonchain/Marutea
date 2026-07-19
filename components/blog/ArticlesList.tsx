import type { Article } from '@/lib/blog'
import { ArticleCard } from './ArticleCard'

export function ArticlesList({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return (
      <p className="text-center text-dark/60">
        Les premiers articles arrivent bientôt…
      </p>
    )
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  )
}
