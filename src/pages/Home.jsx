import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Clock, AlertTriangle, ChevronRight, UserPlus } from 'lucide-react'
import { getInTheChairLately, getHaventBeenInAWhile, getDaysSince, getLastVisit } from '@/lib/utils'

export default function Home({ clients }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const filtered = query.trim() ? clients.filter(c => c.name.toLowerCase().includes(query.toLowerCase())) : clients
  const lately = getInTheChairLately(filtered, 8)
  const haventBeen = !query.trim() ? getHaventBeenInAWhile(clients) : []

  return (
    <div className="space-y-6 p-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
        <input type="text" placeholder="Find a client..." value={query} onChange={e => setQuery(e.target.value)}
          className="w-full bg-ink-800 border border-ink-700 rounded-xl pl-10 pr-4 py-3 text-sm text-ink-100 placeholder-ink-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50" />
      </div>

      {/* In the chair lately */}
      {!query.trim() && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-brand-400" />
            <h2 className="text-sm font-semibold text-ink-300 uppercase tracking-wider">In the chair lately</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
            {lately.map(client => {
              const firstName = client.name.split(' ')[0]
              const lastVisit = getLastVisit(client)
              return (
                <button key={client.id} onClick={() => navigate(`/client/${client.id}`)} className="flex-shrink-0 flex flex-col items-center gap-2 active:scale-95 transition-transform">
                  <div className="relative">
                    <img src={client.photo} alt={client.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-ink-800 shadow-soft" loading="lazy" />
                    {lastVisit && <span className="absolute -bottom-1 -right-1 bg-ink-900 text-[10px] text-ink-400 px-1.5 py-0.5 rounded-md border border-ink-800">{getDaysSince(lastVisit.date)}d</span>}
                  </div>
                  <span className="text-xs font-medium text-ink-300">{firstName}</span>
                </button>
              )
            })}
          </div>
        </section>
      )}

      {/* Haven't been in a while */}
      {haventBeen.length > 0 && !query.trim() && (
        <section className="bg-amber-950/30 border border-amber-900/40 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">Haven't been in a while</h2>
            <span className="ml-auto bg-amber-900/50 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-full">{haventBeen.length}</span>
          </div>
          <div className="space-y-2">
            {haventBeen.map(client => {
              const lastVisit = getLastVisit(client)
              const days = lastVisit ? getDaysSince(lastVisit.date) : 999
              return (
                <button key={client.id} onClick={() => navigate(`/client/${client.id}`)} className="w-full flex items-center gap-3 p-3 rounded-xl bg-ink-900/50 border border-ink-800/50 active:bg-ink-800 transition-colors">
                  <img src={client.photo} alt={client.name} className="w-12 h-12 rounded-xl object-cover border border-ink-800" loading="lazy" />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-ink-200">{client.name}</p>
                    <p className="text-xs text-ink-500">{client.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-amber-500">{days}<span className="text-xs font-normal text-amber-600/70 ml-0.5">d</span></p>
                    <p className="text-[10px] text-ink-600">since last visit</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-ink-600" />
                </button>
              )
            })}
          </div>
        </section>
      )}

      {/* All clients */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-ink-300 uppercase tracking-wider">{query.trim() ? 'Search Results' : 'All Clients'}</h2>
          <button onClick={() => navigate('/add-visit')} className="flex items-center gap-1 text-xs text-brand-400 font-medium bg-brand-950/30 px-2.5 py-1 rounded-lg">
            <UserPlus className="w-3 h-3" /> New
          </button>
        </div>
        <div className="space-y-2">
          {filtered.map(client => {
            const lastVisit = getLastVisit(client)
            return (
              <button key={client.id} onClick={() => navigate(`/client/${client.id}`)} className="w-full flex items-center gap-3 p-3 rounded-xl bg-ink-900/40 border border-ink-800/30 active:bg-ink-800 transition-colors">
                <img src={client.photo} alt={client.name} className="w-14 h-14 rounded-xl object-cover border border-ink-800" loading="lazy" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-ink-200">{client.name}</p>
                  <p className="text-xs text-ink-500">{client.phone}</p>
                  {lastVisit && <p className="text-xs text-ink-600 mt-0.5">{lastVisit.service} · {lastVisit.date}</p>}
                </div>
                {client.biltTier && (
                  <div className="text-right">
                    <span className={"text-[10px] font-bold px-1.5 py-0.5 rounded-full " + (client.biltTier === 'Platinum' ? 'bg-purple-950/40 text-purple-400' : client.biltTier === 'Gold' ? 'bg-amber-950/40 text-amber-400' : client.biltTier === 'Silver' ? 'bg-slate-800 text-slate-300' : 'bg-blue-950/40 text-blue-400')}>
                      {client.biltTier}
                    </span>
                    <p className="text-[10px] text-ink-600 mt-0.5">{client.biltPoints} pts</p>
                  </div>
                )}
                <ChevronRight className="w-4 h-4 text-ink-600" />
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
