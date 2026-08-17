import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

const STAFF_USERS = [
  { id: 's1', email: 'owner@sassyspa.com', password: 'owner2026', name: 'Owner', role: 'owner' },
  { id: 's2', email: 'stylist@sassyspa.com', password: 'style2026', name: 'Lead Stylist', role: 'stylist' },
  { id: 's3', email: 'barber@sassyspa.com', password: 'barber2026', name: 'Master Barber', role: 'barber' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sassyspa_user')) } catch { return null }
  })

  const login = useCallback((email, password) => {
    const found = STAFF_USERS.find(u => u.email === email && u.password === password)
    if (found) {
      const { password: _, ...safeUser } = found
      setUser(safeUser)
      localStorage.setItem('sassyspa_user', JSON.stringify(safeUser))
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials. Staff only.' }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('sassyspa_user')
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
