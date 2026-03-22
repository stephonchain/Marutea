import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Inscription' }

export default function RegisterPage() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-md mx-auto">
        <h1 className="font-display text-4xl text-center mb-8">Inscription</h1>
        <p className="text-center text-dark/40">Formulaire d&apos;inscription à venir.</p>
      </div>
    </section>
  )
}
