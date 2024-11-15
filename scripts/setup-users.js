const fetch = require('node-fetch')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (query) => new Promise((resolve) => rl.question(query, resolve))

async function setupUsers() {
  console.log('\n🔧 User Setup Tool\n')

  try {
    // Check if dev server is running
    try {
      await fetch('http://localhost:3000')
    } catch (error) {
      console.error('❌ Error: Development server is not running')
      console.log('\nPlease start the development server with:')
      console.log('npm run dev')
      process.exit(1)
    }

    const proceed = await question(
      'This will create two users with the following credentials:\n\n' +
      '1. Admin User:\n' +
      '   Email: admin@solventus.com\n' +
      '   Password: Admin123!@#\n\n' +
      '2. Client User:\n' +
      '   Email: client@solventus.com\n' +
      '   Password: Client123!@#\n\n' +
      'Do you want to proceed? (y/n): '
    )

    if (proceed.toLowerCase() !== 'y') {
      console.log('\n❌ User setup cancelled')
      process.exit(0)
    }

    console.log('\n📡 Setting up users...')
    
    // Create admin user
    console.log('\n1. Creating admin user...')
    const adminResponse = await fetch('http://localhost:3000/api/create-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const adminData = await adminResponse.json()

    if (!adminResponse.ok) {
      if (adminData.error === 'Admin user already exists') {
        console.log('✓ Admin user already exists')
      } else {
        throw new Error(adminData.error || 'Failed to create admin user')
      }
    } else {
      console.log('✓ Admin user created successfully')
    }

    // Create client user
    console.log('\n2. Creating client user...')
    const clientResponse = await fetch('http://localhost:3000/api/create-client-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const clientData = await clientResponse.json()

    if (!clientResponse.ok) {
      if (clientData.error === 'Client user already exists') {
        console.log('✓ Client user already exists')
      } else {
        throw new Error(clientData.error || 'Failed to create client user')
      }
    } else {
      console.log('✓ Client user created successfully')
    }

    console.log('\n✅ User setup completed successfully!')
    console.log('\nCredentials:')
    console.log('\n1. Admin User:')
    console.log('   Email: admin@solventus.com')
    console.log('   Password: Admin123!@#')
    console.log('\n2. Client User:')
    console.log('   Email: client@solventus.com')
    console.log('   Password: Client123!@#')
    
    console.log('\n⚠️  IMPORTANT: Please change these passwords after first login!')
    
    console.log('\n📝 Next steps:')
    console.log('1. Admin login: http://localhost:3000/admin/login')
    console.log('2. Client login: http://localhost:3000/login')
    console.log('3. Change passwords for both accounts')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\nMake sure the development server is running with:')
      console.log('npm run dev')
    }
    process.exit(1)
  } finally {
    rl.close()
  }
}

setupUsers()
