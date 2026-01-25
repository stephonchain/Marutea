import { useUserStore } from '@/stores/userStore'
import { useContentStore } from '@/stores/contentStore'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import { Calendar, Gift, Sparkles } from 'lucide-react'

export function Dashboard() {
  const user = useUserStore((state) => state.user)
  const appointments = useUserStore((state) => state.appointments)
  const thoughtOfTheDay = useContentStore((state) => state.thoughtOfTheDay)

  const nextAppointment = appointments.find((apt) => apt.status === 'confirmed')

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bonjour'
    if (hour < 18) return 'Bon après-midi'
    return 'Bonsoir'
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getRewardMilestone = () => {
    const points = user?.loyaltyPoints || 0
    if (points < 500) return { next: 500, reward: 'Soin Express Offert' }
    if (points < 1000) return { next: 1000, reward: 'Soin Visage Premium' }
    return { next: 1500, reward: 'Journée Spa Complète' }
  }

  const milestone = getRewardMilestone()

  return (
    <div className="space-y-6 pb-6">
      {/* Greeting Header */}
      <div className="text-center pt-4">
        <h1 className="text-4xl font-display text-emerald-900 mb-2">
          {getGreeting()}, {user?.name}
        </h1>
        <p className="text-emerald-900/70">Bienvenue dans votre bulle</p>
      </div>

      {/* Thought of the Day */}
      <Card variant="gentle" className="relative overflow-hidden">
        <div className="absolute top-2 right-2 text-rose-200">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="pr-8">
          <h3 className="text-sm font-medium text-emerald-900/60 mb-2">
            Pensée du jour
          </h3>
          <p className="text-lg font-display text-emerald-900 leading-relaxed">
            {thoughtOfTheDay}
          </p>
        </div>
      </Card>

      {/* Loyalty Points */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-emerald-900" />
            <h3 className="font-medium text-emerald-900">Mes Points Fidélité</h3>
          </div>
          <Badge variant="rose">{user?.loyaltyPoints} pts</Badge>
        </div>
        <ProgressBar
          current={user?.loyaltyPoints || 0}
          max={milestone.next}
          showPercentage
        />
        <p className="text-sm text-emerald-900/60 mt-3">
          Plus que {milestone.next - (user?.loyaltyPoints || 0)} points pour débloquer :{' '}
          <span className="font-medium text-emerald-900">{milestone.reward}</span>
        </p>
      </Card>

      {/* Next Appointment */}
      {nextAppointment && (
        <Card variant="bubble">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-emerald-900" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-emerald-900 mb-1">
                Prochain Rendez-vous
              </h3>
              <p className="text-emerald-900 font-display text-lg mb-2">
                {nextAppointment.serviceName}
              </p>
              <p className="text-sm text-emerald-900/60">
                {formatDate(nextAppointment.dateTime)}
              </p>
              <Badge variant="emerald" className="mt-3">
                Confirmé
              </Badge>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card variant="gentle" onClick={() => window.location.href = '/soins'}>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white flex items-center justify-center">
              <Calendar className="w-6 h-6 text-emerald-900" />
            </div>
            <p className="font-medium text-emerald-900">Réserver</p>
            <p className="text-xs text-emerald-900/60 mt-1">un soin</p>
          </div>
        </Card>

        <Card variant="gentle" onClick={() => window.location.href = '/pause'}>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-emerald-900" />
            </div>
            <p className="font-medium text-emerald-900">Ma Pause</p>
            <p className="text-xs text-emerald-900/60 mt-1">médias bien-être</p>
          </div>
        </Card>
      </div>

      {/* Beauty Profile Summary */}
      <Card>
        <h3 className="font-medium text-emerald-900 mb-4">Mon Profil Beauté</h3>
        <div className="space-y-3">
          <div>
            <span className="text-sm text-emerald-900/60">Type de peau:</span>
            <p className="font-medium text-emerald-900">{user?.skinType}</p>
          </div>
          <div>
            <span className="text-sm text-emerald-900/60">Préoccupations:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {user?.concerns.map((concern) => (
                <Badge key={concern} variant="emerald">
                  {concern}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
