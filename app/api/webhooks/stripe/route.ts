import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe/client'
import { generateGiftCardCode } from '@/lib/stripe/gift-cards'
import { createAdminClient } from '@/lib/supabase/server'
import { sendGiftCardEmail } from '@/lib/email/brevo'

/**
 * Webhook Stripe.
 * Événement écouté : checkout.session.completed (paiement carte cadeau).
 * Configurer l'endpoint dans le dashboard Stripe :
 *   https://marutea.fr/api/webhooks/stripe
 */
export async function POST(request: Request) {
  const stripe = getStripe()
  const signature = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Signature manquante' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const payload = await request.text()
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch (err) {
    console.error('[webhook stripe] signature invalide', err)
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    if (session.metadata?.type === 'gift_card') {
      const valeurCents = Number(session.metadata.valeur_cents)
      const destinataireEmail = session.metadata.destinataire_email
      const message = session.metadata.message || null

      const code = generateGiftCardCode()
      const supabase = createAdminClient()

      // Expiration : 1 an après l'achat
      const expireAt = new Date()
      expireAt.setFullYear(expireAt.getFullYear() + 1)

      const { error } = await supabase.from('gift_cards').insert({
        code,
        valeur_cents: valeurCents,
        solde_cents: valeurCents,
        stripe_payment_intent_id: String(session.payment_intent ?? ''),
        destinataire_email: destinataireEmail,
        message,
        expire_at: expireAt.toISOString(),
      })

      if (error) {
        console.error('[webhook stripe] insertion gift_card échouée', error)
        // 500 → Stripe réessaiera la livraison du webhook
        return NextResponse.json({ error: 'DB error' }, { status: 500 })
      }

      try {
        await sendGiftCardEmail({
          destinataireEmail,
          code,
          valeurCents,
          message: message ?? undefined,
        })
      } catch (err) {
        // La carte existe en DB : ne pas faire échouer le webhook pour l'email
        console.error('[webhook stripe] envoi email échoué', err)
      }
    }
  }

  return NextResponse.json({ received: true })
}
