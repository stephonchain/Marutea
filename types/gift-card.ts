export interface GiftCard {
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
