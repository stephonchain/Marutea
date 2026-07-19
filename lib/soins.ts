import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Soin, SoinFrontmatter } from '@/types/soin'

const SOINS_DIR = path.join(process.cwd(), 'content', 'soins')

export function getAllSoins(): Soin[] {
  if (!fs.existsSync(SOINS_DIR)) return []

  return fs
    .readdirSync(SOINS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(SOINS_DIR, file), 'utf-8')
      const { data, content } = matter(raw)
      return { slug, content, ...(data as SoinFrontmatter) }
    })
    .sort((a, b) => a.title.localeCompare(b.title, 'fr'))
}

export function getSoinBySlug(slug: string): Soin | null {
  const file = path.join(SOINS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf-8')
  const { data, content } = matter(raw)
  return { slug, content, ...(data as SoinFrontmatter) }
}

export function getSoinsByCategorie(): Map<string, Soin[]> {
  const map = new Map<string, Soin[]>()
  for (const soin of getAllSoins()) {
    const list = map.get(soin.categorie) ?? []
    list.push(soin)
    map.set(soin.categorie, list)
  }
  return map
}

/** Ordre d'affichage des catégories sur la page soins. */
export const CATEGORIES_ORDER = [
  'Rituel',
  'Soin énergétique',
  'Massages et soins du corps',
  'Massages et soins du visage',
  'Pour les enfants',
  'Les + bien-être',
  'Pour les hommes',
]
