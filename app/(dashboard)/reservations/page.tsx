import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'

export const dynamic = 'force-dynamic'

const STATUT_LABELS: Record<string, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  cancelled: 'Annulée',
}

interface ReservationRow {
  id: string
  date_heure: string
  statut: string
  soins: { nom: string } | null
}

export default async function ReservationsPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data } = await supabase
    .from('reservations')
    .select('*, soins(nom)')
    .eq('user_id', user!.id)
    .order('date_heure', { ascending: false })

  const reservations = (data ?? []) as unknown as ReservationRow[]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl text-dark">Mes réservations</h2>

      {reservations.length === 0 ? (
        <Card className="text-center">
          <p className="text-dark/70">
            Aucune réservation pour le moment.
          </p>
          <Link
            href="/reservation"
            className="mt-4 inline-block text-sage underline-offset-4 hover:underline"
          >
            Réserver mon premier soin →
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {reservations.map((r) => (
            <Card key={r.id} className="flex items-center justify-between !p-6">
              <div>
                <p className="font-medium text-dark">
                  {r.soins?.nom ?? 'Soin'}
                </p>
                <p className="mt-1 text-sm text-dark/60">
                  {new Intl.DateTimeFormat('fr-FR', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                  }).format(new Date(r.date_heure))}
                </p>
              </div>
              <span
                className={`rounded-full px-4 py-1.5 text-xs font-medium ${
                  r.statut === 'confirmed'
                    ? 'bg-sage/15 text-sage'
                    : r.statut === 'cancelled'
                      ? 'bg-terra/15 text-terra'
                      : 'bg-sand/40 text-dark/70'
                }`}
              >
                {STATUT_LABELS[r.statut] ?? r.statut}
              </span>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
