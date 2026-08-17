import { useState } from 'react'
import { Megaphone, Gift, MessageSquare, Mail, Smartphone, Send, Copy, Check, Star, Zap, Calendar, Users } from 'lucide-react'
import { getHaventBeenInAWhile, getDaysSince, getLastVisit, formatPhone } from '@/lib/utils'
import { COUPONS, REMINDERS } from '@/data/clients'

export default function Marketing({ clients, coupons, reminders, onSendReminder }) {
  const [activeTab, setActiveTab] = useState('coupons')
  const [copiedCode, setCopiedCode] = useState(null)
  const [customMsg, setCustomMsg] = useState('')
  const [selectedClients, setSelectedClients] = useState([])
  const [msgType, setMsgType] = useState('sms')
  const [sentConfirm, setSentConfirm] = useState(false)

  const haventBeen = getHaventBeenInAWhile(clients)

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const toggleClient = (id) => {
    setSelectedClients(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])
  }

  const sendBulk = () => {
    setSentConfirm(true)
    setTimeout(() => setSentConfirm(false), 3000)
    setSelectedClients([])
    setCustomMsg('')
  }

  const tabs = [
    { id: 'coupons', label: 'Coupons', icon: Gift },
    { id: 'reminders', label: 'Reminders', icon: MessageSquare },
    { id: 'blast', label: 'Blast', icon: Zap },
  ]

  return (
    <div className="p-4 space-y-5 pb-8">
      <div>
        <div className="text-[11px] text-brand-400 uppercase tracking-[0.2em] font-semibold mb-1">Marketing Hub</div>
        <h2 className="text-2xl font-display font-bold text-ink-100">Attract & Retain</h2>
        <p className="text-xs text-ink-500 mt-1">Coupons, reminders, and campaigns to keep chairs full.</p>
      </div>

      <div className="flex gap-1 p-1 bg-ink-900/50 rounded-xl border border-ink-800/30">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${activeTab === tab.id ? 'bg-brand-600 text-ink-950' : 'text-ink-500 hover:text-ink-300'}`}>
              <Icon className="w-3.5 h-3.5" />{tab.label}
            </button>
          )
        })}
      </div>

      {activeTab === 'coupons' && (
        <div className="space-y-3">
          {coupons.map(coupon => (
            <div key={coupon.id} className="bg-gradient-to-br from-ink-900/60 to-ink-900/30 border border-ink-800/30 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-start justify-between relative">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${coupon.type === 'bilt' ? 'bg-brand-950/50 text-brand-400' : 'bg-ink-800 text-ink-400'}`}>{coupon.type === 'bilt' ? 'BILT' : coupon.type.toUpperCase()}</span>
                    <span className="text-[10px] text-ink-600">{coupon.usedCount} used</span>
                  </div>
                  <h3 className="text-lg font-bold text-ink-100 mt-1">{coupon.title}</h3>
                  <p className="text-xs text-ink-500 mt-0.5">{coupon.desc}</p>
                  <p className="text-[10px] text-ink-600 mt-2">Expires {coupon.expires}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-brand-400">{coupon.discount}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 bg-ink-950/50 border border-dashed border-ink-700 rounded-lg px-3 py-2 text-center">
                  <span className="text-sm font-mono font-bold text-ink-300 tracking-wider">{coupon.code}</span>
                </div>
                <button onClick={() => copyCode(coupon.code)} className="w-10 h-10 rounded-lg bg-ink-800 flex items-center justify-center active:bg-ink-700 transition">
                  {copiedCode === coupon.code ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-ink-400" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'reminders' && (
        <div className="space-y-4">
          <div className="bg-amber-950/30 border border-amber-900/40 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3"><Users className="w-4 h-4 text-amber-500" /><h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Win-Back List</h3><span className="ml-auto bg-amber-900/50 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-full">{haventBeen.length}</span></div>
            <div className="space-y-2">
              {haventBeen.map(client => {
                const days = getDaysSince(getLastVisit(client)?.date || '2020-01-01')
                return (
                  <div key={client.id} className="flex items-center gap-3 p-3 rounded-xl bg-ink-900/50 border border-ink-800/30">
                    <img src={client.photo} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink-200">{client.name}</p>
                      <p className="text-xs text-ink-500">{formatPhone(client.phone)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-amber-500">{days}<span className="text-xs font-normal text-amber-600/70 ml-0.5">d</span></p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-ink-300 uppercase tracking-wider mb-3">Scheduled Outreach</h3>
            <div className="space-y-2">
              {reminders.map(r => {
                const client = clients.find(c => c.id === r.clientId)
                return (
                  <div key={r.id} className={`p-3 rounded-xl border ${r.sent ? 'bg-emerald-950/20 border-emerald-900/30' : 'bg-ink-900/40 border-ink-800/30'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-ink-300">{client?.name}</span>
                      <div className="flex items-center gap-1.5">
                        {r.type === 'sms' ? <Smartphone className="w-3 h-3 text-ink-500" /> : <Mail className="w-3 h-3 text-ink-500" />}
                        <span className="text-[10px] text-ink-500">{r.scheduled}</span>
                        {r.sent && <span className="text-[10px] text-emerald-400 font-medium">Sent</span>}
                      </div>
                    </div>
                    <p className="text-xs text-ink-500">{r.message}</p>
                    {!r.sent && <button onClick={() => onSendReminder(r.id)} className="mt-2 w-full py-1.5 rounded-lg bg-brand-950/30 border border-brand-800/30 text-brand-400 text-xs font-medium active:bg-brand-900/50 transition">Send Now</button>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'blast' && (
        <div className="space-y-4">
          {sentConfirm && (
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/40 text-emerald-400 text-sm text-center flex items-center justify-center gap-2">
              <Check className="w-4 h-4" /> Blast sent successfully!
            </div>
          )}

          <div className="bg-ink-900/40 border border-ink-800/30 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-ink-300 uppercase tracking-wider mb-3">1. Select Recipients</h3>
            <div className="flex gap-2 mb-3">
              <button onClick={() => setSelectedClients(clients.map(c => c.id))} className="text-xs bg-ink-800 text-ink-400 px-3 py-1.5 rounded-lg">Select All</button>
              <button onClick={() => setSelectedClients(haventBeen.map(c => c.id))} className="text-xs bg-amber-950/30 text-amber-400 border border-amber-900/30 px-3 py-1.5 rounded-lg">Win-Back Only</button>
              <button onClick={() => setSelectedClients([])} className="text-xs bg-ink-800 text-ink-400 px-3 py-1.5 rounded-lg">Clear</button>
            </div>
            <div className="max-h-48 overflow-y-auto no-scrollbar space-y-1">
              {clients.map(c => (
                <button key={c.id} onClick={() => toggleClient(c.id)} className={`w-full flex items-center gap-3 p-2 rounded-xl transition ${selectedClients.includes(c.id) ? 'bg-brand-950/30 border border-brand-800/30' : 'bg-ink-900/20 border border-transparent'}`}>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${selectedClients.includes(c.id) ? 'bg-brand-500 border-brand-500' : 'border-ink-600'}`}>
                    {selectedClients.includes(c.id) && <Check className="w-3 h-3 text-ink-950" />}
                  </div>
                  <img src={c.photo} alt="" className="w-8 h-8 rounded-lg object-cover" />
                  <div className="text-left flex-1"><p className="text-sm text-ink-200">{c.name}</p></div>
                </button>
              ))}
            </div>
            <p className="text-xs text-ink-500 mt-2">{selectedClients.length} selected</p>
          </div>

          <div className="bg-ink-900/40 border border-ink-800/30 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-ink-300 uppercase tracking-wider mb-3">2. Message</h3>
            <div className="flex gap-2 mb-3">
              <button onClick={() => setMsgType('sms')} className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${msgType === 'sms' ? 'bg-brand-600 text-ink-950' : 'bg-ink-800 text-ink-400'}`}><Smartphone className="w-3.5 h-3.5" />SMS</button>
              <button onClick={() => setMsgType('email')} className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${msgType === 'email' ? 'bg-brand-600 text-ink-950' : 'bg-ink-800 text-ink-400'}`}><Mail className="w-3.5 h-3.5" />Email</button>
            </div>
            <textarea value={customMsg} onChange={e => setCustomMsg(e.target.value)} placeholder={`Write your ${msgType} blast...`} rows={4} className="w-full bg-ink-800 border border-ink-700 rounded-xl px-3 py-2.5 text-sm text-ink-200 placeholder-ink-600 focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-none" />
          </div>

          <button onClick={sendBulk} disabled={!selectedClients.length || !customMsg.trim()} className={`w-full flex items-center justify-center gap-2 font-bold py-4 rounded-2xl shadow-lift transition-all active:scale-[0.98] ${selectedClients.length && customMsg.trim() ? 'bg-brand-600 hover:bg-brand-500 text-ink-950' : 'bg-ink-800 text-ink-600 cursor-not-allowed'}`}>
            <Send className="w-5 h-5" />Send to {selectedClients.length} {msgType === 'sms' ? 'phones' : 'emails'}
          </button>
        </div>
      )}
    </div>
  )
}
