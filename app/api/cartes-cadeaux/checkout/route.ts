import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createGiftCardCheckoutSession } from '@/lib/stripe/gift-cards'
import {
  GIFT_CARD_MIN_CENTS,
  GIFT_CARD_MAX_CENTS,
} from '@/types/gift-card'

const checkoutSchema = z.object({
  valeurCents: z
    .number()
    .int()
    .min(GIFT_CARD_MIN_CENTS)
    .max(GIFT_CARD_MAX_CENTS),
  destinataireEmail: z.string().email(),
  message: z.string().max(500).optional().default(''),
  acheteurEmail: z.string().email().optional().or(z.literal('')),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = checkoutSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Données invalides. Vérifiez le montant et les emails.' },
        { status: 400 }
      )
    }

    const { valeurCents, destinataireEmail, message, acheteurEmail } =
      parsed.data

    const session = await createGiftCardCheckoutSession({
      valeurCents,
      destinataireEmail,
      message,
      acheteurEmail: acheteurEmail || undefined,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[cartes-cadeaux/checkout]', err)
    return NextResponse.json(
      { error: "Le paiement n'a pas pu être initialisé. Réessayez plus tard." },
      { status: 500 }
    )
  }
}
