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
      autoRefreshToken: true,
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
    // First, check if the admin user already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id, role')
      .eq('role', 'admin')
      .single()

    if (existingUser) {
      return res.status(400).json({
        error: 'Admin user already exists'
      })
    }

    // Create user with admin@solventus.com
    const { data: { user }, error: userError } = await supabase.auth.admin.createUser({
      email: 'admin@solventus.com',
      password: 'Admin123!@#',  // You should change this password after first login
      email_confirm: true,
      user_metadata: {
        role: 'admin'
      }
    })

    if (userError) {
      console.error('Error creating user:', userError)
      return res.status(500).json({ 
        error: userError.message || 'Failed to create admin user'
      })
    }

    if (!user) {
      return res.status(500).json({ 
        error: 'Failed to create admin user - no user returned'
      })
    }

    // Create profile with admin role
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        role: 'admin',
        email: user.email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (profileError) {
      console.error('Error creating profile:', profileError)
      // Try to clean up the created user
      await supabase.auth.admin.deleteUser(user.id)
      return res.status(500).json({ 
        error: profileError.message || 'Failed to create admin profile'
      })
    }

    // Enable RLS policies for the admin user
    const { error: policyError } = await supabase.rpc('setup_admin_policies', {
      admin_id: user.id
    })

    if (policyError) {
      console.error('Error setting up policies:', policyError)
      // Log the error but don't fail the request
    }

    res.status(200).json({ 
      message: 'Admin user created successfully',
      userId: user.id,
      email: user.email,
      credentials: {
        email: 'admin@solventus.com',
        password: 'Admin123!@#'
      }
    })
  } catch (error: any) {
    console.error('Error in create-admin handler:', error)
    res.status(500).json({ 
      error: error.message || 'Failed to create admin user'
    })
  }
}
