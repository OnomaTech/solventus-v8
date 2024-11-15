import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

// Mock admin credentials - In production, this would be handled by your auth system
const MOCK_ADMIN = {
  email: 'admin@solventus.com',
  password: 'admin123'
}

export default function LoginPage() {
  const router = useRouter()
  const { redirect } = router.query
  const { isAuthenticated, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirectUrl = typeof redirect === 'string' ? redirect : '/admin'
      router.push(redirectUrl)
    }
  }, [isAuthenticated, redirect, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Mock authentication - Replace with actual auth logic
      if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
        // Mock token - In production, this would come from your auth server
        const mockToken = 'mock-token-' + Date.now()
        const userData = {
          email: MOCK_ADMIN.email,
          role: 'admin'
        }
        
        // Use the auth context to handle login
        login(mockToken, userData)
        
        // Router will handle redirect in the useEffect above
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred during login')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Admin Login - Solventus</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@solventus.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-500 text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>

              {process.env.NODE_ENV === 'development' && (
                <div className="text-xs text-gray-500 text-center mt-4">
                  Demo credentials:<br />
                  Email: admin@solventus.com<br />
                  Password: admin123
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
