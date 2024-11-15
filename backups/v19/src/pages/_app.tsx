import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'
import Layout from '../components/Layout'
import '../styles/globals.css'

export default function App({ Component, pageProps, router }: AppProps) {
  // Check if we're on an admin route
  const isAdminRoute = router.pathname.startsWith('/admin')

  // If it's an admin route, wrap with AuthProvider and don't use main Layout
  if (isAdminRoute) {
    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    )
  }

  // For all other routes (including /login and /dashboard), use the main Layout
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
