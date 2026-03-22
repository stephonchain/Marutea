import Link from 'next/link'
import { Card } from '@/components/ui/Card'

const services = [
  {
    slug: 'massage-californien',
    nom: 'Massage Californien',
    description: 'Un massage enveloppant aux mouvements longs et fluides pour une relaxation profonde.',
    duree: '60 min',
  },
  {
    slug: 'soin-visage',
    nom: 'Soin Visage Éclat',
    description: 'Un soin sur-mesure pour révéler la luminosité naturelle de votre peau.',
    duree: '45 min',
  },
  {
    slug: 'rituel-detente',
    nom: 'Rituel Détente',
    description: 'Une expérience complète associant gommage, enveloppement et massage.',
    duree: '90 min',
  },
]

export function ServicesPreview() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl mb-4">Nos Soins</h2>
          <p className="text-dark/60 max-w-xl mx-auto">
            Des soins d&apos;exception pour prendre soin de vous, corps et esprit.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link key={service.slug} href={`/soins/${service.slug}`}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <div className="aspect-[4/3] bg-sand/20 rounded-sm mb-4" />
                <h3 className="font-display text-2xl mb-2">{service.nom}</h3>
                <p className="text-dark/60 text-sm mb-3">{service.description}</p>
                <span className="text-xs uppercase tracking-wider text-terra font-medium">
                  {service.duree}
                </span>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/soins"
            className="text-terra font-medium hover:underline underline-offset-4"
          >
            Découvrir tous nos soins &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
