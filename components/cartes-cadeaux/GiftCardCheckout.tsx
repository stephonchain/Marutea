'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { GiftCardSelector } from './GiftCardSelector'

export function GiftCardCheckout() {
  const [amountCents, setAmountCents] = useState<number | null>(null)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!amountCents || !email) return

    // TODO: Call API route to create Stripe Checkout session
    console.log('Creating checkout session:', { amountCents, email, message })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <GiftCardSelector onSelect={setAmountCents} />

      {amountCents && (
        <div className="max-w-md mx-auto space-y-4">
          <Input
            id="email"
            label="Email du destinataire"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="prenom@email.com"
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm font-medium text-dark/80">
              Message personnalisé (optionnel)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="px-4 py-3 border border-sand/40 rounded-sm bg-white text-dark placeholder:text-sand focus:outline-none focus:ring-2 focus:ring-terra/40 focus:border-terra transition-colors resize-none"
              placeholder="Un petit mot pour accompagner votre cadeau..."
            />
          </div>
          <Button type="submit" className="w-full">
            Payer {(amountCents / 100).toFixed(0)} &euro;
          </Button>
        </div>
      )}
    </form>
  )
}
