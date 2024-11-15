import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This is a temporary auth check. In production, you would verify against your auth system
function isAuthenticated(request: NextRequest) {
  // For now, we'll just check if there's a session token
  // Replace this with your actual auth logic
  const token = request.cookies.get('auth-token')
  return !!token
}

export function middleware(request: NextRequest) {
  // Check if the request is for the admin section
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!isAuthenticated(request)) {
      // Redirect to login page if not authenticated
      const loginUrl = new URL('/login', request.url)
      // Add the original URL as a redirect parameter
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  // Specify which paths this middleware will run on
  matcher: [
    '/admin/:path*'
  ]
}
