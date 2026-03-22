export interface Soin {
  id: string
  slug: string
  nom: string
  description: string | null
  duree_minutes: number | null
  prix_cents: number
  categorie: string | null
  actif: boolean
  created_at: string
}
