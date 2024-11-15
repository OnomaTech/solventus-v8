import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// HOC to protect admin routes
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login')
      }
    }, [isAuthenticated, router])

    if (!isAuthenticated) {
      return null // or a loading spinner
    }

    return <Component {...props} />
  }
}
