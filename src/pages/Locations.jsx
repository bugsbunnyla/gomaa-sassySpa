import { useState, useEffect } from 'react'
import { MapPin, Star, Phone, Clock, Navigation, ExternalLink, Flag, ChevronDown } from 'lucide-react'

export default function Locations({ locations }) {
  const [userLoc, setUserLoc] = useState(null)
  const [nearest, setNearest] = useState(null)
  const [selectedLoc, setSelectedLoc] = useState(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          setUserLoc({ lat: latitude, lng: longitude })
          // Find nearest
          let minDist = Infinity, near = null
          locations.forEach(loc => {
            const d = Math.sqrt(Math.pow(loc.lat - latitude, 2) + Math.pow(loc.lng - longitude, 2))
            if (d < minDist) { minDist = d; near = loc }
          })
          setNearest(near)
        },
        () => {}
      )
    }
  }, [locations])

  const openMaps = (loc) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`
    window.open(url, '_blank')
  }

  return (
    <div className="p-4 space-y-5 pb-8">
      <div>
        <div className="text-[11px] text-brand-400 uppercase tracking-[0.2em] font-semibold mb-1">Global Locations</div>
        <h2 className="text-2xl font-display font-bold text-ink-100">Find Your Spa</h2>
        <p className="text-xs text-ink-500 mt-1">8 flagship locations across 4 continents.</p>
      </div>

      {nearest && (
        <div className="bg-gradient-to-br from-brand-950/40 to-emerald-950/20 border border-brand-800/30 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Navigation className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">Nearest to You</span>
          </div>
          <div className="flex items-start gap-3">
            <img src={nearest.image} alt="" className="w-20 h-20 rounded-xl object-cover border border-ink-800" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-ink-100">{nearest.name}</h3>
              <p className="text-xs text-ink-500 mt-0.5">{nearest.address}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex items-center gap-0.5"><Star className="w-3 h-3 text-brand-400 fill-brand-400" /><span className="text-xs text-ink-300">{nearest.rating}</span></div>
                <span className="text-[10px] text-ink-600">({nearest.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <button onClick={() => openMaps(nearest)} className="mt-3 w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-ink-950 text-sm font-bold active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <Navigation className="w-4 h-4" />Get Directions
          </button>
        </div>
      )}

      <div className="space-y-3">
        {locations.map(loc => (
          <div key={loc.id} className={`bg-ink-900/40 border rounded-2xl overflow-hidden transition-all ${selectedLoc === loc.id ? 'border-brand-800/50' : 'border-ink-800/30'}`}>
            <button onClick={() => setSelectedLoc(selectedLoc === loc.id ? null : loc.id)} className="w-full p-4 flex items-start gap-3 text-left">
              <img src={loc.image} alt="" className="w-16 h-16 rounded-xl object-cover border border-ink-800 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-ink-200 truncate">{loc.name}</h3>
                  {loc.flagship && <span className="text-[10px] bg-brand-950/50 text-brand-400 px-1.5 py-0.5 rounded-full border border-brand-800/30 flex-shrink-0">Flagship</span>}
                </div>
                <p className="text-xs text-ink-500 mt-0.5 truncate">{loc.address}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-0.5"><Star className="w-3 h-3 text-brand-400 fill-brand-400" /><span className="text-xs text-ink-300">{loc.rating}</span></div>
                  <span className="text-[10px] text-ink-600 flex items-center gap-1"><Clock className="w-3 h-3" />{loc.hours}</span>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-ink-600 flex-shrink-0 transition-transform ${selectedLoc === loc.id ? 'rotate-180' : ''}`} />
            </button>
            {selectedLoc === loc.id && (
              <div className="px-4 pb-4 space-y-3">
                <div className="flex items-center gap-2 text-xs text-ink-500">
                  <Phone className="w-3.5 h-3.5" />{loc.phone}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openMaps(loc)} className="flex-1 py-2.5 rounded-xl bg-brand-600 text-ink-950 text-xs font-bold active:scale-[0.98] transition-all flex items-center justify-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5" />Directions
                  </button>
                  <button onClick={() => window.open(`tel:${loc.phone.replace(/\D/g,'')}`, '_self')} className="flex-1 py-2.5 rounded-xl bg-ink-800 text-ink-300 text-xs font-bold active:bg-ink-700 transition-all flex items-center justify-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />Call
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
