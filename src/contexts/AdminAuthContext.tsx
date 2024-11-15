import { createContext, useContext, useEffect, useState } from 'react'
import { User, AuthError } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import { adminSupabase } from '../lib/adminSupabase'

interface AdminAuthContextType {
  user: User | null
  loading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check if user has admin role
  const checkAdminRole = async (userId: string) => {
    try {
      const { data: profile, error } = await adminSupabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error checking admin role:', error)
        return false
      }

      return profile?.role === 'admin'
    } catch (error) {
      console.error('Error checking admin role:', error)
      return false
    }
  }

  useEffect(() => {
    // Get initial session
    adminSupabase.auth.getSession().then(async ({ data: { session } }) => {
      const currentUser = session?.user ?? null
      
      if (currentUser) {
        const isUserAdmin = await checkAdminRole(currentUser.id)
        if (isUserAdmin) {
          setUser(currentUser)
          setIsAdmin(true)
        } else {
          // If not admin, sign out
          await adminSupabase.auth.signOut()
          setUser(null)
          setIsAdmin(false)
        }
      } else {
        setUser(null)
        setIsAdmin(false)
      }

      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = adminSupabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null
      
      if (currentUser) {
        const isUserAdmin = await checkAdminRole(currentUser.id)
        if (isUserAdmin) {
          setUser(currentUser)
          setIsAdmin(true)
          
          if (event === 'SIGNED_IN' && router.pathname === '/admin/login') {
            router.replace('/admin')
          }
        } else {
          // If not admin, sign out
          await adminSupabase.auth.signOut()
          setUser(null)
          setIsAdmin(false)
          if (router.pathname !== '/admin/login') {
            router.replace('/admin/login?error=Admin access required')
          }
        }
      } else {
        setUser(null)
        setIsAdmin(false)
        if (event === 'SIGNED_OUT' && router.pathname !== '/admin/login') {
          router.replace('/admin/login')
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await adminSupabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) return { error }

      if (data.user) {
        const isUserAdmin = await checkAdminRole(data.user.id)
        if (!isUserAdmin) {
          await adminSupabase.auth.signOut()
          return { 
            error: {
              name: 'AuthError',
              message: 'This login is for administrators only. Please use the client login page.',
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
      const { error } = await adminSupabase.auth.signOut()
      if (error) throw error
      setUser(null)
      setIsAdmin(false)
      if (router.pathname !== '/admin/login') {
        router.replace('/admin/login')
      }
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    isAdmin,
    signIn,
    signOut,
  }

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}
