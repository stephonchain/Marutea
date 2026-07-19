'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })

    // Toujours afficher le succès (ne pas révéler si l'email existe)
    setDone(true)
  }

  return (
    <div className="container-site max-w-md py-16">
      <div className="mb-10 text-center">
        <h1 className="text-5xl text-dark">Mot de passe oublié</h1>
      </div>

      <Card>
        {done ? (
          <div className="py-4 text-center">
            <p className="text-4xl">📬</p>
            <p className="mt-4 text-sm text-dark/70">
              Si un compte existe avec cet email, un lien de réinitialisation
              vient de vous être envoyé.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="email"
              type="email"
              label="Votre email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Envoi…' : 'Recevoir le lien'}
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-dark/60">
          <Link href="/login" className="text-sage hover:underline">
            ← Retour à la connexion
          </Link>
        </p>
      </Card>
    </div>
  )
}
