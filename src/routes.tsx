import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { LaPause } from './pages/LaPause'
import { MonJournal } from './pages/MonJournal'
import { LesSoins } from './pages/LesSoins'
import { Routine } from './pages/Routine'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/pause" element={<LaPause />} />
      <Route path="/journal" element={<MonJournal />} />
      <Route path="/soins" element={<LesSoins />} />
      <Route path="/routine" element={<Routine />} />
    </Routes>
  )
}
