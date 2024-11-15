import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Create a custom storage object that works in both client and server environments
const customStorage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key)
    }
    return null
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value)
    }
  },
  removeItem: (key: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key)
    }
  }
}

// Create a separate supabase client for admin interactions
export const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      detectSessionInUrl: true,
      autoRefreshToken: true,
      storageKey: 'admin-auth-storage',
      storage: customStorage
    },
    global: {
      headers: {
        'X-Client-Info': 'solventus-admin'
      }
    }
  }
)

// Helper function to get the current admin user
export const getCurrentAdminUser = async () => {
  try {
    const { data: { user }, error } = await adminSupabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    console.error('Error getting current admin user:', error)
    return null
  }
}

// Helper function to check if user is authenticated as admin
export const isAdminAuthenticated = async () => {
  try {
    const { data: { session } } = await adminSupabase.auth.getSession()
    if (!session) return false

    // Check if user has admin role
    const { data: profile, error } = await adminSupabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (error) throw error
    return profile?.role === 'admin'
  } catch (error) {
    console.error('Error checking admin authentication:', error)
    return false
  }
}

// Helper function to sign out admin
export const signOutAdmin = async () => {
  try {
    const { error } = await adminSupabase.auth.signOut()
    if (error) throw error
    
    // Clear local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin-auth-storage')
    }
  } catch (error) {
    console.error('Error signing out admin:', error)
    throw error
  }
}

// Helper function to get admin role
export const getAdminRole = async () => {
  try {
    const user = await getCurrentAdminUser()
    if (!user) return null

    const { data: profile, error } = await adminSupabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (error) throw error
    return profile?.role || null
  } catch (error) {
    console.error('Error getting admin role:', error)
    return null
  }
}

// Helper function to check if a user exists
export const checkUserExists = async (email: string) => {
  try {
    const { data, error } = await adminSupabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return !!data
  } catch (error) {
    console.error('Error checking if user exists:', error)
    return false
  }
}
