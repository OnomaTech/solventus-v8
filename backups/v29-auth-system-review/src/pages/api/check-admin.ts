import { createClient } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY')
}

// Initialize Supabase admin client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Check auth.users table
    const { data: users, error: userError } = await supabase
      .from('auth.users')
      .select('id, email')
      .eq('email', 'admin@solventus.com')
      .single()

    if (userError) {
      return res.status(500).json({ 
        error: 'Error checking auth.users',
        details: userError.message
      })
    }

    if (!users) {
      return res.status(404).json({ 
        error: 'Admin user not found in auth.users'
      })
    }

    // Check profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, role')
      .eq('id', users.id)
      .single()

    if (profileError) {
      return res.status(500).json({ 
        error: 'Error checking profiles',
        details: profileError.message
      })
    }

    if (!profile) {
      return res.status(404).json({ 
        error: 'Admin profile not found',
        user: users
      })
    }

    // Return the complete status
    res.status(200).json({
      user: users,
      profile: profile,
      status: {
        hasUser: true,
        hasProfile: true,
        isAdmin: profile.role === 'admin'
      }
    })

  } catch (error: any) {
    console.error('Error in check-admin handler:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    })
  }
}
