import { getStripe } from './client'

function generateGiftCardCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const segment = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `MARU-${segment()}-${segment()}`
}

export async function createGiftCardCheckoutSession({
  amountCents,
  destinataireEmail,
  message,
  successUrl,
  cancelUrl,
}: {
  amountCents: number
  destinataireEmail: string
  message?: string
  successUrl: string
  cancelUrl: string
}) {
  const session = await getStripe().checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Carte Cadeau Marutea',
            description: `Carte cadeau d'une valeur de ${(amountCents / 100).toFixed(2)} €`,
          },
          unit_amount: amountCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      type: 'gift_card',
      destinataire_email: destinataireEmail,
      message: message || '',
    },
  })

  return session
}

export { generateGiftCardCode }
