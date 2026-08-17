import { Users, Scissors, AlertTriangle, TrendingUp, Calendar, MessageSquare, Mail, Gift, Star, DollarSign } from 'lucide-react'
import { getHaventBeenInAWhile, getLastVisit, formatCurrency } from '@/lib/utils'

export default function Dashboard({ clients, coupons, reminders, onSendReminder }) {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const totalClients = clients.length
  const visitsThisMonth = clients.reduce((sum, c) => sum + c.visits.filter(v => { const d = new Date(v.date); return d.getMonth() === currentMonth && d.getFullYear() === currentYear }).length, 0)
  const revenueThisMonth = clients.reduce((sum, c) => sum + c.visits.filter(v => { const d = new Date(v.date); return d.getMonth() === currentMonth && d.getFullYear() === currentYear }).reduce((s, v) => s + (v.price || 0), 0), 0)
  const haventBeen = getHaventBeenInAWhile(clients)
  const biltMembers = clients.filter(c => c.biltTier).length
  const totalBiltPoints = clients.reduce((sum, c) => sum + (c.biltPoints || 0), 0)

  const serviceCounts = {}
  clients.forEach(c => c.visits.forEach(v => { const d = new Date(v.date); if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) { serviceCounts[v.service] = (serviceCounts[v.service] || 0) + 1 } }))
  const mostPopular = Object.entries(serviceCounts).sort((a, b) => b[1] - a[1])[0]

  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000)
  const recentActivity = []
  clients.forEach(c => c.visits.forEach(v => { if (new Date(v.date) >= sevenDaysAgo) recentActivity.push({ ...v, clientName: c.name, clientPhoto: c.photo }) }))
  recentActivity.sort((a, b) => new Date(b.date) - new Date(a.date))

  const stats = [
    { label: 'Total Clients', value: totalClients, icon: Users, color: 'text-brand-400', bg: 'bg-brand-950/30' },
    { label: 'Visits This Month', value: visitsThisMonth, icon: Scissors, color: 'text-emerald-400', bg: 'bg-emerald-950/30' },
    { label: 'Revenue', value: formatCurrency(revenueThisMonth), icon: DollarSign, color: 'text-blue-400', bg: 'bg-blue-950/30' },
    { label: 'Haven\'t Been', value: haventBeen.length, icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-950/30' },
  ]

  return (
    <div className="p-4 space-y-6 pb-8">
      <div className="grid grid-cols-2 gap-3">
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className={`${stat.bg} border border-ink-800/30 rounded-2xl p-4`}>
              <div className={`w-8 h-8 rounded-lg ${stat.bg} border border-ink-800/20 flex items-center justify-center mb-2`}><Icon className={`w-4 h-4 ${stat.color}`} /></div>
              <p className="text-xl font-bold text-ink-100">{stat.value}</p>
              <p className="text-[10px] text-ink-500 uppercase tracking-wider mt-0.5">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Bilt Summary */}
      <div className="bg-gradient-to-r from-brand-950/40 to-purple-950/30 border border-brand-800/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3"><Gift className="w-4 h-4 text-brand-400" /><h3 className="text-sm font-bold text-brand-300 uppercase tracking-wider">Bilt Rewards Overview</h3></div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div><p className="text-xl font-bold text-ink-100">{biltMembers}</p><p className="text-[10px] text-ink-500">Members</p></div>
          <div><p className="text-xl font-bold text-ink-100">{totalBiltPoints.toLocaleString()}</p><p className="text-[10px] text-ink-500">Total Points</p></div>
          <div><p className="text-xl font-bold text-ink-100">{coupons.filter(c => c.type === 'bilt').length}</p><p className="text-[10px] text-ink-500">Active Promos</p></div>
        </div>
      </div>

      {/* Most Popular */}
      <div className="bg-ink-900/40 border border-ink-800/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3"><TrendingUp className="w-4 h-4 text-brand-400" /><h3 className="text-sm font-bold text-ink-300 uppercase tracking-wider">Most Popular This Month</h3></div>
        {mostPopular ? (
          <div className="flex items-center justify-between">
            <div><p className="text-lg font-semibold text-ink-100">{mostPopular[0]}</p><p className="text-xs text-ink-500">{mostPopular[1]} {mostPopular[1]===1?'visit':'visits'}</p></div>
            <div className="w-12 h-12 rounded-xl bg-brand-950/30 border border-brand-800/20 flex items-center justify-center"><Scissors className="w-6 h-6 text-brand-500" /></div>
          </div>
        ) : <p className="text-sm text-ink-600 italic">No visits recorded this month yet.</p>}
      </div>

      {/* Pending Reminders */}
      {reminders.filter(r => !r.sent).length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3"><MessageSquare className="w-4 h-4 text-ink-500" /><h3 className="text-sm font-bold text-ink-300 uppercase tracking-wider">Pending Reminders</h3></div>
          <div className="space-y-2">
            {reminders.filter(r => !r.sent).map(r => {
              const client = clients.find(c => c.id === r.clientId)
              return (
                <div key={r.id} className="p-3 rounded-xl bg-ink-900/40 border border-ink-800/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-ink-300">{client?.name}</span>
                    <span className="text-[10px] text-ink-500 uppercase">{r.type}</span>
                  </div>
                  <p className="text-xs text-ink-500 mb-2">{r.message}</p>
                  <button onClick={() => onSendReminder(r.id)} className="w-full py-2 rounded-lg bg-brand-950/30 border border-brand-800/30 text-brand-400 text-xs font-medium active:bg-brand-900/50 transition">Send {r.type === 'sms' ? 'Text' : 'Email'}</button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div>
        <div className="flex items-center gap-2 mb-3"><Calendar className="w-4 h-4 text-ink-500" /><h3 className="text-sm font-bold text-ink-300 uppercase tracking-wider">Last 7 Days</h3></div>
        {recentActivity.length > 0 ? (
          <div className="space-y-2">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-ink-900/30 border border-ink-800/20">
                <img src={a.clientPhoto} alt="" className="w-10 h-10 rounded-lg object-cover border border-ink-800" />
                <div className="flex-1 min-w-0"><p className="text-sm font-medium text-ink-200">{a.clientName}</p><p className="text-xs text-ink-500">{a.service}</p></div>
                <div className="text-right"><p className="text-xs text-ink-600">{a.date}</p>{a.biltEarned > 0 && <p className="text-[10px] text-brand-400 flex items-center justify-end gap-0.5"><Star className="w-3 h-3" />+{a.biltEarned}</p>}</div>
              </div>
            ))}
          </div>
        ) : <p className="text-sm text-ink-600 italic">No activity in the last 7 days.</p>}
      </div>
    </div>
  )
}
