import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

interface AuthContextType {
  isAuthenticated: boolean
  user: any | null
  login: (token: string, userData: any) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {}
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)

  // Check for existing auth on mount
  useEffect(() => {
    const token = document.cookie.includes('auth-token')
    if (token) {
      // In production, validate the token and fetch user data
      setIsAuthenticated(true)
      setUser({
        email: 'admin@solventus.com',
        role: 'admin'
      })
    }
  }, [])

  const login = (token: string, userData: any) => {
    // Set cookie
    document.cookie = `auth-token=${token}; path=/`
    setIsAuthenticated(true)
    setUser(userData)
  }

  const logout = () => {
    // Remove cookie
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    setIsAuthenticated(false)
    setUser(null)
    router.push('/admin/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
