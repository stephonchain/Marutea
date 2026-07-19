import { Card } from '@/components/ui/Card'

const TESTIMONIALS = [
  {
    name: 'Sophie L.',
    text: "Un moment hors du temps. Le massage aux coquillages chauds est une pure merveille, je recommande les yeux fermés.",
  },
  {
    name: 'Camille R.',
    text: "L'accueil de Candice est d'une douceur rare. Le Rituel Féminin Sacré m'a profondément ressourcée.",
  },
  {
    name: 'Marie D.',
    text: "Le soin Hydralis a transformé ma peau. Des produits bio, un cadre apaisant : mon rendez-vous mensuel incontournable.",
  },
]

export function Testimonials() {
  return (
    <section className="container-site py-20">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-terra">
          Elles en parlent
        </p>
        <h2 className="text-5xl text-dark">Vos moments Marutea</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <Card key={t.name}>
            <p className="font-display text-2xl text-sand">« </p>
            <p className="leading-relaxed text-dark/80">{t.text}</p>
            <p className="mt-6 text-sm font-medium uppercase tracking-widest text-sage">
              {t.name}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
