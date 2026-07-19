'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Email ou mot de passe incorrect.')
      setLoading(false)
      return
    }

    router.push(searchParams.get('redirect') ?? '/profil')
    router.refresh()
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
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
          label="Mot de passe"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="rounded-xl bg-terra/10 p-4 text-sm text-terra">{error}</p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Connexion…' : 'Se connecter'}
        </Button>
      </form>

      <div className="mt-6 space-y-2 text-center text-sm text-dark/60">
        <p>
          <Link href="/reset-password" className="text-sage hover:underline">
            Mot de passe oublié ?
          </Link>
        </p>
        <p>
          Pas encore de compte ?{' '}
          <Link href="/register" className="text-sage hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <div className="container-site max-w-md py-16">
      <div className="mb-10 text-center">
        <h1 className="text-5xl text-dark">Connexion</h1>
        <p className="mt-3 text-dark/70">Retrouvez votre espace Marutea</p>
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}
