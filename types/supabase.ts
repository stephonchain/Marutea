/**
 * Types de la base Supabase.
 * À régénérer avec le CLI une fois le projet Supabase créé :
 *   npx supabase gen types typescript --project-id <id> > types/supabase.ts
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          phone: string | null
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          phone?: string | null
        }
        Update: {
          full_name?: string | null
          phone?: string | null
        }
      }
      soins: {
        Row: {
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
        Insert: {
          slug: string
          nom: string
          description?: string | null
          duree_minutes?: number | null
          prix_cents: number
          categorie?: string | null
          actif?: boolean
        }
        Update: Partial<Database['public']['Tables']['soins']['Insert']>
      }
      reservations: {
        Row: {
          id: string
          user_id: string | null
          soin_id: string | null
          date_heure: string
          statut: string
          notes: string | null
          created_at: string
        }
        Insert: {
          user_id?: string | null
          soin_id?: string | null
          date_heure: string
          statut?: string
          notes?: string | null
        }
        Update: Partial<Database['public']['Tables']['reservations']['Insert']>
      }
      gift_cards: {
        Row: {
          id: string
          code: string
          valeur_cents: number
          solde_cents: number
          acheteur_id: string | null
          stripe_payment_intent_id: string | null
          destinataire_email: string | null
          message: string | null
          expire_at: string | null
          created_at: string
        }
        Insert: {
          code: string
          valeur_cents: number
          solde_cents: number
          acheteur_id?: string | null
          stripe_payment_intent_id?: string | null
          destinataire_email?: string | null
          message?: string | null
          expire_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['gift_cards']['Insert']>
      }
    }
  }
}
