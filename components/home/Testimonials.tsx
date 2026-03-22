import { Card } from '@/components/ui/Card'

const testimonials = [
  {
    name: 'Marie L.',
    text: 'Un moment de pure détente. Le massage californien est une merveille, je recommande les yeux fermés !',
  },
  {
    name: 'Sophie D.',
    text: 'Cadre magnifique et accueil chaleureux. Candice est à l\'écoute et prend vraiment soin de ses clients.',
  },
  {
    name: 'Julien R.',
    text: 'J\'ai offert une carte cadeau à ma compagne, elle a adoré son soin visage. Merci Marutea !',
  },
]

export function Testimonials() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl text-center mb-16">
          Ils en parlent
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <Card key={t.name} className="text-center">
              <p className="text-dark/70 italic mb-4 leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="font-medium text-sm text-terra">{t.name}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
