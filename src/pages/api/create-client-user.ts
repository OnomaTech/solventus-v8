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
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Check if client user already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'client@solventus.com')
      .single()

    if (existingUser) {
      return res.status(400).json({
        error: 'Client user already exists'
      })
    }

    // Create client user
    const { data: { user }, error: userError } = await supabase.auth.admin.createUser({
      email: 'client@solventus.com',
      password: 'Client123!@#',
      email_confirm: true,
      user_metadata: {
        role: 'client'
      }
    })

    if (userError) {
      console.error('Error creating client user:', userError)
      return res.status(500).json({ 
        error: userError.message || 'Failed to create client user'
      })
    }

    if (!user) {
      return res.status(500).json({ 
        error: 'Failed to create client user - no user returned'
      })
    }

    // Update profile with client role
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        role: 'client',
        email: user.email,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)

    if (profileError) {
      console.error('Error updating profile:', profileError)
      // Try to clean up the created user
      await supabase.auth.admin.deleteUser(user.id)
      return res.status(500).json({ 
        error: profileError.message || 'Failed to update client profile'
      })
    }

    res.status(200).json({ 
      message: 'Client user created successfully',
      userId: user.id,
      email: user.email,
      credentials: {
        email: 'client@solventus.com',
        password: 'Client123!@#'
      }
    })
  } catch (error: any) {
    console.error('Error in create-client-user handler:', error)
    res.status(500).json({ 
      error: error.message || 'Failed to create client user'
    })
  }
}
