import { useState } from 'react'
import { Gift, Star, Crown, ChevronRight, TrendingUp, Award, Sparkles } from 'lucide-react'
import { BILT_REWARDS } from '@/data/clients'
import { formatCurrency } from '@/lib/utils'

export default function BiltRewards({ clients }) {
  const [activeTab, setActiveTab] = useState('tiers')

  const totalMembers = clients.filter(c => c.biltTier).length
  const totalPoints = clients.reduce((sum, c) => sum + (c.biltPoints || 0), 0)
  const avgPoints = totalMembers ? Math.round(totalPoints / totalMembers) : 0
  const topEarner = [...clients].sort((a, b) => (b.biltPoints || 0) - (a.biltPoints || 0))[0]

  const tierColors = {
    Blue: 'from-blue-600 to-blue-800',
    Silver: 'from-slate-400 to-slate-600',
    Gold: 'from-amber-500 to-amber-700',
    Platinum: 'from-purple-500 to-purple-800',
  }

  return (
    <div className="p-4 space-y-5 pb-8">
      <div>
        <div className="text-[11px] text-brand-400 uppercase tracking-[0.2em] font-semibold mb-1">Loyalty Program</div>
        <h2 className="text-2xl font-display font-bold text-ink-100">Bilt Rewards</h2>
        <p className="text-xs text-ink-500 mt-1">Earn on every visit. Redeem for luxury.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-brand-950/30 border border-brand-800/30 rounded-2xl p-3 text-center">
          <div className="w-8 h-8 rounded-lg bg-brand-950/30 border border-brand-800/20 flex items-center justify-center mx-auto mb-2"><UsersIcon /></div>
          <p className="text-xl font-bold text-ink-100">{totalMembers}</p>
          <p className="text-[10px] text-ink-500 uppercase tracking-wider">Members</p>
        </div>
        <div className="bg-purple-950/30 border border-purple-800/30 rounded-2xl p-3 text-center">
          <div className="w-8 h-8 rounded-lg bg-purple-950/30 border border-purple-800/20 flex items-center justify-center mx-auto mb-2"><Star className="w-4 h-4 text-purple-400" /></div>
          <p className="text-xl font-bold text-ink-100">{totalPoints.toLocaleString()}</p>
          <p className="text-[10px] text-ink-500 uppercase tracking-wider">Total Points</p>
        </div>
        <div className="bg-amber-950/30 border border-amber-800/30 rounded-2xl p-3 text-center">
          <div className="w-8 h-8 rounded-lg bg-amber-950/30 border border-amber-800/20 flex items-center justify-center mx-auto mb-2"><TrendingUp className="w-4 h-4 text-amber-400" /></div>
          <p className="text-xl font-bold text-ink-100">{avgPoints.toLocaleString()}</p>
          <p className="text-[10px] text-ink-500 uppercase tracking-wider">Avg / Client</p>
        </div>
      </div>

      {topEarner && (
        <div className="bg-gradient-to-br from-purple-950/40 to-brand-950/30 border border-purple-800/30 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2"><Crown className="w-4 h-4 text-purple-400" /><span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Top Earner</span></div>
          <div className="flex items-center gap-3">
            <img src={topEarner.photo} alt="" className="w-14 h-14 rounded-xl object-cover border border-purple-800/30" />
            <div className="flex-1">
              <p className="text-lg font-bold text-ink-100">{topEarner.name}</p>
              <p className="text-xs text-ink-500">{topEarner.biltTier} Member since {topEarner.biltMemberSince}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-400">{topEarner.biltPoints?.toLocaleString()}</p>
              <p className="text-[10px] text-ink-500">points</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-1 p-1 bg-ink-900/50 rounded-xl border border-ink-800/30">
        {[{id:'tiers',label:'Tiers',icon:Award},{id:'redemptions',label:'Redeem',icon:Gift}].map(tab => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${activeTab===tab.id?'bg-brand-600 text-ink-950':'text-ink-500 hover:text-ink-300'}`}>
              <Icon className="w-3.5 h-3.5" />{tab.label}
            </button>
          )
        })}
      </div>

      {activeTab === 'tiers' && (
        <div className="space-y-3">
          {BILT_REWARDS.tiers.map((tier, idx) => (
            <div key={tier.name} className={`rounded-2xl p-4 border ${tier.name === 'Platinum' ? 'bg-gradient-to-br from-purple-950/40 to-ink-900/60 border-purple-800/30' : tier.name === 'Gold' ? 'bg-gradient-to-br from-amber-950/30 to-ink-900/60 border-amber-800/30' : 'bg-ink-900/40 border-ink-800/30'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tierColors[tier.name]} flex items-center justify-center`}>
                    {tier.name === 'Platinum' ? <Crown className="w-4 h-4 text-white" /> : tier.name === 'Gold' ? <Star className="w-4 h-4 text-white" /> : <Sparkles className="w-4 h-4 text-white" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink-100">{tier.name}</h3>
                    <p className="text-[10px] text-ink-500">{tier.multiplier}x points per $1</p>
                  </div>
                </div>
                <span className="text-xs text-ink-500">{tier.minSpend.toLocaleString()}+ pts</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tier.perks.map((perk, i) => (
                  <span key={i} className="text-[10px] bg-ink-950/50 text-ink-400 px-2 py-1 rounded-md border border-ink-800/30">{perk}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'redemptions' && (
        <div className="space-y-3">
          {BILT_REWARDS.redemptions.map(r => (
            <div key={r.points} className="flex items-center gap-3 p-4 rounded-2xl bg-ink-900/40 border border-ink-800/30">
              <div className="w-12 h-12 rounded-xl bg-brand-950/30 border border-brand-800/20 flex items-center justify-center flex-shrink-0">
                <Gift className="w-6 h-6 text-brand-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink-200">{r.reward}</p>
                <p className="text-xs text-ink-500">{r.points.toLocaleString()} Bilt Points</p>
              </div>
              <ChevronRight className="w-4 h-4 text-ink-600" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function UsersIcon() {
  return (
    <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  )
}
