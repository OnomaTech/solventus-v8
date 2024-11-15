const fetch = require('node-fetch')

async function checkAdmin() {
  try {
    console.log('\n🔍 Checking admin user status...')
    
    const response = await fetch('http://localhost:3000/api/check-admin')
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to check admin status')
    }

    console.log('\n📊 Admin User Status:')
    console.log('--------------------')
    
    if (data.user) {
      console.log('✅ User exists in auth.users')
      console.log(`   ID: ${data.user.id}`)
      console.log(`   Email: ${data.user.email}`)
    } else {
      console.log('❌ User not found in auth.users')
    }

    if (data.profile) {
      console.log('✅ Profile exists')
      console.log(`   Role: ${data.profile.role}`)
    } else {
      console.log('❌ Profile not found')
    }

    console.log('\n🔐 Status Summary:')
    console.log('----------------')
    console.log(`User Account: ${data.status.hasUser ? '✅' : '❌'}`)
    console.log(`Profile: ${data.status.hasProfile ? '✅' : '❌'}`)
    console.log(`Admin Role: ${data.status.isAdmin ? '✅' : '❌'}`)

    if (!data.status.hasUser || !data.status.hasProfile || !data.status.isAdmin) {
      console.log('\n⚠️  Issues Found:')
      console.log('---------------')
      if (!data.status.hasUser) {
        console.log('• Admin user needs to be created in auth.users')
      }
      if (!data.status.hasProfile) {
        console.log('• Profile needs to be created in profiles table')
      }
      if (!data.status.isAdmin) {
        console.log('• User needs admin role in profile')
      }
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\nMake sure the development server is running with:')
      console.log('npm run dev')
    }
    process.exit(1)
  }
}

checkAdmin()
