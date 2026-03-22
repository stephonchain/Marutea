import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Réinitialiser le mot de passe' }

export default function ResetPasswordPage() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-md mx-auto">
        <h1 className="font-display text-4xl text-center mb-8">
          Mot de passe oublié
        </h1>
        <p className="text-center text-dark/40">Formulaire de réinitialisation à venir.</p>
      </div>
    </section>
  )
}
