import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Clock, ExternalLink, Flower2, Heart, Sparkles, Zap } from 'lucide-react'

interface Service {
  id: string
  name: string
  description: string
  duration: number
  price: number
  category: string
  icon: any
  benefits: string[]
}

const services: Service[] = [
  {
    id: 's1',
    name: 'Soin Visage Éclat',
    description:
      'Un soin complet pour révéler la luminosité naturelle de votre peau. Nettoyage en profondeur, gommage doux et masque illuminateur.',
    duration: 60,
    price: 75,
    category: 'Visage',
    icon: Sparkles,
    benefits: ['Éclat instantané', 'Hydratation', 'Peau lissée']
  },
  {
    id: 's2',
    name: 'Massage Relaxant',
    description:
      'Laissez-vous porter par un moment de pure détente. Massage aux huiles essentielles pour libérer les tensions.',
    duration: 90,
    price: 95,
    category: 'Corps',
    icon: Heart,
    benefits: ['Détente profonde', 'Circulation', 'Bien-être']
  },
  {
    id: 's3',
    name: 'Soin Anti-Âge Premium',
    description:
      'Soin haute performance combinant technologies avancées et actifs puissants pour une peau visiblement rajeunie.',
    duration: 75,
    price: 120,
    category: 'Visage',
    icon: Zap,
    benefits: ['Anti-rides', 'Fermeté', 'Lift naturel']
  },
  {
    id: 's4',
    name: 'Rituel Hydratation',
    description:
      'Un bain d\'hydratation pour les peaux déshydratées. Votre peau retrouve confort et souplesse.',
    duration: 60,
    price: 80,
    category: 'Visage',
    icon: Flower2,
    benefits: ['Hydratation intense', 'Confort', 'Éclat']
  }
]

export function LesSoins() {
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
        <p className="text-emerald-900/70">Découvrez nos rituels bien-être</p>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service) => {
          const Icon = service.icon

          return (
            <Card key={service.id} variant="bubble">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-emerald-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-display text-xl text-emerald-900 leading-tight">
                        {service.name}
                      </h3>
                      <Badge variant="rose">{service.category}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-emerald-900/60">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration} min</span>
                      </div>
                      <span className="font-medium text-emerald-900">
                        {service.price}€
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-emerald-900/70 leading-relaxed">
                  {service.description}
                </p>

                {/* Benefits */}
                <div>
                  <span className="text-sm text-emerald-900/60 block mb-2">
                    Bienfaits:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {service.benefits.map((benefit) => (
                      <Badge key={benefit} variant="emerald">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button
                  fullWidth
                  variant="primary"
                  onClick={() => handleBooking(service.name)}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Réserver ce soin
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
    </div>
  )
}
