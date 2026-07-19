import { Button } from '@/components/ui/Button'

export function GiftCardBanner() {
  return (
    <section className="bg-sage/15 py-20">
      <div className="container-site flex flex-col items-center gap-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-terra">
          L'attention parfaite
        </p>
        <h2 className="max-w-2xl text-5xl leading-tight text-dark">
          Offrez un moment de bien-être avec nos cartes cadeaux
        </h2>
        <p className="max-w-xl text-lg text-dark/70">
          Valables sur tous nos soins, envoyées par email avec votre message
          personnalisé. À partir de 50€.
        </p>
        <Button href="/cartes-cadeaux" variant="secondary">
          Offrir une carte cadeau
        </Button>
      </div>
    </section>
  )
}
