import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import { formatPrix } from '@/lib/utils'
import type { GiftCard } from '@/types/gift-card'

export const dynamic = 'force-dynamic'

export default async function CartesPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Cartes achetées par l'utilisateur OU reçues sur son email
  const { data } = await supabase
    .from('gift_cards')
    .select('*')
    .or(`acheteur_id.eq.${user!.id},destinataire_email.eq.${user!.email}`)
    .order('created_at', { ascending: false })

  const cartes = (data ?? []) as GiftCard[]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl text-dark">Mes cartes cadeaux</h2>

      {cartes.length === 0 ? (
        <Card className="text-center">
          <p className="text-dark/70">
            Aucune carte cadeau achetée ou reçue pour le moment.
          </p>
          <Link
            href="/cartes-cadeaux"
            className="mt-4 inline-block text-sage underline-offset-4 hover:underline"
          >
            Offrir une carte cadeau →
          </Link>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {cartes.map((carte) => {
            const epuisee = carte.solde_cents <= 0
            const expiree =
              carte.expire_at && new Date(carte.expire_at) < new Date()

            return (
              <Card key={carte.id} className="!p-6">
                <div className="flex items-start justify-between">
                  <p className="font-display text-3xl text-sage">
                    {formatPrix(carte.valeur_cents)}
                  </p>
                  {(epuisee || expiree) && (
                    <span className="rounded-full bg-sand/40 px-3 py-1 text-xs text-dark/60">
                      {epuisee ? 'Utilisée' : 'Expirée'}
                    </span>
                  )}
                </div>
                <p className="mt-3 font-mono text-lg tracking-widest text-dark">
                  {carte.code}
                </p>
                <div className="mt-4 flex justify-between text-sm text-dark/60">
                  <span>Solde : {formatPrix(carte.solde_cents)}</span>
                  {carte.expire_at && (
                    <span>
                      Expire le{' '}
                      {new Intl.DateTimeFormat('fr-FR').format(
                        new Date(carte.expire_at)
                      )}
                    </span>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
