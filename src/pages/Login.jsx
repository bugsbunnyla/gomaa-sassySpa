import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { Scissors, Lock, Mail, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const res = login(email, password)
    if (res.success) navigate('/')
    else setError(res.error)
  }

  return (
    <div className="min-h-screen bg-ink-950 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lift">
            <Scissors className="w-8 h-8 text-ink-950" />
          </div>
          <h1 className="text-3xl font-display font-bold text-brand-100">Sassy Spa</h1>
          <p className="text-sm text-ink-500 mt-1">Staff Access Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-950/30 border border-red-900/40 text-red-400 text-sm text-center">
              {error}
            </div>
          )}
          <div>
            <label className="text-xs text-ink-500 uppercase tracking-wider font-medium">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="owner@sassyspa.com"
                className="w-full bg-ink-800 border border-ink-700 rounded-xl pl-10 pr-4 py-3 text-sm text-ink-100 placeholder-ink-600 focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
            </div>
          </div>
          <div>
            <label className="text-xs text-ink-500 uppercase tracking-wider font-medium">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                className="w-full bg-ink-800 border border-ink-700 rounded-xl pl-10 pr-10 py-3 text-sm text-ink-100 placeholder-ink-600 focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2">
                {showPass ? <EyeOff className="w-4 h-4 text-ink-500" /> : <Eye className="w-4 h-4 text-ink-500" />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-brand-600 hover:bg-brand-500 active:bg-brand-700 text-ink-950 font-bold py-3.5 rounded-xl shadow-lift transition-all active:scale-[0.98]">
            Unlock Client Book
          </button>
        </form>

        <div className="mt-6 p-4 rounded-xl bg-ink-900/50 border border-ink-800/30">
          <p className="text-xs text-ink-500 text-center mb-2">Demo Credentials</p>
          <div className="space-y-1 text-xs text-ink-600 text-center">
            <p>owner@sassyspa.com / owner2026</p>
            <p>stylist@sassyspa.com / style2026</p>
            <p>barber@sassyspa.com / barber2026</p>
          </div>
        </div>
      </div>
    </div>
  )
}
