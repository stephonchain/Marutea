import type { Metadata } from 'next'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Merci pour votre achat',
}

export default function ConfirmationPage() {
  return (
    <div className="container-site max-w-xl py-24 text-center">
      <p className="text-6xl">🎁</p>
      <h1 className="mt-6 text-5xl text-dark">Merci !</h1>
      <Card className="mt-10 text-left">
        <p className="leading-relaxed text-dark/80">
          Votre paiement a bien été reçu. La carte cadeau est en route vers la
          boîte mail du destinataire, avec votre message personnalisé et son
          code unique.
        </p>
        <p className="mt-4 leading-relaxed text-dark/80">
          Vous recevrez également un reçu de paiement par email de la part de
          Stripe.
        </p>
      </Card>
      <div className="mt-10 flex justify-center gap-4">
        <Button href="/">Retour à l'accueil</Button>
        <Button href="/soins" variant="outline">
          Découvrir nos soins
        </Button>
      </div>
    </div>
  )
}
