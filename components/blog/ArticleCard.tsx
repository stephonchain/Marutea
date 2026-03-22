import Link from 'next/link'
import { Card } from '@/components/ui/Card'

interface ArticleCardProps {
  slug: string
  title: string
  excerpt: string
  date: string
}

export function ArticleCard({ slug, title, excerpt, date }: ArticleCardProps) {
  return (
    <Link href={`/bien-etre/${slug}`}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
        <div className="aspect-[16/9] bg-sand/20 rounded-sm mb-4" />
        <time className="text-xs text-dark/40 uppercase tracking-wider">{date}</time>
        <h3 className="font-display text-xl mt-2 mb-2">{title}</h3>
        <p className="text-dark/60 text-sm line-clamp-3">{excerpt}</p>
      </Card>
    </Link>
  )
}
