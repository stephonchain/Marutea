import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Marutea, votre spa bien-être à Arcachon.',
}

export default function ContactPage() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-5xl text-center mb-6">Contact</h1>
        <p className="text-dark/60 text-center mb-12">
          Une question ? N&apos;hésitez pas à nous contacter.
        </p>
        <div className="text-center space-y-4">
          <p>
            <a href="mailto:contact@marutea.fr" className="text-terra hover:underline">
              contact@marutea.fr
            </a>
          </p>
          <p className="text-dark/60">Arcachon, France</p>
        </div>
      </div>
    </section>
  )
}
