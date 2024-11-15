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

  // Check if user has access to client dashboard
  const checkClientAccess = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error checking client access:', error)
        return false
      }

      // Allow access if user is a client OR an admin
      return profile?.role === 'client' || profile?.role === 'admin'
    } catch (error) {
      console.error('Error checking client access:', error)
      return false
    }
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)

      if (currentUser) {
        const hasAccess = await checkClientAccess(currentUser.id)
        setIsClient(hasAccess)
      } else {
        setIsClient(false)
      }

      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)

      if (currentUser) {
        const hasAccess = await checkClientAccess(currentUser.id)
        setIsClient(hasAccess)

        if (event === 'SIGNED_IN') {
          if (hasAccess && router.pathname === '/login') {
            router.replace('/dashboard')
          }
        }
      } else {
        setIsClient(false)
      }

      if (event === 'SIGNED_OUT') {
        if (router.pathname !== '/login') {
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (!error) {
        // After successful sign in, check if user has access
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        if (currentUser) {
          const hasAccess = await checkClientAccess(currentUser.id)
          if (!hasAccess) {
            await signOut()
            return { error: new Error('Not authorized to access client dashboard') as AuthError }
          }
        }
      }

      return { error }
    } catch (error) {
      console.error('Sign in error:', error)
      return { error: error as AuthError }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setIsClient(false)
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
