import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Create a single supabase client for client users
export const supabase = createClient(
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
          // Use a different cookie prefix for client sessions
          const clientKey = `client_${key}`
          const value = document.cookie.match('(^|;)\\s*' + clientKey + '\\s*=\\s*([^;]+)')
          return value ? decodeURIComponent(value.pop() || '') : null
        },
        setItem: (key, value) => {
          if (typeof window === 'undefined') return
          // Use a different cookie prefix for client sessions
          const clientKey = `client_${key}`
          // Set secure cookie with strict SameSite policy
          document.cookie = `${clientKey}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Strict; Secure`
        },
        removeItem: (key) => {
          if (typeof window === 'undefined') return
          // Use a different cookie prefix for client sessions
          const clientKey = `client_${key}`
          document.cookie = `${clientKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure`
        }
      }
    },
    global: {
      headers: {
        'X-Client-Info': 'solventus-client'
      }
    }
  }
)

// Helper function to get the current user
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

// Helper function to check if user is authenticated
export const isAuthenticated = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    return !!session
  } catch (error) {
    console.error('Error checking authentication:', error)
    return false
  }
}

// Helper function to sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    // Clear all client-related cookies
    const cookies = document.cookie.split(';')
    for (let cookie of cookies) {
      const [name] = cookie.split('=')
      if (name.trim().startsWith('client_')) {
        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure`
      }
    }
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

// Helper function to get user role
export const getUserRole = async () => {
  try {
    const user = await getCurrentUser()
    if (!user) return null

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (error) throw error
    return profile?.role || null
  } catch (error) {
    console.error('Error getting user role:', error)
    return null
  }
}
