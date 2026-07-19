import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="container-site grid min-h-[80vh] items-center gap-12 py-16 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-terra">
            Spa bien-être · Arcachon
          </p>
          <h1 className="text-6xl leading-tight text-dark md:text-7xl">
            Une parenthèse
            <br />
            <span className="text-sage">de douceur</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-dark/70">
            Massages, soins du visage et rituels 100% bio. Offrez-vous un
            moment suspendu, entre mer et pinède.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/reservation">Réserver un soin</Button>
            <Button href="/cartes-cadeaux" variant="outline">
              Offrir une carte cadeau
            </Button>
          </div>
        </div>

        {/* Visuel organique en attendant les photos plein écran */}
        <div className="relative hidden aspect-[4/5] lg:block">
          <div className="absolute inset-0 rounded-[40%_60%_55%_45%/50%_45%_55%_50%] bg-gradient-to-br from-sage/30 via-sand/40 to-terra/30" />
          <div className="absolute inset-8 rounded-[55%_45%_50%_50%/45%_55%_45%_55%] bg-gradient-to-tr from-terra/20 to-sage/20" />
          <p className="absolute inset-0 flex items-center justify-center font-display text-4xl text-dark/40">
            Marutea
          </p>
        </div>
      </div>
    </section>
  )
}
