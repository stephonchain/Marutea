import { ArticleCard } from './ArticleCard'

interface Article {
  slug: string
  title: string
  excerpt: string
  date: string
}

interface ArticlesListProps {
  articles: Article[]
}

export function ArticlesList({ articles }: ArticlesListProps) {
  if (articles.length === 0) {
    return <p className="text-center text-dark/40">Aucun article pour le moment.</p>
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <ArticleCard key={article.slug} {...article} />
      ))}
    </div>
  )
}
