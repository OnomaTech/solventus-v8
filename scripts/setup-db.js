const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Read .env.local file
const envPath = path.join(__dirname, '..', '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')
const envVars = {}

// Parse environment variables
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=')
  if (key && value) {
    envVars[key.trim()] = value.trim()
  }
})

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = envVars.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupDatabase() {
  try {
    console.log('Setting up database...')

    // Get admin user
    const { data: admin, error: adminError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'admin@solventus.com')
      .single()

    if (adminError) {
      console.error('Error finding admin user:', adminError)
      return
    }

    if (!admin) {
      console.error('Admin user not found')
      return
    }

    // Update admin permissions
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        permissions: ['client_dashboard']
      })
      .eq('id', admin.id)

    if (updateError) {
      console.error('Error updating admin permissions:', updateError)
      return
    }

    console.log('Admin permissions updated successfully!')
    console.log('Database setup completed!')
  } catch (error) {
    console.error('Error setting up database:', error)
    process.exit(1)
  }
}

setupDatabase()
