export interface SoinFrontmatter {
  title: string
  excerpt: string
  categorie: string
  dureeMinutes: number
  prixCents: number
  /** Variantes optionnelles (autre durée / prix), ex: Soin Hydralis 60 ou 90 min */
  variantes?: { dureeMinutes: number; prixCents: number }[]
  cover?: string
}

export interface Soin extends SoinFrontmatter {
  slug: string
  content: string
}
