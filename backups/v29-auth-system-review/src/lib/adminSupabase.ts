import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Create a separate supabase client for admin interactions
export const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      autoRefreshToken: true,
      storage: {
        getItem: (key) => {
          if (typeof window === 'undefined') return null
          // Use a different cookie prefix for admin sessions
          const adminKey = `admin_${key}`
          const value = document.cookie.match('(^|;)\\s*' + adminKey + '\\s*=\\s*([^;]+)')
          return value ? decodeURIComponent(value.pop() || '') : null
        },
        setItem: (key, value) => {
          if (typeof window === 'undefined') return
          // Use a different cookie prefix for admin sessions
          const adminKey = `admin_${key}`
          // Set secure cookie with strict SameSite policy for admin
          document.cookie = `${adminKey}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Strict; Secure`
        },
        removeItem: (key) => {
          if (typeof window === 'undefined') return
          // Use a different cookie prefix for admin sessions
          const adminKey = `admin_${key}`
          document.cookie = `${adminKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure`
        }
      }
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
    
    // Clear all admin-related cookies
    const cookies = document.cookie.split(';')
    for (let cookie of cookies) {
      const [name] = cookie.split('=')
      if (name.trim().startsWith('admin_')) {
        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure`
      }
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
