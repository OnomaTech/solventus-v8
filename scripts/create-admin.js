const fetch = require('node-fetch')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (query) => new Promise((resolve) => rl.question(query, resolve))

async function createAdmin() {
  console.log('\n🔧 Admin User Creation Tool\n')

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
      'This will create an admin user with the following credentials:\n\n' +
      'Email: admin@solventus.com\n' +
      'Password: Admin123!@#\n\n' +
      'Do you want to proceed? (y/n): '
    )

    if (proceed.toLowerCase() !== 'y') {
      console.log('\n❌ Admin user creation cancelled')
      process.exit(0)
    }

    console.log('\n📡 Creating admin user...')
    
    const response = await fetch('http://localhost:3000/api/create-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create admin user')
    }

    console.log('\n✅ Admin user created successfully!')
    console.log('\nCredentials:')
    console.log('Email:', data.credentials.email)
    console.log('Password:', data.credentials.password)
    console.log('\n⚠️  IMPORTANT: Please change this password after first login!')
    
    console.log('\n📝 Next steps:')
    console.log('1. Go to http://localhost:3000/login')
    console.log('2. Sign in with the credentials above')
    console.log('3. Change your password immediately')

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

createAdmin()
