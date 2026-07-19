import type { Metadata } from 'next'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Marutea, spa bien-être à Arcachon.',
}

export default function ContactPage() {
  return (
    <div className="container-site max-w-2xl py-16">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-terra">
          On reste en lien
        </p>
        <h1 className="text-6xl text-dark">Contact</h1>
      </div>

      <div className="space-y-6">
        <Card>
          <h2 className="text-3xl text-dark">Le spa</h2>
          <p className="mt-3 leading-relaxed text-dark/70">
            Marutea vous accueille à Arcachon, sur rendez-vous uniquement.
          </p>
          <p className="mt-4 text-dark/80">
            📍 Arcachon, France
            <br />
            ✉️{' '}
            <a href="mailto:contact@marutea.fr" className="text-sage hover:underline">
              contact@marutea.fr
            </a>
          </p>
        </Card>

        <Card>
          <h2 className="text-3xl text-dark">Une question, une envie ?</h2>
          <p className="mt-3 leading-relaxed text-dark/70">
            Pour toute demande de réservation, utilisez notre formulaire dédié —
            Candice vous répond personnellement sous 24h.
          </p>
          <div className="mt-6">
            <Button href="/reservation">Demander une réservation</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
