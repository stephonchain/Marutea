'use client'

import { useState } from 'react'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface Props {
  soins: { slug: string; title: string }[]
  soinInitial?: string
}

export function ReservationForm({ soins, soinInitial }: Props) {
  const [soin, setSoin] = useState(soinInitial ?? '')
  const [dateSouhaitee, setDateSouhaitee] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>(
    'idle'
  )
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          soin,
          dateSouhaitee,
          nom,
          email,
          telephone,
          message,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Erreur inconnue')
      setStatus('sent')
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Une erreur est survenue.'
      )
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="py-8 text-center">
        <p className="text-5xl">🌿</p>
        <h2 className="mt-4 text-3xl text-dark">Demande envoyée !</h2>
        <p className="mt-3 text-dark/70">
          Merci {nom.split(' ')[0]} — Candice revient vers vous sous 24h pour
          confirmer votre rendez-vous.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="soin"
          className="mb-2 block text-sm font-medium text-dark/80"
        >
          Soin souhaité *
        </label>
        <select
          id="soin"
          required
          value={soin}
          onChange={(e) => setSoin(e.target.value)}
          className="input-site"
        >
          <option value="">Choisir un soin…</option>
          {soins.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Je ne sais pas encore">
            Je ne sais pas encore — conseillez-moi
          </option>
        </select>
      </div>

      <Input
        id="date"
        label="Date et heure souhaitées *"
        placeholder="Ex : mercredi 24 juillet, plutôt le matin"
        required
        value={dateSouhaitee}
        onChange={(e) => setDateSouhaitee(e.target.value)}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="nom"
          label="Votre nom *"
          required
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <Input
          id="telephone"
          type="tel"
          label="Téléphone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
      </div>

      <Input
        id="email"
        type="email"
        label="Votre email *"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Textarea
        id="message"
        label="Un message ? (carte cadeau à utiliser, première visite, femme enceinte…)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {status === 'error' && (
        <p className="rounded-xl bg-terra/10 p-4 text-sm text-terra">
          {errorMsg}
        </p>
      )}

      <Button type="submit" disabled={status === 'loading'} className="w-full">
        {status === 'loading' ? 'Envoi en cours…' : 'Envoyer ma demande'}
      </Button>
    </form>
  )
}
