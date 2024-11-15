import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'
import { AdminAuthProvider } from '../contexts/AdminAuthContext'
import { DashboardLayout } from '../components/DashboardLayout'
import { Layout } from '../components/Layout'
import '../styles/globals.css'

export default function App({ Component, pageProps, router }: AppProps) {
  // Use DashboardLayout only for dashboard and related pages
  const isDashboardPage = router.pathname === '/dashboard' || 
    router.pathname.startsWith('/dashboard/') ||
    router.pathname.startsWith('/settings/')

  // Use Layout for non-dashboard, non-admin pages
  const isAdminPage = router.pathname.startsWith('/admin')

  return (
    <AuthProvider>
      <AdminAuthProvider>
        {isDashboardPage ? (
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        ) : isAdminPage ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </AdminAuthProvider>
    </AuthProvider>
  )
}
