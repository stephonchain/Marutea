import Stripe from 'stripe'

let stripeInstance: Stripe | null = null

/** Client Stripe serveur — instancié paresseusement pour ne pas casser le build sans clé. */
export function getStripe(): Stripe {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY manquante dans .env.local')
    }
    stripeInstance = new Stripe(key, {
      apiVersion: '2025-02-24.acacia',
      typescript: true,
    })
  }
  return stripeInstance
}
