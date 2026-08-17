import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { INITIAL_CLIENTS, COUPONS, REMINDERS, LOCATIONS } from '@/data/clients'
import Layout from '@/components/Layout'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import ClientCard from '@/pages/ClientCard'
import AddVisit from '@/pages/AddVisit'
import Dashboard from '@/pages/Dashboard'
import Marketing from '@/pages/Marketing'
import Locations from '@/pages/Locations'
import BiltRewards from '@/pages/BiltRewards'

function AppRoutes() {
  const { isAuthenticated } = useAuth()
  const [clients, setClients] = useLocalStorage('sassyspa_v2_clients', INITIAL_CLIENTS)
  const [coupons] = useLocalStorage('sassyspa_v2_coupons', COUPONS)
  const [reminders, setReminders] = useLocalStorage('sassyspa_v2_reminders', REMINDERS)

  const addVisit = (clientId, visit) => {
    setClients(prev => prev.map(c => {
      if (c.id !== clientId) return c
      const biltEarned = visit.biltEarned || Math.round((visit.price || 0) * (c.biltTier === 'Platinum' ? 2 : c.biltTier === 'Gold' ? 1.5 : c.biltTier === 'Silver' ? 1.25 : 1))
      return { ...c, visits: [{ ...visit, biltEarned }, ...c.visits], biltPoints: (c.biltPoints || 0) + biltEarned }
    }))
  }

  const addClient = (data) => {
    const newClient = { id: 'c' + Date.now(), ...data, photo: 'https://picsum.photos/seed/' + Date.now() + '/400/400', formula: { guards:'', fadeStyle:'', lineup:'', beard:'' }, notes: [], visits: [], biltPoints: 500, biltTier: 'Blue', biltMemberSince: new Date().toISOString().slice(0,7) }
    setClients(prev => [newClient, ...prev])
    return newClient.id
  }

  const updateClient = (clientId, updates) => {
    setClients(prev => prev.map(c => c.id === clientId ? { ...c, ...updates } : c))
  }

  const sendReminder = (reminderId) => {
    setReminders(prev => prev.map(r => r.id === reminderId ? { ...r, sent: true, sentAt: new Date().toISOString() } : r))
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home clients={clients} />} />
        <Route path="/client/:clientId" element={<ClientCard clients={clients} onUpdateClient={updateClient} />} />
        <Route path="/add-visit" element={<AddVisit clients={clients} onAddVisit={addVisit} onAddClient={addClient} />} />
        <Route path="/add-visit/:clientId" element={<AddVisit clients={clients} onAddVisit={addVisit} onAddClient={addClient} />} />
        <Route path="/dashboard" element={<Dashboard clients={clients} coupons={coupons} reminders={reminders} onSendReminder={sendReminder} />} />
        <Route path="/marketing" element={<Marketing clients={clients} coupons={coupons} reminders={reminders} onSendReminder={sendReminder} />} />
        <Route path="/locations" element={<Locations locations={LOCATIONS} />} />
        <Route path="/bilt" element={<BiltRewards clients={clients} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-ink-950 flex flex-col max-w-md mx-auto shadow-2xl relative">
        <AppRoutes />
      </div>
    </AuthProvider>
  )
}
