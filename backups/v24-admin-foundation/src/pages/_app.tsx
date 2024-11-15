import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'
import Layout from '../components/Layout'
import { AdminLayout } from '../components/admin/AdminLayout'
import '../styles/globals.css'
import { useRouter } from 'next/router'

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isAdminRoute = router.pathname.startsWith('/admin')
  const isDashboardRoute = router.pathname.startsWith('/dashboard')

  // Wrap the component with appropriate layout
  const WrappedComponent = () => {
    if (isAdminRoute) {
      return (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      )
    }

    // For main website and client dashboard
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }

  return (
    <AuthProvider>
      <WrappedComponent />
    </AuthProvider>
  )
}

App.getInitialProps = async ({ Component, ctx }: any) => {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}

export default App
