import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './routes'
import { BottomNavigation } from './components/layout/BottomNavigation'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-sand">
        <main className="container-app pt-6">
          <AppRoutes />
        </main>
        <BottomNavigation />
      </div>
    </Router>
  )
}

export default App
