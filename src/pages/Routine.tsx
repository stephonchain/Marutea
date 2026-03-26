import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ShoppingBag, Sparkles, Sun, Moon, Star } from 'lucide-react'

interface RoutineProduct {
  id: string
  name: string
  description: string
  price: number
  type: 'morning' | 'evening' | 'weekly' | 'bundle'
  products: string[]
  benefits: string[]
  icon: any
}

const routines: RoutineProduct[] = [
  {
    id: 'r1',
    name: 'Routine Éclat du Matin',
    description: 'Réveillez votre peau avec notre routine matinale complète pour un teint lumineux toute la journée.',
    price: 89,
    type: 'morning',
    icon: Sun,
    products: [
      'Nettoyant doux bio',
      'Sérum Éclat Marutea',
      'Crème de jour SPF 30',
      'Contour des yeux énergisant'
    ],
    benefits: ['Éclat instantané', 'Protection solaire', 'Hydratation 24h']
  },
  {
    id: 'r2',
    name: 'Routine Douceur du Soir',
    description: 'Offrez à votre peau un moment de réparation nocturne avec notre rituel du soir.',
    price: 95,
    type: 'evening',
    icon: Moon,
    products: [
      'Huile démaquillante bio',
      'Nettoyant crémeux',
      'Sérum régénérant nuit',
      'Crème de nuit nourrissante'
    ],
    benefits: ['Réparation intense', 'Anti-âge', 'Confort absolu']
  },
  {
    id: 'r3',
    name: 'Rituel Hebdomadaire Éclat',
    description: 'Protocole de soin intensif à réaliser une fois par semaine pour booster votre routine.',
    price: 65,
    type: 'weekly',
    icon: Sparkles,
    products: [
      'Gommage enzyme doux',
      'Masque purifiant argile',
      'Masque hydratant quartz rose',
      'Huile précieuse visage'
    ],
    benefits: ['Exfoliation douce', 'Pores resserrés', 'Éclat maximisé']
  },
  {
    id: 'r4',
    name: 'Pack Routine Complète',
    description: 'La routine complète Marutea : matin, soir et hebdomadaire réunis pour une peau sublimée.',
    price: 219,
    type: 'bundle',
    icon: Star,
    products: [
      'Tous les produits du matin',
      'Tous les produits du soir',
      'Le rituel hebdomadaire',
      '+ Bonus : Gua Sha en quartz rose'
    ],
    benefits: ['Économie de 30€', 'Routine complète', 'Cadeau offert']
  },
  {
    id: 'r5',
    name: 'Routine Anti-Âge Précieuse',
    description: 'Notre protocole premium pour lutter contre les signes du temps avec des actifs nobles.',
    price: 145,
    type: 'bundle',
    icon: Star,
    products: [
      'Sérum Anti-Âge Précieux',
      'Crème Lift & Fermeté',
      'Contour yeux Lift',
      'Masque réparateur intensif'
    ],
    benefits: ['Effet lift', 'Rides atténuées', 'Fermeté']
  },
  {
    id: 'r6',
    name: 'Routine Hydratation Intense',
    description: 'Pour les peaux déshydratées en quête de confort et de souplesse immédiate.',
    price: 78,
    type: 'bundle',
    icon: Sparkles,
    products: [
      'Sérum Hyaluronic Boost',
      'Crème Hydra-Confort',
      'Masque Hydratant SOS',
      'Brume hydratante'
    ],
    benefits: ['Hydratation profonde', 'Confort immédiat', 'Effet repulpant']
  }
]

export function Routine() {
  const handlePurchase = (productName: string) => {
    // In production, this would integrate with e-commerce platform
    alert(`Ajouté au panier: ${productName}`)
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      morning: 'Matin',
      evening: 'Soir',
      weekly: 'Hebdomadaire',
      bundle: 'Pack'
    }
    return labels[type]
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      morning: 'bg-yellow-100 text-yellow-800',
      evening: 'bg-indigo-100 text-indigo-800',
      weekly: 'bg-rose-100 text-rose-800',
      bundle: 'bg-emerald-100 text-emerald-800'
    }
    return colors[type]
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-4xl font-display text-emerald-900 mb-2">
          La Routine Marutea
        </h1>
        <p className="text-emerald-900/70">
          Des protocoles de soins certifiés 100% bio
        </p>
      </div>

      {/* Info Card */}
      <Card variant="gentle">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-900/10 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-900" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-emerald-900 mb-1">
              Votre rituel bien-être à domicile
            </h3>
            <p className="text-sm text-emerald-900/70 leading-relaxed">
              Prolongez l'expérience Marutea chez vous avec nos routines soigneusement élaborées.
              Produits certifiés bio, made in France.
            </p>
          </div>
        </div>
      </Card>

      {/* Routines List */}
      <div className="space-y-4">
        {routines.map((routine) => {
          const Icon = routine.icon

          return (
            <Card key={routine.id} variant="bubble">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-emerald-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-display text-xl text-emerald-900 leading-tight">
                        {routine.name}
                      </h3>
                      <Badge className={getTypeColor(routine.type)}>
                        {getTypeLabel(routine.type)}
                      </Badge>
                    </div>
                    <p className="text-lg font-semibold text-emerald-900">
                      {routine.price}€
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-emerald-900/70 leading-relaxed">
                  {routine.description}
                </p>

                {/* Products */}
                <div>
                  <span className="text-xs uppercase tracking-wide text-emerald-900/60 font-medium">
                    Contenu du pack:
                  </span>
                  <ul className="mt-2 space-y-1.5">
                    {routine.products.map((product, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-emerald-900 flex items-start gap-2"
                      >
                        <span className="text-emerald-900/40 mt-0.5">✓</span>
                        <span>{product}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="flex flex-wrap gap-2">
                  {routine.benefits.map((benefit) => (
                    <Badge key={benefit} variant="rose">
                      {benefit}
                    </Badge>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  fullWidth
                  variant="primary"
                  onClick={() => handlePurchase(routine.name)}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Ajouter au panier
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Bottom Info */}
      <Card>
        <div className="text-center space-y-3">
          <h3 className="font-medium text-emerald-900">
            Livraison gratuite dès 80€
          </h3>
          <p className="text-sm text-emerald-900/60">
            Produits certifiés bio • Made in France • Sans parabens
          </p>
          <div className="pt-2">
            <Button variant="outline" size="sm">
              En savoir plus sur nos produits
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
