import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sendReservationRequestEmail } from '@/lib/email/brevo'

const reservationSchema = z.object({
  soin: z.string().min(1).max(200),
  dateSouhaitee: z.string().min(1).max(200),
  nom: z.string().min(1).max(120),
  email: z.string().email(),
  telephone: z.string().max(30).optional().or(z.literal('')),
  message: z.string().max(1000).optional().or(z.literal('')),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = reservationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Formulaire incomplet. Vérifiez les champs obligatoires.' },
        { status: 400 }
      )
    }

    await sendReservationRequestEmail({
      ...parsed.data,
      telephone: parsed.data.telephone || undefined,
      message: parsed.data.message || undefined,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[reservation]', err)
    return NextResponse.json(
      { error: "La demande n'a pas pu être envoyée. Réessayez plus tard." },
      { status: 500 }
    )
  }
}
