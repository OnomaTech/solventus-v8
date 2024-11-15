import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { AuthProvider } from '../contexts/AuthContext'
import { AdminAuthProvider } from '../contexts/AdminAuthContext'
import Layout from '../components/Layout'
import { AdminLayout } from '../components/admin/AdminLayout'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  
  // Pages that should not have any layout
  const noLayoutPages = ['/login', '/dashboard']
  const isNoLayoutPage = noLayoutPages.includes(router.pathname)
  
  // Check if it's an admin page (including admin login)
  const isAdminPage = router.pathname.startsWith('/admin')
  
  // Check if it's an admin page that needs layout (excluding login)
  const needsAdminLayout = isAdminPage && router.pathname !== '/admin/login'
  
  // Main site pages (excluding no-layout pages and admin pages)
  const isMainSite = !isNoLayoutPage && !isAdminPage

  // Wrap the entire app with AuthProvider for global auth state
  return (
    <AuthProvider>
      {isAdminPage ? (
        // All admin pages (including login) get AdminAuthProvider
        <AdminAuthProvider>
          {needsAdminLayout ? (
            // Admin pages (except login) get AdminLayout
            <AdminLayout>
              <Component {...pageProps} />
            </AdminLayout>
          ) : (
            // Admin login page gets no layout
            <Component {...pageProps} />
          )}
        </AdminAuthProvider>
      ) : isMainSite ? (
        // Main site pages get regular Layout
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        // Pages with no layout (login, dashboard)
        <Component {...pageProps} />
      )}
    </AuthProvider>
  )
}
