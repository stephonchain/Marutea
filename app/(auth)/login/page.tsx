import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Connexion' }

export default function LoginPage() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-md mx-auto">
        <h1 className="font-display text-4xl text-center mb-8">Connexion</h1>
        {/* Auth form with Supabase will be implemented here */}
        <p className="text-center text-dark/40">Formulaire de connexion à venir.</p>
      </div>
    </section>
  )
}
