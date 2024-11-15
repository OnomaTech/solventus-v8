import { createContext, useContext, useEffect, useState } from 'react'
import { User, AuthError } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  isClient: boolean
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check if user has client role
  const checkClientRole = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error checking client role:', error)
        return false
      }

      return profile?.role === 'client'
    } catch (error) {
      console.error('Error checking client role:', error)
      return false
    }
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const currentUser = session?.user ?? null
      
      if (currentUser) {
        const hasClientRole = await checkClientRole(currentUser.id)
        if (hasClientRole) {
          setUser(currentUser)
          setIsClient(true)
        } else {
          // If not client, sign out
          await supabase.auth.signOut()
          setUser(null)
          setIsClient(false)
        }
      } else {
        setUser(null)
        setIsClient(false)
      }

      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null
      
      if (currentUser) {
        const hasClientRole = await checkClientRole(currentUser.id)
        if (hasClientRole) {
          setUser(currentUser)
          setIsClient(true)
          
          if (event === 'SIGNED_IN' && router.pathname === '/login') {
            router.replace('/dashboard')
          }
        } else {
          // If not client, sign out
          await supabase.auth.signOut()
          setUser(null)
          setIsClient(false)
          if (router.pathname !== '/login') {
            router.replace('/login?error=This login is for clients only. Administrators should use the admin login page.')
          }
        }
      } else {
        setUser(null)
        setIsClient(false)
        if (event === 'SIGNED_OUT' && router.pathname !== '/login') {
          router.replace('/login')
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) return { error }

      if (data.user) {
        const hasClientRole = await checkClientRole(data.user.id)
        if (!hasClientRole) {
          await supabase.auth.signOut()
          return { 
            error: {
              name: 'AuthError',
              message: 'This login is for clients only. Administrators should use the admin login page.',
              status: 403
            } as AuthError 
          }
        }
      }

      return { error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { error: error as AuthError }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      setIsClient(false)
      if (router.pathname !== '/login') {
        router.replace('/login')
      }
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    isClient,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
