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

export const GIFT_CARD_AMOUNTS_CENTS = [5000, 7500, 10000, 13000] as const

export const GIFT_CARD_MIN_CENTS = 2000
export const GIFT_CARD_MAX_CENTS = 50000
