import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Scissors, BarChart3, Megaphone, MapPin, Gift, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { cn } from '@/lib/utils'

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { path: '/', icon: Home, label: 'Clients' },
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/marketing', icon: Megaphone, label: 'Marketing' },
    { path: '/locations', icon: MapPin, label: 'Locations' },
    { path: '/bilt', icon: Gift, label: 'Bilt' },
  ]

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-ink-900/95 backdrop-blur-md border-b border-ink-800 safe-top">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <Scissors className="w-4 h-4 text-ink-950" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold text-brand-100 leading-tight">Sassy Spa</h1>
              <p className="text-[10px] text-brand-400 tracking-widest uppercase">Client Book v2</p>
            </div>
          </div>
          <button onClick={() => setMenuOpen(true)} className="w-10 h-10 rounded-xl bg-ink-800 flex items-center justify-center active:bg-ink-700">
            <Menu className="w-5 h-5 text-ink-300" />
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="sticky bottom-0 z-50 bg-ink-900/95 backdrop-blur-md border-t border-ink-800 safe-bottom">
        <div className="flex items-center justify-around px-1 py-2">
          {navItems.map(item => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
            const Icon = item.icon
            return (
              <button key={item.path} onClick={() => navigate(item.path)} className={cn("flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all active:scale-95", isActive ? 'text-brand-400' : 'text-ink-500 hover:text-ink-300')}>
                <Icon className={cn("w-5 h-5", isActive ? 'stroke-[2.5px]' : 'stroke-2')} />
                <span className="text-[9px] font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Side Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-ink-900 border-l border-ink-800 p-5 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm font-semibold text-ink-200">{user?.name}</p>
                <p className="text-xs text-ink-500 capitalize">{user?.role}</p>
              </div>
              <button onClick={() => setMenuOpen(false)} className="w-8 h-8 rounded-lg bg-ink-800 flex items-center justify-center">
                <X className="w-4 h-4 text-ink-400" />
              </button>
            </div>
            <div className="space-y-1 flex-1">
              {navItems.map(item => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <button key={item.path} onClick={() => { navigate(item.path); setMenuOpen(false) }} className={cn("w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition", isActive ? 'bg-brand-950/40 text-brand-300' : 'text-ink-400 hover:bg-ink-800')}>
                    <Icon className="w-4 h-4" /> {item.label}
                  </button>
                )
              })}
            </div>
            <button onClick={() => { logout(); setMenuOpen(false) }} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-950/20 transition">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </>
  )
}
