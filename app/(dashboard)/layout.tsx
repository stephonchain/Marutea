export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <nav className="flex gap-6 mb-8 border-b border-sand/30 pb-4">
        <a href="/profil" className="text-sm font-medium text-dark/70 hover:text-terra">
          Mon Profil
        </a>
        <a href="/reservations" className="text-sm font-medium text-dark/70 hover:text-terra">
          Mes Réservations
        </a>
        <a href="/cartes" className="text-sm font-medium text-dark/70 hover:text-terra">
          Mes Cartes Cadeaux
        </a>
      </nav>
      {children}
    </div>
  )
}
