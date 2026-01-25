import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Clock, ExternalLink, Flower2, Heart, Sparkles, Zap, Baby, User, Flame } from 'lucide-react'

interface Service {
  id: string
  name: string
  description?: string
  duration: string
  price: number
  category: string
  icon: any
}

const services: Service[] = [
  // RITUEL
  {
    id: 'r1',
    name: 'Rituel Féminin Sacré',
    description: 'Un voyage sensoriel unique alliant massage du corps et du visage pour une reconnexion profonde à votre essence féminine.',
    duration: '2h',
    price: 130,
    category: 'Rituel',
    icon: Sparkles
  },

  // SOIN ÉNERGÉTIQUE
  {
    id: 'e1',
    name: 'Soin énergétique Marutea',
    description: 'Rééquilibrage énergétique profond pour harmoniser corps et esprit.',
    duration: '60min',
    price: 70,
    category: 'Soin énergétique',
    icon: Flame
  },

  // MASSAGES ET SOINS DU CORPS
  {
    id: 'c1',
    name: 'Drainage lymphatique esthétique manuel',
    description: 'Technique douce favorisant l\'élimination des toxines et la réduction de la rétention d\'eau.',
    duration: '1h',
    price: 70,
    category: 'Corps',
    icon: Heart
  },
  {
    id: 'c2',
    name: 'Chi Nei Tsang',
    description: 'Massage abdominal traditionnel chinois pour libérer les émotions et tensions.',
    duration: '2h',
    price: 100,
    category: 'Corps',
    icon: Heart
  },
  {
    id: 'c3',
    name: 'Chi Nei Tsang - Tarif cure',
    duration: '1h30',
    price: 90,
    category: 'Corps',
    icon: Heart
  },
  {
    id: 'c4',
    name: 'Coquillages chauds',
    description: 'Voyage sensoriel aux îles avec des coquillages chauffés pour une détente absolue.',
    duration: '1h30',
    price: 105,
    category: 'Corps',
    icon: Heart
  },
  {
    id: 'c5',
    name: 'Coquillages chauds',
    duration: '1h',
    price: 80,
    category: 'Corps',
    icon: Heart
  },
  {
    id: 'c6',
    name: 'Egyptien',
    description: 'Massage inspiré des traditions égyptiennes antiques.',
    duration: '1h',
    price: 70,
    category: 'Corps',
    icon: Heart
  },
  {
    id: 'c7',
    name: 'Quartz Rose',
    description: 'Massage aux pierres de quartz rose pour l\'amour de soi et la douceur.',
    duration: '1h',
    price: 70,
    category: 'Corps',
    icon: Heart
  },
  {
    id: 'c8',
    name: 'Polynésien',
    description: 'Massage traditionnel aux influences des îles du Pacifique.',
    duration: '1h',
    price: 75,
    category: 'Corps',
    icon: Heart
  },
  {
    id: 'c9',
    name: 'Harmonie',
    description: 'Massage harmonisant pour retrouver équilibre et sérénité.',
    duration: '1h',
    price: 70,
    category: 'Corps',
    icon: Heart
  },
  {
    id: 'c10',
    name: 'Sérénité',
    description: 'Pause bien-être express pour apaiser tensions et stress.',
    duration: '30min',
    price: 40,
    category: 'Corps',
    icon: Heart
  },
  {
    id: 'c11',
    name: 'Prénatal',
    description: 'Massage adapté aux futures mamans pour soulager les tensions de la grossesse.',
    duration: '1h',
    price: 75,
    category: 'Corps',
    icon: Heart
  },
  {
    id: 'c12',
    name: 'Prénatal',
    duration: '1h30',
    price: 100,
    category: 'Corps',
    icon: Heart
  },
  {
    id: 'c13',
    name: 'Gommage',
    description: 'Exfoliation douce pour une peau lumineuse et soyeuse.',
    duration: '30min',
    price: 45,
    category: 'Corps',
    icon: Sparkles
  },
  {
    id: 'c14',
    name: 'Gommage + massage',
    description: 'Rituel complet: exfoliation suivie d\'un massage nourrissant.',
    duration: '1h',
    price: 75,
    category: 'Corps',
    icon: Sparkles
  },
  {
    id: 'c15',
    name: 'Gommage + massage',
    duration: '1h30',
    price: 100,
    category: 'Corps',
    icon: Sparkles
  },

  // MASSAGES ET SOINS DU VISAGE
  {
    id: 'v1',
    name: 'Soin Hydralis',
    description: 'Soin hydratation intense pour nettoyer et illuminer votre peau en profondeur.',
    duration: '90min',
    price: 110,
    category: 'Visage',
    icon: Flower2
  },
  {
    id: 'v2',
    name: 'Soin Hydralis',
    duration: '60min',
    price: 90,
    category: 'Visage',
    icon: Flower2
  },
  {
    id: 'v3',
    name: 'Massage Plénitude',
    description: 'Massage du visage complet pour détente et rayonnement.',
    duration: '90min',
    price: 110,
    category: 'Visage',
    icon: Flower2
  },
  {
    id: 'v4',
    name: 'Massage Crânien',
    description: 'Libération des tensions et relaxation profonde du crâne, suivi d\'une dégustation de tisane bio.',
    duration: '60min',
    price: 75,
    category: 'Visage',
    icon: Flower2
  },
  {
    id: 'v5',
    name: 'Massage du Visage Liftant Japonais (Kobido)',
    description: 'Technique ancestrale japonaise pour un effet lifting naturel.',
    duration: '40min',
    price: 50,
    category: 'Visage',
    icon: Sparkles
  },
  {
    id: 'v6',
    name: 'Massage du Visage Liftant Japonais (Kobido)',
    duration: '60min',
    price: 70,
    category: 'Visage',
    icon: Sparkles
  },
  {
    id: 'v7',
    name: 'Signature',
    description: 'Notre soin signature Marutea, une expérience unique et personnalisée.',
    duration: '1h',
    price: 70,
    category: 'Visage',
    icon: Sparkles
  },
  {
    id: 'v8',
    name: 'Coup d\'Éclat',
    description: 'Soin express pour un teint frais et lumineux instantanément.',
    duration: '30min',
    price: 45,
    category: 'Visage',
    icon: Sparkles
  },
  {
    id: 'v9',
    name: 'Précieux',
    description: 'Soin précieux aux actifs nobles pour sublimer votre peau.',
    duration: '1h',
    price: 75,
    category: 'Visage',
    icon: Sparkles
  },

  // POUR LES ENFANTS
  {
    id: 'k1',
    name: 'Massage pour Enfant',
    description: 'Atelier d\'auto-massage parent/enfant suivi d\'un massage bien-être.',
    duration: '1h',
    price: 80,
    category: 'Enfants',
    icon: Baby
  },

  // LES « + » BIEN-ÊTRE
  {
    id: 'p1',
    name: 'EDEN massage Cuir Chevelu',
    duration: '10min',
    price: 10,
    category: '+ Bien-être',
    icon: Heart
  },
  {
    id: 'p2',
    name: 'SATIN massage Contour des Yeux',
    duration: '10min',
    price: 10,
    category: '+ Bien-être',
    icon: Heart
  },
  {
    id: 'p3',
    name: 'ÉCLAT massage Visage',
    duration: '10min',
    price: 10,
    category: '+ Bien-être',
    icon: Heart
  },
  {
    id: 'p4',
    name: 'DOUCEUR massage Dos',
    duration: '10min',
    price: 10,
    category: '+ Bien-être',
    icon: Heart
  },
  {
    id: 'p5',
    name: 'MERVEILLE massage Mains',
    duration: '10min',
    price: 10,
    category: '+ Bien-être',
    icon: Heart
  },
  {
    id: 'p6',
    name: 'ÉVASION massage Pieds',
    duration: '10min',
    price: 10,
    category: '+ Bien-être',
    icon: Heart
  },

  // POUR LES HOMMES
  {
    id: 'h1',
    name: 'Soin du visage COUP D\'ECLAT',
    description: 'Soin énergisant pour un teint frais (Sur recommandation féminine uniquement).',
    duration: '30min',
    price: 45,
    category: 'Hommes',
    icon: User
  },
  {
    id: 'h2',
    name: 'Soin du visage SIGNATURE',
    description: 'Notre soin signature adapté à la peau masculine (Sur recommandation féminine uniquement).',
    duration: '1h',
    price: 70,
    category: 'Hommes',
    icon: User
  },
  {
    id: 'h3',
    name: 'Massage SERENITE Dos',
    description: 'Massage ciblé pour libérer les tensions du dos (Sur recommandation féminine uniquement).',
    duration: '30min',
    price: 40,
    category: 'Hommes',
    icon: User
  },
  {
    id: 'h4',
    name: 'Massage Crânien',
    description: 'Relaxation profonde du crâne (Sur recommandation féminine uniquement).',
    duration: '60min',
    price: 75,
    category: 'Hommes',
    icon: User
  }
]

const categories = [
  'Tous',
  'Rituel',
  'Soin énergétique',
  'Corps',
  'Visage',
  'Enfants',
  '+ Bien-être',
  'Hommes'
]

export function LesSoins() {
  const [selectedCategory, setSelectedCategory] = useState('Tous')

  const filteredServices =
    selectedCategory === 'Tous'
      ? services
      : services.filter((s) => s.category === selectedCategory)

  const handleBooking = (serviceName: string) => {
    // In production, this would integrate with Planity, Treatwell, or a custom booking system
    alert(`Redirection vers la prise de rendez-vous pour: ${serviceName}`)
    // Example: window.open('https://www.planity.com/marutea', '_blank')
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-4xl font-display text-emerald-900 mb-2">Les Soins</h1>
        <p className="text-emerald-900/70">Découvrez nos rituels bien-être 100% bio</p>
      </div>

      {/* Category Filter */}
      <div className="overflow-x-auto -mx-4 px-4 pb-2">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-900 text-white'
                  : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {filteredServices.map((service) => {
          const Icon = service.icon

          return (
            <Card key={service.id} variant="bubble">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-emerald-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-emerald-900 leading-tight mb-1">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1 text-emerald-900/60">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{service.duration}</span>
                      </div>
                      <span className="font-semibold text-emerald-900">
                        {service.price}€
                      </span>
                      <Badge variant="emerald" className="ml-auto">
                        {service.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {service.description && (
                  <p className="text-sm text-emerald-900/70 leading-relaxed">
                    {service.description}
                  </p>
                )}

                {/* CTA */}
                <Button
                  fullWidth
                  variant="primary"
                  size="sm"
                  onClick={() => handleBooking(service.name)}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Réserver
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Flash Opening Card */}
      <Card variant="gentle" className="border-2 border-rose-200">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center animate-pulse">
            <Zap className="w-6 h-6 text-emerald-900" />
          </div>
          <h3 className="font-display text-lg text-emerald-900 mb-2">
            Flash Opening
          </h3>
          <p className="text-sm text-emerald-900/70 mb-4">
            Soyez alerté en cas de créneaux disponibles en dernière minute
          </p>
          <Button variant="secondary" size="sm">
            Activer les notifications
          </Button>
        </div>
      </Card>

      {/* Contact Card */}
      <Card>
        <div className="text-center space-y-3">
          <h3 className="font-medium text-emerald-900">
            Une question sur nos soins ?
          </h3>
          <p className="text-sm text-emerald-900/60">
            Notre équipe est à votre écoute pour vous conseiller
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="sm">
              📞 Appeler
            </Button>
            <Button variant="outline" size="sm">
              ✉️ Email
            </Button>
          </div>
        </div>
      </Card>

      {/* Important Note for Men's Services */}
      {selectedCategory === 'Hommes' && (
        <Card variant="gentle">
          <p className="text-xs text-emerald-900/60 text-center leading-relaxed">
            Sur recommandation féminine uniquement. Prestations non sexuelles.
          </p>
        </Card>
      )}
    </div>
  )
}
