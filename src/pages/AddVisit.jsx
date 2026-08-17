import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Camera, User, Phone, Calendar, FileText, Check, Search, UserPlus, Star, DollarSign } from 'lucide-react'

export default function AddVisit({ clients, onAddVisit, onAddClient }) {
  const { clientId } = useParams()
  const navigate = useNavigate()
  const preselected = clientId ? clients.find(c => c.id === clientId) : null
  const [isNewClient, setIsNewClient] = useState(!preselected)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClientId, setSelectedClientId] = useState(preselected?.id || null)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [service, setService] = useState('')
  const [note, setNote] = useState('')
  const [price, setPrice] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [photoPreview, setPhotoPreview] = useState(null)
  const fileInputRef = useRef(null)

  const filteredClients = searchQuery.trim() ? clients.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())) : []
  const selectedClientObj = clients.find(c => c.id === selectedClientId)

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (file) { setPhotoPreview(URL.createObjectURL(file)) }
  }

  const handleSubmit = () => {
    let targetClientId = selectedClientId
    if (isNewClient && newName.trim() && newPhone.trim()) {
      targetClientId = onAddClient({ name: newName.trim(), phone: newPhone.trim() })
    }
    if (!targetClientId) return
    const parsedPrice = parseFloat(price) || 0
    const client = clients.find(c => c.id === targetClientId)
    const multiplier = client?.biltTier === 'Platinum' ? 2 : client?.biltTier === 'Gold' ? 1.5 : client?.biltTier === 'Silver' ? 1.25 : 1
    const biltEarned = Math.round(parsedPrice * multiplier)
    onAddVisit(targetClientId, { id: 'v' + Date.now(), date, service: service.trim() || 'Visit', note: note.trim(), photo: photoPreview, price: parsedPrice, biltEarned })
    navigate(`/client/${targetClientId}`)
  }

  const canSubmit = isNewClient ? newName.trim() && newPhone.trim() && service.trim() : selectedClientId && service.trim()

  return (
    <div className="p-4 space-y-5 pb-8">
      {!preselected && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <button onClick={() => { setIsNewClient(false); setSelectedClientId(null) }} className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${!isNewClient ? 'bg-brand-600 text-ink-950' : 'bg-ink-800 text-ink-400'}`}>Existing Client</button>
            <button onClick={() => { setIsNewClient(true); setSelectedClientId(null) }} className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${isNewClient ? 'bg-brand-600 text-ink-950' : 'bg-ink-800 text-ink-400'}`}>New Client</button>
          </div>
          {isNewClient ? (
            <div className="bg-ink-900/40 border border-ink-800/30 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1"><UserPlus className="w-4 h-4 text-brand-400" /><h3 className="text-sm font-bold text-ink-300 uppercase tracking-wider">New Client</h3></div>
              <div><label className="text-xs text-ink-500 uppercase tracking-wider">Name</label><input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Full name" className="w-full mt-1 bg-ink-800 border border-ink-700 rounded-xl px-4 py-3 text-sm text-ink-100 placeholder-ink-600 focus:outline-none focus:ring-2 focus:ring-brand-500/30" /></div>
              <div><label className="text-xs text-ink-500 uppercase tracking-wider">Phone</label><input type="tel" value={newPhone} onChange={e => setNewPhone(e.target.value)} placeholder="(555) 555-5555" className="w-full mt-1 bg-ink-800 border border-ink-700 rounded-xl px-4 py-3 text-sm text-ink-100 placeholder-ink-600 focus:outline-none focus:ring-2 focus:ring-brand-500/30" /></div>
            </div>
          ) : (
            <div className="space-y-2">
              {!selectedClientId ? (
                <>
                  <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" /><input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search client name..." className="w-full bg-ink-800 border border-ink-700 rounded-xl pl-10 pr-4 py-3 text-sm text-ink-100 placeholder-ink-600 focus:outline-none focus:ring-2 focus:ring-brand-500/30" /></div>
                  {filteredClients.length > 0 && (
                    <div className="space-y-1">
                      {filteredClients.map(c => (
                        <button key={c.id} onClick={() => { setSelectedClientId(c.id); setSearchQuery('') }} className="w-full flex items-center gap-3 p-3 rounded-xl bg-ink-900/40 border border-ink-800/30 active:bg-ink-800 transition-colors">
                          <img src={c.photo} alt="" className="w-10 h-10 rounded-lg object-cover" /><div className="text-left"><p className="text-sm font-medium text-ink-200">{c.name}</p><p className="text-xs text-ink-500">{c.phone}</p></div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-brand-950/30 border border-brand-800/30">
                  <img src={selectedClientObj?.photo} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1"><p className="text-sm font-medium text-ink-200">{selectedClientObj?.name}</p><p className="text-xs text-ink-500">{selectedClientObj?.phone}</p></div>
                  <button onClick={() => setSelectedClientId(null)} className="text-xs text-brand-400 font-medium px-2 py-1 rounded-lg bg-brand-900/20">Change</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {preselected && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-brand-950/30 border border-brand-800/30">
          <img src={preselected.photo} alt="" className="w-12 h-12 rounded-xl object-cover" />
          <div><p className="text-sm font-medium text-ink-200">{preselected.name}</p><p className="text-xs text-ink-500">{preselected.phone}</p></div>
        </div>
      )}

      <div className="bg-ink-900/40 border border-ink-800/30 rounded-2xl p-4 space-y-4">
        <div className="flex items-center gap-2 mb-1"><Camera className="w-4 h-4 text-brand-400" /><h3 className="text-sm font-bold text-ink-300 uppercase tracking-wider">Visit Details</h3></div>
        <div>
          <label className="text-xs text-ink-500 uppercase tracking-wider">Photo</label>
          <div className="mt-1">
            {photoPreview ? (
              <div className="relative"><img src={photoPreview} alt="Preview" className="w-full h-48 object-cover rounded-xl border border-ink-800" /><button onClick={() => setPhotoPreview(null)} className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-ink-950/70 backdrop-blur flex items-center justify-center"><span className="text-white text-xs">✕</span></button></div>
            ) : (
              <button onClick={() => fileInputRef.current?.click()} className="w-full h-32 rounded-xl border-2 border-dashed border-ink-700 flex flex-col items-center justify-center gap-2 active:bg-ink-800/50 transition-colors"><Camera className="w-8 h-8 text-ink-600" /><span className="text-sm text-ink-500">Tap to add photo</span></button>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handlePhotoChange} className="hidden" />
          </div>
        </div>
        <div><label className="text-xs text-ink-500 uppercase tracking-wider">Service *</label><input type="text" value={service} onChange={e => setService(e.target.value)} placeholder="e.g. Full cut + beard trim" className="w-full mt-1 bg-ink-800 border border-ink-700 rounded-xl px-4 py-3 text-sm text-ink-100 placeholder-ink-600 focus:outline-none focus:ring-2 focus:ring-brand-500/30" /></div>
        <div><label className="text-xs text-ink-500 uppercase tracking-wider">Price</label><div className="relative mt-1"><DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" /><input type="number" inputMode="decimal" value={price} onChange={e => setPrice(e.target.value)} placeholder="0" className="w-full bg-ink-800 border border-ink-700 rounded-xl pl-10 pr-4 py-3 text-sm text-ink-100 placeholder-ink-600 focus:outline-none focus:ring-2 focus:ring-brand-500/30" /></div></div>
        <div><label className="text-xs text-ink-500 uppercase tracking-wider">Date</label><div className="relative mt-1"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" /><input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-ink-800 border border-ink-700 rounded-xl pl-10 pr-4 py-3 text-sm text-ink-100 focus:outline-none focus:ring-2 focus:ring-brand-500/30" /></div></div>
        <div><label className="text-xs text-ink-500 uppercase tracking-wider">Note <span className="text-ink-600">(optional)</span></label><div className="relative mt-1"><FileText className="absolute left-3 top-3 w-4 h-4 text-ink-500" /><textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Anything special..." rows={3} className="w-full bg-ink-800 border border-ink-700 rounded-xl pl-10 pr-4 py-3 text-sm text-ink-100 placeholder-ink-600 focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-none" /></div></div>
      </div>

      <button onClick={handleSubmit} disabled={!canSubmit} className={`w-full flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-2xl shadow-lift transition-all active:scale-[0.98] ${canSubmit ? 'bg-brand-600 hover:bg-brand-500 text-ink-950' : 'bg-ink-800 text-ink-600 cursor-not-allowed'}`}>
        <Check className="w-5 h-5" /><span>Save Visit</span>
      </button>
    </div>
  )
}
