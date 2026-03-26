import { NavLink } from 'react-router-dom'
import { Home, Sparkles, BookHeart, Flower2, ShoppingBag } from 'lucide-react'

export function BottomNavigation() {
  const navItems = [
    { to: '/', icon: Home, label: 'Accueil' },
    { to: '/journal', icon: BookHeart, label: 'Journal' },
    { to: '/pause', icon: Sparkles, label: '', isFab: true },
    { to: '/soins', icon: Flower2, label: 'Soins' },
    { to: '/routine', icon: ShoppingBag, label: 'Routine' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-emerald-50 safe-bottom z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-around h-16 relative">
          {navItems.map(({ to, icon: Icon, label, isFab }) => {
            if (isFab) {
              return (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-rose-100 to-rose-200 scale-110'
                        : 'bg-gradient-to-br from-emerald-900 to-emerald-700 hover:scale-105'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <Icon
                      className={`w-6 h-6 ${isActive ? 'text-emerald-900' : 'text-white'}`}
                    />
                  )}
                </NavLink>
              )
            }

            return (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
                    isActive ? 'text-emerald-900' : 'text-gray-400'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-6 h-6 mb-1 ${isActive ? 'fill-emerald-100' : ''}`} />
                    <span className="text-xs font-medium">{label}</span>
                  </>
                )}
              </NavLink>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
