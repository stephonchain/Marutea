import { getStripe } from './client'
import { getAppUrl } from '@/lib/utils'
import {
  GIFT_CARD_MIN_CENTS,
  GIFT_CARD_MAX_CENTS,
} from '@/types/gift-card'

/** Génère un code unique de carte cadeau : MARU-XXXX-XXXX */
export function generateGiftCardCode(): string {
  // Sans caractères ambigus (0/O, 1/I)
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const block = () =>
    Array.from(
      { length: 4 },
      () => alphabet[Math.floor(Math.random() * alphabet.length)]
    ).join('')
  return `MARU-${block()}-${block()}`
}

interface CreateCheckoutParams {
  valeurCents: number
  destinataireEmail: string
  message?: string
  acheteurEmail?: string
}

/** Crée une session Stripe Checkout pour l'achat d'une carte cadeau. */
export async function createGiftCardCheckoutSession({
  valeurCents,
  destinataireEmail,
  message,
  acheteurEmail,
}: CreateCheckoutParams) {
  if (valeurCents < GIFT_CARD_MIN_CENTS || valeurCents > GIFT_CARD_MAX_CENTS) {
    throw new Error(
      `Le montant doit être compris entre ${GIFT_CARD_MIN_CENTS / 100}€ et ${GIFT_CARD_MAX_CENTS / 100}€`
    )
  }

  const stripe = getStripe()
  const appUrl = getAppUrl()

  return stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: acheteurEmail,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: valeurCents,
          product_data: {
            name: `Carte cadeau Marutea — ${valeurCents / 100}€`,
            description: `Pour ${destinataireEmail}`,
          },
        },
      },
    ],
    metadata: {
      type: 'gift_card',
      valeur_cents: String(valeurCents),
      destinataire_email: destinataireEmail,
      message: message ?? '',
    },
    success_url: `${appUrl}/cartes-cadeaux/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/cartes-cadeaux`,
  })
}
