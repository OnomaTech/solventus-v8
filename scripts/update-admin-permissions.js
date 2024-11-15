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

async function updateAdminPermissions() {
  try {
    console.log('Updating admin user permissions...')
    
    // Execute raw SQL query
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'admin@solventus.com')
      .single()

    if (error) {
      console.error('Error finding admin user:', error)
      return
    }

    if (!data) {
      console.error('Admin user not found')
      return
    }

    // Update the admin user with client_dashboard permission
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ permissions: ['client_dashboard'] })
      .eq('id', data.id)

    if (updateError) {
      console.error('Error updating admin permissions:', updateError)
      return
    }

    console.log('Successfully updated admin permissions')
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

updateAdminPermissions()
