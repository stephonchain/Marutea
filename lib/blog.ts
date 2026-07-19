import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ArticleFrontmatter {
  title: string
  date: string
  excerpt: string
  cover?: string
  tags?: string[]
}

export interface Article extends ArticleFrontmatter {
  slug: string
  content: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'bien-etre')

export function getAllArticles(): Article[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
      const { data, content } = matter(raw)
      return { slug, content, ...(data as ArticleFrontmatter) }
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
}

export function getArticleBySlug(slug: string): Article | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf-8')
  const { data, content } = matter(raw)
  return { slug, content, ...(data as ArticleFrontmatter) }
}
