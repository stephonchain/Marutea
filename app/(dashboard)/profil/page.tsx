import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'

export const dynamic = 'force-dynamic'

export default async function ProfilPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .maybeSingle()

  const profile = data as {
    full_name: string | null
    phone: string | null
  } | null

  return (
    <Card className="max-w-xl">
      <h2 className="text-3xl text-dark">Mon profil</h2>
      <dl className="mt-6 space-y-4 text-sm">
        <div>
          <dt className="text-dark/50">Nom</dt>
          <dd className="mt-1 text-lg text-dark">
            {profile?.full_name ??
              (user!.user_metadata?.full_name as string | undefined) ??
              '—'}
          </dd>
        </div>
        <div>
          <dt className="text-dark/50">Email</dt>
          <dd className="mt-1 text-lg text-dark">{user!.email}</dd>
        </div>
        <div>
          <dt className="text-dark/50">Téléphone</dt>
          <dd className="mt-1 text-lg text-dark">{profile?.phone ?? '—'}</dd>
        </div>
      </dl>
    </Card>
  )
}
