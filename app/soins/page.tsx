import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos Soins',
  description: 'Découvrez notre carte de soins : massages, soins du visage, rituels bien-être à Arcachon.',
}

export default function SoinsPage() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-5xl text-center mb-6">Nos Soins</h1>
        <p className="text-dark/60 text-center max-w-xl mx-auto mb-16">
          Des soins sur-mesure pour votre bien-être, dans un cadre apaisant au
          coeur d&apos;Arcachon.
        </p>
        {/* SoinsList component will be added here */}
        <p className="text-center text-dark/40">Catalogue des soins à venir.</p>
      </div>
    </section>
  )
}
