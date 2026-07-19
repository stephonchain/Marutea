'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })

    if (error) {
      setError("L'inscription a échoué. Cet email est peut-être déjà utilisé.")
      setLoading(false)
      return
    }

    setDone(true)
  }

  return (
    <div className="container-site max-w-md py-16">
      <div className="mb-10 text-center">
        <h1 className="text-5xl text-dark">Créer un compte</h1>
        <p className="mt-3 text-dark/70">
          Suivez vos réservations et vos cartes cadeaux
        </p>
      </div>

      <Card>
        {done ? (
          <div className="py-4 text-center">
            <p className="text-4xl">📬</p>
            <h2 className="mt-4 text-2xl text-dark">Vérifiez vos emails</h2>
            <p className="mt-3 text-sm text-dark/70">
              Un lien de confirmation vient de vous être envoyé à {email}.
              Cliquez dessus pour activer votre compte.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="fullName"
              label="Nom complet"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              id="email"
              type="email"
              label="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              type="password"
              label="Mot de passe (8 caractères min.)"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="rounded-xl bg-terra/10 p-4 text-sm text-terra">
                {error}
              </p>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Création…' : 'Créer mon compte'}
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-dark/60">
          Déjà un compte ?{' '}
          <Link href="/login" className="text-sage hover:underline">
            Se connecter
          </Link>
        </p>
      </Card>
    </div>
  )
}
