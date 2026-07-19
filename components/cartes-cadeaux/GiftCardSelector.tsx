'use client'

import { useState } from 'react'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import {
  GIFT_CARD_AMOUNTS_CENTS,
  GIFT_CARD_MIN_CENTS,
  GIFT_CARD_MAX_CENTS,
} from '@/types/gift-card'

export function GiftCardSelector() {
  const [montantCents, setMontantCents] = useState<number>(7500)
  const [montantLibre, setMontantLibre] = useState('')
  const [destinataireEmail, setDestinataireEmail] = useState('')
  const [message, setMessage] = useState('')
  const [acheteurEmail, setAcheteurEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const montantEffectif = montantLibre
    ? Math.round(Number(montantLibre) * 100)
    : montantCents

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (
      !montantEffectif ||
      Number.isNaN(montantEffectif) ||
      montantEffectif < GIFT_CARD_MIN_CENTS ||
      montantEffectif > GIFT_CARD_MAX_CENTS
    ) {
      setError(
        `Le montant doit être compris entre ${GIFT_CARD_MIN_CENTS / 100}€ et ${GIFT_CARD_MAX_CENTS / 100}€.`
      )
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/cartes-cadeaux/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          valeurCents: montantEffectif,
          destinataireEmail,
          message,
          acheteurEmail,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Une erreur est survenue.')

      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Montants */}
      <fieldset>
        <legend className="mb-4 text-sm font-medium text-dark/80">
          Choisissez un montant
        </legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {GIFT_CARD_AMOUNTS_CENTS.map((cents) => (
            <button
              key={cents}
              type="button"
              onClick={() => {
                setMontantCents(cents)
                setMontantLibre('')
              }}
              className={`rounded-2xl border-2 py-4 text-lg font-medium transition-colors ${
                !montantLibre && montantCents === cents
                  ? 'border-sage bg-sage text-cream'
                  : 'border-sand/60 bg-white/60 text-dark hover:border-sage'
              }`}
            >
              {cents / 100}€
            </button>
          ))}
        </div>
        <div className="mt-3">
          <Input
            id="montant-libre"
            type="number"
            min={GIFT_CARD_MIN_CENTS / 100}
            max={GIFT_CARD_MAX_CENTS / 100}
            placeholder="Ou montant libre (20€ – 500€)"
            value={montantLibre}
            onChange={(e) => setMontantLibre(e.target.value)}
          />
        </div>
      </fieldset>

      {/* Destinataire */}
      <Input
        id="destinataire"
        type="email"
        label="Email du destinataire *"
        placeholder="prenom@exemple.fr"
        required
        value={destinataireEmail}
        onChange={(e) => setDestinataireEmail(e.target.value)}
      />

      <Textarea
        id="message"
        label="Votre message personnalisé"
        placeholder="Joyeux anniversaire ! Prends soin de toi…"
        maxLength={500}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Input
        id="acheteur"
        type="email"
        label="Votre email (reçu de paiement)"
        placeholder="vous@exemple.fr"
        value={acheteurEmail}
        onChange={(e) => setAcheteurEmail(e.target.value)}
      />

      {error && (
        <p className="rounded-xl bg-terra/10 p-4 text-sm text-terra">{error}</p>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading
          ? 'Redirection vers le paiement…'
          : `Offrir cette carte — ${montantEffectif ? (montantEffectif / 100).toFixed(0) : '…'}€`}
      </Button>

      <p className="text-center text-xs text-dark/50">
        Paiement sécurisé par Stripe. La carte est envoyée par email au
        destinataire dès le paiement confirmé.
      </p>
    </form>
  )
}
