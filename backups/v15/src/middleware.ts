import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This is a temporary auth check. In production, you would verify against your auth system
function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get('auth-token')
  return !!token
}

export function middleware(request: NextRequest) {
  // Only check admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Don't check the admin login page itself
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    if (!isAuthenticated(request)) {
      // Redirect to admin login page if not authenticated
      const loginUrl = new URL('/admin/login', request.url)
      // Add the original URL as a redirect parameter
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  // Only run middleware on admin routes
  matcher: ['/admin/:path*']
}
