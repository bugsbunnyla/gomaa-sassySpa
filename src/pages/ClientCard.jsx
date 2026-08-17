import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Camera, Plus, Calendar, ChevronLeft, ChevronRight, Edit3, Check, X, Scissors, Gift, Star, Phone, Mail } from 'lucide-react'
import { getLastVisit, formatPhone } from '@/lib/utils'
import { BILT_REWARDS } from '@/data/clients'

export default function ClientCard({ clients, onUpdateClient }) {
  const { clientId } = useParams()
  const navigate = useNavigate()
  const client = clients.find(c => c.id === clientId)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [editingNotes, setEditingNotes] = useState(false)
  const [editingFormula, setEditingFormula] = useState(false)
  const [tempNotes, setTempNotes] = useState('')
  const [tempFormula, setTempFormula] = useState({})

  if (!client) return <div className="p-8 text-center text-ink-500">Client not found</div>

  const allPhotos = client.visits.filter(v => v.photo).map(v => ({ photo: v.photo, date: v.date, service: v.service }))
  const currentPhoto = allPhotos[galleryIndex] || null
  const lastVisit = getLastVisit(client)

  const tierInfo = BILT_REWARDS.tiers.find(t => t.name === client.biltTier) || BILT_REWARDS.tiers[0]
  const nextTier = BILT_REWARDS.tiers[BILT_REWARDS.tiers.findIndex(t => t.name === client.biltTier) + 1]

  const handleSaveNotes = () => {
    onUpdateClient(client.id, { notes: tempNotes.split('\n').filter(n => n.trim()) })
    setEditingNotes(false)
  }
  const handleSaveFormula = () => {
    onUpdateClient(client.id, { formula: tempFormula })
    setEditingFormula(false)
  }

  return (
    <div className="space-y-5 pb-6">
      {/* Gallery */}
      <div className="relative bg-ink-900">
        {currentPhoto ? (
          <>
            <img src={currentPhoto.photo} alt="" className="w-full h-72 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink-950/90 to-transparent p-4">
              <p className="text-xs text-ink-400">{currentPhoto.date} · {currentPhoto.service}</p>
            </div>
            {allPhotos.length > 1 && (
              <>
                <button onClick={() => setGalleryIndex(i => Math.max(0, i-1))} disabled={galleryIndex===0} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink-950/70 backdrop-blur flex items-center justify-center disabled:opacity-30"><ChevronLeft className="w-5 h-5 text-white" /></button>
                <button onClick={() => setGalleryIndex(i => Math.min(allPhotos.length-1, i+1))} disabled={galleryIndex===allPhotos.length-1} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink-950/70 backdrop-blur flex items-center justify-center disabled:opacity-30"><ChevronRight className="w-5 h-5 text-white" /></button>
                <div className="absolute top-3 right-3 bg-ink-950/70 backdrop-blur px-2 py-1 rounded-lg"><p className="text-xs text-ink-300">{galleryIndex+1} / {allPhotos.length}</p></div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-72 bg-ink-900 flex flex-col items-center justify-center gap-3"><Camera className="w-12 h-12 text-ink-700" /><p className="text-sm text-ink-600">No photos yet</p></div>
        )}
      </div>

      <div className="px-4 space-y-5">
        {/* Name & Contact */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-ink-100">{client.name}</h2>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-xs text-ink-500 flex items-center gap-1"><Phone className="w-3 h-3" /> {formatPhone(client.phone)}</p>
              {client.email && <p className="text-xs text-ink-500 flex items-center gap-1"><Mail className="w-3 h-3" /> {client.email}</p>}
            </div>
          </div>
          {lastVisit && <div className="text-right"><p className="text-xs text-ink-500">Last visit</p><p className="text-sm font-medium text-ink-300">{lastVisit.date}</p></div>}
        </div>

        {/* Bilt Rewards Card */}
        <div className="bg-gradient-to-br from-brand-900/40 to-purple-950/30 border border-brand-800/30 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-brand-400" />
              <h3 className="text-sm font-bold text-brand-300 uppercase tracking-wider">Bilt Rewards</h3>
            </div>
            <span className={"text-[10px] font-bold px-2 py-0.5 rounded-full " + (client.biltTier==='Platinum'?'bg-purple-950/50 text-purple-400':client.biltTier==='Gold'?'bg-amber-950/50 text-amber-400':'bg-blue-950/50 text-blue-400')}>
              {client.biltTier || 'Blue'}
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-ink-100">{client.biltPoints?.toLocaleString()}</p>
              <p className="text-xs text-ink-500">Bilt Points</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-brand-400 font-medium">{tierInfo.multiplier}x per $1</p>
              {nextTier && <p className="text-[10px] text-ink-600">{nextTier.minSpend - (client.biltPoints || 0)} pts to {nextTier.name}</p>}
            </div>
          </div>
          {nextTier && (
            <div className="mt-3 w-full h-2 bg-ink-800 rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 rounded-full transition-all" style={{ width: `${Math.min(100, ((client.biltPoints || 0) / nextTier.minSpend) * 100)}%` }} />
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-1">
            {tierInfo.perks.map((perk, i) => (
              <span key={i} className="text-[10px] bg-ink-900/50 text-ink-400 px-2 py-0.5 rounded-md border border-ink-800/30">{perk}</span>
            ))}
          </div>
        </div>

        {/* The Formula */}
        <div className="bg-brand-950/40 border border-brand-800/30 rounded-2xl p-4 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2"><Scissors className="w-4 h-4 text-brand-400" /><h3 className="text-sm font-bold text-brand-300 uppercase tracking-wider">The Formula</h3></div>
            <button onClick={() => { if (editingFormula) { handleSaveFormula() } else { setTempFormula(client.formula || {}); setEditingFormula(true) } }} className="w-8 h-8 rounded-lg bg-brand-900/30 flex items-center justify-center">
              {editingFormula ? <Check className="w-4 h-4 text-brand-400" /> : <Edit3 className="w-3.5 h-3.5 text-brand-500" />}
            </button>
          </div>
          {editingFormula ? (
            <div className="space-y-3">
              {[{key:'guards',label:'Clipper Guards'},{key:'fadeStyle',label:'Fade Style'},{key:'lineup',label:'Line-up Notes'},{key:'beard',label:'Beard Notes'}].map(({key,label}) => (
                <div key={key}><label className="text-xs text-brand-500/70 uppercase tracking-wider">{label}</label>
                  <input type="text" value={tempFormula[key]||''} onChange={e => setTempFormula(p => ({...p,[key]:e.target.value}))} className="w-full mt-1 bg-ink-900/50 border border-brand-800/30 rounded-lg px-3 py-2 text-sm text-ink-200 focus:outline-none focus:ring-1 focus:ring-brand-500/50" />
                </div>
              ))}
              <button onClick={() => setEditingFormula(false)} className="text-xs text-ink-500 flex items-center gap-1"><X className="w-3 h-3" /> Cancel</button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {client.formula?.guards && <div><p className="text-[10px] text-brand-500/70 uppercase tracking-wider">Clipper Guards</p><p className="text-sm text-ink-200 font-medium">{client.formula.guards}</p></div>}
              {client.formula?.fadeStyle && <div><p className="text-[10px] text-brand-500/70 uppercase tracking-wider">Fade Style</p><p className="text-sm text-ink-200 font-medium">{client.formula.fadeStyle}</p></div>}
              {client.formula?.lineup && <div><p className="text-[10px] text-brand-500/70 uppercase tracking-wider">Line-up Notes</p><p className="text-sm text-ink-200 font-medium">{client.formula.lineup}</p></div>}
              {client.formula?.beard && <div><p className="text-[10px] text-brand-500/70 uppercase tracking-wider">Beard Notes</p><p className="text-sm text-ink-200 font-medium">{client.formula.beard}</p></div>}
              {!client.formula?.guards && !client.formula?.fadeStyle && !client.formula?.lineup && !client.formula?.beard && <p className="text-sm text-ink-600 italic">No formula saved yet. Tap edit to add details.</p>}
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="bg-ink-900/40 border border-ink-800/30 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-ink-300 uppercase tracking-wider">Notes</h3>
            <button onClick={() => { if (editingNotes) { handleSaveNotes() } else { setTempNotes(client.notes?.join('\n')||''); setEditingNotes(true) } }} className="w-8 h-8 rounded-lg bg-ink-800 flex items-center justify-center">
              {editingNotes ? <Check className="w-4 h-4 text-brand-400" /> : <Edit3 className="w-3.5 h-3.5 text-ink-500" />}
            </button>
          </div>
          {editingNotes ? (
            <div className="space-y-2">
              <textarea value={tempNotes} onChange={e => setTempNotes(e.target.value)} placeholder="One note per line..." rows={4} className="w-full bg-ink-800 border border-ink-700 rounded-xl px-3 py-2.5 text-sm text-ink-200 placeholder-ink-600 focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-none" />
              <button onClick={() => setEditingNotes(false)} className="text-xs text-ink-500 flex items-center gap-1"><X className="w-3 h-3" /> Cancel</button>
            </div>
          ) : (
            <div className="space-y-2">
              {client.notes?.length > 0 ? client.notes.map((note, i) => (
                <div key={i} className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 flex-shrink-0" /><p className="text-sm text-ink-300 leading-relaxed">{note}</p></div>
              )) : <p className="text-sm text-ink-600 italic">No notes yet. Tap edit to add preferences and sensitivities.</p>}
            </div>
          )}
        </div>

        {/* Visit History */}
        <div>
          <div className="flex items-center gap-2 mb-3"><Calendar className="w-4 h-4 text-ink-500" /><h3 className="text-sm font-bold text-ink-300 uppercase tracking-wider">Visit History</h3></div>
          <div className="space-y-3">
            {client.visits.map((visit, i) => (
              <div key={visit.id || i} className="flex gap-3 p-3 rounded-xl bg-ink-900/30 border border-ink-800/20">
                {visit.photo && <img src={visit.photo} alt="" className="w-16 h-16 rounded-lg object-cover border border-ink-800 flex-shrink-0" loading="lazy" />}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink-200">{visit.service}</p>
                  <p className="text-xs text-ink-500 mt-0.5">{visit.date}</p>
                  {visit.note && <p className="text-xs text-ink-600 mt-1 italic truncate">{visit.note}</p>}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-ink-500">${visit.price}</span>
                    {visit.biltEarned > 0 && <span className="text-[10px] text-brand-400 font-medium flex items-center gap-0.5"><Star className="w-3 h-3" />+{visit.biltEarned} pts</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Visit */}
        <button onClick={() => navigate(`/add-visit/${client.id}`)} className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 active:bg-brand-700 text-ink-950 font-bold py-4 px-6 rounded-2xl shadow-lift transition-all active:scale-[0.98]">
          <Plus className="w-5 h-5" /><span>Add Visit</span>
        </button>
      </div>
    </div>
  )
}
