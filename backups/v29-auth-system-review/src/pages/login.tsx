import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signIn, user } = useAuth()

  // Clear error when inputs change
  useEffect(() => {
    if (error) setError('')
  }, [email, password])

  // Handle URL parameters
  useEffect(() => {
    const urlError = router.query.error
    const urlMessage = router.query.message

    if (urlError === 'session_error') {
      setError('Your session has expired. Please sign in again.')
    } else if (urlError === 'Not authorized as client') {
      setError('This login is for clients only. Administrators should use the admin login page.')
    }

    if (urlMessage) {
      setMessage(urlMessage as string)
    }
  }, [router.query])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const { error: signInError } = await signIn(email, password)
      
      if (signInError) {
        switch (signInError.message) {
          case 'Invalid login credentials':
          case 'Invalid email or password':
            setError('The email or password you entered is incorrect.')
            break
          case 'Email not confirmed':
            setError('Please confirm your email address before signing in.')
            break
          case 'Not authorized as client':
            setError('This login is for clients only. Administrators should use the admin login page.')
            break
          default:
            setError(signInError.message || 'An error occurred during sign in.')
        }
        setLoading(false)
        return
      }
    } catch (error: any) {
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  // Handle redirection after successful login
  useEffect(() => {
    if (user) {
      const redirectTo = router.query.redirectTo as string
      const destination = redirectTo || '/dashboard'
      router.push(destination)
    }
  }, [user, router])

  return (
    <>
      <Head>
        <title>Client Login - Solventus CRM</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Welcome back</h2>
            <p className="mt-2 text-gray-600">Sign in to your client account</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-blue-50 border border-blue-200 text-blue-600 px-4 py-3 rounded-md text-sm">
                {message}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>

            <div className="text-center text-sm text-gray-500">
              Are you an administrator? <a href="/admin/login" className="text-blue-600 hover:underline">Sign in here</a>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
