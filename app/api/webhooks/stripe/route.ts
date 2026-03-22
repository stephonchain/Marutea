import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripe } from '@/lib/stripe/client'
import { generateGiftCardCode } from '@/lib/stripe/gift-cards'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: `Webhook error: ${message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    if (session.metadata?.type === 'gift_card') {
      const code = generateGiftCardCode()
      const amountCents = session.amount_total || 0

      // TODO: Insert into Supabase gift_cards table
      // TODO: Send email via Brevo with the gift card code
      console.log(`Gift card created: ${code} for ${amountCents} cents`)
    }
  }

  return NextResponse.json({ received: true })
}
